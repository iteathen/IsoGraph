import fs from 'node:fs';

const MANIFEST=process.argv[2]||'research/rendering-modernization/2026-09-26/WAVE_01_MANIFEST.json';
const manifest=JSON.parse(fs.readFileSync(MANIFEST,'utf8'));

function labels(s){return [...s.matchAll(/\^(\d+)/g)].map(m=>'^'+m[1]);}
function vars(s){return [...s.matchAll(/\?(\d+)/g)].map(m=>m[1]);}
function binders(s){return [...s.matchAll(/[\\*+]\?(\d+)/g)].map(m=>m[1]);}
function balanced(s,o,c){
  let n=0,min=0;
  for(const ch of s){if(ch===o)n++;else if(ch===c)n--;min=Math.min(min,n);}
  return {balance:n,never_negative:min>=0};
}

const results=[];
for(const c of manifest.cases){
  const native=fs.readFileSync(c.native,'utf8');
  const sig=JSON.parse(fs.readFileSync(c.signature,'utf8'));
  if(!fs.existsSync(c.source_freeze))throw new Error(c.id+': source freeze missing');
  if(!fs.existsSync(c.predecessor))throw new Error(c.id+': predecessor missing');

  const h=native.match(/\(\^0\s*\[([\s\S]*?)\]\s*\)/);
  if(!h)throw new Error(c.id+': missing ^0 label declaration');
  const declared=[...new Set(labels(h[1]))].sort();
  const all=[...new Set(labels(native).filter(x=>x!=='^0'))].sort();
  const used=[...new Set(labels(native.replace(h[0],'')))].sort();
  const sigKeys=Object.keys(sig.symbols||{}).sort();
  const allVars=[...new Set(vars(native))].sort();
  const allBinders=[...new Set(binders(native))].sort();

  const obligationResults={};
  for(const [id,markers] of Object.entries(c.obligations||{})){
    const missing=markers.filter(m=>!native.includes(m));
    obligationResults[id]={pass:missing.length===0,missing};
  }

  const checks={
    parens:balanced(native,'(',')'),
    brackets:balanced(native,'[',']'),
    braces:balanced(native,'{','}'),
    declared_equals_all:JSON.stringify(declared)===JSON.stringify(all),
    signature_equals_declared:JSON.stringify(sigKeys)===JSON.stringify(declared),
    all_declared_used:declared.every(x=>used.includes(x)),
    all_variables_bound:allVars.every(x=>allBinders.includes(x)),
    signature_gloss_only:sig.formula_bodies_in_signature===false &&
      Object.values(sig.symbols||{}).every(v=>typeof v==='string'),
    predecessor_linked:typeof sig.predecessor==='string' && sig.predecessor.length>0,
    source_freeze_linked:typeof sig.source_freeze==='string' && sig.source_freeze.length>0,
    obligations_present:Object.values(obligationResults).every(x=>x.pass)
  };

  const structural=Object.values(checks).every(v=>
    typeof v==='object' ? v.balance===0&&v.never_negative : v===true
  );
  results.push({
    id:c.id,
    pass:structural,
    native:c.native,
    signature:c.signature,
    declared_count:declared.length,
    variables:allVars,
    binders:allBinders,
    checks,
    obligations:obligationResults
  });
}
const report={
  schema:1,
  manifest:MANIFEST,
  disposition:results.every(x=>x.pass)?'PASS':'FAIL',
  results
};
console.log(JSON.stringify(report,null,2));
if(report.disposition!=='PASS')process.exit(2);
