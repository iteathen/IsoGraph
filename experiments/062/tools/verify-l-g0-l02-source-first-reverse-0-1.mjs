// L-only G0 original-source-first L02 v2 correspondence/conservation audit.
// CI verifies versioned source inventory and SSC conservation, not complete external cold PDF fidelity.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={audit:R+'LISI_L02_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json',old:R+'SOURCE_SEMANTIC_CENSUS_0_50.json',now:R+'SOURCE_SEMANTIC_CENSUS_0_51.json',tr:R+'SOURCE_TRAVERSAL_LEDGER_0_14.json',gate:E+'L_CURRENT_STAGE_GATE_0_70.json',oldGate:E+'L_CURRENT_STAGE_GATE_0_69.json',self:E+'tools/verify-l-g0-l02-source-first-reverse-0-1.mjs'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const before=read(F.old),audit=read(F.audit),now=read(F.now),tr=read(F.tr),gate=read(F.gate);
const ids=[4,51,53,55,63,65,66].map(n=>'L-SSC-'+String(n).padStart(3,'0'));
const K={M:'MAPPED_SOURCE_MEANING_GLOBAL_COLD_PASS_NOT_CLAIMED',P:'EXACT_ORIGINAL_FORMULA_REPLAY_UNVERIFIED',R:'REPAIRED_OMISSION_USING_PREEXISTING_SSC_ID',X:'SOURCE_CITATION_ROLE_ONLY_NOT_IMPORTED_CLAIM',N:'NON_LOAD_BEARING_CONTEXT_EXCLUDED'};
function check(a,n,t,g){
 const errs=[],ck=(good,why)=>{if(!good)errs.push(why);};
 ck(a.schema==='isograph.track-L.G0.L02-original-source-first-bidirectional-audit.v0.1'&&a.track==='L'&&a.stage==='G0'&&a.semantic_authority===false,'L-only G0 audit scope');
 ck(a.source?.frozen_revision==='arXiv:1004.4866v2'&&a.source?.pdf_pages===12&&a.source?.first_page_arxiv_header==='arXiv:1004.4866v2 [gr-qc] 13 Oct 2010','original v2 first-page version header');
 ck(a.source?.original_typeset_date==='October 22, 2018'&&a.source?.internal_date_is_not_revision_identity===true,'source internal date vs immutable revision');
 ck(a.source?.source_pdf_byte_digest_verified===false&&a.source?.entire_source_original_cold_outside_review_passed===false,'do not invent source bytes or independent cold completion');
 ck(a.parent?.ssc_git_blob_sha===blob(F.old)&&a.parent?.ssc_path===F.old,'exact preexisting SSC0.50 parent');
 ck(before.items?.length===191&&before.item_count===191&&n.items?.length===191&&n.item_count===191&&n.track==='L','conserve 191 original source handles');
 ck(n.predecessor?.git_blob_sha===blob(F.old)&&n.revision?.source_packet?.git_blob_sha===blob(F.audit),'SSC source packet parent SHA');
 ck(n.schema==='woit-lisi.track-l.source-semantic-census.v0.51'&&n.guards?.source_census_freeze_complete===false,'new census remains G0 open');
 let altered=[];for(let i=0;i<191;i++){ck(before.items[i]?.id===n.items[i]?.id,'SSC identity/order '+i);if(JSON.stringify(before.items[i])!==JSON.stringify(n.items[i]))altered.push(n.items[i].id);}
 ck(JSON.stringify(altered)===JSON.stringify(ids)&&n.revision?.unchanged_source_items===184,'184 predecessor source records wholly unchanged; 7 exact L02 repairs');
 const L02=before.items.filter(x=>/^L02(?:\s|$)/.test(x.source_provenance)).map(x=>x.id).sort();
 ck(L02.length===21,'exact frozen L02 SSC ownership');
 const rows=a.source_first_locations||[],seen=new Set(),mapped=new Set(),count={},equations=[],footnotes=[],pages=new Set();
 ck(rows.length===59&&a.counts?.source_locations===59&&a.counts?.existing_L02_SSC_records===21,'finite original 59/21 source inventory');
 const known=Object.values(K);
 for(let i=0;i<rows.length;i++){
  const row=rows[i],id='L02-S'+String(i+1).padStart(3,'0');
  ck(row.source_location_id===id&&!seen.has(id),'unique stable original locator '+i);seen.add(row.source_location_id);
  ck(typeof row.original_source_locator==='string'&&row.original_source_locator.length>=8&&typeof row.original_source_semantic_group==='string'&&row.original_source_semantic_group.length>=25,'source-first meaningful text and location '+i);
  ck(known.includes(row.disposition),'known disposition '+i);
  ck(row.load_bearing===(row.disposition!==K.N),'load-bearing/negative exclusion '+i);
  if(row.disposition===K.N)ck(row.SSC_ids.length===0,'nonload must not have phantom SSC');
  if(row.disposition!==K.N)ck(row.SSC_ids.length>0,'load-bearing source needs SSC role');
  for(const s of row.SSC_ids){ck(L02.includes(s),'L02-only SSC forward mapping '+i);mapped.add(s);}
  for(const pg of row.pdf_pages_zero_based||[]){ck(Number.isInteger(pg)&&pg>=0&&pg<=11,'valid 12-page original PDF location');pages.add(pg);}
  equations.push(...(row.equations||[]));if(row.footnote!==null)footnotes.push(row.footnote);
  count[row.disposition]=(count[row.disposition]||0)+1;
 }
 ck(JSON.stringify([...mapped].sort())===JSON.stringify(L02),'bidirectional all 21 L02 SSC mapped');
 ck(JSON.stringify(a.reverse?.L02_existing_ids?.slice().sort())===JSON.stringify(L02),'separate exact SSC reverse index');
 ck(JSON.stringify([...pages].sort((x,y)=>x-y))===JSON.stringify(Array.from({length:12},(_,i)=>i)),'all 12 original PDF pages partitioned');
 ck(JSON.stringify(equations.sort((x,y)=>x-y))===JSON.stringify(Array.from({length:30},(_,i)=>i+1)),'each original equation 1–30 once and no other number');
 ck(JSON.stringify(footnotes.sort())==='[1,2,3]','original 3 footnotes all conserved exactly once');
 ck(Object.values(K).every(k=>count[k]===a.counts?.dispositions?.[k]),'independent classified source counts');
 ck(count[K.M]===35&&count[K.P]===9&&count[K.R]===10&&count[K.X]===4&&count[K.N]===1,'source-first coverage partitions');
 ck(a.open_G0_original_formula_locations?.length===9&&a.open_G0_original_formula_locations.every(id=>rows.find(r=>r.source_location_id===id)?.disposition===K.P),'exact source-expression G0 debt not hidden');
 ck(a.omission_causes?.length===5&&a.omission_causes.every(x=>x.existing_SSC_repairs?.every(id=>ids.includes(id))),'systematic cause-class repairs, no new SSC handle');
 ck(a.reverse?.source_cold_complete===false&&a.reverse?.source_to_SSC_full_exact_fidelity_PASS===false&&a.reverse?.SSC_to_source_full_exact_fidelity_PASS===false,'no global source proof from self-consistent metadata');
 ck(a.stage?.G0_open===true&&a.stage?.source_census_frozen===false&&a.stage?.G1_authorized===false&&a.stage?.W_synthesis_allowed===false,'no early stage promotion or W import');
 ck(rows[4]?.original_source_semantic_group?.includes('h-invariant')&&rows[7]?.original_source_semantic_group?.includes('su2')&&rows[15]?.original_source_semantic_group?.includes('antisymmetric IJ'),'original source revision, chiral footnote, index convention');
 ck(rows[24]?.original_source_semantic_group?.includes('vecdelta')&&rows[46]?.original_source_semantic_group?.includes('alpha=2/v')&&rows[50]?.original_source_semantic_group?.includes('su(2)'), 'original Eq11, footnote3, §3 alternative source anchors');
 const body=k=>n.items.find(x=>x.id==='L-SSC-'+String(k).padStart(3,'0'))?.body||'';
 ck(body(4).includes('only under h')&&body(51).includes('only spin-two')&&body(51).includes('1/2 factors'),'rev/alternative/half-index semantic repair');
 ck(body(53).includes('DB=dB+[H,B]')&&body(55).includes('vecdelta=*d*'),'Eq2 and Eq11 repaired semantic binders');
 ck(body(63).includes('H0=(1/4)e0 phi0')&&body(63).includes('alpha=2/v')&&body(63).includes('sin(a1)sin(a2)'),'de Sitter explicit coframe and vacuum carrier retained');
 ck(body(65).includes('(1/4)omega')&&body(65).includes('(1/4)e^a')&&body(65).includes('(1/2)A^mn'),'original fermion Eq29 all three coefficient roles');
 ck(body(66).includes('spin(4)⊕spin(6)')&&body(66).includes('spin(11,3)'),'source Eq30 exact embedded subalgebras');
 for(const id of ids){const b=n.items.find(x=>x.id===id).source_expression_census?.L02_V2_ORIGINAL_SOURCE_FIRST_0_1;ck(b?.source_packet?.git_blob_sha===blob(F.audit)&&b?.G1_authorized===false,'source first expression evidence linked '+id);}
 ck(t.schema==='lisi.full-treatment.source-traversal-ledger.v0.14'&&t.predecessor==='SOURCE_TRAVERSAL_LEDGER_0_13.json'&&t.complete_sources===0,'traversal historical reopen preserved');
 ck(t.current_census?.git_blob_sha===blob(F.now)&&t.current_L02_source_first_inventory?.git_blob_sha===blob(F.audit),'traversal current source parents SHA');
 ck(t.sources?.length===6&&t.sources.every(x=>x.current_complete===false),'six sources current unfrozen'); 
 ck(g.schema==='isograph.exp062-l-current-stage-gate.v0.70'&&g.status.endsWith('OPEN_UNFROZEN')&&g.semantic_authority===false&&g.stage==='G0','procedural gate0.70 only');
 ck(g.predecessor_gate?.git_blob_sha===blob(F.oldGate)&&g.current_source_census?.git_blob_sha===blob(F.now),'exact gate predecessor and updated SSC');
 ck(g.source_traversal?.git_blob_sha===blob(F.tr)&&g.source_first_L02_packet?.git_blob_sha===blob(F.audit),'current gate sources and traversal immutable');
 ck(g.source_verifier?.git_blob_sha===blob(F.self),'source checker pinned to gate');
 ck(g.source_CI?.status==='PENDING_GITHUB_CI'&&g.source_CI?.independent_complete_original_pdf_review_passed===false,'pending verification not prematurely successful');
 ck(g.current_lawful_state?.source_census_complete===false&&g.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.cross_track_synthesis_authorized===false&&g.current_lawful_state?.NEI_pass_authorized===false&&g.current_lawful_state?.DTS_pass_authorized===false&&g.current_lawful_state?.DP_pass_authorized===false,'stage authorities unchanged');
 ck(g.convergence?.source_first_inventory_sources===3&&g.convergence?.source_first_locations_scoped===159&&g.convergence?.SSC_records_source_first_crosswalked===81&&g.convergence?.full_cold_complete_sources===0,'3/6 original-source progress without false completion');
 return errs;
}
const failures=check(audit,now,tr,gate),mutations=[
 ['erase_group',(a)=>a.source_first_locations.pop()],
 ['duplicate_source_id',(a)=>a.source_first_locations[1].source_location_id='L02-S001'],
 ['strip_original_equation',(a)=>a.source_first_locations[11].equations=[]],
 ['duplicate_original_equation',(a)=>a.source_first_locations[11].equations=[1]],
 ['erase_original_footnote',(a)=>a.source_first_locations[46].footnote=null],
 ['rewrite_source_page',(a)=>a.source_first_locations[0].pdf_pages_zero_based=[12]],
 ['forge_revision',(a)=>a.source.frozen_revision='arXiv:1004.4866v1'],
 ['overwrite_2018_internal_date',(a)=>a.source.original_typeset_date='2010'],
 ['invent_pdf_sha',(a)=>a.source.source_pdf_byte_digest_verified=true],
 ['invent_cold_pass',(a)=>a.reverse.source_cold_complete=true],
 ['downgrade_original_P',(a)=>a.source_first_locations[29].disposition=K.M],
 ['phantom_nonload_SSC',(a)=>a.source_first_locations[54].SSC_ids=['L-SSC-063']],
 ['erase_forward_map',(a)=>a.source_first_locations.filter(x=>x.SSC_ids.includes('L-SSC-060')).forEach(x=>x.SSC_ids=[])],
 ['smuggle_W',(a)=>a.source_first_locations[0].SSC_ids.push('W-SSC-123')],
 ['erase_systematic_cause',(a)=>a.omission_causes.pop()],
 ['forge_parent_blob',(a)=>a.parent.ssc_git_blob_sha='SHA_REPLACED'],
 ['erase_chiral_alternative',(a)=>a.source_first_locations[50].original_source_semantic_group='Nothing original is described.'],
 ['modify_unrelated_L04',(a,n)=>n.items.find(x=>x.id==='L-SSC-120').body+=' unintended'],
 ['erase_L02_revision',(a,n)=>n.items.find(x=>x.id==='L-SSC-004').body='bare generic'],
 ['erase_deSitter_footnote',(a,n)=>n.items.find(x=>x.id==='L-SSC-063').body='generic vacuum'],
 ['erase_fermion_factors',(a,n)=>n.items.find(x=>x.id==='L-SSC-065').body='Dpsi generic'],
 ['advance_other_source',(a,n,t)=>t.sources.find(x=>x.id==='L05').current_complete=true],
 ['rewrite_traversal_parent',(a,n,t)=>t.current_census.git_blob_sha='bad'],
 ['promote_G1',(a,n,t,g)=>g.current_lawful_state.G1_authorized=true],
 ['promote_DP',(a,n,t,g)=>g.current_lawful_state.DP_pass_authorized=true],
 ['forge_gate_sha',(a,n,t,g)=>g.source_first_L02_packet.git_blob_sha='bad'],
 ['pretend_success',(a,n,t,g)=>g.source_CI.status='SUCCESS'],
 ['false_global_count',(a,n,t,g)=>g.convergence.full_cold_complete_sources=6]
];
let rejected=0;for(const [name,mutate] of mutations){
 const a=JSON.parse(JSON.stringify(audit)),n=JSON.parse(JSON.stringify(now)),t=JSON.parse(JSON.stringify(tr)),g=JSON.parse(JSON.stringify(gate));
 mutate(a,n,t,g);if(check(a,n,t,g).length)rejected++;else failures.push('ESCAPED '+name);
}
console.log(JSON.stringify({schema:'isograph.L.G0.L02.source-first-conservation-test.v0.1',pass:!failures.length,errors:failures,original_source_units:59,equations:30,footnotes:3,SSC_ids:21,changed_existing_source_records:7,unchanged_full_records:184,formula_exactness_G0_debt:9,hostiles_defined:mutations.length,hostiles_rejected:rejected,original_pdf_cold_complete:false,G0_frozen:false,G1_authorized:false},null,2));
if(failures.length)process.exitCode=1;
