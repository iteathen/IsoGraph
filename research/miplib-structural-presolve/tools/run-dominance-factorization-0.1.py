#!/usr/bin/env python3
import gzip, hashlib, json, math, time, urllib.request
from pathlib import Path
import highspy
import numpy as np

OUT=Path("out/miplib-dominance-factor-0.1")
OUT.mkdir(parents=True,exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"
INSTANCES=[
 "mad","glass4","supportcase26","bppc4-08",
 "50v-10","reblock115","ran14x18-disj-8","gen-ip002","gen-ip054",
 "ic97_potential","pk1","n5-3","neos859080","neos-911970",
 "seymour1","p200x1188c","b1c1s1","markshare2","mas74",
 "exp-1-500-5-5","markshare_4_0","qap10","cost266-UUE","mas76"
]
ROW_BINARY_CAP=200
PAIR_CAP=200000
CERT_CAP=64
BENCH_LIMIT=10.0
TOL=1e-9

def finite_bound(x):
    inf=highspy.kHighsInf
    return abs(float(x))<0.5*inf

def close(a,b):
    return abs(float(a)-float(b))<=TOL*max(1.0,abs(float(a)),abs(float(b)))

def configure(h,presolve="on",limit=None):
    h.setOptionValue("output_flag",False)
    h.setOptionValue("threads",1)
    h.setOptionValue("parallel","off")
    h.setOptionValue("random_seed",0)
    h.setOptionValue("presolve",presolve)
    h.setOptionValue("mip_rel_gap",0.0)
    if limit is not None:h.setOptionValue("time_limit",float(limit))

def download(name):
    u=f"{BASE}/{name}.mps.gz"
    data=urllib.request.urlopen(u,timeout=90).read();raw=gzip.decompress(data)
    p=OUT/f"{name}.mps";p.write_bytes(raw)
    return p,{"source_url":u,"gzip_sha256":hashlib.sha256(data).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def matrix_views(lp):
    n=int(lp.num_col_);m=int(lp.num_row_)
    rows=[{} for _ in range(m)];cols=[{} for _ in range(n)]
    st=list(lp.a_matrix_.start_);ind=list(lp.a_matrix_.index_);val=list(lp.a_matrix_.value_)
    if lp.a_matrix_.format_==highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(st[j],st[j+1]):
                i=int(ind[p]);v=float(val[p]);rows[i][j]=v;cols[j][i]=v
    else:
        for i in range(m):
            for p in range(st[i],st[i+1]):
                j=int(ind[p]);v=float(val[p]);rows[i][j]=v;cols[j][i]=v
    return rows,cols

def binary(lp,j):
    return len(lp.integrality_)>j and lp.integrality_[j]==highspy.HighsVarType.kInteger and close(lp.col_lower_[j],0) and close(lp.col_upper_[j],1)

def colname(lp,j):
    return str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}"
def rowname(lp,i):
    return str(lp.row_names_[i]) if len(lp.row_names_)>i and lp.row_names_[i] else f"row#{i}"

class DSU:
    def __init__(self,n):self.p=list(range(n));self.sz=[1]*n
    def find(self,x):
        while self.p[x]!=x:
            self.p[x]=self.p[self.p[x]];x=self.p[x]
        return x
    def union(self,a,b):
        a=self.find(a);b=self.find(b)
        if a==b:return
        if self.sz[a]<self.sz[b]:a,b=b,a
        self.p[b]=a;self.sz[a]+=self.sz[b]

def factorization(lp,rows):
    n=int(lp.num_col_);m=int(lp.num_row_);d=DSU(n+m)
    for i,row in enumerate(rows):
        for j in row:d.union(j,n+i)
    comps={}
    for j in range(n):comps.setdefault(d.find(j),{"cols":[],"rows":[],"nonzeros":0})["cols"].append(j)
    for i,row in enumerate(rows):
        c=comps.setdefault(d.find(n+i),{"cols":[],"rows":[],"nonzeros":0})
        c["rows"].append(i);c["nonzeros"]+=len(row)
    vals=list(comps.values())
    vals.sort(key=lambda c:-(len(c["cols"])+len(c["rows"])))
    return {"component_count":len(vals),
      "largest":[{"cols":len(c["cols"]),"rows":len(c["rows"]),"nonzeros":c["nonzeros"]} for c in vals[:10]],
      "exact_factorization":len(vals)>1}

def min_activity(lp,row):
    inf=highspy.kHighsInf;total=0.0
    for j,a in row.items():
        lb=float(lp.col_lower_[j]);ub=float(lp.col_upper_[j])
        x=lb if a>=0 else ub
        if x<=-0.5*inf or x>=0.5*inf:return -inf
        total+=a*x
    return total

def exclusion_pairs(lp,rows):
    candidates={};checks=0;truncated=False;inf=highspy.kHighsInf
    for i,row in enumerate(rows):
        up=float(lp.row_upper_[i])
        if up>=0.5*inf:continue
        b=[j for j in row if binary(lp,j)]
        if len(b)<2 or len(b)>ROW_BINARY_CAP:continue
        base=min_activity(lp,row)
        if not math.isfinite(base):continue
        for x in range(len(b)):
            a=b[x];aa=row[a]
            for y in range(x+1,len(b)):
                if checks>=PAIR_CAP:
                    truncated=True;return candidates,checks,truncated
                checks+=1
                bb=b[y];ab=row[bb]
                both=base+max(aa,0.0)+max(ab,0.0)
                if both>up+TOL*max(1.0,abs(up)):
                    key=(a,bb) if a<bb else (bb,a)
                    candidates.setdefault(key,i)
    return candidates,checks,truncated

def obj_nw(lp,x,y):
    cx=float(lp.col_cost_[x]);cy=float(lp.col_cost_[y])
    if lp.sense_==highspy.ObjSense.kMinimize:return cy<=cx+TOL*max(1.0,abs(cx),abs(cy))
    return cy>=cx-TOL*max(1.0,abs(cx),abs(cy))

def substitution_preserves(lp,cols,x,y):
    for i in set(cols[x])|set(cols[y]):
        d=cols[y].get(i,0.0)-cols[x].get(i,0.0)
        lo=float(lp.row_lower_[i]);up=float(lp.row_upper_[i])
        lf=finite_bound(lo);uf=finite_bound(up)
        if lf and uf:
            if not close(d,0):return False
        elif uf:
            if d>TOL:return False
        elif lf:
            if d<-TOL:return False
    return True

def find_dominance(lp,rows,cols):
    pairs,checks,truncated=exclusion_pairs(lp,rows)
    certs=[]
    for (a,b),w in pairs.items():
        for x,y in ((a,b),(b,a)):
            if not obj_nw(lp,x,y):continue
            if not substitution_preserves(lp,cols,x,y):continue
            certs.append({"dominated_col":x,"replacement_col":y,"witness_row":w,
                          "dominated_name":colname(lp,x),"replacement_name":colname(lp,y),
                          "witness_row_name":rowname(lp,w),
                          "objective_dominated":float(lp.col_cost_[x]),
                          "objective_replacement":float(lp.col_cost_[y])})
            if len(certs)>=CERT_CAP:return certs,checks,truncated,len(pairs)
    return certs,checks,truncated,len(pairs)

def finite(x):
    try:
        x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(lp,delete_col=None):
    h=highspy.Highs();configure(h,"off",BENCH_LIMIT)
    if h.passModel(lp)==highspy.HighsStatus.kError:raise RuntimeError("passModel")
    if delete_col is not None:
        if h.deleteCols(1,np.array([delete_col],dtype=np.int32))==highspy.HighsStatus.kError:raise RuntimeError("deleteCols")
    t=time.perf_counter();rs=h.run();wall=time.perf_counter()-t
    if rs==highspy.HighsStatus.kError:raise RuntimeError("run")
    s=h.getModelStatus();info=h.getInfo()
    return {"status":h.modelStatusToString(s),"optimal":s==highspy.HighsModelStatus.kOptimal,
      "objective":finite(info.objective_function_value),"dual_bound":finite(info.mip_dual_bound),
      "gap":finite(info.mip_gap),"nodes":int(info.mip_node_count),"lp_iterations":int(info.simplex_iteration_count),
      "wall_s":wall,"dimensions":{"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}}

def inspect(name):
    p,src=download(name);h=highspy.Highs();configure(h)
    if h.readModel(str(p))==highspy.HighsStatus.kError:raise RuntimeError("read")
    raw={"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}
    if h.presolve()==highspy.HighsStatus.kError:raise RuntimeError("presolve")
    lp=h.getPresolvedLp();dims={"rows":int(lp.num_row_),"cols":int(lp.num_col_),"nonzeros":len(lp.a_matrix_.value_)}
    if dims["rows"]==0 or dims["cols"]==0:
        return {"name":name,"source":src,"raw":raw,"presolved":dims,"factorization":{"component_count":0,"largest":[],"exact_factorization":False},
                "mutual_exclusion_pairs":0,"dominance_checks":0,"truncated":False,"dominance":[],"benchmark":None,"signal":"NO_SIGNAL"}
    rows,cols=matrix_views(lp);fac=factorization(lp,rows)
    certs,checks,trunc,npairs=find_dominance(lp,rows,cols)
    bench=None
    if certs:
        c=sorted(certs,key=lambda z:(z["dominated_name"],z["replacement_name"]))[0]
        b=solve(lp,None);r=solve(lp,c["dominated_col"])
        mismatch=False
        if b["optimal"] and r["optimal"] and b["objective"] is not None and r["objective"] is not None:
            mismatch=not close(b["objective"],r["objective"])
        if mismatch:raise RuntimeError("objective mismatch after certified dominance deletion")
        bench={"certificate":c,"baseline":b,"reduced":r,"optimal_objective_mismatch":mismatch}
    if certs:signal="EXACT_DOMINANCE"
    elif fac["exact_factorization"]:signal="EXACT_FACTORIZATION"
    else:signal="NO_SIGNAL"
    return {"name":name,"source":src,"raw":raw,"presolved":dims,"factorization":fac,
            "mutual_exclusion_pairs":npairs,"dominance_checks":checks,"truncated":trunc,
            "dominance":certs,"benchmark":bench,"signal":signal}

def main():
    results=[];errors=[]
    for n in INSTANCES:
        try:
            r=inspect(n);results.append(r);print(n,r["signal"],"dom",len(r["dominance"]),"components",r["factorization"]["component_count"],flush=True)
        except Exception as e:
            errors.append({"name":n,"error":repr(e)});print(n,"ERROR",repr(e),flush=True)
    counts={"EXACT_DOMINANCE":0,"EXACT_FACTORIZATION":0,"NO_SIGNAL":0}
    for r in results:counts[r["signal"]]+=1
    out={"experiment":"miplib-dominance-factorization-0.1","date":"2026-10-06","highs_version":highspy.Highs().version(),
         "instances":INSTANCES,"profile":{"row_binary_cap":ROW_BINARY_CAP,"pair_cap":PAIR_CAP,"certificate_cap":CERT_CAP},
         "results":results,"errors":errors,"counts":counts,
         "disposition":"PASS" if len(results)==len(INSTANCES) and not errors else "PARTIAL"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# MIPLIB dominance / factorization 0.1","",f"**Disposition:** {out['disposition']}","",
           "| Instance | Post-HiGHS | Components | Exact dominated vars | Signal |",
           "| --- | ---: | ---: | ---: | --- |"]
    for r in results:lines.append(f"| {r['name']} | {r['presolved']['rows']}x{r['presolved']['cols']} | {r['factorization']['component_count']} | {len(r['dominance'])} | {r['signal']} |")
    lines += ["","## Counts","",f"~~~json\n{json.dumps(counts,indent=2)}\n~~~"]
    if errors:lines+=["","## Errors",""]+[f"- {e['name']}: {e['error']}" for e in errors]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"counts":counts,"errors":errors},indent=2))
    if out["disposition"]!="PASS":raise SystemExit(1)

if __name__=="__main__":main()
