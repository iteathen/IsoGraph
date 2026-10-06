#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-missed-symmetry-value-0.1")
OUT.mkdir(parents=True,exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"
INSTANCES=["reblock115","n5-3","b1c1s1","markshare2"]
SEEDS=[0,1,2]
LIMIT=10.0

def cf(x):
    x=float(x); inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def download(name):
    u=f"{BASE}/{name}.mps.gz"
    d=urllib.request.urlopen(u,timeout=120).read(); raw=gzip.decompress(d)
    p=OUT/f"{name}.mps"; p.write_bytes(raw)
    return p,{"source_url":u,"gzip_sha256":hashlib.sha256(d).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def scip_model(path,seed=0,usesymmetry=0,maxrounds=None):
    m=Model(); m.hideOutput(True); m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    if usesymmetry is not None:m.setIntParam("misc/usesymmetry",int(usesymmetry))
    if maxrounds is not None:m.setIntParam("presolving/maxrounds",int(maxrounds))
    return m

def transform(name,src):
    m=scip_model(src,0,0,None)
    t=time.perf_counter(); m.presolve(); wall=time.perf_counter()-t
    snap={"vars":int(m.getNVars(transformed=True)),"conss":int(m.getNConss(transformed=True)),
          "presolve_time_s":float(m.getPresolvingTime()),"presolve_wall_s":wall}
    p=OUT/f"{name}-scip-transformed.mps"
    m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,snap

def load_lp(path):
    h=highspy.Highs(); h.setOptionValue("output_flag",False)
    if h.readModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("read transformed MPS failed")
    return h.getLp(),{"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}

def matrix_edges(lp):
    n=int(lp.num_col_); m=int(lp.num_row_); triples=[]
    st=list(lp.a_matrix_.start_); ind=list(lp.a_matrix_.index_); val=list(lp.a_matrix_.value_)
    if lp.a_matrix_.format_==highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(st[j],st[j+1]):triples.append((int(ind[p]),j,float(val[p])))
    elif lp.a_matrix_.format_==highspy.MatrixFormat.kRowwise:
        for i in range(m):
            for p in range(st[i],st[i+1]):triples.append((i,int(ind[p]),float(val[p])))
    else:raise RuntimeError("unsupported matrix format")
    return triples

def build_graph(lp):
    n=int(lp.num_col_); m=int(lp.num_row_); triples=matrix_edges(lp)
    attrs=[]
    for j in range(n):
        attrs.append(("V",cf(lp.col_cost_[j]),cf(lp.col_lower_[j]),cf(lp.col_upper_[j]),
                      str(lp.integrality_[j]) if len(lp.integrality_) else "C"))
    for i in range(m):attrs.append(("R",cf(lp.row_lower_[i]),cf(lp.row_upper_[i])))
    for _,_,a in triples:attrs.append(("E",cf(a)))
    pal={}; colors=[]
    for a in attrs:
        if a not in pal:pal[a]=len(pal)
        colors.append(pal[a])
    base=n+m; edges=[]
    for k,(i,j,a) in enumerate(triples):
        e=base+k; edges.append((j,e)); edges.append((e,n+i))
    return ig.Graph(n=len(attrs),edges=edges,directed=False),colors,{"vars":n,"rows":m,"coeff_vertices":len(triples),"vertices":len(attrs),"edges":len(edges),"colors":len(pal)}

def replay(g,colors,perm):
    if len(perm)!=g.vcount() or sorted(perm)!=list(range(g.vcount())):raise RuntimeError("not a permutation")
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

def analyze_group(lp):
    t0=time.perf_counter(); g,colors,enc=build_graph(lp); build=time.perf_counter()-t0
    t1=time.perf_counter(); gens=g.automorphism_group(sh="fl",color=colors); bliss=time.perf_counter()-t1
    n=int(lp.num_col_); d=DSU(n); moving=0
    for perm in gens:
        replay(g,colors,perm); mv=False
        for j in range(n):
            p=perm[j]
            if p>=n:raise RuntimeError("variable partition violated")
            if p!=j:mv=True
            d.u(j,p)
        if mv:moving+=1
    groups={}
    for j in range(n):groups.setdefault(d.f(j),[]).append(j)
    orbits=[o for o in groups.values() if len(o)>1]
    orbits.sort(key=lambda o:(-len(o),tuple(sorted(cname(lp,j) for j in o))))
    if not orbits:raise RuntimeError("expected exact positive has no nontrivial orbit")
    orb=orbits[0]; ordered=sorted((cname(lp,j),j) for j in orb); repname,rep=ordered[0]
    return {
      "encoding":enc,"graph_build_wall_s":build,"bliss_wall_s":bliss,"frontend_wall_s":build+bliss,
      "generator_count":len(gens),"variable_moving_generators":moving,"nontrivial_orbits":len(orbits),
      "largest_orbit":{"size":len(orb),"rep_name":repname,"member_names":[n for n,_ in ordered]}
    }

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(path,seed,usesymmetry,orbit=None):
    m=scip_model(path,seed,usesymmetry,0); m.setRealParam("limits/time",LIMIT)
    added=0
    if orbit:
        vd={v.name:v for v in m.getVars(transformed=False)}
        rep=orbit["rep_name"]
        if rep not in vd:raise RuntimeError(f"rep missing {rep}")
        for k,n in enumerate(orbit["member_names"]):
            if n==rep:continue
            if n not in vd:raise RuntimeError(f"member missing {n}")
            m.addCons(vd[rep]>=vd[n],name=f"IG_ORBIT_MAX_{k}"); added+=1
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    p=finite(m.getPrimalbound());d=finite(m.getDualbound())
    width=None if p is None or d is None else abs(p-d)
    return {"status":str(m.getStatus()),"primal":p,"dual":d,"gap":finite(m.getGap()),"bound_width":width,
            "nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall,"added_constraints":added}

def med(xs):
    xs=[x for x in xs if x is not None];return statistics.median(xs) if xs else None

def summarize(trials,key):
    return {"median_gap":med([t[key]["gap"] for t in trials]),"median_bound_width":med([t[key]["bound_width"] for t in trials]),
      "median_nodes":med([t[key]["nodes"] for t in trials]),"median_lp":med([t[key]["lp_iterations"] for t in trials]),
      "median_wall_s":med([t[key]["wall_s"] for t in trials])}

def inspect(name):
    src,source=download(name);resid,stage1=transform(name,src);lp,linear=load_lp(resid);group=analyze_group(lp)
    trials=[]
    for seed in SEEDS:
        a=solve(resid,seed,None,None)
        b=solve(resid,seed,0,None)
        c=solve(resid,seed,0,group["largest_orbit"])
        trials.append({"seed":seed,"default":a,"symmetry_off":b,"orbit_max":c})
        print(name,seed,"gaps",a["gap"],b["gap"],c["gap"],flush=True)
    sums={k:summarize(trials,k) for k in ("default","symmetry_off","orbit_max")}
    target=sums["orbit_max"]["median_gap"]
    directional=target is not None and all(sums[x]["median_gap"] is not None and target<sums[x]["median_gap"] for x in ("default","symmetry_off"))
    return {"name":name,"source":source,"stage1":stage1,"linearized":linear,"group":group,"trials":trials,"summary":sums,"directional_value_win":directional}

def main():
    results=[];errors=[]
    for name in INSTANCES:
        try:results.append(inspect(name))
        except Exception as e:errors.append({"name":name,"error":repr(e)});print(name,"ERROR",repr(e),flush=True)
    out={"experiment":"post-scip-missed-symmetry-value-0.1","date":"2026-10-06","pyscipopt_version":pyscipopt.__version__,"igraph_version":ig.__version__,
         "results":results,"errors":errors,"directional_wins":sum(1 for r in results if r["directional_value_win"]),
         "disposition":"PASS" if len(results)==len(INSTANCES) and not errors else "PARTIAL"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# Post-SCIP missed-symmetry value holdout 0.1","",f"**Disposition:** {out['disposition']}",f"**Directional wins:** {out['directional_wins']}/{len(results)}","",
      "| Instance | Largest orbit | Front-end | Default median gap | Off median gap | Orbit median gap | Directional win |",
      "| --- | ---: | ---: | ---: | ---: | ---: | --- |"]
    for r in results:
        s=r["summary"];lines.append(f"| {r['name']} | {r['group']['largest_orbit']['size']} | {r['group']['frontend_wall_s']:.4f}s | {s['default']['median_gap']} | {s['symmetry_off']['median_gap']} | {s['orbit_max']['median_gap']} | {r['directional_value_win']} |")
    if errors:lines+=["","## Errors",""]+[f"- {e['name']}: {e['error']}" for e in errors]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"directional_wins":out["directional_wins"],"errors":errors},indent=2))
    if out["disposition"]!="PASS":raise SystemExit(1)

if __name__=="__main__":main()
