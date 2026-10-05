import fs from 'node:fs';

const root='research/woit-lisi-isomorph/woit/W04E_OS_REFLECTION_POSITIVE_RECONSTRUCTION_SOURCE_INSTANCE_0_1.isg';
const packet=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W_OS_REFLECTION_POSITIVE_SUPPORT_PACKET_0_1.json','utf8'));
const boundary=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W_OS_REFLECTION_POSITIVE_ABSTRACTION_BOUNDARY_0_1.json','utf8'));

if(boundary.status!=='FROZEN_FOR_W054_W083_W084_W122_W123_W136') throw new Error('OS abstraction boundary not frozen');
const c=fs.readFileSync(root,'utf8');
const declared=new Set([...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1])));
const refs=[...new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])).filter(x=>x>=180000&&x<999999&&!declared.has(x)))].sort((a,b)=>a-b);
const expected=[...packet.external_local_refs].sort((a,b)=>a-b);
if(JSON.stringify(refs)!==JSON.stringify(expected)) throw new Error('dependency drift '+JSON.stringify({refs,expected}));

const required=[
 '(^150010 996197 205105 996110)',
 '(^150010 184001 996170 996171 996172 996173)',
 '(^150010 184001 996180 996181 996182 996173)',
 '(^150010 184001 996190 996191 996192 996193)'
];
for(const s of required) if(!c.includes(s)) throw new Error('missing OS pin '+s);

console.log(JSON.stringify({
 result:'OS_SUPPORT_DEPENDENCY_AND_SOURCE_PINS_PASS',
 external_refs:refs.length,
 abstraction_boundary:'W_OS_REFLECTION_POSITIVE_ABSTRACTION_BOUNDARY_0_1.json'
},null,2));
