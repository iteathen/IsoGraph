import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const files={
packet:L+'LISI_L01_H1_GAMMA_TO_PRINTED_RELATIVE_PHASE_DIAGNOSTIC_G0_0_1.json',
cl71:L+'LISI_L01_GRAVIWEAK_CL71_H1_SOURCE_G0_0_1.json',
h1:L+'LISI_L01_H1_POSITIVE_CHIRAL_FIELD_BLOCKS_G0_0_1.json',
ssc:L+'SOURCE_SEMANTIC_CENSUS_0_25.json',gate:E+'L_CURRENT_STAGE_GATE_0_25.json'};
const read=x=>JSON.parse(fs.readFileSync(x,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const blobsha=x=>{const b=fs.readFileSync(x);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const pkt=read(files.packet),cl=read(files.cl71),h1=read(files.h1),ssc=read(files.ssc),gate=read(files.gate);
const C=(a=0,b=0)=>[a,b],cmul=([ar,ai],[br,bi])=>[ar*br-ai*bi,ar*bi+ai*br],cadd=([ar,ai],[br,bi])=>[ar+br,ai+bi];
const mat=(m,n=m)=>Array.from({length:m},()=>Array.from({length:n},()=>C()));
const scaled=(m,factor)=>m.map(row=>row.map(z=>cmul(z,factor)));
const plus=(a,b)=>a.map((row,i)=>row.map((z,k)=>cadd(z,b[i][k])));
const multiply=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((z,v,k)=>cadd(z,cmul(v,b[k][j])),C())));
const kron=(a,b)=>a.flatMap(row=>b.map(br=>row.flatMap(x=>br.map(y=>cmul(x,y)))));
const product=factors=>factors.reduce(kron);
const I=[[C(1),C()],[C(),C(1)]],
s1=[[C(),C(1)],[C(1),C()]],
s2=[[C(),C(0,-1)],[C(0,1),C()]],
s3=[[C(1),C()],[C(),C(-1)]];
const Pauli={sigma1:s1,sigma2:s2,sigma3:s3,I2:I};
const gammaStrings=[
 ['Gamma1','sigma2 tensor sigma3 tensor I2 tensor sigma1'],
 ['Gamma2','sigma2 tensor sigma3 tensor I2 tensor sigma2'],
 ['Gamma3','sigma2 tensor sigma3 tensor I2 tensor sigma3'],
 ['Gamma4','i*sigma1 tensor I2 tensor I2 tensor I2'],
 ['GammaPrime1','sigma2 tensor sigma1 tensor sigma1 tensor I2'],
 ['GammaPrime2','sigma2 tensor sigma1 tensor sigma2 tensor I2'],
 ['GammaPrime3','sigma2 tensor sigma1 tensor sigma3 tensor I2'],
 ['GammaPrime4','sigma2 tensor sigma2 tensor I2 tensor I2']
];
function gamma(str){
 const imaginary=str.startsWith('i*'),parts=(imaginary?str.slice(2):str).split(' tensor ');
 if(parts.length!==4||parts.some(x=>!Pauli[x]))throw Error('unrecognized exact source Pauli tensor');
 const a=product(parts.map(x=>Pauli[x]));
 if(a.length!==16||a[0].length!==16)throw Error('source Cl71 tensor dimension mismatch');
 return imaginary?scaled(a,C(0,1)):a;
}
const originalGamma=gammaStrings.map(x=>gamma(x[1]));
const sourcePositions=[
 [0,2,-1,'R','phiOne'],[0,3,1,'R','phiPlus'],[1,2,1,'R','phiMinus'],[1,3,1,'R','phiZero'],
 [2,0,-1,'L','phiZero'],[2,1,1,'L','phiPlus'],[3,0,1,'L','phiMinus'],[3,1,1,'L','phiOne']];
const phis={
phiPlus:[C(1),C(0,-1),C(),C()],
phiMinus:[C(1),C(0,1),C(),C()],
phiZero:[C(),C(),C(-1),C(0,-1)],
phiOne:[C(),C(),C(-1),C(0,1)]
};
function frame(side,mu){return mu===3?scaled(I,C(0,1)):scaled([s1,s2,s3][mu],side==='R'?C(0,-1):C(0,1));}
const mixedRegex=/^([+-])\(1\/4\)\*e_([RL])\*(phiPlus|phiMinus|phiZero|phiOne)$/;
function emittedPrinted(mu,nu,rows){
 const out=mat(8);
 for(const [row,col]of sourcePositions.map(v=>v.slice(0,2))){
  const token=rows[row][col],m=mixedRegex.exec(token);
  if(!m)throw Error('mixed source operator missing at printed position '+row+','+col);
  const factor=cmul(C(m[1]==='+'?1:-1),phis[m[3]][nu]);
  const block=scaled(frame(m[2],mu),factor);
  for(let i=0;i<2;i++)for(let j=0;j<2;j++)out[2*row+i][2*col+j]=block[i][j];
 }
 return out;
}
const firstQuadrant=x=>x.slice(0,8).map(row=>row.slice(0,8));
function run(source=pkt,rows=h1.displayed_4x4_2x2_field_blocks.ordered_rows){
 const errors=[],ck=(v,m)=>{if(!v)errors.push(m)};
 ck(source.schema==='isograph.lisi-l01-cl71-to-H1-native-basis-mixed-phase-diagnostic.g0.v0.1'&&source.track==='L'&&source.stage==='G0'&&source.authority===false,'research discrepancy not theorem');
 ck(source.source?.id==='L01'&&source.source?.revision==='arXiv:0711.0770v1 2007-11-06'&&source.source?.scope?.includes('SAME e^mu and phi^nu')&&source.source?.scope?.includes('Does NOT test all possible'),'frozen L01 source and comparison scope');
 for(const [key,path]of [['Cl71_source',files.cl71],['H1_printed_2x2_blocks',files.h1],['current_SSC_0_25',files.ssc],['G0_GATE_0_25',files.gate]])
 ck(source.parents?.[key]?.path===path&&source.parents?.[key]?.git_blob_sha===blobsha(path),'source and gate blob pinned '+key);
 ck(ssc.items?.length===191&&gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.G0_source_census_frozen===false,'current G0 context unpromoted');
 for(const [k,expect]of gammaStrings.entries())ck(cl.gamma_source?.eight_ordered_generators?.[k]?.label===expect[0]&&cl.gamma_source.eight_ordered_generators[k]?.source_tensor===expect[1],'source eight Pauli matrices input identity '+k);
 ck(j(source.mathematical_sources?.Gamma_roles)===j(cl.gamma_source.eight_ordered_generators)&&source.mathematical_sources?.source_first_quadrant?.includes('16 ordered products'),'source operator roles not silently normalized');
 ck(source.mathematical_sources?.source_H1_equation==='H_1=omega/2 + (e phi)/4 + w_ew; source e phi=sum_mu nu e^mu phi^nu Gamma_mu GammaPrime_nu.','source scalar and one-form product order');
 ck(source.mathematical_sources?.source_T_quarantine?.includes('No L/W comparison'),'strict L-only source');
 for(const k of ['source_census_frozen','source_math_theorem_qualified','G1_authorized','external_cold_review_passed'])ck(source[k]===false,'no source theorem and downstream '+k);
 const ev=source.finite_claim_under_declared_representation||{},diag=ev.project_generated_scalar_diagnostic_NOT_SOURCE||{};
 ck(ev.ordered_basis_product_pairs===16&&ev.matrix_dimension===8&&ev.cells_compared_per_basis_pair===64&&ev.direct_native_tensor_vs_printed_H1_mixed_pairs_exactly_equal===0&&ev.direct_native_tensor_vs_printed_H1_mixed_coefficient_mismatches===128&&ev.direct_source_pair_nonzero_mismatched_entries_each===8,'exact reported source same-basis coverage');
 ck(diag.factor==='-i'&&diag.pairs_checked===16&&diag.native_tensor_to_printed_mixed_mismatch_after_factor===0&&diag.global_gamma_Clifford_redefinition_authorized===false&&diag.field_coefficient_redefinition_authorized===false&&diag.field_grading_or_dynamics_qualified===false,'project-only phase counterfactual no authority');
 ck(source.discrepancy_disposition?.source_published_error==='NOT_ESTABLISHED'&&source.discrepancy_disposition?.representation_owner==='UNRESOLVED_CANDIDATE'&&source.discrepancy_disposition?.comparison_field_roles==='EQUAL_DECLARED_e_mu_phi_nu_SCOPE_ONLY','source-error attribution withheld');
 ck(source.strict_nonconclusions?.length===5&&source.strict_nonconclusions?.some(x=>x.includes('NOT proof of an intrinsic mathematical inconsistency'))&&source.strict_nonconclusions?.some(x=>x.includes('NOT a source-asserted')),'source/formula vs basis gap candid');
 ck(j(rows)===j(h1.displayed_4x4_2x2_field_blocks.ordered_rows)&&rows.length===4,'printed independent source matrix not modified under diagnostic mutation');
 if(errors.length)return{errors,results:null};
 // Independent Pauli complex arithmetic for each of all 16 ordered products, no source-fixed relative -i imported.
 let matchedDirect=0,matchedAfterDiagnostic=0,mismatchesDirect=0,first=null,pairBadCells=[];
 for(let mu=0;mu<4;mu++)for(let nu=0;nu<4;nu++){
  const tensor=firstQuadrant(multiply(originalGamma[mu],originalGamma[4+nu]));
  const printed=emittedPrinted(mu,nu,rows);
  const diagnostic=scaled(tensor,C(0,-1));
  let directBad=0,correctedBad=0;
  for(let r=0;r<8;r++)for(let c=0;c<8;c++){
   const eqA=j(tensor[r][c])===j(printed[r][c]),eqB=j(diagnostic[r][c])===j(printed[r][c]);
   if(!eqA){directBad++;mismatchesDirect++;first??={mu:mu+1,nu:nu+1,source_row:r,source_col:c,direct_first_quadrant_Gamma_mu_GammaPrime_nu:tensor[r][c],printed_8x8_H1_block_ephi_coefficient:printed[r][c],direct_product_times_minus_i:diagnostic[r][c]};}
   if(!eqB)correctedBad++;
  }
  pairBadCells.push(directBad);
  matchedDirect+=(directBad===0);matchedAfterDiagnostic+=(correctedBad===0);
 }
 ck(matchedDirect===0&&matchedAfterDiagnostic===16&&mismatchesDirect===128&&pairBadCells.every(n=>n===8),'original natural tensor basis mismatch 128 cells; all 16 require -i diagnostic');
 const witness=ev.first_counterexample||{};
 ck(j(first)===j({mu:witness.mu,nu:witness.nu,source_row:witness.source_row,source_col:witness.source_col,
 direct_first_quadrant_Gamma_mu_GammaPrime_nu:C(1),printed_8x8_H1_block_ephi_coefficient:C(0,-1),direct_product_times_minus_i:C(0,-1)}),'actual finite first mixed-source witness, not invented');
 ck(witness.direct_first_quadrant_Gamma_mu_GammaPrime_nu==='1'&&witness.printed_8x8_H1_block_ephi_coefficient==='-i'&&witness.direct_product_times_minus_i==='-i'&&witness.source_full_H1_mixed_prefactor==='1/4 on both representations','original source phase witness exact text');
 // Positive Pauli/Cartan controls independent of mixed source order:
 const gg=firstQuadrant(multiply(originalGamma[0],originalGamma[1]));
 const pp=firstQuadrant(multiply(originalGamma[4],originalGamma[5]));
 for(let block=0;block<4;block++)for(let r=0;r<2;r++)for(let c=0;c<2;c++){
  ck(j(gg[2*block+r][2*block+c])===j(cmul(C(0,1),s3[r][c])),'gravity Gamma1Gamma2 expected source i*sigma3 orientation');
  ck(j(pp[2*block+r][2*block+c])===j(block%2===0?(r===c?C(0,r===0?1:1):C()):(r===c?C(0,-1):C())),'electroweak sigma3 W3/B1 source orientation');
 }
 return{errors,results:{ordered_mixed_pairs:16,comparison_cells:1024,mismatches_native:128,pairs_equal_native:0,
 phase_diagnostic:'-i',pairs_equal_after_diagnostic:16,first_native_witness:first,pure_source_sector_positive_controls:true,
 alternative_source_bases_exhaustively_tested:false,source_mathematical_error_proved:false}};
}
const baseline=run(),errors=[...baseline.errors],mutations=[
 ['mutate source gamma original',p=>{p.mathematical_sources.Gamma_roles[0].source_tensor='sigma1'}],
 ['wrong source revision',p=>{p.source.revision='0711.0770v2'}],
 ['change natural first quadrant definition',p=>{p.mathematical_sources.source_first_quadrant='second quadrant'}],
 ['fabricate native direct equality',p=>{p.finite_claim_under_declared_representation.direct_native_tensor_vs_printed_H1_mixed_pairs_exactly_equal=16}],
 ['change 128 exact mismatches',p=>{p.finite_claim_under_declared_representation.direct_native_tensor_vs_printed_H1_mixed_coefficient_mismatches=127}],
 ['change witness Gamma scalar',p=>{p.finite_claim_under_declared_representation.first_counterexample.direct_first_quadrant_Gamma_mu_GammaPrime_nu='i'}],
 ['move witness row',p=>{p.finite_claim_under_declared_representation.first_counterexample.source_row=1}],
 ['change phase -i to i',p=>{p.finite_claim_under_declared_representation.project_generated_scalar_diagnostic_NOT_SOURCE.factor='i'}],
 ['alter scalar diagnostic zero count',p=>{p.finite_claim_under_declared_representation.project_generated_scalar_diagnostic_NOT_SOURCE.native_tensor_to_printed_mixed_mismatch_after_factor=16}],
 ['claim scalar as source fix',p=>{p.finite_claim_under_declared_representation.project_generated_scalar_diagnostic_NOT_SOURCE.global_gamma_Clifford_redefinition_authorized=true}],
 ['claim field redefinition authorizes',p=>{p.finite_claim_under_declared_representation.project_generated_scalar_diagnostic_NOT_SOURCE.field_coefficient_redefinition_authorized=true}],
 ['attribute published mathematics error',p=>{p.discrepancy_disposition.source_published_error='CONFIRMED'}],
 ['claim exhaustive basis search',p=>{p.discrepancy_disposition.representation_owner='NOT_A_BASIS_ISSUE'}],
 ['claim source SSC fixed',p=>{p.source_census_frozen=true}],
 ['qualify Clifford theorem',p=>{p.source_math_theorem_qualified=true}],
 ['authorize G1',p=>{p.G1_authorized=true}],
 ['fake external review',p=>{p.external_cold_review_passed=true}],
 ['incorrect ssc SHA',p=>{p.parents.current_SSC_0_25.git_blob_sha='STALE'}],
 ['incorrect packet SHA',p=>{p.parents.H1_printed_2x2_blocks.git_blob_sha='STALE'}],
 ['drop source uncertainty',p=>{p.strict_nonconclusions=[]}],
 ['W import',p=>{p.mathematical_sources.source_T_quarantine='W-SSC-103 is source authority'}]
];
let rejected=0;
if(!baseline.errors.length)for(const [name,fn]of mutations){const x=cp(pkt),before=j(x);fn(x);if(j(x)===before)errors.push('NOOP '+name);else if(run(x).errors.length===0)errors.push('ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l01-h1-native-Gamma-relative-phase.v0.1',pass:errors.length===0,errors:errors.slice(0,30),baseline:baseline.results,
 adversarial_defined:mutations.length,adversarial_rejected:rejected,mutation_gate:baseline.errors.length?'BASELINE_FAILED':'TESTED',
 source_published_defect_proved:false,G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
