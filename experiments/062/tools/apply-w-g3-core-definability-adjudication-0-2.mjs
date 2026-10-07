import fs from 'node:fs';

const inputPath='experiments/062/W_G3_CORE_DEFINABILITY_0_1.json';
const adjudicationPath='experiments/062/W_G3_CORE_DEFINABILITY_ADJUDICATION_0_2.json';
const outputPath='experiments/062/W_G3_CORE_DEFINABILITY_0_2.json';

const input=JSON.parse(fs.readFileSync(inputPath,'utf8'));
const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));

if(input.schema!=='isograph.exp062-w-g3-core-definability.v0.1') throw new Error('input schema mismatch');
if(adjudication.input?.path!==inputPath) throw new Error('adjudication input mismatch');

const out=JSON.parse(JSON.stringify(input));
out.schema='isograph.exp062-w-g3-core-definability.v0.2';
out.status='G3_DEFINABILITY_PASS_OPEN';
out.predecessor=inputPath;
out.adjudication=adjudicationPath;

const byId=new Map();
for(const item of out.items||[]) for(const row of item.occurrences||[]) byId.set(row.occurrence_id,row);

for(const c of adjudication.corrections||[]){
  const row=byId.get(c.occurrence_id);
  if(!row) throw new Error('missing occurrence '+c.occurrence_id);
  if(row.disposition!==c.from) throw new Error(c.occurrence_id+': predecessor disposition mismatch');
  row.disposition=c.to;
  row.closure_basis=c.basis;
  row.missing_definition_or_authority=null;
  row.review_note='Closed by '+adjudicationPath+'; only the separately extracted structural role incidence closes. Parent mathematical operation remains independently adjudicated.';
}

const counts={CORE_CLOSED:0,CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION:0,QUALIFIED_QU_BOUNDARY_CANDIDATE:0,UNEXPANDED_DEMAND:0};
for(const item of out.items||[]) for(const row of item.occurrences||[]){
  if(!(row.disposition in counts)) throw new Error('unexpected disposition '+row.disposition);
  counts[row.disposition]++;
}
out.counts={...out.counts,...counts};
for(const [k,v] of Object.entries(adjudication.resulting_counts||{})) if(counts[k]!==v) throw new Error('adjudicated count mismatch '+k);
out.fixed_point={
  G3_complete:false,
  reason:'G3 remains open after four source-explicit map role incidences closed under primitive relation/ordered-incidence semantics; 418 occurrences still require W-only definability adjudication.',
  G4_authorized:false
};
out.next_required_steps=[
  'Continue W-only source-local adjudication of the 418 UNEXPANDED_DEMAND occurrences against exact qualified Core.',
  'Do not infer closure from source terminology or from L/cross-track structure.',
  'Represent any missing internal incidence exposed by adjudication before claiming Core closure.',
  'Do not begin G4 until the complete W G3 pass is frozen and verified.'
];

fs.writeFileSync(outputPath,JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify({output:outputPath,counts:out.counts},null,2));
