#!/usr/bin/env python3
import gzip, hashlib, json, statistics, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-n5-active-graph-builder-opt-0.2")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
REPS=20

def cf(x):
    x=float(x);inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def close(a,b,tol=1e-10):
    return abs(float(a)-float(b))<=tol*max(1.0,abs(float(a)),abs(float(b)))

def download():
    data=urllib.request.urlopen(URL,timeout=90).read()
    raw=gzip.decompress(data)
    p=OUT/"n5-3.mps";p.write_bytes(raw)
    return p,{
      "source_url":URL,
      "gzip_sha256":hashlib.sha256(data).hexdigest(),
      "mps_sha256":hashlib.sha256(raw).hexdigest()
    }

def transform(src):
    m=Model();m.hideOutput(True)
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",0)
    except Exception:pass
    m.setIntParam("misc/usesymmetry",0)
    m.readProblem(str(src));m.presolve()
    active_names={str(v.name) for v in m.getVars(transformed=True)}
    out=OUT/"n5-3-scip-transformed.mps"
    m.writeProblem(str(out),trans=True,genericnames=False,verbose=False)
    return out,active_names,{
      "active_vars":len(active_names),
      "active_conss":int(m.getNConss(transformed=True)),
      "presolve_time_s":float(m.getPresolvingTime())
    }

def load_lp(path):
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(path))==highspy.HighsStatus.kError:
        raise RuntimeError("HiGHS read transformed MPS failed")
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
    else:
        raise RuntimeError(f"unsupported matrix format {lp.a_matrix_.format_}")
    return rows,cols

def finish_graph_data(active_old,inactive,names,attrs,trip,m):
    pal={};colors=[]
    for a in attrs:
        if a not in pal:pal[a]=len(pal)
        colors.append(pal[a])
    na=len(active_old);base=na+m;edges=[]
    for k,(i,j,a) in enumerate(trip):
        e=base+k;edges.append((j,e));edges.append((e,na+i))
    meta={
      "active_variables":na,
      "dropped_export_only_variables":len(inactive),
      "rows":m,
      "active_nonzeros":len(trip),
      "vertices":len(attrs),
      "edges":len(edges),
      "color_classes":len(pal)
    }
    return names,colors,edges,meta

def build_scalar(lp,rows,cols,active_names):
    nold=int(lp.num_col_);m=int(lp.num_row_)
    old_names=[str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}" for j in range(nold)]
    active_old=[j for j,n in enumerate(old_names) if n in active_names]
    inactive=[j for j,n in enumerate(old_names) if n not in active_names]
    unsafe=[]
    for j in inactive:
        degree=len(cols[j]);cost=float(lp.col_cost_[j]);lb=float(lp.col_lower_[j]);ub=float(lp.col_upper_[j])
        if not(degree==0 and (close(cost,0.0) or close(lb,ub))):
            unsafe.append((old_names[j],degree,cost,lb,ub))
    if unsafe:raise RuntimeError(f"unsafe scalar export-only columns: {unsafe[:5]}")
    remap={j:k for k,j in enumerate(active_old)}
    names=[old_names[j] for j in active_old]
    attrs=[]
    for j in active_old:
        attrs.append(("V",cf(lp.col_cost_[j]),cf(lp.col_lower_[j]),cf(lp.col_upper_[j]),
                      str(lp.integrality_[j]) if len(lp.integrality_) else "C"))
    for i in range(m):
        attrs.append(("R",cf(lp.row_lower_[i]),cf(lp.row_upper_[i])))
    trip=[]
    for i,row in enumerate(rows):
        for j,a in row.items():
            if j in remap:trip.append((i,remap[j],float(a)))
    for _,_,a in trip:attrs.append(("E",cf(a)))
    return finish_graph_data(active_old,inactive,names,attrs,trip,m)

def build_bulk(lp,rows,cols,active_names):
    nold=int(lp.num_col_);m=int(lp.num_row_)
    # Bulk-copy every pybind-backed vector exactly once.
    raw_names=list(lp.col_names_)
    costs=[float(x) for x in lp.col_cost_]
    lowers=[float(x) for x in lp.col_lower_]
    uppers=[float(x) for x in lp.col_upper_]
    ints=list(lp.integrality_) if len(lp.integrality_) else []
    row_lowers=[float(x) for x in lp.row_lower_]
    row_uppers=[float(x) for x in lp.row_upper_]
    old_names=[str(raw_names[j]) if j<len(raw_names) and raw_names[j] else f"col#{j}" for j in range(nold)]
    active_old=[];inactive=[]
    for j,n in enumerate(old_names):
        (active_old if n in active_names else inactive).append(j)
    unsafe=[]
    for j in inactive:
        degree=len(cols[j]);cost=costs[j];lb=lowers[j];ub=uppers[j]
        if not(degree==0 and (close(cost,0.0) or close(lb,ub))):
            unsafe.append((old_names[j],degree,cost,lb,ub))
    if unsafe:raise RuntimeError(f"unsafe bulk export-only columns: {unsafe[:5]}")
    remap=[-1]*nold
    for k,j in enumerate(active_old):remap[j]=k
    names=[old_names[j] for j in active_old]
    attrs=[]
    for j in active_old:
        attrs.append(("V",cf(costs[j]),cf(lowers[j]),cf(uppers[j]),str(ints[j]) if ints else "C"))
    for i in range(m):
        attrs.append(("R",cf(row_lowers[i]),cf(row_uppers[i])))
    trip=[]
    for i,row in enumerate(rows):
        for j,a in row.items():
            k=remap[j]
            if k>=0:trip.append((i,k,float(a)))
    for _,_,a in trip:attrs.append(("E",cf(a)))
    return finish_graph_data(active_old,inactive,names,attrs,trip,m)

def replay_all(g,colors,gens):
    eset={tuple(sorted(e.tuple)) for e in g.es}
    for p in gens:
        if len(p)!=g.vcount() or sorted(p)!=list(range(g.vcount())):
            raise RuntimeError("bad BLISS generator")
        for i,q in enumerate(p):
            if colors[i]!=colors[q]:raise RuntimeError("color mismatch")
        for u,v in eset:
            if tuple(sorted((p[u],p[v]))) not in eset:raise RuntimeError("edge mismatch")

def select_two(gens,names):
    n=len(names);acc=[]
    for k,p in enumerate(gens):
        moved=[j for j in range(n) if p[j]!=j]
        if not moved:continue
        if any(p[j]>=n for j in moved):raise RuntimeError("variable partition violation")
        invol=all(p[p[i]]==i for i in range(len(p)))
        ordered=sorted((names[j],j) for j in moved);_,a=ordered[0];b=p[a]
        acc.append({"index":k,"perm":p,"moved":moved,"involution":invol,"a":a,"b":b,
                    "a_name":names[a],"b_name":names[b]})
    acc.sort(key=lambda x:(x["a_name"],x["b_name"],x["index"]))
    for i in range(len(acc)):
        for j in range(i+1,len(acc)):
            g1,g2=acc[i],acc[j]
            if not(g1["involution"] and g2["involution"]):continue
            if g2["perm"][g1["a"]]!=g1["a"] or g2["perm"][g1["b"]]!=g1["b"]:continue
            if g1["perm"][g2["a"]]!=g2["a"] or g1["perm"][g2["b"]]!=g2["b"]:continue
            return len(acc),(g1["a_name"],g1["b_name"]),(g2["a_name"],g2["b_name"])
    raise RuntimeError(f"no composable active breaker pair; active generators={len(acc)}")

def median_stats(xs):
    return {"median_s":statistics.median(xs),"min_s":min(xs),"max_s":max(xs)}

def main():
    src,source=download();trans,active_names,scip=transform(src)
    lp,linear=load_lp(trans);rows,cols=matrix_views(lp)

    # Warm-up both implementations and assert byte-logical graph identity.
    a=build_scalar(lp,rows,cols,active_names)
    b=build_bulk(lp,rows,cols,active_names)
    if a!=b:raise RuntimeError("warm-up graph-data mismatch")

    scalar=[];bulk=[]
    for i in range(REPS):
        # Alternate ordering to reduce monotonic warm-cache/order bias.
        if i%2==0:
            t=time.perf_counter();aa=build_scalar(lp,rows,cols,active_names);scalar.append(time.perf_counter()-t)
            t=time.perf_counter();bb=build_bulk(lp,rows,cols,active_names);bulk.append(time.perf_counter()-t)
        else:
            t=time.perf_counter();bb=build_bulk(lp,rows,cols,active_names);bulk.append(time.perf_counter()-t)
            t=time.perf_counter();aa=build_scalar(lp,rows,cols,active_names);scalar.append(time.perf_counter()-t)
        if aa!=a or bb!=a:raise RuntimeError(f"graph-data identity mismatch rep {i}")

    names,colors,edges,meta=a
    g1=ig.Graph(n=len(colors),edges=edges,directed=False)
    gens1=g1.automorphism_group(sh="fl",color=colors);replay_all(g1,colors,gens1)
    active1,p11,p12=select_two(gens1,names)

    names2,colors2,edges2,meta2=b
    g2=ig.Graph(n=len(colors2),edges=edges2,directed=False)
    gens2=g2.automorphism_group(sh="fl",color=colors2);replay_all(g2,colors2,gens2)
    active2,p21,p22=select_two(gens2,names2)

    if len(gens1)!=len(gens2):raise RuntimeError("BLISS generator count changed")
    if active1!=active2:raise RuntimeError("active generator count changed")
    if (p11,p12)!=(p21,p22):raise RuntimeError("selected exact breaker pairs changed")

    ss=median_stats(scalar);bs=median_stats(bulk)
    speed=ss["median_s"]/bs["median_s"] if bs["median_s"]>0 else None
    result={
      "experiment":"n5-active-graph-builder-opt-0.2","date":"2026-10-06",
      "source":source,"pyscipopt_version":pyscipopt.__version__,
      "highs_version":highspy.Highs().version(),"igraph_version":ig.__version__,
      "scip_transformed":scip,"linearized_transformed":linear,"meta":meta,
      "repetitions":REPS,"scalar":ss,"bulk":bs,"median_speed_ratio":speed,
      "identity":{
        "names":names==names2,"colors":colors==colors2,"edges":edges==edges2,"meta":meta==meta2,
        "generator_count":[len(gens1),len(gens2)],"active_generator_count":[active1,active2],
        "breaker_pairs":[p11,p12]
      },
      "disposition":"PASS"
    }
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=[
      "# n5-3 active graph-builder optimization profile 0.2","",
      f"**Disposition:** {result['disposition']}",
      f"**Repetitions:** {REPS}",
      f"**Graph identity:** names/colors/edges/meta all identical",
      f"**BLISS generators:** {len(gens1)}",
      f"**Selected breakers:** {p11[0]} >= {p11[1]} ; {p12[0]} >= {p12[1]}","",
      "| Builder | Median s | Min s | Max s |",
      "| --- | ---: | ---: | ---: |",
      f"| scalar-index | {ss['median_s']:.6f} | {ss['min_s']:.6f} | {ss['max_s']:.6f} |",
      f"| bulk-materialized | {bs['median_s']:.6f} | {bs['min_s']:.6f} | {bs['max_s']:.6f} |","",
      f"**Median speed ratio:** {speed:.3f}x","",
      "This changes only the Python/HiGHS data-access path. Exact graph and certificate outputs are required to be identical."
    ]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps(result,indent=2))

if __name__=="__main__":main()
