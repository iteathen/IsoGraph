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

OUT=Path("out/miplib-n5-original-aggressive-scip-control-0.9")
OUT.mkdir(parents=True,exist_ok=True)
base.OUT=OUT
base.LIMIT=60.0

SEEDS=[48,49,50,51,52]
LIMIT=60.0
PAIRS=[("C0021","C0026"),("C0027","C0028")]
VARIANTS=["default","aggressive","ig"]

def finite(x):
    try:
        x=float(x)
        return x if math.isfinite(x) else None
    except Exception:
        return None

def configure_common(m,seed):
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    m.setRealParam("limits/time",LIMIT)

def set_aggressive(m):
    m.setIntParam("misc/usesymmetry",5)
    m.setIntParam("propagating/symmetry/symtiming",2)
    m.setBoolParam("propagating/symmetry/addstrongsbcs",True)
    m.setBoolParam("propagating/symmetry/usedynamicprop",False)

def params(m):
    names=[
      "misc/usesymmetry",
      "propagating/symmetry/symtiming",
      "propagating/symmetry/addstrongsbcs",
      "propagating/symmetry/usedynamicprop",
    ]
    out={}
    for name in names:
        try:out[name]=m.getParam(name)
        except Exception as e:out[name]=f"ERROR:{e!r}"
    return out

def solve(src,seed,variant):
    t0=time.perf_counter()
    m=Model();m.hideOutput(True);configure_common(m,seed);m.readProblem(str(src))
    if variant=="aggressive":
        set_aggressive(m)
    elif variant=="ig":
        vd={str(v.name):v for v in m.getVars(transformed=False)}
        for k,(a,b) in enumerate(PAIRS):
            if a not in vd or b not in vd:
                raise RuntimeError(f"original IG variable missing {a}/{b}")
            m.addCons(vd[a]>=vd[b],name=f"IG_EXACT_ORIGINAL_{k}")
    elif variant!="default":
        raise RuntimeError(variant)
    actual=params(m)
    m.optimize()
    wall=time.perf_counter()-t0
    return {
      "status":str(m.getStatus()),
      "objective":finite(m.getPrimalbound()),
      "dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),
      "nodes":int(m.getNNodes()),
      "lp_iterations":int(m.getNLPIterations()),
      "wall_s":wall,
      "params":actual,
    }

def med(xs):
    xs=[x for x in xs if x is not None]
    return statistics.median(xs) if xs else None

def main():
    src,source=base.download()
    resid,tpairs,gate,front,gens,active,meta=base.frontend_and_mapping(src)
    if not gate["licensed"]:
        result={
          "experiment":"n5-original-aggressive-scip-control-0.9",
          "date":"2026-10-06",
          "source":source,
          "mapping_gate":gate,
          "status":"MAPPING_NOT_LICENSED",
          "disposition":"PASS",
        }
        (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
        (OUT/"SUMMARY.md").write_text("# n5-3 original aggressive SCIP control 0.9\n\n**Status:** MAPPING_NOT_LICENSED\n")
        print(json.dumps(result,indent=2))
        return
    if tpairs!=base.EXPECTED_TRANSFORMED:
        raise RuntimeError(f"transformed breaker drift {tpairs}")
    if PAIRS!=base.EXPECTED_ORIGINAL:
        raise RuntimeError("original breaker constant drift")

    trials=[]
    orders=[
      ["default","aggressive","ig"],
      ["aggressive","ig","default"],
      ["ig","default","aggressive"],
    ]
    for idx,seed in enumerate(SEEDS):
        order=orders[idx%len(orders)]
        row={"seed":seed,"order":order}
        for v in order:
            row[v]=solve(src,seed,v)
        row["ig_end_to_end_wall_s"]=front["total_s"]+row["ig"]["wall_s"]
        trials.append(row)
        print(seed,order,row["default"]["wall_s"],row["aggressive"]["wall_s"],row["ig_end_to_end_wall_s"],flush=True)

    all_optimal=[]
    for t in trials:
        if all(t[v]["status"]=="optimal" for v in VARIANTS):
            all_optimal.append(t)
            objs=[t[v]["objective"] for v in VARIANTS]
            if any(x is None for x in objs):
                raise RuntimeError(f"missing optimal objective seed {t['seed']}")
            if max(objs)-min(objs)>1e-7*max(1.0,max(abs(x) for x in objs)):
                raise RuntimeError(f"objective mismatch seed {t['seed']}: {objs}")

    ratios=[t["ig_end_to_end_wall_s"]/t["aggressive"]["wall_s"] for t in all_optimal if t["aggressive"]["wall_s"]>0]
    summary={
      "paired_all_optimal":len(all_optimal),
      "default_median_wall_s":med([t["default"]["wall_s"] for t in all_optimal]),
      "aggressive_median_wall_s":med([t["aggressive"]["wall_s"] for t in all_optimal]),
      "ig_solver_median_wall_s":med([t["ig"]["wall_s"] for t in all_optimal]),
      "ig_end_to_end_median_wall_s":med([t["ig_end_to_end_wall_s"] for t in all_optimal]),
      "median_ig_over_aggressive_ratio":med(ratios),
      "ig_vs_aggressive_wins":sum(1 for t in all_optimal if t["ig_end_to_end_wall_s"]<t["aggressive"]["wall_s"]),
      "ig_vs_aggressive_losses":sum(1 for t in all_optimal if t["ig_end_to_end_wall_s"]>t["aggressive"]["wall_s"]),
      "ig_vs_default_wins":sum(1 for t in all_optimal if t["ig_end_to_end_wall_s"]<t["default"]["wall_s"]),
      "frontend_wall_s":front["total_s"],
      "default_median_nodes":med([t["default"]["nodes"] for t in all_optimal]),
      "aggressive_median_nodes":med([t["aggressive"]["nodes"] for t in all_optimal]),
      "ig_median_nodes":med([t["ig"]["nodes"] for t in all_optimal]),
    }
    summary["directional_seam_survives"]=bool(
      len(all_optimal)>=4
      and summary["ig_vs_aggressive_wins"]>=4
      and summary["median_ig_over_aggressive_ratio"] is not None
      and summary["median_ig_over_aggressive_ratio"]<0.95
    )

    result={
      "experiment":"n5-original-aggressive-scip-control-0.9",
      "date":"2026-10-06",
      "source":source,
      "seeds":SEEDS,
      "mapping_gate":gate,
      "frontend":{"stages":front,"generator_count":gens,"active_generator_count":active,"graph_meta":meta,
                  "transformed_breakers":tpairs,"original_breakers":PAIRS},
      "trials":trials,
      "summary":summary,
      "status":"BENCHMARKED",
      "disposition":"PASS",
    }
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=[
      "# n5-3 original-model aggressive SCIP control 0.9","",
      f"**Frontend:** {front['total_s']:.6f}s",
      f"**Directional seam survives:** {summary['directional_seam_survives']}","",
      "| Seed | Default wall | Aggressive wall | IG solver wall | IG end-to-end |",
      "| ---: | ---: | ---: | ---: | ---: |",
    ]
    for t in trials:
        lines.append(f"| {t['seed']} | {t['default']['wall_s']} | {t['aggressive']['wall_s']} | {t['ig']['wall_s']} | {t['ig_end_to_end_wall_s']} |")
    lines+=["","## Summary","",f"~~~json\n{json.dumps(summary,indent=2)}\n~~~","",
            "Actual SCIP parameter values are recorded per trial in RESULT.json."]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"summary":summary,"params":{v:trials[0][v]["params"] for v in VARIANTS}},indent=2))

if __name__=="__main__":
    main()
