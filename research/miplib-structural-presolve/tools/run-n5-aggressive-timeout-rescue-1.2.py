#!/usr/bin/env python3
import importlib.util
import json
import math
import statistics
import time
from pathlib import Path

from pyscipopt import Model

HERE=Path(__file__).resolve().parent
BASE_PATH=HERE/"run-n5-original-breaker-injection-0.6.py"
spec=importlib.util.spec_from_file_location("n5_original_base",BASE_PATH)
base=importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

OUT=Path("out/miplib-n5-aggressive-timeout-rescue-1.2")
OUT.mkdir(parents=True,exist_ok=True)
base.OUT=OUT
base.LIMIT=60.0

SEEDS=[60,61,62,63,64,65,66]
LIMIT=60.0
PAIRS=[("C0021","C0026"),("C0027","C0028")]

def finite(x):
    try:
        x=float(x)
        return x if math.isfinite(x) else None
    except Exception:
        return None

def configure(m,seed):
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    m.setRealParam("limits/time",LIMIT)
    m.setIntParam("misc/usesymmetry",5)
    m.setIntParam("propagating/symmetry/symtiming",2)
    m.setBoolParam("propagating/symmetry/addstrongsbcs",True)
    m.setBoolParam("propagating/symmetry/usedynamicprop",False)

def solve(src,seed,with_external):
    t0=time.perf_counter()
    m=Model();m.hideOutput(True);m.readProblem(str(src));configure(m,seed)
    if with_external:
        vd={str(v.name):v for v in m.getVars(transformed=False)}
        for k,(a,b) in enumerate(PAIRS):
            if a not in vd or b not in vd:
                raise RuntimeError(f"missing original breaker variable {a}/{b}")
            m.addCons(vd[a]>=vd[b],name=f"IG_EXACT_EXTERNAL_{k}")
    actual={
      "misc/usesymmetry":m.getParam("misc/usesymmetry"),
      "propagating/symmetry/symtiming":m.getParam("propagating/symmetry/symtiming"),
      "propagating/symmetry/addstrongsbcs":m.getParam("propagating/symmetry/addstrongsbcs"),
      "propagating/symmetry/usedynamicprop":m.getParam("propagating/symmetry/usedynamicprop"),
    }
    m.optimize();wall=time.perf_counter()-t0
    return {
      "status":str(m.getStatus()),
      "objective":finite(m.getPrimalbound()),
      "dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),
      "nodes":int(m.getNNodes()),
      "lp_iterations":int(m.getNLPIterations()),
      "wall_s":wall,
      "params":actual,
      "added_external_breakers":2 if with_external else 0,
    }

def med(xs):
    xs=[x for x in xs if x is not None]
    return statistics.median(xs) if xs else None

def main():
    src,source=base.download()
    resid,tpairs,gate,front,gens,active,meta=base.frontend_and_mapping(src)
    if not gate["licensed"]:
        result={"experiment":"n5-aggressive-timeout-rescue-1.2","date":"2026-10-06","source":source,
                "mapping_gate":gate,"status":"MAPPING_NOT_LICENSED","disposition":"PASS"}
        (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
        (OUT/"SUMMARY.md").write_text("# n5-3 aggressive + external complementarity 1.1\n\n**Status:** MAPPING_NOT_LICENSED\n")
        print(json.dumps(result,indent=2));return
    if tpairs!=base.EXPECTED_TRANSFORMED or PAIRS!=base.EXPECTED_ORIGINAL:
        raise RuntimeError(f"certificate drift {tpairs}")

    trials=[]
    for seed in SEEDS:
        if seed%2:
            b=solve(src,seed,True);a=solve(src,seed,False);order="external_first"
        else:
            a=solve(src,seed,False);b=solve(src,seed,True);order="aggressive_first"
        e2e=front["total_s"]+b["wall_s"]
        trials.append({"seed":seed,"order":order,"aggressive":a,"aggressive_plus_external":b,
                       "external_end_to_end_wall_s":e2e})
        print(seed,order,a["status"],b["status"],a["wall_s"],e2e,flush=True)

    paired=[t for t in trials if t["aggressive"]["status"]=="optimal" and t["aggressive_plus_external"]["status"]=="optimal"]
    for t in paired:
        oa=t["aggressive"]["objective"];ob=t["aggressive_plus_external"]["objective"]
        if oa is None or ob is None:raise RuntimeError(f"missing optimal objective seed {t['seed']}")
        if abs(oa-ob)>1e-7*max(1.0,abs(oa),abs(ob)):
            raise RuntimeError(f"objective mismatch seed {t['seed']}: {oa} {ob}")
    ratios=[t["external_end_to_end_wall_s"]/t["aggressive"]["wall_s"] for t in paired if t["aggressive"]["wall_s"]>0]
    aggressive_optimal=sum(1 for t in trials if t["aggressive"]["status"]=="optimal")
    external_optimal=sum(1 for t in trials if t["aggressive_plus_external"]["status"]=="optimal")
    summary={
      "aggressive_optimal_count":aggressive_optimal,
      "external_optimal_count":external_optimal,
      "optimal_count_delta":external_optimal-aggressive_optimal,
      "paired_both_optimal":len(paired),
      "aggressive_median_wall_s":med([t["aggressive"]["wall_s"] for t in paired]),
      "external_solver_median_wall_s":med([t["aggressive_plus_external"]["wall_s"] for t in paired]),
      "external_end_to_end_median_wall_s":med([t["external_end_to_end_wall_s"] for t in paired]),
      "median_external_over_aggressive_ratio":med(ratios),
      "external_end_to_end_wins":sum(1 for t in paired if t["external_end_to_end_wall_s"]<t["aggressive"]["wall_s"]),
      "external_end_to_end_losses":sum(1 for t in paired if t["external_end_to_end_wall_s"]>t["aggressive"]["wall_s"]),
      "frontend_wall_s":front["total_s"],
      "aggressive_median_nodes":med([t["aggressive"]["nodes"] for t in paired]),
      "external_median_nodes":med([t["aggressive_plus_external"]["nodes"] for t in paired]),
      "aggressive_median_lp":med([t["aggressive"]["lp_iterations"] for t in paired]),
      "external_median_lp":med([t["aggressive_plus_external"]["lp_iterations"] for t in paired]),
    }
    summary["timeout_rescue_confirmed"]=bool(
      external_optimal>=6 and (external_optimal-aggressive_optimal)>=2
    )

    result={
      "experiment":"n5-aggressive-timeout-rescue-1.2","date":"2026-10-06","source":source,
      "seeds":SEEDS,"mapping_gate":gate,
      "frontend":{"stages":front,"generator_count":gens,"active_generator_count":active,
                  "graph_meta":meta,"transformed_breakers":tpairs,"original_breakers":PAIRS},
      "trials":trials,"summary":summary,"status":"BENCHMARKED","disposition":"PASS"
    }
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=[
      "# n5-3 aggressive SCIP timeout-rescue holdout 1.2","",
      f"**Timeout-rescue confirmed:** {summary['timeout_rescue_confirmed']}",
      f"**Optimal solves:** aggressive {summary['aggressive_optimal_count']}/7 ; +external {summary['external_optimal_count']}/7",
      f"**Frontend:** {front['total_s']:.6f}s","",
      "| Seed | Order | Aggressive status | +external status | Aggressive wall | +external end-to-end |",
      "| ---: | --- | --- | --- | ---: | ---: |",
    ]
    for t in trials:
        lines.append(f"| {t['seed']} | {t['order']} | {t['aggressive']['status']} | {t['aggressive_plus_external']['status']} | {t['aggressive']['wall_s']} | {t['external_end_to_end_wall_s']} |")
    lines+=["","## Summary","",f"~~~json\n{json.dumps(summary,indent=2)}\n~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"summary":summary,"params":trials[0]["aggressive"]["params"]},indent=2))

if __name__=="__main__":
    main()
