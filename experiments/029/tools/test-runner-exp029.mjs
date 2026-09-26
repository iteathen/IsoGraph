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
  'CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md',
  'experiments/029/BASELINE_AUTHORITY.md',
  'experiments/029/CORE_0_19_CASES.md',
  'experiments/029/COLD_PROMPT.md'
];

if(JSON.stringify(paths)!==JSON.stringify(expected)){
  throw new Error('unexpected cold packet manifest '+JSON.stringify(paths));
}

const forbidden=[
  'hidden/','score-exp029','test-score-exp029','test-runner-exp029',
  'AUTHORING_AUDIT','QUALIFICATION_REVIEW','experiments/029/evidence',
  'SCORE_0_4','FINAL_REPORT_0_4','oracle/','SCORING_CONTRACT',
  'AGENTS.md','README.md','STATUS.md'
];
for(const item of forbidden){
  if(paths.some(p=>p.includes(item))) throw new Error('forbidden cold input '+item);
}

if(dry.core_0_19_sha256!=='8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2'){
  throw new Error('Core 0.19 candidate hash mismatch '+dry.core_0_19_sha256);
}
if(dry.case_count!==26) throw new Error('expected 26 public cases');
if(dry.esr_predecessor!=='PASS_6_OF_6_Q7') throw new Error('ESR predecessor not pinned');
if(dry.esr_case_count!==6) throw new Error('expected six ESR-qualified predecessor cases');

fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 029 runner dry-run self-test PASS');
