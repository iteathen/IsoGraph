#!/usr/bin/env python3
import gzip, hashlib, json, statistics, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-n5-active-frontend-profile-0.1")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
REPS=5

def cf(x):
    x=float(x);inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def close(a,b,tol=1e-10):
    return abs(float(a)-float(b))<=tol*max(1.0,abs(float(a)),abs(float(b)))

def get_source():
    t=time.perf_counter()
    data=urllib.request.urlopen(URL,timeout=90).read()
    raw=gzip.decompress(data)
    wall=time.perf_counter()-t
    p=OUT/"n5-3.mps";p.write_bytes(raw)
    return p,wall,{
      "source_url":URL,
      "gzip_sha256":hashlib.sha256(data).hexdigest(),
      "mps_sha256":hashlib.sha256(raw).hexdigest(),
      "gzip_bytes":len(data),"mps_bytes":len(raw)
    }

def new_scip(path):
    m=Model();m.hideOutput(True)
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",0)
    except Exception:pass
    m.setIntParam("misc/usesymmetry",0)
    m.readProblem(str(path))
    return m

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

def build_data(lp,rows,cols,active_names):
    nold=int(lp.num_col_);m=int(lp.num_row_)
    old_names=[str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}" for j in range(nold)]
    active_old=[j for j,n in enumerate(old_names) if n in active_names]
    inactive=[j for j,n in enumerate(old_names) if n not in active_names]
    unsafe=[]
    for j in inactive:
        degree=len(cols[j]);cost=float(lp.col_cost_[j]);lb=float(lp.col_lower_[j]);ub=float(lp.col_upper_[j])
        if not (degree==0 and (close(cost,0.0) or close(lb,ub))):
            unsafe.append({"name":old_names[j],"degree":degree,"cost":cost,"lb":lb,"ub":ub})
    if unsafe:raise RuntimeError(f"unsafe export-only columns: {unsafe[:5]}")
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
    pal={};colors=[]
    for a in attrs:
        if a not in pal:pal[a]=len(pal)
        colors.append(pal[a])
    na=len(active_old);base=na+m;edges=[]
    for k,(i,j,a) in enumerate(trip):
        e=base+k;edges.append((j,e));edges.append((e,na+i))
    meta={"active_variables":na,"dropped_export_only_variables":len(inactive),"rows":m,
          "active_nonzeros":len(trip),"vertices":len(attrs),"edges":len(edges),"color_classes":len(pal)}
    return names,colors,edges,meta

def replay_all(g,colors,gens):
    eset={tuple(sorted(e.tuple)) for e in g.es}
    for p in gens:
        if len(p)!=g.vcount() or sorted(p)!=list(range(g.vcount())):raise RuntimeError("bad generator")
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
            return acc,g1,g2
    raise RuntimeError(f"no composable pair; active generators={len(acc)}")

def one_rep(src,idx):
    times={}
    t=time.perf_counter();m=new_scip(src);times["scip_load_s"]=time.perf_counter()-t
    t=time.perf_counter();m.presolve();times["scip_presolve_s"]=time.perf_counter()-t
    active_names={str(v.name) for v in m.getVars(transformed=True)}
    active_conss={str(c.name) for c in m.getConss(transformed=True)}
    exp=OUT/f"n5-stage1-{idx}.mps"
    t=time.perf_counter();m.writeProblem(str(exp),trans=True,genericnames=False,verbose=False);times["scip_export_mps_s"]=time.perf_counter()-t

    h=highspy.Highs();h.setOptionValue("output_flag",False)
    t=time.perf_counter()
    if h.readModel(str(exp))==highspy.HighsStatus.kError:raise RuntimeError("HiGHS read")
    times["highs_parse_mps_s"]=time.perf_counter()-t
    lp=h.getLp()

    t=time.perf_counter();rows,cols=matrix_views(lp);times["sparse_materialize_s"]=time.perf_counter()-t
    t=time.perf_counter();names,colors,edges,meta=build_data(lp,rows,cols,active_names);times["active_filter_graph_data_s"]=time.perf_counter()-t
    t=time.perf_counter();g=ig.Graph(n=len(colors),edges=edges,directed=False);times["igraph_construct_s"]=time.perf_counter()-t
    t=time.perf_counter();gens=g.automorphism_group(sh="fl",color=colors);times["bliss_s"]=time.perf_counter()-t
    t=time.perf_counter();replay_all(g,colors,gens);times["exact_replay_s"]=time.perf_counter()-t
    t=time.perf_counter();acc,g1,g2=select_two(gens,names);times["select_breakers_s"]=time.perf_counter()-t
    times["structural_after_scip_export_s"]=sum(times[k] for k in [
      "highs_parse_mps_s","sparse_materialize_s","active_filter_graph_data_s","igraph_construct_s",
      "bliss_s","exact_replay_s","select_breakers_s"])
    times["total_from_scip_load_s"]=sum(v for k,v in times.items() if k not in ("structural_after_scip_export_s","total_from_scip_load_s"))
    return {"rep":idx,"times":times,
      "meta":{"active_scip_vars":len(active_names),"active_scip_conss":len(active_conss),
              **meta,"generator_count":len(gens),"active_generator_count":len(acc),
              "breaker1":[g1["a_name"],g1["b_name"]],"breaker2":[g2["a_name"],g2["b_name"]]}}

def med(xs):return statistics.median(xs)
def main():
    src,download_s,source=get_source()
    # Warm-up excluded.
    _=one_rep(src,-1)
    reps=[one_rep(src,i) for i in range(REPS)]
    keys=list(reps[0]["times"])
    summary={k:{"median_s":med([r["times"][k] for r in reps]),
                "min_s":min(r["times"][k] for r in reps),
                "max_s":max(r["times"][k] for r in reps)} for k in keys}
    out={"experiment":"n5-active-frontend-profile-0.1","date":"2026-10-06",
      "download_decompress_s":download_s,"source":source,"pyscipopt_version":pyscipopt.__version__,
      "igraph_version":ig.__version__,"highs_version":highspy.Highs().version(),
      "repetitions":reps,"summary":summary,"disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# n5-3 active structural-frontend profile 0.1","",f"**Repetitions:** {REPS}","",
      "| Stage | Median s | Min s | Max s |","| --- | ---: | ---: | ---: |"]
    for k in keys:
        v=summary[k];lines.append(f"| {k} | {v['median_s']:.6f} | {v['min_s']:.6f} | {v['max_s']:.6f} |")
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"download_decompress_s":download_s,"summary":summary,"meta":reps[0]["meta"]},indent=2))

if __name__=="__main__":main()
