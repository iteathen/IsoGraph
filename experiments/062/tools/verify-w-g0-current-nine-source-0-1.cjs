#!/usr/bin/env node
'use strict';
// CURRENT 2026-10-11 W-only scope, NOT retrospective October-03 qualification.
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitSha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const src='experiments/062/';
const indexPath=src+'W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json';
const M=read(indexPath);
const base={
 SSC:['research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947'],
 F:[src+'W_G0_FINITE_BIDIRECTIONAL_CONVERGENCE_0_9.json','6218ba14b5c9c222e897f74600fc000b41436729'],
 W03:[src+'W03_G0_FULL_PROJECT_STATUS_REVERSE_AUDIT_0_1.json','1f4485d628ca161fdbd7c3ce81e84718ae3a7d62'],
 W04a:[src+'W04A_G0_LIVE_AUTHOR_FULL_POST_REVERSE_AUDIT_0_1.json','508bdad3b0ab4676d23758784e8bb14cb4a253a8'],
 W04b:[src+'W04B_G0_FULL_AUTHOR_POST_REVERSE_AUDIT_0_1.json','1c5b8e1bcaed4dba555711a06b8cbc35d2cffa0a'],
 W04c:[src+'W04C_G0_FULL_AUTHOR_POST_REVERSE_AUDIT_0_1.json','53bd1785921745f7bb50c0d622440b45d028e55b'],
 W04d:[src+'W04D_G0_28_SLIDE_6_POST_SOURCE_FIRST_0_1.json','41859a68f1ef1c30b56dd1040e23f56ac4e8c525'],
 W04e:[src+'W04E_G0_ALL_15PAGE_CURRENT_AUTHOR_PDF_ORIGINAL_FIRST_CONVERGENCE_0_1.json','4d5abe5ccff0149a2f72b10c3b78c73752fd6041'],
 W04e_post:[src+'W04E_G0_FULL_15PAGE_POST_AUTHOR_REPLY_SOURCE_FIRST_0_1.json','291c1a44e91dc85b8772ffa4e8bb423a4a36c4b3'],
 scope:['research/woit-lisi-isomorph/woit/W_CURRENT_AUTHOR_SOURCE_SCOPE_2026_10_11_0_1.json','86bb7d5ad55c26ea3586f2a74f1411c2a5d843c7'],
 gate:[src+'W_CURRENT_STAGE_GATE_0_131.json','dcaebb6246e1f277fb0a343eac639d24d54b5821']
};
const docs={};for(const [key,[path,sha]] of Object.entries(base)){
 assert.equal(gitSha(path),sha,'independently pinned original-source input drift '+key);
 assert.deepEqual(M.evidence_inputs[key],{path,git_blob_sha:sha});
 docs[key]=read(path);
}
const rootLock=Object.fromEntries(Object.entries(docs).map(([k,v])=>[k,JSON.stringify(v)]));
function by(unit,med,key,range,kind,load,owners,meaning){
 return {unit,medium:med,key,source_location:range,kind,load_bearing:load,
  ssc_owners:[...new Set(owners)],semantic_disposition:meaning,authored_current_source:true};
}
const extraW88=['W04E-S56-25','W04E-S56-26','W04E-S56-27','W04E-S56-29'];
function project(s){
 const out=[];
 for(const z of s.W03.line_map){
  const owners=z.source_assertion_ids.map(x=>'W-SSC-'+x.split('-')[1]);
  if(z.line===5)owners.push('W-SSC-025','W-SSC-057');
  if(z.line===8||z.line===21)owners.push('W-SSC-057');
  if(z.line===24||z.line===26)owners.push('W-SSC-058');
  out.push(by('W03','web_project_status','W03-L'+z.line,[z.line,z.line],z.role,![20,23].includes(z.line),owners,z.role));
 }
 for(const z of s.W04a.line_map)out.push(by('W04a','web_author_article','W04A-L'+z.line_start+'-'+z.line_end,[z.line_start,z.line_end],z.role,true,z.units,z.note));
 for(const z of s.W04b.line_map)out.push(by('W04b','web_author_article','W04B-L'+z.line,[z.line,z.line],z.role,true,z.census_ids,z.role));
 for(const z of s.W04c.line_map){
  const owners=z.claim_ids.map(x=>'W-SSC-'+x.split('-')[1]);
  if(z.line===25||z.line===26)owners.push('W-SSC-075');
  if([9,13,14].includes(z.line))owners.push('W-SSC-016');
  out.push(by('W04c','web_author_article','W04C-L'+z.line,[z.line,z.line],z.role,![15,16,34].includes(z.line),owners,z.role));
 }
 for(const z of s.W04d.slides)out.push(by('W04d','linked_source_PDF_28slides',z.source_location,[z.printed_slide,z.printed_slide],z.kind,z.source_to_ssc.length>0,z.source_to_ssc,z.source_first_meaning));
 for(const z of s.W04d.author_original_article)out.push(by('W04d','web_author_article',z.key,z.live_author_article_lines,z.kind,true,z.source_to_ssc,z.source_first_meaning));
 for(const z of s.W04e.original_source_to_ssc){
  const no=z.kind==='PROVENANCE'||z.kind.startsWith('NONLOAD');
  out.push(by('W04e','linked_source_PDF_15pages',z.key,z.original_pdf_text_lines,z.kind,!no,[...z.ssc_owners,...(extraW88.includes(z.key)?['W-SSC-088']:[])],z.source_disposition));
 }
 for(const z of s.W04e_post.author_original_post_and_reply)out.push(by('W04e','web_post_update_author_reply',z.key,z.original_live_html_lines,z.kind,true,z.source_to_ssc,z.kind));
 return out;
}
const expectedUnits=['W01','W02','W03','W04a','W04b','W04c','W04d','W04e','W05'];
function verify(q){
 const {m,s}=q;for(const k of Object.keys(rootLock))assert.equal(JSON.stringify(s[k]),rootLock[k],'original first evidence changed '+k);
 assert.equal(m.schema,'isograph.exp062-w-g0-nine-current-original-source-first-recalculation.v0.1');
 assert.equal(m.track,'W');assert.equal(m.semantic_authority,false);
 assert.equal(m.historical_oct03_target_open,true);
 assert.equal(m.previous_W_SSC0_70_preserved_unmodified,true);
 assert.equal(s.scope.target_id,'W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1');
 assert.equal(s.scope.original_frozen_target.retained_open,true);
 assert.equal(s.scope.original_frozen_target.no_retroactive_qualification,true);
 assert.equal(s.scope.source_scope.source_unit_count,9);
 assert.equal(s.scope.source_scope.new_source_semantic_items_added,0);
 assert.equal(s.scope.source_scope.exact_mutable_oct03_bytes_claimed_same,false);
 assert.equal(s.scope.capture_evidence.successful_attempts.length,2);
 assert.equal(s.scope.capture_evidence.semantic_author_web_fingerprints_stable,true);
 assert.equal(s.scope.capture_evidence.attached_PDF_raw_bytes_stable,true);
 assert.equal(s.scope.capture_evidence.failed_capture_0_1.disposition,'FAILURE_PDF_FORMAT_VERIFIER_DEFECT_PRESERVED');
 assert.equal(s.scope.source_scope.units.filter(x=>x.source_identity_mode==='RETRIEVED_CURRENT_AUTHOR_ARTICLE_CANONICAL_FINGERPRINT').length,6);
 assert.equal(s.scope.source_scope.attached_author_pdf_originals.length,2);
 const original=project(s);
 assert.equal(original.length,212);
 assert.deepEqual(m.source_first_current_mutable_locations,original,'mutable source-first inventory differs from original source audit');
 const records=s.SSC.items;assert.equal(records.length,151);assert.equal(new Set(records.map(x=>x.id)).size,151);
 const incidence=records.flatMap(x=>x.source_expression_census?.statements||[]);
 assert.equal(incidence.length,539);assert.equal(new Set(incidence.map(x=>x.id)).size,537);
 const originalVersioned=s.F.versioned_original_source_to_ssc;
 assert.equal(originalVersioned.length,437);
 const indexVersioned=originalVersioned.map(x=>({unit:x.unit,medium:'versioned_original_HTML',key:x.original_locator,source_location:x.html_lines,kind:x.kind,load_bearing:x.load_bearing,ssc_owners:x.ssc_ids}));
 const joined=[...indexVersioned,...m.source_first_current_mutable_locations];
 assert.equal(joined.length,649);
 const kinds=new Map(),links=new Set(),origKey=new Set(),owners=new Set();
 let load=0;
 for(const z of joined){
   assert.ok(expectedUnits.includes(z.unit));
   assert.ok(z.key&&Array.isArray(z.ssc_owners)&&Array.isArray(z.source_location)&&z.source_location.length===2);
   assert.ok(z.source_location[0]<=z.source_location[1]);
   let key=z.unit+'/'+z.medium+'/'+z.key;
   assert.ok(!origKey.has(key),'duplicate source original '+key);origKey.add(key);
   if(z.load_bearing){load++;assert.ok(z.ssc_owners.length,'load-bearing source obligation unrepresented '+key)}
   for(const id of z.ssc_owners){
     assert.ok(records.some(x=>x.id===id),'SSC owner lost '+id);
     const inv=s.F.current_ssc_to_original_or_review.find(x=>x.ssc_id===id);
     assert.equal(inv.unit,z.unit,'other track or wrong source '+key+'/'+id);
     let pair=key+'|'+id;assert.ok(!links.has(pair),'duplicate original mapping '+pair);links.add(pair);owners.add(id);
   }
   const u=kinds.get(z.unit)||{original_source_locations:0,load_bearing_locations:0,source_owner_inverse_count:0,original_to_ssc_pairs:0,mutable_original_location_count:0};
   u.original_source_locations++;u.load_bearing_locations+=Number(z.load_bearing);u.original_to_ssc_pairs+=z.ssc_owners.length;
   u.mutable_original_location_count+=Number(z.medium!=='versioned_original_HTML');
   kinds.set(z.unit,u);
 }
 assert.equal(load,463);assert.equal(owners.size,151);assert.equal(links.size,560);
 for(const [unit,stat] of kinds){stat.source_owner_inverse_count=new Set(joined.filter(x=>x.unit===unit).flatMap(x=>x.ssc_owners)).size;assert.deepEqual(m.current_source_to_ssc_denom_summary[unit],stat);}
 assert.deepEqual(Object.keys(m.current_source_to_ssc_denom_summary),expectedUnits);
 let noMember=[];
 const byID=new Map();
 for(const [i,item] of records.entries()){
   const inv=m.current_ssc_to_original_inverse[i];
   assert.equal(inv.ssc_id,item.id);
   assert.equal(inv.unit,s.F.current_ssc_to_original_or_review[i].unit);
   assert.deepEqual(inv.source_typed_statement_ids,(item.source_expression_census?.statements||[]).map(x=>x.id));
   const relevant=joined.filter(z=>z.ssc_owners.includes(item.id)).map(z=>z.unit+'/'+z.medium+'/'+z.key);
   assert.ok(relevant.length,'source not supported by original '+item.id);
   assert.deepEqual(inv.original_source_keys,relevant,'incomplete reverse index '+item.id);
   byID.set(item.id,inv);
 }
 assert.equal(m.current_ssc_to_original_inverse.length,151);
 assert.equal(m.summary.current_original_locations,649);
 assert.equal(m.summary.current_original_load_bearing_locations,463);
 assert.equal(m.summary.current_original_nonload_locations,186);
 assert.equal(m.summary.original_to_ssc_pair_count,560);
 assert.equal(m.summary.source_owners_without_original_reciprocal,0);
 assert.equal(m.summary.source_semantic_items_added,0);
 assert.equal(m.summary.typed_source_incidences,539);
 assert.equal(m.summary.distinct_typed_source_ids,537);
 assert.equal(m.summary.current_six_source_original_author_bytes_oct03_authenticated,false);
 assert.equal(m.no_W_L_synthesis??false,false); // exact documented key is no_W_L_synthesis below
 assert.equal(m.no_W_L_synthesis,true);
 assert.equal(m.no_L_semantics,true);
 const sourceW088=m.source_first_current_mutable_locations.filter(x=>x.ssc_owners.includes('W-SSC-088'));
 assert.deepEqual(sourceW088.map(x=>x.key),extraW88);
 assert.deepEqual(sourceW088.map(x=>x.source_location),[[632,633],[634,638],[639,639],[643,646]]);
 const w88=records.find(x=>x.id==='W-SSC-088').obligation;
 assert.match(w88,/right-handed spacetime/);
 assert.match(w88,/internal-SU\(2\)_L/);
 assert.match(w88,/preliminary/);
 const w127=records.find(x=>x.id==='W-SSC-127').obligation;
 assert.match(w127,/preliminary|specul|unconstruct|unfinished|potential|open|remain/i);
 assert.equal(m.source_index_corrections[0].owner,'W-SSC-088');
 assert.equal(m.source_index_corrections[0].affected_existing_SSC_item_objects_changed,0);
 assert.equal(m.source_index_corrections[1].owner,'W-SSC-025');
 assert.equal(m.source_index_corrections[2].owner,'W-SSC-075');
 assert.equal(byID.get('W-SSC-025').unit,'W03');
 assert.ok(byID.get('W-SSC-075').original_source_keys.includes('W04c/web_author_article/W04C-L25'));
 assert.ok(byID.get('W-SSC-075').original_source_keys.includes('W04c/web_author_article/W04C-L26'));
 const starts={W03:[5,27],W04a:[9,38],W04b:[9,30],W04c:[9,34]};
 for(const [u,[start,end]] of Object.entries(starts)){
  const chunk=original.filter(x=>x.unit===u);
  let pos=start;for(const z of chunk){assert.equal(z.source_location[0],pos,'source page gap/overlap '+z.key);pos=z.source_location[1]+1;}
  assert.equal(pos,end+1,'not complete current original '+u);
 }
 const slides=original.filter(x=>x.unit==='W04d'&&x.medium==='linked_source_PDF_28slides');
 assert.equal(slides.length,28);for(let i=0;i<28;i++)assert.deepEqual(slides[i].source_location,[i+1,i+1]);
 const postD=original.filter(x=>x.unit==='W04d'&&x.medium==='web_author_article');
 assert.equal(postD.length,6);let pos=11;for(const x of postD){assert.equal(x.source_location[0],pos);pos=x.source_location[1]+1;}assert.equal(pos,25);
 const pdfE=original.filter(x=>x.unit==='W04e'&&x.medium==='linked_source_PDF_15pages');
 assert.equal(pdfE.length,88);pos=0;for(const x of pdfE){assert.equal(x.source_location[0],pos,'source PDF line gap '+x.key);pos=x.source_location[1]+1;}assert.equal(pos,694);
 const postE=original.filter(x=>x.unit==='W04e'&&x.medium==='web_post_update_author_reply');
 assert.equal(postE.length,3);assert.deepEqual(postE.map(x=>x.source_location),[[11,13],[14,14],[37,39]]);
 const law=s.gate.current_lawful_state;
 assert.equal(law.G0_open,true);
 for(const f of ['G0_complete','G0_frozen','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G6_authorized','G7_authorized','Oct03_mutable_source_byte_identity_verified'])assert.equal(law[f],false);
 return {source_units:9,source_locations:649,load_bearing:463,nonload:186,reciprocal_links:560,SSC_owners:151,typed_incidences:539,typed_unique:537,new_source_semantic_items:0,W088_index_corrected:true,old_oct03_G0:'OPEN',new_target_G0:'CANDIDATE'};
}
const frozen={m:M,s:docs};const copy=x=>structuredClone(x);
const positive=verify(copy(frozen));
const attacks=[
 ['drop one new original interval',a=>a.m.source_first_current_mutable_locations.pop()],
 ['overwrite a new original interval',a=>a.m.source_first_current_mutable_locations[0].key='FRAUD'],
 ['reclassify W04e original load as nonload',a=>a.m.source_first_current_mutable_locations.find(x=>x.key==='W04E-S56-26').load_bearing=false],
 ['erase W088 primary source link',a=>a.m.source_first_current_mutable_locations.find(x=>x.key==='W04E-S56-26').ssc_owners=a.m.source_first_current_mutable_locations.find(x=>x.key==='W04E-S56-26').ssc_owners.filter(y=>y!=='W-SSC-088')],
 ['shift W088 source lines',a=>a.m.source_first_current_mutable_locations.find(x=>x.key==='W04E-S56-27').source_location[0]++],
 ['wrong W088 source unit',a=>a.m.source_first_current_mutable_locations.find(x=>x.key==='W04E-S56-27').unit='W04c'],
 ['add fake source owner',a=>a.m.source_first_current_mutable_locations.find(x=>x.key==='W04E-S56-26').ssc_owners.push('W-SSC-001')],
 ['drop W075 source role',a=>a.m.source_first_current_mutable_locations.find(x=>x.key==='W04C-L26').ssc_owners=[]],
 ['duplicate original locator',a=>a.m.source_first_current_mutable_locations[8].key=a.m.source_first_current_mutable_locations[7].key],
 ['remove versioned original source',a=>a.s.F.versioned_original_source_to_ssc.pop()],
 ['source first W03 coedit',a=>{a.s.W03.line_map[2].role='FAKE';a.m.source_first_current_mutable_locations[2].kind='FAKE'}],
 ['source first W04c coedit',a=>{a.s.W04c.line_map[11].role='FAKE';a.m.source_first_current_mutable_locations[23+16+22+11].kind='FAKE'}],
 ['lossy inverse W088',a=>a.m.current_ssc_to_original_inverse.find(x=>x.ssc_id==='W-SSC-088').original_source_keys.pop()],
 ['lossy inverse W01',a=>a.m.current_ssc_to_original_inverse[0].original_source_keys.pop()],
 ['alter typed incidence in SSC',a=>a.s.SSC.items.find(x=>x.source_expression_census?.statements?.length).source_expression_census.statements.pop()],
 ['duplicate SSC ID',a=>a.s.SSC.items[1].id=a.s.SSC.items[0].id],
 ['add one census ID',a=>a.s.SSC.items.push({...a.s.SSC.items[0],id:'W-SSC-999'})],
 ['mask old Oct03 gap',a=>a.s.scope.source_scope.exact_mutable_oct03_bytes_claimed_same=true],
 ['scope original not preserved',a=>a.s.scope.original_frozen_target.retained_open=false],
 ['false current G0 ready',a=>a.m.stage_status='G0_COMPLETE'],
 ['false G1 gate',a=>a.s.gate.current_lawful_state.G1_authorized=true],
 ['incorrect author modality',a=>a.s.SSC.items.find(x=>x.id==='W-SSC-088').obligation='WORK COMPLETED'],
 ['pretend physics proven',a=>a.s.SSC.items.find(x=>x.id==='W-SSC-127').obligation='FULLY PROVEN SOURCE THEORY'],
 ['alter live PDF author date',a=>a.s.scope.source_scope.attached_author_pdf_originals[0].sha256_raw_bytes='deadbeef'],
 ['new target loses a source',a=>a.s.scope.source_scope.source_unit_count=8],
 ['old capture failure relabeled success',a=>a.s.scope.capture_evidence.failed_capture_0_1.disposition='SUCCESS'],
 ['remove original source conservation proof',a=>a.m.evidence_inputs.W04d.git_blob_sha='wrong'],
 ['correction fabricated new SSC source item',a=>a.m.summary.source_semantic_items_added=1],
 ['source mapping false 649 count',a=>a.m.summary.current_original_locations=648]
];
let rejected=0;
for(const [name,mutate] of attacks){let c=copy(frozen);mutate(c);let caught=false;try{verify(c)}catch(err){caught=true;}assert.ok(caught,'hostile escaped: '+name);rejected++;}
console.log('W G0 ALL NINE current-source finite original-first exact reciprocal PASS '+JSON.stringify({...positive,hostile_rejections:rejected,hostiles_total:attacks.length}));
