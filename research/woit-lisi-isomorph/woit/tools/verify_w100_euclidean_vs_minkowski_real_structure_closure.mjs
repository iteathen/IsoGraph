import fs from 'node:fs';

const root='research/woit-lisi-isomorph/woit/W05_MINKOWSKI_DUAL_TWISTOR_REAL_STRUCTURE_SOURCE_INSTANCE_0_1.isg';
const packet=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W100_EUCLIDEAN_VS_MINKOWSKI_REAL_STRUCTURE_CLOSURE_PACKET_0_1.json','utf8'));
const w098=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W098_H2_PROJECTIVE_REAL_STRUCTURE_CLOSURE_PACKET_0_2.json','utf8'));
const w047=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W047_GRASSMANNIAN_BUNDLE_KLEIN_CLOSURE_PACKET_0_2.json','utf8'));
const c=fs.readFileSync(root,'utf8');

for(const [name,p] of [['W098',w098],['W047',w047]]){
  if(!String(p.status).includes('REVALIDATED') && !String(p.status).includes('CLOSED')){
    throw new Error(name+' support packet is not current/closed: '+p.status);
  }
}

const declared=new Set([...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1])));
const refs=[...new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])).filter(x=>x>=180000&&x<999999&&!declared.has(x)))].sort((a,b)=>a-b);
const expected=[...packet.compositional_interface.root_external_refs].sort((a,b)=>a-b);
if(JSON.stringify(refs)!==JSON.stringify(expected)){
  throw new Error('W100 dependency drift: '+JSON.stringify({refs,expected}));
}

const requiredDecl=[994100,994101,994102,994103,994104,994105,994106,994107,994108,994110,994120,994121,994130,994140,994141,994142,994143,994150,994199];
for(const id of requiredDecl) if(!declared.has(id)) throw new Error('missing W100 declaration '+id);

if(w098.reconstruction?.induced_projective_real_structure!==943001){
  throw new Error('W098 Euclidean projective real-structure ID drift');
}
if(w047.reconstruction?.reference_right_spinor_plane!==990110){
  throw new Error('W047 reference right-spinor plane drift');
}

const requiredSnippets=[
  '(^150010 182001 994150 202113 994142)',
  '(^150010 994199 943099)'
];
for(const s of requiredSnippets) if(!c.includes(s)) throw new Error('missing W100 pinned clause '+s);

console.log(JSON.stringify({
  census_id:'W-SSC-100',
  result:'COMPOSITIONAL_DEPENDENCY_CLOSED',
  source_instance:'W05_MINKOWSKI_DUAL_TWISTOR_REAL_STRUCTURE_SOURCE_INSTANCE_0_1.isg',
  external_refs:refs.length,
  unresolved_local_refs:0,
  supports:[
    'W098_H2_PROJECTIVE_REAL_STRUCTURE_CLOSURE_PACKET_0_2.json',
    'W047_GRASSMANNIAN_BUNDLE_KLEIN_CLOSURE_PACKET_0_2.json'
  ]
},null,2));
