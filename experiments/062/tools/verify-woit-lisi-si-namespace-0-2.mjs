import fs from 'node:fs';
import path from 'node:path';

const root='research/woit-lisi-isomorph';
const quarantined=new Set([
  'research/woit-lisi-isomorph/support/PRIMITIVE_DIMENSION_7_SCHEMA_0_1.isg',
  'research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_BIPRODUCT_OPERATOR_SOURCE_INSTANCE_0_1.isg',
  'research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_SO8_SOURCE_ASSERTION_0_1.isg'
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

const crossFamilyCollisions=[];
const allowedRevisionReuse=[];
for(const [id,rows0] of decls){
  const rows=rows0.filter(r=>!r.quarantined);
  if(rows.length<2)continue;
  const families=[...new Set(rows.map(r=>r.family))];
  if(families.length===1){
    allowedRevisionReuse.push({id,family:families[0],paths:rows.map(r=>r.path)});
  }else{
    crossFamilyCollisions.push({id,families,paths:rows.map(r=>r.path)});
  }
}

const quarantineValidation=[];
for(const q of quarantined){
  const exists=fs.existsSync(q);
  const ids=exists?[...fs.readFileSync(q,'utf8').matchAll(/\(\^15001[34]\s+(\d+)/g)].map(m=>Number(m[1])):[];
  quarantineValidation.push({path:q,exists,declared_count:ids.length,first_ids:ids.slice(0,16)});
}

const repairs={
  dimension7:{
    path:'research/woit-lisi-isomorph/support/PRIMITIVE_DIMENSION_7_SCHEMA_0_2.isg',
    required:[225010],
    forbidden:[225000]
  },
  biproduct:{
    path:'research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_BIPRODUCT_OPERATOR_SOURCE_INSTANCE_0_2.isg',
    required:[246000,246005,246100,246120,246130,246199],
    forbidden_range:[226000,226199],
    required_calls:[225010,225001]
  },
  so8:{
    path:'research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_SO8_SOURCE_ASSERTION_0_2.isg',
    required:[246006,246198],
    forbidden_range:[226000,226199]
  }
};

const errors=[];
if(crossFamilyCollisions.length)errors.push(...crossFamilyCollisions.map(x=>'cross-family SI collision '+x.id+': '+x.paths.join(' | ')));
for(const q of quarantineValidation)if(!q.exists)errors.push('quarantined historical owner missing '+q.path);

for(const [name,r] of Object.entries(repairs)){
  if(!fs.existsSync(r.path)){errors.push('repair missing '+name+' '+r.path);continue;}
  const s=fs.readFileSync(r.path,'utf8');
  const ids=[...s.matchAll(/\(\^15001[34]\s+(\d+)/g)].map(m=>Number(m[1]));
  for(const id of r.required||[])if(!ids.includes(id))errors.push(name+' required declaration missing '+id);
  for(const id of r.forbidden||[])if(ids.includes(id))errors.push(name+' forbidden declaration remains '+id);
  if(r.forbidden_range){
    const bad=ids.filter(id=>id>=r.forbidden_range[0]&&id<=r.forbidden_range[1]);
    if(bad.length)errors.push(name+' retains forbidden range declarations '+bad.join(','));
  }
  for(const id of r.required_calls||[])if(!s.includes('(^150010 '+id))errors.push(name+' required call missing '+id);
}

// Fresh repaired ownership must be unique after quarantine.
for(const id of [225010]){
  const owners=(decls.get(id)||[]).filter(r=>!r.quarantined);
  if(owners.length!==1)errors.push('fresh SI '+id+' active owner count '+owners.length+': '+owners.map(x=>x.path).join(' | '));
}
const blockOwners=[];
for(const [id,rows] of decls){
  if(id<246000||id>246299)continue;
  for(const r of rows.filter(x=>!x.quarantined))blockOwners.push({id,path:r.path});
}
const permitted246=new Set([
 'research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_BIPRODUCT_OPERATOR_SOURCE_INSTANCE_0_2.isg',
 'research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_SO8_SOURCE_ASSERTION_0_2.isg'
]);
for(const x of blockOwners)if(!permitted246.has(x.path))errors.push('246xxx active owner outside repaired L127 files: '+x.id+' '+x.path);

console.log(JSON.stringify({
  schema:'isograph.woit-lisi-si-namespace-guard.v0.2',
  pass:errors.length===0,
  errors,
  scanned_isg_files:files.length,
  declared_si_count:decls.size,
  cross_family_collisions:crossFamilyCollisions,
  allowed_revision_reuse:allowedRevisionReuse,
  quarantined:quarantineValidation,
  repaired_246_owner_count:blockOwners.length
},null,2));
if(errors.length)process.exit(1);
