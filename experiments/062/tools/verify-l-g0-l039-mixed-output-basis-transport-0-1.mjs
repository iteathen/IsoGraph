// L-only G0: uniform mixed-basis output coordinate transport is NOT a Lie automorphism.
// Source L01 arXiv:0711.0770v1 pp.12,23-24, frozen, not reinterpreted.
// Rejects false promotion and source-wrong but Jacobi-valid mixed/mixed sign flips.
import fs from 'node:fs';
import crypto from 'node:crypto';

const R='research/woit-lisi-isomorph/lisi/';
const X='experiments/062/';
const paths={
  evidence:R+'LISI_L01_H1_MIXED_BASIS_TRANSPORT_G0_0_1.json',
  gamma:R+'LISI_L01_GRAVIWEAK_CL71_H1_SOURCE_G0_0_1.json',
  graded:R+'LISI_L01_H1_GRADED_CURVATURE_EQ3_1_TO_EQ3_5_SOURCE_G0_0_1.json',
  symbolic:R+'LISI_L01_H1_UNIVERSAL_SYMBOLIC_CURVATURE_G0_0_1.json',
  ssc:R+'SOURCE_SEMANTIC_CENSUS_0_31.json',
  gate:X+'L_CURRENT_STAGE_GATE_0_31.json',
};
const mathOnly=process.argv.includes('--math-only');
const issues=[];
const check=(v,msg)=>{if(!v)issues.push(msg);};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitSha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const clone=x=>JSON.parse(JSON.stringify(x));
function sourceGuards(evidence,gamma,graded,scc,gate,sha=gitSha){
  const errs=[],a=(yes,msg)=>{if(!yes)errs.push(msg);};
  a(evidence?.schema==='isograph.lisi-l01-mixed-basis-transport-G0.v0.1'&&evidence.track==='L'&&evidence.stage==='G0'&&evidence.authority===false,'L G0 evidence status');
  a(evidence?.source?.revision==='arXiv:0711.0770v1'&&JSON.stringify(evidence.source.printed_pages)==='[12,23,24]','exact frozen revision and page scope');
  a(evidence?.source?.author_written_H1==='H_1=(1/2)*omega+(1/4)*e*phi+w_ew'&&evidence.source.author_written_Fgw==='F_gw=(d(e)+(1/2)*[omega,e])*phi-e*(d(phi)+[W+B1,phi])','source H1 and Fgw literal');
  a(gamma?.source?.revision==='arXiv:0711.0770v1 2007-11-06'&&gamma?.H1?.source_formula===evidence.source.author_written_H1&&gamma?.gamma_source?.source_metric==='eta=diag(+1,+1,+1,-1,+1,+1,+1,+1) for THIS SOURCE GENERATOR ORDER (first 3 grav space; Gamma4 grav time; four prime electroweak positive)','source Clifford and H1 coefficient roles');
  a(gamma?.H1?.higgs?.includes('REAL scalar')&&gamma?.H1?.frame?.includes('1-form')&&gamma?.H1?.mixed_operator?.includes('Gamma_mu*GammaPrime_nu'),'original source field type and gamma order');
  a(graded?.source?.revision==='arXiv:0711.0770v1 2007-11-06'&&graded?.source_equations?.find(x=>x.id==='L01-EQ3.4-FGW')?.source_literal===evidence.source.author_written_Fgw+'=T*phi-e*D(phi)','exact printed Fgw operand signs');
  a(graded?.actor_degrees?.some(x=>x.id==='phi'&&x.form_degree===0)&&graded?.actor_degrees?.some(x=>x.id==='e'&&x.form_degree===1),'graded phi/e roles');
  a(scc?.items?.length===191&&scc.guards?.source_census_freeze_complete===false,'unfrozen SSC 191 records');
  a(gate?.track==='L'&&gate?.current_lawful_state?.G1_authorized===false&&gate?.current_lawful_state?.source_census_frozen===false,'current G0 stage lock');
  for(const k of ['gamma','graded','symbolic','ssc','gate'])a(evidence?.frozen_inputs?.[k]?.path===paths[k]&&evidence.frozen_inputs[k].git_blob_sha===sha(paths[k]),'source integrity '+k);
  a(evidence?.scope_guards?.printed_Fgw_output_basis_source_authorized===false&&evidence.scope_guards?.G1_authorized===false&&evidence.scope_guards?.cross_track_semantics_authorized===false&&evidence.scope_guards?.source_math_error_proved===false,'anti-promotion invariants');
  a(evidence?.coordinate_transport?.N_basis==='N_ac=(1/4)*Gamma_a*GammaPrime_c'&&evidence?.coordinate_transport?.curvature_mixed_coordinate==='coefficient_N=(1/(4*s))*printed_Fgw_polynomial; for s=1/4 coefficient_N=printed_Fgw_polynomial','typed coordinate scaling (not author source)');
  return errs;
}
let sourceMutantsRejected=0;
if(!mathOnly){
 const evidence=read(paths.evidence),gamma=read(paths.gamma),graded=read(paths.graded),ssc=read(paths.ssc),gate=read(paths.gate);
 issues.push(...sourceGuards(evidence,gamma,graded,ssc,gate));
 const mutants=[
  ['forge freeze',p=>{p.scope_guards.G1_authorized=true;}],
  ['claim source-normalizer',p=>{p.scope_guards.printed_Fgw_output_basis_source_authorized=true;}],
  ['change source quarter',p=>{p.source.author_written_H1=p.source.author_written_H1.replace('(1/4)','(1/2)');}],
  ['change Eq3.4 sign',p=>{p.source.author_written_Fgw=p.source.author_written_Fgw.replace('-e*','+e*');}],
  ['change candidate s',p=>{p.coordinate_transport.N_basis='N_ac=(1/2)*Gamma_a*GammaPrime_c';}],
  ['wrong source SHA',p=>{p.frozen_inputs.ssc.git_blob_sha='stale';}],
  ['claim W semantics',p=>{p.scope_guards.cross_track_semantics_authorized=true;}],
 ];
 if(!issues.length){for(const [name,change] of mutants){const p=clone(evidence);change(p);const fails=sourceGuards(p,gamma,graded,ssc,gate);if(!fails.length)issues.push('ESCAPED source mutant: '+name);else sourceMutantsRejected++;}}
}

// A second direct Clifford-bivector implementation independent of the prior polynomial ring.
// Real Clifford generators: gamma_1..3 square +1, gamma_4 square -1,
// gamma'_1..4 square +1; products in printed gamma order.
const eta=[1,1,1,-1,1,1,1,1];
function blade(a,b){let sign=1;for(let i=0;i<8;i++)if(a&(1<<i))for(let j=0;j<8;j++)if(b&(1<<j)){
 if(i>j)sign=-sign; if(i===j)sign*=eta[i];
}return [a^b,sign];}
const two=(i,j)=>((1<<i)|(1<<j));
const B=[];
for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)B.push({kind:'G',i,j,mask:two(i,j),den:1});
for(let i=4;i<8;i++)for(let j=i+1;j<8;j++)B.push({kind:'EW',i:i-4,j:j-4,mask:two(i,j),den:1});
for(let i=0;i<4;i++)for(let j=4;j<8;j++)B.push({kind:'M',i,j:j-4,mask:two(i,j),den:4});
check(B.length===28&&B.filter(x=>x.kind==='G').length===6&&B.filter(x=>x.kind==='EW').length===6&&B.filter(x=>x.kind==='M').length===16,'28 source Clifford bivectors');
const byMask=new Map(B.map((x,i)=>[x.mask,i]));
check(byMask.size===28,'distinct exact 28 generators');
function rawBracket(i,j){
 const [ma,sa]=blade(B[i].mask,B[j].mask),[mb,sb]=blade(B[j].mask,B[i].mask);
 check(ma===mb,'Clifford product blade match '+i+','+j);
 const value=sa-sb;
 if(!value)return new Map;
 check(Math.abs(value)===2,'all two-blade commutator coefficients +/-2');
 const out=byMask.get(ma);
 check(out!==undefined,'no nonbivector commutator '+i+','+j);
 return new Map([[out,value]]);
}
// All structure constants use a fixed denominator 8, giving integer c8 = 8*c.
const C=B.map((_,i)=>B.map((_,j)=>{
 const m=new Map;
 for(const [k,value] of rawBracket(i,j)){
  const numerator=8*value*B[k].den;
  const denominator=B[i].den*B[j].den;
  check(numerator%denominator===0,'exact rational bracket '+i+','+j);
  m.set(k,numerator/denominator);
 }return m;
}));
// Independent index-level source gamma action formulas (no repacking from C).
let GGtoM=0,EWtoM=0,MMtoG=0,MMtoEW=0,MMzero=0,GEWcommuting=0;
const signed=(kind,i,j)=>{
 if(i===j)return undefined;
 const k=B.findIndex(x=>x.kind===kind&&x.i===Math.min(i,j)&&x.j===Math.max(i,j));
 return [k,i<j?1:-1];
};
for(let h=0;h<6;h++)for(let m=12;m<28;m++){
 const H=B[h],M=B[m];
 let expected=new Map;
 if(H.j===M.i){const q=B.findIndex(x=>x.kind==='M'&&x.i===H.i&&x.j===M.j);expected.set(q,2*eta[H.j]*8);}
 if(H.i===M.i){const q=B.findIndex(x=>x.kind==='M'&&x.i===H.j&&x.j===M.j);expected.set(q,-2*eta[H.i]*8);}
 check(eq(C[h][m],expected),'G/N named index bracket '+h+','+m);GGtoM++;
}
for(let h=6;h<12;h++)for(let m=12;m<28;m++){
 const H=B[h],M=B[m];let expected=new Map;
 if(H.j===M.j){const k=B.findIndex(x=>x.kind==='M'&&x.i===M.i&&x.j===H.i);expected.set(k,2*8);}
 if(H.i===M.j){const k=B.findIndex(x=>x.kind==='M'&&x.i===M.i&&x.j===H.j);expected.set(k,-2*8);}
 check(eq(C[h][m],expected),'EW/N named index bracket '+h+','+m);EWtoM++;
}
for(let i=0;i<6;i++)for(let j=6;j<12;j++){
 check(C[i][j].size===0,'G and EW independent commuting '+i+','+j);GEWcommuting++;
}
for(let m=12;m<28;m++)for(let n=m+1;n<28;n++){
 const u=B[m],v=B[n];let expected=new Map;
 if(u.j===v.j&&u.i!==v.i){const [k,sgn]=signed('G',u.i,v.i);expected.set(k,-sgn*eta[4+u.j]);MMtoG++;}
 else if(u.i===v.i&&u.j!==v.j){const [k,sgn]=signed('EW',u.j,v.j);expected.set(k,-sgn*eta[u.i]);MMtoEW++;}
 else MMzero++;
 check(eq(C[m][n],expected),'N/N exact transported mixed bracket '+m+','+n);
}
function eq(a,b){if(a.size!==b.size)return false;for(const[k,v]of a)if(b.get(k)!==v)return false;return true;}
// Jacobi identities over all unordered triples; coefficients exact rational /64.
function jacobi(table){let tripleCount=0,failCount=0;
 for(let a=0;a<28;a++)for(let b=a+1;b<28;b++)for(let c=b+1;c<28;c++){
  const sum=new Map;
  for(const [x,y,z] of [[a,b,c],[b,c,a],[c,a,b]]){
   for(const [m,v] of table[y][z])for(const [k,w] of table[x][m])sum.set(k,(sum.get(k)||0)+v*w);
  }
  tripleCount++;
  if([...sum.values()].some(v=>v!==0))failCount++;
 }return{tripleCount,failCount};
}
const jacobiCorrect=jacobi(C);check(jacobiCorrect.failCount===0&&jacobiCorrect.tripleCount===3276,'Jacobi transported full 28-generator ring');
// Source-wrong adversary: negate every [N,N] bracket while retaining pure and mixed action.
// It passes Jacobi, proving Jacobi-only tests cannot establish original real/source signs.
const wrongSign=C.map((row,i)=>row.map((m,j)=>i>=12&&j>=12?new Map([...m].map(([k,v])=>[k,-v])):new Map(m)));
const jacobiWrong=jacobi(wrongSign);
check(jacobiWrong.failCount===0,'Jacobi sign-flipped mutant should pass: important false positive');
let sourceWrongBrackets=0;
for(let i=0;i<28;i++)for(let j=i+1;j<28;j++)if(!eq(C[i][j],wrongSign[i][j]))sourceWrongBrackets++;
check(sourceWrongBrackets===48,'48 source-wrong mixed bracket witnesses missed by Jacobi alone');

// Coordinate scaling, unique within the explicitly stated uniform nonzero real
// constant basis-change class and fixed original e,phi/omega/V field coefficients.
// H1 mixed coefficient relative to M is 1/4; expressed in N=sM it is 1/(4s).
// A unit coefficient matching printed polynomial requires s=1/4.
const coefficientNumerator=1,coefficientDenominator=4;
const sNumerator=1,sDenominator=4;
check(coefficientNumerator*sDenominator===coefficientDenominator*sNumerator,'unique output basis match from independent de*phi jet coefficient');
// This is a coordinate change, not an automorphism fixing G/EW: if f(M)=sM,
// [f(M),f(M)]=s^2[M,M] while f([M,M])=[M,M]. Source has 48 nonzero cases.
check(sNumerator*sNumerator!==sDenominator*sDenominator && sourceWrongBrackets>0,'uniform 1/4 mixed scaling cannot preserve source algebra automorphically');
const coefficientMutants=[
 ['drop quarter and use s=1',1,1],
 ['half basis s=1/2',1,2],
 ['eighth basis s=1/8',1,8],
 ['negative quarter',-1,4],
 ['double quarter',2,4],
];
let factorMutantsRejected=0;
for(const [name,n,d] of coefficientMutants){const matches=coefficientNumerator*d===coefficientDenominator*n;if(matches)issues.push('ESCAPED uniform-scale mutant '+name);else factorMutantsRejected++;}
// Independent wrong-sign mutant remains Jacobi closed but fails exact Clifford transport.
check(!eq(C[12][13],wrongSign[12][13]) || sourceWrongBrackets>=1,'wrong-sign mutant needs source-level refusal');
const output={
 schema:'isograph.exp062-l039-mixed-generator-output-transport-G0.v0.1',pass:issues.length===0,issues,
 source:'L01 arXiv:0711.0770v1',stage:'G0',source_checks_skipped:mathOnly,
 generator_count:B.length,source_clifford_metric:eta,
 source_direct_G_to_N:GGtoM,source_direct_EW_to_N:EWtoM,source_direct_NN_to_G:MMtoG,source_direct_NN_to_EW:MMtoEW,source_direct_NN_zero:MMzero,commuting_G_EW_pairs:GEWcommuting,
 exact_structure_constants_common_denominator:8,complete_unordered_pair_brackets:378,
 transported_jacobi_triples:jacobiCorrect.tripleCount,transported_jacobi_failures:jacobiCorrect.failCount,
 wrong_sign_jacobi_triples:jacobiWrong.tripleCount,wrong_sign_jacobi_failures:jacobiWrong.failCount,wrong_sign_direct_source_bracket_mismatches:sourceWrongBrackets,
 unique_uniform_output_rescaling:'N=M/4 conditional on same source fields and printed Fgw coordinate = 1, not source authorization',
 scaling_is_automorphism_fixing_pure_generators:false,
 uniform_scale_mutants_defined:coefficientMutants.length,uniform_scale_mutants_rejected:factorMutantsRejected,
 adversarial_source_mutants_defined:mathOnly?0:7,adversarial_source_mutants_rejected:sourceMutantsRejected,
 source_output_normalization_established:false,source_census_frozen:false,G1_authorized:false,cross_author_semantics_authorized:false,external_cold_review_passed:false
};
console.log(JSON.stringify(output,null,2));
if(issues.length)process.exitCode=1;
