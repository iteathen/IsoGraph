import assert from 'node:assert/strict';
import {buildBarrierCorpus,checkCommitted,MODULES} from './build-barriers.mjs';

const result=checkCommitted();
assert.equal(result.ok,true,result.errors.join('; '));

const {corpus,isg}=buildBarrierCorpus();
assert.equal(corpus.modules.length,6);
assert.deepEqual(corpus.modules.map(m=>m.module),MODULES.map(m=>m.module));
assert.deepEqual(corpus.modules.map(m=>m.local_relation_label),['^97310','^97311','^97312','^97313','^97314','^97315']);
assert.deepEqual(corpus.modules.map(m=>m.groups),[9,10,17,10,8,10]);
assert.deepEqual(corpus.modules.map(m=>m.edges),[9,12,17,11,8,17]);
assert.equal(corpus.modules.reduce((n,m)=>n+m.edges,0),74);

const termOwners=new Map();
for(const module of corpus.modules){
  for(const barrier of module.barriers){
    for(const term of [barrier.left,barrier.right]){
      const owner=termOwners.get(term.term_id);
      if(owner) assert.equal(owner,module.module,'term SI leaked across module boundary');
      else termOwners.set(term.term_id,module.module);
    }
  }
}

assert.equal(new Set(corpus.modules.map(m=>m.local_relation_label)).size,6);
assert.equal((isg.match(/\(\^9731\d\s+\d+\s+\d+\)/g)||[]).length,74);

const repeatedForks=corpus.modules.flatMap(module=>{
  const counts=new Map();
  for(const barrier of module.barriers){
    counts.set(barrier.left.term_id,(counts.get(barrier.left.term_id)||0)+1);
  }
  return [...counts.values()].filter(n=>n>1);
});
assert.ok(repeatedForks.length>=3,'expected source-local multi-target forks');

console.log('Experiment 023 barrier rendering controls: PASS (74 exact edges, 6 local relations)');
