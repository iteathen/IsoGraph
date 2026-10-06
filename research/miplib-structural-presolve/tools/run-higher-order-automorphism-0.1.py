#!/usr/bin/env python3
import gzip, hashlib, json, signal, time, urllib.request
from pathlib import Path
import highspy
import networkx as nx
from networkx.algorithms import isomorphism as iso

OUT=Path("out/miplib-higher-aut-0.1")
OUT.mkdir(parents=True,exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"
INSTANCES=["glass4","seymour1","n5-3","neos-911970"]
POSITIVE={"glass4","seymour1"}
ROUNDS=6
TIMEOUT=60
MAX_MAPPINGS=2000
MAX_WITNESSES=3

class SearchTimeout(Exception): pass
def timeout_handler(signum,frame): raise SearchTimeout()

def closef(x):
    x=float(x); inf=highspy.kHighsInf
    if x>=0.5*inf:return "+INF"
    if x<=-0.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def configure(h):
    h.setOptionValue("output_flag",False)
    h.setOptionValue("threads",1)
    h.setOptionValue("parallel","off")
    h.setOptionValue("random_seed",0)
    h.setOptionValue("presolve","on")

def download(name):
    u=f"{BASE}/{name}.mps.gz"
    data=urllib.request.urlopen(u,timeout=90).read(); raw=gzip.decompress(data)
    p=OUT/f"{name}.mps"; p.write_bytes(raw)
    return p,{"url":u,"gzip_sha256":hashlib.sha256(data).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def matrix_views(lp):
    n=int(lp.num_col_);m=int(lp.num_row_)
    rows=[{} for _ in range(m)];cols=[{} for _ in range(n)]
    st=list(lp.a_matrix_.start_);ind=list(lp.a_matrix_.index_);val=list(lp.a_matrix_.value_)
    if lp.a_matrix_.format_==highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(st[j],st[j+1]):
                i=int(ind[p]);v=float(val[p]);rows[i][j]=v;cols[j][i]=v
    else:
        for i in range(m):
            for p in range(st[i],st[i+1]):
                j=int(ind[p]);v=float(val[p]);rows[i][j]=v;cols[j][i]=v
    return rows,cols

def compress(xs):
    d={};out=[]
    for x in xs:
        if x not in d:d[x]=len(d)
        out.append(d[x])
    return out

def refinement(lp,rows,cols):
    n=int(lp.num_col_);m=int(lp.num_row_)
    vb=[(closef(lp.col_cost_[j]),closef(lp.col_lower_[j]),closef(lp.col_upper_[j]),
         str(lp.integrality_[j]) if len(lp.integrality_)>j else "C") for j in range(n)]
    rb=[(closef(lp.row_lower_[i]),closef(lp.row_upper_[i])) for i in range(m)]
    vc=compress(vb);rc=compress(rb)
    for _ in range(ROUNDS):
        rs=[(rb[i],tuple(sorted((closef(a),vc[j]) for j,a in rows[i].items()))) for i in range(m)]
        rc=compress(rs)
        vs=[(vb[j],tuple(sorted((closef(a),rc[i]) for i,a in cols[j].items()))) for j in range(n)]
        vc=compress(vs)
    return vb,rb,vc,rc

def names(lp):
    vn=[str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}" for j in range(int(lp.num_col_))]
    rn=[str(lp.row_names_[i]) if len(lp.row_names_)>i and lp.row_names_[i] else f"row#{i}" for i in range(int(lp.num_row_))]
    return vn,rn

def build_graph(lp,rows,cols):
    vb,rb,vc,rc=refinement(lp,rows,cols)
    vn,rn=names(lp)
    G=nx.Graph()
    for j in range(int(lp.num_col_)):
        G.add_node(("v",j),kind="v",base=json.dumps(vb[j],separators=(",",":")),color=int(vc[j]))
    for i in range(int(lp.num_row_)):
        G.add_node(("r",i),kind="r",base=json.dumps(rb[i],separators=(",",":")),color=int(rc[i]))
        for j,a in rows[i].items():
            G.add_edge(("r",i),("v",j),coef=closef(a))
    return G,vn,rn,vc,rc

def find_auts(G,vn,rn):
    nm=iso.categorical_node_match(["kind","base","color"],[None,None,None])
    em=iso.categorical_edge_match("coef",None)
    gm=iso.GraphMatcher(G,G,node_match=nm,edge_match=em)
    witnesses=[];seen=0;timed_out=False;capped=False
    signal.signal(signal.SIGALRM,timeout_handler);signal.alarm(TIMEOUT)
    t=time.perf_counter()
    try:
        for mapping in gm.isomorphisms_iter():
            seen+=1
            moved=[k for k,v in mapping.items() if k!=v]
            if moved:
                mv=[];mr=[]
                for k in moved:
                    v=mapping[k]
                    if k[0]=="v":mv.append([vn[k[1]],vn[v[1]]])
                    else:mr.append([rn[k[1]],rn[v[1]]])
                witnesses.append({"moved_variable_pairs":mv[:100],"moved_row_pairs":mr[:100],
                                  "moved_variables":len(mv),"moved_rows":len(mr)})
                if len(witnesses)>=MAX_WITNESSES:break
            if seen>=MAX_MAPPINGS:
                capped=True;break
    except SearchTimeout:
        timed_out=True
    finally:
        signal.alarm(0)
    return {"witnesses":witnesses,"mappings_examined":seen,"timed_out":timed_out,"capped":capped,
            "wall_s":time.perf_counter()-t}

def inspect(name):
    p,src=download(name)
    h=highspy.Highs();configure(h)
    if h.readModel(str(p))==highspy.HighsStatus.kError:raise RuntimeError("read")
    raw={"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}
    if h.presolve()==highspy.HighsStatus.kError:raise RuntimeError("presolve")
    lp=h.getPresolvedLp();dims={"rows":int(lp.num_row_),"cols":int(lp.num_col_),"nonzeros":len(lp.a_matrix_.value_)}
    rows,cols=matrix_views(lp);G,vn,rn,vc,rc=build_graph(lp,rows,cols)
    r=find_auts(G,vn,rn)
    if r["witnesses"]:status="EXACT_HIGHER_ORDER_AUTOMORPHISM"
    elif r["timed_out"] or r["capped"]:status="INCONCLUSIVE"
    else:status="NO_AUTOMORPHISM_FOUND"
    return {"name":name,"source":src,"raw":raw,"presolved":dims,"graph":{"nodes":G.number_of_nodes(),"edges":G.number_of_edges()},
            "search":r,"status":status}

def main():
    results=[];errors=[]
    for n in INSTANCES:
        try:
            r=inspect(n);results.append(r);print(n,r["status"],r["search"]["mappings_examined"],flush=True)
        except Exception as e:
            errors.append({"name":n,"error":repr(e)});print(n,"ERROR",repr(e),flush=True)
    by={r["name"]:r for r in results}
    controls_ok=all(n in by and by[n]["search"]["witnesses"] for n in POSITIVE)
    out={"experiment":"miplib-higher-order-automorphism-0.1","date":"2026-10-06",
         "highs_version":highspy.Highs().version(),"networkx_version":nx.__version__,
         "instances":INSTANCES,"positive_controls":sorted(POSITIVE),"positive_controls_pass":controls_ok,
         "results":results,"errors":errors,
         "disposition":"PASS" if len(results)==len(INSTANCES) and not errors and controls_ok else "FAIL"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# Higher-order automorphism pass 0.1","",f"**Disposition:** {out['disposition']}",
           f"**Positive controls:** {'PASS' if controls_ok else 'FAIL'}","",
           "| Instance | Post-HiGHS | Graph | Mappings examined | Witnesses | Status |",
           "| --- | ---: | ---: | ---: | ---: | --- |"]
    for r in results:
        lines.append(f"| {r['name']} | {r['presolved']['rows']}x{r['presolved']['cols']} | {r['graph']['nodes']}n/{r['graph']['edges']}e | {r['search']['mappings_examined']} | {len(r['search']['witnesses'])} | {r['status']} |")
    if errors:lines+=["","## Errors",""]+[f"- {e['name']}: {e['error']}" for e in errors]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"controls":controls_ok,
                      "statuses":{r["name"]:r["status"] for r in results},"errors":errors},indent=2))
    if out["disposition"]!="PASS":raise SystemExit(1)

if __name__=="__main__":main()
