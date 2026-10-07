#!/usr/bin/env python3
import gzip, hashlib, json, math, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
from pyscipopt import Model
import numpy as np

OUT=Path("out/miplib-n5-breaker-lp-mechanism-0.1")
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

def solve_lp(path,pairs):
    h=highspy.Highs();h.setOptionValue("output_flag",False);h.setOptionValue("presolve","off")
    if h.setOptionValue("solve_relaxation",True)==highspy.HighsStatus.kError:raise RuntimeError("solve_relaxation option unavailable")
    if h.readModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("read residual")
    for a,b in pairs:
        sa,ia=h.getColByName(a);sb,ib=h.getColByName(b)
        if sa!=highspy.HighsStatus.kOk or sb!=highspy.HighsStatus.kOk:raise RuntimeError("breaker column missing")
        st=h.addRow(0.0,highspy.kHighsInf,2,np.array([ia,ib],dtype=np.int32),np.array([1.0,-1.0],dtype=np.double))
        if st==highspy.HighsStatus.kError:raise RuntimeError("add breaker")
    t=time.perf_counter();rs=h.run();wall=time.perf_counter()-t
    if rs==highspy.HighsStatus.kError:raise RuntimeError("LP run")
    info=h.getInfo()
    return {"status":h.modelStatusToString(h.getModelStatus()),"objective":finite(info.objective_function_value),
      "simplex_iterations":int(info.simplex_iteration_count),"wall_s":wall,"added_breakers":len(pairs)}

def main():
    src,source=download();resid,active,stage=transform(src)
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(resid))==highspy.HighsStatus.kError:raise RuntimeError("read for graph")
    lp=h.getLp();names,colors,edges=build_active(lp,active);g=ig.Graph(n=len(colors),edges=edges,directed=False)
    gens=g.automorphism_group(sh="fl",color=colors);active_gen_count,pairs=select_two(gens,names,g,colors)
    if pairs!=EXPECTED:raise RuntimeError(f"breaker drift {pairs}")
    a=solve_lp(resid,[]);b=solve_lp(resid,[pairs[0]]);c=solve_lp(resid,pairs)
    result={"experiment":"n5-breaker-lp-mechanism-0.1","date":"2026-10-06","source":source,"stage1":stage,
      "exact":{"generator_count":len(gens),"active_generator_count":active_gen_count,"breakers":pairs},
      "baseline":a,"single":b,"double":c,
      "objective_deltas":{"single_minus_baseline":None if a["objective"] is None or b["objective"] is None else b["objective"]-a["objective"],
                          "double_minus_baseline":None if a["objective"] is None or c["objective"] is None else c["objective"]-a["objective"]},
      "disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    (OUT/"SUMMARY.md").write_text(
      "# n5-3 exact breaker LP-mechanism test 0.1\n\n"
      f"**Breakers:** {pairs}\n\n"
      "| Variant | LP objective | Simplex iterations | Wall |\n| --- | ---: | ---: | ---: |\n"
      f"| baseline | {a['objective']} | {a['simplex_iterations']} | {a['wall_s']:.6f}s |\n"
      f"| single | {b['objective']} | {b['simplex_iterations']} | {b['wall_s']:.6f}s |\n"
      f"| double | {c['objective']} | {c['simplex_iterations']} | {c['wall_s']:.6f}s |\n\n"
      f"Single-baseline objective delta: {result['objective_deltas']['single_minus_baseline']}\n\n"
      f"Double-baseline objective delta: {result['objective_deltas']['double_minus_baseline']}\n"
    )
    print(json.dumps(result,indent=2))

if __name__=="__main__":main()
