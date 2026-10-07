#!/usr/bin/env python3
import importlib.util, json, math, statistics, time
from pathlib import Path
from pyscipopt import Model

HERE=Path(__file__).resolve().parent
BASE_PATH=HERE/"run-n5-original-breaker-injection-0.6.py"
spec=importlib.util.spec_from_file_location("base",BASE_PATH)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)

OUT=Path("out/miplib-n5-orientation-1.3");OUT.mkdir(parents=True,exist_ok=True)
base.OUT=OUT;base.LIMIT=60.0
SEEDS=[67,68,69,70,71,72,73]
LIMIT=60.0
FORWARD=[("C0021","C0026"),("C0027","C0028")]
REVERSE=[("C0026","C0021"),("C0028","C0027")]

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def set_common(m,seed):
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    m.setRealParam("limits/time",LIMIT)

def solve(src,seed,pairs):
    t0=time.perf_counter();m=Model();m.hideOutput(True);m.readProblem(str(src));set_common(m,seed)
    if pairs:
        vd={str(v.name):v for v in m.getVars(transformed=False)}
        for k,(a,b) in enumerate(pairs):
            if a not in vd or b not in vd:raise RuntimeError(f"missing breaker variable {a}/{b}")
            m.addCons(vd[a]>=vd[b],name=f"IG_ORIENTATION_{k}")
    m.optimize();wall=time.perf_counter()-t0
    return {"status":str(m.getStatus()),"objective":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(xs):
    xs=[x for x in xs if x is not None];return statistics.median(xs) if xs else None

def compare(trials,key,front):
    paired=[t for t in trials if t["baseline"]["status"]=="optimal" and t[key]["status"]=="optimal"]
    for t in paired:
        a=t["baseline"]["objective"];b=t[key]["objective"]
        if a is None or b is None:raise RuntimeError("missing optimal objective")
        if abs(a-b)>1e-7*max(1.0,abs(a),abs(b)):raise RuntimeError(f"objective mismatch seed {t['seed']} {key}")
    e2e=[front+t[key]["wall_s"] for t in paired]
    base=[t["baseline"]["wall_s"] for t in paired]
    ratios=[b/a for a,b in zip(base,e2e) if a>0]
    wins=sum(b<a for a,b in zip(base,e2e))
    return {"paired_optimal":len(paired),"wins":wins,"losses":len(paired)-wins,
      "baseline_median_wall_s":med(base),"external_median_e2e_wall_s":med(e2e),
      "median_ratio":med(ratios),
      "directional_positive":bool(len(paired)>=5 and wins>=5 and med(ratios) is not None and med(ratios)<0.95),
      "median_nodes":med([t[key]["nodes"] for t in paired]),"median_lp":med([t[key]["lp_iterations"] for t in paired])}

def main():
    src,source=base.download()
    resid,tpairs,gate,front,gens,active,meta=base.frontend_and_mapping(src)
    if not gate["licensed"]:
        result={"experiment":"n5-original-breaker-orientation-1.3","status":"MAPPING_NOT_LICENSED","disposition":"PASS","mapping_gate":gate}
        (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n");print(json.dumps(result,indent=2));return
    if tpairs!=base.EXPECTED_TRANSFORMED or FORWARD!=base.EXPECTED_ORIGINAL:
        raise RuntimeError(f"certificate drift {tpairs}")

    trials=[]
    orders=[
      [("baseline",None),("forward",FORWARD),("reverse",REVERSE)],
      [("forward",FORWARD),("reverse",REVERSE),("baseline",None)],
      [("reverse",REVERSE),("baseline",None),("forward",FORWARD)],
    ]
    for seed in SEEDS:
        order=orders[seed%3];row={"seed":seed,"order":[x[0] for x in order]}
        for name,pairs in order:row[name]=solve(src,seed,pairs)
        trials.append(row)
        print(seed,row["order"],row["baseline"]["wall_s"],front["total_s"]+row["forward"]["wall_s"],front["total_s"]+row["reverse"]["wall_s"],flush=True)

    f=compare(trials,"forward",front["total_s"]);r=compare(trials,"reverse",front["total_s"])
    if f["directional_positive"] and r["directional_positive"]:cls="ORIENTATION_ROBUST"
    elif f["directional_positive"] or r["directional_positive"]:cls="ORIENTATION_SENSITIVE"
    else:cls="NO_ROBUST_GAIN"
    result={"experiment":"n5-original-breaker-orientation-1.3","date":"2026-10-06","source":source,
      "frontend":{"wall_s":front["total_s"],"stages":front,"generator_count":gens,"active_generator_count":active,"graph_meta":meta},
      "mapping_gate":gate,"trials":trials,"forward":f,"reverse":r,"classification":cls,"disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# n5-3 original-breaker orientation robustness 1.3","",f"**Classification:** {cls}",f"**Frontend:** {front['total_s']:.6f}s","",
      "| Seed | Order | Baseline wall | Forward e2e | Reverse e2e |",
      "| ---: | --- | ---: | ---: | ---: |"]
    for t in trials:
        lines.append(f"| {t['seed']} | {'/'.join(t['order'])} | {t['baseline']['wall_s']} | {front['total_s']+t['forward']['wall_s']} | {front['total_s']+t['reverse']['wall_s']} |")
    lines+=["","## Forward","",f"~~~json\n{json.dumps(f,indent=2)}\n~~~","","## Reverse","",f"~~~json\n{json.dumps(r,indent=2)}\n~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"classification":cls,"forward":f,"reverse":r},indent=2))

if __name__=="__main__":main()
