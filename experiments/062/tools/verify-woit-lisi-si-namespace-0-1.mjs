import fs from 'node:fs';
import path from 'node:path';

const root='research/woit-lisi-isomorph/support';
const quarantined=new Set([
  'research/woit-lisi-isomorph/support/PRIMITIVE_DIMENSION_7_SCHEMA_0_1.isg'
]);

function walk(dir,out=[]){
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,ent.name).replaceAll('\\','/');
    if(ent.isDirectory())walk(p,out);
    else if(ent.isFile()&&ent.name.endsWith('.isg'))out.push(p);
  }
  return out;
}
function familyKey(p){
  const base=path.basename(p,'.isg');
  return base.replace(/_0_\d+(?:_[A-Z0-9_]+)?$/,'');
}
const files=walk(root);
const decls=new Map();
for(const p of files){
  const s=fs.readFileSync(p,'utf8');
  const ids=[...s.matchAll(/\(\^15001[34]\s+(\d+)/g)].map(m=>Number(m[1]));
  for(const id of ids){
    if(!decls.has(id))decls.set(id,[]);
    decls.get(id).push({path:p,family:familyKey(p),quarantined:quarantined.has(p)});
  }
}
const collisions=[];
const allowedRevisionReuse=[];
for(const [id,rows0] of decls){
  const rows=rows0.filter(r=>!r.quarantined);
  if(rows.length<2)continue;
  const families=[...new Set(rows.map(r=>r.family))];
  if(families.length===1){
    allowedRevisionReuse.push({id,family:families[0],paths:rows.map(r=>r.path)});
  }else{
    collisions.push({id,families,paths:rows.map(r=>r.path)});
  }
}
const quarantineValidation=[];
for(const q of quarantined){
  const exists=fs.existsSync(q);
  let ids=[];
  if(exists)ids=[...fs.readFileSync(q,'utf8').matchAll(/\(\^15001[34]\s+(\d+)/g)].map(m=>Number(m[1]));
  quarantineValidation.push({path:q,exists,ids});
}
const replacement='research/woit-lisi-isomorph/support/PRIMITIVE_DIMENSION_7_SCHEMA_0_2.isg';
const replacementText=fs.existsSync(replacement)?fs.readFileSync(replacement,'utf8'):'';
const replacementOk=replacementText.includes('(^150014 225010)')&&!replacementText.includes('(^150014 225000)');
const activeRoot='research/woit-lisi-isomorph';
const activeFiles=walk(activeRoot,[]);
const l127Owners=new Set([
  'research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_BIPRODUCT_OPERATOR_SOURCE_INSTANCE_0_2.isg',
  'research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_SO8_SOURCE_ASSERTION_0_2.isg'
]);
const l127BlockOwners=[];
for(const p of activeFiles){
  const s=fs.readFileSync(p,'utf8');
  const ids=[...s.matchAll(/\(\^15001[34]\s+(\d+)/g)].map(m=>Number(m[1]));
  const block=ids.filter(id=>id>=246000&&id<=246199);
  if(block.length)l127BlockOwners.push({path:p,ids:block});
}
const errors=[];
if(collisions.length)errors.push(...collisions.map(x=>'cross-module SI collision '+x.id+': '+x.paths.join(' | ')));
for(const q of quarantineValidation){
  if(!q.exists)errors.push('quarantined file missing '+q.path);
  if(q.path.endsWith('PRIMITIVE_DIMENSION_7_SCHEMA_0_1.isg')&&!q.ids.includes(225000))errors.push('quarantine no longer matches recorded 225000 defect');
}
if(!replacementOk)errors.push('dimension-7 successor does not own fresh 225010 cleanly');
for(const row of l127BlockOwners){
  if(!l127Owners.has(row.path))errors.push('fresh L127 246xxx block claimed outside corrected owners: '+row.path);
}
for(const p of l127Owners){
  if(!l127BlockOwners.some(x=>x.path===p))errors.push('corrected L127 owner missing 246xxx declarations: '+p);
}
const bip='research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_BIPRODUCT_OPERATOR_SOURCE_INSTANCE_0_2.isg';
const so='research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_SO8_SOURCE_ASSERTION_0_2.isg';
for(const p of [bip,so]){
  if(!fs.existsSync(p)){errors.push('corrected L127 source missing '+p);continue;}
  const t=fs.readFileSync(p,'utf8');
  if(/\(\^15001[34]\s+226\d{3}/.test(t))errors.push('corrected L127 source still declares old 226xxx SI '+p);
}
if(fs.existsSync(bip)){
  const t=fs.readFileSync(bip,'utf8');
  if(!t.includes('(^150010 225010'))errors.push('corrected L127 biproduct source does not consume dimension-7 SI 225010');
  if(!t.includes('(^150010 225001'))errors.push('corrected L127 biproduct source lost dimension-28 SI 225001');
}

console.log(JSON.stringify({
  schema:'isograph.woit-lisi-si-namespace-guard.v0.1',
  pass:errors.length===0,
  errors,
  scanned_isg_files:files.length,
  declared_si_count:decls.size,
  collisions,
  allowed_revision_reuse:allowedRevisionReuse,
  quarantined:quarantineValidation,
  replacement:{path:replacement,si:225010,ok:replacementOk},l127_fresh_block_owners:l127BlockOwners
},null,2));
if(errors.length)process.exit(1);
