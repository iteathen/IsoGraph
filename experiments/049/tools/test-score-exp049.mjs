import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const ROOT=process.cwd(),OUT=path.join(ROOT,'out','exp049');
const assertions=JSON.parse(fs.readFileSync(path.join(ROOT,'experiments','049','hidden','ASSERTIONS.json'),'utf8'));
function report(){
 return {cases:assertions.required_case_ids.map(id=>({case_id:id,answers:structuredClone(assertions.cases[id].answers),reason:'Synthetic deterministic DP 0.8 scorer explanation.',authority_used:['DP 0.8 candidate']})),module_assessment:{dp_0_8:'SUPPORTED'},self_audit:{...assertions.required_self_audit}};
}
function run(r){
 fs.rmSync(OUT,{recursive:true,force:true});fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'PARSED_REPORT.json'),JSON.stringify(r,null,2)+'\n');
 return spawnSync(process.execPath,['experiments/049/tools/score-exp049.mjs'],{cwd:ROOT,encoding:'utf8'});
}
let x=run(report()); if(x.status!==0) throw new Error('perfect report failed '+x.stdout+x.stderr);
let r=report();r.cases.find(x=>x.case_id==='D03').answers.discovery_disposition='NO_STRUCTURAL_LEAD';x=run(r);if(x.status===0)throw new Error('dual-disposition error not rejected');
r=report();r.cases.find(x=>x.case_id==='D09').answers.trusted_reference_privileged=true;x=run(r);if(x.status===0)throw new Error('trusted-reference privilege not rejected');
r=report();r.cases.find(x=>x.case_id==='D14').answers.nei_same_established=true;x=run(r);if(x.status===0)throw new Error('identity overreach not rejected');
r=report();r.self_audit.kept_repair_and_discovery_dispositions_independent=false;x=run(r);if(x.status===0)throw new Error('self-audit failure not rejected');
fs.rmSync(OUT,{recursive:true,force:true});
console.log('Experiment 049 scorer self-test PASS');
