import fs from 'node:fs';import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};
const R=json('experiments/062/L125_ORDERED_SIGNATURE_RECONSTRUCTION_ROUTING_0_1.json');
check(R.status==='L125_R06_CURRENT_RECONSTRUCTION_ROUTED','status');check(R.authority===false&&R.track==='L','authority/track');
for(const x of [R.consumed_authority,R.predecessor_replay,...R.source_instances]){check(fs.existsSync(x.path),'missing '+x.path);if(fs.existsSync(x.path))check(blob(x.path)===x.git_blob_sha,'pin '+x.path);}
const q=json(R.consumed_authority.path);check(q.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','qualification');
const [order,overlay]=R.source_instances.map(x=>read(x.path));
check(/\(\^150010\s+216000(?:\s|\))/.test(order),'216000 absent');
for(const id of [216001,216002])check(new RegExp('\\(\\^150010\\s+'+id+'(?:\\s|\\))').test(overlay),id+' absent');
check(R.reconstruction?.ordinary_cases?.length===3&&R.reconstruction?.split_cases?.length===3,'case count');
check(R.reconstruction?.disposition==='RECONSTRUCTABLE_WITH_CURRENT_ORDERED_POSITIVITY_AUTHORITY','disposition');
check((R.scope_guards||[]).some(x=>/216003/.test(x)),'division guard');check(R.source_inconsistency_policy?.source_repair_used===false,'repair leak');
check(!/W-SSC-|\/woit\//i.test(JSON.stringify(R)),'W leak');
console.log(JSON.stringify({schema:'isograph.exp062-l125-ordered-signature-routing-verifier.v0.1',pass:!errors.length,errors,ordinary:3,split:3,external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED'},null,2));if(errors.length)process.exit(1);