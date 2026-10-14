import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{
  const b=Buffer.from(read(p),'utf8');
  return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};

const W2=json('research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_2.json');
const W3=json('research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_3.json');
const D1=json('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json');
const D2=json('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_2.json');
const A=json('experiments/062/W_G7_SOURCE_GRANULARITY_AUDIT_0_1.json');

check(W3.schema==='woit.source-semantic-census.v0.3','W SSC schema');
check(W3.status==='FROZEN_COMPLETE_TARGETED_SOURCE_GRANULARITY_CORRECTION','W SSC status');
check(W3.predecessor?.git_blob_sha===blobSha('research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_2.json'),'W predecessor pin');
check(W3.correction_basis?.git_blob_sha===blobSha('experiments/062/W_G7_SOURCE_GRANULARITY_AUDIT_0_1.json'),'W correction pin');
check(W3.correction_basis?.source_expansion===false,'W source expansion');
check(W3.items.length===W2.items.length && W3.items.length===151,'W item count');

const changedW=[];
for(let i=0;i<W2.items.length;i++){
  const a=W2.items[i],b=W3.items[i];
  check(a.id===b.id,'W ordering '+i);
  if(JSON.stringify(a)!==JSON.stringify(b))changedW.push(a.id);
}
check(JSON.stringify(changedW)===JSON.stringify(['W-SSC-029','W-SSC-149']),'W changed items '+JSON.stringify(changedW));

const w029=W3.items.find(x=>x.id==='W-SSC-029');
const w149=W3.items.find(x=>x.id==='W-SSC-149');
for(const token of ['fundamental Palatini fields','Omega^CD(omega)','equations of motion','de^A + omega^A_B wedge e^B = 0','determined by e']) check(w029?.obligation.includes(token),'W029 missing '+token);
for(const token of ['integral of Sigma^(dotA dotB) wedge R_(dotA dotB)','with respect to the connection','relation between the tetrad and the connection','with respect to the tetrad']) check(w149?.obligation.includes(token),'W149 missing '+token);
for(const body of [w029?.obligation||'',w149?.obligation||'']) check(!/STATX|STATY|every represented|variation-direction|zero first variation|total single-valued/i.test(body),'211000 semantics imported');

check(D2.schema==='isograph.domain-neutral-primitive-demand-census.v0.2','demand schema');
check(D2.predecessor?.git_blob_sha===blobSha('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json'),'demand predecessor pin');
check(D2.correction_basis?.W_source_semantic_census_successor?.git_blob_sha===blobSha('research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_3.json'),'W SSC successor pin');
check(D2.correction_basis?.L_semantics_changed===false,'L changed flag');
check(D2.correction_basis?.source_expansion===false,'demand source expansion');
check(D2.items.length===D1.items.length && D2.items.length===235,'demand item count');

const changedD=[];
for(let i=0;i<D1.items.length;i++){
  const a=D1.items[i],b=D2.items[i];
  check(a.track===b.track && a.census_id===b.census_id,'demand ordering '+i);
  if(JSON.stringify(a)!==JSON.stringify(b))changedD.push(a.track+':'+a.census_id);
}
check(JSON.stringify(changedD)===JSON.stringify(['W:W-SSC-029','W:W-SSC-149']),'demand changed items '+JSON.stringify(changedD));
const d029=D2.items.find(x=>x.track==='W'&&x.census_id==='W-SSC-029');
const d149=D2.items.find(x=>x.track==='W'&&x.census_id==='W-SSC-149');
check(d029?.body===w029?.obligation,'W029 demand/SSC mismatch');
check(d149?.body===w149?.obligation,'W149 demand/SSC mismatch');

const oldL=D1.items.filter(x=>x.track==='L');
const newL=D2.items.filter(x=>x.track==='L');
check(JSON.stringify(oldL)===JSON.stringify(newL),'L semantics changed');
check(D2.pinned_inputs?.L?.ssc_blob===D1.pinned_inputs?.L?.ssc_blob,'L SSC pin changed');
check(D2.pinned_inputs?.L?.manifest_blob===D1.pinned_inputs?.L?.manifest_blob,'L manifest pin changed');

check(A.source_conservation_ruling?.result==='TARGETED_SSC_CORRECTION_REQUIRED_BEFORE_ANY_LOWER_CANDIDATE_MAY_CONSUME_THE_NEW_DETAIL','audit does not authorize correction');
check(A.primitive_211000_ruling?.result==='UNCHANGED_SOURCE_INSTANCE_INSUFFICIENT_FOR_211000','211000 boundary lost');

console.log(JSON.stringify({
  schema:'isograph.w-source-census-targeted-correction-verifier.v0.1',
  pass:errors.length===0,
  errors,
  changed_W_items:changedW,
  changed_demand_items:changedD,
  L_semantics_unchanged:JSON.stringify(oldL)===JSON.stringify(newL),
  source_expansion:false
},null,2));
if(errors.length)process.exitCode=1;
