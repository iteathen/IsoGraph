import fs from 'node:fs';import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};
const p='experiments/062/L_G7_DEPENDENCY_CONE_REPLAY_0_5.json',R=json(p);
check(R.status==='G7_REPLAY_L130_SCALAR_EXTENSION_CLOSED_NEXT_SIGNATURE_REFLECTION_DEMAND_EXPOSED','status');
check(R.authority===false&&R.track==='L','authority/track');
for(const x of [R.predecessor,R.consumed_authority,R.source_reconstruction]){
  check(fs.existsSync(x.path),'missing '+x.path);
  if(fs.existsSync(x.path))check(blob(x.path)===x.git_blob_sha,'pin '+x.path);
}
const q=json(R.consumed_authority.path);
check(q.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','qualified status');
const routing=json(R.source_reconstruction.path);
check(routing.status==='L130_SCALAR_EXTENSION_CURRENT_RECONSTRUCTION_ROUTED_PARTIAL','routing status');
check(R.source_reconstruction.verification_conclusion==='success','routing verification');
const rs=R.results||[],closed=rs.filter(x=>x.disposition==='CLOSED_WITH_CAMPAIGN_LOCAL_PROVISIONAL_AUTHORITY'),open=rs.filter(x=>x.disposition==='UNEXPANDED_DEMAND');
check(closed.length===19&&open.length===9,'counts');
check(closed.some(x=>x.occurrence_id==='L-SSC-130-R05'),'R05 not closed');
for(const id of ['L-SSC-130-R01','L-SSC-130-R02','L-SSC-130-R03','L-SSC-130-R04','L-SSC-130-R06','L-SSC-130-R07','L-SSC-130-R08','L-SSC-130-R09'])check(open.some(x=>x.occurrence_id===id),'premature L130 closure '+id);
check(open.some(x=>x.occurrence_id==='L-SSC-125-R06'),'L125 R06 overclosed');
check(R.closure_findings?.L130?.disposition==='TARGETED_REOPEN_SCALAR_EXTENSION_LAYER_PARTIALLY_CLOSED','L130 closure finding');
check(R.next_reusable_lower_demand?.family==='SIGNATURE_PHASE_AND_TYPED_GENERALIZED_REFLECTION','next family');
check(!/W-SSC-|\/woit\//i.test(JSON.stringify(R)),'W leak');
console.log(JSON.stringify({schema:'isograph.exp062-l-g7-replay-verifier.v0.5',pass:!errors.length,errors,closed:closed.length,open:open.length,next:R.next_reusable_lower_demand?.family,external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED'},null,2));
if(errors.length)process.exit(1);
