import fs from 'node:fs';

const root='research/woit-lisi-isomorph/woit/W04B_SU22_PROJECTIVE_ORBIT_SOURCE_INSTANCE_0_1.isg';
const packet=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W014_SU22_PROJECTIVE_ORBITS_CLOSURE_PACKET_0_1.json','utf8'));
const boundary=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W_SU22_PROJECTIVE_ORBIT_ABSTRACTION_BOUNDARY_0_1.json','utf8'));

if(boundary.status!=='FROZEN_FOR_W007_W014_W069_W093') throw new Error('SU22 abstraction boundary not frozen');

const c=fs.readFileSync(root,'utf8');
const declared=new Set([...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1])));
const refs=[...new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])).filter(x=>x>=180000&&x<999999&&!declared.has(x)))].sort((a,b)=>a-b);
const expected=[...packet.compositional_interface.external_local_refs].sort((a,b)=>a-b);
if(JSON.stringify(refs)!==JSON.stringify(expected)) throw new Error('dependency drift '+JSON.stringify({refs,expected}));

const pins=[
  '(^150010 995110 202107 202107 189006)',
  '(^150010 995110 202108 202108 189006)',
  '(^150010 995110 202109 202109 197020)',
  '(^150010 995110 202110 202110 197020)',
  '(^150010 184001 995100 995101 995102 995103)',
  '(^150010 182002 995120 995100 202113 202113)',
  '(^150010 995150 995130)',
  '(^150010 995151 995131)',
  '(^150010 995152 995132)'
];
for(const s of pins) if(!c.includes(s)) throw new Error('missing source pin '+s);

console.log(JSON.stringify({
  census_id:'W-SSC-014',
  result:'DEPENDENCY_AND_SOURCE_PINS_PASS',
  external_refs:refs.length,
  abstraction_boundary:'W_SU22_PROJECTIVE_ORBIT_ABSTRACTION_BOUNDARY_0_1.json'
},null,2));
