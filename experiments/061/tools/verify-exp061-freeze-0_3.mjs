import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const path='experiments/061/FREEZE_MANIFEST_0_3.json';
if(!fs.existsSync(path))throw new Error('final freeze manifest missing: '+path);
const m=JSON.parse(fs.readFileSync(path,'utf8'));
const errors=[];
if(m.status!=='FROZEN_BEFORE_EXTERNAL_EXECUTION_FINAL')errors.push('freeze status');
if(m.experiment!=='061'||m.target!=='DNWF_0_1')errors.push('target identity');
if(m.decoder_invocations_required!==2||m.verifier_invocations_required!==1)errors.push('invocation counts');

for(const f of m.pinned_files||[]){
  let actual;
  try{actual=execFileSync('git',['rev-parse','HEAD:'+f.path],{encoding:'utf8'}).trim();}
  catch{errors.push('missing pinned path '+f.path);continue;}
  if(actual!==f.blob_sha)errors.push('blob mismatch '+f.path+' expected='+f.blob_sha+' actual='+actual);
}

const permitted=new Set(m.decoder_permitted_paths||[]);
const hidden=new Set(m.hidden_from_decoders||[]);
for(const p of permitted)if([...hidden].some(h=>h===p))errors.push('permitted/hidden overlap '+p);
const requiredPermitted=[
  'CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md',
  'CORE_SPEC_DRAFT_0_21_RENDERING_CONSERVATION_SCHEMA_CLOSURE_CANDIDATE.md',
  'research/primitive-demand-qualification/dnwf/DNWF_0_1_CANDIDATE.md',
  'research/primitive-demand-qualification/dnwf/DNWF_NATIVE_VOCAB_0_1.md',
  'research/primitive-demand-qualification/dnwf/DNWF_COLD_CASES_0_3.json',
  'experiments/061/PUBLIC_OUTPUT_SCHEMA.json',
  'research/primitive-demand-qualification/dnwf/DNWF_COLD_PROMPT_0_3.md'
];
if(JSON.stringify([...permitted])!==JSON.stringify(requiredPermitted))errors.push('decoder permitted packet changed');

const requiredHidden=[
 'research/primitive-demand-qualification/dnwf/DNWF_SOURCE_SEMANTIC_CENSUS_0_2.json',
 'research/primitive-demand-qualification/dnwf/DNWF_COLD_ORACLE_0_3.json',
 'research/primitive-demand-qualification/dnwf/DNWF_Q0_Q2_PREQUALIFICATION_AUDIT_0_1.json',
 'experiments/061/VERIFIER_PROMPT.md',
 'experiments/061/tools/score-exp061-decoders.mjs',
 'experiments/061/tools/finalize-exp061.mjs'
];
for(const p of requiredHidden)if(![...hidden].some(h=>h===p))errors.push('missing hidden firewall '+p);

const result={pass:errors.length===0,errors,pinned_files:m.pinned_files?.length||0,decoder_permitted_paths:[...permitted]};
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
