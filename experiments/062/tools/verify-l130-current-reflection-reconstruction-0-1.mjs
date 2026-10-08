import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};

const packetPath='experiments/062/L130_CURRENT_REFLECTION_RECONSTRUCTION_0_1.json';
const P=json(packetPath);
check(P.status==='L130_CURRENT_SOURCE_RECONSTRUCTION_CANDIDATE_NO_NEW_PRIMITIVE_REQUIRED','packet status');
check(P.authority===false&&P.track==='L','authority/track');
for(const x of [P.predecessor,...(P.authority_tuple||[]),...(P.source_instances||[]),...(P.deterministic_controls||[])]){
  check(fs.existsSync(x.path),'missing '+x.path);
  if(fs.existsSync(x.path))check(blob(x.path)===x.git_blob_sha,'pin '+x.path);
}
for(const a of P.authority_tuple||[]){
  const q=json(a.path);
  check(q.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','authority not provisional-qualified '+a.path);
  check(q.global_qualified_authority===false,'global authority leak '+a.path);
}

const sourceByName=Object.fromEntries((P.source_instances||[]).map(x=>[x.path,x]));
const complexPath='research/woit-lisi-isomorph/lisi/LISI_BT01_PAULI_MATRIX_SOURCE_INSTANCE_0_2.isg';
const complexifiedPath='research/woit-lisi-isomorph/lisi/LISI_L05_COMPLEXIFIED_ROLE_CARRIERS_0_2.isg';
const spacelikePath='research/woit-lisi-isomorph/lisi/LISI_L05_SPACELIKE_GENERALIZED_REFLECTION_SOURCE_INSTANCE_0_2.isg';
const timelikePath='research/woit-lisi-isomorph/lisi/LISI_L05_TIMELIKE_GENERALIZED_REFLECTION_SOURCE_INSTANCE_0_1.isg';
const timeAntiPath='research/woit-lisi-isomorph/lisi/LISI_L05_TIMELIKE_REFLECTION_ANTIINVARIANCE_0_1.isg';
const complexReflPath='research/woit-lisi-isomorph/lisi/LISI_L05_COMPLEX_GENERALIZED_REFLECTION_EXTENSION_0_1.isg';
for(const p of [complexPath,complexifiedPath,spacelikePath,timelikePath,timeAntiPath,complexReflPath])check(!!sourceByName[p],'source missing from packet '+p);

const complexText=read(complexPath);
const timelikeText=read(timelikePath);
const complexifiedText=read(complexifiedPath);
const spacelikeText=read(spacelikePath);
const timeAntiText=read(timeAntiPath);
const complexReflText=read(complexReflPath);

check(complexText.includes('(^150010 182003\n    198100 198101 198102 198103 198104 198105 198106)'),'complex field not routed through 182003');
check(complexText.includes('(^150010 198102 198108 198108 198109)'),'current i*i=-1 fact missing');
check(!complexText.includes('(^150010 198103 198108 198108 198109)'),'stale malformed complex scalar fact present');
check(/\(\^150005\s+\(\^150010\s+229000\s+\?phase\)[\s\S]*?\(\^150010\s+198102\s+\?phase\s+\?phase\s+\?cm1\)/.test(timelikeText),'229000 phase relation not using current multiply');
for(const id of [222000,222001,222002])check(new RegExp('\\(\\^150010\\s+'+id+'(?:\\s|\\))').test(complexifiedText),'complexified roles missing '+id);
for(const id of [223100,223101,223102,223103,223104])check(new RegExp('\\(\\^150010\\s+'+id+'(?:\\s|\\))').test(spacelikeText),'spacelike relation missing '+id);
for(const id of [229000,229100,229101,229102,229300,229301,229302,229500,229501,229502])check(new RegExp('\\(\\^150010\\s+'+id+'(?:\\s|\\))').test(timelikeText),'timelike relation missing '+id);
check(/\(\^150010\s+225000(?:\s|\))/.test(timeAntiText),'timelike anti-invariance missing 225000 scalar extension');
check(/\(\^150010\s+231000(?:\s|\))/.test(complexReflText),'complex reflection extension missing 231000');
for(const id of [232174,232175,232176,232177,232178,232179])check(new RegExp('\\(\\^150010\\s+'+id+'(?:\\s|\\))').test(complexReflText),'complex-domain relation missing '+id);

function run(path){
  return JSON.parse(execFileSync('node',[path],{encoding:'utf8'}));
}
const scalar=run('research/woit-lisi-isomorph/lisi/tools/verify_lisi_complex_scalar_interface.mjs');
const space=run('research/woit-lisi-isomorph/lisi/tools/verify_l130_spacelike_reflections.mjs');
const time=run('experiments/062/tools/verify-l130-timelike-reflections-current-0-1.mjs');
const cx=run('research/woit-lisi-isomorph/lisi/tools/verify_l130_complex_reflections.mjs');

check(scalar.pass===true,'complex scalar verifier failed');
check(scalar.successor_removes_malformed_facts===true&&scalar.successor_required_scalar_facts_present===true,'complex scalar successor defect');
check(space.pass===true,'spacelike verifier failed');
const ordinaryO=space.results?.find(x=>x.name==='O');
check(ordinaryO?.involution_failures===720,'ordinary-O involution failure signature changed');
check(ordinaryO?.antiinvariance_failures===118,'ordinary-O anti-invariance failure signature changed');
check(ordinaryO?.even_composition_failures===4484,'ordinary-O even-composition failure signature changed');
for(const r of space.results||[])if(r.name!=='O'){
  check(r.involution_failures===0&&r.antiinvariance_failures===0&&r.even_composition_failures===0,'unexpected spacelike failure '+r.name);
}
check(time.pass===true,'current timelike verifier failed');
check(time.corrected_scalar_interface===true&&time.phase_relation_229000_uses_current_multiply_and_embedding===true,'timelike current-interface guard');
for(const r of time.results||[])check(Object.values(r.real_core_cubic_failures||{}).every(x=>x===0),'timelike core failure '+r.name);
check(cx.pass===true,'complex-domain verifier failed');
check(cx.total_odd_basis_cases===6552&&cx.total_even_basis_cases===76104,'complex-domain coverage changed');
for(const r of cx.results||[])check(r.odd_failures===0&&r.even_failures===0,'complex-domain failure '+r.name);

const routed=Object.fromEntries((P.reconstruction_routing||[]).map(x=>[x.occurrence_id,x]));
for(const id of ['L-SSC-130-R01','L-SSC-130-R02','L-SSC-130-R03','L-SSC-130-R04','L-SSC-130-R06','L-SSC-130-R07','L-SSC-130-R08','L-SSC-130-R09'])check(routed[id]?.disposition_if_controls_pass==='RECONSTRUCTABLE','routing missing '+id);
check(P.current_method_ruling?.new_generic_G5H_candidate_required===false,'unnecessary G5H route');
check(P.source_inconsistency_policy?.source_repair_used===false,'source repair leak');
check(P.real_form_boundary?.alternate_antilinear_real_structure_in_scope===false,'real-form scope leak');
check(!/W-SSC-|\/woit\//i.test(JSON.stringify(P)),'W leak');

console.log(JSON.stringify({
 schema:'isograph.exp062-l130-current-reflection-reconstruction-verifier.v0.1',
 pass:errors.length===0,
 errors,
 controls:{
  complex_scalar:scalar.pass,
  spacelike:space.pass,
  timelike_current:time.pass,
  complex_domain:cx.pass
 },
 ordinary_O_expected_failures:{
  involution:ordinaryO?.involution_failures,
  antiinvariance:ordinaryO?.antiinvariance_failures,
  even_composition:ordinaryO?.even_composition_failures
 },
 split_complex_coverage:{
  odd_basis_cases:cx.total_odd_basis_cases,
  even_basis_cases:cx.total_even_basis_cases
 },
 reconstructable_occurrences:Object.keys(routed),
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED'
},null,2));
if(errors.length)process.exit(1);
