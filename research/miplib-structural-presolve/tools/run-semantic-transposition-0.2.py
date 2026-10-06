#!/usr/bin/env python3
import gzip, hashlib, json, math, urllib.request
from collections import Counter
from pathlib import Path

import highspy
import z3

OUT=Path("out/miplib-semantic-transposition-0.2")
OUT.mkdir(parents=True,exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"
TARGETS=["glass4","mcsched","neos-1171737","neos-3381206-awhea","neos-3627168-kasai","neos-4387871-tavua","neos-4954672-berkel"]
PAIR_CAP=10
CHECK_TIMEOUT_MS=2500

def q(x):
    x=float(x); inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-16:x=0.0
    return format(x,".17g")

def finite(x):
    return abs(float(x)) < .5*highspy.kHighsInf

def download(name):
    u=f"{BASE}/{name}.mps.gz"
    d=urllib.request.urlopen(u,timeout=90).read();raw=gzip.decompress(d)
    p=OUT/f"{name}.mps";p.write_bytes(raw)
    return p,{"source_url":u,"gzip_sha256":hashlib.sha256(d).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def configure(h):
    h.setOptionValue("output_flag",False);h.setOptionValue("threads",1)
    h.setOptionValue("parallel","off");h.setOptionValue("random_seed",0);h.setOptionValue("presolve","on")

def matrix_views(lp):
    n=int(lp.num_col_);m=int(lp.num_row_);rows=[{} for _ in range(m)];cols=[{} for _ in range(n)]
    st=list(lp.a_matrix_.start_);ind=list(lp.a_matrix_.index_);val=list(lp.a_matrix_.value_)
    if lp.a_matrix_.format_==highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(st[j],st[j+1]):
                i=int(ind[p]);v=float(val[p]);rows[i][j]=v;cols[j][i]=v
    elif lp.a_matrix_.format_==highspy.MatrixFormat.kRowwise:
        for i in range(m):
            for p in range(st[i],st[i+1]):
                j=int(ind[p]);v=float(val[p]);rows[i][j]=v;cols[j][i]=v
    else:raise RuntimeError("unsupported matrix")
    return rows,cols

def cname(lp,j):
    return str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}"
def rname(lp,i):
    return str(lp.row_names_[i]) if len(lp.row_names_)>i and lp.row_names_[i] else f"row#{i}"

def load(name):
    p,src=download(name);h=highspy.Highs();configure(h)
    if h.readModel(str(p))==highspy.HighsStatus.kError:raise RuntimeError("read")
    raw={"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}
    if h.presolve()==highspy.HighsStatus.kError:raise RuntimeError("presolve")
    lp=h.getPresolvedLp();rows,cols=matrix_views(lp)
    return lp,rows,cols,src,raw

def base_attr(lp,j):
    return (q(lp.col_cost_[j]),q(lp.col_lower_[j]),q(lp.col_upper_[j]),
            str(lp.integrality_[j]) if len(lp.integrality_) else "C")

def coarse_groups(lp,rows,cols):
    groups={}
    for j in range(int(lp.num_col_)):
        inc=tuple(sorted((q(a),q(lp.row_lower_[i]),q(lp.row_upper_[i])) for i,a in cols[j].items()))
        key=(base_attr(lp,j),inc)
        groups.setdefault(key,[]).append(j)
    return [g for g in groups.values() if len(g)>1]

def row_sig(lp,row,i,swap=None):
    swap=swap or {}
    return (q(lp.row_lower_[i]),q(lp.row_upper_[i]),
            tuple(sorted((swap.get(j,j),q(v)) for j,v in row.items())))

def formulation_swap(lp,rows,cols,a,b):
    if base_attr(lp,a)!=base_attr(lp,b):return False
    touched=sorted(set(cols[a])|set(cols[b]))
    affected=[i for i in touched if q(cols[a].get(i,0))!=q(cols[b].get(i,0))]
    before=Counter(row_sig(lp,rows[i],i) for i in affected)
    sw={a:b,b:a}
    after=Counter(row_sig(lp,rows[i],i,sw) for i in affected)
    return before==after

def zrat(s):
    return z3.RealVal(s)

def build_solver(lp,rows):
    n=int(lp.num_col_);xs=[z3.Real(f"x_{j}") for j in range(n)]
    s=z3.Solver();s.set(timeout=CHECK_TIMEOUT_MS)
    for j,x in enumerate(xs):
        lo=float(lp.col_lower_[j]);up=float(lp.col_upper_[j])
        if finite(lo):s.add(x>=zrat(q(lo)))
        if finite(up):s.add(x<=zrat(q(up)))
    for i,row in enumerate(rows):
        expr=z3.Sum([zrat(q(v))*xs[j] for j,v in row.items()]) if row else zrat("0")
        lo=float(lp.row_lower_[i]);up=float(lp.row_upper_[i])
        if finite(lo):s.add(expr>=zrat(q(lo)))
        if finite(up):s.add(expr<=zrat(q(up)))
    return s,xs

def swapped_expr(xs,row,a,b):
    terms=[]
    for j,v in row.items():
        jj=b if j==a else a if j==b else j
        terms.append(zrat(q(v))*xs[jj])
    return z3.Sum(terms) if terms else zrat("0")

def semantic_swap(lp,rows,cols,solver,xs,a,b):
    if base_attr(lp,a)!=base_attr(lp,b):
        return {"exact":False,"reason":"base_attributes_differ"}
    touched=sorted(set(cols[a])|set(cols[b]))
    affected=[i for i in touched if q(cols[a].get(i,0))!=q(cols[b].get(i,0))]
    queries=0
    for i in affected:
        expr=swapped_expr(xs,rows[i],a,b)
        lo=float(lp.row_lower_[i]);up=float(lp.row_upper_[i])
        if finite(lo):
            solver.push();solver.add(expr<zrat(q(lo)));res=solver.check();solver.pop();queries+=1
            if res==z3.sat:return {"exact":False,"reason":"lower_counterexample","row":rname(lp,i),"queries":queries}
            if res==z3.unknown:return {"exact":False,"reason":"unknown","row":rname(lp,i),"queries":queries}
        if finite(up):
            solver.push();solver.add(expr>zrat(q(up)));res=solver.check();solver.pop();queries+=1
            if res==z3.sat:return {"exact":False,"reason":"upper_counterexample","row":rname(lp,i),"queries":queries}
            if res==z3.unknown:return {"exact":False,"reason":"unknown","row":rname(lp,i),"queries":queries}
    return {"exact":True,"reason":None,"affected_rows":len(affected),"queries":queries,
            "proof":"All swapped affected row sides are implied by the complete rationalized LP relaxation; transposition is involutive and objective/domain invariant."}

def pairs_from_groups(lp,groups):
    pairs=[]
    for g in groups:
        sg=sorted(g,key=lambda j:cname(lp,j))
        for x in range(len(sg)):
            for y in range(x+1,len(sg)):
                pairs.append((cname(lp,sg[x]),cname(lp,sg[y]),sg[x],sg[y]))
    pairs.sort()
    return pairs

def inspect(name):
    lp,rows,cols,src,raw=load(name)
    solver,xs=build_solver(lp,rows)
    groups=coarse_groups(lp,rows,cols);pairs=pairs_from_groups(lp,groups)
    controls=[];tested=[];semantic_only=[]
    # Explicit known positive control, independently re-proved by this semantic method.
    if name=="glass4":
        pos={cname(lp,j):j for j in range(int(lp.num_col_))}
        if "z1&3.4" not in pos or "z1&3.8" not in pos:raise RuntimeError("glass positive-control variables missing")
        a,b=pos["z1&3.4"],pos["z1&3.8"]
        sem=semantic_swap(lp,rows,cols,solver,xs,a,b)
        controls.append({"pair":["z1&3.4","z1&3.8"],"formulation_swap":formulation_swap(lp,rows,cols,a,b),"semantic":sem})
    for _,_,a,b in pairs[:PAIR_CAP]:
        fs=formulation_swap(lp,rows,cols,a,b)
        sem=semantic_swap(lp,rows,cols,solver,xs,a,b)
        rec={"pair":[cname(lp,a),cname(lp,b)],"formulation_swap":fs,"semantic":sem}
        tested.append(rec)
        if sem.get("exact") and not fs:semantic_only.append(rec)
    status="EXACT_SEMANTIC_ONLY_SWAP" if semantic_only else ("FORMULATION_SWAP_ONLY_OR_ALSO" if any(r["semantic"].get("exact") for r in tested+controls) else "NO_SEMANTIC_SWAP_FOUND")
    if any(r["semantic"].get("reason")=="unknown" for r in tested) and status=="NO_SEMANTIC_SWAP_FOUND":status="INCONCLUSIVE"
    return {"name":name,"source":src,"raw":raw,"presolved":{"rows":int(lp.num_row_),"cols":int(lp.num_col_),"nonzeros":len(lp.a_matrix_.value_)},
            "candidate_groups":len(groups),"candidate_pairs":len(pairs),"pairs_tested":len(tested),
            "controls":controls,"semantic_only":semantic_only,"tested":tested,"status":status}

def main():
    results=[];errors=[]
    for name in TARGETS:
        try:
            r=inspect(name);results.append(r);print(name,r["status"],"semantic_only",len(r["semantic_only"]),flush=True)
        except Exception as e:
            errors.append({"name":name,"error":repr(e)});print(name,"ERROR",repr(e),flush=True)
    glass=next((r for r in results if r["name"]=="glass4"),None)
    control_ok=bool(glass and glass["controls"] and glass["controls"][0]["semantic"].get("exact"))
    out={"experiment":"miplib-semantic-transposition-0.2","date":"2026-10-06","highs_version":highspy.Highs().version(),
         "z3_version":z3.get_version_string(),"pair_cap":PAIR_CAP,"query_timeout_ms":CHECK_TIMEOUT_MS,
         "results":results,"errors":errors,"positive_control_pass":control_ok,
         "semantic_only_total":sum(len(r["semantic_only"]) for r in results),
         "disposition":"PASS" if control_ok and not errors else "FAIL"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# MIPLIB semantic transposition follow-up 0.2","",f"**Disposition:** {out['disposition']}",f"**Semantic-only exact swaps:** {out['semantic_only_total']}","",
           "| Instance | Candidate groups | Pairs tested | Semantic-only | Status |","| --- | ---: | ---: | ---: | --- |"]
    for r in results:lines.append(f"| {r['name']} | {r['candidate_groups']} | {r['pairs_tested']} | {len(r['semantic_only'])} | {r['status']} |")
    if errors:lines+=["","## Errors",""]+[f"- {x['name']}: {x['error']}" for x in errors]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"semantic_only_total":out["semantic_only_total"],"errors":errors},indent=2))
    if out["disposition"]!="PASS":raise SystemExit(1)

if __name__=="__main__":main()
