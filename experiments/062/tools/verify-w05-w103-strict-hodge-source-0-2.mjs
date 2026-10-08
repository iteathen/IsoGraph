import fs from 'node:fs';
import crypto from 'node:crypto';
const root='research/woit-lisi-isomorph/woit/',exp='experiments/062/',dem='research/primitive-demand-qualification/';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const x=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex')};
const clone=x=>JSON.parse(JSON.stringify(x)),eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const old=read(root+'SOURCE_SEMANTIC_CENSUS_0_10.json'),now=read(root+'SOURCE_SEMANTIC_CENSUS_0_11.json');
const oldDemand=read(dem+'SOURCE_DEMAND_CENSUS_0_9.json'),proj=read(exp+'W_G0_W103_SOURCE_DEMAND_PROJECTION_0_1.json');
const defect=read(exp+'W05_W103_HODGE_STRICT_FILTRATION_SOURCE_DEFECT_0_1.json');
const failedVerifierDefect=read(exp+'W05_W103_VERIFIER_MISSING_MEMBER_EXCEPTION_DEFECT_0_1.json');
const wrong='a later explanatory formula gives F^p as sums of H^q(M,Omega^i) for i at least p';
const right='the source-printed formula gives F^p as the direct sum of H^q(M,Omega^i) over i STRICTLY GREATER than p (i>p), not i>=p';
const tail='the source also states the mixed Hodge case is excluded here.';
const correctedTail='the source also prints H^(p,q)(M) = F^p intersect conjugate(F^q) under that same Hodge paragraph; the source also states the mixed Hodge case is excluded here.';
function check(s,d){
 const errors=[],a=(x,m)=>{if(!x)errors.push(m)};
 a(s.items?.length===151&&s.census_item_count===151,'151 source census bodies conserved');
 a(s.status==='W05_G0_HODGE_SOURCE_FIDELITY_CORRECTION_CANDIDATE_NOT_FROZEN'&&!('frozen_date'in s),'premature source freeze');
 a(s.predecessor?.git_blob_sha===sha(root+'SOURCE_SEMANTIC_CENSUS_0_10.json'),'source baseline pin');
 a(eq(s.items.map(x=>x.id),old.items.map(x=>x.id)),'source ID/order drift');
 a(eq(s.correction?.changed_W_census_ids,['W-SSC-103'])&&s.correction?.G1_rebuild_authorized===false,'incorrect source replay scope/gate');
 for(let i=0;i<151;i++){let p=old.items[i],q=s.items[i];if(p.id!=='W-SSC-103'){a(eq(p,q),'other SSC changed '+p.id);continue}
  let copy=clone(q);delete copy.source_expression_census;
  a(eq(copy,{...p,obligation:p.obligation.replace(wrong,right).replace(tail,correctedTail)}),'W103 not minimal source-text correction');
 }
 const w=s.items.find(x=>x.id==='W-SSC-103'),f=w?.source_expression_census?.statements;
 a(w?.source==='W05 §5.2'&&w?.state==='OPEN_EXPOSITORY','W103 source scope/state changed');
 a(w?.obligation?.includes('i>p')&&w?.obligation?.includes('conjugate(F^q)')&&!w?.obligation?.includes('for i at least p'),'source condition/conjugate missing');
 a(w?.obligation?.includes('F^2=V')&&w?.obligation?.includes('does not vary holomorphically')&&w?.obligation?.includes('mixed Hodge case is excluded'),'source anomaly/negative modality removed');
 a(f?.length===2&&eq(f.map(x=>x.id),['W103-G0-F01','W103-G0-F02']),'two source equations missing');
 a(f?.[0]?.source_literal==='F^p = ⨁_{i>p} H^q(M, Ω^i)'&&f?.[0]?.modality==='SOURCE_DISPLAYED_EQUALITY','source strict displayed formula/polarity');
 a(f?.[0]?.lhs==='F^p'&&f?.[0]?.rhs?.operator==='DIRECT_SUM'&&eq(f?.[0]?.rhs?.binder,{variable:'i',relation:'STRICT_GT',bound:'p'})&&f?.[0]?.rhs?.summand==='H^q(M,Omega^i)','indexed strict binder semantics');
 a(f?.[1]?.source_literal==='H^(p,q)(M) = F^p ∩ conjugate(F^q)'&&f?.[1]?.modality==='SOURCE_DISPLAYED_EQUALITY','source intersection display');
 a(f?.[1]?.lhs==='H^(p,q)(M)'&&f?.[1]?.rhs?.operator==='INTERSECTION'&&f?.[1]?.rhs?.left==='F^p'&&eq(f?.[1]?.rhs?.right,{operator:'CONJUGATE',operand:'F^q'}),'Hodge intersection/conjugation roles');
 a(w?.source_expression_census?.coverage==='THESE_TWO_EQUATIONS_ONLY_NOT_ALL_W05_OR_FULL_HODGE_THEORY','unjustified broad claim');
 const oldW=oldDemand.items.filter(x=>x.track==='W');
 a(oldW.length===86&&d?.items?.length===86&&d?.counts?.W_unresolved===86,'86 W demand-membership conservation');
 a(d?.current_source?.git_blob_sha===sha(root+'SOURCE_SEMANTIC_CENSUS_0_11.json')&&d?.predecessor_combined_demand?.git_blob_sha===sha(dem+'SOURCE_DEMAND_CENSUS_0_9.json'),'source-demand pin mismatch');
 a(d?.replay_policy?.G1_authorized===false&&d?.replay_policy?.L_members==='NOT_ACCESSED_OR_REWRITTEN','G1 or cross-track route invalid');
 a(eq(oldW.map(x=>x.census_id),d.items.map(x=>x.census_id)),'W demand identities/order altered');
 let otherChanges=0;
 for(let i=0;i<oldW.length;i++){const p=oldW[i],q=d.items?.[i];if(!q){errors.push('missing W demand row at index '+i);continue;}const source=s.items.find(x=>x.id===q.census_id);
   a(q.track==='W'&&q.body===source?.obligation,'source-demand exact reconstruction '+q.census_id);
   if(p.census_id==='W-SSC-103')a(eq(q.source_formula_incidences,f),'W103 formula demand missing');
   else if(!eq(p,q))otherChanges++;
 }
 a(otherChanges===0,'other 85 W-demand rows mutated');
 const w109=d.items.find(x=>x.census_id==='W-SSC-109'),w110=d.items.find(x=>x.census_id==='W-SSC-110');
 a(w109?.state.includes('OPEN')&&w109.source_comparison_rows?.length===11&&w109.source_modality==='ANALOGY_ONLY_NOT_SEMANTIC_EQUIVALENCE','W109 historical false closure/analogy');
 a(w110?.state.includes('OPEN'),'W110 historically false closure reinstated');
 a(d.items.every(x=>x.track==='W'&&!x.census_id.startsWith('L-')),'L cross-track leak');
 return errors;
}
const errors=check(now,proj);
if(failedVerifierDefect.failed_verifier?.git_blob_sha!==sha(exp+'tools/verify-w05-w103-strict-hodge-source-0-1.mjs'))errors.push('historical verifier defect pin stale');
if(defect.observed_mismatch?.current_census?.git_blob_sha!==sha(root+'SOURCE_SEMANTIC_CENSUS_0_10.json')||defect.source_formulas?.[0]?.comparison!=='STRICT_GREATER_THAN')errors.push('defect source evidence missing/stale');
const tests=[
['weak >= binder',(s,d)=>s.items.find(x=>x.id==='W-SSC-103').source_expression_census.statements[0].rhs.binder.relation='GTE'],
['weak source literal',(s,d)=>s.items.find(x=>x.id==='W-SSC-103').source_expression_census.statements[0].source_literal='F^p=⊕_{i>=p}H^q(M,Ω^i)'],
['wrong index',(s,d)=>s.items.find(x=>x.id==='W-SSC-103').source_expression_census.statements[0].rhs.summand='H^i(M,Omega^q)'],
['swap p and q',(s,d)=>s.items.find(x=>x.id==='W-SSC-103').source_expression_census.statements[0].rhs.binder.bound='q'],
['intersection→sum',(s,d)=>s.items.find(x=>x.id==='W-SSC-103').source_expression_census.statements[1].rhs.operator='DIRECT_SUM'],
['drop bar',(s,d)=>s.items.find(x=>x.id==='W-SSC-103').source_expression_census.statements[1].rhs.right.operator='IDENTITY'],
['wrong conjugated exponent',(s,d)=>s.items.find(x=>x.id==='W-SSC-103').source_expression_census.statements[1].rhs.right.operand='F^p'],
['omit intersection',(s,d)=>s.items.find(x=>x.id==='W-SSC-103').source_expression_census.statements.pop()],
['normalize source F²',(s,d)=>{let x=s.items.find(x=>x.id==='W-SSC-103');x.obligation=x.obligation.replace('F^2=V','F^0=V')}],
['remove negative variation',(s,d)=>{let x=s.items.find(x=>x.id==='W-SSC-103');x.obligation=x.obligation.replace('does not vary holomorphically','varies holomorphically')}],
['alter unrelated W104',(s,d)=>s.items.find(x=>x.id==='W-SSC-104').obligation+='NEW CLAIM'],
['premature G1',(s,d)=>s.correction.G1_rebuild_authorized=true],
['remove demand member',(s,d)=>d.items.pop()],
['reclose W109',(s,d)=>d.items.find(x=>x.census_id==='W-SSC-109').state='CLOSED_PRIMITIVE'],
['reclose W110',(s,d)=>d.items.find(x=>x.census_id==='W-SSC-110').state='CLOSED_PRIMITIVE'],
['change W103 demand only',(s,d)=>d.items.find(x=>x.census_id==='W-SSC-103').body='BAD'],
['joint wrong ≥ in source and projection',(s,d)=>{const x=s.items.find(x=>x.id==='W-SSC-103'),y=d.items.find(x=>x.census_id==='W-SSC-103');x.obligation=x.obligation.replace('i STRICTLY GREATER than p (i>p), not i>=p','i at least p');y.body=x.obligation}]
];
const rejected=[];for(const [label,m] of tests){const s=clone(now),d=clone(proj);m(s,d);if(check(s,d).length)rejected.push(label);else errors.push('ESCAPED MUTATION '+label)}
const result={schema:'isograph.exp062-w05-w103-strict-hodge-verifier.v0.2',pass:errors.length===0,errors,source_census_count:151,W_unresolved_members:86,unmodified_source_items:150,unmodified_other_W_demands:85,adversarial_mutations_rejected:rejected.length,adversarial_total:tests.length,rejected,failed_predecessor:'V0_1_MISSING_ROW_EXCEPTION',stage:'G0_CANDIDATE_ONLY_NOT_FROZEN_NOT_CI'};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exit(1);
