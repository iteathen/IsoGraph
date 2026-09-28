import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp048');
fs.rmSync(OUT,{recursive:true,force:true});

const env={...process.env,GITHUB_SHA:'HEAD',ISOGRAPH_COLD_DRY_RUN:'1'};
const run=spawnSync(process.execPath,['experiments/048/tools/run-exp048-cold.mjs'],{cwd:ROOT,env,encoding:'utf8'});
if(run.status!==0) throw new Error('Experiment 048 dry runner failed: '+run.stdout+run.stderr);

const dry=JSON.parse(fs.readFileSync(path.join(OUT,'DRY_RUN.json'),'utf8'));
const paths=dry.input_manifest.map(x=>x.path);
const expected=[
  'CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md',
  'CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md',
  'CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md',
  'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md',
  'CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md',
  'experiments/048/BASELINE_AUTHORITY.md',
  'experiments/048/CORE_0_20_CASES.md',
  'experiments/048/PUBLIC_OUTPUT_SCHEMA.json',
  'experiments/048/COLD_PROMPT.md'
];
if(JSON.stringify(paths)!==JSON.stringify(expected)) throw new Error('unexpected packet manifest '+JSON.stringify(paths));
for(const item of ['hidden/','score-exp048','test-score-exp048','test-runner-exp048','AUTHORING_AUDIT','QUALIFICATION_REVIEW','evidence','AGENTS.md','README.md','STATUS.md']){
  if(paths.some(p=>p.includes(item))) throw new Error('forbidden cold input '+item);
}
if(dry.case_count!==18) throw new Error('expected 18 cases');
if(!/^[0-9a-f]{64}$/.test(dry.core_0_20_sha256)) throw new Error('candidate SHA-256 missing');

fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 048 runner self-test PASS');
