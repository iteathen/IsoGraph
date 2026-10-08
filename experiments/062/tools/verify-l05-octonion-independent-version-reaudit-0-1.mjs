import fs from 'node:fs';
import crypto from 'node:crypto';

const L='research/woit-lisi-isomorph/lisi/', E='experiments/062/';
const sourcePath=L+'LISI_L05_OCTONION_INDEPENDENT_VERSION_REAUDIT_0_1.json';
const D=JSON.parse(fs.readFileSync(sourcePath,'utf8'));
const ledger=JSON.parse(fs.readFileSync(L+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_2.json','utf8'));
const sourceExpected=[
 'e0 e1 e2 e3 e4 e5 e6 e7',
 'e1 -e0 e4 e7 -e2 e6 -e5 -e3',
 'e2 -e4 -e0 e5 e1 -e3 e7 -e6',
 'e3 -e7 -e5 -e0 e6 e2 -e4 e1',
 'e4 e2 -e1 -e6 -e0 e7 e3 -e5',
 'e5 -e6 e3 -e2 -e7 -e0 e1 e4',
 'e6 e5 -e7 e4 -e3 -e1 -e0 -e2',
 'e7 e3 e6 -e1 e5 -e4 -e2 -e0'
];
const laterExpected=sourceExpected.slice();
laterExpected[6]='e6 e5 -e7 e4 -e3 -e1 -e0 e2';
const j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=k=>{const b=fs.readFileSync(k);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const sign=k=>k===0?1:-1;
const Z=n=>Array.from({length:n},()=>Array(n).fill(0));
const basis=(n,i)=>Array.from({length:n},(_,k)=>+(k===i));
const conj=x=>x.map((v,k)=>v*sign(k));
const plus=(a,b)=>a.map((v,i)=>v+b[i]);
const neg=a=>a.map(v=>-v);
const equal=(a,b)=>a.length===b.length&&a.every((v,i)=>v===b[i]);
const trans=a=>a[0].map((_,i)=>a.map(row=>row[i]));
function parse(rows){return rows.map(s=>s.split(' '))}
function mulBasis(T,a,b){const token=T[a][b];if(!/^-?e[0-7]$/.test(token))throw Error('Invalid journal/source signed table token');return{basis:Number(token.at(-1)),sign:token[0]==='-'?-1:1};}
function mulVec(T,x,y){const n=T.length,r=Array(n).fill(0);for(let a=0;a<n;a++)for(let b=0;b<n;b++)if(x[a]*y[b]){const o=mulBasis(T,a,b);if(o.basis>=n)throw Error('Table out-of-range basis');r[o.basis]+=x[a]*y[b]*o.sign;}return r;}
function checkBasisTable(T){
 const n=T.length;
 const metricBad=[],antiInvolutionBad=[],imaginaryAntiBad=[];
 for(let a=0;a<n;a++)for(let b=0;b<n;b++){
  const x=basis(n,a),y=basis(n,b),lhs=conj(mulVec(T,x,y)),rhs=mulVec(T,conj(y),conj(x));
  if(!equal(lhs,rhs))antiInvolutionBad.push([a,b]);
  const nValue=plus(mulVec(T,conj(x),y),mulVec(T,conj(y),x)).map(v=>v/2);
  const required=basis(n,0).map((_,k)=>k===0&&a===b?1:0);
  if(!equal(nValue,required))metricBad.push({a,b,computed:nValue,required});
  if(a>0&&b>a&&!equal(plus(mulVec(T,x,y),mulVec(T,y,x)),Array(n).fill(0)))imaginaryAntiBad.push([a,b]);
 }
 const zeroPair=mulVec(T,plus(basis(n,0),neg(basis(n,6))),plus(basis(n,2),neg(basis(n,7))));
 return{metricBad,antiInvolutionBad,imaginaryAntiBad,zeroPair};
}
function makeMatrices(T){
 const n=T.length,G=Array.from({length:n},()=>Z(n)),barDirect=Array.from({length:n},()=>Z(n));
 for(let c=0;c<n;c++)for(let a=0;a<n;a++){
  const o=mulBasis(T,c,a);
  G[c][o.basis][a]+=o.sign*sign(o.basis);
  barDirect[c][o.basis][a]+=o.sign*sign(c)*sign(a);
 }
 return{G,barDirect,barTranspose:G.map(trans)};
}
function mulMatrix(A,B){
 const n=A.length,r=Z(n);
 for(let i=0;i<n;i++)for(let k=0;k<n;k++)if(A[i][k])for(let q=0;q<n;q++)r[i][q]+=A[i][k]*B[k][q];
 return r;
}
function addMatrix(A,B){return A.map((row,i)=>row.map((v,k)=>v+B[i][k]))}
function negateMatrix(A){return A.map(row=>row.map(v=>-v))}
function Clifford(T,mode){
 const n=T.length,{G,barDirect,barTranspose}=makeMatrices(T),bar=mode==='direct'?barDirect:barTranspose;
 let bars=[];
 for(let a=0;a<n;a++)for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(barDirect[a][r][c]!==barTranspose[a][r][c])bars.push({c:a,row:r,col:c,directM:barDirect[a][r][c],transpose:barTranspose[a][r][c]});
 const matrices=G.map((g,k)=>{const x=Z(2*n);for(let i=0;i<n;i++)for(let j=0;j<n;j++){x[i][j+n]=-bar[k][i][j];x[i+n][j]=g[i][j];}return x;});
 let bad=[],badEntries=0;
 for(let a=0;a<n;a++)for(let b=a;b<n;b++){
  const got=addMatrix(mulMatrix(matrices[a],matrices[b]),mulMatrix(matrices[b],matrices[a]));
  let issues=0;
  for(let i=0;i<2*n;i++)for(let j=0;j<2*n;j++){const want=a===b&&i===j?-2:0;if(got[i][j]!==want)issues++;}
  if(issues){bad.push([a,b]);badEntries+=issues;}
 }
 return{bars,bad,badEntries};
}
function eq4(T){
 const n=T.length,coeff=(a,b,c)=>{const o=mulBasis(T,a,b);return o.basis===c?o.sign:0},fails=[];
 for(let a=0;a<n;a++)for(let b=0;b<n;b++)for(let c=0;c<n;c++){
  const v=[sign(b)*coeff(c,a,b),sign(c)*coeff(a,b,c),sign(a)*sign(c)*coeff(a,c,b),sign(c)*sign(b)*coeff(c,b,a)];
  if(!v.every(x=>x===v[0]))fails.push({a,b,c,source_member_values:v});
 }
 return fails;
}
const mod=(v,p)=>((v%p)+p)%p;
function echelon(rows,p){
 const A=rows.map(v=>v.map(x=>mod(x,p))),piv=[];let r=0;
 function power(a,x){let n=1;for(;x>0;x=Math.floor(x/2),a=a*a%p)if(x%2)n=n*a%p;return n;}
 for(let col=0;col<A[0].length&&r<A.length;col++){
  let sw=r;while(sw<A.length&&!A[sw][col])sw++;
  if(sw===A.length)continue;
  [A[sw],A[r]]=[A[r],A[sw]];let inv=power(A[r][col],p-2);
  for(let j=col;j<A[r].length;j++)A[r][j]=A[r][j]*inv%p;
  for(let k=0;k<A.length;k++)if(k!==r){
   const fac=A[k][col];if(fac)for(let j=col;j<A[k].length;j++)A[k][j]=mod(A[k][j]-fac*A[r][j],p);
  }
  piv.push(col);r++;
 }
 return{piv,rows:A.slice(0,r)};
}
function outsideSpan(row,basis,p){
 const x=row.map(v=>mod(v,p));
 for(let k=0;k<basis.piv.length;k++){
  const pivot=basis.piv[k],fac=x[pivot];
  if(fac)for(let j=pivot;j<x.length;j++)x[j]=mod(x[j]-fac*basis.rows[k][j],p);
 }
 return x.some(v=>v!==0);
}
function bivectors(T,mode,block,p){
 const {G,barDirect,barTranspose}=makeMatrices(T),Bar=mode==='direct'?barDirect:barTranspose;
 const ops=[],labels=[];for(let c=0;c<8;c++)for(let d=c+1;d<8;d++){labels.push([c,d]);ops.push(block==='upper'?mulMatrix(Bar[c],G[d]):mulMatrix(G[c],Bar[d]));}
 const B=echelon(ops.map(x=>x.flat()),p);
 let fails=0,skew=0;
 for(const A of ops){if(addMatrix(A,trans(A)).flat().some(v=>v!==0))skew++;}
 for(let i=0;i<ops.length;i++)for(let k=i+1;k<ops.length;k++){
  const com=addMatrix(mulMatrix(ops[i],ops[k]),negateMatrix(mulMatrix(ops[k],ops[i]))).flat();
  if(outsideSpan(com,B,p))fails++;
 }
 return{basisRank:B.piv.length,commutatorTests:ops.length*(ops.length-1)/2,outside:fails,notSkew:skew};
}
const JOURNAL=parse(sourceExpected),ARXIV=parse(laterExpected);
const srcJ=parse(D.manually_transcribed_primary_tables.journal_O_rows),srcA=parse(D.manually_transcribed_primary_tables.arxiv_v1_O_rows);
const original=checkBasisTable(JOURNAL),corrected=checkBasisTable(ARXIV);
const Cj=Clifford(JOURNAL,'direct'),Ct=Clifford(JOURNAL,'transpose');
const Ca=Clifford(ARXIV,'direct'),Cat=Clifford(ARXIV,'transpose');
const cyclicJ=eq4(JOURNAL),cyclicA=eq4(ARXIV);
const primeFields=[1009,10007],biv=[];
for(const T of [JOURNAL,ARXIV])for(const mode of ['direct','transpose'])for(const block of ['upper','lower'])for(const prime of primeFields)
 biv.push({version:T===JOURNAL?'journal':'arxiv',mode,block,prime,...bivectors(T,mode,block,prime)});
let revisions=[];
for(let a=0;a<8;a++)for(let b=0;b<8;b++)if(JOURNAL[a][b]!==ARXIV[a][b])revisions.push({a,b,journal:JOURNAL[a][b],arxiv:ARXIV[a][b]});
const refRows=ledger.basis_multiplication_tables.find(x=>x.carrier==='O').entries;
const computed={original,corrected,Cj,Ct,Ca,Cat,cyclicJ,cyclicA,biv,revisions};
function audit(d=D){
 const errors=[],ok=(v,s)=>{if(!v)errors.push(s)};
 ok(d.schema==='isograph.lisi-l05-octonion-independent-version-adversarial-review.v0.1'&&d.track==='L'&&d.stage==='G0'&&d.authority===false,'source observation not qualified theorem');
 ok(d.author_intent_known===false&&d.official_journal_erratum_located===false&&d.full_paper_theorem_qualified===false&&d.G1_authorized===false&&d.external_cold_review_passed===false,'no unwarranted intent/erratum/theorem claims');
 ok(d.source_revision_facts?.frozen?.date==='2026-08-29'&&d.source_revision_facts?.frozen?.doi==='10.1007/s00006-026-01447-5'&&d.source_revision_facts?.frozen?.eq==='(1)','exact frozen publication');
 ok(d.source_revision_facts?.previous_preprint?.row_e6_col_e7==='-e2'&&d.source_revision_facts?.previous_preprint?.row_e7_col_e6==='-e2'&&d.source_revision_facts?.previous_preprint?.pdf==='https://rxiv.org/pdf/2504.0179v1.pdf','2025 preprint sign and provenance');
 ok(d.source_revision_facts?.later_arxiv?.posted==='2026-09-10'&&d.source_revision_facts?.later_arxiv?.row_e6_col_e7==='e2'&&d.source_revision_facts?.later_arxiv?.row_e7_col_e6==='-e2','later exact source version');
 ok(d.source_revision_facts?.later_arxiv?.table_64_cell_discrepancies_relative_to_journal===1&&revisions.length===1&&j(revisions[0])===j({a:6,b:7,journal:'-e2',arxiv:'e2'}),'64-cell version comparison');
 ok(j(srcJ)===j(JOURNAL)&&j(srcA)===j(ARXIV)&&j(refRows)===j(JOURNAL),'independently rendered 64-cell frozen journal table matches live repo source bytes');
 ok(d.primary_source_semantics?.ordered_multiplication?.includes('row a times column b')&&d.primary_source_semantics?.metric?.includes('n_ab=delta_ab'),'source row-column/metric semantics explicit');
 ok(d.primary_source_semantics?.antiinvolution?.includes('tilde(e_b) tilde(e_a)')&&d.primary_source_semantics?.nonassociativity?.includes('No parenthesis reassociation'),'no imported associativity or incorrect conjugation');
 for(const {path,git_blob_sha} of d.repository_source_inputs||[])ok(git_blob_sha===sha(path),'exact source prerequisite blob pin '+path);
 ok(original.imaginaryAntiBad.length===1&&j(original.imaginaryAntiBad)===j([[6,7]])&&d.independent_findings?.single_table_pair?.imaginary_e6_e7_anticommutator==='-2 e2, not zero','unique ordinary imaginary nonanticommuting pair');
 ok(j(original.antiInvolutionBad)===j(d.independent_findings?.conjugation_reversal?.journal_failed_ordered_pairs)&&original.antiInvolutionBad.length===2&&corrected.antiInvolutionBad.length===0,'basis anti-involution 64 pairs and corrected control');
 ok(j(original.metricBad.map(x=>[x.a,x.b]))===j(d.independent_findings?.metric?.journal_failed_ordered_pairs)&&original.metricBad.length===2&&corrected.metricBad.length===0,'basis ordinary n_ab=delta_ab metric independent contradiction');
 const z=d.independent_findings?.zero_divisor||{};
 ok(j(original.zeroPair)===j(Array(8).fill(0))&&corrected.zeroPair[2]===2&&corrected.zeroPair.filter((x,i)=>i!==2).every(x=>x===0)&&z.source_product==='0'&&z.revised_source_product==='2 e2'&&z.source_norm_x==='2'&&z.source_norm_y==='2','explicit nonzero zero-divisor source contradiction');
 ok(j(Cj.bars)===j(d.independent_findings?.two_barGamma_definitions?.journal_mismatch_entries)&&Cj.bars.length===2&&Ca.bars.length===0,'two source barGamma definitions unequal at two cells');
 const f=d.independent_findings||{};
 ok(j(Cj.bad)===j(f.Eq3_Clifford_directM?.journal_failed_pairs)&&Cj.badEntries===f.Eq3_Clifford_directM?.journal_failed_entries&&Cj.bad.length===7,'directM Clifford variant fully reconstructed');
 ok(j(Ct.bad)===j(f.Eq3_Clifford_transpose?.journal_failed_pairs)&&Ct.badEntries===f.Eq3_Clifford_transpose?.journal_failed_entries&&Ct.bad.length===7,'transpose Clifford variant independently reconstructed');
 ok(Ca.bad.length===0&&Cat.bad.length===0&&Ca.badEntries===0&&Cat.badEntries===0,'later table fixes tested 36 Clifford pairs, not all exceptional mathematics');
 ok(j(cyclicJ)===j(f.Eq4_four_M?.journal_failed_triples)&&cyclicJ.length===4&&cyclicA.length===0&&f.Eq4_four_M?.untested_four_Gamma_members===true&&f.Eq4_four_M?.untested_split_metric===true,'exact four Eq4 coefficient witnesses with unknown other terms');
 const b=f.Eq5_bivector_scope||{};
 ok(b.source_generator_pairs_c_lt_d===28&&b.commutator_pairs===378&&j(b.primes)===j([1009,10007]),'independent source c<d operator pair scope');
 for(const item of biv){
  const requested=item.version==='journal'?168:0;
  ok(item.basisRank===28&&item.commutatorTests===378&&item.outside===requested,'28 bivectors full pair span test '+j([item.version,item.mode,item.block,item.prime]));
  ok(item.notSkew===(item.version==='journal'?7:0),'metric skew defect count '+j([item.version,item.mode,item.block,item.prime]));
 }
 ok(b.journal_outside_span_commutators===168&&b.later_revision_outside_span_commutators===0&&b.journal_Euclidean_nonskew_upper_bivectors===7,'source-only nonclosure not canonical Lie theorem');
 ok(d.logical_disposition?.source_table_internally_inconsistent===true&&d.logical_disposition?.source_not_changed===true&&d.logical_disposition?.PR_merge_authorized===false&&d.logical_disposition?.current_L_stage==='G0_OPEN_UNFROZEN','no source edit/current G1');
 ok(d.logical_disposition?.publisher_only_typesetting_error_claim==='NOT_SUPPORTED_BY_2025_PREPRINT'&&d.logical_disposition?.intended_corrected_table_full_f4_theorem==='NOT_QUALIFIED','no unsupported blame or mathematical closure');
 ok(!j(d).includes('W-SSC-'),'cross-track input prohibited');
 return errors;
}
const baseline=audit(),errors=[...baseline],mutants=[
 ['correct frozen table illicitly',x=>{x.manually_transcribed_primary_tables.journal_O_rows[6]='e6 e5 -e7 e4 -e3 -e1 -e0 e2';}],
 ['invent 2025 correction',x=>{x.source_revision_facts.previous_preprint.row_e6_col_e7='e2';}],
 ['erase late revision change',x=>{x.manually_transcribed_primary_tables.arxiv_v1_O_rows[6]=x.manually_transcribed_primary_tables.journal_O_rows[6];}],
 ['swap publication versions',x=>{x.source_revision_facts.frozen.date='2026-09-10';}],
 ['normalize conjugation hypothesis',x=>{x.primary_source_semantics.antiinvolution='x'= 'not-source';}],
 ['misstate scalar metric',x=>{x.primary_source_semantics.metric='not-source-metric';}],
 ['invent no source-zero-divisor',x=>{x.independent_findings.zero_divisor.source_product='2 e2';}],
 ['hide basis anti-involution mismatch',x=>{x.independent_findings.conjugation_reversal.journal_failed_ordered_pairs=[];}],
 ['erase metric contradiction',x=>{x.independent_findings.metric.journal_failed_ordered_pairs=[];}],
 ['flip direct barGamma coefficient',x=>{x.independent_findings.two_barGamma_definitions.journal_mismatch_entries[0].directM=1;}],
 ['alter Clifford direct failed pair',x=>{x.independent_findings.Eq3_Clifford_directM.journal_failed_pairs[0][0]=0;}],
 ['alter Clifford transpose failed count',x=>{x.independent_findings.Eq3_Clifford_transpose.journal_failed_entries=27;}],
 ['erase Eq4 4th witness',x=>{x.independent_findings.Eq4_four_M.journal_failed_triples.pop();}],
 ['claim four Gamma Eq4 closed',x=>{x.independent_findings.Eq4_four_M.untested_four_Gamma_members=false;}],
 ['promote f4 theorem',x=>{x.full_paper_theorem_qualified=true;}],
 ['rewrite rank result',x=>{x.independent_findings.Eq5_bivector_scope.journal_outside_span_commutators=0;}],
 ['alter source antecedent sha',x=>{x.repository_source_inputs[0].git_blob_sha='stale';}],
 ['declare publisher blame',x=>{x.logical_disposition.publisher_only_typesetting_error_claim='YES';}],
 ['declare official journal erratum',x=>{x.official_journal_erratum_located=true;}],
 ['claim G1 promotion',x=>{x.G1_authorized=true;}],
 ['claim external pass',x=>{x.external_cold_review_passed=true;}],
 ['import W semantics',x=>{x.primary_source_semantics.ordered_multiplication+=' W-SSC-103';}]
];
let rejected=0;
if(!baseline.length)for(const [label,change]of mutants){
 const x=cp(D),before=j(x);change(x);
 if(j(x)===before)errors.push('MUTATION NO-OP '+label);
 else if(audit(x).length===0)errors.push('ESCAPED '+label);
 else rejected++;
}
console.log(JSON.stringify({schema:'isograph.exp062-l05-independent-publication-version-audit.v0.1',pass:errors.length===0,
 errors:errors.slice(0,25),error_count:errors.length,
 original_primary_source_table_cells:64,
 original_basis_conjugation_failed_ordered_pairs:original.antiInvolutionBad.length,
 original_basis_metric_failed_ordered_pairs:original.metricBad.length,
 journal_vs_later_arxiv_changed_source_cells:revisions.length,
 original_barGamma_disagreements:Cj.bars.length,
 original_gamma_directM_failed_pairs:Cj.bad.length,
 original_gamma_transpose_failed_pairs:Ct.bad.length,
 original_gamma_failed_matrix_entries_per_construction:Cj.badEntries,
 later_arxiv_gamma_failed_pairs:Ca.bad.length+Cat.bad.length,
 original_Eq4_source_M_fail_triples:cyclicJ.length,
 corrected_Eq4_source_M_fail_triples:cyclicA.length,
 original_bivector_outside_span:168,corrected_bivector_outside_span:0,
 independent_bivector_variants_and_primes:biv.length,
 adversarial_defined:mutants.length,adversarial_rejected:rejected,
 mutation_gate:baseline.length?'BASELINE_FAILED_NO_MUTATIONS_EVALUATED':'TESTED',
 stage:'G0_UNFROZEN',source_mathematical_qualification:false},null,2));
if(errors.length)process.exitCode=1;
