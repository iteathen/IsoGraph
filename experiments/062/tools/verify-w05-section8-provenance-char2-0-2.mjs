import fs from 'node:fs';
import crypto from 'node:crypto';
const root='experiments/062/',w='research/woit-lisi-isomorph/woit/';
const P={old:w+'SOURCE_SEMANTIC_CENSUS_0_33.json',s:w+'SOURCE_SEMANTIC_CENSUS_0_34.json',r:root+'W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_20.json',c:root+'W_G0_LINE_BY_LINE_151_COVERAGE_0_19.json',g:root+'W_CURRENT_STAGE_GATE_0_67.json',o:root+'W05_G0_SECTION8_SCHOLZE_ATTRIBUTION_SOURCE_ORACLE_0_1.json',d:root+'W05_G0_SECTION8_SCHOLZE_SOURCE_OMISSION_DEFECT_0_1.json',f:root+'W05_G0_CHAR2_SOURCE_FIELD_COUNTEREXAMPLE_0_1.json'};
const hashes={old:'a801ef92059de4ac81bcb7e0960ff998aa8a04fc',s:'115f62f1ebb801b1e0f8ccb1cbe8f8821dc8611b',r:'73f02fc7e4ac28d6bb46541922dd06ceba87908e',c:'d68c1c4409547f42b8991a0dd89f2421808d3f50',o:'ec2471682e7c19e44b50a7f019b60af1ee22c4a0',d:'b01be3eb37c66887837fbb120dcf0cf5677b20f2',f:'13e1ba0739a837792570eb99fb7cff38b055d108'};
const read=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const blobsha=k=>{const b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b),copy=o=>JSON.parse(JSON.stringify(o));
const A=Object.fromEntries(Object.keys(P).map(k=>[k,read(k)]));
const guard=a=>{
 const E=[],ok=(b,s)=>{if(!b)E.push(s)};
 const {old,s,r,c,g,o,d,f}=a,S=s?.items,OLD=old?.items;
 ok(s?.schema==='woit.source-semantic-census.v0.34'&&s?.status==='W05_SECTION8_SOURCE_PROVENANCE_CREDIT_G0_UNFROZEN'&&S?.length===151&&old?.items?.length===151,'SSC0.34 and source151');
 ok(s?.predecessor?.git_blob_sha===hashes.old&&s?.correction?.source_oracle?.git_blob_sha===hashes.o&&s?.correction?.defect?.git_blob_sha===hashes.d,'source lineage');
 ok(s?.closure_claims?.sealed===false&&s?.closure_claims?.primitive_closure===false&&s?.correction?.G0_frozen===false&&s?.correction?.G1_G7_authorized===false,'source not frozen');
 const ids=S?.map(v=>v.id);ok(eq(ids,OLD?.map(v=>v.id))&&new Set(ids).size===151,'151 stable source identities');
 const changes=S?.filter((v,i)=>!eq(v,OLD[i])).map(v=>v.id);ok(eq(changes,['W-SSC-111']),'only W111 source changed');
 const x=S?.find(v=>v.id==='W-SSC-111'),prev=OLD?.find(v=>v.id==='W-SSC-111'),claim=x?.source_expression_census?.statements?.[0];
 ok(x?.source==='W05 abstract / §§5–8'&&x?.obligation?.startsWith(prev?.obligation||'missing')&&x?.source_expression_census?.statements?.length===1,'W111 one attribution occurrence');
 ok(eq(claim,o?.source_attribution)&&claim?.speaker==='Peter Woit'&&claim?.credited_person==='Peter Scholze'&&claim?.attribution_role===undefined&&claim?.credited_action==='POINTED_OUT_TO_WOIT'&&claim?.epistemic_type==='SOURCE_REPORTED_ANALOGY_NOT_MATHEMATICAL_EQUIVALENCE'&&claim?.other_credits?.length===3,'typed primary-source attribution');
 ok(o?.original_primary_source?.printed_page===14&&o?.original_primary_source?.pdf_index===13&&o?.original_primary_source?.arxiv_html_line===388&&o?.original_primary_source?.revision==='arXiv:2202.02657v2'&&o?.original_primary_source?.Oct03_mutable_source_byte_identity==='NOT_VERIFIED','PDF/HTML location and uncertainty');
 ok(d?.earliest_affected_stage==='G0_SOURCE_ASSERTION_CONSERVATION'&&d?.repair?.one_changed_item==='W-SSC-111'&&d?.repair?.other_150_items_identical===true&&d?.invalidations?.length>=3,'defect+invalidation');
 ok(f?.schema==='isograph.exp062-w05-char2-arbitrary-field-counterexample.v0.1'&&f?.source?.printed_domain==='arbitrary field F'&&f?.source?.census_id==='W-SSC-105'&&f?.governance?.do_not_rewrite_printed_source===true,'independent math evidence scope');
 const w105=S?.find(v=>v.id==='W-SSC-105');ok(w105?.source_expression_census?.statements?.[0]?.field==='F'&&eq(w105?.source_expression_census?.statements?.[0]?.equations,['i*j=k','j*i=-k','i^2=a','j^2=b']),'original arbitrary field relations preserved');
 const mod=(v,p)=>(v%p+p)%p;
 const f2=f?.proof,neg1=mod(-1,2),square1plusI={scalar:mod(1+f?.proof?.a,2),i:mod(2,2)};
 ok(f2?.field==='GF(2)'&&f2?.a===1&&f2?.b===1&&f2?.minus_one===neg1&&f2?.ji_equals_ij===(neg1===1)&&f2?.commutative_generated_algebra===true&&square1plusI.scalar===0&&square1plusI.i===0&&f2?.therefore_central_simple===false&&f2?.nonzero_witness==='1+i'&&f2?.nonscalar_center_element==='i'&&f2?.nilpotent_witness==='(1+i)^2 = 1+2i+i^2 = 0'&&f2?.reason?.includes('nonzero nilpotent central elements'),'F2 center and nonzero nilpotent recomputation');
 ok(f?.positive_contrast?.field==='GF(3)'&&f?.positive_contrast?.minus_one===mod(-1,3)&&f?.positive_contrast?.ij_coefficient===1&&f?.positive_contrast?.ji_coefficient===2&&f?.positive_contrast?.distinct_anticommuting_signs===true,'F3 independent sign contrast');
 ok(r?.source_census?.git_blob_sha===hashes.s&&r?.rows?.length===151&&c?.source_census?.git_blob_sha===hashes.s&&c?.reconstructed_register?.git_blob_sha===hashes.r&&c?.rows?.length===151,'register/coverage exact lineage');
 if(!S||S.length!==151||!r?.rows||!c?.rows)return E;
 const counts={}; for(let i=0;i<151;i++){const v=S[i],q=r.rows[i],z=c.rows[i],unit=/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/.exec(v.source)?.[0],n=v.source_expression_census?.statements?.length||0;
   counts[unit]=(counts[unit]||0)+n;ok(q?.census_id===v.id&&q?.source_body_exact===v.obligation&&q?.source_expression_statement_count===n&&q?.historical_closure_accepted_as_current===false&&q?.G0_status==='SOURCE_FIDELITY_AND_DEMAND_MEMBERSHIP_REVIEW_PENDING','register row '+v.id);
   ok(z?.census_id===v.id&&z?.body_length_chars===v.obligation.length&&z?.source_expression_statement_count===n&&z?.stage_authority===false,'coverage row '+v.id);
 }
 ok(r.rows[110]?.historical_86_member===false&&counts.W05===42&&c.by_unit?.W05?.source_expression_statements===42&&r.counts?.W05_source_expressions_total===42&&c.counts?.W05_total_current_source_expression_statements===42,'W111 excluded old86, W05 42');
 for(const [unit,n] of Object.entries(counts))ok(c?.by_unit?.[unit]?.source_expression_statements===n&&r?.counts?.current_source_expression_units?.[unit]===n,'unit '+unit);
 ok(g?.schema==='isograph.exp062-w-current-stage-gate.v0.67'&&g?.supersedes?.git_blob_sha==='63a6c828ef8777af660094ad81c75e53eb4d765e'&&g?.current_source_census?.git_blob_sha===hashes.s&&g?.current_all_151_conservation_register?.git_blob_sha===hashes.r&&g?.current_source_coverage?.git_blob_sha===hashes.c,'current G0 exact source tuple');
 ok(g?.current_historical_86_member_projection?.qualification===false&&g?.source_provenance_caveats?.reverse_assertion_set?.includes('NOT_INDEPENDENTLY_ENUMERATED')&&g?.W05_section8_source_oracle?.git_blob_sha===hashes.o,'source and old projection nonpromotion');
 const st=g?.current_lawful_state;
 for(const k of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])ok(st?.[k]===false,'no false promotion '+k);
 ok(g?.W05_section8_verifier_predecessor_failed_control?.git_blob_sha==='78bd6effcb6b41642c1479e2a29f757949d66eab'&&g?.W05_section8_G0_verifier?.mutation_controls===29&&g?.W05_section8_G0_verifier?.path==='experiments/062/tools/verify-w05-section8-provenance-char2-0-2.mjs','failure lineage and v0.2 validator');
 ok(st?.G0_open===true&&g?.verification_at_record_creation?.W05_S8_NodeCI==='PENDING_GITHUB_ACTIONS_CORRECTED_V0_2_AFTER_FAILED_RUN_37956466200'&&g?.verification_at_record_creation?.third_party==='OWNER_BYPASSED_NOT_PASSED','no preclaimed CI/external');
 return E;
};
const errors=[];for(const [k,sha] of Object.entries(hashes))if(blobsha(k)!==sha)errors.push('blob SHA mismatch '+k);
const positive=guard(A);if(positive.length)errors.push(...positive.map(x=>'POSITIVE '+x));
const mutations=[
 ['speaker attribution',a=>a.s.items[110].source_expression_census.statements[0].speaker='Anonymous'],
 ['credited person',a=>a.s.items[110].source_expression_census.statements[0].credited_person='Other'],
 ['analogy promoted to identity',a=>a.s.items[110].source_expression_census.statements[0].epistemic_type='PROVEN_ISOMORPHISM'],
 ['another 150 item corrupted',a=>a.s.items[0].obligation+='X'],
 ['W111 obligation erased',a=>a.s.items[110].obligation='NO_CREDIT'],
 ['source census 150',a=>a.s.items.pop()],
 ['source oracle miscredits',a=>a.o.source_attribution.credited_person='Other'],
 ['oracle v1 not v2',a=>a.o.original_primary_source.revision='arXiv:2202.02657v1'],
 ['oracle Oct3 bytes falsely fixed',a=>a.o.original_primary_source.Oct03_mutable_source_byte_identity='VERIFIED'],
 ['register source body wrong',a=>a.r.rows[110].source_body_exact='WRONG'],
 ['coverage statement omitted',a=>a.c.rows[110].source_expression_statement_count=0],
 ['W05 source count stale',a=>a.r.counts.W05_source_expressions_total=41],
 ['W05 by-unit stale',a=>a.c.by_unit.W05.source_expression_statements=41],
 ['historical W111 suddenly member',a=>a.r.rows[110].historical_86_member=true],
 ['falsifier field changed',a=>a.f.proof.field='GF(3)'],
 ['falsifier sign inverted',a=>a.f.proof.minus_one=0],
 ['falsifier falsely central simple',a=>a.f.proof.therefore_central_simple=true],
 ['falsifier nonzero witness lost',a=>a.f.proof.nonzero_witness='0'],
 ['falsifier nilpotent equality forged',a=>a.f.proof.nilpotent_witness='(1+i)^2 = 1'],
 ['falsifier parameter b changed',a=>a.f.proof.b=0],
 ['false F3 sign',a=>a.f.positive_contrast.ji_coefficient=1],
 ['source F changed',a=>a.s.items[104].source_expression_census.statements[0].field='GF(2)'],
 ['wrong gate source hash',a=>a.g.current_source_census.git_blob_sha='STALE'],
 ['G0 prematurely frozen',a=>a.g.current_lawful_state.G0_frozen=true],
 ['nine-source reverse falsely complete',a=>a.g.current_lawful_state.all_nine_source_full_reverse_assertion_enumeration_complete=true],
 ['G1 promoted',a=>a.g.current_lawful_state.G1_authorized=true],
 ['cross-track synthesis promoted',a=>a.g.current_lawful_state.cross_track_synthesis_authorized=true],
 ['external validation falsely passed',a=>a.g.verification_at_record_creation.third_party='PASSED'],
 ['defect original stage changed',a=>a.d.earliest_affected_stage='G2']
];
let rejected=0,escaped=[],crashed=[];for(const [name,fn]of mutations){const b=copy(A),before=JSON.stringify(b);try{fn(b);if(JSON.stringify(b)===before){escaped.push(name+' NO_CHANGE');continue;}if(guard(b).length)rejected++;else escaped.push(name)}catch(err){crashed.push(name+': '+err.message)}}
errors.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W05 §8 source provenance and characteristic-2 G0 hostile audit 0.2',pass:errors.length===0,errors,positive_errors:positive,mutations:mutations.length,mutations_rejected:rejected,mutations_escaped:escaped.length,mutations_crashed:crashed.length,source_items:151,W05_structured_occurrences:42,source_origin_W111_one_incidence:true,current_stage:'G0_OPEN_UNFROZEN',external_review:'OWNER_BYPASSED_NOT_PASSED'}));
if(errors.length)process.exitCode=1;
