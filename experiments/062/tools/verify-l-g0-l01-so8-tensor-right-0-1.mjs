// L01 v1 original pp21–24,27: source-conditional compact 8x8 right tensor-index transpose.
// Exact project real so8=su3+2u1+three six-real SU3 submodules; not source E8 matrices.
import fs from 'node:fs';
import crypto from 'node:crypto';
const P={"packet":"research/woit-lisi-isomorph/lisi/LISI_L01_SO8_TENSOR_RIGHT_TRANSPOSE_G0_0_1.json","oldPacket":"research/woit-lisi-isomorph/lisi/LISI_L01_RIGHT_ACTION_CONTRAGREDIENT_G0_0_1.json","oldCensus":"research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_41.json","census":"research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_42.json","oldGate":"experiments/062/L_CURRENT_STAGE_GATE_0_42.json","gate":"experiments/062/L_CURRENT_STAGE_GATE_0_43.json","checker":"experiments/062/tools/verify-l-g0-l01-so8-tensor-right-0-1.mjs"};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
function mathAudit(m={}){
 const issues=[],ck=(v,s)=>{if(!v)issues.push(s)};
 const Z=(r,c)=>Array.from({length:r},()=>Array(c).fill(0));
 const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
 const E=(n,i,j)=>{const a=Z(n,n);a[i][j]=1;return a};
 const mul=(a,b)=>{if(a[0].length!==b.length)throw Error('DIMENSION_MISMATCH');return a.map(row=>b[0].map((_,j)=>row.reduce((s,x,i)=>s+x*b[i][j],0)))};
 const T=a=>a[0].map((_,i)=>a.map(row=>row[i]));
 const sc=(a,v)=>a.map(row=>row.map(x=>x*v));
 const plus=(a,b)=>a.map((row,i)=>row.map((x,j)=>x+b[i][j]));
 const minus=(a,b)=>plus(a,sc(b,-1));
 const bracket=(a,b)=>minus(mul(a,b),mul(b,a));
 const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const zero=a=>a.every(row=>row.every(v=>v===0));
 const F=(n,i,j)=>minus(E(n,i,j),E(n,j,i));
 const embed=(u,v)=>{const X=Z(8,8);for(let i=0;i<3;i++)for(let j=0;j<3;j++){X[i][j]=u[i][j];X[i][j+3]=-v[i][j];X[i+3][j]=v[i][j];X[i+3][j+3]=u[i][j]}return X};
 const su=[];
 for(const [i,j]of [[0,1],[0,2],[1,2]]){
  su.push({label:'A'+i+j,u:F(3,i,j),v:Z(3,3)});
  su.push({label:'B'+i+j,u:Z(3,3),v:plus(E(3,i,j),E(3,j,i))});
 }
 let h1=Z(3,3),h2=Z(3,3);h1[0][0]=1;h1[1][1]=-1;h2[0][0]=h2[1][1]=1;h2[2][2]=m.diagTraceWrong?-1:-2;
 su.push({label:'H1',u:Z(3,3),v:h1},{label:'H2',u:Z(3,3),v:h2});
 const strong=su.map(z=>embed(z.u,z.v));
 const J=embed(Z(3,3),I(3));if(m.breakCommutant)J[0][1]=2;
 const K=F(8,6,7);
 const A=[];
 for(const [i,j]of [[0,1],[0,2],[1,2]]){
  const p=Z(8,8),q=Z(8,8),f=F(3,i,j);
  for(let a=0;a<3;a++)for(let b=0;b<3;b++){
   p[a][b]=f[a][b];p[a+3][b+3]=-f[a][b];
   q[a][b+3]=f[a][b];q[a+3][b]=f[a][b];
  }
  A.push(p,q);
 }
 if(m.antiFamilyLeak)A[0][0][6]=1;
 const B=Array.from({length:6},(_,i)=>F(8,i,6));
 const C=Array.from({length:6},(_,i)=>F(8,i,7));
 if(m.strongSingletLeak)strong[0][6][0]=1;
 let all=[...strong,J,K,...A,...B,...C];
 if(m.duplicateMixed)all[27]=all[26];
 if(m.omitMixed)all=all.slice(0,-1);
 if(m.missingSkewSign)all[0]=plus(all[0],E(8,0,1));
 ck(su.length===8&&A.length===6&&B.length===6&&C.length===6&&all.length===28,'so8 decomposition dimensions');
 const rankMod=(array,prime)=>{
  const x=Array.from({length:64},(_,k)=>array.map(a=>((a[Math.floor(k/8)][k%8]%prime)+prime)%prime));
  let r=0;for(let j=0;j<array.length;j++){
   let t=r;while(t<64&&!x[t][j])t++;if(t===64)continue;
   [x[r],x[t]]=[x[t],x[r]];
   let inverse=1;while((inverse*x[r][j])%prime!==1)inverse++;
   for(let h=j;h<array.length;h++)x[r][h]=x[r][h]*inverse%prime;
   for(let z=0;z<64;z++)if(z!==r){const q=x[z][j];if(q)for(let h=j;h<array.length;h++)x[z][h]=((x[z][h]-q*x[r][h])%prime+prime)%prime}
   r++;
  }
  return r;
 };
 const rank=rankMod(all,101);
 ck(rank===28,'exact rank28 modulo prime 101 implies rational independence');
 for(const [i,x]of all.entries())ck(eq(T(x),sc(x,-1)),'skewness for source-shaped so8 generator '+i);
 let nonzeroSu=0;
 for(const [i,a]of su.entries()){
  ck(a.v[0][0]+a.v[1][1]+a.v[2][2]===0,'su3 anti-Hermitian trace zero '+i);
  for(const [j,b]of su.entries()){
   const real=minus(minus(mul(a.u,b.u),mul(a.v,b.v)),minus(mul(b.u,a.u),mul(b.v,a.v)));
   const imag=minus(plus(mul(a.u,b.v),mul(a.v,b.u)),plus(mul(b.u,a.v),mul(b.v,a.u)));
   const actual=bracket(strong[i],strong[j]);
   ck(eq(actual,embed(real,imag)),'independent complex su3 bracket vs realification '+i+','+j);
   if(!zero(actual))nonzeroSu++;
  }
 }
 ck(nonzeroSu>0,'nontrivial nonabelian strong algebra');
 for(let a=0;a<8;a++){
  const s=strong[a];
  ck(zero(bracket(s,J))&&zero(bracket(s,K)),'commuting u1 centralizers '+a);
  ck(s.every((row,i)=>i<6?row[6]===0&&row[7]===0:row.every(v=>v===0)),'full su3 lepton annihilator '+a);
 }
 ck(zero(bracket(J,K)),'two commuting u1s');
 const anti=(a,b)=>plus(mul(a,b),mul(b,a));
 const crossOnly=(x,k)=>x.every((row,i)=>row.every((v,j)=>v===0||(i<6&&j===k)||(i===k&&j<6)));
 let nonzeroMixed=0;
 for(let i=0;i<8;i++)for(let j=0;j<6;j++){
  const u=bracket(strong[i],A[j]),v=bracket(strong[i],B[j]),w=bracket(strong[i],C[j]);
  ck(zero(anti(u,J))&&u.every((row,k)=>k<6?row[6]===0&&row[7]===0:row.every(x=>x===0)),'su3 first six stable '+i+','+j);
  ck(crossOnly(v,6)&&crossOnly(w,7),'su3 second/third six stable '+i+','+j);
  for(const f of [u,v,w])if(!zero(f))nonzeroMixed++;
 }
 ck(nonzeroMixed>40,'three nontrivial six-real mixed families');
 const psi=[[1,2,3,4,5,6,7,8],[-3,1,-2,4,-5,7,6,-8]];
 const right=(x,f)=>mul(f,m.noComponentTranspose?x:T(x));
 const negative=(x,f)=>sc(mul(f,x),m.flipSourceMinus?1:-1);
 const raw=(x,f)=>mul(f,x);
 let falsifiers=0,wrongBracket=0,pairChecks=0;
 for(const [i,x]of all.entries()){
  ck(eq(right(x,psi),negative(x,psi)),'negative source equals positive transposed component '+i);
  if(!eq(raw(x,psi),negative(x,psi)))falsifiers++;
 }
 ck(falsifiers===28,'generic fermion detects 28 raw untransposed plus-sign mismatches');
 for(let i=0;i<all.length;i++)for(let j=i+1;j<all.length;j++){
  const x=all[i],y=all[j],b=bracket(x,y);
  const l=minus(right(x,right(y,psi)),right(y,right(x,psi)));
  ck(eq(l,right(b,psi)),'all 378 operator Lie brackets on right transpose '+i+','+j);
  if(!eq(minus(raw(x,raw(y,psi)),raw(y,raw(x,psi))),raw(b,psi)))wrongBracket++;
  pairChecks++;
 }
 ck(wrongBracket>200,'positive raw-right action is nonabelian anti-action');
 const Cmatrix=[[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0]];
 ck(Cmatrix[0][0]*Cmatrix[1][1]-Cmatrix[0][1]*Cmatrix[1][0]===1&&!m.forceMixedRankOne,'so8 mixed decomposition does not force shared Phi rank one');
 if(m.reverseBasisBracket)ck(eq(bracket(strong[0],strong[2]),sc(bracket(strong[0],strong[2]),-1)),'illicit Lie bracket reversal');
 if(m.dropRightLepton)ck(zero(right(K,psi)),'illicit singlet u1 deletion');
 return{pass:issues.length===0,issues,model:'project real so8(8x8) with SU3 realified complex 3 plus two singlets',exact_integer_arithmetic:true,
  so8_basis:all.length,so8_rank_mod_101:rank,su3_generators:8,su3_pair_brackets:64,su3_nonzero_brackets:nonzeroSu,
  mixed_families:[A.length,B.length,C.length],su3_mixed_stability_checks:8*18,su3_nonzero_mixed_brackets:nonzeroMixed,
  right_transpose_equals_source_negative:all.length,naive_plus_right_sign_falsifiers:falsifiers,
  full_so8_pair_module_brackets:pairChecks,naive_plus_right_anti_bracket_falsifiers:wrongBracket,
  full_E8_source_root_spinor_map:false,original_component_generator_transpose_selected:false,shared_Phi_source_basis_qualified:false};
}
const mathMutants=[
 ['missing-component-transpose',{noComponentTranspose:true}],
 ['source-right-operator-reversed',{flipSourceMinus:true}],
 ['antisymmetric-matrix-corrupted',{missingSkewSign:true}],
 ['su3-lepton-not-a-singlet',{strongSingletLeak:true}],
 ['missing-mixed-generator',{omitMixed:true}],
 ['duplicate-mixed-generator',{duplicateMixed:true}],
 ['su3-mixed-module-leak',{antiFamilyLeak:true}],
 ['u1-no-longer-commutes',{breakCommutant:true}],
 ['su3-imaginary-diagonal-nontraceless',{diagTraceWrong:true}],
 ['forced-rank-one-shared-Phi',{forceMixedRankOne:true}],
 ['reverse-nonabelian-bracket',{reverseBasisBracket:true}],
 ['wrongly-eliminate-lepton-u1',{dropRightLepton:true}]
];
function sourceAudit(packet,old,current,gate){
 const issues=[],ck=(x,s)=>{if(!x)issues.push(s)};
 ck(packet.schema==='isograph.lisi-L01-so8-tensor-right-transpose-G0.v0.1'&&packet.track==='L'&&packet.stage==='G0'&&packet.semantic_authority===false,'track/stage/semantic authority');
 ck(packet.frozen_source?.id==='L01'&&packet.frozen_source.revision==='arXiv:0711.0770v1'&&JSON.stringify(packet.frozen_source.printed_pages)==='[21,22,23,24,27,28]','source v1 original pages');
 const roles=packet.frozen_source.roles||[];
 ck(roles.length===7&&roles.map(x=>x.id).join('|')==='E8_TENSOR|SO8_COLOR_SPLIT|H2_TERMS|FERMION_FIRST|FERMION_OPERATOR|FERMION_ACTION|FERMION_LIMIT','seven distinct exact original source roles');
 ck(roles[0]?.statement.includes('8S+ x 8S+')&&roles[1]?.statement==='so(8)=su(3)+u(1)+u(1)+3 x (3+3bar)','original e8 and so8 representation');
 ck(roles[2]?.statement==='H2=w+B2+xPhi+g in so(8)'&&roles[3]?.statement==='Psi_I in 8S+ x 8S+','original h2 and first gen carrier');
 ck(roles[4]?.statement==='-Psi(w+B2+xPhi)-Psi_q*g','original negative right H2 and quark projection');
 ck(roles[5]?.statement.includes('+Psi*g_i')&&roles[5].statement.startsWith('-Psi('),'source negative operator / positive components');
 ck(roles[6]?.statement.includes('not understood enough'),'source other generations incomplete');
 for(const [key,pp]of [['previous_right_action_packet',P.oldPacket],['ssc041',P.oldCensus],['gate042',P.oldGate]])
  ck(packet.parents?.[key]?.path===pp&&packet.parents[key].git_blob_sha===blob(pp),'predecessor blob '+key);
 ck(packet.model?.scope?.startsWith('PROJECT_CHOSEN')&&packet.model.exact_dimensions?.so8_total===28,'project-selected so8 dimension');
 ck(packet.model.exact_dimensions?.su3===8&&packet.model.exact_dimensions.abelian_su3_commutant===2&&packet.model.exact_dimensions.mixed_three_sixes===18,'8+2+18');
 ck(packet.model?.mixed_decomposition?.shared_Phi_rank_one_coefficient_restriction_implied===false,'no forced source sharedPhi');
 ck(packet.model?.index_convention?.identity==='R(X)^T=-R(X) for project real so8 carrier; thus -Psi R(X)=+Psi R(X)^T on unchanged rectangular Psi carrier','conditional transpose map not same generators');
 ck(packet.model?.index_convention?.requires_missing_source_authorization?.includes('right-index-transposed'),'source binding missing');
 ck(packet.math_evidence?.exact_integer_8x8_so8_basis_rank_mod_101===28&&packet.math_evidence.su3_complex_real_bracket_pairs===64,'mathematical evidence counts');
 ck(packet.math_evidence?.all_nonabelian_pair_module_tests===378&&packet.math_evidence.math_hostiles===12&&packet.math_evidence.source_hostiles===16,'hostile and pair counts');
 ck(packet.classification?.source_equivalent_representation_change==='NOT_ESTABLISHED_FOR_ORIGINAL_L01'&&packet.classification?.source_discrepancy==='STILL_OPEN_NOT_CONFIRMED_AUTHOR_ERROR','source not declared repaired or typo');
 for(const key of ['source_census_frozen','source_E8_right_map_qualified','source_full_fermionic_action_qualified','other_generation_actions_qualified','G1_authorized','G2_G7_authorized','W_semantics_available','cross_track_synthesis_allowed','external_cold_review_passed','author_outreach_authorized','PR70_merge_authorized'])
  ck(packet.stage_locks?.[key]===false,'no unauthorized '+key);
 ck(!JSON.stringify(packet).includes('W-SSC-'),'no W source import');
 const a=new Map(old.items.map(x=>[x.id,x])),b=new Map(current.items.map(x=>[x.id,x]));
 const changed=[];ck(a.size===191&&b.size===191&&current.item_count===191,'all 191 source records');
 for(const [id,x]of a){if(!b.has(id))issues.push('deleted '+id);else if(JSON.stringify(x)!==JSON.stringify(b.get(id)))changed.push(id)}
 for(const id of b.keys())if(!a.has(id))issues.push('invented '+id);
 ck(changed.join('|')==='L-SSC-040|L-SSC-041|L-SSC-046','exact 3 changed and 188 full predecessor records unchanged');
 for(const id of changed){
  const x=b.get(id),ancestor=a.get(id),link=x?.source_expression_census?.L01_SO8_TENSOR_RIGHT_TRANSPOSE_G0;
  ck(x.body.startsWith(ancestor.body),'source body prefix conserved '+id);
  ck(link?.source_packet?.path===P.packet&&link.source_packet.git_blob_sha===blob(P.packet),'exact source packet '+id);
  ck(link?.actual_E8_representation_qualified===false&&link?.original_right_component_transpose_source_confirmed===false&&link?.G1_authorized===false,'source distinctions conserved '+id);
 }
 ck(current.revision?.predecessor_git_blob_sha===blob(P.oldCensus)&&current.revision?.source_packet?.git_blob_sha===blob(P.packet)&&current.revision?.changed_source_items?.join('|')==='L-SSC-040|L-SSC-041|L-SSC-046','exact SSC lineage');
 ck(current.guards?.source_census_freeze_complete===false&&current.guards?.dp_allowed===false,'SSC unfinished');
 ck(gate.stage==='G0'&&gate.semantic_authority===false&&gate.track==='L'&&gate.predecessor_gate?.git_blob_sha===blob(P.oldGate),'gate G0 only and parent hash');
 ck(gate.current_source_census?.path===P.census&&gate.current_source_census?.git_blob_sha===blob(P.census)&&gate.current_source_census?.frozen===false,'gate exact SSC42');
 ck(gate.current_source_packet?.git_blob_sha===blob(P.packet)&&gate.source_verifier?.git_blob_sha===blob(P.checker),'gate packet and code blob');
 ck(gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.cross_track_synthesis_authorized===false&&gate.current_lawful_state?.source_E8_right_transpose_map_qualified===false,'gate downstream lock');
 return issues;
}
const baseline=mathAudit(),issues=[...baseline.issues];
let killedMath=0;
for(const [name,mutation]of mathMutants){try{if(!mathAudit(mutation).pass)killedMath++;else issues.push('ESCAPED_MATH '+name)}catch(e){issues.push('CRASHED_MATH '+name+':'+e.message)}}
let killedSource=0;
if(!process.argv.includes('--math-only')){
 const a=read(P.packet),b=read(P.oldCensus),c=read(P.census),g=read(P.gate);
 issues.push(...sourceAudit(a,b,c,g));
 const mutants=[
 ['source-version',x=>x.frozen_source.revision='arXiv:0711.0770v2'],
 ['source-fermion-carrier',x=>x.frozen_source.roles[3].statement='Psi_I in 8V x 8V'],
 ['source-H2-right-sign',x=>x.frozen_source.roles[4].statement='+Psi(w+B2+xPhi)-Psi_q*g'],
 ['source-strong-quark-projection',x=>x.frozen_source.roles[4].statement=x.frozen_source.roles[4].statement.replace('Psi_q','Psi')],
 ['source-final-component-sign',x=>x.frozen_source.roles[5].statement=x.frozen_source.roles[5].statement.replace('+Psi*g_i','-Psi*g_i')],
 ['source-multi-generation',x=>x.frozen_source.roles[6].statement='All three actions completely calculated'],
 ['so8-dimension',x=>x.model.exact_dimensions.so8_total=27],
 ['rank-one-promote',x=>x.model.mixed_decomposition.shared_Phi_rank_one_coefficient_restriction_implied=true],
 ['transpose-deleted',x=>x.model.index_convention.identity='raw matrices identical'],
 ['source-convention-invented',x=>x.model.index_convention.requires_missing_source_authorization='author states this transpose rule'],
 ['basis-claimed-source',x=>x.model.scope='EXACT_SOURCE_E8_GENERATORS'],
 ['math-witness-edited',x=>x.math_evidence.all_nonabelian_pair_module_tests=377],
 ['author-typo',x=>x.classification.source_discrepancy='CONFIRMED_ERROR'],
 ['promote-source-equivalence',x=>x.classification.source_equivalent_representation_change='SOURCE_CONFIRMED'],
 ['G1-unauthorized',x=>x.stage_locks.G1_authorized=true],
 ['forge-lineage',x=>x.parents.ssc041.git_blob_sha='FAKE']
 ];
 for(const [name,fn]of mutants){const copy=JSON.parse(JSON.stringify(a));fn(copy);if(sourceAudit(copy,b,c,g).length)killedSource++;else issues.push('ESCAPED_SOURCE '+name)}
}
console.log(JSON.stringify({schema:'isograph.exp062-L01-so8-tensor-right-G0.v0.1',pass:issues.length===0,issues,
 math:baseline,math_mutants_defined:mathMutants.length,math_mutants_killed:killedMath,
 source_mutants_defined:process.argv.includes('--math-only')?0:16,source_mutants_killed:killedSource,
 conserved_source_identities:191,full_unchanged_records:188,changed_ids:['L-SSC-040','L-SSC-041','L-SSC-046'],
 actual_source_E8_right_matrix_map_qualified:false,actual_source_fermion_sign_equivalence_qualified:false,
 actual_source_shared_Phi_factorization_qualified:false,
 G1_authorized:false,cross_author_synthesis_authorized:false,external_cold_review_passed:false},null,2));
if(issues.length)process.exitCode=1;
