import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp028');
fs.rmSync(OUT,{recursive:true,force:true});

const env={...process.env,GITHUB_SHA:'HEAD',ISOGRAPH_COLD_DRY_RUN:'1'};
const run=spawnSync(process.execPath,['experiments/028/tools/run-exp028-cold.mjs'],{cwd:ROOT,env,encoding:'utf8'});
if(run.status!==0) throw new Error('Experiment 028 dry runner failed: '+run.stdout+run.stderr);

const dry=JSON.parse(fs.readFileSync(path.join(OUT,'DRY_RUN.json'),'utf8'));
const paths=dry.input_manifest.map(item=>item.path);
const expected=[
  'CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md',
  'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md',
  'extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md',
  'extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md',
  'extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md',
  'experiments/028/BASELINE_AUTHORITY.md',
  'experiments/028/DP_0_7_CASES.md',
  'experiments/028/COLD_PROMPT.md'
];

if(JSON.stringify(paths)!==JSON.stringify(expected)){
  throw new Error('unexpected cold packet manifest '+JSON.stringify(paths));
}

const forbidden=[
  'hidden/','ASSERTIONS','score-exp028','test-score-exp028','test-runner-exp028',
  'QUALIFICATION_REVIEW','AUTHORING_AUDIT','experiments/028/evidence',
  'SCORE_0_4','FINAL_REPORT_0_4','oracle/','SCORING_CONTRACT',
  'AGENTS.md','README.md','STATUS.md'
];
for(const item of forbidden){
  if(paths.some(p=>p.includes(item))) throw new Error('forbidden cold input '+item);
}

if(dry.dp_0_7_sha256!=='7b4ba0cc7b895f39212080892d13b7f0a1d7d67c41267ed44291d11c5e63a08d'){
  throw new Error('DP 0.7 candidate hash mismatch '+dry.dp_0_7_sha256);
}

if(dry.case_count!==13) throw new Error('expected 13 public cases');
if(dry.predecessor_positive_control_stage!=='PASS_3_OF_3') throw new Error('fresh target 11/17 predecessor not pinned');

fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 028 runner dry-run self-test PASS');
