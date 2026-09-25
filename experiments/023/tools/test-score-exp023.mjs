import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp023');
const controls=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','023','hidden','CONTROLS.json'),'utf8'));

fs.rmSync(OUT,{recursive:true,force:true});
fs.mkdirSync(OUT,{recursive:true});

const report={
  assessment:{
    status:'PARTIAL',
    candidate_name:'synthetic common non-collapse factor',
    module_coverage:[...controls.required_modules],
    common_structure:['synthetic common structure'],
    distinct_families:[{
      name:'synthetic family',
      representative_barriers:['CORE_0_18-B01'],
      residuals:['synthetic residual']
    }],
    falsifiers:['synthetic falsifier'],
    surface_shape_alone_is_proof:false,
    refactor_source_specs_now:false,
    reason:'Synthetic deterministic scorer self-test with sufficient methodological detail.'
  },
  discoveries:[],
  self_audit:{...controls.required_self_audit}
};

const reportPath=path.join(OUT,'PARSED_REPORT.json');
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');

let run=spawnSync(process.execPath,['experiments/023/tools/score-exp023.mjs'],{cwd:ROOT,encoding:'utf8'});
if(run.status!==0) throw new Error('perfect report failed: '+run.stdout+run.stderr);
let score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(score.disposition!=='PASSES') throw new Error('perfect report disposition mismatch');

report.assessment.surface_shape_alone_is_proof=true;
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
run=spawnSync(process.execPath,['experiments/023/tools/score-exp023.mjs'],{cwd:ROOT,encoding:'utf8'});
score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(run.status===0||score.disposition!=='DOES_NOT_PASS') throw new Error('premature surface-shape proof was not rejected');

fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 023 discovery scorer self-test PASS');
