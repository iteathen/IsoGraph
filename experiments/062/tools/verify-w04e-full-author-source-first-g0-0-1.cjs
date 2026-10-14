#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const root='experiments/062/',w='research/woit-lisi-isomorph/woit/';
const p={
 old:w+'SOURCE_SEMANTIC_CENSUS_0_63.json',
 ssc:w+'SOURCE_SEMANTIC_CENSUS_0_64.json',
 audit:root+'W04E_G0_FULL_15PAGE_POST_AUTHOR_REPLY_SOURCE_FIRST_0_1.json',
 defect:root+'W04E_G0_AUTHOR_LOCAL_QFT_CONVENTIONAL_HISTORICAL_SOURCE_DEFECT_0_1.json',
 oldreg:root+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_49.json',
 reg:root+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_50.json',
 oldcov:root+'W_G0_LINE_BY_LINE_151_COVERAGE_0_48.json',
 cov:root+'W_G0_LINE_BY_LINE_151_COVERAGE_0_49.json',
 oldinv:root+'W_G0_NINE_SOURCE_COVERAGE_STATUS_0_30.json',
 inv:root+'W_G0_NINE_SOURCE_COVERAGE_STATUS_0_31.json',
 oldgate:root+'W_CURRENT_STAGE_GATE_0_123.json',
 gate:root+'W_CURRENT_STAGE_GATE_0_124.json'
};
const read=x=>JSON.parse(fs.readFileSync(x,'utf8'));
const sha=x=>{const b=fs.readFileSync(x);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const canonical=o=>{const b=Buffer.from(JSON.stringify(o,null,2)+'\n','utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const originals=Object.fromEntries(Object.entries(p).map(([k,v])=>[k,read(v)]));
const clone=x=>structuredClone(x);
const owners=['W-SSC-021','W-SSC-022','W-SSC-082','W-SSC-083','W-SSC-084','W-SSC-085','W-SSC-086','W-SSC-087','W-SSC-088','W-SSC-121','W-SSC-122','W-SSC-123','W-SSC-124','W-SSC-125','W-SSC-126','W-SSC-127'];
const changed=['W-SSC-022','W-SSC-082','W-SSC-083'];
const typed=x=>x.items.reduce((n,z)=>n+(z.source_expression_census?.statements?.length||0),0);
const unitTyped=x=>x.items.filter(z=>z.source.startsWith('W04e')).reduce((n,z)=>n+(z.source_expression_census?.statements?.length||0),0);
function verify(x,strongOriginalFiles=true){
 const {old,ssc,audit,defect,oldreg,reg,oldcov,cov,oldinv,inv,oldgate,gate}=x;
 assert.equal(canonical(old),sha(p.old),'historic W source0.63 mutated');
 if(strongOriginalFiles){
  assert.equal(canonical(ssc),sha(p.ssc),'current successor source blob wrong');
  assert.equal(canonical(audit),sha(p.audit),'current source-first oracle byte drift');
  assert.equal(canonical(defect),sha(p.defect),'current failure mechanism byte drift');
 }
 assert.equal(old.schema,'woit.source-semantic-census.v0.63');
 assert.equal(ssc.schema,'woit.source-semantic-census.v0.64');
 assert.equal(ssc.predecessor.git_blob_sha,sha(p.old));
 assert.equal(audit.schema,'isograph.exp062-w04e-author-post-jul14-notes-and-comment-source-first.v0.1');
 assert.equal(audit.track,'W');assert.equal(audit.semantic_authority,false);
 assert.equal(audit.source.pdf_printed_date,'2026-07-14');
 assert.equal(audit.source.author_post_date,'2026-07-09');
 assert.equal(audit.source.author_comment_date,'2026-07-10');
 assert.equal(audit.source.PDF_pages_total,15);
 assert.equal(audit.source.pdf_text_all_pages_examined,true);
 assert.deepEqual(audit.source.pdf_pages_visual_spot_check,[2,7,14]);
 assert.equal(audit.source.blog_oct03_exact_raw_html_sha256,'UNVERIFIED');
 assert.equal(audit.source.pdf_oct03_exact_raw_bytes_sha256,'UNVERIFIED');
 assert.equal(audit.source.live_author_update_not_proven_present_in_exact_Oct03_bytes,true);
 assert.equal(audit.source.third_party_comments,'QUARANTINED_AS_NOT_WOIT_ORIGINAL_SOURCE_CONTENT');
 assert.equal(audit.source.initial_post_july9_before_linked_notes_july14,true);
 assert.equal(audit.pdf_pages.length,15);assert.equal(audit.author_original_post_and_reply.length,3);
 assert.equal(audit.source_native_bibliography.length,22);
 assert.deepEqual(audit.source_native_bibliography.map(z=>z.citation),Array.from({length:22},(_,i)=>i+1));
 assert.deepEqual(audit.source_native_bibliography.map(z=>z.printed_pdf_page),Array.from({length:22},(_,i)=>i<9?14:15));
 assert.ok(audit.source_native_bibliography.every(z=>z.type==='AUTHOR_SOURCE_BIBLIOGRAPHIC_IDENTITY_NOT_IMPORTED_THEOREM'));
 const srcOwners=new Set();
 let loading=0;
 for(let i=0;i<15;i++){
  const row=audit.pdf_pages[i];
  assert.equal(row.printed_pdf_page,i+1);
  assert.equal(row.zero_index_page,i);
  assert.equal(row.key,'W04E-ORIG-P'+String(i+1).padStart(2,'0'));
  assert.equal(row.source_revision,'JUL14_PRELIMINARY_PDF_NOT_OCT03_BYTE_VERIFIED');
  assert.equal(row.load_bearing,i!==14);
  if(i<14){assert.ok(row.source_to_ssc.length>0,'load-bearing source page missing disposition '+row.key);loading++;}
  else assert.equal(row.section_kind,'BIBLIOGRAPHY_ONLY');
  for(const id of row.source_to_ssc){assert.ok(owners.includes(id),'non-W04e source owner '+id);srcOwners.add(id);}
 }
 const posts=audit.author_original_post_and_reply;
 assert.deepEqual(posts.map(z=>z.original_live_html_lines),[[11,13],[14,14],[37,39]]);
 assert.deepEqual(posts.map(z=>z.key),['W04E-BLOG-01','W04E-BLOG-02','W04E-BLOG-03']);
 assert.equal(posts[2].author_response_date,'2026-07-10 12:50');
 assert.equal(posts[2].kind,'AUTHOR_JUL10_2026_COMMENT_LOCAL_4D_QFT_NOT_TOPOLOGICAL_UNFINISHED_CHIRAL_CONJUGATION');
 assert.deepEqual(posts[2].source_to_ssc,['W-SSC-022','W-SSC-021']);
 for(const row of posts){assert.equal(row.load_bearing,true);assert.ok(row.source_to_ssc.length>0);loading++;for(const id of row.source_to_ssc){assert.ok(owners.includes(id));srcOwners.add(id);}}
 assert.deepEqual([...srcOwners].sort(),owners.slice().sort(),'inverse SSC→original W04e source item missing');
 assert.equal(loading,17);
 assert.deepEqual(audit.counts,{original_PDF_pages:15,author_original_content_intervals:3,source_location_total:18,load_bearing_source_locations:17,covered_current_W04e_SSC_items:16,original_pdf_bibliography_identities:22,existing_W04e_source_items:16,old_typed_source_incidences_W04e:21,new_typed_source_incidences_expected:25,new_typed_occurrence_groups_expected:4,predecessor_genuine_underindexed_owner_records:3,other_13_W04e_current_owner_records_exact:true,source_original_Oct03_raw_bytes_authenticated:false,nine_W_original_sources_G0_closed:false});
 assert.equal(audit.closure.other_eight_W_frozen_units_not_closed_by_this,true);
 assert.equal(audit.closure.W04e_source_first_local_examination_not_all_nine_source_qualification,true);
 assert.equal(audit.closure.W04e_exact_Oct03_qualifiable,false);
 assert.equal(audit.closure.G0,'OPEN_UNFROZEN');
 assert.equal(audit.closure.G1_to_G7_authorized,false);
 assert.deepEqual(audit.confirmed_predecessor_omissions.map(z=>z.owner),changed);
 assert.equal(defect.mechanisms.length,3);
 assert.deepEqual(defect.affected,changed);
 assert.equal(defect.source_first_oracle,p.audit);
 assert.equal(defect.Oct03_historical_original_bytes_verified,false);
 assert.equal(old.items.length,151);assert.equal(ssc.items.length,151);
 assert.equal(typed(old),511);assert.equal(typed(ssc),515);
 assert.equal(unitTyped(old),21);assert.equal(unitTyped(ssc),25);
 assert.equal(ssc.correction.source_first.git_blob_sha,sha(p.audit));
 assert.equal(ssc.correction.source_fidelity_defect.git_blob_sha,sha(p.defect));
 assert.deepEqual(ssc.correction.changed_W_ids,changed);
 assert.equal(ssc.correction.unchanged_other148_source_objects_exact,true);
 assert.equal(ssc.correction.G0_frozen,false);
 assert.equal(ssc.cross_author_semantics_available,false);
 const t=ssc.items.find(z=>z.id==='W-SSC-022').source_expression_census.statements[0];
 assert.equal(t.id,'W04E-022-01');
 assert.deepEqual(t.original_live_html_lines,[37,39]);
 assert.equal(t.goal,'LOCAL_4D_QUANTUM_FIELD_THEORY');
 assert.equal(t.negative,'NOT_TRYING_TO_PRODUCE_TOPOLOGICAL_QFT');
 assert.equal(t.completion,'NOT_CONSTRUCTED_IN_GENERAL_4D');
 assert.equal(t.author_prior_art_knowledge,'AUTHOR_UNAWARE_BUT_HAS_NOT_LOOKED_HARD');
 assert.equal(t.Oct03_download_byte_identity,'UNVERIFIED');
 const w82=ssc.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements;
 assert.equal(w82.length,4);
 assert.equal(w82[2].id,'W04E-082-03');
 assert.equal(w82[2].epistemic_scope,'AUTHOR_MOTIVATION_AND_SCOPE_ASSESSMENT_NOT_UNIVERSAL_NO_GO_PROOF');
 assert.equal(w82[3].id,'W04E-082-04');
 assert.equal(w82[3].complex_scalar.negative_modes,'INDEPENDENT_b,b†');
 assert.equal(w82[3].real_scalar_restriction,'b=a_PARTICLE_ANTIPARTICLE_IDENTIFICATION');
 assert.equal(w82[3].path_integral_carrier.complex_first_order,'PHASE_SPACE_PATHS');
 assert.equal(w82[3].path_integral_carrier.real_second_order,'CONFIGURATION_SPACE_PATHS');
 const w83=ssc.items.find(z=>z.id==='W-SSC-083').source_expression_census.statements;
 assert.equal(w83.length,3);
 assert.equal(w83[2].id,'W04E-083-03');
 assert.deepEqual(w83[2].source_attributions.map(z=>z.reference),['[9]','[10]','[8]']);
 assert.ok(w83[2].negative_scope.includes('OS_DOES_NOT_EXPLICITLY_CONSTRUCT_WIGHTMAN_DISTRIBUTIONS_IN_CITED_ARGUMENT'));
 const theta=ssc.items.find(z=>z.id==='W-SSC-122').obligation;
 assert.match(theta,/BARE f/);
 const anomalous=ssc.items.find(z=>z.id==='W-SSC-082').obligation;
 assert.match(anomalous,/upper half/);
 assert.equal(reg.rows.length,151);assert.equal(cov.rows.length,151);
 for(let i=0;i<151;i++){
  const a=old.items[i],b=ssc.items[i],rr=reg.rows[i],cc=cov.rows[i];
  assert.equal(a.id,b.id);assert.equal(rr.census_id,b.id);assert.equal(cc.census_id,b.id);
  assert.equal(rr.source_body_exact,b.obligation);
  assert.equal(rr.source_expression_statement_count,(b.source_expression_census?.statements||[]).length);
  assert.equal(cc.source_expression_statement_count,(b.source_expression_census?.statements||[]).length);
  assert.equal(cc.body_length_chars,b.obligation.length);
  assert.equal(rr.historical_86_member,oldreg.rows[i].historical_86_member);
  assert.equal(rr.historical_ledger_0_19_mode,oldreg.rows[i].historical_ledger_0_19_mode);
  assert.equal(rr.historical_closure_accepted_as_current,false);
  if(!changed.includes(a.id)){
   assert.deepEqual(a,b,'other148 full historical SSC object changed');
   assert.deepEqual(rr,oldreg.rows[i],'unaffected source review register changed');
   assert.deepEqual(cc,oldcov.rows[i],'unaffected source coverage changed');
  }
 }
 assert.equal(reg.source_census.git_blob_sha,sha(p.ssc));
 assert.equal(inv.source_census.git_blob_sha,sha(p.ssc));
 assert.equal(gate.current_source_census.git_blob_sha,sha(p.ssc));
 assert.equal(gate.current_all_151_conservation_register.git_blob_sha,sha(p.reg));
 assert.equal(gate.current_source_coverage.git_blob_sha,sha(p.cov));
 assert.equal(gate.current_W_nine_source_inventory_031.git_blob_sha,sha(p.inv));
 assert.equal(gate.current_W04e_full_author_source_first.source_first.git_blob_sha,sha(p.audit));
 assert.equal(gate.current_W04e_full_author_source_first.defect.git_blob_sha,sha(p.defect));
 assert.equal(gate.supersedes.git_blob_sha,sha(p.oldgate));
 assert.deepEqual(gate.current_historical_86_member_projection,oldgate.current_historical_86_member_projection);
 assert.equal(inv.summary.structured_incidences,515);
 assert.equal(inv.units.find(z=>z.unit==='W04e').structured_incidences,25);
 assert.equal(inv.units.find(z=>z.unit==='W04e').all_original_source_assertions_reverse_qualified,false);
 assert.equal(reg.counts.source_expression_total,515);
 assert.equal(cov.counts.total_structured_source_incidents,515);
 assert.equal(gate.current_lawful_state.G0_open,true);
 for(const key of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])assert.equal(gate.current_lawful_state[key],false,'invalid stage '+key);
 return {original_author_source_slots:18,load_bearing:17,source_owner_items:16,bibliography_identities:22,census_total:151,typed_total:515,source_W04e_typed:25,other_source_objects_exact:148,G0:'OPEN'};
}
const snapshot=verify(originals);
const adversaries=[
 ['drop PDF original page',x=>x.audit.pdf_pages.pop()],
 ['wrong PDF page index',x=>x.audit.pdf_pages[9].zero_index_page=8],
 ['wrong original page owner',x=>x.audit.pdf_pages[8].source_to_ssc=['W-SSC-001']],
 ['erase semantic owner',x=>x.audit.pdf_pages[6].source_to_ssc=[]],
 ['drop original July10 author reply',x=>x.audit.author_original_post_and_reply.pop()],
 ['replace author reply with third party',x=>x.audit.author_original_post_and_reply[2].kind='THIRD_PARTY_COMMENT'],
 ['alter author reply timestamp',x=>x.audit.author_original_post_and_reply[2].author_response_date='2026-07-13'],
 ['rewrite author reply original HTML span',x=>x.audit.author_original_post_and_reply[2].original_live_html_lines=[22,32]],
 ['drop bibliography citation',x=>x.audit.source_native_bibliography.pop()],
 ['promote third party citations',x=>x.audit.source_native_bibliography[8].type='INTERNAL_AUTHORITY'],
 ['invent current source Oct03 bytes',x=>x.audit.source.blog_oct03_exact_raw_html_sha256='VERIFIED'],
 ['invent original Oct03 PDF bytes',x=>x.audit.source.pdf_oct03_exact_raw_bytes_sha256='VERIFIED'],
 ['invent whole nine G0 completion',x=>x.audit.closure.other_eight_W_frozen_units_not_closed_by_this=false],
 ['mark unauthenticated author comment frozen bytes',x=>x.audit.source.live_author_update_not_proven_present_in_exact_Oct03_bytes=false],
 ['change author PDF preliminary revision',x=>x.audit.source.pdf_printed_date='2026-07-09'],
 ['erase prior omission',x=>x.defect.affected.pop()],
 ['alter unmodified source census body',x=>x.ssc.items.find(z=>z.id==='W-SSC-127').obligation+=' FAKE'],
 ['rewrite historical SSC W022',x=>x.old.items.find(z=>z.id==='W-SSC-022').obligation+=' FAKE'],
 ['misrepresent author topological goal',x=>x.ssc.items.find(z=>z.id==='W-SSC-022').source_expression_census.statements[0].negative='TRYING_TO_BUILD_TQFT'],
 ['promote unresolved four-dimensional conjugation',x=>x.ssc.items.find(z=>z.id==='W-SSC-022').source_expression_census.statements[0].completion='SOLVED'],
 ['assert global no prior art proof',x=>x.ssc.items.find(z=>z.id==='W-SSC-022').source_expression_census.statements[0].author_prior_art_knowledge='PROVED_NOVEL'],
 ['reinterpret rigorous QFT critique as theorem',x=>x.ssc.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements[2].epistemic_scope='UNIVERSAL_NO_GO_THEOREM'],
 ['erase complex antiparticle operator',x=>x.ssc.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements[3].complex_scalar.negative_modes='a,a†'],
 ['confuse phase with configuration path integral',x=>x.ssc.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements[3].path_integral_carrier.complex_first_order='CONFIGURATION_SPACE_PATHS'],
 ['erase OS citation [10]',x=>x.ssc.items.find(z=>z.id==='W-SSC-083').source_expression_census.statements[2].source_attributions[1].reference='NONE'],
 ['claim OS constructs Wightman directly',x=>x.ssc.items.find(z=>z.id==='W-SSC-083').source_expression_census.statements[2].negative_scope=[]],
 ['replace original Theta bare f misprint',x=>x.ssc.items.find(z=>z.id==='W-SSC-122').obligation='Theta(lambda f)=conj(lambda) Theta f'],
 ['drop source to SSC review row',x=>x.cov.rows.pop()],
 ['wrong other source body review',x=>x.reg.rows.find(z=>z.census_id==='W-SSC-020').source_body_exact='ALTERED'],
 ['change historical W86 roster',x=>x.reg.rows.find(z=>z.census_id==='W-SSC-022').historical_86_member=!x.reg.rows.find(z=>z.census_id==='W-SSC-022').historical_86_member],
 ['fake G0 complete',x=>x.gate.current_lawful_state.G0_complete=true],
 ['fake G0 frozen',x=>x.gate.current_lawful_state.G0_frozen=true],
 ['premature G1',x=>x.gate.current_lawful_state.G1_authorized=true],
 ['cross track semantics leaked',x=>x.gate.current_lawful_state.cross_track_synthesis_authorized=true],
 ['override stage SSC digest',x=>x.gate.current_source_census.git_blob_sha='WRONG'],
 ['delete one source typed occurrence',x=>x.ssc.items.find(z=>z.id==='W-SSC-082').source_expression_census.statements.pop()]
];
let rejected=0;
for(const [name,mutate] of adversaries){
 const x=clone(originals);
 mutate(x);
 if(JSON.stringify(x)===JSON.stringify(originals))throw Error('INERT_HOSTILE_MUTATION '+name);
 try{verify(x,false);}catch(e){rejected++;continue;}
 throw Error('HOSTILE_ESCAPED '+name);
}
assert.equal(rejected,adversaries.length);
console.log('W04e author PDF+post/reply original source-first G0 PASS '+JSON.stringify(snapshot));
console.log('Adversarial original W source conditions correctly rejected '+rejected+'/'+adversaries.length+'. Historical Oct03 mutable source bytes and full nine-W G0 remain OPEN.');
