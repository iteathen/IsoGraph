#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-n5-original-breaker-injection-0.6")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
SEEDS=[36,37,38,39,40]
LIMIT=60.0
EXPECTED_TRANSFORMED=[("t_C0021","t_C0026"),("t_C0027","t_C0028")]
EXPECTED_ORIGINAL=[("C0021","C0026"),("C0027","C0028")]
BAD_STATUSES={"FIXED","AGGREGATED","MULTAGGR","NEGATED"}

def cf(x):
    x=float(x);inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def close(a,b,tol=1e-10):
    return abs(float(a)-float(b))<=tol*max(1.0,abs(float(a)),abs(float(b)))

def download():
    d=urllib.request.urlopen(URL,timeout=90).read();raw=gzip.decompress(d)
    p=OUT/"n5-3.mps";p.write_bytes(raw)
    return p,{"source_url":URL,"gzip_sha256":hashlib.sha256(d).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def set_common(m,seed,symmetry=None):
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    if symmetry is not None:m.setIntParam("misc/usesymmetry",int(symmetry))
    m.setRealParam("limits/time",LIMIT)

def matrix_views(lp):
    n=int(lp.num_col_);m=int(lp.num_row_)
    rows=[{} for _ in range(m)];cols=[{} for _ in range(n)]
    st=list(lp.a_matrix_.start_);ind=list(lp.a_matrix_.index_);val=list(lp.a_matrix_.value_)
    if lp.a_matrix_.format_==highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(st[j],st[j+1]):
                i=int(ind[p]);v=float(val[p]);rows[i][j]=v;cols[j][i]=v
    elif lp.a_matrix_.format_==highspy.MatrixFormat.kRowwise:
        for i in range(m):
            for p in range(st[i],st[i+1]):
                j=int(ind[p]);v=float(val[p]);rows[i][j]=v;cols[j][i]=v
    else:raise RuntimeError("unsupported matrix format")
    return rows,cols

def build_bulk(lp,rows,cols,active_names):
    nold=int(lp.num_col_);m=int(lp.num_row_)
    raw_names=list(lp.col_names_);costs=[float(x) for x in lp.col_cost_]
    lowers=[float(x) for x in lp.col_lower_];uppers=[float(x) for x in lp.col_upper_]
    ints=list(lp.integrality_) if len(lp.integrality_) else []
    rlo=[float(x) for x in lp.row_lower_];rup=[float(x) for x in lp.row_upper_]
    old_names=[str(raw_names[j]) if j<len(raw_names) and raw_names[j] else f"col#{j}" for j in range(nold)]
    active=[];inactive=[]
    for j,n in enumerate(old_names):(active if n in active_names else inactive).append(j)
    unsafe=[]
    for j in inactive:
        if not(len(cols[j])==0 and (close(costs[j],0.0) or close(lowers[j],uppers[j]))):
            unsafe.append((old_names[j],len(cols[j]),costs[j],lowers[j],uppers[j]))
    if unsafe:raise RuntimeError(f"unsafe export-only columns {unsafe[:5]}")
    remap=[-1]*nold
    for k,j in enumerate(active):remap[j]=k
    names=[old_names[j] for j in active]
    attrs=[("V",cf(costs[j]),cf(lowers[j]),cf(uppers[j]),str(ints[j]) if ints else "C") for j in active]
    attrs.extend(("R",cf(rlo[i]),cf(rup[i])) for i in range(m))
    trip=[]
    for i,row in enumerate(rows):
        for j,a in row.items():
            k=remap[j]
            if k>=0:trip.append((i,k,float(a)))
    attrs.extend(("E",cf(a)) for _,_,a in trip)
    pal={};colors=[]
    for a in attrs:
        if a not in pal:pal[a]=len(pal)
        colors.append(pal[a])
    base=len(active)+m;edges=[]
    for k,(i,j,a) in enumerate(trip):
        e=base+k;edges.append((j,e));edges.append((e,len(active)+i))
    meta={"active_variables":len(active),"dropped_export_only_variables":len(inactive),"rows":m,
          "active_nonzeros":len(trip),"vertices":len(attrs),"edges":len(edges),"color_classes":len(pal)}
    return names,colors,edges,meta

def replay(g,colors,p):
    if len(p)!=g.vcount() or sorted(p)!=list(range(g.vcount())):raise RuntimeError("bad generator")
    for i,q in enumerate(p):
        if colors[i]!=colors[q]:raise RuntimeError("color mismatch")
    es={tuple(sorted(e.tuple)) for e in g.es}
    for u,v in es:
        if tuple(sorted((p[u],p[v]))) not in es:raise RuntimeError("edge mismatch")

def select_two(gens,names,g,colors):
    n=len(names);acc=[]
    for k,p in enumerate(gens):
        replay(g,colors,p)
        moved=[j for j in range(n) if p[j]!=j]
        if not moved:continue
        if any(p[j]>=n for j in moved):raise RuntimeError("variable partition violation")
        invol=all(p[p[i]]==i for i in range(len(p)))
        ordered=sorted((names[j],j) for j in moved);_,a=ordered[0];b=p[a]
        acc.append({"index":k,"perm":p,"a":a,"b":b,"a_name":names[a],"b_name":names[b],"involution":invol})
    acc.sort(key=lambda z:(z["a_name"],z["b_name"],z["index"]))
    for i in range(len(acc)):
        for j in range(i+1,len(acc)):
            x,y=acc[i],acc[j]
            if not(x["involution"] and y["involution"]):continue
            if y["perm"][x["a"]]!=x["a"] or y["perm"][x["b"]]!=x["b"]:continue
            if x["perm"][y["a"]]!=y["a"] or x["perm"][y["b"]]!=y["b"]:continue
            return acc,[(x["a_name"],x["b_name"]),(y["a_name"],y["b_name"])]
    raise RuntimeError("no composable active pair")

def var_record(v):
    return {
      "name":str(v.name),
      "status":str(v.getStatus()),
      "active":bool(v.isActive()),
      "vtype":str(v.vtype()),
      "lb_global":float(v.getLbGlobal()),
      "ub_global":float(v.getUbGlobal())
    }

def frontend_and_mapping(src):
    t0=time.perf_counter();st={}
    m=Model();m.hideOutput(True);set_common(m,0,0);m.readProblem(str(src))
    orig={str(v.name):v for v in m.getVars(transformed=False)}
    for a,b in EXPECTED_ORIGINAL:
        if a not in orig or b not in orig:raise RuntimeError(f"original breaker variable missing {a}/{b}")
    t=time.perf_counter();m.presolve();st["scip_presolve_s"]=time.perf_counter()-t

    mapping={}
    licensed=True;reasons=[]
    for oname in sorted({x for pair in EXPECTED_ORIGINAL for x in pair}):
        ov=orig[oname];tv=m.getTransformedVar(ov)
        rec={"original":var_record(ov),"transformed":var_record(tv)}
        expected="t_"+oname
        rec["expected_transformed_name"]=expected
        rec["name_match"]=rec["transformed"]["name"]==expected
        rec["status_acceptable"]=rec["transformed"]["status"] not in BAD_STATUSES
        rec["domain_match"]=(rec["original"]["vtype"]==rec["transformed"]["vtype"] and
                             close(rec["original"]["lb_global"],rec["transformed"]["lb_global"]) and
                             close(rec["original"]["ub_global"],rec["transformed"]["ub_global"]))
        rec["licensed"]=bool(rec["name_match"] and rec["transformed"]["active"] and rec["status_acceptable"] and rec["domain_match"])
        if not rec["licensed"]:
            licensed=False;reasons.append(oname)
        mapping[oname]=rec
    if not licensed:
        return None,None,{"licensed":False,"failed_variables":reasons,"mapping":mapping},st,0,0,None

    active_names={str(v.name) for v in m.getVars(transformed=True)}
    resid=OUT/"n5-stage1.mps"
    t=time.perf_counter();m.writeProblem(str(resid),trans=True,genericnames=False,verbose=False);st["scip_export_s"]=time.perf_counter()-t

    h=highspy.Highs();h.setOptionValue("output_flag",False)
    t=time.perf_counter()
    if h.readModel(str(resid))==highspy.HighsStatus.kError:raise RuntimeError("HiGHS read residual failed")
    st["highs_parse_s"]=time.perf_counter()-t;lp=h.getLp()
    t=time.perf_counter();rows,cols=matrix_views(lp);st["sparse_materialize_s"]=time.perf_counter()-t
    t=time.perf_counter();names,colors,edges,meta=build_bulk(lp,rows,cols,active_names);st["bulk_graph_data_s"]=time.perf_counter()-t
    t=time.perf_counter();g=ig.Graph(n=len(colors),edges=edges,directed=False);st["igraph_construct_s"]=time.perf_counter()-t
    t=time.perf_counter();gens=g.automorphism_group(sh="fl",color=colors);st["bliss_s"]=time.perf_counter()-t
    t=time.perf_counter();acc,pairs=select_two(gens,names,g,colors);st["replay_select_s"]=time.perf_counter()-t
    if pairs!=EXPECTED_TRANSFORMED:raise RuntimeError(f"transformed breaker drift {pairs}")
    st["total_s"]=time.perf_counter()-t0
    return resid,pairs,{"licensed":True,"mapping":mapping},st,len(gens),len(acc),meta

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve_original(src,seed,pairs=None):
    t0=time.perf_counter();m=Model();m.hideOutput(True);set_common(m,seed,None);m.readProblem(str(src))
    added=0
    if pairs:
        vd={str(v.name):v for v in m.getVars(transformed=False)}
        for k,(a,b) in enumerate(pairs):
            if a not in vd or b not in vd:raise RuntimeError(f"original injection variable missing {a}/{b}")
            m.addCons(vd[a]>=vd[b],name=f"IG_ORIGINAL_EXACT_BREAKER_{k}");added+=1
    m.optimize();wall=time.perf_counter()-t0
    return {"status":str(m.getStatus()),"objective":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),
      "wall_s":wall,"added_constraints":added}

def med(xs):
    xs=[x for x in xs if x is not None]
    return statistics.median(xs) if xs else None

def main():
    src,source=download()
    resid,tpairs,gate,front,gens,active,meta=frontend_and_mapping(src)
    if not gate["licensed"]:
        result={"experiment":"n5-original-breaker-injection-0.6","date":"2026-10-06","source":source,
          "mapping_gate":gate,"status":"MAPPING_NOT_LICENSED","disposition":"PASS"}
        (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
        (OUT/"SUMMARY.md").write_text("# n5-3 original-model breaker injection holdout 0.6\n\n**Status:** MAPPING_NOT_LICENSED\n")
        print(json.dumps(result,indent=2));return

    trials=[]
    for seed in SEEDS:
        if seed%2==0:
            a=solve_original(src,seed,None);b=solve_original(src,seed,EXPECTED_ORIGINAL);order="baseline_first"
        else:
            b=solve_original(src,seed,EXPECTED_ORIGINAL);a=solve_original(src,seed,None);order="ig_first"
        e2e=front["total_s"]+b["wall_s"]
        trials.append({"seed":seed,"order":order,"baseline":a,"ig_original":b,"ig_end_to_end_wall_s":e2e})
        print(seed,order,a["status"],b["status"],a["wall_s"],b["wall_s"],e2e,flush=True)

    both=[t for t in trials if t["baseline"]["status"]=="optimal" and t["ig_original"]["status"]=="optimal"]
    for t in both:
        if t["baseline"]["objective"] is not None and t["ig_original"]["objective"] is not None and not close(t["baseline"]["objective"],t["ig_original"]["objective"],1e-8):
            raise RuntimeError(f"objective mismatch seed {t['seed']}")
    summary={
      "paired_both_optimal":len(both),
      "baseline_median_wall_s":med([t["baseline"]["wall_s"] for t in both]),
      "ig_solver_median_wall_s":med([t["ig_original"]["wall_s"] for t in both]),
      "ig_end_to_end_median_wall_s":med([t["ig_end_to_end_wall_s"] for t in both]),
      "paired_end_to_end_wins":sum(1 for t in both if t["ig_end_to_end_wall_s"]<t["baseline"]["wall_s"]),
      "paired_end_to_end_losses":sum(1 for t in both if t["ig_end_to_end_wall_s"]>t["baseline"]["wall_s"]),
      "frontend_wall_s":front["total_s"],
      "baseline_median_nodes":med([t["baseline"]["nodes"] for t in both]),
      "ig_median_nodes":med([t["ig_original"]["nodes"] for t in both]),
      "baseline_median_lp":med([t["baseline"]["lp_iterations"] for t in both]),
      "ig_median_lp":med([t["ig_original"]["lp_iterations"] for t in both]),
      "baseline_median_gap_all":med([t["baseline"]["gap"] for t in trials]),
      "ig_median_gap_all":med([t["ig_original"]["gap"] for t in trials]),
      "paired_gap_wins_all":sum(1 for t in trials if t["baseline"]["gap"] is not None and t["ig_original"]["gap"] is not None and t["ig_original"]["gap"]<t["baseline"]["gap"])
    }
    result={"experiment":"n5-original-breaker-injection-0.6","date":"2026-10-06","source":source,
      "seeds":SEEDS,"limit_s":LIMIT,"mapping_gate":gate,
      "frontend":{"stages":front,"generator_count":gens,"active_generator_count":active,"graph_meta":meta,"transformed_breakers":tpairs,"original_breakers":EXPECTED_ORIGINAL},
      "trials":trials,"summary":summary,"status":"MAPPING_LICENSED_AND_BENCHMARKED","disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# n5-3 original-model breaker injection holdout 0.6","",
      "**Status:** MAPPING_LICENSED_AND_BENCHMARKED",
      f"**Frontend:** {front['total_s']:.6f}s",
      f"**Original breakers:** {EXPECTED_ORIGINAL}","",
      "| Seed | Order | Baseline status | IG status | Baseline wall | IG solver wall | IG end-to-end |",
      "| ---: | --- | --- | --- | ---: | ---: | ---: |"]
    for t in trials:
        lines.append(f"| {t['seed']} | {t['order']} | {t['baseline']['status']} | {t['ig_original']['status']} | {t['baseline']['wall_s']} | {t['ig_original']['wall_s']} | {t['ig_end_to_end_wall_s']} |")
    lines+=["","## Summary","",f"~~~json\n{json.dumps(summary,indent=2)}\n~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"mapping_gate":gate,"frontend":result["frontend"],"summary":summary},indent=2))

if __name__=="__main__":main()
