import fs from 'node:fs';

const root='research/woit-lisi-isomorph/woit/W01_MINKOWSKI_ANTIHERMITIAN_AFFINE_SOURCE_INSTANCE_0_1.isg';
const packet=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W052_MINKOWSKI_SU22_TWISTOR_REAL_FORM_CLOSURE_PACKET_0_1.json','utf8'));
const w014=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W014_SU22_PROJECTIVE_ORBITS_CLOSURE_PACKET_0_1.json','utf8'));
const w100=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W100_EUCLIDEAN_VS_MINKOWSKI_REAL_STRUCTURE_CLOSURE_PACKET_0_1.json','utf8'));
const w128=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W128_MINKOWSKI_HERMITIAN_LORENTZ_CLOSURE_PACKET_0_3.json','utf8'));

for(const [name,p] of [['W014',w014],['W100',w100],['W128',w128]]){
  if(!String(p.status).includes('CLOSED') && !String(p.status).includes('CANDIDATE_CLOSED')) {
    throw new Error(name+' support is not current closure authority: '+p.status);
  }
}

const c=fs.readFileSync(root,'utf8');
const declared=new Set([...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1])));
const refs=[...new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])).filter(x=>x>=180000&&x<999999&&!declared.has(x)))].sort((a,b)=>a-b);
const expected=[188100,204101,204110,204112,204113,204123,204124,204130,204151,995199].sort((a,b)=>a-b);

if(JSON.stringify(refs)!==JSON.stringify(expected)) {
  throw new Error('W052 root dependency drift '+JSON.stringify({refs,expected}));
}

const required=[
  '(^150010 188100 996110 204124 996100)',
  '(^150010 996199 995199)'
];
for(const s of required) if(!c.includes(s)) throw new Error('missing W052 source pin '+s);

console.log(JSON.stringify({
  census_id:'W-SSC-052',
  result:'COMPOSITIONAL_DEPENDENCY_CLOSED',
  root,
  external_refs:refs.length,
  unresolved_local_refs:0,
  support_packets:packet.support_packets
},null,2));
