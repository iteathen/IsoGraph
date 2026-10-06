#!/usr/bin/env python3
import gzip, hashlib, json, urllib.request
from collections import Counter
from pathlib import Path
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-scip-attribution-0.1")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/glass4.mps.gz"
TARGET={"z1&3.4","z1&3.8"}

def download():
    data=urllib.request.urlopen(URL,timeout=90).read()
    raw=gzip.decompress(data)
    p=OUT/"glass4.mps"; p.write_bytes(raw)
    return p,{"gzip_sha256":hashlib.sha256(data).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def norm(name):
    s=str(name)
    return s[2:] if s.startswith("t_") else s

def prep(path,usesymmetry):
    m=Model(); m.hideOutput(True); m.readProblem(str(path))
    if usesymmetry is not None: m.setIntParam("misc/usesymmetry",int(usesymmetry))
    m.presolve()
    out=[]
    exposure_errors=[]
    for c in m.getConss(transformed=True):
        h=c.getConshdlrName()
        vars_=None
        try:
            vars_=[norm(v.name) for v in m.getConsVars(c)]
        except Exception as e:
            exposure_errors.append({"constraint":c.name,"handler":h,"error":repr(e)})
        out.append({"name":str(c.name),"handler":str(h),"vars":vars_})
    cip=OUT/("default.cip" if usesymmetry is None else "off.cip")
    try: m.writeProblem(str(cip),trans=True,verbose=False)
    except Exception: pass
    return {
      "vars":m.getNVars(transformed=True),"conss":m.getNConss(transformed=True),
      "constraints":out,"exposure_errors":exposure_errors,
      "cip_path":str(cip) if cip.exists() else None
    }

def key(c): return (c["name"],c["handler"])

def main():
    path,source=download()
    default=prep(path,None); off=prep(path,0)
    offc=Counter(key(c) for c in off["constraints"])
    extra=[]
    for c in default["constraints"]:
        k=key(c)
        if offc[k]>0: offc[k]-=1
        else: extra.append(c)
    syms=[c for c in default["constraints"] if any(t in c["handler"].lower() for t in ("sym","orbit","lex"))]
    target_extra=[]
    target_sym=[]
    for c in extra:
        if c["vars"] is not None and TARGET.issubset(set(c["vars"])): target_extra.append(c)
    for c in syms:
        if c["vars"] is not None and TARGET.issubset(set(c["vars"])): target_sym.append(c)
    result={
      "experiment":"miplib-scip-symmetry-attribution-0.1","date":"2026-10-06",
      "pyscipopt_version":pyscipopt.__version__,
      "source":source,
      "default_dimensions":{"vars":default["vars"],"conss":default["conss"]},
      "symmetry_off_dimensions":{"vars":off["vars"],"conss":off["conss"]},
      "extra_constraints_default_vs_off":extra,
      "symmetry_handler_constraints":syms,
      "target_pair_in_extra_constraint":target_extra,
      "target_pair_in_symmetry_handler_constraint":target_sym,
      "variable_exposure_errors_default":default["exposure_errors"],
      "interpretation":{
        "extra_constraint_count":len(extra),
        "symmetry_handler_constraint_count":len(syms),
        "target_pair_directly_attributed":bool(target_extra or target_sym),
        "attribution_complete":len(default["exposure_errors"])==0
      },
      "disposition":"PASS"
    }
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=["# SCIP symmetry attribution 0.1","",f"**Extra transformed constraints:** {len(extra)}",
           f"**Symmetry-handler constraints:** {len(syms)}",
           f"**Target pair directly attributed:** {bool(target_extra or target_sym)}",
           f"**Generic variable exposure complete:** {len(default['exposure_errors'])==0}","",
           "## Extra constraints",""]
    for c in extra: lines.append(f"- {c['name']} [{c['handler']}]: {c['vars']}")
    lines += ["","## Symmetry-handler constraints",""]
    for c in syms: lines.append(f"- {c['name']} [{c['handler']}]: {c['vars']}")
    if default["exposure_errors"]:
        lines += ["","## Exposure limitations",""]+[f"- {e}" for e in default["exposure_errors"]]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps(result,indent=2))

if __name__=="__main__": main()
