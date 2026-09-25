import assert from 'node:assert/strict';
import {
  evaluateClaimObligation,
  validateTransitionRecord,
  verifyTiWitness,
} from './dts-base.mjs';

function transition(overrides = {}) {
  return {
    id: overrides.id ?? 'T',
    source: overrides.source ?? 'G0',
    target: overrides.target ?? 'G1',
    roles: overrides.roles ?? {
      preserved: { state: 'fixed', closed: true },
      removed: { state: 'fixed', closed: true },
      introduced: { state: 'fixed', closed: true },
      boundary: { state: 'fixed', authority: 'core-boundary-authority' },
    },
  };
}

function view(overrides = {}) {
  return {
    id: overrides.id ?? 'C-effect',
    authority: overrides.authority ?? 'view-authority',
    loadBearingRoles: overrides.loadBearingRoles ?? [
      'preserved',
      'removed',
      'introduced',
      'boundary',
    ],
    irrelevantRoles: overrides.irrelevantRoles ?? [],
    ...overrides,
  };
}

function witness(v, overrides = {}) {
  return {
    id: overrides.id ?? 'W1',
    authority: overrides.authority ?? 'witness-authority',
    mappings: overrides.mappings ?? Object.fromEntries(
      v.loadBearingRoles.map((role) => [role, `${role}-mapping`]),
    ),
    quCorrespondence: overrides.quCorrespondence ?? {},
    residuals: overrides.residuals ?? [],
    ...overrides,
  };
}

// 1. Determinate transition needs no artificial QU instance.
{
  const t = transition();
  assert.equal(validateTransitionRecord(t).ok, true);
  assert.equal(evaluateClaimObligation(t, view()).eligible, true);
}

// 2. QU can cover a load-bearing unresolved role.
{
  const t = transition({
    roles: {
      preserved: { state: 'fixed', closed: true },
      decomposition: { state: 'qu', ref: 'QU:17' },
    },
  });
  const v = view({ loadBearingRoles: ['preserved', 'decomposition'] });
  assert.equal(evaluateClaimObligation(t, v).eligible, true);
}

// 3. Missing load-bearing structure does not become empty/complete.
{
  const t = transition({
    roles: {
      preserved: { state: 'fixed', closed: true },
      decomposition: { state: 'omitted' },
    },
  });
  const v = view({ loadBearingRoles: ['preserved', 'decomposition'] });
  const result = evaluateClaimObligation(t, v);
  assert.equal(result.eligible, false);
  assert.match(result.reasons.join('\n'), /missing without QU/);
}

// 4. DTS-private opaque unknown semantics are rejected.
{
  const t = transition({
    roles: {
      mechanism: { state: 'UNKNOWN_MECHANISM' },
    },
  });
  const result = validateTransitionRecord(t);
  assert.equal(result.ok, false);
  assert.match(result.errors.join('\n'), /DTS-private opaque unknown/);
}

// 5. Same endpoints alone never establish TI.
{
  const a = transition({ id: 'A', source: 'G0', target: 'G1' });
  const b = transition({ id: 'B', source: 'G0', target: 'G1' });
  const result = verifyTiWitness(a, b, view(), null);
  assert.equal(result.verified, false);
  assert.match(result.reasons.join('\n'), /same endpoints alone never establish TI/);
}

// 6. Complete scoped witness verifies the deterministic TI record shape.
{
  const a = transition({ id: 'A' });
  const b = transition({ id: 'B' });
  const v = view();
  const result = verifyTiWitness(a, b, v, witness(v));
  assert.equal(result.verified, true, result.reasons.join('\n'));
}

// 7. Load-bearing decomposition must pin both decompositions.
{
  const roles = {
    decomposition: { state: 'fixed', closed: true },
  };
  const a = transition({ id: 'A', roles });
  const b = transition({ id: 'B', roles });
  const v = view({ loadBearingRoles: ['decomposition'] });
  const result = verifyTiWitness(a, b, v, witness(v));
  assert.equal(result.verified, false);
  assert.match(result.reasons.join('\n'), /left decomposition authority/);
  assert.match(result.reasons.join('\n'), /right decomposition authority/);
}

// 8. A role may be ignored only through explicit irrelevance authority.
{
  const t = transition({
    roles: {
      preserved: { state: 'fixed', closed: true },
      decomposition: { state: 'omitted' },
    },
  });
  const v = view({
    loadBearingRoles: ['preserved'],
    irrelevantRoles: [{ role: 'decomposition', authority: 'C-effect projection proof' }],
  });
  assert.equal(evaluateClaimObligation(t, v).eligible, true);
}

// 9. QU-bearing TI requires explicit QU correspondence evidence.
{
  const roles = {
    preserved: { state: 'fixed', closed: true },
    decomposition: { state: 'qu', ref: 'QU:17' },
  };
  const a = transition({ id: 'A', roles });
  const b = transition({ id: 'B', roles });
  const v = view({
    loadBearingRoles: ['preserved', 'decomposition'],
    leftDecompositionAuthority: 'DA',
    rightDecompositionAuthority: 'DB',
  });
  const w = witness(v, { quCorrespondence: {} });
  const result = verifyTiWitness(a, b, v, w);
  assert.equal(result.verified, false);
  assert.match(result.reasons.join('\n'), /explicit QU correspondence evidence/);

  w.quCorrespondence.decomposition = 'QUI-or-other-qualified-correspondence';
  assert.equal(verifyTiWitness(a, b, v, w).verified, true);
}

// 10. Missing mapping for one load-bearing role blocks TI witness verification.
{
  const a = transition({ id: 'A' });
  const b = transition({ id: 'B' });
  const v = view();
  const w = witness(v);
  delete w.mappings.boundary;
  const result = verifyTiWitness(a, b, v, w);
  assert.equal(result.verified, false);
  assert.match(result.reasons.join('\n'), /lacks mapping for load-bearing role boundary/);
}

console.log('DTS 0.1 deterministic base checks: PASS (10 controls)');
