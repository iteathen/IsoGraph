#!/usr/bin/env python3
import importlib.util
import json
import math
import statistics
import time
from pathlib import Path

import highspy
import numpy as np

HERE=Path(__file__).resolve().parent
BASE_PATH=HERE/"run-n5-original-breaker-injection-0.6.py"
spec=importlib.util.spec_from_file_location("n5_original_base",BASE_PATH)
base=importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

OUT=Path("out/miplib-n5-cross-solver-highs-1.0")
OUT.mkdir(parents=True,exist_ok=True)
base.OUT=OUT
base.LIMIT=30.0

SEEDS=[0,1,2,3,4]
LIMIT=30.0
PAIRS=[("C0021","C0026"),("C0027","C0028")]

def finite(x):
    try:
        x=float(x)
        return x if math.isfinite(x) else None
    except Exception:
        return None

def solve_highs(src,seed,with_breakers):
    t0=time.perf_counter()
    h=highspy.Highs()
    h.setOptionValue("output_flag",False)
    h.setOptionValue("threads",1)
    h.setOptionValue("parallel","off")
    h.setOptionValue("random_seed",int(seed))
    h.setOptionValue("presolve","on")
    h.setOptionValue("time_limit",LIMIT)
    h.setOptionValue("mip_rel_gap",0.0)
    if h.readModel(str(src))==highspy.HighsStatus.kError:
        raise RuntimeError("HiGHS read original failed")
    if with_breakers:
        for a,b in PAIRS:
            sa,ia=h.getColByName(a);sb,ib=h.getColByName(b)
            if sa!=highspy.HighsStatus.kOk or sb!=highspy.HighsStatus.kOk:
                raise RuntimeError(f"HiGHS original breaker var missing {a}/{b}")
            st=h.addRow(0.0,highspy.kHighsInf,2,
                        np.array([ia,ib],dtype=np.int32),
                        np.array([1.0,-1.0],dtype=np.double))
            if st==highspy.HighsStatus.kError:
                raise RuntimeError(f"HiGHS add breaker failed {a}/{b}")
    rs=h.run()
    wall=time.perf_counter()-t0
    if rs==highspy.HighsStatus.kError:
        raise RuntimeError("HiGHS solve failed")
    info=h.getInfo()
    return {
      "status":h.modelStatusToString(h.getModelStatus()),
      "objective":finite(info.objective_function_value),
      "dual":finite(info.mip_dual_bound),
      "gap":finite(info.mip_gap),
      "nodes":int(info.mip_node_count),
      "lp_iterations":int(info.simplex_iteration_count),
      "wall_s":wall,
      "added_breakers":2 if with_breakers else 0,
    }

def med(xs):
    xs=[x for x in xs if x is not None]
    return statistics.median(xs) if xs else None

def main():
    src,source=base.download()
    resid,tpairs,gate,front,gens,active,meta=base.frontend_and_mapping(src)
    if not gate["licensed"]:
        result={"experiment":"n5-cross-solver-highs-1.0","date":"2026-10-06","source":source,
                "mapping_gate":gate,"status":"MAPPING_NOT_LICENSED","disposition":"PASS"}
        (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
        (OUT/"SUMMARY.md").write_text("# n5-3 cross-solver HiGHS holdout 1.0\n\n**Status:** MAPPING_NOT_LICENSED\n")
        print(json.dumps(result,indent=2));return
    if tpairs!=base.EXPECTED_TRANSFORMED or PAIRS!=base.EXPECTED_ORIGINAL:
        raise RuntimeError(f"certificate drift {tpairs}")

    trials=[]
    for seed in SEEDS:
        if seed%2==0:
            a=solve_highs(src,seed,False);b=solve_highs(src,seed,True);order="baseline_first"
        else:
            b=solve_highs(src,seed,True);a=solve_highs(src,seed,False);order="ig_first"
        trials.append({"seed":seed,"order":order,"baseline":a,"ig":b,
                       "ig_end_to_end_wall_s":front["total_s"]+b["wall_s"]})
        print(seed,order,a["gap"],b["gap"],a["nodes"],b["nodes"],flush=True)

    optimal_pairs=[t for t in trials if t["baseline"]["status"]=="Optimal" and t["ig"]["status"]=="Optimal"]
    for t in optimal_pairs:
        if t["baseline"]["objective"] is not None and t["ig"]["objective"] is not None:
            if abs(t["baseline"]["objective"]-t["ig"]["objective"])>1e-7*max(1.0,abs(t["baseline"]["objective"])):
                raise RuntimeError(f"objective mismatch seed {t['seed']}")

    if len(optimal_pairs)>=3:
        metric="time_to_optimum"
        wins=sum(1 for t in optimal_pairs if t["ig_end_to_end_wall_s"]<t["baseline"]["wall_s"])
        base_med=med([t["baseline"]["wall_s"] for t in optimal_pairs])
        ig_med=med([t["ig_end_to_end_wall_s"] for t in optimal_pairs])
        directional=bool(wins>=3 and ig_med is not None and base_med is not None and ig_med<base_med)
    else:
        metric="final_gap"
        eligible=[t for t in trials if t["baseline"]["gap"] is not None and t["ig"]["gap"] is not None]
        wins=sum(1 for t in eligible if t["ig"]["gap"]<t["baseline"]["gap"])
        base_med=med([t["baseline"]["gap"] for t in eligible])
        ig_med=med([t["ig"]["gap"] for t in eligible])
        directional=bool(wins>=3 and ig_med is not None and base_med is not None and ig_med<base_med)

    summary={
      "metric":metric,
      "paired_optimal":len(optimal_pairs),
      "baseline_median_metric":base_med,
      "ig_median_metric":ig_med,
      "paired_wins":wins,
      "directional_cross_solver_positive":directional,
      "frontend_wall_s":front["total_s"],
      "baseline_median_gap":med([t["baseline"]["gap"] for t in trials]),
      "ig_median_gap":med([t["ig"]["gap"] for t in trials]),
      "baseline_median_nodes":med([t["baseline"]["nodes"] for t in trials]),
      "ig_median_nodes":med([t["ig"]["nodes"] for t in trials]),
      "baseline_median_lp":med([t["baseline"]["lp_iterations"] for t in trials]),
      "ig_median_lp":med([t["ig"]["lp_iterations"] for t in trials]),
    }
    result={
      "experiment":"n5-cross-solver-highs-1.0","date":"2026-10-06",
      "source":source,"highs_version":highspy.Highs().version(),"seeds":SEEDS,
      "mapping_gate":gate,
      "frontend":{"stages":front,"generator_count":gens,"active_generator_count":active,
                  "graph_meta":meta,"transformed_breakers":tpairs,"original_breakers":PAIRS},
      "trials":trials,"summary":summary,"status":"BENCHMARKED","disposition":"PASS"
    }
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=[
      "# n5-3 cross-solver HiGHS holdout 1.0","",
      f"**Directional cross-solver positive:** {directional}",
      f"**Metric:** {metric}",
      f"**Frontend:** {front['total_s']:.6f}s","",
      "| Seed | Order | Baseline status | IG status | Baseline gap | IG gap | Baseline nodes | IG nodes |",
      "| ---: | --- | --- | --- | ---: | ---: | ---: | ---: |",
    ]
    for t in trials:
        lines.append(f"| {t['seed']} | {t['order']} | {t['baseline']['status']} | {t['ig']['status']} | {t['baseline']['gap']} | {t['ig']['gap']} | {t['baseline']['nodes']} | {t['ig']['nodes']} |")
    lines+=["","## Summary","",f"~~~json\n{json.dumps(summary,indent=2)}\n~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"summary":summary},indent=2))

if __name__=="__main__":
    main()
