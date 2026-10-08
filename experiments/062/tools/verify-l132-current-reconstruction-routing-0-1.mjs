import fs from 'node:fs';import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};
const R=json('experiments/062/L132_CURRENT_RECONSTRUCTION_ROUTING_0_1.json');
check(R.status==='L132_CURRENT_RECONSTRUCTION_ROUTED_ALL_OCCURRENCES','status');
check(R.authority===false&&R.track==='L','authority/track');
for(const x of [R.predecessor_g3,...R.consumed_authority,R.prior_source_closure,...R.source_instances]){
 check(fs.existsSync(x.path),'missing '+x.path); if(fs.existsSync(x.path))check(blob(x.path)===x.git_blob_sha,'pin '+x.path);
}
for(const x of R.consumed_authority){
 const q=json(x.path);check(q.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','qualification '+x.path);check(q.global_qualified_authority===false,'global leak '+x.path);
}
const l131=json(R.prior_source_closure.path);check(l131.status==='L131_TARGETED_REOPEN_CLOSED','L131 not closed');
const lie=read(R.source_instances[0].path),dist=read(R.source_instances[1].path);
function countCall(s,id){const m=s.match(new RegExp('\\(\\^150010\\s+'+id+'(?:\\s|\\))','g'));return m?m.length:0;}
for(const [id,n] of Object.entries(R.source_call_expectations.lie_instance))check(countCall(lie,id)===n,'lie call count '+id+' got '+countCall(lie,id)+' expected '+n);
for(const [id,n] of Object.entries(R.source_call_expectations.distinction_instance))check(countCall(dist,id)===n,'dist call count '+id+' got '+countCall(dist,id)+' expected '+n);
for(const id of [238001,238002,238003])check(dist.includes('(^150014 '+id+')'),'category atom missing '+id);
for(const id of [237900,237901,237902,237903,237904,237905])check(lie.includes('(^150010 '+id),'carrier mapping missing '+id);
check(countCall(dist,238040)===6,'238040 mapping count');
check((R.occurrence_routing||[]).length===10,'route count');
for(let i=1;i<=10;i++)check(R.occurrence_routing.some(x=>x.occurrence_id==='L-SSC-132-R'+String(i).padStart(2,'0')&&x.disposition==='RECONSTRUCTABLE'),'route R'+i);
check(R.current_method_ruling?.new_generic_primitive_required===false,'new primitive overclaim');
check(R.current_method_ruling?.named_classical_lie_authority_required===false,'named Lie authority');
check(!/W-SSC-|\/woit\//i.test(JSON.stringify(R)),'W leak');
console.log(JSON.stringify({schema:'isograph.exp062-l132-current-reconstruction-routing-verifier.v0.1',pass:!errors.length,errors,routed_occurrences:R.occurrence_routing.length,lie_source_calls:R.source_call_expectations.lie_instance,distinction_source_calls:R.source_call_expectations.distinction_instance,external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED'},null,2));if(errors.length)process.exit(1);