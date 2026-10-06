#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from pathlib import Path

import highspy, pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-n5-original-automorphism-replay-0.1")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
WITNESS_FILE=Path("research/miplib-structural-presolve/evidence/higher-aut-run-37532537720-attempt-1/RESULT.json")
LIMIT=15.0
SEEDS=[0,1,2,3,4]

def fv(x):
    x=float(x);inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def download():
    data=urllib.request.urlopen(URL,timeout=90).read();raw=gzip.decompress(data)
    p=OUT/"n5-3.mps";p.write_bytes(raw)
    return p,{"source_url":URL,"gzip_sha256":hashlib.sha256(data).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def matrix_views(lp):
    n=int(lp.num_col_);m=int(lp.num_row_);rows=[{} for _ in range(m)]
    st=list(lp.a_matrix_.start_);ind=list(lp.a_matrix_.index_);val=list(lp.a_matrix_.value_)
    if lp.a_matrix_.format_==highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(st[j],st[j+1]):
                i=int(ind[p]);rows[i][j]=float(val[p])
    elif lp.a_matrix_.format_==highspy.MatrixFormat.kRowwise:
        for i in range(m):
            for p in range(st[i],st[i+1]):
                j=int(ind[p]);rows[i][j]=float(val[p])
    else:raise RuntimeError("unsupported matrix format")
    return rows

def load_original(path):
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("read original")
    return h.getLp(),{"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}

def stored_witnesses():
    data=json.loads(WITNESS_FILE.read_text())
    n5=next(x for x in data["results"] if x["name"]=="n5-3")
    return n5["search"]["witnesses"]

def replay(lp,rows,w):
    colnames=[str(x) for x in lp.col_names_];rownames=[str(x) for x in lp.row_names_]
    cp={n:i for i,n in enumerate(colnames)};rp={n:i for i,n in enumerate(rownames)}
    vmap={};rmap={};missing_v=[];missing_r=[]
    for a,b in w["moved_variable_pairs"]:
        if a not in cp or b not in cp:missing_v.append([a,b])
        else:vmap[cp[a]]=cp[b]
    for a,b in w["moved_row_pairs"]:
        if a not in rp or b not in rp:missing_r.append([a,b])
        else:rmap[rp[a]]=rp[b]
    if missing_v or missing_r:
        return {"exact":False,"reason":"missing_names","missing_variable_pairs":missing_v[:20],"missing_row_pairs":missing_r[:20]}
    n=int(lp.num_col_);m=int(lp.num_row_)
    # Complete permutations by identity.
    for j in range(n):vmap.setdefault(j,j)
    for i in range(m):rmap.setdefault(i,i)
    if len(set(vmap.values()))!=n or len(set(rmap.values()))!=m:
        return {"exact":False,"reason":"mapping_not_bijective"}
    problems=[]
    for j in range(n):
        k=vmap[j]
        if fv(lp.col_cost_[j])!=fv(lp.col_cost_[k]) or fv(lp.col_lower_[j])!=fv(lp.col_lower_[k]) or fv(lp.col_upper_[j])!=fv(lp.col_upper_[k]):
            problems.append(["col",colnames[j],colnames[k]])
        if len(lp.integrality_) and lp.integrality_[j]!=lp.integrality_[k]:
            problems.append(["integrality",colnames[j],colnames[k]])
        if len(problems)>=20:break
    if not problems:
        for i in range(m):
            q=rmap[i]
            if fv(lp.row_lower_[i])!=fv(lp.row_lower_[q]) or fv(lp.row_upper_[i])!=fv(lp.row_upper_[q]):
                problems.append(["row_bounds",rownames[i],rownames[q]]);break
            transformed={vmap[j]:fv(v) for j,v in rows[i].items()}
            target={j:fv(v) for j,v in rows[q].items()}
            if transformed!=target:
                problems.append(["row_matrix",rownames[i],rownames[q]]);break
    moved=[j for j in range(n) if vmap[j]!=j]
    return {"exact":not problems,"reason":None if not problems else "invariance_failure","problems":problems,
      "moved_variables":len(moved),"moved_rows":sum(1 for i in range(m) if rmap[i]!=i),
      "variable_map_names":{colnames[j]:colnames[vmap[j]] for j in moved},
      "row_map_names":{rownames[i]:rownames[rmap[i]] for i in range(m) if rmap[i]!=i}}

def choose(replays):
    exact=[(i,r) for i,r in enumerate(replays) if r["exact"]]
    if not exact:return None
    candidates=[]
    for i,r in exact:
        names=sorted(r["variable_map_names"])
        a=names[0];b=r["variable_map_names"][a]
        candidates.append((a,b,i,r))
    candidates.sort(key=lambda x:(x[0],x[1],x[2]))
    a,b,i,r=candidates[0]
    return {"witness_index":i,"a_name":a,"b_name":b,"moved_variables":r["moved_variables"],"moved_rows":r["moved_rows"]}

def base_scip(path,seed,usesymmetry):
    m=Model();m.hideOutput(True);m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except:pass
    if usesymmetry is not None:m.setIntParam("misc/usesymmetry",int(usesymmetry))
    m.setRealParam("limits/time",LIMIT)
    return m

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(path,seed,usesymmetry,breaker=None):
    m=base_scip(path,seed,usesymmetry)
    if breaker:
        vd={v.name:v for v in m.getVars(transformed=False)}
        if breaker["a_name"] not in vd or breaker["b_name"] not in vd:raise RuntimeError("breaker vars missing")
        m.addCons(vd[breaker["a_name"]]>=vd[breaker["b_name"]],name="IG_EXACT_ORIGINAL_AUT_BREAKER")
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    return {"seed":seed,"status":str(m.getStatus()),"primal":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(vals):
    vals=[x for x in vals if x is not None];return statistics.median(vals) if vals else None

def main():
    src,source=download();lp,dims=load_original(src);rows=matrix_views(lp)
    witnesses=stored_witnesses();replays=[replay(lp,rows,w) for w in witnesses];chosen=choose(replays)
    result={"experiment":"n5-3-original-automorphism-replay-0.1","date":"2026-10-06","source":source,
      "pyscipopt_version":pyscipopt.__version__,"original_dimensions":dims,
      "witnesses_tested":len(witnesses),"replays":replays,"chosen_breaker":chosen}
    if chosen is None:
        result.update({"status":"NO_FROZEN_WITNESS_REPLAYS_ON_ORIGINAL","disposition":"PASS","trials":[]})
    else:
        trials=[]
        for seed in SEEDS:
            d=solve(src,seed,None,None);o=solve(src,seed,0,None);b=solve(src,seed,0,chosen)
            trials.append({"seed":seed,"default":d,"symmetry_off":o,"off_plus_breaker":b})
            print(seed,d["gap"],o["gap"],b["gap"],flush=True)
        summary={
          "default_median_gap":med([t["default"]["gap"] for t in trials]),
          "off_median_gap":med([t["symmetry_off"]["gap"] for t in trials]),
          "breaker_median_gap":med([t["off_plus_breaker"]["gap"] for t in trials]),
          "default_median_nodes":med([t["default"]["nodes"] for t in trials]),
          "off_median_nodes":med([t["symmetry_off"]["nodes"] for t in trials]),
          "breaker_median_nodes":med([t["off_plus_breaker"]["nodes"] for t in trials]),
          "breaker_vs_off_gap_wins":sum(1 for t in trials if t["off_plus_breaker"]["gap"] is not None and t["symmetry_off"]["gap"] is not None and t["off_plus_breaker"]["gap"]<t["symmetry_off"]["gap"]),
          "breaker_vs_off_gap_losses":sum(1 for t in trials if t["off_plus_breaker"]["gap"] is not None and t["symmetry_off"]["gap"] is not None and t["off_plus_breaker"]["gap"]>t["symmetry_off"]["gap"])
        }
        result.update({"status":"EXACT_ORIGINAL_AUTOMORPHISM","disposition":"PASS","trials":trials,"summary":summary})
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# n5-3 original automorphism replay 0.1","",f"**Status:** {result['status']}",f"**Exact frozen witnesses replaying:** {sum(1 for r in replays if r['exact'])}/{len(replays)}"]
    if chosen:
        lines += ["",f"**Breaker:** {chosen['a_name']} >= {chosen['b_name']}","",
          "| Seed | Default gap | Sym off gap | Sym off + IG gap | Default nodes | Off nodes | IG nodes |",
          "| ---: | ---: | ---: | ---: | ---: | ---: | ---: |"]
        for t in result["trials"]:
            lines.append(f"| {t['seed']} | {t['default']['gap']} | {t['symmetry_off']['gap']} | {t['off_plus_breaker']['gap']} | {t['default']['nodes']} | {t['symmetry_off']['nodes']} | {t['off_plus_breaker']['nodes']} |")
        lines += ["","~~~json",json.dumps(result["summary"],indent=2),"~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"status":result["status"],"exact_replays":sum(1 for r in replays if r["exact"]),"chosen":chosen,"summary":result.get("summary")},indent=2))

if __name__=="__main__":main()
