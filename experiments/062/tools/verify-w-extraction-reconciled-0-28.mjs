import fs from 'node:fs';
import crypto from 'node:crypto';
const root='experiments/062/';
const p={
  oldDemand:'research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_5.json',
  demand:'research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_6.json',
  ssc:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_7.json',
  audit:root+'W097_W05_DIRECT_SOURCE_ADDITIONAL_OMISSIONS_AUDIT_0_1.json',
  formulaAudit:root+'W097_G1_MAP_SQUARE_AND_FIXEDPOINT_OPERATOR_GRANULARITY_DEFECT_0_1.json',
  gate:root+'W_CURRENT_STAGE_GATE_0_32.json',
  predecessor:root+'W_EXTRACTION_RECONCILED_0_27.json',
  adjudication:root+'W_G1_SOURCE_LOCAL_ADJUDICATION_0_28.json',
  extracted:root+'W_EXTRACTION_RECONCILED_0_28.json',
};
const read=path=>fs.readFileSync(path,'utf8');
const json=path=>JSON.parse(read(path));
const blob=path=>{const b=Buffer.from(read(path));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const copy=x=>JSON.parse(JSON.stringify(x)),old=json(p.oldDemand),demand=json(p.demand),ssc=json(p.ssc),audit=json(p.audit),gate=json(p.gate),pred=json(p.predecessor),adj=json(p.adjudication),curr=json(p.extracted);
const find=(items,id)=>(items||[]).find(x=>x.census_id===id);
const id=n=>'W-SSC-097-O'+String(n).padStart(2,'0');
function evaluate(S=curr,C=demand,Q=ssc,A=adj){
 const fail=[],check=(b,m)=>{if(!b)fail.push(m);};
 const target=find(S.items,'W-SSC-097'),parent=find(pred.items,'W-SSC-097'),body=C.items.find(x=>x.track==='W'&&x.census_id==='W-SSC-097')?.body;
 check(S.track==='W'&&S.items.length===84,'exact 84 W items');
 check(new Set(S.items.map(x=>x.census_id)).size===84,'unique W ids');
 check(new Set(C.items.map(x=>x.track+':'+x.census_id)).size===235,'unique source-demand ids');
 check(C.items.filter(x=>x.track==='W').length===84&&C.items.filter(x=>x.track==='L').length===151,'source demand 84/151');
 check(Q.items.length===151&&Q.source_count===9,'full W SSC census');
 check(C.pinned_inputs?.W?.ssc_blob===blob(p.ssc),'SSC pointer pinned');
 check(A.source_corpus?.git_blob_sha===blob(p.demand),'adjudication demand pin');
 check(A.source_semantic_census?.git_blob_sha===blob(p.ssc),'adjudication SSC pin');
 check(A.predecessor_input?.git_blob_sha===blob(p.predecessor),'adjudication prior G1 pin');
 check(A.stage_gate?.git_blob_sha===blob(p.gate),'adjudication stage gate pin');
 check(A.defect_audit?.git_blob_sha===blob(p.formulaAudit),'G1 operator defect pin');
 check(gate.corrected_source?.source_demand?.git_blob_sha===blob(p.demand)&&gate.corrected_source?.source_semantic_census?.git_blob_sha===blob(p.ssc),'gate inputs pinned');
 check(gate.current_lawful_state?.G1_rebuild_authorized===true&&!gate.current_lawful_state?.G2_authorized,'G1 gate only');
 check(audit.earliest_affected_stage==='G0_SOURCE_SEMANTIC_CENSUS','earliest defect provenance');
 const oldW=old.items.filter(x=>x.track==='W'),newW=C.items.filter(x=>x.track==='W');
 check(JSON.stringify(old.items.filter(x=>x.track==='L'))===JSON.stringify(C.items.filter(x=>x.track==='L')),'L bodies completely unchanged');
 let changedBodies=[];
 for(let i=0;i<oldW.length;i++){
   check(oldW[i]?.census_id===newW[i]?.census_id,'demand W order '+i);
   if(JSON.stringify(oldW[i])!==JSON.stringify(newW[i]))changedBodies.push(newW[i].census_id);
 }
 check(JSON.stringify(changedBodies)===JSON.stringify(['W-SSC-097']),'only W097 source body changed');
 const sscW=Q.items.find(x=>x.id==='W-SSC-097')?.obligation;
 check(sscW===body,'SSC W097 matches demand body');
 const oldBody=oldW.find(x=>x.census_id==='W-SSC-097')?.body;
 check(body?.startsWith(oldBody),'new W097 exact prefix conservation');
 const expected=copy(pred);const index=expected.items.findIndex(x=>x.census_id==='W-SSC-097');
 expected.items[index]=A.replacement_item;
 check(JSON.stringify(S)===JSON.stringify(expected),'full deterministic 83-body copy and one-body replacement');
 check(JSON.stringify(target)===JSON.stringify(A.replacement_item),'adjudication exact source occurrence reconstruction');
 const global=new Set(),base=new Set();
 for(let i=0;i<S.items.length;i++){
   const w=S.items[i],src=C.items.find(x=>x.track==='W'&&x.census_id===w.census_id)?.body;
   check(!!src,'source exists '+w.census_id);
   const prior=new Set();
   for(const o of w.occurrences||[]){
     check(!global.has(o.occurrence_id),'unique occurrence '+o.occurrence_id);global.add(o.occurrence_id);
     check(src?.includes(o.source_span),'source span '+o.occurrence_id);
     check(o.source_span?.includes(o.relation_span),'relation span '+o.occurrence_id);
     for(const a of o.argument_spans||[])check(o.source_span?.includes(a),'argument span '+o.occurrence_id);
     for(const dep of o.depends_on||[])check(prior.has(dep),'invalid dependency order/other body '+o.occurrence_id+' -> '+dep);
     prior.add(o.occurrence_id);
   }
   if(w.census_id!=='W-SSC-097')check(JSON.stringify(w)===JSON.stringify(pred.items[i]),'unchanged other 83 body G1 '+w.census_id);
 }
 const occs=target?.occurrences||[],o=n=>occs.find(x=>x.occurrence_id===id(n));
 const must=['complex lines in C2','a projective equivalence class of nonzero complex pairs','z=z1/z2','rho(z)=bar(z)','z=-1/bar(z)','|z|^2=-1','Gal(C/R)','x^2+y^2+z^2=0','no real points','on C2 coordinates rho_tw squared equals -1','on projective points rho_tw squared equals 1','forming a circle in CP1','the antipodal map'];
 for(const term of must)check(body?.includes(term)&&occs.some(x=>x.source_span.includes(term)),'source-visible term missing in G1 '+term);
 const req=[25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,43,44,45,46,47,48,49,50,51,52,53,54,55];
 for(const n of req)check(!!o(n),'new source and operator occurrence missing '+id(n));
 for(const n of [1,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,2,3,4,5])check(!!o(n),'old W097 occurrence not conserved '+id(n));
 check(o(8)?.logical_force==='NEGATED'&&o(8)?.definition_status==='NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED','negative real predicate remains opaque');
 check(o(5)?.logical_force==='NEGATED'&&o(5)?.depends_on?.includes(id(8))&&o(5)?.depends_on?.includes(id(2)),'conic scope and negative points');
 check(o(4)?.logical_force==='NEGATED'&&JSON.stringify(o(4)?.depends_on)===JSON.stringify([id(18)])&&!o(4)?.depends_on?.includes(id(6)),'no false involution->fixed-point-free implication');
 check(o(31)?.logical_force==='CONDITIONAL'&&o(32)?.logical_force==='CONDITIONAL'&&o(33)?.logical_force==='NEGATED','fixed-point contradiction hypothetical, not positive witness');
 check(o(51)?.logical_force==='CONDITIONAL'&&o(51)?.source_span==='z=-1/bar(z)'&&o(31)?.depends_on?.includes(id(51)),'separate hypothetical equality operator');
 check(o(52)?.logical_force==='CONDITIONAL'&&o(52)?.source_span==='|z|^2=-1'&&o(32)?.depends_on?.includes(id(52)),'explicit norm-square under conditional antecedent');
 check(o(11)?.depends_on?.includes(id(53))&&o(53)?.argument_spans?.includes('rho'),'ordinary map square operation');
 check(o(1)?.depends_on?.includes(id(54))&&o(54)?.argument_spans?.includes('C2 coordinates'),'vector map square operation');
 check(o(6)?.depends_on?.includes(id(55))&&o(55)?.argument_spans?.includes('projective points'),'projective map square operation');
 check(!o(4)?.depends_on?.includes(id(54))&&!o(4)?.depends_on?.includes(id(55)),'no false G1 square->fixed-point-free inference');
 check(o(1)?.argument_spans?.includes('C2 coordinates')&&o(6)?.argument_spans?.includes('projective points'),'carrier-scoped squares');
 check(o(29)?.source_span==='rho(z)=bar(z)'&&o(19)?.source_span==='rho_tw(z)=-1/bar(z)','ordinary/twistor separation');
 check(o(34)?.depends_on?.includes(id(35))&&o(35)?.definition_status==='NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED','Galois presentation, no imported action law');
 check(o(22)?.depends_on?.includes(id(45))&&o(45)?.depends_on?.includes(id(46))&&o(45)?.depends_on?.includes(id(47))&&o(45)?.depends_on?.includes(id(48)),'conic polynomial operator incidence');
 check(o(19)?.depends_on?.includes(id(50))&&o(50)?.depends_on?.includes(id(43)),'twistor affine formula operand incidence');
 check(!/L-SSC-|FIXED_POINT_FREE_INVOLUTION_INTERFACE|EMPTY_TYPED_PREDICATE_ON_CARRIER_INTERFACE|22110[0-3]/.test(JSON.stringify(occs)),'no L/G5/G6 template leakage');
 const derived=S.items.reduce((sum,x)=>sum+(x.occurrences||[]).length,0);
 check(derived===adj.counts?.successor_occurrences&&occs.length===adj.counts?.W097_occurrences,'derived counts match metadata');
 check(adj.counts?.predecessor_occurrences===pred.items.reduce((sum,x)=>sum+x.occurrences.length,0),'predecessor count from source');
 check(adj.counts?.net_occurrence_change===derived-adj.counts.predecessor_occurrences,'net count arithmetic');
 return fail;
}
const errors=evaluate();
const mutations=[
 ['flip_no_real_to_asserted',x=>{find(x.items,'W-SSC-097').occurrences.find(y=>y.occurrence_id===id(8)).logical_force='ASSERTED';}],
 ['assert_contradiction_as_fact',x=>{find(x.items,'W-SSC-097').occurrences.find(y=>y.occurrence_id===id(32)).logical_force='ASSERTED';}],
 ['false_fixedpoint_dependency',x=>{find(x.items,'W-SSC-097').occurrences.find(y=>y.occurrence_id===id(4)).depends_on=[id(6)];}],
 ['drop_galois_presentation',x=>{find(x.items,'W-SSC-097').occurrences=find(x.items,'W-SSC-097').occurrences.filter(y=>y.occurrence_id!==id(34));}],
 ['delete_chart_semantics',x=>{find(x.items,'W-SSC-097').occurrences=find(x.items,'W-SSC-097').occurrences.filter(y=>y.occurrence_id!==id(27));}],
 ['mutate_other_W_body',x=>{x.items.find(y=>y.census_id!=='W-SSC-097').occurrences[0].source_span='unsourced';}],
 ['break_dependency_scope',x=>{find(x.items,'W-SSC-097').occurrences.find(y=>y.occurrence_id===id(4)).depends_on=['W-SSC-099-O01'];}],
 ['duplicate_occurrence_identity',x=>{let os=find(x.items,'W-SSC-097').occurrences;os[os.length-1].occurrence_id=os[0].occurrence_id;}],
 ['drop_norm_square',x=>{let os=find(x.items,'W-SSC-097').occurrences;find(x.items,'W-SSC-097').occurrences=os.filter(y=>y.occurrence_id!==id(52));}],
 ['replace_projective_scope_with_vector',x=>{let os=find(x.items,'W-SSC-097').occurrences;os.find(y=>y.occurrence_id===id(55)).argument_spans[1]='C2 coordinates';}],
 ['assert_hypothetical_equality',x=>{let os=find(x.items,'W-SSC-097').occurrences;os.find(y=>y.occurrence_id===id(51)).logical_force='ASSERTED';}],
 ['drop_map_square_operator',x=>{let os=find(x.items,'W-SSC-097').occurrences;find(x.items,'W-SSC-097').occurrences=os.filter(y=>y.occurrence_id!==id(54));}],
];
for(const [name,mutate] of mutations){let x=copy(curr);mutate(x);if(evaluate(x).length===0)errors.push('mutation escaped '+name);}
const b=copy(demand);b.items.find(x=>x.track==='W'&&x.census_id==='W-SSC-097').body=old.items.find(x=>x.track==='W'&&x.census_id==='W-SSC-097').body;
if(evaluate(curr,b).length===0)errors.push('mutation escaped stale source body');
const result={schema:'isograph.exp062-verify-w-extraction-reconciled.v0.28',pass:errors.length===0,errors,source:'SSC0.7/demand0.6',W_items:curr.items.length,G1_occurrences:curr.items.reduce((n,x)=>n+x.occurrences.length,0),W097_occurrences:find(curr.items,'W-SSC-097').occurrences.length,adversarial_mutations_rejected:13,G2_authorized:false};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exitCode=1;
