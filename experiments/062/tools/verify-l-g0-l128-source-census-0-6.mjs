import fs from 'node:fs';
import crypto from 'node:crypto';
const root='research/woit-lisi-isomorph/lisi/',exp='experiments/062/';
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const copy=x=>JSON.parse(JSON.stringify(x)),str=x=>JSON.stringify(x);
const hash=p=>{let b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const old=load(root+'SOURCE_SEMANTIC_CENSUS_0_5.json'),cur=load(root+'SOURCE_SEMANTIC_CENSUS_0_6.json');
const frozen=load(root+'SOURCE_SEMANTIC_CENSUS_0_2.json'),defect=load(exp+'L128_SOURCE_COEFFICIENT_FORMULA_CENSUS_DEFECT_0_1.json');
const targetId='L-SSC-128',rowId=n=>'L128-S'+String(n).padStart(2,'0');
const expected=[
 ['v=v^c e_c','v=v^c gamma_c'],
 ['psi=psi^a e_a','psi=psi^a Q^-_a'],
 ['tilde(chi)=chi^b tilde(e_b)','chi=chi^b Q+_b'],
 ['tilde(chi)=v psi','chi=v psi'],
 ['chi^b e_(tilde b)','v^c psi^a M_ca^(tilde b) e_(tilde b)'],
 ['chi^b = v^c psi^a (Gamma_c)^b_a','(Gamma_c)^b_a=M_ca^(tilde b)']
];
const dual=[
 'v=tilde(psi chi)/|psi chi|^2',
 'psi=tilde(chi v)/|chi v|^2',
 'chi=tilde(v psi)/|v psi|^2'
];
function verify(s=cur){
 const e=[],ck=(b,m)=>{if(!b)e.push(m)};
 const byid=id=>s.items.find(x=>x.id===id);
 ck(s.item_count===191&&s.items?.length===191,'item total=191');
 ck(str(s.items.map(x=>x.id))===str(old.items.map(x=>x.id)),'source IDs and exact order unchanged');
 ck(s.status.includes('NOT_FROZEN')&&s.guards.source_census_freeze_complete===false&&s.guards.L132_replay_authorized===false,'premature stage/authority');
 ck(s.revision?.predecessor_git_blob_sha===hash(root+'SOURCE_SEMANTIC_CENSUS_0_5.json'),'previous source pin');
 ck(s.revision?.defect_audit?.git_blob_sha===hash(exp+'L128_SOURCE_COEFFICIENT_FORMULA_CENSUS_DEFECT_0_1.json'),'G0 L128 defect audit pin');
 ck(s.revision?.new_L128_source_assertion_rows===6&&s.revision?.retained_L129_to_L132_source_assertion_rows===44,'formula count conservation');
 const changed=s.items.filter((x,i)=>str(x)!==str(old.items[i])).map(x=>x.id);
 ck(str(changed)===str([targetId]),'L128 only changed since SSC 0.5');
 const v=byid(targetId),previous=old.items.find(x=>x.id===targetId);
 ck(v.body.startsWith(previous.body+' '),'L128 predecessor body conserved');
 ck(v.body.includes("source '~'")&&v.body.includes("not a first-order approximation"),'representation correspondence not first-order');
 const rows=v.source_expression_census?.source_assertion_rows||[];
 ck(rows.length===6&&new Set(rows.map(x=>x.id)).size===6,'L128 has six unique source-equation rows');
 ck(str(v.source_expression_census?.source_relation_ids)===str(expected.map((_,i)=>rowId(i+1))),'L128 IDs ordered');
 for(let i=0;i<6;i++){
  let r=rows.find(x=>x.id===rowId(i+1));
  ck(r?.source_expression?.includes(expected[i][0])&&r?.source_expression?.includes(expected[i][1]),'L128 source operands/formula '+(i+1));
  ck(v.body.includes(expected[i][0])&&v.body.includes(expected[i][1]),'L128 body formula '+(i+1));
  ck(r?.source_logical_force===defect.source_visible_omissions[i].modality,'L128 formula modality '+(i+1));
  ck(r?.lower_semantics==='G1_RECONSTRUCTION_UNSTARTED','L128 premature qualified semantics '+(i+1));
 }
 let n=0;for(let id of [129,130,131,132]){
  let key='L-SSC-'+id,x=byid(key),p=old.items.find(y=>y.id===key);
  ck(str(x)===str(p),'preserve previous candidate L'+id);
  n+=x.source_expression_census?.source_assertion_rows?.length||0;
 }
 ck(n===44,'all previously source-conserved formulas retained');
 let l129=byid('L-SSC-129')?.source_expression_census?.source_assertion_rows?.find(x=>x.id==='E7-30');
 ck(l129?.condition==='T(v,psi,chi)=1 for a matched triple','T=1 matched-triple precondition');
 ck(str(l129?.terms)===str(dual),'all three independently fixed squared-norm denominators and order');
 let l131=byid('L-SSC-131')?.source_expression_census?.source_assertion_rows||[];
 const eq=key=>l131.find(x=>x.id===key);
 ck(eq('E9-30')?.terms?.includes('R_v^B(v)=U v U^-'),'U^- exact source notation');
 ck(eq('E9-31')?.terms?.includes('U v U^- ≃ v + (1/2)Bv - (1/2)vB'),'exact-vs-first-order distinction');
 ck(eq('E9-33')?.terms?.includes('R_m^B=t^2 R_v^B t')&&eq('E9-33')?.terms?.includes('R_p^B=t R_v^B t^2'),'ordered t conjugates');
 ck(str(s.items.filter(x=>!['L-SSC-128','L-SSC-129','L-SSC-130','L-SSC-131','L-SSC-132'].includes(x.id)))===str(frozen.items.filter(x=>!['L-SSC-128','L-SSC-129','L-SSC-130','L-SSC-131','L-SSC-132'].includes(x.id))),'186 original source items unchanged');
 ck(!str(v).includes('W-SSC-'),'cross-track semantics absent');
 return e;
}
const errors=verify();
const mutants=[
 ['omit L128 tilde',x=>{x.items.find(y=>y.id==='L-SSC-128').source_expression_census.source_assertion_rows[2].source_expression='chi=chi^b Q+_b';}],
 ['erase L128 multiplication order',x=>{x.items.find(y=>y.id==='L-SSC-128').source_expression_census.source_assertion_rows[4].source_expression='chi^b e_(tilde b)=psi^a v^c M_ca^(tilde b) e_(tilde b)';}],
 ['delete L128 coefficient row',x=>{x.items.find(y=>y.id==='L-SSC-128').source_expression_census.source_assertion_rows.pop();}],
 ['wrong correspondence modality',x=>{x.items.find(y=>y.id==='L-SSC-128').source_expression_census.source_assertion_rows[0].source_logical_force='SOURCE_APPROXIMATION';}],
 ['false L128 semantics qualified',x=>{x.items.find(y=>y.id==='L-SSC-128').source_expression_census.source_assertion_rows[0].lower_semantics='CORE_CLOSED';}],
 ['truncate L128 body',x=>{x.items.find(y=>y.id==='L-SSC-128').body=old.items.find(y=>y.id==='L-SSC-128').body;}],
 ['delete norm denominator',(x)=>{let q=x.items.find(y=>y.id==='L-SSC-129').source_expression_census.source_assertion_rows.find(y=>y.id==='E7-30');q.terms[0]='v=tilde(psi chi)';}],
 ['swap normalization product',(x)=>{let q=x.items.find(y=>y.id==='L-SSC-129').source_expression_census.source_assertion_rows.find(y=>y.id==='E7-30');q.terms[1]='psi=tilde(v chi)/|chi v|^2';}],
 ['remove matched-triple condition',(x)=>{x.items.find(y=>y.id==='L-SSC-129').source_expression_census.source_assertion_rows.find(y=>y.id==='E7-30').condition='unconditional';}],
 ['promote U-minus to inverse',(x)=>{let q=x.items.find(y=>y.id==='L-SSC-131').source_expression_census.source_assertion_rows.find(y=>y.id==='E9-30');q.terms[1]='R_v^B(v)=U v inverse(U)';}],
 ['transpose t powers',(x)=>{let q=x.items.find(y=>y.id==='L-SSC-131').source_expression_census.source_assertion_rows.find(y=>y.id==='E9-33');q.terms[0]='R_m^B=t R_v^B t^2';}],
 ['change untouched source',(x)=>{x.items[0].body='wrong';}],
 ['authorize forbidden L132',(x)=>{x.guards.L132_replay_authorized=true;}],
];
for(let [name,fn] of mutants){const x=copy(cur);fn(x);if(verify(x).length===0)errors.push('escaped '+name);}
console.log(JSON.stringify({schema:'isograph.exp062-l-g0-L128-source-census-verifier.v0.6',pass:errors.length===0,errors,items:cur.items.length,L128_source_equations:6,unchanged_predecessor_bodies:190,prior_section3_rows:44,adversarial_mutations_rejected:mutants.length,G1_authorized:false},null,2));
if(errors.length)process.exitCode=1;