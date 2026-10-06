#!/usr/bin/env python3
import gzip, hashlib, json, math, time, urllib.request
from pathlib import Path
import highspy, networkx as nx, numpy as np, pyscipopt
from networkx.algorithms import isomorphism as iso
from pyscipopt import Model

OUT=Path("out/miplib-n5-higher-sym-0.1")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
LIMIT=20.0
ROUNDS=6

def cf(x):
    x=float(x);inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def configure_highs(h,presolve="off",limit=None):
    h.setOptionValue("output_flag",False);h.setOptionValue("threads",1)
    h.setOptionValue("parallel","off");h.setOptionValue("random_seed",0)
    h.setOptionValue("presolve",presolve);h.setOptionValue("mip_rel_gap",0.0)
    if limit is not None:h.setOptionValue("time_limit",float(limit))

def download():
    data=urllib.request.urlopen(URL,timeout=90).read();raw=gzip.decompress(data)
    p=OUT/"n5-3.mps";p.write_bytes(raw)
    return p,{"gzip_sha256":hashlib.sha256(data).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def matrix_views(lp):
    n=int(lp.num_col_);m=int(lp.num_row_)
    rows=[{} for _ in range(m)];cols=[{} for _ in range(n)]
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
    vb=[(cf(lp.col_cost_[j]),cf(lp.col_lower_[j]),cf(lp.col_upper_[j]),
         str(lp.integrality_[j]) if len(lp.integrality_)>j else "C") for j in range(n)]
    rb=[(cf(lp.row_lower_[i]),cf(lp.row_upper_[i])) for i in range(m)]
    vc=compress(vb);rc=compress(rb)
    for _ in range(ROUNDS):
        rc=compress([(rb[i],tuple(sorted((cf(a),vc[j]) for j,a in rows[i].items()))) for i in range(m)])
        vc=compress([(vb[j],tuple(sorted((cf(a),rc[i]) for i,a in cols[j].items()))) for j in range(n)])
    G=nx.Graph()
    for j in range(n):G.add_node(("v",j),kind="v",base=json.dumps(vb[j]),color=int(vc[j]))
    for i in range(m):
        G.add_node(("r",i),kind="r",base=json.dumps(rb[i]),color=int(rc[i]))
        for j,a in rows[i].items():G.add_edge(("r",i),("v",j),coef=cf(a))
    return G

def first_nonidentity(G):
    nm=iso.categorical_node_match(["kind","base","color"],[None,None,None])
    em=iso.categorical_edge_match("coef",None)
    gm=iso.GraphMatcher(G,G,node_match=nm,edge_match=em)
    for k,m in enumerate(gm.isomorphisms_iter()):
        if any(a!=b for a,b in m.items()):return m,k+1
        if k>20:break
    return None,0

def colname(lp,j):
    return str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}"

def cycle_of(mapping,node):
    out=[node];cur=mapping[node]
    while cur!=node:
        out.append(cur);cur=mapping[cur]
        if len(out)>len(mapping):raise RuntimeError("bad permutation cycle")
    return out

def select_breaker(lp,mapping):
    moved=[j for j in range(int(lp.num_col_)) if mapping[("v",j)]!=("v",j)]
    if not moved:raise RuntimeError("no moved variables")
    moved.sort(key=lambda j:colname(lp,j))
    a=moved[0];b=mapping[("v",a)][1]
    cyc=cycle_of(mapping,("v",a))
    if len(cyc)<2:raise RuntimeError("selected fixed variable")
    return {"a":a,"b":b,"a_name":colname(lp,a),"b_name":colname(lp,b),
            "cycle_length":len(cyc),"cycle_names":[colname(lp,x[1]) for x in cyc],
            "cost":float(lp.col_cost_[a]),"lower":float(lp.col_lower_[a]),"upper":float(lp.col_upper_[a]),
            "integrality":str(lp.integrality_[a]) if len(lp.integrality_)>a else "C"}

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve_highs(lp,breaker=None):
    h=highspy.Highs();configure_highs(h,"off",LIMIT)
    if h.passModel(lp)==highspy.HighsStatus.kError:raise RuntimeError("passModel")
    if breaker:
        st=h.addRow(0.0,highspy.kHighsInf,2,np.array([breaker["a"],breaker["b"]],dtype=np.int32),np.array([1.0,-1.0],dtype=np.double))
        if st==highspy.HighsStatus.kError:raise RuntimeError("breaker add")
    t=time.perf_counter();rs=h.run();wall=time.perf_counter()-t
    if rs==highspy.HighsStatus.kError:raise RuntimeError("run")
    ms=h.getModelStatus();info=h.getInfo()
    return {"status":h.modelStatusToString(ms),"objective":finite(info.objective_function_value),
            "dual":finite(info.mip_dual_bound),"gap":finite(info.mip_gap),
            "nodes":int(info.mip_node_count),"lp_iterations":int(info.simplex_iteration_count),"wall_s":wall}

def export_residual(lp,path):
    h=highspy.Highs();configure_highs(h,"off")
    if h.passModel(lp)==highspy.HighsStatus.kError:raise RuntimeError("passModel export")
    if h.writeModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("writeModel")

def scip_model(path,usesymmetry,breaker):
    m=Model();m.hideOutput(True);m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except:pass
    try:m.setIntParam("randomization/randomseedshift",0)
    except:pass
    if usesymmetry is not None:m.setIntParam("misc/usesymmetry",int(usesymmetry))
    m.setRealParam("limits/time",LIMIT)
    if breaker:
        vd={v.name:v for v in m.getVars(transformed=False)}
        if breaker["a_name"] not in vd or breaker["b_name"] not in vd:raise RuntimeError("SCIP breaker vars missing")
        m.addCons(vd[breaker["a_name"]] >= vd[breaker["b_name"]],name="IG_HIGHER_SYM_BREAKER")
    return m

def solve_scip(path,usesymmetry,breaker):
    m=scip_model(path,usesymmetry,breaker)
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    return {"status":str(m.getStatus()),"primal":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
            "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall,
            "transformed_vars":m.getNVars(transformed=True),"transformed_conss":m.getNConss(transformed=True)}

def main():
    src,source=download()
    ph=highspy.Highs();configure_highs(ph,"on")
    if ph.readModel(str(src))==highspy.HighsStatus.kError:raise RuntimeError("read")
    if ph.presolve()==highspy.HighsStatus.kError:raise RuntimeError("presolve")
    lp=ph.getPresolvedLp()
    G=build_graph(lp);mapping,examined=first_nonidentity(G)
    if mapping is None:raise RuntimeError("no exact automorphism recovered")
    # Explicit certificate replay.
    for n,d in G.nodes(data=True):
        md=G.nodes[mapping[n]]
        if (d["kind"],d["base"],d["color"])!=(md["kind"],md["base"],md["color"]):raise RuntimeError("node attribute replay failure")
    for u,v,d in G.edges(data=True):
        mu,mv=mapping[u],mapping[v]
        if not G.has_edge(mu,mv) or G[mu][mv]["coef"]!=d["coef"]:raise RuntimeError("edge replay failure")
    breaker=select_breaker(lp,mapping)
    residual=OUT/"n5-3-highs-residual.mps";export_residual(lp,residual)
    result={"experiment":"n5-3-higher-symmetry-benchmark-0.1","date":"2026-10-06",
      "highs_version":highspy.Highs().version(),"pyscipopt_version":pyscipopt.__version__,
      "source":source,"presolved":{"rows":int(lp.num_row_),"cols":int(lp.num_col_),"nonzeros":len(lp.a_matrix_.value_)},
      "automorphism":{"mappings_examined":examined,"moved_variables":sum(1 for j in range(int(lp.num_col_)) if mapping[("v",j)]!=("v",j)),
                      "moved_rows":sum(1 for i in range(int(lp.num_row_)) if mapping[("r",i)]!=("r",i)),
                      "certificate_replay":True},
      "breaker":breaker,
      "highs":{"baseline":solve_highs(lp,None),"breaker":solve_highs(lp,breaker)},
      "scip":{"default":solve_scip(residual,None,None),"symmetry_off":solve_scip(residual,0,None),"symmetry_off_breaker":solve_scip(residual,0,breaker)},
      "disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# n5-3 higher-order symmetry benchmark 0.1","",f"**Disposition:** {result['disposition']}",
      f"**Automorphism:** {result['automorphism']['moved_variables']} moved vars / {result['automorphism']['moved_rows']} moved rows",
      f"**Breaker:** {breaker['a_name']} >= {breaker['b_name']} (cycle length {breaker['cycle_length']})","",
      "## HiGHS 20 s","",
      f"- baseline: {result['highs']['baseline']}",
      f"- breaker: {result['highs']['breaker']}","",
      "## SCIP 20 s on same HiGHS residual","",
      f"- default: {result['scip']['default']}",
      f"- symmetry off: {result['scip']['symmetry_off']}",
      f"- symmetry off + IG breaker: {result['scip']['symmetry_off_breaker']}"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps(result,indent=2))

if __name__=="__main__":main()
