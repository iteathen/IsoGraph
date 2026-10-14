import fs from 'node:fs';

const files=[
  "research/woit-lisi-isomorph/lisi/LISI_L05_TYPED_COEFFICIENT_ROLES_SOURCE_INSTANCE_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_TRIPLE_ROLE_COEFFICIENT_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/lisi/LISI_L05_REAL_SCALAR_SOURCE_INSTANCE_0_1.isg",
  "research/woit-lisi-isomorph/lisi/LISI_L05_COMPLEX_SPLIT_COMPLEX_SOURCE_INSTANCE_0_2.isg",
  "research/woit-lisi-isomorph/lisi/LISI_L05_QUATERNION_ALGEBRA_SOURCE_INSTANCE_0_2.isg",
  "research/woit-lisi-isomorph/lisi/LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_LINEAR_BIJECTION_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_BIJECTION_ACTION_TRANSPORT_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_DIMENSION_2_4_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_DIMENSION_8_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_FIELD_VECTOR_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_LINEAR_FORM_CHIRAL_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_ALGEBRA_ANTIINVOLUTION_SIDE_SWAP_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_COMPOSITION_ANTIINVOLUTION_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_QUATERNION_PRESENTATION_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_ALGEBRA_CLIFFORD_TRIALITY_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_GROUP_LIE_REP_SCHEMA_0_1.isg"
];
const primitive=new Set(Array.from({length:25},(_,i)=>150000+i));
const raw=new Set([7400]);
const text=new Map(files.map(p=>[p,fs.readFileSync(p,'utf8')]));
const owner=new Map(),declared=new Map(),duplicates=[];
for(const [p,c] of text){
  const ds=[...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1]));
  declared.set(p,new Set(ds));
  for(const id of ds){
    if(owner.has(id)&&owner.get(id)!==p)duplicates.push({id,a:owner.get(id),b:p});
    else owner.set(id,p);
  }
}
const edges=[],unresolved=[];
for(const [p,c] of text){
  const local=declared.get(p);
  const ids=new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])));
  for(const id of ids){
    if(local.has(id)||primitive.has(id)||raw.has(id))continue;
    if(owner.has(id)){edges.push([p,owner.get(id),id]);continue;}
    if(id>=180000&&id<300000)unresolved.push({file:p,id});
  }
}
const root=files[0],seen=new Set(),stack=[root];
while(stack.length){
  const p=stack.pop();
  if(seen.has(p))continue;
  seen.add(p);
  for(const [a,b] of edges)if(a===p&&!seen.has(b))stack.push(b);
}
const result={
  census_id:'L-SSC-128',
  result:duplicates.length===0&&unresolved.length===0&&seen.size===files.length
    ? 'DEPENDENCY_CLOSED_TO_CORE_PRIMITIVE_LOGIC'
    : 'FAIL',
  file_count:files.length,
  declared_local_ids:owner.size,
  duplicate_declarations:duplicates,
  unresolved_local_refs:unresolved,
  unreachable_files:files.filter(p=>!seen.has(p))
};
console.log(JSON.stringify(result,null,2));
if(result.result==='FAIL')process.exitCode=1;
