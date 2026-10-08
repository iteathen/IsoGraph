import fs from 'node:fs';
import crypto from 'node:crypto';
const root='research/woit-lisi-isomorph/woit/',exp='experiments/062/';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const x=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex')};
const s=read(root+'SOURCE_SEMANTIC_CENSUS_0_15.json'),record=read(exp+'W097_G0_PROJECTIVE_COORDINATE_FINITE_REPLAY_0_1.json');
const w=s.items.find(x=>x.id==='W-SSC-097'),st=w?.source_expression_census?.statements;
const errors=[],assert=(x,m)=>{if(!x)errors.push(m)};
assert(sha(root+'SOURCE_SEMANTIC_CENSUS_0_15.json')==='4a39e2d36465519a91731d193128dbd4b0720192','source successor blob pin');
assert(sha(exp+'W097_G0_PROJECTIVE_COORDINATE_FINITE_REPLAY_0_1.json')==='5018147b8a04511b85dc95f195ea0a6ef1da7156','arithmetic fixture blob pin');
assert(record.source_census_successor_sha==='4a39e2d36465519a91731d193128dbd4b0720192'&&record.source_oracle_sha==='3a448c9e762578e6ce6796123155f3ca3c2b5032','source oracle/revision');
assert(st?.length===8&&st[2]?.source_literal==='rho_tw([z1,z2])=[-bar(z2),bar(z1)]'&&st[3]?.chart_scope==='AFFINE_EXPRESSION_ONLY','source literal/affine boundary');
assert(st[2]?.application_total_on_declared_domain===true&&st[2]?.single_valued_map_declared===true,'CP1 projective map typed total/single');
assert(st[4]?.result==='NEGATIVE_IDENTITY_ON_C2'&&st[5]?.result==='IDENTITY_ON_CP1'&&st[6]?.negative_scope==='NOT_EXISTS_PROJECTIVE_POINT_FIXED','carrier-square/polarity');
const conj=z=>[z[0],-z[1]],neg=z=>[-z[0],-z[1]],eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const mult=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const scalar=(lambda,v)=>v.map(z=>mult(lambda,z)),J=v=>[neg(conj(v[1])),conj(v[0])],rho=v=>v.map(conj);
const projectEqual=(a,b)=>eq(mult(a[0],b[1]),mult(a[1],b[0])),zero=z=>z[0]===0&&z[1]===0;
const Z=[-1,0,1].flatMap(a=>[-1,0,1].map(b=>[a,b])),V=Z.flatMap(a=>Z.filter(b=>!zero(a)||!zero(b)).map(b=>[a,b])),scales=[[1,0],[0,1],[1,1],[-1,1]];
let compositions=0,homogeneity=0,antilinearity=0,noFixed=0,ordinaryComposition=0;
for(const v of V){
 const j=J(v),jj=J(j);
 assert(eq(jj,v.map(neg)),'vector square-minus-identity');
 assert(projectEqual(jj,v),'projective square identity');
 assert(!projectEqual(j,v),'no sample projective fixed point');
 assert(projectEqual(rho(rho(v)),v),'ordinary square identity');
 compositions++;noFixed++;ordinaryComposition++;
 for(const lambda of scales){const a=J(scalar(lambda,v)),b=scalar(conj(lambda),j);
  assert(eq(a,b),'source map antilinearity');
  assert(projectEqual(a,j),'projective map scalar descent');
  homogeneity++;antilinearity++;
 }
}
const infinity=projectEqual(J([[1,0],[0,0]]),[[0,0],[1,0]])&&!projectEqual(J([[1,0],[0,0]]),[[1,0],[0,0]]);
assert(infinity,'point-at-infinity homogeneous map distinct from affine chart');
const bad=[
 ['missing first negative',v=>[conj(v[1]),conj(v[0])]],
 ['missing conjugation',v=>[neg(v[1]),v[0]]],
 ['swapped coordinates',v=>[neg(conj(v[0])),conj(v[1])]],
 ['wrong second negative',v=>[neg(conj(v[1])),neg(conj(v[0]))]],
 ['identity disguised',v=>v]
];
const good=func=>V.every(v=>eq(func(func(v)),v.map(neg))&&!projectEqual(func(v),v)&&scales.every(l=>eq(func(scalar(l,v)),scalar(conj(l),func(v)))));
const mutations=bad.map(([label,fn])=>({label,rejected:!good(fn)}));
const control={vectors:V.length,compositions,homogeneity,antilinearity,projective_no_fixed:noFixed,ordinary_map_compositions:ordinaryComposition,infinity_case:infinity};
assert(eq(control,record.positive),'positive exact replay mismatched');
assert(eq(mutations,record.mutations)&&mutations.every(x=>x.rejected),'adversarial mutations escaped or record mismatch');
assert(record.adversarial_total===5&&record.adversarial_rejected===5,'adversarial count');
console.log(JSON.stringify({schema:'isograph.exp062-w097-finite-coordinate-verifier.v0.1',pass:!errors.length,errors,source:'W05 arXiv:2202.02657v2',sampled_nonzero_C2_vectors:V.length,anti_linear_scalar_cases:antilinearity,positive:control,mutations,scope:'FINITE_SOURCE_COORDINATE_TEST_ONLY_NOT_UNIVERSAL_CP1_PROOF_OR_G0_FREEZE'},null,2));
if(errors.length)process.exitCode=1;
