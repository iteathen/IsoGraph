import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{
 const b=Buffer.from(read(p),'utf8');
 return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};

const path='experiments/062/L_G1_DEPENDENCY_CONE_SOURCE_INCIDENCE_0_1.json';
const S=json(path);
check(S.schema==='isograph.exp062-l-g1-dependency-cone-source-incidence.v0.1','schema');
check(S.status==='TARGETED_G1_SOURCE_INCIDENCE_REOPEN_CANDIDATE','status');
check(S.authority===false && S.authority_effect==='NONE_RESEARCH_EVIDENCE_ONLY','authority');
check(S.track==='L','track');
check(S.governing_method.endsWith('PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_3.md'),'method');
check(JSON.stringify(S.scope?.target_census_ids)===JSON.stringify(['L-SSC-125','L-SSC-128','L-SSC-129','L-SSC-130']),'scope');
check(S.scope?.source_expansion===false && S.scope?.cross_track_evidence_used===false,'scope firewall');
check(S.counts?.reopened_bodies===4 && S.counts?.reopened_occurrences===28,'counts');
check(S.counts?.predecessor_mutated===false && S.counts?.predecessor_replaced_bodies===0,'historical mutation');

for(const [p,rec] of Object.entries(S.source_pins||{})){
 check(fs.existsSync(p),'missing source pin '+p);
 if(fs.existsSync(p)) check(blobSha(p)===rec.git_blob_sha,'source pin mismatch '+p);
}
for(const rec of [S.predecessor_extraction,S.reopen_audit]){
 check(fs.existsSync(rec.path),'missing predecessor '+rec.path);
 if(fs.existsSync(rec.path))check(blobSha(rec.path)===rec.git_blob_sha,'predecessor pin mismatch '+rec.path);
}

const all=(S.items||[]).flatMap(x=>x.occurrences||[]);
const ids=new Set(all.map(x=>x.occurrence_id));
check(ids.size===28,'duplicate occurrence id');
for(const x of S.items||[]){
 check(x.extraction_status==='TARGETED_REOPEN_COMPLETE','body incomplete '+x.census_id);
 for(const o of x.occurrences||[]){
  check(o.source_reversible_reference?.length>0,'missing source ref '+o.occurrence_id);
  check(o.source_span?.length>0,'missing source span '+o.occurrence_id);
  check(Array.isArray(o.argument_spans),'args '+o.occurrence_id);
  for(const d of o.depends_on||[])check(ids.has(d),'dependency outside reopened cone '+o.occurrence_id+' -> '+d);
 }
}

const byId=Object.fromEntries(all.map(x=>[x.occurrence_id,x]));
for(const id of ['L-SSC-125-R02','L-SSC-125-R03','L-SSC-125-R04','L-SSC-125-R05','L-SSC-125-R07',
 'L-SSC-128-R05','L-SSC-129-R01','L-SSC-129-R04','L-SSC-130-R01','L-SSC-130-R02',
 'L-SSC-130-R03','L-SSC-130-R04','L-SSC-130-R06','L-SSC-130-R07','L-SSC-130-R08','L-SSC-130-R09']){
 check(!!byId[id],'missing load-bearing reopened occurrence '+id);
}
check(byId['L-SSC-125-R07']?.definition_status==='SOURCE_BEHAVIOR_REQUIRES_LOWER_SCHEMA','finite extension boundary hidden');
check(byId['L-SSC-128-R05']?.definition_status==='SOURCE_BEHAVIOR_REQUIRES_LOWER_SCHEMA','linear extension boundary hidden');
check(byId['L-SSC-130-R09']?.depends_on?.length===3,'even-composition dependency');
check(byId['L-SSC-129-R01']?.formula_ast?.op==='EQUALITY','T formula AST missing');
check(byId['L-SSC-130-R02']?.formula_ast?.op==='R_v','Rv formula AST missing');

const text=JSON.stringify(S);
check(!/W-SSC-/.test(text),'W occurrence leak');
check(!/research\/woit-lisi-isomorph\/woit\//.test(text),'W source leak');
check(!/\bPD-[A-Z0-9_-]+\b/.test(text),'historical PD category leak');
check(!/\bB-[A-Z0-9_-]+\b/.test(text),'historical basis ID leak');
check(!/DNWF|DNIA/.test(text),'DNWF/DNIA authority leak');
check(!/"authority":true/.test(text),'authority overclaim');

const discrepancy=json('research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_TABLE_SOURCE_DISCREPANCY_0_1.json');
check(discrepancy.representation_policy?.inconsistency_not_repaired_for_track_L===true,'ordinary O repair');
check(all.some(x=>x.occurrence_id==='L-SSC-129-R06')&&all.some(x=>x.occurrence_id==='L-SSC-130-R10'),'ordinary O guards absent');

console.log(JSON.stringify({
 schema:'isograph.exp062-l-g1-dependency-cone-source-incidence-verifier.v0.1',
 pass:errors.length===0,
 errors,
 bodies:S.counts?.reopened_bodies,
 occurrences:S.counts?.reopened_occurrences,
 next_stage:S.next_stage
},null,2));
if(errors.length)process.exit(1);
