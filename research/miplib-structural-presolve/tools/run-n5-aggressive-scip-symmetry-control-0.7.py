#!/usr/bin/env python3
import gzip, hashlib, json, math, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
from pyscipopt import Model
import numpy as np

OUT=Path("out/miplib-n5-aggressive-scip-control-0.7")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
EXPECTED=[("t_C0021","t_C0026"),("t_C0027","t_C0028")]

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

def transform(src):
    m=Model();m.hideOutput(True)
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",0)
    except Exception:pass
    m.setIntParam("misc/usesymmetry",0);m.readProblem(str(src));m.presolve()
    active={str(v.name) for v in m.getVars(transformed=True)}
    p=OUT/"n5-scip-transformed.mps";m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,active,{"vars":len(active),"conss":m.getNConss(transformed=True),"presolve_s":m.getPresolvingTime()}

def matrix_views(lp):
    n=int(lp.num_col_);m=int(lp.num_row_);rows=[{} for _ in range(m)];cols=[{} for _ in range(n)]
    st=list(lp.a_matrix_.start_);ind=list(lp.a_matrix_.index_);val=list(lp.a_matrix_.value_)
    if lp.a_matrix_.format_==highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(st[j],st[j+1]):
                i=int(ind[p]);v=float(val[p]);rows[i][j]=v;cols[j][i]=v
    else:
        for i in range(m):
            for p in range(st[i],st[i+1]):
                j=int(ind[p]);v=float(val[p]);rows[i][j]=v;cols[j][i]=v
    return rows,cols

def build_active(lp,active_names):
    rows,cols=matrix_views(lp);n=int(lp.num_col_);m=int(lp.num_row_)
    raw_names=list(lp.col_names_);names0=[str(raw_names[j]) if j<len(raw_names) and raw_names[j] else f"col#{j}" for j in range(n)]
    costs=[float(x) for x in lp.col_cost_];lo=[float(x) for x in lp.col_lower_];up=[float(x) for x in lp.col_upper_]
    ints=list(lp.integrality_) if len(lp.integrality_) else [];rlo=[float(x) for x in lp.row_lower_];rup=[float(x) for x in lp.row_upper_]
    active=[];inactive=[]
    for j,nm in enumerate(names0):(active if nm in active_names else inactive).append(j)
    for j in inactive:
        if not(len(cols[j])==0 and (close(costs[j],0.0) or close(lo[j],up[j]))):
            raise RuntimeError("unsafe export-only column")
    remap=[-1]*n
    for k,j in enumerate(active):remap[j]=k
    names=[names0[j] for j in active]
    attrs=[("V",cf(costs[j]),cf(lo[j]),cf(up[j]),str(ints[j]) if ints else "C") for j in active]
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
    return names,colors,edges

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
            pairs=[(x["a_name"],x["b_name"]),(y["a_name"],y["b_name"])]
            return len(acc),pairs
    raise RuntimeError("no composable pair")

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None


PARAMS=[
 "misc/usesymmetry",
 "propagating/symmetry/symtiming",
 "propagating/symmetry/addstrongsbcs",
 "propagating/symmetry/usedynamicprop"
]
SEEDS=[0,1,2]
LIMIT=15.0

def configure_variant(m,seed,variant):
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    m.setRealParam("limits/time",LIMIT)
    if variant=="default":
        pass
    elif variant=="late":
        m.setIntParam("misc/usesymmetry",7)
        m.setIntParam("propagating/symmetry/symtiming",2)
    elif variant=="aggressive":
        m.setIntParam("misc/usesymmetry",5)
        m.setIntParam("propagating/symmetry/symtiming",2)
        m.setBoolParam("propagating/symmetry/addstrongsbcs",True)
        m.setBoolParam("propagating/symmetry/usedynamicprop",False)
    elif variant=="ig":
        m.setIntParam("misc/usesymmetry",0)
    else:
        raise RuntimeError(f"unknown variant {variant}")

def add_ig_breakers(m,pairs):
    vd={str(v.name):v for v in m.getVars(transformed=False)}
    for k,(a,b) in enumerate(pairs):
        if a not in vd or b not in vd:raise RuntimeError(f"IG breaker var missing {a}/{b}")
        m.addCons(vd[a]>=vd[b],name=f"IG_EXACT_BREAKER_{k}")

def actual_params(m):
    out={}
    for p in PARAMS:
        try:out[p]=m.getParam(p)
        except Exception as e:out[p]=f"ERROR:{e!r}"
    return out

def snapshot(path,variant,pairs):
    m=Model();m.hideOutput(True);m.readProblem(str(path));configure_variant(m,0,variant)
    if variant=="ig":add_ig_breakers(m,pairs)
    before=actual_params(m)
    m.presolve()
    conss=m.getConss(transformed=True)
    names=[str(c.name) for c in conss]
    sym=[n for n in names if any(t in n.lower() for t in ("orbitope","sym","orbit","lex","sst"))]
    handlers={}
    for c in conss:
        h=str(c.getConshdlrName());handlers[h]=handlers.get(h,0)+1
    return {"params":before,"vars":m.getNVars(transformed=True),"conss":m.getNConss(transformed=True),
      "symmetry_named_constraints":sym,"handlers":dict(sorted(handlers.items()))}

def solve(path,seed,variant,pairs):
    m=Model();m.hideOutput(True);m.readProblem(str(path));configure_variant(m,seed,variant)
    if variant=="ig":add_ig_breakers(m,pairs)
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    return {"seed":seed,"status":str(m.getStatus()),"primal":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(xs):
    xs=[x for x in xs if x is not None]
    return statistics.median(xs) if xs else None

def main():
    src,source=download();resid,active,stage=transform(src)
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(resid))==highspy.HighsStatus.kError:raise RuntimeError("read residual for exact graph")
    lp=h.getLp();names,colors,edges=build_active(lp,active);g=ig.Graph(n=len(colors),edges=edges,directed=False)
    gens=g.automorphism_group(sh="fl",color=colors);active_gen_count,pairs=select_two(gens,names,g,colors)
    if pairs!=EXPECTED:raise RuntimeError(f"breaker drift {pairs}")

    variants=["default","late","aggressive","ig"]
    snaps={v:snapshot(resid,v,pairs) for v in variants}
    trials={v:[] for v in variants}
    for seed in SEEDS:
        for v in variants:
            r=solve(resid,seed,v,pairs);trials[v].append(r)
            print(seed,v,r["gap"],r["nodes"],flush=True)
    summary={}
    for v in variants:
        summary[v]={"median_gap":med([x["gap"] for x in trials[v]]),
                    "median_nodes":med([x["nodes"] for x in trials[v]]),
                    "median_lp_iterations":med([x["lp_iterations"] for x in trials[v]]),
                    "median_wall_s":med([x["wall_s"] for x in trials[v]])}
    result={"experiment":"n5-aggressive-scip-symmetry-control-0.7","date":"2026-10-06","source":source,
      "stage1":stage,"exact":{"generator_count":len(gens),"active_generator_count":active_gen_count,"breakers":pairs},
      "snapshots":snaps,"trials":trials,"summary":summary,"disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# n5-3 aggressive SCIP residual-symmetry control 0.7","",
      f"**Exact breakers:** {pairs}","",
      "| Variant | Median gap | Median nodes | Median LP | Symmetry-named constraints |",
      "| --- | ---: | ---: | ---: | ---: |"]
    for v in variants:
        s=summary[v];lines.append(f"| {v} | {s['median_gap']} | {s['median_nodes']} | {s['median_lp_iterations']} | {len(snaps[v]['symmetry_named_constraints'])} |")
    lines+=["","## Parameters","",f"~~~json\n{json.dumps({v:snaps[v]['params'] for v in variants},indent=2)}\n~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"summary":summary,"symmetry_named":{v:snaps[v]["symmetry_named_constraints"] for v in variants},"params":{v:snaps[v]["params"] for v in variants}},indent=2))

if __name__=="__main__":main()
