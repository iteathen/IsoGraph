import fs from 'node:fs';

const basePacket=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W027_SPIN4_ACTION_CLOSURE_PACKET_0_2.json','utf8'));
const packet=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W144_HODGE_SIGNATURE_CHIRAL_SPLIT_CLOSURE_PACKET_0_2.json','utf8'));

const files=[basePacket.root_native,...basePacket.dependency_files,...packet.additional_dependency_files,...packet.root_native_files];
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
const required=[...packet.additional_dependency_files,basePacket.root_native];
const missing=required.filter(p=>!reached.has(p));
if(missing.length) throw new Error('unreachable from both roots: '+missing.join(', '));

console.log(JSON.stringify({
  census_id:'W-SSC-144',
  result:'DEPENDENCY_CLOSED_TO_CORE_PRIMITIVE_LOGIC',
  total_files:unique.length,
  declared_local_ids:owner.size,
  unresolved_local_refs:0,
  roots:packet.root_native_files.length,
  required_support_unreachable:0
},null,2));
