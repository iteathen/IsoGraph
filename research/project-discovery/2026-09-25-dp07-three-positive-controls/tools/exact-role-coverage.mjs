const ALLOWED_STATUSES=new Set([
  'MAPPED',
  'TRANSFORMED',
  'RESIDUAL',
  'SHARED_INFRASTRUCTURE',
  'NON_LOAD_BEARING'
]);

function symbols(signature){
  return Object.keys(signature?.symbols||{});
}

function references(signature,native){
  const refs=new Set(symbols(signature));
  for(const match of String(native||'').matchAll(/#-?\\d+/g)) refs.add(match[0]);
  return refs;
}

function validateSide({side,entries,expected,opposite}){
  const issues=[];
  if(!Array.isArray(entries)){
    return [`missing ${side} role_coverage array`];
  }

  const seen=new Set();
  for(const entry of entries){
    const symbol=entry?.symbol;
    if(typeof symbol!=='string'||!symbol){
      issues.push(`missing ${side} symbol identifier`);
      continue;
    }
    if(seen.has(symbol)) issues.push(`duplicate ${side} symbol ${symbol}`);
    seen.add(symbol);

    if(!expected.has(symbol)) issues.push(`unknown ${side} symbol ${symbol}`);

    const status=entry?.status;
    if(!ALLOWED_STATUSES.has(status)) issues.push(`invalid ${side} status ${status} for ${symbol}`);

    if(typeof entry?.justification!=='string'||entry.justification.trim()===''){
      issues.push(`missing ${side} justification for ${symbol}`);
    }

    const needsCounterpart=status==='MAPPED'||status==='TRANSFORMED'||status==='SHARED_INFRASTRUCTURE';
    const counterparts=Array.isArray(entry?.counterparts)?entry.counterparts:[];
    if(needsCounterpart&&counterparts.length===0){
      issues.push(`missing ${side} counterpart for ${symbol}`);
    }
    for(const cp of counterparts){
      if(!opposite.has(cp)) issues.push(`unknown ${side==='A'?'B':'A'} counterpart ${cp} for ${symbol}`);
    }
  }

  for(const symbol of expected){
    if(!seen.has(symbol)) issues.push(`missing ${side} symbol ${symbol}`);
  }

  return issues;
}

export function validateExactRoleCoverage({caseReport,signatureA,signatureB,nativeA,nativeB}){
  const expectedA=new Set(symbols(signatureA));
  const expectedB=new Set(symbols(signatureB));
  const refsA=references(signatureA,nativeA);
  const refsB=references(signatureB,nativeB);
  const coverage=caseReport?.role_coverage||{};
  return [
    ...validateSide({side:'A',entries:coverage.A,expected:expectedA,opposite:refsB}),
    ...validateSide({side:'B',entries:coverage.B,expected:expectedB,opposite:refsA})
  ];
}

export function enforceExactRoleCoverage({report,signaturesByCase}){
  for(const caseReport of report?.cases||[]){
    if(caseReport?.disposition!=='EXACT_WITNESS') continue;
    const caseId=caseReport?.case_id;
    const pair=signaturesByCase?.[caseId];
    if(!pair?.A||!pair?.B) throw new Error(`${caseId||'unknown-case'} exact role coverage failed: missing signatures`);
    const issues=validateExactRoleCoverage({
      caseReport,
      signatureA:pair.A,
      signatureB:pair.B,
      nativeA:pair.nativeA,
      nativeB:pair.nativeB
    });
    if(issues.length) throw new Error(`${caseId} exact role coverage failed: ${issues.join('; ')}`);
  }
}
