#!/usr/bin/env python3
import gzip, hashlib, json, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-post-scip-active-support-0.1")
OUT.mkdir(parents=True,exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"
INSTANCES=[
 "50v-10","reblock115","ran14x18-disj-8","gen-ip002","gen-ip054",
 "ic97_potential","pk1","n5-3","neos859080","neos-911970",
 "seymour1","p200x1188c","b1c1s1","markshare2","mas74",
 "exp-1-500-5-5","markshare_4_0","qap10","cost266-UUE","mas76"
]

def cf(x):
    x=float(x);inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def download(name):
    url=f"{BASE}/{name}.mps.gz"
    data=urllib.request.urlopen(url,timeout=120).read()
    raw=gzip.decompress(data)
    p=OUT/f"{name}.mps";p.write_bytes(raw)
    return p,{"source_url":url,"gzip_sha256":hashlib.sha256(data).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def transform(name,src):
    m=Model();m.hideOutput(True);m.readProblem(str(src))
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",0)
    except Exception:pass
    m.setIntParam("misc/usesymmetry",0)
    m.presolve()
    active_vars={str(v.name) for v in m.getVars(transformed=True)}
    active_conss={str(c.name) for c in m.getConss(transformed=True)}
    snap={"vars":len(active_vars),"conss":len(active_conss),"presolve_time_s":float(m.getPresolvingTime())}
    p=OUT/f"{name}-scip-transformed.mps"
    m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,snap,active_vars,active_conss

def load_lp(path):
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("HiGHS cannot read transformed MPS")
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
    else:raise RuntimeError(f"unsupported matrix format {lp.a_matrix_.format_}")
    return triples

def build(lp,active_vars,active_conss):
    n=int(lp.num_col_);m=int(lp.num_row_);triples=matrix_edges(lp)
    colnames=[str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}" for j in range(n)]
    rownames=[str(lp.row_names_[i]) if len(lp.row_names_)>i and lp.row_names_[i] else f"row#{i}" for i in range(m)]
    attrs=[]
    for j in range(n):
        attrs.append(("V","ACTIVE" if colnames[j] in active_vars else "EXPORT_ONLY",
                      cf(lp.col_cost_[j]),cf(lp.col_lower_[j]),cf(lp.col_upper_[j]),
                      str(lp.integrality_[j]) if len(lp.integrality_) else "C"))
    for i in range(m):
        attrs.append(("R","ACTIVE" if rownames[i] in active_conss else "EXPORT_ONLY",
                      cf(lp.row_lower_[i]),cf(lp.row_upper_[i])))
    for _,_,a in triples:attrs.append(("E",cf(a)))
    palette={};colors=[]
    for a in attrs:
        if a not in palette:palette[a]=len(palette)
        colors.append(palette[a])
    edges=[];base=n+m
    for k,(i,j,a) in enumerate(triples):
        e=base+k;edges.append((j,e));edges.append((e,n+i))
    g=ig.Graph(n=len(attrs),edges=edges,directed=False)
    active_idx={j for j,nm in enumerate(colnames) if nm in active_vars}
    export_idx=set(range(n))-active_idx
    active_rows={i for i,nm in enumerate(rownames) if nm in active_conss}
    return g,colors,colnames,active_idx,export_idx,{
      "variables":n,"rows":m,"coefficient_vertices":len(triples),"vertices":len(attrs),"edges":len(edges),
      "active_variables_in_export":len(active_idx),"export_only_variables":len(export_idx),
      "active_rows_in_export":len(active_rows),"export_only_rows":m-len(active_rows)
    }

def replay(g,colors,perm):
    if len(perm)!=g.vcount() or sorted(perm)!=list(range(g.vcount())):raise RuntimeError("not permutation")
    for i,p in enumerate(perm):
        if colors[i]!=colors[p]:raise RuntimeError("color mismatch")
    es={tuple(sorted(e.tuple)) for e in g.es}
    for u,v in es:
        if tuple(sorted((perm[u],perm[v]))) not in es:raise RuntimeError("edge replay failure")

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

def inspect(name):
    src,source=download(name)
    mps,scip,active_vars,active_conss=transform(name,src)
    lp,linear=load_lp(mps)
    g,colors,names,active_idx,export_idx,enc=build(lp,active_vars,active_conss)
    t=time.perf_counter();gens=g.automorphism_group(sh="fl",color=colors);wall=time.perf_counter()-t
    n=int(lp.num_col_);dsu=DSU(n)
    moving=0;active_moving=0;export_only_moving=0
    active_moved_union=set();export_moved_union=set()
    for perm in gens:
        replay(g,colors,perm)
        moved=[j for j in range(n) if perm[j]!=j]
        if not moved:continue
        moving+=1
        am=[j for j in moved if j in active_idx]
        em=[j for j in moved if j in export_idx]
        if am:
            active_moving+=1;active_moved_union.update(am)
        elif em:
            export_only_moving+=1
        export_moved_union.update(em)
        for j in active_idx:
            p=perm[j]
            if p not in active_idx:raise RuntimeError("ACTIVE color failed to preserve active variable set")
            dsu.union(j,p)
    groups={}
    for j in active_idx:groups.setdefault(dsu.find(j),[]).append(j)
    orbits=[x for x in groups.values() if len(x)>1]
    orbits.sort(key=lambda x:-len(x))
    if active_moving:
        status="EXACT_ACTIVE_POST_SCIP_SYMMETRY"
    elif moving:
        status="EXPORT_ONLY_SYMMETRY"
    else:
        status="NO_VARIABLE_MOVING_GENERATOR"
    return {
      "name":name,"source":source,"scip_transformed":scip,"linearized_export":linear,"encoding":enc,
      "bliss":{"wall_s":wall,"generator_count":len(gens),"variable_moving_generator_count":moving,
               "active_variable_moving_generator_count":active_moving,"export_only_moving_generator_count":export_only_moving},
      "support":{"active_moved_variable_count":len(active_moved_union),"export_moved_variable_count":len(export_moved_union),
                 "active_nontrivial_orbit_count":len(orbits),"active_largest_orbit_sizes":[len(x) for x in orbits[:20]],
                 "active_largest_orbit_names":[[names[j] for j in x[:20]] for x in orbits[:5]]},
      "status":status
    }

def main():
    results=[];errors=[]
    for name in INSTANCES:
        try:
            r=inspect(name);results.append(r)
            print(name,r["status"],
                  "active/export",r["encoding"]["active_variables_in_export"],r["encoding"]["export_only_variables"],
                  "gens",r["bliss"]["generator_count"],"active_gens",r["bliss"]["active_variable_moving_generator_count"],
                  "active_orbits",r["support"]["active_largest_orbit_sizes"][:5],flush=True)
        except Exception as e:
            errors.append({"name":name,"error":repr(e)});print(name,"ERROR",repr(e),flush=True)
    counts={k:0 for k in ("EXACT_ACTIVE_POST_SCIP_SYMMETRY","EXPORT_ONLY_SYMMETRY","NO_VARIABLE_MOVING_GENERATOR")}
    for r in results:counts[r["status"]]+=1
    out={"experiment":"post-scip-bliss-active-support-audit-0.1","date":"2026-10-06",
         "pyscipopt_version":pyscipopt.__version__,"igraph_version":ig.__version__,
         "sample":INSTANCES,"results":results,"errors":errors,"counts":counts,
         "disposition":"PASS" if len(results)==len(INSTANCES) and not errors else "PARTIAL"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# Post-SCIP BLISS active-support audit 0.1","",f"**Disposition:** {out['disposition']}","",
      "| Instance | Active vars | Export-only vars | BLISS gens | Active-moving gens | Active largest orbit | Status |",
      "| --- | ---: | ---: | ---: | ---: | ---: | --- |"]
    for r in results:
        enc=r["encoding"];b=r["bliss"];sizes=r["support"]["active_largest_orbit_sizes"]
        lines.append(f"| {r['name']} | {enc['active_variables_in_export']} | {enc['export_only_variables']} | {b['generator_count']} | {b['active_variable_moving_generator_count']} | {sizes[0] if sizes else 0} | {r['status']} |")
    lines += ["","## Counts","",f"~~~json\n{json.dumps(counts,indent=2)}\n~~~",
      "","Only generators that move variables SCIP still reports as active transformed variables count as commercially relevant symmetry."]
    if errors:lines+=["","## Errors",""]+[f"- {e['name']}: {e['error']}" for e in errors]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"counts":counts,"errors":errors},indent=2))
    if out["disposition"]!="PASS":raise SystemExit(1)

if __name__=="__main__":
    main()
