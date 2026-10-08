import fs from 'node:fs';
import crypto from 'node:crypto';
const root='research/woit-lisi-isomorph/lisi/';
const prevPath=root+'SOURCE_SEMANTIC_CENSUS_0_8.json',curPath=root+'SOURCE_SEMANTIC_CENSUS_0_9.json',workPath=root+'LISI_L05_CL02_WORKED_EXAMPLE_SOURCE_MATRICES_0_1.json';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),clone=o=>JSON.parse(JSON.stringify(o)),j=o=>JSON.stringify(o);
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const prev=read(prevPath),cur=read(curPath),packet=read(workPath);
const G0=[[1,0],[0,-1]],G1=[[0,-1],[-1,0]];
const gam0=[[0,0,-1,0],[0,0,0,1],[1,0,0,0],[0,-1,0,0]],gam1=[[0,0,0,1],[0,0,1,0],[0,-1,0,0],[-1,0,0,0]];
const spinors=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const join=m=>'['+m.map(r=>'['+r.join(',')+']').join(',')+']';
const literal=[
 'Gamma_0='+join(G0),'Gamma_1='+join(G1),'gamma_0='+join(gam0),'gamma_1='+join(gam1),
 'Qminus_0='+j(spinors[0]),'Qminus_1='+j(spinors[1]),'Qplus_0='+j(spinors[2]),'Qplus_1='+j(spinors[3])
];
function verify(S=cur){
 const e=[],ck=(b,msg)=>{if(!b)e.push(msg)};
 const v=S.items.find(x=>x.id==='L-SSC-127'),o=prev.items.find(x=>x.id==='L-SSC-127');
 ck(S.item_count===191&&S.items.length===191,'all 191 SSC items retained');
 ck(j(S.items.map(x=>x.id))===j(prev.items.map(x=>x.id)),'SSC identities and order conserved');
 ck(j(S.items.filter((x,i)=>j(x)!==j(prev.items[i])).map(x=>x.id))===j(['L-SSC-127']),'one-body correction only');
 ck(S.revision?.predecessor_git_blob_sha===blob(prevPath),'input source pin');
 ck(S.revision?.source_matrix_packet?.git_blob_sha===blob(workPath),'source worked matrix blob pin');
 ck(S.revision?.independent_GitHub_Actions_run===37814117693,'prior direct finite source verification provenance');
 ck(S.revision?.Cl02_source_matrix_reconstruction_complete===true&&S.revision?.Eq5_general_index_reconstruction_complete===false,'Cl02 complete but Eq5 open');
 ck(S.status.includes('NOT_FROZEN')&&S.guards.source_census_freeze_complete===false&&S.guards.L132_replay_authorized===false&&S.guards.L_G1_source_reextraction_complete===false,'never promote incomplete G0');
 ck(S.guards?.section2_Eq5_index_complete===false&&S.guards.section2_Cl02_worked_example_complete_source_transcription===true,'source boundary granularity');
 ck(v?.body?.startsWith(o?.body+' '),'L127 original semantics exact prefix');
 for(const t of literal)ck(v?.body?.includes(t),'source paper exact Cl02 literal '+t);
 ck(v?.body?.includes('source-specific finite representations')&&v?.body?.includes('unresolved general-index bivector matrices'),'unqualified source scope and Eq5 gap');
 ck(v?.source_expression_census?.worked_Cl02?.git_blob_sha===blob(workPath),'L127 explicit Cl02 source pointer');
 ck(v?.source_expression_census?.worked_Cl02?.workflow_verification?.conclusion==='success'&&v?.source_expression_census?.worked_Cl02?.authority===false,'CI provenance without authority promotion');
 ck(v?.source_expression_census?.current_source_reconstruction==='CL02_EXACT_MATRICES_RECONSTRUCTED_EQ5_FULL_INDEX_EXPRESSIONS_REMAIN_UNEXPANDED','unexpanded boundary retained');
 ck(j(packet.source_matrix_chain?.matrix_gamma_0)===j(gam0)&&j(packet.source_matrix_chain?.matrix_gamma_1)===j(gam1),'source matrix independent paper fixture');
 ck(j(packet.source_spinor_basis?.map(x=>x.representation))===j(spinors),'source spinors independent paper fixture');
 ck(j(S.items.find(x=>x.id==='L-SSC-125'))===j(prev.items.find(x=>x.id==='L-SSC-125')),'printed source contradiction unchanged');
 ck(!j(S.items).includes('W-SSC-'),'L only');
 return e;
}
const errors=verify();
const cases=[
 ['flip matrix L127 body sign',x=>{x.items.find(z=>z.id==='L-SSC-127').body=x.items.find(z=>z.id==='L-SSC-127').body.replace('gamma_0=[[0,0,-1,0]','gamma_0=[[0,0,1,0]');}],
 ['flip Gamma1 source matrix',x=>{x.items.find(z=>z.id==='L-SSC-127').body=x.items.find(z=>z.id==='L-SSC-127').body.replace('Gamma_1=[[0,-1]','Gamma_1=[[0,1]');}],
 ['remove Qplus spinor',x=>{x.items.find(z=>z.id==='L-SSC-127').body=x.items.find(z=>z.id==='L-SSC-127').body.replace('Qplus_1=[0,0,0,1]','Qplus_1=[0,0,1,0]');}],
 ['change old L125 source discrepancy',x=>{x.items.find(z=>z.id==='L-SSC-125').body='e7e6=+e2';}],
 ['switch old L128 Eq6',x=>{x.items.find(z=>z.id==='L-SSC-128').body='lost';}],
 ['lose Cl02 pin',x=>{x.items.find(z=>z.id==='L-SSC-127').source_expression_census.worked_Cl02.git_blob_sha='bogus';}],
 ['erase Eq5 gap',x=>{x.items.find(z=>z.id==='L-SSC-127').source_expression_census.current_source_reconstruction='COMPLETE_ALL';}],
 ['promote status',x=>{x.status='FROZEN_COMPLETE';}],
 ['authorize L132',x=>{x.guards.L132_replay_authorized=true;}],
 ['assert Eq5 complete',x=>{x.revision.Eq5_general_index_reconstruction_complete=true;}],
 ['remove one SSC body',x=>{x.items.splice(1,1);}]
];
for(const [name,fn]of cases){const p=clone(cur);fn(p);if(verify(p).length===0)errors.push('mutant escaped '+name)}
console.log(JSON.stringify({schema:'isograph.exp062-l-cl02-SSC0_9-source-preservation-verifier.v0.1',pass:errors.length===0,errors,SSC_count:cur.items.length,changed_SSC_items:['L-SSC-127'],preserved_other_items:190,explicit_source_literals:literal.length,adversarial_mutations_rejected:cases.length,stage:'G0_NOT_FROZEN',G1_authorized:false},null,2));
if(errors.length)process.exitCode=1;