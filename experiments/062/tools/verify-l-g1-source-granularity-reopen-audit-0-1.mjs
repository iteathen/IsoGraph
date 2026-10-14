import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{
  const b=Buffer.from(read(p),'utf8');
  return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
};
const errors=[];
const check=(ok,msg)=>{if(!ok)errors.push(msg);};

const auditPath='experiments/062/L_G1_SOURCE_GRANULARITY_REOPEN_AUDIT_0_1.json';
const extractionPath='experiments/062/L_EXTRACTION_RECONCILED_0_25.json';
const g2Path='experiments/062/L_G2_NEUTRAL_OCCURRENCE_GRAPH_0_1.json';
const sscPath='research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_2.json';
const traversalPath='research/woit-lisi-isomorph/lisi/SOURCE_TRAVERSAL_LEDGER_0_11.json';
const formulaPath='research/woit-lisi-isomorph/lisi/LISI_L05_GENERALIZED_REFLECTION_SOURCE_INSTANCE_0_1.md';
const antiPath='research/woit-lisi-isomorph/lisi/LISI_L05_GENERALIZED_REFLECTION_ANTIINVARIANCE_0_1.md';
const discrepancyPath='research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_TABLE_SOURCE_DISCREPANCY_0_1.json';

const A=json(auditPath);
const E=json(extractionPath);
const G2=json(g2Path);
const SSC=json(sscPath);
const traversal=json(traversalPath);
const discrepancy=json(discrepancyPath);
const formula=read(formulaPath);
const anti=read(antiPath);

check(A.schema==='isograph.exp062-l-g1-source-granularity-reopen-audit.v0.1','schema');
check(A.status==='TARGETED_G1_G2_REOPEN_JUSTIFIED_L130','status');
check(A.authority===false && A.authority_effect==='NONE_RESEARCH_DIAGNOSTIC_ONLY','authority leak');
check(A.track==='L','track');
check(A.governing_method.endsWith('PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_3.md'),'method 0.3');
check(JSON.stringify(A.scope?.census_ids)===JSON.stringify(['L-SSC-130']),'scope');
check(A.scope?.cross_track_semantics_used===false && A.scope?.W_semantics_used===false && A.scope?.synthesis_semantics_used===false,'cross-track/synthesis leakage');

for(const [path,rec] of Object.entries(A.pinned_inputs||{})){
  check(fs.existsSync(path),'missing pinned input '+path);
  if(fs.existsSync(path))check(blobSha(path)===rec.git_blob_sha,'blob pin mismatch '+path);
}

const s=SSC.items.find(x=>x.id==='L-SSC-130');
check(!!s,'L130 absent from SSC');
check(s?.source_provenance==='L05 §3','L130 provenance');
check(/individual generalized reflections are anti-invariant/.test(s?.body||''),'anti-invariance absent from SSC');
check(/even compositions yield triality-group transformations preserving T/.test(s?.body||''),'even-composition preservation absent from SSC');

const l05=traversal.sources?.find(x=>x.id==='L05');
check(!!l05 && l05.state==='COMPLETE_CENSUSED_FROZEN','L05 traversal not frozen complete');
const covered=(l05?.covered||[]).join('\n');
check(/generalized vector\/spinor reflections/.test(covered),'L05 reflection formulas not traversed');
check(/triality cubic form/.test(covered),'L05 triality form not traversed');

const item=E.items.find(x=>x.census_id==='L-SSC-130');
check(!!item && item.extraction_status==='COMPLETE','current L130 G1 absent/incomplete');
check((item?.occurrences||[]).length===8,'unexpected current L130 occurrence count');
const occIds=(item?.occurrences||[]).map(x=>x.occurrence_id);
check(occIds.includes('L-SSC-130-O01')&&occIds.includes('L-SSC-130-O08'),'current L130 occurrence range');
const currentText=JSON.stringify(item);
check(!/R_v\^u|R_m\^u|R_p\^u/.test(currentText),'current G1 unexpectedly exposes ordered reflection formulas');

const g2Item=G2.items.find(x=>x.census_id==='L-SSC-130');
check(!!g2Item,'current L130 G2 absent');
const occurrenceNodes=(g2Item?.graph?.nodes||[]).filter(n=>n.kind==='OPAQUE_SEMANTIC_OCCURRENCE');
check(occurrenceNodes.length===8,'current G2 does not preserve eight opaque L130 roots');
check((g2Item?.graph?.nodes||[]).every(n=>['OPAQUE_SEMANTIC_OCCURRENCE','ORDERED_ARGUMENT_SLOT'].includes(n.kind)),'current G2 already contains unaccounted internal formula node kind');

for(const token of ['R_v^u:','R_m^u:','R_p^u:','s_u = +1  -> phase = 1','s_u = -1  -> phase = i']){
  check(formula.includes(token),'source-local reflection formula evidence missing: '+token);
}
for(const token of [
  'T(R_v v, R_v chi, R_v psi) = -T(v, chi, psi)',
  'T(R_m chi, R_m psi, R_m v) = -T(chi, psi, v)',
  'T(R_p psi, R_p v, R_p chi) = -T(psi, v, chi)'
]){
  check(anti.includes(token),'source-local anti-invariance evidence missing: '+token);
}
check(/even generalized-reflection compositions/.test(anti),'source-local even-composition clause missing');

check(discrepancy.status==='SOURCE_INTERNAL_DISCREPANCY','ordinary-O discrepancy status');
check(discrepancy.representation_policy?.exact_source_table_preserved===true,'ordinary-O source table not preserved');
check(discrepancy.representation_policy?.inconsistency_not_repaired_for_track_L===true,'ordinary-O repair leakage');
check(discrepancy.repair_diagnostics?.candidates?.some(x=>x.disposition==='PROJECT_GENERATED_REPAIR_CANDIDATE_NOT_SOURCE'),'ordinary-O negative control missing');

check(A.decision?.disposition==='REOPEN_G1_G2_FOR_L130_ONLY','audit ruling');
check(A.decision?.unaffected_L_items_remain_pinned_to===extractionPath,'unaffected pin');
check((A.decision?.next_steps||[]).some(x=>/Re-run G3/.test(x)),'G3 replay missing');
check((A.decision?.next_steps||[]).some(x=>/Only if residual behavior remains/.test(x)),'premature hypothesis promotion');
check(A.third_party_testing?.deterministic_repository_verification_required===true,'deterministic verification weakened');

const auditText=JSON.stringify(A);
check(!/W-SSC-/.test(auditText),'W occurrence leaked');
check(!/research\/woit-lisi-isomorph\/woit\//.test(auditText),'W source path leaked');
check(!/"authority":true/.test(auditText),'authority overclaim');

console.log(JSON.stringify({
  schema:'isograph.exp062-l-g1-source-granularity-reopen-audit-verifier.v0.1',
  pass:errors.length===0,
  errors,
  target:'L-SSC-130',
  current_g1_occurrences:(item?.occurrences||[]).length,
  current_g2_opaque_roots:occurrenceNodes.length,
  ruling:A.decision?.disposition,
  third_party_testing_required:false,
  deterministic_repository_verification_required:true
},null,2));
if(errors.length)process.exit(1);
