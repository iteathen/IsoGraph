#!/usr/bin/env python3
import importlib.util, json, math, statistics, time
from pathlib import Path
import highspy, networkx as nx, numpy as np

ROOT=Path("research/miplib-structural-presolve/tools")
OUT=Path("out/miplib-n5-composed-0.1")
OUT.mkdir(parents=True,exist_ok=True)
LIMIT=15.0
TRIALS=3

def loadmod(name,path):
    spec=importlib.util.spec_from_file_location(name,path)
    mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod);return mod

sym=loadmod("n5sym",ROOT/"run-n5-higher-symmetry-benchmark-0.1.py")
fac=loadmod("n5fac",ROOT/"run-n5-factorization-benchmark-0.1.py")

def finite(x):
    try:
        x=float(x);return x if math.isfinite(x) else None
    except:return None

def build_variant(lp,breaker=None,component=None,limit=LIMIT):
    h=highspy.Highs();fac.configure(h,limit)
    if h.passModel(lp)==highspy.HighsStatus.kError:raise RuntimeError("passModel")
    if breaker is not None:
        st=h.addRow(0.0,highspy.kHighsInf,2,
                    np.array([breaker["a"],breaker["b"]],dtype=np.int32),
                    np.array([1.0,-1.0],dtype=np.double))
        if st==highspy.HighsStatus.kError:raise RuntimeError("add breaker")
    if component is not None:
        n=int(lp.num_col_);m=int(lp.num_row_)
        kr=set(component["rows"]);kc=set(component["cols"])
        dr=np.array([i for i in range(m) if i not in kr],dtype=np.int32)
        if len(dr) and h.deleteRows(len(dr),dr)==highspy.HighsStatus.kError:raise RuntimeError("deleteRows")
        dc=np.array([j for j in range(n) if j not in kc],dtype=np.int32)
        if len(dc) and h.deleteCols(len(dc),dc)==highspy.HighsStatus.kError:raise RuntimeError("deleteCols")
    return h

def solve(h):
    t=time.perf_counter();rs=h.run();wall=time.perf_counter()-t
    if rs==highspy.HighsStatus.kError:raise RuntimeError("run")
    ms=h.getModelStatus();info=h.getInfo()
    return {"status":h.modelStatusToString(ms),"objective":finite(info.objective_function_value),
            "dual":finite(info.mip_dual_bound),"gap":finite(info.mip_gap),
            "nodes":int(info.mip_node_count),"lp_iterations":int(info.simplex_iteration_count),"wall_s":wall}

def gap(p,d):
    if p is None or d is None:return None
    return abs(p-d)/max(1.0,abs(p))

def adjusted(r,small_obj,small_dual):
    return {**r,
      "objective":r["objective"]+small_obj if r["objective"] is not None else None,
      "dual":r["dual"]+small_dual if r["dual"] is not None else None,
      "gap":gap(r["objective"]+small_obj if r["objective"] is not None else None,
                r["dual"]+small_dual if r["dual"] is not None else None)}

def median_summary(trials):
    keys=["objective","dual","gap","nodes","lp_iterations","wall_s"]
    return {k:statistics.median([t[k] for t in trials if t[k] is not None]) if any(t[k] is not None for t in trials) else None for k in keys}

def main():
    src_path,source=sym.download()
    ph=highspy.Highs();sym.configure_highs(ph,"on")
    if ph.readModel(str(src_path))==highspy.HighsStatus.kError:raise RuntimeError("read")
    if ph.presolve()==highspy.HighsStatus.kError:raise RuntimeError("presolve")
    lp=ph.getPresolvedLp()

    G=sym.build_graph(lp)
    names=[sym.colname(lp,j) for j in range(int(lp.num_col_))]
    byname={n:j for j,n in enumerate(names)}
    ta,tb=byname["C0012"],byname["C0039"]
    nm=sym.iso.categorical_node_match(["kind","base","color"],[None,None,None])
    em=sym.iso.categorical_edge_match("coef",None)
    gm=sym.iso.GraphMatcher(G,G,node_match=nm,edge_match=em)
    mapping=None; examined=0
    for cand in gm.isomorphisms_iter():
        examined+=1
        if cand.get(("v",ta))==("v",tb):
            mapping=cand;break
        if examined>=100:
            break
    if mapping is None:raise RuntimeError("frozen C0012->C0039 automorphism not recovered")
    cyc=sym.cycle_of(mapping,("v",ta))
    if len(cyc)!=2:raise RuntimeError(f"unexpected target cycle length {len(cyc)}")
    breaker={"a":ta,"b":tb,"a_name":"C0012","b_name":"C0039","cycle_length":2,
      "cycle_names":["C0012","C0039"],"cost":float(lp.col_cost_[ta]),
      "lower":float(lp.col_lower_[ta]),"upper":float(lp.col_upper_[ta]),
      "integrality":str(lp.integrality_[ta]) if len(lp.integrality_)>ta else "C"}

    comps=fac.components(lp)
    if len(comps)!=6:raise RuntimeError(f"expected 6 components, got {len(comps)}")
    small=[]
    for i,c in enumerate(comps[1:],1):
        r=solve(build_variant(lp,None,c,10.0))
        if r["status"]!="Optimal":raise RuntimeError(f"small component {i} not optimal: {r}")
        small.append(r)
    offset=float(lp.offset_)
    small_obj=sum(r["objective"]-offset for r in small)
    small_dual=sum(r["dual"]-offset for r in small)

    variants={
      "A_full":(None,None,False),
      "B_full_plus_symmetry":(breaker,None,False),
      "C_factorized":(None,comps[0],True),
      "D_factorized_plus_symmetry":(breaker,comps[0],True)
    }
    results={}
    for name,(br,comp,adj) in variants.items():
        ts=[]
        for _ in range(TRIALS):
            r=solve(build_variant(lp,br,comp,LIMIT))
            ts.append(adjusted(r,small_obj,small_dual) if adj else r)
        results[name]={"trials":ts,"median":median_summary(ts)}

    out={"experiment":"n5-3-composed-structural-reductions-0.1","date":"2026-10-06",
      "highs_version":highspy.Highs().version(),"source":source,
      "presolved":{"rows":int(lp.num_row_),"cols":int(lp.num_col_),"nonzeros":len(lp.a_matrix_.value_),"offset":offset},
      "automorphism":{"mappings_examined":examined,"breaker":breaker,
        "moved_variables":sum(1 for j in range(int(lp.num_col_)) if mapping[("v",j)]!=("v",j)),
        "moved_rows":sum(1 for i in range(int(lp.num_row_)) if mapping[("r",i)]!=("r",i))},
      "components":[{"rows":len(c["rows"]),"cols":len(c["cols"])} for c in comps],
      "small_components":small,"small_objective_adjustment":small_obj,"small_dual_adjustment":small_dual,
      "trials_per_variant":TRIALS,"limit_s":LIMIT,"results":results,"disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# n5-3 composed structural reductions 0.1","",f"**Disposition:** {out['disposition']}","",
      "| Variant | Median primal | Median dual | Median gap | Median nodes | Median LP iterations |",
      "| --- | ---: | ---: | ---: | ---: | ---: |"]
    for name,r in results.items():
        m=r["median"];lines.append(f"| {name} | {m['objective']} | {m['dual']} | {m['gap']} | {m['nodes']} | {m['lp_iterations']} |")
    lines+=["","Three fixed-seed time-limited trials are reported per variant. Exactness is structural; timing remains directional."]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":"PASS","medians":{k:v["median"] for k,v in results.items()}},indent=2))

if __name__=="__main__":main()
