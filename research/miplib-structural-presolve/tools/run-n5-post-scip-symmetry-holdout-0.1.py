#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from pathlib import Path

import highspy
import networkx as nx
import pyscipopt
from networkx.algorithms import isomorphism as iso
from pyscipopt import Model

OUT=Path("out/miplib-n5-post-scip-symmetry-0.1")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
LIMIT=15.0
SEEDS=[0,1,2,3,4]
ROUNDS=6
SEARCH_LIMIT=60.0
MAPPING_LIMIT=2000

def cf(x):
    x=float(x); inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def download():
    data=urllib.request.urlopen(URL,timeout=90).read()
    raw=gzip.decompress(data)
    p=OUT/"n5-3.mps";p.write_bytes(raw)
    return p,{
      "source_url":URL,
      "gzip_sha256":hashlib.sha256(data).hexdigest(),
      "mps_sha256":hashlib.sha256(raw).hexdigest()
    }

def base_scip(path,seed=0,presolve_rounds=None):
    m=Model();m.hideOutput(True);m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    m.setIntParam("misc/usesymmetry",0)
    if presolve_rounds is not None:
        m.setIntParam("presolving/maxrounds",int(presolve_rounds))
    return m

def scip_transform(src):
    m=base_scip(src,0,None)
    m.presolve()
    snap={
      "vars":int(m.getNVars(transformed=True)),
      "conss":int(m.getNConss(transformed=True)),
      "presolve_time_s":float(m.getPresolvingTime())
    }
    out=OUT/"n5-3-scip-transformed.mps"
    m.writeProblem(str(out),trans=True,genericnames=False,verbose=False)
    return out,snap

def load_lp(path):
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(path))==highspy.HighsStatus.kError:
        raise RuntimeError("HiGHS failed to read SCIP transformed MPS")
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

def compress(xs):
    d={};out=[]
    for x in xs:
        if x not in d:d[x]=len(d)
        out.append(d[x])
    return out

def build_graph(lp):
    rows,cols=matrix_views(lp);n=int(lp.num_col_);m=int(lp.num_row_)
    vb=[(cf(lp.col_cost_[j]),cf(lp.col_lower_[j]),cf(lp.col_upper_[j]),
         str(lp.integrality_[j]) if len(lp.integrality_)>j else "C") for j in range(n)]
    rb=[(cf(lp.row_lower_[i]),cf(lp.row_upper_[i])) for i in range(m)]
    vc=compress(vb);rc=compress(rb)
    for _ in range(ROUNDS):
        rc=compress([(rb[i],tuple(sorted((cf(a),vc[j]) for j,a in rows[i].items()))) for i in range(m)])
        vc=compress([(vb[j],tuple(sorted((cf(a),rc[i]) for i,a in cols[j].items()))) for j in range(n)])
    G=nx.Graph()
    for j in range(n):
        G.add_node(("v",j),kind="v",base=json.dumps(vb[j],separators=(",",":")),color=int(vc[j]))
    for i in range(m):
        G.add_node(("r",i),kind="r",base=json.dumps(rb[i],separators=(",",":")),color=int(rc[i]))
        for j,a in rows[i].items():
            G.add_edge(("r",i),("v",j),coef=cf(a))
    return G

def first_nonidentity(G):
    nm=iso.categorical_node_match(["kind","base","color"],[None,None,None])
    em=iso.categorical_edge_match("coef",None)
    gm=iso.GraphMatcher(G,G,node_match=nm,edge_match=em)
    t0=time.perf_counter();examined=0
    for mapping in gm.isomorphisms_iter():
        examined+=1
        if any(a!=b for a,b in mapping.items()):
            return mapping,examined,time.perf_counter()-t0,False,False
        if examined>=MAPPING_LIMIT:
            return None,examined,time.perf_counter()-t0,False,True
        if time.perf_counter()-t0>=SEARCH_LIMIT:
            return None,examined,time.perf_counter()-t0,True,False
    return None,examined,time.perf_counter()-t0,False,False

def replay_graph(G,mapping):
    for n,d in G.nodes(data=True):
        md=G.nodes[mapping[n]]
        if (d["kind"],d["base"],d["color"])!=(md["kind"],md["base"],md["color"]):
            raise RuntimeError("node replay mismatch")
    for u,v,d in G.edges(data=True):
        mu,mv=mapping[u],mapping[v]
        if not G.has_edge(mu,mv):
            raise RuntimeError("edge missing under mapping")
        if G[mu][mv]["coef"]!=d["coef"]:
            raise RuntimeError("edge coefficient mismatch")
    return True

def colname(lp,j):
    return str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}"

def cycle(mapping,node):
    out=[node];cur=mapping[node]
    while cur!=node:
        out.append(cur);cur=mapping[cur]
        if len(out)>len(mapping):raise RuntimeError("invalid permutation cycle")
    return out

def select_breaker(lp,mapping):
    moved=[j for j in range(int(lp.num_col_)) if mapping[("v",j)]!=("v",j)]
    moved.sort(key=lambda j:colname(lp,j))
    if not moved:raise RuntimeError("automorphism moves no variables")
    a=moved[0];b=mapping[("v",a)][1]
    cyc=cycle(mapping,("v",a))
    if len(cyc)<2:raise RuntimeError("selected fixed variable")
    # Graph node color already proves equality of these attributes; record again.
    if cf(lp.col_cost_[a])!=cf(lp.col_cost_[b]):raise RuntimeError("cost mismatch")
    if cf(lp.col_lower_[a])!=cf(lp.col_lower_[b]) or cf(lp.col_upper_[a])!=cf(lp.col_upper_[b]):
        raise RuntimeError("domain mismatch")
    if len(lp.integrality_) and lp.integrality_[a]!=lp.integrality_[b]:
        raise RuntimeError("integrality mismatch")
    return {
      "a_index":a,"b_index":b,
      "a_name":colname(lp,a),"b_name":colname(lp,b),
      "cycle_length":len(cyc),
      "cycle_names":[colname(lp,x[1]) for x in cyc],
      "cost":float(lp.col_cost_[a]),
      "lower":float(lp.col_lower_[a]),"upper":float(lp.col_upper_[a]),
      "integrality":str(lp.integrality_[a]) if len(lp.integrality_) else "C"
    }

def finite(x):
    try:
        x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(path,seed,breaker=None):
    m=base_scip(path,seed,0)
    m.setRealParam("limits/time",LIMIT)
    if breaker is not None:
        vd={v.name:v for v in m.getVars(transformed=False)}
        if breaker["a_name"] not in vd or breaker["b_name"] not in vd:
            raise RuntimeError(f"breaker vars missing for seed {seed}")
        m.addCons(vd[breaker["a_name"]]>=vd[breaker["b_name"]],name="IG_POST_SCIP_EXACT_BREAKER")
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    return {
      "seed":seed,"status":str(m.getStatus()),
      "primal":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),"gap":finite(m.getGap()),
      "nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),
      "solutions":int(m.getNSols()),"wall_s":wall,
      "vars":int(m.getNVars(transformed=True)),"conss":int(m.getNConss(transformed=True))
    }

def median(xs):
    xs=[x for x in xs if x is not None and math.isfinite(float(x))]
    return statistics.median(xs) if xs else None

def ratio(a,b):
    if a is None or b is None or float(b)==0:return None
    return float(a)/float(b)

def main():
    src,source=download()
    transformed,scip_snap=scip_transform(src)
    lp,linear_snap=load_lp(transformed)
    if linear_snap["rows"]<=0 or linear_snap["cols"]<=0:
        raise RuntimeError("empty transformed residual")
    G=build_graph(lp)
    mapping,examined,search_wall,timed_out,capped=first_nonidentity(G)
    if mapping is None:
        result={
          "experiment":"n5-3-post-scip-symmetry-holdout-0.1","date":"2026-10-06",
          "source":source,"pyscipopt_version":pyscipopt.__version__,
          "scip_transformed":scip_snap,"linearized_transformed":linear_snap,
          "search":{"mappings_examined":examined,"wall_s":search_wall,"timed_out":timed_out,"capped":capped},
          "status":"INCONCLUSIVE","disposition":"PASS"
        }
        (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
        (OUT/"SUMMARY.md").write_text("# n5-3 post-SCIP symmetry holdout 0.1\n\n**Status:** INCONCLUSIVE\n\nNo exact automorphism was recovered within the frozen search budget. This is not a no-symmetry claim.\n")
        print(json.dumps(result,indent=2));return
    replay_graph(G,mapping)
    breaker=select_breaker(lp,mapping)
    moved_vars=sum(1 for j in range(int(lp.num_col_)) if mapping[("v",j)]!=("v",j))
    moved_rows=sum(1 for i in range(int(lp.num_row_)) if mapping[("r",i)]!=("r",i))
    trials=[]
    for seed in SEEDS:
        b=solve(transformed,seed,None)
        k=solve(transformed,seed,breaker)
        trials.append({"seed":seed,"baseline":b,"breaker":k})
        print("seed",seed,"gaps",b["gap"],k["gap"],"nodes",b["nodes"],k["nodes"],flush=True)
    bg=[t["baseline"]["gap"] for t in trials];kg=[t["breaker"]["gap"] for t in trials]
    bn=[t["baseline"]["nodes"] for t in trials];kn=[t["breaker"]["nodes"] for t in trials]
    blp=[t["baseline"]["lp_iterations"] for t in trials];klp=[t["breaker"]["lp_iterations"] for t in trials]
    summary={
      "baseline_median_gap":median(bg),"breaker_median_gap":median(kg),
      "breaker_over_baseline_gap_ratio":ratio(median(kg),median(bg)),
      "baseline_median_nodes":median(bn),"breaker_median_nodes":median(kn),
      "breaker_over_baseline_nodes_ratio":ratio(median(kn),median(bn)),
      "baseline_median_lp_iterations":median(blp),"breaker_median_lp_iterations":median(klp),
      "breaker_over_baseline_lp_ratio":ratio(median(klp),median(blp)),
      "paired_gap_wins":sum(1 for t in trials if t["breaker"]["gap"] is not None and t["baseline"]["gap"] is not None and t["breaker"]["gap"]<t["baseline"]["gap"]),
      "paired_gap_losses":sum(1 for t in trials if t["breaker"]["gap"] is not None and t["baseline"]["gap"] is not None and t["breaker"]["gap"]>t["baseline"]["gap"]),
      "paired_gap_ties":sum(1 for t in trials if t["breaker"]["gap"]==t["baseline"]["gap"])
    }
    result={
      "experiment":"n5-3-post-scip-symmetry-holdout-0.1","date":"2026-10-06",
      "source":source,"pyscipopt_version":pyscipopt.__version__,
      "scip_transformed":scip_snap,"linearized_transformed":linear_snap,
      "graph":{"nodes":G.number_of_nodes(),"edges":G.number_of_edges()},
      "search":{"mappings_examined":examined,"wall_s":search_wall,"timed_out":timed_out,"capped":capped},
      "automorphism":{"certificate_replay":True,"moved_variables":moved_vars,"moved_rows":moved_rows},
      "breaker":breaker,
      "trials":trials,"summary":summary,
      "status":"EXACT_POST_SCIP_AUTOMORPHISM","disposition":"PASS"
    }
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=[
      "# n5-3 post-SCIP exact symmetry holdout 0.1","",
      f"**Disposition:** {result['disposition']}",
      f"**Status:** {result['status']}",
      f"**SCIP transformed:** {linear_snap['rows']} rows x {linear_snap['cols']} cols",
      f"**Automorphism:** {moved_vars} moved vars / {moved_rows} moved rows",
      f"**Breaker:** {breaker['a_name']} >= {breaker['b_name']} (cycle {breaker['cycle_length']})","",
      "| Seed | Baseline gap | Breaker gap | Baseline nodes | Breaker nodes | Baseline LP | Breaker LP |",
      "| ---: | ---: | ---: | ---: | ---: | ---: | ---: |"
    ]
    for t in trials:
        b=t["baseline"];k=t["breaker"]
        lines.append(f"| {t['seed']} | {b['gap']} | {k['gap']} | {b['nodes']} | {k['nodes']} | {b['lp_iterations']} | {k['lp_iterations']} |")
    lines += ["","## Medians","",f"~~~json\n{json.dumps(summary,indent=2)}\n~~~",
      "","Exactness is from the transformed-model automorphism certificate. Timings are directional."]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"status":result["status"],"automorphism":result["automorphism"],"breaker":breaker,"summary":summary},indent=2))

if __name__=="__main__":
    main()
