import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

const g2Path='experiments/062/L_G2_NEUTRAL_OCCURRENCE_GRAPH_0_1.json';
const g3Path='experiments/062/L_G3_CORE_DEFINABILITY_0_5.json';
const g4Path='experiments/062/L_G4_ALPHA_RENAMED_STRUCTURAL_QUOTIENT_0_1.json';
const generatorPath='experiments/062/tools/generate-l-g4-alpha-structural-quotient-0-1.mjs';

const g2=JSON.parse(fs.readFileSync(g2Path,'utf8'));
const g3=JSON.parse(fs.readFileSync(g3Path,'utf8'));
const g4=JSON.parse(fs.readFileSync(g4Path,'utf8'));
const errors=[];
const fail=m=>errors.push(m);
const blob=p=>execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();
const stable=x=>JSON.stringify(x);

if(g4.schema!=='isograph.exp062-l-g4-alpha-renamed-structural-quotient.v0.1') fail('schema mismatch');
if(g4.track!=='L'||g4.comparison_scope!=='L_ONLY') fail('scope mismatch');
if(g4.authority!==false) fail('G4 artifact must remain non-authority');
if(g4.input?.g2_graph?.path!==g2Path||g4.input?.g2_graph?.git_blob_sha!==blob(g2Path)) fail('G2 revision pin mismatch');
if(g4.input?.g3_fixed_point?.path!==g3Path||g4.input?.g3_fixed_point?.git_blob_sha!==blob(g3Path)) fail('G3 revision pin mismatch');
if(g3.fixed_point?.G3_complete!==true||g3.fixed_point?.L_local_G4_authorized!==true) fail('G3 does not authorize L-local G4');
if(g3.fixed_point?.cross_track_G4_authorized!==false||g3.fixed_point?.G4_authorized!==false) fail('cross-track/global G4 gate must remain blocked');
if(g4.gate?.cross_track_G4_authorized!==false||g4.gate?.G5_authorized!==false) fail('candidate overclaims downstream authorization');

const disposition=new Map();
const sourceOrder=[];
for(const item of g3.items||[]) for(const row of item.occurrences||[]){
  disposition.set(row.occurrence_id,row.disposition);
  sourceOrder.push(row.occurrence_id);
}
if(disposition.size!==818) fail('G3 occurrence coverage is not 818');

function indexG2(data){
  const bodyByOccurrence=new Map();
  for(const item of data.items||[]){
    const nodes=item.graph?.nodes||[];
    const edges=item.graph?.edges||[];
    const nodeById=new Map(nodes.map(n=>[n.node_id,n]));
    const occNodes=nodes.filter(n=>n.kind==='OPAQUE_SEMANTIC_OCCURRENCE');
    const occByNode=new Map(occNodes.map(n=>[n.node_id,n.provenance?.occurrence_id]));
    const depEdges=edges.filter(e=>e.kind==='INTRA_BODY_DEPENDENCY_INCIDENCE').map(e=>({
      from:occByNode.get(e.from),to:occByNode.get(e.to),position:e.position
    }));
    const adjacency=new Map(occNodes.map(n=>[n.provenance?.occurrence_id,new Set()]));
    for(const e of depEdges){
      if(!e.from||!e.to) throw new Error(item.census_id+': invalid dependency endpoint');
      adjacency.get(e.from)?.add(e.to);
      adjacency.get(e.to)?.add(e.from);
    }
    const feature=new Map();
    for(const node of occNodes){
      const id=node.provenance?.occurrence_id;
      const argEdges=edges.filter(e=>e.kind==='ORDERED_ARGUMENT_INCIDENCE'&&e.from===node.node_id).sort((a,b)=>a.position-b.position);
      const local=new Map();
      let next=0;
      const pattern=argEdges.map(e=>{
        const span=nodeById.get(e.to)?.provenance?.argument_span;
        if(typeof span!=='string') throw new Error(id+': missing argument span');
        if(!local.has(span)) local.set(span,next++);
        return local.get(span);
      });
      const state=disposition.get(id);
      if(!['CORE_CLOSED','UNEXPANDED_DEMAND'].includes(state)) throw new Error(id+': non-final G3 state '+state);
      feature.set(id,{
        closure_state:state==='CORE_CLOSED'?'CORE_CLOSED_BOUNDARY':'UNEXPANDED_DEMAND',
        logical_force:node.provenance?.logical_force_source,
        ordered_arity:argEdges.length,
        local_argument_identity_pattern:pattern
      });
    }
    const body={census_id:item.census_id,depEdges,adjacency,feature};
    for(const id of feature.keys()) bodyByOccurrence.set(id,body);
  }
  return bodyByOccurrence;
}

function rootedGraph(root,index){
  const body=index.get(root);
  if(!body) throw new Error(root+': body unavailable');
  const seen=new Set([root]);
  const queue=[root];
  const nodes=[];
  while(queue.length){
    const id=queue.shift();
    nodes.push(id);
    for(const n of body.adjacency.get(id)||[]) if(!seen.has(n)){seen.add(n);queue.push(n);}
  }
  const set=new Set(nodes);
  const edges=body.depEdges.filter(e=>set.has(e.from)&&set.has(e.to));
  const features=new Map(nodes.map(id=>[id,{
    root:id===root,
    ...body.feature.get(id)
  }]));
  return {root,nodes,edges,features};
}

function edgeKey(g,from,to){
  return g.edges.filter(e=>e.from===from&&e.to===to).map(e=>e.position).sort((a,b)=>a-b).join(',');
}
function featureKey(g,id){return stable(g.features.get(id));}

function exactIso(a,b){
  if(a.nodes.length!==b.nodes.length||a.edges.length!==b.edges.length) return false;
  if(featureKey(a,a.root)!==featureKey(b,b.root)) return false;

  const candidates=new Map();
  for(const av of a.nodes){
    const k=featureKey(a,av);
    const xs=b.nodes.filter(bv=>featureKey(b,bv)===k);
    if(!xs.length) return false;
    candidates.set(av,xs);
  }
  const order=[...a.nodes].sort((x,y)=>{
    if(x===a.root) return -1;
    if(y===a.root) return 1;
    const d=candidates.get(x).length-candidates.get(y).length;
    if(d) return d;
    return featureKey(a,x).localeCompare(featureKey(a,y));
  });
  const map=new Map();
  const used=new Set();

  function compatible(av,bv){
    if((av===a.root)!==(bv===b.root)) return false;
    if(featureKey(a,av)!==featureKey(b,bv)) return false;
    if(edgeKey(a,av,av)!==edgeKey(b,bv,bv)) return false;
    for(const [am,bm] of map){
      if(edgeKey(a,av,am)!==edgeKey(b,bv,bm)) return false;
      if(edgeKey(a,am,av)!==edgeKey(b,bm,bv)) return false;
    }
    return true;
  }
  function search(i){
    if(i===order.length) return true;
    const av=order[i];
    for(const bv of candidates.get(av)){
      if(used.has(bv)||!compatible(av,bv)) continue;
      map.set(av,bv); used.add(bv);
      if(search(i+1)) return true;
      map.delete(av); used.delete(bv);
    }
    return false;
  }
  return search(0);
}

function coarseKey(g){
  const fs=[...g.nodes].map(id=>featureKey(g,id)).sort();
  const positions=g.edges.map(e=>e.position).sort((a,b)=>a-b);
  return stable([g.nodes.length,g.edges.length,fs,positions]);
}

const index=indexG2(g2);
const unresolved=sourceOrder.filter(id=>disposition.get(id)==='UNEXPANDED_DEMAND');
const closed=sourceOrder.filter(id=>disposition.get(id)==='CORE_CLOSED');
if(unresolved.length!==736) fail('expected 736 unresolved roots');
if(closed.length!==82) fail('expected 82 Core-closed roots');

const unresolvedSet=new Set(unresolved);
const closedSet=new Set(closed);
const memberSeen=new Set();
const classByMember=new Map();
const representativeGraphs=[];
for(let ci=0;ci<(g4.classes||[]).length;ci++){
  const c=g4.classes[ci];
  const expectedId='L-G4-Q'+String(ci+1).padStart(4,'0');
  if(c.class_id!==expectedId) fail(c.class_id+': nondeterministic class numbering');
  if(!Array.isArray(c.member_occurrence_ids)||c.member_occurrence_ids.length!==c.member_count) fail(c.class_id+': member count mismatch');
  if(!c.member_occurrence_ids.includes(c.representative_occurrence_id)) fail(c.class_id+': representative is not a member');
  if(!unresolvedSet.has(c.representative_occurrence_id)) fail(c.class_id+': representative is not unresolved');
  const rep=rootedGraph(c.representative_occurrence_id,index);
  representativeGraphs.push(rep);
  if(rep.nodes.length!==c.component_node_count) fail(c.class_id+': node count mismatch');
  if(rep.edges.length!==c.component_dependency_edge_count) fail(c.class_id+': edge count mismatch');
  const features=rep.nodes.map(id=>rep.features.get(id)).sort((a,b)=>stable(a).localeCompare(stable(b)));
  if(stable(features)!==stable(c.structural_feature_multiset)) fail(c.class_id+': structural feature multiset mismatch');
  if(c.exact_isomorphism_verified_against_representative!==true) fail(c.class_id+': exact-isomorphism flag missing');
  if(!/^[0-9a-f]{64}$/.test(c.structural_invariant_sha256||'')) fail(c.class_id+': malformed invariant hash');

  for(const id of c.member_occurrence_ids){
    if(!unresolvedSet.has(id)) fail(c.class_id+': non-unresolved target '+id);
    if(closedSet.has(id)) fail(c.class_id+': Core-closed target leaked '+id);
    if(memberSeen.has(id)) fail('duplicate quotient membership '+id);
    memberSeen.add(id); classByMember.set(id,c.class_id);
    const g=rootedGraph(id,index);
    if(!exactIso(rep,g)) fail(c.class_id+': member not exactly isomorphic '+id);
  }
}
if(memberSeen.size!==736) fail('quotient membership does not cover 736 roots');
for(const id of unresolvedSet) if(!memberSeen.has(id)) fail('uncovered unresolved root '+id);
for(const id of closedSet) if(memberSeen.has(id)) fail('Core-closed root appears as quotient target '+id);

const byCoarse=new Map();
for(let i=0;i<representativeGraphs.length;i++){
  const k=coarseKey(representativeGraphs[i]);
  if(!byCoarse.has(k)) byCoarse.set(k,[]);
  byCoarse.get(k).push(i);
}
for(const group of byCoarse.values()){
  for(let x=0;x<group.length;x++) for(let y=x+1;y<group.length;y++){
    const i=group[x],j=group[y];
    if(exactIso(representativeGraphs[i],representativeGraphs[j])){
      fail('duplicate isomorphic quotient classes '+g4.classes[i].class_id+' and '+g4.classes[j].class_id);
    }
  }
}

const sizeDistribution={};
let singleton=0,multi=0,largest=0;
for(const c of g4.classes||[]){
  sizeDistribution[c.member_count]=(sizeDistribution[c.member_count]||0)+1;
  if(c.member_count===1) singleton++; else multi++;
  largest=Math.max(largest,c.member_count);
}
if(g4.counts?.unresolved_input_occurrences!==736) fail('G4 unresolved-input count mismatch');
if(g4.counts?.quotient_classes!==(g4.classes||[]).length) fail('quotient-class count mismatch');
if(g4.counts?.singleton_classes!==singleton||g4.counts?.multi_member_classes!==multi||g4.counts?.largest_class_size!==largest) fail('class-size summary mismatch');
if(stable(g4.counts?.size_distribution)!==stable(sizeDistribution)) fail('size distribution mismatch');

const mut=JSON.parse(JSON.stringify(g2));
let occSerial=0;
for(const item of mut.items||[]){
  const nodes=item.graph?.nodes||[];
  const edges=item.graph?.edges||[];
  const byNode=new Map(nodes.map(n=>[n.node_id,n]));
  for(const n of nodes.filter(n=>n.kind==='OPAQUE_SEMANTIC_OCCURRENCE')){
    occSerial++;
    n.provenance.source_span='SYNTHETIC_SOURCE_'+occSerial;
    n.provenance.relation_span='SYNTHETIC_RELATION_'+occSerial;
    n.provenance.load_bearing_note='SYNTHETIC_NOTE_'+occSerial;
    const args=edges.filter(e=>e.kind==='ORDERED_ARGUMENT_INCIDENCE'&&e.from===n.node_id).sort((a,b)=>a.position-b.position);
    const local=new Map(); let next=0;
    for(const e of args){
      const an=byNode.get(e.to);
      const old=an?.provenance?.argument_span;
      if(!local.has(old)) local.set(old,next++);
      an.provenance.argument_span='SYNTHETIC_ARG_'+occSerial+'_'+local.get(old);
    }
  }
}
const mutatedIndex=indexG2(mut);
for(const id of unresolved){
  if(!exactIso(rootedGraph(id,index),rootedGraph(id,mutatedIndex))) fail('source-text relabel invariance failed '+id);
}

const structuralOnly=stable((g4.classes||[]).map(c=>({
  class_id:c.class_id,
  member_count:c.member_count,
  component_node_count:c.component_node_count,
  component_dependency_edge_count:c.component_dependency_edge_count,
  structural_feature_multiset:c.structural_feature_multiset
})));
for(const re of [/\bPD-[A-Z0-9-]+/i,/\bB-[A-Z0-9-]+/i,/DNWF/i,/DNIA/i,/L-SSC-/i,/W-SSC-/i]){
  if(re.test(structuralOnly)) fail('forbidden pre-G5/cross-track token in structural quotient: '+re);
}

execFileSync('node',[generatorPath],{stdio:'pipe'});
const diff=execFileSync('git',['diff','--',g4Path],{encoding:'utf8'});
if(diff.trim()) fail('G4 generator does not replay materialized quotient exactly');

console.log(JSON.stringify({
  schema:'isograph.exp062-verify-l-g4-alpha-renamed-structural-quotient.v0.1',
  pass:errors.length===0,
  errors,
  counts:{
    unresolved_roots:unresolved.length,
    core_closed_roots:closed.length,
    quotient_classes:(g4.classes||[]).length,
    singleton_classes:singleton,
    multi_member_classes:multi,
    largest_class_size:largest
  },
  exact_class_internal_isomorphism:true,
  duplicate_isomorphic_class_check:true,
  source_text_relabel_invariance:true,
  deterministic_replay_exact:diff.trim()==='',
  L_G4_complete_if_pass:errors.length===0,
  L_local_G5_authorized_if_pass:errors.length===0,
  cross_track_comparison_authorized:false
},null,2));
if(errors.length) process.exit(1);
