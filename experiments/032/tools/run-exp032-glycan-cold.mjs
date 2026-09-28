import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const SHA=process.env.GITHUB_SHA;
const DRY=process.env.ISOGRAPH_COLD_DRY_RUN==='1';
const KEY=process.env.GEMINI_API_KEY;
const OUT='out/exp032';

if(!SHA) throw new Error('GITHUB_SHA unavailable');
if(!DRY&&!KEY) throw new Error('GEMINI_API_KEY unavailable');
fs.mkdirSync(OUT,{recursive:true});

const expectedBlobs={
  'CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md':'ef9ea2584ec24f87c956d486040d3cbbd7d49f79',
  'research/primitive-logic/PRIMITIVE_LOGIC_KERNEL_0_1.md':'49dd4c746cbdd3df1bb2075aacc679cbce534384',
  'research/primitive-logic/PRIMITIVE_LOGIC_KERNEL_0_1.isg':'2630336da5c4117a15a43c1dc0847536b33ed083',
  'research/primitive-logic/PRIMITIVE_DATA_CONSTRUCTORS_0_5.isg':'c0479ac1de1a1c8ff5737221133601618b1a56cf',
  'research/primitive-logic/PRIMITIVE_NATURAL_ARITHMETIC_0_5.isg':'fde4915b3a056430e0cb7a3a327e26abc1c7b09b',
  'research/glycan-cleavage/2026-09-27/GLYCAN_CLEAVAGE_SOURCE_FREEZE_0_1.md':'7565778decc21d865f9fd81b10bd483a36e091e4',
  'research/glycan-cleavage/2026-09-27/GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg':'f5ef6f08df03c01cb03d8dea1f9da87cc2fa29c4'
};

const coldFiles=[
  ['CORE_020_RESEARCH_CONTRACT','CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md'],
  ['PRIMITIVE_ROLE_MAP','research/primitive-logic/PRIMITIVE_LOGIC_KERNEL_0_1.md'],
  ['PRIMITIVE_KERNEL_NATIVE','research/primitive-logic/PRIMITIVE_LOGIC_KERNEL_0_1.isg'],
  ['FINITE_DATA_NATIVE','research/primitive-logic/PRIMITIVE_DATA_CONSTRUCTORS_0_5.isg'],
  ['NATURAL_ARITHMETIC_NATIVE','research/primitive-logic/PRIMITIVE_NATURAL_ARITHMETIC_0_5.isg'],
  ['TARGET_NATIVE','research/glycan-cleavage/2026-09-27/GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg']
];
const coldPromptPath='experiments/032/COLD_PROMPT.md';
const sourcePath='research/glycan-cleavage/2026-09-27/GLYCAN_CLEAVAGE_SOURCE_FREEZE_0_1.md';
const verifierPromptPath='experiments/032/VERIFIER_PROMPT.md';

function frozen(path){
  return execFileSync('git',['show',SHA+':'+path],{encoding:'utf8',maxBuffer:128*1024*1024});
}
function blob(path){
  return execFileSync('git',['hash-object',path],{encoding:'utf8'}).trim();
}
function sha256(value){
  return crypto.createHash('sha256').update(value).digest('hex');
}
function manifestEntry(alias,path,value){
  return {alias,path,blob_sha:blob(path),sha256:sha256(value),bytes:Buffer.byteLength(value)};
}
function modelList(value,fallback){
  return [...new Set((value||fallback).split(',').map(x=>x.trim()).filter(Boolean))];
}
function extractJson(raw){
  let value=raw.trim().replace(/^\x60\x60\x60(?:json)?\s*/i,'').replace(/\s*\x60\x60\x60$/,'');
  const first=value.indexOf('{');
  const last=value.lastIndexOf('}');
  if(first>=0&&last>=first) value=value.slice(first,last+1);
  return JSON.parse(value);
}

for(const [path,expected] of Object.entries(expectedBlobs)){
  const actual=blob(path);
  if(actual!==expected) throw new Error('blob mismatch '+path+' expected '+expected+' actual '+actual);
  frozen(path);
}
frozen(coldPromptPath);
frozen(verifierPromptPath);

const forbiddenColdPaths=[
  sourcePath,
  'research/glycan-cleavage/2026-09-27/GLYCAN_CLEAVAGE_PRIMITIVE_AUDIT_0_1.md',
  'research/glycan-cleavage/2026-09-27/GLYCAN_CLEAVAGE_PRIMITIVE_CLOSURE_LEDGER_0_1.md',
  verifierPromptPath,
  'AGENTS.md','README.md','STATUS.md'
];
for(const p of forbiddenColdPaths){
  if(coldFiles.some(x=>x[1]===p)||coldPromptPath===p) throw new Error('forbidden cold input '+p);
}

const coldManifest=[];
const coldChunks=[
  'ISOGRAPH EXPERIMENT 032 — NATIVE-ONLY PRIMITIVE RECONSTRUCTION\n'+
  'Frozen repository SHA: '+SHA+'\n'+
  'Isolation: use only these delimited aliases. No source-domain statement, author audit, expected reconstruction, DP/NEI output, or repository guidance is supplied.\n'
];
for(const [alias,path] of coldFiles){
  const value=frozen(path);
  coldManifest.push(manifestEntry(alias,path,value));
  coldChunks.push('\n===== BEGIN '+alias+' =====\n'+value+'\n===== END '+alias+' =====\n');
}
const coldPrompt=frozen(coldPromptPath);
coldManifest.push(manifestEntry('GOVERNING_PROMPT',coldPromptPath,coldPrompt));
coldChunks.push('\n===== BEGIN GOVERNING_PROMPT =====\n'+coldPrompt+'\n===== END GOVERNING_PROMPT =====\n');
const coldPacket=coldChunks.join('');
const forbiddenColdWords=['glycan','residue','enzyme','enzymatic','cleavage','exoglycosidase'];
const coldWordHits=forbiddenColdWords.filter(w=>new RegExp('\\b'+w+'\\b','i').test(coldPacket));
if(coldWordHits.length) throw new Error('cold packet domain leakage '+coldWordHits.join(','));

fs.writeFileSync(OUT+'/COLD_INPUT_MANIFEST.json',JSON.stringify(coldManifest,null,2)+'\n');

const dry={
  experiment:'032',
  source_sha:SHA,
  expected_blobs:expectedBlobs,
  cold_packet_sha256:sha256(coldPacket),
  cold_input_manifest:coldManifest,
  cold_domain_word_hits:coldWordHits,
  source_excluded_from_cold:true,
  author_audit_excluded_from_cold:true,
  verifier_prompt_excluded_from_cold:true
};
fs.writeFileSync(OUT+'/DRY_RUN.json',JSON.stringify(dry,null,2)+'\n');

if(DRY){
  console.log(JSON.stringify(dry,null,2));
  process.exit(0);
}

const decoderModels=modelList(
  process.env.GEMINI_DECODER_MODELS,
  'gemini-3-flash-preview,gemini-3.8-flash,gemini-3.7-flash,gemini-3.6-flash,gemini-3.1-pro-preview,gemini-pro-latest'
);
const verifierModels=modelList(
  process.env.GEMINI_VERIFIER_MODELS,
  'gemini-3.1-pro-preview,gemini-3-flash-preview,gemini-3.8-flash,gemini-3.7-flash,gemini-pro-latest'
);

async function callGemini(packet,candidates,label){
  const calls=[];
  const failures=[];
  for(const model of candidates){
    for(let attempt=1;attempt<=3;attempt++){
      const request={
        contents:[{role:'user',parts:[{text:packet}]}],
        generationConfig:{
          candidateCount:1,
          maxOutputTokens:32768,
          temperature:0.1,
          responseMimeType:'application/json'
        }
      };
      const url='https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent';
      let response;
      let body='';
      try{
        response=await fetch(url,{
          method:'POST',
          headers:{'Content-Type':'application/json','x-goog-api-key':KEY},
          body:JSON.stringify(request)
        });
        body=await response.text();
      }catch(error){
        failures.push({label,model,attempt,status:null,error:String(error)});
        if(attempt<2){await new Promise(r=>setTimeout(r,8000));continue;}
        break;
      }
      calls.push({label,model,attempt,status:response.status});
      if(response.ok){
        const data=JSON.parse(body);
        const raw=(data.candidates?.[0]?.content?.parts||[])
          .filter(part=>!part.thought)
          .map(part=>part.text||'')
          .join('')
          .trim();
        return {label,model,attempt,status:response.status,body,data,raw,calls,failures};
      }
      failures.push({label,model,attempt,status:response.status,body_prefix:body.slice(0,500)});
      if(response.status===429||[500,502,503,504].includes(response.status)){
        if(attempt<3){await new Promise(r=>setTimeout(r,10000*attempt));continue;}
      }
      break;
    }
  }
  throw new Error(label+' provider exhaustion '+JSON.stringify(failures).slice(0,5000));
}

try{
  const cold=await callGemini(coldPacket,decoderModels,'decoder');
  fs.writeFileSync(OUT+'/COLD_RECONSTRUCTION_RAW.txt',cold.raw+'\n');
  const coldParsed=extractJson(cold.raw);
  fs.writeFileSync(OUT+'/COLD_RECONSTRUCTION.json',JSON.stringify(coldParsed,null,2)+'\n');

  const local=coldParsed&&typeof coldParsed.local_semantics==='object'&&!Array.isArray(coldParsed.local_semantics)
    ? Object.keys(coldParsed.local_semantics).sort()
    : [];
  const expectedLocal=Array.from({length:20},(_,i)=>String(181000+i));
  if(JSON.stringify(local)!==JSON.stringify(expectedLocal)){
    throw new Error('cold reconstruction local ID coverage mismatch '+JSON.stringify(local));
  }

  const coldMeta={
    experiment:'032',
    stage:'decoder',
    source_sha:SHA,
    packet_sha256:sha256(coldPacket),
    report_sha256:sha256(cold.raw),
    selected_model:cold.model,
    attempt:cold.attempt,
    http_status:cold.status,
    finish_reason:cold.data.candidates?.[0]?.finishReason??null,
    usage:cold.data.usageMetadata??null,
    calls:cold.calls,
    failures:cold.failures
  };
  fs.writeFileSync(OUT+'/COLD_METADATA.json',JSON.stringify(coldMeta,null,2)+'\n');

  const verifierFiles=[
    ['CORE_020_RESEARCH_CONTRACT','CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md'],
    ['PRIMITIVE_ROLE_MAP','research/primitive-logic/PRIMITIVE_LOGIC_KERNEL_0_1.md'],
    ['PRIMITIVE_KERNEL_NATIVE','research/primitive-logic/PRIMITIVE_LOGIC_KERNEL_0_1.isg'],
    ['FINITE_DATA_NATIVE','research/primitive-logic/PRIMITIVE_DATA_CONSTRUCTORS_0_5.isg'],
    ['NATURAL_ARITHMETIC_NATIVE','research/primitive-logic/PRIMITIVE_NATURAL_ARITHMETIC_0_5.isg'],
    ['TARGET_NATIVE','research/glycan-cleavage/2026-09-27/GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg'],
    ['FROZEN_SOURCE',sourcePath]
  ];
  const verifierManifest=[];
  const verifierChunks=[
    'ISOGRAPH EXPERIMENT 032 — ISOLATED SOURCE/RECONSTRUCTION COMPARISON\n'+
    'Frozen repository SHA: '+SHA+'\n'
  ];
  for(const [alias,path] of verifierFiles){
    const value=frozen(path);
    verifierManifest.push(manifestEntry(alias,path,value));
    verifierChunks.push('\n===== BEGIN '+alias+' =====\n'+value+'\n===== END '+alias+' =====\n');
  }
  verifierChunks.push('\n===== BEGIN FROZEN_COLD_RECONSTRUCTION =====\n'+JSON.stringify(coldParsed,null,2)+'\n===== END FROZEN_COLD_RECONSTRUCTION =====\n');
  const verifyPrompt=frozen(verifierPromptPath);
  verifierManifest.push(manifestEntry('VERIFIER_PROMPT',verifierPromptPath,verifyPrompt));
  verifierChunks.push('\n===== BEGIN VERIFIER_PROMPT =====\n'+verifyPrompt+'\n===== END VERIFIER_PROMPT =====\n');
  const verifierPacket=verifierChunks.join('');
  fs.writeFileSync(OUT+'/VERIFIER_INPUT_MANIFEST.json',JSON.stringify(verifierManifest,null,2)+'\n');

  const verify=await callGemini(verifierPacket,verifierModels,'verifier');
  fs.writeFileSync(OUT+'/VERIFIER_REPORT_RAW.txt',verify.raw+'\n');
  const verifyParsed=extractJson(verify.raw);
  fs.writeFileSync(OUT+'/VERIFIER_REPORT.json',JSON.stringify(verifyParsed,null,2)+'\n');

  const checks=verifyParsed&&typeof verifyParsed.checks==='object'&&!Array.isArray(verifyParsed.checks)
    ? Object.values(verifyParsed.checks)
    : [];
  const arraysEmpty=['missing_source_semantics','unsupported_semantic_additions','mismatches','load_bearing_unresolved']
    .every(k=>Array.isArray(verifyParsed?.[k])&&verifyParsed[k].length===0);
  const pass=
    verifyParsed?.verdict==='PASS'&&
    verifyParsed?.source_reconstruction==='PASS'&&
    verifyParsed?.primitive_closure==='PASS'&&
    checks.length===18&&
    checks.every(x=>x==='PASS')&&
    arraysEmpty;

  const verifyMeta={
    experiment:'032',
    stage:'verifier',
    source_sha:SHA,
    packet_sha256:sha256(verifierPacket),
    report_sha256:sha256(verify.raw),
    selected_model:verify.model,
    attempt:verify.attempt,
    http_status:verify.status,
    finish_reason:verify.data.candidates?.[0]?.finishReason??null,
    usage:verify.data.usageMetadata??null,
    calls:verify.calls,
    failures:verify.failures
  };
  fs.writeFileSync(OUT+'/VERIFIER_METADATA.json',JSON.stringify(verifyMeta,null,2)+'\n');

  const result={
    experiment:'032',
    source_sha:SHA,
    disposition:pass?'PASS':'FAIL',
    mechanical:'PASS',
    cold_reconstruction:'FROZEN',
    verifier_verdict:verifyParsed?.verdict??null,
    source_reconstruction:verifyParsed?.source_reconstruction??null,
    primitive_closure:verifyParsed?.primitive_closure??null,
    all_targeted_checks_pass:checks.length===18&&checks.every(x=>x==='PASS'),
    mismatch_arrays_empty:arraysEmpty,
    decoder_model:cold.model,
    verifier_model:verify.model,
    cold_packet_sha256:sha256(coldPacket),
    cold_report_sha256:sha256(cold.raw),
    verifier_packet_sha256:sha256(verifierPacket),
    verifier_report_sha256:sha256(verify.raw)
  };
  fs.writeFileSync(OUT+'/RESULT.json',JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify(result,null,2));
  if(!pass) process.exitCode=1;
}catch(error){
  fs.writeFileSync(OUT+'/RUN_FAILURE.json',JSON.stringify({
    experiment:'032',
    source_sha:SHA,
    error:String(error),
    stack:error?.stack??null
  },null,2)+'\n');
  throw error;
}
