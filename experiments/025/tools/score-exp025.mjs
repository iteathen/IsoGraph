import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp025');
const rp=path.join(OUT,'PARSED_REPORT.json');
const cp=path.join(ROOT,'experiments','025','hidden','CONTROLS.json');
const sp=path.join(OUT,'SCORE.json');

if(!fs.existsSync(rp)||!fs.existsSync(cp)){
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(sp,JSON.stringify({experiment:'025',disposition:'INFRASTRUCTURE_FAILURE'},null,2)+'\n');
  process.exit(1);
}

const report=JSON.parse(fs.readFileSync(rp,'utf8'));
const controls=JSON.parse(fs.readFileSync(cp,'utf8'));
const a=report?.assessment??{};
const errors=[];

if(!controls.allowed_status.includes(a.status)) errors.push('invalid assessment status');
if(!controls.allowed_ti_consequence.includes(a.ti_consequence)) errors.push('invalid TI consequence');

const regions=Array.isArray(a.qu_regions)?a.qu_regions:[];
const byRef=new Map(regions.map(x=>[x?.qu_ref,x]));
for(const ref of controls.required_qu_refs){
  const item=byRef.get(ref);
  if(!item){
    errors.push('missing QU region '+ref);
    continue;
  }
  if(!['LOAD_BEARING','PROJECTED','UNCLEAR'].includes(item.view_treatment)) errors.push('invalid view treatment '+ref);
  if(typeof item.owning_region!=='string'||!item.owning_region.trim()) errors.push('missing owning region '+ref);
  if(typeof item.reason!=='string'||item.reason.trim().length<12) errors.push('weak QU reason '+ref);
}
if(byRef.size!==controls.required_qu_refs.length) errors.push('unexpected or duplicate QU region coverage');

const realizations=Array.isArray(a.considered_realizations)?[...new Set(a.considered_realizations)].sort():[];
const required=[...controls.required_realizations].sort();
if(JSON.stringify(realizations)!==JSON.stringify(required)) errors.push('realization coverage mismatch');

if(typeof a.can_any_admissible_realization_change_load_bearing_projection!=='boolean') errors.push('load-bearing realization effect must be boolean');
if(!Array.isArray(a.residuals)) errors.push('residuals must be array');
if(!Array.isArray(a.falsifiers)||a.falsifiers.length<controls.minimum_falsifiers) errors.push('missing falsifier');
if(typeof a.reason!=='string'||a.reason.trim().length<40) errors.push('assessment reason too weak');

const audit=report?.self_audit??{};
for(const [field,expected] of Object.entries(controls.required_self_audit)){
  if(audit[field]!==expected) errors.push('self_audit '+field+' mismatch');
}

const score={
  experiment:'025',
  disposition:errors.length===0?'PASSES':'DOES_NOT_PASS',
  methodology_guards_pass:errors.length===0,
  errors,
  semantic_status:a.status??null,
  ti_consequence:a.ti_consequence??null,
  can_any_admissible_realization_change_load_bearing_projection:a.can_any_admissible_realization_change_load_bearing_projection??null
};

fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(sp,JSON.stringify(score,null,2)+'\n');
console.log(JSON.stringify(score,null,2));
if(errors.length) process.exitCode=2;
