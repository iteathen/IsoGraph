#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-active-value-confirmation-0.2")
OUT.mkdir(parents=True,exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"
TARGETS={
  "seymour1":("t_x1108","t_x1110"),
  "mas74":("t_x117","t_x24"),
  "mas76":("t_x117","t_x24"),
}
SEEDS=[3,4,5]
LIMIT=60.0

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
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
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
    if h.readModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("read transformed MPS")
    return h.getLp(),{"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}

def triples(lp):
    n=int(lp.num_col_);m=int(lp.num_row_);out=[]
    st=list(lp.a_matrix_.start_);ind=list(lp.a_matrix_.index_);val=list(lp.a_matrix_.value_)
    if lp.a_matrix_.format_==highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(st[j],st[j+1]):out.append((int(ind[p]),j,float(val[p])))
    elif lp.a_matrix_.format_==highspy.MatrixFormat.kRowwise:
        for i in range(m):
            for p in range(st[i],st[i+1]):out.append((i,int(ind[p]),float(val[p])))
    else:raise RuntimeError("matrix format")
    return out

def build(lp,active_vars,active_conss):
    n=int(lp.num_col_);m=int(lp.num_row_);ts=triples(lp)
    cn=[str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}" for j in range(n)]
    rn=[str(lp.row_names_[i]) if len(lp.row_names_)>i and lp.row_names_[i] else f"row#{i}" for i in range(m)]
    attrs=[]
    for j in range(n):
        attrs.append(("V","ACTIVE" if cn[j] in active_vars else "EXPORT_ONLY",
          cf(lp.col_cost_[j]),cf(lp.col_lower_[j]),cf(lp.col_upper_[j]),
          str(lp.integrality_[j]) if len(lp.integrality_) else "C"))
    for i in range(m):
        attrs.append(("R","ACTIVE" if rn[i] in active_conss else "EXPORT_ONLY",
          cf(lp.row_lower_[i]),cf(lp.row_upper_[i])))
    for _,_,a in ts:attrs.append(("E",cf(a)))
    pal={};colors=[]
    for a in attrs:
        if a not in pal:pal[a]=len(pal)
        colors.append(pal[a])
    edges=[];baseidx=n+m
    for k,(i,j,a) in enumerate(ts):
        e=baseidx+k;edges.append((j,e));edges.append((e,n+i))
    g=ig.Graph(n=len(attrs),edges=edges,directed=False)
    active_idx={j for j,nm in enumerate(cn) if nm in active_vars}
    return g,colors,cn,active_idx,{"vertices":len(attrs),"edges":len(edges),"active_vars":len(active_idx),"export_only_vars":n-len(active_idx)}

def replay_selected(g,colors,perm):
    if len(perm)!=g.vcount() or sorted(perm)!=list(range(g.vcount())):raise RuntimeError("bad permutation")
    for i,p in enumerate(perm):
        if colors[i]!=colors[p]:raise RuntimeError("color mismatch")
    eset={tuple(sorted(e.tuple)) for e in g.es}
    for u,v in eset:
        if tuple(sorted((perm[u],perm[v]))) not in eset:raise RuntimeError("edge replay failure")

def recover_breaker(lp,g,colors,names,active_idx,expected):
    t=time.perf_counter();gens=g.automorphism_group(sh="fl",color=colors);bliss=time.perf_counter()-t
    pos={n:i for i,n in enumerate(names)}
    a_name,b_name=expected
    if a_name not in pos or b_name not in pos:raise RuntimeError("frozen breaker variable missing")
    a,b=pos[a_name],pos[b_name]
    if a not in active_idx or b not in active_idx:raise RuntimeError("frozen breaker is not active")
    chosen=None
    for gi,p in enumerate(gens):
        if p[a]==b:
            chosen=(gi,p);break
    if chosen is None:raise RuntimeError("frozen exact generator not recovered")
    gi,p=chosen
    replay_selected(g,colors,p)
    if p[a]!=b:raise RuntimeError("replay drift")
    return {"a_name":a_name,"b_name":b_name,"generator_index":gi,"generator_count":len(gens),
      "bliss_wall_s":bliss,"moved_active_variables":sum(1 for j in active_idx if p[j]!=j)}

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(path,seed,usesymmetry,breaker=None):
    m=base(path,seed,usesymmetry,0);m.setRealParam("limits/time",LIMIT)
    if breaker:
        vd={v.name:v for v in m.getVars(transformed=False)}
        a,b=breaker["a_name"],breaker["b_name"]
        if a not in vd or b not in vd:raise RuntimeError("breaker vars absent on solve reload")
        m.addCons(vd[a]>=vd[b],name="IG_ACTIVE_CONFIRM_BREAKER")
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    p=finite(m.getPrimalbound());d=finite(m.getDualbound())
    return {"status":str(m.getStatus()),"primal":p,"dual":d,"gap":finite(m.getGap()),
      "bound_width":None if p is None or d is None else abs(p-d),"nodes":int(m.getNNodes()),
      "lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(xs):
    xs=[x for x in xs if x is not None];return statistics.median(xs) if xs else None

def inspect(name,expected):
    src,source=download(name);resid,stage1,av,ac=transform(name,src)
    f0=time.perf_counter();lp,linear=load_lp(resid);g,colors,names,ai,enc=build(lp,av,ac)
    br=recover_breaker(lp,g,colors,names,ai,expected);frontend=time.perf_counter()-f0
    trials=[]
    for seed in SEEDS:
        a=solve(resid,seed,None,None);b=solve(resid,seed,0,br)
        trials.append({"seed":seed,"default":a,"ig":b})
        print(name,seed,a["gap"],b["gap"],a["nodes"],b["nodes"],flush=True)
    dg=med([t["default"]["gap"] for t in trials]);ig=med([t["ig"]["gap"] for t in trials])
    wins=sum(1 for t in trials if t["default"]["gap"] is not None and t["ig"]["gap"] is not None and t["ig"]["gap"]<t["default"]["gap"])
    losses=sum(1 for t in trials if t["default"]["gap"] is not None and t["ig"]["gap"] is not None and t["ig"]["gap"]>t["default"]["gap"])
    confirmation=dg is not None and ig is not None and ig<dg and wins>=2
    return {"name":name,"source":source,"stage1":stage1,"linearized":linear,"encoding":enc,"breaker":br,
      "structural_frontend_wall_s":frontend,"trials":trials,
      "summary":{"default_median_gap":dg,"ig_median_gap":ig,
        "default_median_bound_width":med([t["default"]["bound_width"] for t in trials]),
        "ig_median_bound_width":med([t["ig"]["bound_width"] for t in trials]),
        "default_median_nodes":med([t["default"]["nodes"] for t in trials]),
        "ig_median_nodes":med([t["ig"]["nodes"] for t in trials]),
        "paired_gap_wins":wins,"paired_gap_losses":losses,
        "paired_gap_ties":3-wins-losses,"confirmed":confirmation}}

def main():
    results=[];errors=[]
    for name,expected in TARGETS.items():
        try:
            r=inspect(name,expected);results.append(r);print(name,"CONFIRMED" if r["summary"]["confirmed"] else "NOT_CONFIRMED",flush=True)
        except Exception as e:
            errors.append({"name":name,"error":repr(e)});print(name,"ERROR",repr(e),flush=True)
    out={"experiment":"post-scip-active-value-confirmation-0.2","date":"2026-10-06",
      "seeds":SEEDS,"limit_s":LIMIT,"results":results,"errors":errors,
      "confirmed":sum(1 for r in results if r["summary"]["confirmed"]),
      "disposition":"PASS" if len(results)==len(TARGETS) and not errors else "PARTIAL"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# Post-SCIP active-value confirmation 0.2","",f"**Disposition:** {out['disposition']}",f"**Confirmed:** {out['confirmed']}/{len(results)}","",
      "| Instance | Breaker | Frontend s | Default median gap | IG median gap | Pair wins | Confirmed |",
      "| --- | --- | ---: | ---: | ---: | ---: | --- |"]
    for r in results:
        s=r["summary"];b=r["breaker"]
        lines.append(f"| {r['name']} | {b['a_name']} >= {b['b_name']} | {r['structural_frontend_wall_s']:.4f} | {s['default_median_gap']} | {s['ig_median_gap']} | {s['paired_gap_wins']} | {s['confirmed']} |")
    if errors:lines+=["","## Errors",""]+[f"- {e['name']}: {e['error']}" for e in errors]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"confirmed":out["confirmed"],"errors":errors},indent=2))
    if out["disposition"]!="PASS":raise SystemExit(1)

if __name__=="__main__":main()
