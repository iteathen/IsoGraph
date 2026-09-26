import fs from 'node:fs';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const ROOT='research/project-discovery/2026-09-25-dp07-three-positive-controls/translation-v2';
const OUT='out/translation-v2';
const SHA=process.env.GITHUB_SHA;
const MODEL=process.env.GEMINI_MODEL||'gemini-3.5-flash';
const KEY=process.env.GEMINI_API_KEY;
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
if(!SHA)throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY)throw new Error('GEMINI_API_KEY unavailable');
const CASES=['case-01A','case-01B','case-02A','case-02B','case-03A','case-03B'];
function frozen(p){return execFileSync('git',['show',`${SHA}:${p}`],{encoding:'utf8',maxBuffer:128*1024*1024});}
function hash(s){return crypto.createHash('sha256').update(s).digest('hex');}
async function callGemini(packet,temp=0.05){
  const request={contents:[{role:'user',parts:[{text:packet}]}],generationConfig:{candidateCount:1,maxOutputTokens:20000,temperature:temp,responseMimeType:'application/json',thinkingConfig:{thinkingLevel:'HIGH'}}};
  const url=`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  let status=0,txt='',attempts=0;
  for(let i=0;i<8;i++){
    attempts=i+1;
    const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify(request)});
    status=r.status;txt=await r.text();
    if(r.ok)break;
    if(status===429 && i<7){
      let retryMs=12000;
      try{
        const m=txt.match(/retry in ([0-9.]+)s/i);
        if(m) retryMs=Math.max(retryMs,Math.ceil(Number(m[1])*1000)+3000);
      }catch{}
      await new Promise(x=>setTimeout(x,retryMs));
      continue;
    }
    if([500,502,503,504].includes(status)&&i<7){await new Promise(x=>setTimeout(x,15000*(i+1)));continue;}
    break;
  }
  if(!(status>=200&&status<300))throw new Error('Gemini HTTP '+status+' '+txt.slice(0,500));
  const data=JSON.parse(txt);
  const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
  return {parsed:JSON.parse(raw),raw,status,attempts,usage:data.usageMetadata??null};
}
fs.mkdirSync(OUT,{recursive:true});
const core=frozen('CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md');
const coldPrompt=frozen(`${ROOT}/COLD_RECONSTRUCTION_PROMPT.md`);
const verifierPrompt=frozen(`${ROOT}/VERIFIER_PROMPT.md`);
const obligations=JSON.parse(frozen(`${ROOT}/hidden/OBLIGATIONS.json`));
const preflight=JSON.parse(fs.readFileSync(`${OUT}/NATIVE_AUDIT.json`,'utf8'));
if(preflight.disposition!=='PASS')throw new Error('native preflight failed');
const dryManifest=[];
for(const id of CASES){
  for(const p of [`${ROOT}/${id}/NATIVE.isg`,`${ROOT}/${id}/SIGNATURE.json`]){
    const t=frozen(p);dryManifest.push({case_id:id,path:p,sha256:hash(t),bytes:Buffer.byteLength(t)});
  }
}
const dry={schema:1,sha:SHA,model:MODEL,cases:CASES,input_manifest:dryManifest,oracle_path:`${ROOT}/hidden/OBLIGATIONS.json`,oracle_exposed_to_decoder:false};
fs.writeFileSync(`${OUT}/DRY_RUN.json`,JSON.stringify(dry,null,2)+'\n');
if(DRY){console.log(JSON.stringify(dry));process.exit(0);}

const decodeResults={};
for(const id of CASES){
  const native=frozen(`${ROOT}/${id}/NATIVE.isg`);
  const signature=frozen(`${ROOT}/${id}/SIGNATURE.json`);
  const packet=`ISOGRAPH TRANSLATION COLD RECONSTRUCTION\nCASE ID: ${id}\nFROZEN SHA: ${SHA}\n\n===== CORE =====\n${core}\n===== SIGNATURE =====\n${signature}\n===== NATIVE =====\n${native}\n===== PROMPT =====\n${coldPrompt}`;
  const packetHash=hash(packet);
  fs.writeFileSync(`${OUT}/${id}-PACKET.sha256`,packetHash+'\n');
  const A=await callGemini(packet,0.02);
  await new Promise(x=>setTimeout(x,2500));
  const B=await callGemini(packet,0.18);
  await new Promise(x=>setTimeout(x,2500));
  fs.writeFileSync(`${OUT}/${id}-DECODER-A.json`,JSON.stringify(A.parsed,null,2)+'\n');
  fs.writeFileSync(`${OUT}/${id}-DECODER-B.json`,JSON.stringify(B.parsed,null,2)+'\n');
  decodeResults[id]={packet_sha256:packetHash,A:A.parsed,B:B.parsed,A_meta:{attempts:A.attempts,usage:A.usage},B_meta:{attempts:B.attempts,usage:B.usage}};
}

const verifications={};
for(const id of CASES){
  const source=frozen(`${ROOT}/${id}/SOURCE_FREEZE.md`);
  const obs=obligations.cases[id];
  const d=decodeResults[id];
  const packet=`ISOGRAPH TRANSLATION SAMENESS VERIFICATION\nCASE ID: ${id}\n\n===== SOURCE =====\n${source}\n===== OBLIGATIONS =====\n${JSON.stringify(obs,null,2)}\n===== DECODER A =====\n${JSON.stringify(d.A,null,2)}\n===== DECODER B =====\n${JSON.stringify(d.B,null,2)}\n===== VERIFIER PROMPT =====\n${verifierPrompt}`;
  const V=await callGemini(packet,0.0);
  await new Promise(x=>setTimeout(x,2500));
  fs.writeFileSync(`${OUT}/${id}-VERIFIER.json`,JSON.stringify(V.parsed,null,2)+'\n');
  verifications[id]=V.parsed;
}

const caseScores=[];
for(const id of CASES){
  const v=verifications[id];
  const expected=(obligations.cases[id]||[]).map(x=>x.id).sort();
  function dec(x){
    const got=(x?.obligations||[]).filter(o=>o.pass===true).map(o=>o.id).sort();
    return x?.exact_same===true &&
      JSON.stringify(got)===JSON.stringify(expected) &&
      Array.isArray(x.missing)&&x.missing.length===0 &&
      Array.isArray(x.additions)&&x.additions.length===0 &&
      Array.isArray(x.distortions)&&x.distortions.length===0 &&
      Array.isArray(x.ambiguities)&&x.ambiguities.length===0;
  }
  const A=dec(v.decoder_A),B=dec(v.decoder_B);
  const pass=A&&B&&v.cross_decoder_consistent===true&&v.translation_pass===true;
  caseScores.push({case_id:id,decoder_A_exact:A,decoder_B_exact:B,cross_decoder_consistent:v.cross_decoder_consistent===true,verifier_translation_pass:v.translation_pass===true,pass});
}
const score={schema:1,disposition:caseScores.every(x=>x.pass)?'TRANSLATIONS_QUALIFY':'TRANSLATIONS_DO_NOT_QUALIFY',case_scores:caseScores};
fs.writeFileSync(`${OUT}/SCORE.json`,JSON.stringify(score,null,2)+'\n');
fs.writeFileSync(`${OUT}/METADATA.json`,JSON.stringify({schema:1,sha:SHA,model:MODEL,case_packet_hashes:Object.fromEntries(Object.entries(decodeResults).map(([k,v])=>[k,v.packet_sha256]))},null,2)+'\n');
console.log(JSON.stringify(score,null,2));
if(score.disposition!=='TRANSLATIONS_QUALIFY')process.exitCode=2;
