import fs from 'node:fs';
import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};
const p='experiments/062/L130_SCALAR_EXTENSION_RECONSTRUCTION_ROUTING_0_1.json',R=json(p);
check(R.status==='L130_SCALAR_EXTENSION_CURRENT_RECONSTRUCTION_ROUTED_PARTIAL','status');
check(R.authority===false&&R.track==='L','authority/track');
for(const x of [R.consumed_authority,R.predecessor_replay,...(R.source_instances||[])]){
  check(fs.existsSync(x.path),'missing '+x.path);
  if(fs.existsSync(x.path))check(blob(x.path)===x.git_blob_sha,'pin '+x.path);
}
const q=json(R.consumed_authority.path);
check(q.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','qualified status');
check(JSON.stringify(R.consumed_authority.relations)===JSON.stringify([193302,193303,193400,222000,222001,222002,225000,231000]),'qualified relation scope');
for(const src of R.source_instances||[]){
  const text=read(src.path);
  for(const id of src.selected_relations||[])check(new RegExp('\\(\\^150010\\s+'+id+'(?:\\s|\\))').test(text),'relation '+id+' absent '+src.path);
}
const byId=Object.fromEntries((R.occurrence_routing||[]).map(x=>[x.occurrence_id,x]));
check(byId['L-SSC-130-R05']?.disposition==='RECONSTRUCTABLE_WITH_CURRENT_SCALAR_EXTENSION_AUTHORITY','R05 routing');
for(const id of ['L-SSC-130-R02','L-SSC-130-R03','L-SSC-130-R04'])check(/STILL_DEPENDS/.test(byId[id]?.disposition||''),'premature formula closure '+id);
for(const id of ['L-SSC-130-R06','L-SSC-130-R07','L-SSC-130-R08','L-SSC-130-R09'])check(/STILL_DEPENDS/.test(byId[id]?.disposition||''),'premature invariant closure '+id);
check(R.next_lower_demand?.family==='SIGNATURE_PHASE_AND_TYPED_GENERALIZED_REFLECTION','next family');
check(!/W-SSC-|\/woit\//i.test(JSON.stringify(R)),'W leak');
console.log(JSON.stringify({
 schema:'isograph.exp062-l130-scalar-extension-routing-verifier.v0.1',
 pass:!errors.length,errors,
 reconstructable:'L-SSC-130-R05',
 next:R.next_lower_demand?.family,
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED'
},null,2));
if(errors.length)process.exit(1);
