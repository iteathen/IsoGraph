#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const manifestPath='experiments/062/W01_G0_FULL_ORIGINAL_SOURCE_BIDIRECTIONAL_0_1.json';
const failedPath='experiments/062/W01_G0_FULL_SOURCE_INVERSE_V01_FAILED_NODE_0_1.json';
const failed2Path='experiments/062/W01_G0_FULL_SOURCE_INVERSE_V02_FAILED_HOSTILE_0_1.json';
const registerPath='experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_48.json';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitSha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const shallowHash=o=>{const b=Buffer.from(JSON.stringify(o,null,2)+'\n','utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const meta=read(manifestPath);
const failed=read(failedPath);
const failed2=read(failed2Path);
const shaCanonical=o=>{const b=Buffer.from(JSON.stringify(o,null,2)+'\n','utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
docs.register=read(registerPath);
const docs={ssc:read(meta.current_source_census.path),review:read(meta.current_151_reverse_review.path),gate:read(meta.current_G0_stage.path)};
for(const [k,v] of Object.entries(meta.scoped_original_evidence))docs[k]=read(v.path);
const clone=x=>structuredClone(x);
const scopes={
 abs:['original_source_assertion_inventory','line',null,'claim'],
 intro:['source_first_assertion_inventory','html_lines',null,'claim'],
 introB:['original_source_first_assertions','line',null,'claim'],
 s23:['partitions','html_lines','ssc_owners','source_first_disposition'],
 s46:['original_locations','original_html','ssc_source_owners','source_fidelity_disposition'],
 a1:['source_locations','source_lines','ssc_owners','meaning'],
 a2:['source_locations','html_span','SSC_owners','source_first_disposition'],
 a3:['locations','html','ssc_owners','source_semantic_disposition'],
 bc:['original_author_BC_disjoint_intervals','html_lines','SSC_owners','original_source_disposition']
};
const mapHeadings=new Map([[49,53],[59,59],[386,387],[1156,1156]]);
function verify(m,d,f,f2){
 assert.equal(f2.schema,'isograph.exp062-w01-full-inverse-v02-hostile-escape.v0.1');
 assert.equal(f2.track,'W');assert.equal(f2.run_id,38074335183);
 assert.equal(f2.commit,'65fe60604085affacd5e90e80b21c0c0ee1b38ab');
 assert.equal(f2.qualification,'FAILED_UNQUALIFIED');
 assert.equal(f2.positive_baseline,true);
 assert.equal(f2.adversarial_controls_completed,false);
 assert.equal(f2.escaped_mutant,'change SSC W006 source meaning');
 assert.equal(f2.predecessor_checker_blob_sha,'90f70db11f1d698f50a9706c4850d318baa579e4');
 assert.equal(f2.original_source_changed,false);
 assert.equal(f2.current_SSC_changed_in_repository,false);
 assert.equal(f.schema,'isograph.exp062-w01-full-inverse-v01-ci-failure.v0.1');
 assert.equal(f.track,'W');
 assert.equal(f.run_id,38074190955);
 assert.equal(f.commit,'8da0244e9253871885b902cbca747c4e4deb6e19');
 assert.equal(f.qualification,'FAILED_UNQUALIFIED');
 assert.equal(f.positive_baseline,false);
 assert.equal(f.adversarial_controls_executed,false);
 assert.equal(f.predecessor_checker_blob_sha,'b13b25594e6fcac5e61ec043c1da17684401ebf3');
 assert.equal(f.source_census_changed,false);
 assert.equal(f.ledger_changed,false);
 assert.equal(m.schema,'isograph.exp062-w01-v2-original-source-full-bidirectional-reverse.v0.1');
 assert.equal(m.track,'W');assert.equal(m.semantic_authority,false);
 assert.equal(m.status,'W01_FROZEN_V2_ORIGINAL_COMPLETE_HTML_LOCATION_TO_ALL_44_SSC_HANDLES_LOCALLY_RECONCILED_G0_OPEN');
 assert.equal(m.source.frozen_revision,'arXiv:2104.05099v2');
 assert.deepEqual(m.source.original_HTML_author_main_and_unique_references,[49,1232]);
 assert.deepEqual(m.source.author_body_before_bibliography,[49,1155]);
 assert.deepEqual(m.source.unique_primary_reference_section,[1156,1232]);
 assert.deepEqual(m.source.arxiv_latexml_second_mirrored_bibliography,[1233,1309]);
 assert.equal(m.source.original_Oct03_pdf_download_hash_verified,false);
 assert.equal(m.source.all_PDF_pages_visually_examined_this_new_round,false);
 assert.equal(m.source.earlier_48_page_visual_review_in_current_coverage,true);
 assert.deepEqual(Object.keys(m.scoped_original_evidence),Object.keys(scopes));
 const c=m.current_source_census,q=m.current_151_reverse_review,g=m.current_G0_stage;
 assert.equal(c.git_blob_sha,gitSha(c.path));
 assert.equal(shaCanonical(d.ssc),gitSha(c.path),'CURRENT_FULL_151_SOURCE_CENSUS_CHANGED_BEYOND_FROZEN_BLOB');
 assert.equal(q.git_blob_sha,gitSha(q.path));
 assert.equal(shaCanonical(d.review),gitSha(q.path),'CURRENT_151_SOURCE_LOCATOR_REVIEW_CHANGED');
 assert.equal(g.git_blob_sha,gitSha(g.path));
 assert.equal(shaCanonical(d.gate),gitSha(g.path),'FROZEN_G0_STAGE_RECORD_CHANGED');
 assert.equal(shaCanonical(d.register),gitSha(registerPath),'ENTIRE_CURRENT_151_SOURCE_REGISTER_ALTERED');
 assert.equal(d.ssc.schema,'woit.source-semantic-census.v0.62');
 assert.equal(d.ssc.census_item_count,151);
 assert.equal(d.ssc.source_count,9);
 assert.equal(d.ssc.cross_author_semantics_available,false);
 assert.equal(d.ssc.items.length,151);
 assert.equal(d.ssc.items.reduce((n,v)=>n+(v.source_expression_census?.statements?.length||0),0),507);
 const W=d.ssc.items.filter(x=>x.source.startsWith('W01')), idSet=new Set(W.map(x=>x.id));
 assert.equal(W.length,44);
 assert.equal(idSet.size,44);
 assert.equal(W.reduce((n,v)=>n+(v.source_expression_census?.statements?.length||0),0),220);
 assert.equal(d.review.rows.length,151);
 assert.equal(d.register.rows.length,151);
 assert.equal(d.gate.current_all_151_conservation_register.git_blob_sha,gitSha(registerPath));
 for(let i=0;i<151;i++){
   const C=d.ssc.items[i],R=d.register.rows[i];
   assert.equal(R.census_id,C.id,'REGISTER_CENSUS_ID_DRIFT');
   assert.equal(R.source_body_exact,C.obligation,'AUTHOR_OBLIGATION_BODY_CHANGED_WITHOUT_G0_REVIEW');
   assert.equal(R.source_expression_statement_count,C.source_expression_census?.statements?.length||0);
   assert.equal(R.historical_closure_accepted_as_current,false);
 }
 assert.equal(d.review.counts.total_structured_source_incidents,507);
 assert.equal(d.review.counts.W01_all_48_original_PDF_pages_visually_examined,true);
 assert.equal(d.gate.schema,'isograph.exp062-w-current-stage-gate.v0.122');
 assert.equal(d.gate.current_source_census.git_blob_sha,gitSha(c.path));
 assert.equal(d.gate.current_source_coverage.git_blob_sha,gitSha(q.path));
 assert.equal(d.gate.current_lawful_state.G0_open,true);
 for(const key of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])assert.equal(d.gate.current_lawful_state[key],false,'false stage claim '+key);
 for(const [key,val] of Object.entries(m.scoped_original_evidence)){
   assert.equal(val.git_blob_sha,gitSha(val.path),'original source-first artifact pin lost '+key);
   assert.equal(shallowHash(d[key]),gitSha(val.path),'historical first-read source record altered '+key);
 }
 const source=m.original_to_SSC;
 assert.equal(source.length,293);
 const originalOwners=new Set(),positionByOwner=new Map(),kinds={SOURCE_LOAD_BEARING:0,NONLOAD_HEADING:0,NONLOAD_PROVENANCE:0,NATIVE_BIBLIOGRAPHY:0};
 let cursor=49,reference=0;
 const supportedByOriginal=new Map;
 for(const [key,[array,span,owner,meaning]] of Object.entries(scopes)){
    const rows=d[key][array];const candidates=source.filter(r=>r.source_evidence.parent_audit===key);
    assert.equal(candidates.length,rows.length,'original source scope lost or invented '+key);
    for(let i=0;i<rows.length;i++){
      const z=rows[i],entry=candidates[i];
      const originalSpan=span==='line'&&typeof z[span]==='number'?[z[span],z[span]]:z[span];
      assert.deepEqual(entry.source_original_html_lines,originalSpan,'source-first boundary drift '+key+'/'+i);
      assert.equal(entry.source_meaning,z[meaning],'source-first author semantics altered '+key+'/'+i);
      if(owner)assert.deepEqual(entry.ssc_owners,z[owner],'original-first owner drift '+key+'/'+i);
    }
    supportedByOriginal.set(key,candidates.length);
 }
 for(const z of source){
   assert.equal(z.source_original_html_lines[0],cursor,'gap or overlap of frozen original author html at '+cursor);
   assert.ok(Number.isInteger(z.source_original_html_lines[1])&&z.source_original_html_lines[1]>=cursor);
   cursor=z.source_original_html_lines[1]+1;
   assert.equal(z.source_evidence.edition,'arXiv:2104.05099v2');
   assert.ok(Object.hasOwn(kinds,z.disposition_kind),'unknown author-source disposition class');
   kinds[z.disposition_kind]++;
   if(z.disposition_kind==='SOURCE_LOAD_BEARING'){
      assert.ok(z.ssc_owners.length>0,'unrepresented original author statement at '+z.key);
      for(const owner of z.ssc_owners){assert.ok(idSet.has(owner),'cross-unit/fictional W01 source owner '+owner);
        originalOwners.add(owner);
        const a=positionByOwner.get(owner)||[];a.push(z.key);positionByOwner.set(owner,a);
      }
   }else{
      assert.equal(z.ssc_owners.length,0,'non-source matter counted as semantic item '+z.key);
   }
   if(z.disposition_kind==='NATIVE_BIBLIOGRAPHY'){
     reference++;
     assert.equal(z.source_original_html_lines[0],1156+reference);
     assert.equal(z.source_evidence.reference_id,reference);
     assert.equal(z.source_evidence.mirrored_html_line,1233+reference);
     assert.ok(typeof z.source_meaning==='string'&&z.source_meaning.length>0,'missing bibliography provenance text');
     assert.equal(z.disposition_kind,'NATIVE_BIBLIOGRAPHY');
   }
 }
 assert.equal(cursor,1233);
 assert.deepEqual(kinds,{SOURCE_LOAD_BEARING:188,NONLOAD_HEADING:28,NONLOAD_PROVENANCE:1,NATIVE_BIBLIOGRAPHY:76});
 assert.equal(reference,76);
 assert.equal(originalOwners.size,44);
 assert.ok(originalOwners.has('W-SSC-001'),'abstract Spin4 source handler must map W001');
 assert.ok(originalOwners.has('W-SSC-006'),'abstract fermion generation must map W006');
 assert.deepEqual(source.find(z=>z.source_original_html_lines[0]===54).ssc_owners,['W-SSC-001','W-SSC-002','W-SSC-003']);
 assert.deepEqual(source.find(z=>z.source_original_html_lines[0]===57).ssc_owners,['W-SSC-005','W-SSC-006']);
 const introHeading=source.find(z=>z.source_original_html_lines[0]===59);
 assert.equal(introHeading.disposition_kind,'NONLOAD_HEADING');
 const Aheader=source.find(z=>z.source_original_html_lines[0]===386);
 assert.equal(Aheader.disposition_kind,'NONLOAD_HEADING');
 const Apreamble=source.find(z=>z.source_original_html_lines[0]===388);
 assert.deepEqual(Apreamble.ssc_owners,['W-SSC-004','W-SSC-047']);
 assert.deepEqual(Apreamble.source_evidence.citations,[32,35,2]);
 assert.equal(Apreamble.source_evidence.original_pdf_page,16);
 assert.equal(Apreamble.source_evidence.direct_original_source_review,true);
 for(const item of W){
   const index=m.SSC_to_original_inverse.find(z=>z.id===item.id);
   assert.ok(index,'SSC item lacks source-first inverse '+item.id);
   assert.equal(index.source,item.source);
   assert.equal(index.existing_source_statement_incidence_count,item.source_expression_census?.statements?.length||0);
   assert.deepEqual(index.original_locations,positionByOwner.get(item.id),'incomplete original inverse provenance for '+item.id);
   const review=d.review.rows.find(z=>z.census_id===item.id);
   assert.ok(review?.source_locator_this_review,'existing SSC-to-primary-source locator missing '+item.id);
 }
 assert.equal(m.SSC_to_original_inverse.length,44);
 assert.deepEqual(m.source_to_SSC_summary.original_first_intervals,source.length);
 assert.equal(m.source_to_SSC_summary.load_bearing,188);
 assert.equal(m.source_to_SSC_summary.nonload,29);
 assert.equal(m.source_to_SSC_summary.bibliography,76);
 assert.equal(m.source_to_SSC_summary.owner_count,44);
 assert.equal(m.source_to_SSC_summary.total_w01_ssc,44);
 assert.deepEqual(m.source_to_SSC_summary.missing_w01,[]);
 assert.deepEqual(m.source_to_SSC_summary.foreign,[]);
 assert.deepEqual(m.source_to_SSC_summary.errors,[]);
 assert.equal(m.source_to_SSC_summary.prior_lack_of_reverse_evidence_index_for_W001_and_W006_now_reconciled,true);
 assert.equal(m.source_to_SSC_summary.new_SSC_mathematical_claims_required,0);
 assert.equal(m.original_citation_treatment.single_original_reference_ids.length,76);
 assert.deepEqual(m.original_citation_treatment.single_original_reference_ids,Array.from({length:76},(_,i)=>i+1));
 assert.deepEqual(m.original_citation_treatment.Appendix_A_preamble_author_citations,[32,35,2]);
 assert.equal(m.original_citation_treatment.arxiv_html_duplicate_second_list_not_unique,true);
 assert.equal(m.remaining_G0.frozen_W_units,9);
 assert.deepEqual(m.remaining_G0.whole_original_first_local_units,['W01','W02','W05']);
 assert.deepEqual(m.remaining_G0.mutable_units_with_unrecoverable_frozen_oct03_raw_bytes,['W03','W04a','W04b','W04c','W04d','W04e']);
 assert.equal(m.remaining_G0.all_nine_reverse_complete,false);
 assert.equal(m.remaining_G0.freeze_authorized,false);
 assert.equal(m.remaining_G0.G1_through_G7_later_stage_only,true);
 assert.equal(m.remaining_G0.cross_track_synthesis_allowed,false);
 assert.equal(m.independent_verification_boundary.independent_external_full_48page_cold_semantic_certification,'NOT_QUALIFIED');
 assert.equal(m.independent_verification_boundary.an_unindexed_statement_shared_by_all_original_ledgers_would_not_be_detected_by_self_consistency,true);
 return {frozen_original_html_lines:[49,1232],author_source_intervals:source.length,load_bearing:kinds.SOURCE_LOAD_BEARING,source_to_ssc:44,ssc_to_source:44,unique_bibliography:reference,G0:'OPEN'};
}
const positive=verify(meta,docs,failed,failed2);
const cases=[
 ['remove original source interval',x=>x.meta.original_to_SSC.splice(88,1)],
 ['split original source interval',x=>x.meta.original_to_SSC[100].source_original_html_lines[1]--],
 ['overlap original headings',x=>x.meta.original_to_SSC[101].source_original_html_lines[0]--],
 ['rename frozen revision',x=>x.meta.source.frozen_revision='latest'],
 ['alter author original text',x=>x.meta.original_to_SSC[110].source_meaning='NOT SOURCE'],
 ['delete abstract factor source owner',x=>x.meta.original_to_SSC.find(z=>z.source_original_html_lines[0]===54).ssc_owners.shift()],
 ['delete generation source owner',x=>x.meta.original_to_SSC.find(z=>z.source_original_html_lines[0]===57).ssc_owners.pop()],
 ['invent another abstract source item',x=>x.meta.original_to_SSC.find(z=>z.source_original_html_lines[0]===54).ssc_owners.push('W-SSC-999')],
 ['cross-track source owner',x=>x.meta.original_to_SSC.find(z=>z.source_original_html_lines[0]===54).ssc_owners.push('L-SSC-001')],
 ['erase appendix A preamble source',x=>x.meta.original_to_SSC.find(z=>z.source_original_html_lines[0]===388).ssc_owners=[]],
 ['alter Penrose historical citation',x=>x.meta.original_to_SSC.find(z=>z.source_original_html_lines[0]===388).source_evidence.citations=[32,33,2]],
 ['turn section heading into meaning',x=>x.meta.original_to_SSC.find(z=>z.source_original_html_lines[0]===59).disposition_kind='SOURCE_LOAD_BEARING'],
 ['duplicate bibliography identity',x=>x.meta.original_to_SSC.find(z=>z.source_evidence.reference_id===24).source_evidence.reference_id=25],
 ['invent 152 author bibliography entries',x=>x.meta.source.unique_primary_reference_section=[1156,1309]],
 ['move HTML bibliography mirror',x=>x.meta.original_to_SSC.find(z=>z.source_evidence.reference_id===12).source_evidence.mirrored_html_line=1200],
 ['missing bibliography entry',x=>x.meta.original_to_SSC.pop()],
 ['fake PDF comprehensive new cold review',x=>x.meta.source.all_PDF_pages_visually_examined_this_new_round=true],
 ['fake original Oct03 byte hash',x=>x.meta.source.original_Oct03_pdf_download_hash_verified=true],
 ['historical first source audit mutation',x=>x.docs.a1.source_locations[2].meaning='ALTERED'],
 ['historical B/C source audit mutation',x=>x.docs.bc.original_author_BC_disjoint_intervals[2].original_source_disposition='ALTERED'],
 ['historical abstract source audition mutation',x=>x.docs.abs.original_source_assertion_inventory[0].claim='ALTERED'],
 ['change SSC W001 source identity',x=>x.docs.ssc.items.find(z=>z.id==='W-SSC-001').source='W04a'],
 ['change SSC W006 source meaning',x=>x.docs.ssc.items.find(z=>z.id==='W-SSC-006').obligation+='FAKE'],
 ['erase SSC W038 original inverse',x=>x.meta.SSC_to_original_inverse.find(z=>z.id==='W-SSC-038').original_locations=[]],
 ['erase W046 original inverse',x=>x.meta.SSC_to_original_inverse.find(z=>z.id==='W-SSC-046').original_locations.pop()],
 ['erase latest 151 review evidence pointer',x=>x.docs.review.rows.find(z=>z.census_id==='W-SSC-006').source_locator_this_review=null],
 ['falsify total W source incidences',x=>x.docs.ssc.items.find(z=>z.id==='W-SSC-054').source_expression_census.statements.pop()],
 ['falsify G0 completion',x=>x.docs.gate.current_lawful_state.G0_complete=true],
 ['falsify G0 freeze',x=>x.meta.remaining_G0.freeze_authorized=true],
 ['premature G1',x=>x.docs.gate.current_lawful_state.G1_authorized=true],
 ['cross-track promotion',x=>x.meta.remaining_G0.cross_track_synthesis_allowed=true],
 ['pretend mutable W03 original retrieved',x=>x.meta.remaining_G0.mutable_units_with_unrecoverable_frozen_oct03_raw_bytes=[]],
 ['pretend independent external cold proof',x=>x.meta.independent_verification_boundary.independent_external_full_48page_cold_semantic_certification='PASS'],
 ['alter native correction count',x=>x.meta.source_to_SSC_summary.new_SSC_mathematical_claims_required=1],
 ['insert fake non-author source metadata',x=>x.meta.original_to_SSC[0].ssc_owners=['W-SSC-001']],
 ['invent source full G0 seal',x=>x.meta.remaining_G0.all_nine_reverse_complete=true],
 ['erase audit version pin',x=>x.meta.scoped_original_evidence.a2.git_blob_sha='NO'],
 ['alter original section source register',x=>x.meta.original_to_SSC[170].source_original_html_lines=[700,701]],
 ['reclassify failed v01 success',x=>x.failed.qualification='PASS'],
 ['erase v01 provenance',x=>x.failed.predecessor_checker_blob_sha='UNKNOWN'],
 ['falsify old positive baseline',x=>x.failed.positive_baseline=true],
 ['reclassify v02 escaped hostile as success',x=>x.failed2.qualification='PASS'],
 ['rewrite historical v02 verifier provenance',x=>x.failed2.predecessor_checker_blob_sha='FAKE'],
 ['mutate SSC body of W006 same length',x=>x.docs.ssc.items.find(z=>z.id==='W-SSC-006').obligation=x.docs.ssc.items.find(z=>z.id==='W-SSC-006').obligation.replace('construction','constrUction')],
 ['mutate current source proposition with typed but same count',x=>x.docs.ssc.items.find(z=>z.id==='W-SSC-054').source_expression_census.statements[0].id='FAKE'],
 ['mutate source register body',x=>x.docs.register.rows.find(z=>z.census_id==='W-SSC-006').source_body_exact='NEW'],
 ['mutate source register old86 membership',x=>x.docs.register.rows.find(z=>z.census_id==='W-SSC-001').historical_86_member=false]
];
let rejected=0;
for(const [name,change] of cases){const x=clone({meta,docs,failed,failed2}),old=JSON.stringify(x);change(x);assert.notEqual(JSON.stringify(x),old,'INERT HOSTILE TEST '+name);try{verify(x.meta,x.docs,x.failed,x.failed2)}catch(e){rejected++;continue;}throw Error('HOSTILE ESCAPED '+name);}
assert.equal(rejected,cases.length);
console.log('W01 full frozen original source-first G0 local correspondence PASS '+JSON.stringify(positive));
console.log('Adversarial controls rejected '+rejected+'/'+cases.length+'. Full all-nine W original G0, immutable mutable-W sources, and independent cold completion remain OPEN.');
