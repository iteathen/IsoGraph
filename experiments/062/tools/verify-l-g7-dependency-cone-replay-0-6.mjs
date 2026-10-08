import fs from 'node:fs';import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};
const p='experiments/062/L_G7_DEPENDENCY_CONE_REPLAY_0_6.json',R=json(p);
check(R.status==='G7_REPLAY_L130_CLOSED_ONLY_L125_CLASSIFICATION_RESIDUAL_REMAINS','status');
check(R.authority===false&&R.track==='L','authority/track');
for(const x of [R.predecessor,R.source_reconstruction]){
 check(fs.existsSync(x.path),'missing '+x.path);
 if(fs.existsSync(x.path))check(blob(x.path)===x.git_blob_sha,'pin '+x.path);
}
check(R.source_reconstruction.verification_conclusion==='success','reconstruction not verified');
check(R.source_reconstruction.controls?.complex_scalar===true,'complex scalar control');
check(R.source_reconstruction.controls?.spacelike===true,'spacelike control');
check(R.source_reconstruction.controls?.timelike_current===true,'timelike control');
check(R.source_reconstruction.controls?.complex_domain===true,'complex-domain control');
const expected=R.source_reconstruction.ordinary_O_expected_failures||{};
check(expected.involution===720&&expected.antiinvariance===118&&expected.even_composition===4484,'ordinary-O signature changed');
const coverage=R.source_reconstruction.split_complex_coverage||{};
check(coverage.odd_basis_cases===6552&&coverage.even_basis_cases===76104,'coverage changed');

const rs=R.results||[];
const closed=rs.filter(x=>x.disposition==='CLOSED_WITH_CAMPAIGN_LOCAL_PROVISIONAL_AUTHORITY');
const open=rs.filter(x=>x.disposition==='UNEXPANDED_DEMAND');
check(closed.length===27&&open.length===1,'counts');
for(const id of ['L-SSC-130-R01','L-SSC-130-R02','L-SSC-130-R03','L-SSC-130-R04','L-SSC-130-R05','L-SSC-130-R06','L-SSC-130-R07','L-SSC-130-R08','L-SSC-130-R09','L-SSC-130-R10'])check(closed.some(x=>x.occurrence_id===id),'L130 open '+id);
check(open.length===1&&open[0].occurrence_id==='L-SSC-125-R06','unexpected remaining residual');
check(R.closure_findings?.L130?.disposition==='TARGETED_REOPEN_CLOSED','L130 closure finding');
check(R.next_reusable_lower_demand?.family==='ORDERED_SCALAR_POSITIVITY_AND_NEGATIVE_NORM_WITNESS','next family');
check(R.next_reusable_lower_demand?.division_relation_216003_required_for_this_occurrence===false,'unneeded division route');
check(!/W-SSC-|\/woit\//i.test(JSON.stringify(R)),'W leak');
console.log(JSON.stringify({
 schema:'isograph.exp062-l-g7-replay-verifier.v0.6',
 pass:!errors.length,errors,
 closed:closed.length,open:open.length,
 remaining:open[0]?.occurrence_id,
 next:R.next_reusable_lower_demand?.family,
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED'
},null,2));
if(errors.length)process.exit(1);
