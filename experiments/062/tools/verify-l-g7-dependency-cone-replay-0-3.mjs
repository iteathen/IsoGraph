import fs from 'node:fs';
import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{const b=Buffer.from(read(p),'utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};

const path='experiments/062/L_G7_DEPENDENCY_CONE_REPLAY_0_3.json';
const R=json(path);
check(R.schema==='isograph.exp062-l-g7-dependency-cone-replay.v0.3','schema');
check(R.status==='G7_REPLAY_L125_ALGEBRA_LAYER_CLOSED_NEXT_TRILINEAR_RECOVERY_DEMAND_EXPOSED','status');
check(R.authority===false&&R.track==='L','authority/track');
check(R.governing_method?.endsWith('PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_3.md'),'method');
for(const rec of [
 R.predecessor,
 ...(R.consumed_authority||[]),
 R.source_reconstruction?.complex_split_complex,
 R.source_reconstruction?.quaternion,
 R.source_reconstruction?.quaternion_antiinvolution_successor,
 R.source_reconstruction?.split_and_octonion,
 R.source_reconstruction?.ordinary_O_discrepancy
]){
 if(!rec?.path)continue;
 check(fs.existsSync(rec.path),'missing pin '+rec.path);
 if(fs.existsSync(rec.path))check(blobSha(rec.path)===rec.git_blob_sha,'pin mismatch '+rec.path);
}
for(const a of R.consumed_authority||[]){
 const j=json(a.path);
 check(j.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','unqualified consumption '+a.path);
 check(j.global_qualified_authority===false,'global status leak '+a.path);
}
const comp=json(R.consumed_authority[0].path);
for(const id of [184003,185001,185002,185003,188000,215001])check(comp.qualified_scope?.relations?.some(x=>x.id===id),'composition relation out of scope '+id);

check(R.source_reconstruction?.quaternion_antiinvolution_successor?.verification_conclusion==='success','H reconstruction verification');
check(R.source_reconstruction?.quaternion_antiinvolution_successor?.verification_workflow_run_id===37683356832,'H verification run');
const discrep=json(R.source_reconstruction.ordinary_O_discrepancy.path);
check(discrep.status==='SOURCE_INTERNAL_DISCREPANCY','O discrepancy status');
check(discrep.representation_policy?.inconsistency_not_repaired_for_track_L===true,'O source repaired');

const results=R.results||[];
check(results.length===28,'result count');
const closed=results.filter(x=>x.disposition==='CLOSED_WITH_CAMPAIGN_LOCAL_PROVISIONAL_AUTHORITY');
const open=results.filter(x=>x.disposition==='UNEXPANDED_DEMAND');
check(closed.length===13,'closed count');
check(open.length===15,'open count');
check(R.counts?.CLOSED_WITH_CAMPAIGN_LOCAL_PROVISIONAL_AUTHORITY===13,'recorded closed count');
check(R.counts?.UNEXPANDED_DEMAND===15,'recorded open count');
for(const id of ['L-SSC-125-R02','L-SSC-125-R03','L-SSC-125-R04','L-SSC-125-R05','L-SSC-125-R07']){
 check(closed.some(x=>x.occurrence_id===id),'missing new L125 closure '+id);
}
check(open.some(x=>x.occurrence_id==='L-SSC-125-R06'),'L125 R06 overclosed');
for(const id of ['L-SSC-129-R01','L-SSC-129-R02','L-SSC-129-R03','L-SSC-129-R04','L-SSC-129-R05']){
 check(open.some(x=>x.occurrence_id===id),'L129 prematurely closed '+id);
}
for(const id of ['L-SSC-130-R01','L-SSC-130-R02','L-SSC-130-R03','L-SSC-130-R04','L-SSC-130-R05','L-SSC-130-R06','L-SSC-130-R07','L-SSC-130-R08','L-SSC-130-R09']){
 check(open.some(x=>x.occurrence_id===id),'L130 prematurely closed '+id);
}
check(R.next_reusable_lower_demand?.family==='TRILINEAR_PRODUCT_RECOVERY','next family');
check(JSON.stringify(R.next_reusable_lower_demand?.immediate_historical_relation_candidates)===JSON.stringify([185005,185006,220000]),'candidate IDs');
const text=JSON.stringify(R);
check(!/W-SSC-|\/woit\//i.test(text),'W leakage');
check(!/"cross_track_comparison_authorized":true/.test(text),'cross-track overclaim');

console.log(JSON.stringify({
 schema:'isograph.exp062-l-g7-dependency-cone-replay-verifier.v0.3',
 pass:errors.length===0,
 errors,
 closed:closed.length,
 unresolved:open.length,
 L125_open:['L-SSC-125-R06'],
 next_family:R.next_reusable_lower_demand?.family,
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED'
},null,2));
if(errors.length)process.exit(1);
