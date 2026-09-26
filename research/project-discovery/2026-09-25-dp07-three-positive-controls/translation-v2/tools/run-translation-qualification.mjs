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
const AUTHORITY_FILES=[
  'CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md',
  'CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md',
  'CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md'
];
const CONTRACT_FILE='qualification/EXACT_SOURCE_RENDERING_CONTRACT_0_1_CANDIDATE.md';

function frozen(p){return execFileSync('git',['show',`${SHA}:${p}`],{encoding:'utf8',maxBuffer:128*1024*1024});}
function hash(s){return crypto.createHash('sha256').update(s).digest('hex');}
function exactOneReplace(native,from,to,id){
  const count=native.split(from).length-1;
  if(count!==1)throw new Error(`${id}: expected exactly one mutation source occurrence; got ${count}`);
  const changed=native.replace(from,to);
  if(changed===native)throw new Error(`${id}: mutation did not change native`);
  return changed;
}

async function callGemini(packet,temp=0.05){
  const request={
    contents:[{role:'user',parts:[{text:packet}]}],
    generationConfig:{
      candidateCount:1,
      maxOutputTokens:24000,
      temperature:temp,
      responseMimeType:'application/json',
      thinkingConfig:{thinkingLevel:'HIGH'}
    }
  };
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
    if([500,502,503,504].includes(status)&&i<7){
      await new Promise(x=>setTimeout(x,15000*(i+1)));
      continue;
    }
    break;
  }
  if(!(status>=200&&status<300))throw new Error('Gemini HTTP '+status+' '+txt.slice(0,500));
  const data=JSON.parse(txt);
  const raw=(data.candidates?.[0]?.content?.parts||[]).filter(p=>!p.thought).map(p=>p.text||'').join('').trim();
  let parsed;
  try{parsed=JSON.parse(raw);}catch(e){throw new Error('Malformed JSON output: '+raw.slice(0,800));}
  return {parsed,raw,status,attempts,usage:data.usageMetadata??null};
}

fs.mkdirSync(OUT,{recursive:true});

const authorities=AUTHORITY_FILES.map(p=>({path:p,text:frozen(p)}));
const contract=frozen(CONTRACT_FILE);
const coldPrompt=frozen(`${ROOT}/COLD_RECONSTRUCTION_PROMPT.md`);
const verifierPrompt=frozen(`${ROOT}/VERIFIER_PROMPT.md`);
const obligations=JSON.parse(frozen(`${ROOT}/hidden/OBLIGATIONS.json`));
const coverage=JSON.parse(frozen(`${ROOT}/hidden/COVERAGE_MAP.json`));
const mutations=JSON.parse(frozen(`${ROOT}/hidden/MUTATIONS.json`));

const preflight=JSON.parse(fs.readFileSync(`${OUT}/NATIVE_AUDIT.json`,'utf8'));
if(preflight.disposition!=='PASS')throw new Error('native ESR preflight failed');

const dryManifest=[];
for(const {path:p,text:t} of authorities){
  dryManifest.push({kind:'authority',path:p,sha256:hash(t),bytes:Buffer.byteLength(t)});
}
dryManifest.push({kind:'qualification_contract',path:CONTRACT_FILE,sha256:hash(contract),bytes:Buffer.byteLength(contract)});
for(const p of [
  `${ROOT}/COLD_RECONSTRUCTION_PROMPT.md`,
  `${ROOT}/VERIFIER_PROMPT.md`,
  `${ROOT}/hidden/OBLIGATIONS.json`,
  `${ROOT}/hidden/COVERAGE_MAP.json`,
  `${ROOT}/hidden/MUTATIONS.json`
]){
  const t=frozen(p);
  dryManifest.push({kind:p.includes('/hidden/')?'scorer_only':'qualification_control',path:p,sha256:hash(t),bytes:Buffer.byteLength(t)});
}
for(const id of CASES){
  for(const p of [`${ROOT}/${id}/SOURCE_FREEZE.md`,`${ROOT}/${id}/NATIVE.isg`,`${ROOT}/${id}/SIGNATURE.json`]){
    const t=frozen(p);
    dryManifest.push({kind:p.endsWith('SOURCE_FREEZE.md')?'scorer_only_source':'decoder_input',case_id:id,path:p,sha256:hash(t),bytes:Buffer.byteLength(t)});
  }
}

const dry={
  schema:2,
  contract:'ESR-0.1',
  sha:SHA,
  model:MODEL,
  cases:CASES,
  input_manifest:dryManifest,
  oracle_paths:[`${ROOT}/hidden/OBLIGATIONS.json`,`${ROOT}/hidden/MUTATIONS.json`],
  oracle_exposed_to_decoder:false,
  source_exposed_to_decoder:false,
  core_0_19_exact_rendering:true,
  required_cold_decoders_per_case:2,
  required_mutation_controls_per_case:2
};
fs.writeFileSync(`${OUT}/DRY_RUN.json`,JSON.stringify(dry,null,2)+'\n');
if(DRY){console.log(JSON.stringify(dry));process.exit(0);}

const authorityPacket=authorities.map(x=>`===== BEGIN AUTHORITY: ${x.path} =====\n${x.text}\n===== END AUTHORITY =====`).join('\n\n');
const decodeResults={};
const mutationMap={};

for(const id of CASES){
  const native=frozen(`${ROOT}/${id}/NATIVE.isg`);
  const signature=frozen(`${ROOT}/${id}/SIGNATURE.json`);
  const muts=mutations.cases[id]||[];
  if(muts.length<2)throw new Error(id+': need at least two mutation controls');

  const variants=muts.map((m,i)=>({
    variant_id:`variant-${i+1}`,
    mutation_id:m.id,
    description:m.description,
    native:exactOneReplace(native,m.from,m.to,`${id}/${m.id}`)
  }));
  mutationMap[id]=variants.map(v=>({variant_id:v.variant_id,mutation_id:v.mutation_id,description:v.description}));

  const variantText=variants.map(v=>`===== BEGIN ${v.variant_id.toUpperCase()} NATIVE =====\n${v.native}\n===== END ${v.variant_id.toUpperCase()} NATIVE =====`).join('\n\n');
  const packet=`ISOGRAPH EXACT SOURCE-RENDERING COLD RECONSTRUCTION\nCASE ID: ${id}\nFROZEN SHA: ${SHA}\nMODEL: ${MODEL}\n\n${authorityPacket}\n\n===== BEGIN GLOSS-ONLY SIGNATURE =====\n${signature}\n===== END SIGNATURE =====\n\n===== BEGIN BASE NATIVE =====\n${native}\n===== END BASE NATIVE =====\n\n${variantText}\n\n===== BEGIN GOVERNING COLD PROMPT =====\n${coldPrompt}\n===== END GOVERNING COLD PROMPT =====`;

  const packetHash=hash(packet);
  fs.writeFileSync(`${OUT}/${id}-PACKET.sha256`,packetHash+'\n');

  const A=await callGemini(packet,0.02);
  await new Promise(x=>setTimeout(x,2500));
  const B=await callGemini(packet,0.18);
  await new Promise(x=>setTimeout(x,2500));

  fs.writeFileSync(`${OUT}/${id}-DECODER-A.json`,JSON.stringify(A.parsed,null,2)+'\n');
  fs.writeFileSync(`${OUT}/${id}-DECODER-B.json`,JSON.stringify(B.parsed,null,2)+'\n');
  decodeResults[id]={
    packet_sha256:packetHash,
    A:A.parsed,B:B.parsed,
    A_meta:{attempts:A.attempts,usage:A.usage},
    B_meta:{attempts:B.attempts,usage:B.usage}
  };
}
fs.writeFileSync(`${OUT}/MUTATION_MAP.json`,JSON.stringify(mutationMap,null,2)+'\n');

const verifications={};
for(const id of CASES){
  const source=frozen(`${ROOT}/${id}/SOURCE_FREEZE.md`);
  const obs=obligations.cases[id];
  const d=decodeResults[id];
  const muts=mutationMap[id];
  const packet=`ISOGRAPH EXACT SOURCE-RENDERING SAMENESS VERIFICATION\nCASE ID: ${id}\nFROZEN SHA: ${SHA}\n\n===== EXACT RENDERING CONTRACT =====\n${contract}\n===== END CONTRACT =====\n\n===== FROZEN SOURCE =====\n${source}\n===== END SOURCE =====\n\n===== BASE SOURCE OBLIGATIONS =====\n${JSON.stringify(obs,null,2)}\n===== END OBLIGATIONS =====\n\n===== MUTATION SCORER MAP =====\n${JSON.stringify(muts,null,2)}\n===== END MUTATION SCORER MAP =====\n\n===== DECODER A =====\n${JSON.stringify(d.A,null,2)}\n===== END DECODER A =====\n\n===== DECODER B =====\n${JSON.stringify(d.B,null,2)}\n===== END DECODER B =====\n\n===== VERIFIER PROMPT =====\n${verifierPrompt}\n===== END VERIFIER PROMPT =====`;

  const V=await callGemini(packet,0.0);
  await new Promise(x=>setTimeout(x,2500));
  fs.writeFileSync(`${OUT}/${id}-VERIFIER.json`,JSON.stringify(V.parsed,null,2)+'\n');
  verifications[id]=V.parsed;
}

function exactBaseDecoder(x,expected){
  const got=(x?.obligations||[]).filter(o=>o.pass===true).map(o=>o.id).sort();
  return x?.exact_same===true &&
    JSON.stringify(got)===JSON.stringify(expected) &&
    Array.isArray(x.missing)&&x.missing.length===0 &&
    Array.isArray(x.additions)&&x.additions.length===0 &&
    Array.isArray(x.distortions)&&x.distortions.length===0 &&
    Array.isArray(x.ambiguities)&&x.ambiguities.length===0;
}

const caseScores=[];
for(const id of CASES){
  const v=verifications[id];
  const expected=(obligations.cases[id]||[]).map(x=>x.id).sort();
  const A=exactBaseDecoder(v.decoder_A,expected);
  const B=exactBaseDecoder(v.decoder_B,expected);

  const expectedMut=(mutationMap[id]||[]).map(x=>x.mutation_id).sort();
  const returned=Array.isArray(v.mutation_controls)?v.mutation_controls:[];
  const returnedIds=returned.map(x=>x.mutation_id).sort();
  const mutationsComplete=JSON.stringify(expectedMut)===JSON.stringify(returnedIds);
  const mutationsPass=mutationsComplete && returned.every(x=>x.decoder_A_preserved===true && x.decoder_B_preserved===true);

  const pass=
    A&&B&&
    v.cross_decoder_consistent===true&&
    v.translation_pass===true&&
    mutationsPass;

  caseScores.push({
    case_id:id,
    decoder_A_exact:A,
    decoder_B_exact:B,
    cross_decoder_consistent:v.cross_decoder_consistent===true,
    mutation_controls_complete:mutationsComplete,
    mutation_controls_pass:mutationsPass,
    verifier_translation_pass:v.translation_pass===true,
    pass
  });
}

const disposition=caseScores.every(x=>x.pass)?'EXACT_SOURCE_RENDERINGS_QUALIFY':'EXACT_SOURCE_RENDERINGS_DO_NOT_QUALIFY';
const score={
  schema:2,
  contract:'ESR-0.1',
  core_revision:SHA,
  disposition,
  native_preflight:preflight.disposition,
  case_scores:caseScores
};
fs.writeFileSync(`${OUT}/SCORE.json`,JSON.stringify(score,null,2)+'\n');
fs.writeFileSync(`${OUT}/METADATA.json`,JSON.stringify({
  schema:2,sha:SHA,model:MODEL,contract:'ESR-0.1',
  authority_hashes:Object.fromEntries(authorities.map(x=>[x.path,hash(x.text)])),
  contract_sha256:hash(contract),
  coverage_map_sha256:hash(JSON.stringify(coverage)),
  mutation_map_sha256:hash(JSON.stringify(mutations)),
  case_packet_hashes:Object.fromEntries(Object.entries(decodeResults).map(([k,v])=>[k,v.packet_sha256]))
},null,2)+'\n');
console.log(JSON.stringify(score,null,2));
if(disposition!=='EXACT_SOURCE_RENDERINGS_QUALIFY')process.exitCode=2;
