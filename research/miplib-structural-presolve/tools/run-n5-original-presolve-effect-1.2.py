#!/usr/bin/env python3
import importlib.util
import json
import time
from collections import Counter
from pathlib import Path

import highspy
from pyscipopt import Model

HERE=Path(__file__).resolve().parent
BASE_PATH=HERE/"run-n5-original-breaker-injection-0.6.py"
spec=importlib.util.spec_from_file_location("n5_original_base",BASE_PATH)
base=importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

OUT=Path("out/miplib-n5-original-presolve-effect-1.2")
OUT.mkdir(parents=True,exist_ok=True)
base.OUT=OUT
PAIRS=[("C0021","C0026"),("C0027","C0028")]
TARGETS=["C0021","C0026","C0027","C0028"]

def configure(m,variant):
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",0)
    except Exception:pass
    if variant in ("aggressive","aggressive_plus_ig"):
        m.setIntParam("misc/usesymmetry",5)
        m.setIntParam("propagating/symmetry/symtiming",2)
        m.setBoolParam("propagating/symmetry/addstrongsbcs",True)
        m.setBoolParam("propagating/symmetry/usedynamicprop",False)

def inspect(src,variant):
    m=Model();m.hideOutput(True);m.readProblem(str(src));configure(m,variant)
    if variant in ("ig","aggressive_plus_ig"):
        vd={str(v.name):v for v in m.getVars(transformed=False)}
        for k,(a,b) in enumerate(PAIRS):
            if a not in vd or b not in vd:raise RuntimeError(f"missing {a}/{b}")
            m.addCons(vd[a]>=vd[b],name=f"IG_EXACT_ORIGINAL_{k}")
    t=time.perf_counter();m.presolve();wall=time.perf_counter()-t
    conss=m.getConss(transformed=True)
    handlers=Counter(str(c.getConshdlrName()) for c in conss)
    sym=[]
    for c in conss:
        n=str(c.name)
        if any(tk in n.lower() for tk in ("sst","sym","orbit","lex","orbitope")):
            vars_=None
            try:vars_=[str(v.name) for v in m.getConsVars(c)]
            except Exception:pass
            sym.append({"name":n,"handler":str(c.getConshdlrName()),"vars":vars_})
    tvars={str(v.name):v for v in m.getVars(transformed=True)}
    survival={}
    for o in TARGETS:
        tn="t_"+o
        survival[o]=tn in tvars
    p=OUT/f"{variant}.mps"
    m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(p))==highspy.HighsStatus.kError:raise RuntimeError(f"HiGHS read export failed {variant}")
    return {
      "active_vars":int(m.getNVars(transformed=True)),
      "active_conss":int(m.getNConss(transformed=True)),
      "presolve_wall_s":wall,
      "presolve_reported_s":float(m.getPresolvingTime()),
      "handlers":dict(sorted(handlers.items())),
      "symmetry_named_constraints":sym,
      "target_survival":survival,
      "export_linear":{"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()},
      "params":{
        "misc/usesymmetry":m.getParam("misc/usesymmetry"),
        "propagating/symmetry/symtiming":m.getParam("propagating/symmetry/symtiming"),
        "propagating/symmetry/addstrongsbcs":m.getParam("propagating/symmetry/addstrongsbcs"),
        "propagating/symmetry/usedynamicprop":m.getParam("propagating/symmetry/usedynamicprop"),
      }
    }

def main():
    src,source=base.download()
    resid,tpairs,gate,front,gens,active,meta=base.frontend_and_mapping(src)
    if not gate["licensed"]:
        result={"experiment":"n5-original-presolve-effect-1.2","date":"2026-10-06","source":source,
                "mapping_gate":gate,"status":"MAPPING_NOT_LICENSED","disposition":"PASS"}
    else:
        if tpairs!=base.EXPECTED_TRANSFORMED or PAIRS!=base.EXPECTED_ORIGINAL:
            raise RuntimeError("certificate drift")
        variants={v:inspect(src,v) for v in ("default","aggressive","ig","aggressive_plus_ig")}
        result={"experiment":"n5-original-presolve-effect-1.2","date":"2026-10-06","source":source,
                "mapping_gate":gate,"exact":{"generator_count":gens,"active_generator_count":active,
                "transformed_breakers":tpairs,"original_breakers":PAIRS},
                "variants":variants,"status":"AUDITED","disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    if result["status"]=="AUDITED":
        lines=["# n5-3 original presolve-effect audit 1.2","",
          "| Variant | Active vars | Active conss | Export rows | Export cols | Export nz | Sym-named | Presolve wall |",
          "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |"]
        for v,x in result["variants"].items():
            e=x["export_linear"]
            lines.append(f"| {v} | {x['active_vars']} | {x['active_conss']} | {e['rows']} | {e['cols']} | {e['nonzeros']} | {len(x['symmetry_named_constraints'])} | {x['presolve_wall_s']:.6f}s |")
        lines+=["","## Symmetry-named constraints","",f"~~~json\n{json.dumps({v:x['symmetry_named_constraints'] for v,x in result['variants'].items()},indent=2)}\n~~~"]
    else:
        lines=["# n5-3 original presolve-effect audit 1.2","","**Status:** MAPPING_NOT_LICENSED"]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps(result,indent=2))

if __name__=="__main__":main()
