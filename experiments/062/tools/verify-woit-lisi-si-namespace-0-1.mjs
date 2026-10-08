import fs from 'node:fs';
import path from 'node:path';

const root='research/woit-lisi-isomorph';
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
const errors=[];
if(collisions.length)errors.push(...collisions.map(x=>'cross-module SI collision '+x.id+': '+x.paths.join(' | ')));
for(const q of quarantineValidation){
  if(!q.exists)errors.push('quarantined file missing '+q.path);
  if(q.path.endsWith('PRIMITIVE_DIMENSION_7_SCHEMA_0_1.isg')&&!q.ids.includes(225000))errors.push('quarantine no longer matches recorded 225000 defect');
}
if(!replacementOk)errors.push('dimension-7 successor does not own fresh 225010 cleanly');

console.log(JSON.stringify({
  schema:'isograph.woit-lisi-si-namespace-guard.v0.1',
  pass:errors.length===0,
  errors,
  scanned_isg_files:files.length,
  declared_si_count:decls.size,
  collisions,
  allowed_revision_reuse:allowedRevisionReuse,
  quarantined:quarantineValidation,
  replacement:{path:replacement,si:225010,ok:replacementOk}
},null,2));
if(errors.length)process.exit(1);
