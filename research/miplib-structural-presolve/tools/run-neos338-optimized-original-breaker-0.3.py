#!/usr/bin/env python3
import gzip
import hashlib
import importlib.util
import json
import math
import statistics
import time
import urllib.request
from pathlib import Path

import highspy
import igraph as ig
from pyscipopt import Model

HERE=Path(__file__).resolve().parent
BASE_PATH=HERE/"run-n5-original-breaker-injection-0.6.py"
spec=importlib.util.spec_from_file_location("struct_base",BASE_PATH)
base=importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

OUT=Path("out/miplib-neos338-optimized-original-breaker-0.3")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/neos-3381206-awhea.mps.gz"
SEEDS=[8,9,10,11,12]
LIMIT=30.0
EXPECTED_T=("t_C0001","t_C0002")
EXPECTED_O=("C0001","C0002")
BAD_STATUSES={"FIXED","AGGREGATED","MULTAGGR","NEGATED"}

def download():
    d=urllib.request.urlopen(URL,timeout=120).read();raw=gzip.decompress(d)
    p=OUT/"neos-3381206-awhea.mps";p.write_bytes(raw)
    return p,{"source_url":URL,"gzip_sha256":hashlib.sha256(d).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def set_common(m,seed):
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    m.setRealParam("limits/time",LIMIT)

def select_single(gens,names,g,colors):
    n=len(names);candidates=[];active=0
    eset={tuple(sorted(e.tuple)) for e in g.es}
    identity=list(range(g.vcount()))
    for gi,p in enumerate(gens):
        if len(p)!=g.vcount() or sorted(p)!=identity:raise RuntimeError("bad generator")
        for i,q in enumerate(p):
            if colors[i]!=colors[q]:raise RuntimeError("color mismatch")
        for u,v in eset:
            a,b=p[u],p[v]
            if a>b:a,b=b,a
            if (a,b) not in eset:raise RuntimeError("edge mismatch")
        moved=[j for j in range(n) if p[j]!=j]
        if not moved:continue
        if any(p[j]>=n for j in moved):raise RuntimeError("variable partition violation")
        active+=1
        ordered=sorted((names[j],j) for j in moved)
        an,a=ordered[0];b=p[a];bn=names[b]
        candidates.append((an,bn,gi,a,b,len(moved)))
    if not candidates:raise RuntimeError("no active-moving exact generator")
    candidates.sort()
    an,bn,gi,a,b,count=candidates[0]
    return {"a_name":an,"b_name":bn,"a_index":a,"b_index":b,"generator_index":gi,
            "active_moved_variables":count,"active_generator_count":active}

def frontend_and_mapping(src):
    t0=time.perf_counter();st={}
    m=Model();m.hideOutput(True);set_common(m,0);m.setIntParam("misc/usesymmetry",0);m.readProblem(str(src))
    orig={str(v.name):v for v in m.getVars(transformed=False)}
    for n in EXPECTED_O:
        if n not in orig:raise RuntimeError(f"original var missing {n}")
    t=time.perf_counter();m.presolve();st["scip_presolve_s"]=time.perf_counter()-t

    mapping={};licensed=True
    for oname in EXPECTED_O:
        ov=orig[oname];tv=m.getTransformedVar(ov)
        rec={"original":base.var_record(ov),"transformed":base.var_record(tv),
             "expected_transformed_name":"t_"+oname}
        rec["name_match"]=rec["transformed"]["name"]==rec["expected_transformed_name"]
        rec["status_acceptable"]=rec["transformed"]["status"] not in BAD_STATUSES
        rec["domain_match"]=(rec["original"]["vtype"]==rec["transformed"]["vtype"]
                             and base.close(rec["original"]["lb_global"],rec["transformed"]["lb_global"])
                             and base.close(rec["original"]["ub_global"],rec["transformed"]["ub_global"]))
        rec["licensed"]=bool(rec["name_match"] and rec["transformed"]["active"] and rec["status_acceptable"] and rec["domain_match"])
        licensed &= rec["licensed"];mapping[oname]=rec

    active_names={str(v.name) for v in m.getVars(transformed=True)}
    resid=OUT/"neos338-stage1.mps"
    t=time.perf_counter();m.writeProblem(str(resid),trans=True,genericnames=False,verbose=False);st["scip_export_s"]=time.perf_counter()-t
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    t=time.perf_counter()
    if h.readModel(str(resid))==highspy.HighsStatus.kError:raise RuntimeError("HiGHS residual read failed")
    st["highs_parse_s"]=time.perf_counter()-t;lp=h.getLp()
    t=time.perf_counter();rows,cols=base.matrix_views(lp);st["sparse_materialize_s"]=time.perf_counter()-t
    t=time.perf_counter();names,colors,edges,meta=base.build_bulk(lp,rows,cols,active_names);st["bulk_graph_data_s"]=time.perf_counter()-t
    t=time.perf_counter();g=ig.Graph(n=len(colors),edges=edges,directed=False);st["igraph_construct_s"]=time.perf_counter()-t
    t=time.perf_counter();gens=g.automorphism_group(sh="fl",color=colors);st["bliss_s"]=time.perf_counter()-t
    t=time.perf_counter();chosen=select_single(gens,names,g,colors);st["replay_select_s"]=time.perf_counter()-t
    st["total_s"]=time.perf_counter()-t0
    if (chosen["a_name"],chosen["b_name"])!=EXPECTED_T:
        raise RuntimeError(f"exact breaker drift {(chosen['a_name'],chosen['b_name'])}")
    return resid,{"licensed":licensed,"mapping":mapping},chosen,st,len(gens),meta

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(src,seed,with_breaker):
    t0=time.perf_counter();m=Model();m.hideOutput(True);set_common(m,seed);m.readProblem(str(src))
    if with_breaker:
        vd={str(v.name):v for v in m.getVars(transformed=False)}
        a,b=EXPECTED_O
        m.addCons(vd[a]>=vd[b],name="IG_EXACT_ORIGINAL_NEOS338")
    m.optimize();wall=time.perf_counter()-t0
    return {"status":str(m.getStatus()),"objective":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(xs):
    xs=[x for x in xs if x is not None]
    return statistics.median(xs) if xs else None

def main():
    src,source=download();resid,gate,chosen,front,gens,meta=frontend_and_mapping(src)
    if not gate["licensed"]:
        result={"experiment":"neos338-optimized-original-breaker-0.3","date":"2026-10-06","source":source,
                "mapping_gate":gate,"status":"MAPPING_NOT_LICENSED","disposition":"PASS"}
        (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
        (OUT/"SUMMARY.md").write_text("# neos-3381206-awhea original breaker holdout 0.1\n\n**Status:** MAPPING_NOT_LICENSED\n")
        print(json.dumps(result,indent=2));return

    trials=[]
    for seed in SEEDS:
        if seed%2:
            b=solve(src,seed,True);a=solve(src,seed,False);order="ig_first"
        else:
            a=solve(src,seed,False);b=solve(src,seed,True);order="baseline_first"
        e2e=front["total_s"]+b["wall_s"]
        trials.append({"seed":seed,"order":order,"baseline":a,"ig":b,"ig_end_to_end_wall_s":e2e})
        print(seed,order,a["status"],b["status"],a["wall_s"],e2e,flush=True)

    paired=[t for t in trials if t["baseline"]["status"]=="optimal" and t["ig"]["status"]=="optimal"]
    for t in paired:
        if abs(t["baseline"]["objective"]-t["ig"]["objective"])>1e-7*max(1.0,abs(t["baseline"]["objective"])):
            raise RuntimeError(f"objective mismatch seed {t['seed']}")
    if len(paired)>=3:
        ratios=[t["ig_end_to_end_wall_s"]/t["baseline"]["wall_s"] for t in paired if t["baseline"]["wall_s"]>0]
        wins=sum(1 for t in paired if t["ig_end_to_end_wall_s"]<t["baseline"]["wall_s"])
        bm=med([t["baseline"]["wall_s"] for t in paired]);im=med([t["ig_end_to_end_wall_s"] for t in paired])
        metric="time_to_optimum";positive=bool(wins>=4 and med(ratios)<0.95)
    else:
        elig=[t for t in trials if t["baseline"]["gap"] is not None and t["ig"]["gap"] is not None]
        wins=sum(1 for t in elig if t["ig"]["gap"]<t["baseline"]["gap"])
        bm=med([t["baseline"]["gap"] for t in elig]);im=med([t["ig"]["gap"] for t in elig])
        ratios=[];metric="final_gap";positive=bool(wins>=4 and im is not None and bm is not None and im<bm)
    summary={"metric":metric,"paired_optimal":len(paired),"baseline_median_metric":bm,"ig_median_metric":im,
      "paired_wins":wins,"median_ratio":med(ratios) if ratios else None,"directional_positive":positive,
      "frontend_wall_s":front["total_s"],"baseline_median_nodes":med([t["baseline"]["nodes"] for t in trials]),
      "ig_median_nodes":med([t["ig"]["nodes"] for t in trials]),"baseline_median_lp":med([t["baseline"]["lp_iterations"] for t in trials]),
      "ig_median_lp":med([t["ig"]["lp_iterations"] for t in trials])}
    result={"experiment":"neos338-optimized-original-breaker-0.3","date":"2026-10-06","source":source,"mapping_gate":gate,
      "exact":{"generator_count":gens,"chosen":chosen,"graph_meta":meta},"frontend":front,"trials":trials,
      "summary":summary,"status":"BENCHMARKED","disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# neos-3381206-awhea optimized original-breaker holdout 0.3","",
      f"**Directional positive:** {positive}",f"**Frontend:** {front['total_s']:.6f}s",
      f"**Breaker:** {EXPECTED_O[0]} >= {EXPECTED_O[1]}","",
      "| Seed | Order | Baseline status | IG status | Baseline wall | IG end-to-end |",
      "| ---: | --- | --- | --- | ---: | ---: |"]
    for t in trials:lines.append(f"| {t['seed']} | {t['order']} | {t['baseline']['status']} | {t['ig']['status']} | {t['baseline']['wall_s']} | {t['ig_end_to_end_wall_s']} |")
    lines+=["","~~~json",json.dumps(summary,indent=2),"~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"summary":summary,"chosen":chosen,"mapping_gate":gate},indent=2))

if __name__=="__main__":main()
