import fs from 'node:fs';

const root='research/woit-lisi-isomorph/woit/W02_SU2L_INTERNAL_SPINOR_ACTION_SOURCE_INSTANCE_0_1.isg';
const packet=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W009_EUCLIDEAN_LEFT_SPINOR_INTERNAL_SU2_CLOSURE_PACKET_0_1.json','utf8'));
const w134=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W134_EUCLIDEAN_SU2_ROLE_PSEUDOREAL_CLOSURE_PACKET_0_1.json','utf8'));
const c=fs.readFileSync(root,'utf8');

const declared=new Set([...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1])));
const refs=[...new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])).filter(x=>x>=180000&&x<999999&&!declared.has(x)))].sort((a,b)=>a-b);
const expected=[...packet.compositional_interface.root_external_refs].sort((a,b)=>a-b);
if(JSON.stringify(refs)!==JSON.stringify(expected)){
  throw new Error('W009 dependency drift: '+JSON.stringify({refs,expected}));
}

if(w134.reconstruction.su2_L_role!==205130) throw new Error('W134 SU2_L role drift');
if(w134.reconstruction.su2_L_vector_action!==205122) throw new Error('W134 spacetime action drift');
if(w134.reconstruction.su2_L_spacetime_action!=='TRIVIAL') throw new Error('W134 trivial spacetime-action guard lost');

const required=[
  '(^150010 184002\n    205130 204204 204205 204116\n    189020 949101)',
  '(^150010 949101 205150 189042 949102)',
  '(^150003 (^150008 949102 189042))'
];
for(const s of required) if(!c.includes(s)) throw new Error('missing W009 pinned clause '+s);

console.log(JSON.stringify({
  census_id:'W-SSC-009',
  result:'COMPOSITIONAL_DEPENDENCY_CLOSED',
  source_instance:'W02_SU2L_INTERNAL_SPINOR_ACTION_SOURCE_INSTANCE_0_1.isg',
  external_refs:refs.length,
  unresolved_local_refs:0,
  support:'W134_EUCLIDEAN_SU2_ROLE_PSEUDOREAL_CLOSURE_PACKET_0_1.json'
},null,2));
