import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';

const H=x=>crypto.createHash('sha256').update(x).digest('hex');
const frozen={
  qualification_target_id:'T1',
  source_interpretation_sha256:H('source'),
  source_semantic_census_sha256:H('census'),
  semantic_scope_sha256:H('scope'),
  primitive_kernel_sha256:H('kernel'),
  qu_state_sha256:'NONE',
  governing_authority_sha256:H('authority'),
  inference_profile_sha256:H('profile')
};
const fpInputs={
  primitive_kernel_sha256:frozen.primitive_kernel_sha256,
  source_semantic_census_sha256:frozen.source_semantic_census_sha256,
  semantic_scope_sha256:frozen.semantic_scope_sha256,
  qu_state_sha256:frozen.qu_state_sha256,
  governing_authority_sha256:frozen.governing_authority_sha256,
  inference_profile_sha256:frozen.inference_profile_sha256
};
const fpId=H(Object.values(fpInputs).join('\n'));

function good(){
 return {
  version:'core-0.21-ledger-0.1',
  frozen:structuredClone(frozen),
  census:[
   {id:'A',kind:'ASSERTION',source_provenance:'src:A',scope_ref:'S',semantic_body_ref:'body:A'},
   {id:'G',kind:'GENERATOR',source_provenance:'src:G',scope_ref:'S',semantic_body_ref:'body:G'}
  ],
  nodes:[
   {id:'a-body',classification:'LOGICAL_RELATION',authoritative:true,authority_owner:'CORE',children:['p1'],source_census_ids:['A'],closure_mode:'CLOSED_PRIMITIVE',reconstruction_path:['A','a-body'],unexpanded_dependencies:[]},
   {id:'p1',classification:'CORE_PRIMITIVE',authoritative:true,authority_owner:'CORE',children:[],source_census_ids:['A','G'],closure_mode:'CLOSED_PRIMITIVE',reconstruction_path:['p1'],unexpanded_dependencies:[]},
   {id:'schema',classification:'LOGICAL_RELATION',authoritative:true,authority_owner:'CORE',children:['p1'],source_census_ids:['G'],closure_mode:'CLOSED_SCHEMA',reconstruction_path:['G','schema'],unexpanded_dependencies:[],schema:{coverage:'EXACT_ALL_AND_ONLY',generator_components:['p1'],hidden_side_conditions_unresolved:false,materialization:'PARTIAL',termination_status:'NOT_LOAD_BEARING'}}
  ],
  dispositions:[
   {census_id:'A',closure_mode:'CLOSED_PRIMITIVE',body_roots:['a-body'],support_roots:['p1'],dependency_roots:[],reconstruction_path:['A','a-body','p1'],evidence_dispositions:['SOURCE_ASSERTED']},
   {census_id:'G',closure_mode:'CLOSED_SCHEMA',body_roots:['schema'],support_roots:[],dependency_roots:[],reconstruction_path:['G','schema','p1'],evidence_dispositions:['SOURCE_ASSERTED']}
  ],
  scope_revision:null,
  ia_fixed_point:{id:fpId,stable:true,inputs:structuredClone(fpInputs)}
 };
}

const dir=fs.mkdtempSync(path.join(os.tmpdir(),'core021-ledger-'));
const checker='tools/core021/check-core021-ledger.mjs';
function run(name,obj,shouldPass){
 const file=path.join(dir,name+'.json');
 fs.writeFileSync(file,JSON.stringify(obj,null,2));
 const r=spawnSync(process.execPath,[checker,file],{encoding:'utf8'});
 if(shouldPass&&r.status!==0) throw new Error(name+' expected PASS\n'+r.stdout+r.stderr);
 if(!shouldPass&&r.status===0) throw new Error(name+' expected FAIL');
}

run('good',good(),true);
let x=good();x.dispositions.pop();run('missing-census-disposition',x,false);
x=good();x.dispositions[0].body_roots=['missing'];run('missing-body-node',x,false);
x=good();x.nodes[0].classification='DERIVED_VIEW';x.nodes[0].authoritative=true;run('derived-authority',x,false);
x=good();x.dispositions[0].closure_mode='INCOMPLETE_UNEXPANDED';run('incomplete',x,false);
x=good();x.nodes.find(n=>n.id==='schema').schema.coverage='OBSERVED_PREFIX_ONLY';run('schema-coverage',x,false);
x=good();x.nodes.find(n=>n.id==='schema').schema.hidden_side_conditions_unresolved=true;run('schema-hidden-side-condition',x,false);
x=good();x.scope_revision={old_target_id:'T1',old_scope_sha256:H('old'),new_target_id:'T1',new_scope_sha256:frozen.semantic_scope_sha256,removed_census_ids:[],added_census_ids:[],changed_boundaries:[],reason:'shrink',old_target_preserved:false,in_place_mutation:true};run('in-place-scope',x,false);
x=good();x.ia_fixed_point.inputs.primitive_kernel_sha256=H('changed');run('stale-ia',x,false);
x=good();x.nodes.push({id:'q',classification:'QUALIFIED_QU_BOUNDARY',authoritative:true,authority_owner:'QU',children:[],source_census_ids:['A'],closure_mode:'CLOSED_WITH_QUALIFIED_QU_BOUNDARY',reconstruction_path:['q'],unexpanded_dependencies:[],qu_boundary:{qualified:true,known_semantics_primitive_closed:true,selected_realization:true}});x.dispositions[0].closure_mode='CLOSED_WITH_QUALIFIED_QU_BOUNDARY';x.dispositions[0].body_roots=['q'];run('selected-qu-realization',x,false);

fs.rmSync(dir,{recursive:true,force:true});
console.log('Core 0.21 ledger checker tests: PASS');
