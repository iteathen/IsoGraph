import fs from "node:fs";

const files=[
  "research/woit-lisi-isomorph/lisi/LISI_L05_SPACELIKE_GENERALIZED_REFLECTION_SOURCE_INSTANCE_0_2.isg",
  "research/woit-lisi-isomorph/lisi/LISI_L05_TIMELIKE_GENERALIZED_REFLECTION_SOURCE_INSTANCE_0_1.isg",
  "research/woit-lisi-isomorph/lisi/LISI_L05_TIMELIKE_REFLECTION_ANTIINVARIANCE_0_1.isg",
  "research/woit-lisi-isomorph/lisi/LISI_L05_COMPLEX_GENERALIZED_REFLECTION_EXTENSION_0_1.isg",
  "research/woit-lisi-isomorph/lisi/LISI_L05_COMPLEXIFIED_ROLE_CARRIERS_0_2.isg",
  "research/woit-lisi-isomorph/lisi/LISI_BT01_PAULI_MATRIX_SOURCE_INSTANCE_0_2.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_FINITE_SCALAR_EXTENSION_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_TRILINEAR_SCALAR_EXTENSION_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_PARAMETERIZED_SCALAR_EXTENSION_MAP_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_FIELD_EMBEDDING_SCALAR_RESTRICTION_SCHEMA_0_2.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_LINEAR_INJECTION_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_MATRIX2_ALGEBRA_PRESENTATION_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_DIMENSION_2_4_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_DIMENSION_8_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_FIELD_VECTOR_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_LINEAR_FORM_CHIRAL_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_ALGEBRA_CLIFFORD_TRIALITY_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_GROUP_LIE_REP_SCHEMA_0_1.isg"
];
const primitive=new Set(Array.from({length:25},(_,i)=>150000+i));
const raw=new Set([7400,189230]);
const priorClosed=new Map();

for(const id of [189100,189101,189102,189103,189104,189105,189106,189200,189201,189202,189203,189204,189205,189206,189207,189208,189209,189210,189211,189212,216110])priorClosed.set(id,"L125-BODY");
for(let x=214000;x<=214429;x++)priorClosed.set(x,"L125-BODY");
for(let x=218000;x<=218599;x++)priorClosed.set(x,"L128-BODY");
for(let x=221000;x<=221099;x++)priorClosed.set(x,"L129-BODY");

const text=new Map(files.map(p=>[p,fs.readFileSync(p,"utf8")]));
const owner=new Map(),declared=new Map(),duplicates=[];
for(const [p,c] of text){
  const ds=[...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1]));
  declared.set(p,new Set(ds));
  for(const id of ds){
    if(owner.has(id)&&owner.get(id)!==p)duplicates.push({id,a:owner.get(id),b:p});
    else owner.set(id,p);
  }
}

const edges=[],external=[],unresolved=[];
for(const [p,c] of text){
  const local=declared.get(p);
  const ids=new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])));
  for(const id of ids){
    if(local.has(id)||primitive.has(id)||raw.has(id))continue;
    if(owner.has(id)){edges.push([p,owner.get(id),id]);continue;}
    if(priorClosed.has(id)){external.push([p,priorClosed.get(id),id]);continue;}
    if(id>=180000&&id<300000)unresolved.push({file:p,id});
  }
}

const roots=files.slice(0,6),seen=new Set(),stack=[...roots];
while(stack.length){
  const p=stack.pop();if(seen.has(p))continue;seen.add(p);
  for(const [a,b] of edges)if(a===p&&!seen.has(b))stack.push(b);
}
const unreachable=files.filter(p=>!seen.has(p));

const result={
  census_id:"L-SSC-130",\n  interface_revision:"LISI_BT01_PAULI_MATRIX_SOURCE_INSTANCE_0_2.isg",
  result:duplicates.length===0&&unresolved.length===0&&unreachable.length===0
    ?"DEPENDENCY_CLOSED_TO_CORE_PRIMITIVE_LOGIC":"FAIL",
  file_count:files.length,
  declared_local_ids:owner.size,
  duplicate_declarations:duplicates,
  unresolved_local_refs:unresolved,
  unreachable_files:unreachable,
  prior_closed_dependencies:[...new Set(external.map(x=>x[1]))].sort(),
  raw_provenance_atoms:[189230]
};
console.log(JSON.stringify(result,null,2));
if(result.result==="FAIL")process.exitCode=1;
