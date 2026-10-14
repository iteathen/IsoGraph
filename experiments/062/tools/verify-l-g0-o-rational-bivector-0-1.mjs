import fs from 'node:fs';
import crypto from 'node:crypto';

const root='research/woit-lisi-isomorph/lisi/',exp='experiments/062/';
const files={
 proof:root+'LISI_L05_O_RATIONAL_BIVECTOR_CERTIFICATE_G0_0_1.json',
 ssc:root+'SOURCE_SEMANTIC_CENSUS_0_16.json',
 ledger:root+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_2.json',
 prior:root+'LISI_L05_OCTONION_INDEPENDENT_VERSION_REAUDIT_0_1.json',
 gate:exp+'L_CURRENT_STAGE_GATE_0_17.json'
};
const P=JSON.parse(fs.readFileSync(files.proof,'utf8'));
const previous=JSON.parse(fs.readFileSync(files.prior,'utf8'));
const ledger=JSON.parse(fs.readFileSync(files.ledger,'utf8'));
const ssc=JSON.parse(fs.readFileSync(files.ssc,'utf8'));
const gate=JSON.parse(fs.readFileSync(files.gate,'utf8'));
const J=JSON.stringify,copy=o=>JSON.parse(J(o));
const blobSHA=path=>{const b=fs.readFileSync(path);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const SOURCE_LITERAL=[
 'e0 e1 e2 e3 e4 e5 e6 e7',
 'e1 -e0 e4 e7 -e2 e6 -e5 -e3',
 'e2 -e4 -e0 e5 e1 -e3 e7 -e6',
 'e3 -e7 -e5 -e0 e6 e2 -e4 e1',
 'e4 e2 -e1 -e6 -e0 e7 e3 -e5',
 'e5 -e6 e3 -e2 -e7 -e0 e1 e4',
 'e6 e5 -e7 e4 -e3 -e1 -e0 -e2',
 'e7 e3 e6 -e1 e5 -e4 -e2 -e0'
];
const sign=i=>i===0?1:-1;
function tables(lines){
 if(lines.length!==8)throw Error('source table not eight rows');
 return lines.map(line=>{const a=line.split(' ');if(a.length!==8||a.some(v=>!(/^-?e[0-7]$/.test(v))))throw Error('malformed literal source basis entry');return a});
}
const multiply=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((t,v,k)=>t+v*B[k][j],0)));
const transpose=A=>A[0].map((_,i)=>A.map(row=>row[i]));
function comm(A,B){const x=multiply(A,B),y=multiply(B,A);return x.map((row,i)=>row.map((v,j)=>v-y[i][j]));}
function matrices(table,barStyle,chiral){
 const Gamma=[],direct=[];
 for(let c=0;c<8;c++){
  const G=Array.from({length:8},()=>Array(8).fill(0)),B=Array.from({length:8},()=>Array(8).fill(0));
  for(let a=0;a<8;a++){
   const term=table[c][a],r=Number(term.at(-1)),factor=term.startsWith('-')?-1:1;
   G[r][a]=factor*sign(r);
   B[r][a]=factor*sign(c)*sign(a);
  }
  Gamma.push(G);direct.push(B);
 }
 const basis=[],names=[];
 for(let c=0;c<8;c++)for(let d=c+1;d<8;d++){
  const bc=barStyle==='direct'?direct[c]:transpose(Gamma[c]);
  const bd=barStyle==='direct'?direct[d]:transpose(Gamma[d]);
  const M=chiral==='upper'?multiply(bc,Gamma[d]):multiply(Gamma[c],bd);
  basis.push(M);names.push([c,d]);
 }
 return{basis,names};
}
function gcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b){const t=a%b;a=b;b=t}return a||1n}
function Q(a,b=1n){if(b<0n){a=-a;b=-b}if(a===0n)return[0n,1n];const g=gcd(a,b);return[a/g,b/g]}
const sub=(a,b)=>Q(a[0]*b[1]-b[0]*a[1],a[1]*b[1]);
const prod=(a,b)=>Q(a[0]*b[0],a[1]*b[1]);
const nonzero=q=>q[0]!==0n;
function eliminate(values,rows){
 const r=values.map(v=>Q(BigInt(v)));
 for(const row of rows){
  const f=r[row.p];if(!nonzero(f))continue;
  for(let j=row.p;j<r.length;j++)r[j]=sub(r[j],prod(f,row.values[j]));
 }
 return r;
}
function echelon(basis){
 const rows=[];
 for(const matrix of basis){
  const r=eliminate(matrix.flat(),rows),p=r.findIndex(nonzero);
  if(p>=0){const inverse=Q(r[p][1],r[p][0]);rows.push({p,values:r.map(v=>prod(v,inverse))});}
 }
 return rows;
}
function exactProbe(table,mode,block,edited){
 const {basis,names}=matrices(table,mode,block);
 const rows=echelon(basis);
 let inside=0,outside=0,first=null;
 for(let i=0;i<28;i++)for(let k=i+1;k<28;k++){
  const M=comm(basis[i],basis[k]),diff=eliminate(M.flat(),rows),p=diff.findIndex(nonzero);
  if(p<0)inside++;
  else{
   outside++;
   if(!first)first={generators:[names[i],names[k]],rational_residual_coordinate:[Math.floor(p/8),p%8],
    residual_numerator:diff[p][0].toString(),residual_denominator:diff[p][1].toString()};
  }
 }
 const i=names.findIndex(x=>x[0]===0&&x[1]===1),j=names.findIndex(x=>x[0]===0&&x[1]===6);
 const C=comm(basis[i],basis[j]),special=(mode==='transpose'&&block==='lower');
 const a=special?[4,7]:[2,3],b=special?[7,4]:[3,2];
 return{source_version:edited?'ONE_CELL_ALTERNATIVE_NOT_FROZEN':'FROZEN_JOURNAL',
 barGamma_convention:mode==='direct'?'DIRECT_PUBLISHED_M':'PUBLISHED_SIGNATURE_ADJUSTED_TRANSPOSE',
 chiral_block:block,generator_basis_rank_Q:rows.length,generator_count:28,commutators_tested:378,
 outside_span_Q:outside,inside_span_Q:inside,first_outside_witness:first,
 sparse_pair_relation:{coordinate_pairs:[a,b],all_28_generator_values_sum_zero:basis.every(M=>M[a[0]][a[1]]+M[b[0]][b[1]]===0),
  commutator_B01_B06_values_sum:C[a[0]][a[1]]+C[b[0]][b[1]],source_formula:'f(M)=M[r1,c1]+M[r2,c2]',ordinary_Q_linear_functional:true}
 };
}
function verify(d=P){
 const errors=[],ck=(v,s)=>{if(!v)errors.push(s)};
 const i=d.inputs||{},source=d.source||{},g=d.dependencies_and_gates||{},variants=d.all_eight_variants_exact_rational||[];
 ck(d.schema==='isograph.lisi-l05-source-o-rational-bivector-span-certificate.g0.v0.1'&&d.track==='L'&&d.stage==='G0'&&d.authority===false,'L source audit G0 not theorem authority');
 ck(d.mathematical_scope==='SOURCE_DEFINED_ORDINARY_O_OPERATOR_MATRICES_ONLY'&&d.semantic_source_complete===false&&d.G1_authorized===false&&d.external_review_passed===false,'exact scope and no G1');
 ck(source.frozen_version==='2026-08-29 published Springer version of record'&&source.doi==='10.1007/s00006-026-01447-5'&&source.pdf_zero_based_pages?.includes(3),'exact frozen journal');
 ck(J(source.pdf_zero_based_pages)===J([2,3,4])&&source.printed_page_table===4&&source.section==='§2 Eqs. (1), (2), (3), (5)','independent primary page locators');
 for(const [label,k]of[['current_ssc',files.ssc],['frozen_printed_table_ledger',files.ledger],['earlier_version_independent_reaudit',files.prior],['current_procedural_gate',files.gate]])
  ck(i[label]?.path===k&&i[label]?.git_blob_sha===blobSHA(k),'exact parent source hash '+label);
 ck(ssc.items.length===191&&ssc.guards.source_census_freeze_complete===false&&gate.current_lawful_state.G1_authorized===false&&previous.G1_authorized===false,'source and gate still G0');
 ck(d.input_guards?.row_index==='left basis factor e_a'&&d.input_guards?.column_index==='right basis factor e_b'&&d.input_guards?.indexed_table_cells===64,'ordered and complete 64-cell source domain');
 ck(d.input_guards?.original_e6e7==='-e2'&&d.input_guards?.original_e7e6==='-e2'&&d.input_guards?.source_ordinary_metric==='n_ab=delta_ab','source printed signs and ordinary metric');
 ck(d.operator_construction?.G_c_matrix==='G_c[b,a]=epsilon(b)*M[c,a]^b, output row b (conjugated-basis coordinates), input a','source Γ index roles exact');
 ck(d.operator_construction?.bar_D_matrix==='D_c[b,a]=epsilon(c)*epsilon(a)*M[c,a]^b, output row b ordinary-basis coordinates, input a conjugated basis','source direct-M index roles exact');
 ck(d.operator_construction?.bar_T_matrix==='T_c=transpose(G_c), ordinary metric n_cc=+1'&&d.operator_construction?.test_domain?.includes('378'),'source transpose and ordered generator domain');
 ck(d.exact_method?.scalars?.includes('BigInt numerator/denominator')&&d.exact_method?.scalars?.includes('No finite fields')&&d.exact_method?.membership?.includes('zero residual means IN span_Q'),'exact rational independent arithmetic not modular');
 ck(d.counterfactual_repair?.edit_source==='ordinary O row e6 column e7: -e2 -> +e2'&&d.counterfactual_repair?.not_authorized===true&&d.counterfactual_repair?.source_2026_08_journal_changed===false&&d.counterfactual_repair?.editorial_intent_or_formal_erratum_established===false,'no unlawful author table correction');
 ck(g.SSC0_16_source_frozen===false&&g.G1_to_G7_authorized===false&&g.primitive_closure_complete===false&&g.f4_L133_source_mathematics_qualified===false&&g.original_source_table_preserved===true&&g.source_census_full_cold_audit_passed===false,'source qualification must remain negative');
 ck(J(d.independently_visually_transcribed_journal_O_table)===J(SOURCE_LITERAL),'exact 64 independent visual printed table cells');
 const orig=ledger.basis_multiplication_tables.find(x=>x.carrier==='O')?.entries;
 ck(J(orig)===J(tables(SOURCE_LITERAL)),'current original frozen table source unchanged');
 ck(previous.manually_transcribed_primary_tables?.journal_O_rows?.length===8&&J(previous.manually_transcribed_primary_tables.journal_O_rows)===J(SOURCE_LITERAL),'independent predecessor journal result not silently switched');
 ck(variants.length===8,'four source variants and corresponding diagnostic counterparts required');
 if(errors.length)return errors;
 const parsed=tables(d.independently_visually_transcribed_journal_O_table),counter=parsed.map(row=>row.slice());
 counter[6][7]='e2';
 const got=[];
 for(const [edited,T]of[[false,parsed],[true,counter]]){
  for(const mode of['direct','transpose'])for(const block of ['upper','lower'])got.push(exactProbe(T,mode,block,edited));
 }
 ck(J(got)===J(variants),'all exact rational rank, 378 pair outcomes, sparse certificates, alternative controls and witness coordinates');
 for(const z of got){
  ck(z.generator_basis_rank_Q===28&&z.commutators_tested===378,'full 28/378 exact-rational scope');
  ck(z.outside_span_Q===(z.source_version==='FROZEN_JOURNAL'?168:0),'correct source-local rational nonclosure count');
  ck(z.sparse_pair_relation.all_28_generator_values_sum_zero===true,'exact 28-point kernel certificate');
  ck(z.sparse_pair_relation.commutator_B01_B06_values_sum===(z.source_version==='FROZEN_JOURNAL'?2:0),'source commutator violates selected source-kernel relation');
 }
 ck(g.existing_negative_Eq2_Eq3_Eq4_Eq5_retained===true&&d.nonclaims?.some(x=>x.includes('No full line-by-line')),'negative source evidence preserved');
 ck(!J(d).includes('W-SSC-'),'track isolation');
 return errors;
}
const baseline=verify(),errors=[...baseline];
const mutations=[
 ['alter source O e6e7',p=>{p.independently_visually_transcribed_journal_O_table[6]='e6 e5 -e7 e4 -e3 -e1 -e0 e2'}],
 ['alter original e7e6',p=>{p.independently_visually_transcribed_journal_O_table[7]='e7 e3 e6 -e1 e5 -e4 e2 -e0'}],
 ['reverse O row1 products',p=>{p.independently_visually_transcribed_journal_O_table[1]='e1 -e0 -e4 e7 -e2 e6 -e5 -e3'}],
 ['wrong journal year',p=>{p.source.frozen_version='2026-09-10 arxiv'}],
 ['wrong journal source page',p=>{p.source.pdf_zero_based_pages=[3,4,5]}],
 ['misstate original sign',p=>{p.input_guards.original_e6e7='e2'}],
 ['wrong gamma index',p=>{p.operator_construction.G_c_matrix='Gamma indexed by convention'}],
 ['wrong barGamma direct sign',p=>{p.operator_construction.bar_D_matrix='wrong'}],
 ['erase outside span in original direct upper',p=>{p.all_eight_variants_exact_rational[0].outside_span_Q=0}],
 ['erase all original lower rational nonclosure',p=>{p.all_eight_variants_exact_rational[1].inside_span_Q=378}],
 ['make rank only 27',p=>{p.all_eight_variants_exact_rational[2].generator_basis_rank_Q=27}],
 ['erase exact witness',p=>{p.all_eight_variants_exact_rational[0].first_outside_witness=null}],
 ['alter rational residual numerator',p=>{p.all_eight_variants_exact_rational[3].first_outside_witness.residual_numerator='2'}],
 ['erase source sparse relation',p=>{p.all_eight_variants_exact_rational[0].sparse_pair_relation.commutator_B01_B06_values_sum=0}],
 ['pretend missing generator checks',p=>{p.all_eight_variants_exact_rational[0].sparse_pair_relation.all_28_generator_values_sum_zero=false}],
 ['erase one chirality',p=>{p.all_eight_variants_exact_rational.pop()}],
 ['promote intended f4',p=>{p.dependencies_and_gates.f4_L133_source_mathematics_qualified=true}],
 ['promote G1',p=>{p.G1_authorized=true}],
 ['claim external review',p=>{p.external_review_passed=true}],
 ['claim full primary source audit',p=>{p.semantic_source_complete=true}],
 ['claim journal changed',p=>{p.counterfactual_repair.source_2026_08_journal_changed=true}],
 ['fake erratum',p=>{p.counterfactual_repair.editorial_intent_or_formal_erratum_established=true}],
 ['source pin stale',p=>{p.inputs.frozen_printed_table_ledger.git_blob_sha='stale'}],
 ['cross-track pollution',p=>{p.operator_construction.span+=' W-SSC-001'}]
];
let rejected=0;
if(!baseline.length)for(const [name,mutate]of mutations){
 const x=copy(P),before=J(x);mutate(x);
 if(J(x)===before)errors.push('NOOP MUTATION '+name);
 else if(verify(x).length===0)errors.push('ESCAPED MUTATION '+name);
 else rejected++;
}
console.log(JSON.stringify({schema:'isograph.exp062-l05-Q-rational-8-variant-source-replay.v0.1',pass:errors.length===0,errors:errors.slice(0,30),
 complete_source_cells:64,exact_rational_variant_proofs:8,source_published_generators:28,source_pair_commutators_per_variant:378,
 published_source_Q_nonclosure_per_variant:168,one_cell_counterfactual_Q_nonclosure:0,
 first_sparse_certificate:'all 28 basis functionals zero; bracket of (0,1) and (0,6) has functional +2',
 adversarial_defined:mutations.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'UNTESTED_BASELINE_FAILED':'TESTED',
 earliest_stage:'G0',full_source_semantic_audit_complete:false,G1_authorized:false,external_review_passed:false},null,2));
if(errors.length)process.exitCode=1;
