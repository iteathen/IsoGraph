import fs from 'node:fs';

const RUN='RUN-Q006-R4';
const OUT='out/q006r4';
const reportPath=`${OUT}/${RUN}_PARSED_REPORT.json`;
const scorePath=`${OUT}/${RUN}_SCORE.json`;
const scoreMdPath=`${OUT}/${RUN}_SCORE.md`;
const assertions=JSON.parse(fs.readFileSync('experiments/006/Q006_ASSERTIONS.json','utf8'));
const cfg=assertions.dp;

function norm(v){return String(v??'').trim().toUpperCase();}
function set(v){return new Set((Array.isArray(v)?v:[]).map(String));}
function overlap(v,arr){const s=set(v);return arr.filter(x=>s.has(x)).length;}
function presentText(v){return typeof v==='string' && v.trim().length>=4 && norm(v)!=='NONE';}
function hasFindingForPass(p, findings){
  return findings.some(f=>overlap(f.alpha_steps,p.alpha_steps||[])>=Math.min(1,(p.alpha_steps||[]).length) && overlap(f.beta_steps,p.beta_steps||[])>=Math.min(1,(p.beta_steps||[]).length));
}

fs.mkdirSync(OUT,{recursive:true});
if(!fs.existsSync(reportPath)){
  const score={run:RUN,execution_status:'NO_PARSED_REPORT',disposition:'DOES_NOT_QUALIFY'};
  fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');
  fs.writeFileSync(scoreMdPath,'# R4 Score\n\nNo parsed report.\n');
  console.log(JSON.stringify(score)); process.exit(0);
}
const r=JSON.parse(fs.readFileSync(reportPath,'utf8'));
const findings=Array.isArray(r.findings)?r.findings:[];
const motifResults={};
for(const [id,m] of Object.entries(cfg.motifs)){
  let idx=null;
  for(let i=0;i<findings.length;i++){
    const f=findings[i];
    if(overlap(f.alpha_steps,m.alpha)>=m.min_alpha_overlap && overlap(f.beta_steps,m.beta)>=m.min_beta_overlap){idx=i;break;}
  }
  motifResults[id]={matched:idx!==null,finding_index:idx};
}
const matched=Object.entries(motifResults).filter(([,v])=>v.matched).map(([k])=>k);
const deep=matched.filter(x=>cfg.deep_motifs.includes(x));
const alphaResidual=[...new Set((Array.isArray(r.alpha_residual_steps)?r.alpha_residual_steps:[]).filter(x=>cfg.alpha_residual_pool.includes(String(x))).map(String))];
const betaResidual=[...new Set((Array.isArray(r.beta_residual_steps)?r.beta_residual_steps:[]).filter(x=>cfg.beta_residual_pool.includes(String(x))).map(String))];
const rejected=new Set((Array.isArray(r.rejected_overclaims)?r.rejected_overclaims:[]).map(norm));
const missingReject=cfg.required_rejected_overclaims.filter(x=>!rejected.has(norm(x)));

const gate=r.cross_residual_pass&&typeof r.cross_residual_pass==='object'?r.cross_residual_pass:{};
const rolePasses=Array.isArray(gate.role_passes)?gate.role_passes:[];
let deepRolePass=false;
const unhandledCorrespondences=[];
for(const p of rolePasses){
  const result=norm(p.result);
  const disp=norm(p.candidate_disposition);
  if(result==='CORRESPONDENCE'){
    for(const id of cfg.deep_motifs){const m=cfg.motifs[id]; if(overlap(p.alpha_steps,m.alpha)>=m.min_alpha_overlap && overlap(p.beta_steps,m.beta)>=m.min_beta_overlap){deepRolePass=true;}}
    if(['PROMOTED','EXPANDED'].includes(disp)){
      if(!hasFindingForPass(p,findings)) unhandledCorrespondences.push({role:p.role??null,reason:'promoted/expanded correspondence absent from findings'});
    } else if(disp==='FALSIFIED') {
      const br=p.breaker&&typeof p.breaker==='object'?p.breaker:{};
      if(norm(br.obligation_kind)==='NONE'||!presentText(br.left_evidence)||!presentText(br.right_evidence)||!presentText(br.failure)) unhandledCorrespondences.push({role:p.role??null,reason:'falsified correspondence lacks concrete breaker'});
    } else {
      unhandledCorrespondences.push({role:p.role??null,reason:`correspondence disposition ${disp||'<missing>'} does not re-enter candidate path`});
    }
  }
}

const sep=r.separator&&typeof r.separator==='object'?r.separator:{};
const sepKind=norm(sep.kind);
const neiResult=norm(sep.nei_result_if_load_bearing);
const stopKind=norm(r.stop_kind);
const br=sep.breaker&&typeof sep.breaker==='object'?sep.breaker:{};
const breakerConcrete=norm(br.obligation_kind)!=='NONE' && presentText(br.left_evidence) && presentText(br.right_evidence) && presentText(br.failure);
let separatorLegal=false;
if(sepKind==='STRUCTURAL_BREAKER') separatorLegal=breakerConcrete;
else if(sepKind==='RIGID_AUTHORITY') separatorLegal=presentText(sep.evidence);
else if(sepKind==='NATURAL_IDENTITY') separatorLegal=neiResult==='DISTINCT' && presentText(sep.evidence);
else if(sepKind==='NONE') separatorLegal=stopKind!=='REJECTED';

const guards={
  finding_width_valid: findings.length>0 && findings.every(f=>Array.isArray(f.alpha_steps)&&Array.isArray(f.beta_steps)&&f.alpha_steps.length>0&&f.beta_steps.length>0&&f.alpha_steps.length<=4&&f.beta_steps.length<=4),
  enough_findings: findings.length>=4,
  enough_motifs: matched.length>=4,
  deep_motif_found: deep.length>=1,
  alpha_residuals_preserved: alphaResidual.length>=2,
  beta_residuals_preserved: betaResidual.length>=2,
  overclaims_rejected: missingReject.length===0,
  supported_candidate: norm(r.promotion)==='SUPPORTED_CANDIDATE',
  falsification_recorded: findings.length>0&&findings.every(f=>presentText(f.falsification)),
  common_core_recorded: Array.isArray(r.common_core)&&r.common_core.length>=2,
  reranking_explained: presentText(r.reranking_reason),
  cross_residual_triggered: gate.triggered===true,
  cross_residual_role_pass_recorded: rolePasses.length>=1,
  cross_residual_deep_correspondence: deepRolePass,
  cross_residual_correspondences_handled: unhandledCorrespondences.length===0,
  separator_legal: separatorLegal,
  structural_breaker_concrete_if_used: sepKind!=='STRUCTURAL_BREAKER'||breakerConcrete,
  stop_kind_legal: ['SUPPORTED_CANDIDATE','CONTINUE','DORMANT','REJECTED'].includes(stopKind),
  dormant_not_false_rejection: stopKind!=='DORMANT'||sepKind==='NONE'
};
const disposition=Object.values(guards).every(Boolean)?'QUALIFIES':'DOES_NOT_QUALIFY';
const score={run:RUN,execution_status:'SCORED',disposition,matched_motifs:matched,deep_motifs_matched:deep,motif_results:motifResults,alpha_residual_hits:alphaResidual,beta_residual_hits:betaResidual,separator:{kind:sepKind,evidence:sep.evidence??null,breaker:br,nei_result_if_load_bearing:neiResult},stop_kind:stopKind,unhandled_cross_residual_correspondences:unhandledCorrespondences,guards};
fs.writeFileSync(scorePath,JSON.stringify(score,null,2)+'\n');
const md=['# Experiment 006 R4 Focused Score','',`- DP 0.4 focused result: **${disposition}**`,`- Motifs: ${matched.join(', ')||'none'}`,`- Deep motifs: ${deep.join(', ')||'none'}`,`- Separator: ${sepKind||'<missing>'}`,`- NEI result if load-bearing: ${neiResult||'<missing>'}`,`- Unhandled cross-residual correspondences: ${unhandledCorrespondences.length}`,'','## Guards'];
for(const [k,v] of Object.entries(guards)) md.push(`- ${k}: ${v?'PASS':'FAIL'}`);
fs.writeFileSync(scoreMdPath,md.join('\n')+'\n');
console.log(JSON.stringify({run:RUN,disposition,matched,deep,separator:sepKind,neiResult,unhandled:unhandledCorrespondences.length}));
