#!/usr/bin/env python3
import gzip, hashlib, json, math, time, urllib.request
from pathlib import Path
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-scip-control-0.1")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/glass4.mps.gz"
A="z1&3.4"; B="z1&3.8"; RA="id60"; RB="id70"
LIMIT=15.0

def download():
    data=urllib.request.urlopen(URL,timeout=90).read()
    raw=gzip.decompress(data)
    p=OUT/"glass4.mps"; p.write_bytes(raw)
    return p,{"gzip_sha256":hashlib.sha256(data).hexdigest(),
              "mps_sha256":hashlib.sha256(raw).hexdigest(),
              "gzip_bytes":len(data),"mps_bytes":len(raw)}

def base_model(path,usesymmetry=None,breaker=False):
    m=Model()
    m.hideOutput(True)
    m.readProblem(str(path))
    try: m.setIntParam("parallel/maxnthreads",1)
    except Exception: pass
    try: m.setIntParam("randomization/randomseedshift",0)
    except Exception: pass
    if usesymmetry is not None:
        m.setIntParam("misc/usesymmetry",int(usesymmetry))
    m.setRealParam("limits/time",LIMIT)
    if breaker:
        vd={v.name:v for v in m.getVars(transformed=False)}
        if A not in vd or B not in vd:
            raise RuntimeError("breaker variables not present in original SCIP model")
        m.addCons(vd[A] >= vd[B], name="IG_EXACT_SWAP_BREAKER")
    return m

def version(m):
    return f"{m.getMajorVersion()}.{m.getMinorVersion()}.{m.getTechVersion()}"

def presolve_snapshot(path,usesymmetry):
    m=base_model(path,usesymmetry=usesymmetry,breaker=False)
    raw={"vars":m.getNVars(transformed=False),"conss":m.getNConss(transformed=False)}
    t=time.perf_counter(); m.presolve(); wall=time.perf_counter()-t
    tv=m.getVars(transformed=True); tc=m.getConss(transformed=True)
    vnames={v.name for v in tv}; cnames={c.name for c in tc}
    def has_name(names,x):
        return x in names or f"t_{x}" in names
    return {
      "raw":raw,
      "transformed":{"vars":m.getNVars(transformed=True),"conss":m.getNConss(transformed=True)},
      "presolve_wall_s":wall,
      "presolve_scip_s":m.getPresolvingTime(),
      "target_survival":{
        A:has_name(vnames,A),B:has_name(vnames,B),RA:has_name(cnames,RA),RB:has_name(cnames,RB)
      }
    }

def finite(x):
    try:
        x=float(x)
        return x if math.isfinite(x) else None
    except Exception: return None

def solve_variant(path,label,usesymmetry,breaker):
    m=base_model(path,usesymmetry=usesymmetry,breaker=breaker)
    t=time.perf_counter(); m.optimize(); wall=time.perf_counter()-t
    return {
      "label":label,"usesymmetry":usesymmetry,"breaker":breaker,
      "status":str(m.getStatus()),
      "primal_bound":finite(m.getPrimalbound()),
      "dual_bound":finite(m.getDualbound()),
      "gap":finite(m.getGap()),
      "nodes":int(m.getNNodes()),
      "lp_iterations":int(m.getNLPIterations()),
      "solving_time_s":m.getSolvingTime(),
      "wall_s":wall,
      "solutions":int(m.getNSols())
    }

def main():
    path,src=download()
    probe=Model(); probe.hideOutput(True)
    result={
      "experiment":"miplib-stronger-control-scip-0.1","date":"2026-10-06",
      "pyscipopt_version":pyscipopt.__version__,
      "scip_version":version(probe),
      "source":src,
      "presolve":{
        "symmetry_default":presolve_snapshot(path,None),
        "symmetry_off":presolve_snapshot(path,0)
      },
      "solves":[
        solve_variant(path,"SCIP default symmetry",None,False),
        solve_variant(path,"SCIP symmetry off",0,False),
        solve_variant(path,"SCIP symmetry off + IG breaker",0,True)
      ]
    }
    off=result["solves"][1]; br=result["solves"][2]
    mismatch=False
    if off["status"]=="optimal" and br["status"]=="optimal":
        mismatch=abs(off["primal_bound"]-br["primal_bound"])>1e-6*max(1.0,abs(off["primal_bound"]))
    result["optimal_objective_mismatch_off_vs_breaker"]=mismatch
    result["disposition"]="PASS" if not mismatch else "FAIL"
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# SCIP stronger-incumbent control 0.1","",
      f"**Disposition:** {result['disposition']}",
      f"**PySCIPOpt:** {result['pyscipopt_version']}",
      f"**SCIP:** {result['scip_version']}","",
      "## Presolve target survival","",
      f"- default symmetry: {result['presolve']['symmetry_default']['target_survival']}",
      f"- symmetry off: {result['presolve']['symmetry_off']['target_survival']}","",
      "## 15-second solve comparison","",
      "| Variant | Status | Primal | Dual | Gap | Nodes | LP iterations |",
      "| --- | --- | ---: | ---: | ---: | ---: | ---: |"]
    for s in result["solves"]:
        lines.append(f"| {s['label']} | {s['status']} | {s['primal_bound']} | {s['dual_bound']} | {s['gap']} | {s['nodes']} | {s['lp_iterations']} |")
    lines += ["","The IG breaker was admitted only from the separate exact automorphism certificate. This control measures interaction with SCIP's incumbent symmetry machinery; it does not establish novelty."]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps(result,indent=2))
    if result["disposition"]!="PASS": raise SystemExit(1)

if __name__=="__main__": main()
