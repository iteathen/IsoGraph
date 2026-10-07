#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
from pyscipopt import Model

OUT=Path("out/miplib-ns1208400-orbit-max-0.1")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/ns1208400.mps.gz"
SEEDS=[3,4,5]
LIMIT=45.0
EXPECTED_ORBIT=24

def cf(x):
    x=float(x);inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def close(a,b,tol=1e-10):
    return abs(float(a)-float(b))<=tol*max(1.0,abs(float(a)),abs(float(b)))

def download():
    d=urllib.request.urlopen(URL,timeout=120).read();raw=gzip.decompress(d)
    p=OUT/"ns1208400.mps";p.write_bytes(raw)
    return p,{"source_url":URL,"gzip_sha256":hashlib.sha256(d).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def scip_model(path,seed=0,usesymmetry=None,maxrounds=None):
    m=Model();m.hideOutput(True);m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    if usesymmetry is not None:m.setIntParam("misc/usesymmetry",int(usesymmetry))
    if maxrounds is not None:m.setIntParam("presolving/maxrounds",int(maxrounds))
    return m

def transform(src):
    m=scip_model(src,0,0,None)
    t=time.perf_counter();m.presolve();wall=time.perf_counter()-t
    active={str(v.name) for v in m.getVars(transformed=True)}
    p=OUT/"ns1208400-scip-transformed.mps";m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,{"vars":len(active),"conss":int(m.getNConss(transformed=True)),"presolve_wall_s":wall},active

def load_lp(path):
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("read transformed failed")
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
    else:raise RuntimeError("matrix format")
    return rows,cols

def build_active(lp,active_names):
    rows,cols=matrix_views(lp);nold=int(lp.num_col_);m=int(lp.num_row_)
    raw_names=list(lp.col_names_);costs=[float(x) for x in lp.col_cost_]
    lowers=[float(x) for x in lp.col_lower_];uppers=[float(x) for x in lp.col_upper_]
    ints=list(lp.integrality_) if len(lp.integrality_) else []
    rlo=[float(x) for x in lp.row_lower_];rup=[float(x) for x in lp.row_upper_]
    old_names=[str(raw_names[j]) if j<len(raw_names) and raw_names[j] else f"col#{j}" for j in range(nold)]
    active=[];inactive=[]
    for j,n in enumerate(old_names):(active if n in active_names else inactive).append(j)
    unsafe=[]
    for j in inactive:
        if not(len(cols[j])==0 and (close(costs[j],0.0) or close(lowers[j],uppers[j]))):
            unsafe.append((old_names[j],len(cols[j]),costs[j],lowers[j],uppers[j]))
    if unsafe:raise RuntimeError(f"unsafe export-only cols {unsafe[:5]}")
    remap=[-1]*nold
    for k,j in enumerate(active):remap[j]=k
    names=[old_names[j] for j in active]
    attrs=[("V",cf(costs[j]),cf(lowers[j]),cf(uppers[j]),str(ints[j]) if ints else "C") for j in active]
    attrs.extend(("R",cf(rlo[i]),cf(rup[i])) for i in range(m))
    trip=[]
    for i,row in enumerate(rows):
        for j,a in row.items():
            k=remap[j]
            if k>=0:trip.append((i,k,float(a)))
    attrs.extend(("E",cf(a)) for _,_,a in trip)
    pal={};colors=[]
    for a in attrs:
        if a not in pal:pal[a]=len(pal)
        colors.append(pal[a])
    base=len(active)+m;edges=[]
    for k,(i,j,a) in enumerate(trip):
        e=base+k;edges.append((j,e));edges.append((e,len(active)+i))
    g=ig.Graph(n=len(attrs),edges=edges,directed=False)
    return g,colors,names,{"active_variables":len(active),"dropped_export_only_variables":len(inactive),
      "rows":m,"active_nonzeros":len(trip),"vertices":len(attrs),"edges":len(edges),"color_classes":len(pal)}

def replay(g,colors,p):
    if len(p)!=g.vcount() or sorted(p)!=list(range(g.vcount())):raise RuntimeError("bad generator")
    for i,q in enumerate(p):
        if colors[i]!=colors[q]:raise RuntimeError("color mismatch")
    es={tuple(sorted(e.tuple)) for e in g.es}
    for u,v in es:
        if tuple(sorted((p[u],p[v]))) not in es:raise RuntimeError("edge mismatch")

class DSU:
    def __init__(self,n):self.p=list(range(n));self.sz=[1]*n
    def f(self,x):
        while self.p[x]!=x:self.p[x]=self.p[self.p[x]];x=self.p[x]
        return x
    def u(self,a,b):
        a=self.f(a);b=self.f(b)
        if a==b:return
        if self.sz[a]<self.sz[b]:a,b=b,a
        self.p[b]=a;self.sz[a]+=self.sz[b]

def analyze(g,colors,names):
    n=len(names);t=time.perf_counter();gens=g.automorphism_group(sh="fl",color=colors);bliss=time.perf_counter()-t
    d=DSU(n);active_gens=0
    for p in gens:
        replay(g,colors,p);moved=False
        for j in range(n):
            q=p[j]
            if q>=n:raise RuntimeError("variable partition violation")
            if q!=j:moved=True
            d.u(j,q)
        if moved:active_gens+=1
    groups={}
    for j in range(n):groups.setdefault(d.f(j),[]).append(j)
    orbits=[o for o in groups.values() if len(o)>1]
    orbits.sort(key=lambda o:(-len(o),tuple(sorted(names[j] for j in o))))
    if not orbits:raise RuntimeError("no nontrivial active orbit")
    o=orbits[0]
    if len(o)!=EXPECTED_ORBIT:raise RuntimeError(f"largest orbit drift {len(o)}")
    ordered=sorted(names[j] for j in o)
    return {"generator_count":len(gens),"active_generator_count":active_gens,"bliss_wall_s":bliss,
      "nontrivial_orbit_count":len(orbits),"largest_orbit_size":len(o),
      "representative":ordered[0],"orbit_names":ordered}

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(path,seed,usesymmetry,orbit=None):
    m=scip_model(path,seed,usesymmetry,None);m.setRealParam("limits/time",LIMIT)
    added=0
    if orbit:
        vd={str(v.name):v for v in m.getVars(transformed=False)}
        rep=orbit["representative"]
        if rep not in vd:raise RuntimeError("rep missing")
        for k,n in enumerate(orbit["orbit_names"]):
            if n==rep:continue
            if n not in vd:raise RuntimeError(f"orbit member missing {n}")
            m.addCons(vd[rep]>=vd[n],name=f"IG_ORBIT_MAX_{k}");added+=1
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    p=finite(m.getPrimalbound());d=finite(m.getDualbound())
    return {"status":str(m.getStatus()),"primal":p,"dual":d,"gap":finite(m.getGap()),
      "bound_width":None if p is None or d is None else abs(p-d),
      "nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall,"added_constraints":added}

def med(xs):
    xs=[x for x in xs if x is not None and math.isfinite(float(x))]
    return statistics.median(xs) if xs else None

def main():
    src,source=download();resid,s1,active=transform(src)
    f0=time.perf_counter();lp,linear=load_lp(resid);g,colors,names,gmeta=build_active(lp,active);grp=analyze(g,colors,names);frontend=time.perf_counter()-f0
    trials=[]
    for seed in SEEDS:
        if seed%2:
            b=solve(resid,seed,0,grp);a=solve(resid,seed,None,None);order="ig_first"
        else:
            a=solve(resid,seed,None,None);b=solve(resid,seed,0,grp);order="baseline_first"
        trials.append({"seed":seed,"order":order,"baseline":a,"orbit_max":b,"ig_end_to_end_wall_s":frontend+b["wall_s"]})
        print(seed,order,a["status"],b["status"],a["gap"],b["gap"],flush=True)
    finite_pairs=[t for t in trials if t["baseline"]["primal"] is not None and t["orbit_max"]["primal"] is not None]
    bg=med([t["baseline"]["gap"] for t in finite_pairs]);ig=med([t["orbit_max"]["gap"] for t in finite_pairs])
    wins=sum(1 for t in finite_pairs if t["baseline"]["gap"] is not None and t["orbit_max"]["gap"] is not None and t["orbit_max"]["gap"]<t["baseline"]["gap"])
    status="UNINFORMATIVE_HORIZON" if len(finite_pairs)<2 else ("DIRECTIONAL_WIN" if ig is not None and bg is not None and ig<bg and wins>=2 else "NO_DIRECTIONAL_WIN")
    result={"experiment":"ns1208400-orbit-max-holdout-0.1","date":"2026-10-06","source":source,
      "stage1":s1,"linearized":linear,"active_graph":gmeta,"group":grp,"structural_frontend_wall_s":frontend,
      "trials":trials,"summary":{"finite_pairs":len(finite_pairs),"baseline_median_gap":bg,"ig_median_gap":ig,
        "paired_gap_wins":wins,"status":status},"disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# ns1208400 post-SCIP orbit-max holdout 0.1","",
      f"**Status:** {status}",f"**Largest active orbit:** {grp['largest_orbit_size']}",
      f"**Generators:** {grp['active_generator_count']}",f"**Frontend:** {frontend:.6f}s","",
      "| Seed | Order | Baseline status | IG status | Baseline gap | IG gap | Baseline nodes | IG nodes |",
      "| ---: | --- | --- | --- | ---: | ---: | ---: | ---: |"]
    for t in trials:
        lines.append(f"| {t['seed']} | {t['order']} | {t['baseline']['status']} | {t['orbit_max']['status']} | {t['baseline']['gap']} | {t['orbit_max']['gap']} | {t['baseline']['nodes']} | {t['orbit_max']['nodes']} |")
    lines+=["","~~~json",json.dumps(result["summary"],indent=2),"~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"group":grp,"frontend":frontend,"summary":result["summary"]},indent=2))

if __name__=="__main__":main()
