import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};

const oldB='research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_BIPRODUCT_OPERATOR_SOURCE_INSTANCE_0_1.isg';
const newB='research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_BIPRODUCT_OPERATOR_SOURCE_INSTANCE_0_2.isg';
const oldS='research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_SO8_SOURCE_ASSERTION_0_1.isg';
const newS='research/woit-lisi-isomorph/lisi/LISI_L05_OCTONION_SO8_SOURCE_ASSERTION_0_2.isg';

let nb=read(newB).replace(/\b246(\d{3})\b/g,(_,s)=>'226'+s).replace('(^150010 225010\n','(^150010 225000\n');
check(nb===read(oldB),'biproduct successor changed more than intended namespace substitutions');
let ns=read(newS).replace(/\b246(\d{3})\b/g,(_,s)=>'226'+s);
check(ns===read(oldS),'SO8 successor changed more than intended namespace substitution');

const oldG1=json('experiments/062/L127_G1_SOURCE_INCIDENCE_0_1.json');
const newG1=json('experiments/062/L127_G1_SOURCE_INCIDENCE_0_2.json');
check(JSON.stringify(oldG1.occurrences)===JSON.stringify(newG1.occurrences),'G1 occurrence semantics drifted');
check(JSON.stringify(oldG1.counts)===JSON.stringify(newG1.counts),'G1 counts drifted');

const oldG2=json('experiments/062/L127_G2_NEUTRAL_SUBGRAPH_0_1.json');
const newG2=json('experiments/062/L127_G2_NEUTRAL_SUBGRAPH_0_2.json');
check(JSON.stringify(oldG2.graph)===JSON.stringify(newG2.graph),'G2 graph topology/labels drifted');
check(JSON.stringify(oldG2.counts)===JSON.stringify(newG2.counts),'G2 counts drifted');

const oldG3=json('experiments/062/L127_G3_CORE_DEFINABILITY_0_1.json');
const newG3=json('experiments/062/L127_G3_CORE_DEFINABILITY_0_2.json');
check(JSON.stringify(oldG3.results)===JSON.stringify(newG3.results),'G3 dispositions/reasons drifted');
check(JSON.stringify(oldG3.counts)===JSON.stringify(newG3.counts),'G3 counts drifted');
const oldFamilies=oldG3.reusable_lower_demands.map(x=>x.family);
const newFamilies=newG3.reusable_lower_demands.map(x=>x.family);
check(JSON.stringify(oldFamilies)===JSON.stringify(newFamilies),'G3 reusable families drifted');
const oldFB=oldG3.reusable_lower_demands.find(x=>x.family==='FINITE_BASIS_7_AND_28');
const newFB=newG3.reusable_lower_demands.find(x=>x.family==='FINITE_BASIS_7_AND_28');
check(JSON.stringify(oldFB.immediate_historical_relation_candidates)===JSON.stringify([225000,225001]),'old finite-basis expectation changed');
check(JSON.stringify(newFB.immediate_historical_relation_candidates)===JSON.stringify([225010,225001]),'new finite-basis SI correction absent');

const defect=json('experiments/062/L127_SI_NAMESPACE_COLLISION_DEFECT_0_2.json');
check(defect.status.includes('EARLIEST_AFFECTED_STAGE_L127_G1'),'defect boundary not G1');
check(defect.confirmed_defects?.length===2,'defect count');

console.log(JSON.stringify({
 schema:'isograph.exp062-l127-si-repair-replay-verifier.v0.1',
 pass:errors.length===0,errors,
 source_semantics_unchanged:errors.length===0,
 g1_occurrences:newG1.counts,
 g2_counts:newG2.counts,
 g3_counts:newG3.counts,
 finite_basis_si:{old:225000,new:225010,dimension28:225001},
 source_local_range:{old:'226000-226199',new:'246000-246199'}
},null,2));
if(errors.length)process.exit(1);
