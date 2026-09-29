import fs from 'node:fs';
import crypto from 'node:crypto';

const file=process.argv[2];
if(!file) throw new Error('usage: node tools/core021/check-core021-ledger.mjs <ledger.json>');

const ledger=JSON.parse(fs.readFileSync(file,'utf8'));
const errors=[];
const gates={
  SOUNDNESS_STRUCTURE:true,
  COVERAGE:true,
  RECONSTRUCTION:true,
  SCOPE_INTEGRITY:true,
  AUTHORITY_ROUTING_STRUCTURE:true,
  IA_FIXED_POINT_CURRENT:true,
  STRICT_CLOSURE:true
};
const fail=(gate,msg)=>{gates[gate]=false;errors.push(gate+': '+msg);};

const allowedModes=new Set(['CLOSED_PRIMITIVE','CLOSED_SCHEMA','CLOSED_WITH_QUALIFIED_QU_BOUNDARY','INCOMPLETE_UNEXPANDED']);
const allowedLeaves=new Set(['CORE_PRIMITIVE','RAW_DATA_ATOM','PRIMITIVE_EXTENTIONAL_INCIDENCE','QUALIFIED_QU_BOUNDARY']);
const hashOk=v=>typeof v==='string'&&/^[0-9a-f]{64}$/.test(v);
const arr=v=>Array.isArray(v)?v:[];

function canonical(v){
  if(Array.isArray(v)) return '['+v.map(canonical).join(',')+']';
  if(v&&typeof v==='object'){
    return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';
  }
  return JSON.stringify(v);
}
const H=v=>crypto.createHash('sha256').update(canonical(v)).digest('hex');
const sameSet=(a,b)=>JSON.stringify([...a].sort())===JSON.stringify([...b].sort());

if(ledger.version!=='core-0.21-ledger-0.2') fail('SOUNDNESS_STRUCTURE','unexpected ledger version');

if(!ledger.frozen||typeof ledger.frozen!=='object') fail('SOUNDNESS_STRUCTURE','missing frozen object');
if(!ledger.scope||typeof ledger.scope!=='object') fail('SCOPE_INTEGRITY','missing canonical scope object');
if(!ledger.governing_authority||typeof ledger.governing_authority!=='object') fail('AUTHORITY_ROUTING_STRUCTURE','missing governing authority descriptor');
if(!ledger.inference_profile||typeof ledger.inference_profile!=='object') fail('IA_FIXED_POINT_CURRENT','missing inference profile descriptor');

const census=arr(ledger.census);
const nodes=arr(ledger.nodes);
const disps=arr(ledger.dispositions);
const censusMap=new Map();
const nodeMap=new Map();

for(const c of census){
  if(!c||typeof c.id!=='string'||!c.id){fail('COVERAGE','census item missing ID');continue;}
  if(censusMap.has(c.id)) fail('COVERAGE','duplicate census ID '+c.id);
  censusMap.set(c.id,c);
  for(const k of ['kind','source_provenance','scope_ref','semantic_body_ref']){
    if(typeof c[k]!=='string'||!c[k]) fail('COVERAGE','census '+c.id+' missing '+k);
  }
}

for(const n of nodes){
  if(!n||typeof n.id!=='string'||!n.id){fail('SOUNDNESS_STRUCTURE','node missing ID');continue;}
  if(nodeMap.has(n.id)) fail('SOUNDNESS_STRUCTURE','duplicate node ID '+n.id);
  nodeMap.set(n.id,n);
  if(typeof n.classification!=='string'||!n.classification) fail('SOUNDNESS_STRUCTURE','node '+n.id+' missing classification');
  if(typeof n.authoritative!=='boolean') fail('SOUNDNESS_STRUCTURE','node '+n.id+' missing authoritative boolean');
  if(typeof n.closure_mode!=='string'||!n.closure_mode) fail('SOUNDNESS_STRUCTURE','node '+n.id+' missing closure_mode');
  if(!Array.isArray(n.children)) fail('SOUNDNESS_STRUCTURE','node '+n.id+' children must be array');
  if(!Array.isArray(n.source_census_ids)) fail('SOUNDNESS_STRUCTURE','node '+n.id+' source_census_ids must be array');
  if(!Array.isArray(n.reconstruction_path)) fail('RECONSTRUCTION','node '+n.id+' reconstruction_path must be array');
  if(!Array.isArray(n.unexpanded_dependencies)) fail('SOUNDNESS_STRUCTURE','node '+n.id+' unexpanded_dependencies must be array');
  if(n.authoritative&&(typeof n.authority_owner!=='string'||!n.authority_owner)) fail('AUTHORITY_ROUTING_STRUCTURE','authoritative node '+n.id+' missing authority_owner');
  if(n.authoritative&&arr(n.source_census_ids).length===0) fail('COVERAGE','authoritative node '+n.id+' is not linked to any census item');
  for(const cid of arr(n.source_census_ids)) if(!censusMap.has(cid)) fail('COVERAGE','node '+n.id+' references unknown census '+cid);
  if(n.classification==='DERIVED_VIEW'&&n.authoritative) fail('SOUNDNESS_STRUCTURE','derived view '+n.id+' cannot be authoritative support');
  if(n.classification==='CORE_PRIMITIVE'&&n.authority_owner!=='CORE') fail('AUTHORITY_ROUTING_STRUCTURE','Core primitive '+n.id+' must be owned by CORE');
  if(n.classification==='QUALIFIED_QU_BOUNDARY'){
    const q=n.qu_boundary||{};
    if(q.qualified!==true||q.known_semantics_primitive_closed!==true||q.selected_realization!==false) fail('AUTHORITY_ROUTING_STRUCTURE','invalid QU boundary '+n.id);
    if(n.authority_owner!=='QU') fail('AUTHORITY_ROUTING_STRUCTURE','QU boundary '+n.id+' must be owned by QU');
  }
}

for(const n of nodes){
  for(const child of arr(n.children)) if(!nodeMap.has(child)) fail('RECONSTRUCTION','node '+n.id+' references missing child '+child);
}

if(ledger.frozen&&typeof ledger.frozen==='object'){
  if(typeof ledger.frozen.qualification_target_id!=='string'||!ledger.frozen.qualification_target_id) fail('SOUNDNESS_STRUCTURE','missing qualification target ID');
  if(!hashOk(ledger.frozen.source_interpretation_sha256)) fail('SOUNDNESS_STRUCTURE','invalid source_interpretation_sha256');
  for(const k of ['source_semantic_census_sha256','semantic_scope_sha256','primitive_kernel_sha256','governing_authority_sha256','inference_profile_sha256']){
    if(!hashOk(ledger.frozen[k])) fail('SOUNDNESS_STRUCTURE','invalid frozen '+k);
  }
  const q=ledger.frozen.qu_state_sha256;
  if(!(q==='NONE'||hashOk(q))) fail('SOUNDNESS_STRUCTURE','invalid frozen qu_state_sha256');

  const censusCanonical=[...census].sort((a,b)=>String(a.id).localeCompare(String(b.id)));
  if(ledger.frozen.source_semantic_census_sha256!==H(censusCanonical)) fail('COVERAGE','frozen census hash does not match canonical census');

  if(ledger.frozen.semantic_scope_sha256!==H(ledger.scope)) fail('SCOPE_INTEGRITY','frozen scope hash does not match canonical scope');

  const authoritativeKernel=nodes.filter(n=>n.authoritative).sort((a,b)=>String(a.id).localeCompare(String(b.id)));
  if(ledger.frozen.primitive_kernel_sha256!==H(authoritativeKernel)) fail('STRICT_CLOSURE','frozen primitive-kernel hash does not match authoritative node graph');

  const quState=nodes.filter(n=>n.authoritative&&n.classification==='QUALIFIED_QU_BOUNDARY').sort((a,b)=>String(a.id).localeCompare(String(b.id)));
  const expectedQu=quState.length?H(quState):'NONE';
  if(ledger.frozen.qu_state_sha256!==expectedQu) fail('AUTHORITY_ROUTING_STRUCTURE','frozen QU-state hash does not match authoritative QU boundaries');

  if(ledger.frozen.governing_authority_sha256!==H(ledger.governing_authority)) fail('AUTHORITY_ROUTING_STRUCTURE','frozen governing-authority hash does not match descriptor');
  if(ledger.frozen.inference_profile_sha256!==H(ledger.inference_profile)) fail('IA_FIXED_POINT_CURRENT','frozen inference-profile hash does not match descriptor');
}

const declaredIds=arr(ledger.scope?.declared_census_ids);
if(typeof ledger.scope?.id!=='string'||!ledger.scope.id) fail('SCOPE_INTEGRITY','scope missing ID');
if(!Array.isArray(ledger.scope?.declared_census_ids)) fail('SCOPE_INTEGRITY','scope declared_census_ids must be array');
if(!Array.isArray(ledger.scope?.boundary_refs)) fail('SCOPE_INTEGRITY','scope boundary_refs must be array');
if(!sameSet(declaredIds,[...censusMap.keys()])) fail('COVERAGE','scope census membership differs from frozen census');
for(const id of declaredIds) if(!censusMap.has(id)) fail('COVERAGE','scope references unknown census '+id);

const dispByCensus=new Map();
for(const d of disps){
  if(!d||typeof d.census_id!=='string'||!censusMap.has(d.census_id)){fail('COVERAGE','disposition references unknown census');continue;}
  if(dispByCensus.has(d.census_id)) fail('COVERAGE','multiple current dispositions for '+d.census_id);
  dispByCensus.set(d.census_id,d);
  if(!allowedModes.has(d.closure_mode)) fail('SOUNDNESS_STRUCTURE','invalid closure mode for '+d.census_id);
  for(const k of ['body_roots','support_roots','dependency_roots','reconstruction_path','evidence_dispositions']){
    if(!Array.isArray(d[k])) fail('SOUNDNESS_STRUCTURE','disposition '+d.census_id+' missing array '+k);
  }
  if(arr(d.body_roots).length===0) fail('RECONSTRUCTION','census '+d.census_id+' has no body root');
  if(d.closure_mode!=='INCOMPLETE_UNEXPANDED'&&arr(d.reconstruction_path).length===0) fail('RECONSTRUCTION','closed census '+d.census_id+' lacks reconstruction path');
  if(d.closure_mode==='INCOMPLETE_UNEXPANDED') fail('STRICT_CLOSURE','census '+d.census_id+' remains incomplete');
  if(d.closure_mode!=='INCOMPLETE_UNEXPANDED'){
    if(!arr(d.reconstruction_path).includes(d.census_id)) fail('RECONSTRUCTION','closed census '+d.census_id+' reconstruction path omits census identity');
    for(const ref of arr(d.reconstruction_path)){
      if(ref!==d.census_id&&!nodeMap.has(ref)) fail('RECONSTRUCTION','census '+d.census_id+' reconstruction path contains unknown ref '+ref);
    }
  }
}
for(const id of censusMap.keys()) if(!dispByCensus.has(id)) fail('COVERAGE','missing disposition for '+id);
if(dispByCensus.size!==censusMap.size) fail('COVERAGE','disposition/census cardinality mismatch');

const globallyReachable=new Set();
function inspectRoots(d){
  const bodyRoots=arr(d.body_roots);
  const roots=[...bodyRoots,...arr(d.support_roots),...arr(d.dependency_roots)];
  for(const id of bodyRoots){
    const n=nodeMap.get(id);
    if(n&&!arr(n.source_census_ids).includes(d.census_id)) fail('COVERAGE','body root '+id+' is not linked to census '+d.census_id);
  }
  const seen=new Set();
  const quNodes=new Set();
  let permittedLeafCount=0;
  const stack=[...roots];
  while(stack.length){
    const id=stack.pop();
    if(seen.has(id)) continue;
    seen.add(id);
    globallyReachable.add(id);
    const n=nodeMap.get(id);
    if(!n){fail('RECONSTRUCTION','census '+d.census_id+' references missing node '+id);continue;}
    if(n.authoritative!==true) fail('RECONSTRUCTION','authoritative closure path for '+d.census_id+' traverses non-authoritative node '+id);
    if(arr(n.unexpanded_dependencies).length) fail('STRICT_CLOSURE','node '+id+' has unexpanded dependencies');
    if(n.classification==='DERIVED_VIEW') fail('RECONSTRUCTION','authoritative path for '+d.census_id+' traverses derived view '+id);
    const children=arr(n.children);
    if(children.length===0){
      if(!allowedLeaves.has(n.classification)) fail('STRICT_CLOSURE','unexplained authoritative leaf '+id+' ('+n.classification+')');
      else permittedLeafCount++;
      if(n.classification==='QUALIFIED_QU_BOUNDARY') quNodes.add(id);
    }
    for(const child of children) stack.push(child);
  }
  if(roots.length&&permittedLeafCount===0) fail('STRICT_CLOSURE','census '+d.census_id+' closure has no permitted terminal support');
  if(d.closure_mode==='CLOSED_PRIMITIVE'&&quNodes.size) fail('SOUNDNESS_STRUCTURE','CLOSED_PRIMITIVE census '+d.census_id+' contains QU boundary');
  if(d.closure_mode==='CLOSED_WITH_QUALIFIED_QU_BOUNDARY'&&!quNodes.size) fail('SOUNDNESS_STRUCTURE','QU-bounded census '+d.census_id+' has no QU boundary');
  return {seen,quNodes,permittedLeafCount};
}

const closureInfo=new Map();
for(const d of disps){
  if(censusMap.has(d.census_id)) closureInfo.set(d.census_id,inspectRoots(d));
}

for(const n of nodes.filter(n=>n.authoritative)){
  if(!globallyReachable.has(n.id)) fail('COVERAGE','authoritative node '+n.id+' is orphaned from every current census disposition');
}

for(const d of disps.filter(x=>x.closure_mode==='CLOSED_SCHEMA')){
  const roots=arr(d.body_roots).map(id=>nodeMap.get(id)).filter(Boolean);
  const sn=roots.find(n=>n.schema&&typeof n.schema==='object');
  if(!sn){fail('SOUNDNESS_STRUCTURE','schema census '+d.census_id+' lacks schema metadata');continue;}
  const s=sn.schema;
  if(s.coverage!=='EXACT_ALL_AND_ONLY') fail('RECONSTRUCTION','schema '+d.census_id+' lacks exact all-and-only coverage');
  if(s.hidden_side_conditions_unresolved!==false) fail('STRICT_CLOSURE','schema '+d.census_id+' has unresolved hidden side conditions');
  if(!new Set(['NONE','PARTIAL','COMPLETE']).has(s.materialization)) fail('SOUNDNESS_STRUCTURE','schema '+d.census_id+' has invalid materialization');
  if(!new Set(['PROVEN_TERMINATING','FIXED_FINITE_COUNT','QUALIFIED_QU_TERMINATION','NOT_LOAD_BEARING']).has(s.termination_status)) fail('SOUNDNESS_STRUCTURE','schema '+d.census_id+' has invalid termination status');
  const comps=arr(s.generator_components);
  if(!Array.isArray(s.generator_components)||comps.length===0) fail('RECONSTRUCTION','schema '+d.census_id+' has no generator components');
  for(const id of comps){
    const n=nodeMap.get(id);
    if(!n){fail('RECONSTRUCTION','schema '+d.census_id+' missing generator component '+id);continue;}
    const tmp={census_id:d.census_id,closure_mode:'CLOSED_PRIMITIVE',body_roots:[id],support_roots:[],dependency_roots:[]};
    const info=inspectRoots(tmp);
    if(info.quNodes.size) fail('RECONSTRUCTION','schema generator component '+id+' cannot depend on unresolved QU');
  }
  const terminationQ=arr(s.termination_qu_nodes);
  if(s.termination_status==='QUALIFIED_QU_TERMINATION'){
    if(terminationQ.length===0) fail('AUTHORITY_ROUTING_STRUCTURE','schema '+d.census_id+' QU termination lacks termination_qu_nodes');
    for(const id of terminationQ){
      const n=nodeMap.get(id);
      if(!n||n.classification!=='QUALIFIED_QU_BOUNDARY') fail('AUTHORITY_ROUTING_STRUCTURE','schema '+d.census_id+' termination QU node invalid: '+id);
    }
  }else if(terminationQ.length){
    fail('SOUNDNESS_STRUCTURE','schema '+d.census_id+' declares termination_qu_nodes without QU termination status');
  }
  const info=closureInfo.get(d.census_id);
  for(const q of info?.quNodes||[]){
    if(!terminationQ.includes(q)) fail('SOUNDNESS_STRUCTURE','schema '+d.census_id+' contains non-termination QU dependency '+q);
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
