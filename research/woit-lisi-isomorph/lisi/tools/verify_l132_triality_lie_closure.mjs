import fs from "node:fs";

const files=[
  "research/woit-lisi-isomorph/lisi/LISI_L05_TRIALITY_LIE_ALGEBRA_SOURCE_INSTANCE_0_1.isg",
  "research/woit-lisi-isomorph/lisi/LISI_L05_TRIALITY_ROTATION_AUTOMORPHISM_DISTINCTION_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_LOW_DIMENSIONAL_LIE_DIRECT_SUM_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_SU2_LIE_ALGEBRA_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_DIMENSION_3_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_FULL_METRIC_SKEW_ENDOMORPHISM_LIE_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_COMPOSITION_UNIT_AUTOMORPHISM_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_ALGEBRA_CLIFFORD_TRIALITY_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_TYPED_CHIRAL_ACTION_PROJECTIVE_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_LINEAR_FORM_CHIRAL_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_GROUP_LIE_REP_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_FIELD_VECTOR_SCHEMA_0_1.isg"
];
const primitive=new Set(Array.from({length:25},(_,i)=>150000+i));
const raw=new Set([7400]);
const priorL125=new Set([
  216110,
  189100,189101,189102,189103,189104,189105,189106,
  214000,214001,214002,214003,214004,214005,214007,214008,214010,
  214100,214101,214102,214103,214104,214105,214107,214108,214110,
  189200,189201,189202,189203,189204,189205,189206,189207,189208,
  214200,214201,214202,214203,214204,214205,214207,214208,214210,
  214300,214301,214302,214303,214304,214305,214307,214308,214310,
  214400,214401,214402,214403,214404,214405,214407,214408,214410
]);
const priorL131=new Set([235012,235013]);

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
const edges=[],unresolved=[];
for(const [p,c] of text){
  const local=declared.get(p);
  const ids=new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])));
  for(const id of ids){
    if(local.has(id)||primitive.has(id)||raw.has(id)||priorL125.has(id)||priorL131.has(id))continue;
    if(owner.has(id)){edges.push([p,owner.get(id),id]);continue;}
    if(id>=180000&&id<300000)unresolved.push({file:p,id});
  }
}
const roots=files.slice(0,2),seen=new Set(),stack=[...roots];
while(stack.length){
  const p=stack.pop();
  if(seen.has(p))continue;
  seen.add(p);
  for(const [a,b] of edges)if(a===p&&!seen.has(b))stack.push(b);
}
const unreachable=files.filter(p=>!seen.has(p));
const result={
  census_id:"L-SSC-132",
  result:duplicates.length===0&&unresolved.length===0&&unreachable.length===0
    ?"DEPENDENCY_CLOSED_TO_CORE_PRIMITIVE_LOGIC_AND_PRIOR_CLOSED_BODIES":"FAIL",
  file_count:files.length,
  declared_local_ids:owner.size,
  duplicate_declarations:duplicates,
  unresolved_local_refs:unresolved,
  unreachable_files:unreachable,
  prior_closed_bodies:["L125-BODY","L131-BODY"]
};
console.log(JSON.stringify(result,null,2));
if(result.result==="FAIL")process.exitCode=1;
