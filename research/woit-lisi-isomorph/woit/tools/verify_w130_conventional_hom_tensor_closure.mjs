import fs from 'node:fs';

const base=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W027_SPIN4_ACTION_CLOSURE_PACKET_0_2.json','utf8'));
const packet=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W130_CONVENTIONAL_HOM_TENSOR_CLOSURE_PACKET_0_1.json','utf8'));

const files=[
  base.root_native,
  ...base.dependency_files,
  'research/woit-lisi-isomorph/woit/W02_MINKOWSKI_HERMITIAN_VECTOR_SOURCE_INSTANCE_0_4.isg',
  'research/woit-lisi-isomorph/support/PRIMITIVE_MATRIX2_ALGEBRA_PRESENTATION_0_1.isg',
  'research/woit-lisi-isomorph/support/PRIMITIVE_MATRIX2_DET_ADJOINT_SCHEMA_0_1.isg',
  'research/woit-lisi-isomorph/support/PRIMITIVE_SL_SU_MATRIX2_GROUP_SCHEMA_0_1.isg',
  'research/woit-lisi-isomorph/woit/W02_CONVENTIONAL_REAL_FORMS_SOURCE_INSTANCE_0_2.isg',
  'research/woit-lisi-isomorph/woit/WOIT_PRIMITIVE_DUAL_PAIRING_SCHEMA_0_1.isg',
  packet.root_native
];
const unique=[...new Set(files)];
const primitive=new Set(Array.from({length:25},(_,i)=>150000+i));
const raw=new Set([7400]);
const texts=new Map(unique.map(p=>[p,fs.readFileSync(p,'utf8')]));
const owner=new Map(),declaredBy=new Map();

for(const [p,c] of texts){
  const ds=[...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1]));
  declaredBy.set(p,new Set(ds));
  for(const id of ds){
    if(owner.has(id)&&owner.get(id)!==p) throw new Error('duplicate declared ID '+id);
    owner.set(id,p);
  }
}
const edges=[],unresolved=[];
for(const [p,c] of texts){
  const local=declaredBy.get(p);
  for(const id of new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])))){
    if(local.has(id)||primitive.has(id)||raw.has(id)) continue;
    if(owner.has(id)){edges.push([p,owner.get(id),id]);continue;}
    if(id>=180000&&id<999999) unresolved.push({file:p,id});
  }
}
if(unresolved.length) throw new Error('unresolved '+JSON.stringify(unresolved));

const seen=new Set(),stack=[packet.root_native];
while(stack.length){
  const p=stack.pop();
  if(seen.has(p)) continue;
  seen.add(p);
  for(const [a,b] of edges) if(a===p&&!seen.has(b)) stack.push(b);
}
const required=[
  'research/woit-lisi-isomorph/woit/W02_CONVENTIONAL_REAL_FORMS_SOURCE_INSTANCE_0_2.isg',
  'research/woit-lisi-isomorph/woit/WOIT_PRIMITIVE_DUAL_PAIRING_SCHEMA_0_1.isg'
];
const missing=required.filter(p=>!seen.has(p));
if(missing.length) throw new Error('required support unreachable '+missing.join(', '));

console.log(JSON.stringify({
  census_id:'W-SSC-130',
  result:'DEPENDENCY_CLOSED_TO_CORE_PRIMITIVE_LOGIC',
  total_files:unique.length,
  declared_local_ids:owner.size,
  unresolved_local_refs:0,
  required_support_unreachable:0
},null,2));
