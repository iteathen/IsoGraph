#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from collections import Counter
from pathlib import Path
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-n5-scip-reentry-0.1");OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
LIMIT=15.0;SEEDS=[0,1,2,3,4]

def download():
    d=urllib.request.urlopen(URL,timeout=90).read();raw=gzip.decompress(d)
    p=OUT/"n5-3.mps";p.write_bytes(raw)
    return p,{"source_url":URL,"gzip_sha256":hashlib.sha256(d).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def model(path,seed=0,usesymmetry=None):
    m=Model();m.hideOutput(True);m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except:pass
    if usesymmetry is not None:m.setIntParam("misc/usesymmetry",int(usesymmetry))
    return m

def make_residual(src):
    m=model(src,0,0);t=time.perf_counter();m.presolve();wall=time.perf_counter()-t
    snap={"vars":int(m.getNVars(transformed=True)),"conss":int(m.getNConss(transformed=True)),
          "presolve_time_s":float(m.getPresolvingTime()),"wall_s":wall}
    p=OUT/"n5-3-scip-symoff-residual.mps";m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,snap

def presolve_snapshot(path,usesymmetry):
    m=model(path,0,usesymmetry);m.presolve()
    conss=m.getConss(transformed=True);handlers=Counter(c.getConshdlrName() for c in conss);names=[str(c.name) for c in conss]
    sym=[n for n in names if any(t in n.lower() for t in ("orbitope","sym","orbit","lex"))]
    return {"vars":int(m.getNVars(transformed=True)),"conss":int(m.getNConss(transformed=True)),
      "handlers":dict(sorted(handlers.items())),"symmetry_named_constraints":sym,"presolve_time_s":float(m.getPresolvingTime())}

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(path,seed,usesymmetry):
    m=model(path,seed,usesymmetry);m.setRealParam("limits/time",LIMIT)
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    return {"seed":seed,"status":str(m.getStatus()),"primal":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(v):
    v=[x for x in v if x is not None];return statistics.median(v) if v else None

def main():
    src,source=download();residual,stage1=make_residual(src)
    pd=presolve_snapshot(residual,None);po=presolve_snapshot(residual,0)
    trials=[]
    for seed in SEEDS:
        d=solve(residual,seed,None);o=solve(residual,seed,0);trials.append({"seed":seed,"default":d,"symmetry_off":o})
        print(seed,d["gap"],o["gap"],d["nodes"],o["nodes"],flush=True)
    summary={
      "default_median_gap":med([t["default"]["gap"] for t in trials]),
      "off_median_gap":med([t["symmetry_off"]["gap"] for t in trials]),
      "default_median_nodes":med([t["default"]["nodes"] for t in trials]),
      "off_median_nodes":med([t["symmetry_off"]["nodes"] for t in trials]),
      "default_median_lp":med([t["default"]["lp_iterations"] for t in trials]),
      "off_median_lp":med([t["symmetry_off"]["lp_iterations"] for t in trials]),
      "default_gap_wins":sum(1 for t in trials if t["default"]["gap"] is not None and t["symmetry_off"]["gap"] is not None and t["default"]["gap"]<t["symmetry_off"]["gap"]),
      "off_gap_wins":sum(1 for t in trials if t["default"]["gap"] is not None and t["symmetry_off"]["gap"] is not None and t["symmetry_off"]["gap"]<t["default"]["gap"]),
      "gap_ties":sum(1 for t in trials if t["default"]["gap"]==t["symmetry_off"]["gap"])
    }
    result={"experiment":"n5-3-scip-residual-reentry-0.1","date":"2026-10-06","source":source,
      "pyscipopt_version":pyscipopt.__version__,"stage1_symmetry_off_presolve":stage1,
      "reentry_presolve_default":pd,"reentry_presolve_symmetry_off":po,"trials":trials,"summary":summary,"disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# n5-3 SCIP residual re-entry control 0.1","",f"**Stage-1 residual:** {stage1['conss']} conss / {stage1['vars']} vars",
      f"**Fresh default presolve:** {pd['conss']} / {pd['vars']} ; symmetry-named={len(pd['symmetry_named_constraints'])}",
      f"**Fresh symmetry-off presolve:** {po['conss']} / {po['vars']}","",
      "| Seed | Default gap | Sym-off gap | Default nodes | Off nodes |",
      "| ---: | ---: | ---: | ---: | ---: |"]
    for t in trials:lines.append(f"| {t['seed']} | {t['default']['gap']} | {t['symmetry_off']['gap']} | {t['default']['nodes']} | {t['symmetry_off']['nodes']} |")
    lines += ["","~~~json",json.dumps(summary,indent=2),"~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"presolve_default":pd,"presolve_off":po,"summary":summary},indent=2))

if __name__=="__main__":main()
