import fs from 'node:fs';

export function clone(value){
  return structuredClone(value);
}

function parts(path){
  return String(path).split('.').map(x=>/^\d+$/.test(x)?Number(x):x);
}

export function hasPath(root,path){
  let cur=root;
  for(const p of parts(path)){
    if(cur===null||cur===undefined||!(p in Object(cur))) return false;
    cur=cur[p];
  }
  return true;
}

export function getPath(root,path){
  let cur=root;
  for(const p of parts(path)) cur=cur[p];
  return cur;
}

export function setPath(root,path,value){
  const ps=parts(path);
  let cur=root;
  for(let i=0;i<ps.length-1;i++){
    const p=ps[i],n=ps[i+1];
    if(cur[p]===undefined||cur[p]===null) cur[p]=typeof n==='number'?[]:{};
    cur=cur[p];
  }
  cur[ps.at(-1)]=clone(value);
}

export function deletePath(root,path){
  const ps=parts(path);
  let cur=root;
  for(let i=0;i<ps.length-1;i++) cur=cur[ps[i]];
  if(Array.isArray(cur)&&typeof ps.at(-1)==='number') cur.splice(ps.at(-1),1);
  else delete cur[ps.at(-1)];
}

export function reconstruct(source,operations){
  const out=clone(source);
  for(const op of operations){
    if(op.op==='set') setPath(out,op.path,op.value);
    else if(op.op==='delete') deletePath(out,op.path);
    else throw new Error('unsupported operation '+op.op);
  }
  return out;
}

export function validateFixture(f){
  const errors=[];
  if(!f?.source_anchor?.blob_sha) errors.push('missing immutable source blob');
  if(!f?.anatomy?.closure_authority) errors.push('missing closure/projection authority');

  const rebuilt=reconstruct(f.source_state,f.anatomy.operations??[]);
  if(JSON.stringify(rebuilt)!==JSON.stringify(f.target_state)) errors.push('reconstruction target mismatch');

  for(const p of f.anatomy.preserved_paths??[]){
    if(!hasPath(f.source_state,p)||!hasPath(f.target_state,p)) errors.push('preserved path absent '+p);
    else if(JSON.stringify(getPath(f.source_state,p))!==JSON.stringify(getPath(f.target_state,p))) errors.push('preserved path changed '+p);
  }
  for(const p of f.anatomy.introduced_paths??[]){
    if(hasPath(f.source_state,p)||!hasPath(f.target_state,p)) errors.push('bad introduced path '+p);
  }
  for(const p of f.anatomy.removed_paths??[]){
    if(!hasPath(f.source_state,p)||hasPath(f.target_state,p)) errors.push('bad removed path '+p);
  }
  for(const p of f.anatomy.changed_paths??[]){
    if(!hasPath(f.source_state,p)||!hasPath(f.target_state,p)) errors.push('changed path absent '+p);
    else if(JSON.stringify(getPath(f.source_state,p))===JSON.stringify(getPath(f.target_state,p))) errors.push('changed path unchanged '+p);
  }
  return {ok:errors.length===0,errors,rebuilt};
}

export function loadFixtures(path='experiments/020/TRANSITION_FIXTURES.json'){
  return JSON.parse(fs.readFileSync(path,'utf8'));
}
