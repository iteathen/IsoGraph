import fs from 'node:fs';import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};
const R=json('experiments/062/L127_G7_TARGETED_CLOSURE_0_1.json');
check(R.status==='L127_TARGETED_REOPEN_CLOSED','status');check(R.authority===false&&R.track==='L','authority/track');
for(const x of [R.predecessor_g3,R.source_reconstruction]){check(fs.existsSync(x.path),'missing '+x.path);if(fs.existsSync(x.path))check(blob(x.path)===x.git_blob_sha,'pin '+x.path);}
check(R.source_reconstruction.verification_conclusion==='success','routing not verified');
const closed=(R.results||[]).filter(x=>x.disposition==='CLOSED_WITH_CAMPAIGN_LOCAL_PROVISIONAL_AUTHORITY');
check(closed.length===7,'closed count');
for(let i=1;i<=7;i++)check(closed.some(x=>x.occurrence_id==='L-SSC-127-R0'+i),'missing R0'+i);
check(R.source_inconsistency_policy?.expected?.associativity_failures===162,'assoc signature');
check(R.source_inconsistency_policy?.expected?.metric_skew_failures===14,'metric signature');
check(R.source_inconsistency_policy?.expected?.commutators_outside_span===336,'commutator signature');
check(R.fixed_point?.targeted_L127_complete===true,'fixed point');
check(R.fixed_point?.global_L_primitive_closure_complete===false,'global overclaim');
check(R.next_lawful_action?.family==='L-SSC-131 generalized triality','next family');
check(!/W-SSC-|\/woit\//i.test(JSON.stringify(R)),'W leak');
console.log(JSON.stringify({schema:'isograph.exp062-l127-g7-targeted-closure-verifier.v0.1',pass:!errors.length,errors,closed:closed.length,next:R.next_lawful_action?.family,external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED'},null,2));if(errors.length)process.exit(1);