import fs from 'node:fs';
const inputPath='experiments/062/L_G3_CORE_DEFINABILITY_0_2.json';
const adjudicationPath='experiments/062/L_G3_CORE_DEFINABILITY_ADJUDICATION_0_3.json';
const outputPath='experiments/062/L_G3_CORE_DEFINABILITY_0_3.json';
const input=JSON.parse(fs.readFileSync(inputPath,'utf8'));const adjudication=JSON.parse(fs.readFileSync(adjudicationPath,'utf8'));
if(input.schema!=='isograph.exp062-l-g3-core-definability.v0.2')throw new Error('input schema mismatch');if(adjudication.input?.path!==inputPath)throw new Error('adjudication input mismatch');
const out=JSON.parse(JSON.stringify(input));out.schema='isograph.exp062-l-g3-core-definability.v0.3';out.status='G3_DEFINABILITY_PASS_OPEN';out.predecessor=inputPath;out.adjudication=adjudicationPath;
const byId=new Map();for(const i of out.items||[])for(const r of i.occurrences||[])byId.set(r.occurrence_id,r);
for(const c of adjudication.corrections||[]){const r=byId.get(c.occurrence_id);if(!r)throw new Error('missing '+c.occurrence_id);if(r.disposition!==c.from)throw new Error(c.occurrence_id+': predecessor mismatch');r.disposition=c.to;r.closure_basis=c.basis;r.missing_definition_or_authority=null;r.review_note='Closed by L G3 adjudication 0.3 as extensional structural role/incidence only; parent/domain semantics remain independently unresolved.';}
const counts={CORE_CLOSED:0,CORE_SCHEMA_CANDIDATE_PENDING_QUALIFICATION:0,QUALIFIED_QU_BOUNDARY_CANDIDATE:0,UNEXPANDED_DEMAND:0};for(const i of out.items||[])for(const r of i.occurrences||[]){if(!(r.disposition in counts))throw new Error('bad disposition '+r.disposition);counts[r.disposition]++;}
for(const [k,v] of Object.entries(adjudication.resulting_counts||{}))if(counts[k]!==v)throw new Error('count mismatch '+k);out.counts={...out.counts,...counts};out.fixed_point=adjudication.fixed_point;out.next_required_steps=adjudication.next;
fs.writeFileSync(outputPath,JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify({output:outputPath,counts:out.counts},null,2));
