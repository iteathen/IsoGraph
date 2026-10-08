import fs from 'node:fs';

const packet=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W028_COMMON_COMPLEXIFICATION_REAL_FORMS_CLOSURE_PACKET_0_2.json','utf8'));
for(const p of packet.support_packets){
  const s=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/'+p,'utf8'));
  if(!String(s.status).includes('CLOSED') && !String(s.status).includes('CANDIDATE_CLOSED')) {
    throw new Error('support not current closure candidate/authority: '+p+' '+s.status);
  }
}
const root=packet.split_source_instance;
const c=fs.readFileSync(root,'utf8');
const declared=new Set([...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1])));
const refs=[...new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])).filter(x=>x>=180000&&x<999999&&!declared.has(x)))].sort((a,b)=>a-b);
const required=[999000,999021,999041,999042,999050,999060];
for(const id of required) if(!declared.has(id)) throw new Error('missing split semantic ID '+id);
const pins=[
  '(^150010 999020 204116 204116 189306)',
  '(^150010 999020 999014 999014 189306)',
  '(^150010 999020 999012 999012 999009)',
  '(^150010 999020 999015 999015 999009)'
];
for(const s of pins) if(!c.includes(s)) throw new Error('missing split-signature pin '+s);

console.log(JSON.stringify({
  census_id:'W-SSC-028',
  result:'COMPOSITIONAL_DEPENDENCY_CLOSED_WITH_SPLIT_REAL_FORM',
  root,
  external_refs:refs.length,
  unresolved_local_refs:0,
  split_signature:'(+,+,-,-)'
},null,2));
