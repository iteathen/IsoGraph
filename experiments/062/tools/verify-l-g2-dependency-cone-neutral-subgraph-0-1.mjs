import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const graphPath='experiments/062/L_G2_DEPENDENCY_CONE_NEUTRAL_SUBGRAPH_0_1.json';
const inputPath='experiments/062/L_G1_DEPENDENCY_CONE_SOURCE_INCIDENCE_0_2.json';
const genPath='experiments/062/tools/generate-l-g2-dependency-cone-neutral-subgraph-0-1.mjs';
const tempPath='experiments/062/.tmp-l-g2-dependency-cone-replay.json';
const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const blobSha=p=>{
 const b=Buffer.from(read(p),'utf8');
 return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');
};
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};

const G=json(graphPath);
const S=json(inputPath);
check(G.schema==='isograph.exp062-l-g2-dependency-cone-neutral-subgraph.v0.1','schema');
check(G.status==='TARGETED_G2_DEPENDENCY_CLOSED_NEUTRAL_SUBGRAPH_CANDIDATE','status');
check(G.authority===false && G.authority_effect==='NONE_RESEARCH_EVIDENCE_ONLY','authority');
check(G.track==='L','track');
check(G.input?.path===inputPath && G.input?.git_blob_sha===blobSha(inputPath),'input pin');
check(JSON.stringify(G.scope?.census_ids)===JSON.stringify(S.scope?.target_census_ids),'scope');
check(G.scope?.source_expansion===false && G.scope?.cross_track_evidence_used===false && G.scope?.replaces_global_G2===false,'scope firewall');

check(G.counts?.reopened_bodies===4,'body count');
check(G.counts?.semantic_occurrence_roots===28,'occurrence roots');
check(G.counts?.ordered_argument_nodes===104,'argument count');
check(G.counts?.formula_application_nodes===64,'formula app count');
check(G.counts?.formula_term_nodes===64,'formula term count');
check(G.counts?.formula_result_role_nodes===9,'result role count');
check(G.counts?.raw_source_data_nodes===2,'raw data count');
check(G.counts?.total_nodes===271 && G.counts?.total_edges===301,'total graph counts');
check(G.counts?.source_dependency_edges===58 && G.counts?.formula_refinement_edges===18,'dependency/formula counts');

const nodeIds=new Set(G.nodes.map(n=>n.node_id));
check(nodeIds.size===G.nodes.length,'duplicate node IDs');
const edgeIds=new Set(G.edges.map(e=>e.edge_id));
check(edgeIds.size===G.edges.length,'duplicate edge IDs');
for(const e of G.edges){
 check(nodeIds.has(e.from),'missing edge source '+e.edge_id);
 check(nodeIds.has(e.to),'missing edge target '+e.edge_id);
}
for(const n of G.nodes){
 check(G.neutrality_contract.node_kinds.includes(n.kind),'unapproved node kind '+n.kind);
 for(const key of Object.keys(n)){
  if(key==='provenance')continue;
  check(!/^source_/i.test(key),'source semantic label outside provenance '+n.node_id+' '+key);
 }
}
for(const e of G.edges)check(G.neutrality_contract.edge_kinds.includes(e.kind),'unapproved edge kind '+e.kind);

const graphText=JSON.stringify(G);
check(!/W-SSC-/.test(graphText),'W occurrence leak');
check(!/research\/woit-lisi-isomorph\/woit\//.test(graphText),'W source leak');
check(!/\bPD-[A-Z0-9_-]+\b/.test(graphText),'PD category leak');
check(!/\bB-[A-Z0-9_-]+\b/.test(graphText),'candidate basis leak');
check(!/DNWF|DNIA/.test(graphText),'DNWF/DNIA leak');

try{
 execFileSync('node',[genPath,tempPath],{stdio:'pipe'});
 const replay=json(tempPath);
 replay.branch_head_at_creation=G.branch_head_at_creation;
 check(JSON.stringify(replay)===JSON.stringify(G),'deterministic replay mismatch');
}finally{
 if(fs.existsSync(tempPath))fs.unlinkSync(tempPath);
}

console.log(JSON.stringify({
 schema:'isograph.exp062-l-g2-dependency-cone-neutral-subgraph-verifier.v0.1',
 pass:errors.length===0,
 errors,
 counts:G.counts,
 deterministic_replay:errors.includes('deterministic replay mismatch')?false:true
},null,2));
if(errors.length)process.exit(1);
