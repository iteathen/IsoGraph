import fs from 'node:fs';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { enforceExactRoleCoverage } from './exact-role-coverage.mjs';

const ROOT='research/project-discovery/2026-09-25-dp07-three-positive-controls';
const SHA=process.env.GITHUB_SHA;
const MODEL=process.env.GEMINI_MODEL||'gemini-3.8-flash';
const FALLBACK_MODELS=(process.env.GEMINI_FALLBACK_MODELS||'').split(',').map(x=>x.trim()).filter(Boolean);
const MODEL_CANDIDATES=[...new Set([MODEL,...FALLBACK_MODELS])];
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;
const disabledModels=new Map();
const providerCalls=[];
if(!SHA) throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY) throw new Error('GEMINI_API_KEY unavailable');

function frozen(p){
  return execFileSync('git',['show',`${SHA}:${p}`],{encoding:'utf8',maxBuffer:128*1024*1024});
}
function sha256(v){return crypto.createHash('sha256').update(v).digest('hex');}
function blobSha(p){return execFileSync('git',['rev-parse',`${SHA}:${p}`],{encoding:'utf8'}).trim();}

async function callGemini(packet){
  const failures=[];
  for(const model of MODEL_CANDIDATES){
    if(disabledModels.has(model)) continue;
    let useThinking=!model.includes('flash-lite');
    for(let i=0;i<4;i++){
      const generationConfig={
        candidateCount:1,
        maxOutputTokens:32768,
        temperature:0.1,
        responseMimeType:'application/json'
      };
      if(useThinking) generationConfig.thinkingConfig={thinkingLevel:'HIGH'};
      const request={contents:[{role:'user',parts:[{text:packet}]}],generationConfig};
      const url=`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
      let res,txt='';
      try{
        res=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':KEY},body:JSON.stringify(request)});
        txt=await res.text();
      }catch(error){
        failures.push({model,status:null,error:String(error)});
        if(i===0){await new Promise(r=>setTimeout(r,8000));continue;}
        disabledModels.set(model,'network_error');
        break;
      }
      if(res.ok){
        let data;
        try{data=JSON.parse(txt);}
        catch(error){
          failures.push({model,status:res.status,error:'malformed_api_json',detail:String(error)});
          if(i===0) continue;
          disabledModels.set(model,'malformed_api_json');
          break;
        }
        const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
        providerCalls.push({model,status:res.status,attempt:i+1,thinking:useThinking,usage:data.usageMetadata??null});
        return {model,status:res.status,attempts:i+1,thinking:useThinking,data,raw,responseText:txt};
      }
      failures.push({model,status:res.status,body_prefix:txt.slice(0,500)});
      if(res.status===400 && useThinking && /thinking/i.test(txt)){
        useThinking=false;
        i--;
        continue;
      }
      if(res.status===429){
        if(i<3){
          let retryMs=15000;
          const m=txt.match(/retry in ([0-9.]+)s/i);
          if(m) retryMs=Math.max(retryMs,Math.ceil(Number(m[1])*1000)+3000);
          await new Promise(r=>setTimeout(r,retryMs));
          continue;
        }
        disabledModels.set(model,'http_429');
        break;
      }
      if(res.status===404){
        disabledModels.set(model,'http_404');
        break;
      }
      if([500,502,503,504].includes(res.status)){
        if(i<3){await new Promise(r=>setTimeout(r,15000*(i+1)));continue;}
        disabledModels.set(model,'http_'+res.status);
        break;
      }
      disabledModels.set(model,'http_'+res.status);
      break;
    }
  }
  throw new Error('All Gemini model candidates unavailable: '+JSON.stringify(failures).slice(0,3000));
}

const manifestPath=`${ROOT}/DISCOVERY_INPUT_MANIFEST.json`;
const promptPath=`${ROOT}/BLIND_DISCOVERY_PROMPT.md`;
const manifest=JSON.parse(frozen(manifestPath));
if(manifest.status!=='READY_FOR_BLIND_EXECUTION') throw new Error('manifest not ready');

const promotionPath=manifest.translation_promotion;
if(!promotionPath) throw new Error('missing translation promotion');
const promotion=JSON.parse(frozen(promotionPath));
if(promotion.status!=='PROMOTED_FOR_DP07_DISCOVERY'||promotion.q7_promotion!=='PASS'||promotion.all_six_qualified!==true){
  throw new Error('translation Q7 promotion not valid');
}
if(!Array.isArray(promotion.cases)||promotion.cases.length!==6) throw new Error('expected six promoted translations');
for(const c of promotion.cases){
  if(c.native_blob_sha!==blobSha(ROOT+'/'+c.promoted_native)) throw new Error(c.case_id+': promoted native blob mismatch');
  if(c.signature_blob_sha!==blobSha(ROOT+'/'+c.promoted_signature)) throw new Error(c.case_id+': promoted signature blob mismatch');
}

const authority=manifest.authority_inputs||[];
const transformationAuthorityPath=manifest.transformation_semantic_authority;
if(!transformationAuthorityPath) throw new Error('missing transformation semantic authority');
if(!authority.includes(transformationAuthorityPath)) throw new Error('transformation semantic authority not in authority_inputs');
if(manifest.transformation_semantic_authority_status!=='FROZEN_STIPULATED_EXPERIMENT_AUTHORITY') throw new Error('transformation semantic authority status invalid');
if(manifest.transformation_semantic_authority_blob_sha!==blobSha(transformationAuthorityPath)) throw new Error('transformation semantic authority blob mismatch');
if(manifest.exact_discovery_law_provenance_required!==true) throw new Error('exact discovery law provenance gate disabled');
const inputs=manifest.discovery_inputs||[];
const withheld=new Set(manifest.withheld_from_discovery||[]);
if(inputs.length!==12) throw new Error('expected exactly 12 anonymous discovery inputs');
for(const p of inputs){
  if(!p.includes('/blind-v2/')) throw new Error('non-promoted discovery input: '+p);
  if(withheld.has(p)) throw new Error('withheld path leaked: '+p);
}
const forbiddenPathTerms=['/oracle/','SCORING_CONTRACT','ising','lattice-gas','xor-gf2','newton-hamilton'];
for(const p of [...authority,...inputs,promptPath]){
  const low=p.toLowerCase();
  if(forbiddenPathTerms.some(x=>low.includes(x.toLowerCase()))) throw new Error('forbidden cold path: '+p);
}

const packetManifest=[];
const chunks=[
  'ISOGRAPH DP 0.7 THREE-POSITIVE-CONTROL BLIND DISCOVERY\n',
  `Frozen SHA: ${SHA}\nModel: ${MODEL}\n\n`,
  'ISOLATION: The packet contains only authority plus anonymized A/B structures. Hidden source identities, scoring contract, and correspondence oracles are unavailable.\n'
];
for(const p of authority){
  const t=frozen(p);
  packetManifest.push({kind:'authority',path:p,sha256:sha256(t),bytes:Buffer.byteLength(t)});
  chunks.push(`\n===== BEGIN AUTHORITY FILE: ${p} =====\n${t}\n===== END AUTHORITY FILE: ${p} =====\n`);
}
for(const p of inputs){
  const t=frozen(p);
  packetManifest.push({kind:'discovery_input',path:p,sha256:sha256(t),bytes:Buffer.byteLength(t)});
  chunks.push(`\n===== BEGIN ANONYMOUS DISCOVERY INPUT: ${p} =====\n${t}\n===== END ANONYMOUS DISCOVERY INPUT: ${p} =====\n`);
}
const prompt=frozen(promptPath);
packetManifest.push({kind:'prompt',path:promptPath,sha256:sha256(prompt),bytes:Buffer.byteLength(prompt)});
chunks.push(`\n===== BEGIN GOVERNING PROMPT =====\n${prompt}\n===== END GOVERNING PROMPT =====\n`);

const packet=chunks.join('');
const packetHash=sha256(packet);
const out='out/dp07-positive-controls';
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(`${out}/PACKET.txt`,packet);
fs.writeFileSync(`${out}/INPUT_MANIFEST.json`,JSON.stringify(packetManifest,null,2)+'\n');
const baseMeta={campaign:manifest.campaign,model_requested:MODEL,model_candidates:MODEL_CANDIDATES,frozen_sha:SHA,translation_promotion_commit:manifest.translation_promotion_commit,transformation_semantic_authority:transformationAuthorityPath,transformation_semantic_authority_blob_sha:manifest.transformation_semantic_authority_blob_sha,exact_discovery_law_provenance_required:true,packet_sha256:packetHash,input_manifest:packetManifest};
if(DRY){
  fs.writeFileSync(`${out}/DRY_RUN.json`,JSON.stringify({...baseMeta,dry_run:true},null,2)+'\n');
  console.log(JSON.stringify({dry_run:true,packet_sha256:packetHash,files:packetManifest.length}));
  process.exit(0);
}

const call=await callGemini(packet);
const {data,raw,responseText}=call;
fs.writeFileSync(`${out}/API_RESPONSE.json`,responseText);
const meta={...baseMeta,workflow_run_id:process.env.GITHUB_RUN_ID||null,workflow_attempt:process.env.GITHUB_RUN_ATTEMPT||null,selected_model:call.model,api_attempts:call.attempts,http_status:call.status,provider_calls:providerCalls,disabled_models:Object.fromEntries(disabledModels)};
fs.writeFileSync(`${out}/COLD_REPORT_RAW.txt`,raw+'\n');
let parsed;
try{parsed=JSON.parse(raw);}
catch(e){
  fs.writeFileSync(`${out}/METADATA.json`,JSON.stringify({...meta,semantic_status:'MALFORMED_OUTPUT',report_sha256:sha256(raw)},null,2)+'\n');
  throw e;
}
if(!Array.isArray(parsed?.cases)||parsed.cases.length!==3) throw new Error('expected three cases');
const signaturesByCase=Object.fromEntries(
  ['case-01','case-02','case-03'].map(caseId=>[
    caseId,
    {
      A:JSON.parse(frozen(`${ROOT}/blind-v2/${caseId}/A.signature.json`)),
      B:JSON.parse(frozen(`${ROOT}/blind-v2/${caseId}/B.signature.json`)),
      nativeA:frozen(`${ROOT}/blind-v2/${caseId}/A.isg`),
      nativeB:frozen(`${ROOT}/blind-v2/${caseId}/B.isg`)
    }
  ])
);
enforceExactRoleCoverage({report:parsed,signaturesByCase});
fs.writeFileSync(`${out}/ROLE_COVERAGE_AUDIT.json`,JSON.stringify({
  schema:1,
  disposition:'PASS',
  exact_cases:parsed.cases.filter(x=>x.disposition==='EXACT_WITNESS').map(x=>x.case_id)
},null,2)+'\n');
fs.writeFileSync(`${out}/PARSED_REPORT.json`,JSON.stringify(parsed,null,2)+'\n');
fs.writeFileSync(`${out}/METADATA.json`,JSON.stringify({...meta,semantic_status:'FROZEN',report_sha256:sha256(raw),finish_reason:data.candidates?.[0]?.finishReason??null,usage:data.usageMetadata??null},null,2)+'\n');
console.log(JSON.stringify({status:call.status,model:call.model,attempts:call.attempts,packet_sha256:packetHash,report_sha256:sha256(raw)}));
