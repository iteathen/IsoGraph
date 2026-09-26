import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const MANIFEST=process.argv[2]||'research/rendering-modernization/2026-09-26/WAVE_01_MANIFEST.json';
const manifest=JSON.parse(fs.readFileSync(MANIFEST,'utf8'));


function gitBlobSha(buf){
  const header=Buffer.from('blob '+buf.length+'\\0');
  return crypto.createHash('sha1').update(header).update(buf).digest('hex');
}

if(manifest.status==='IMMUTABLE_ESR_QUALIFIED_PREDECESSORS'){
  const results=[];
  for(const c of manifest.cases||[]){
    const q=fs.readFileSync(c.qualified_path);
    const p=fs.readFileSync(c.promoted_path);
    const qsha=gitBlobSha(c.qualified_path),psha=gitBlobSha(c.promoted_path);
    const pass=qsha===c.expected_git_blob_sha &&
      psha===c.expected_git_blob_sha &&
      q.equals(p);
    results.push({
      id:c.id,
      subject:c.subject,
      pass,
      expected_git_blob_sha:c.expected_git_blob_sha,
      qualified_git_blob_sha:qsha,
      promoted_git_blob_sha:psha,
      byte_identical:q.equals(p)
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
  process.exit(0);
}

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
  if(c.source_freeze && !fs.existsSync(c.source_freeze))throw new Error(c.id+': source freeze missing');
  if(!fs.existsSync(c.predecessor))throw new Error(c.id+': predecessor missing');
  for(const dep of c.derived_from||[])if(!fs.existsSync(dep))throw new Error(c.id+': derived-from artifact missing: '+dep);

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
    predecessor_linked:(typeof sig.predecessor==='string' && sig.predecessor.length>0) || (Array.isArray(sig.predecessors) && sig.predecessors.length>0),
    provenance_linked:c.source_freeze
      ? (typeof sig.source_freeze==='string' && sig.source_freeze.length>0)
      : (Array.isArray(sig.derived_from) && sig.derived_from.length>0),
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
