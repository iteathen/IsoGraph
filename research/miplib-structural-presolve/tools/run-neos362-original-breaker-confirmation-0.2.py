#!/usr/bin/env python3
import gzip, hashlib, importlib.util, json, math, statistics, time, urllib.request
from pathlib import Path
import highspy, igraph as ig
from pyscipopt import Model

HERE=Path(__file__).resolve().parent
BASE_PATH=HERE/"run-n5-original-breaker-injection-0.6.py"
spec=importlib.util.spec_from_file_location("base",BASE_PATH)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)

OUT=Path("out/miplib-neos362-original-breaker-confirmation-0.2");OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/neos-3627168-kasai.mps.gz"
SEEDS=[5,6,7,8,9,10,11]
LIMIT=60.0
BAD={"FIXED","AGGREGATED","MULTAGGR","NEGATED"}

def download():
    d=urllib.request.urlopen(URL,timeout=120).read();raw=gzip.decompress(d)
    p=OUT/"neos-3627168-kasai.mps";p.write_bytes(raw)
    return p,{"source_url":URL,"gzip_sha256":hashlib.sha256(d).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def set_common(m,seed):
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    m.setRealParam("limits/time",LIMIT)

def replay_select(gens,names,g,colors):
    n=len(names);es={tuple(sorted(e.tuple)) for e in g.es};identity=list(range(g.vcount()))
    candidates=[];active=0
    for gi,p in enumerate(gens):
        if len(p)!=g.vcount() or sorted(p)!=identity:raise RuntimeError("bad generator")
        for i,q in enumerate(p):
            if colors[i]!=colors[q]:raise RuntimeError("color mismatch")
        for u,v in es:
            a,b=p[u],p[v]
            if a>b:a,b=b,a
            if (a,b) not in es:raise RuntimeError("edge mismatch")
        moved=[j for j in range(n) if p[j]!=j]
        if not moved:continue
        if any(p[j]>=n for j in moved):raise RuntimeError("variable partition violation")
        active+=1
        an,a=sorted((names[j],j) for j in moved)[0];b=p[a];bn=names[b]
        candidates.append((an,bn,gi,a,b,len(moved)))
    if not candidates:raise RuntimeError("no active-moving exact generator")
    candidates.sort()
    an,bn,gi,a,b,count=candidates[0]
    return {"a_name":an,"b_name":bn,"a_index":a,"b_index":b,"generator_index":gi,
            "active_moved_variables":count,"active_generator_count":active}

def frontend(src):
    t0=time.perf_counter();st={}
    m=Model();m.hideOutput(True);set_common(m,0);m.setIntParam("misc/usesymmetry",0);m.readProblem(str(src))
    orig={str(v.name):v for v in m.getVars(transformed=False)}
    t=time.perf_counter();m.presolve();st["scip_presolve_s"]=time.perf_counter()-t
    active_names={str(v.name) for v in m.getVars(transformed=True)}

    reverse={};mapping_records={}
    for oname,ov in orig.items():
        tv=m.getTransformedVar(ov)
        orec=base.var_record(ov);trec=base.var_record(tv)
        direct=bool(trec["active"] and trec["status"] not in BAD and orec["vtype"]==trec["vtype"]
          and base.close(orec["lb_global"],trec["lb_global"]) and base.close(orec["ub_global"],trec["ub_global"]))
        mapping_records[oname]={"original":orec,"transformed":trec,"direct":direct}
        if direct:reverse.setdefault(trec["name"],[]).append(oname)

    resid=OUT/"neos362-stage1.mps"
    t=time.perf_counter();m.writeProblem(str(resid),trans=True,genericnames=False,verbose=False);st["scip_export_s"]=time.perf_counter()-t
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    t=time.perf_counter()
    if h.readModel(str(resid))==highspy.HighsStatus.kError:raise RuntimeError("HiGHS residual read failed")
    st["highs_parse_s"]=time.perf_counter()-t;lp=h.getLp()
    t=time.perf_counter();rows,cols=base.matrix_views(lp);st["sparse_materialize_s"]=time.perf_counter()-t
    t=time.perf_counter();names,colors,edges,meta=base.build_bulk(lp,rows,cols,active_names);st["bulk_graph_data_s"]=time.perf_counter()-t
    t=time.perf_counter();g=ig.Graph(n=len(colors),edges=edges,directed=False);st["igraph_construct_s"]=time.perf_counter()-t
    t=time.perf_counter();gens=g.automorphism_group(sh="fl",color=colors);st["bliss_s"]=time.perf_counter()-t
    t=time.perf_counter();chosen=replay_select(gens,names,g,colors);st["replay_select_s"]=time.perf_counter()-t

    aopts=reverse.get(chosen["a_name"],[]);bopts=reverse.get(chosen["b_name"],[])
    licensed=len(aopts)==1 and len(bopts)==1 and aopts[0]!=bopts[0]
    original_pair=(aopts[0],bopts[0]) if licensed else None
    st["total_s"]=time.perf_counter()-t0
    gate={"licensed":licensed,"selected_transformed":[chosen["a_name"],chosen["b_name"]],
          "original_candidates":[aopts,bopts],"original_pair":original_pair}
    return gate,chosen,st,len(gens),meta

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(src,seed,pair=None):
    t0=time.perf_counter();m=Model();m.hideOutput(True);set_common(m,seed);m.readProblem(str(src))
    if pair:
        vd={str(v.name):v for v in m.getVars(transformed=False)}
        a,b=pair
        if a not in vd or b not in vd:raise RuntimeError("mapped original variable missing")
        m.addCons(vd[a]>=vd[b],name="IG_EXACT_ORIGINAL_NEOS362")
    m.optimize();wall=time.perf_counter()-t0
    return {"status":str(m.getStatus()),"objective":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(xs):
    xs=[x for x in xs if x is not None]
    return statistics.median(xs) if xs else None

def main():
    src,source=download();gate,chosen,front,gens,meta=frontend(src)
    if not gate["licensed"]:
        result={"experiment":"neos362-original-breaker-confirmation-0.2","date":"2026-10-06","source":source,
          "mapping_gate":gate,"exact":{"chosen":chosen,"generator_count":gens,"graph_meta":meta},
          "frontend":front,"status":"MAPPING_NOT_LICENSED","disposition":"PASS"}
        (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
        (OUT/"SUMMARY.md").write_text("# neos-3627168-kasai original-breaker confirmation 0.2\n\n**Status:** MAPPING_NOT_LICENSED\n")
        print(json.dumps(result,indent=2));return
    pair=tuple(gate["original_pair"]);trials=[]
    for seed in SEEDS:
        if seed%2:
            b=solve(src,seed,pair);a=solve(src,seed,None);order="ig_first"
        else:
            a=solve(src,seed,None);b=solve(src,seed,pair);order="baseline_first"
        e2e=front["total_s"]+b["wall_s"]
        trials.append({"seed":seed,"order":order,"baseline":a,"ig":b,"ig_end_to_end_wall_s":e2e})
        print(seed,order,a["status"],b["status"],a["wall_s"],e2e,a["gap"],b["gap"],flush=True)
    paired=[t for t in trials if t["baseline"]["status"]=="optimal" and t["ig"]["status"]=="optimal"]
    for t in paired:
        if abs(t["baseline"]["objective"]-t["ig"]["objective"])>1e-7*max(1.0,abs(t["baseline"]["objective"])):
            raise RuntimeError(f"objective mismatch seed {t['seed']}")
    if len(paired)>=4:
        ratios=[t["ig_end_to_end_wall_s"]/t["baseline"]["wall_s"] for t in paired if t["baseline"]["wall_s"]>0]
        wins=sum(t["ig_end_to_end_wall_s"]<t["baseline"]["wall_s"] for t in paired)
        bm=med([t["baseline"]["wall_s"] for t in paired]);im=med([t["ig_end_to_end_wall_s"] for t in paired])
        metric="time_to_optimum";positive=bool(wins>=5 and med(ratios)<0.95)
    else:
        eligible=[t for t in trials if t["baseline"]["gap"] is not None and t["ig"]["gap"] is not None]
        wins=sum(t["ig"]["gap"]<t["baseline"]["gap"] for t in eligible)
        bm=med([t["baseline"]["gap"] for t in eligible]);im=med([t["ig"]["gap"] for t in eligible])
        ratios=[];metric="final_gap";positive=bool(wins>=5 and im is not None and bm is not None and im<bm)
    summary={"metric":metric,"paired_optimal":len(paired),"baseline_median_metric":bm,"ig_median_metric":im,
      "paired_wins":wins,"median_ratio":med(ratios) if ratios else None,"directional_positive":positive,
      "frontend_wall_s":front["total_s"],"baseline_median_nodes":med([t["baseline"]["nodes"] for t in trials]),
      "ig_median_nodes":med([t["ig"]["nodes"] for t in trials]),"baseline_median_lp":med([t["baseline"]["lp_iterations"] for t in trials]),
      "ig_median_lp":med([t["ig"]["lp_iterations"] for t in trials])}
    result={"experiment":"neos362-original-breaker-confirmation-0.2","date":"2026-10-06","source":source,
      "mapping_gate":gate,"exact":{"chosen":chosen,"generator_count":gens,"graph_meta":meta},
      "frontend":front,"trials":trials,"summary":summary,"status":"BENCHMARKED","disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# neos-3627168-kasai original-breaker holdout 0.1","",
      f"**Directional positive:** {positive}",f"**Frontend:** {front['total_s']:.6f}s",
      f"**Transformed breaker:** {chosen['a_name']} >= {chosen['b_name']}",
      f"**Original breaker:** {pair[0]} >= {pair[1]}","",
      "| Seed | Order | Baseline status | IG status | Baseline wall | IG end-to-end | Baseline gap | IG gap |",
      "| ---: | --- | --- | --- | ---: | ---: | ---: | ---: |"]
    for t in trials:lines.append(f"| {t['seed']} | {t['order']} | {t['baseline']['status']} | {t['ig']['status']} | {t['baseline']['wall_s']} | {t['ig_end_to_end_wall_s']} | {t['baseline']['gap']} | {t['ig']['gap']} |")
    lines+=["","~~~json",json.dumps(summary,indent=2),"~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"mapping_gate":gate,"chosen":chosen,"summary":summary},indent=2))

if __name__=="__main__":main()
