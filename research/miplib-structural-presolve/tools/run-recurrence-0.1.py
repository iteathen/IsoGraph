#!/usr/bin/env python3
import gzip, hashlib, json, math, urllib.request
from pathlib import Path
import highspy

OUT=Path("out/miplib-recurrence-0.1")
OUT.mkdir(parents=True, exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"

INSTANCES=[
 "50v-10","reblock115","ran14x18-disj-8","gen-ip002","gen-ip054",
 "ic97_potential","pk1","n5-3","neos859080","neos-911970",
 "seymour1","p200x1188c","b1c1s1","markshare2","mas74",
 "exp-1-500-5-5","markshare_4_0","qap10","cost266-UUE","mas76"
]
MAX_PAIR_CHECKS=50000
MAX_CERTS=32
ROUNDS=6

def fv(x):
    x=float(x)
    inf=highspy.kHighsInf
    if x>=0.5*inf: return "+INF"
    if x<=-0.5*inf: return "-INF"
    if abs(x)<1e-13: x=0.0
    return format(x,".12g")

def close(a,b,tol=1e-9):
    a=float(a); b=float(b); inf=highspy.kHighsInf
    if abs(a)>=0.5*inf or abs(b)>=0.5*inf:
        return (a>=0.5*inf and b>=0.5*inf) or (a<=-0.5*inf and b<=-0.5*inf)
    return abs(a-b)<=tol*max(1.0,abs(a),abs(b))

def configure(h):
    h.setOptionValue("output_flag",False)
    h.setOptionValue("threads",1)
    h.setOptionValue("parallel","off")
    h.setOptionValue("random_seed",0)
    h.setOptionValue("presolve","on")

def download(name):
    url=f"{BASE}/{name}.mps.gz"
    data=urllib.request.urlopen(url,timeout=90).read()
    raw=gzip.decompress(data)
    p=OUT/f"{name}.mps"
    p.write_bytes(raw)
    return p,{
      "source_url":url,
      "gzip_sha256":hashlib.sha256(data).hexdigest(),
      "mps_sha256":hashlib.sha256(raw).hexdigest(),
      "gzip_bytes":len(data),"mps_bytes":len(raw)
    }

def matrix_views(lp):
    n=int(lp.num_col_); m=int(lp.num_row_)
    rows=[{} for _ in range(m)]; cols=[{} for _ in range(n)]
    st=list(lp.a_matrix_.start_); ind=list(lp.a_matrix_.index_); val=list(lp.a_matrix_.value_)
    if lp.a_matrix_.format_==highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(st[j],st[j+1]):
                i=int(ind[p]); v=float(val[p]); rows[i][j]=v; cols[j][i]=v
    elif lp.a_matrix_.format_==highspy.MatrixFormat.kRowwise:
        for i in range(m):
            for p in range(st[i],st[i+1]):
                j=int(ind[p]); v=float(val[p]); rows[i][j]=v; cols[j][i]=v
    else:
        raise RuntimeError(f"unsupported matrix format {lp.a_matrix_.format_}")
    return rows,cols

def binary(lp,j):
    return len(lp.integrality_)>j and lp.integrality_[j]==highspy.HighsVarType.kInteger and close(lp.col_lower_[j],0) and close(lp.col_upper_[j],1)

def compress(signatures):
    table={}
    out=[]
    for s in signatures:
        if s not in table: table[s]=len(table)
        out.append(table[s])
    return out

def refinement(lp,rows,cols,rounds=ROUNDS):
    n=int(lp.num_col_); m=int(lp.num_row_)
    vbase=[(fv(lp.col_cost_[j]),fv(lp.col_lower_[j]),fv(lp.col_upper_[j]),str(lp.integrality_[j]) if len(lp.integrality_)>j else "C") for j in range(n)]
    rbase=[(fv(lp.row_lower_[i]),fv(lp.row_upper_[i])) for i in range(m)]
    vc=compress(vbase); rc=compress(rbase)
    for _ in range(rounds):
        rs=[(rbase[i],tuple(sorted((fv(a),vc[j]) for j,a in rows[i].items()))) for i in range(m)]
        newrc=compress(rs)
        vs=[(vbase[j],tuple(sorted((fv(a),newrc[i]) for i,a in cols[j].items()))) for j in range(n)]
        newvc=compress(vs)
        vc,rc=newvc,newrc
    vg={}
    for j,c in enumerate(vc): vg.setdefault(c,[]).append(j)
    rg={}
    for i,c in enumerate(rc): rg.setdefault(c,[]).append(i)
    vclasses=[g for g in vg.values() if len(g)>1]
    rclasses=[g for g in rg.values() if len(g)>1]
    vclasses.sort(key=lambda g:(-len(g),tuple(g)))
    rclasses.sort(key=lambda g:(-len(g),tuple(g)))
    return {
      "var_classes":vclasses,"row_classes":rclasses,
      "var_class_count":len(vclasses),"row_class_count":len(rclasses),
      "var_members":sum(map(len,vclasses)),"row_members":sum(map(len,rclasses)),
      "largest_var_sizes":[len(g) for g in vclasses[:10]],
      "largest_row_sizes":[len(g) for g in rclasses[:10]],
    }

def map_equal(a,b):
    if a.keys()!=b.keys(): return False
    return all(close(a[k],b[k]) for k in a)

def verify_pair(lp,rows,cols,a,b):
    if not(binary(lp,a) and binary(lp,b)): return None
    if not close(lp.col_cost_[a],lp.col_cost_[b]): return None
    if not close(lp.col_lower_[a],lp.col_lower_[b]) or not close(lp.col_upper_[a],lp.col_upper_[b]): return None
    if lp.integrality_[a]!=lp.integrality_[b]: return None
    touched=sorted(set(cols[a])|set(cols[b]))
    diff=[r for r in touched if not close(cols[a].get(r,0.0),cols[b].get(r,0.0))]
    if len(diff)!=2: return None
    r,s=diff
    if not close(lp.row_lower_[r],lp.row_lower_[s]) or not close(lp.row_upper_[r],lp.row_upper_[s]): return None
    swap={a:b,b:a}
    xr={swap.get(c,c):v for c,v in rows[r].items()}
    xs={swap.get(c,c):v for c,v in rows[s].items()}
    if not map_equal(xr,rows[s]) or not map_equal(xs,rows[r]): return None
    for q in touched:
        if q in (r,s): continue
        if not close(cols[a].get(q,0.0),cols[b].get(q,0.0)): return None
    return {"cols":[a,b],"rows":[r,s]}

def activity_interval(lp,entries,omit):
    lo=0.0; up=0.0; inf=highspy.kHighsInf
    for c,v in entries.items():
        if c in omit: continue
        lb=float(lp.col_lower_[c]); ub=float(lp.col_upper_[c])
        if v>=0: xl,xu=lb,ub
        else: xl,xu=ub,lb
        if xl<=-0.5*inf: lo=-inf
        elif lo>-0.5*inf: lo+=v*xl
        if xu>=0.5*inf: up=inf
        elif up<0.5*inf: up+=v*xu
    return lo,up

def row_satisfied(lp,row,omit):
    lo,up=activity_interval(lp,row and ROWS_GLOBAL[row] or {},omit)
    rl=float(lp.row_lower_[row]); ru=float(lp.row_upper_[row]); inf=highspy.kHighsInf
    oklo=rl<=-0.5*inf or lo>=rl-1e-9*max(1.0,abs(rl))
    okup=ru>=0.5*inf or up<=ru+1e-9*max(1.0,abs(ru))
    return oklo and okup,{"activity_min":lo,"activity_max":up,"row_lower":rl,"row_upper":ru}

def quotient_guard(lp,rows,cols,cert):
    a,b=cert["cols"]; r,s=cert["rows"]; inf=highspy.kHighsInf
    shared=sorted(set(cols[a])&set(cols[b])-{r,s})
    witnesses=[]
    for q in shared:
        ca=cols[a][q]; cb=cols[b][q]
        if not(close(ca,cb) and ca>0): continue
        ru=float(lp.row_upper_[q])
        if ru>ca+1e-9*max(1.0,abs(ca)): continue
        good=True
        for c,v in rows[q].items():
            if v< -1e-12 or float(lp.col_lower_[c]) < -1e-12:
                good=False; break
        if good: witnesses.append(q)
    if not witnesses: return {"licensed":False,"reason":"no_shared_at_most_one_row"}
    for keep,fixed,drop_row in ((a,b,s),(b,a,r)):
        act_lo,act_up=activity_interval(lp,rows[drop_row],{fixed})
        rl=float(lp.row_lower_[drop_row]); ru=float(lp.row_upper_[drop_row])
        oklo=rl<=-0.5*inf or act_lo>=rl-1e-9*max(1.0,abs(rl))
        okup=ru>=0.5*inf or act_up<=ru+1e-9*max(1.0,abs(ru))
        if oklo and okup:
            return {
              "licensed":True,"keep_col":keep,"fix_zero_col":fixed,
              "drop_row":drop_row,"at_most_one_rows":witnesses,
              "redundancy_activity":{"min":act_lo,"max":act_up,"lower":rl,"upper":ru}
            }
    return {"licensed":False,"reason":"private_row_not_interval_redundant","at_most_one_rows":witnesses}

def name_col(lp,j):
    return str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}"
def name_row(lp,i):
    return str(lp.row_names_[i]) if len(lp.row_names_)>i and lp.row_names_[i] else f"row#{i}"

def inspect(name):
    p,source=download(name)
    h=highspy.Highs(); configure(h)
    if h.readModel(str(p))==highspy.HighsStatus.kError: raise RuntimeError("readModel failed")
    original={"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}
    ps=h.presolve()
    if ps==highspy.HighsStatus.kError: raise RuntimeError("presolve failed")
    lp=h.getPresolvedLp()
    dims={"rows":int(lp.num_row_),"cols":int(lp.num_col_),"nonzeros":len(lp.a_matrix_.value_)}
    if dims["rows"]==0 or dims["cols"]==0:
        return {"name":name,"source":source,"original":original,"presolved":dims,"presolve_status":str(ps),
          "refinement":{"var_class_count":0,"row_class_count":0,"var_members":0,"row_members":0,"largest_var_sizes":[],"largest_row_sizes":[]},
          "pair_checks":0,"pair_check_truncated":False,"exact_transpositions":[],"exact_quotients":[],"signal":"NO_SIGNAL"}
    rows,cols=matrix_views(lp)
    global ROWS_GLOBAL
    ROWS_GLOBAL=rows
    ref=refinement(lp,rows,cols)
    checks=0; truncated=False; certs=[]; qcerts=[]
    for group in ref["var_classes"]:
        bg=[j for j in group if binary(lp,j)]
        if len(bg)<2: continue
        for x in range(len(bg)):
            for y in range(x+1,len(bg)):
                if checks>=MAX_PAIR_CHECKS or len(certs)>=MAX_CERTS:
                    truncated=True; break
                checks+=1
                c=verify_pair(lp,rows,cols,bg[x],bg[y])
                if c is None: continue
                c["col_names"]=[name_col(lp,c["cols"][0]),name_col(lp,c["cols"][1])]
                c["row_names"]=[name_row(lp,c["rows"][0]),name_row(lp,c["rows"][1])]
                q=quotient_guard(lp,rows,cols,c)
                if q.get("licensed"):
                    q["keep_col_name"]=name_col(lp,q["keep_col"])
                    q["fix_zero_col_name"]=name_col(lp,q["fix_zero_col"])
                    q["drop_row_name"]=name_row(lp,q["drop_row"])
                    q["at_most_one_row_names"]=[name_row(lp,z) for z in q["at_most_one_rows"]]
                    qcerts.append({"transposition":c,"quotient":q})
                certs.append(c)
            if truncated: break
        if truncated: break
    if qcerts: signal="EXACT_QUOTIENT"
    elif certs: signal="EXACT_SYMMETRY_ONLY"
    elif ref["var_class_count"] or ref["row_class_count"]: signal="LEAD_ONLY"
    else: signal="NO_SIGNAL"
    return {
      "name":name,"source":source,"original":original,"presolved":dims,"presolve_status":str(ps),
      "refinement":{k:v for k,v in ref.items() if k not in ("var_classes","row_classes")},
      "pair_checks":checks,"pair_check_truncated":truncated,
      "exact_transpositions":certs,"exact_quotients":qcerts,"signal":signal
    }

def main():
    results=[]; errors=[]
    for name in INSTANCES:
        try:
            r=inspect(name); results.append(r)
            print(name,r["signal"],r["presolved"],"certs",len(r["exact_transpositions"]),"quot",len(r["exact_quotients"]),flush=True)
        except Exception as e:
            errors.append({"name":name,"error":repr(e)})
            print(name,"ERROR",repr(e),flush=True)
    counts={k:0 for k in ("EXACT_QUOTIENT","EXACT_SYMMETRY_ONLY","LEAD_ONLY","NO_SIGNAL")}
    for r in results: counts[r["signal"]]+=1
    out={
      "experiment":"miplib-recurrence-screen-0.1","date":"2026-10-06",
      "highs_version":highspy.Highs().version(),"sample":INSTANCES,
      "sample_rule":"first 20 official benchmark-table instances with <=5000 raw variables and <=5000 raw constraints, excluding the four prototype instances",
      "profile":{"refinement_rounds":ROUNDS,"max_pair_checks_per_instance":MAX_PAIR_CHECKS,"max_certificates_per_instance":MAX_CERTS,
        "exact_detector":"binary two-column / two-row restricted transposition","quotient_guard":"shared nonnegative at-most-one row plus interval-redundant exchanged private row after representative fix"},
      "results":results,"errors":errors,"counts":counts,
      "disposition":"PASS" if len(results)==len(INSTANCES) and not errors else "PARTIAL"
    }
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2,allow_nan=True)+"\n")
    lines=["# MIPLIB recurrence screen 0.1","",f"**Disposition:** {out['disposition']}",f"**Completed:** {len(results)}/{len(INSTANCES)}","",
      "| Instance | Raw | Post-HiGHS | Refined var classes | Exact transpositions | Exact quotients | Signal |",
      "| --- | ---: | ---: | ---: | ---: | ---: | --- |"]
    for r in results:
        lines.append(f"| {r['name']} | {r['original']['rows']}x{r['original']['cols']} | {r['presolved']['rows']}x{r['presolved']['cols']} | {r['refinement']['var_class_count']} | {len(r['exact_transpositions'])} | {len(r['exact_quotients'])} | {r['signal']} |")
    if errors:
        lines += ["","## Errors",""]+[f"- {e['name']}: {e['error']}" for e in errors]
    lines += ["","## Totals","",json.dumps(counts,indent=2),
      "","Exact symmetry/quotient counts are bounded by the frozen restricted detector; absence is not proof that the model has no symmetry.",
      "LEAD_ONLY refinement classes are not treated as legal reductions."]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"counts":counts,"errors":errors},indent=2))
    if out["disposition"]!="PASS": raise SystemExit(1)

ROWS_GLOBAL=[]
if __name__=="__main__": main()
