// Exact L-only G0 SSC successor + source-first L04 correspondence guard.
// A passing result proves internal conservation, not independent cold PDF fidelity.
import fs from 'node:fs';
import crypto from 'node:crypto';
const R='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const paths={a:R+'LISI_L04_SOURCE_FIRST_REVERSE_COVERAGE_0_1.json',old:R+'SOURCE_SEMANTIC_CENSUS_0_49.json',now:R+'SOURCE_SEMANTIC_CENSUS_0_50.json',tr:R+'SOURCE_TRAVERSAL_LEDGER_0_13.json',gate:E+'L_CURRENT_STAGE_GATE_0_64.json',priorGate:E+'L_CURRENT_STAGE_GATE_0_63.json',self:E+'tools/verify-l-g0-l04-source-first-reverse-0-1.mjs'};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const audit=read(paths.a),old=read(paths.old),now=read(paths.now),tr=read(paths.tr),gate=read(paths.gate);
function verify(a,n,t,g){
 const errors=[],ck=(v,s)=>{if(!v)errors.push(s);};
 ck(a.schema==='isograph.track-L.G0.L04-source-first-bidirectional-inventory.v0.1'&&a.track==='L'&&a.stage==='G0'&&a.authority===false,'L-only G0 nonauthority packet');
 ck(a.frozen_primary?.revision==='arXiv:2407.02497v2'&&a.frozen_primary?.original_pdf==='https://arxiv.org/pdf/2407.02497v2'&&a.frozen_primary?.printed_pdf_pages===17,'exact original L04 revision');
 ck(a.frozen_primary?.source_byte_hash_verified===false,'missing source byte digest not invented');
 ck(a.predecessor?.ssc_sha===blob(paths.old)&&a.successor?.ssc_git_blob_sha===blob(paths.now),'pinned ancestor/successor');
 ck(a.successor?.changed?.join(',')==='L-SSC-116,L-SSC-121'&&a.successor?.G0_status==='OPEN_UNFROZEN','source scope/changed list');
 ck(n.schema==='woit-lisi.track-l.source-semantic-census.v0.50'&&n.track==='L'&&n.item_count===191&&n.items?.length===191&&old.items.length===191,'191 L identities');
 ck(n.predecessor?.git_blob_sha===blob(paths.old)&&n.guards?.source_census_freeze_complete===false,'preserved current predecessor and G0 guard');
 const changed=[];
 for(let i=0;i<191;i++){ck(old.items[i]?.id===n.items[i]?.id,'ID conservation at '+i);if(JSON.stringify(old.items[i])!==JSON.stringify(n.items[i]))changed.push(n.items[i].id);}
 ck(changed.join(',')==='L-SSC-116,L-SSC-121','exactly 189 complete predecessor source records unchanged');
 const a116=n.items.find(x=>x.id==='L-SSC-116'),a121=n.items.find(x=>x.id==='L-SSC-121');
 ck(a116?.body.includes('t~-1/2(1+e1+e2+e3)')&&a116?.body.includes('t=+1/2(1+e1+e2+e3)')&&a116?.body.includes('conjugation actions')&&a116?.source_provenance.includes('§7'),'literal positive/negative source representatives, distinct adjoint');
 ck(a121?.body.includes('in preparation')&&a121?.body.includes('2024')&&a121?.body.includes('2026')&&a121?.source_provenance.includes('reference [6]'),'original reference [6] revision modality');
 const expectedIds=old.items.filter(x=>/^L04(?:\s|$)/.test(x.source_provenance)).map(x=>x.id).sort();
 const seen=new Set(),dispositions=Object.values(a.dispositions||{}),counts={},mapped=new Set();
 ck(expectedIds.length===34&&a.locations?.length===53,'34 SSC items and finite 53 source locations');
 for(let i=0;i<(a.locations||[]).length;i++){
  let r=a.locations[i],id='L04-S'+String(i+1).padStart(3,'0');
  ck(r.id===id&&!seen.has(r.id),'unique stable original source locator '+i);seen.add(r.id);
  ck(typeof r.source_locator==='string'&&r.source_locator.length>4&&typeof r.original_source_semantic_group==='string'&&r.original_source_semantic_group.length>10,'source semantic group '+i);
  ck(dispositions.includes(r.disposition),'source disposition '+i);counts[r.disposition]=(counts[r.disposition]||0)+1;
  ck(r.source_load_bearing===!r.disposition.includes('NON_LOAD_BEARING'),'nonload status scoped');
  for(const s of r.ssc_ids||[])mapped.add(s);
 }
 ck(JSON.stringify([...mapped].sort())===JSON.stringify(expectedIds),'forward/backward exact 34 L04 IDs');
 ck(JSON.stringify(a.reverse?.L04_ssc_ids?.slice().sort())===JSON.stringify(expectedIds),'explicit SSC reverse index');
 ck(a.reverse?.source_to_SSC_global_Pass===false&&a.reverse?.SSC_to_source_global_Pass===false,'no false global pass');
 ck(JSON.stringify(counts)===JSON.stringify(a.counts?.by_disposition),'mechanically derived 53 source dispositions');
 ck(counts.FORMULA_TABLE_FIGURE_EXACT_RECONSTRUCTION_UNVERIFIED===18&&counts.PRIOR_OMISSION_NOW_DUAL_SIGN_CONSERVED===1,'18 G0 exact-render checks left open');
 ck(a.source_first_discrepancies?.length===2&&a.source_first_discrepancies[0].record==='L-SSC-116'&&a.source_first_discrepancies[1].record==='L-SSC-121','two cause-targeted original source repairs');
 ck(a.source_first_discrepancies[0].standard_quaternion_calculation?.conjugation_actions_equal===true,'element/adjoint distinction');
 ck(a.G0_frozen===false&&a.G1_authorized===false&&a.independent_external_cold_review_passed===false,'no qualification from source index');
 ck(t.schema==='lisi.full-treatment.source-traversal-ledger.v0.13'&&t.predecessor==='SOURCE_TRAVERSAL_LEDGER_0_12.json'&&t.complete_sources===0,'historical traversal vs reopened current');
 ck(t.current_census?.git_blob_sha===blob(paths.now)&&t.current_L04_source_first_inventory?.git_blob_sha===blob(paths.a),'current traversal immutable source parents');
 ck(t.sources?.length===6&&t.sources.every(x=>x.current_complete===false),'no current G0 complete source');
 ck(g.schema==='isograph.exp062-l-current-stage-gate.v0.64'&&g.track==='L'&&g.stage==='G0'&&g.status.endsWith('OPEN_UNFROZEN')&&g.semantic_authority===false,'G0 gate not promoted');
 ck(g.predecessor_gate?.git_blob_sha===blob(paths.priorGate),'gate0.63 exact parent');
 ck(g.current_source_census?.git_blob_sha===blob(paths.now)&&g.source_traversal?.git_blob_sha===blob(paths.tr)&&g.source_first_L04_packet?.git_blob_sha===blob(paths.a),'gate immutable SSC/traversal/source');
 ck(g.source_verifier?.git_blob_sha===blob(paths.self),'guard exact committed revision');
 ck(g.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.NEI_pass_authorized===false&&g.current_lawful_state?.DTS_pass_authorized===false&&g.current_lawful_state?.DP_pass_authorized===false&&g.current_lawful_state?.source_census_complete===false,'G1+ not promoted');
 ck(g.source_CI?.status==='PENDING_GITHUB_CI'&&g.source_CI?.external_original_source_complete_review_passed===false,'pending verification not falsely green');
 return errors;
}
let issues=verify(audit,now,tr,gate),killed=0;
const hostile=[
['drop_location',(a,n,t,g)=>a.locations.pop()],
['duplicate_locator',(a,n,t,g)=>a.locations[2].id=a.locations[1].id],
['remove_source_to_SSC',(a,n,t,g)=>a.locations.find(x=>x.id==='L04-S002').ssc_ids=[]],
['invent_cross_track',(a,n,t,g)=>a.locations[0].ssc_ids.push('W-SSC-500')],
['mark_global_pass',(a,n,t,g)=>a.reverse.source_to_SSC_global_Pass=true],
['erase_formula_debt',(a,n,t,g)=>a.locations.find(x=>x.disposition.includes('EXACT_RECONSTRUCTION')).disposition=a.dispositions.M],
['erase_discrepancy',(a,n,t,g)=>a.source_first_discrepancies.pop()],
['forge_pdf_digest',(a,n,t,g)=>a.frozen_primary.source_byte_hash_verified=true],
['replace_frozen_revision',(a,n,t,g)=>a.frozen_primary.revision='arXiv:2407.02497v1'],
['erase_2024_in_prep',(a,n,t,g)=>n.items.find(x=>x.id==='L-SSC-121').body='Already published in 2026'],
['erase_positive_t',(a,n,t,g)=>n.items.find(x=>x.id==='L-SSC-116').body=n.items.find(x=>x.id==='L-SSC-116').body.replace('t=+1/2','t=-1/2')],
['modify_unrelated_original',(a,n,t,g)=>n.items.find(x=>x.id==='L-SSC-119').body+=' unsourced'],
['forge_traversal_parent',(a,n,t,g)=>t.current_census.git_blob_sha='BAD_SHA'],
['promote_source_complete',(a,n,t,g)=>t.sources.find(x=>x.id==='L04').current_complete=true],
['promote_G1',(a,n,t,g)=>g.current_lawful_state.G1_authorized=true],
['forge_gate_packet',(a,n,t,g)=>g.source_first_L04_packet.git_blob_sha='BAD_SHA'],
['claim_ci_success',(a,n,t,g)=>g.source_CI.status='SUCCESS']
];
for(const [name,mutation]of hostile){
 let a=structuredClone(audit),n=structuredClone(now),t=structuredClone(tr),g=structuredClone(gate);
 mutation(a,n,t,g);if(verify(a,n,t,g).length)killed++;else issues.push('HOSTILE_ESCAPE '+name);
}
console.log(JSON.stringify({schema:'isograph.exp062.l-g0-l04-source-first-source-conservation.v0.1',pass:issues.length===0,issues,source_units:53,L04_ssc_records:34,L_SSC_total:191,unaltered_predecessor_records:189,changed_ids:['L-SSC-116','L-SSC-121'],unqualified_exact_L04_source_groups:18,hostiles_defined:hostile.length,hostiles_rejected:killed,independent_original_PDF_complete_review_passed:false,G0_frozen:false,G1_authorized:false},null,2));
if(issues.length)process.exitCode=1;
