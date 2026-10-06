#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-n5-post-scip-orbit-max-0.1")
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
    p=OUT/"n5-3.mps";p.write_bytes(raw)
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
    if h.readModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("read transformed failed")
    return h.getLp(),{"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}

def matrix_edges(lp):
    n=int(lp.num_col_);m=int(lp.num_row_);triples=[]
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
    for i in range(m):attrs.append(("R",cf(lp.row_lower_[i]),cf(lp.row_upper_[i])))
    for _,_,a in triples:attrs.append(("E",cf(a)))
    palette={};colors=[]
    for a in attrs:
        if a not in palette:palette[a]=len(palette)
        colors.append(palette[a])
    edges=[];base=n+m
    for k,(i,j,a) in enumerate(triples):
        e=base+k;edges.append((j,e));edges.append((e,n+i))
    g=ig.Graph(n=len(attrs),edges=edges,directed=False)
    return g,colors,{"variables":n,"rows":m,"coefficient_vertices":len(triples),
      "vertices":len(attrs),"edges":len(edges),"color_classes":len(palette)}

def replay(g,colors,perm):
    if len(perm)!=g.vcount() or sorted(perm)!=list(range(g.vcount())):raise RuntimeError("not a permutation")
    for i,p in enumerate(perm):
        if colors[i]!=colors[p]:raise RuntimeError("color replay failure")
    es={tuple(sorted(e.tuple)) for e in g.es}
    for u,v in es:
        if tuple(sorted((perm[u],perm[v]))) not in es:raise RuntimeError("edge replay failure")
    return True

def colname(lp,j):
    return str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}"

class DSU:
    def __init__(self,n):self.p=list(range(n));self.sz=[1]*n
    def find(self,x):
        while self.p[x]!=x:
            self.p[x]=self.p[self.p[x]];x=self.p[x]
        return x
    def union(self,a,b):
        a=self.find(a);b=self.find(b)
        if a==b:return
        if self.sz[a]<self.sz[b]:a,b=b,a
        self.p[b]=a;self.sz[a]+=self.sz[b]

def variable_orbits(lp,generators,g,colors):
    n=int(lp.num_col_);dsu=DSU(n)
    for perm in generators:
        replay(g,colors,perm)
        for j in range(n):
            p=perm[j]
            if p>=n:raise RuntimeError("variable maps outside variable partition")
            dsu.union(j,p)
    groups={}
    for j in range(n):groups.setdefault(dsu.find(j),[]).append(j)
    orbits=[x for x in groups.values() if len(x)>1]
    for orb in orbits:
        # exact graph color preservation guarantees these match; replay explicitly.
        sig={(cf(lp.col_cost_[j]),cf(lp.col_lower_[j]),cf(lp.col_upper_[j]),
              str(lp.integrality_[j]) if len(lp.integrality_) else "C") for j in orb}
        if len(sig)!=1:raise RuntimeError("orbit mixes variable attributes")
    orbits.sort(key=lambda o:(-len(o),tuple(sorted(colname(lp,j) for j in o))))
    return orbits

def choose_single(lp,generators,g,colors):
    n=int(lp.num_col_);accepted=[]
    for k,perm in enumerate(generators):
        replay(g,colors,perm)
        moved=[j for j in range(n) if perm[j]!=j]
        if not moved:continue
        names=sorted((colname(lp,j),j) for j in moved);_,a=names[0];b=perm[a]
        accepted.append((colname(lp,a),colname(lp,b),k,a,b,len(moved)))
    if not accepted:return None
    accepted.sort()
    an,bn,k,a,b,moved=accepted[0]
    return {"generator_index":k,"a_index":a,"b_index":b,"a_name":an,"b_name":bn,"moved_variables":moved}

def choose_orbit(lp,orbits):
    if not orbits:return None
    orb=orbits[0]
    ordered=sorted((colname(lp,j),j) for j in orb)
    rep_name,rep=ordered[0]
    return {"size":len(orb),"rep_index":rep,"rep_name":rep_name,
      "member_indices":[j for _,j in ordered],"member_names":[n for n,_ in ordered]}

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(path,seed,single=None,orbit=None):
    m=scip_base(path,seed,0);m.setRealParam("limits/time",LIMIT)
    vd={v.name:v for v in m.getVars(transformed=False)}
    added=0
    if single is not None:
        a=single["a_name"];b=single["b_name"]
        if a not in vd or b not in vd:raise RuntimeError("single breaker variable missing")
        m.addCons(vd[a]>=vd[b],name="IG_SINGLE_EXACT_BREAKER");added+=1
    if orbit is not None:
        r=orbit["rep_name"]
        if r not in vd:raise RuntimeError("orbit representative missing")
        for k,n in enumerate(orbit["member_names"]):
            if n==r:continue
            if n not in vd:raise RuntimeError(f"orbit member missing {n}")
            m.addCons(vd[r]>=vd[n],name=f"IG_ORBIT_MAX_{k}");added+=1
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    return {"seed":seed,"status":str(m.getStatus()),"primal":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),
      "wall_s":wall,"added_constraints":added}

def med(v):
    v=[x for x in v if x is not None];return statistics.median(v) if v else None

def summarize(trials,key):
    return {
      "median_gap":med([t[key]["gap"] for t in trials]),
      "median_nodes":med([t[key]["nodes"] for t in trials]),
      "median_lp_iterations":med([t[key]["lp_iterations"] for t in trials]),
      "median_primal":med([t[key]["primal"] for t in trials]),
      "median_dual":med([t[key]["dual"] for t in trials]),
      "median_wall_s":med([t[key]["wall_s"] for t in trials])
    }

def main():
    src,source=download();trans,scip_snap=transform(src)
    frontend0=time.perf_counter()
    lp,linear=load_lp(trans);g,colors,enc=build_subdivision(lp)
    bt=time.perf_counter();gens=g.automorphism_group(sh="fl",color=colors);bliss_wall=time.perf_counter()-bt
    orbits=variable_orbits(lp,gens,g,colors)
    single=choose_single(lp,gens,g,colors);orbit=choose_orbit(lp,orbits)
    frontend_wall=time.perf_counter()-frontend0
    if single is None or orbit is None:raise RuntimeError("no exact variable-moving symmetry/orbit")
    trials=[]
    for seed in SEEDS:
        a=solve(trans,seed,None,None)
        b=solve(trans,seed,single,None)
        c=solve(trans,seed,None,orbit)
        trials.append({"seed":seed,"baseline":a,"single":b,"orbit_max":c})
        print(seed,"gaps",a["gap"],b["gap"],c["gap"],"nodes",a["nodes"],b["nodes"],c["nodes"],flush=True)
    summary={k:summarize(trials,k) for k in ("baseline","single","orbit_max")}
    summary["orbit_gap_wins_vs_baseline"]=sum(1 for t in trials if t["orbit_max"]["gap"] is not None and t["baseline"]["gap"] is not None and t["orbit_max"]["gap"]<t["baseline"]["gap"])
    summary["orbit_gap_losses_vs_baseline"]=sum(1 for t in trials if t["orbit_max"]["gap"] is not None and t["baseline"]["gap"] is not None and t["orbit_max"]["gap"]>t["baseline"]["gap"])
    summary["orbit_gap_ties_vs_baseline"]=sum(1 for t in trials if t["orbit_max"]["gap"]==t["baseline"]["gap"])
    result={"experiment":"n5-3-post-scip-orbit-max-benchmark-0.1","date":"2026-10-06",
      "source":source,"pyscipopt_version":pyscipopt.__version__,"igraph_version":ig.__version__,
      "scip_transformed":scip_snap,"linearized_transformed":linear,"encoding":enc,
      "bliss":{"generator_count":len(gens),"wall_s":bliss_wall,"structural_frontend_wall_s":frontend_wall},
      "variable_orbits":{"nontrivial_count":len(orbits),"largest_sizes":[len(o) for o in orbits[:20]]},
      "single_breaker":single,"orbit_max":orbit,"trials":trials,"summary":summary,"disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# n5-3 post-SCIP orbit-max benchmark 0.1","",
      f"**BLISS generators:** {len(gens)}",
      f"**Nontrivial variable orbits:** {len(orbits)}",
      f"**Largest orbit:** {orbit['size']}",
      f"**Orbit representative:** {orbit['rep_name']}",
      f"**Structural front-end wall:** {frontend_wall:.6f}s","",
      "| Seed | Baseline gap | Single gap | Orbit-max gap | Baseline nodes | Single nodes | Orbit nodes |",
      "| ---: | ---: | ---: | ---: | ---: | ---: | ---: |"]
    for t in trials:
        lines.append(f"| {t['seed']} | {t['baseline']['gap']} | {t['single']['gap']} | {t['orbit_max']['gap']} | {t['baseline']['nodes']} | {t['single']['nodes']} | {t['orbit_max']['nodes']} |")
    lines += ["","## Medians","",f"~~~json\n{json.dumps(summary,indent=2)}\n~~~",
      "","The orbit-max breaker is exact because every group orbit has a representative whose selected coordinate attains the maximum over the chosen variable orbit."]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"bliss":result["bliss"],"variable_orbits":result["variable_orbits"],"orbit_max":orbit,"summary":summary},indent=2))

if __name__=="__main__":main()
