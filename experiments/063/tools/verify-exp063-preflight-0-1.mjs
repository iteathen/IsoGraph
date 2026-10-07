import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const errors=[], fail=m=>errors.push(m);

const SSC=json('experiments/063/MODULE_SSC_0_1.json');
const IA=json('experiments/063/MODULE_IA_FIXED_POINT_0_1.json');
const CASES=json('experiments/063/QUALIFICATION_CASES_0_1.json');
const H=json('experiments/062/W_G5_HYPOTHESIS_VARIATIONAL_STATIONARITY_0_1.json');
const W=json('experiments/062/W_EXTRACTION_RECONCILED_0_18.json');

function gitBlobSha(content){
  const b=Buffer.from(content,'utf8');
  const header=Buffer.from('blob '+b.length+'\0','utf8');
  return crypto.createHash('sha1').update(Buffer.concat([header,b])).digest('hex');
}
for(const rec of [
  SSC.candidate.md,SSC.candidate.native,
  SSC.native_support.field_vector_md,SSC.native_support.field_vector_native,
  SSC.native_support.primitive_logic,SSC.native_support.primitive_data
]){
  const got=gitBlobSha(read(rec.path));
  if(got!==rec.git_blob_sha) fail('pinned blob mismatch '+rec.path+' '+got+' != '+rec.git_blob_sha);
}
if(SSC.assertions?.length!==8) fail('SSC assertion count');
if(SSC.explicit_nonclaims?.length!==4) fail('SSC nonclaim count');
if(IA.fixed_point?.complete!==true||IA.fixed_point?.open_module_local_ia!==0) fail('IA fixed point incomplete');
if(CASES.cases?.length!==10) fail('qualification case count');
if(H.authority!==false) fail('discovery hypothesis unexpectedly authoritative');

const C=[0,1], X=['x0'], Y=['y0'], DX=[0,1], DY=[0,1];
const product=(a,b)=>a.flatMap(x=>b.map(y=>[x,y]));
const product3=(a,b,c)=>a.flatMap(x=>b.flatMap(y=>c.map(z=>[x,y,z])));

function key(xs){return JSON.stringify(xs);}
function totalSingleValued(rel,inputTuples,outCarrier){
  const by=new Map();
  for(const row of rel){
    const inp=row.slice(0,-1), out=row[row.length-1], k=key(inp);
    if(!outCarrier.includes(out)) return false;
    if(!by.has(k)) by.set(k,[]);
    by.get(k).push(out);
  }
  for(const inp of inputTuples){
    const vals=by.get(key(inp))||[];
    if(vals.length!==1) return false;
  }
  for(const k of by.keys()) if(!inputTuples.some(inp=>key(inp)===k)) return false;
  return true;
}
function makeBase(){
  return {
    ACT:[['x0','y0',0]],
    VARX:[['x0','y0',0,0],['x0','y0',1,0]],
    VARY:[['x0','y0',0,0],['x0','y0',1,0]]
  };
}
function validateModel(m){
  return totalSingleValued(m.ACT,product(X,Y),C)
    && totalSingleValued(m.VARX,product3(X,Y,DX),C)
    && totalSingleValued(m.VARY,product3(X,Y,DY),C);
}
function lookup(rel,inp){
  const rows=rel.filter(r=>key(r.slice(0,-1))===key(inp));
  return rows.length===1?rows[0][rows[0].length-1]:undefined;
}
function stats(m){
  return {
    STATX: product(X,Y).every(([x,y])=>DX.every(dx=>lookup(m.VARX,[x,y,dx])===0)),
    STATY: product(X,Y).every(([x,y])=>DY.every(dy=>lookup(m.VARY,[x,y,dy])===0))
  };
}

const results=[];
function record(id,ok,detail){results.push({id,pass:!!ok,detail}); if(!ok) fail(id+': '+detail);}

let m=makeBase();
record('Q01',validateModel(m)&&stats(m).STATX&&stats(m).STATY,'all-zero variation model');

m=makeBase(); m.VARX=m.VARX.map(r=>(r[2]===1?[...r.slice(0,3),1]:r));
record('Q02',validateModel(m)&&!stats(m).STATX&&stats(m).STATY,'nonzero X variation breaks only STATX');

m=makeBase(); m.VARY=m.VARY.map(r=>(r[2]===1?[...r.slice(0,3),1]:r));
record('Q03',validateModel(m)&&stats(m).STATX&&!stats(m).STATY,'nonzero Y variation breaks only STATY');

m=makeBase(); m.ACT=[];
record('Q04',!validateModel(m),'missing ACT tuple rejected');

m=makeBase(); m.VARX.push(['x0','y0',0,1]);
record('Q05',!validateModel(m),'duplicate VARX output rejected');

m=makeBase(); m.VARX=m.VARX.map((r,i)=>i===0?[...r.slice(0,3),2]:r);
record('Q06',!validateModel(m),'out-of-carrier variation value rejected');

const m1=makeBase();
const m2=makeBase(); m2.VARX=m2.VARX.map(r=>(r[2]===1?[...r.slice(0,3),1]:r));
record('Q07',validateModel(m1)&&validateModel(m2)&&JSON.stringify(m1.ACT)===JSON.stringify(m2.ACT)&&stats(m1).STATX!==stats(m2).STATX,
  'same ACT admits distinct lawful first-variation relations; ACT does not determine VARX');

const occ=new Map(), census=new Map();
for(const item of W.items||[]) for(const o of item.occurrences||[]){occ.set(o.occurrence_id,o);census.set(o.occurrence_id,item.census_id);}
function variationPredicate(id){
  const o=occ.get(id); if(!o) return false;
  if(String(o.relation_span).toLowerCase()!=='gives') return false;
  if(!Array.isArray(o.argument_spans)||o.argument_spans.length!==2||!/\b(?:variation|varying)\b/i.test(o.argument_spans[0])) return false;
  if(!Array.isArray(o.depends_on)||o.depends_on.length!==1) return false;
  const p=occ.get(o.depends_on[0]); return !!p && census.get(p.occurrence_id)===census.get(id) && /\baction\b/i.test(p.source_span||'');
}
const pc=H.positive_controls||[];
for(const [qid,cid] of [['Q08','W-SSC-029'],['Q09','W-SSC-149']]){
  const c=pc.find(x=>x.census_id===cid);
  const ok=!!c && c.occurrence_ids.length===2 && c.occurrence_ids.every(variationPredicate);
  record(qid,ok,cid+' reconstructs ACTION / VARIED_ARGUMENT / STATIONARITY_RESULT incidence');
}
const neg=(H.adversarial_negative_controls||[]).map(x=>x.occurrence_id);
record('Q10',neg.length===5&&neg.every(id=>occ.has(id)&&!variationPredicate(id)),
  'all non-variation give/gives/giving controls excluded');

const pass=errors.length===0;
console.log(JSON.stringify({
  schema:'isograph.exp063-deterministic-preflight.v0.1',
  pass,errors,case_results:results,
  ia_fixed_point:IA.fixed_point,
  disposition:pass?'DETERMINISTIC_PREFLIGHT_PASS_COLD_SEMANTIC_QUALIFICATION_REQUIRED':'DETERMINISTIC_PREFLIGHT_FAIL',
  promotion_status:'INCOMPLETE_EVIDENCE',
  cold_semantic_required:true,
  independent_promotion_verifier_required:true,
  W_may_consume_candidate:false
},null,2));
if(!pass) process.exitCode=1;
