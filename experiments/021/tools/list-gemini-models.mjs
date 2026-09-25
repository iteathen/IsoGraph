import fs from 'node:fs';

const key=process.env.GEMINI_API_KEY;
if(!key) throw new Error('GEMINI_API_KEY unavailable');

let pageToken='';
const models=[];
do{
  const url=new URL('https://generativelanguage.googleapis.com/v1beta/models');
  url.searchParams.set('pageSize','1000');
  if(pageToken) url.searchParams.set('pageToken',pageToken);
  const response=await fetch(url,{headers:{'x-goog-api-key':key}});
  const body=await response.text();
  if(!response.ok) throw new Error('models HTTP '+response.status+': '+body.slice(0,500));
  const data=JSON.parse(body);
  for(const model of data.models||[]){
    if((model.supportedGenerationMethods||[]).includes('generateContent')){
      models.push({
        name:model.name,
        displayName:model.displayName,
        inputTokenLimit:model.inputTokenLimit,
        outputTokenLimit:model.outputTokenLimit,
        supportedGenerationMethods:model.supportedGenerationMethods
      });
    }
  }
  pageToken=data.nextPageToken||'';
}while(pageToken);

fs.mkdirSync('out/exp021-models',{recursive:true});
fs.writeFileSync('out/exp021-models/MODELS.json',JSON.stringify({discovered_at:new Date().toISOString(),models},null,2)+'\n');
console.log(JSON.stringify(models.map(m=>m.name)));
