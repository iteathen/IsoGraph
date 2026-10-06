#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-n5-active-only-long-0.1")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
LIMIT=60.0
SEEDS=[0,1,2,3,4]

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

def base(path,seed=0):
    m=Model();m.hideOutput(True);m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    m.setIntParam("misc/usesymmetry",0)
    return m

def stage1(src):
    m=base(src,0)
    t=time.perf_counter();m.presolve();wall=time.perf_counter()-t
    active_vars={str(v.name) for v in m.getVars(transformed=True)}
    active_conss={str(c.name) for c in m.getConss(transformed=True)}
    snap={"vars":len(active_vars),"conss":len(active_conss),"presolve_time_s":float(m.getPresolvingTime()),"presolve_wall_s":wall}
    p=OUT/"n5-stage1.mps";m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,snap,active_vars,active_conss

def load_lp(path):
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("cannot read stage1 MPS")
    return h.getLp(),{"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}

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

def build_active_graph(lp,active_names):
    rows,cols=matrix_views(lp)
    nold=int(lp.num_col_);m=int(lp.num_row_)
    old_names=[str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}" for j in range(nold)]
    active_old=[j for j,n in enumerate(old_names) if n in active_names]
    inactive_old=[j for j,n in enumerate(old_names) if n not in active_names]
    unsafe=[]
    for j in inactive_old:
        degree=len(cols[j]);cost=float(lp.col_cost_[j]);lb=float(lp.col_lower_[j]);ub=float(lp.col_upper_[j])
        safe=(degree==0 and (close(cost,0.0) or close(lb,ub)))
        if not safe:
            unsafe.append({"name":old_names[j],"degree":degree,"cost":cost,"lb":lb,"ub":ub})
    if unsafe:
        raise RuntimeError(f"unsafe export-only columns: {unsafe[:5]}")
    old_to_new={j:k for k,j in enumerate(active_old)}
    names=[old_names[j] for j in active_old]
    attrs=[]
    for j in active_old:
        attrs.append(("V",cf(lp.col_cost_[j]),cf(lp.col_lower_[j]),cf(lp.col_upper_[j]),
                      str(lp.integrality_[j]) if len(lp.integrality_) else "C"))
    for i in range(m):
        attrs.append(("R",cf(lp.row_lower_[i]),cf(lp.row_upper_[i])))
    active_triples=[]
    for i,row in enumerate(rows):
        for j,a in row.items():
            if j in old_to_new:
                active_triples.append((i,old_to_new[j],float(a)))
    for _,_,a in active_triples:attrs.append(("E",cf(a)))
    pal={};colors=[]
    for a in attrs:
        if a not in pal:pal[a]=len(pal)
        colors.append(pal[a])
    na=len(active_old);baseidx=na+m;edges=[]
    for k,(i,j,a) in enumerate(active_triples):
        e=baseidx+k;edges.append((j,e));edges.append((e,na+i))
    g=ig.Graph(n=len(attrs),edges=edges,directed=False)
    meta={"active_variables":na,"dropped_export_only_variables":len(inactive_old),"rows":m,
          "active_nonzeros":len(active_triples),"vertices":len(attrs),"edges":len(edges),"color_classes":len(pal)}
    return g,colors,names,meta

def replay(g,colors,p):
    if len(p)!=g.vcount() or sorted(p)!=list(range(g.vcount())):raise RuntimeError("bad generator")
    for i,q in enumerate(p):
        if colors[i]!=colors[q]:raise RuntimeError("color mismatch")
    es={tuple(sorted(e.tuple)) for e in g.es}
    for u,v in es:
        if tuple(sorted((p[u],p[v]))) not in es:raise RuntimeError("edge mismatch")

def active_generators(g,colors,names):
    n=len(names)
    t=time.perf_counter();gens=g.automorphism_group(sh="fl",color=colors);bliss=time.perf_counter()-t
    acc=[]
    for k,p in enumerate(gens):
        replay(g,colors,p)
        moved=[j for j in range(n) if p[j]!=j]
        if not moved:continue
        if any(p[j]>=n for j in moved):raise RuntimeError("variable maps outside active partition")
        invol=all(p[p[i]]==i for i in range(len(p)))
        ordered=sorted((names[j],j) for j in moved);_,a=ordered[0];b=p[a]
        acc.append({"index":k,"perm":p,"moved":moved,"involution":invol,"a":a,"b":b,"a_name":names[a],"b_name":names[b]})
    acc.sort(key=lambda x:(x["a_name"],x["b_name"],x["index"]))
    return gens,acc,bliss

def select_two(acc):
    for i in range(len(acc)):
        for j in range(i+1,len(acc)):
            g1,g2=acc[i],acc[j]
            if not(g1["involution"] and g2["involution"]):continue
            if g2["perm"][g1["a"]]!=g1["a"] or g2["perm"][g1["b"]]!=g1["b"]:continue
            if g1["perm"][g2["a"]]!=g2["a"] or g1["perm"][g2["b"]]!=g2["b"]:continue
            return g1,g2
    return None

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(path,seed,breakers):
    m=base(path,seed);m.setRealParam("limits/time",LIMIT)
    vd={v.name:v for v in m.getVars(transformed=False)}
    for i,b in enumerate(breakers):
        if b["a_name"] not in vd or b["b_name"] not in vd:raise RuntimeError("breaker var missing")
        m.addCons(vd[b["a_name"]]>=vd[b["b_name"]],name=f"IG_ACTIVE_LONG_BREAKER_{i}")
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    return {"seed":seed,"status":str(m.getStatus()),"primal":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(v):
    v=[x for x in v if x is not None];return statistics.median(v) if v else None

def summary(trials,key):
    return {"median_gap":med([t[key]["gap"] for t in trials]),"median_nodes":med([t[key]["nodes"] for t in trials]),
      "median_lp":med([t[key]["lp_iterations"] for t in trials]),"median_primal":med([t[key]["primal"] for t in trials]),
      "median_dual":med([t[key]["dual"] for t in trials]),"median_wall_s":med([t[key]["wall_s"] for t in trials])}

def main():
    src,source=download();resid,s1,active_names,active_conss=stage1(src)
    ft=time.perf_counter();lp,linear=load_lp(resid);g,colors,names,graphmeta=build_active_graph(lp,active_names)
    gens,acc,bliss=active_generators(g,colors,names);selected=select_two(acc);frontend=time.perf_counter()-ft
    if selected is None:raise RuntimeError(f"no composable active generators; count={len(acc)}")
    g1,g2=selected
    b1={k:g1[k] for k in ("index","a_name","b_name")}
    b2={k:g2[k] for k in ("index","a_name","b_name")}
    trials=[]
    for seed in SEEDS:
        a=solve(resid,seed,[])
        b=solve(resid,seed,[b1,b2])
        trials.append({"seed":seed,"baseline":a,"double":b})
        print(seed,"gap",a["gap"],b["gap"],"nodes",a["nodes"],b["nodes"],flush=True)
    sm={"baseline":summary(trials,"baseline"),"double":summary(trials,"double")}
    sm.update({
      "paired_gap_wins":sum(1 for t in trials if t["baseline"]["gap"] is not None and t["double"]["gap"] is not None and t["double"]["gap"]<t["baseline"]["gap"]),
      "paired_gap_losses":sum(1 for t in trials if t["baseline"]["gap"] is not None and t["double"]["gap"] is not None and t["double"]["gap"]>t["baseline"]["gap"]),
      "paired_gap_ties":sum(1 for t in trials if t["baseline"]["gap"]==t["double"]["gap"])
    })
    genmeta=[{"index":x["index"],"moved_active_variables":len(x["moved"]),"involution":x["involution"],
              "a_name":x["a_name"],"b_name":x["b_name"]} for x in acc]
    result={"experiment":"n5-active-only-long-holdout-0.1","date":"2026-10-06","source":source,
      "pyscipopt_version":pyscipopt.__version__,"igraph_version":ig.__version__,
      "stage1":s1,"linearized_export":linear,"active_graph":graphmeta,
      "symmetry":{"generator_count":len(gens),"active_generator_count":len(acc),"bliss_wall_s":bliss,
                  "structural_frontend_wall_s":frontend,"generators":genmeta,
                  "selected_breakers":[b1,b2]},
      "trials":trials,"summary":sm,"disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# n5-3 active-only symmetry long holdout 0.1","",
      f"**Stage-1 SCIP presolve wall:** {s1['presolve_wall_s']:.6f}s",
      f"**Export-only vars safely dropped from structural analysis:** {graphmeta['dropped_export_only_variables']}",
      f"**Active BLISS generators:** {len(acc)}",
      f"**BLISS wall:** {bliss:.6f}s",
      f"**Total structural frontend:** {frontend:.6f}s",
      f"**Breakers:** {b1['a_name']} >= {b1['b_name']} ; {b2['a_name']} >= {b2['b_name']}","",
      "| Seed | Baseline gap | Double gap | Baseline nodes | Double nodes | Baseline LP | Double LP |",
      "| ---: | ---: | ---: | ---: | ---: | ---: | ---: |"]
    for t in trials:
        lines.append(f"| {t['seed']} | {t['baseline']['gap']} | {t['double']['gap']} | {t['baseline']['nodes']} | {t['double']['nodes']} | {t['baseline']['lp_iterations']} | {t['double']['lp_iterations']} |")
    lines += ["","## Medians","",f"~~~json\n{json.dumps(sm,indent=2)}\n~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"stage1":s1,"active_graph":graphmeta,"symmetry":result["symmetry"],"summary":sm},indent=2))

if __name__=="__main__":main()
