import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';

function canonical(v){
  if(Array.isArray(v)) return '['+v.map(canonical).join(',')+']';
  if(v&&typeof v==='object') return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';
  return JSON.stringify(v);
}
const H=v=>crypto.createHash('sha256').update(canonical(v)).digest('hex');
const fpH=vals=>crypto.createHash('sha256').update(vals.join('\n')).digest('hex');

function finalize(x){
  const y=structuredClone(x);
  y.census.sort((a,b)=>a.id.localeCompare(b.id));
  y.nodes.sort((a,b)=>a.id.localeCompare(b.id));
  y.frozen.source_semantic_census_sha256=H(y.census);
  y.frozen.semantic_scope_sha256=H(y.scope);
  y.frozen.primitive_kernel_sha256=H(y.nodes.filter(n=>n.authoritative));
  const q=y.nodes.filter(n=>n.authoritative&&n.classification==='QUALIFIED_QU_BOUNDARY');
  y.frozen.qu_state_sha256=q.length?H(q):'NONE';
  y.frozen.governing_authority_sha256=H(y.governing_authority);
  y.frozen.inference_profile_sha256=H(y.inference_profile);
  const inputs={
    primitive_kernel_sha256:y.frozen.primitive_kernel_sha256,
    source_semantic_census_sha256:y.frozen.source_semantic_census_sha256,
    semantic_scope_sha256:y.frozen.semantic_scope_sha256,
    qu_state_sha256:y.frozen.qu_state_sha256,
    governing_authority_sha256:y.frozen.governing_authority_sha256,
    inference_profile_sha256:y.frozen.inference_profile_sha256
  };
  y.ia_fixed_point={id:fpH(Object.values(inputs)),stable:true,inputs};
  return y;
}

function base(){
  return {
    version:'core-0.21-ledger-0.2',
    frozen:{
      qualification_target_id:'T1',
      source_interpretation_sha256:H('source'),
      source_semantic_census_sha256:'',
      semantic_scope_sha256:'',
      primitive_kernel_sha256:'',
      qu_state_sha256:'NONE',
      governing_authority_sha256:'',
      inference_profile_sha256:''
    },
    scope:{id:'S',declared_census_ids:['A','G'],boundary_refs:[]},
    governing_authority:{authorities:[{id:'core021',sha256:H('authority-bytes')}]},
    inference_profile:{id:'ia-search-1',sha256:H('profile-bytes')},
    census:[
      {id:'A',kind:'ASSERTION',source_provenance:'src:A',scope_ref:'S',semantic_body_ref:'body:A'},
      {id:'G',kind:'GENERATOR',source_provenance:'src:G',scope_ref:'S',semantic_body_ref:'body:G'}
    ],
    nodes:[
      {id:'a-body',classification:'LOGICAL_RELATION',authoritative:true,authority_owner:'CORE',children:['p1'],source_census_ids:['A'],closure_mode:'CLOSED_PRIMITIVE',reconstruction_path:['A','a-body','p1'],unexpanded_dependencies:[]},
      {id:'p1',classification:'CORE_PRIMITIVE',authoritative:true,authority_owner:'CORE',children:[],source_census_ids:['A','G'],closure_mode:'CLOSED_PRIMITIVE',reconstruction_path:['p1'],unexpanded_dependencies:[]},
      {id:'schema',classification:'LOGICAL_RELATION',authoritative:true,authority_owner:'CORE',children:['p1'],source_census_ids:['G'],closure_mode:'CLOSED_SCHEMA',reconstruction_path:['G','schema','p1'],unexpanded_dependencies:[],schema:{coverage:'EXACT_ALL_AND_ONLY',generator_components:['p1'],hidden_side_conditions_unresolved:false,materialization:'PARTIAL',termination_status:'NOT_LOAD_BEARING',termination_qu_nodes:[]}}
    ],
    dispositions:[
      {census_id:'A',closure_mode:'CLOSED_PRIMITIVE',body_roots:['a-body'],support_roots:['p1'],dependency_roots:[],reconstruction_path:['A','a-body','p1'],evidence_dispositions:['SOURCE_ASSERTED']},
      {census_id:'G',closure_mode:'CLOSED_SCHEMA',body_roots:['schema'],support_roots:[],dependency_roots:[],reconstruction_path:['G','schema','p1'],evidence_dispositions:['SOURCE_ASSERTED']}
    ],
    scope_revision:null,
    ia_fixed_point:null
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

run('good',finalize(base()),true);

let cross=base();
cross.dispositions[0].dependency_roots=['schema'];
cross.dispositions[0].reconstruction_path.push('schema');
run('cross-census-dependency-reuse',finalize(cross),true);

let x=finalize(base());
x.dispositions.pop();
run('missing-census-disposition',x,false);

x=finalize(base());
x.dispositions[0].body_roots=['missing'];
run('missing-body-node',x,false);

x=base();
x.nodes[0].classification='DERIVED_VIEW';
x.nodes[0].closure_mode='DERIVED_VIEW';
run('derived-authority',finalize(x),false);

x=finalize(base());
x.dispositions[0].closure_mode='INCOMPLETE_UNEXPANDED';
run('incomplete',x,false);

x=base();
x.nodes.find(n=>n.id==='schema').schema.coverage='OBSERVED_PREFIX_ONLY';
run('schema-coverage',finalize(x),false);

x=base();
x.nodes.find(n=>n.id==='schema').schema.hidden_side_conditions_unresolved=true;
run('schema-hidden-side-condition',finalize(x),false);

x=finalize(base());
x.scope_revision={old_target_id:'T0',old_scope_sha256:H('old'),new_target_id:'T1',new_scope_sha256:x.frozen.semantic_scope_sha256,removed_census_ids:[],added_census_ids:[],changed_boundaries:[],reason:'shrink',old_target_preserved:false,in_place_mutation:true};
run('in-place-scope',x,false);

x=finalize(base());
x.ia_fixed_point.inputs.primitive_kernel_sha256=H('changed');
run('stale-ia',x,false);

x=base();
x.nodes.push({id:'q',classification:'QUALIFIED_QU_BOUNDARY',authoritative:true,authority_owner:'QU',children:[],source_census_ids:['A'],closure_mode:'CLOSED_WITH_QUALIFIED_QU_BOUNDARY',reconstruction_path:['A','q'],unexpanded_dependencies:[],qu_boundary:{qualified:true,known_semantics_primitive_closed:true,selected_realization:true}});
x.dispositions[0].closure_mode='CLOSED_WITH_QUALIFIED_QU_BOUNDARY';
x.dispositions[0].body_roots=['q'];
x.dispositions[0].support_roots=[];
x.dispositions[0].reconstruction_path=['A','q'];
run('selected-qu-realization',finalize(x),false);

x=base();
x.nodes.push({id:'orphan',classification:'CORE_PRIMITIVE',authoritative:true,authority_owner:'CORE',children:[],source_census_ids:['A'],closure_mode:'CLOSED_PRIMITIVE',reconstruction_path:['A','orphan'],unexpanded_dependencies:[]});
run('orphan-authoritative-node',finalize(x),false);

x=base();
x.nodes[0].authoritative=false;
run('nonauthoritative-support',finalize(x),false);

x=base();
x.nodes[0].children=['missing-child'];
run('dangling-child',finalize(x),false);

x=finalize(base());
x.frozen.source_semantic_census_sha256=H('fake-census');
run('census-hash-mismatch',x,false);

x=finalize(base());
x.nodes.find(n=>n.id==='p1').reconstruction_path.push('changed-after-freeze');
run('primitive-kernel-hash-mismatch',x,false);

x=base();
x.nodes=[
 {id:'cycle-a',classification:'LOGICAL_RELATION',authoritative:true,authority_owner:'CORE',children:['cycle-b'],source_census_ids:['A'],closure_mode:'CLOSED_PRIMITIVE',reconstruction_path:['A','cycle-a','cycle-b'],unexpanded_dependencies:[]},
 {id:'cycle-b',classification:'LOGICAL_RELATION',authoritative:true,authority_owner:'CORE',children:['cycle-a'],source_census_ids:['A'],closure_mode:'CLOSED_PRIMITIVE',reconstruction_path:['A','cycle-a','cycle-b'],unexpanded_dependencies:[]},
 {id:'schema',classification:'CORE_PRIMITIVE',authoritative:true,authority_owner:'CORE',children:[],source_census_ids:['G'],closure_mode:'CLOSED_PRIMITIVE',reconstruction_path:['G','schema'],unexpanded_dependencies:[]}
];
x.dispositions=[
 {census_id:'A',closure_mode:'CLOSED_PRIMITIVE',body_roots:['cycle-a'],support_roots:[],dependency_roots:[],reconstruction_path:['A','cycle-a','cycle-b'],evidence_dispositions:['SOURCE_ASSERTED']},
 {census_id:'G',closure_mode:'CLOSED_PRIMITIVE',body_roots:['schema'],support_roots:[],dependency_roots:[],reconstruction_path:['G','schema'],evidence_dispositions:['SOURCE_ASSERTED']}
];
run('ungrounded-cycle',finalize(x),false);

x=finalize(base());
x.dispositions[0].reconstruction_path.push('not-a-node');
run('unknown-reconstruction-ref',x,false);

x=base();
x.nodes.find(n=>n.id==='p1').source_census_ids=[];
run('authoritative-without-census-link',finalize(x),false);

x=base();
x.nodes.push({id:'term-q',classification:'QUALIFIED_QU_BOUNDARY',authoritative:true,authority_owner:'QU',children:[],source_census_ids:['G'],closure_mode:'CLOSED_WITH_QUALIFIED_QU_BOUNDARY',reconstruction_path:['G','term-q'],unexpanded_dependencies:[],qu_boundary:{qualified:true,known_semantics_primitive_closed:true,selected_realization:false}});
const s=x.nodes.find(n=>n.id==='schema');
s.children.push('term-q');
s.schema.termination_status='QUALIFIED_QU_TERMINATION';
s.schema.termination_qu_nodes=['term-q'];
x.dispositions[1].reconstruction_path.push('term-q');
run('schema-qu-termination',finalize(x),true);

x=base();
x.nodes.push({id:'term-q',classification:'QUALIFIED_QU_BOUNDARY',authoritative:true,authority_owner:'QU',children:[],source_census_ids:['G'],closure_mode:'CLOSED_WITH_QUALIFIED_QU_BOUNDARY',reconstruction_path:['G','term-q'],unexpanded_dependencies:[],qu_boundary:{qualified:true,known_semantics_primitive_closed:true,selected_realization:false}});
const s2=x.nodes.find(n=>n.id==='schema');
s2.children.push('term-q');
s2.schema.termination_status='QUALIFIED_QU_TERMINATION';
s2.schema.termination_qu_nodes=[];
x.dispositions[1].reconstruction_path.push('term-q');
run('schema-qu-termination-missing-link',finalize(x),false);

fs.rmSync(dir,{recursive:true,force:true});
console.log('Core 0.21 ledger checker tests: PASS (2 positive baselines, 18 adversarial negative controls)');
