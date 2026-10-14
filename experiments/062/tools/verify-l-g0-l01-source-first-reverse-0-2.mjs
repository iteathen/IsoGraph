// Track L G0 source-first frozen original L01 v1 audit guard, corrected0.2.
// Internal source, SSC and provenance conservation only: never claim complete cold PDF review.
// The primary-source fixed anchors were separately inspected in arXiv:0711.0770v1 pages 21,22,28.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/', E='experiments/062/';
const F={
  firstFailure:E+'L01_G0_ORIGINAL_FIRST_INITIAL_VERIFIER_LOCK_FIELD_FAILURE_0_1.json',
  audit:R+'LISI_L01_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json',
  censusPrev:R+'SOURCE_SEMANTIC_CENSUS_0_53.json',
  census:R+'SOURCE_SEMANTIC_CENSUS_0_54.json',
  originalPage:R+'LISI_L01_31_PAGE_VISUAL_SOURCE_G0_AUDIT_0_1.json',
  traversal:R+'SOURCE_TRAVERSAL_LEDGER_0_17.json',
  gate:E+'L_CURRENT_STAGE_GATE_0_76.json',
  predecessorGate:E+'L_CURRENT_STAGE_GATE_0_75.json',
  self:E+'tools/verify-l-g0-l01-source-first-reverse-0-2.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const audit=read(F.audit),old=read(F.censusPrev),now=read(F.census),page=read(F.originalPage),tr=read(F.traversal),gate=read(F.gate),originalFailure=read(F.firstFailure);
const expectedEq=['1.1','1.2',...Array.from({length:12},(_,i)=>'2.'+(i+1)),...Array.from({length:8},(_,i)=>'3.'+(i+1))];
const expectedE=['L01-S048','L01-S051','L01-S054','L01-S055','L01-S057','L01-S058','L01-S059','L01-S089'];
const expectedEdits=['L-SSC-035','L-SSC-036','L-SSC-047','L-SSC-048'];
const sourceOwnership=x=>/^L01(?:\/|$|\s|§)/.test(x.source_provenance);
const sorted=x=>[...x].sort();
function verify(a,b,n,pp,t,g){
 const errors=[],ck=(x,msg)=>{if(!x)errors.push(msg);};
 ck(originalFailure.exact_CI?.run_id===38035978814&&originalFailure.exact_CI?.conclusion==='failure'&&originalFailure.original_output?.hostiles_rejected===30,'preserve first actual CI failure as failure');
 ck(g?.first_original_source_CI_failure?.run_id===38035978814&&g.first_original_source_CI_failure?.evidence_git_blob_sha===sha(F.firstFailure),'gate must preserve exact first failed L01 checker provenance');
 ck(a?.schema==='isograph.track-L.G0.L01.frozen-v1-original-first-bidirectional.v0.1'&&a?.track==='L'&&a?.stage==='G0'&&a?.authority===false,'L-only G0 source record');
 ck(a?.source?.id==='L01'&&a?.source?.revision==='arXiv:0711.0770v1'&&a?.source?.original_pdf==='https://arxiv.org/pdf/0711.0770v1','exact frozen source version not later v2');
 ck(a?.source?.original_pdf_pages===31&&a?.source?.original_pdf_byte_sha256_verified===false,'31 source pages but actual bytes digest not manufactured');
 ck(a?.source?.pdf_byte_retrieval_attempts?.length===2,'exact source-byte retrieval attempts preserved');
 ck(a?.original_previous_source_visual_sweep?.git_blob_sha===sha(F.originalPage)&&pp?.page_ledger?.length===31,'historical all-page visual predecessor');
 ck(a?.predecessor?.census_sha===sha(F.censusPrev)&&a?.predecessor?.traversal_sha==='7b2f5fd976defe78ba6e62573bbcf5b6e22342e2'&&a?.predecessor?.gate_sha===sha(F.predecessorGate),'immutable current L lineage');
 const original=b?.items?.filter(sourceOwnership)||[],expected=sorted(original.map(x=>x.id)),rows=a?.original_source_first_locations||[],seen=new Set(),mapped=new Set(),pages=new Set(),eq=[],tables=[],figures=[],dispos={};
 ck(expected.length===30&&a?.counts?.existing_L01_SSC_records===30,'exact 30 original L01 source handles');
 ck(rows.length===98&&a?.counts?.original_source_locations===98,'finite 98 original source groups');
 const known=Object.values(a?.disposition_meanings||{});
 for(let i=0;i<rows.length;i++){
   const row=rows[i]||{},expectedID='L01-S'+String(i+1).padStart(3,'0'),sourceId=row.original_source_location_id;
   ck(sourceId===expectedID&&!seen.has(sourceId),'unique original location '+i);seen.add(sourceId);
   ck(typeof row.original_source_locator==='string'&&row.original_source_locator.length>0,'source locator '+i);
   ck(typeof row.meaning==='string'&&row.meaning.length>0,'source semantics '+i);
   ck(known.includes(row.disposition),'known source disposition '+i);
   ck(row.load_bearing===(row.disposition!==a.disposition_meanings?.N),'negative nonload source condition '+i);
   if(row.disposition===a.disposition_meanings?.N)ck((row.existing_SSC_ids||[]).length===0,'nonload cannot map phantom SSC '+i);
   else ck((row.existing_SSC_ids||[]).length>0,'every load-bearing source group mapped '+i);
   for(const id of (row.existing_SSC_ids||[])){ck(expected.includes(id),'L-only existing source handle '+id);mapped.add(id);}
   for(const pg of(row.original_pdf_pages_zero_based||[])){ck(Number.isInteger(pg)&&pg>=0&&pg<31,'exact original 31-page range '+i);pages.add(pg);}
   if(row.original_numbered_equation)eq.push(row.original_numbered_equation);
   if(row.original_table!==null&&row.original_table!==undefined)tables.push(row.original_table);
   if(row.original_figure!==null&&row.original_figure!==undefined)figures.push(row.original_figure);
   dispos[row.disposition]=(dispos[row.disposition]||0)+1;
 }
 ck(JSON.stringify(sorted(mapped))===JSON.stringify(expected),'all L01 SSC handles bidirectionally mapped');
 ck(JSON.stringify(sorted(a?.bidirectional?.SSC_to_source_locations?Object.keys(a.bidirectional.SSC_to_source_locations):[]))===JSON.stringify(expected),'explicit inverse SSC-to-original complete');
 ck([...pages].sort((x,y)=>x-y).join(',')===Array.from({length:31},(_,i)=>i).join(','),'all original PDF pages accounted');
 ck(eq.join(',')===expectedEq.join(','),'22 original numbered equation locations not just total');
 ck(tables.join(',')==='1,2,3,4,5,6,7,8,9'&&figures.join(',')==='1,2,3,4,5','exact nine original numbered tables and five numbered figures');
 ck(Object.values(a?.disposition_meanings||{}).every(label=>dispos[label]===a?.counts?.by_disposition?.[label]),'mechanically checked all source-class totals');
 ck(dispos[a?.disposition_meanings?.M]===67&&dispos[a?.disposition_meanings?.P]===16&&dispos[a?.disposition_meanings?.E]===8&&dispos[a?.disposition_meanings?.A]===1&&dispos[a?.disposition_meanings?.X]===4&&dispos[a?.disposition_meanings?.N]===2,'source-first partitions 67/16/8/1/4/2');
 const Eids=rows.filter(x=>x.disposition===a?.disposition_meanings?.E).map(x=>x.original_source_location_id);
 ck(Eids.join(',')===expectedE.join(','),'eight genuine original source-meaning underindices, not artifact counts');
 ck(a?.already_represented_in_separate_source_packet?.length===3,'do not mistake existing B1 and xPhi prior evidence for missing source research');
 ck(a?.counts?.remaining_exact_original_visual_or_matrix_groups===16,'16 exact source table/diagram/matrix groups remain open');
 ck(a?.exact_original_matrix_table_figures_pending?.length===16&&a.exact_original_matrix_table_figures_pending.every(id=>rows.find(x=>x.original_source_location_id===id)?.disposition===a.disposition_meanings?.P),'exact source-cell verification debts conserved');
 ck(figures.every(f=>rows.find(x=>x.original_figure===f)?.disposition===a.disposition_meanings?.P),'each of five original figured forms pending exact diagram audit');
 ck(a?.bidirectional?.multi_source_identity_L_SSC_024?.original_L01_2007_support==='L01-S033'&&a.bidirectional.multi_source_identity_L_SSC_024.whole_multi_source_identity_qualified_from_L01_alone===false,'multi-source L-SSC-024 source-isolation guard');
 ck(rows.find(x=>x.original_source_location_id==='L01-S033')?.existing_SSC_ids?.includes('L-SSC-024'),'L01 only 2007 tentative generation source support');
 ck(!rows.find(x=>x.original_source_location_id==='L01-S093')?.existing_SSC_ids?.includes('L-SSC-024'),'not fabricated later L01 revision at source conclusion');
 ck(a?.qualification_boundary?.source_fidelity_full_external_cold_review_complete===false&&a?.stage_locks?.SSC_frozen===false&&a?.stage_locks?.G1_authorized===false,'no global original source or G1 freeze claim');
 ck(b?.schema==='woit-lisi.track-l.source-semantic-census.v0.53'&&n?.schema==='woit-lisi.track-l.source-semantic-census.v0.54'&&b?.items?.length===191&&n?.items?.length===191,'191 existing source identity census conserved');
 ck(n?.predecessor?.git_blob_sha===sha(F.censusPrev)&&n?.revision?.source_packet?.git_blob_sha===sha(F.audit),'exact previous SSC and original-first source packet blob identities');
 let edits=[];for(let i=0;i<191;i++){ck(b?.items?.[i]?.id===n?.items?.[i]?.id,'unchanged SSC referential identity '+i);if(JSON.stringify(b?.items?.[i])!==JSON.stringify(n?.items?.[i]))edits.push(n.items[i].id);}
 ck(edits.join(',')===expectedEdits.join(',')&&n?.revision?.unchanged_source_items===187,'exactly four source revisions and 187 entire predecessor records preserved');
 const body=id=>n.items.find(x=>x.id===id)?.body||'';
 ck(body('L-SSC-035').includes('so(9,1)+u(1)+16_SC')&&body('L-SSC-035').includes('complex structure i related to w'),'independently source read p21 E6 complex spinor/structural claim');
 ck(body('L-SSC-036').includes('16 algebra-generator roles')&&body('L-SSC-036').includes('4 frame plus 4 Higgs')&&body('L-SSC-036').includes('= 8 asserted field degrees'),'source p22 composite 16-to-8 rank restriction');
 ck(body('L-SSC-036').includes('18 algebraic roles')&&body('L-SSC-036').includes('CKM and PMNS')&&body('L-SSC-036').includes('predicts proton decay'),'source p22 proposed novel 18-sector and author modalities');
 ck(body('L-SSC-047').includes('g1=sqrt(3/5), g2=1, g3=1')&&body('L-SSC-047').includes('Lambda=(3/4)phi^2'),'source p28 exact high-energy source constants');
 ck(body('L-SSC-048').includes('COULD be possible')&&body('L-SSC-048').includes('NOT UNDERSTOOD')&&body('L-SSC-048').includes('conditional proton-decay prediction'),'source uncertainty distinct from author predictions');
 for(const id of expectedEdits){const x=n.items.find(y=>y.id===id),e=x?.source_expression_census?.L01_ORIGINAL_FIRST_V1_0_1;ck(e?.source_first_inverse?.git_blob_sha===sha(F.audit)&&e?.global_original_pdf_cold_pass===false&&e?.G1_authorized===false,'four source evidence indexed to exact original packet '+id);}
 ck(n?.guards?.source_census_freeze_complete===false&&n?.guards?.L01_exact_table_figure_matrix_groups_unverified===16,'no SSC full cold completion from 98/30 internal agreement');
 ck(t?.schema==='lisi.full-treatment.source-traversal-ledger.v0.17'&&t?.predecessor==='SOURCE_TRAVERSAL_LEDGER_0_16.json'&&t?.complete_sources===0,'current traversal0.17 open and historical source0.11 only');
 ck(t?.sources?.length===6&&t.sources.every(x=>x.current_complete===false)&&t?.current_L01_source_first_inventory?.git_blob_sha===sha(F.audit),'six original sources all current cold open');
 ck(t?.current_census?.git_blob_sha===sha(F.census)&&t?.current_G0_source_first_progress?.source_locations===257&&t.current_G0_source_first_progress.current_SSC_records_mapped===111,'G0 257 source groups to 111 current SSC members');
 ck(g?.schema==='isograph.exp062-l-current-stage-gate.v0.76'&&g?.track==='L'&&g?.stage==='G0'&&g?.status?.endsWith('OPEN_UNFROZEN')&&g?.semantic_authority===false,'G0 gate not promoted');
 ck(g?.predecessor_gate?.git_blob_sha===sha(F.predecessorGate)&&g?.current_source_census?.git_blob_sha===sha(F.census)&&g?.source_traversal?.git_blob_sha===sha(F.traversal)&&g?.L01_source_first_inventory?.git_blob_sha===sha(F.audit),'gate exact source and authority identities');
 ck(g?.source_verifier?.git_blob_sha===sha(F.self),'checker self SHA pinned');
 ck(g?.source_CI?.status==='PENDING_GITHUB_CI'&&g?.source_CI?.external_complete_original_pdf_review_passed===false,'do not claim CI pass at source-file authorship');
 ck(g?.current_lawful_state?.source_census_frozen===false&&g?.current_lawful_state?.G1_authorized===false&&g?.current_lawful_state?.DP_pass_authorized===false&&g?.current_lawful_state?.cross_track_synthesis_authorized===false,'G1–G7 and W/L synthesis blocked');
 ck(g?.convergence?.source_first_inventory_sources===4&&g?.convergence?.source_first_locations_scoped===257&&g?.convergence?.SSC_records_source_first_crosswalked===111&&g?.convergence?.full_cold_complete_sources===0,'numerical convergence not confused with independent source-cold proof');
 return errors;
}
const failures=verify(audit,old,now,page,tr,gate);
const mutations=[
 ['drop_original_location',(a)=>a.original_source_first_locations.pop()],
 ['duplicate_original_id',(a)=>a.original_source_first_locations[2].original_source_location_id='L01-S001'],
 ['invent_L01_v2_revision',(a)=>a.source.revision='arXiv:0711.0770v2'],
 ['forge_pdf_sha',(a)=>a.source.original_pdf_byte_sha256_verified=true],
 ['erase_source_page',(a)=>a.original_source_first_locations[1].original_pdf_pages_zero_based=[40]],
 ['erase_original_equation',(a)=>a.original_source_first_locations.find(x=>x.original_numbered_equation==='2.10').original_numbered_equation=null],
 ['erase_table9',(a)=>a.original_source_first_locations.find(x=>x.original_table===9).original_table=null],
 ['fake_sixth_figure',(a)=>a.original_source_first_locations.find(x=>x.original_figure===5).original_figure=6],
 ['fake_figure_cold_pass',(a)=>a.original_source_first_locations.find(x=>x.original_figure===1).disposition=a.disposition_meanings.M],
 ['erase_preexisting_packet_evidence',(a)=>a.already_represented_in_separate_source_packet=[]],
 ['misclassify_nonload',(a)=>a.original_source_first_locations.find(x=>x.disposition===a.disposition_meanings.N).existing_SSC_ids=['L-SSC-035']],
 ['erase_one_original_to_SSC',(a)=>a.original_source_first_locations.find(x=>x.original_source_location_id==='L01-S089').existing_SSC_ids=[]],
 ['invent_W_ssc',(a)=>a.original_source_first_locations[0].existing_SSC_ids.push('W-SSC-099')],
 ['erase_rank_source_gap',(a)=>a.original_source_first_locations.find(x=>x.original_source_location_id==='L01-S054').disposition=a.disposition_meanings.M],
 ['erase_original_2007_L024',(a)=>a.original_source_first_locations.find(x=>x.original_source_location_id==='L01-S033').existing_SSC_ids=a.original_source_first_locations.find(x=>x.original_source_location_id==='L01-S033').existing_SSC_ids.filter(x=>x!=='L-SSC-024')],
 ['forge_L024_full_later',(a)=>a.bidirectional.multi_source_identity_L_SSC_024.whole_multi_source_identity_qualified_from_L01_alone=true],
 ['forge_cross_source_Historical',(a)=>a.qualification_boundary.L03_later_generation_source_correction_not_retroactively_applied=false],
 ['change_unrelated_SSC_record',(a,b,n)=>n.items.find(x=>x.id==='L-SSC-122').body+=' imported'],
 ['erase_new_E6_source',(a,b,n)=>n.items.find(x=>x.id==='L-SSC-035').body='generic algebra'],
 ['erase_rank_16_8_source',(a,b,n)=>n.items.find(x=>x.id==='L-SSC-036').body='rank unknown'],
 ['erase_proton_decay',(a,b,n)=>n.items.find(x=>x.id==='L-SSC-036').body='just geometry'],
 ['forge_empirical_promotion',(a,b,n)=>n.guards.L01_complete_original_pdf_cold_pass=true],
 ['remove_SSC_source_ancestor',(a,b,n)=>n.predecessor.git_blob_sha='BAD'],
 ['replace_whole_original_traversal',(a,b,n,p,t)=>t.sources.find(x=>x.id==='L01').current_complete=true],
 ['forge_traversal_source_SHA',(a,b,n,p,t)=>t.current_L01_source_first_inventory.git_blob_sha='BAD'],
 ['promote_G1',(a,b,n,p,t,g)=>g.current_lawful_state.G1_authorized=true],
 ['promote_DP',(a,b,n,p,t,g)=>g.current_lawful_state.DP_pass_authorized=true],
 ['forge_stage_checker',(a,b,n,p,t,g)=>g.source_verifier.git_blob_sha='BAD'],
 ['fake_ci_pass',(a,b,n,p,t,g)=>g.source_CI.status='SUCCESS'],
 ['force_six_complete',(a,b,n,p,t,g)=>g.convergence.full_cold_complete_sources=6],
 ['erase_first_failed_run',(a,b,n,p,t,g)=>g.first_original_source_CI_failure.run_id=0]
];
let rejected=0;
for(const [name,mutation]of mutations){
 const objects=[audit,old,now,page,tr,gate].map(x=>JSON.parse(JSON.stringify(x)));
 mutation(...objects);
 if(verify(...objects).length)rejected++;
 else failures.push('ESCAPED_HOSTILE '+name);
}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L01.source-first-bidirectional-census.v0.1',pass:failures.length===0,errors:failures,source_locations:98,existing_L01_SSC:30,numbered_eq:22,tables:9,figures:5,remaining_G0_visual_cell_replay:16,newly_repaired_original_meaning_clusters:8,unchanged_full_SSC:187,hostiles_defined:mutations.length,hostiles_rejected:rejected,external_original_cold_complete:false,G0_frozen:false,G1_authorized:false},null,2));
if(failures.length)process.exitCode=1;