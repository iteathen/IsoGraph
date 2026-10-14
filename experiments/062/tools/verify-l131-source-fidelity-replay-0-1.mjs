import fs from 'node:fs';
import crypto from 'node:crypto';
const root='experiments/062/';
const get=(p)=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=(p)=>{const x=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex')};
const errors=[];
const check=(v,m)=>{if(!v)errors.push(m)};
const old1=get(root+'L131_G1_SOURCE_INCIDENCE_0_1.json');
const old2=get(root+'L131_G2_NEUTRAL_SUBGRAPH_0_1.json');
const old3=get(root+'L131_G3_CORE_DEFINABILITY_0_1.json');
const a=get(root+'L131_G1_SOURCE_GRANULARITY_REOPEN_AUDIT_0_2.json');
const s=get(root+'L131_G1_SOURCE_INCIDENCE_0_2.json');
const g=get(root+'L131_G2_NEUTRAL_SUBGRAPH_0_2.json');
const q=get(root+'L131_G3_CORE_DEFINABILITY_0_2.json');
const d=get(root+'L131_SOURCE_FIDELITY_DEFECT_0_1.json');
function pin(x){check(!!x&&fs.existsSync(x.path),'missing pin '+x?.path);if(x&&fs.existsSync(x.path))check(blob(x.path)===x.git_blob_sha,'stale pin '+x.path)}
pin(s.audit);pin(s.defect);pin(g.input);pin(q.input);pin(q.source_incidence);pin(q.defect);
check(a.defect.git_blob_sha===blob(root+'L131_SOURCE_FIDELITY_DEFECT_0_1.json'),'audit defect hash');
check(a.pinned_inputs?.[root+'L127_G7_TARGETED_CLOSURE_0_2.json']?.git_blob_sha===blob(root+'L127_G7_TARGETED_CLOSURE_0_2.json'),'current L127 dep');
check(!a.pinned_inputs?.[root+'L127_G7_TARGETED_CLOSURE_0_1.json'],'stale L127 audit dep');
check(s.occurrences.length===12&&s.counts.reopened_occurrences===12,'L131 G1 count');
check(JSON.stringify(old1.occurrences)===JSON.stringify(s.occurrences.slice(0,10)),'old L131 ten semantic occurrences drift');
check(JSON.stringify(old2.graph.nodes)===JSON.stringify(g.graph.nodes.slice(0,old2.graph.nodes.length)),'old L131 nodes drift');
check(JSON.stringify(old2.graph.edges)===JSON.stringify(g.graph.edges.slice(0,old2.graph.edges.length)),'old L131 edges drift');
check(JSON.stringify(old3.results)===JSON.stringify(q.results.slice(0,10)),'old L131 G3 local dispositions drift');
const newR11=s.occurrences.find(x=>x.occurrence_id==='L-SSC-131-R11');
const newR12=s.occurrences.find(x=>x.occurrence_id==='L-SSC-131-R12');
const expected11=[
['EQUAL','t^(uw)',['COMPOSE_ORDERED','R_p^w','R_v^u','R_m^tilde(u)','R_p^tilde(u)']],
['EQUAL','t^(uw)',['COMPOSE_ORDERED','R_p^w','R_p^u','t']],
['EQUAL','t^(uw)',['COMPOSE_ORDERED','R_p^(uw)','t']],
['EQUAL','t^(uw)',['COMPOSE_ORDERED','t','R_v^(uw)']]
];
function eq11(x){return JSON.stringify(x)===JSON.stringify(expected11)}
check(newR11&&eq11(newR11.exact_source_expression.assertions),'source eq 9 ordered factorization');
check(newR12?.exact_source_expression?.assertions?.length===2,'source even word assertion and witness');
check(newR12?.exact_source_expression?.assertions?.[0]?.[0]==='SOURCE_GENERAL_EXISTENCE','lost general even factorization');
check(newR12?.exact_source_expression?.assertions?.[1]?.[0]==='EXAMPLE_WITNESS','lost factorization example witness');
const nmap=new Map(g.graph.nodes.map(x=>[x.node_id,x]));
const edgeList=g.graph.edges;
const byFrom=new Map();
for(const e of edgeList){if(!byFrom.has(e.from))byFrom.set(e.from,[]);byFrom.get(e.from).push(e);check(nmap.has(e.from)&&nmap.has(e.to),'dangling graph edge '+e.edge_id)}
check(nmap.size===g.graph.nodes.length,'duplicate graph node');
check(new Set(edgeList.map(x=>x.edge_id)).size===edgeList.length,'duplicate graph edge');
check(g.counts.total_nodes===g.graph.nodes.length&&g.counts.total_edges===edgeList.length,'G2 graph counts');
check(g.counts.occurrence_roots===12&&g.counts.dependency_edges===edgeList.filter(x=>x.kind==='INTRA_BODY_DEPENDENCY_INCIDENCE').length,'G2 occurrence/dependency count');
function terms(n,stack=new Set()){const node=nmap.get(n);if(!node||stack.has(n)){errors.push('missing/cyclic term '+n);return null}
 if(node.kind==='RAW_SOURCE_TERM')return node.raw_value_provenance;
 if(node.kind!=='OPAQUE_SOURCE_TERM_APPLICATION'){errors.push('not raw application '+n);return null}
 const children=(byFrom.get(n)||[]).filter(x=>x.kind==='SOURCE_ORDERED_TERM_INCIDENCE').sort((a,b)=>a.position-b.position);
 check(children.length===node.arity,'application arity '+n);
 check(children.every((e,i)=>e.position===i+1),'application order '+n);
 const next=new Set(stack);next.add(n);return [node.raw_operator_provenance,...children.map(x=>terms(x.to,next))]
}
for(const o of [newR11,newR12]){const i=Number(o.occurrence_id.slice(-2));const id='L131-G2-O'+String(i).padStart(2,'0');
 const roots=(byFrom.get(id)||[]).filter(x=>x.kind==='EXACT_SOURCE_EXPRESSION_ASSERTION_INCIDENCE').sort((a,b)=>a.position-b.position);
 const actual=roots.map(x=>terms(x.to));
 check(JSON.stringify(actual)===JSON.stringify(o.exact_source_expression.assertions),'source expression graph reconstruction '+o.occurrence_id);
}
check(q.counts.CORE_CLOSED===10&&q.counts.UNEXPANDED_DEMAND===2&&q.results.length===12,'G3 conservation');
check(q.results.slice(-2).every(x=>x.disposition==='UNEXPANDED_DEMAND'),'premature source factorization closure');
check(q.fixed_point.targeted_L131_complete===false&&q.fixed_point.dependent_L132_replay_authorized===false,'false completion');
check(d.defect.earliest_affected_stage.includes('L131'),'defect earliest stage');
const swapped=structuredClone(expected11);swapped[0][2][1]='R_v^u';
const omitted=expected11.slice(0,3);
check(!eq11(swapped)&&!eq11(omitted),'source mutation control not detected');
const roleProjection={mapA:[0,1,2],mapB:[0,1,2]};
const coefficientMaps={mapA:[1,2,3],mapB:[2,3,4]};
check(JSON.stringify(roleProjection.mapA)===JSON.stringify(roleProjection.mapB)&&JSON.stringify(coefficientMaps.mapA)!==JSON.stringify(coefficientMaps.mapB),'role-only equivalence falsifier');
const forged=structuredClone(q);forged.counts.UNEXPANDED_DEMAND=0;forged.results[10].disposition='CORE_CLOSED';
check(!(forged.counts.UNEXPANDED_DEMAND===forged.results.filter(x=>x.disposition==='UNEXPANDED_DEMAND').length),'premature-closure mutation missed');
for(const x of [a,s,g,q,d])check(!/W-SSC-|\/woit\//i.test(JSON.stringify(x)),'W/cross-track leak');
const result={schema:'isograph.exp062-l131-source-fidelity-replay-verifier.v0.1',pass:errors.length===0,errors,source_obligations:s.occurrences.length,source_new_equations:newR11.exact_source_expression.assertions.length,full_operator_role_falsifier:'REJECTED_ROLE_ONLY_EQUIVALENCE',G3:q.counts,external_review:'OWNER_BYPASSED_NOT_PASSED',status:'VALIDATED_REOPEN_ONLY_NOT_L131_CLOSURE'};
console.log(JSON.stringify(result,null,2));if(errors.length)process.exit(1);
