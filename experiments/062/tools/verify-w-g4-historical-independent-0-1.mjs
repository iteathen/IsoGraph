import fs from 'node:fs';
import crypto from 'node:crypto';
const pins={"g2":{"path":"experiments/062/W_G2_NEUTRAL_OCCURRENCE_GRAPH_0_3.json","git_blob_sha":"c9ee4f844ee1cb5a7b27378779694361c0d17451"},"g3":{"path":"experiments/062/W_G3_CORE_DEFINABILITY_0_7.json","git_blob_sha":"62e1236d7aa4c7b2814606b1640e35e280b73919"},"g4":{"path":"experiments/062/W_G4_ALPHA_RENAMED_STRUCTURAL_QUOTIENT_0_4.json","git_blob_sha":"4895485b27489fc8028f5b7804ef6d9a6021ffaa"},"g7":{"path":"experiments/062/W_G7_RELATIONAL_TWO_STEP_RETURN_INSTANTIATION_0_1.json","git_blob_sha":"4fb7708649aa37807ab87baea9a31c8358ec9b42"},"gate":{"path":"experiments/062/W_CURRENT_STAGE_GATE_0_40.json","git_blob_sha":"6820a1947d25e0c25a0362d102a72aa787276a65"}};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const x=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex')};
const G=Object.fromEntries(Object.entries(pins).map(([k,v])=>[k,read(v.path)]));
const clone=x=>JSON.parse(JSON.stringify(x));
function derive(G2,G3,G7){
 const status=new Map(G3.items.flatMap(x=>x.occurrences.map(o=>[o.occurrence_id,o.disposition])));
 for(const id of G7.ruling.closed_occurrences)status.set(id,"PROVISIONAL");
 const ix=new Map();
 for(const it of G2.items){
 const nodes=it.graph.nodes,edges=it.graph.edges,byN=new Map(nodes.map(n=>[n.node_id,n]));
 const occurrences=nodes.filter(n=>n.kind==="OPAQUE_SEMANTIC_OCCURRENCE"),oid=new Map(occurrences.map(n=>[n.node_id,n.provenance.occurrence_id]));
 const adj=new Map(occurrences.map(n=>[n.provenance.occurrence_id,new Set()]));
 const deps=edges.filter(e=>e.kind==="INTRA_BODY_DEPENDENCY_INCIDENCE").map(e=>({from:oid.get(e.from),to:oid.get(e.to),position:e.position}));
 for(const e of deps){adj.get(e.from).add(e.to);adj.get(e.to).add(e.from)}
 const feat=new Map();
 for(const n of occurrences){const id=n.provenance.occurrence_id,argE=edges.filter(e=>e.kind==="ORDERED_ARGUMENT_INCIDENCE"&&e.from===n.node_id).sort((a,b)=>a.position-b.position);
 const local=new Map(),pat=argE.map(e=>{const s=byN.get(e.to).provenance.argument_span;if(!local.has(s))local.set(s,local.size);return local.get(s)});
 feat.set(id,JSON.stringify({closure:status.get(id)==="CORE_CLOSED"?"CORE":status.get(id)==="PROVISIONAL"?"PROVISIONAL":"OPEN",logical_force:n.provenance.logical_force_source,ordered_arity:argE.length,pattern:pat}));
 }
 const body={adj,deps,feat};for(const id of feat.keys())ix.set(id,body)
 }
 return ix;
}
function root(ix,id){
 const b=ix.get(id),seen=new Set([id]),q=[id];
 while(q.length){const x=q.shift();for(const v of b.adj.get(x))if(!seen.has(v)){seen.add(v);q.push(v)}}
 const V=[...seen],E=b.deps.filter(x=>seen.has(x.from)&&seen.has(x.to));
 return{root:id,V,E,features:new Map(V.map(x=>[x,JSON.stringify({root:x===id,feature:b.feat.get(x)})]))};
}
function equalGraph(a,b){
 if(a.V.length!==b.V.length||a.E.length!==b.E.length)return false;
 const edge=(g,u,v)=>g.E.filter(e=>e.from===u&&e.to===v).map(e=>e.position).sort((x,y)=>x-y).join(",");
 const options=new Map(a.V.map(x=>[x,b.V.filter(y=>a.features.get(x)===b.features.get(y))]));
 if([...options.values()].some(x=>x.length===0))return false;
 const order=[...a.V].sort((x,y)=>x===a.root?-1:y===a.root?1:options.get(x).length-options.get(y).length);
 const mapping=new Map(),taken=new Set();
 function go(k){if(k===order.length)return true;const x=order[k];for(const y of options.get(x)){
 if(taken.has(y)||edge(a,x,x)!==edge(b,y,y))continue;
 if([...mapping].some(([u,v])=>edge(a,x,u)!==edge(b,y,v)||edge(a,u,x)!==edge(b,v,y)))continue;
 mapping.set(x,y);taken.add(y);if(go(k+1))return true;mapping.delete(x);taken.delete(y)}return false}
 return go(0);
}
const mutations=[
["edge direction reversed",g=>{const from=g.E[0].from;g.E[0].from=g.E[0].to;g.E[0].to=from}],
["edge position changed",g=>{g.E[0].position+=5}],
["edge removed",g=>{g.E=[]}],
["root logical polarity flipped",g=>{g.features.set(g.root,g.features.get(g.root).replace(/OTHER|ASSERTED|NEGATED|CONDITIONAL|COMPARISON|EQUALITY_OR_IDENTIFICATION/,"INVERTED"))}],
["root ordered role arity changed",g=>{const z=JSON.parse(g.features.get(g.root));z.feature=z.feature.replace(/"ordered_arity":\d+/,'"ordered_arity":999');g.features.set(g.root,JSON.stringify(z))}],
["vertex added",g=>{g.V.push("fake");g.features.set("fake","fake")}]
];
const errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg)};
check(G.gate.current_lawful_state.G0_open===true&&G.gate.current_lawful_state.G4_authorized===false,'stage current cannot promote historical G4');
check(G.g4.input.g2_graph.git_blob_sha===pins.g2.git_blob_sha&&G.g4.input.g3_core_definability.git_blob_sha===pins.g3.git_blob_sha,'historical tuple pins');
check(G.g4.input.g7_closure.git_blob_sha===pins.g7.git_blob_sha,'historical G7 overlay pin');
const ix=derive(G.g2,G.g3,G.g7),classes=G.g4.classes,multi=classes.filter(c=>c.member_count>1);
const members=classes.flatMap(c=>c.member_occurrence_ids);
check(classes.length===370&&members.length===430&&new Set(members).size===430,'quotient exact coverage/count');
check(multi.length===28,'multi class count');
let compared=0;
for(const c of multi){const rep=root(ix,c.representative_occurrence_id);for(const id of c.member_occurrence_ids){compared++;check(equalGraph(rep,root(ix,id)),'nonisomorphic class member '+c.class_id+' '+id)}}
check(compared===88,'multi membership checks');
const buckets=new Map();
for(const c of classes){const gr=root(ix,c.representative_occurrence_id);
const ky=JSON.stringify([gr.V.length,gr.E.length,[...gr.features.values()].sort(),gr.E.map(e=>e.position).sort((a,b)=>a-b)]);
if(!buckets.has(ky))buckets.set(ky,[]);buckets.get(ky).push(c)}
let independentPairs=0;for(const cs of buckets.values())for(let i=0;i<cs.length;i++)for(let j=i+1;j<cs.length;j++){independentPairs++;check(!equalGraph(root(ix,cs[i].representative_occurrence_id),root(ix,cs[j].representative_occurrence_id)),'duplicate class '+cs[i].class_id+' '+cs[j].class_id)}
check(independentPairs===148,'cross class coarse collision comparisons');
const c=classes.find(c=>c.class_id==='W-G4-Q0063'),a=root(ix,c.representative_occurrence_id),b=root(ix,c.member_occurrence_ids[1]);
check(equalGraph(a,b)&&a.E.length===1,'positive rooted dependent pair');
const rejected=[],escaped=[];
for(const [label,f] of mutations){const v=clone({V:b.V,E:b.E}),m={root:b.root,V:v.V,E:v.E,features:new Map(b.features)};f(m);if(!equalGraph(a,m))rejected.push(label);else escaped.push(label)}
errors.push(...escaped.map(x=>'ESCAPED MUTATION '+x));
const audit=read('experiments/062/W_G4_HISTORICAL_INDEPENDENT_STRUCTURAL_AUDIT_0_1.json');
if(sha('experiments/062/W_G4_HISTORICAL_INDEPENDENT_STRUCTURAL_AUDIT_0_1.json')!=="5a7f44da18f39269dc46d2815b50716e4ac65ddb")errors.push('audit blob mismatch');
for(const [name,p] of Object.entries(pins))if(sha(p.path)!==p.git_blob_sha)errors.push('pinned historical blob drift '+name);
if(audit.results?.mutation_total!==mutations.length||audit.results?.mutations_rejected!==rejected.length||audit.results?.multi_member_memberships_checked!==compared||audit.results?.coarse_bucket_cross_class_pairs_checked!==independentPairs)errors.push('audit results mismatch');
console.log(JSON.stringify({schema:'isograph.exp062-w-g4-historical-independent-verifier.v0.1',pass:errors.length===0,errors,pinned_historical_tuple:true,classes:classes.length,multi_classes:multi.length,multi_memberships_checked:compared,duplicate_class_comparisons:independentPairs,structural_mutations_rejected:rejected.length,structural_mutations_total:mutations.length,rejected,current_G4_authority:false},null,2));
if(errors.length)process.exitCode=1;
