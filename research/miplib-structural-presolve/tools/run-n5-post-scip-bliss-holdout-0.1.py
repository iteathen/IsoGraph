#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-n5-post-scip-bliss-0.1")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
LIMIT=15.0
SEEDS=[0,1,2,3,4]

def cf(x):
    x=float(x); inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def download():
    data=urllib.request.urlopen(URL,timeout=90).read()
    raw=gzip.decompress(data)
    p=OUT/"n5-3.mps"; p.write_bytes(raw)
    return p,{"source_url":URL,"gzip_sha256":hashlib.sha256(data).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def scip_base(path,seed=0,presolve_rounds=None):
    m=Model();m.hideOutput(True);m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    m.setIntParam("misc/usesymmetry",0)
    if presolve_rounds is not None:m.setIntParam("presolving/maxrounds",int(presolve_rounds))
    return m

def transform(src):
    m=scip_base(src,0,None)
    t=time.perf_counter();m.presolve();wall=time.perf_counter()-t
    snap={"vars":int(m.getNVars(transformed=True)),"conss":int(m.getNConss(transformed=True)),
          "presolve_time_s":float(m.getPresolvingTime()),"presolve_wall_s":wall}
    p=OUT/"n5-3-scip-transformed.mps"
    m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,snap

def load_lp(path):
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("HiGHS read transformed failed")
    return h.getLp(),{"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}

def matrix_edges(lp):
    n=int(lp.num_col_);m=int(lp.num_row_)
    triples=[]
    st=list(lp.a_matrix_.start_);ind=list(lp.a_matrix_.index_);val=list(lp.a_matrix_.value_)
    if lp.a_matrix_.format_==highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(st[j],st[j+1]):triples.append((int(ind[p]),j,float(val[p])))
    elif lp.a_matrix_.format_==highspy.MatrixFormat.kRowwise:
        for i in range(m):
            for p in range(st[i],st[i+1]):triples.append((i,int(ind[p]),float(val[p])))
    else:raise RuntimeError("unsupported matrix format")
    return triples

def build_subdivision(lp):
    n=int(lp.num_col_);m=int(lp.num_row_);triples=matrix_edges(lp)
    attrs=[]
    for j in range(n):
        attrs.append(("V",cf(lp.col_cost_[j]),cf(lp.col_lower_[j]),cf(lp.col_upper_[j]),
                      str(lp.integrality_[j]) if len(lp.integrality_) else "C"))
    for i in range(m):
        attrs.append(("R",cf(lp.row_lower_[i]),cf(lp.row_upper_[i])))
    for _,_,a in triples:attrs.append(("E",cf(a)))
    palette={};colors=[]
    for a in attrs:
        if a not in palette:palette[a]=len(palette)
        colors.append(palette[a])
    edges=[]
    base=n+m
    for k,(i,j,a) in enumerate(triples):
        e=base+k
        edges.append((j,e));edges.append((e,n+i))
    g=ig.Graph(n=len(attrs),edges=edges,directed=False)
    return g,colors,{"variables":n,"rows":m,"coefficient_vertices":len(triples),"vertices":len(attrs),"edges":len(edges),"color_classes":len(palette)}

def replay(g,colors,perm):
    if len(perm)!=g.vcount() or sorted(perm)!=list(range(g.vcount())):raise RuntimeError("generator is not a permutation")
    for i,p in enumerate(perm):
        if colors[i]!=colors[p]:raise RuntimeError("generator changes vertex color")
    edge_set={tuple(sorted(e.tuple)) for e in g.es}
    for u,v in edge_set:
        if tuple(sorted((perm[u],perm[v]))) not in edge_set:raise RuntimeError("generator fails edge replay")
    return True

def colname(lp,j):
    return str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}"

def choose_generator(lp,generators,colors,g):
    n=int(lp.num_col_)
    accepted=[]
    for k,perm in enumerate(generators):
        replay(g,colors,perm)
        moved=[j for j in range(n) if perm[j]!=j]
        if not moved:continue
        if any(perm[j]>=n for j in moved):raise RuntimeError("variable maps outside variable partition")
        names=sorted((colname(lp,j),j) for j in moved)
        _,a=names[0];b=perm[a]
        accepted.append({"generator_index":k,"perm":perm,"moved_variables":len(moved),
          "a_index":a,"b_index":b,"a_name":colname(lp,a),"b_name":colname(lp,b)})
    if not accepted:return None,[]
    accepted.sort(key=lambda x:(x["a_name"],x["b_name"],x["generator_index"]))
    return accepted[0],accepted

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(path,seed,breaker=None):
    m=scip_base(path,seed,0);m.setRealParam("limits/time",LIMIT)
    if breaker:
        vd={v.name:v for v in m.getVars(transformed=False)}
        a=breaker["a_name"];b=breaker["b_name"]
        if a not in vd or b not in vd:raise RuntimeError(f"breaker vars missing: {a},{b}")
        m.addCons(vd[a]>=vd[b],name="IG_BLISS_EXACT_BREAKER")
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    return {"seed":seed,"status":str(m.getStatus()),"primal":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(v):
    v=[x for x in v if x is not None];return statistics.median(v) if v else None

def main():
    src,source=download();trans,scip_snap=transform(src);lp,linear=load_lp(trans)
    g,colors,enc=build_subdivision(lp)
    t=time.perf_counter();gens=g.automorphism_group(sh="fl",color=colors);bliss_wall=time.perf_counter()-t
    chosen,accepted=choose_generator(lp,gens,colors,g)
    result={"experiment":"n5-3-post-scip-bliss-holdout-0.1","date":"2026-10-06",
      "source":source,"pyscipopt_version":pyscipopt.__version__,"igraph_version":ig.__version__,
      "scip_transformed":scip_snap,"linearized_transformed":linear,"encoding":enc,
      "bliss":{"wall_s":bliss_wall,"generator_count":len(gens),"variable_moving_generator_count":len(accepted)},
      "accepted_generators":[{k:v for k,v in x.items() if k!="perm"} for x in accepted],
      "chosen_breaker":None if chosen is None else {k:v for k,v in chosen.items() if k!="perm"}}
    if chosen is None:
        result.update({"status":"NO_VARIABLE_MOVING_GENERATOR","disposition":"PASS","trials":[]})
    else:
        trials=[]
        for seed in SEEDS:
            b=solve(trans,seed,None);k=solve(trans,seed,chosen);trials.append({"seed":seed,"baseline":b,"breaker":k})
            print(seed,b["gap"],k["gap"],b["nodes"],k["nodes"],flush=True)
        summary={
          "baseline_median_gap":med([t["baseline"]["gap"] for t in trials]),
          "breaker_median_gap":med([t["breaker"]["gap"] for t in trials]),
          "baseline_median_nodes":med([t["baseline"]["nodes"] for t in trials]),
          "breaker_median_nodes":med([t["breaker"]["nodes"] for t in trials]),
          "baseline_median_lp":med([t["baseline"]["lp_iterations"] for t in trials]),
          "breaker_median_lp":med([t["breaker"]["lp_iterations"] for t in trials]),
          "paired_gap_wins":sum(1 for t in trials if t["baseline"]["gap"] is not None and t["breaker"]["gap"] is not None and t["breaker"]["gap"]<t["baseline"]["gap"]),
          "paired_gap_losses":sum(1 for t in trials if t["baseline"]["gap"] is not None and t["breaker"]["gap"] is not None and t["breaker"]["gap"]>t["baseline"]["gap"]),
          "paired_gap_ties":sum(1 for t in trials if t["baseline"]["gap"]==t["breaker"]["gap"])
        }
        result.update({"status":"EXACT_POST_SCIP_BLISS_AUTOMORPHISM","disposition":"PASS","trials":trials,"summary":summary})
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# n5-3 post-SCIP BLISS automorphism holdout 0.1","",f"**Status:** {result['status']}",
      f"**BLISS generators:** {len(gens)}",f"**Variable-moving generators:** {len(accepted)}",f"**BLISS wall:** {bliss_wall:.6f}s"]
    if chosen:
        lines += ["",f"**Breaker:** {chosen['a_name']} >= {chosen['b_name']}","",
          "| Seed | Baseline gap | Breaker gap | Baseline nodes | Breaker nodes |",
          "| ---: | ---: | ---: | ---: | ---: |"]
        for t in result["trials"]:lines.append(f"| {t['seed']} | {t['baseline']['gap']} | {t['breaker']['gap']} | {t['baseline']['nodes']} | {t['breaker']['nodes']} |")
        lines += ["","~~~json",json.dumps(result["summary"],indent=2),"~~~"]
    lines += ["","Every selected BLISS generator was replay-checked against vertex colors and the complete subdivision edge set before use."]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"status":result["status"],"bliss":result["bliss"],"chosen":result["chosen_breaker"],"summary":result.get("summary")},indent=2))

if __name__=="__main__":main()
