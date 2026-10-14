import fs from 'node:fs';import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};
const R=json('experiments/062/L127_CURRENT_RECONSTRUCTION_ROUTING_0_2.json');
check(R.status==='L127_CURRENT_RECONSTRUCTION_ROUTED_AFTER_SI_REPAIR','status');
check(R.authority===false&&R.track==='L','authority/track');
for(const x of [R.defect,R.predecessor_g3,...R.consumed_authority,...R.source_instances,...R.source_falsifiers]){
 check(fs.existsSync(x.path),'missing '+x.path);if(fs.existsSync(x.path)&&x.git_blob_sha)check(blob(x.path)===x.git_blob_sha,'pin '+x.path);
}
for(const qref of R.consumed_authority){
 const q=json(qref.path);
 if(qref.status)check(q.status===qref.status,'authority status '+qref.path);
 if(qref.path.includes('L127_G6_'))check(q.global_qualified_authority===false,'global promotion leak '+qref.path);
}
const bip=R.source_instances.find(x=>x.path.endsWith('LISI_L05_OCTONION_BIPRODUCT_OPERATOR_SOURCE_INSTANCE_0_2.isg'));
const so=R.source_instances.find(x=>x.path.endsWith('LISI_L05_OCTONION_SO8_SOURCE_ASSERTION_0_2.isg'));
check(!!bip&&!!so,'corrected sources missing');
const B=read(bip.path),SO=read(so.path);
check(B.includes('(^150010 225010'),'dimension7 call 225010 missing');
check(B.includes('(^150010 225001'),'dimension28 call 225001 missing');
check(!B.includes('(^150010 225000'),'dimension7 still using 225000');
check(!/\(\^15001[34]\s+226\d{3}/.test(B),'old 226 declarations in corrected biproduct');
check(!/\(\^15001[34]\s+226\d{3}/.test(SO),'old 226 declarations in corrected SO8');
check(SO.includes('(^150010 227000'),'227000 source instance missing');
check(SO.includes('246006'),'corrected bracket relation missing');

const opF=json(R.source_falsifiers.find(x=>x.path.endsWith('L127_BIPRODUCT_OPERATOR_FALSIFIER_0_1.json')).path);
const soF=json(R.source_falsifiers.find(x=>x.path.endsWith('L127_SO8_SOURCE_FALSIFIER_0_1.json')).path);
check(opF.pass===true&&opF.source_repair_used===false,'operator falsifier');
check(opF.associativity_failures===162,'associativity signature');
check(opF.imaginary_right_span_rank===7,'rank7');
check(opF.biproduct_count===28&&opF.biproduct_span_rank===28,'rank28');
check(soF.pass===true&&soF.source_repair_used===false,'SO falsifier');
check(soF.metric_skew_failures===14,'metric-skew signature');
check(soF.commutators_outside_span===336,'commutator signature');

const routes=Object.fromEntries((R.occurrence_routing||[]).map(x=>[x.occurrence_id,x]));
for(let i=1;i<=7;i++)check(!!routes['L-SSC-127-R0'+i],'missing route R0'+i);
const routeText=JSON.stringify(R.occurrence_routing);
check(!routeText.includes('226000')&&!/2260(05|06|17|120|130)/.test(routeText),'old local SI route leaked');
check(!routeText.includes('exact 225000'),'old dimension7 route leaked');
check(routes['L-SSC-127-R02']?.route?.some(x=>/246130/.test(x)),'R02 corrected witness');
check(routes['L-SSC-127-R05']?.route?.some(x=>/246017/.test(x)),'R05 corrected outside-image witness');
check(routes['L-SSC-127-R06']?.route?.some(x=>/246006/.test(x)),'R06 corrected bracket');
check(R.identity_repair?.old_dimension7_si===225000&&R.identity_repair?.new_dimension7_si===225010,'dimension SI repair record');
check(R.identity_repair?.old_local_range==='226000-226199'&&R.identity_repair?.new_local_range==='246000-246199','local range repair record');
check(R.source_inconsistency_policy?.source_repair_used===false,'source repair');
check(!/W-SSC-|\/woit\//i.test(JSON.stringify(R)),'W leak');

const repair=json('experiments/062/L127_SI_NAMESPACE_COLLISION_DEFECT_0_2.json');
check(repair.confirmed_defects?.length===2,'defect record count');
const g3=json(R.predecessor_g3.path);
check(g3.status==='L127_TARGETED_G3_FIXED_POINT_REPLAYED_AFTER_SI_REPAIR','corrected G3 status');

console.log(JSON.stringify({
 schema:'isograph.exp062-l127-current-reconstruction-routing-verifier.v0.2',
 pass:errors.length===0,errors,
 routed_occurrences:Object.keys(routes).length,
 identity_repair:R.identity_repair,
 falsifier_signature:{associativity_failures:opF.associativity_failures,rank7:opF.imaginary_right_span_rank,rank28:opF.biproduct_span_rank,metric_skew_failures:soF.metric_skew_failures,commutators_outside_span:soF.commutators_outside_span},
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED'
},null,2));
if(errors.length)process.exit(1);