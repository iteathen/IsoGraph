import fs from 'node:fs';
import path from 'node:path';

const ROOT='research/project-discovery/2026-09-25-dp07-three-positive-controls/translation-v2';
const CASES=['case-01A','case-01B','case-02A','case-02B','case-03A','case-03B'];
const OUT=process.argv[2]||'out/translation-v2-audit';

function stableLabels(s){return [...s.matchAll(/\^(\d+)/g)].map(m=>'^'+m[1]);}
function variableIds(s){return [...s.matchAll(/\?(\d+)/g)].map(m=>m[1]);}
function binderIds(s){return [...s.matchAll(/[\\*+]\?(\d+)/g)].map(m=>m[1]);}
function balanced(s,o,c){
  let n=0,min=0;
  for(const ch of s){if(ch===o)n++;else if(ch===c)n--;min=Math.min(min,n);}
  return {balance:n,never_negative:min>=0};
}

const obligations=JSON.parse(fs.readFileSync(path.join(ROOT,'hidden','OBLIGATIONS.json'),'utf8'));
const coverage=JSON.parse(fs.readFileSync(path.join(ROOT,'hidden','COVERAGE_MAP.json'),'utf8'));
const mutations=JSON.parse(fs.readFileSync(path.join(ROOT,'hidden','MUTATIONS.json'),'utf8'));

const results=[];
for(const id of CASES){
  const nativePath=path.join(ROOT,id,'NATIVE.isg');
  const sigPath=path.join(ROOT,id,'SIGNATURE.json');
  const native=fs.readFileSync(nativePath,'utf8');
  const sig=JSON.parse(fs.readFileSync(sigPath,'utf8'));
  const m=native.match(/\(\^0\s*\[([\s\S]*?)\]\s*\)/);
  if(!m) throw new Error(id+': missing ^0 signature');
  const declared=[...new Set(stableLabels(m[1]))].sort();
  const all=[...new Set(stableLabels(native).filter(x=>x!=='^0'))].sort();
  const signatureKeys=Object.keys(sig.symbols||{}).sort();
  const outside=native.replace(m[0],'');
  const used=[...new Set(stableLabels(outside))].sort();
  const vars=[...new Set(variableIds(native))].sort();
  const binders=[...new Set(binderIds(native))].sort();

  const obligationIds=(obligations.cases[id]||[]).map(x=>x.id).sort();
  const coverageIds=Object.keys(coverage.cases[id]||{}).sort();
  const coverageMissing=[];
  for(const [oid,markers] of Object.entries(coverage.cases[id]||{})){
    if(!Array.isArray(markers)||markers.length===0){
      coverageMissing.push({obligation:oid,error:'no markers'});
      continue;
    }
    const missing=markers.filter(marker=>!native.includes(marker));
    if(missing.length) coverageMissing.push({obligation:oid,missing});
  }

  const mutationChecks=[];
  for(const mut of mutations.cases[id]||[]){
    const occurrences=native.split(mut.from).length-1;
    const changed=occurrences===1 ? native.replace(mut.from,mut.to) : null;
    mutationChecks.push({
      id:mut.id,
      source_occurrences:occurrences,
      exact_single_replacement:occurrences===1,
      changed:changed!==null && changed!==native,
      changed_parse_balanced:changed!==null &&
        balanced(changed,'(',')').balance===0 && balanced(changed,'(',')').never_negative &&
        balanced(changed,'[',']').balance===0 && balanced(changed,'[',']').never_negative &&
        balanced(changed,'{','}').balance===0 && balanced(changed,'{','}').never_negative
    });
  }

  const checks={
    parens:balanced(native,'(',')'),
    brackets:balanced(native,'[',']'),
    braces:balanced(native,'{','}'),
    declared_equals_all:JSON.stringify(declared)===JSON.stringify(all),
    signature_equals_declared:JSON.stringify(signatureKeys)===JSON.stringify(declared),
    all_declared_used:declared.every(x=>used.includes(x)),
    all_variables_bound:vars.every(x=>binders.includes(x)),
    signature_gloss_only:sig.formula_bodies_in_signature===false && Object.values(sig.symbols||{}).every(v=>typeof v==='string'),
    coverage_ids_equal_obligations:JSON.stringify(obligationIds)===JSON.stringify(coverageIds),
    coverage_markers_present:coverageMissing.length===0,
    mutation_controls_present:(mutations.cases[id]||[]).length>=2,
    mutation_controls_exact:mutationChecks.every(x=>x.exact_single_replacement&&x.changed&&x.changed_parse_balanced)
  };
  const pass=Object.entries(checks).every(([k,v])=>typeof v==='object'?(v.balance===0&&v.never_negative):v===true);
  results.push({
    case_id:id,pass,declared_count:declared.length,used_count:used.length,
    variables:vars,binders,obligation_ids:obligationIds,
    coverage_missing:coverageMissing,mutation_checks:mutationChecks,checks
  });
}
fs.mkdirSync(OUT,{recursive:true});
const report={
  schema:2,
  contract:'qualification/EXACT_SOURCE_RENDERING_CONTRACT_0_1_CANDIDATE.md',
  disposition:results.every(x=>x.pass)?'PASS':'FAIL',
  results
};
fs.writeFileSync(path.join(OUT,'NATIVE_AUDIT.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(report.disposition!=='PASS')process.exit(2);
