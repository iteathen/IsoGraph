#!/usr/bin/env python3
import gzip, hashlib, json, math, statistics, time, urllib.request
from pathlib import Path
import highspy, pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-n5-post-scip-witness-replay-0.1")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
WITNESS_FILE=Path("research/miplib-structural-presolve/evidence/higher-aut-run-37532537720-attempt-1/RESULT.json")
LIMIT=15.0
SEEDS=[0,1,2,3,4]

def fv(x):
    x=float(x); inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def download():
    data=urllib.request.urlopen(URL,timeout=90).read();raw=gzip.decompress(data)
    p=OUT/"n5-3.mps";p.write_bytes(raw)
    return p,{"source_url":URL,"gzip_sha256":hashlib.sha256(data).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def scip_base(path,seed=0,presolve_rounds=None):
    m=Model();m.hideOutput(True);m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except:pass
    try:m.setIntParam("randomization/randomseedshift",int(seed))
    except:pass
    m.setIntParam("misc/usesymmetry",0)
    if presolve_rounds is not None:m.setIntParam("presolving/maxrounds",int(presolve_rounds))
    return m

def transform(src):
    m=scip_base(src,0,None);m.presolve()
    snap={"vars":m.getNVars(transformed=True),"conss":m.getNConss(transformed=True),"presolve_time_s":m.getPresolvingTime()}
    p=OUT/"n5-3-scip-transformed.mps";m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,snap

def load_lp(path):
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(path))==highspy.HighsStatus.kError:raise RuntimeError("read transformed")
    return h.getLp(),{"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}

def matrix_rows(lp):
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
    else:raise RuntimeError("unsupported matrix")
    return rows

def witnesses():
    d=json.loads(WITNESS_FILE.read_text());n5=next(x for x in d["results"] if x["name"]=="n5-3")
    return n5["search"]["witnesses"]

def replay(lp,rows,w):
    cn=[str(x) for x in lp.col_names_];rn=[str(x) for x in lp.row_names_]
    cp={n:i for i,n in enumerate(cn)};rp={n:i for i,n in enumerate(rn)}
    vm={};rm={};mv=[];mr=[]
    for a,b in w["moved_variable_pairs"]:
        if a not in cp or b not in cp:mv.append([a,b])
        else:vm[cp[a]]=cp[b]
    for a,b in w["moved_row_pairs"]:
        if a not in rp or b not in rp:mr.append([a,b])
        else:rm[rp[a]]=rp[b]
    if mv or mr:return {"exact":False,"reason":"missing_names","missing_variable_pairs":mv[:30],"missing_row_pairs":mr[:30]}
    n=int(lp.num_col_);m=int(lp.num_row_)
    for j in range(n):vm.setdefault(j,j)
    for i in range(m):rm.setdefault(i,i)
    if len(set(vm.values()))!=n or len(set(rm.values()))!=m:return {"exact":False,"reason":"not_bijective"}
    probs=[]
    for j in range(n):
        k=vm[j]
        if fv(lp.col_cost_[j])!=fv(lp.col_cost_[k]) or fv(lp.col_lower_[j])!=fv(lp.col_lower_[k]) or fv(lp.col_upper_[j])!=fv(lp.col_upper_[k]):
            probs.append(["col",cn[j],cn[k]]);break
        if len(lp.integrality_) and lp.integrality_[j]!=lp.integrality_[k]:
            probs.append(["integrality",cn[j],cn[k]]);break
    if not probs:
        for i in range(m):
            q=rm[i]
            if fv(lp.row_lower_[i])!=fv(lp.row_lower_[q]) or fv(lp.row_upper_[i])!=fv(lp.row_upper_[q]):
                probs.append(["row_bounds",rn[i],rn[q]]);break
            tr={vm[j]:fv(v) for j,v in rows[i].items()};tg={j:fv(v) for j,v in rows[q].items()}
            if tr!=tg:probs.append(["row_matrix",rn[i],rn[q]]);break
    moved=[j for j in range(n) if vm[j]!=j]
    return {"exact":not probs,"reason":None if not probs else "invariance_failure","problems":probs,
      "moved_variables":len(moved),"moved_rows":sum(1 for i in range(m) if rm[i]!=i),
      "variable_map_names":{cn[j]:cn[vm[j]] for j in moved}}

def choose(rs):
    ex=[(i,r) for i,r in enumerate(rs) if r["exact"]]
    if not ex:return None
    opts=[]
    for i,r in ex:
        a=sorted(r["variable_map_names"])[0];b=r["variable_map_names"][a];opts.append((a,b,i,r))
    opts.sort(key=lambda x:(x[0],x[1],x[2]));a,b,i,r=opts[0]
    return {"witness_index":i,"a_name":a,"b_name":b,"moved_variables":r["moved_variables"],"moved_rows":r["moved_rows"]}

def finite(x):
    try:x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve(path,seed,breaker):
    m=scip_base(path,seed,0);m.setRealParam("limits/time",LIMIT)
    if breaker:
        vd={v.name:v for v in m.getVars(transformed=False)}
        if breaker["a_name"] not in vd or breaker["b_name"] not in vd:raise RuntimeError("breaker vars missing")
        m.addCons(vd[breaker["a_name"]]>=vd[breaker["b_name"]],name="IG_POST_SCIP_REPLAY_BREAKER")
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    return {"seed":seed,"status":str(m.getStatus()),"primal":finite(m.getPrimalbound()),"dual":finite(m.getDualbound()),
      "gap":finite(m.getGap()),"nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),"wall_s":wall}

def med(v):
    v=[x for x in v if x is not None];return statistics.median(v) if v else None

def main():
    src,source=download();trans,snap=transform(src);lp,dims=load_lp(trans);rows=matrix_rows(lp)
    ws=witnesses();rs=[replay(lp,rows,w) for w in ws];chosen=choose(rs)
    result={"experiment":"n5-3-post-scip-witness-replay-0.1","date":"2026-10-06","source":source,
      "pyscipopt_version":pyscipopt.__version__,"scip_transformed":snap,"linearized_transformed":dims,
      "witnesses_tested":len(ws),"replays":rs,"chosen_breaker":chosen}
    if chosen is None:
        result.update({"status":"NO_FROZEN_WITNESS_REPLAYS_UNCHANGED","disposition":"PASS","trials":[]})
    else:
        trials=[]
        for seed in SEEDS:
            a=solve(trans,seed,None);b=solve(trans,seed,chosen);trials.append({"seed":seed,"baseline":a,"breaker":b})
            print(seed,a["gap"],b["gap"],a["nodes"],b["nodes"],flush=True)
        summary={
          "baseline_median_gap":med([t["baseline"]["gap"] for t in trials]),
          "breaker_median_gap":med([t["breaker"]["gap"] for t in trials]),
          "baseline_median_nodes":med([t["baseline"]["nodes"] for t in trials]),
          "breaker_median_nodes":med([t["breaker"]["nodes"] for t in trials]),
          "paired_gap_wins":sum(1 for t in trials if t["baseline"]["gap"] is not None and t["breaker"]["gap"] is not None and t["breaker"]["gap"]<t["baseline"]["gap"]),
          "paired_gap_losses":sum(1 for t in trials if t["baseline"]["gap"] is not None and t["breaker"]["gap"] is not None and t["breaker"]["gap"]>t["baseline"]["gap"])
        }
        result.update({"status":"EXACT_FROZEN_WITNESS_SURVIVES_SCIP","disposition":"PASS","trials":trials,"summary":summary})
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# n5-3 post-SCIP frozen-witness replay 0.1","",f"**Status:** {result['status']}",f"**Exact replays:** {sum(1 for r in rs if r['exact'])}/{len(rs)}"]
    if chosen:
        lines += ["",f"**Breaker:** {chosen['a_name']} >= {chosen['b_name']}","",
          "| Seed | Baseline gap | Breaker gap | Baseline nodes | Breaker nodes |",
          "| ---: | ---: | ---: | ---: | ---: |"]
        for t in result["trials"]:lines.append(f"| {t['seed']} | {t['baseline']['gap']} | {t['breaker']['gap']} | {t['baseline']['nodes']} | {t['breaker']['nodes']} |")
        lines += ["","~~~json",json.dumps(result["summary"],indent=2),"~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"status":result["status"],"exact_replays":sum(1 for r in rs if r["exact"]),"chosen":chosen,"summary":result.get("summary")},indent=2))

if __name__=="__main__":main()
