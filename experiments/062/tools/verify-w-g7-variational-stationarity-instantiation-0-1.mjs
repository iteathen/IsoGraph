import fs from 'node:fs';
import crypto from 'node:crypto';

const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{
  const b=Buffer.from(read(p),'utf8');
  return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};

const B=json('experiments/062/OWNER_EXTERNAL_VERIFICATION_BYPASS_0_2.json');
const Q=json('experiments/063/OWNER_WAIVER_PROVISIONAL_QUALIFICATION_0_1.json');
const SSC=json('experiments/063/MODULE_SSC_0_1.json');
const C=json('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_1.json');
const W=json('experiments/062/W_EXTRACTION_RECONCILED_0_18.json');
const G3=json('experiments/062/W_G3_CORE_DEFINABILITY_0_5.json');
const G7=json('experiments/062/W_G7_VARIATIONAL_STATIONARITY_INSTANTIATION_0_1.json');
const Gate=json('experiments/062/W_CURRENT_STAGE_GATE_0_2.json');

check(B.status==='OWNER_TEMPORARY_EXTERNAL_VERIFICATION_BYPASS_ACTIVE','bypass inactive');
check(Q.status==='OWNER_WAIVER_PROVISIONAL_QUALIFIED_WITH_EXPLICIT_SCOPE','G6 provisional qualification');
check(Q.external_verification?.complete===false,'external verification should remain false');
check(Q.external_verification?.global_disposition==='INCOMPLETE_EVIDENCE','global G6 disposition');

for(const rec of [
 G7.owner_bypass,G7.g6_provisional_qualification,
 G7.inputs.source_census,G7.inputs.extraction,G7.inputs.g3,G7.inputs.hypothesis,G7.inputs.stage_gate,
 Gate.owner_bypass,Gate.g6_candidate
]){
 check(fs.existsSync(rec.path),'missing pin '+rec.path);
 if(fs.existsSync(rec.path))check(blobSha(rec.path)===rec.git_blob_sha,'blob mismatch '+rec.path);
}

const expectedBodies={
 'W-SSC-029':"W01's frame-bundle description distinguishes spin-connection one-forms from canonical/frame one-forms and uses the Palatini action integral epsilon e wedge e wedge Omega; connection variation gives torsion-free Levi-Civita structure and frame variation gives Einstein equations.",
 'W-SSC-149':"W02 records a chiral gravitational action involving a self-dual two-form Sigma constructed from the tetrad and a right-handed curvature two-form; varying the connection gives the torsion-free relation and varying the tetrad gives the Einstein equations."
};
for(const [id,body] of Object.entries(expectedBodies)){
 const c=C.items.find(x=>x.track==='W'&&x.census_id===id);
 check(c?.body===body,'source body mismatch '+id);
}

const targetIds=['W-SSC-029-O03','W-SSC-029-O04','W-SSC-149-O02','W-SSC-149-O03'];
const parentMap={
 'W-SSC-029-O03':'W-SSC-029-O01',
 'W-SSC-029-O04':'W-SSC-029-O01',
 'W-SSC-149-O02':'W-SSC-149-O01',
 'W-SSC-149-O03':'W-SSC-149-O01'
};
for(const id of targetIds){
 const item=W.items.find(x=>x.occurrences.some(o=>o.occurrence_id===id));
 const o=item?.occurrences.find(x=>x.occurrence_id===id);
 check(!!o,'missing target '+id);
 check(o?.relation_span==='gives','target relation '+id);
 check(JSON.stringify(o?.depends_on)==='["'+parentMap[id]+'"]','target dependency '+id);
 const gi=G3.items.find(x=>x.census_id===item?.census_id)?.occurrences.find(x=>x.occurrence_id===id);
 check(gi?.disposition==='UNEXPANDED_DEMAND','G3 disposition changed '+id);
}
check(G7.occurrence_rulings?.length===4,'G7 ruling count');
check(G7.occurrence_rulings?.every(x=>x.g7_disposition==='REMAINS_UNEXPANDED_DEMAND'),'G7 closure ruling');
check(G7.ruling?.W_g3_changes===0,'unexpected G3 changes');
check(G7.ruling?.primitive_211000_consumed_to_close_W===false,'candidate consumed');
check(G7.ruling?.W_recursive_IA_authorized===false,'IA prematurely authorized');

const req=G7.candidate_instance_obligations||[];
check(req.some(x=>/total single-valued relation X x Y/.test(x)),'ACT totality obligation missing');
check(req.some(x=>/VARX is a total single-valued/.test(x)),'VARX totality obligation missing');
check(req.some(x=>/VARY is a total single-valued/.test(x)),'VARY totality obligation missing');
check(req.some(x=>/for every represented dx/.test(x)),'STATX universal obligation missing');
check(req.some(x=>/for every represented dy/.test(x)),'STATY universal obligation missing');

const sscClaims=[...(SSC.assertions||[]),...(SSC.explicit_nonclaims||[])].map(x=>x.claim).join('\n');
check(/ACT is a total single-valued/.test(sscClaims),'SSC ACT totality');
check(/VARX is a total single-valued/.test(sscClaims),'SSC VARX totality');
check(/VARY is a total single-valued/.test(sscClaims),'SSC VARY totality');
check(/does not derive VARX or VARY from ACT/.test(sscClaims),'SSC nonclaim');
check(/source instance must independently justify/i.test(sscClaims),'SSC source-instance nonclaim');

for(const body of Object.values(expectedBodies)){
 check(!/total single-valued|every represented|STATX|STATY|stationar|zero first variation/i.test(body),'forbidden semantics unexpectedly present in W body');
}

check(Gate.status==='W_G7_SOURCE_INSTANCE_BOUNDARY_CURRENT_AUTHORITY_HOLD','W gate status');
check(Gate.g7_result?.git_blob_sha==='6c153edb677bf13b30667ca31b9ad762ec58d196','W gate G7 pin');
check(Gate.current_lawful_state?.G7_executed===true,'G7 not executed');
check(Gate.current_lawful_state?.G7_closed_any_W_occurrence===false,'G7 closure mismatch');
check(Gate.current_lawful_state?.W_recursive_IA_authorized===false,'W IA gate');
check(Gate.controlling_boundary?.provider_related===false,'provider incorrectly controls boundary');

console.log(JSON.stringify({
 schema:'isograph.exp062-w-g7-variational-stationarity-instantiation-verifier.v0.1',
 pass:errors.length===0,
 errors,
 result:G7.ruling?.G7_result,
 target_occurrences:targetIds,
 controlling_boundary:Gate.controlling_boundary?.kind
},null,2));
if(errors.length)process.exitCode=1;
