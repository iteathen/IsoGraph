import fs from 'node:fs';

const inputPath='experiments/062/W_G3_CORE_DEFINABILITY_0_3.json';
const frontierPath='experiments/062/W_G3_DEFINITION_STATUS_FRONTIER_0_4.json';
const outputPath='experiments/062/W_G3_CORE_DEFINABILITY_0_4.json';

const input=JSON.parse(fs.readFileSync(inputPath,'utf8'));
const frontier=JSON.parse(fs.readFileSync(frontierPath,'utf8'));
if(input.schema!=='isograph.exp062-w-g3-core-definability.v0.3') throw new Error('input schema mismatch');
if(frontier.input?.g3_path!==inputPath) throw new Error('frontier input mismatch');

const out=JSON.parse(JSON.stringify(input));
out.schema='isograph.exp062-w-g3-core-definability.v0.4';
out.status='G3_EXPLICIT_IN_BODY_FRONTIER_OPEN';
out.predecessor=inputPath;
out.frontier=frontierPath;

const stateById=new Map((frontier.rows||[]).map(x=>[x.occurrence_id,x]));
for(const item of out.items||[]) for(const row of item.occurrences||[]){
  const f=stateById.get(row.occurrence_id);
  if(!f) throw new Error(row.occurrence_id+': missing frontier row');
  if(f.disposition!==row.disposition) throw new Error(row.occurrence_id+': frontier disposition mismatch');
  row.review_state=f.review_state;
  row.review_state_reason=f.reason;
}

out.review_counts=frontier.counts;
out.fixed_point={
  G3_complete:false,
  reason:'Current-authority review is final for all CORE_CLOSED, name-only/external-definition, and partial-in-body rows. Exactly 41 unresolved EXPLICIT_IN_BODY occurrences remain for individual adjudication.',
  G4_authorized:false,
  pending_explicit_rows:41
};
out.next_required_steps=[
  'Individually adjudicate the 41 unresolved EXPLICIT_IN_BODY W occurrences.',
  'Do not reopen finalized name-only or partial rows without new W source/qualified authority or an explicit correction showing that their full behavior was already isolated as a Core wrapper.',
  'Keep G4 blocked until the explicit frontier is exhausted and a zero-pending G3 fixed point is verified.'
];

fs.writeFileSync(outputPath,JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify({output:outputPath,review_counts:out.review_counts},null,2));
