import fs from 'node:fs';
import crypto from 'node:crypto';

const g2Path='experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_1.json';
const g3Path='experiments/062/W_G3_CORE_DEFINABILITY_0_5.json';
const outputPath='experiments/062/W_G4_ALPHA_RENAMED_STRUCTURAL_QUOTIENT_0_1.json';

const g2=JSON.parse(fs.readFileSync(g2Path,'utf8'));
const g3=JSON.parse(fs.readFileSync(g3Path,'utf8'));
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');

if(g2.track!=='W'||g3.track!=='W') throw new Error('W track mismatch');
if(g3.fixed_point?.G3_complete!==true||g3.fixed_point?.W_local_G4_authorized!==true) throw new Error('W G3 fixed point does not authorize W-local G4');
if(g3.fixed_point?.cross_track_G4_authorized!==false||g3.fixed_point?.G4_authorized!==false) throw new Error('cross-track/global G4 must remain blocked');

const disposition=new Map();
const sourceOrder=[];
for(const item of g3.items||[]) for(const row of item.occurrences||[]){
  disposition.set(row.occurrence_id,row.disposition);
  sourceOrder.push(row.occurrence_id);
}

const bodyByOccurrence=new Map();
for(const item of g2.items||[]){
  const nodeById=new Map((item.graph?.nodes||[]).map(n=>[n.node_id,n]));
  const occurrenceNodes=(item.graph?.nodes||[]).filter(n=>n.kind==='OPAQUE_SEMANTIC_OCCURRENCE');
  const occurrenceByNode=new Map(occurrenceNodes.map(n=>[n.node_id,n.provenance?.occurrence_id]));
  const dependencyEdges=(item.graph?.edges||[]).filter(e=>e.kind==='INTRA_BODY_DEPENDENCY_INCIDENCE').map(e=>({
    from:occurrenceByNode.get(e.from),
    to:occurrenceByNode.get(e.to),
    position:e.position
  }));
  const adjacency=new Map(occurrenceNodes.map(n=>[n.provenance?.occurrence_id,new Set()]));
  for(const e of dependencyEdges){
    if(!e.from||!e.to) throw new Error(item.census_id+': dependency edge lacks occurrence endpoint');
    adjacency.get(e.from).add(e.to);
    adjacency.get(e.to).add(e.from);
  }

  const feature=new Map();
  for(const node of occurrenceNodes){
    const occurrenceId=node.provenance?.occurrence_id;
    const argumentEdges=(item.graph?.edges||[]).filter(e=>e.kind==='ORDERED_ARGUMENT_INCIDENCE'&&e.from===node.node_id).sort((a,b)=>a.position-b.position);
    const localReferent=new Map();
    let nextReferent=0;
    const argumentIdentityPattern=argumentEdges.map(e=>{
      const span=nodeById.get(e.to)?.provenance?.argument_span;
      if(typeof span!=='string') throw new Error(occurrenceId+': argument provenance unavailable');
      if(!localReferent.has(span)) localReferent.set(span,nextReferent++);
      return localReferent.get(span);
    });
    const state=disposition.get(occurrenceId);
    if(!['CORE_CLOSED','UNEXPANDED_DEMAND'].includes(state)) throw new Error(occurrenceId+': G4 received non-final G3 state '+state);
    feature.set(occurrenceId,{
      closure_state:state==='CORE_CLOSED'?'CORE_CLOSED_BOUNDARY':'UNEXPANDED_DEMAND',
      logical_force:node.provenance?.logical_force_source,
      ordered_arity:argumentEdges.length,
      local_argument_identity_pattern:argumentIdentityPattern
    });
  }

  const shared={census_id:item.census_id,dependencyEdges,adjacency,feature};
  for(const id of feature.keys()) bodyByOccurrence.set(id,shared);
}

function buildRootedGraph(root){
  const body=bodyByOccurrence.get(root);
  if(!body) throw new Error(root+': body graph unavailable');
  const component=[];
  const seen=new Set([root]);
  const queue=[root];
  while(queue.length){
    const id=queue.shift();
    component.push(id);
    for(const n of body.adjacency.get(id)||[]) if(!seen.has(n)){seen.add(n);queue.push(n);}
  }
  const componentSet=new Set(component);
  const edges=body.dependencyEdges.filter(e=>componentSet.has(e.from)&&componentSet.has(e.to));
  const base=new Map(component.map(id=>[id,JSON.stringify({
    root:id===root,
    ...body.feature.get(id)
  })]));

  let colors=new Map([...base].map(([id,v])=>[id,hash(v)]));
  for(let iteration=0;iteration<component.length+2;iteration++){
    const next=new Map();
    for(const id of component){
      const outgoing=edges.filter(e=>e.from===id).map(e=>['OUT',e.position,colors.get(e.to)]).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
      const incoming=edges.filter(e=>e.to===id).map(e=>['IN',e.position,colors.get(e.from)]).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
      next.set(id,hash(JSON.stringify([base.get(id),outgoing,incoming])));
    }
    colors=next;
  }

  const edgeKey=(from,to)=>edges.filter(e=>e.from===from&&e.to===to).map(e=>e.position).sort((a,b)=>a-b).join(',');
  const nodeColorMultiset=[...colors.values()].sort();
  const edgeColorMultiset=edges.map(e=>[colors.get(e.from),e.position,colors.get(e.to)]).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
  const invariantRaw=JSON.stringify([colors.get(root),nodeColorMultiset,edgeColorMultiset]);

  return {
    root,
    census_id:body.census_id,
    nodes:component,
    edges,
    base,
    colors,
    edgeKey,
    invariantRaw,
    invariantSha256:hash(invariantRaw)
  };
}

function exactRootedIsomorphism(a,b){
  if(a.nodes.length!==b.nodes.length||a.edges.length!==b.edges.length||a.invariantRaw!==b.invariantRaw) return null;
  const candidates=new Map();
  for(const av of a.nodes){
    const matches=b.nodes.filter(bv=>a.colors.get(av)===b.colors.get(bv)&&a.base.get(av)===b.base.get(bv));
    if(!matches.length) return null;
    candidates.set(av,matches);
  }

  const order=[...a.nodes].sort((x,y)=>{
    if(x===a.root) return -1;
    if(y===a.root) return 1;
    const d=candidates.get(x).length-candidates.get(y).length;
    if(d) return d;
    return a.base.get(x).localeCompare(a.base.get(y));
  });
  const mapping=new Map();
  const used=new Set();

  function compatible(av,bv){
    if((av===a.root)!==(bv===b.root)) return false;
    if(a.base.get(av)!==b.base.get(bv)) return false;
    for(const [am,bm] of mapping){
      if(a.edgeKey(av,am)!==b.edgeKey(bv,bm)) return false;
      if(a.edgeKey(am,av)!==b.edgeKey(bm,bv)) return false;
    }
    return true;
  }

  function search(index){
    if(index===order.length) return new Map(mapping);
    const av=order[index];
    for(const bv of candidates.get(av)){
      if(used.has(bv)||!compatible(av,bv)) continue;
      mapping.set(av,bv);
      used.add(bv);
      const result=search(index+1);
      if(result) return result;
      mapping.delete(av);
      used.delete(bv);
    }
    return null;
  }

  return search(0);
}

const unresolvedRoots=sourceOrder.filter(id=>disposition.get(id)==='UNEXPANDED_DEMAND');
if(unresolvedRoots.length!==412) throw new Error('expected 412 W unresolved roots');

const classes=[];
const classesByInvariant=new Map();
for(const root of unresolvedRoots){
  const graph=buildRootedGraph(root);
  let classIndex=null;
  for(const candidateIndex of classesByInvariant.get(graph.invariantSha256)||[]){
    const representative=classes[candidateIndex].representativeGraph;
    if(exactRootedIsomorphism(representative,graph)){classIndex=candidateIndex;break;}
  }
  if(classIndex===null){
    classIndex=classes.length;
    const structuralFeatures=graph.nodes.map(id=>JSON.parse(graph.base.get(id))).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
    classes.push({
      representativeGraph:graph,
      memberOccurrenceIds:[root],
      structuralFeatures
    });
    if(!classesByInvariant.has(graph.invariantSha256)) classesByInvariant.set(graph.invariantSha256,[]);
    classesByInvariant.get(graph.invariantSha256).push(classIndex);
  }else{
    classes[classIndex].memberOccurrenceIds.push(root);
  }
}

const quotientClasses=classes.map((c,index)=>({
  class_id:'W-G4-Q'+String(index+1).padStart(4,'0'),
  representative_occurrence_id:c.representativeGraph.root,
  representative_census_id:c.representativeGraph.census_id,
  member_occurrence_ids:c.memberOccurrenceIds,
  member_count:c.memberOccurrenceIds.length,
  component_node_count:c.representativeGraph.nodes.length,
  component_dependency_edge_count:c.representativeGraph.edges.length,
  structural_invariant_sha256:c.representativeGraph.invariantSha256,
  structural_feature_multiset:c.structuralFeatures,
  exact_isomorphism_verified_against_representative:true
}));

const sizeDistribution={};
for(const c of quotientClasses) sizeDistribution[c.member_count]=(sizeDistribution[c.member_count]||0)+1;
const multiMember=quotientClasses.filter(c=>c.member_count>1).length;

const output={
  schema:'isograph.exp062-w-g4-alpha-renamed-structural-quotient.v0.1',
  date:'2026-10-06',
  status:'W_LOCAL_G4_STRUCTURAL_QUOTIENT_CANDIDATE',
  authority_effect:'NONE_RESEARCH_EVIDENCE_ONLY',
  authority:false,
  track:'W',
  comparison_scope:'W_ONLY',
  governing_method:'research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md',
  input:{
    g2_graph:g2Path,
    g3_fixed_point:g3Path
  },
  gate:{
    W_G3_complete:true,
    W_local_G4_authorized:true,
    cross_track_G4_authorized:false,
    G5_authorized:false
  },
  canonicalization:{
    root_scope:'Each UNEXPANDED_DEMAND occurrence is a root in its complete same-body dependency-connected occurrence component.',
    alpha_renaming:'Source referent text is removed from the comparison. Within one occurrence only, exact repeated argument spans are conserved as a local equality pattern of fresh integer variables; no identity is inferred across occurrences.',
    retained_structure:[
      'root position',
      'G3 closure state: UNEXPANDED_DEMAND or CORE_CLOSED_BOUNDARY',
      'generic G1 logical force/polarity descriptor',
      'ordered argument arity',
      'within-occurrence local argument identity repetition pattern',
      'directed dependency incidence',
      'dependency position/multiplicity',
      'full dependency-connected component including Core-closed context boundaries'
    ],
    omitted_from_keys:[
      'source_span',
      'relation_span',
      'load_bearing_note',
      'definition_status',
      'census_id',
      'occurrence_id',
      'source-domain nouns',
      'historical demand categories',
      'candidate-basis labels'
    ],
    binding_status:'W G1 0.18 provides no explicit binder table; no binder ownership is invented.',
    exact_match_rule:'Hashed iterative refinement is only a prefilter. Class membership requires an exact rooted labeled directed-graph isomorphism by backtracking against the class representative.',
    source_order_role:'Frozen W occurrence order determines only deterministic class numbering and provenance order; it is not part of the structural isomorphism key.'
  },
  forbidden_evidence:[
    'No L occurrence, graph, or cross-track correspondence is read.',
    'No PD-* demand category is used.',
    'No B-* candidate basis ID is used.',
    'No DNWF or DNIA artifact is used.',
    'No relation/source word is used as an isomorphism key.',
    'No conventional mathematical category is inferred.'
  ],
  counts:{
    unresolved_input_occurrences:unresolvedRoots.length,
    quotient_classes:quotientClasses.length,
    singleton_classes:quotientClasses.filter(c=>c.member_count===1).length,
    multi_member_classes:multiMember,
    largest_class_size:Math.max(...quotientClasses.map(c=>c.member_count)),
    size_distribution:sizeDistribution
  },
  classes:quotientClasses,
  fixed_point:{
    W_G4_complete:false,
    reason:'The deterministic quotient candidate must pass independent mechanical reconstruction/isomorphism verification before W-local G4 is frozen.',
    W_local_G5_authorized:false,
    cross_track_comparison_authorized:false
  },
  next_required_steps:[
    'Verify exact coverage of all 412 unresolved W roots and exclusion of all 13 CORE_CLOSED roots.',
    'Recompute every rooted component and exact representative isomorphism without source labels.',
    'Run relabel-invariance controls proving source wording is absent from quotient keys.',
    'If verification is zero-defect, freeze the W-local G4 quotient; only then consider W-local G5 candidate-basis synthesis.'
  ]
};

fs.writeFileSync(outputPath,JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({output:outputPath,counts:output.counts},null,2));
