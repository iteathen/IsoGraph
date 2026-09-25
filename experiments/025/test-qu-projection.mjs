import assert from 'node:assert/strict';
import fs from 'node:fs';

const corpus=JSON.parse(fs.readFileSync('experiments/021/TRANSITIONS.json','utf8'));
const views=JSON.parse(fs.readFileSync('experiments/021/VIEWS.json','utf8'));
const witness=JSON.parse(fs.readFileSync('experiments/025/QU_PROJECTION_WITNESS.json','utf8'));

const byId=new Map(corpus.transitions.map(t=>[t.id,t]));
const t01=byId.get('T01'), t03=byId.get('T03'), t06=byId.get('T06');
const view=views.views.find(v=>v.id==='C_CONCEPT');

assert.ok(t01&&t03&&t06&&view);
assert.deepEqual(witness.view,view);

const owners=new Map(witness.qu_region_ownership.map(x=>[x.qu_ref,x]));
for(const id of ['Q021-input','Q021-recognition','Q021-decomposition','Q021-ordering']){
  assert.equal(owners.has(id),true,'missing QU ownership '+id);
  assert.equal(owners.get(id).projected_under_view,true,'QU not projected '+id);
}

assert.equal(t06.source.qu_ref,'Q021-input');
assert.equal(t06.target.recognition.qu_ref,'Q021-recognition');
assert.equal(t06.anatomy.D.qu_ref,'Q021-decomposition');
assert.equal(t06.anatomy.O.qu_ref,'Q021-ordering');

for(const owner of owners.values()){
  assert.equal(view.projected.includes(owner.represented_region),true,'view does not project '+owner.represented_region);
}

assert.equal(view.load_bearing.includes('Q'),false);
assert.equal(view.load_bearing.includes('source carrier representation'),false);
assert.equal(view.load_bearing.includes('target recognition'),false);
assert.equal(view.load_bearing.includes('D'),false);
assert.equal(view.load_bearing.includes('O'),false);

assert.deepEqual(t06.source.admissible,[t01.source.value,t03.source.value]);
assert.deepEqual(t06.target.recognition.admissible,[t01.target.recognition,t03.target.recognition]);
assert.equal(t01.target.concept,'NATURAL_IDENTITY');
assert.equal(t03.target.concept,'NATURAL_IDENTITY');
assert.equal(t06.target.concept,'NATURAL_IDENTITY');

assert.deepEqual(t01.anatomy.B,t06.anatomy.B);
assert.deepEqual(t03.anatomy.B,t06.anatomy.B);

console.log('Experiment 025 QU projection ownership: PASS (all T06 QU owned by C_CONCEPT-projected regions)');
