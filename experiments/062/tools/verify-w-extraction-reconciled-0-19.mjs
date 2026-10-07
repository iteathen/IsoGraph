import fs from 'node:fs';
import crypto from 'node:crypto';
const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{const b=Buffer.from(read(p),'utf8');return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};
const C=json('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_2.json');
const P=json('experiments/062/W_EXTRACTION_RECONCILED_0_18.json');
const A=json('experiments/062/W_G1_SOURCE_LOCAL_ADJUDICATION_0_19.json');
const S=json('experiments/062/W_EXTRACTION_RECONCILED_0_19.json');

check(A.governing_method.endsWith('PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_3.md'),'method');
check(A.source_corpus?.git_blob_sha===blobSha('research/primitive-demand-qualification/SOURCE_DEMAND_CENSUS_0_2.json'),'source pin');
check(A.predecessor_input?.git_blob_sha===blobSha('experiments/062/W_EXTRACTION_RECONCILED_0_18.json'),'predecessor pin');
check(A.correction_audit?.git_blob_sha===blobSha('experiments/062/W_G7_SOURCE_GRANULARITY_AUDIT_0_1.json'),'audit pin');
check(JSON.stringify((A.replacements||[]).map(x=>x.census_id))===JSON.stringify(['W-SSC-029','W-SSC-149']),'replacement scope');

const E=JSON.parse(JSON.stringify(P));
for(const c of A.replacements||[]){
  const i=E.items.findIndex(x=>x.census_id===c.census_id);
  if(i<0)errors.push('missing replacement '+c.census_id); else E.items[i]=c.replacement_item;
}
check(JSON.stringify(E)===JSON.stringify(S),'successor replay mismatch');
check(S.track==='W'&&S.items.length===84,'successor shape');
const bodies=new Map(C.items.filter(x=>x.track==='W').map(x=>[x.census_id,x.body]));
const forces=new Set(['ASSERTED','NEGATED','CONDITIONAL','EQUALITY_OR_IDENTIFICATION','EXISTENCE','COMPARISON','OTHER']);
const defs=new Set(['EXPLICIT_IN_BODY','PARTIAL_IN_BODY','NAME_ONLY_OR_EXTERNAL_DEFINITION_REQUIRED']);
const keys=new Set(['occurrence_id','source_span','relation_span','argument_spans','logical_force','definition_status','depends_on','load_bearing_note']);
const global=new Set();
for(const it of S.items){
  const body=bodies.get(it.census_id),prior=new Set(),sigs=new Map();
  check(!!body,'missing source body '+it.census_id);
  check(it.extraction_status==='COMPLETE','incomplete '+it.census_id);
  for(const o of it.occurrences){
    check(!global.has(o.occurrence_id),'global duplicate '+o.occurrence_id); global.add(o.occurrence_id);
    check(Object.keys(o).every(k=>keys.has(k)),'extra key '+o.occurrence_id);
    check(body?.includes(o.source_span),'source span '+o.occurrence_id);
    check(o.source_span.includes(o.relation_span),'relation span '+o.occurrence_id);
    for(const a of o.argument_spans||[])check(o.source_span.includes(a),'arg '+o.occurrence_id+' :: '+a);
    check(forces.has(o.logical_force),'force '+o.occurrence_id);
    check(defs.has(o.definition_status),'def '+o.occurrence_id);
    for(const d of o.depends_on||[])check(prior.has(d),'dep '+o.occurrence_id+' -> '+d);
    prior.add(o.occurrence_id);
    const sig=JSON.stringify([o.source_span,o.relation_span,o.argument_spans,o.logical_force,o.definition_status,o.depends_on]);
    check(!sigs.has(sig),'semantic duplicate '+o.occurrence_id); sigs.set(sig,o.occurrence_id);
    const ns=JSON.stringify({logical_force:o.logical_force,definition_status:o.definition_status,depends_on:o.depends_on,load_bearing_note:o.load_bearing_note});
    check(!/\b(?:PD-[A-Z0-9_-]+|B-[A-Z0-9_-]+|DNWF|DNIA|VARIATIONAL_STATIONARITY_INTERFACE|211000)\b/i.test(ns),'pre-G5 leakage '+o.occurrence_id);
  }
}
const changed=[];
for(let i=0;i<P.items.length;i++)if(JSON.stringify(P.items[i])!==JSON.stringify(S.items[i]))changed.push(P.items[i].census_id);
check(JSON.stringify(changed)===JSON.stringify(['W-SSC-029','W-SSC-149']),'changed body set '+JSON.stringify(changed));
const pc=P.items.reduce((n,x)=>n+x.occurrences.length,0),sc=S.items.reduce((n,x)=>n+x.occurrences.length,0);
check(pc===425,'predecessor count '+pc); check(sc===436,'successor count '+sc);
for(const id of ['W-SSC-029-O03','W-SSC-029-O04','W-SSC-149-O02','W-SSC-149-O03'])check(global.has(id),'lost target '+id);
const targetText=['W-SSC-029','W-SSC-149'].map(id=>JSON.stringify(S.items.find(x=>x.census_id===id))).join('\n');
check(!/STATX|STATY|every represented|variation-direction|zero first variation|Euler-Lagrange|total single-valued/i.test(targetText),'stationarity/calculus import');

console.log(JSON.stringify({schema:'isograph.exp062-verify-w-extraction-reconciled-0-19.v0.1',pass:errors.length===0,errors,item_count:S.items.length,occurrence_count:sc,changed_bodies:changed,target_ids_preserved:true,gate_effect:'G1_REOPENED_DOWNSTREAM_INVALIDATED_UNTIL_REPLAY'},null,2));
if(errors.length)process.exitCode=1;
