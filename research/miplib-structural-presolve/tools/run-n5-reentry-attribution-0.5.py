#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from pathlib import Path
import highspy, igraph as ig, pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-n5-reentry-attribution-0.5"); OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
SEEDS=[29,30,31,32,33,34,35]
LIMIT=90.0
EXPECTED_BREAKERS=[("t_C0021","t_C0026"),("t_C0027","t_C0028")]

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

def select_two(gens,names):
    n=len(names);acc=[]
    for k,p in enumerate(gens):
        replay(GLOBAL_GRAPH,GLOBAL_COLORS,p)
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

def frontend(src):
    t0=time.perf_counter();st={}
    t=time.perf_counter();m=Model();m.hideOutput(True);set_common(m,0,0);m.readProblem(str(src));st["scip_load_s"]=time.perf_counter()-t
    t=time.perf_counter();m.presolve();st["scip_presolve_s"]=time.perf_counter()-t
    active_names={str(v.name) for v in m.getVars(transformed=True)}
    resid=OUT/"n5-stage1.mps"
    t=time.perf_counter();m.writeProblem(str(resid),trans=True,genericnames=False,verbose=False);st["scip_export_s"]=time.perf_counter()-t
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    t=time.perf_counter()
    if h.readModel(str(resid))==highspy.HighsStatus.kError:raise RuntimeError("HiGHS read")
    st["highs_parse_s"]=time.perf_counter()-t;lp=h.getLp()
    t=time.perf_counter();rows,cols=matrix_views(lp);st["sparse_materialize_s"]=time.perf_counter()-t
    t=time.perf_counter();names,colors,edges,meta=build_bulk(lp,rows,cols,active_names);st["bulk_graph_data_s"]=time.perf_counter()-t
    global GLOBAL_GRAPH,GLOBAL_COLORS
    t=time.perf_counter();GLOBAL_GRAPH=ig.Graph(n=len(colors),edges=edges,directed=False);GLOBAL_COLORS=colors;st["igraph_construct_s"]=time.perf_counter()-t
    t=time.perf_counter();gens=GLOBAL_GRAPH.automorphism_group(sh="fl",color=colors);st["bliss_s"]=time.perf_counter()-t
    t=time.perf_counter();acc,pairs=select_two(gens,names);st["replay_select_s"]=time.perf_counter()-t
    if pairs!=EXPECTED_BREAKERS:raise RuntimeError(f"breaker drift {pairs}")
    st["total_s"]=time.perf_counter()-t0
    return resid,pairs,meta,st,len(gens),len(acc)

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve_original(src,seed):
    t0=time.perf_counter();m=Model();m.hideOutput(True);set_common(m,seed,None);m.readProblem(str(src))
    m.optimize();wall=time.perf_counter()-t0
    return {"status":str(m.getStatus()),"objective":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def solve_ig(resid,seed,pairs):
    t0=time.perf_counter();m=Model();m.hideOutput(True);set_common(m,seed,0);m.readProblem(str(resid))
    vd={v.name:v for v in m.getVars(transformed=False)}
    for k,(a,b) in enumerate(pairs):
        if a not in vd or b not in vd:raise RuntimeError("breaker var missing")
        m.addCons(vd[a]>=vd[b],name=f"IG_OPT_E2E_{k}")
    m.optimize();wall=time.perf_counter()-t0
    return {"status":str(m.getStatus()),"objective":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(xs):
    xs=[x for x in xs if x is not None]
    return statistics.median(xs) if xs else None

def medv(xs):
    xs=[x for x in xs if x is not None]
    return statistics.median(xs) if xs else None

def main():
    src,source=download()
    resid,pairs,meta,front,gens,active=frontend(src)
    stage1_wall=front["scip_load_s"]+front["scip_presolve_s"]+front["scip_export_s"]
    structural_extra=front["total_s"]-stage1_wall
    trials=[]
    for seed in SEEDS:
        order=seed%3
        if order==0:
            a=solve_original(src,seed)
            b=solve_ig(resid,seed,[])
            cc=solve_ig(resid,seed,pairs)
            order_name="A_B_C"
        elif order==1:
            b=solve_ig(resid,seed,[])
            cc=solve_ig(resid,seed,pairs)
            a=solve_original(src,seed)
            order_name="B_C_A"
        else:
            cc=solve_ig(resid,seed,pairs)
            a=solve_original(src,seed)
            b=solve_ig(resid,seed,[])
            order_name="C_A_B"
        be2e=stage1_wall+b["wall_s"]
        ce2e=front["total_s"]+cc["wall_s"]
        trials.append({
          "seed":seed,"order":order_name,
          "A_original":a,"B_reentry":b,"C_isograph":cc,
          "B_end_to_end_wall_s":be2e,"C_end_to_end_wall_s":ce2e
        })
        print(seed,order_name,"walls",a["wall_s"],be2e,ce2e,"nodes",a["nodes"],b["nodes"],cc["nodes"],flush=True)

    optimal=[t for t in trials if t["A_original"]["status"]=="optimal" and t["B_reentry"]["status"]=="optimal" and t["C_isograph"]["status"]=="optimal"]
    bad=[]
    for t in optimal:
        vals=[t["A_original"]["objective"],t["B_reentry"]["objective"],t["C_isograph"]["objective"]]
        if all(v is not None for v in vals):
            if not(close(vals[0],vals[1],1e-8) and close(vals[0],vals[2],1e-8)):
                bad.append([t["seed"],*vals])
    if bad:raise RuntimeError(f"objective mismatch {bad}")

    ab=[t["B_end_to_end_wall_s"]/t["A_original"]["wall_s"] for t in optimal if t["A_original"]["wall_s"]>0]
    ac=[t["C_end_to_end_wall_s"]/t["A_original"]["wall_s"] for t in optimal if t["A_original"]["wall_s"]>0]
    cb=[t["C_end_to_end_wall_s"]/t["B_end_to_end_wall_s"] for t in optimal if t["B_end_to_end_wall_s"]>0]
    summary={
      "paired_all_optimal":len(optimal),
      "stage1_wall_s":stage1_wall,
      "structural_extra_wall_s":structural_extra,
      "full_structural_frontend_wall_s":front["total_s"],
      "A_median_wall_s":medv([t["A_original"]["wall_s"] for t in optimal]),
      "B_median_end_to_end_wall_s":medv([t["B_end_to_end_wall_s"] for t in optimal]),
      "C_median_end_to_end_wall_s":medv([t["C_end_to_end_wall_s"] for t in optimal]),
      "median_B_over_A_ratio":medv(ab),
      "median_C_over_A_ratio":medv(ac),
      "median_C_over_B_ratio":medv(cb),
      "B_vs_A_wins":sum(1 for t in optimal if t["B_end_to_end_wall_s"]<t["A_original"]["wall_s"]),
      "C_vs_A_wins":sum(1 for t in optimal if t["C_end_to_end_wall_s"]<t["A_original"]["wall_s"]),
      "C_vs_B_wins":sum(1 for t in optimal if t["C_end_to_end_wall_s"]<t["B_end_to_end_wall_s"]),
      "C_vs_B_losses":sum(1 for t in optimal if t["C_end_to_end_wall_s"]>t["B_end_to_end_wall_s"]),
      "A_median_nodes":medv([t["A_original"]["nodes"] for t in optimal]),
      "B_median_nodes":medv([t["B_reentry"]["nodes"] for t in optimal]),
      "C_median_nodes":medv([t["C_isograph"]["nodes"] for t in optimal]),
      "A_median_lp":medv([t["A_original"]["lp_iterations"] for t in optimal]),
      "B_median_lp":medv([t["B_reentry"]["lp_iterations"] for t in optimal]),
      "C_median_lp":medv([t["C_isograph"]["lp_iterations"] for t in optimal])
    }
    result={
      "experiment":"n5-reentry-attribution-control-0.5","date":"2026-10-06",
      "source":source,"seeds":SEEDS,"limit_s":LIMIT,
      "pyscipopt_version":pyscipopt.__version__,"highs_version":highspy.Highs().version(),"igraph_version":ig.__version__,
      "frontend":{"stages":front,"graph_meta":meta,"generator_count":gens,"active_generator_count":active,"breakers":pairs},
      "trials":trials,"summary":summary,"disposition":"PASS"
    }
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# n5-3 residual re-entry attribution control 0.5","",
      f"**Stage-1 wall:** {stage1_wall:.6f}s",
      f"**Structural extra wall:** {structural_extra:.6f}s",
      f"**Full structural frontend:** {front['total_s']:.6f}s","",
      "| Seed | Order | A original | B re-entry e2e | C IsoGraph e2e | A nodes | B nodes | C nodes |",
      "| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: |"]
    for t in trials:
        lines.append(f"| {t['seed']} | {t['order']} | {t['A_original']['wall_s']} | {t['B_end_to_end_wall_s']} | {t['C_end_to_end_wall_s']} | {t['A_original']['nodes']} | {t['B_reentry']['nodes']} | {t['C_isograph']['nodes']} |")
    lines+=["","## Summary","",f"~~~json\n{json.dumps(summary,indent=2)}\n~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"frontend":result["frontend"],"summary":summary},indent=2))

GLOBAL_GRAPH=None
GLOBAL_COLORS=None
if __name__=="__main__":main()
