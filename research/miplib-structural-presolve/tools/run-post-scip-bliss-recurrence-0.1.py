#!/usr/bin/env python3
import gzip, hashlib, json, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-post-scip-bliss-recurrence-0.1")
OUT.mkdir(parents=True,exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"
INSTANCES=[
 "50v-10","reblock115","ran14x18-disj-8","gen-ip002","gen-ip054",
 "ic97_potential","pk1","n5-3","neos859080","neos-911970",
 "seymour1","p200x1188c","b1c1s1","markshare2","mas74",
 "exp-1-500-5-5","markshare_4_0","qap10","cost266-UUE","mas76"
]

def cf(x):
    x=float(x); inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def download(name):
    url=f"{BASE}/{name}.mps.gz"
    data=urllib.request.urlopen(url,timeout=120).read()
    raw=gzip.decompress(data)
    p=OUT/f"{name}.mps";p.write_bytes(raw)
    return p,{
      "source_url":url,
      "gzip_sha256":hashlib.sha256(data).hexdigest(),
      "mps_sha256":hashlib.sha256(raw).hexdigest()
    }

def scip_transform(name,src):
    m=Model();m.hideOutput(True);m.readProblem(str(src))
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",0)
    except Exception:pass
    m.setIntParam("misc/usesymmetry",0)
    t=time.perf_counter();m.presolve();wall=time.perf_counter()-t
    snap={
      "vars":int(m.getNVars(transformed=True)),
      "conss":int(m.getNConss(transformed=True)),
      "presolve_time_s":float(m.getPresolvingTime()),
      "presolve_wall_s":wall
    }
    p=OUT/f"{name}-scip-transformed.mps"
    m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,snap

def load_lp(path):
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(path))==highspy.HighsStatus.kError:
        raise RuntimeError("HiGHS cannot read transformed MPS")
    lp=h.getLp()
    return lp,{"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}

def matrix_edges(lp):
    n=int(lp.num_col_);m=int(lp.num_row_);triples=[]
    st=list(lp.a_matrix_.start_);ind=list(lp.a_matrix_.index_);val=list(lp.a_matrix_.value_)
    if lp.a_matrix_.format_==highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(st[j],st[j+1]):
                triples.append((int(ind[p]),j,float(val[p])))
    elif lp.a_matrix_.format_==highspy.MatrixFormat.kRowwise:
        for i in range(m):
            for p in range(st[i],st[i+1]):
                triples.append((i,int(ind[p]),float(val[p])))
    else:
        raise RuntimeError(f"unsupported matrix format {lp.a_matrix_.format_}")
    return triples

def build_subdivision(lp):
    n=int(lp.num_col_);m=int(lp.num_row_);triples=matrix_edges(lp)
    attrs=[]
    for j in range(n):
        attrs.append(("V",cf(lp.col_cost_[j]),cf(lp.col_lower_[j]),cf(lp.col_upper_[j]),
                      str(lp.integrality_[j]) if len(lp.integrality_) else "C"))
    for i in range(m):
        attrs.append(("R",cf(lp.row_lower_[i]),cf(lp.row_upper_[i])))
    for _,_,a in triples:
        attrs.append(("E",cf(a)))
    palette={};colors=[]
    for a in attrs:
        if a not in palette:palette[a]=len(palette)
        colors.append(palette[a])
    edges=[];base=n+m
    for k,(i,j,a) in enumerate(triples):
        e=base+k;edges.append((j,e));edges.append((e,n+i))
    g=ig.Graph(n=len(attrs),edges=edges,directed=False)
    return g,colors,{
      "variables":n,"rows":m,"coefficient_vertices":len(triples),
      "vertices":len(attrs),"edges":len(edges),"color_classes":len(palette)
    }

def replay(g,colors,perm):
    if len(perm)!=g.vcount() or sorted(perm)!=list(range(g.vcount())):
        raise RuntimeError("generator is not a permutation")
    for i,p in enumerate(perm):
        if colors[i]!=colors[p]:
            raise RuntimeError("generator changes vertex color")
    es={tuple(sorted(e.tuple)) for e in g.es}
    for u,v in es:
        if tuple(sorted((perm[u],perm[v]))) not in es:
            raise RuntimeError("generator fails edge replay")
    return True

class DSU:
    def __init__(self,n):
        self.p=list(range(n));self.sz=[1]*n
    def find(self,x):
        while self.p[x]!=x:
            self.p[x]=self.p[self.p[x]];x=self.p[x]
        return x
    def union(self,a,b):
        a=self.find(a);b=self.find(b)
        if a==b:return
        if self.sz[a]<self.sz[b]:a,b=b,a
        self.p[b]=a;self.sz[a]+=self.sz[b]

def inspect(name):
    src,source=download(name)
    transformed,scip=scip_transform(name,src)
    lp,linear=load_lp(transformed)
    n=int(lp.num_col_)
    if linear["rows"]==0 or linear["cols"]==0:
        return {
          "name":name,"source":source,"scip_transformed":scip,"linearized_transformed":linear,
          "encoding":None,"bliss":{"wall_s":0.0,"generator_count":0,"variable_moving_generator_count":0},
          "variable_orbits":{"nontrivial_count":0,"largest_sizes":[]},"status":"NO_VARIABLE_MOVING_GENERATOR"
        }
    t0=time.perf_counter()
    g,colors,enc=build_subdivision(lp)
    build_wall=time.perf_counter()-t0
    bt=time.perf_counter()
    gens=g.automorphism_group(sh="fl",color=colors)
    bliss_wall=time.perf_counter()-bt
    dsu=DSU(n);moving=0
    for perm in gens:
        replay(g,colors,perm)
        moved=False
        for j in range(n):
            p=perm[j]
            if p>=n:raise RuntimeError("variable maps outside variable partition")
            if p!=j:moved=True
            dsu.union(j,p)
        if moved:moving+=1
    groups={}
    for j in range(n):groups.setdefault(dsu.find(j),[]).append(j)
    orbits=[x for x in groups.values() if len(x)>1]
    orbits.sort(key=lambda x:-len(x))
    status="EXACT_POST_SCIP_SYMMETRY" if moving else "NO_VARIABLE_MOVING_GENERATOR"
    return {
      "name":name,"source":source,"scip_transformed":scip,"linearized_transformed":linear,
      "encoding":enc,
      "bliss":{"graph_build_wall_s":build_wall,"wall_s":bliss_wall,
               "generator_count":len(gens),"variable_moving_generator_count":moving},
      "variable_orbits":{"nontrivial_count":len(orbits),"largest_sizes":[len(x) for x in orbits[:20]]},
      "status":status
    }

def main():
    results=[];errors=[]
    for name in INSTANCES:
        try:
            r=inspect(name);results.append(r)
            print(name,r["status"],"gens",r["bliss"]["generator_count"],
                  "moving",r["bliss"]["variable_moving_generator_count"],
                  "orbits",r["variable_orbits"]["largest_sizes"][:5],
                  "bliss_s",r["bliss"]["wall_s"],flush=True)
        except Exception as e:
            errors.append({"name":name,"error":repr(e)})
            print(name,"ERROR",repr(e),flush=True)
    positive=sum(1 for r in results if r["status"]=="EXACT_POST_SCIP_SYMMETRY")
    negative=sum(1 for r in results if r["status"]=="NO_VARIABLE_MOVING_GENERATOR")
    out={
      "experiment":"miplib-post-scip-bliss-recurrence-0.1","date":"2026-10-06",
      "sample":INSTANCES,"pyscipopt_version":pyscipopt.__version__,"igraph_version":ig.__version__,
      "results":results,"errors":errors,
      "counts":{"EXACT_POST_SCIP_SYMMETRY":positive,"NO_VARIABLE_MOVING_GENERATOR":negative},
      "disposition":"PASS" if len(results)==len(INSTANCES) and not errors else "PARTIAL"
    }
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# MIPLIB post-SCIP BLISS recurrence 0.1","",
      f"**Disposition:** {out['disposition']}",
      f"**Completed:** {len(results)}/{len(INSTANCES)}","",
      "| Instance | SCIP transformed | BLISS generators | Variable-moving | Nontrivial orbits | Largest orbit | BLISS wall | Status |",
      "| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |"]
    for r in results:
        sizes=r["variable_orbits"]["largest_sizes"]
        lines.append(f"| {r['name']} | {r['linearized_transformed']['rows']}x{r['linearized_transformed']['cols']} | {r['bliss']['generator_count']} | {r['bliss']['variable_moving_generator_count']} | {r['variable_orbits']['nontrivial_count']} | {sizes[0] if sizes else 0} | {r['bliss']['wall_s']:.6f}s | {r['status']} |")
    lines += ["","## Counts","",f"~~~json\n{json.dumps(out['counts'],indent=2)}\n~~~"]
    if errors:
        lines += ["","## Errors",""]+[f"- {e['name']}: {e['error']}" for e in errors]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"counts":out["counts"],"errors":errors},indent=2))
    if out["disposition"]!="PASS":raise SystemExit(1)

if __name__=="__main__":
    main()
