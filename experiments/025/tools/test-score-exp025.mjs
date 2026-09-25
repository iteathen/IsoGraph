import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp025');
const controls=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','025','hidden','CONTROLS.json'),'utf8'));

fs.rmSync(OUT,{recursive:true,force:true});
fs.mkdirSync(OUT,{recursive:true});

const report={
  assessment:{
    status:'OTHER',
    qu_regions:controls.required_qu_refs.map(ref=>({
      qu_ref:ref,
      owning_region:'synthetic-region',
      view_treatment:'UNCLEAR',
      reason:'Synthetic methodology-only ownership explanation.'
    })),
    considered_realizations:[...controls.required_realizations],
    can_any_admissible_realization_change_load_bearing_projection:false,
    ti_consequence:'DOES_NOT_DETERMINE_TI',
    residuals:[],
    falsifiers:['synthetic falsifier'],
    reason:'Synthetic scorer self-test that deliberately carries no preferred semantic answer.'
  },
  self_audit:{...controls.required_self_audit}
};
const reportPath=path.join(OUT,'PARSED_REPORT.json');
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');

let run=spawnSync(process.execPath,['experiments/025/tools/score-exp025.mjs'],{cwd:ROOT,encoding:'utf8'});
if(run.status!==0) throw new Error('valid methodology report failed: '+run.stdout+run.stderr);
let score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(score.disposition!=='PASSES') throw new Error('valid methodology report disposition mismatch');

report.assessment.qu_regions.pop();
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');
run=spawnSync(process.execPath,['experiments/025/tools/score-exp025.mjs'],{cwd:ROOT,encoding:'utf8'});
score=JSON.parse(fs.readFileSync(path.join(OUT,'SCORE.json'),'utf8'));
if(run.status===0||score.disposition!=='DOES_NOT_PASS') throw new Error('missing QU region was not rejected');

fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 025 methodology scorer self-test PASS');
