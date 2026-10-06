#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from pathlib import Path

import highspy
import igraph as ig
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-n5-active-double-breaker-0.1")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
LIMIT=15.0
SEEDS=[0,1,2,3,4]

def cf(x):
    x=float(x);inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def download():
    d=urllib.request.urlopen(URL,timeout=90).read();raw=gzip.decompress(d)
    p=OUT/"n5-3.mps";p.write_bytes(raw)
    return p,{"source_url":URL,"gzip_sha256":hashlib.sha256(d).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def base(path,seed=0,usesymmetry=0):
    m=Model();m.hideOutput(True);m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except Exception:pass
    m.setIntParam("misc/usesymmetry",int(usesymmetry))
    return m

def stage1(src):
    m=base(src,0,0)
    m.presolve()
    active_vars={str(v.name) for v in m.getVars(transformed=True)}
    active_conss={str(c.name) for c in m.getConss(transformed=True)}
    snap={"vars":len(active_vars),"conss":len(active_conss),"presolve_time_s":float(m.getPresolvingTime())}
    p=OUT/"n5-stage1.mps";m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,snap,active_vars,active_conss

def load_lp(path):
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("read stage1 MPS")
    return h.getLp(),{"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}

def edges(lp):
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
    n=int(lp.num_col_);m=int(lp.num_row_);trip=edges(lp)
    cn=[str(lp.col_names_[j]) if len(lp.col_names_)>j else f"col#{j}" for j in range(n)]
    rn=[str(lp.row_names_[i]) if len(lp.row_names_)>i else f"row#{i}" for i in range(m)]
    attrs=[]
    for j in range(n):
        attrs.append(("V","ACTIVE" if cn[j] in active_vars else "EXPORT_ONLY",
          cf(lp.col_cost_[j]),cf(lp.col_lower_[j]),cf(lp.col_upper_[j]),
          str(lp.integrality_[j]) if len(lp.integrality_) else "C"))
    for i in range(m):
        attrs.append(("R","ACTIVE" if rn[i] in active_conss else "EXPORT_ONLY",
          cf(lp.row_lower_[i]),cf(lp.row_upper_[i])))
    for _,_,a in trip:attrs.append(("E",cf(a)))
    pal={};colors=[]
    for a in attrs:
        if a not in pal:pal[a]=len(pal)
        colors.append(pal[a])
    es=[];baseidx=n+m
    for k,(i,j,a) in enumerate(trip):
        e=baseidx+k;es.append((j,e));es.append((e,n+i))
    g=ig.Graph(n=len(attrs),edges=es,directed=False)
    active_idx={j for j,nm in enumerate(cn) if nm in active_vars}
    return g,colors,cn,active_idx,{"variables":n,"rows":m,"vertices":len(attrs),"edges":len(es)}

def replay(g,colors,perm):
    if len(perm)!=g.vcount() or sorted(perm)!=list(range(g.vcount())):raise RuntimeError("bad permutation")
    for i,p in enumerate(perm):
        if colors[i]!=colors[p]:raise RuntimeError("color mismatch")
    eset={tuple(sorted(e.tuple)) for e in g.es}
    for u,v in eset:
        if tuple(sorted((perm[u],perm[v]))) not in eset:raise RuntimeError("edge mismatch")

def active_generators(lp,g,colors,names,active_idx):
    gens=g.automorphism_group(sh="fl",color=colors);acc=[]
    for k,p in enumerate(gens):
        replay(g,colors,p)
        moved=[j for j in active_idx if p[j]!=j]
        if not moved:continue
        if any(p[j] not in active_idx for j in moved):raise RuntimeError("active set not preserved")
        # Frozen exact-composition target: generator must be an involution on all graph vertices.
        invol=all(p[p[i]]==i for i in range(len(p)))
        ordered=sorted((names[j],j) for j in moved)
        _,a=ordered[0];b=p[a]
        acc.append({"index":k,"perm":p,"moved":moved,"involution":invol,
          "a":a,"b":b,"a_name":names[a],"b_name":names[b]})
    acc.sort(key=lambda x:(x["a_name"],x["b_name"],x["index"]))
    return gens,acc

def select_two(acc):
    if len(acc)<2:return None
    for i in range(len(acc)):
        for j in range(i+1,len(acc)):
            g1,g2=acc[i],acc[j]
            if not(g1["involution"] and g2["involution"]):continue
            # Require each chosen breaker pair to be pointwise fixed by the other generator.
            if g2["perm"][g1["a"]]!=g1["a"] or g2["perm"][g1["b"]]!=g1["b"]:continue
            if g1["perm"][g2["a"]]!=g2["a"] or g1["perm"][g2["b"]]!=g2["b"]:continue
            return g1,g2
    return None

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(path,seed,breakers):
    m=base(path,seed,0)
    m.setRealParam("limits/time",LIMIT)
    vd={v.name:v for v in m.getVars(transformed=False)}
    for idx,b in enumerate(breakers):
        if b["a_name"] not in vd or b["b_name"] not in vd:raise RuntimeError("breaker variable missing")
        m.addCons(vd[b["a_name"]]>=vd[b["b_name"]],name=f"IG_ACTIVE_BREAKER_{idx}")
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    return {"seed":seed,"status":str(m.getStatus()),"primal":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),
      "wall_s":wall,"transformed_vars":m.getNVars(transformed=True),"transformed_conss":m.getNConss(transformed=True)}

def med(v):
    v=[x for x in v if x is not None];return statistics.median(v) if v else None

def summarize(trials,key):
    return {"median_gap":med([t[key]["gap"] for t in trials]),"median_nodes":med([t[key]["nodes"] for t in trials]),
      "median_lp":med([t[key]["lp_iterations"] for t in trials]),"median_primal":med([t[key]["primal"] for t in trials]),
      "median_dual":med([t[key]["dual"] for t in trials]),"median_wall_s":med([t[key]["wall_s"] for t in trials])}

def main():
    src,source=download();resid,snap,active_vars,active_conss=stage1(src)
    t0=time.perf_counter();lp,linear=load_lp(resid);g,colors,names,active_idx,enc=build(lp,active_vars,active_conss)
    bt=time.perf_counter();gens,acc=active_generators(lp,g,colors,names,active_idx);bliss_and_replay=time.perf_counter()-bt
    selected=select_two(acc);frontend=time.perf_counter()-t0
    if selected is None:
        raise RuntimeError(f"no independently composable active generator pair; active generators={len(acc)}")
    g1,g2=selected
    # Keep evidence concise.
    genmeta=[{"index":x["index"],"moved_active_variables":len(x["moved"]),"involution":x["involution"],
              "a_name":x["a_name"],"b_name":x["b_name"]} for x in acc]
    b1={k:g1[k] for k in ("index","a","b","a_name","b_name")}
    b2={k:g2[k] for k in ("index","a","b","a_name","b_name")}
    trials=[]
    for seed in SEEDS:
        a=solve(resid,seed,[])
        b=solve(resid,seed,[b1])
        c=solve(resid,seed,[b1,b2])
        trials.append({"seed":seed,"baseline":a,"single":b,"double":c})
        print(seed,"gaps",a["gap"],b["gap"],c["gap"],"nodes",a["nodes"],b["nodes"],c["nodes"],flush=True)
    summary={k:summarize(trials,k) for k in ("baseline","single","double")}
    summary.update({
      "double_gap_wins_vs_baseline":sum(1 for t in trials if t["double"]["gap"] is not None and t["baseline"]["gap"] is not None and t["double"]["gap"]<t["baseline"]["gap"]),
      "double_gap_losses_vs_baseline":sum(1 for t in trials if t["double"]["gap"] is not None and t["baseline"]["gap"] is not None and t["double"]["gap"]>t["baseline"]["gap"]),
      "double_gap_ties_vs_baseline":sum(1 for t in trials if t["double"]["gap"]==t["baseline"]["gap"])
    })
    result={"experiment":"n5-active-double-breaker-0.1","date":"2026-10-06","source":source,
      "pyscipopt_version":pyscipopt.__version__,"igraph_version":ig.__version__,
      "stage1":snap,"linearized_export":linear,"encoding":enc,
      "bliss":{"generator_count":len(gens),"active_generator_count":len(acc),"bliss_and_replay_wall_s":bliss_and_replay,
               "structural_frontend_wall_s":frontend},
      "active_generators":genmeta,
      "selected_breakers":[b1,b2],
      "composition_certificate":{"generator1_involution":g1["involution"],"generator2_involution":g2["involution"],
         "g2_fixes_breaker1_pair":True,"g1_fixes_breaker2_pair":True,
         "proof":"Each breaker can be oriented by its automorphism without changing the variables used by the other breaker; sequential orientation yields an objective-equal representative satisfying both."},
      "trials":trials,"summary":summary,"disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# n5-3 active double-generator symmetry benchmark 0.1","",
      f"**Active generators:** {len(acc)}",f"**Structural frontend:** {frontend:.6f}s",
      f"**Breaker 1:** {b1['a_name']} >= {b1['b_name']}",
      f"**Breaker 2:** {b2['a_name']} >= {b2['b_name']}","",
      "| Seed | Baseline gap | Single gap | Double gap | Baseline nodes | Single nodes | Double nodes |",
      "| ---: | ---: | ---: | ---: | ---: | ---: | ---: |"]
    for t in trials:
        lines.append(f"| {t['seed']} | {t['baseline']['gap']} | {t['single']['gap']} | {t['double']['gap']} | {t['baseline']['nodes']} | {t['single']['nodes']} | {t['double']['nodes']} |")
    lines += ["","## Medians","",f"~~~json\n{json.dumps(summary,indent=2)}\n~~~",
      "","All timed variants use normal SCIP presolve with symmetry disabled, so export-only dead columns are removed before solving."]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"active_generators":genmeta,"selected_breakers":[b1,b2],"summary":summary},indent=2))

if __name__=="__main__":main()
