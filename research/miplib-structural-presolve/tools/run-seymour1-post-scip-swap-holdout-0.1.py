#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from collections import Counter
from pathlib import Path
import highspy, pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-seymour1-post-scip-swap-0.1"); OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/seymour1.mps.gz"
A="x858"; B="x867"; LIMIT=15.0; SEEDS=[0,1,2,3,4]

def fv(x):
    x=float(x); inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def download():
    data=urllib.request.urlopen(URL,timeout=90).read(); raw=gzip.decompress(data)
    p=OUT/"seymour1.mps"; p.write_bytes(raw)
    return p,{"source_url":URL,"gzip_sha256":hashlib.sha256(data).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def model(path,seed=0,presolve_rounds=None):
    m=Model();m.hideOutput(True);m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except:pass
    m.setIntParam("misc/usesymmetry",0)
    if presolve_rounds is not None:m.setIntParam("presolving/maxrounds",int(presolve_rounds))
    return m

def transform(src):
    m=model(src,0,None);m.presolve()
    snap={"vars":m.getNVars(transformed=True),"conss":m.getNConss(transformed=True),"presolve_time_s":m.getPresolvingTime()}
    p=OUT/"seymour1-scip-transformed.mps";m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,snap

def matrix_views(lp):
    n=int(lp.num_col_);m=int(lp.num_row_);rows=[{} for _ in range(m)];cols=[{} for _ in range(n)]
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

def rowsig(lp,row,i,sw=None):
    sw=sw or {}
    return (fv(lp.row_lower_[i]),fv(lp.row_upper_[i]),tuple(sorted((sw.get(j,j),fv(v)) for j,v in row.items())))

def certify(path):
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("read transformed")
    lp=h.getLp(); rows,cols=matrix_views(lp)
    names=[str(x) for x in lp.col_names_]; pos={n:i for i,n in enumerate(names)}
    if A not in pos or B not in pos:
        return lp,{"exact":False,"reason":"target_variable_missing","survival":{A:A in pos,B:B in pos}}
    a,b=pos[A],pos[B]
    if fv(lp.col_cost_[a])!=fv(lp.col_cost_[b]) or fv(lp.col_lower_[a])!=fv(lp.col_lower_[b]) or fv(lp.col_upper_[a])!=fv(lp.col_upper_[b]):
        return lp,{"exact":False,"reason":"column_attributes_differ","survival":{A:True,B:True}}
    ta=str(lp.integrality_[a]) if len(lp.integrality_) else "C";tb=str(lp.integrality_[b]) if len(lp.integrality_) else "C"
    if ta!=tb:return lp,{"exact":False,"reason":"integrality_differs","survival":{A:True,B:True}}
    touched=sorted(set(cols[a])|set(cols[b])); affected=[r for r in touched if fv(cols[a].get(r,0))!=fv(cols[b].get(r,0))]
    before=Counter(rowsig(lp,rows[r],r) for r in affected); sw={a:b,b:a}
    after=Counter(rowsig(lp,rows[r],r,sw) for r in affected)
    return lp,{"exact":before==after,"reason":None if before==after else "affected_row_multiset_mismatch",
      "survival":{A:True,B:True},"indices":[a,b],"affected_rows":len(affected),
      "affected_row_names":[str(lp.row_names_[r]) if len(lp.row_names_)>r else f"row#{r}" for r in affected[:40]],
      "cost":float(lp.col_cost_[a]),"lower":float(lp.col_lower_[a]),"upper":float(lp.col_upper_[a]),"integrality":ta}

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(path,seed,breaker):
    m=model(path,seed,0);m.setRealParam("limits/time",LIMIT)
    if breaker:
        vd={v.name:v for v in m.getVars(transformed=False)}
        if A not in vd or B not in vd:raise RuntimeError("breaker vars missing")
        m.addCons(vd[A]>=vd[B],name="IG_EXACT_SEYMOUR_SWAP_BREAKER")
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    return {"seed":seed,"status":str(m.getStatus()),"primal":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(vals):
    vals=[x for x in vals if x is not None];return statistics.median(vals) if vals else None

def main():
    src,source=download();trans,snap=transform(src);lp,cert=certify(trans)
    result={"experiment":"seymour1-post-scip-swap-holdout-0.1","date":"2026-10-06","source":source,
      "pyscipopt_version":pyscipopt.__version__,"scip_transformed":snap,
      "linearized_transformed":{"rows":int(lp.num_row_),"cols":int(lp.num_col_),"nonzeros":len(lp.a_matrix_.value_)},
      "certificate":cert}
    if not cert["exact"]:
        result.update({"status":"TARGET_SWAP_DID_NOT_SURVIVE","disposition":"PASS","trials":[]})
    else:
        trials=[]
        for seed in SEEDS:
            base=solve(trans,seed,False); br=solve(trans,seed,True);trials.append({"seed":seed,"baseline":base,"breaker":br})
            print(seed,base["gap"],br["gap"],base["nodes"],br["nodes"],flush=True)
        summary={
          "baseline_median_gap":med([t["baseline"]["gap"] for t in trials]),
          "breaker_median_gap":med([t["breaker"]["gap"] for t in trials]),
          "baseline_median_nodes":med([t["baseline"]["nodes"] for t in trials]),
          "breaker_median_nodes":med([t["breaker"]["nodes"] for t in trials]),
          "baseline_median_lp":med([t["baseline"]["lp_iterations"] for t in trials]),
          "breaker_median_lp":med([t["breaker"]["lp_iterations"] for t in trials]),
          "paired_gap_wins":sum(1 for t in trials if t["baseline"]["gap"] is not None and t["breaker"]["gap"] is not None and t["breaker"]["gap"]<t["baseline"]["gap"]),
          "paired_gap_losses":sum(1 for t in trials if t["baseline"]["gap"] is not None and t["breaker"]["gap"] is not None and t["breaker"]["gap"]>t["baseline"]["gap"]),
          "paired_gap_ties":sum(1 for t in trials if t["baseline"]["gap"]==t["breaker"]["gap"])
        }
        result.update({"status":"EXACT_POST_SCIP_SWAP","disposition":"PASS","trials":trials,"summary":summary})
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# seymour1 post-SCIP swap holdout 0.1","",f"**Status:** {result['status']}",f"**Exact certificate:** {cert['exact']}"]
    if cert["exact"]:
        lines += ["",f"**Affected transformed rows:** {cert['affected_rows']}","",
          "| Seed | Baseline gap | Breaker gap | Baseline nodes | Breaker nodes |",
          "| ---: | ---: | ---: | ---: | ---: |"]
        for t in result["trials"]:
            lines.append(f"| {t['seed']} | {t['baseline']['gap']} | {t['breaker']['gap']} | {t['baseline']['nodes']} | {t['breaker']['nodes']} |")
        lines += ["","~~~json",json.dumps(result["summary"],indent=2),"~~~"]
    else:lines += ["",f"Reason: {cert['reason']}"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"status":result["status"],"certificate":cert,"summary":result.get("summary")},indent=2))

if __name__=="__main__":main()
