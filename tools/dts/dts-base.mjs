// Deterministic DTS 0.1 development helpers.
//
// This module operates on a normalized JavaScript testing representation.
// It is NOT a semantic serialization format and does not replace native .isg
// authority. It exists to mechanically enforce base obligations before cold
// semantic qualification resources are spent.

const PRIVATE_UNKNOWN_STATES = new Set([
  'UNKNOWN',
  'UNKNOWN_MECHANISM',
  'UNKNOWN_DELTA',
  'UNKNOWN_TARGET',
  'PARTIAL_TRANSITION',
]);

export function validateTransitionRecord(record) {
  const errors = [];

  if (!record || typeof record !== 'object') {
    return { ok: false, errors: ['record must be an object'] };
  }

  if (!nonEmpty(record.id)) errors.push('transition id is required');
  if (!nonEmpty(record.source)) errors.push('source state reference is required');
  if (!nonEmpty(record.target)) errors.push('target state reference is required');

  if (!record.roles || typeof record.roles !== 'object' || Array.isArray(record.roles)) {
    errors.push('roles must be an object');
  } else {
    for (const [role, value] of Object.entries(record.roles)) {
      if (!value || typeof value !== 'object' || Array.isArray(value)) {
        errors.push(`role ${role} must be an object`);
        continue;
      }

      if (PRIVATE_UNKNOWN_STATES.has(value.state)) {
        errors.push(`role ${role} uses DTS-private opaque unknown state ${value.state}`);
      }

      if (!['fixed', 'qu', 'omitted'].includes(value.state)) {
        errors.push(`role ${role} has invalid state ${String(value.state)}`);
      }

      if (value.state === 'fixed' && value.closed !== true && !nonEmpty(value.authority)) {
        errors.push(`fixed role ${role} needs closed=true or an authority reference`);
      }

      if (value.state === 'qu' && !nonEmpty(value.ref)) {
        errors.push(`QU role ${role} requires a QU reference`);
      }
    }
  }

  return { ok: errors.length === 0, errors };
}

export function evaluateClaimObligation(record, view) {
  const recordCheck = validateTransitionRecord(record);
  if (!recordCheck.ok) {
    return { eligible: false, reasons: recordCheck.errors, checkedRoles: [] };
  }

  const required = uniqueStrings(view?.loadBearingRoles ?? []);
  const irrelevant = new Map();

  for (const item of view?.irrelevantRoles ?? []) {
    if (!item || !nonEmpty(item.role) || !nonEmpty(item.authority)) continue;
    irrelevant.set(item.role, item.authority);
  }

  const reasons = [];
  const checkedRoles = [];

  for (const role of required) {
    const value = record.roles[role];

    if (irrelevant.has(role)) {
      reasons.push(`role ${role} cannot be both load-bearing and declared irrelevant`);
      continue;
    }

    if (!value || value.state === 'omitted') {
      reasons.push(`load-bearing role ${role} is missing without QU or irrelevance authority`);
      continue;
    }

    if (value.state === 'fixed') {
      if (value.closed === true || nonEmpty(value.authority)) {
        checkedRoles.push({ role, coverage: 'fixed' });
      } else {
        reasons.push(`load-bearing fixed role ${role} lacks closure authority`);
      }
      continue;
    }

    if (value.state === 'qu') {
      if (nonEmpty(value.ref)) checkedRoles.push({ role, coverage: 'qu', ref: value.ref });
      else reasons.push(`load-bearing QU role ${role} lacks QU reference`);
      continue;
    }

    reasons.push(`load-bearing role ${role} has unsupported state`);
  }

  for (const [role, authority] of irrelevant) {
    checkedRoles.push({ role, coverage: 'qualified-irrelevant', authority });
  }

  return { eligible: reasons.length === 0, reasons, checkedRoles };
}

export function verifyTiWitness(left, right, view, witness) {
  const leftObligation = evaluateClaimObligation(left, view);
  const rightObligation = evaluateClaimObligation(right, view);
  const reasons = [];

  if (!leftObligation.eligible) {
    reasons.push(...leftObligation.reasons.map((r) => `left: ${r}`));
  }
  if (!rightObligation.eligible) {
    reasons.push(...rightObligation.reasons.map((r) => `right: ${r}`));
  }

  if (!nonEmpty(view?.id)) reasons.push('TI comparison view id is required');
  if (!nonEmpty(view?.authority)) reasons.push('TI comparison view authority is required');

  if (!witness || typeof witness !== 'object') {
    reasons.push('TI witness is required; same endpoints alone never establish TI');
    return result(reasons, leftObligation, rightObligation);
  }

  if (!nonEmpty(witness.id)) reasons.push('TI witness id is required');
  if (!nonEmpty(witness.authority)) reasons.push('TI witness authority is required');

  const mappings = witness.mappings && typeof witness.mappings === 'object'
    ? witness.mappings
    : {};

  for (const role of uniqueStrings(view?.loadBearingRoles ?? [])) {
    if (!Object.prototype.hasOwnProperty.call(mappings, role)) {
      reasons.push(`TI witness lacks mapping for load-bearing role ${role}`);
    }
  }

  if ((view?.loadBearingRoles ?? []).includes('decomposition')) {
    if (!nonEmpty(view.leftDecompositionAuthority)) {
      reasons.push('load-bearing decomposition requires left decomposition authority');
    }
    if (!nonEmpty(view.rightDecompositionAuthority)) {
      reasons.push('load-bearing decomposition requires right decomposition authority');
    }
  }

  const quRoles = new Set();
  for (const role of uniqueStrings(view?.loadBearingRoles ?? [])) {
    if (left.roles?.[role]?.state === 'qu' || right.roles?.[role]?.state === 'qu') {
      quRoles.add(role);
    }
  }

  for (const role of quRoles) {
    if (!witness.quCorrespondence || !nonEmpty(witness.quCorrespondence[role])) {
      reasons.push(`QU-bearing TI role ${role} requires explicit QU correspondence evidence`);
    }
  }

  if (!Array.isArray(witness.residuals)) {
    reasons.push('TI witness must carry an explicit residual list (possibly empty)');
  }

  return result(reasons, leftObligation, rightObligation);
}

function result(reasons, leftObligation, rightObligation) {
  return {
    verified: reasons.length === 0,
    reasons,
    leftObligation,
    rightObligation,
  };
}

function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function uniqueStrings(values) {
  return [...new Set(values.filter(nonEmpty))];
}
