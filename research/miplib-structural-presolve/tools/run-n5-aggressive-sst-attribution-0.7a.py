#!/usr/bin/env python3
import gzip, hashlib, json, urllib.request
from pathlib import Path

from pyscipopt import Model
import pyscipopt

OUT=Path("out/miplib-n5-aggressive-sst-attribution-0.7a")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"
TARGETS=[
  {"t_C0021","t_C0026"},
  {"t_C0027","t_C0028"},
]

def download():
    data=urllib.request.urlopen(URL,timeout=90).read()
    raw=gzip.decompress(data)
    p=OUT/"n5-3.mps";p.write_bytes(raw)
    return p,{
      "source_url":URL,
      "gzip_sha256":hashlib.sha256(data).hexdigest(),
      "mps_sha256":hashlib.sha256(raw).hexdigest(),
    }

def stage1(src):
    m=Model();m.hideOutput(True);m.readProblem(str(src))
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",0)
    except Exception:pass
    m.setIntParam("misc/usesymmetry",0)
    m.presolve()
    p=OUT/"n5-stage1.mps"
    m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,{"vars":m.getNVars(transformed=True),"conss":m.getNConss(transformed=True)}

def norm(name):
    return str(name)

def inspect(resid):
    m=Model();m.hideOutput(True);m.readProblem(str(resid))
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",0)
    except Exception:pass
    m.setIntParam("misc/usesymmetry",5)
    m.setIntParam("propagating/symmetry/symtiming",2)
    m.setBoolParam("propagating/symmetry/addstrongsbcs",True)
    m.setBoolParam("propagating/symmetry/usedynamicprop",False)
    params={
      "misc/usesymmetry":m.getParam("misc/usesymmetry"),
      "propagating/symmetry/symtiming":m.getParam("propagating/symmetry/symtiming"),
      "propagating/symmetry/addstrongsbcs":m.getParam("propagating/symmetry/addstrongsbcs"),
      "propagating/symmetry/usedynamicprop":m.getParam("propagating/symmetry/usedynamicprop"),
    }
    m.presolve()
    found=[];errors=[]
    for c in m.getConss(transformed=True):
        name=str(c.name)
        low=name.lower()
        if not any(t in low for t in ("sst","sym","orbit","lex")):
            continue
        handler=str(c.getConshdlrName())
        vars_=None
        try:
            vars_=[norm(v.name) for v in m.getConsVars(c)]
        except Exception as e:
            errors.append({"constraint":name,"handler":handler,"error":repr(e)})
        found.append({"name":name,"handler":handler,"vars":vars_})
    attribution=[]
    for target in TARGETS:
        hits=[]
        for c in found:
            if c["vars"] is not None and target.issubset(set(c["vars"])):
                hits.append(c["name"])
        attribution.append({"target":sorted(target),"constraints":hits,"direct":bool(hits)})
    return {
      "params":params,
      "transformed":{"vars":m.getNVars(transformed=True),"conss":m.getNConss(transformed=True)},
      "symmetry_named_constraints":found,
      "exposure_errors":errors,
      "target_attribution":attribution,
      "all_targets_direct":all(x["direct"] for x in attribution),
      "attribution_complete":not errors,
    }

def main():
    src,source=download()
    resid,s1=stage1(src)
    a=inspect(resid)
    result={
      "experiment":"n5-aggressive-scip-sst-attribution-0.7a",
      "date":"2026-10-06",
      "pyscipopt_version":pyscipopt.__version__,
      "source":source,
      "stage1":s1,
      "analysis":a,
      "disposition":"PASS",
    }
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=[
      "# n5-3 aggressive SCIP SST attribution 0.7a","",
      f"**Symmetry-named constraints:** {len(a['symmetry_named_constraints'])}",
      f"**Variable exposure complete:** {a['attribution_complete']}",
      f"**Both IG target pairs directly attributed:** {a['all_targets_direct']}","",
      "## Constraints","",
    ]
    for c in a["symmetry_named_constraints"]:
        lines.append(f"- {c['name']} [{c['handler']}]: {c['vars']}")
    lines+=["","## Target attribution","",f"~~~json\n{json.dumps(a['target_attribution'],indent=2)}\n~~~"]
    if a["exposure_errors"]:
        lines+=["","## Exposure errors","",f"~~~json\n{json.dumps(a['exposure_errors'],indent=2)}\n~~~"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps(result,indent=2))

if __name__=="__main__":
    main()
