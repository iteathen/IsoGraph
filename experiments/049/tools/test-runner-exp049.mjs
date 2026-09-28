import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const ROOT=process.cwd(),OUT=path.join(ROOT,'out','exp049');
fs.rmSync(OUT,{recursive:true,force:true});
const env={...process.env,GITHUB_SHA:'HEAD',ISOGRAPH_COLD_DRY_RUN:'1'};
const run=spawnSync(process.execPath,['experiments/049/tools/run-exp049-cold.mjs'],{cwd:ROOT,env,encoding:'utf8'});
if(run.status!==0) throw new Error('Experiment 049 dry runner failed: '+run.stdout+run.stderr);
const dry=JSON.parse(fs.readFileSync(path.join(OUT,'DRY_RUN.json'),'utf8'));
const paths=dry.input_manifest.map(x=>x.path);
const expected=[
 'CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md',
 'CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md',
 'extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md',
 'extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_2_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_3_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_4_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_5_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_6_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md',
 'extensions/dts/DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md',
 'extensions/discovery/DISCOVERY_PROTOCOLS_0_8_CLUE_PRESERVING_DISCREPANCY_CANDIDATE.md',
 'experiments/049/BASELINE_AUTHORITY.md',
 'experiments/049/DP_0_8_CASES.md',
 'experiments/049/PUBLIC_OUTPUT_SCHEMA.json',
 'experiments/049/COLD_PROMPT.md'
];
if(JSON.stringify(paths)!==JSON.stringify(expected)) throw new Error('unexpected manifest '+JSON.stringify(paths));
for(const bad of ['hidden/','score-exp049','test-score-exp049','test-runner-exp049','evidence','QUALIFICATION_REVIEW','AGENTS.md','README.md','STATUS.md','GLYCAN_','P_VS_NP']){
 if(paths.some(p=>p.includes(bad))) throw new Error('forbidden packet input '+bad);
}
if(dry.case_count!==24) throw new Error('expected 24 cases');
if(!/^[0-9a-f]{64}$/.test(dry.dp_0_8_sha256)) throw new Error('DP 0.8 SHA missing');
fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 049 runner self-test PASS');
