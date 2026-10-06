#!/usr/bin/env python3
import gzip, hashlib, json, urllib.request
from collections import Counter
from pathlib import Path

import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-post-scip-active-attribution-0.2")
OUT.mkdir(parents=True,exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"
INSTANCES=["mcsched","neos-1171737","neos-3381206-awhea","neos-3627168-kasai","neos5","ns1208400"]
TOKENS=("orbitope","sym","orbit","lex")

def download(name):
    url=f"{BASE}/{name}.mps.gz"
    data=urllib.request.urlopen(url,timeout=120).read()
    raw=gzip.decompress(data)
    p=OUT/f"{name}.mps";p.write_bytes(raw)
    return p,{"source_url":url,"gzip_sha256":hashlib.sha256(data).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def base(path,usesymmetry=None):
    m=Model();m.hideOutput(True);m.readProblem(str(path))
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",0)
    except Exception:pass
    if usesymmetry is not None:m.setIntParam("misc/usesymmetry",int(usesymmetry))
    return m

def stage1(name,src):
    m=base(src,0);m.presolve()
    snap={"vars":int(m.getNVars(transformed=True)),"conss":int(m.getNConss(transformed=True)),"presolve_time_s":float(m.getPresolvingTime())}
    p=OUT/f"{name}-stage1-scip-off.mps";m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,snap

def snapshot(path,usesymmetry):
    m=base(path,usesymmetry);m.presolve()
    conss=m.getConss(transformed=True)
    names=[str(c.name) for c in conss]
    handlers=Counter(c.getConshdlrName() for c in conss)
    sym=[n for n in names if any(t in n.lower() for t in TOKENS)]
    return {
      "vars":int(m.getNVars(transformed=True)),"conss":int(m.getNConss(transformed=True)),
      "presolve_time_s":float(m.getPresolvingTime()),
      "handlers":dict(sorted(handlers.items())),
      "constraint_names":names,
      "symmetry_named_constraints":sym
    }

def compare(default,off):
    doff=Counter(off["constraint_names"]);extra=[]
    for n in default["constraint_names"]:
        if doff[n]>0:doff[n]-=1
        else:extra.append(n)
    ddef=Counter(default["constraint_names"]);missing=[]
    for n in off["constraint_names"]:
        if ddef[n]>0:ddef[n]-=1
        else:missing.append(n)
    extra_sym=[n for n in extra if any(t in n.lower() for t in TOKENS)]
    same_dims=(default["vars"],default["conss"])==(off["vars"],off["conss"])
    same_handlers=default["handlers"]==off["handlers"]
    same_names=Counter(default["constraint_names"])==Counter(off["constraint_names"])
    if extra_sym or default["symmetry_named_constraints"]:
        cls="VISIBLE_SCIP_RECOVERY"
    elif same_dims and same_handlers and same_names:
        cls="NO_VISIBLE_SCIP_RECOVERY"
    else:
        cls="AMBIGUOUS_DIFFERENCE"
    return {"classification":cls,"same_dims":same_dims,"same_handlers":same_handlers,"same_constraint_name_multiset":same_names,
      "extra_default_constraints":extra,"missing_default_constraints":missing,"extra_symmetry_named":extra_sym}

def inspect(name):
    src,source=download(name);resid,s1=stage1(name,src)
    d=snapshot(resid,None);o=snapshot(resid,0);cmp=compare(d,o)
    # Drop potentially large full name lists from output after comparison.
    d["constraint_name_count"]=len(d.pop("constraint_names"));o["constraint_name_count"]=len(o.pop("constraint_names"))
    return {"name":name,"source":source,"stage1_symmetry_off":s1,"fresh_default":d,"fresh_symmetry_off":o,"comparison":cmp}

def main():
    results=[];errors=[]
    for name in INSTANCES:
        try:
            r=inspect(name);results.append(r)
            print(name,r["comparison"]["classification"],
                  "stage1",r["stage1_symmetry_off"]["conss"],r["stage1_symmetry_off"]["vars"],
                  "default",r["fresh_default"]["conss"],r["fresh_default"]["vars"],
                  "off",r["fresh_symmetry_off"]["conss"],r["fresh_symmetry_off"]["vars"],
                  "sym",len(r["fresh_default"]["symmetry_named_constraints"]),flush=True)
        except Exception as e:
            errors.append({"name":name,"error":repr(e)});print(name,"ERROR",repr(e),flush=True)
    counts={k:0 for k in ("VISIBLE_SCIP_RECOVERY","NO_VISIBLE_SCIP_RECOVERY","AMBIGUOUS_DIFFERENCE")}
    for r in results:counts[r["comparison"]["classification"]]+=1
    out={"experiment":"post-scip-active-positive-attribution-0.2","date":"2026-10-06",
      "pyscipopt_version":pyscipopt.__version__,"instances":INSTANCES,"results":results,"errors":errors,"counts":counts,
      "disposition":"PASS" if len(results)==len(INSTANCES) and not errors else "PARTIAL"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# Post-SCIP active positive attribution 0.2","",f"**Disposition:** {out['disposition']}","",
      "| Instance | Stage-1 residual | Fresh default | Fresh off | Symmetry-named | Classification |",
      "| --- | ---: | ---: | ---: | ---: | --- |"]
    for r in results:
        s=r["stage1_symmetry_off"];d=r["fresh_default"];o=r["fresh_symmetry_off"];c=r["comparison"]
        lines.append(f"| {r['name']} | {s['conss']}x{s['vars']} | {d['conss']}x{d['vars']} | {o['conss']}x{o['vars']} | {len(d['symmetry_named_constraints'])} | {c['classification']} |")
    lines += ["","## Counts","",f"~~~json\n{json.dumps(counts,indent=2)}\n~~~"]
    if errors:lines+=["","## Errors",""]+[f"- {e['name']}: {e['error']}" for e in errors]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"counts":counts,"errors":errors},indent=2))
    if out["disposition"]!="PASS":raise SystemExit(1)

if __name__=="__main__":
    main()
