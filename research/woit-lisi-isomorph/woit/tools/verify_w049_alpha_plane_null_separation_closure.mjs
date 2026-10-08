import fs from 'node:fs';

const root='research/woit-lisi-isomorph/woit/W01_ALPHA_PLANE_NULL_SEPARATION_SOURCE_INSTANCE_0_1.isg';
const packet=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W049_ALPHA_PLANE_NULL_SEPARATION_CLOSURE_PACKET_0_1.json','utf8'));
const w023=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W023_TWISTOR_P1_CLOSURE_PACKET_0_2.json','utf8'));
const w047=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W047_GRASSMANNIAN_BUNDLE_KLEIN_CLOSURE_PACKET_0_2.json','utf8'));
const c=fs.readFileSync(root,'utf8');

for(const [name,p] of [['W023',w023],['W047',w047]]){
  if(!String(p.status).includes('REVALIDATED') && !String(p.status).includes('CLOSED')){
    throw new Error(name+' support packet is not current/closed: '+p.status);
  }
}

const declared=new Set([...c.matchAll(/\(\^15001[34]\s+(\d+)\)/g)].map(m=>Number(m[1])));
const refs=[...new Set([...c.matchAll(/\b(\d{4,6})\b/g)].map(m=>Number(m[1])).filter(x=>x>=180000&&x<999999&&!declared.has(x)))].sort((a,b)=>a-b);
const expected=[...packet.compositional_interface.root_external_refs].sort((a,b)=>a-b);
if(JSON.stringify(refs)!==JSON.stringify(expected)){
  throw new Error('W049 dependency drift: '+JSON.stringify({refs,expected}));
}

const neededDecl=[993010,993011,993012,993013,993014,993015,993016,993020,993021,993022,993099];
for(const id of neededDecl) if(!declared.has(id)) throw new Error('missing W049 declaration '+id);

if(w047.reconstruction.grassmannian_two_plane_carrier!==990100) throw new Error('W047 Gr carrier drift');
if(w047.reconstruction.tangent_hom_package_family!==990200) throw new Error('W047 tangent family drift');
if(!String(w047.status).includes('NAMESPACE_REBASE')) throw new Error('W047 packet is not namespace-rebased');
if(!w023.reconstruction && !w023.root_native) throw new Error('W023 support packet lacks reconstruction authority');

const requiredSnippets=[
  '(^150010 182001 993012 990220 990100)',
  '(^150010 993099 990299)'
];
for(const s of requiredSnippets) if(!c.includes(s)) throw new Error('missing W049 pinned clause '+s);

if(!c.includes('(^150010 993016 ?F1 ?F2)') || !c.includes('(^150010 993022 ?F1 ?F2)')){
  throw new Error('W049 theorem relations missing');
}

console.log(JSON.stringify({
  census_id:'W-SSC-049',
  result:'COMPOSITIONAL_DEPENDENCY_CLOSED',
  source_instance:'W01_ALPHA_PLANE_NULL_SEPARATION_SOURCE_INSTANCE_0_1.isg',
  external_refs:refs.length,
  unresolved_local_refs:0,
  supports:['W023_TWISTOR_P1_CLOSURE_PACKET_0_2.json','W047_GRASSMANNIAN_BUNDLE_KLEIN_CLOSURE_PACKET_0_2.json']
},null,2));
