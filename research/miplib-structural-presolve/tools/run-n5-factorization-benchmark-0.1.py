#!/usr/bin/env python3
import gzip, hashlib, json, math, time, urllib.request
from pathlib import Path
import highspy
import numpy as np

OUT=Path("out/miplib-n5-factor-0.1")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
LIMIT=15.0

def configure(h,limit=None):
    h.setOptionValue("output_flag",False)
    h.setOptionValue("threads",1)
    h.setOptionValue("parallel","off")
    h.setOptionValue("random_seed",0)
    h.setOptionValue("presolve","off")
    h.setOptionValue("mip_rel_gap",0.0)
    if limit is not None:h.setOptionValue("time_limit",float(limit))

def download():
    data=urllib.request.urlopen(URL,timeout=90).read();raw=gzip.decompress(data)
    p=OUT/"n5-3.mps";p.write_bytes(raw)
    return p,{"gzip_sha256":hashlib.sha256(data).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def matrix_rows(lp):
    n=int(lp.num_col_);m=int(lp.num_row_)
    rows=[[] for _ in range(m)]
    st=list(lp.a_matrix_.start_);ind=list(lp.a_matrix_.index_)
    if lp.a_matrix_.format_==highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(st[j],st[j+1]): rows[int(ind[p])].append(j)
    else:
        for i in range(m):
            for p in range(st[i],st[i+1]): rows[i].append(int(ind[p]))
    return rows

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

def components(lp):
    n=int(lp.num_col_);m=int(lp.num_row_);rows=matrix_rows(lp);d=DSU(n+m)
    for i,cs in enumerate(rows):
        for j in cs:d.union(j,n+i)
    comps={}
    for j in range(n):comps.setdefault(d.find(j),{"cols":[],"rows":[]})["cols"].append(j)
    for i in range(m):comps.setdefault(d.find(n+i),{"cols":[],"rows":[]})["rows"].append(i)
    vals=list(comps.values())
    vals.sort(key=lambda c:-(len(c["cols"])+len(c["rows"])))
    return vals

def finite(x):
    try:
        x=float(x);return x if math.isfinite(x) else None
    except:return None

def solve_model(h):
    t=time.perf_counter();rs=h.run();wall=time.perf_counter()-t
    if rs==highspy.HighsStatus.kError:raise RuntimeError("run")
    s=h.getModelStatus();info=h.getInfo()
    return {"status":h.modelStatusToString(s),"optimal":s==highspy.HighsModelStatus.kOptimal,
      "objective":finite(info.objective_function_value),"dual_bound":finite(info.mip_dual_bound),
      "gap":finite(info.mip_gap),"nodes":int(info.mip_node_count),"lp_iterations":int(info.simplex_iteration_count),
      "wall_s":wall,"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}

def model_for_component(lp,comp,limit):
    n=int(lp.num_col_);m=int(lp.num_row_)
    h=highspy.Highs();configure(h,limit)
    if h.passModel(lp)==highspy.HighsStatus.kError:raise RuntimeError("passModel")
    keep_rows=set(comp["rows"]); keep_cols=set(comp["cols"])
    dr=np.array([i for i in range(m) if i not in keep_rows],dtype=np.int32)
    if len(dr) and h.deleteRows(len(dr),dr)==highspy.HighsStatus.kError:raise RuntimeError("deleteRows")
    dc=np.array([j for j in range(n) if j not in keep_cols],dtype=np.int32)
    if len(dc) and h.deleteCols(len(dc),dc)==highspy.HighsStatus.kError:raise RuntimeError("deleteCols")
    return h

def full_model(lp,limit):
    h=highspy.Highs();configure(h,limit)
    if h.passModel(lp)==highspy.HighsStatus.kError:raise RuntimeError("passModel")
    return h

def combined_gap(primal,dual):
    if primal is None or dual is None:return None
    return abs(primal-dual)/max(1.0,abs(primal))

def main():
    p,source=download()
    src=highspy.Highs();src.setOptionValue("output_flag",False);src.setOptionValue("presolve","on")
    if src.readModel(str(p))==highspy.HighsStatus.kError:raise RuntimeError("read")
    if src.presolve()==highspy.HighsStatus.kError:raise RuntimeError("presolve")
    lp=src.getPresolvedLp()
    comps=components(lp)
    baseline=solve_model(full_model(lp,LIMIT))
    small=[];all_small_opt=True
    for idx,c in enumerate(comps[1:],start=1):
        s=solve_model(model_for_component(lp,c,10.0))
        all_small_opt=all_small_opt and s["optimal"]
        small.append({"index":idx,"component":{"rows":len(c["rows"]),"cols":len(c["cols"])},"solve":s})
    main=solve_model(model_for_component(lp,comps[0],LIMIT))
    offset=float(lp.offset_)
    small_adjust=sum((x["solve"]["objective"]-offset) for x in small if x["solve"]["objective"] is not None)
    small_bound_adjust=sum((x["solve"]["dual_bound"]-offset) for x in small if x["solve"]["dual_bound"] is not None)
    combined_primal=(main["objective"]+small_adjust) if main["objective"] is not None and all_small_opt else None
    combined_dual=(main["dual_bound"]+small_bound_adjust) if main["dual_bound"] is not None and all_small_opt else None
    result={"experiment":"n5-3-factorization-benchmark-0.1","date":"2026-10-06",
      "highs_version":highspy.Highs().version(),"source":source,
      "presolved":{"rows":int(lp.num_row_),"cols":int(lp.num_col_),"nonzeros":len(lp.a_matrix_.value_),"objective_offset":offset},
      "components":[{"rows":len(c["rows"]),"cols":len(c["cols"])} for c in comps],
      "baseline":baseline,"small_components":small,"all_small_optimal":all_small_opt,
      "main_component":main,
      "combined":{"primal":combined_primal,"dual":combined_dual,"gap":combined_gap(combined_primal,combined_dual),
                  "nodes_main_only":main["nodes"],"lp_iterations_main_only":main["lp_iterations"]},
      "exact_factorization":len(comps)>1,
      "disposition":"PASS" if len(comps)==6 and all_small_opt else "FAIL"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# n5-3 exact factorization benchmark 0.1","",f"**Disposition:** {result['disposition']}",
      f"**Components:** {len(comps)}",f"**Small components all optimal:** {all_small_opt}","",
      "## 15-second comparison","",
      "| Variant | Status | Primal | Dual | Gap | Nodes | LP iterations |",
      "| --- | --- | ---: | ---: | ---: | ---: | ---: |",
      f"| Full residual | {baseline['status']} | {baseline['objective']} | {baseline['dual_bound']} | {baseline['gap']} | {baseline['nodes']} | {baseline['lp_iterations']} |",
      f"| Large component + exact small optima | {main['status']} | {combined_primal} | {combined_dual} | {result['combined']['gap']} | {main['nodes']} | {main['lp_iterations']} |","",
      "The decomposition is exact. Runtime comparison is directional only."]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps(result,indent=2))
    if result["disposition"]!="PASS":raise SystemExit(1)

if __name__=="__main__":main()
