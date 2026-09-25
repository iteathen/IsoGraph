import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const OUT=path.join(ROOT,'out','exp023');
const reportPath=path.join(OUT,'PARSED_REPORT.json');
const controlsPath=path.join(ROOT,'experiments','023','hidden','CONTROLS.json');
const scorePath=path.join(OUT,'SCORE.json');

if(!fs.existsSync(reportPath)||!fs.existsSync(controlsPath)){
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(scorePath,JSON.stringify({experiment:'023',disposition:'INFRASTRUCTURE_FAILURE'},null,2)+'\n');
  process.exit(1);
}

const report=JSON.parse(fs.readFileSync(reportPath,'utf8'));
const controls=JSON.parse(fs.readFileSync(controlsPath,'utf8'));
const a=report?.assessment??{};
const errors=[];

if(!controls.allowed_status.includes(a.status)) errors.push('invalid assessment status');

const coverage=Array.isArray(a.module_coverage)?[...new Set(a.module_coverage)].sort():[];
const required=[...controls.required_modules].sort();
if(JSON.stringify(coverage)!==JSON.stringify(required)) errors.push('module coverage is not exact six-module set');

if(a.surface_shape_alone_is_proof!==controls.required_false.surface_shape_alone_is_proof){
  errors.push('surface shape treated as proof');
}
if(a.refactor_source_specs_now!==controls.required_false.refactor_source_specs_now){
  errors.push('source refactor promoted prematurely');
}

if(!Array.isArray(a.common_structure)) errors.push('common_structure must be an array');
if(!Array.isArray(a.distinct_families)) errors.push('distinct_families must be an array');
if(!Array.isArray(a.falsifiers)||a.falsifiers.length<controls.minimum_falsifiers) errors.push('missing falsifier');
if(typeof a.reason!=='string'||a.reason.trim().length<controls.minimum_reason_chars) errors.push('assessment reason too weak');

if(Array.isArray(a.distinct_families)){
  for(const [i,family] of a.distinct_families.entries()){
    if(typeof family?.name!=='string'||!family.name.trim()) errors.push('family '+i+' missing name');
    if(!Array.isArray(family?.representative_barriers)) errors.push('family '+i+' representative_barriers not array');
    if(!Array.isArray(family?.residuals)) errors.push('family '+i+' residuals not array');
  }
}

const audit=report?.self_audit??{};
for(const [field,expected] of Object.entries(controls.required_self_audit)){
  if(audit[field]!==expected) errors.push('self_audit '+field+' mismatch');
}

if(!Array.isArray(report?.discoveries)) errors.push('discoveries must be an array');

const disposition=errors.length===0?'PASSES':'DOES_NOT_PASS';
const score={
  experiment:'023',
  disposition,
  methodology_guards_pass:errors.length===0,
  errors,
  discovery_status:a.status??null,
  candidate_name:a.candidate_name??null,
  module_coverage:coverage,
  family_count:Array.isArray(a.distinct_families)?a.distinct_families.length:0,
  discovery_count:Array.isArray(report?.discoveries)?report.discoveries.length:0
};

fs.mkdirSync(OUT,{recursive:true});
fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');
console.log(JSON.stringify(score,null,2));
if(disposition!=='PASSES') process.exitCode=2;
