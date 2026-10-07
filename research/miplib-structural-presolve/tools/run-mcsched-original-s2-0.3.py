#!/usr/bin/env python3
import gzip, hashlib, importlib.util, json, math, statistics, time, urllib.request
from pathlib import Path
import highspy, igraph as ig
from pyscipopt import Model

HERE=Path(__file__).resolve().parent
BASE_PATH=HERE/"run-n5-original-breaker-injection-0.6.py"
spec=importlib.util.spec_from_file_location("base",BASE_PATH)
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)

OUT=Path("out/miplib-mcsched-original-s2-0.3");OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/mcsched.mps.gz"
SEEDS=[13,14,15,16,17]
LIMIT=60.0
EXPECTED_T=("t_C0000186","t_C0001396")
EXPECTED_O=("C0000186","C0001396")
BAD={"FIXED","AGGREGATED","MULTAGGR","NEGATED"}

def download():
    d=urllib.request.urlopen(URL,timeout=120).read();raw=gzip.decompress(d)
    p=OUT/"mcsched.mps";p.write_bytes(raw)
    return p,{"source_url":URL,"gzip_sha256":hashlib.sha256(d).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def set_common(m,seed):
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    m.setRealParam("limits/time",LIMIT)

def replay_select(gens,names,g,colors):
    n=len(names);es={tuple(sorted(e.tuple)) for e in g.es};identity=list(range(g.vcount()))
    cands=[];active=0
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
        cands.append((an,bn,gi,a,b,len(moved)))
    if not cands:raise RuntimeError("no active-moving generator")
    cands.sort();an,bn,gi,a,b,count=cands[0]
    return {"a_name":an,"b_name":bn,"a_index":a,"b_index":b,"generator_index":gi,
            "active_moved_variables":count,"active_generator_count":active}

def frontend(src):
    t0=time.perf_counter();st={}
    m=Model();m.hideOutput(True);set_common(m,0);m.setIntParam("misc/usesymmetry",0);m.readProblem(str(src))
    orig={str(v.name):v for v in m.getVars(transformed=False)}
    for n in EXPECTED_O:
        if n not in orig:raise RuntimeError(f"original variable missing {n}")
    t=time.perf_counter();m.presolve();st["scip_presolve_s"]=time.perf_counter()-t
    mapping={};licensed=True
    for oname in EXPECTED_O:
        ov=orig[oname];tv=m.getTransformedVar(ov)
        orec=base.var_record(ov);trec=base.var_record(tv)
        rec={"original":orec,"transformed":trec,"expected_transformed_name":"t_"+oname}
        rec["name_match"]=trec["name"]==rec["expected_transformed_name"]
        rec["status_acceptable"]=trec["status"] not in BAD
        rec["domain_match"]=bool(orec["vtype"]==trec["vtype"] and base.close(orec["lb_global"],trec["lb_global"]) and base.close(orec["ub_global"],trec["ub_global"]))
        rec["licensed"]=bool(rec["name_match"] and trec["active"] and rec["status_acceptable"] and rec["domain_match"])
        licensed &= rec["licensed"];mapping[oname]=rec
    active={str(v.name) for v in m.getVars(transformed=True)}
    resid=OUT/"mcsched-stage1.mps"
    t=time.perf_counter();m.writeProblem(str(resid),trans=True,genericnames=False,verbose=False);st["scip_export_s"]=time.perf_counter()-t
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    t=time.perf_counter()
    if h.readModel(str(resid))==highspy.HighsStatus.kError:raise RuntimeError("HiGHS residual read failed")
    st["highs_parse_s"]=time.perf_counter()-t;lp=h.getLp()
    t=time.perf_counter();rows,cols=base.matrix_views(lp);st["sparse_materialize_s"]=time.perf_counter()-t
    t=time.perf_counter();names,colors,edges,meta=base.build_bulk(lp,rows,cols,active);st["bulk_graph_data_s"]=time.perf_counter()-t
    t=time.perf_counter();g=ig.Graph(n=len(colors),edges=edges,directed=False);st["igraph_construct_s"]=time.perf_counter()-t
    t=time.perf_counter();gens=g.automorphism_group(sh="fl",color=colors);st["bliss_s"]=time.perf_counter()-t
    t=time.perf_counter();chosen=replay_select(gens,names,g,colors);st["replay_select_s"]=time.perf_counter()-t
    st["total_s"]=time.perf_counter()-t0
    if (chosen["a_name"],chosen["b_name"])!=EXPECTED_T:raise RuntimeError(f"breaker drift {(chosen['a_name'],chosen['b_name'])}")
    return {"licensed":licensed,"mapping":mapping},chosen,st,len(gens),meta

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(src,seed,breaker):
    t0=time.perf_counter();m=Model();m.hideOutput(True);set_common(m,seed);m.readProblem(str(src))
    if breaker:
        vd={str(v.name):v for v in m.getVars(transformed=False)}
        a,b=EXPECTED_O;m.addCons(vd[a]>=vd[b],name="IG_EXACT_ORIGINAL_MCSCHED_S2")
    m.optimize();wall=time.perf_counter()-t0
    p=finite(m.getPrimalbound());d=finite(m.getDualbound())
    return {"status":str(m.getStatus()),"objective":p,"dual":d,"gap":finite(m.getGap()),
      "bound_width":None if p is None or d is None else abs(p-d),
      "nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(xs):
    xs=[x for x in xs if x is not None];return statistics.median(xs) if xs else None

def main():
    src,source=download();gate,chosen,front,gens,meta=frontend(src)
    if not gate["licensed"]:
        result={"experiment":"mcsched-original-s2-0.3","date":"2026-10-06","mapping_gate":gate,
                "status":"MAPPING_NOT_LICENSED","disposition":"PASS"}
        (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
        (OUT/"SUMMARY.md").write_text("# mcsched original S2 holdout 0.3\n\n**Status:** MAPPING_NOT_LICENSED\n")
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
        eligible=[t for t in trials if t["baseline"]["gap"] is not None and t["ig"]["gap"] is not None]
        wins=sum(t["ig"]["gap"]<t["baseline"]["gap"] for t in eligible)
        bm=med([t["baseline"]["gap"] for t in eligible]);im=med([t["ig"]["gap"] for t in eligible])
        ratios=[];metric="final_gap";positive=bool(wins>=4 and im is not None and bm is not None and im<bm)
    summary={"metric":metric,"paired_optimal":len(paired),"baseline_median_metric":bm,"ig_median_metric":im,
      "paired_wins":wins,"median_ratio":med(ratios) if ratios else None,"directional_positive":positive,
      "frontend_wall_s":front["total_s"],"baseline_median_nodes":med([t["baseline"]["nodes"] for t in trials]),
      "ig_median_nodes":med([t["ig"]["nodes"] for t in trials]),"baseline_median_lp":med([t["baseline"]["lp_iterations"] for t in trials]),
      "ig_median_lp":med([t["ig"]["lp_iterations"] for t in trials])}
    result={"experiment":"mcsched-original-s2-0.3","date":"2026-10-06","source":source,"mapping_gate":gate,
      "exact":{"chosen":chosen,"generator_count":gens,"graph_meta":meta},"frontend":front,"trials":trials,
      "summary":summary,"status":"BENCHMARKED","disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# mcsched original-model S2 holdout 0.3","",f"**Directional positive:** {positive}",
      f"**Frontend:** {front['total_s']:.6f}s",f"**Breaker:** {EXPECTED_O[0]} >= {EXPECTED_O[1]}","",
      "| Seed | Order | Baseline status | IG status | Baseline gap | IG gap | Baseline wall | IG end-to-end |",
      "| ---: | --- | --- | --- | ---: | ---: | ---: | ---: |"]
    for t in trials:lines.append(f"| {t['seed']} | {t['order']} | {t['baseline']['status']} | {t['ig']['status']} | {t['baseline']['gap']} | {t['ig']['gap']} | {t['baseline']['wall_s']} | {t['ig_end_to_end_wall_s']} |")
    lines+=["","~~~json",json.dumps(summary,indent=2),"~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"mapping_gate":gate,"chosen":chosen,"summary":summary},indent=2))

if __name__=="__main__":main()
