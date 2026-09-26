import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp029');
fs.rmSync(OUT,{recursive:true,force:true});

const env={...process.env,GITHUB_SHA:'HEAD',ISOGRAPH_COLD_DRY_RUN:'1'};
const run=spawnSync(process.execPath,['experiments/029/tools/run-exp029-cold.mjs'],{cwd:ROOT,env,encoding:'utf8'});
if(run.status!==0) throw new Error('Experiment 029 dry runner failed: '+run.stdout+run.stderr);

const dry=JSON.parse(fs.readFileSync(path.join(OUT,'DRY_RUN.json'),'utf8'));
const paths=dry.input_manifest.map(item=>item.path);
const expected=[
  'CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md',
  'CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md',
  'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md',
  'CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md',
  'experiments/029/BASELINE_AUTHORITY.md',
  'experiments/029/CORE_0_19_CASES.md',
  'experiments/029/COLD_PROMPT.md'
];

if(JSON.stringify(paths)!==JSON.stringify(expected)){
  throw new Error('unexpected cold packet manifest '+JSON.stringify(paths));
}

const forbidden=[
  'experiments/029/hidden/','score-exp029','test-score-exp029','test-runner-exp029',
  'QUALIFICATION_REVIEW','AUTHORING_AUDIT','experiments/029/evidence',
  'translation-v2/evidence','translation-v2/hidden','oracle/','SCORING_CONTRACT',
  'AGENTS.md','README.md','STATUS.md'
];
for(const item of forbidden){
  if(paths.some(p=>p.includes(item))) throw new Error('forbidden cold input '+item);
}

if(dry.core_0_19_blob_sha!=='ae482dda774456a855af942dc8d15fcfd5aae0bb'){
  throw new Error('Core 0.19 blob mismatch '+dry.core_0_19_blob_sha);
}
if(dry.core_0_17_blob_sha!=='fb47f8de1bd70d6f9fe1d4cf5181a52018ce8e04'){
  throw new Error('Core 0.17 blob mismatch '+dry.core_0_17_blob_sha);
}
if(dry.case_count!==24) throw new Error('expected 24 public cases');
if(dry.esr_predecessor_status!=='PASS_6_OF_6_Q7') throw new Error('ESR predecessor not pinned');

fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 029 runner dry-run self-test PASS');
