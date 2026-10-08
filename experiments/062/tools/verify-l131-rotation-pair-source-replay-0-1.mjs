import fs from 'node:fs';
import crypto from 'node:crypto';

const P='experiments/062/';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const oldS=read(P+'L131_G1_SOURCE_INCIDENCE_0_2.json');
const oldG=read(P+'L131_G2_NEUTRAL_SUBGRAPH_0_2.json');
const oldQ=read(P+'L131_G3_CORE_DEFINABILITY_0_2.json');
const audit=read(P+'L131_G1_SOURCE_GRANULARITY_REOPEN_AUDIT_0_4.json');
const defect=read(P+'L131_ROTATION_PAIR_SOURCE_FIDELITY_DEFECT_0_1.json');
const sourceDefect=read(P+'L131_SOURCE_FIDELITY_DEFECT_0_1.json');
const S=read(P+'L131_G1_SOURCE_INCIDENCE_0_3.json');
const G=read(P+'L131_G2_NEUTRAL_SUBGRAPH_0_3.json');
const Q=read(P+'L131_G3_CORE_DEFINABILITY_0_3.json');
const clone=x=>JSON.parse(JSON.stringify(x));
const expected=['EQUAL','R_v^(uw)',['COMPOSE_ORDERED','R_v^w','R_v^u']];
const j=x=>JSON.stringify(x);

function verify(s,g,q){
  const errs=[],check=(cond,label)=>{if(!cond)errs.push(label)};
  check(s.occurrences?.length===13&&s.counts?.reopened_occurrences===13,'G1 occurrence conservation');
  check(j(s.occurrences?.slice(0,10))===j(oldS.occurrences.slice(0,10)),'old first ten G1 changed');
  check(j(s.occurrences?.[11])===j(oldS.occurrences[11]),'old R12 changed');
  const r11=s.occurrences?.[10],r12=s.occurrences?.[11],r13=s.occurrences?.[12];
  const prior11=clone(oldS.occurrences[10]);
  if(prior11&&r11) {
    const revised=clone(r11);revised.depends_on=revised.depends_on.filter(x=>x!=='L-SSC-131-R13');
    check(j(revised)===j(prior11),'R11 changed other than source dependency');
  }
  check(r11?.depends_on?.filter(x=>x==='L-SSC-131-R13').length===1,'missing exact R11-R13 link');
  check(r12?.occurrence_id==='L-SSC-131-R12','R12 identity lost');
  check(r13?.occurrence_id==='L-SSC-131-R13','R13 identity lost');
  // A separate literal comparison cannot derive the source formula from the same artifact.
  check(j(r13?.exact_source_expression?.assertions)===j([expected]),'R13 source expression differs from frozen independent fixture');
  check(r13?.logical_force==='ASSERTED_SOURCE_OPERATOR_EQUALITY','R13 source equality polarity');
  check(['V','Q_minus','Q_plus'].every(c=>r13?.argument_spans?.some(x=>x.includes(c))),'R13 typed three-carrier coverage');
  check(r13?.argument_spans?.includes('u')&&r13?.argument_spans?.includes('w'),'R13 shared source parameters');
  check(j(r13?.depends_on)===j(['L-SSC-131-R05','L-SSC-131-R06','L-SSC-131-R07']),'R13 dependency list');
  check(s.source_expansion===false&&s.cross_track_evidence_used===false,'source scope or cross-track leak G1');

  const nodes=g.graph?.nodes??[],edges=g.graph?.edges??[];
  const nmap=new Map(nodes.map(n=>[n.node_id,n]));const emap=new Map();
  for(const e of edges){if(!emap.has(e.from))emap.set(e.from,[]);emap.get(e.from).push(e)}
  check(nodes.length===135&&edges.length===217,'G2 exact graph cardinality');
  check(new Set(nodes.map(n=>n.node_id)).size===nodes.length,'duplicate G2 node');
  check(new Set(edges.map(e=>e.edge_id)).size===edges.length,'duplicate G2 edge');
  check(edges.every(e=>nmap.has(e.from)&&nmap.has(e.to)),'dangling graph edge');
  check(j(nodes.slice(0,oldG.graph.nodes.length))===j(oldG.graph.nodes),'old G2 nodes changed');
  check(j(edges.slice(0,oldG.graph.edges.length))===j(oldG.graph.edges),'old G2 edges changed');
  check(g.counts?.total_nodes===nodes.length&&g.counts?.total_edges===edges.length,'G2 declared total mismatch');
  check(g.counts?.occurrence_roots===13,'missing occurrence root count');
  check(g.counts?.dependency_edges===edges.filter(e=>e.kind==='INTRA_BODY_DEPENDENCY_INCIDENCE').length,'G2 dependency count mismatch');
  const de=(root,target)=>edges.filter(e=>e.from===root&&e.to===target&&e.kind==='INTRA_BODY_DEPENDENCY_INCIDENCE').length;
  check(de('L131-G2-O11','L131-G2-O13')===1,'R11-R13 graph edge missing');
  for (const occ of s.occurrences??[]) {
    const idx=occ.occurrence_id.slice(-2),root='L131-G2-O'+idx;
    const outgoing=(emap.get(root)||[]).filter(e=>e.kind==='INTRA_BODY_DEPENDENCY_INCIDENCE').sort((a,b)=>a.position-b.position);
    const expectedDeps=(occ.depends_on||[]).map(dep=>'L131-G2-O'+dep.slice(-2));
    check(j(outgoing.map(e=>e.to))===j(expectedDeps),'G1/G2 dependency mismatch '+root);
  }
  function term(id,stack=new Set()){
    if(stack.has(id)||!nmap.has(id))return {bad:'cycle/missing'};
    const n=nmap.get(id);
    if(n.kind==='RAW_SOURCE_TERM')return n.raw_value_provenance;
    if(n.kind!=='OPAQUE_SOURCE_TERM_APPLICATION')return {bad:'not application'};
    const ordered=(emap.get(id)||[]).filter(e=>e.kind==='SOURCE_ORDERED_TERM_INCIDENCE').sort((a,b)=>a.position-b.position);
    if(ordered.length!==n.arity||ordered.some((e,i)=>e.position!==i+1))return {bad:'arity/order'};
    const next=new Set(stack);next.add(id);
    return [n.raw_operator_provenance,...ordered.map(e=>term(e.to,next))];
  }
  const roots=(emap.get('L131-G2-O13')||[]).filter(e=>e.kind==='EXACT_SOURCE_EXPRESSION_ASSERTION_INCIDENCE').sort((a,b)=>a.position-b.position);
  check(roots.length===1&&roots[0]?.position===1,'wrong number/order of exact source equations');
  check(j(roots.map(x=>term(x.to)))===j([expected]),'G2 independent exact ordered operator expression');
  check(j(roots.map(x=>term(x.to)))===j(r13?.exact_source_expression?.assertions),'G1-to-G2 exact reconstructability');

  check(q.input?.git_blob_sha===sha(P+'L131_G2_NEUTRAL_SUBGRAPH_0_3.json'),'G3 input pin stale');
  check(q.source_incidence?.git_blob_sha===sha(P+'L131_G1_SOURCE_INCIDENCE_0_3.json'),'G3 source pin stale');
  check(q.results?.length===13&&q.counts?.reopened_occurrences===13,'G3 count mismatch');
  check(j(q.results?.slice(0,10))===j(oldQ.results.slice(0,10)),'old G3 dispositions changed');
  check(q.results?.filter(x=>x.disposition==='CORE_CLOSED').length===10,'G3 Core closure count wrong');
  check(q.results?.filter(x=>x.disposition==='UNEXPANDED_DEMAND').length===3,'G3 unexpanded count wrong');
  check(['L-SSC-131-R11','L-SSC-131-R12','L-SSC-131-R13'].every(id=>q.results?.find(x=>x.occurrence_id===id)?.disposition==='UNEXPANDED_DEMAND'),'source operator demand prematurely closed');
  check(q.fixed_point?.targeted_L131_complete===false&&q.fixed_point?.source_track_IA_authorized===false&&q.fixed_point?.dependent_L132_replay_authorized===false,'invalid closure / dependent gate');
  check(q.fixed_point?.G4_required===true,'G4 prematurely bypassed');
  check(!/W-SSC-|\/woit\//i.test(j([s,g,q])),'cross-track contaminant');
  return errs;
}
const errors=verify(S,G,Q);
const pin=(record,label)=>{if(!record||!fs.existsSync(record.path)||sha(record.path)!==record.git_blob_sha)errors.push('missing/stale '+label)};
pin(S.audit,'G1 audit');pin(G.input,'G2 source');pin(Q.input,'G3 graph');
pin(audit.defect,'audit defect');
if(!sourceDefect.defect?.source_equations?.length||!defect.source?.exact_source_operator_assertion)errors.push('missing upstream defect content');
if(j(defect.source.exact_source_operator_assertion)!==j(expected))errors.push('defect did not preserve frozen literal equation');
if(!audit.replay_contract||!audit.replay_contract.R11_new_dependency)errors.push('reopen audit missing source incidence change');
if(S.defects?.length!==2)errors.push('G1 defect chain missing');

const mutations=[
  ['swapped reflection order',(s)=>{s.occurrences[12].exact_source_expression.assertions[0][2].reverse();}],
  ['swapped pair parameters',(s)=>{s.occurrences[12].exact_source_expression.assertions[0][2][1]='R_v^u';}],
  ['omitted source identity',(s)=>{s.occurrences[12].exact_source_expression.assertions=[];}],
  ['missing spinor carrier',(s)=>{s.occurrences[12].argument_spans=s.occurrences[12].argument_spans.filter(x=>!x.includes('Q_plus'));}],
  ['missing R11 dependency',(s)=>{s.occurrences[10].depends_on=s.occurrences[10].depends_on.filter(x=>x!=='L-SSC-131-R13');}],
  ['source equality polarity flip',(s)=>{s.occurrences[12].logical_force='SOURCE_NOTE_ONLY';}],
  ['premature G3 promotion',(_,g,q)=>{q.results[12].disposition='CORE_CLOSED';}],
  ['missing graph dependency',(_,g)=>{g.graph.edges=g.graph.edges.filter(e=>!(e.from==='L131-G2-O11'&&e.to==='L131-G2-O13'));}],
  ['graph reflection order flip',(_,g)=>{const e=g.graph.edges.filter(x=>x.from==='L131-G2-X0034'&&x.kind==='SOURCE_ORDERED_TERM_INCIDENCE');e[0].position=2;e[1].position=1;}],
  ['source English-only identity',(_,g)=>{const x=g.graph.nodes.find(x=>x.node_id==='L131-G2-X0034');x.kind='RAW_SOURCE_TERM';}],
  ['W authority leak',(s)=>{s.source_provenance+=' /woit/ forbidden';}]
];
const rejected=[];
for (const [name,modify] of mutations) {
  const s=clone(S),g=clone(G),q=clone(Q);
  modify(s,g,q);const errs=verify(s,g,q);if(!errs.length)errors.push('undetected mutation '+name);else rejected.push(name);
}
const result={schema:'isograph.exp062-l131-rotation-pair-source-replay-verifier.v0.1',pass:errors.length===0,errors,source_equation:expected,source_occurrences:S.occurrences.length,g2_nodes:G.graph.nodes.length,g2_edges:G.graph.edges.length,g3_counts:Q.counts,adversarial_mutations_rejected:rejected.length,adversarial_controls:rejected,external_review:'OWNER_BYPASSED_NOT_PASSED',result:'SOURCE_REPLAY_ONLY_NOT_L131_CLOSURE'};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exit(1);
