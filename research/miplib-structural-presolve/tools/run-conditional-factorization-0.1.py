#!/usr/bin/env python3
import gzip, hashlib, json, urllib.request, sys
sys.setrecursionlimit(200000)
from pathlib import Path
import highspy

OUT=Path("out/miplib-conditional-factor-0.1")
OUT.mkdir(parents=True,exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"
INSTANCES=[
 "mad","glass4","supportcase26","bppc4-08",
 "50v-10","reblock115","ran14x18-disj-8","gen-ip002","gen-ip054",
 "ic97_potential","pk1","n5-3","neos859080","neos-911970",
 "seymour1","p200x1188c","b1c1s1","markshare2","mas74",
 "exp-1-500-5-5","markshare_4_0","qap10","cost266-UUE","mas76"
]

def configure(h):
    h.setOptionValue("output_flag",False)
    h.setOptionValue("threads",1)
    h.setOptionValue("parallel","off")
    h.setOptionValue("random_seed",0)
    h.setOptionValue("presolve","on")

def download(name):
    u=f"{BASE}/{name}.mps.gz"
    data=urllib.request.urlopen(u,timeout=90).read();raw=gzip.decompress(data)
    p=OUT/f"{name}.mps";p.write_bytes(raw)
    return p,{"source_url":u,"gzip_sha256":hashlib.sha256(data).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def binary(lp,j):
    return len(lp.integrality_)>j and lp.integrality_[j]==highspy.HighsVarType.kInteger and float(lp.col_lower_[j])==0.0 and float(lp.col_upper_[j])==1.0

def namecol(lp,j):
    return str(lp.col_names_[j]) if len(lp.col_names_)>j and lp.col_names_[j] else f"col#{j}"

def adjacency(lp):
    n=int(lp.num_col_);m=int(lp.num_row_);N=n+m
    adj=[[] for _ in range(N)]
    st=list(lp.a_matrix_.start_);ind=list(lp.a_matrix_.index_)
    if lp.a_matrix_.format_==highspy.MatrixFormat.kColwise:
        for j in range(n):
            for p in range(st[j],st[j+1]):
                i=int(ind[p]);u=j;v=n+i;adj[u].append(v);adj[v].append(u)
    else:
        for i in range(m):
            for p in range(st[i],st[i+1]):
                j=int(ind[p]);u=j;v=n+i;adj[u].append(v);adj[v].append(u)
    return adj,n,m

def component_nodes(adj):
    seen=[False]*len(adj);comps=[]
    for s in range(len(adj)):
        if seen[s]:continue
        stack=[s];seen[s]=True;c=[]
        while stack:
            u=stack.pop();c.append(u)
            for v in adj[u]:
                if not seen[v]:seen[v]=True;stack.append(v)
        comps.append(c)
    return comps

def articulation_parts(adj,n,lp):
    comps=component_nodes(adj)
    comp_id={}
    for ci,c in enumerate(comps):
        for u in c:comp_id[u]=ci
    disc=[-1]*len(adj);low=[0]*len(adj);parent=[-1]*len(adj);sub=[0]*len(adj)
    timer=0;candidates=[]
    def dfs(u,root,comp_size):
        nonlocal timer
        disc[u]=low[u]=timer;timer+=1;sub[u]=1
        separating=[]
        child_count=0
        for v in adj[u]:
            if disc[v]<0:
                parent[v]=u;child_count+=1;dfs(v,root,comp_size);sub[u]+=sub[v];low[u]=min(low[u],low[v])
                if low[v]>=disc[u]:separating.append(sub[v])
            elif v!=parent[u]:
                low[u]=min(low[u],disc[v])
        if u<n and binary(lp,u):
            if u==root:
                parts=separating[:] if child_count>1 else []
            else:
                parts=separating[:]
                rem=comp_size-1-sum(separating)
                if rem>0:parts.append(rem)
                if len(parts)<2:parts=[]
            if len(parts)>=2:
                ps=sorted(parts,reverse=True);outside=sum(ps[1:])
                candidates.append({"col":u,"name":namecol(lp,u),"component_size":comp_size,
                  "parts":ps,"part_count":len(ps),"largest_part":ps[0],"second_part":ps[1],
                  "outside_largest":outside,"outside_fraction":outside/(comp_size-1)})
    for c in comps:
        root=c[0]
        if disc[root]<0:dfs(root,root,len(c))
    candidates.sort(key=lambda x:(-x["outside_largest"],-x["second_part"],x["name"]))
    return comps,candidates

def inspect(name):
    p,src=download(name);h=highspy.Highs();configure(h)
    if h.readModel(str(p))==highspy.HighsStatus.kError:raise RuntimeError("read")
    raw={"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}
    if h.presolve()==highspy.HighsStatus.kError:raise RuntimeError("presolve")
    lp=h.getPresolvedLp()
    dims={"rows":int(lp.num_row_),"cols":int(lp.num_col_),"nonzeros":len(lp.a_matrix_.value_)}
    if dims["rows"]==0 or dims["cols"]==0:
        return {"name":name,"source":src,"raw":raw,"presolved":dims,"base_components":0,"binary_articulations":[],"count":0,"signal":"NO_SIGNAL"}
    adj,n,m=adjacency(lp);comps,cands=articulation_parts(adj,n,lp)
    return {"name":name,"source":src,"raw":raw,"presolved":dims,"base_components":len(comps),
      "binary_articulations":cands[:50],"count":len(cands),
      "signal":"CONDITIONAL_FACTORIZATION" if cands else "NO_SIGNAL"}

def main():
    results=[];errors=[]
    for n in INSTANCES:
        try:
            r=inspect(n);results.append(r)
            top=r["binary_articulations"][0] if r["binary_articulations"] else None
            print(n,r["signal"],"count",r["count"],"top",top["outside_largest"] if top else None,flush=True)
        except Exception as e:
            errors.append({"name":n,"error":repr(e)});print(n,"ERROR",repr(e),flush=True)
    positives=[r for r in results if r["count"]]
    positives.sort(key=lambda r:-r["binary_articulations"][0]["outside_largest"])
    out={"experiment":"miplib-conditional-factorization-0.1","date":"2026-10-06",
      "highs_version":highspy.Highs().version(),"instances":INSTANCES,
      "results":results,"errors":errors,
      "summary":{"completed":len(results),"positive_instances":len(positives),
        "total_binary_articulations":sum(r["count"] for r in results),
        "ranked_positive_instances":[{"name":r["name"],"count":r["count"],"top":r["binary_articulations"][0]} for r in positives]},
      "disposition":"PASS" if len(results)==len(INSTANCES) and not errors else "PARTIAL"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# MIPLIB conditional-factorization screen 0.1","",f"**Disposition:** {out['disposition']}",
      f"**Positive instances:** {len(positives)}/{len(results)}","",
      "| Instance | Post-HiGHS | Base components | Binary articulation vars | Best separated nodes | Signal |",
      "| --- | ---: | ---: | ---: | ---: | --- |"]
    for r in results:
        best=r["binary_articulations"][0]["outside_largest"] if r["binary_articulations"] else 0
        lines.append(f"| {r['name']} | {r['presolved']['rows']}x{r['presolved']['cols']} | {r['base_components']} | {r['count']} | {best} | {r['signal']} |")
    if errors:lines+=["","## Errors",""]+[f"- {e['name']}: {e['error']}" for e in errors]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"summary":out["summary"],"errors":errors},indent=2))
    if out["disposition"]!="PASS":raise SystemExit(1)

if __name__=="__main__":main()
