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
  const checks={
    parens:balanced(native,'(',')'),
    brackets:balanced(native,'[',']'),
    braces:balanced(native,'{','}'),
    declared_equals_all:JSON.stringify(declared)===JSON.stringify(all),
    signature_equals_declared:JSON.stringify(signatureKeys)===JSON.stringify(declared),
    all_declared_used:declared.every(x=>used.includes(x)),
    all_variables_bound:vars.every(x=>binders.includes(x)),
    signature_gloss_only:sig.formula_bodies_in_signature===false && Object.values(sig.symbols||{}).every(v=>typeof v==='string')
  };
  const pass=Object.entries(checks).every(([k,v])=>typeof v==='object'?(v.balance===0&&v.never_negative):v===true);
  results.push({case_id:id,pass,declared_count:declared.length,used_count:used.length,variables:vars,binders,checks});
}
fs.mkdirSync(OUT,{recursive:true});
const report={schema:1,disposition:results.every(x=>x.pass)?'PASS':'FAIL',results};
fs.writeFileSync(path.join(OUT,'NATIVE_AUDIT.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(report.disposition!=='PASS')process.exit(2);
