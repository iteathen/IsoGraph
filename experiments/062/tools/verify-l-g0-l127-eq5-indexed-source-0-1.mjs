import fs from 'node:fs';
import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const paths={
 packet:L+'LISI_L05_EQ5_INDEXED_BIVECTOR_SOURCE_RECONSTRUCTION_0_1.json',
 ledger:L+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_2.json',
 ssc:L+'SOURCE_SEMANTIC_CENSUS_0_13.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_14.json',
 eq2:E+'L126_L05_EQ2_EQ3_OCTONION_CLIFFORD_SOURCE_CONTRADICTION_0_1.json',
 eq5:E+'L127_EQ5_SOURCE_BIVECTOR_REVERSE_INDEX_DEFECT_0_1.json'
};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8')),copy=o=>JSON.parse(JSON.stringify(o)),j=JSON.stringify;
const gitsha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const D=get(paths.packet),SRC=get(paths.ledger),SSC=get(paths.ssc),GATE=get(paths.gate);
const tildeSign=i=>i===0?1:-1,zero=n=>Array.from({length:n},()=>Array(n).fill(0));
const plus=(x,y)=>x.map((r,i)=>r.map((v,k)=>v+y[i][k]));
const minus=x=>x.map(r=>r.map(v=>-v));
const matrixMul=(a,b)=>{const n=a.length,out=zero(n);for(let i=0;i<n;i++)for(let k=0;k<n;k++)if(a[i][k]!==0)for(let v=0;v<n;v++)out[i][v]+=a[i][k]*b[k][v];return out;};
const transpose=a=>a[0].map((_,i)=>a.map(row=>row[i]));
function make(t){
 const n=t.dimension, G=Array.from({length:n},()=>zero(n)),B=Array.from({length:n},()=>zero(n));
 const entry=(u,v)=>{const cell=t.entries?.[u]?.[v];if(typeof cell!=='string'||!/^(-?)e([0-7])$/.test(cell))throw Error('invalid source multiplication cell');const k=Number(cell.slice(-1));if(k>=n)throw Error('source output basis out of domain');return{factor:cell[0]==='-'?-1:1,k}};
 for(let c=0;c<n;c++)for(let a=0;a<n;a++){const x=entry(c,a);G[c][x.k][a]+=x.factor*tildeSign(x.k);B[c][x.k][a]+=x.factor*tildeSign(c)*tildeSign(a);}
 return{n,G,B,entry};
}
function direct(t,model,c,d,input,output,upper){
 const {entry}=model;
 if(upper){
  const x=entry(d,input),y=entry(c,x.k);
  return x.factor*y.factor*tildeSign(c)*(y.k===output?1:0);
 }
 const x=entry(d,input),y=entry(c,x.k);
 return x.factor*y.factor*tildeSign(d)*tildeSign(input)*tildeSign(output)*(y.k===output?1:0);
}
const mod=(v,p)=>((v%p)+p)%p;
function rankMod(rows,p){
 let a=rows.map(row=>row.map(x=>mod(x,p))),r=0,n=a[0]?.length||0;
 function inv(x){let v=1,e=p-2,b=x;while(e){if(e&1)v=v*b%p;b=b*b%p;e=Math.floor(e/2);}return v;}
 for(let col=0;col<n&&r<a.length;col++){
  let sel=r;while(sel<a.length&&a[sel][col]===0)sel++;if(sel===a.length)continue;
  [a[r],a[sel]]=[a[sel],a[r]];
  const factor=inv(a[r][col]);for(let j=col;j<n;j++)a[r][j]=a[r][j]*factor%p;
  for(let i=r+1;i<a.length;i++){const u=a[i][col];if(u!==0)for(let j=col;j<n;j++)a[i][j]=mod(a[i][j]-u*a[r][j]%p,p);}
  r++;
 }return r;
}
function scan(t,full=true){
 const m=make(t),{G,B,n}=m,labels=[],U=[],V=[];
 let cellChecks=0,cellFailures=0,firstCellFailure=null,reverseU=0,reverseV=0,revUInputs=0,revVInputs=0,skewU=0;
 for(let c=0;c<n;c++)for(let d=c+1;d<n;d++){
  const up=matrixMul(B[c],G[d]),lo=matrixMul(G[c],B[d]);
  U.push(up);V.push(lo);labels.push([c,d]);
  const ur=plus(up,matrixMul(B[d],G[c])),vr=plus(lo,matrixMul(G[d],B[c]));
  const ncU=ur.flat().filter(Boolean).length,ncV=vr.flat().filter(Boolean).length;
  if(ncU){reverseU++;revUInputs+=new Set(ur.flatMap((row,i)=>row.map((v,k)=>v!==0?k:null).filter(v=>v!==null))).size;}
  if(ncV){reverseV++;revVInputs+=new Set(vr.flatMap((row,i)=>row.map((v,k)=>v!==0?k:null).filter(v=>v!==null))).size;}
  if(plus(up,transpose(up)).flat().some(Boolean))skewU++;
  for(const sig of [-1,1])for(let input=0;input<n;input++)for(let output=0;output<n;output++){
   for(const [label,matrix,upper]of [['upper',up,true],['lower',lo,false]]){
    const lhs=sig*matrix[output][input],rhs=sig*direct(t,m,c,d,input,output,upper);
    cellChecks++;if(lhs!==rhs){cellFailures++;firstCellFailure||={carrier:t.carrier,label,c,d,input,output,lhs,rhs,sig};}
   }
  }
 }
 let span=null;
 if(full){
  const flat=U.map(q=>q.flat()),primes=[1009,10007];
  const ranks=primes.map(p=>rankMod(flat,p)),extra=[0,0],first=null;
  for(let i=0;i<U.length;i++)for(let k=i+1;k<U.length;k++){
   const bracket=plus(matrixMul(U[i],U[k]),minus(matrixMul(U[k],U[i]))).flat();
   const enlarged=primes.map(p=>rankMod(flat.concat([bracket]),p));
   for(let ix=0;ix<primes.length;ix++)if(enlarged[ix]>ranks[ix])extra[ix]++;
   if(!first&&enlarged.some((v,j)=>v>ranks[j]))first={generator_1:labels[i],generator_2:labels[k],enlarged_ranks:enlarged};
  }
  span={ranks,primes,extra,commutators:U.length*(U.length-1)/2,first};
 }
 return{carrier:t.carrier,dim:n,generator_count:U.length,cellChecks,cellFailures,firstCellFailure,reverseU,reverseV,revUInputs,revVInputs,skewU,span,G,B,U,V,labels};
}
function inconsistentMatrixCounts(o){
 const n=o.dim,bT=o.G.map(transpose);let upper=0,lower=0,upperCells=0,lowerCells=0,upp=[],low=[];
 for(let c=0;c<n;c++)for(let d=c+1;d<n;d++){
  const u=matrixMul(o.B[c],o.G[d]),ut=matrixMul(bT[c],o.G[d]),v=matrixMul(o.G[c],o.B[d]),vt=matrixMul(o.G[c],bT[d]);
  let uc=0,lc=0;for(let x=0;x<n;x++)for(let y=0;y<n;y++){uc+=(u[x][y]!==ut[x][y]);lc+=(v[x][y]!==vt[x][y]);}
  if(uc){upper++;upperCells+=uc;upp.push([c,d]);}if(lc){lower++;lowerCells+=lc;low.push([c,d]);}
 }
 return{upper,lower,upperCells,lowerCells,upp,low};
}
function verify(pkt=D,source=SRC){
 const failures=[],ok=(q,label)=>{if(!q)failures.push(label)},parent=pkt.parents||{},eq=pkt.eq5||{},o=pkt.observations_to_test||{};
 const frozen=[
 ['table_ledger',paths.ledger],['ssc_013',paths.ssc],['stage_gate_014',paths.gate],['Eq2_Eq3_negative',paths.eq2],['Eq5_reverse_index_negative',paths.eq5]
 ];
 ok(pkt.schema==='isograph.lisi-l05-eq5-chiral-indexed-source.g0.v0.1'&&pkt.track==='L'&&pkt.stage==='G0'&&pkt.authority===false&&pkt.G1_authorized===false,'only L G0 source packet');
 ok(pkt.source?.revision==='2026-08-29 published journal version of record'&&pkt.source?.pdf_zero_index===4&&pkt.source?.equation==='(5)','primary source exact revision/location');
 for(const [name,p]of frozen)ok(parent[name]?.path===p&&parent[name]?.git_blob_sha===gitsha(p),'immutable pinned '+name);
 ok(SSC.items?.length===191&&GATE.current_lawful_state?.G1_authorized===false&&GATE.current_lawful_state?.G0_source_census_frozen===false,'current gate forbids descendants');
 ok(j(source.basis_multiplication_tables)===j(SRC.basis_multiplication_tables),'original six source tables completely immutable under mutation');
 ok(j(pkt.scope?.source_tables)===j(['C','C_split','H','H_split','O','O_split'])&&j(pkt.scope?.carrier_dimensions)===j([2,4,8]),'all source tables with exact dimensions');
 ok(pkt.index_semantics?.summation==='source upper summed b; source lower summed a; all free and summed indices run 0..n-1','strict binder incidence');
 ok(pkt.index_semantics?.matrix_incidence==='matrix row is output, column is input; explicit internal binder must be summed; row/column names are scoped to their chiral blocks','chiral row/column roles');
 ok(pkt.index_semantics?.tilde_not_inverse===undefined&&pkt.index_semantics?.coefficient_definition?.includes('not an inverse index'),'tilde index not false inverse');
 ok(pkt.index_semantics?.barGamma_direct_M==='(barGamma_c)^a_b=M_(tilde c,tilde b)^a'&&pkt.index_semantics?.gamma_definition==='(Gamma_c)^b_a=M_(c,a)^(tilde b)','exact source Γ/M coefficient index binding');
 ok(pkt.index_semantics?.barGamma_transpose?.includes('claim is inconsistent with source original O table'),'source competing Eq2 transpose not substituted');
 ok(eq.upper?.row==='a'&&eq.upper?.col==='e'&&eq.upper?.binder==='b','upper free/summed roles');
 ok(eq.lower?.row==='b'&&eq.lower?.col==='f'&&eq.lower?.binder==='a','lower free/summed roles');
 ok(eq.upper?.M_block==='± sum_b M_(tilde c,tilde b)^a*M_(d,e)^(tilde b)'&&eq.upper?.Gamma_block==='± sum_b (barGamma_c)^a_b*(Gamma_d)^b_e','upper matrix products and binder exact');
 ok(eq.lower?.M_block==='± sum_a M_(c,a)^(tilde b)*M_(tilde d,tilde f)^a'&&eq.lower?.Gamma_block==='± sum_a (Gamma_c)^b_a*(barGamma_d)^a_f','lower matrix products and binder exact');
 ok(eq.upper?.division_algebra==='± tilde(e_c) * (e_d * e_e)'&&eq.lower?.division_algebra==='± e_c * (tilde(e_d) * tilde(e_f))','source right-first nonassociative grouping');
 ok(eq.source_reverse_index_assertion==='gamma_(d,c)=-gamma_(c,d) for c!=d'&&eq.composition?.includes('barGamma_c*Gamma_d for upper, Gamma_c*barGamma_d for lower'),'author assertion not proof by name');
 ok(pkt.version_evidence_NOT_FROZEN?.published?.includes('row e6 col e7 = -e2')&&pkt.version_evidence_NOT_FROZEN?.different_arxiv_revision?.includes('row e6 col e7 = +e2')&&pkt.version_evidence_NOT_FROZEN?.disposition?.includes('NOT_AN_ERRATUM'),'different revision not source edit');
 const computed={},scans=[];try{for(const t of source.basis_multiplication_tables)scans.push(scan(t,t.carrier==='O'||t.carrier==='H'));}catch(e){failures.push('source matrix computation failed '+e.message);return failures;}
 for(const result of scans)computed[result.carrier]=result;
 ok(scans.reduce((v,x)=>v+x.cellChecks,0)===o.source_M_vs_direct_action_cells*2&&scans.every(x=>x.cellFailures===0),'7568 each-sign source-ordered chiral matrix reconstruction');
 const O=computed.O,H=computed.H,split=computed.O_split,obs=o.ordinary_O_upper_Lie_span||{},anti=o.ordinary_O_reverse_generator_failures||{};
 ok(O.reverseU===anti.upper&&O.reverseV===anti.lower&&O.revUInputs===anti.basis_inputs_upper&&O.revVInputs===anti.basis_inputs_lower,'printed ordinary O reverse index counterexamples');
 ok(O.span?.ranks[0]===obs.generator_rank_two_mod_primes&&O.span?.ranks[1]===obs.generator_rank_two_mod_primes&&j(O.span.primes)===j(obs.primes),'O upper source representation 28 independent matrices');
 ok(O.skewU===obs.upper_generators_non_euclidean_skew&&O.span?.commutators===obs.commutators_tested&&j(O.span.extra)===j([obs.outside_span_both_mod_primes,obs.outside_span_both_mod_primes]),'O upper source matrices not Lie-closed');
 ok(j([O.span.first?.generator_1,O.span.first?.generator_2])===j(obs.first_outside_pair)&&j(O.span.first?.enlarged_ranks)===j([obs.augmented_rank,obs.augmented_rank]),'independent first Lie nonclosure witness');
 const M=inconsistentMatrixCounts(O),exp=o.ordinary_O_direct_M_vs_transpose_bivector_disagreement||{};
 ok(M.upper===1&&M.lower===6&&M.upperCells===exp.upper_cells&&M.lowerCells===exp.lower_cells&&j(M.upp)===j(exp.upper_generator_pairs)&&j(M.low)===j(exp.lower_generator_pairs),'transpose vs printed M Eq5 matrix conflict');
 ok(H.span?.ranks[0]===3&&H.span?.extra[0]===0&&H.span?.extra[1]===0&&O.span.primes.every((p,i)=>H.span.primes[i]===p),'H direct-M chiral positive control');
 ok(split.reverseU===0&&split.reverseV===0,'source split O reverse index positive control');
 const fix=copy(source.basis_multiplication_tables.find(t=>t.carrier==='O'));
 ok(fix.entries[6][7]==='-e2'&&fix.entries[7][6]==='-e2','original contradictory source literal kept');
 fix.entries[6][7]='e2';const hypothetical=scan(fix,true);
 ok(hypothetical.reverseU===0&&hypothetical.reverseV===0&&hypothetical.span.extra.every(v=>v===0),'mathematical one-cell repair candidate not source');
 ok(pkt.version_evidence_NOT_FROZEN?.source_disposition===undefined&&pkt.remaining?.G1_through_G7_authorized===false,'no later source substitution or downstream promotion');
 return failures;
}
const baseline=verify(),errors=[...baseline],mutants=[
 ['upper M index swapped',p=>{p.eq5.upper.M_block=p.eq5.upper.M_block.replace('M_(d,e)','M_(e,d)')}],
 ['lower M index order swapped',p=>{p.eq5.lower.M_block=p.eq5.lower.M_block.replace('M_(c,a)','M_(a,c)')}],
 ['upper wrong binder',p=>{p.eq5.upper.binder='a'}],
 ['lower wrong binder',p=>{p.eq5.lower.binder='b'}],
 ['upper wrong external row',p=>{p.eq5.upper.row='e'}],
 ['lower wrong external row',p=>{p.eq5.lower.row='f'}],
 ['upper product swapped',p=>{p.eq5.upper.Gamma_block='± sum_b (Gamma_d)^b_e*(barGamma_c)^a_b'}],
 ['lower product swapped',p=>{p.eq5.lower.Gamma_block='± sum_a (barGamma_d)^a_f*(Gamma_c)^b_a'}],
 ['remove upper parentheses',p=>{p.eq5.upper.division_algebra='± (tilde(e_c)*e_d)*e_e'}],
 ['remove lower tilde',p=>{p.eq5.lower.division_algebra='± e_c * (e_d * tilde(e_f))'}],
 ['change Eq5 sign claim',p=>{p.eq5.source_reverse_index_assertion='gamma_(d,c)=gamma_(c,d)'}],
 ['erase O reverse input evidence',p=>{p.observations_to_test.ordinary_O_reverse_generator_failures.basis_inputs_upper=0}],
 ['erase O Lie span failures',p=>{p.observations_to_test.ordinary_O_upper_Lie_span.outside_span_both_mod_primes=0}],
 ['wrong rank',p=>{p.observations_to_test.ordinary_O_upper_Lie_span.generator_rank_two_mod_primes=27}],
 ['change first witness',p=>{p.observations_to_test.ordinary_O_upper_Lie_span.first_outside_pair=[[0,2],[0,6]]}],
 ['erase transpose mismatch',p=>{p.observations_to_test.ordinary_O_direct_M_vs_transpose_bivector_disagreement.lower_cells=0}],
 ['lose split control',p=>{p.observations_to_test.control_O_split.reverse_upper_failure_generator_pairs=7}],
 ['erase source M pin',p=>{p.parents.table_ledger.git_blob_sha='stale'}],
 ['erase exact source version',p=>{p.version_evidence_NOT_FROZEN.different_arxiv_revision='same as journal'}],
 ['try G1 promotion',p=>{p.G1_authorized=true}],
 ['try declaring theorem',p=>{p.primitive_or_theorem_qualification=true}],
 ['alter original O source cell',(_p,s)=>{s.basis_multiplication_tables.find(x=>x.carrier==='O').entries[6][7]='e2'}],
 ['alter unrelated original C cell',(_p,s)=>{s.basis_multiplication_tables.find(x=>x.carrier==='C').entries[1][1]='e0'}],
 ['W source import',p=>{p.source.scope='W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [label,mutation]of mutants){const pkt=copy(D),s=copy(SRC),before=j([pkt,s]);mutation(pkt,s);if(j([pkt,s])===before)errors.push('mutation no-op '+label);else if(verify(pkt,s).length===0)errors.push('escaped mutation '+label);else rejected++;}
const report={schema:'isograph.exp062-l05-eq5-ordered-source-replay.v0.1',pass:errors.length===0,errors,carriers:6,source_chiral_cells_two_signs:15136,ordinary_O_reverse_failed_upper_generator_pairs:6,ordinary_O_reverse_failed_lower_generator_pairs:6,ordinary_O_upper_rank:28,ordinary_O_non_Lie_commutators:168,ordinary_O_transpose_mismatch_pairs:[1,6],adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',source_census_frozen:false,mathematical_closure:false,G1_authorized:false,external_verification_passed:false};
console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
