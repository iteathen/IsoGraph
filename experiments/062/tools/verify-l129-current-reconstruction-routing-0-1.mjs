import fs from 'node:fs';
import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{const b=Buffer.from(read(p),'utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};

const auditPath='experiments/062/L129_CURRENT_RECONSTRUCTION_ROUTING_0_1.json';
const A=json(auditPath);
check(A.status==='L129_CURRENT_RECONSTRUCTION_DEPENDENCIES_ROUTED','status');
check(A.authority===false&&A.track==='L','authority/track');
check(A.governing_method?.endsWith('PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_3.md'),'method');

function checkPin(rec){
 if(!rec?.path)return;
 check(fs.existsSync(rec.path),'missing '+rec.path);
 if(fs.existsSync(rec.path)&&rec.git_blob_sha)check(blobSha(rec.path)===rec.git_blob_sha,'pin mismatch '+rec.path);
}
checkPin(A.source_instance);checkPin(A.parent_replay);
for(const group of A.routed_external_relations||[]){
 const route=group.route||{};
 if(route.path)checkPin(route);
 if(route.closure_evidence)checkPin(route.closure_evidence);
 if(route.qualified_wrapper)checkPin(route.qualified_wrapper);
 if(route.composition_authority)checkPin(route.composition_authority);
 if(route.quaternion_antiinvolution_successor)checkPin(route.quaternion_antiinvolution_successor);
 for(const s of route.source_instances||[])checkPin(s);
}

const source=read(A.source_instance.path);
const declared=new Set([...source.matchAll(/\(\^1500(?:13|14)\s+(\d+)\)/g)].map(m=>Number(m[1])));
const calls=[...source.matchAll(/\(\^150010\s+(\d+)/g)].map(m=>Number(m[1]));
const external=[...new Set(calls.filter(id=>!declared.has(id)))].sort((a,b)=>a-b);
check(JSON.stringify(external)===JSON.stringify(A.expected_external_relation_set),'external routing set mismatch');

const trq=json(A.routed_external_relations[0].route.path);
check(trq.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','trilinear promotion status');
for(const id of [185005,185006,220000])check(trq.qualified_scope?.relations?.some(x=>x.id===id),'trilinear relation not qualified '+id);

const typedGroup=A.routed_external_relations.find(x=>(x.ids||[]).includes(218000));
const triple=json(typedGroup.route.qualified_wrapper.path),g702=json(typedGroup.route.closure_evidence.path);
check(triple.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','triple-role promotion');
check(g702.closure_findings?.L128?.disposition==='TARGETED_REOPEN_CLOSED','L128 not closed');

const kappaGroup=A.routed_external_relations.find(x=>(x.ids||[]).includes(189209));
const comp=json(kappaGroup.route.composition_authority.path);
check(comp.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','composition promotion');
for(const id of [188000,215001])check(comp.qualified_scope?.relations?.some(x=>x.id===id),'KAPPA support out of scope '+id);

check((calls.filter(x=>x===220000)).length===6,'expected six 220000 coefficient instances');
check((calls.filter(x=>x===185006)).length===6,'expected six 185006 typed-cycle instances');
for(const id of A.closure_candidates||[])check(/^L-SSC-129-R0[1-5]$/.test(id),'unexpected closure candidate '+id);
check(!/W-SSC-|\/woit\//i.test(JSON.stringify(A)),'W leakage');
check((A.nonclaims||[]).some(x=>/ordinary-O/.test(x)),'ordinary-O nonclaim absent');

console.log(JSON.stringify({
 schema:'isograph.exp062-l129-current-reconstruction-routing-verifier.v0.1',
 pass:errors.length===0,
 errors,
 external_relation_count:external.length,
 coefficient_recovery_instances:calls.filter(x=>x===220000).length,
 typed_cyclic_instances:calls.filter(x=>x===185006).length,
 closure_candidates:A.closure_candidates,
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED'
},null,2));
if(errors.length)process.exit(1);
