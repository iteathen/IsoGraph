import fs from 'node:fs';
const root='research/woit-lisi-isomorph/woit/W05_H2_PROJECTIVE_REAL_STRUCTURE_SOURCE_INSTANCE_0_1.isg';
const required=[187400,187401,187402,189000,189001,189002,189003,189004,189005,189006,189310,189315,189319,197012,202003,202004,202100,202101,202102,202103,202104,202105,202106,202111,202112,202113,202114,202199];
const providers={
  "W024_QUATERNIONIC_P1_CLOSURE_PACKET_0_1.json": [
    187400,
    187401,
    187402,
    189000,
    189001,
    189002,
    189003,
    189004,
    189005,
    189006,
    189310,
    189315,
    189319,
    197012
  ],
  "W023_TWISTOR_P1_CLOSURE_PACKET_0_1.json": [
    202003,
    202004,
    202100,
    202101,
    202102,
    202103,
    202104,
    202105,
    202106,
    202111,
    202112,
    202113,
    202114,
    202199
  ]
};
const c=fs.readFileSync(root,'utf8');
const declared=new Set([...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1])));
const actual=[...new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])).filter(x=>x>=180000&&x<999999&&!declared.has(x)))].sort((a,b)=>a-b);
const allowed=new Set(Object.values(providers).flat());
const missing=actual.filter(x=>!allowed.has(x));
const stale=required.filter(x=>!actual.includes(x));
if(missing.length)throw new Error('uncovered refs '+missing.join(','));
if(stale.length)throw new Error('pinned interface drift '+stale.join(','));
console.log(JSON.stringify({census_id:'W-SSC-098',actual_external_refs:actual.length,uncovered:0,provider_packets:Object.keys(providers)},null,2));
