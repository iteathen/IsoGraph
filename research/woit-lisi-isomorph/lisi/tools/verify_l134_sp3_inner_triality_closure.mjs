import fs from "node:fs";

const files=[
  "research/woit-lisi-isomorph/lisi/LISI_L05_SP3_INNER_TRIALITY_SOURCE_INSTANCE_0_4.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_MATRIX3_CYCLIC_PERMUTATION_CONJUGATION_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_LINEAR_INJECTION_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_LINEAR_FORM_CHIRAL_SCHEMA_0_1.isg",
  "research/woit-lisi-isomorph/support/PRIMITIVE_FIELD_VECTOR_SCHEMA_0_1.isg"
];

const primitive=new Set(Array.from({length:25},(_,i)=>150000+i));
const raw=new Set([7400]);
const prior=new Set([
  216110,
  ...Array.from({length:7},(_,i)=>189100+i),
  ...Array.from({length:13},(_,i)=>189200+i),
  218200,218220,218240,218260,218261,218262,
  ...Array.from({length:9},(_,i)=>237210+i),
  ...Array.from({length:9},(_,i)=>237220+i),
  ...Array.from({length:9},(_,i)=>237230+i)
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

const A=[
  ["M","-kv","psi"],
  ["v","P","-kchi"],
  ["-kpsi","chi","V"]
];
const g=[[0,0,1],[1,0,0],[0,1,0]];
const gi=[[0,1,0],[0,0,1],[1,0,0]];
function mm(X,Y){
  return X.map((row,i)=>Y[0].map((_,j)=>{
    const terms=[];
    for(let k=0;k<Y.length;k++)if(X[i][k]!==0&&Y[k][j]!==0){
      const a=X[i][k],b=Y[k][j];
      terms.push(a===1?b:(b===1?a:a+"*"+b));
    }
    return terms.length===0?0:(terms.length===1?terms[0]:terms.join("+"));
  }));
}
const gp=mm(mm(g,A),gi);
const inverseCycle=[
  ["V","-kpsi","chi"],
  ["psi","M","-kv"],
  ["-kchi","v","P"]
];
const matrixOrientationPass=JSON.stringify(gp)===JSON.stringify(inverseCycle);

const root=text.get(files[0]);
const requiredBasisMaps=[
  "(^150010 242010 237216 189210)",
  "(^150010 242010 237217 189211)",
  "(^150010 242010 237218 189212)",
  "(^150010 242011 237226 189210)",
  "(^150010 242011 237227 189211)",
  "(^150010 242011 237228 189212)",
  "(^150010 242012 237236 189210)",
  "(^150010 242012 237237 189211)",
  "(^150010 242012 237238 189212)"
];
const basisMapPass=requiredBasisMaps.every(x=>root.includes(x));
const typedCyclePass=[
  "(^150010 237210 ?M1)",
  "(^150010 237220 ?P1)",
  "(^150010 237230 ?V1)",
  "(^150010 218200 ?v1)",
  "(^150010 218220 ?m1)",
  "(^150010 218240 ?p1)"
].every(x=>root.includes(x));

const result={
  census_id:"L-SSC-134",
  result:duplicates.length===0&&unresolved.length===0&&unreachable.length===0&&matrixOrientationPass&&basisMapPass&&typedCyclePass
    ?"DEPENDENCY_CLOSED_TO_CORE_AND_PRIOR_CLOSED_BODIES":"FAIL",
  new_file_count:files.length,
  declared_new_local_ids:owner.size,
  duplicate_declarations:duplicates,
  unresolved_local_refs:unresolved,
  unreachable_files:unreachable,
  prior_closed_reference_count:prior.size,
  matrix_orientation:{
    pass:matrixOrientationPass,
    printed_gt_realizes:"inverse_of_textual_basis_arrow_direction"
  },
  diagonal_basis_maps_pass:basisMapPass,
  textual_cycle_is_typed:typedCyclePass
};
console.log(JSON.stringify(result,null,2));
if(result.result==="FAIL")process.exitCode=1;
