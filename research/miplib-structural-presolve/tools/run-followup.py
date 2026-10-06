#!/usr/bin/env python3
import gzip, hashlib, json, math, os, time, urllib.request
from pathlib import Path
import numpy as np
import highspy

OUT=Path("out/miplib-structural-presolve-followup")
OUT.mkdir(parents=True, exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/glass4.mps.gz"
A="z1&3.4"; B="z1&3.8"; RA="id60"; RB="id70"; ONEHOT="id73"
LIMIT=30.0

def download():
    gz=urllib.request.urlopen(URL, timeout=60).read()
    mps=gzip.decompress(gz)
    p=OUT/"glass4.mps"; p.write_bytes(mps)
    return p, hashlib.sha256(gz).hexdigest(), hashlib.sha256(mps).hexdigest()

def configure(h,presolve):
    h.setOptionValue("output_flag", False)
    h.setOptionValue("threads",1)
    h.setOptionValue("parallel","off")
    h.setOptionValue("random_seed",0)
    h.setOptionValue("presolve",presolve)
    h.setOptionValue("time_limit",LIMIT)
    h.setOptionValue("mip_rel_gap",0.0)

def load_presolved(path):
    h=highspy.Highs(); configure(h,"on")
    assert h.readModel(str(path))==highspy.HighsStatus.kOk
    original={"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}
    ps=h.presolve()
    if ps!=highspy.HighsStatus.kOk: raise RuntimeError(f"presolve {ps}")
    lp=h.getPresolvedLp()
    return lp, original

def pass_lp(lp,presolve="off"):
    h=highspy.Highs(); configure(h,presolve)
    st=h.passModel(lp)
    if st!=highspy.HighsStatus.kOk: raise RuntimeError(f"passModel {st}")
    return h

def idx(h,name,kind):
    st,i=(h.getColByName(name) if kind=="col" else h.getRowByName(name))
    if st!=highspy.HighsStatus.kOk or i<0: raise RuntimeError(f"missing {kind} {name}: {st} {i}")
    return int(i)

def row_entries(h,r):
    st,inds,vals=h.getRowEntries(r)
    if st!=highspy.HighsStatus.kOk: raise RuntimeError(f"row entries {r}: {st}")
    return {int(i):float(v) for i,v in zip(inds,vals)}

def close(a,b,tol=1e-9):
    if math.isinf(a) or math.isinf(b): return a==b
    return abs(a-b)<=tol*max(1.0,abs(a),abs(b))

def automorphism_certificate(lp):
    h=pass_lp(lp)
    ca,cb=idx(h,A,"col"),idx(h,B,"col")
    ra,rb=idx(h,RA,"row"),idx(h,RB,"row")
    r1=idx(h,ONEHOT,"row")
    lp0=h.getLp()
    row_perm={ra:rb,rb:ra}; col_perm={ca:cb,cb:ca}
    problems=[]
    for r in range(h.getNumRow()):
        pr=row_perm.get(r,r)
        st1,l1,u1,n1=h.getRow(r); st2,l2,u2,n2=h.getRow(pr)
        if not (close(l1,l2) and close(u1,u2)): problems.append(["row_bounds",r,pr,l1,u1,l2,u2])
        x={col_perm.get(c,c):v for c,v in row_entries(h,r).items()}
        y=row_entries(h,pr)
        if x.keys()!=y.keys() or any(not close(x[k],y[k]) for k in x): problems.append(["row_matrix",r,pr])
    for c in range(h.getNumCol()):
        pc=col_perm.get(c,c)
        st1,cost1,l1,u1,n1=h.getCol(c); st2,cost2,l2,u2,n2=h.getCol(pc)
        if not (close(cost1,cost2) and close(l1,l2) and close(u1,u2)):
            problems.append(["col_data",c,pc,cost1,l1,u1,cost2,l2,u2])
        ints=lp0.integrality_
        if len(ints) and ints[c]!=ints[pc]: problems.append(["integrality",c,pc,str(ints[c]),str(ints[pc])])
    # At-most-one witness: equality/upper row with positive equal coefficients,
    # all participating columns nonnegative, and upper bound <= coefficient.
    st,lo,up,n=h.getRow(r1)
    e=row_entries(h,r1)
    onehot_ok=ca in e and cb in e and close(e[ca],e[cb]) and e[ca]>0 and up<=e[ca]+1e-9
    for c,v in e.items():
        st,cost,lb,ub,nnz=h.getCol(c)
        if v<0 or lb< -1e-9: onehot_ok=False
    # Private-row implication after B=0.
    sta,la,ua,na=h.getRow(ra); stb,lb,ub,nb=h.getRow(rb)
    ea=row_entries(h,ra); eb=row_entries(h,rb)
    common_a={c:v for c,v in ea.items() if c!=ca}
    common_b={c:v for c,v in eb.items() if c!=cb}
    stc,cost,cla,cua,nnz=h.getCol(ca)
    private_implied=(common_a.keys()==common_b.keys()
      and all(close(common_a[c],common_b[c]) for c in common_a)
      and close(la,lb) and math.isinf(ua) and math.isinf(ub)
      and ca in ea and cb in eb and close(ea[ca],eb[cb]) and ea[ca]<=0 and cla>=-1e-9)
    return {
      "valid":len(problems)==0,
      "problems":problems[:20],
      "swap":{"cols":[A,B],"rows":[RA,RB],"col_indices":[ca,cb],"row_indices":[ra,rb]},
      "onehot_at_most_one":onehot_ok,
      "onehot_row":ONEHOT,
      "private_row_implied_after_representative_fix":private_implied,
      "representative_fix_objective_preserving":len(problems)==0 and onehot_ok,
      "quotient_licensed":len(problems)==0 and onehot_ok and private_implied,
    }

def solve(h):
    t=time.perf_counter(); h.run(); wall=time.perf_counter()-t
    st=h.getModelStatus(); info=h.getInfo()
    return {
      "status":h.modelStatusToString(st),
      "objective":float(info.objective_function_value) if math.isfinite(info.objective_function_value) else None,
      "dual_bound":float(info.mip_dual_bound) if math.isfinite(info.mip_dual_bound) else None,
      "gap":float(info.mip_gap) if math.isfinite(info.mip_gap) else None,
      "nodes":int(info.mip_node_count),
      "lp_iterations":int(info.simplex_iteration_count),
      "highs_runtime_s":float(h.getRunTime()),
      "wall_runtime_s":wall,
      "dimensions":{"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()},
    }

def quotient(lp, cert):
    if not cert["quotient_licensed"]: raise RuntimeError("quotient not licensed")
    h=pass_lp(lp)
    ca,cb=cert["swap"]["col_indices"]; ra,rb=cert["swap"]["row_indices"]
    # Exact objective-preserving representative choice under swap automorphism + at-most-one.
    assert h.changeColBounds(cb,0.0,0.0)==highspy.HighsStatus.kOk
    # With B=0, RB becomes common >= L and is implied by RA because its private
    # coefficient is nonpositive and A is nonnegative.
    assert h.deleteRows(1,np.array([rb],dtype=np.int32))==highspy.HighsStatus.kOk
    assert h.deleteCols(1,np.array([cb],dtype=np.int32))==highspy.HighsStatus.kOk
    return h

path,gzsha,mpssha=download()
lp,orig=load_presolved(path)
base_model=pass_lp(lp,"off")
presolved={"rows":base_model.getNumRow(),"cols":base_model.getNumCol(),"nonzeros":base_model.getNumNz()}
cert=automorphism_certificate(lp)
baseline=solve(pass_lp(lp,"off"))
qh=quotient(lp,cert)
quot_dims={"rows":qh.getNumRow(),"cols":qh.getNumCol(),"nonzeros":qh.getNumNz()}
quotient_off=solve(qh)
# Also test the practical composition where the incumbent gets another presolve pass
# after the structural quotient unlocks a smaller model.
qh2=quotient(lp,cert)
qh2.setOptionValue("presolve","on")
quotient_on=solve(qh2)
result={
  "experiment":"miplib-structural-presolve-followup-0.2",
  "instance":"glass4",
  "source_url":URL,
  "download_sha256":gzsha,
  "mps_sha256":mpssha,
  "highs_version":highspy.Highs().version(),
  "original_dimensions":orig,
  "presolved_dimensions":presolved,
  "certificate":cert,
  "quotient_dimensions":quot_dims,
  "baseline_residual":baseline,
  "quotient_residual_presolve_off":quotient_off,
  "quotient_residual_presolve_on":quotient_on,
  "interpretation":{
    "exact_post_presolve_reduction":cert["quotient_licensed"] and quot_dims["cols"]==presolved["cols"]-1 and quot_dims["rows"]==presolved["rows"]-1,
    "claim":"The quotient preserves the optimal objective by exact swap automorphism plus an at-most-one representative argument; it does not preserve every raw feasible assignment.",
    "runtime_status":"DIRECTIONAL_PROTOTYPE_ONLY"
  }
}
result["disposition"]="PASS" if result["interpretation"]["exact_post_presolve_reduction"] else "FAIL"
(OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
summary=f"""# MIPLIB structural presolve follow-up 0.2

- disposition: {result['disposition']}
- exact swap automorphism: {cert['valid']}
- at-most-one witness: {cert['onehot_at_most_one']}
- private row implied after representative fix: {cert['private_row_implied_after_representative_fix']}
- dimensions: {presolved['rows']}x{presolved['cols']} -> {quot_dims['rows']}x{quot_dims['cols']}
- baseline 30 s: status={baseline['status']}, incumbent={baseline['objective']}, bound={baseline['dual_bound']}, nodes={baseline['nodes']}
- quotient 30 s, presolve off: status={quotient_off['status']}, incumbent={quotient_off['objective']}, bound={quotient_off['dual_bound']}, nodes={quotient_off['nodes']}
- quotient 30 s, presolve on: status={quotient_on['status']}, incumbent={quotient_on['objective']}, bound={quotient_on['dual_bound']}, nodes={quotient_on['nodes']}

The exact claim is structural/objective-preservation. Runtime measurements are directional only.
"""
(OUT/"SUMMARY.md").write_text(summary)
print(json.dumps(result,indent=2))
if result["disposition"]!="PASS": raise SystemExit(1)
