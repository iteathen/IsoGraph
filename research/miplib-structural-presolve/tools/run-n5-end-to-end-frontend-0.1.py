#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from pathlib import Path
import highspy, networkx as nx, pyscipopt
from networkx.algorithms import isomorphism as iso
from pyscipopt import Model

OUT=Path("out/miplib-n5-end-to-end-frontend-0.1");OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
A="C0012";B="C0039";SEEDS=[0,1,2,3,4];LIMIT=30.0;ROUNDS=6

def cf(x):
    x=float(x);inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def download():
    d=urllib.request.urlopen(URL,timeout=90).read();raw=gzip.decompress(d)
    p=OUT/"n5-3.mps";p.write_bytes(raw)
    return p,{"source_url":URL,"gzip_sha256":hashlib.sha256(d).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def configure_highs(h,presolve="off"):
    h.setOptionValue("output_flag",False);h.setOptionValue("threads",1)
    h.setOptionValue("parallel","off");h.setOptionValue("random_seed",0);h.setOptionValue("presolve",presolve)

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

def compress(xs):
    d={};out=[]
    for x in xs:
        if x not in d:d[x]=len(d)
        out.append(d[x])
    return out

def build_graph(lp):
    rows,cols=matrix_views(lp);n=int(lp.num_col_);m=int(lp.num_row_)
    vb=[(cf(lp.col_cost_[j]),cf(lp.col_lower_[j]),cf(lp.col_upper_[j]),str(lp.integrality_[j]) if len(lp.integrality_) else "C") for j in range(n)]
    rb=[(cf(lp.row_lower_[i]),cf(lp.row_upper_[i])) for i in range(m)]
    vc=compress(vb);rc=compress(rb)
    for _ in range(ROUNDS):
        rc=compress([(rb[i],tuple(sorted((cf(a),vc[j]) for j,a in rows[i].items()))) for i in range(m)])
        vc=compress([(vb[j],tuple(sorted((cf(a),rc[i]) for i,a in cols[j].items()))) for j in range(n)])
    G=nx.Graph()
    for j in range(n):G.add_node(("v",j),kind="v",base=json.dumps(vb[j]),color=vc[j])
    for i in range(m):
        G.add_node(("r",i),kind="r",base=json.dumps(rb[i]),color=rc[i])
        for j,a in rows[i].items():G.add_edge(("r",i),("v",j),coef=cf(a))
    return G

def certify_target(lp,G):
    names=[str(x) for x in lp.col_names_];pos={n:i for i,n in enumerate(names)}
    if A not in pos or B not in pos:raise RuntimeError("target breaker variables missing from HiGHS residual")
    a,b=pos[A],pos[B]
    nm=iso.categorical_node_match(["kind","base","color"],[None,None,None]);em=iso.categorical_edge_match("coef",None)
    gm=iso.GraphMatcher(G,G,node_match=nm,edge_match=em)
    t0=time.perf_counter();examined=0;mapping=None
    for mp in gm.isomorphisms_iter():
        examined+=1
        if mp.get(("v",a))==("v",b):
            mapping=mp;break
        if examined>=20:break
    wall=time.perf_counter()-t0
    if mapping is None:raise RuntimeError(f"target exact automorphism not recovered in {examined} mappings")
    for n,d in G.nodes(data=True):
        md=G.nodes[mapping[n]]
        if (d["kind"],d["base"],d["color"])!=(md["kind"],md["base"],md["color"]):raise RuntimeError("node replay")
    for u,v,d in G.edges(data=True):
        mu,mv=mapping[u],mapping[v]
        if not G.has_edge(mu,mv) or G[mu][mv]["coef"]!=d["coef"]:raise RuntimeError("edge replay")
    return {"a_index":a,"b_index":b,"a_name":A,"b_name":B,"mappings_examined":examined,"discovery_wall_s":wall,
      "moved_variables":sum(1 for j in range(int(lp.num_col_)) if mapping[("v",j)]!=("v",j)),
      "moved_rows":sum(1 for i in range(int(lp.num_row_)) if mapping[("r",i)]!=("r",i)),
      "certificate_replay":True}

def make_residual(src):
    h=highspy.Highs();configure_highs(h,"on")
    if h.readModel(str(src))==highspy.HighsStatus.kError:raise RuntimeError("read")
    t=time.perf_counter();st=h.presolve();wall=time.perf_counter()-t
    if st==highspy.HighsStatus.kError:raise RuntimeError("presolve")
    lp=h.getPresolvedLp();G=build_graph(lp);cert=certify_target(lp,G)
    p=OUT/"n5-3-highs-residual.mps"
    e=highspy.Highs();configure_highs(e,"off")
    if e.passModel(lp)==highspy.HighsStatus.kError:raise RuntimeError("pass residual")
    if e.writeModel(str(p))==highspy.HighsStatus.kError:raise RuntimeError("write residual")
    return p,lp,{"highs_presolve_wall_s":wall,"structural_discovery_wall_s":cert["discovery_wall_s"],
      "frontend_wall_s":wall+cert["discovery_wall_s"],"residual_rows":int(lp.num_row_),"residual_cols":int(lp.num_col_),
      "residual_nonzeros":len(lp.a_matrix_.value_),"residual_offset":float(lp.offset_)},cert

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def scip(path,seed,mode,breaker=False):
    m=Model();m.hideOutput(True);m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except:pass
    if mode=="original":
        pass
    else:
        m.setIntParam("misc/usesymmetry",0);m.setIntParam("presolving/maxrounds",0)
    m.setRealParam("limits/time",LIMIT)
    if breaker:
        vd={v.name:v for v in m.getVars(transformed=False)}
        if A not in vd or B not in vd:raise RuntimeError("breaker vars missing")
        m.addCons(vd[A]>=vd[B],name="IG_EXACT_RESIDUAL_BREAKER")
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    p=finite(m.getPrimalbound());d=finite(m.getDualbound())
    width=None if p is None or d is None else abs(p-d)
    return {"seed":seed,"status":str(m.getStatus()),"primal":p,"dual":d,"bound_width":width,"gap":finite(m.getGap()),
      "nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(v):
    v=[x for x in v if x is not None];return statistics.median(v) if v else None

def summarize(trials,key):
    return {
      "median_bound_width":med([t[key]["bound_width"] for t in trials]),
      "median_gap":med([t[key]["gap"] for t in trials]),
      "median_nodes":med([t[key]["nodes"] for t in trials]),
      "median_lp_iterations":med([t[key]["lp_iterations"] for t in trials]),
      "median_wall_s":med([t[key]["wall_s"] for t in trials])
    }

def main():
    src,source=download();residual,lp,front,cert=make_residual(src)
    trials=[]
    for seed in SEEDS:
        a=scip(src,seed,"original",False)
        b=scip(residual,seed,"residual",False)
        c=scip(residual,seed,"residual",True)
        trials.append({"seed":seed,"A_original_default":a,"B_highs_residual":b,"C_residual_plus_ig":c})
        print(seed,a["bound_width"],b["bound_width"],c["bound_width"],flush=True)
    summary={k:summarize(trials,k) for k in ["A_original_default","B_highs_residual","C_residual_plus_ig"]}
    summary["paired_C_vs_B_bound_width_wins"]=sum(1 for t in trials if t["C_residual_plus_ig"]["bound_width"]<t["B_highs_residual"]["bound_width"])
    summary["paired_C_vs_A_bound_width_wins"]=sum(1 for t in trials if t["C_residual_plus_ig"]["bound_width"]<t["A_original_default"]["bound_width"])
    result={"experiment":"n5-3-end-to-end-frontend-0.1","date":"2026-10-06","source":source,
      "highs_version":highspy.Highs().version(),"pyscipopt_version":pyscipopt.__version__,
      "front_end":front,"certificate":cert,"trials":trials,"summary":summary,"disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# n5-3 end-to-end structural front-end benchmark 0.1","",f"**Front-end overhead:** {front['frontend_wall_s']:.3f}s",
      f"**Exact breaker:** {A} >= {B}","",
      "| Seed | Original width | HiGHS residual width | Residual + IG width | Original nodes | Residual nodes | IG nodes |",
      "| ---: | ---: | ---: | ---: | ---: | ---: | ---: |"]
    for t in trials:
        a=t["A_original_default"];b=t["B_highs_residual"];c=t["C_residual_plus_ig"]
        lines.append(f"| {t['seed']} | {a['bound_width']} | {b['bound_width']} | {c['bound_width']} | {a['nodes']} | {b['nodes']} | {c['nodes']} |")
    lines += ["","## Medians","",f"~~~json\n{json.dumps(summary,indent=2)}\n~~~",
      "","Cross-formulation comparison uses primal-dual bound width, which is invariant to objective constant offsets. Solver-reported relative gaps are retained but are not the primary cross-formulation metric.",
      "The structural front-end overhead is reported separately and must be included in any end-to-end economic interpretation."]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"front_end":front,"certificate":cert,"summary":summary},indent=2))

if __name__=="__main__":main()
