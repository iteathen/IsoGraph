import assert from 'node:assert/strict';

let validateExactRoleCoverage;
try {
  ({validateExactRoleCoverage}=await import('./exact-role-coverage.mjs'));
} catch (error) {
  console.error('RED: exact-role-coverage validator is not implemented');
  process.exit(1);
}

const sigA={symbols:{'^1':'beta','^2':'energy','^3':'equal'}};
const sigB={symbols:{'^11':'beta','^12':'energy','^13':'equal'}};

const complete={
  disposition:'EXACT_WITNESS',
  role_coverage:{
    A:[
      {symbol:'^1',status:'MAPPED',counterparts:['^11'],justification:'beta_B = beta_A',authority_refs:['DIRECT_NATIVE_SUPPORT']},
      {symbol:'^2',status:'TRANSFORMED',counterparts:['^12'],justification:'energy transported with explicit residual',authority_refs:['authority#7']},
      {symbol:'^3',status:'SHARED_INFRASTRUCTURE',counterparts:['^13'],justification:'equality role preserved',authority_refs:['DIRECT_NATIVE_SUPPORT']}
    ],
    B:[
      {symbol:'^11',status:'MAPPED',counterparts:['^1'],justification:'beta_A = beta_B',authority_refs:['DIRECT_NATIVE_SUPPORT']},
      {symbol:'^12',status:'TRANSFORMED',counterparts:['^2'],justification:'inverse energy transport',authority_refs:['authority#7']},
      {symbol:'^13',status:'SHARED_INFRASTRUCTURE',counterparts:['^3'],justification:'equality role preserved',authority_refs:['DIRECT_NATIVE_SUPPORT']}
    ]
  }
};

assert.deepEqual(validateExactRoleCoverage({caseReport:complete,signatureA:sigA,signatureB:sigB}),[]);

const missing=structuredClone(complete);
missing.role_coverage.A=missing.role_coverage.A.filter(x=>x.symbol!=='^1');
assert.match(validateExactRoleCoverage({caseReport:missing,signatureA:sigA,signatureB:sigB}).join('\n'),/missing A symbol \^1/);

const duplicate=structuredClone(complete);
duplicate.role_coverage.B.push({...duplicate.role_coverage.B[0]});
assert.match(validateExactRoleCoverage({caseReport:duplicate,signatureA:sigA,signatureB:sigB}).join('\n'),/duplicate B symbol \^11/);

const badCounterpart=structuredClone(complete);
badCounterpart.role_coverage.A[0].counterparts=['^999'];
assert.match(validateExactRoleCoverage({caseReport:badCounterpart,signatureA:sigA,signatureB:sigB}).join('\n'),/unknown B counterpart \^999/);

const unresolved=structuredClone(complete);
unresolved.role_coverage.A[0].status='UNRESOLVED';
assert.match(validateExactRoleCoverage({caseReport:unresolved,signatureA:sigA,signatureB:sigB}).join('\n'),/invalid A status UNRESOLVED/);

const emptyReason=structuredClone(complete);
emptyReason.role_coverage.A[0].justification='';
assert.match(validateExactRoleCoverage({caseReport:emptyReason,signatureA:sigA,signatureB:sigB}).join('\n'),/missing A justification for \^1/);

console.log('PASS: exact-witness role coverage validator');
