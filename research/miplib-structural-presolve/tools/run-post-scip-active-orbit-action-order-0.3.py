#!/usr/bin/env python3
import gzip, hashlib, json, math, signal, statistics, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
import pyscipopt
from pyscipopt import Model
from sympy.combinatorics import Permutation, PermutationGroup

OUT=Path("out/miplib-active-orbit-action-order-0.3")
OUT.mkdir(parents=True,exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"
INSTANCES=["n5-3","mcsched","neos-1171737","neos-3381206-awhea","ns1208400"]
SEEDS=[0,1,2]
LIMIT=15.0
ORDER_BUDGET=120

def cf(x):
    x=float(x);inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def close(a,b,tol=1e-10):
    return abs(float(a)-float(b))<=tol*max(1.0,abs(float(a)),abs(float(b)))

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
    m=scip_model(src,0,None)
    t=time.perf_counter();m.presolve();wall=time.perf_counter()-t
    active={str(v.name) for v in m.getVars(transformed=True)}
    p=OUT/f"{name}-scip-transformed.mps";m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,{"vars":len(active),"conss":int(m.getNConss(transformed=True)),"presolve_wall_s":wall},active

def load_lp(path):
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("read transformed MPS failed")
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
    old_names=[str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}" for j in range(nold)]
    active_old=[j for j,n in enumerate(old_names) if n in active_names]
    inactive=[j for j,n in enumerate(old_names) if n not in active_names]
    unsafe=[]
    for j in inactive:
        deg=len(cols[j]);cost=float(lp.col_cost_[j]);lb=float(lp.col_lower_[j]);ub=float(lp.col_upper_[j])
        if not (deg==0 and (close(cost,0.0) or close(lb,ub))):
            unsafe.append({"name":old_names[j],"degree":deg,"cost":cost,"lb":lb,"ub":ub})
    if unsafe:raise RuntimeError(f"unsafe export-only columns: {unsafe[:5]}")
    remap={j:k for k,j in enumerate(active_old)};names=[old_names[j] for j in active_old]
    attrs=[]
    for j in active_old:
        attrs.append(("V",cf(lp.col_cost_[j]),cf(lp.col_lower_[j]),cf(lp.col_upper_[j]),
                      str(lp.integrality_[j]) if len(lp.integrality_) else "C"))
    for i in range(m):attrs.append(("R",cf(lp.row_lower_[i]),cf(lp.row_upper_[i])))
    trip=[]
    for i,row in enumerate(rows):
        for j,a in row.items():
            if j in remap:trip.append((i,remap[j],float(a)))
    for _,_,a in trip:attrs.append(("E",cf(a)))
    pal={};colors=[]
    for a in attrs:
        if a not in pal:pal[a]=len(pal)
        colors.append(pal[a])
    na=len(active_old);base=na+m;edges=[]
    for k,(i,j,a) in enumerate(trip):
        e=base+k;edges.append((j,e));edges.append((e,na+i))
    return ig.Graph(n=len(attrs),edges=edges,directed=False),colors,names,{
      "active_variables":na,"dropped_export_only_variables":len(inactive),"rows":m,
      "active_nonzeros":len(trip),"vertices":len(attrs),"edges":len(edges),"color_classes":len(pal)}

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

class OrderTimeout(Exception):pass
def alarm_handler(signum,frame):raise OrderTimeout()

def analyze(g,colors,names):
    n=len(names)
    t0=time.perf_counter();gens=g.automorphism_group(sh="fl",color=colors);bliss=time.perf_counter()-t0
    d=DSU(n);exact=[]
    for p in gens:
        replay(g,colors,p);exact.append(p)
        for j in range(n):
            q=p[j]
            if q>=n:raise RuntimeError("variable partition violation")
            d.u(j,q)
    groups={}
    for j in range(n):groups.setdefault(d.f(j),[]).append(j)
    orbits=[o for o in groups.values() if len(o)>1]
    orbits.sort(key=lambda o:(-len(o),tuple(sorted(names[j] for j in o))))
    if not orbits:
        return {"generator_count":len(gens),"bliss_wall_s":bliss,"largest_orbit":None,
                "action_order":1,"factorial_order":1,"full_symmetric":False,"order_status":"NO_ORBIT","order_wall_s":0.0}
    orb=orbits[0];pos={j:i for i,j in enumerate(orb)}
    perms=[]
    for p in exact:
        images=[]
        for j in orb:
            q=p[j]
            if q not in pos:raise RuntimeError("orbit not invariant under exact generator")
            images.append(pos[q])
        if images!=list(range(len(orb))):
            perms.append(Permutation(images))
    expected=math.factorial(len(orb))
    old=signal.signal(signal.SIGALRM,alarm_handler);signal.alarm(ORDER_BUDGET)
    t1=time.perf_counter()
    try:
        if perms:
            pg=PermutationGroup(*perms);order=int(pg.order())
        else:order=1
        status="EXACT_ORDER"
    except OrderTimeout:
        order=None;status="INCONCLUSIVE_TIMEOUT"
    finally:
        signal.alarm(0);signal.signal(signal.SIGALRM,old)
    ow=time.perf_counter()-t1
    ordered=sorted((names[j],j) for j in orb)
    return {"generator_count":len(gens),"bliss_wall_s":bliss,"nontrivial_orbit_count":len(orbits),
      "largest_orbit":{"size":len(orb),"names":[x[0] for x in ordered],"indices":[x[1] for x in ordered]},
      "action_order":None if order is None else str(order),
      "factorial_order":str(expected),"full_symmetric":order==expected if order is not None else False,
      "order_status":status,"order_wall_s":ow}

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(path,seed,chain=None):
    m=scip_model(path,seed,0);m.setRealParam("limits/time",LIMIT);added=0
    if chain:
        vd={v.name:v for v in m.getVars(transformed=False)}
        for i in range(len(chain)-1):
            a,b=chain[i],chain[i+1]
            if a not in vd or b not in vd:raise RuntimeError(f"chain variable missing {a}/{b}")
            m.addCons(vd[a]>=vd[b],name=f"IG_ACTION_ORDER_CHAIN_{i}");added+=1
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    p=finite(m.getPrimalbound());d=finite(m.getDualbound())
    return {"status":str(m.getStatus()),"primal":p,"dual":d,"gap":finite(m.getGap()),
      "bound_width":None if p is None or d is None else abs(p-d),"nodes":int(m.getNNodes()),
      "lp_iterations":int(m.getNLPIterations()),"wall_s":wall,"added_constraints":added}

def med(v):
    v=[x for x in v if x is not None];return statistics.median(v) if v else None
def summary(tr,key):
    return {"median_gap":med([t[key]["gap"] for t in tr]),"median_bound_width":med([t[key]["bound_width"] for t in tr]),
      "median_nodes":med([t[key]["nodes"] for t in tr]),"median_lp":med([t[key]["lp_iterations"] for t in tr])}

def inspect(name):
    src,source=download(name);resid,s1,active=transform(name,src)
    f0=time.perf_counter();lp,linear=load_lp(resid);g,colors,names,gmeta=build_active(lp,active)
    group=analyze(g,colors,names);frontend=time.perf_counter()-f0
    trials=[];sm=None
    if group["full_symmetric"]:
        chain=group["largest_orbit"]["names"]
        for seed in SEEDS:
            a=solve(resid,seed,None);b=solve(resid,seed,chain)
            trials.append({"seed":seed,"baseline":a,"sorted":b})
            print(name,seed,a["gap"],b["gap"],a["nodes"],b["nodes"],flush=True)
        sm={"baseline":summary(trials,"baseline"),"sorted":summary(trials,"sorted"),
          "paired_gap_wins":sum(1 for t in trials if t["baseline"]["gap"] is not None and t["sorted"]["gap"] is not None and t["sorted"]["gap"]<t["baseline"]["gap"]),
          "paired_gap_losses":sum(1 for t in trials if t["baseline"]["gap"] is not None and t["sorted"]["gap"] is not None and t["sorted"]["gap"]>t["baseline"]["gap"])}
    return {"name":name,"source":source,"stage1":s1,"linearized":linear,"active_graph":gmeta,
      "group":group,"structural_frontend_wall_s":frontend,"trials":trials,"summary":sm}

def main():
    results=[];errors=[]
    for n in INSTANCES:
        try:
            r=inspect(n);results.append(r)
            g=r["group"];print(n,g["order_status"],g["largest_orbit"]["size"] if g["largest_orbit"] else 0,g["full_symmetric"],flush=True)
        except Exception as e:
            errors.append({"name":n,"error":repr(e)});print(n,"ERROR",repr(e),flush=True)
    out={"experiment":"post-scip-active-orbit-action-order-0.3","date":"2026-10-06",
      "results":results,"errors":errors,"full_symmetric_count":sum(1 for r in results if r["group"]["full_symmetric"]),
      "disposition":"PASS" if len(results)==len(INSTANCES) and not errors else "PARTIAL"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# Post-SCIP active orbit action-order screen 0.3","",f"**Disposition:** {out['disposition']}",
      f"**Certified full symmetric actions:** {out['full_symmetric_count']}/{len(results)}","",
      "| Instance | Largest orbit | Generators | Order status | Full S(O) | Order time | Base gap | Sorted gap |",
      "| --- | ---: | ---: | --- | --- | ---: | ---: | ---: |"]
    for r in results:
        g=r["group"];s=r["summary"];size=g["largest_orbit"]["size"] if g["largest_orbit"] else 0
        lines.append(f"| {r['name']} | {size} | {g['generator_count']} | {g['order_status']} | {g['full_symmetric']} | {g['order_wall_s']:.6f} | {s['baseline']['median_gap'] if s else ''} | {s['sorted']['median_gap'] if s else ''} |")
    if errors:lines+=["","## Errors",""]+[f"- {e['name']}: {e['error']}" for e in errors]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"full_symmetric_count":out["full_symmetric_count"],"errors":errors},indent=2))
    if out["disposition"]!="PASS":raise SystemExit(1)

if __name__=="__main__":main()
