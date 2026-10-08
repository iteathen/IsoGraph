import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};
const a1=json('experiments/062/L132_G1_SOURCE_GRANULARITY_REOPEN_AUDIT_0_1.json');
const a2=json('experiments/062/L132_G1_SOURCE_GRANULARITY_REOPEN_AUDIT_0_2.json');
const g11=json('experiments/062/L132_G1_SOURCE_INCIDENCE_0_1.json');
const g12=json('experiments/062/L132_G1_SOURCE_INCIDENCE_0_2.json');
const g21=json('experiments/062/L132_G2_NEUTRAL_SUBGRAPH_0_1.json');
const g22=json('experiments/062/L132_G2_NEUTRAL_SUBGRAPH_0_2.json');
const g31=json('experiments/062/L132_G3_CORE_DEFINABILITY_0_1.json');
const g32=json('experiments/062/L132_G3_CORE_DEFINABILITY_0_2.json');

check(JSON.stringify(g11.occurrences)===JSON.stringify(g12.occurrences),'G1 occurrences drifted');
check(JSON.stringify(g11.counts)===JSON.stringify(g12.counts),'G1 counts drifted');
check(JSON.stringify(g11.source_pins)===JSON.stringify(g12.source_pins),'G1 source pins drifted');
check(JSON.stringify(g21.graph)===JSON.stringify(g22.graph),'G2 graph drifted');
check(JSON.stringify(g21.counts)===JSON.stringify(g22.counts),'G2 counts drifted');
check(JSON.stringify(g31.results)===JSON.stringify(g32.results),'G3 dispositions drifted');
check(JSON.stringify(g31.counts)===JSON.stringify(g32.counts),'G3 counts drifted');
check(JSON.stringify(g31.reusable_lower_demands)===JSON.stringify(g32.reusable_lower_demands),'G3 reusable demands drifted');

const oldL127=a1.pinned_inputs?.['experiments/062/L127_G7_TARGETED_CLOSURE_0_1.json'];
const newL127=a2.pinned_inputs?.['experiments/062/L127_G7_TARGETED_CLOSURE_0_2.json'];
check(!!oldL127&&!!newL127,'L127 audit dependency substitution missing');
check(!a2.pinned_inputs?.['experiments/062/L127_G7_TARGETED_CLOSURE_0_1.json'],'stale L127 closure remains in replay audit');

const oldMetric=g31.authority_tuple.find(x=>x.path.includes('L127_G6_METRIC_SKEW_LIE_PROVISIONAL_QUALIFICATION_0_1.json'));
const newMetric=g32.authority_tuple.find(x=>x.path.includes('L127_G6_METRIC_SKEW_LIE_PROVISIONAL_QUALIFICATION_0_2.json'));
check(!!oldMetric&&!!newMetric,'metric-skew authority substitution missing');
check(JSON.stringify(oldMetric.required_relations)===JSON.stringify(newMetric.required_relations),'metric-skew relation scope drifted');
check(!g32.authority_tuple.some(x=>x.path.includes('L127_G6_METRIC_SKEW_LIE_PROVISIONAL_QUALIFICATION_0_1.json')),'stale metric-skew authority remains');

const stripAudit=x=>{const y=structuredClone(x);for(const k of ['schema','date','status','branch_head_at_creation','predecessor','defect','replay_note'])delete y[k];if(y.pinned_inputs){delete y.pinned_inputs['experiments/062/L127_G7_TARGETED_CLOSURE_0_1.json'];delete y.pinned_inputs['experiments/062/L127_G7_TARGETED_CLOSURE_0_2.json'];}y.nonclaims=(y.nonclaims||[]).filter(s=>!s.includes('invalidated L127'));return y;};
check(JSON.stringify(stripAudit(a1))===JSON.stringify(stripAudit(a2)),'G1 audit semantic content drifted');

console.log(JSON.stringify({
 schema:'isograph.exp062-l132-si-repair-replay-verifier.v0.1',
 pass:errors.length===0,
 errors,
 g1_occurrences:g12.counts,
 g2_counts:g22.counts,
 g3_counts:g32.counts,
 reusable_families:g32.reusable_lower_demands.map(x=>x.family),
 corrected_l127_closure:true,
 corrected_metric_skew_authority:true
},null,2));
if(errors.length)process.exit(1);