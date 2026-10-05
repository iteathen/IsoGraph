import fs from 'node:fs';

const files=[
  "research/woit-lisi-isomorph/woit/WOIT_BT01_SPIN4_UNIT_QUATERNION_ACTION_0_1.isg",
  "research/woit-lisi-isomorph/woit/WOIT_BT01_EUCLIDEAN_QUATERNION_PARAMETER_TRANSPORT_0_1.isg",
  "research/woit-lisi-isomorph/woit/WOIT_BT01_SOURCE_INSTANCE_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_UNIT_NORM_GROUP_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_QUATERNION_NORM_FROM_CONJUGATION_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_QUATERNION_PRESENTATION_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_ALGEBRA_CLIFFORD_TRIALITY_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_DIMENSION_2_4_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_ALGEBRA_ANTIINVOLUTION_SIDE_SWAP_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_FIELD_VECTOR_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_LINEAR_FORM_CHIRAL_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_GROUP_LIE_REP_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_FIELD_EMBEDDING_SCALAR_RESTRICTION_SCHEMA_0_2.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_LINEAR_INJECTION_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_PARAMETER_LINEAR_PROJECTIVE_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_PARAMETERIZED_PROJECTIVE_ACTION_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_TYPED_CHIRAL_ACTION_PROJECTIVE_SCHEMA_0_1.isg"
];
const primitive=new Set(Array.from({length:25},(_,i)=>150000+i));
const genericRaw=new Set([7400]);
const texts=new Map(files.map(p=>[p,fs.readFileSync(p,'utf8')]));
const declaredByFile=new Map();
const owner=new Map();

for(const [p,c] of texts){
  const declared=[...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1]));
  declaredByFile.set(p,new Set(declared));
  for(const id of declared){
    if(owner.has(id)&&owner.get(id)!==p) throw new Error('duplicate declared ID '+id);
    owner.set(id,p);
  }
}

const edges=[];
const unresolved=[];
for(const [p,c] of texts){
  const local=declaredByFile.get(p);
  const numeric=[...new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])))];
  for(const id of numeric){
    if(local.has(id)||primitive.has(id)||genericRaw.has(id)) continue;
    if(owner.has(id)){
      edges.push([p,owner.get(id),id]);
      continue;
    }
    if(id>=180000&&id<300000) unresolved.push({file:p,id});
  }
}
if(unresolved.length) throw new Error('unresolved referenced local IDs: '+JSON.stringify(unresolved));

const root=files[0];
const seen=new Set(),stack=[root];
while(stack.length){
  const p=stack.pop();
  if(seen.has(p)) continue;
  seen.add(p);
  for(const [a,b] of edges) if(a===p&&!seen.has(b)) stack.push(b);
}
const unreachable=files.filter(p=>!seen.has(p));
if(unreachable.length) throw new Error('included but unreachable support files: '+unreachable.join(', '));

console.log(JSON.stringify({
  census_id:'W-SSC-027',
  result:'DEPENDENCY_CLOSED_TO_CORE_PRIMITIVE_LOGIC',
  root,
  file_count:files.length,
  declared_local_ids:owner.size,
  unresolved_local_refs:0,
  unreachable_files:0
},null,2));
