// Track L G0 exact original L04 Table1/Table2 and prior Table3/triality source conservation.
// A passing test does not imply complete physical theory or whole-source PDF cold qualification.
import fs from 'node:fs';
import crypto from 'node:crypto';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={
 e:P+'LISI_L04_TABLE1_TABLE2_AND_FIGURES_COLD_G0_0_1.json',
 a:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json',
 b:P+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_2.json',
 hist:P+'LISI_L04_TABLE3_TRIALITY_MATRIX_EXACT_G0_0_2.json',
 old:P+'SOURCE_SEMANTIC_CENSUS_0_55.json',
 now:P+'SOURCE_SEMANTIC_CENSUS_0_56.json',
 oldReg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_4.json',
 reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_5.json',
 oldTr:P+'SOURCE_TRAVERSAL_LEDGER_0_22.json',
 tr:P+'SOURCE_TRAVERSAL_LEDGER_0_23.json',
 oldGate:E+'L_CURRENT_STAGE_GATE_0_85.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_86.json',
 self:E+'tools/verify-l-g0-l04-table1-table2-source-cold-0-1.mjs'
};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
function verify(D){
 let issues=[],ck=(v,n)=>{if(!v)issues.push(n)};
 const X=D.e||{},a=D.a||{},b=D.b||{},hist=D.hist||{},old=D.old||{},now=D.now||{},p=D.oldReg||{},q=D.reg||{},t=D.tr||{},u=D.oldTr||{},g=D.gate||{},g0=D.oldGate||{},H=D.hashes||{};
 const idx=['L-SSC-098','L-SSC-099','L-SSC-102','L-SSC-103','L-SSC-119','L-SSC-123'];
 const T1=X.table1||{},T2=X.table2||{},F1=X.figures?.source_fig1||{},F2=X.figures?.source_fig2||{};
 ck(X.schema==='isograph.track-L.G0.L04-original-v2-source-first-exact-Table1-Table2-weight-roles-and-figure-scope.v0.1'&&X.stage==='G0'&&X.track==='L'&&X.semantic_authority===false,'L04 original G0 source evidence scope');
 ck(X.original_source?.revision==='arXiv:2407.02497v2'&&X.original_source?.original_PDF_pages===17&&X.original_source?.exact_official_PDF_SHA256==='5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422','original source frozen PDF SHA v2');
 ck(X.ancestor?.L04_original_first_sha===H.a&&X.ancestor?.historical_Table3_triality_packet_sha===H.hist&&X.ancestor?.current_SSC_parent_sha===H.old,'original source prior exact SHA ancestry');
 const masks=[[1,-1,-1,1],[-1,-1,1,1],[0,-1,0,1],[-1,0,1,0],[1,-1,-1,1],[-1,-1,1,1]],scales=[1,1,1,1,.5,.5],names=['k3R','j3I','omegaT','omegaS'];
 ck(T1.source_exact_six_row_sign_templates?.length===6&&T1.source_sign_pair_instances_12?.length===12,'source six sign-row families and 12 coupled weight instances');
 for(let i=0;i<6;i++){
  const row=T1.source_exact_six_row_sign_templates?.[i]||{},m=masks[i],scale=scales[i];
  ck(row.id==='T1-R'+String(i+1).padStart(2,'0')&&row.weight_units===scale,'source Table1 row identity/scaling '+i);
  for(let j=0;j<4;j++){
   const sym=m[j]===0?'0':m[j]===1?'s':'-s';
   const glyph=m[j]===0?'0':(m[j]===1?'±':'∓')+(scale===1?'1':'1/2');
   ck(row[names[j]]===sym&&row.source_sign_glyphs?.[j]===glyph,'original source Table1 signed symbol/glyph '+i+','+j);
  }
  for(let j=0;j<2;j++){
   const w=T1.source_sign_pair_instances_12?.[2*i+j]||{},sign=j===0?1:-1;
   ck(w.source_row_template===row.id&&w.sign_branch===(j===0?'upper_sign':'lower_sign'),'Table1 sign pair branch '+i+','+j);
   for(let k=0;k<4;k++)ck(w[names[k]]===m[k]*sign*scale,'Table1 source actual weight '+i+','+j+','+k);
   ck(w.omegaT===-w.k3R&&w.omegaS===-w.j3I,'Table1 original Cartan projection conventions '+i+','+j);
  }
 }
 ck(T1.source_correction_omegaT_equals_minus_k3R===true&&T1.source_correction_omegaS_equals_minus_j3I===true,'source sign projection explicit');
 const grid=[[-1,1,-1,1],[1,-1,-1,1],[1,1,1,1],[-1,-1,1,1],[-1,1,-1,-1],[1,-1,-1,-1],[1,1,1,-1],[-1,-1,1,-1]];
 const ann=T2.original_annihilation_source_rows_8||[],cre=T2.original_creation_source_rows_8||[];
 const vec=z=>[z?.omegaT2,z?.omegaS2,z?.h2,z?.q2];
 ck(ann.length===8&&cre.length===8&&T2.source_original_numeric_cells===64&&T2.original_numeric_cells_checked_against_frozen_source_visual===true,'Table2 original 16x4 source numeric rows');
 for(let i=0;i<8;i++){
  const x=ann[i]||{},y=cre[i]||{},v=grid[i],w=[v[0],-v[1],-v[2],-v[3]];
  ck(x.source_row_id==='T2-A'+String(i+1).padStart(2,'0')&&x.operator==='annihilation'&&JSON.stringify(vec(x))===JSON.stringify(v),'annihilation source row/cells '+i);
  ck(y.source_row_id==='T2-C'+String(i+1).padStart(2,'0')&&y.operator==='creation'&&JSON.stringify(vec(y))===JSON.stringify(w),'creation source row/cells '+i);
  ck(x.h2===x.omegaT2*x.omegaS2&&y.h2===y.omegaT2*y.omegaS2&&y.omegaT2===x.omegaT2,'source helicity/boost/creation role '+i);
  ck(y.source_annihilation_correspondent_id===x.source_row_id&&x.family===(i<4?'particle':'antiparticle'),'source annihilation/creation operator binder '+i);
 }
 ck(T2.source_heli_city_relation?.includes('h = 2 ω_T ω_S')&&T2.source_creation_difference?.includes('reverses ω_S, h, q but keeps ω_T unchanged.'),'original helicity and relative sign modalities');
 ck(F1.source_id==='L04-S041'&&F1.vertex_count_source_claim===24&&F1.three_CPT_cubes_each_8_states===true&&F1.first_generation_CPT_edges==='red'&&F1.second_generation_CPT_edges==='green'&&F1.third_generation_CPT_edges==='blue'&&F1.triality_intergeneration_edges==='black'&&F1.complete_plot_incidence_cold_verified===false,'source Fig1 semantics verified; original plot incidence still unverified');
 const expectedColors=[['neutrinos','gray'],['charged leptons','yellow'],['up-quark color1','red'],['up-quark color2','green'],['up-quark color3','blue'],['down-quark color1','orange'],['down-quark color2','chartreuse'],['down-quark color3','purple']];
 ck(F2.source_id==='L04-S048'&&F2.source_state_count===192&&F2.source_24_cell_count===8&&JSON.stringify(F2.source_type_to_color)===JSON.stringify(expectedColors)&&F2.source_triality_edges==='gray'&&F2.source_CPT_cubes==='not drawn in this plot'&&F2.complete_plot_incidence_cold_verified===false,'source Fig2 color/8x24 source diagram roles only');
 ck(hist.schema==='isograph.track-L.G0.L04-original-source-exact-table3-triality-matrix.v0.2'&&hist.Table3?.printed_entries===56&&hist.triality?.triality_integer_sign_rows?.join(',')==='+-++,+---,+++-,++-+','existing qualified original CPT multiplication and triality cell source');
 ck(hist.evidence_scope?.initial_CI_failed_and_preserved===true&&hist.evidence_scope?.initial_CI_run_id===38025480834&&g.L04_prior_exact_source_history?.success_run_id===38025596094&&g.L04_prior_exact_source_history?.earlier_failed_run_id===38025480834,'historical failed transcript and corrected exact source prior CI preserved');
 ck(a.schema==='isograph.track-L.G0.L04-source-first-bidirectional-inventory.v0.1'&&b.schema==='isograph.track-L.G0.L04-source-first-bidirectional-inventory.v0.2'&&a.locations?.length===53&&b.locations?.length===53,'L04 source first 53 originals immutable');
 ck(b.parent?.git_blob_sha===H.a&&b.evidence_2026_10_10?.git_blob_sha===H.e&&b.frozen_primary?.source_byte_hash_verified===true,'source first exact parent + source original bytes');
 const prevStatus=a.dispositions?.P,rowsChanged=[],counts={};
 for(let i=0;i<53;i++){
  const f=a.locations?.[i]||{},l=b.locations?.[i]||{};
  ck(f.id===l.id&&JSON.stringify(f.ssc_ids)===JSON.stringify(l.ssc_ids),'old exact source unit identity/SSC refs '+i);
  if(JSON.stringify(f)!==JSON.stringify(l)) rowsChanged.push(l.id);
  counts[l.disposition]=(counts[l.disposition]||0)+1;
  if(['L04-S012','L04-S019'].includes(l.id))ck(f.disposition===prevStatus&&l.disposition===b.dispositions.V&&l.original_source_evidence?.git_blob_sha===H.e,'new verified source tables '+l.id);
  if(['L04-S026','L04-S039'].includes(l.id))ck(f.disposition===prevStatus&&l.disposition===b.dispositions.H&&l.original_source_evidence?.git_blob_sha===H.hist,'historically verified packet reconciled '+l.id);
  if(['L04-S041','L04-S048'].includes(l.id))ck(f.disposition===prevStatus&&l.disposition===prevStatus&&l.all_original_plot_edges_incidence_qualified===false,'source figure semantics without invented full plot '+l.id);
 }
 ck(rowsChanged.join(',')==='L04-S012,L04-S019,L04-S026,L04-S039,L04-S041,L04-S048','only six source units updated');
 ck(counts[prevStatus]===14&&counts[b.dispositions.V]===2&&counts[b.dispositions.H]===2&&b.counts?.remaining_exact_source_groups===14&&Object.values(counts).reduce((n,k)=>n+k,0)===53,'true L04 exact source G0 obligations reduce 18 to 14');
 ck(old.schema==='woit-lisi.track-l.source-semantic-census.v0.55'&&now.schema==='woit-lisi.track-l.source-semantic-census.v0.56'&&old.items?.length===191&&now.items?.length===191,'full original 191 L SSC conservation');
 ck(now.predecessor?.git_blob_sha===H.old&&now.revision?.source_packet?.git_blob_sha===H.e&&now.revision?.source_first_inventory?.git_blob_sha===H.b,'source census old root and new packet anchors');
 const changed=[];for(let i=0;i<191;i++){
  const before=old.items?.[i]||{},after=now.items?.[i]||{};
  ck(before.id===after.id,'L SSC identity/order conserved '+i);
  if(JSON.stringify(before)!==JSON.stringify(after))changed.push(after.id||'MISSING');
 }
 const expectedIds=['L-SSC-098','L-SSC-099','L-SSC-102','L-SSC-103','L-SSC-119','L-SSC-123'];
 ck(changed.join(',')===expectedIds.join(',')&&now.revision?.unchanged_source_items===185&&now.revision?.new_typed_source_occurrences===0,'exact six source semantics extended and 185 entire others unchanged');
 for(const id of expectedIds){
  const item=now.items.find(z=>z.id===id)||{},index=item.source_expression_census?.L04_V2_TABLE1_TABLE2_FIGURE_SOURCE_0_1||{};
  ck(index.source_packet?.git_blob_sha===H.e&&index.source_first_inventory?.git_blob_sha===H.b&&index.whole_original_17_page_source_cold_complete===false&&index.G1_authorized===false,'exact current SSC in-row source evidence '+id);
 }
 ck(now.guards?.L04_original_remaining_exact_source_groups===14&&now.guards?.source_census_freeze_complete===false,'SSC G0 not falsely frozen');
 ck(p.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.4'&&q.schema==='isograph.track-L.G0.six-original-source-first-finite-convergence-register.v0.5'&&q.finite_source_register_predecessor?.git_blob_sha===H.oldReg,'six source register versioned authority');
 ck(q.current_ssc?.git_blob_sha===H.now&&q.per_source?.find(z=>z.source==='L04')?.original_exact_cell_expression_groups_not_yet_independently_verified===14&&q.per_source?.every(z=>z.original_complete_cold_review_passed===false),'six source 350/191 L04 exact remainder14 and zero full cold');
 ck(q.denominator?.source_first_location_units===350&&q.denominator?.SSC_identity_owner_assignments===191&&q.denominator?.global_semantic_completeness_PROVEN===false,'source first mixed-granularity not whole original complete');
 ck(u.schema==='lisi.full-treatment.source-traversal-ledger.v0.22'&&t.schema==='lisi.full-treatment.source-traversal-ledger.v0.23'&&t.predecessor==='SOURCE_TRAVERSAL_LEDGER_0_22.json','traversal conserved ancestry');
 ck(t.current_census?.git_blob_sha===H.now&&t.current_L04_source_first_inventory?.git_blob_sha===H.b&&t.current_L04_new_visual_packet?.git_blob_sha===H.e&&t.current_G0_six_original_finite_convergence?.git_blob_sha===H.reg,'current source traversal exact links');
 ck(t.complete_sources===0&&t.sources?.length===6&&t.sources.every(z=>z.current_complete===false)&&t.G1_authorized===false,'all source cold and later stages open');
 ck(g0.schema==='isograph.exp062-l-current-stage-gate.v0.85'&&g.schema==='isograph.exp062-l-current-stage-gate.v0.86'&&g.predecessor_gate?.git_blob_sha===H.oldGate&&g.stage==='G0'&&g.status?.endsWith('OPEN_UNFROZEN'),'exact G0 procedural gate ancestor');
 ck(g.current_source_census?.git_blob_sha===H.now&&g.source_traversal?.git_blob_sha===H.tr&&g.six_original_source_first_convergence?.git_blob_sha===H.reg&&g.source_first_L04_packet?.git_blob_sha===H.b&&g.L04_exact_weight_tables_packet?.git_blob_sha===H.e&&g.source_verifier?.git_blob_sha===H.self,'all current gate source and verifier SHA');
 ck(g.source_CI?.status==='PENDING_GITHUB_CI'&&g.source_CI?.hostiles_rejected===null&&g.convergence?.L04?.remaining_original_exact_source_groups===14&&g.convergence?.full_cold_complete_sources===0,'no premature CI/global G0 closure');
 ck(g.current_lawful_state?.source_census_frozen===false&&g.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.DP_pass_authorized===false&&g.current_lawful_state?.cross_track_synthesis_authorized===false&&g.W_track_mutated===false&&g.PR70_merge_authorized===false,'no G1/DP, W or PR merge');
 return issues;
}
const attacks=[
 ['change_Table1_cell',z=>z.e.table1.source_sign_pair_instances_12[2].omegaS=-1],
 ['switch_Table1_glyph',z=>z.e.table1.source_exact_six_row_sign_templates[0].source_sign_glyphs[0]='∓1'],
 ['change_Table1_half_factor',z=>z.e.table1.source_exact_six_row_sign_templates[4].weight_units=1],
 ['erase_Table1_template',z=>z.e.table1.source_exact_six_row_sign_templates.pop()],
 ['lose_weight_convention',z=>z.e.table1.source_correction_omegaS_equals_minus_j3I=false],
 ['change_Table2_an_h',z=>z.e.table2.original_annihilation_source_rows_8[0].h2=1],
 ['change_Table2_q',z=>z.e.table2.original_annihilation_source_rows_8[7].q2=1],
 ['change_create_boost',z=>z.e.table2.original_creation_source_rows_8[0].omegaT2=1],
 ['erase_create_row',z=>z.e.table2.original_creation_source_rows_8.pop()],
 ['switch_creation_to_annihilation',z=>z.e.table2.original_creation_source_rows_8[0].operator='annihilation'],
 ['forge_Table2_cell_count',z=>z.e.table2.source_original_numeric_cells=63],
 ['erase_Table2_heli_city',z=>z.e.table2.source_heli_city_relation='generic'],
 ['change_Fig1_triality_color',z=>z.e.figures.source_fig1.triality_intergeneration_edges='green'],
 ['forge_Fig1_full_plot',z=>z.e.figures.source_fig1.complete_plot_incidence_cold_verified=true],
 ['change_Fig2_192',z=>z.e.figures.source_fig2.source_state_count=24],
 ['change_Fig2_neutrino_color',z=>z.e.figures.source_fig2.source_type_to_color[0][1]='blue'],
 ['invent_drawn_Fig2_CPT_cubes',z=>z.e.figures.source_fig2.source_CPT_cubes='drawn'],
 ['forge_Fig2_full_plot',z=>z.e.figures.source_fig2.complete_plot_incidence_cold_verified=true],
 ['substitute_original_v1',z=>z.e.original_source.revision='arXiv:2407.02497v1'],
 ['forge_original_PDF_SHA',z=>z.e.original_source.exact_official_PDF_SHA256='bad'],
 ['change_prior_triality_sign',z=>z.hist.triality.triality_integer_sign_rows[0]='+-+-'],
 ['erase_historical_failed_transcript',z=>z.hist.evidence_scope.initial_CI_failed_and_preserved=false],
 ['reopen_exact_Table3',z=>z.b.locations.find(x=>x.id==='L04-S026').disposition=z.b.dispositions.P],
 ['reopen_exact_triality_matrix',z=>z.b.locations.find(x=>x.id==='L04-S039').disposition=z.b.dispositions.P],
 ['forge_fig1_exact_status',z=>z.b.locations.find(x=>x.id==='L04-S041').disposition=z.b.dispositions.V],
 ['lose_source_table2_provenance',z=>z.b.locations.find(x=>x.id==='L04-S019').original_source_evidence.git_blob_sha='bad'],
 ['lose_source_unit',z=>z.b.locations.pop()],
 ['import_W_SSC',z=>z.b.locations.find(x=>x.id==='L04-S012').ssc_ids.push('W-SSC-003')],
 ['erase_source_binary_verified',z=>z.b.frozen_primary.source_byte_hash_verified=false],
 ['mutate_unrelated_L_SSC',z=>z.now.items.find(x=>x.id==='L-SSC-021').body+=' unsourced'],
 ['mutate_L06_SSC',z=>z.now.items.find(x=>x.id==='L-SSC-161').body+=' L04'],
 ['erase_SSC_item',z=>z.now.items.pop()],
 ['erase_Source_Table1_SSC',z=>z.now.items.find(x=>x.id==='L-SSC-098').body='generic'],
 ['forge_source_packet_pointer',z=>z.now.items.find(x=>x.id==='L-SSC-119').source_expression_census.L04_V2_TABLE1_TABLE2_FIGURE_SOURCE_0_1.source_packet.git_blob_sha='bad'],
 ['force_SSC_freeze',z=>z.now.guards.source_census_freeze_complete=true],
 ['revert_register_L04_to_16',z=>z.reg.per_source.find(x=>x.source==='L04').original_exact_cell_expression_groups_not_yet_independently_verified=16],
 ['forge_full_original_cold',z=>z.reg.per_source[0].original_complete_cold_review_passed=true],
 ['forge_350_total',z=>z.reg.denominator.source_first_location_units=351],
 ['forge_traversal_parent',z=>z.tr.predecessor='SOURCE_TRAVERSAL_LEDGER_0_21.json'],
 ['forge_traversal_source_packet',z=>z.tr.current_L04_new_visual_packet.git_blob_sha='bad'],
 ['premature_traversal_source_complete',z=>z.tr.sources.find(x=>x.id==='L04').current_complete=true],
 ['promote_G1_traversal',z=>z.tr.G1_authorized=true],
 ['forge_gate_parent',z=>z.gate.predecessor_gate.git_blob_sha='bad'],
 ['forge_gate_verifier',z=>z.gate.source_verifier.git_blob_sha='bad'],
 ['pretend_Github_CI_success',z=>z.gate.source_CI.status='SUCCESS'],
 ['promote_G0_gate',z=>z.gate.current_lawful_state.source_census_frozen=true],
 ['promote_G1_gate',z=>z.gate.current_lawful_state.G1_authorized=true],
 ['promote_W_bridge',z=>z.gate.current_lawful_state.cross_track_synthesis_authorized=true],
 ['force_draft_PR_merge',z=>z.gate.PR70_merge_authorized=true]
];
const D={e:read(F.e),a:read(F.a),b:read(F.b),hist:read(F.hist),old:read(F.old),now:read(F.now),oldReg:read(F.oldReg),reg:read(F.reg),oldTr:read(F.oldTr),tr:read(F.tr),oldGate:read(F.oldGate),gate:read(F.gate),hashes:Object.fromEntries(Object.entries(F).map(([k,p])=>[k,sha(p)]))};
let errs=verify(D),rejected=0;
for(const [name,mutate] of attacks){
 const item=JSON.parse(JSON.stringify(D));
 try{mutate(item);if(verify(item).length)rejected++;else errs.push('HOSTILE_ESCAPED '+name);}catch(e){errs.push('HOSTILE_ERROR '+name+': '+String(e));}
}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L04-original-weight-tables-source-fidelity.v0.1',pass:errs.length===0,issues:errs,exact_new_source_tables:2,previous_exact_source_objects_reconciled:2,table1_sign_branch_weights:12,table2_exact_numeric_cells:64,L04_remaining_original_exact_groups:14,SSC_existing_identities:191,unchanged_complete_source_records:185,hostiles_defined:attacks.length,hostiles_rejected:rejected,independent_whole_original_cold_complete:false,G0_frozen:false,G1_authorized:false},null,2));
if(errs.length)process.exitCode=1;
