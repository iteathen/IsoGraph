#!/usr/bin/env python3
import gzip, hashlib, json, urllib.request
from pathlib import Path

import highspy
import pyscipopt
from pyscipopt import Model

OUT=Path("out/miplib-n5-post-scip-factorization-0.1")
OUT.mkdir(parents=True,exist_ok=True)
URL="https://miplib.zib.de/WebData/instances/n5-3.mps.gz"

def download():
    data=urllib.request.urlopen(URL,timeout=90).read()
    raw=gzip.decompress(data)
    p=OUT/"n5-3.mps";p.write_bytes(raw)
    return p,{
      "source_url":URL,
      "gzip_sha256":hashlib.sha256(data).hexdigest(),
      "mps_sha256":hashlib.sha256(raw).hexdigest()
    }

def scip_transform(src):
    m=Model();m.hideOutput(True);m.readProblem(str(src))
    try:m.setIntParam("parallel/maxnthreads",1)
    except Exception:pass
    try:m.setIntParam("randomization/randomseedshift",0)
    except Exception:pass
    m.setIntParam("misc/usesymmetry",0)
    m.presolve()
    snap={
      "vars":int(m.getNVars(transformed=True)),
      "conss":int(m.getNConss(transformed=True)),
      "presolve_time_s":float(m.getPresolvingTime())
    }
    p=OUT/"n5-3-scip-transformed.mps"
    m.writeProblem(str(p),trans=True,genericnames=False,verbose=False)
    return p,snap

def matrix_views(lp):
    n=int(lp.num_col_);m=int(lp.num_row_)
    rows=[{} for _ in range(m)];cols=[{} for _ in range(n)]
    st=list(lp.a_matrix_.start_);ind=list(lp.a_matrix_.index_);val=list(lp.a_matrix_.value_)
    if lp.a_matrix_.format_==highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(st[j],st[j+1]):
                i=int(ind[p]);v=float(val[p]);rows[i][j]=v;cols[j][i]=v
    elif lp.a_matrix_.format_==highspy.MatrixFormat.kRowwise:
        for i in range(m):
            for p in range(st[i],st[i+1]):
                j=int(ind[p]);v=float(val[p]);rows[i][j]=v;cols[j][i]=v
    else:raise RuntimeError(f"unsupported matrix format {lp.a_matrix_.format_}")
    return rows,cols

def components(lp):
    rows,cols=matrix_views(lp)
    nr=len(rows);nc=len(cols)
    seen_r=set();seen_c=set();out=[]
    # cover row-started components
    for r0 in range(nr):
        if r0 in seen_r:continue
        qr=[r0];qc=[];seen_r.add(r0);ri=ci=0
        comp_r=[];comp_c=[]
        while ri<len(qr) or ci<len(qc):
            while ri<len(qr):
                r=qr[ri];ri+=1;comp_r.append(r)
                for c in rows[r]:
                    if c not in seen_c:
                        seen_c.add(c);qc.append(c)
            while ci<len(qc):
                c=qc[ci];ci+=1;comp_c.append(c)
                for r in cols[c]:
                    if r not in seen_r:
                        seen_r.add(r);qr.append(r)
        out.append((comp_r,comp_c))
    # isolated columns, if any
    for c in range(nc):
        if c not in seen_c:
            out.append(([],[c]));seen_c.add(c)
    data=[]
    for rs,cs in out:
        nz=sum(len(rows[r]) for r in rs)
        data.append({
          "rows":len(rs),"cols":len(cs),"nonzeros":nz,
          "row_names":[str(lp.row_names_[r]) if len(lp.row_names_)>r else f"row#{r}" for r in rs[:10]],
          "col_names":[str(lp.col_names_[c]) if len(lp.col_names_)>c else f"col#{c}" for c in cs[:10]]
        })
    data.sort(key=lambda x:(-(x["rows"]+x["cols"]),-x["nonzeros"]))
    return data

def main():
    src,source=download()
    transformed,scip=scip_transform(src)
    h=highspy.Highs();h.setOptionValue("output_flag",False)
    if h.readModel(str(transformed))==highspy.HighsStatus.kError:
        raise RuntimeError("cannot read transformed MPS")
    lp=h.getLp()
    comps=components(lp)
    nontrivial=[c for c in comps if c["rows"]>0 and c["cols"]>0]
    status="EXACT_POST_SCIP_FACTORIZATION" if len(nontrivial)>=2 else "NO_POST_SCIP_FACTORIZATION"
    result={
      "experiment":"n5-3-post-scip-factorization-holdout-0.1",
      "date":"2026-10-06",
      "source":source,
      "pyscipopt_version":pyscipopt.__version__,
      "scip_transformed":scip,
      "linearized_transformed":{"rows":int(lp.num_row_),"cols":int(lp.num_col_),"nonzeros":len(lp.a_matrix_.value_)},
      "component_count":len(comps),
      "nontrivial_component_count":len(nontrivial),
      "components":comps,
      "status":status,
      "disposition":"PASS"
    }
    (OUT/"RESULT.json").write_text(json.dumps(result,indent=2)+"\n")
    lines=[
      "# n5-3 post-SCIP factorization holdout 0.1","",
      f"**Status:** {status}",
      f"**SCIP transformed:** {int(lp.num_row_)} rows x {int(lp.num_col_)} cols",
      f"**Nontrivial components:** {len(nontrivial)}","",
      "| Component | Rows | Cols | Nonzeros |",
      "| ---: | ---: | ---: | ---: |"
    ]
    for i,c in enumerate(comps,1):
        lines.append(f"| {i} | {c['rows']} | {c['cols']} | {c['nonzeros']} |")
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"status":status,"nontrivial_component_count":len(nontrivial),"components":comps[:12]},indent=2))

if __name__=="__main__":main()
