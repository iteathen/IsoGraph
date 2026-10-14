// Track L G0: scoped frozen L03 graded operator, source-SSC conservation and stage guard.
// Not a whole-source mathematical or physical qualification.
import fs from 'node:fs';import crypto from 'node:crypto';
const P='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const F={source:P+'LISI_L03_ORIGINAL_CURVATURE_DIRAC_SUPERCONNECTION_G0_0_1.json',oldInv:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_3.json',inv:P+'LISI_L03_SOURCE_FIRST_REVERSE_COVERAGE_0_4.json',oldSSC:P+'SOURCE_SEMANTIC_CENSUS_0_57.json',ssc:P+'SOURCE_SEMANTIC_CENSUS_0_58.json',reg:P+'L_G0_SIX_ORIGINAL_FINITE_SOURCE_FIRST_CONVERGENCE_0_7.json',tr:P+'SOURCE_TRAVERSAL_LEDGER_0_25.json',oldGate:E+'L_CURRENT_STAGE_GATE_0_90.json',gate:E+'L_CURRENT_STAGE_GATE_0_91.json',self:E+'tools/verify-l-g0-l03-graded-source-0-1.mjs'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{let b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const A={src:read(F.source),before:read(F.oldInv),audit:read(F.inv),old:read(F.oldSSC),ssc:read(F.ssc),reg:read(F.reg),tr:read(F.tr),oldGate:read(F.oldGate),gate:read(F.gate)};
const refs={src:sha(F.source),before:sha(F.oldInv),audit:sha(F.inv),old:sha(F.oldSSC),ssc:sha(F.ssc),reg:sha(F.reg),tr:sha(F.tr),oldGate:sha(F.oldGate),self:sha(F.self)};
const ids=['L03-S022','L03-S023','L03-S024','L03-S038','L03-S039'],changed=['L-SSC-076','L-SSC-077','L-SSC-089'];
const replay='ORIGINAL_GRADED_CURVATURE_DIRAC_SUPERCONNECTION_LITERAL_AND_CARRIER_SCOPE_RECONCILED_GLOBAL_COLD_OPEN';
function check(d){
 const bad=[],test=(v,m)=>{if(!v)bad.push(m);};
 const s=d.src||{},o=d.before||{},a=d.audit||{},p=d.old||{},n=d.ssc||{},r=d.reg||{},t=d.tr||{},g=d.gate||{},prior=d.oldGate||{};
 test(s.schema==='isograph.track-L.G0.L03-original-unified-superconnection-graded-source-scope.v0.1'&&s.track==='L'&&s.stage==='G0','source-only L G0');
 test(s.original_source?.frozen_revision==='arXiv:1006.4908v1'&&s.original_source?.source_pdf_sha256==='603d1319f3887917ee76a898a5153c261818b85f3d0946d113ea91b5afe3697e','exact original PDF version and hash');
 test(s.direct_source_original_numbered_equations?.length===6,'original six Eq source spans');
 const eq=Object.fromEntries((s.direct_source_original_numbered_equations||[]).map(x=>[x.number,x.formula]));
 test(eq['3.5']?.includes('de+(1/2)omega e+(1/2)e omega'),'torsion outer halves');
 test(eq['3.6']?.includes('(1/4)e^a phi^P Gamma_aP')&&eq['3.6']?.includes('(1/2)A^PQ Gamma_PQ'),'H frame versus gauge normalization');
 test(eq['3.7']?.includes('(1/2)(R-(1/8)ee phi^2)')&&eq['3.7']?.includes('(1/4)(T phi-e Dphi)'),'curvature outer half and mixed quarter');
 test(eq['3.8']?.includes('Dpsi=dpsi+Hpsi')&&eq['4.6']?.includes('mathcal_A=H+psi')&&eq['4.7']?.includes('psi psi'),'Dirac versus formal superconnection');
 test(s.source_discrepancy_and_negative_guards?.source_psi_GRAssmann_not_spacetime_1form===true&&s.source_discrepancy_and_negative_guards?.source_semidirect_zero_Q_Q_not_erasable_E8_psi_psi===true,'fermion grade/source distinction');
 test(s.whole_original_PDF_semantic_cold_complete===false&&s.G0_frozen===false&&s.G1_authorized===false,'not whole source qualified');
 test(o.original_first_locations?.length===47&&a.original_first_locations?.length===47&&a.schema==='isograph.track-L.G0.L03-original-source-first-bidirectional-coverage.v0.4','47 old L03 source groups');
 const edited=[];for(let i=0;i<47;i++){const u=o.original_first_locations[i]||{},v=a.original_first_locations[i]||{};test(u.source_location_id===v.source_location_id,'source identity '+i);if(JSON.stringify(u)!==JSON.stringify(v))edited.push(v.source_location_id);}
 test(edited.join(',')===ids.join(','),'42 original source rows wholly conserved');
 for(const id of ids){let row=a.original_first_locations.find(x=>x.source_location_id===id);test(row?.disposition===replay&&row?.original_source_operator_evidence?.git_blob_sha===refs.src&&row?.original_source_operator_evidence?.global_original_formula_and_carrier_cold_complete===false,'exact source reclassification '+id);}
 test(a.counts?.by_disposition?.MAPPED_ORIGINAL_FORMULA_TABLE_ORDER_EXACTNESS_NOT_INDEPENDENTLY_RECONSTRUCTED===17,'17 original L03 formula groups remain');
 test(p.items?.length===191&&n.items?.length===191&&n.schema==='woit-lisi.track-l.source-semantic-census.v0.58','SSC 191 intact');
 const moved=[];for(let i=0;i<191;i++){test(p.items[i]?.id===n.items[i]?.id,'SSC identity '+i);if(JSON.stringify(p.items[i])!==JSON.stringify(n.items[i]))moved.push(n.items[i].id);}
 test(moved.join(',')===changed.join(',')&&n.revision?.unchanged_source_items===188,'188 whole source records preserved');
 test(n.predecessor?.git_blob_sha===refs.old&&n.revision?.source_packet?.git_blob_sha===refs.src&&n.revision?.source_first_inverse?.git_blob_sha===refs.audit,'exact SSC evidence lineage');
 const body=id=>n.items.find(x=>x.id===id)?.body||'';
 test(body('L-SSC-076').includes('(ωe+eω)/2'),'SSC torsion');
 test(body('L-SSC-077').includes('(1/2)(R−(1/8)eeφ²)')&&body('L-SSC-077').includes('(1/4)(Tφ−eDφ)'),'SSC curvature');
 test(body('L-SSC-089').includes('NOT ordinary spacetime')&&body('L-SSC-089').includes('[Q,Q]=0')&&body('L-SSC-089').includes('only for the chosen H'),'SSC conditional Grassmann semantics');
 for(const id of changed){let z=n.items.find(x=>x.id===id)?.source_expression_census?.L03_ORIGINAL_GRADED_SOURCE_OPERATOR_0_1;test(z?.evidence_packet?.git_blob_sha===refs.src&&z?.inverse?.git_blob_sha===refs.audit&&z?.global_original_source_semantic_cold_complete===false,'source evidence SSC '+id);}
 test(n.guards?.source_census_freeze_complete===false&&n.guards?.L03_original_remaining_exact_formula_groups===17,'SSC not frozen');
 test(r.current_ssc?.git_blob_sha===refs.ssc&&r.per_source?.find(x=>x.source==='L03')?.audit_git_blob_sha===refs.audit&&r.per_source?.find(x=>x.source==='L03')?.original_exact_cell_expression_groups_not_yet_independently_verified===17&&r.per_source?.find(x=>x.source==='L03')?.original_complete_cold_review_passed===false,'finite six-source L03 not cold complete');
 test(t.current_census?.git_blob_sha===refs.ssc&&t.current_L03_source_first_inventory?.git_blob_sha===refs.audit&&t.current_G0_six_original_finite_convergence?.git_blob_sha===refs.reg&&t.complete_sources===0&&t.G1_authorized===false,'source traversal current G0');
 test(prior.schema==='isograph.exp062-l-current-stage-gate.v0.90'&&g.schema==='isograph.exp062-l-current-stage-gate.v0.91'&&g.predecessor_gate?.git_blob_sha===refs.oldGate,'exact gate predecessor');
 test(g.current_source_census?.git_blob_sha===refs.ssc&&g.source_traversal?.git_blob_sha===refs.tr&&g.source_first_L03_packet?.git_blob_sha===refs.audit&&g.L03_original_graded_operators?.git_blob_sha===refs.src&&g.source_first_global_convergence?.git_blob_sha===refs.reg&&g.source_verifier?.git_blob_sha===refs.self,'gate source/SSC/verifier SHA pins');
 test(g.source_CI?.status==='PENDING_GITHUB_CI'&&g.source_CI?.hostiles_rejected===null&&g.convergence?.L03?.exact_source_groups_pending===17,'new CI pending, 17 exact groups');
 test(g.previous_L03_CI?.run_id===38077824391&&g.previous_L03_CI?.conclusion==='success'&&g.previous_L03_CI?.initial_failed_conclusion==='failure','historical CI status preserved');
 test(g.current_lawful_state?.source_census_frozen===false&&g.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.cross_track_synthesis_authorized===false&&g.PR70_merge_authorized===false,'no G0/G1/W/merge promotion');
 return bad;
}
const mutants=[
 ['delete_eq',d=>d.src.direct_source_original_numbered_equations.pop()],
 ['change_half',d=>d.src.direct_source_original_numbered_equations.find(x=>x.number==='3.7').formula='F=R+Tphi'],
 ['remove_graded_fermion',d=>d.src.source_discrepancy_and_negative_guards.source_psi_GRAssmann_not_spacetime_1form=false],
 ['claim_original_cold',d=>d.src.whole_original_PDF_semantic_cold_complete=true],
 ['erase_original_group',d=>d.audit.original_first_locations.pop()],
 ['regress_original_S024',d=>d.audit.original_first_locations.find(x=>x.source_location_id==='L03-S024').disposition='MAPPED_ORIGINAL_FORMULA_TABLE_ORDER_EXACTNESS_NOT_INDEPENDENTLY_RECONSTRUCTED'],
 ['modify_other_original',d=>d.audit.original_first_locations[0].source_semantic_group+=' forged'],
 ['rewrite_other_SSC',d=>d.ssc.items.find(x=>x.id==='L-SSC-001').body+=' changed'],
 ['erase_curvature_body',d=>d.ssc.items.find(x=>x.id==='L-SSC-077').body='generic'],
 ['erase_SSC_pointer',d=>delete d.ssc.items.find(x=>x.id==='L-SSC-089').source_expression_census.L03_ORIGINAL_GRADED_SOURCE_OPERATOR_0_1],
 ['invent_SSC',d=>d.ssc.items.push(d.ssc.items[0])],
 ['forge_source_freeze',d=>d.ssc.guards.source_census_freeze_complete=true],
 ['forge_register_cold',d=>d.reg.per_source.find(x=>x.source==='L03').original_complete_cold_review_passed=true],
 ['erase_register_debt',d=>d.reg.per_source.find(x=>x.source==='L03').original_exact_cell_expression_groups_not_yet_independently_verified=0],
 ['rewrite_traversal',d=>d.tr.current_L03_source_first_inventory.git_blob_sha='wrong'],
 ['traversal_G1',d=>d.tr.G1_authorized=true],
 ['gate_wrong_parent',d=>d.gate.predecessor_gate.git_blob_sha='bad'],
 ['gate_wrong_source',d=>d.gate.L03_original_graded_operators.git_blob_sha='bad'],
 ['gate_wrong_checker',d=>d.gate.source_verifier.git_blob_sha='bad'],
 ['invent_CI_pass',d=>d.gate.source_CI.status='SUCCESS'],
 ['relabel_old_failed_CI',d=>d.gate.previous_L03_CI.initial_failed_conclusion='success'],
 ['premature_G0',d=>d.gate.current_lawful_state.source_census_frozen=true],
 ['premature_G1',d=>d.gate.current_lawful_state.G1_authorized=true],
 ['import_W',d=>d.gate.current_lawful_state.cross_track_synthesis_authorized=true],
 ['merge_PR',d=>d.gate.PR70_merge_authorized=true]
];
const failures=check(A);let rejected=0;
for(const [name,change]of mutants){const d=JSON.parse(JSON.stringify(A));try{change(d);if(check(d).length)rejected++;else failures.push('ESCAPED '+name);}catch(e){failures.push('HOSTILE_ERROR '+name+':'+String(e));}}
console.log(JSON.stringify({schema:'isograph.exp062.L.G0.L03.original-graded-source.v0.1',pass:!failures.length,issues:failures,source_eqs:6,source_loci_repaired:5,L03_exact_source_groups_remaining:17,SSC_identities:191,SSC_unchanged:188,hostiles_defined:mutants.length,hostiles_rejected:rejected,G0_frozen:false,G1_authorized:false},null,2));
if(failures.length)process.exitCode=1;