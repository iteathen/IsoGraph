#!/usr/bin/env python3
import importlib.util, json, math, statistics, time
from pathlib import Path

from pyscipopt import Model

HERE=Path(__file__).resolve().parent

NSPEC=importlib.util.spec_from_file_location("neos117",HERE/"run-neos117-s30-holdout-0.1.py")
neos=importlib.util.module_from_spec(NSPEC);NSPEC.loader.exec_module(neos)

BSPEC=importlib.util.spec_from_file_location("base",HERE/"run-n5-original-breaker-injection-0.6.py")
base=importlib.util.module_from_spec(BSPEC);BSPEC.loader.exec_module(base)

OUT=Path("out/miplib-neos117-original-s30-0.2");OUT.mkdir(parents=True,exist_ok=True)
neos.OUT=OUT
SEEDS=[8,9,10,11,12]
LIMIT=60.0
ORIG=[f"C{i:04d}" for i in range(1,31)]
TRANS=[f"t_C{i:04d}" for i in range(1,31)]
BAD={"FIXED","AGGREGATED","MULTAGGR","NEGATED"}

def replay_factory(g,colors):
    es={tuple(sorted(e.tuple)) for e in g.es}
    ident=list(range(g.vcount()))
    def replay(g0,c,p):
        if len(p)!=g.vcount() or sorted(p)!=ident:raise RuntimeError("bad generator")
        for i,q in enumerate(p):
            if colors[i]!=colors[q]:raise RuntimeError("color mismatch")
        for u,v in es:
            a,b=p[u],p[v]
            if a>b:a,b=b,a
            if (a,b) not in es:raise RuntimeError("edge mismatch")
    return replay

def set_common(m,seed):
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    m.setRealParam("limits/time",LIMIT)

def frontend(src):
    t0=time.perf_counter();st={}
    m=Model();m.hideOutput(True);set_common(m,0);m.setIntParam("misc/usesymmetry",0);m.readProblem(str(src))
    orig={str(v.name):v for v in m.getVars(transformed=False)}
    for n in ORIG:
        if n not in orig:raise RuntimeError(f"missing original variable {n}")
    t=time.perf_counter();m.presolve();st["scip_presolve_s"]=time.perf_counter()-t
    active={str(v.name) for v in m.getVars(transformed=True)}
    gate={};licensed=True
    for oname in ORIG:
        ov=orig[oname];tv=m.getTransformedVar(ov)
        orec=base.var_record(ov);trec=base.var_record(tv)
        rec={
          "transformed_name":trec["name"],
          "expected_transformed_name":"t_"+oname,
          "active":trec["active"],
          "status":trec["status"],
          "type_match":orec["vtype"]==trec["vtype"],
          "bounds_match":bool(base.close(orec["lb_global"],trec["lb_global"]) and base.close(orec["ub_global"],trec["ub_global"]))
        }
        rec["licensed"]=bool(rec["transformed_name"]==rec["expected_transformed_name"] and rec["active"]
          and rec["status"] not in BAD and rec["type_match"] and rec["bounds_match"])
        licensed &= rec["licensed"];gate[oname]=rec

    resid=OUT/"neos117-stage1.mps"
    t=time.perf_counter();m.writeProblem(str(resid),trans=True,genericnames=False,verbose=False);st["scip_export_s"]=time.perf_counter()-t
    t=time.perf_counter();lp,linear=neos.load_lp(resid);st["highs_parse_s"]=time.perf_counter()-t
    t=time.perf_counter();g,colors,names,gmeta=neos.build_active(lp,active);st["active_graph_s"]=time.perf_counter()-t
    old=neos.replay;neos.replay=replay_factory(g,colors)
    try:
        t=time.perf_counter();group=neos.analyze(g,colors,names);st["group_analysis_s"]=time.perf_counter()-t
    finally:
        neos.replay=old
    st["total_s"]=time.perf_counter()-t0

    if not group["full_symmetric"]:raise RuntimeError(f"largest action not full symmetric: {group}")
    if group["largest_orbit"]["size"]!=30:raise RuntimeError(f"orbit size drift {group['largest_orbit']['size']}")
    if group["largest_orbit"]["names"]!=TRANS:raise RuntimeError(f"orbit names drift {group['largest_orbit']['names']}")
    if group["action_order"]!=str(math.factorial(30)):raise RuntimeError("group order drift")
    return {"licensed":licensed,"variables":gate},group,st,linear,gmeta

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(src,seed,chain):
    t0=time.perf_counter();m=Model();m.hideOutput(True);set_common(m,seed);m.readProblem(str(src))
    if chain:
        vd={str(v.name):v for v in m.getVars(transformed=False)}
        for i in range(len(ORIG)-1):
            a,b=ORIG[i],ORIG[i+1]
            m.addCons(vd[a]>=vd[b],name=f"IG_EXACT_ORIGINAL_S30_{i}")
    m.optimize();wall=time.perf_counter()-t0
    p=finite(m.getPrimalbound());d=finite(m.getDualbound())
    return {"status":str(m.getStatus()),"objective":p,"dual":d,"gap":finite(m.getGap()),
      "bound_width":None if p is None or d is None else abs(p-d),
      "nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(xs):
    xs=[x for x in xs if x is not None];return statistics.median(xs) if xs else None

def main():
    src,source=neos.download("neos-1171737")
    gate,group,front,linear,gmeta=frontend(src)
    if not gate["licensed"]:
        result={"experiment":"neos117-original-s30-0.2","date":"2026-10-06","mapping_gate":gate,
          "status":"MAPPING_NOT_LICENSED","disposition":"PASS"}
        (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
        (OUT/"SUMMARY.md").write_text("# neos-1171737 original S30 holdout 0.2\n\n**Status:** MAPPING_NOT_LICENSED\n")
        print(json.dumps(result,indent=2));return
    trials=[]
    for seed in SEEDS:
        if seed%2:
            b=solve(src,seed,True);a=solve(src,seed,False);order="ig_first"
        else:
            a=solve(src,seed,False);b=solve(src,seed,True);order="baseline_first"
        e2e=front["total_s"]+b["wall_s"]
        trials.append({"seed":seed,"order":order,"baseline":a,"ig":b,"ig_end_to_end_wall_s":e2e})
        print(seed,order,a["status"],b["status"],a["gap"],b["gap"],a["wall_s"],e2e,flush=True)

    paired=[t for t in trials if t["baseline"]["status"]=="optimal" and t["ig"]["status"]=="optimal"]
    for t in paired:
        if abs(t["baseline"]["objective"]-t["ig"]["objective"])>1e-7*max(1.0,abs(t["baseline"]["objective"])):
            raise RuntimeError(f"objective mismatch seed {t['seed']}")
    if len(paired)>=3:
        ratios=[t["ig_end_to_end_wall_s"]/t["baseline"]["wall_s"] for t in paired if t["baseline"]["wall_s"]>0]
        wins=sum(t["ig_end_to_end_wall_s"]<t["baseline"]["wall_s"] for t in paired)
        bm=med([t["baseline"]["wall_s"] for t in paired]);im=med([t["ig_end_to_end_wall_s"] for t in paired])
        metric="time_to_optimum";positive=bool(wins>=4 and med(ratios)<0.95)
    else:
        elig=[t for t in trials if t["baseline"]["gap"] is not None and t["ig"]["gap"] is not None]
        wins=sum(t["ig"]["gap"]<t["baseline"]["gap"] for t in elig)
        bm=med([t["baseline"]["gap"] for t in elig]);im=med([t["ig"]["gap"] for t in elig])
        ratios=[];metric="final_gap";positive=bool(wins>=4 and im is not None and bm is not None and im<bm)
    summary={"metric":metric,"paired_optimal":len(paired),"baseline_median_metric":bm,"ig_median_metric":im,
      "paired_wins":wins,"median_ratio":med(ratios) if ratios else None,"directional_positive":positive,
      "frontend_wall_s":front["total_s"],"baseline_median_nodes":med([t["baseline"]["nodes"] for t in trials]),
      "ig_median_nodes":med([t["ig"]["nodes"] for t in trials]),"baseline_median_lp":med([t["baseline"]["lp_iterations"] for t in trials]),
      "ig_median_lp":med([t["ig"]["lp_iterations"] for t in trials])}
    result={"experiment":"neos117-original-s30-0.2","date":"2026-10-06","source":source,"mapping_gate":gate,
      "group":group,"frontend":front,"linearized":linear,"active_graph":gmeta,"trials":trials,
      "summary":summary,"status":"BENCHMARKED","disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# neos-1171737 original-model S30 holdout 0.2","",f"**Directional positive:** {positive}",
      f"**Frontend:** {front['total_s']:.6f}s",f"**Exact orbit:** 30 variables, action order 30!","",
      "| Seed | Order | Baseline status | IG status | Baseline gap | IG gap | Baseline wall | IG end-to-end |",
      "| ---: | --- | --- | --- | ---: | ---: | ---: | ---: |"]
    for t in trials:lines.append(f"| {t['seed']} | {t['order']} | {t['baseline']['status']} | {t['ig']['status']} | {t['baseline']['gap']} | {t['ig']['gap']} | {t['baseline']['wall_s']} | {t['ig_end_to_end_wall_s']} |")
    lines+=["","~~~json",json.dumps(summary,indent=2),"~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"summary":summary,"frontend":front},indent=2))

if __name__=="__main__":main()
