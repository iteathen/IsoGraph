import fs from 'node:fs';import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};
const R=json('experiments/062/L_G7_DEPENDENCY_CONE_REPLAY_0_7.json');
check(R.status==='G7_TARGETED_DEPENDENCY_CONE_FIXED_POINT_ALL_28_RECONSTRUCTED','status');check(R.authority===false&&R.track==='L','authority');
for(const x of [R.predecessor,R.source_reconstruction]){check(fs.existsSync(x.path),'missing '+x.path);if(fs.existsSync(x.path))check(blob(x.path)===x.git_blob_sha,'pin '+x.path);}
const closed=(R.results||[]).filter(x=>x.disposition==='CLOSED_WITH_CAMPAIGN_LOCAL_PROVISIONAL_AUTHORITY');
const open=(R.results||[]).filter(x=>x.disposition==='UNEXPANDED_DEMAND');
check(closed.length===28&&open.length===0,'counts');check(R.fixed_point?.targeted_cone_complete===true,'fixed point');check(R.fixed_point?.global_L_primitive_closure_complete===false,'global overclaim');check(R.fixed_point?.source_track_IA_authorized===false,'IA overclaim');check(R.fixed_point?.cross_track_comparison_authorized===false,'cross-track overclaim');
for(const id of ['L-SSC-125','L-SSC-128','L-SSC-129','L-SSC-130'])check(R.closure_findings?.[id.replace('L-SSC-','L')]?.disposition==='TARGETED_REOPEN_CLOSED','closure '+id);
check(R.next_lawful_action?.candidate==='L-SSC-126 chiral Clifford coefficient construction','next family');
check(!/W-SSC-|\/woit\//i.test(JSON.stringify(R)),'W leak');
console.log(JSON.stringify({schema:'isograph.exp062-l-g7-replay-verifier.v0.7',pass:!errors.length,errors,closed:closed.length,open:open.length,next:R.next_lawful_action?.candidate,external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED'},null,2));if(errors.length)process.exit(1);