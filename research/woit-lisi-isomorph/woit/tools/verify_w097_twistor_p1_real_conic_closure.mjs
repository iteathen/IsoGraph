import fs from 'node:fs';

const root='research/woit-lisi-isomorph/woit/W05_REAL_PROJECTIVE_CONIC_SOURCE_INSTANCE_0_2.isg';
const support=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W024_QUATERNIONIC_P1_CLOSURE_PACKET_0_2.json','utf8'));
const dim3=fs.readFileSync('research/woit-lisi-isomorph/support/PRIMITIVE_DIMENSION_3_SCHEMA_0_1.isg','utf8');
const c=fs.readFileSync(root,'utf8');

if(!String(support.status).includes('REVALIDATED') && !String(support.status).includes('CLOSED')) {
  throw new Error('W024 support packet is not current/closed: '+support.status);
}

const declared=new Set([...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1])));
if(!declared.has(946036)) throw new Error('projective equivalence relation 946036 is not declared');

const refs=[...new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])).filter(x=>x>=180000&&x<999999&&!declared.has(x)))].sort((a,b)=>a-b);

const expected=[
  182001,186001,186003,186004,188100,
  189000,189001,189002,189003,189004,189005,189006,
  197000,197001,197002,197003,197004,197005,197006,
  197010,197012,197032,197033,197034,197099,
  207000
].sort((a,b)=>a-b);

if(JSON.stringify(refs)!==JSON.stringify(expected)) {
  throw new Error('external dependency drift: '+JSON.stringify({refs,expected}));
}

const dim3Declared=new Set([...dim3.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1])));
if(!dim3Declared.has(207000)) throw new Error('dimension-3 support no longer declares 207000');

const requiredSnippets=[
  '(^150010 188100 946040 197032 946030)',
  '(^150010 197033 197005 946050)',
  '(^150010 946061 946050 946050)',
  '(^150010 946040 946050 946051)',
  '(^150010 946030 946051)',
  '(^150003 (^150010 197034 946050 946050))'
];
for(const s of requiredSnippets) if(!c.includes(s)) throw new Error('missing pinned source clause: '+s);

console.log(JSON.stringify({
  census_id:'W-SSC-097',
  result:'COMPOSITIONAL_DEPENDENCY_CLOSED',
  source_instance:'W05_REAL_PROJECTIVE_CONIC_SOURCE_INSTANCE_0_2.isg',
  external_refs:refs.length,
  unresolved_local_refs:0,
  support_packet:'W024_QUATERNIONIC_P1_CLOSURE_PACKET_0_2.json',
  added_support:'PRIMITIVE_DIMENSION_3_SCHEMA_0_1.isg'
},null,2));
