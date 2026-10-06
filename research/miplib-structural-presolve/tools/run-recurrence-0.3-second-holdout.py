#!/usr/bin/env python3
import gzip, hashlib, json, urllib.request
from collections import Counter
from pathlib import Path
import highspy

OUT=Path("out/miplib-recurrence-0.3");OUT.mkdir(parents=True,exist_ok=True)
BASE="https://miplib.zib.de/WebData/instances"
ROUNDS=6;MAX_PAIR_CHECKS=50000;MAX_CERTS=32;TARGET=20
PRIOR={
"mad","glass4","supportcase26","bppc4-08","50v-10","reblock115","ran14x18-disj-8","gen-ip002","gen-ip054",
"ic97_potential","pk1","n5-3","neos859080","neos-911970","seymour1","p200x1188c","b1c1s1","markshare2",
"mas74","exp-1-500-5-5","markshare_4_0","qap10","cost266-UUE","mas76"
}
ORDER=[
"mc11","mcsched","mik-250-20-75-4","milo-v12-6-r2-40-1","momentum1","mushroom-best","mzzv11","mzzv42z",
"n2seq36q","n3div36","n5-3","neos-1122047","neos-1171448","neos-1171737","neos-1354092","neos-1445765",
"neos-1456979","neos-1582420","neos-2075418-temuka","neos-2657525-crna","neos-2746589-doon","neos-2978193-inde",
"neos-2987310-joes","neos-3004026-krka","neos-3024952-loue","neos-3046615-murg","neos-3083819-nubu",
"neos-3216931-puriri","neos-3381206-awhea","neos-3402294-bobin","neos-3402454-bohle","neos-3555904-turama",
"neos-3627168-kasai","neos-3656078-kumeu","neos-3754480-nidda","neos-3988577-wolgan","neos-4300652-rahue",
"neos-4338804-snowy","neos-4387871-tavua","neos-4413714-turia","neos-4532248-waihi","neos-4647030-tutaki",
"neos-4722843-widden","neos-4738912-atrato","neos-4763324-toguru","neos-4954672-berkel","neos-5049753-cuanza",
"neos-5052403-cygnet","neos-5093327-huahum","neos-5104907-jarama","neos-5107597-kakapo","neos-5114902-kasavu",
"neos-5188808-nattai","neos-5195221-niemur","neos-631710","neos-662469","neos-787933","neos-827175","neos-848589",
"neos-860300","neos-873061","neos-911970","neos-933966","neos-950242","neos-957323","neos-960392","neos17","neos5",
"neos8","neos859080","net12","netdiversion","nexp-150-20-8-5","ns1116954","ns1208400","ns1644855","ns1760995",
"ns1830653","ns1952667","nu25-pr12","nursesched-medium-hint03","nursesched-sprint02","nw04","opm2-z10-s4","p200x1188c",
"peg-solitaire-a3","pg","pg5_34","physiciansched3-3","physiciansched6-2","piperout-08","piperout-27","pk1",
"proteindesign121hz512p9","proteindesign122trx11p8","qap10","radiationm18-12-05","radiationm40-10-02","rail01","rail02",
"rail507","ran14x18-disj-8","rd-rplusc-21","reblock115","rmatr100-p10","rmatr200-p5","rocI-4-11","rocII-5-11",
"rococoB10-011000","rococoC10-001000","roi2alpha3n4","roi5alpha10n8","roll3000","s100","s250r10","satellites2-40",
"satellites2-60-fs","savsched1","sct2","seymour","seymour1","sing326","sing44","snp-02-004-104","sorrell3",
"sp150x300d","sp97ar","sp98ar","splice1k1","square41","square47","supportcase10","supportcase12","supportcase18",
"supportcase19","supportcase22","supportcase26","supportcase33","supportcase40","supportcase42","supportcase6","supportcase7",
"swath1","swath3","tbfp-network","thor50dday","timtab1","tr12-30","traininstance2","traininstance6","trento1","triptim1",
"uccase12","uccase9","uct-subprob","unitcal_7","var-smallemery-m6j6","wachplan"
]

def fv(x):
    x=float(x);inf=highspy.kHighsInf
    if x>=.5*inf:return "+INF"
    if x<=-.5*inf:return "-INF"
    if abs(x)<1e-13:x=0.0
    return format(x,".12g")

def close(a,b,tol=1e-9):
    a=float(a);b=float(b);inf=highspy.kHighsInf
    if abs(a)>=.5*inf or abs(b)>=.5*inf:
        return (a>=.5*inf and b>=.5*inf) or (a<=-.5*inf and b<=-.5*inf)
    return abs(a-b)<=tol*max(1.0,abs(a),abs(b))

def download(name):
    u=f"{BASE}/{name}.mps.gz";d=urllib.request.urlopen(u,timeout=90).read();raw=gzip.decompress(d)
    p=OUT/f"{name}.mps";p.write_bytes(raw)
    return p,{"source_url":u,"gzip_sha256":hashlib.sha256(d).hexdigest(),"mps_sha256":hashlib.sha256(raw).hexdigest()}

def configure(h):
    h.setOptionValue("output_flag",False);h.setOptionValue("threads",1);h.setOptionValue("parallel","off")
    h.setOptionValue("random_seed",0);h.setOptionValue("presolve","on")

def matrix_views(lp):
    n=int(lp.num_col_);m=int(lp.num_row_);rows=[{} for _ in range(m)];cols=[{} for _ in range(n)]
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
    vb=[(fv(lp.col_cost_[j]),fv(lp.col_lower_[j]),fv(lp.col_upper_[j]),str(lp.integrality_[j]) if len(lp.integrality_) else "C") for j in range(n)]
    rb=[(fv(lp.row_lower_[i]),fv(lp.row_upper_[i])) for i in range(m)]
    vc=compress(vb);rc=compress(rb)
    for _ in range(ROUNDS):
        rc=compress([(rb[i],tuple(sorted((fv(a),vc[j]) for j,a in rows[i].items()))) for i in range(m)])
        vc=compress([(vb[j],tuple(sorted((fv(a),rc[i]) for i,a in cols[j].items()))) for j in range(n)])
    g={}
    for j,c in enumerate(vc):g.setdefault(c,[]).append(j)
    out=[x for x in g.values() if len(x)>1];out.sort(key=lambda x:(-len(x),tuple(x)));return out

def row_sig(lp,entries,i,sw=None):
    sw=sw or {};return (fv(lp.row_lower_[i]),fv(lp.row_upper_[i]),tuple(sorted((sw.get(j,j),fv(v)) for j,v in entries.items())))

def exact_swap(lp,rows,cols,a,b):
    if not close(lp.col_cost_[a],lp.col_cost_[b]):return None
    if not close(lp.col_lower_[a],lp.col_lower_[b]) or not close(lp.col_upper_[a],lp.col_upper_[b]):return None
    ta=str(lp.integrality_[a]) if len(lp.integrality_) else "C";tb=str(lp.integrality_[b]) if len(lp.integrality_) else "C"
    if ta!=tb:return None
    touched=sorted(set(cols[a])|set(cols[b]))
    affected=[r for r in touched if not close(cols[a].get(r,0),cols[b].get(r,0))]
    before=Counter(row_sig(lp,rows[r],r) for r in affected);sw={a:b,b:a}
    after=Counter(row_sig(lp,rows[r],r,sw) for r in affected)
    if before!=after:return None
    return {"cols":[a,b],"affected_rows":affected,"identical_columns":len(affected)==0}

def cname(lp,j):return str(lp.col_names_[j]) if len(lp.col_names_)>j else f"col#{j}"
def rname(lp,i):return str(lp.row_names_[i]) if len(lp.row_names_)>i else f"row#{i}"

def inspect(name,p,src):
    h=highspy.Highs();configure(h)
    if h.readModel(str(p))==highspy.HighsStatus.kError:raise RuntimeError("read")
    raw={"rows":h.getNumRow(),"cols":h.getNumCol(),"nonzeros":h.getNumNz()}
    if raw["rows"]>5000 or raw["cols"]>5000:return {"admitted":False,"name":name,"raw":raw}
    if h.presolve()==highspy.HighsStatus.kError:raise RuntimeError("presolve")
    lp=h.getPresolvedLp();dims={"rows":int(lp.num_row_),"cols":int(lp.num_col_),"nonzeros":len(lp.a_matrix_.value_)}
    if dims["rows"]==0 or dims["cols"]==0:return {"admitted":True,"name":name,"source":src,"raw":raw,"presolved":dims,"candidate_classes":0,"exact_swaps":[],"signal":"NO_SIGNAL"}
    rows,cols=matrix_views(lp);classes=refinement(lp,rows,cols);checks=0;certs=[];tr=False
    for g in classes:
        for x in range(len(g)):
            for y in range(x+1,len(g)):
                if checks>=MAX_PAIR_CHECKS or len(certs)>=MAX_CERTS:tr=True;break
                checks+=1;c=exact_swap(lp,rows,cols,g[x],g[y])
                if c:
                    c["col_names"]=[cname(lp,c["cols"][0]),cname(lp,c["cols"][1])]
                    c["affected_row_names"]=[rname(lp,z) for z in c["affected_rows"][:40]]
                    certs.append(c)
            if tr:break
        if tr:break
    return {"admitted":True,"name":name,"source":src,"raw":raw,"presolved":dims,"candidate_classes":len(classes),
      "candidate_members":sum(map(len,classes)),"largest_candidate_sizes":[len(g) for g in classes[:10]],
      "pair_checks":checks,"truncated":tr,"exact_swaps":certs,
      "signal":"EXACT_GENERAL_SWAP" if certs else ("LEAD_ONLY" if classes else "NO_SIGNAL")}

def main():
    results=[];skipped=[];errors=[]
    for name in ORDER:
        if name in PRIOR:continue
        try:
            p,src=download(name);r=inspect(name,p,src)
            if not r["admitted"]:
                skipped.append({"name":name,"raw":r["raw"],"reason":"size_cap"});continue
            results.append(r);print(name,r["signal"],r["raw"],r["presolved"],flush=True)
            if len(results)>=TARGET:break
        except Exception as e:
            errors.append({"name":name,"error":repr(e)});print(name,"ERROR",repr(e),flush=True)
    counts={"EXACT_GENERAL_SWAP":0,"LEAD_ONLY":0,"NO_SIGNAL":0}
    for r in results:counts[r["signal"]]+=1
    out={"experiment":"miplib-recurrence-0.3-second-holdout","date":"2026-10-06","highs_version":highspy.Highs().version(),
      "selection_rule":"next 20 benchmark-v2 instances after mas76 with raw rows<=5000 and cols<=5000, excluding prior 24",
      "results":results,"skipped":skipped,"errors":errors,"counts":counts,
      "disposition":"PASS" if len(results)==TARGET and not errors else "PARTIAL"}
    (OUT/"RESULT.json").write_text(json.dumps(out,indent=2)+"\n")
    lines=["# MIPLIB recurrence 0.3 — second holdout","",f"**Disposition:** {out['disposition']}",f"**Admitted:** {len(results)}/{TARGET}","",
      "| Instance | Raw | Post-HiGHS | Candidate classes | Exact swaps | Signal |",
      "| --- | ---: | ---: | ---: | ---: | --- |"]
    for r in results:lines.append(f"| {r['name']} | {r['raw']['rows']}x{r['raw']['cols']} | {r['presolved']['rows']}x{r['presolved']['cols']} | {r['candidate_classes']} | {len(r['exact_swaps'])} | {r['signal']} |")
    lines += ["","## Counts","",f"~~~json\n{json.dumps(counts,indent=2)}\n~~~"]
    if skipped:lines += ["","## Size-cap skips",""]+[f"- {x['name']}: {x['raw']['rows']}x{x['raw']['cols']}" for x in skipped]
    if errors:lines += ["","## Errors",""]+[f"- {x['name']}: {x['error']}" for x in errors]
    (OUT/"SUMMARY.md").write_text("\n".join(lines)+"\n")
    print(json.dumps({"disposition":out["disposition"],"counts":counts,"errors":errors},indent=2))
    if out["disposition"]!="PASS":raise SystemExit(1)

if __name__=="__main__":main()
