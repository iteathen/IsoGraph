import fs from 'node:fs';

const key=process.env.GEMINI_API_KEY;
if(!key) throw new Error('GEMINI_API_KEY unavailable');

const candidates=[
  'gemini-3.1-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-omni-1.1-flash'
];

const filler='X'.repeat(36000);
const prompt='This is a provider capacity probe, not a semantic task. Ignore the filler and return exactly OK.\n'+filler;
const results=[];
let selected=null;

for(const model of candidates){
  const url='https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent';
  let response;
  let body='';
  try{
    response=await fetch(url,{
      method:'POST',
      headers:{'Content-Type':'application/json','x-goog-api-key':key},
      body:JSON.stringify({
        contents:[{role:'user',parts:[{text:prompt}]}],
        generationConfig:{candidateCount:1,maxOutputTokens:32,temperature:0}
      })
    });
    body=await response.text();
  }catch(error){
    results.push({model,http_status:null,ok:false,error:String(error)});
    continue;
  }

  const item={model,http_status:response.status,ok:response.ok,input_bytes:Buffer.byteLength(prompt)};
  if(response.ok){
    try{
      const data=JSON.parse(body);
      item.response=(data.candidates?.[0]?.content?.parts||[]).map(p=>p.text||'').join('').trim().slice(0,80);
    }catch{
      item.response='UNPARSEABLE_SUCCESS_BODY';
    }
    results.push(item);
    selected=model;
    break;
  }

  item.body_prefix=body.slice(0,240);
  results.push(item);
}

const out={
  purpose:'Long-payload Gemini capability probe for DTS discovery transport; no semantic judgment',
  input_bytes:Buffer.byteLength(prompt),
  candidates,
  results,
  selected_model:selected
};

fs.mkdirSync('out/provider-long-probe',{recursive:true});
fs.writeFileSync('out/provider-long-probe/LONG_PROBE.json',JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify(out,null,2));
if(!selected) process.exitCode=2;
