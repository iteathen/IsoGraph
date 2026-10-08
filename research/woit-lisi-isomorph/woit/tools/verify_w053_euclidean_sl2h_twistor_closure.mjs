import fs from 'node:fs';

const packet=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W053_EUCLIDEAN_SL2H_TWISTOR_CLOSURE_PACKET_0_1.json','utf8'));
for(const p of packet.support_packets){
  const s=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/'+p,'utf8'));
  if(!String(s.status).includes('CLOSED') && !String(s.status).includes('CANDIDATE_CLOSED')){
    throw new Error('support not current closure candidate/authority: '+p+' '+s.status);
  }
}
for(const p of packet.abstraction_boundaries){
  const b=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/'+p,'utf8'));
  if(!String(b.status).startsWith('FROZEN')) throw new Error('boundary not frozen: '+p);
}

const roots=packet.source_instances;
const expected={
  'research/woit-lisi-isomorph/woit/W_EUCLIDEAN_SL2H_PROJECTIVE_ACTION_SOURCE_INSTANCE_0_1.isg':[
    182002,184001,184006,189000,189001,189002,189003,189004,189005,189006,
    189310,189311,189314,189315,189316,202003,202004,202100,202101,202102,
    202103,202104,202105,202106,202113,202114,202120,202121,202122,202126,
    943000,997099
  ],
  'research/woit-lisi-isomorph/woit/W_EUCLIDEAN_HP1_HOMOGENEOUS_SOURCE_INSTANCE_0_1.isg':[
    189310,189314,189315,189316,202120,202121,202122,998141,998199
  ]
};

for(const root of roots){
  const c=fs.readFileSync(root,'utf8');
  const declared=new Set([...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1])));
  const refs=[...new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])).filter(x=>x>=180000&&x<999999&&!declared.has(x)))].sort((a,b)=>a-b);
  const want=[...expected[root]].sort((a,b)=>a-b);
  if(JSON.stringify(refs)!==JSON.stringify(want)) throw new Error('W053 dependency drift '+root+' '+JSON.stringify({refs,want}));
}

console.log(JSON.stringify({
  census_id:'W-SSC-053',
  result:'COMPOSITIONAL_DEPENDENCY_CLOSED_AT_FROZEN_BOUNDARIES',
  source_instances:roots,
  unresolved_local_refs:0,
  boundaries:packet.abstraction_boundaries
},null,2));
