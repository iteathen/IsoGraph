import assert from 'node:assert/strict';
import {loadFixtures,validateFixture} from './reconstruct-transition.mjs';
import {evaluateClaimObligation,validateTransitionRecord} from '../../tools/dts/dts-base.mjs';

const corpus=loadFixtures();
assert.equal(corpus.version,'DTS-DEV-020');
assert.equal(corpus.cases.length,3);

for(const f of corpus.cases){
  const r=validateFixture(f);
  assert.equal(r.ok,true,`${f.case_id}: ${r.errors.join('; ')}`);

  const roles={};
  if((f.anatomy.preserved_paths??[]).length) roles.preserved={state:'fixed',authority:f.anatomy.closure_authority};
  if((f.anatomy.removed_paths??[]).length) roles.removed={state:'fixed',authority:f.anatomy.closure_authority};
  if((f.anatomy.introduced_paths??[]).length) roles.introduced={state:'fixed',authority:f.anatomy.closure_authority};
  if((f.anatomy.changed_paths??[]).length) roles.changed={state:'fixed',authority:f.anatomy.closure_authority};
  roles.boundary={state:'fixed',authority:f.anatomy.closure_authority};

  const record={id:f.case_id,source:f.case_id+':source',target:f.case_id+':target',roles};
  assert.equal(validateTransitionRecord(record).ok,true,`${f.case_id}: invalid DTS record`);
  const view={loadBearingRoles:Object.keys(roles),irrelevantRoles:[]};
  assert.equal(evaluateClaimObligation(record,view).eligible,true,`${f.case_id}: obligation failed`);
}

const s02=corpus.cases.find(x=>x.case_id==='S02');
const n01=corpus.cases.find(x=>x.case_id==='N01');
assert.ok(s02&&n01);
assert.notDeepEqual(s02.anatomy.changed_paths,n01.anatomy.changed_paths);
assert.equal(n01.negative_control_for.includes('S02'),true);

console.log('Experiment 020 DTS reconstruction: PASS (3 source-anchored cases)');
