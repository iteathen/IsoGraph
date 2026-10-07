#!/usr/bin/env python3
import gzip, hashlib, importlib.util, json, statistics, time, urllib.request
from pathlib import Path
import highspy, igraph as ig
from pyscipopt import Model

HERE=Path(__file__).resolve().parent
NEOS_PATH=HERE/"run-neos338-original-breaker-0.1.py"
spec=importlib.util.spec_from_file_location("neos",NEOS_PATH)
neos=importlib.util.module_from_spec(spec);spec.loader.exec_module(neos)
base=neos.base

OUT=Path("out/miplib-neos338-replay-opt-0.2");OUT.mkdir(parents=True,exist_ok=True)
URL=neos.URL
REPS=5

def prepare():
    d=urllib.request.urlopen(URL,timeout=120).read();raw=gzip.decompress(d)
    src=OUT/"neos338.mps";src.write_bytes(raw)
    m=Model();m.hideOutput(True);neos.set_common(m,0);m.setIntParam("misc/usesymmetry",0);m.readProblem(str(src));m.presolve()
    active_names={str(v.name) for v in m.getVars(transformed=True)}
    resid=OUT/"neos338-stage1.mps";m.writeProblem(str(resid),trans=True,genericnames=False,verbose=False)
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(resid))==highspy.HighsStatus.kError:raise RuntimeError("HiGHS residual read failed")
    lp=h.getLp();rows,cols=base.matrix_views(lp);names,colors,edges,meta=base.build_bulk(lp,rows,cols,active_names)
    g=ig.Graph(n=len(colors),edges=edges,directed=False)
    gens=g.automorphism_group(sh="fl",color=colors)
    return {
      "src_sha256":hashlib.sha256(raw).hexdigest(),"g":g,"colors":colors,"edges":edges,
      "names":names,"gens":gens,"meta":meta
    }

def replay_fast(p,vcount,colors,es,identity):
    if len(p)!=vcount or sorted(p)!=identity:raise RuntimeError("bad generator")
    for i,q in enumerate(p):
        if colors[i]!=colors[q]:raise RuntimeError("color mismatch")
    for u,v in es:
        if (p[u],p[v]) if p[u] <= p[v] else (p[v],p[u]) not in es:
            pass

def replay_fast(p,vcount,colors,es,identity):
    if len(p)!=vcount or sorted(p)!=identity:raise RuntimeError("bad generator")
    for i,q in enumerate(p):
        if colors[i]!=colors[q]:raise RuntimeError("color mismatch")
    for u,v in es:
        a,b=p[u],p[v]
        if a>b:a,b=b,a
        if (a,b) not in es:raise RuntimeError("edge mismatch")

def select_fast(gens,names,g,colors):
    n=len(names);candidates=[];active=0
    es={tuple(sorted(e.tuple)) for e in g.es}
    ident=list(range(g.vcount()))
    for gi,p in enumerate(gens):
        replay_fast(p,g.vcount(),colors,es,ident)
        moved=[j for j in range(n) if p[j]!=j]
        if not moved:continue
        if any(p[j]>=n for j in moved):raise RuntimeError("variable partition violation")
        active+=1
        ordered=sorted((names[j],j) for j in moved)
        an,a=ordered[0];b=p[a];bn=names[b]
        candidates.append((an,bn,gi,a,b,len(moved)))
    if not candidates:raise RuntimeError("no active-moving exact generator")
    candidates.sort()
    an,bn,gi,a,b,count=candidates[0]
    return {"a_name":an,"b_name":bn,"a_index":a,"b_index":b,"generator_index":gi,
            "active_moved_variables":count,"active_generator_count":active}

def stats(xs):return {"median_s":statistics.median(xs),"min_s":min(xs),"max_s":max(xs)}

def main():
    d=prepare();g=d["g"];colors=d["colors"];names=d["names"];gens=d["gens"]
    old0=neos.select_single(gens,names,g,colors);fast0=select_fast(gens,names,g,colors)
    if old0!=fast0:raise RuntimeError(f"warm-up selection mismatch {old0} != {fast0}")
    old=[];fast=[]
    for i in range(REPS):
        if i%2==0:
            t=time.perf_counter();a=neos.select_single(gens,names,g,colors);old.append(time.perf_counter()-t)
            t=time.perf_counter();b=select_fast(gens,names,g,colors);fast.append(time.perf_counter()-t)
        else:
            t=time.perf_counter();b=select_fast(gens,names,g,colors);fast.append(time.perf_counter()-t)
            t=time.perf_counter();a=neos.select_single(gens,names,g,colors);old.append(time.perf_counter()-t)
        if a!=old0 or b!=old0:raise RuntimeError(f"selection mismatch rep {i}")
    os=stats(old);fs=stats(fast);speed=os["median_s"]/fs["median_s"]
    result={"experiment":"neos338-replay-opt-0.2","date":"2026-10-06",
      "source_mps_sha256":d["src_sha256"],"graph_meta":d["meta"],
      "generator_count":len(gens),"selection":old0,"repetitions":REPS,
      "old":os,"optimized":fs,"median_speed_ratio":speed,"identity":True,"disposition":"PASS"}
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    (OUT/"SUMMARY.md").write_text(
      "# neos-3381206 exact replay optimization 0.2\n\n"
      f"**Generators:** {len(gens)}\n"
      f"**Selected breaker:** {old0['a_name']} >= {old0['b_name']}\n"
      f"**Identity:** exact selection preserved\n\n"
      "| Replay | Median s | Min s | Max s |\n| --- | ---: | ---: | ---: |\n"
      f"| current | {os['median_s']:.6f} | {os['min_s']:.6f} | {os['max_s']:.6f} |\n"
      f"| cached-edge-set | {fs['median_s']:.6f} | {fs['min_s']:.6f} | {fs['max_s']:.6f} |\n\n"
      f"**Median speed ratio:** {speed:.3f}x\n"
    )
    print(json.dumps(result,indent=2))

if __name__=="__main__":main()
