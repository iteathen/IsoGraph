import assert from 'node:assert/strict';
import fs from 'node:fs';
import {verifyTiWitness} from '../../tools/dts/dts-base.mjs';

const corpus=JSON.parse(fs.readFileSync('experiments/021/TRANSITIONS.json','utf8'));
const views=JSON.parse(fs.readFileSync('experiments/021/VIEWS.json','utf8'));
const spec=JSON.parse(fs.readFileSync('experiments/022/DECOMPOSITION_CASE.json','utf8'));

const byId=new Map(corpus.transitions.map(t=>[t.id,t]));
const viewById=new Map(views.views.map(v=>[v.id,v]));
const left=byId.get(spec.source.left);
const right=byId.get(spec.source.right);
assert.ok(left&&right,'missing frozen transition pair');

assert.deepEqual(left.source,right.source,'source projection differs');
assert.deepEqual(left.target,right.target,'target projection differs');

for(const region of spec.expected_structural_facts.same_effect_regions){
  assert.deepEqual(left.anatomy[region],right.anatomy[region],`effect region differs: ${region}`);
}
for(const region of spec.expected_structural_facts.different_regions){
  assert.notDeepEqual(left.anatomy[region],right.anatomy[region],`expected different region is equal: ${region}`);
}

// Prove the coarse decomposition is an order-preserving partition/coarsening
// of the fine decomposition rather than a correspondence-driven invention.
const flattened=spec.decomposition_authority.grouping.flatMap(g=>g.fine);
assert.deepEqual(flattened,left.anatomy.D,'coarsening does not partition fine decomposition in source order');
assert.deepEqual(spec.decomposition_authority.grouping.map(g=>g.coarse),right.anatomy.D,'coarse decomposition does not match frozen alternate representation');

const effect=viewById.get(spec.frozen_views.effect);
const processView=viewById.get(spec.frozen_views.process);
assert.ok(effect&&processView,'missing frozen comparison view');
for(const region of ['D','O']){
  assert.ok(effect.projected.includes(region),`effect view does not project ${region}`);
  assert.ok(processView.load_bearing.includes(region),`process view does not load-bear ${region}`);
}

function record(t){
  return {
    id:t.id,
    source:JSON.stringify(t.source),
    target:JSON.stringify(t.target),
    roles:{
      preserved:{state:'fixed',authority:'Experiment022 exact region equality'},
      changed:{state:'fixed',authority:'Experiment022 exact region equality'},
      boundary:{state:'fixed',authority:'Experiment022 exact region equality'},
      decomposition:{state:'fixed',authority:'Experiment022 pinned decomposition'},
      ordering:{state:'fixed',authority:'Experiment022 pinned ordering'}
    }
  };
}

const effectView={
  id:'C_WORKER_EFFECT',
  authority:'Experiment021 frozen effect view',
  loadBearingRoles:['preserved','changed','boundary'],
  irrelevantRoles:[
    {role:'decomposition',authority:'Experiment021 C_WORKER_EFFECT projection'},
    {role:'ordering',authority:'Experiment021 C_WORKER_EFFECT projection'}
  ]
};
const effectWitness={
  id:'W022-effect',
  authority:'exact equality of frozen effect regions',
  mappings:{
    preserved:'K exact-equality witness',
    changed:'delta_tilde exact-equality witness',
    boundary:'B exact-equality witness'
  },
  quCorrespondence:{},
  residuals:[
    {region:'D',left:left.anatomy.D,right:right.anatomy.D},
    {region:'O',left:left.anatomy.O,right:right.anatomy.O}
  ]
};
const verified=verifyTiWitness(record(left),record(right),effectView,effectWitness);
assert.equal(verified.verified,true,verified.reasons.join('\n'));
assert.equal(effectWitness.residuals.length,2,'decomposition residuals were erased');

// Process view: exact topology cardinality is already a concrete breaker.
const processBreakers=[];
if(left.anatomy.D.length!==right.anatomy.D.length){
  processBreakers.push({region:'D',left_nodes:left.anatomy.D.length,right_nodes:right.anatomy.D.length});
}
if(left.anatomy.O.length!==right.anatomy.O.length){
  processBreakers.push({region:'O',left_edges:left.anatomy.O.length,right_edges:right.anatomy.O.length});
}
assert.ok(processBreakers.length>=1,'no decomposition-sensitive breaker detected');

const result={
  pair:[left.id,right.id],
  effect_view:{
    disposition:'TI_SHAPE_VERIFIED',
    projected_residuals:['D','O']
  },
  process_view:{
    disposition:'REJECTED_BY_EXACT_TOPOLOGY_BREAKER',
    breakers:processBreakers
  },
  stronger_decomposition_quantifier_required_for_dts_0_1:false
};

fs.mkdirSync('out/exp022',{recursive:true});
fs.writeFileSync('out/exp022/RESULT.json',JSON.stringify(result,null,2)+'\n');
console.log('Experiment 022 DTS decomposition controls: PASS');
