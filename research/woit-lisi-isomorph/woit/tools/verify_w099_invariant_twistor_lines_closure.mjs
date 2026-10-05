import fs from 'node:fs';

const root='research/woit-lisi-isomorph/woit/W05_RHOTW_FIBER_INVARIANCE_SOURCE_INSTANCE_0_1.isg';
const packet=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W099_INVARIANT_TWISTOR_LINES_CLOSURE_PACKET_0_1.json','utf8'));
const supports=[
  JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W098_H2_PROJECTIVE_REAL_STRUCTURE_CLOSURE_PACKET_0_2.json','utf8')),
  JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W023_TWISTOR_P1_CLOSURE_PACKET_0_2.json','utf8')),
  JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W033_EUCLIDEAN_TWISTOR_ORTHOGONAL_COMPLEX_FIBER_CLOSURE_PACKET_0_1.json','utf8'))
];
for(const s of supports){
  if(!String(s.status).includes('CLOSED') && !String(s.status).includes('CANDIDATE_CLOSED')){
    throw new Error('support not current closure candidate/authority: '+s.census_id+' '+s.status);
  }
}
const boundary=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W_EUCLIDEAN_TWISTOR_ORTHOGONAL_COMPLEX_BOUNDARY_0_1.json','utf8'));
if(boundary.status!=='FROZEN_FOR_W033_W099') throw new Error('W033/W099 abstraction boundary not frozen');

const c=fs.readFileSync(root,'utf8');
const declared=new Set([...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1])));
const refs=[...new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])).filter(x=>x>=180000&&x<999999&&!declared.has(x)))].sort((a,b)=>a-b);
const expected=[202113,202120,202126,943001,943099];
if(JSON.stringify(refs)!==JSON.stringify(expected)) throw new Error('W099 dependency drift '+JSON.stringify({refs,expected}));

console.log(JSON.stringify({
  census_id:'W-SSC-099',
  result:'COMPOSITIONAL_DEPENDENCY_CLOSED_AT_FROZEN_BOUNDARY',
  root,
  external_refs:refs.length,
  unresolved_local_refs:0,
  abstraction_boundary:'W_EUCLIDEAN_TWISTOR_ORTHOGONAL_COMPLEX_BOUNDARY_0_1.json'
},null,2));
