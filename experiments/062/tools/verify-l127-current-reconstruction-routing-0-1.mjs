import fs from 'node:fs';import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p));
const blob=p=>{const b=Buffer.from(read(p));return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(x,m)=>{if(!x)errors.push(m);};

const R=json('experiments/062/L127_CURRENT_RECONSTRUCTION_ROUTING_0_1.json');
check(R.status==='L127_CURRENT_RECONSTRUCTION_ROUTED','status');
check(R.authority===false&&R.track==='L','authority/track');

for(const x of [R.predecessor_g3,...R.consumed_authority,...R.source_instances,...R.source_falsifiers]){
 check(fs.existsSync(x.path),'missing '+x.path);
 if(fs.existsSync(x.path))check(blob(x.path)===x.git_blob_sha,'pin '+x.path);
}
for(const qref of R.consumed_authority){
 const q=json(qref.path);
 check(q.status==='HYPOTHESIS_QUALIFIED_CAMPAIGN_LOCAL_OWNER_BYPASS','authority status '+qref.path);
 check(q.global_qualified_authority===false,'global authority leak '+qref.path);
}

const pathBySuffix=suffix=>R.source_instances.find(x=>x.path.endsWith(suffix))?.path;
const cPath=pathBySuffix('LISI_L05_COMPLEX_SPLIT_COMPLEX_SOURCE_INSTANCE_0_2.isg');
const hPath=pathBySuffix('LISI_L05_QUATERNION_ALGEBRA_SOURCE_INSTANCE_0_2.isg');
const oPath=pathBySuffix('LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg');
const bipPath=pathBySuffix('LISI_L05_OCTONION_BIPRODUCT_OPERATOR_SOURCE_INSTANCE_0_1.isg');
const soPath=pathBySuffix('LISI_L05_OCTONION_SO8_SOURCE_ASSERTION_0_1.isg');
for(const p of [cPath,hPath,oPath,bipPath,soPath])check(!!p,'required source path missing');
const C=read(cPath),H=read(hPath),O=read(oPath),BIP=read(bipPath),SO=read(soPath);

check(/\(\^150010\s+185001(?:\s|\))/.test(C),'C associative control missing 185001');
check(/\(\^150010\s+193100(?:\s|\))/.test(H),'H associative control missing 193100');
check(/\(\^150010\s+185003(?:\s|\))/.test(O),'ordinary-O composition source route absent');

for(const id of [225001,187200,225000,193400])check(new RegExp('\\(\\^150010\\s+'+id+'(?:\\s|\\))').test(BIP),'biproduct source missing '+id);
const basis28=Array.from({length:28},(_,i)=>226010+i);
for(const id of basis28)check(BIP.includes('(^150014 '+id+')'),'28-basis declaration missing '+id);
const basis7=Array.from({length:7},(_,i)=>226110+i);
for(const id of basis7)check(BIP.includes('(^150014 '+id+')'),'7-basis declaration missing '+id);
for(let i=0;i<7;i++)check(BIP.includes('(^150010 226120 '+basis7[i]+' '+(226010+i)+')'),'injection basis row missing '+i);

check(/\(\^150006\s+\?r\s+7400[\s\S]*?\(\^150004[\s\S]*?\(\^150010\s+226100\s+\?r\)[\s\S]*?\(\^150003\s+\(\^150010\s+226120\s+\?r\s+226017\)\)/.test(BIP),'properness no-preimage clause for 226017 missing');

check(BIP.includes('(^150003 (^150008 214324 214316))'),'nonassociativity inequality missing');
check(BIP.includes('(^150010 226130 214324 214316)'),'nonassociativity witness relation missing');

check(/\(\^150010\s+227000(?:\s|\))/.test(SO),'structural metric-skew source instance missing 227000');
check(SO.includes('(^150014 226006)'),'source bracket declaration missing');

const opF=json(R.source_falsifiers.find(x=>x.path.endsWith('L127_BIPRODUCT_OPERATOR_FALSIFIER_0_1.json')).path);
const soF=json(R.source_falsifiers.find(x=>x.path.endsWith('L127_SO8_SOURCE_FALSIFIER_0_1.json')).path);
check(opF.pass===true&&opF.source_repair_used===false,'operator falsifier status');
check(opF.associativity_failures===162,'associativity failure count');
check(opF.imaginary_right_span_rank===7,'imaginary-right rank');
check(opF.biproduct_count===28&&opF.biproduct_span_rank===28,'biproduct rank/count');
check(soF.pass===true&&soF.source_repair_used===false,'metric-skew falsifier status');
check(soF.biproduct_span_rank===28,'SO falsifier rank');
check(soF.metric_skew_failures===14,'metric-skew failure count');
check(soF.commutators_outside_span===336,'commutator failure count');

const routes=Object.fromEntries((R.occurrence_routing||[]).map(x=>[x.occurrence_id,x]));
for(let i=1;i<=7;i++)check(!!routes['L-SSC-127-R0'+i],'missing route R0'+i);
check(routes['L-SSC-127-R05']?.route?.some(x=>/226017/.test(x)),'R05 226017 route absent');
check(!routes['L-SSC-127-R05']?.route?.some(x=>/226130/.test(x)),'R05 incorrectly uses 226130');
check(routes['L-SSC-127-R02']?.route?.some(x=>/226130/.test(x)),'R02 226130 route absent');

check(R.current_method_ruling?.new_so8_primitive_required===false,'so8 primitive overclaim');
check(R.source_inconsistency_policy?.representation_closure_distinct_from_truth_disposition===true,'representation/truth collapsed');
check(R.source_inconsistency_policy?.source_repair_used===false,'source repair leak');
check(!/W-SSC-|\/woit\//i.test(JSON.stringify(R)),'W leak');

console.log(JSON.stringify({
 schema:'isograph.exp062-l127-current-reconstruction-routing-verifier.v0.1',
 pass:errors.length===0,errors,
 source_instances:5,
 qualified_modules:R.consumed_authority.length,
 ordinary_O_expected:R.source_inconsistency_policy?.expected,
 properness_witness:'NO_PREIMAGE_FOR_226017',
 nonassociativity_witness:'226130(214324,214316)',
 external_third_party_verification:'BYPASSED_BY_OWNER_NOT_PASSED'
},null,2));
if(errors.length)process.exit(1);