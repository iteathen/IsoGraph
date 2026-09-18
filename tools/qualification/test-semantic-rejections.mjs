import assert from 'node:assert/strict';
import { assessRejectedOverclaims, identifyRejectedConcept } from './semantic-rejections.mjs';

const required = [
  'FULL_PROOF_ISOMORPHISM',
  'NATURAL_IDENTITY',
  'SAME_INTERMEDIATE_OBJECTS',
  'SAME_ALGORITHM'
];

{
  const result = assessRejectedOverclaims(required, required);
  assert.equal(result.semantic_coverage_complete, true);
  assert.equal(result.exact_canonical_string_coverage_complete, true);
  assert.deepEqual(result.missing_concepts, []);
}

{
  const exp007 = [
    'Full proof isomorphism (different intermediate machinery)',
    'Natural identity of alternating walks and min-cuts (NEI distinction audit: representational difference, not natural distinction)',
    'Same intermediate objects (alternating paths ≠ cut partitions)',
    'Same algorithm (augmenting path ≠ max-flow)',
    'Carrier identity between matching M and flow network'
  ];
  const result = assessRejectedOverclaims(exp007, required);
  assert.equal(result.semantic_coverage_complete, true);
  assert.equal(result.exact_canonical_string_coverage_complete, false);
  assert.deepEqual(result.missing_concepts, []);
  assert.equal(result.recognition[0].recognition, 'PUBLIC_LEXICAL_SIGNATURE');
  assert.equal(result.recognition[4].recognition, 'UNRESOLVED');
}

{
  const structured = required.map(claim_id => ({ claim_id, status: 'REJECTED', reason: 'bounded by evidence' }));
  const result = assessRejectedOverclaims(structured, required);
  assert.equal(result.semantic_coverage_complete, true);
  assert.equal(result.exact_canonical_string_coverage_complete, false);
}

{
  assert.equal(identifyRejectedConcept('identity might matter').concept_id, null);
  assert.equal(identifyRejectedConcept('different algorithm').concept_id, 'SAME_ALGORITHM');
  assert.equal(identifyRejectedConcept('intermediate objects are distinct').concept_id, 'SAME_INTERMEDIATE_OBJECTS');
  assert.equal(identifyRejectedConcept('proof isomorphic locally').concept_id, null);
}

{
  const missing = assessRejectedOverclaims(['Natural identity'], required);
  assert.equal(missing.semantic_coverage_complete, false);
  assert.deepEqual(missing.missing_concepts, ['FULL_PROOF_ISOMORPHISM', 'SAME_INTERMEDIATE_OBJECTS', 'SAME_ALGORITHM']);
}

console.log('semantic rejection contract tests: PASS');
