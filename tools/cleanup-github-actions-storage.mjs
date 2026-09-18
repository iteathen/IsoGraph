const token=process.env.GITHUB_TOKEN;
const repository=process.env.GITHUB_REPOSITORY;
const runId=process.env.GITHUB_RUN_ID;

if(!token) throw new Error('GITHUB_TOKEN unavailable');
if(!repository || !/^[^/]+\\/[^/]+$/.test(repository)) throw new Error('GITHUB_REPOSITORY invalid');
if(!runId || !/^\\d+$/.test(runId)) throw new Error('GITHUB_RUN_ID invalid');

const headers={
  Authorization:'Bearer '+token,
  Accept:'application/vnd.github+json',
  'X-GitHub-Api-Version':'2022-11-28'
};

async function api(apiPath, init={}){
  const res=await fetch('https://api.github.com'+apiPath,{...init,headers:{...headers,...(init.headers||{})}});
  if(!res.ok && res.status!==404){
    const body=await res.text();
    throw new Error('GitHub API '+res.status+': '+body.slice(0,500));
  }
  return res;
}

let page=1;
const artifacts=[];
while(true){
  const res=await api('/repos/'+repository+'/actions/runs/'+runId+'/artifacts?per_page=100&page='+page);
  if(res.status===404) break;
  const data=await res.json();
  const batch=Array.isArray(data.artifacts)?data.artifacts:[];
  artifacts.push(...batch);
  if(batch.length<100) break;
  page++;
}

for(const artifact of artifacts){
  await api('/repos/'+repository+'/actions/artifacts/'+artifact.id,{method:'DELETE'});
}

console.log('Deleted '+artifacts.length+' transient artifact(s) owned by workflow run '+runId+'.');
