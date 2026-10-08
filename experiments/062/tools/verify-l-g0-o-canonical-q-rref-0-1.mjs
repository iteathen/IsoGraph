import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const PATHS={
 certificate:L+'LISI_L05_O_RATIONAL_BIVECTOR_CERTIFICATE_G0_0_1.json',
 risk:E+'L127_Q_PIVOT_ORDER_GENERAL_VERIFIER_RISK_0_1.json',
 originalVerifier:E+'tools/verify-l-g0-o-rational-bivector-0-1.mjs',
 journalTable:L+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_2.json',
 sourceSSC:L+'SOURCE_SEMANTIC_CENSUS_0_17.json',
 stageGate:E+'L_CURRENT_STAGE_GATE_0_18.json'
};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const gitSha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const certificate=load(PATHS.certificate),risk=load(PATHS.risk),ledger=load(PATHS.journalTable),ssc=load(PATHS.sourceSSC),gate=load(PATHS.stageGate);
const source_literal=[
 'e0 e1 e2 e3 e4 e5 e6 e7',
 'e1 -e0 e4 e7 -e2 e6 -e5 -e3',
 'e2 -e4 -e0 e5 e1 -e3 e7 -e6',
 'e3 -e7 -e5 -e0 e6 e2 -e4 e1',
 'e4 e2 -e1 -e6 -e0 e7 e3 -e5',
 'e5 -e6 e3 -e2 -e7 -e0 e1 e4',
 'e6 e5 -e7 e4 -e3 -e1 -e0 -e2',
 'e7 e3 e6 -e1 e5 -e4 -e2 -e0'
];
function table(lines){
 if(lines.length!==8)throw Error('source table not eight rows');
 const ret=lines.map(s=>s.split(' '));
 if(ret.some(row=>row.length!==8||row.some(x=>!(/^-?e[0-7]$/.test(x)))))throw Error('invalid source cell');
 return ret;
}
const sign=i=>i===0?1:-1;
function generate(T,barKind,chirality){
 const G=[],D=[];
 for(let c=0;c<8;c++){
  const gc=Array.from({length:8},()=>Array(8).fill(0)),bc=Array.from({length:8},()=>Array(8).fill(0));
  for(let a=0;a<8;a++){
   const tok=T[c][a],out=Number(tok.slice(-1)),v=tok[0]==='-'?-1:1;
   gc[out][a]=sign(out)*v;
   bc[out][a]=sign(c)*sign(a)*v;
  }
  G.push(gc);D.push(bc);
 }
 const transpose=A=>A[0].map((_,i)=>A.map(row=>row[i]));
 const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,v,k)=>s+v*B[k][j],0)));
 const b=[],names=[];
 for(let c=0;c<8;c++)for(let d=c+1;d<8;d++){
  const BC=barKind==='direct'?D[c]:transpose(G[c]);
  const BD=barKind==='direct'?D[d]:transpose(G[d]);
  b.push(chirality==='upper'?mm(BC,G[d]):mm(G[c],BD));
  names.push([c,d]);
 }
 return {basis:b,names,mm};
}
function gcd(a,b){a=a<0n?-a:a;b=b<0n?-b:b;while(b){const r=a%b;a=b;b=r}return a||1n;}
function Q(a,b=1n){if(a===0n)return[0n,1n];if(b<0n){a=-a;b=-b;}const g=gcd(a,b);return[a/g,b/g];}
const difference=(a,b)=>Q(a[0]*b[1]-b[0]*a[1],a[1]*b[1]);
const product=(a,b)=>Q(a[0]*b[0],a[1]*b[1]);
const nonzero=q=>q[0]!==0n;
function canonicalRREF(rows){
 const A=rows.map(a=>a.map(x=>Q(BigInt(x)))),n=A[0]?.length||0,m=A.length,pivots=[];
 let r=0;
 for(let col=0;col<n&&r<m;col++){
  let select=r;
  while(select<m&&!nonzero(A[select][col]))select++;
  if(select===m)continue;
  [A[select],A[r]]=[A[r],A[select]];
  const t=A[r][col],inv=Q(t[1],t[0]);
  for(let j=col;j<n;j++)A[r][j]=product(A[r][j],inv);
  for(let i=0;i<m;i++)if(i!==r){
   const k=A[i][col];
   if(nonzero(k))for(let j=col;j<n;j++)A[i][j]=difference(A[i][j],product(k,A[r][j]));
  }
  pivots.push(col);r++;
 }
 return {rank:r,pivots,rows:A.slice(0,r)};
}
function spanResidual(v,rref){
 const x=v.map(z=>Q(BigInt(z)));
 for(let r=0;r<rref.rank;r++){
  const p=rref.pivots[r],factor=x[p];
  if(nonzero(factor))for(let c=p;c<x.length;c++)x[c]=difference(x[c],product(factor,rref.rows[r][c]));
 }
 return x;
}
function analyze(T,barKind,chirality,edited){
 const {basis,names,mm}=generate(T,barKind,chirality);
 const rref=canonicalRREF(basis.map(m=>m.flat()));
 const coord=(T)=>T.flat().map(x=>x);
 const comm=(A,B)=>{const x=mm(A,B),y=mm(B,A);return x.map((row,i)=>row.map((v,j)=>v-y[i][j]));};
 let outside=0,inside=0,first=null;
 for(let a=0;a<28;a++)for(let b=a+1;b<28;b++){
  const c=comm(basis[a],basis[b]),resid=spanResidual(coord(c),rref);
  const pivot=resid.findIndex(nonzero);
  if(pivot<0)inside++;
  else{
   outside++;
   if(!first)first={generators:[names[a],names[b]],residual_coordinate:[Math.floor(pivot/8),pivot%8],rational_value:resid[pivot][0].toString()+'/'+resid[pivot][1].toString()};
  }
 }
 const pair=(label)=>basis[names.findIndex(x=>x[0]===label[0]&&x[1]===label[1])];
 const C=comm(pair([0,1]),pair([0,6]));
 const lower=barKind==='transpose'&&chirality==='lower',coordinates=lower?[[4,7],[7,4]]:[[2,3],[3,2]];
 const sum=M=>coordinates.reduce((z,[i,j])=>z+M[i][j],0);
 const basisFailed=Array.from({length:28},(_,k)=>spanResidual(coord(basis[k]),rref).some(nonzero)).filter(Boolean).length;
 return {
  edition:edited?'DIAGNOSTIC_ONE_CELL_UNFROZEN':'PUBLISHED_ORIGINAL_JOURNAL',
  barGamma:barKind,chiral:chirality,rank:rref.rank,pivots:rref.pivots,
  canonically_sorted_pivots:rref.pivots.every((p,i)=>i===0||p>rref.pivots[i-1]),
  source_basis_residual_failures:basisFailed,
  cases:inside+outside,inside,outside,first,
  sparse:{coordinate_pairs:coordinates,basis_nonzero_violations:basis.filter(z=>sum(z)!==0).length,commutator_functional:sum(C)}
 };
}
function verify(c=certificate,r=risk){
 const errors=[],ck=(v,n)=>{if(!v)errors.push(n)};
 ck(c.schema==='isograph.lisi-l05-source-o-rational-bivector-span-certificate.g0.v0.1'&&c.authority===false&&c.G1_authorized===false,'no mathematical source qualification');
 ck(c.source?.frozen_version==='2026-08-29 published Springer version of record'&&c.source?.doi==='10.1007/s00006-026-01447-5','original journal edition, not later author revision');
 ck(r.schema==='isograph.exp062-l05-q-elimination-pivot-order-hostile-recheck.v0.1'&&r.authority===false&&r.stage==='G0','separate pivot risk audit is research only');
 for(const [field,p]of[['original_proof',PATHS.certificate],['original_verifier',PATHS.originalVerifier],['current_ssc',PATHS.sourceSSC],['current_procedural_gate',PATHS.stageGate]])
  ck(r[field]?.path===p&&r[field]?.git_blob_sha===gitSha(p),'pinned exact dependency '+field);
 ck(ssc.items?.length===191&&ssc.guards?.source_census_freeze_complete===false&&gate.current_lawful_state?.G1_authorized===false,'no stage G1/IA shortcut');
 ck(r.coverage?.source_variants===8&&r.coverage?.source_original_Q_nonclosure===168&&r.coverage?.one_cell_alternative_Q_nonclosure===0&&r.coverage?.observed_discrepancies===0,'separately scoped risk data');
 ck(r.diagnosis?.risk_class==='GENERALIZED_VERIFIER_ROBUSTNESS_NOT_CONFIRMED_IN_SCOPE_MATH_DEFECT','risk is not falsifier without disagreement');
 ck(j(c.independently_visually_transcribed_journal_O_table)===j(source_literal),'64 actual frozen printed table cells exact');
 const old=ledger.basis_multiplication_tables.find(x=>x.carrier==='O')?.entries;
 ck(j(old)===j(table(source_literal)),'G0 literal table not corrected to expected mathematical answer');
 ck(c.all_eight_variants_exact_rational?.length===8,'complete eight source and diagnostic variants');
 ck(c.counterfactual_repair?.not_authorized===true&&c.counterfactual_repair?.source_2026_08_journal_changed===false,'one-cell only diagnostic not source');
 ck(r.source_gates?.G1_to_G7_authorized===false&&r.source_gates?.external_cold_review_passed===false,'external review not passed');
 if(errors.length)return errors;
 const t=table(c.independently_visually_transcribed_journal_O_table);
 const edited=t.map(row=>row.slice());edited[6][7]='e2';
 const calculations=[];
 for(const [T,changed]of [[t,false],[edited,true]])for(const bar of ['direct','transpose'])for(const block of ['upper','lower'])
  calculations.push(analyze(T,bar,block,changed));
 for(let i=0;i<calculations.length;i++){
  const x=calculations[i],old=c.all_eight_variants_exact_rational[i];
  ck(x.rank===28&&x.canonically_sorted_pivots&&x.source_basis_residual_failures===0,'canonical exact RREF rank/generator closure '+i);
  ck(x.cases===378&&x.outside===(x.edition==='PUBLISHED_ORIGINAL_JOURNAL'?168:0),'full exact 378 commutator membership '+i);
  ck(x.inside===378-x.outside,'partition all source commutators '+i);
  ck(x.sparse.basis_nonzero_violations===0&&x.sparse.commutator_functional===(x.edition==='PUBLISHED_ORIGINAL_JOURNAL'?2:0),'independent sparse Lie nonclosure functional '+i);
  ck(old?.generator_basis_rank_Q===x.rank&&old?.outside_span_Q===x.outside&&old?.inside_span_Q===x.inside,'old Q computed count reproduced by canonical independent exact RREF '+i);
  ck(old?.source_version===(x.edition==='PUBLISHED_ORIGINAL_JOURNAL'?'FROZEN_JOURNAL':'ONE_CELL_ALTERNATIVE_NOT_FROZEN')&&old?.chiral_block===x.chiral,'original source model and diagnostic version matched '+i);
 }
 ck(!j(c).includes('W-SSC-')&&!j(r).includes('W-SSC-'),'L source independent');
 return errors;
}
const baseline=verify(),errors=[...baseline],mutations=[
 ['invent source correct octonion sign',c=>{c.independently_visually_transcribed_journal_O_table[6]='e6 e5 -e7 e4 -e3 -e1 -e0 e2';}],
 ['alter unrelated original source signed cell',c=>{c.independently_visually_transcribed_journal_O_table[1]='e1 -e0 -e4 e7 -e2 e6 -e5 -e3';}],
 ['tamper exact Q count in published variant',c=>{c.all_eight_variants_exact_rational[0].outside_span_Q=0;}],
 ['tamper diagnostic Q closure',c=>{c.all_eight_variants_exact_rational[6].outside_span_Q=1;}],
 ['tamper source rank',c=>{c.all_eight_variants_exact_rational[3].generator_basis_rank_Q=27;}],
 ['delete variant',c=>{c.all_eight_variants_exact_rational.pop();}],
 ['claim formal publisher erratum',c=>{c.counterfactual_repair.editorial_intent_or_formal_erratum_established=true;}],
 ['claim f4 theorem',c=>{c.dependencies_and_gates.f4_L133_source_mathematics_qualified=true;}],
 ['claim G1',c=>{c.G1_authorized=true;}],
 ['claim source external reviewer',c=>{c.external_review_passed=true;}],
 ['wrong source revision',c=>{c.source.frozen_version='2026-09-10 arxiv';}],
 ['wrong first source case',c=>{c.all_eight_variants_exact_rational[0].chiral_block='lower';}],
 ['change scoped risk summary',(_c,r)=>{r.coverage.source_original_Q_nonclosure=0;}],
 ['remove risk SHA',(_c,r)=>{r.original_verifier.git_blob_sha='bad';}],
 ['misstate risk as actual math bug',(_c,r)=>{r.diagnosis.risk_class='CONFIRMED_MATH_FALSE';}],
 ['fake stage status',(_c,r)=>{r.source_gates.G1_to_G7_authorized=true;}],
 ['fake external cold review',(_c,r)=>{r.source_gates.external_cold_review_passed=true;}],
 ['cross track import',c=>{c.operator_construction.span+=' W-SSC-103';}]
];
let rejected=0;
if(!baseline.length)for(const [name,mutate]of mutations){
 const c=cp(certificate),r=cp(risk),before=j([c,r]);mutate(c,r);
 if(j([c,r])===before)errors.push('NO-OP '+name);
 else if(verify(c,r).length===0)errors.push('ESCAPED '+name);
 else rejected++;
}
console.log(JSON.stringify({schema:'isograph.exp062-l05-canonical-Q-independent-rref-recheck.v0.1',
 pass:errors.length===0,errors:errors.slice(0,25),source_models:8,canonical_Q_28_rank_variants:8,source_memberships_per_variant:378,
 journal_source_outside_each:168,diagnostic_one_cell_outside_each:0,
 four_source_sparse_witnesses_checked:true,older_unsorted_pivot_risk_no_observed_math_discrepancy:true,
 adversarial_defined:mutations.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED_NO_MUTANTS':'TESTED',
 G1_authorized:false,external_review_passed:false},null,2));
if(errors.length)process.exitCode=1;
