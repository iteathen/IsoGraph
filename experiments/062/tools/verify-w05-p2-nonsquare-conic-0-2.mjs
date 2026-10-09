import fs from 'node:fs';
import crypto from 'node:crypto';
const P='experiments/062/W05_G0_P2_NONSQUARE_UNIT_CONIC_COUNTEREXAMPLE_0_1.json';
const S='research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_32.json';
const OLD='research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_31.json';
const R="bc86be42057c5ab6fe71a5ae7f81466e92ec80a9",H='04212aa6fc74c679fb4744aa038df0ef43b83262',HOLD='75dd724efbfffdcd5d475769cb5f3bea6eaaa97b';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const mul=(a,b)=>[[a[0][0]*b[0][0]+a[0][1]*b[1][0],a[0][0]*b[0][1]+a[0][1]*b[1][1]],[a[1][0]*b[0][0]+a[1][1]*b[1][0],a[1][0]*b[0][1]+a[1][1]*b[1][1]]];
const permDet4=matrix=>{let sum=0;for(let x=0;x<4;x++)for(let y=0;y<4;y++)if(x!==y)for(let z=0;z<4;z++)if(z!==x&&z!==y){const w=6-x-y-z,pi=[x,y,z,w];let inv=0;for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)if(pi[a]>pi[b])inv++;sum+=(inv%2?-1:1)*matrix[0][x]*matrix[1][y]*matrix[2][z]*matrix[3][w];}return sum};
const errs=[],check=(ok,msg,e=errs)=>{if(!ok)e.push(msg)};
const s=read(S),old=read(OLD),o=read(P),ids=['W-SSC-105','W-SSC-106'],lookup=(j,id)=>j?.items?.find(x=>x.id===id);
const verify=w=>{
const e=[],chk=(v,m)=>check(v,m,e),witness=w?.witness||{},alg=witness.quaternion_algebra||{},conic=witness.conic||{},proof=witness.non_square_certificate||{};
chk(w?.schema==='isograph.exp062-w05-p2-nonsquare-unit-source-quantifier-counterexample.v0.1'&&w?.semantic_authority===false&&w?.track==='W','W-only provenance/no authority');
chk(w?.source?.revision==='arXiv:2202.02657v2'&&eq(w?.source?.printed_pages,[9,10])&&w?.source?.source_quantifier_fidelity?.startsWith('The paper does not explicitly say EVERY'),'source page/qualifier');
chk(w?.anchored_source_census?.git_blob_sha===H&&w?.anchored_source_census?.predecessor_git_blob_sha===HOLD&&eq(w?.anchored_source_census?.identities,ids),'frozen source pin/identities');
chk(w?.anchored_source_census?.source_items_frozen===false&&w?.anchored_source_census?.G1_authorized===false&&w?.anchored_source_census?.changed_source_items===0&&w?.conclusions?.L_artifacts_used===false,'no source promotion or L transfer');
chk(witness.p===2&&witness.u===7&&witness.field==='Q_2'&&witness.u_is_unit==='ODD_2_ADIC_INTEGER','p2,u7 unit premises');
chk(proof.criterion==='odd 2-adic squares are 1 modulo 8'&&proof.u_mod8===witness.u%8&&proof.u_mod8===7&&eq(proof.odd_residues,[1,3,5,7])&&eq(proof.odd_square_residues_mod8,[1,1,1,1]),'non-square 2-adic exact residue witness');
chk(proof.odd_residues?.every(v=>v%2===1&&v*v%8===1)&&witness.u%2===1&&witness.u%8!==1,'u nonsquare unit independent congruence');
const [x,y,z]=conic.projective_point||[];
chk(eq(conic.projective_point,[7,2,3])&&conic.nonzero_point===true&&x*x+y*y+z*z>0&&conic.field_inclusion==='Q subset Q_2','rational projective witness');
const terms=[-witness.p*x*x,-witness.u*y*y,witness.p*witness.u*z*z];
chk(eq(terms,[-98,-28,126])&&eq(conic.integer_terms,terms)&&terms.reduce((s,x)=>s+x,0)===0&&conic.exact_sum===0,'exact nonzero conic rational solution');
const I=[[1,0],[0,1]],i=alg.i_matrix,j=alg.j_matrix,im=mul(i,j),jm=mul(j,i);
chk(eq(alg.parameters,[2,7])&&eq(i,[[0,2],[1,0]])&&eq(j,[[3,-2],[1,-3]]),'independent exact matrix representation');
chk(eq(mul(i,i),[[2,0],[0,2]])&&eq(mul(j,j),[[7,0],[0,7]])&&eq(mul(i,i),alg.i_squared)&&eq(mul(j,j),alg.j_squared),'quaternion squares');
chk(eq(im,jm.map(r=>r.map(n=>-n)))&&eq(im,alg.ij_matrix)&&eq(jm,alg.ji_matrix),'quaternion anticommutation');
const mat=[I,i,j,im].map(v=>v.flat())[0].map((_,idx)=>[I,i,j,im].map(q=>q.flat()[idx]));
const det=permDet4(mat);
chk(det===56&&alg.basis_coordinate_determinant===56&&eq(alg.basis_order,['I','i','j','ij']),'four independent basis vectors over Q2');
chk(alg.Hilbert_symbol===1&&alg.conclusion?.includes('split M_2(Q_2)'),'matrix splitting inference');
chk(w.conclusions?.counterexample==='u nonsquare alone DOES NOT suffice for p=2 division/conic-no-Qp-point conclusion.'&&w.conclusions?.necessary_G0_follow_up?.length===4,'falsified only naive universal extension; preserve open G0');
chk(w?.nonclaims?.some(s=>s.includes('No claim Woit stated a universal all-u theorem.'))&&w?.conclusions?.external_review==='OWNER_BYPASSED_NOT_PASSED','do not attribute universal to author');
return e;
};
check(sha(P)===R,'counterexample evidence blob content');
check(sha(S)===H&&sha(OLD)===HOLD,'immutable W source checkpoints');
check(s?.items?.length===151&&old?.items?.length===151,'151-source-scope preserved');
for(const id of ids){const a=lookup(s,id),b=lookup(old,id);check(eq(a,b),'no W source mutation '+id);check(a?.source==='W05 §6.1'&&a?.state==='OPEN_EXPOSITORY','W05 G0 source item open '+id)}
check(lookup(s,'W-SSC-105')?.source_expression_census?.statements?.[2]?.condition==='p != 2','retain p !=2 only where printed on 3 extensions');
check(lookup(s,'W-SSC-106')?.source_expression_census?.statements?.[2]?.Qp_points==='NONE','W106 source assertion not silently erased');
const mutations=[
['u changed to odd square',w=>w.witness.u=1],
['u changed to different nonsquare',w=>w.witness.u=3],
['p changed',w=>w.witness.p=3],
['conic x changed',w=>w.witness.conic.projective_point[0]=8],
['conic y changed',w=>w.witness.conic.projective_point[1]=1],
['conic z changed',w=>w.witness.conic.projective_point[2]=4],
['fake conic zero',w=>w.witness.conic.exact_sum=5],
['fake square criterion',w=>w.witness.non_square_certificate.u_mod8=1],
['delete 2-adic odd squares',w=>w.witness.non_square_certificate.odd_square_residues_mod8=[]],
['wrong i square',w=>w.witness.quaternion_algebra.i_matrix[0][1]=3],
['wrong j square',w=>w.witness.quaternion_algebra.j_matrix[1][1]=-2],
['wrong ji sign',w=>w.witness.quaternion_algebra.ji_matrix[0][0]=2],
['fake determinant',w=>w.witness.quaternion_algebra.basis_coordinate_determinant=0],
['wrong Hilbert split class',w=>w.witness.quaternion_algebra.Hilbert_symbol=-1],
['pretend G1 authorized',w=>w.anchored_source_census.G1_authorized=true],
['pretend frozen',w=>w.anchored_source_census.source_items_frozen=true],
['pretend source universally asserted claim',w=>w.source.source_quantifier_fidelity='EVERY nonsquare unit gives division'],
['import L semantics',w=>w.conclusions.L_artifacts_used=true],
['drop open scope obligations',w=>w.conclusions.necessary_G0_follow_up=[]],
['pretend external review',w=>w.conclusions.external_review='PASSED'],
['change source revision',w=>w.source.revision='arXiv:2202.02657v1']
];
const positive=verify(o),rejected=[],escaped=[];
for(const [name,mutate] of mutations){const altered=JSON.parse(JSON.stringify(o));mutate(altered);if(verify(altered).length)rejected.push(name);else escaped.push(name);}
const errors=[...errs,...positive,...escaped.map(x=>'ESCAPED '+x)];
console.log(JSON.stringify({schema:'isograph.exp062-w05-p2-conic-counterexample-verifier.v0.2',pass:errors.length===0,errors,p:2,u:7,exact_conic_point:[7,2,3],exact_conic_value:0,quaternion_matrix_basis_determinant:56,nonsquare_u_2_adic:true,source_W_items_checked:2,whole_source_census_frozen:false,source_untouched:true,adversarial_mutations:mutations.length,mutations_rejected:rejected.length,rejected,scope:'W05 G0 SOURCE_SCOPE_COUNTEREXAMPLE_NOT_SOURCE_REWRITING_OR_GENERAL_THEOREM'},null,2));
if(errors.length)process.exitCode=1;
