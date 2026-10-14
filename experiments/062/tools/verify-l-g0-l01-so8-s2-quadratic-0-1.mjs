// Source-scoped L G0: exact 5-carrier symmetric Gram residual for L01 §3.2.2.
// No assumption that abstract Gram countermodels are source-admissible E8 fields.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const path={p:R+'LISI_L01_SO8_S2_QUADRATIC_RESIDUAL_G0_0_1.json',
 old:R+'SOURCE_SEMANTIC_CENSUS_0_33.json',next:R+'SOURCE_SEMANTIC_CENSUS_0_34.json',
 go:E+'L_CURRENT_STAGE_GATE_0_33.json',gn:E+'L_CURRENT_STAGE_GATE_0_34.json',
 bf:R+'LISI_L01_BF_ACTION_AUXILIARY_G0_0_1.json',
 h2:R+'LISI_L01_H2_F2_FERMION_GRADED_SOURCE_G0_0_1.json'};
const data=x=>JSON.parse(fs.readFileSync(x,'utf8'));
const sha=x=>{const b=fs.readFileSync(x);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const p=data(path.p),a=data(path.old),b=data(path.next),g=data(path.gn);
const issues=[],assert=(ok,msg)=>{if(!ok)issues.push(msg)};
function sourceChecks(t=p,old=a,current=b,gate=g) {
 const errors=[],ok=(yes,s)=>{if(!yes)errors.push(s);};
 ok(t?.schema==='isograph.lisi-L01-so8-action-quadratic-scope-G0.v0.1'&&t.track==='L'&&t.stage==='G0'&&t.authority===false,'L-only G0 authority');
 ok(t?.source?.revision==='arXiv:0711.0770v1'&&JSON.stringify(t.source.printed_pages)==='[24,26,27]','frozen source revision and page');
 for(const [k,ref] of [['ssc033',path.old],['gate033',path.go],['bf',path.bf],['h2',path.h2]])
  ok(t?.parents?.[k]?.path===ref&&t.parents[k].git_blob_sha===sha(ref),'frozen source parent '+k);
 ok(t?.source_equations?.F2==='F2=Fw+FB2+Fx+Fg+Q; Q=(xPhi)(xPhi)','original F2 five terms');
 ok(t?.source_equations?.nonseparation==='Q does not easily separate and contributes to all three parts of F2','original nonsplitting semantics');
 ok(t?.source_equations?.S2_unexpanded==='S2=-(1/4)*integral<trace(F2*star(F2))>','original quadratic curvature');
 ok(t?.source_equations?.S2_display==='S2=-(1/4)*integral(sum_i<trace(Fi*star(Fi))>) -(1/2)*integral<trace((Fw+FB2+Fx+Fg+Q)*star(Q))>; i in [w,B2,x,g]','original displayed expansion and coefficients');
 ok(t?.source_equations?.source_action_status==='Action for new fields is speculative and likely to change','source model-building limitation');
 ok(t?.source_equations?.source_hodge_caveat?.includes('inverting to coframe')&&t.source_equations.source_hodge_caveat.includes('awkward'),'Hodge depends on invertible frame');
 ok(t?.formal_diagnostic?.carriers?.join('|')==='Fw|FB2|Fx|Fg|Q','five formal independent coordinates');
 ok(t?.formal_diagnostic?.residual==='S2_display-S2_unexpanded=(1/2)*sum_(i<j<4)H(Fi,Fj)-(1/4)*H(Q,Q)','exact conditional Gram residual');
 ok(t?.formal_diagnostic?.necessary_sufficient_condition==='H(Q,Q)=2*sum_(i<j<4)H(Fi,Fj)','necessary-and-sufficient source extra condition');
 ok(t?.formal_diagnostic?.no_error_claim?.includes('do NOT prove'),'avoid falsely asserting source error');
 ok(t?.source_census?.total===191&&t.source_census.changed_only?.join('|')==='L-SSC-044|L-SSC-045'&&t.source_census.unchanged_complete_records===189,'scope retained');
 const guard=t?.guards;
 ok(guard?.original_Q_nonsplitting_preserved===true&&guard.source_new_field_action_speculative===true&&guard.Hodge_requires_invertible_coframe===true,'source negatives and metric type');
 for(const name of ['source_three_part_grouping_resolved','E8_Gram_representation_verified','author_mathematical_error_proved','external_cold_review_passed','G1_authorized','G2_G7_authorized','cross_author_comparison_authorized','source_census_frozen','PR70_merge_authorized'])
  ok(guard?.[name]===false,'no stage/theory promotion '+name);
 const A=new Map((old.items||[]).map(x=>[x.id,x])),B=new Map((current.items||[]).map(x=>[x.id,x]));
 ok(A.size===191&&B.size===191,'191 distinct items');
 const changed=[];for(const [id,item] of A){const dst=B.get(id);if(!dst)errors.push('missing '+id);else if(JSON.stringify(item)!==JSON.stringify(dst))changed.push(id);}
 for(const id of B.keys())if(!A.has(id))errors.push('extra '+id);
 ok(changed.join('|')==='L-SSC-044|L-SSC-045','only two intended changed records: '+changed);
 for(const id of ['L-SSC-044','L-SSC-045']){
  const before=A.get(id),after=B.get(id);
  ok(after?.body?.startsWith(before?.body||'MISSING'),'source assertion prefix conserved '+id);
  const evidence=after?.source_expression_census?.L01_S2_QUADRATIC_G0;
  ok(evidence?.source_packet?.path===path.p&&evidence.source_packet.git_blob_sha===sha(path.p),'exact source packet lineage '+id);
  ok(evidence?.global_E8_Gram_qualification===false&&evidence.actual_E8_counterexample===false,'bounded math claims '+id);
 }
 ok(current.guards?.source_census_freeze_complete===false&&current.guards.dp_allowed===false,'G0 current source incomplete');
 ok(current.revision?.predecessor_git_blob_sha===sha(path.old)&&current.revision?.source_packet?.git_blob_sha===sha(path.p)&&current.revision?.changed_source_items?.join('|')==='L-SSC-044|L-SSC-045','SSC034 lineage');
 ok(gate.stage==='G0'&&gate.track==='L'&&gate.semantic_authority===false&&gate.predecessor_gate?.git_blob_sha===sha(path.go),'G0 gate strictly successor');
 ok(gate.current_source_census?.git_blob_sha===sha(path.next)&&gate.current_source_census?.source_identities===191&&gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.cross_track_synthesis_authorized===false,'G0 current stage firewall');
 ok(!JSON.stringify(t).includes('W-SSC-'),'no W imports');
 return errors;
}
issues.push(...sourceChecks());

// Symmetric Hodge bilinear pairing on five ABSTRACT carrier symbols.
// Every g(i,j), i <= j is an independent polynomial variable.
const names=['Fw','FB2','Fx','Fg','Q'],n=5;
const unit=i=>Array.from({length:n},(_,j)=>Number(i===j));
const sum4=[1,1,1,1,0],all=[1,1,1,1,1],q=unit(4);
const key=(i,j)=>String(Math.min(i,j))+':'+String(Math.max(i,j));
function bilinear(x,y){
 const ans=new Map();
 for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(x[i]!==0&&y[j]!==0){
  const k=key(i,j);ans.set(k,(ans.get(k)||0)+x[i]*y[j]);
 }
 for(const[k,v]of ans)if(!v)ans.delete(k);
 return ans;
}
const scale=(m,c)=>new Map([...m].map(([k,v])=>[k,c*v]).filter(([k,v])=>v!==0));
function plus(...arr){const m=new Map();for(const a of arr)for(const[k,v]of a)m.set(k,(m.get(k)||0)+v);for(const[k,v]of m)if(!v)m.delete(k);return m;}
const equal=(a,b)=>a.size===b.size&&[...a].every(([k,v])=>b.get(k)===v);
const full4=scale(bilinear(all,all),-1);
const shown4=plus(...Array.from({length:4},(_,i)=>scale(bilinear(unit(i),unit(i)),-1)),scale(bilinear(all,q),-2));
const delta4=plus(shown4,scale(full4,-1));
const crossTerms=[];
for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)crossTerms.push(scale(bilinear(unit(i),unit(j)),2));
const predicted=plus(...crossTerms,scale(bilinear(q,q),-1));
assert(equal(delta4,predicted),'general exact source S2 Gram residual polynomial');
const coefficients=[];for(let i=0;i<n;i++)for(let j=i;j<n;j++){
 const k=key(i,j),s=delta4.get(k)||0,t=predicted.get(k)||0;
 assert(s===t,'exact independent symmetric Gram coefficient '+k);
 coefficients.push({carrier_pair:names[i]+'/'+names[j],scaled_by_four:s});
}
assert(coefficients.length===15&&coefficients.filter(x=>x.scaled_by_four!==0).length===7,'15 independent Gram directions, 7 load-bearing');
const evaluation=(poly,g)=>[...poly].reduce((total,[k,v])=>total+v*(g[k]||0),0);
assert(evaluation(delta4,{'4:4':1})===-1,'Q-only abstract countermodel differs by -1/4');
assert(evaluation(delta4,{'0:1':1})===2,'nonorthogonal named sector differs by +1/2');
assert(evaluation(delta4,{'0:1':1,'4:4':2})===0,'compensating constraint can restore equality');
assert(evaluation(delta4,{'0:0':1,'1:1':1,'2:2':1,'3:3':1})===0,'pairwise orthogonal Fi and Q-isotropic model');
const bad=[
 ['erase Q in original F2',scale(bilinear(sum4,sum4),-1)],
 ['reverse source S2 quadratic sign',bilinear(all,all)],
 ['misread final source half as quarter',plus(...Array.from({length:4},(_,i)=>scale(bilinear(unit(i),unit(i)),-1)),scale(bilinear(all,q),-1))],
 ['drop final source mixed term',plus(...Array.from({length:4},(_,i)=>scale(bilinear(unit(i),unit(i)),-1)))],
 ['change Q sign in F2',scale(bilinear([1,1,1,1,-1],[1,1,1,1,-1]),-1)]
];
let wrongMathDetected=0;for(const [name,m]of bad){if(equal(m,shown4))issues.push('ESCAPED_MATH '+name);else wrongMathDetected++;}
const sourceMutants=[
 ['revised original PDF',x=>{x.source.revision='arXiv:0711.0770v2'}],
 ['omit Q',x=>{x.source_equations.F2=x.source_equations.F2.replace('+Q','')}],
 ['independently closed Q',x=>{x.source_equations.nonseparation='Q forms fifth independently closed part'}],
 ['flip full action sign',x=>{x.source_equations.S2_unexpanded=x.source_equations.S2_unexpanded.replace('-(1/4)','+(1/4)')}],
 ['alter last half',x=>{x.source_equations.S2_display=x.source_equations.S2_display.replace('-(1/2)','-(1/4)')}],
 ['erase speculation',x=>{x.source_equations.source_action_status='Action established'}],
 ['Hodge frame not required',x=>{x.guards.Hodge_requires_invertible_coframe=false}],
 ['three/four resolved',x=>{x.guards.source_three_part_grouping_resolved=true}],
 ['assume E8 Gram theorem',x=>{x.guards.E8_Gram_representation_verified=true}],
 ['assert source mistake',x=>{x.guards.author_mathematical_error_proved=true}],
 ['allow G1',x=>{x.guards.G1_authorized=true}],
 ['wrong SSC parent',x=>{x.parents.ssc033.git_blob_sha='STALE'}]
];
let sourceMutantsDetected=0;
if(!issues.length)for(const [name,fn]of sourceMutants){const x=structuredClone(p);fn(x);if(sourceChecks(x).length===0)issues.push('ESCAPED_SOURCE '+name);else sourceMutantsDetected++;}
console.log(JSON.stringify({
 schema:'isograph.exp062-L01-so8-S2-conditional-Gram-G0.v0.1',pass:issues.length===0,issues,
 stage:'G0',source:'L01 arXiv:0711.0770v1',
 abstract_symmetric_Gram_parameters:15,exact_Gram_coefficients_tested:coefficients.length,
 nonzero_residual_coefficients:coefficients.filter(x=>x.scaled_by_four!==0),
 generic_Q_only_residual:'-1/4',generic_named_cross_residual:'+1/2',
 qualifying_extra_relation:'H(Q,Q)=2*sum_0<=i<j<4 H(Fi,Fj)',
 actual_E8_admissible_counterexample_proved:false,
 math_mutants_defined:bad.length,math_mutants_rejected:wrongMathDetected,
 source_mutants_defined:sourceMutants.length,source_mutants_rejected:sourceMutantsDetected,
 source_census_count:b.items?.length,changed_full_records:['L-SSC-044','L-SSC-045'],untouched_records:189,
 full_E8_action_qualified:false,G1_authorized:false,cross_author_semantics_authorized:false,
 source_census_frozen:false,external_cold_qualification_passed:false
},null,2));
if(issues.length)process.exitCode=1;
