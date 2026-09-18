import fs from 'node:fs';
import { assessRejectedOverclaims } from '../../../tools/qualification/semantic-rejections.mjs';

const OUT=process.env.EXP008_OUT || 'out/exp008';
const reportPath=`${OUT}/EXP008_PARSED_REPORT.json`;
const scorePath=`${OUT}/EXP008_SCORE.json`;
const cfg=JSON.parse(fs.readFileSync('experiments/008/ASSERTIONS.json','utf8'));

function norm(v){return String(v??'').trim().toUpperCase();}
function toSet(v){return new Set((Array.isArray(v)?v:[]).map(String));}
function overlap(v,arr){const s=toSet(v);return arr.filter(x=>s.has(x)).length;}
function presentText(v){return typeof v==='string' && v.trim().length>=4;}
function uniq(arr){return [...new Set(arr.map(String))];}

fs.mkdirSync(OUT,{recursive:true});
if(!fs.existsSync(reportPath)){
  const score={run:'EXP008',execution_status:'NO_PARSED_REPORT',disposition:'DOES_NOT_QUALIFY'};
  fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');
  console.log(JSON.stringify(score));
  process.exit(0);
}

const r=JSON.parse(fs.readFileSync(reportPath,'utf8'));
const findings=Array.isArray(r.findings)?r.findings:[];

function boundedUnits(){
  const units=[];
  for(let i=0;i<findings.length;i++){
    const f=findings[i]||{};
    const a=uniq(Array.isArray(f.alpha_steps)?f.alpha_steps:[]);
    const b=uniq(Array.isArray(f.beta_steps)?f.beta_steps:[]);
    units.push({alpha_steps:a,beta_steps:b,components:[i]});
  }
  for(let i=0;i<findings.length;i++){
    for(let j=i+1;j<findings.length;j++){
      const a=uniq([...(findings[i]?.alpha_steps||[]),...(findings[j]?.alpha_steps||[])]);
      const b=uniq([...(findings[i]?.beta_steps||[]),...(findings[j]?.beta_steps||[])]);
      if(a.length<=cfg.max_steps_per_side_per_finding && b.length<=cfg.max_steps_per_side_per_finding){
        units.push({alpha_steps:a,beta_steps:b,components:[i,j]});
      }
    }
  }
  return units;
}

const units=boundedUnits();
const motifResults={};
for(const [id,m] of Object.entries(cfg.motifs)){
  let match=null;
  for(const u of units){
    if(overlap(u.alpha_steps,m.alpha)>=m.min_alpha_overlap && overlap(u.beta_steps,m.beta)>=m.min_beta_overlap){
      match=u;
      break;
    }
  }
  motifResults[id]={matched:!!match,components:match?.components??null};
}
const matched=Object.entries(motifResults).filter(([,v])=>v.matched).map(([k])=>k);
const deep=matched.filter(x=>cfg.deep_motifs.includes(x));

const alphaResidual=uniq((r.alpha_residual_steps||[]).filter(x=>cfg.alpha_residual_pool.includes(String(x))));
const betaResidual=uniq((r.beta_residual_steps||[]).filter(x=>cfg.beta_residual_pool.includes(String(x))));
const rejectionAudit=assessRejectedOverclaims(r.rejected_overclaims,cfg.required_rejected_overclaims);

const widthValid=findings.length>0 && findings.every(f=>{
  const a=Array.isArray(f.alpha_steps)?uniq(f.alpha_steps):[];
  const b=Array.isArray(f.beta_steps)?uniq(f.beta_steps):[];
  return a.length>0 && b.length>0 &&
    a.length<=cfg.max_steps_per_side_per_finding &&
    b.length<=cfg.max_steps_per_side_per_finding;
});

const guards={
  finding_width_valid:widthValid,
  enough_findings:findings.length>=3,
  enough_motifs:matched.length>=cfg.minimum_motifs,
  deep_motif_found:deep.length>=1,
  alpha_residuals_preserved:alphaResidual.length>=cfg.minimum_alpha_residuals,
  beta_residuals_preserved:betaResidual.length>=cfg.minimum_beta_residuals,
  residual_explanation_present:presentText(r.residual_explanation),
  semantic_overclaims_rejected:rejectionAudit.semantic_coverage_complete,
  supported_candidate:norm(r.promotion)===norm(cfg.expected_promotion),
  falsification_recorded:findings.length>0 && findings.every(f=>presentText(f.falsification)),
  common_core_recorded:Array.isArray(r.common_core)&&r.common_core.length>=3,
  protocols_recorded:Array.isArray(r.protocols_used)&&r.protocols_used.length>=2,
  reranking_explained:presentText(r.reranking_reason),
  stop_reason_present:presentText(r.stop_reason)
};

const disposition=Object.values(guards).every(Boolean)?'QUALIFIES':'DOES_NOT_QUALIFY';
const score={
  run:'EXP008',
  execution_status:'SCORED',
  disposition,
  matched_motifs:matched,
  deep_motifs_matched:deep,
  motif_results:motifResults,
  alpha_residual_hits:alphaResidual,
  beta_residual_hits:betaResidual,
  rejection_audit:rejectionAudit,
  serializer_diagnostics:{
    exact_canonical_string_coverage_complete:rejectionAudit.exact_canonical_string_coverage_complete
  },
  guards
};
fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');
console.log(JSON.stringify({
  run:'EXP008',
  disposition,
  matched,
  deep,
  semantic_rejection_coverage:rejectionAudit.semantic_coverage_complete,
  exact_canonical_string_coverage:rejectionAudit.exact_canonical_string_coverage_complete,
  guards
}));
