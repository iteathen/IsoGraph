#!/usr/bin/env python3
import gzip, hashlib, json, math, time, urllib.request
from collections import Counter
from pathlib import Path
import highspy
import numpy as np

OUT=Path("out/miplib-recurrence-0.2")
OUT.mkdir(parents=True,exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"
INSTANCES=[
 "glass4",
 "50v-10","reblock115","ran14x18-disj-8","gen-ip002","gen-ip054",
 "ic97_potential","pk1","n5-3","neos859080","neos-911970",
 "seymour1","p200x1188c","b1c1s1","markshare2","mas74",
 "exp-1-500-5-5","markshare_4_0","qap10","cost266-UUE","mas76"
]
ROUNDS=6
MAX_PAIR_CHECKS=50000
MAX_CERTS=64
BENCH_LIMIT=10.0

def close(a,b,tol=1e-9):
    a=float(a); b=float(b); inf=highspy.kHighsInf
    if abs(a)>=0.5*inf or abs(b)>=0.5*inf:
        return (a>=0.5*inf and b>=0.5*inf) or (a<=-0.5*inf and b<=-0.5*inf)
    return abs(a-b)<=tol*max(1.0,abs(a),abs(b))

def fv(x):
    x=float(x); inf=highspy.kHighsInf
    if x>=0.5*inf: return "+INF"
    if x<=-0.5*inf: return "-INF"
    if abs(x)<1e-13: x=0.0
    return format(x,".12g")

def configure(h,presolve="on",limit=None):
    h.setOptionValue("output_flag",False)
    h.setOptionValue("threads",1)
    h.setOptionValue("parallel","off")
    h.setOptionValue("random_seed",0)
    h.setOptionValue("presolve",presolve)
    h.setOptionValue("mip_rel_gap",0.0)
    if limit is not None: h.setOptionValue("time_limit",float(limit))

def download(name):
    u=f"{BASE}/{name}.mps.gz"
    data=urllib.request.urlopen(u,timeout=90).read()
    raw=gzip.decompress(data)
    p=OUT/f"{name}.mps"; p.write_bytes(raw)
    return p,{"source_url":u,"gzip_sha256":hashlib.sha256(data).hexdigest(),
      "mps_sha256":hashlib.sha256(raw).hexdigest(),"gzip_bytes":len(data),"mps_bytes":len(raw)}

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
    else: raise RuntimeError(f"matrix format {lp.a_matrix_.format_}")
    return rows,cols

def compress(xs):
    d={}; out=[]
    for x in xs:
        if x not in d: d[x]=len(d)
        out.append(d[x])
    return out

def refinement(lp,rows,cols):
    n=int(lp.num_col_); m=int(lp.num_row_)
    vb=[(fv(lp.col_cost_[j]),fv(lp.col_lower_[j]),fv(lp.col_upper_[j]),
         str(lp.integrality_[j]) if len(lp.integrality_)>j else "C") for j in range(n)]
    rb=[(fv(lp.row_lower_[i]),fv(lp.row_upper_[i])) for i in range(m)]
    vc=compress(vb); rc=compress(rb)
    for _ in range(ROUNDS):
        rs=[(rb[i],tuple(sorted((fv(a),vc[j]) for j,a in rows[i].items()))) for i in range(m)]
        rc2=compress(rs)
        vs=[(vb[j],tuple(sorted((fv(a),rc2[i]) for i,a in cols[j].items()))) for j in range(n)]
        vc2=compress(vs)
        vc,rc=vc2,rc2
    groups={}
    for j,c in enumerate(vc): groups.setdefault(c,[]).append(j)
    vclasses=[g for g in groups.values() if len(g)>1]
    vclasses.sort(key=lambda g:(-len(g),tuple(g)))
    return vclasses

def row_sig(lp,entries,row_index,swap=None):
    sw=swap or {}
    terms=tuple(sorted((sw.get(j,j),fv(v)) for j,v in entries.items()))
    return (fv(lp.row_lower_[row_index]),fv(lp.row_upper_[row_index]),terms)

def exact_general_swap(lp,rows,cols,a,b):
    if not close(lp.col_cost_[a],lp.col_cost_[b]): return None
    if not close(lp.col_lower_[a],lp.col_lower_[b]) or not close(lp.col_upper_[a],lp.col_upper_[b]): return None
    ta=str(lp.integrality_[a]) if len(lp.integrality_)>a else "C"
    tb=str(lp.integrality_[b]) if len(lp.integrality_)>b else "C"
    if ta!=tb: return None
    touched=sorted(set(cols[a])|set(cols[b]))
    affected=[r for r in touched if not close(cols[a].get(r,0.0),cols[b].get(r,0.0))]
    if not affected:
        # identical columns should normally be handled by presolve; preserve as a valid but trivial symmetry.
        return {"cols":[a,b],"affected_rows":[],"induced_row_permutation_size":0,"identical_columns":True}
    before=Counter(row_sig(lp,rows[r],r) for r in affected)
    sw={a:b,b:a}
    after=Counter(row_sig(lp,rows[r],r,sw) for r in affected)
    if before!=after: return None
    return {"cols":[a,b],"affected_rows":affected,
      "induced_row_permutation_size":len(affected),"identical_columns":False}

def name_col(lp,j):
    return str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}"
def name_row(lp,i):
    return str(lp.row_names_[i]) if len(lp.row_names_)>i and lp.row_names_[i] else f"row#{i}"

def finite(x):
    try:
        x=float(x)
        return x if math.isfinite(x) else None
    except: return None

def solve(lp,pair=None):
    h=highspy.Highs(); configure(h,"off",BENCH_LIMIT)
    if h.passModel(lp)==highspy.HighsStatus.kError: raise RuntimeError("passModel")
    if pair is not None:
        a,b=pair
        st=h.addRow(0.0,highspy.kHighsInf,2,
                    np.array([a,b],dtype=np.int32),
                    np.array([1.0,-1.0],dtype=np.double))
        if st==highspy.HighsStatus.kError: raise RuntimeError("addRow")
    t=time.perf_counter(); rs=h.run(); wall=time.perf_counter()-t
    if rs==highspy.HighsStatus.kError: raise RuntimeError("run")
    ms=h.getModelStatus(); info=h.getInfo()
    return {"status":h.modelStatusToString(ms),"optimal":ms==highspy.HighsModelStatus.kOptimal,
      "objective":finite(info.objective_function_value),"dual_bound":finite(info.mip_dual_bound),
      "gap":finite(info.mip_gap),"nodes":int(info.mip_node_count),"lp_iterations":int(info.simplex_iteration_count),
      "wall_runtime_s":wall}

def inspect(name):
    p,source=download(name)
    h=highspy.Highs(); configure(h)
    if h.readModel(str(p))==highspy.HighsStatus.kError: raise RuntimeError("readModel")
    raw={"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}
    if h.presolve()==highspy.HighsStatus.kError: raise RuntimeError("presolve")
    lp=h.getPresolvedLp()
    dims={"rows":int(lp.num_row_),"cols":int(lp.num_col_),"nonzeros":len(lp.a_matrix_.value_)}
    if dims["rows"]==0 or dims["cols"]==0:
        return {"name":name,"source":source,"raw":raw,"presolved":dims,
                "candidate_classes":0,"candidate_members":0,"pair_checks":0,
                "truncated":False,"exact_swaps":[],"benchmark":None,"signal":"NO_SIGNAL"}
    rows,cols=matrix_views(lp)
    classes=refinement(lp,rows,cols)
    checks=0; truncated=False; certs=[]
    for g in classes:
        for x in range(len(g)):
            for y in range(x+1,len(g)):
                if checks>=MAX_PAIR_CHECKS or len(certs)>=MAX_CERTS:
                    truncated=True; break
                checks+=1
                c=exact_general_swap(lp,rows,cols,g[x],g[y])
                if c is None: continue
                c["col_names"]=[name_col(lp,c["cols"][0]),name_col(lp,c["cols"][1])]
                c["affected_row_names"]=[name_row(lp,r) for r in c["affected_rows"][:40]]
                certs.append(c)
            if truncated: break
        if truncated: break
    bench=None
    if certs:
        chosen=sorted(certs,key=lambda c:tuple(c["col_names"]))[0]
        base=solve(lp,None); broken=solve(lp,tuple(chosen["cols"]))
        mismatch=False
        if base["optimal"] and broken["optimal"] and base["objective"] is not None and broken["objective"] is not None:
            mismatch=not close(base["objective"],broken["objective"],tol=1e-8)
        bench={"chosen_pair":chosen["col_names"],"baseline":base,"symmetry_broken":broken,
               "optimal_objective_mismatch":mismatch}
        if mismatch: raise RuntimeError("optimal objective mismatch under exact swap breaker")
    signal="EXACT_GENERAL_SWAP" if certs else ("LEAD_ONLY" if classes else "NO_SIGNAL")
    return {"name":name,"source":source,"raw":raw,"presolved":dims,
      "candidate_classes":len(classes),"candidate_members":sum(map(len,classes)),
      "largest_candidate_sizes":[len(g) for g in classes[:10]],"pair_checks":checks,
      "truncated":truncated,"exact_swaps":certs,"benchmark":bench,"signal":signal}

def main():
    results=[]; errors=[]
    for name in INSTANCES:
        try:
            r=inspect(name); results.append(r)
            print(name,r["signal"],"classes",r["candidate_classes"],"swaps",len(r["exact_swaps"]),flush=True)
        except Exception as e:
            errors.append({"name":name,"error":repr(e)}); print(name,"ERROR",repr(e),flush=True)
    counts={"EXACT_GENERAL_SWAP":0,"LEAD_ONLY":0,"NO_SIGNAL":0}
    for r in results: counts[r["signal"]]+=1
    positive_control=next((r for r in results if r["name"]=="glass4"),None)
    pc_ok=positive_control is not None and len(positive_control["exact_swaps"])>0
    out={"experiment":"miplib-recurrence-general-swap-0.2","date":"2026-10-06",
      "highs_version":highspy.Highs().version(),"instances":INSTANCES,
      "positive_control":"glass4","positive_control_pass":pc_ok,
      "profile":{"refinement_rounds":ROUNDS,"max_pair_checks":MAX_PAIR_CHECKS,
        "exact_test":"two-variable swap plus arbitrary affected-row multiset permutation",
        "timing":"10 second presolve-off baseline and exact symmetry breaker on lexicographically first positive pair"},
      "results":results,"errors":errors,"counts":counts,
      "disposition":"PASS" if len(results)==len(INSTANCES) and not errors and pc_ok else "FAIL"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# MIPLIB recurrence 0.2 — general exact swap","",f"**Disposition:** {out['disposition']}",
      f"**Positive control glass4:** {'PASS' if pc_ok else 'FAIL'}","",
      "| Instance | Post-HiGHS | Candidate classes | Exact swaps | Signal |",
      "| --- | ---: | ---: | ---: | --- |"]
    for r in results:
        lines.append(f"| {r['name']} | {r['presolved']['rows']}x{r['presolved']['cols']} | {r['candidate_classes']} | {len(r['exact_swaps'])} | {r['signal']} |")
    lines += ["","## Counts","",f"~~~json\n{json.dumps(counts,indent=2)}\n~~~","",
      "Exact positives received a directional 10-second baseline vs symmetry-breaker comparison; those timings do not qualify performance."]
    if errors: lines += ["","## Errors",""]+[f"- {e['name']}: {e['error']}" for e in errors]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"positive_control_pass":pc_ok,"counts":counts,"errors":errors},indent=2))
    if out["disposition"]!="PASS": raise SystemExit(1)

if __name__=="__main__": main()
