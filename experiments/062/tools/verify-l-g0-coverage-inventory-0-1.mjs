import fs from 'node:fs';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const L='research/woit-lisi-isomorph/lisi/';
const manifestPath=L+'L_G0_FULL_TRACK_AUDIT_COVERAGE_0_1.json';
const verifierPath='experiments/062/tools/verify-l-g0-coverage-inventory-0-1.mjs';
const workflowPath='.github/workflows/experiment-062-l-g0-coverage-inventory-0-1.yml';
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const source=JSON.parse(fs.readFileSync(L+'SOURCE_SEMANTIC_CENSUS_0_15.json','utf8'));
const gate=JSON.parse(fs.readFileSync('experiments/062/L_CURRENT_STAGE_GATE_0_16.json','utf8'));
const oldTraversal=JSON.parse(fs.readFileSync(L+'SOURCE_TRAVERSAL_LEDGER_0_11.json','utf8'));
const ledger=JSON.parse(fs.readFileSync(L+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_2.json','utf8'));
const j=JSON.stringify,copy=o=>JSON.parse(j(o));
const blobSHA=b=>crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
const selectors={
 L_RESEARCH:name=>true,
 SHARED_SUPPORT:name=>true,
 L_CAMPAIGN:name=>/^(L_|LISI|L\d|OWNER_EXTERNAL_VERIFICATION_BYPASS|G1_OWNER_COLD_AUDIT_WAIVER|G0_|CURRENT_G1|SOURCE_DEMAND)/i.test(name),
 L_TOOLS:name=>/l[_-]|lisi|L0[1-6]|L12[5-9]|L13[0-9]|woit-lisi-si/i.test(name),
 L_WORKFLOWS:name=>/^experiment-062-l|^experiment-062-lisi|^experiment-062-woit-lisi-si|^experiment-062-current-g1|^research-primitive-demand|^experiment-062-l05|^experiment-062-l127/i.test(name)
};
const ex=new Set([manifestPath,verifierPath,workflowPath]);
const observed=new Map();
const actualGroups={};
const staticIssues=[],staticOK=(v,s)=>{if(!v)staticIssues.push(s)};
let sourceLines=0,syntaxChecked=0,jsonChecked=0,totalBytes=0;
for(const group of manifest.directories){
 const names=fs.readdirSync(group.dir).filter(name=>{const full=path.posix.join(group.dir,name);return fs.statSync(full).isFile()&&selectors[group.label](name)&&!ex.has(full)});
 const fileNames=names.map(name=>path.posix.join(group.dir,name)).sort();
 actualGroups[group.label]=fileNames;
 for(const pathname of fileNames){
  const bytes=fs.readFileSync(pathname),extension=path.extname(pathname),str=bytes.toString('utf8');
  const lines=(str.length===0?0:str.split('\n').length-(str.endsWith('\n')?1:0));
  observed.set(pathname,{sha:blobSHA(bytes),size:bytes.length,lines,ext:extension});
  totalBytes+=bytes.length;sourceLines+=lines;
  if(extension==='.json'){
   jsonChecked++;
   try{JSON.parse(str)}catch(e){staticIssues.push('invalid JSON '+pathname+': '+String(e).slice(0,110))}
  }
  if(extension==='.mjs'){
   syntaxChecked++;
   const check=spawnSync(process.execPath,['--check',pathname],{encoding:'utf8',timeout:12000});
   if(check.status!==0)staticIssues.push('syntax check failed '+pathname+': '+(check.stderr||check.error||'unknown').toString().slice(0,170));
  }
 }
}
function check(m=manifest){
 const errors=[],ck=(v,s)=>{if(!v)errors.push(s)};
 ck(m.schema==='isograph.exp062-l-comprehensive-inventory-and-audit-coverage.v0.1'&&m.track==='L'&&m.authority===false,'inventory is not qualified authority');
 ck(m.status==='FILE_AND_ASSERTION_SCOPE_ENUMERATION_NOT_EXHAUSTIVE_SEMANTIC_AUDIT'&&m.source_complete===false&&m.full_line_by_line_source_verified===false,'cannot represent pin coverage as semantic source completeness');
 ck(m.source_census_git_blob_sha===observed.get(L+'SOURCE_SEMANTIC_CENSUS_0_15.json')?.sha&&m.source_census===L+'SOURCE_SEMANTIC_CENSUS_0_15.json','exact current L source blob reference');
 ck(m.current_gate==='experiments/062/L_CURRENT_STAGE_GATE_0_16.json'&&gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.G0_source_census_frozen===false,'current L G0 gate only');
 ck(m.PR===70&&m.branch==='research/woit-lisi-isomorph-20261003','branch ownership');
 ck(m.rules?.external_bypass?.includes('no external test is passed')&&m.audit_deficit?.source_traversal_fixed_point==='NOT_ESTABLISHED_FOR_CURRENT_SSC0.15','explicit source and review deficit');
 ck(j(m.rules?.excluded_from_own_manifest)===j([manifestPath,verifierPath,workflowPath]),'self-reference exclusions exactly pinned');
 ck(m.directories?.length===5&&j(m.directories.map(x=>x.label))===j(['L_RESEARCH','SHARED_SUPPORT','L_CAMPAIGN','L_TOOLS','L_WORKFLOWS']),'all five required research and workflow surfaces');
 let seen=new Set(),count=0;
 for(const group of m.directories||[]){
  const names=actualGroups[group.label]||[],listed=(group.selected||[]).map(z=>z.path).sort();
  ck(j(listed)===j(names),'no missing/extra members in '+group.label);
  ck(m.directory_counts?.[group.label]===group.selected?.length&&group.directory_total_files>=group.selected?.length,'captured exact directory file cardinality '+group.label);
  for(const info of group.selected||[]){
   count++;
   if(seen.has(info.path))errors.push('duplicate pinned path '+info.path);
   seen.add(info.path);
   const v=observed.get(info.path);
   ck(Boolean(v),'file still exists '+info.path);
   if(v){ck(info.sha===v.sha,'wrong blob SHA '+info.path);ck(info.bytes===v.size,'wrong file byte size '+info.path);}
   ck(typeof info.audit_classification==='string'&&info.audit_classification!=='SEMANTIC_COMPLETE','file review must distinguish mechanical from semantic '+info.path);
  }
 }
 ck(count===m.record_count&&count===1191&&seen.size===count,'every originally enumerated 1191 file unique');
 const items=m.per_source_assertion_coverage||[],ids=source.items||[];
 ck(items.length===191&&ids.length===191&&m.assertion_count===191&&m.assertion_detail_count===9,'full 191 source identity mechanical enumeration');
 const distinct=new Set();
 for(let ix=0;ix<191;ix++){
  const item=items[ix]||{},src=ids[ix]||{},expected='L-SSC-'+String(ix+1).padStart(3,'0');
  ck(item.id===expected&&item.id===src.id,'source identity/order preserved '+ix);
  if(distinct.has(item.id))errors.push('repeated source identity '+item.id);
  distinct.add(item.id);
  ck(item.source===src.source_provenance&&item.body_chars===src.body?.length&&item.kind===src.kind&&item.source_disposition_hint===src.source_disposition_hint&&item.representation_closure===src.representation_closure,'all source item fields exact for '+item.id);
  ck(item.source_expression_detail===Boolean(src.source_expression_census)&&item.source_cold_line_by_line_complete===false,'no falsely completed source evidence '+item.id);
  ck(item.audit_level==='PARTIAL_SELECTED_L05_SOURCE_FORMULAS_NOT_WHOLE_SOURCE'||item.audit_level==='SCHEMA_AND_ID_ONLY_PRIMARY_SOURCE_LINE_AUDIT_NOT_PERFORMED','source item review classification required '+item.id);
 }
 ck(ids.filter(x=>Boolean(x.source_expression_census)).length===9,'nine source-occurrence detail candidates, not global completeness');
 ck(oldTraversal.status==='COMPLETE_CENSUS_FROZEN'&&oldTraversal.frozen_ssc==='SOURCE_SEMANTIC_CENSUS_0_2.json'&&source.schema==='woit-lisi.track-l.source-semantic-census.v0.15','old claimed complete traversal explicitly historical scope');
 const O=ledger.basis_multiplication_tables.find(x=>x.carrier==='O');
 ck(O.entries[6][7]==='-e2'&&O.entries[7][6]==='-e2','source contradictory signed O cells preserved');
 const d=m.current_lawful_status||{};
 for(const [k,v]of Object.entries({earliest_stage:'G0',G0_complete:false,G1_to_G7_authorized:false,L_Recursive_IA_authorized:false,unification_synthesis_authorized:false,external_review_passed:false,PR_merge_authorized:false}))ck(d[k]===v,'stage routing in inventory '+k);
 ck(m.governing_negative_evidence?.length===6,'source negative and historical evidence explicitly retained');
 return errors;
}
const baseline=[...staticIssues,...check()];
const errors=[...baseline];
const mutationCases=[
 ['drop one complete-file record',m=>{m.directories[0].selected.pop()}],
 ['add duplicate path',m=>{m.directories[0].selected.push(copy(m.directories[0].selected[0]))}],
 ['change original source SHA',m=>{m.directories[0].selected.find(x=>x.path===L+'SOURCE_SEMANTIC_CENSUS_0_15.json').sha='wrong'}],
 ['edit a file byte-size pin',m=>{m.directories[0].selected[0].bytes=-1}],
 ['fake full semantic audit',m=>{m.full_line_by_line_source_verified=true}],
 ['fake source completeness',m=>{m.source_complete=true}],
 ['change source item ID',m=>{m.per_source_assertion_coverage[126].id='L-SSC-125'}],
 ['erase source item',m=>{m.per_source_assertion_coverage.pop()}],
 ['pretend cold source item review',m=>{m.per_source_assertion_coverage[0].source_cold_line_by_line_complete=true}],
 ['promote current G1',m=>{m.current_lawful_status.G1_to_G7_authorized=true}],
 ['rewrite historical traversal completion',m=>{m.audit_deficit.source_traversal_fixed_point='CURRENT_FIXED_POINT_CLOSED'}],
 ['omit shared support list',m=>{m.directories=m.directories.filter(x=>x.label!=='SHARED_SUPPORT')}],
 ['fake external audit',m=>{m.current_lawful_status.external_review_passed=true}],
 ['change exact source context',m=>{m.source_census_git_blob_sha='stale'}],
 ['alter review classification',m=>{m.directories[0].selected[0].audit_classification='SEMANTIC_COMPLETE'}],
 ['smuggle W semantic premise',m=>{m.rules.primary_source='W-SSC-103 is L authority'}]
];
let rejected=0;
if(!baseline.length){
 for(const [label,modify]of mutationCases){
  const m=copy(manifest),old=j(m);
  modify(m);
  if(old===j(m))errors.push('NO-OP hostile mutation '+label);
  else if(check(m).length===0)errors.push('ESCAPED hostile mutation '+label);
  else rejected++;
 }
}
const report={
 schema:'isograph.exp062-l-complete-inventory-line-hash-audit.v0.1',
 pass:errors.length===0,errors:errors.slice(0,35),error_count:errors.length,
 manifest_records:manifest.record_count,observed_files:observed.size,
 source_items:191,source_item_semantic_cold_passes:0,source_items_with_explicit_expression_packets:9,
 total_line_records_mechanically_read:sourceLines,total_bytes_pinned:totalBytes,
 json_documents_parsed:jsonChecked,mjs_scripts_syntax_checked:syntaxChecked,
 adversarial_defined:mutationCases.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'UNTESTED_BASELINE_FAILURE':'TESTED',
 global_source_semantic_audit_complete:false,G1_authorized:false,external_review_passed:false
};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
