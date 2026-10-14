import fs from 'node:fs';

const boundary=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W_TWISTOR_FOUR_REAL_FORMS_BOUNDARY_0_1.json','utf8'));
if(boundary.status!=='FROZEN_FOR_W051_W092') throw new Error('four-real-form boundary not frozen');

const supports=[
  'W014_SU22_PROJECTIVE_ORBITS_CLOSURE_PACKET_0_1.json',
  'W053_EUCLIDEAN_SL2H_TWISTOR_CLOSURE_PACKET_0_1.json',
  'W100_EUCLIDEAN_VS_MINKOWSKI_REAL_STRUCTURE_CLOSURE_PACKET_0_1.json'
];
for(const p of supports){
  const s=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/'+p,'utf8'));
  if(!String(s.status).includes('CLOSED') && !String(s.status).includes('CANDIDATE_CLOSED')){
    throw new Error('support not current closure candidate/authority '+p+' '+s.status);
  }
}

const root='research/woit-lisi-isomorph/woit/W_TWISTOR_COMPACT_SPLIT_REAL_FORMS_SOURCE_INSTANCE_0_1.isg';
const c=fs.readFileSync(root,'utf8');
const declared=new Set([...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1])));
const refs=[...new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])).filter(x=>x>=180000&&x<999999&&!declared.has(x)))].sort((a,b)=>a-b);
const expected=[182002,182004,183004,184001,184002,184006,187601,189000,189001,189002,189003,189004,189005,189006,189300,189301,189302,189303,189304,189305,189306,189307,197012,202100,202101,202102,202103,202104,202107,202108,202109,202110,202113,202114,944000,998199];
if(JSON.stringify(refs)!==JSON.stringify(expected)) throw new Error('real-form dependency drift '+JSON.stringify({refs,expected}));

const required=[
  '(^150010 999100 202107 202107)',
  '(^150010 999120 202107 202107 189006)',
  '(^150010 184001 999130 999131 999132 999133)',
  '(^150010 184001 999160 999161 999162 999163)'
];
for(const s of required) if(!c.includes(s)) throw new Error('missing real-form source pin '+s);

console.log(JSON.stringify({
  census_ids:['W-SSC-051','W-SSC-092'],
  result:'DEPENDENCY_CLOSED_AT_FROZEN_FOUR_REAL_FORM_BOUNDARY',
  root,
  external_refs:refs.length,
  unresolved_local_refs:0
},null,2));
