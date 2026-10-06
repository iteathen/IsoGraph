#!/usr/bin/env python3
import gzip, hashlib, json, math, time, urllib.request
from collections import Counter
from pathlib import Path
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-scip-higher-control-0.1")
OUT.mkdir(parents=True,exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"
INSTANCES=["n5-3","neos-911970"]
LIMIT=10.0

def download(name):
    u=f"{BASE}/{name}.mps.gz"
    data=urllib.request.urlopen(u,timeout=90).read();raw=gzip.decompress(data)
    p=OUT/f"{name}.mps";p.write_bytes(raw)
    return p,{"source_url":u,"gzip_sha256":hashlib.sha256(data).hexdigest(),
              "mps_sha256":hashlib.sha256(raw).hexdigest()}

def base(path,usesymmetry=None):
    m=Model();m.hideOutput(True);m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",0)
    except Exception:pass
    if usesymmetry is not None:m.setIntParam("misc/usesymmetry",int(usesymmetry))
    m.setRealParam("limits/time",LIMIT)
    return m

def finite(x):
    try:
        x=float(x);return x if math.isfinite(x) else None
    except:return None

def presolve_snapshot(path,usesymmetry):
    m=base(path,usesymmetry);m.presolve()
    conss=m.getConss(transformed=True)
    handlers=Counter(c.getConshdlrName() for c in conss)
    names=[str(c.name) for c in conss]
    symmetry_named=[n for n in names if any(t in n.lower() for t in ("orbitope","sym","orbit","lex"))]
    return {"vars":m.getNVars(transformed=True),"conss":m.getNConss(transformed=True),
            "handlers":dict(sorted(handlers.items())),"constraint_names":names,
            "symmetry_named_constraints":symmetry_named,
            "presolve_time_s":m.getPresolvingTime()}

def solve(path,usesymmetry):
    m=base(path,usesymmetry)
    t=time.perf_counter();m.optimize();wall=time.perf_counter()-t
    return {"status":str(m.getStatus()),"primal":finite(m.getPrimalbound()),
            "dual":finite(m.getDualbound()),"gap":finite(m.getGap()),
            "nodes":int(m.getNNodes()),"lp_iterations":int(m.getNLPIterations()),
            "solutions":int(m.getNSols()),"solving_time_s":m.getSolvingTime(),"wall_s":wall}

def inspect(name):
    p,src=download(name)
    d=presolve_snapshot(p,None);o=presolve_snapshot(p,0)
    off=Counter(o["constraint_names"])
    extra=[]
    for n in d["constraint_names"]:
        if off[n]>0:off[n]-=1
        else:extra.append(n)
    d.pop("constraint_names");o.pop("constraint_names")
    return {"name":name,"source":src,
      "presolve_default":d,"presolve_symmetry_off":o,
      "extra_constraint_names_default_vs_off":extra,
      "extra_symmetry_named":[n for n in extra if any(t in n.lower() for t in ("orbitope","sym","orbit","lex"))],
      "solve_default":solve(p,None),"solve_symmetry_off":solve(p,0)}

def main():
    probe=Model();probe.hideOutput(True)
    res=[];errors=[]
    for n in INSTANCES:
        try:
            r=inspect(n);res.append(r)
            print(n,"extra",len(r["extra_constraint_names_default_vs_off"]),
                  "symnamed",len(r["extra_symmetry_named"]),
                  "nodes",r["solve_default"]["nodes"],r["solve_symmetry_off"]["nodes"],flush=True)
        except Exception as e:
            errors.append({"name":n,"error":repr(e)});print(n,"ERROR",repr(e),flush=True)
    out={"experiment":"miplib-scip-higher-order-control-0.1","date":"2026-10-06",
      "pyscipopt_version":pyscipopt.__version__,
      "scip_version":f"{probe.getMajorVersion()}.{probe.getMinorVersion()}.{probe.getTechVersion()}",
      "instances":INSTANCES,"results":res,"errors":errors,
      "disposition":"PASS" if len(res)==len(INSTANCES) and not errors else "FAIL"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# SCIP higher-order symmetry control 0.1","",f"**Disposition:** {out['disposition']}","",
      "| Instance | Default presolved | Symmetry-off presolved | Extra default constraints | Symmetry-named | Default nodes | Off nodes |",
      "| --- | ---: | ---: | ---: | ---: | ---: | ---: |"]
    for r in res:
        lines.append(f"| {r['name']} | {r['presolve_default']['conss']}x{r['presolve_default']['vars']} | {r['presolve_symmetry_off']['conss']}x{r['presolve_symmetry_off']['vars']} | {len(r['extra_constraint_names_default_vs_off'])} | {len(r['extra_symmetry_named'])} | {r['solve_default']['nodes']} | {r['solve_symmetry_off']['nodes']} |")
    if errors:lines+=["","## Errors",""]+[f"- {e['name']}: {e['error']}" for e in errors]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"errors":errors,
      "summary":[{"name":r["name"],"extra":len(r["extra_constraint_names_default_vs_off"]),
                  "symnamed":len(r["extra_symmetry_named"]),
                  "default_gap":r["solve_default"]["gap"],"off_gap":r["solve_symmetry_off"]["gap"],
                  "default_nodes":r["solve_default"]["nodes"],"off_nodes":r["solve_symmetry_off"]["nodes"]} for r in res]},indent=2))
    if out["disposition"]!="PASS":raise SystemExit(1)

if __name__=="__main__":main()
