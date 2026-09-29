import fs from 'node:fs';
import crypto from 'node:crypto';

const file=process.argv[2];
if(!file) throw new Error('usage: node tools/core021/check-core021-ledger.mjs <ledger.json>');

const ledger=JSON.parse(fs.readFileSync(file,'utf8'));
const errors=[];
const fail=(gate,msg)=>{gates[gate]=false;errors.push(gate+': '+msg);};
const gates={
  SOUNDNESS_STRUCTURE:true,
  COVERAGE:true,
  RECONSTRUCTION:true,
  SCOPE_INTEGRITY:true,
  AUTHORITY_ROUTING_STRUCTURE:true,
  IA_FIXED_POINT_CURRENT:true,
  STRICT_CLOSURE:true
};

const allowedModes=new Set(['CLOSED_PRIMITIVE','CLOSED_SCHEMA','CLOSED_WITH_QUALIFIED_QU_BOUNDARY','INCOMPLETE_UNEXPANDED']);
const allowedLeaves=new Set(['CORE_PRIMITIVE','RAW_DATA_ATOM','PRIMITIVE_EXTENTIONAL_INCIDENCE','QUALIFIED_QU_BOUNDARY']);
const hashFields=['source_interpretation_sha256','source_semantic_census_sha256','semantic_scope_sha256','primitive_kernel_sha256','governing_authority_sha256','inference_profile_sha256'];
const hashOk=v=>typeof v==='string'&&/^[0-9a-f]{64}$/.test(v);
const arr=v=>Array.isArray(v)?v:[];

if(ledger.version!=='core-0.21-ledger-0.1') fail('SOUNDNESS_STRUCTURE','unexpected ledger version');
if(!ledger.frozen||typeof ledger.frozen!=='object') fail('SOUNDNESS_STRUCTURE','missing frozen object');
else{
  if(typeof ledger.frozen.qualification_target_id!=='string'||!ledger.frozen.qualification_target_id) fail('SOUNDNESS_STRUCTURE','missing qualification target ID');
  for(const k of hashFields) if(!hashOk(ledger.frozen[k])) fail('SOUNDNESS_STRUCTURE','invalid frozen '+k);
  const q=ledger.frozen.qu_state_sha256;
  if(!(q==='NONE'||hashOk(q))) fail('SOUNDNESS_STRUCTURE','invalid frozen qu_state_sha256');
}

const census=arr(ledger.census),nodes=arr(ledger.nodes),disps=arr(ledger.dispositions);
const censusMap=new Map(),nodeMap=new Map();
for(const c of census){
  if(!c||typeof c.id!=='string'||!c.id){fail('COVERAGE','census item missing ID');continue;}
  if(censusMap.has(c.id)) fail('COVERAGE','duplicate census ID '+c.id);
  censusMap.set(c.id,c);
  for(const k of ['kind','source_provenance','scope_ref','semantic_body_ref']) if(typeof c[k]!=='string'||!c[k]) fail('COVERAGE','census '+c.id+' missing '+k);
}
for(const n of nodes){
  if(!n||typeof n.id!=='string'||!n.id){fail('SOUNDNESS_STRUCTURE','node missing ID');continue;}
  if(nodeMap.has(n.id)) fail('SOUNDNESS_STRUCTURE','duplicate node ID '+n.id);
  nodeMap.set(n.id,n);
  if(typeof n.classification!=='string'||!n.classification) fail('SOUNDNESS_STRUCTURE','node '+n.id+' missing classification');
  if(typeof n.authoritative!=='boolean') fail('SOUNDNESS_STRUCTURE','node '+n.id+' missing authoritative boolean');
  if(!Array.isArray(n.children)) fail('SOUNDNESS_STRUCTURE','node '+n.id+' children must be array');
  if(!Array.isArray(n.source_census_ids)) fail('SOUNDNESS_STRUCTURE','node '+n.id+' source_census_ids must be array');
  if(!Array.isArray(n.reconstruction_path)) fail('RECONSTRUCTION','node '+n.id+' reconstruction_path must be array');
  if(!Array.isArray(n.unexpanded_dependencies)) fail('SOUNDNESS_STRUCTURE','node '+n.id+' unexpanded_dependencies must be array');
  for(const cid of arr(n.source_census_ids)) if(!censusMap.has(cid)) fail('COVERAGE','node '+n.id+' references unknown census '+cid);
  if(n.classification==='DERIVED_VIEW'&&n.authoritative) fail('SOUNDNESS_STRUCTURE','derived view '+n.id+' cannot be authoritative support');
  if(n.classification==='QUALIFIED_QU_BOUNDARY'){
    const q=n.qu_boundary||{};
    if(q.qualified!==true||q.known_semantics_primitive_closed!==true||q.selected_realization!==false) fail('AUTHORITY_ROUTING_STRUCTURE','invalid QU boundary '+n.id);
    if(n.authority_owner!=='QU') fail('AUTHORITY_ROUTING_STRUCTURE','QU boundary '+n.id+' must be owned by QU');
  }
}

const dispByCensus=new Map();
for(const d of disps){
  if(!d||typeof d.census_id!=='string'||!censusMap.has(d.census_id)){fail('COVERAGE','disposition references unknown census');continue;}
  if(dispByCensus.has(d.census_id)) fail('COVERAGE','multiple current dispositions for '+d.census_id);
  dispByCensus.set(d.census_id,d);
  if(!allowedModes.has(d.closure_mode)) fail('SOUNDNESS_STRUCTURE','invalid closure mode for '+d.census_id);
  for(const k of ['body_roots','support_roots','dependency_roots','reconstruction_path','evidence_dispositions']) if(!Array.isArray(d[k])) fail('SOUNDNESS_STRUCTURE','disposition '+d.census_id+' missing array '+k);
  if(d.closure_mode!=='INCOMPLETE_UNEXPANDED'&&arr(d.reconstruction_path).length===0) fail('RECONSTRUCTION','closed census '+d.census_id+' lacks reconstruction path');
  if(d.closure_mode==='INCOMPLETE_UNEXPANDED') fail('STRICT_CLOSURE','census '+d.census_id+' remains incomplete');
}
for(const id of censusMap.keys()) if(!dispByCensus.has(id)) fail('COVERAGE','missing disposition for '+id);
if(dispByCensus.size!==censusMap.size) fail('COVERAGE','disposition/census cardinality mismatch');

function inspectRoots(d){
  const roots=[...arr(d.body_roots),...arr(d.support_roots),...arr(d.dependency_roots)];
  if(arr(d.body_roots).length===0) fail('RECONSTRUCTION','census '+d.census_id+' has no body root');
  const seen=new Set();
  let sawQU=false;
  const stack=[...roots];
  while(stack.length){
    const id=stack.pop();
    if(seen.has(id)) continue;
    seen.add(id);
    const n=nodeMap.get(id);
    if(!n){fail('RECONSTRUCTION','census '+d.census_id+' references missing node '+id);continue;}
    if(arr(n.unexpanded_dependencies).length) fail('STRICT_CLOSURE','node '+id+' has unexpanded dependencies');
    if(n.classification==='DERIVED_VIEW') fail('RECONSTRUCTION','authoritative path for '+d.census_id+' traverses derived view '+id);
    const children=arr(n.children);
    if(children.length===0){
      if(!allowedLeaves.has(n.classification)) fail('STRICT_CLOSURE','unexplained authoritative leaf '+id+' ('+n.classification+')');
      if(n.classification==='QUALIFIED_QU_BOUNDARY') sawQU=true;
    }
    for(const child of children) stack.push(child);
  }
  if(d.closure_mode==='CLOSED_PRIMITIVE'&&sawQU) fail('SOUNDNESS_STRUCTURE','CLOSED_PRIMITIVE census '+d.census_id+' contains QU boundary');
  if(d.closure_mode==='CLOSED_WITH_QUALIFIED_QU_BOUNDARY'&&!sawQU) fail('SOUNDNESS_STRUCTURE','QU-bounded census '+d.census_id+' has no QU boundary');
  return {seen,sawQU};
}
for(const d of disps) if(censusMap.has(d.census_id)) inspectRoots(d);

for(const d of disps.filter(x=>x.closure_mode==='CLOSED_SCHEMA')){
  const roots=arr(d.body_roots).map(id=>nodeMap.get(id)).filter(Boolean);
  const sn=roots.find(n=>n.schema&&typeof n.schema==='object');
  if(!sn){fail('SOUNDNESS_STRUCTURE','schema census '+d.census_id+' lacks schema metadata');continue;}
  const s=sn.schema;
  if(s.coverage!=='EXACT_ALL_AND_ONLY') fail('RECONSTRUCTION','schema '+d.census_id+' lacks exact all-and-only coverage');
  if(s.hidden_side_conditions_unresolved!==false) fail('STRICT_CLOSURE','schema '+d.census_id+' has unresolved hidden side conditions');
  const allowedMaterial=new Set(['NONE','PARTIAL','COMPLETE']);
  if(!allowedMaterial.has(s.materialization)) fail('SOUNDNESS_STRUCTURE','schema '+d.census_id+' has invalid materialization');
  const allowedTerm=new Set(['PROVEN_TERMINATING','FIXED_FINITE_COUNT','QUALIFIED_QU_TERMINATION','NOT_LOAD_BEARING']);
  if(!allowedTerm.has(s.termination_status)) fail('SOUNDNESS_STRUCTURE','schema '+d.census_id+' has invalid termination status');
  const comps=arr(s.generator_components);
  if(comps.length===0) fail('RECONSTRUCTION','schema '+d.census_id+' has no generator components');
  for(const id of comps){
    const n=nodeMap.get(id);
    if(!n){fail('RECONSTRUCTION','schema '+d.census_id+' missing generator component '+id);continue;}
    const tmp={census_id:d.census_id,closure_mode:'CLOSED_PRIMITIVE',body_roots:[id],support_roots:[],dependency_roots:[]};
    const before=gates.SOUNDNESS_STRUCTURE&&gates.RECONSTRUCTION&&gates.STRICT_CLOSURE;
    inspectRoots(tmp);
    if(n.classification==='QUALIFIED_QU_BOUNDARY') fail('RECONSTRUCTION','schema generator component '+id+' cannot be unresolved QU');
  }
}

if(ledger.scope_revision!=null){
  const s=ledger.scope_revision;
  if(s.in_place_mutation!==false) fail('SCOPE_INTEGRITY','scope revision cannot mutate target in place');
  if(s.old_target_preserved!==true) fail('SCOPE_INTEGRITY','old scope target must be preserved');
  if(typeof s.old_target_id!=='string'||typeof s.new_target_id!=='string'||!s.old_target_id||!s.new_target_id) fail('SCOPE_INTEGRITY','scope revision target IDs missing');
  if(s.old_target_id===s.new_target_id) fail('SCOPE_INTEGRITY','scope revision must create new target ID');
  if(!hashOk(s.old_scope_sha256)||!hashOk(s.new_scope_sha256)||s.old_scope_sha256===s.new_scope_sha256) fail('SCOPE_INTEGRITY','scope revision hashes invalid');
  if(s.new_scope_sha256!==ledger.frozen?.semantic_scope_sha256) fail('SCOPE_INTEGRITY','new scope hash differs from frozen current scope');
  if(s.new_target_id!==ledger.frozen?.qualification_target_id) fail('SCOPE_INTEGRITY','new target differs from frozen target');
  for(const k of ['removed_census_ids','added_census_ids','changed_boundaries']) if(!Array.isArray(s[k])) fail('SCOPE_INTEGRITY','scope revision '+k+' must be array');
  if(typeof s.reason!=='string'||!s.reason) fail('SCOPE_INTEGRITY','scope revision reason missing');
}

if(ledger.ia_fixed_point!=null){
  const fp=ledger.ia_fixed_point,inputs=fp.inputs||{};
  const pairs=[
    ['primitive_kernel_sha256','primitive_kernel_sha256'],
    ['source_semantic_census_sha256','source_semantic_census_sha256'],
    ['semantic_scope_sha256','semantic_scope_sha256'],
    ['qu_state_sha256','qu_state_sha256'],
    ['governing_authority_sha256','governing_authority_sha256'],
    ['inference_profile_sha256','inference_profile_sha256']
  ];
  const vals=[];
  for(const [ik,fk] of pairs){
    vals.push(inputs[ik]);
    if(inputs[ik]!==ledger.frozen?.[fk]) fail('IA_FIXED_POINT_CURRENT','IA fixed-point input '+ik+' differs from frozen target');
  }
  const expected=crypto.createHash('sha256').update(vals.join('\n')).digest('hex');
  if(fp.id!==expected) fail('IA_FIXED_POINT_CURRENT','IA fixed-point ID mismatch');
  if(fp.stable!==true) fail('IA_FIXED_POINT_CURRENT','IA fixed point not marked stable');
}

const qualifies=Object.values(gates).every(Boolean);
const result={version:ledger.version,qualifies,gates,errors};
console.log(JSON.stringify(result,null,2));
if(!qualifies) process.exitCode=1;
