import fs from 'node:fs';

const src='research/woit-lisi-isomorph/woit/W02_STANDARD_VS_RIGHT_HANDED_TANGENT_ROLE_SOURCE_INSTANCE_0_2.isg';
const w047=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W047_GRASSMANNIAN_BUNDLE_KLEIN_CLOSURE_PACKET_0_2.json','utf8'));
const w131=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W131_RIGHT_HANDED_SPACETIME_CLOSURE_PACKET_0_3.json','utf8'));
const c=fs.readFileSync(src,'utf8');

const declared=new Set([...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1])));
const refs=[...new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])).filter(x=>x>=180000&&x<999999&&!declared.has(x)))].sort((a,b)=>a-b);
const expected=[204110,205199,990200].sort((a,b)=>a-b);
if(JSON.stringify(refs)!==JSON.stringify(expected)) throw new Error('W133 source-role dependency drift '+JSON.stringify({refs,expected}));

if(w047.census_id!=='W-SSC-047') throw new Error('W047 support packet mismatch');
if(w131.census_id!=='W-SSC-131') throw new Error('W131 support packet mismatch');

const pins=[
  '(^150010 992000 990200 992010)',
  '(^150010 992000 204110 992011)',
  '(^150010 992001 992010 992011)'
];
for(const p of pins) if(!c.includes(p)) throw new Error('missing W133 source contrast pin '+p);

console.log(JSON.stringify({
  census_id:'W-SSC-133',
  result:'COMPOSITIONAL_DEPENDENCY_CLOSED',
  source_role_instance:src,
  unresolved_local_refs:0,
  support_packets:[
    'W047_GRASSMANNIAN_BUNDLE_KLEIN_CLOSURE_PACKET_0_2.json',
    'W131_RIGHT_HANDED_SPACETIME_CLOSURE_PACKET_0_3.json'
  ]
},null,2));
