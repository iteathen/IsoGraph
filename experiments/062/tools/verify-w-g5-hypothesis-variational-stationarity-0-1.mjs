import fs from 'node:fs';

const hypothesisPath='experiments/062/W_G5_HYPOTHESIS_VARIATIONAL_STATIONARITY_0_1.json';
const extractionPath='experiments/062/W_EXTRACTION_RECONCILED_0_18.json';
const g4Path='experiments/062/W_G4_ALPHA_RENAMED_STRUCTURAL_QUOTIENT_0_1.json';
const g5Path='experiments/062/W_G5_CANDIDATE_BASIS_SYNTHESIS_0_1.json';

const H=JSON.parse(fs.readFileSync(hypothesisPath,'utf8'));
const E=JSON.parse(fs.readFileSync(extractionPath,'utf8'));
const G4=JSON.parse(fs.readFileSync(g4Path,'utf8'));
const G5=JSON.parse(fs.readFileSync(g5Path,'utf8'));

const errors=[];
const fail=m=>errors.push(m);
const occ=new Map();
const censusByOcc=new Map();
for(const item of E.items||[]){
  for(const o of item.occurrences||[]){
    occ.set(o.occurrence_id,o);
    censusByOcc.set(o.occurrence_id,item.census_id);
  }
}

if(H.authority!==false) fail('hypothesis must remain non-authoritative');
if(H.hypothesis?.hypothesis_id!=='W-G5-HYP-VAR-001') fail('unexpected hypothesis id');
if(H.hypothesis?.kind!=='PROPOSED_SEMANTIC_EXTENSION_PENDING_G6') fail('hypothesis kind must remain pending G6');
if(H.ia_authorized!==false) fail('IA must remain unauthorized');
if(H.nei_dts_dp_authorized!==false) fail('NEI/DTS/DP must remain unauthorized');

const positive=new Set();
for(const c of H.positive_controls||[]) for(const id of c.occurrence_ids||[]) positive.add(id);
const negative=new Set((H.adversarial_negative_controls||[]).map(x=>x.occurrence_id));
const giveWords=new Set(['give','gives','giving']);
const allGive=[];
for(const [id,o] of occ) if(giveWords.has(String(o.relation_span||'').toLowerCase())) allGive.push(id);
allGive.sort();
const declared=[...positive,...negative].sort();
if(JSON.stringify(allGive)!==JSON.stringify(declared)){
  fail('give/gives/giving control census mismatch: '+JSON.stringify({allGive,declared}));
}

function variationPredicate(id){
  const o=occ.get(id);
  if(!o) return false;
  if(String(o.relation_span).toLowerCase()!=='gives') return false;
  if(!Array.isArray(o.argument_spans)||o.argument_spans.length!==2) return false;
  if(!/\b(?:variation|varying)\b/i.test(o.argument_spans[0])) return false;
  if(!Array.isArray(o.depends_on)||o.depends_on.length!==1) return false;
  const parent=occ.get(o.depends_on[0]);
  if(!parent) return false;
  if(censusByOcc.get(parent.occurrence_id)!==censusByOcc.get(id)) return false;
  return /\baction\b/i.test(parent.source_span||'');
}

for(const id of positive){
  if(!occ.has(id)) fail('missing positive '+id);
  else if(!variationPredicate(id)) fail('positive fails variation predicate '+id);
}
for(const id of negative){
  if(!occ.has(id)) fail('missing negative '+id);
  else if(variationPredicate(id)) fail('negative falsely matches variation predicate '+id);
}

for(const c of H.positive_controls||[]){
  const ids=c.occurrence_ids||[];
  if(ids.length!==2) fail('positive class must have two occurrences '+c.class_id);
  const parentIds=new Set(ids.map(id=>(occ.get(id)?.depends_on||[])[0]));
  if(parentIds.size!==1||!parentIds.has(c.parent_occurrence_id)) fail('parent dependency mismatch '+c.class_id);
  const censusIds=new Set(ids.map(id=>censusByOcc.get(id)));
  if(censusIds.size!==1||!censusIds.has(c.census_id)) fail('census grouping mismatch '+c.class_id);
  const outputs=ids.map(id=>occ.get(id)?.argument_spans?.[1]||'');
  if(!outputs.some(x=>/torsion-free/i.test(x))) fail('missing torsion-free positive output '+c.class_id);
  if(!outputs.some(x=>/Einstein equations/i.test(x))) fail('missing Einstein-equation positive output '+c.class_id);

  const q=(G4.classes||[]).find(x=>x.class_id===c.class_id);
  if(!q) fail('missing G4 class '+c.class_id);
  else {
    const qm=[...(q.member_occurrence_ids||[])].sort();
    const em=[...ids].sort();
    if(JSON.stringify(qm)!==JSON.stringify(em)) fail('G4 membership mismatch '+c.class_id);
  }

  const old=(G5.class_results||[]).find(x=>x.class_id===c.class_id);
  if(!old) fail('missing prior G5 class result '+c.class_id);
  else if(old.candidate_id!==null) fail('prior G5 unexpectedly already had candidate '+c.class_id);
}

const sourceSpecific=/\b(?:connection|tetrad|frame|torsion|Levi-Civita|Einstein|Palatini|chiral)\b/i;
for(const role of H.hypothesis?.source_neutral_roles||[]) if(sourceSpecific.test(role)) fail('source-specific role leaked into hypothesis '+role);
if(sourceSpecific.test(H.hypothesis?.working_name||'')) fail('source-specific name leaked into working name');

const pass=errors.length===0;
const result={
  schema:'isograph.exp062-verify-w-g5-hypothesis-variational-stationarity.v0.1',
  pass,
  errors,
  hypothesis_id:H.hypothesis?.hypothesis_id,
  positives:[...positive].sort(),
  negatives:[...negative].sort(),
  give_control_count:allGive.length,
  positive_count:positive.size,
  negative_count:negative.size,
  covered_g4_classes:(H.positive_controls||[]).map(x=>x.class_id),
  disposition:pass
    ? 'SURVIVES_W_LOCAL_FALSIFICATION_PENDING_G6_INDEPENDENT_QUALIFICATION'
    : 'REJECT_HYPOTHESIS_NO_AUTHORITY_EFFECT',
  gate_effect:pass
    ? 'MAY_FREEZE_SEPARATE_G6_CANDIDATE_PROJECT_W_MAY_NOT_CONSUME'
    : 'NO_DOWNSTREAM_EFFECT',
  W_primitive_closure_complete:false,
  W_IA_authorized:false,
  cross_track_comparison_authorized:false
};
console.log(JSON.stringify(result,null,2));
if(!pass) process.exitCode=1;
