#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from pathlib import Path
import highspy, igraph as ig, pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-post-scip-active-symmetry-value-0.1");OUT.mkdir(parents=True,exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"
INSTANCES=["n5-3","neos-911970","seymour1","mas74","mas76"]
SEEDS=[0,1,2];LIMIT=10.0

def cf(x):
    x=float(x);inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def download(name):
    u=f"{BASE}/{name}.mps.gz";d=urllib.request.urlopen(u,timeout=120).read();raw=gzip.decompress(d)
    p=OUT/f"{name}.mps";p.write_bytes(raw)
    return p,{"source_url":u,"gzip_sha256":hashlib.sha256(d).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def base(path,seed=0,usesymmetry=0,maxrounds=None):
    m=Model();m.hideOutput(True);m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except:pass
    if usesymmetry is not None:m.setIntParam("misc/usesymmetry",int(usesymmetry))
    if maxrounds is not None:m.setIntParam("presolving/maxrounds",int(maxrounds))
    return m

def transform(name,src):
    m=base(src,0,0,None);t=time.perf_counter();m.presolve();wall=time.perf_counter()-t
    active_vars={str(v.name) for v in m.getVars(transformed=True)}
    active_conss={str(c.name) for c in m.getConss(transformed=True)}
    p=OUT/f"{name}-scip-transformed.mps";m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,{"vars":len(active_vars),"conss":len(active_conss),"presolve_wall_s":wall},active_vars,active_conss

def load_lp(path):
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("read transformed MPS failed")
    return h.getLp(),{"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}

def triples(lp):
    n=int(lp.num_col_);m=int(lp.num_row_);out=[]
    st=list(lp.a_matrix_.start_);ind=list(lp.a_matrix_.index_);val=list(lp.a_matrix_.value_)
    if lp.a_matrix_.format_==highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(st[j],st[j+1]):out.append((int(ind[p]),j,float(val[p])))
    else:
        for i in range(m):
            for p in range(st[i],st[i+1]):out.append((i,int(ind[p]),float(val[p])))
    return out

def build(lp,active_vars,active_conss):
    n=int(lp.num_col_);m=int(lp.num_row_);ts=triples(lp)
    cn=[str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}" for j in range(n)]
    rn=[str(lp.row_names_[i]) if len(lp.row_names_)>i and lp.row_names_[i] else f"row#{i}" for i in range(m)]
    attrs=[]
    for j in range(n):attrs.append(("V","ACTIVE" if cn[j] in active_vars else "EXPORT_ONLY",cf(lp.col_cost_[j]),cf(lp.col_lower_[j]),cf(lp.col_upper_[j]),str(lp.integrality_[j]) if len(lp.integrality_) else "C"))
    for i in range(m):attrs.append(("R","ACTIVE" if rn[i] in active_conss else "EXPORT_ONLY",cf(lp.row_lower_[i]),cf(lp.row_upper_[i])))
    for _,_,a in ts:attrs.append(("E",cf(a)))
    pal={};colors=[]
    for a in attrs:
        if a not in pal:pal[a]=len(pal)
        colors.append(pal[a])
    edges=[];basev=n+m
    for k,(i,j,a) in enumerate(ts):
        e=basev+k;edges.append((j,e));edges.append((e,n+i))
    g=ig.Graph(n=len(attrs),edges=edges,directed=False)
    active_idx={j for j,nm in enumerate(cn) if nm in active_vars}
    return g,colors,cn,active_idx,{"vertices":len(attrs),"edges":len(edges),"active_vars":len(active_idx),"export_only_vars":n-len(active_idx)}

def replay(g,colors,perm):
    if len(perm)!=g.vcount() or sorted(perm)!=list(range(g.vcount())):raise RuntimeError("bad permutation")
    for i,p in enumerate(perm):
        if colors[i]!=colors[p]:raise RuntimeError("color mismatch")
    es={tuple(sorted(e.tuple)) for e in g.es}
    for u,v in es:
        if tuple(sorted((perm[u],perm[v]))) not in es:raise RuntimeError("edge mismatch")

def choose(lp,g,colors,names,active_idx):
    t=time.perf_counter();gens=g.automorphism_group(sh="fl",color=colors);bliss=time.perf_counter()-t
    candidates=[];active_gens=0
    for gi,perm in enumerate(gens):
        replay(g,colors,perm)
        moved=[j for j in active_idx if perm[j]!=j]
        if not moved:continue
        active_gens+=1
        moved.sort(key=lambda j:names[j])
        a=moved[0];b=perm[a]
        if b not in active_idx:raise RuntimeError("ACTIVE tag not preserved")
        candidates.append((names[a],names[b],gi,a,b,len(moved)))
    if not candidates:raise RuntimeError("no active-moving exact generator")
    candidates.sort();an,bn,gi,a,b,count=candidates[0]
    return {"a_name":an,"b_name":bn,"a_index":a,"b_index":b,"generator_index":gi,"active_moved_variables":count,
      "generator_count":len(gens),"active_generator_count":active_gens,"bliss_wall_s":bliss}

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(path,seed,usesymmetry,breaker=None):
    m=base(path,seed,usesymmetry,0);m.setRealParam("limits/time",LIMIT)
    if breaker:
        vd={v.name:v for v in m.getVars(transformed=False)}
        a,b=breaker["a_name"],breaker["b_name"]
        if a not in vd or b not in vd:raise RuntimeError(f"breaker var missing {a}/{b}")
        m.addCons(vd[a]>=vd[b],name="IG_ACTIVE_EXACT_BREAKER")
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    p=finite(m.getPrimalbound());d=finite(m.getDualbound())
    return {"status":str(m.getStatus()),"primal":p,"dual":d,"gap":finite(m.getGap()),
      "bound_width":None if p is None or d is None else abs(p-d),"nodes":int(m.getNNodes()),
      "lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(xs):
    xs=[x for x in xs if x is not None];return statistics.median(xs) if xs else None

def summ(trials,key):
    return {"median_gap":med([t[key]["gap"] for t in trials]),"median_bound_width":med([t[key]["bound_width"] for t in trials]),
      "median_nodes":med([t[key]["nodes"] for t in trials]),"median_lp":med([t[key]["lp_iterations"] for t in trials])}

def inspect(name):
    src,source=download(name);resid,stage1,av,ac=transform(name,src)
    f0=time.perf_counter();lp,linear=load_lp(resid);g,colors,names,ai,enc=build(lp,av,ac);br=choose(lp,g,colors,names,ai);frontend=time.perf_counter()-f0
    trials=[]
    for seed in SEEDS:
        a=solve(resid,seed,None,None);b=solve(resid,seed,0,None);c=solve(resid,seed,0,br)
        trials.append({"seed":seed,"default":a,"symmetry_off":b,"active_breaker":c})
        print(name,seed,a["gap"],b["gap"],c["gap"],flush=True)
    s={k:summ(trials,k) for k in ("default","symmetry_off","active_breaker")}
    tg=s["active_breaker"]["median_gap"];ag=s["default"]["median_gap"];bg=s["symmetry_off"]["median_gap"]
    win=tg is not None and ag is not None and bg is not None and tg<ag and tg<bg
    return {"name":name,"source":source,"stage1":stage1,"linearized":linear,"encoding":enc,
      "breaker":br,"structural_frontend_wall_s":frontend,"trials":trials,"summary":s,"directional_value_win":win}

def main():
    results=[];errors=[]
    for n in INSTANCES:
        try:
            r=inspect(n);results.append(r);print(n,"WIN" if r["directional_value_win"] else "NO_WIN",r["breaker"],flush=True)
        except Exception as e:
            errors.append({"name":n,"error":repr(e)});print(n,"ERROR",repr(e),flush=True)
    out={"experiment":"post-scip-active-symmetry-value-0.1","date":"2026-10-06","results":results,"errors":errors,
      "directional_wins":sum(1 for r in results if r["directional_value_win"]),
      "disposition":"PASS" if len(results)==len(INSTANCES) and not errors else "PARTIAL"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# Post-SCIP active-symmetry value holdout 0.1","",f"**Disposition:** {out['disposition']}",f"**Directional wins:** {out['directional_wins']}/{len(results)}","",
      "| Instance | Breaker | Active moved | Frontend s | Default gap | Off gap | IG gap | Win |","| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |"]
    for r in results:
        s=r["summary"];b=r["breaker"]
        lines.append(f"| {r['name']} | {b['a_name']} >= {b['b_name']} | {b['active_moved_variables']} | {r['structural_frontend_wall_s']:.5f} | {s['default']['median_gap']} | {s['symmetry_off']['median_gap']} | {s['active_breaker']['median_gap']} | {r['directional_value_win']} |")
    if errors:lines+=["","## Errors",""]+[f"- {e['name']}: {e['error']}" for e in errors]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"directional_wins":out["directional_wins"],"errors":errors},indent=2))
    if out["disposition"]!="PASS":raise SystemExit(1)
if __name__=="__main__":main()
