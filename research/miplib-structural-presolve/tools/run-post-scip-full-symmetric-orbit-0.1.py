#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-full-symmetric-orbit-0.1")
OUT.mkdir(parents=True,exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"
INSTANCES=["reblock115","n5-3","neos-911970","seymour1","b1c1s1","markshare2","mas74","mas76"]
BENCHMARK_SET={"reblock115","n5-3","b1c1s1","markshare2"}
SEEDS=[0,1,2]; LIMIT=10.0

def cf(x):
    x=float(x);inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def download(name):
    u=f"{BASE}/{name}.mps.gz"
    d=urllib.request.urlopen(u,timeout=120).read();raw=gzip.decompress(d)
    p=OUT/f"{name}.mps";p.write_bytes(raw)
    return p,{"source_url":u,"gzip_sha256":hashlib.sha256(d).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def scip_model(path,seed=0,maxrounds=None):
    m=Model();m.hideOutput(True);m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    m.setIntParam("misc/usesymmetry",0)
    if maxrounds is not None:m.setIntParam("presolving/maxrounds",int(maxrounds))
    return m

def transform(name,src):
    m=scip_model(src,0,None);t=time.perf_counter();m.presolve();wall=time.perf_counter()-t
    p=OUT/f"{name}-scip-transformed.mps";m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,{"vars":int(m.getNVars(transformed=True)),"conss":int(m.getNConss(transformed=True)),
              "presolve_time_s":float(m.getPresolvingTime()),"presolve_wall_s":wall}

def load_lp(path):
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("read transformed MPS failed")
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

def build_graph(lp):
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
    return ig.Graph(n=len(attrs),edges=edges,directed=False),colors,{"vars":n,"rows":m,"coeff_vertices":len(triples),
      "vertices":len(attrs),"edges":len(edges),"colors":len(palette)}

def replay(g,colors,perm):
    if len(perm)!=g.vcount() or sorted(perm)!=list(range(g.vcount())):raise RuntimeError("not permutation")
    for i,p in enumerate(perm):
        if colors[i]!=colors[p]:raise RuntimeError("color mismatch")
    es={tuple(sorted(e.tuple)) for e in g.es}
    for u,v in es:
        if tuple(sorted((perm[u],perm[v]))) not in es:raise RuntimeError("edge replay failure")

class DSU:
    def __init__(self,n):self.p=list(range(n));self.sz=[1]*n
    def f(self,x):
        while self.p[x]!=x:
            self.p[x]=self.p[self.p[x]];x=self.p[x]
        return x
    def u(self,a,b):
        a=self.f(a);b=self.f(b)
        if a==b:return
        if self.sz[a]<self.sz[b]:a,b=b,a
        self.p[b]=a;self.sz[a]+=self.sz[b]

def cname(lp,j):
    return str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}"

def analyze(lp):
    t0=time.perf_counter();g,colors,enc=build_graph(lp);build=time.perf_counter()-t0
    t1=time.perf_counter();gens=g.automorphism_group(sh="fl",color=colors);bliss=time.perf_counter()-t1
    n=int(lp.num_col_);orbit_dsu=DSU(n);moving=0
    exact_gens=[]
    for perm in gens:
        replay(g,colors,perm);exact_gens.append(perm);mv=False
        for j in range(n):
            p=perm[j]
            if p>=n:raise RuntimeError("variable partition violated")
            if p!=j:mv=True
            orbit_dsu.u(j,p)
        if mv:moving+=1
    groups={}
    for j in range(n):groups.setdefault(orbit_dsu.f(j),[]).append(j)
    orbits=[o for o in groups.values() if len(o)>1]
    orbits.sort(key=lambda o:(-len(o),tuple(sorted(cname(lp,j) for j in o))))
    if not orbits:raise RuntimeError("expected positive without orbit")
    orb=orbits[0];oset=set(orb);tdsu=DSU(n);edges=[]
    transposition_generators=0
    for gi,perm in enumerate(exact_gens):
        moved=[j for j in range(n) if perm[j]!=j]
        if len(moved)==2 and moved[0] in oset and moved[1] in oset and perm[moved[0]]==moved[1] and perm[moved[1]]==moved[0]:
            a,b=moved;tdsu.u(a,b);edges.append((a,b,gi));transposition_generators+=1
    roots={tdsu.f(j) for j in orb}
    connected=len(roots)==1
    ordered=sorted((cname(lp,j),j) for j in orb)
    return {
      "encoding":enc,"generator_count":len(gens),"variable_moving_generators":moving,
      "nontrivial_orbits":len(orbits),"largest_orbit_size":len(orb),
      "largest_orbit_names":[n for n,j in ordered],
      "largest_orbit_indices":[j for n,j in ordered],
      "transposition_generators_on_largest_orbit":transposition_generators,
      "transposition_edges":[[cname(lp,a),cname(lp,b),gi] for a,b,gi in edges[:200]],
      "transposition_graph_components":len(roots),
      "full_symmetric_largest_orbit":connected,
      "graph_build_wall_s":build,"bliss_wall_s":bliss,"frontend_wall_s":build+bliss
    }

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(path,seed,chain_names=None):
    m=scip_model(path,seed,0);m.setRealParam("limits/time",LIMIT)
    added=0
    if chain_names:
        vd={v.name:v for v in m.getVars(transformed=False)}
        for i in range(len(chain_names)-1):
            a,b=chain_names[i],chain_names[i+1]
            if a not in vd or b not in vd:raise RuntimeError(f"chain var missing {a} or {b}")
            m.addCons(vd[a]>=vd[b],name=f"IG_FULL_SYM_SORT_{i}");added+=1
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    return {"status":str(m.getStatus()),"primal":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),
      "wall_s":wall,"added_constraints":added}

def med(xs):
    xs=[x for x in xs if x is not None];return statistics.median(xs) if xs else None

def summarize(trials,key):
    return {"median_gap":med([t[key]["gap"] for t in trials]),
      "median_nodes":med([t[key]["nodes"] for t in trials]),
      "median_lp":med([t[key]["lp_iterations"] for t in trials]),
      "median_wall_s":med([t[key]["wall_s"] for t in trials])}

def inspect(name):
    src,source=download(name);resid,stage1=transform(name,src);lp,linear=load_lp(resid);a=analyze(lp)
    trials=[];summary=None
    if name in BENCHMARK_SET and a["full_symmetric_largest_orbit"]:
        chain=a["largest_orbit_names"]
        for seed in SEEDS:
            b=solve(resid,seed,None);c=solve(resid,seed,chain)
            trials.append({"seed":seed,"baseline":b,"sorted_orbit":c})
            print(name,seed,b["gap"],c["gap"],b["nodes"],c["nodes"],flush=True)
        summary={"baseline":summarize(trials,"baseline"),"sorted_orbit":summarize(trials,"sorted_orbit"),
          "paired_gap_wins":sum(1 for t in trials if t["baseline"]["gap"] is not None and t["sorted_orbit"]["gap"] is not None and t["sorted_orbit"]["gap"]<t["baseline"]["gap"]),
          "paired_gap_losses":sum(1 for t in trials if t["baseline"]["gap"] is not None and t["sorted_orbit"]["gap"] is not None and t["sorted_orbit"]["gap"]>t["baseline"]["gap"]),
          "paired_gap_ties":sum(1 for t in trials if t["baseline"]["gap"]==t["sorted_orbit"]["gap"])}
    return {"name":name,"source":source,"stage1":stage1,"linearized":linear,"analysis":a,"trials":trials,"summary":summary}

def main():
    results=[];errors=[]
    for name in INSTANCES:
        try:
            r=inspect(name);results.append(r)
            print(name,"FULL" if r["analysis"]["full_symmetric_largest_orbit"] else "NOT_FULL",
              r["analysis"]["largest_orbit_size"],r["analysis"]["transposition_graph_components"],flush=True)
        except Exception as e:
            errors.append({"name":name,"error":repr(e)});print(name,"ERROR",repr(e),flush=True)
    full=sum(1 for r in results if r["analysis"]["full_symmetric_largest_orbit"])
    bench=sum(1 for r in results if r["trials"])
    out={"experiment":"post-scip-full-symmetric-orbit-0.1","date":"2026-10-06",
      "pyscipopt_version":pyscipopt.__version__,"igraph_version":ig.__version__,
      "results":results,"errors":errors,"counts":{"full_symmetric_largest_orbit":full,"benchmarked":bench},
      "disposition":"PASS" if len(results)==len(INSTANCES) and not errors else "PARTIAL"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# Post-SCIP full-symmetric-orbit screen 0.1","",f"**Disposition:** {out['disposition']}",
      f"**Full-symmetric largest orbits:** {full}/{len(results)}","",
      "| Instance | Largest orbit | Transposition gens | Components | Full S(O) | Median base gap | Median sorted gap |",
      "| --- | ---: | ---: | ---: | --- | ---: | ---: |"]
    for r in results:
        a=r["analysis"];s=r["summary"]
        lines.append(f"| {r['name']} | {a['largest_orbit_size']} | {a['transposition_generators_on_largest_orbit']} | {a['transposition_graph_components']} | {a['full_symmetric_largest_orbit']} | {s['baseline']['median_gap'] if s else ''} | {s['sorted_orbit']['median_gap'] if s else ''} |")
    if errors:lines+=["","## Errors",""]+[f"- {e['name']}: {e['error']}" for e in errors]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"counts":out["counts"],"errors":errors},indent=2))
    if out["disposition"]!="PASS":raise SystemExit(1)

if __name__=="__main__":main()
