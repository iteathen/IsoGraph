import assert from 'node:assert/strict';
import fs from 'node:fs';

let validateExactRoleCoverage, enforceExactRoleCoverage;
try {
  ({validateExactRoleCoverage,enforceExactRoleCoverage}=await import('./exact-role-coverage.mjs'));
} catch (error) {
  console.error('RED: exact-role-coverage validator is not implemented');
  process.exit(1);
}

const sigA={symbols:{'^1':'beta','^2':'energy','^3':'equal'}};
const sigB={symbols:{'^11':'beta','^12':'energy','^13':'equal'}};

const complete={
  case_id:'case-01',
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


const literalSigA={symbols:{'^1':'F'}};
const literalSigB={symbols:{'^11':'value_domain'}};
const literalCase={
  case_id:'literal-case',
  disposition:'EXACT_WITNESS',
  role_coverage:{
    A:[
      {symbol:'^1',status:'TRANSFORMED',counterparts:['#0'],justification:'F maps to represented zero literal',authority_refs:['authority#9']}
    ],
    B:[
      {symbol:'^11',status:'NON_LOAD_BEARING',counterparts:[],justification:'domain carrier role; represented literals are values',authority_refs:['DIRECT_NATIVE_SUPPORT']}
    ]
  }
};
assert.deepEqual(
  validateExactRoleCoverage({
    caseReport:literalCase,
    signatureA:literalSigA,
    signatureB:literalSigB,
    nativeA:'(^1)',
    nativeB:'(^11 {#0 #1})'
  }),
  []
);
const inventedLiteral=structuredClone(literalCase);
inventedLiteral.role_coverage.A[0].counterparts=['#9'];
assert.match(
  validateExactRoleCoverage({
    caseReport:inventedLiteral,
    signatureA:literalSigA,
    signatureB:literalSigB,
    nativeA:'(^1)',
    nativeB:'(^11 {#0 #1})'
  }).join('\n'),
  /unknown B counterpart #9/
);

console.log('PASS: exact-witness role coverage validator');

const signatures={
  'case-01':{A:sigA,B:sigB}
};

assert.doesNotThrow(()=>enforceExactRoleCoverage({report:{cases:[complete]},signaturesByCase:signatures}));
assert.throws(
  ()=>enforceExactRoleCoverage({report:{cases:[missing]},signaturesByCase:signatures}),
  /case-01 exact role coverage failed: missing A symbol \^1/
);

console.log('PASS: aggregate exact-witness role coverage enforcement');


const ROOT='research/project-discovery/2026-09-25-dp07-three-positive-controls';
const rejectedRaw=JSON.parse(fs.readFileSync(`${ROOT}/evidence/run-36225973244/COLD_REPORT_RAW.txt`,'utf8'));
const actualSignatures={};
for(const caseId of ['case-01','case-02','case-03']){
  actualSignatures[caseId]={
    A:JSON.parse(fs.readFileSync(`${ROOT}/blind-v2/${caseId}/A.signature.json`,'utf8')),
    B:JSON.parse(fs.readFileSync(`${ROOT}/blind-v2/${caseId}/B.signature.json`,'utf8')),
    nativeA:fs.readFileSync(`${ROOT}/blind-v2/${caseId}/A.isg`,'utf8'),
    nativeB:fs.readFileSync(`${ROOT}/blind-v2/${caseId}/B.isg`,'utf8')
  };
}
assert.throws(
  ()=>enforceExactRoleCoverage({report:rejectedRaw,signaturesByCase:actualSignatures}),
  /case-03 exact role coverage failed: unknown A counterpart \^71019 for \^94010/
);
console.log('PASS: rejected run cross-case counterpart regression fixture');

