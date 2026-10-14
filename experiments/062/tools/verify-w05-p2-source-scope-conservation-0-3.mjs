import fs from 'node:fs';
import crypto from 'node:crypto';
const C={"old":{"source":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_32.json","04212aa6fc74c679fb4744aa038df0ef43b83262"],"demand":["experiments/062/W_G0_W01_SECTION31_32_SOURCE_DEMAND_PROJECTION_0_17.json","ea9690fdeb1e8d1349aab3b7e4e1641502628f39"],"reg":["experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_18.json","180c367a94457344ac6168eca0ea9f4f354709a1"],"cover":["experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_17.json","bc2eedcf813167d09935f2b948c0849a47443ea8"],"gate":["experiments/062/W_CURRENT_STAGE_GATE_0_61.json","2dc52e869c3c0d9940b6b2077854f49f8d8053f6"]},"now":{"source":["research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_33.json","a801ef92059de4ac81bcb7e0960ff998aa8a04fc"],"demand":["experiments/062/W_G0_W05_P2_SOURCE_DEMAND_PROJECTION_0_18.json","d283558640c4fdb02f0f9967d8fe5468756e0706"],"reg":["experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_19.json","51946a2ec8b1ceaffe659ce110e40335a30cf22b"],"cover":["experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_18.json","a9de2363a2f377db2c70ac17bb08848ef1110ec4"],"oracle":["experiments/062/W05_G0_P2_SELECTED_DIVISION_SOURCE_ORACLE_0_1.json","612bffa19b9cc67df38eb24dc30e50a2245c4a00"],"defect":["experiments/062/W05_G0_P2_SOURCE_SCOPE_FIDELITY_DEFECT_0_1.json","c396b47bbbef6e5b7f9994b3a5c76a67170929c9"],"counter":["experiments/062/W_G0_BY_UNIT_STALE_COUNT_METADATA_DEFECT_0_1.json","ffcfddf43ac0848a817d6c05715ef628367ed0b7"],"reverse":["experiments/062/W05_G0_P2_SOURCE_LOCAL_REVERSE_COVERAGE_0_1.json","41e2773493d8455938e669ff98274aed8cce4dbf"],"witness":["experiments/062/W05_G0_P2_NONSQUARE_UNIT_CONIC_COUNTEREXAMPLE_0_1.json","bc86be42057c5ab6fe71a5ae7f81466e92ec80a9"]},"suffix":{"W-SSC-105":" In W05 §6.1 printed p.9, the nonsquare unit u is an attribute of the author's selected representative (p,u/Qp) of the DIVISION isomorphism class; the text says one class INCLUDES this representative, not that EVERY nonsquare unit produces a division algebra for every prime. The explicitly printed p != 2 guard belongs to the later list of three quadratic extensions. The division-class/Hilbert-negative predicate is a separate necessary premise for inferring the author's subsequent no-Qp-point conic claim. In particular the independent exact p=2,u=7 split witness is NEGATIVE evidence against an unrestricted interpretation, not a claim that Woit asserted that universal theorem.","W-SSC-106":" The §6.1 printed p.10 statement that the finite-p conic has no Qp points is source-conserved as stated, but is CONTEXTUALLY restricted to the division representative selected on p.9 and the source's preceding Hilbert-minus-one/no-F-points case. The source does not reprint this binder in the conic sentence; it must not be projected as NO Qp points for EVERY nonsquare unit u. An independently reconstructed p=2,u=7 conic point [7:2:3] and split algebra falsify that unguarded projection but do not replace the author's original claim or the qualified division-class case."},"units":{"W01":122,"W02":41,"W04a":11,"W04b":25,"W04c":24,"W04d":12,"W04e":21,"W05":41,"W03":17},"verify_path":"experiments/062/tools/verify-w05-p2-source-scope-conservation-0-3.mjs","gate_path":"experiments/062/W_CURRENT_STAGE_GATE_0_64.json","current_gate_parent_blob":"c4971d3dd7044b5eedfcd33a39c280295655288d"};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const get=(arr,id,k='id')=>arr?.find(x=>x?.[k]===id);
const ids=['W-SSC-105','W-SSC-106'],changed=new Set(ids);
const unit=x=>/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/.exec(x.source)?.[0];
const totals=items=>{const z={};for(const x of items){const u=unit(x);if(!u)return null;z[u]=(z[u]||0)+(x.source_expression_census?.statements?.length||0);}return z};
const load=P=>Object.fromEntries(Object.entries(P).map(([k,[path]])=>[k,read(path)]));
const prev=load(C.old),inputs={...load(C.now),gate:read(C.gate_path)};
function verify(A){
 const err=[],ok=(b,m)=>{if(!b)err.push(m)};
 const {source:s,demand:d,reg:r,cover:c,oracle:o,defect:df,counter:md,reverse:rv,witness:w,gate:g}=A;
 ok(s?.schema==='woit.source-semantic-census.v0.33'&&s?.status==='W05_P2_CONTEXTUAL_DIVISION_REPRESENTATIVE_AND_CONIC_NEGATIVE_G0_UNFROZEN'&&s?.correction?.G0_frozen===false&&s?.correction?.G1_G7_authorized===false&&s?.closure_claims?.primitive_closure===false&&s?.closure_claims?.sealed===false,'SSC0.33 still unqualified');
 ok(s?.predecessor?.git_blob_sha===C.old.source[1]&&s?.correction?.primary_source_oracle?.git_blob_sha===C.now.oracle[1]&&s?.correction?.negative_falsifier?.git_blob_sha===C.now.witness[1],'source provenance');
 ok(eq(s?.correction?.changed_W_ids,ids)&&s?.correction?.prior_W05_structured===39&&s?.correction?.successor_W05_structured===41&&s?.correction?.added_source_incidences===2,'2 W05 source additions');
 ok(s?.freeze_rule?.startsWith('SSC 0.33 W05 §6.1')&&s?.freeze_rule?.includes('no G1-G7'),'SSC freeze rule');
 ok(o?.source?.revision==='arXiv:2202.02657v2'&&eq(o?.source?.printed_pages,[9,10])&&o?.source?.October03_pdf_byte_identity==='NOT_ESTABLISHED'&&o?.third_party_review==='OWNER_BYPASSED_NOT_PASSED'&&o?.frozen===false&&o?.G1_authorized===false,'primary author oracle limits');
 ok(o?.printed_primary_assertion_roles?.length===4&&o?.printed_primary_assertion_roles?.[0]?.universal_u_declared===false&&o?.printed_primary_assertion_roles?.[1]?.guard_scope==='NAMED_EXTENSION_COUNT_ONLY','not author all-u theorem');
 ok(df?.earliest_affected_stage==='G0_SOURCE_SEMANTIC_ASSERTION_CONSERVATION'&&eq(df?.changed_source_ids,ids),'source defect');
 ok(md?.status?.includes('METADATA_STALE_FOUR_UNITS')&&Object.keys(md?.defects||{}).length===4,'original four stale metadata count defects');
 ok(w?.witness?.p===2&&w?.witness?.u===7&&eq(w?.witness?.conic?.projective_point,[7,2,3])&&w?.witness?.conic?.exact_sum===0,'exact independent witness');
 ok(rv?.counts?.W05_total_structured_after===41&&rv?.limits?.all_nine_source_reverse_complete===false,'targeted source reverse only');
 ok(s?.items?.length===151&&s?.census_item_count===151&&d?.items?.length===86&&r?.rows?.length===151&&c?.rows?.length===151,'151 source / 86 historical members');
 ok(d?.current_source?.git_blob_sha===C.now.source[1]&&d?.predecessor_W_only_demand?.git_blob_sha===C.old.demand[1]&&d?.replay_policy?.G1_authorized===false,'demand source and previous');
 ok(r?.source_census?.git_blob_sha===C.now.source[1]&&r?.historical_86_projection?.git_blob_sha===C.now.demand[1]&&r?.predecessor_register?.git_blob_sha===C.old.reg[1],'register exact lineage');
 ok(c?.source_census?.git_blob_sha===C.now.source[1]&&c?.reconstructed_register?.git_blob_sha===C.now.reg[1]&&c?.predecessor_coverage?.git_blob_sha===C.old.cover[1]&&c?.current_cross_unit_count_reconstruction?.git_blob_sha===C.now.counter[1],'coverage exact lineage');
 ok(g?.schema==='isograph.exp062-w-current-stage-gate.v0.62'&&g?.track==='W'&&g?.semantic_authority===false&&g?.supersedes?.git_blob_sha===C.current_gate_parent_blob,'active W current gate correct lineage');
 ok(g?.current_source_census?.git_blob_sha===C.now.source[1]&&g?.current_historical_86_member_projection?.git_blob_sha===C.now.demand[1]&&g?.current_all_151_conservation_register?.git_blob_sha===C.now.reg[1]&&g?.current_source_coverage?.git_blob_sha===C.now.cover[1],'current stage exact source tuple');
 ok(g?.W05_selected_division_source_oracle?.git_blob_sha===C.now.oracle[1]&&g?.W05_p2_conic_negative_falsifier?.git_blob_sha===C.now.witness[1]&&g?.W05_by_unit_counter_defect?.git_blob_sha===C.now.counter[1],'gate 3 pieces of W05 evidence');
 ok(g?.W05_source_scope_G0_verifier?.git_blob_sha===sha(C.verify_path)&&g?.verification_at_record_creation?.W05_P2_NodeCI==='PENDING_COMMIT','versioned validator pin and no falsely preclaimed CI');
 ok(g?.current_source_coverage?.reverse_all_original_nine_sources_complete===false&&g?.current_all_151_conservation_register?.all_source_obligations_qualified===false&&g?.current_source_census?.frozen===false&&g?.current_historical_86_member_projection?.qualification===false,'current stage 151 source and nine-source reverse still unqualified');
 const state=g?.current_lawful_state;
 ok(state?.G0_open===true&&state?.G0_complete===false&&state?.G0_frozen===false&&state?.source_census_frozen===false&&state?.all_nine_source_full_reverse_assertion_enumeration_complete===false&&state?.Oct03_mutable_source_byte_identity_verified===false&&state?.complete_W_151_semantic_demand_membership_requalified===false,'G0 open incomplete source provenance');
 for(const k of ['G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])ok(state?.[k]===false,'no unauthorized '+k);
 if(s?.items?.length!==151||d?.items?.length!==86||r?.rows?.length!==151||c?.rows?.length!==151)return err;
 ok(eq(s.items.map(x=>x.id),prev.source.items.map(x=>x.id))&&eq(d.items.map(x=>x.census_id),prev.demand.items.map(x=>x.census_id)),'preserve old 151 and W86 order');
 for(let i=0;i<151;i++){
  const x=s.items[i],p=prev.source.items[i],R=r.rows[i],V=c.rows[i];
  if(changed.has(p.id)){
   ok(x.obligation===p.obligation+C.suffix[p.id]&&x.state===p.state&&x.source===p.source,'W05 source exact original body+context '+p.id);
   const a=x.source_expression_census?.statements||[],b=p.source_expression_census?.statements||[];
   ok(a.length===b.length+1&&eq(a.slice(0,b.length),b)&&eq(a[b.length],o?.new_source_incidents?.[p.id]?.[0]),'W05 source original incidences and new oracle '+p.id);
  }else{
   ok(eq(x,p),'149 other source objects exact '+p.id);
   ok(eq(R,prev.reg.rows[i]),'149 other register rows exact '+p.id);
   ok(eq(V,prev.cover.rows[i]),'149 other coverage rows exact '+p.id);
  }
  ok(R?.census_id===x.id&&R?.source_body_exact===x.obligation&&R?.source_expression_statement_count===(x.source_expression_census?.statements?.length||0)&&R?.historical_closure_accepted_as_current===false&&R?.G0_status==='SOURCE_FIDELITY_AND_DEMAND_MEMBERSHIP_REVIEW_PENDING','register no false closed '+p.id);
  ok(V?.census_id===x.id&&V?.body_length_chars===x.obligation.length&&V?.source_expression_statement_count===(x.source_expression_census?.statements?.length||0)&&V?.stage_authority===false,'coverage source matched '+p.id);
 }
 for(let i=0;i<86;i++){
  const y=d.items[i],z=prev.demand.items[i],x=get(s.items,y.census_id);
  if(!changed.has(z.census_id))ok(eq(y,z),'84 historical W members exact '+z.census_id);
  ok(y?.track==='W'&&y?.body===x?.obligation&&eq(y?.source_formula_incidences||[],x?.source_expression_census?.statements||[]),'source to historical member projection '+z.census_id);
 }
 const a=get(s.items,ids[0])?.source_expression_census?.statements,b=get(s.items,ids[1])?.source_expression_census?.statements;
 ok(a?.length===5&&b?.length===4&&a?.[4]?.selected_class==='DIVISION_CLASS_SOURCE_EXAMPLE'&&a?.[4]?.quantifier_scope==='SOURCE_DOES_NOT_SAY_FOR_ALL_NONSQUARE_UNITS_U','W105 no all-u inference');
 ok(b?.[3]?.required_for_nonpoint_inference==='QUATERNION_CLASS_IS_DIVISION_HILBERT_MINUS1'&&b?.[3]?.unrestricted_u_quantification==='NOT_SOURCE_ASSERTED','W106 conic requires Hilbert minus one');
 ok(a?.[2]?.condition==='p != 2'&&b?.[1]?.negative?.Hilbert_sign===-1,'prior source p-guard and Hilbert law');
 const actual=totals(s.items);
 ok(eq(actual,C.units)&&eq(Object.keys(actual||{}).sort(),Object.keys(c.by_unit||{}).sort()),'all nine source unit totals reconstructed from 151 items');
 for(const [u,n]of Object.entries(actual||{}))ok(c?.by_unit?.[u]?.source_expression_statements===n&&r?.counts?.current_source_expression_units?.[u]===n,'current source unit '+u);
 for(const [u,v]of Object.entries({W01:[107,122],W02:[35,41],W04a:[7,11],W05:[36,39]}))ok(prev.cover.by_unit[u]?.source_expression_statements===v[0]&&totals(prev.source.items)?.[u]===v[1]&&md?.defects?.[u]?.source_census_total===v[1],'historical unit metadata defect '+u);
 ok(r.counts?.W05_source_expressions_total===41&&r.counts?.W01_source_expressions_total===122&&c.counts?.W05_new_structured_source_expressions===24&&c.counts?.W05_total_current_source_expression_statements===41,'source total vs newly added distinct');
 ok(r.counts?.source_items===151&&r.counts?.historical_nonmembers===65&&r.counts?.all_nine_source_full_reverse_assertion_census_complete===false&&c.counts?.original_nine_source_reverse_assertion_enumeration_complete===false,'all nine source reverse still open');
 return err;
}
const muts=[
['source prematurely G0 frozen',v=>v.source.correction.G0_frozen=true],
['source premature primitive closure',v=>v.source.closure_claims.primitive_closure=true],
['source division candidate made universal',v=>v.source.items[104].source_expression_census.statements[4].quantifier_scope='FOR_ALL'],
['selected division class lost',v=>v.source.items[104].source_expression_census.statements[4].selected_class='ALL_U'],
['conic class premise lost',v=>v.source.items[105].source_expression_census.statements[3].required_for_nonpoint_inference='NONE'],
['p-not-two guard erased',v=>v.source.items[104].source_expression_census.statements[2].condition='EVERY_P'],
['Hilbert minus one replaced',v=>v.source.items[105].source_expression_census.statements[1].negative.Hilbert_sign=1],
['source original W105 body erased',v=>v.source.items[104].obligation='WRONG'],
['joint source register and demand W106 alteration',v=>{v.source.items[105].obligation+='wrong';v.reg.rows[105].source_body_exact+='wrong';v.demand.items.find(x=>x.census_id==='W-SSC-106').body+='wrong';}],
['source W01 other item drift',v=>v.source.items[0].obligation+='wrong'],
['source 150 items',v=>v.source.items.pop()],
['W86 only85 historical',v=>v.demand.items.pop()],
['historical unrelated W member change',v=>v.demand.items[0].body+='wrong'],
['W105 demand loses incident',v=>v.demand.items.find(x=>x.census_id==='W-SSC-105').source_formula_incidences.pop()],
['register loses row',v=>v.reg.rows.pop()],
['coverage W01 count stale',v=>v.cover.by_unit.W01.source_expression_statements=107],
['coverage W02 count stale',v=>v.cover.by_unit.W02.source_expression_statements=35],
['coverage W04a count stale',v=>v.cover.by_unit.W04a.source_expression_statements=7],
['coverage W05 count stale',v=>v.cover.by_unit.W05.source_expression_statements=36],
['register W05 total stale',v=>v.reg.counts.W05_source_expressions_total=36],
['coverage W05 new confused current total',v=>v.cover.counts.W05_new_structured_source_expressions=41],
['old unit discrepancy evidence erased',v=>v.counter.defects={}],
['evidence W05 prior discrepancy wrong',v=>v.counter.defects.W05.source_census_total=36],
['witness value u forged',v=>v.witness.witness.u=3],
['source author falsely universalized',v=>v.oracle.printed_primary_assertion_roles[0].universal_u_declared=true],
['external approval falsely passed',v=>v.oracle.third_party_review='PASSED'],
['G0 marked complete',v=>v.gate.current_lawful_state.G0_complete=true],
['G1 falsely authorized',v=>v.gate.current_lawful_state.G1_authorized=true],
['nine sources reverse claimed complete',v=>v.gate.current_source_coverage.reverse_all_original_nine_sources_complete=true],
['L synthesis falsely authorized',v=>v.gate.current_lawful_state.cross_track_synthesis_authorized=true],
['original source Oct03 bytes claimed verified',v=>v.gate.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
['current source sha stale',v=>v.gate.current_source_census.git_blob_sha=C.old.source[1]],
['gate verifier self pin forged',v=>v.gate.W05_source_scope_G0_verifier.git_blob_sha='FAKE'],
['source oracle PDF revision changed',v=>v.oracle.source.revision='arXiv:2202.02657v1'],
['all 151 obligations falsely qualified',v=>v.gate.current_all_151_conservation_register.all_source_obligations_qualified=true],
['current source census falsely frozen',v=>v.gate.current_source_census.frozen=true],
['W86 historical member view falsely qualified',v=>v.gate.current_historical_86_member_projection.qualification=true]
];
const positive=verify(inputs),rejected=[],escaped=[],crashed=[];
for(const [name,fn]of muts){let v=JSON.parse(JSON.stringify(inputs));try{fn(v);if(verify(v).length)rejected.push(name);else escaped.push(name)}catch(e){crashed.push(name+' '+String(e))}}
const pins=[...Object.entries(C.old).map(([k,[path,h]])=>[k,path,h]),...Object.entries(C.now).map(([k,[path,h]])=>[k,path,h])].filter(([k,path,h])=>sha(path)!==h).map(x=>x[0]);
const errors=[...positive,...escaped.map(x=>'ESCAPED_MUTATION '+x),...crashed.map(x=>'CRASHED_MUTATION '+x),...pins.map(x=>'BLOB_PIN_MISMATCH '+x)];
console.log(JSON.stringify({schema:'isograph.exp062-w05-g0-contextual-conic-conservation-verifier.v0.3',pass:errors.length===0,errors,W_source_items:151,historical_W_members:86,changed_source_ids:ids,other_149_source_unchanged:true,other_84_W86_unchanged:true,W05_prior_source_incidents:39,W05_current_incidents:41,all_nine_unit_expression_totals:C.units,predecessor_stale_unit_count:4,mutations:muts.length,mutations_rejected:rejected.length,escaped,crashed,qualified:false,G0_frozen:false,external_review:'OWNER_BYPASSED_NOT_PASSED'},null,2));
if(errors.length)process.exitCode=1;
