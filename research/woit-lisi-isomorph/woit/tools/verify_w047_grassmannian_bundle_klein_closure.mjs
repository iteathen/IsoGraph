import fs from 'node:fs';

const base=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W023_TWISTOR_P1_CLOSURE_PACKET_0_2.json','utf8'));
const packet=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W047_GRASSMANNIAN_BUNDLE_KLEIN_CLOSURE_PACKET_0_1.json','utf8'));
const boundary=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W047_ABSTRACTION_BOUNDARY_0_1.json','utf8'));

if(boundary.status!=='FROZEN_FOR_W_SSC_047') throw new Error('W047 abstraction boundary is not frozen');
if(!String(base.status).includes('REVALIDATED') && !String(base.status).includes('CLOSED')) {
  throw new Error('W023 support packet is not current/closed: '+base.status);
}

const extra=[
  ...packet.added_support,
  'research/woit-lisi-isomorph/woit/WOIT_GRASSMANN_BUNDLE_FIBERS_SOURCE_INSTANCE_0_1.isg',
  'research/woit-lisi-isomorph/woit/WOIT_GRASSMANN_PLUCKER_KLEIN_SOURCE_INSTANCE_0_1.isg'
];
const baseFiles=[base.root_native,...base.dependency_files];
const files=[...new Set([...baseFiles,...extra])];

const primitive=new Set(Array.from({length:25},(_,i)=>150000+i));
const raw=new Set([7400]);
const texts=new Map(files.map(p=>[p,fs.readFileSync(p,'utf8')]));
const owner=new Map(),declaredBy=new Map();

for(const [p,c] of texts){
  const ds=[...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1]));
  declaredBy.set(p,new Set(ds));
  for(const id of ds){
    if(owner.has(id)&&owner.get(id)!==p) throw new Error('duplicate declared ID '+id+' in '+p+' and '+owner.get(id));
    owner.set(id,p);
  }
}

const edges=[],unresolved=[];
for(const p of extra){
  const c=texts.get(p),local=declaredBy.get(p);
  for(const id of new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])))){
    if(local.has(id)||primitive.has(id)||raw.has(id)) continue;
    if(owner.has(id)){edges.push([p,owner.get(id),id]);continue;}
    if(id>=180000&&id<999999) unresolved.push({file:p,id});
  }
}
if(unresolved.length) throw new Error('unresolved W047 local refs '+JSON.stringify(unresolved));

// Add dependency edges from base files only for reachability through the already validated packet.
for(const p of baseFiles){
  const c=texts.get(p),local=declaredBy.get(p);
  for(const id of new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])))){
    if(local.has(id)||primitive.has(id)||raw.has(id)) continue;
    if(owner.has(id)) edges.push([p,owner.get(id),id]);
  }
}

const reached=new Set();
for(const root of packet.root_native_files){
  const seen=new Set(),stack=[root];
  while(stack.length){
    const p=stack.pop();
    if(seen.has(p)) continue;
    seen.add(p); reached.add(p);
    for(const [a,b] of edges) if(a===p&&!seen.has(b)) stack.push(b);
  }
}

const required=[
  ...packet.added_support,
  base.root_native,
  ...packet.root_native_files
];
const missing=required.filter(p=>!reached.has(p));
if(missing.length) throw new Error('required W047 support unreachable '+missing.join(', '));

const plucker=texts.get('research/woit-lisi-isomorph/woit/WOIT_GRASSMANN_PLUCKER_KLEIN_SOURCE_INSTANCE_0_1.isg');
const pinned=[
  '(^150010 188100 948040 947100 948032)',
  '(^150010 948099 947199)'
];
for(const s of pinned) if(!plucker.includes(s)) throw new Error('missing W047 Plucker pin '+s);

console.log(JSON.stringify({
  census_id:'W-SSC-047',
  result:'DEPENDENCY_CLOSED_TO_CORE_PRIMITIVE_LOGIC_AT_FROZEN_AXIOMATIC_BOUNDARY',
  total_files:files.length,
  added_files:extra.length,
  declared_local_ids:owner.size,
  unresolved_local_refs:0,
  required_support_unreachable:0,
  abstraction_boundary:'W047_ABSTRACTION_BOUNDARY_0_1.json'
},null,2));
