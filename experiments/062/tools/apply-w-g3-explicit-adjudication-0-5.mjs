import fs from 'node:fs';

const inputPath='experiments/062/W_G3_CORE_DEFINABILITY_0_4.json';
const adjudicationPath='experiments/062/W_G3_EXPLICIT_IN_BODY_ADJUDICATION_0_5.json';
const outputPath='experiments/062/W_G3_CORE_DEFINABILITY_0_5.json';

const input=JSON.parse(fs.readFileSync(inputPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
if(input.schema!=='isograph.exp062-w-g3-core-definability.v0.4') throw new Error('input schema mismatch');
if(adjudication.input?.g3_path!==inputPath) throw new Error('adjudication input mismatch');

const out=JSON.parse(JSON.stringify(input));
out.schema='isograph.exp062-w-g3-core-definability.v0.5';
out.status='W_G3_FIXED_POINT_COMPLETE_W_LOCAL_G4_AUTHORIZED';
out.predecessor=inputPath;
out.adjudication=adjudicationPath;

const byId=new Map();
for(const item of out.items||[]) for(const row of item.occurrences||[]) byId.set(row.occurrence_id,row);
for(const a of adjudication.rows||[]){
  const row=byId.get(a.occurrence_id);
  if(!row) throw new Error('missing '+a.occurrence_id);
  if(row.review_state!=='PENDING_EXPLICIT_SOURCE_ADJUDICATION') throw new Error(a.occurrence_id+': not pending explicit');
  if(row.disposition!=='UNEXPANDED_DEMAND') throw new Error(a.occurrence_id+': disposition changed before final explicit review');
  row.review_state='FINAL_UNEXPANDED_EXPLICIT_IN_BODY';
  row.review_state_reason=a.exact_missing_lower_behavior;
  row.missing_definition_or_authority=a.exact_missing_lower_behavior;
  row.review_note='Individually adjudicated by '+adjudicationPath+'; current W-only authority does not supply exact primitive closure.';
}

const reviewCounts={FINAL_CORE_CLOSED:0,FINAL_UNEXPANDED_EXTERNAL_DEFINITION:0,FINAL_UNEXPANDED_PARTIAL_SOURCE_DEFINITION:0,FINAL_UNEXPANDED_EXPLICIT_IN_BODY:0};
const dispositionCounts={CORE_CLOSED:0,CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION:0,QUALIFIED_QU_BOUNDARY_CANDIDATE:0,UNEXPANDED_DEMAND:0};
for(const row of byId.values()){
  if(!(row.review_state in reviewCounts)) throw new Error(row.occurrence_id+': non-final review state '+row.review_state);
  reviewCounts[row.review_state]++;
  dispositionCounts[row.disposition]++;
}
for(const [k,v] of Object.entries(adjudication.resulting_review_counts||{})) if(reviewCounts[k]!==v) throw new Error('review count mismatch '+k);
for(const [k,v] of Object.entries(adjudication.resulting_counts||{})) if(dispositionCounts[k]!==v) throw new Error('disposition count mismatch '+k);

out.counts={...out.counts,...dispositionCounts};
out.review_counts=reviewCounts;
out.fixed_point={
  G3_complete:true,
  pending_rows:0,
  W_local_G4_authorized:true,
  cross_track_G4_authorized:false,
  G4_authorized:false,
  reason:'All 425 W occurrences have a final current-authority G3 disposition: 13 CORE_CLOSED and 412 UNEXPANDED_DEMAND. No schema or QU candidate is asserted. W-local alpha-renamed quotienting may proceed over only the 412 unresolved subgraphs; cross-track comparison remains forbidden.'
};
out.next_required_steps=[
  'Construct the W-local G4 alpha-renamed structural quotient from only the 412 UNEXPANDED_DEMAND subgraphs.',
  'Do not include CORE_CLOSED occurrences as quotient targets, though their structural incidence may remain context where needed to preserve unresolved subgraph boundaries.',
  'Do not use L evidence or source-domain relation labels as quotient keys.',
  'Retain arity, ordered incidence, logical force/polarity provenance, dependency direction, side-condition placement represented in the neutral graph, and distinctions whose deletion changes exact reconstruction.'
];

fs.writeFileSync(outputPath,JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify({output:outputPath,counts:out.counts,review_counts:out.review_counts,fixed_point:out.fixed_point},null,2));
