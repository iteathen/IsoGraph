import fs from "node:fs";

const files=[
  "research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_TRIALITY_MATRIX_SOURCE_INSTANCE_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_DIMENSION_28_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_SIGNED_HALF_BLOCK4_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_FIELD_VECTOR_SCHEMA_0_1.isg"
];

const primitive=new Set(Array.from({length:25},(_,i)=>150000+i));
const raw=new Set([7400]);
const prior=new Set([
  189100,189101,189102,189103,189104,189105,189106,
  214303,214304,214310,214311,214312,214313,214314,214315,214316,214317,
  214403,214404,214410,214411,214412,214413,214414,214415,214416,214417,
  216110,
  237400,237401,237402,237403,237404,237405,237406,
  237500,237501,237502,237503,237504,237505,237506
]);

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
    if(local.has(id)||primitive.has(id)||raw.has(id)||prior.has(id))continue;
    if(owner.has(id)){edges.push([p,owner.get(id),id]);continue;}
    if(id>=180000&&id<300000)unresolved.push({file:p,id});
  }
}

const seen=new Set(),stack=[files[0]];
while(stack.length){
  const p=stack.pop();
  if(seen.has(p))continue;
  seen.add(p);
  for(const [a,b] of edges)if(a===p&&!seen.has(b))stack.push(b);
}
const unreachable=files.filter(p=>!seen.has(p));

const root=text.get(files[0]);
const calls={
  dimension28:(root.match(/\(\^150010\s+225001\b/g)||[]).length,
  signedHalfBlocks:(root.match(/\(\^150010\s+239001\b/g)||[]).length,
  splitSignatureBlocks:(root.match(/\(\^150010\s+239002\b/g)||[]).length
};
const sourceRelations=[240000,240001,240052,240053,240054,240055].every(id=>root.includes(" "+id));
const evidence=JSON.parse(fs.readFileSync(
  "research/woit-lisi-isomorph/lisi/L136_TRIALITY_MATRIX_FALSIFIER_0_1.json","utf8"
));
const ordinary=evidence.results.find(x=>x.name==="O");
const split=evidence.results.find(x=>x.name==="Oprime");
const evidencePass=evidence.pass===true &&
  evidence.source_repair_used===false &&
  ordinary?.coefficient_mismatches===0 &&
  ordinary?.orthogonality_failures===36 &&
  ordinary?.order3_failures===100 &&
  split?.coefficient_mismatches===0 &&
  split?.orthogonality_failures===0 &&
  split?.order3_failures===0 &&
  split?.split_signature_pattern_failures===0;

const result={
  census_id:"L-SSC-136",
  result:duplicates.length===0&&unresolved.length===0&&unreachable.length===0&&
    owner.size===136&&calls.dimension28===2&&calls.signedHalfBlocks===14&&
    calls.splitSignatureBlocks===7&&sourceRelations&&evidencePass
      ?"DEPENDENCY_CLOSED_TO_CORE_AND_PRIOR_CLOSED_BODIES":"FAIL",
  file_count:files.length,
  declared_local_ids:owner.size,
  duplicate_declarations:duplicates,
  unresolved_local_refs:unresolved,
  unreachable_files:unreachable,
  prior_closed_reference_count:prior.size,
  schema_calls:calls,
  source_relations_present:sourceRelations,
  preserved_evidence_pass:evidencePass,
  source_repair_used:false
};
console.log(JSON.stringify(result,null,2));
if(result.result==="FAIL")process.exitCode=1;
