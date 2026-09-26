import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp030');
fs.rmSync(OUT,{recursive:true,force:true});

const env={...process.env,GITHUB_SHA:'HEAD',ISOGRAPH_COLD_DRY_RUN:'1'};
const run=spawnSync(process.execPath,['experiments/030/tools/run-exp030-cold.mjs'],{cwd:ROOT,env,encoding:'utf8'});
if(run.status!==0) throw new Error('dry runner failed '+run.stdout+run.stderr);

const dry=JSON.parse(fs.readFileSync(path.join(OUT,'DRY_RUN.json'),'utf8'));
const paths=dry.input_manifest.map(x=>x.path);
const expected=[
  'CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md',
  'experiments/030/CASES.md',
  'experiments/030/COLD_PROMPT.md'
];
if(JSON.stringify(paths)!==JSON.stringify(expected)) throw new Error('unexpected manifest '+JSON.stringify(paths));
if(dry.core_0_19_sha256!=='8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2') throw new Error('Core 0.19 hash mismatch');
if(dry.case_count!==2) throw new Error('case count mismatch');

const forbidden=['hidden/','ASSERTIONS','score-exp030','experiment/029/evidence','C25_CONTRACT_DIAGNOSTIC','STATUS.md','AGENTS.md','README.md'];
for(const item of forbidden){
  if(paths.some(p=>p.includes(item))) throw new Error('forbidden input '+item);
}

fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 030 runner dry-run self-test PASS');
