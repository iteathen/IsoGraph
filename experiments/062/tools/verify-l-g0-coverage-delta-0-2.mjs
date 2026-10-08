import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const oldPath=L+'L_G0_FULL_TRACK_AUDIT_COVERAGE_0_1.json';
const deltaPath=L+'L_G0_FULL_TRACK_AUDIT_COVERAGE_DELTA_0_2.json';
const srcPath=L+'SOURCE_SEMANTIC_CENSUS_0_16.json';
const gatePath=E+'L_CURRENT_STAGE_GATE_0_17.json';
const ownVerifier=E+'tools/verify-l-g0-coverage-delta-0-2.mjs',ownWorkflow='.github/workflows/experiment-062-l-g0-coverage-delta-0-2.yml';
const old=JSON.parse(fs.readFileSync(oldPath,'utf8')),D=JSON.parse(fs.readFileSync(deltaPath,'utf8'));
const S=JSON.parse(fs.readFileSync(srcPath,'utf8')),G=JSON.parse(fs.readFileSync(gatePath,'utf8'));
const j=JSON.stringify,copy=x=>JSON.parse(j(x));
const blob=b=>crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
const gitSha=p=>blob(fs.readFileSync(p));
const selectors={
 L_RESEARCH:name=>true,
 SHARED_SUPPORT:name=>true,
 L_CAMPAIGN:name=>/^(L_|LISI|L\d|OWNER_EXTERNAL_VERIFICATION_BYPASS|G1_OWNER_COLD_AUDIT_WAIVER|G0_|CURRENT_G1|SOURCE_DEMAND)/i.test(name),
 L_TOOLS:name=>/l[_-]|lisi|L0[1-6]|L12[5-9]|L13[0-9]|woit-lisi-si/i.test(name),
 L_WORKFLOWS:name=>/^experiment-062-l|^experiment-062-lisi|^experiment-062-woit-lisi-si|^experiment-062-current-g1|^research-primitive-demand|^experiment-062-l05|^experiment-062-l127/i.test(name)
};
const omit=new Set([deltaPath,ownVerifier,ownWorkflow]);
const actual=new Map(),groups={},scoped={};
let lines=0,bytes=0,parsedJson=0,checkedJS=0;
const semanticErrors=[];
for(const group of old.directories){
 const entries=fs.readdirSync(group.dir).filter(name=>fs.statSync(path.posix.join(group.dir,name)).isFile()&&selectors[group.label](name)&&!omit.has(path.posix.join(group.dir,name)));
 const paths=entries.map(name=>path.posix.join(group.dir,name)).sort();
 groups[group.label]=paths;
 scoped[group.label]=paths.length;
 for(const p of paths){
  const data=fs.readFileSync(p),ext=path.extname(p),str=data.toString('utf8');
  const n=str.length?str.split('\n').length-(str.endsWith('\n')?1:0):0;
  lines+=n;bytes+=data.length;
  actual.set(p,{path:p,sha:blob(data),bytes:data.length,group:group.label});
  if(ext==='.json'){
   parsedJson++;
   try{JSON.parse(str)}catch(err){semanticErrors.push('Invalid JSON '+p+' '+String(err).slice(0,100))}
  }
  if(ext==='.mjs'){
   checkedJS++;
   const r=spawnSync(process.execPath,['--check',p],{encoding:'utf8',timeout:12000});
   if(r.status!==0)semanticErrors.push('JavaScript syntax failure '+p+' '+(r.stderr||r.error||'unknown').toString().slice(0,110));
  }
 }
}
const before=new Map(old.directories.flatMap(g=>g.selected.map(x=>[x.path,x])));
const newPaths=[...actual.values()].filter(x=>!before.has(x.path)).sort((a,b)=>a.path.localeCompare(b.path));
const changed=[...actual.values()].filter(x=>before.has(x.path)&&(before.get(x.path).sha!==x.sha||before.get(x.path).bytes!==x.bytes))
 .sort((a,b)=>a.path.localeCompare(b.path)).map(x=>({...x,previous_sha:before.get(x.path).sha,previous_bytes:before.get(x.path).bytes}));
const disappeared=[...before.keys()].filter(x=>!actual.has(x)).sort();
function verify(d=D){
 const errs=[],ck=(v,s)=>{if(!v)errs.push(s)};
 ck(d.schema==='isograph.exp062-l-audit-inventory-successor-delta.v0.2'&&d.track==='L'&&d.authority===false&&d.status.includes('MECHANICAL_ONLY'),'mechanical evidence not semantic authority');
 ck(d.capture?.previous_manifest_path===oldPath&&d.capture?.previous_manifest_git_blob_sha===gitSha(oldPath),'exact pinned prior HEAD manifest');
 ck(d.capture?.source_census_path===srcPath&&d.capture?.source_census_git_blob_sha===gitSha(srcPath)&&d.capture?.gate_path===gatePath,'exact 0.16 source/0.17 gate');
 ck(d.capture?.previous_head===old.captured_HEAD&&d.count?.previous===old.record_count&&d.count?.previous===1191,'old 1191 immutable history');
 ck(d.capture?.head==='35f47c2c967bbe1c11b16275246fb261237d145c'&&d.capture?.previous_workflow_id===37846189663,'historical HEAD exact, not current GH commit');
 ck(d.count?.current===actual.size&&d.count?.current===1204&&d.count?.added===newPaths.length&&d.count?.changed===changed.length&&d.count?.removed===disappeared.length&&d.count?.unchanged===actual.size-newPaths.length-changed.length,'every current scoped file accounted exactly');
 ck(disappeared.length===0,'no files disappeared silently');
 ck(j(d.exact_added_files)===j(newPaths)&&j(d.exact_changed_files)===j(changed)&&j(d.exact_removed_files)===j(disappeared),'exact literal path/blob/size prior-to-current delta');
 ck(j(d.inventory_rules?.excluded_future_files)===j([deltaPath,ownVerifier,ownWorkflow]),'only future self-referential files excluded');
 ck(d.inventory_rules?.selectors_literal_version==='MATCH_ORIGINAL_V0_1'&&d.inventory_rules?.old_manifest_is_snapshot===true,'old scoped source not reinterpreted');
 for(const group of old.directories){
  const x=d.group_summary?.[group.label];
  ck(x?.count===groups[group.label].length&&x?.original===group.selected.length,'all current files in '+group.label);
 }
 ck(d.count?.source_items_current===191&&d.count?.source_items_with_detailed_expression===9&&d.count?.source_item_semantic_cold_review_passes===0,'191 source obligations, 9 selected expansions, NO full cold audit');
 ck(S.items.length===191&&S.schema==='woit-lisi.track-l.source-semantic-census.v0.16'&&S.guards.source_census_freeze_complete===false&&G.current_lawful_state.G1_authorized===false,'current G0 source still incomplete');
 ck(d.per_source_item_current?.length===191,'no missing source census identity in delta');
 const changedItems=[];
 for(let i=0;i<191;i++){
  const item=S.items[i],prior=old.per_source_assertion_coverage[i],m=d.per_source_item_current?.[i]||{};
  ck(item.id===m.id&&m.id===prior.id,'source ID conserved '+(i+1));
  ck(m.source_provenance===item.source_provenance&&m.body_chars===item.body.length&&m.previous_body_chars===prior.body_chars,'individual source provenance and exact text length '+item.id);
  ck(m.source_expression_detail===!!item.source_expression_census&&m.previous_source_expression_detail===prior.source_expression_detail,'source expression coverage '+item.id);
  ck(m.source_cold_line_by_line_complete===false,'no false cold review '+item.id);
  if(item.body.length!==prior.body_chars||!!item.source_expression_census!==prior.source_expression_detail||item.source_provenance!==prior.source)changedItems.push(item.id);
 }
 ck(j(changedItems)===j(['L-SSC-133'])&&j(d.source_item_diffs_from_previous_manifest.map(x=>x.id))===j(changedItems),'only source L133 changed since prior audit coverage checkpoint');
 ck(d.inventory_rules?.semantic_review?.includes('Byte and syntax checks are mechanical only'),'source authority boundary');
 ck(d.inventory_rules?.current_stage==='G0_SOURCE_UNFROZEN_G1_TO_G7_NOT_AUTHORIZED'&&d.inventory_rules?.owner_external_verification==='WAIVED_THIRD_PARTY_CALLS_ONLY_NOT_A_PASS','G-stage order and review bypass');
 ck(d.open_source_semantics?.length===4&&d.open_source_semantics.some(x=>x.includes('L01–L06'))&&d.open_source_semantics.some(x=>x.includes('t/t²')),'all source-open deficits visible');
 ck(d.evidence?.initial_inventory_CI?.run_id===37846189663&&d.evidence?.eq17_source_CI?.id===37846801752&&d.evidence?.SSC016_CI?.id===37847116335&&d.evidence?.stage017_CI?.id===37847527623,'historical CI pins not reinvented');
 ck(!j(d).includes('W-SSC-')&&d.PR===70&&d.branch==='research/woit-lisi-isomorph-20261003','track independence');
 return errs;
}
const baseline=[...semanticErrors,...verify()],errors=[...baseline];
const mutants=[
 ['omit added source Eq17 file',x=>{x.exact_added_files=x.exact_added_files.filter(y=>!y.path.includes('LISI_L05_F4_EQ17_SOURCE'))}],
 ['drop added source SSC0.16',x=>{x.exact_added_files=x.exact_added_files.filter(y=>!y.path.includes('SOURCE_SEMANTIC_CENSUS_0_16'))}],
 ['alter current README blob',x=>{x.exact_changed_files[0].sha='bad'}],
 ['redeclare old manifest current HEAD',x=>{x.capture.head='latest'}],
 ['omit old source pin',x=>{x.capture.previous_manifest_git_blob_sha='wrong'}],
 ['omit source SSC pin',x=>{x.capture.source_census_git_blob_sha='wrong'}],
 ['fake source full cold audit',x=>{x.count.source_item_semantic_cold_review_passes=191}],
 ['fake all source items detail expanded',x=>{x.count.source_items_with_detailed_expression=191}],
 ['relabel stage G1',x=>{x.inventory_rules.current_stage='G1_SOURCE_CLOSED'}],
 ['fabricate external audit',x=>{x.inventory_rules.owner_external_verification='EXTERNAL_PASS'}],
 ['erase source L133 change',x=>{x.source_item_diffs_from_previous_manifest=[]}],
 ['mutate source item 126',x=>{x.per_source_item_current[125].body_chars=0}],
 ['erase source item 133',x=>{x.per_source_item_current=x.per_source_item_current.filter(z=>z.id!=='L-SSC-133')}],
 ['omit shared support group',x=>{delete x.group_summary.SHARED_SUPPORT}],
 ['invent removed path',x=>{x.exact_removed_files.push('research/woit-lisi-isomorph/lisi/README.md')}],
 ['misstate excluded paths',x=>{x.inventory_rules.excluded_future_files=[]}],
 ['change CI run',x=>{x.evidence.stage017_CI.id=0}],
 ['smuggle cross-source',x=>{x.open_source_semantics[0]+=' W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [label,fn]of mutants){
 const x=copy(D),before=j(x);fn(x);
 if(j(x)===before)errors.push('NOOP '+label);
 else if(verify(x).length===0)errors.push('ESCAPED '+label);
 else rejected++;
}
console.log(JSON.stringify({schema:'isograph.exp062-l-audit-inventory-delta-replay.v0.2',pass:errors.length===0,
 errors:errors.slice(0,28),error_count:errors.length,manifest_prior_files:1191,current_file_set:actual.size,new_files:newPaths.length,changed_files:changed.length,
 source_items:191,source_items_fully_cold_audited:0,expression_details:9,
 total_current_line_records_mechanically_read:lines,total_current_bytes_mechanically_hashed:bytes,
 current_json_parsed:parsedJson,current_mjs_syntax_checked:checkedJS,
 adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',
 source_semantic_audit_complete:false,G1_authorized:false,external_verification_passed:false},null,2));if(errors.length)process.exitCode=1;
