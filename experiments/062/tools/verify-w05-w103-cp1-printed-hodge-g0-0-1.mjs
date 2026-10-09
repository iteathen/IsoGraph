import fs from 'node:fs';
import crypto from 'node:crypto';

const P = {
 oldG:'experiments/062/W_CURRENT_STAGE_GATE_0_71.json',
 g:'experiments/062/W_CURRENT_STAGE_GATE_0_72.json',
 s:'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_36.json',
 r:'experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_22.json',
 c:'experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_21.json',
 d:'experiments/062/W_G0_W05_S61_BRAUER_SOURCE_DEMAND_PROJECTION_0_20.json',
 oracle:'experiments/062/W05_G0_W103_SOURCE_FIRST_CONJUNCTION_REVERSE_0_1.json',
 w:'experiments/062/W05_G0_W103_CP1_PRINTED_FILTRATION_FALSIFIER_0_1.json',
 defect:'experiments/062/W05_W103_HODGE_STRICT_FILTRATION_SOURCE_DEFECT_0_1.json',
 self:'experiments/062/tools/verify-w05-w103-cp1-printed-hodge-g0-0-1.mjs'
};
const pin={"source":"631cd8b54e34ccca5b4a6de050a3136d3a26de7b","gate":"282dd398f78a1f5b58ee87090eb8f0fb7c374bf6","register":"184bdfec1607c047e088c8e7ca514e72f339bfa4","coverage":"5f802bc063d1a84124b6e86607e5d25331c7e88f","old86":"bf8fefd99f69d6a6d22c59de2c2380456d35e37a","reverse":"81c0e2d5fa18f3a4ce868f2c69b369e561a7e904","witness":"2c6786ae62c057ea9fb6e8a35653c69444f92412","predecessor_defect":"25c42af74e23e964ceb1a3d746a65948f8765b15"};
const get=k=>JSON.parse(fs.readFileSync(P[k],'utf8'));
const blobsha=k=>{let b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b), clone=x=>JSON.parse(JSON.stringify(x));
const initial=Object.fromEntries(Object.keys(P).filter(k=>k!=='self').map(k=>[k,get(k)]));

function validate(q){
 const errors=[],ok=(b,msg)=>{if(!b)errors.push(msg)};
 const {oldG,g,s,r,c,d,oracle,w,defect}=q,scope=w?.counterexample;
 const sw=s?.items?.find(x=>x.id==='W-SSC-103'),gr=r?.rows?.find(x=>x.census_id==='W-SSC-103'),cv=c?.rows?.find(x=>x.census_id==='W-SSC-103');
 const f=sw?.source_expression_census?.statements?.find(x=>x.id==='W103-G0-F01'),isect=sw?.source_expression_census?.statements?.find(x=>x.id==='W103-G0-F02');
 ok(g?.schema==='isograph.exp062-w-current-stage-gate.v0.72'&&g?.semantic_authority===false&&g?.track==='W'&&g?.supersedes?.git_blob_sha===pin.gate&&oldG?.schema==='isograph.exp062-w-current-stage-gate.v0.71','W stage gate0.72 lineage');
 ok(oldG?.current_lawful_state?.G0_complete===false&&oldG?.current_lawful_state?.G0_frozen===false,'historical W gate0.71 unfrozen');
 ok(g?.current_source_census?.git_blob_sha===pin.source&&g?.current_all_151_conservation_register?.git_blob_sha===pin.register&&g?.current_source_coverage?.git_blob_sha===pin.coverage&&g?.current_historical_86_member_projection?.git_blob_sha===pin.old86,'unchanged source and W historical tuple');
 ok(g?.W05_W103_source_first_conjunction_oracle?.git_blob_sha===pin.reverse&&g?.W05_W103_CP1_literal_conjunction_counterexample?.git_blob_sha===pin.witness&&g?.W05_W103_former_source_defect?.git_blob_sha===pin.predecessor_defect,'new and historical W source evidence pins');
 ok(g?.W05_W103_CP1_negative_verifier?.path===P.self&&g?.W05_W103_CP1_negative_verifier?.git_blob_sha===blobsha('self'),'current verifier exactly self-pinned');
 ok(s?.schema==='woit.source-semantic-census.v0.36'&&s?.items?.length===151&&s?.census_item_count===151&&s?.closure_claims?.sealed===false,'SSC0.36 preserved exactly 151 unfrozen');
 ok(s?.correction?.changed_W_ids?.length===1&&s?.correction?.changed_W_ids?.[0]==='W-SSC-107','current W source latest change remains W107 not W103');
 ok(r?.rows?.length===151&&c?.rows?.length===151&&d?.items?.length===86&&gr?.source_body_exact===sw?.obligation&&cv?.body_length_chars===sw?.obligation?.length,'151 source row unchanged plus old86 historical');
 ok(gr?.source_expression_statement_count===2&&cv?.source_expression_statement_count===2&&sw?.state==='OPEN_EXPOSITORY','W103 existing two source equations remain');
 ok(f?.rhs?.binder?.relation==='STRICT_GT'&&f?.rhs?.binder?.variable==='i'&&f?.rhs?.binder?.bound==='p'&&f?.lhs==='F^p'&&f?.rhs?.summand==='H^q(M,Omega^i)','W103 source strict greater index not repaired');
 ok(f?.guard?.includes('Do not normalize source i>p to i>=p')&&sw?.obligation?.includes('F^2=V'),'old source exact uncorrected strict and terminal');
 ok(isect?.rhs?.operator==='INTERSECTION'&&isect?.rhs?.left==='F^p'&&isect?.rhs?.right?.operator==='CONJUGATE'&&isect?.rhs?.right?.operand==='F^q','W103 retains complex conjugate intersection');
 ok(sw?.obligation?.includes('F^p directsum conjugate(F^(n-p+1))=V')&&sw?.obligation?.includes('mixed Hodge case is excluded'),'W103 source complement and exclusion preserved');
 ok(oracle?.author==='Peter Woit'&&oracle?.source?.revision==='arXiv:2202.02657v2'&&same(oracle?.source?.html_lines,[175,211])&&same(oracle?.source?.pdf_indices,[5,6])&&oracle?.source_rows?.length===7,'seven primary source-first 5.2 intervals pinned');
 if(oracle?.source_rows?.length===7){for(let i=0;i<7;i++){const row=oracle.source_rows[i];ok(row?.ordinal===i+1&&row?.html_lines?.[0]===(i?oracle.source_rows[i-1].html_lines[1]+1:175),'no primary source interval gap '+i)}ok(oracle.source_rows[6].html_lines[1]===211&&oracle.source_rows[2].clauses.includes('SOURCE_STRICT_I_GT_P_FILTRATION')&&oracle.source_rows[1].clauses.includes('SOURCE_TERMINAL_F2_EQ_V'),'literal source row completeness and strict/terminal')}
 ok(oracle?.source_item_changes===0&&oracle?.source_statement_changes===0&&oracle?.full_nine_W_units_reverse_assertion_completeness===false&&oracle?.external_cold_verification===false,'source textual reconciliation not all-author closure');
 ok(w?.schema==='isograph.exp062-w05-w103-cp1-hodge-print-conjunction-negative-witness.v0.1'&&w?.status==='INDEPENDENT_MATHEMATICAL_COUNTEREXAMPLE_TO_SIMULTANEOUS_LITERAL_SOURCE_FORMULAE_NO_AUTHOR_TEXT_CORRECTION','separate non-author math-negative class');
 ok(w?.original_text?.revision==='arXiv:2202.02657v2'&&same(w?.original_text?.source_items,['W-SSC-103'])&&w?.original_text?.source_formulae?.length===5&&w?.original_text?.source_formulae?.[3]?.literal==='F^p = directsum_(i>p) H^q(M,Omega^i)','witness pins original strict source');
 ok(w?.exact_source_preservation?.git_blob_sha===pin.source&&w?.exact_source_preservation?.source_bodies_changed===false&&w?.exact_source_preservation?.G0_frozen===false,'no author text revision from math falsifier');
 ok(defect?.schema==='isograph.exp062-w05-w103-hodge-strict-filtration-source-defect.v0.1'&&defect?.source_formulas?.[0]?.exact==='F^p = ⨁_{i>p} H^q(M,Ω^i)'&&defect?.observed_mismatch?.scope_guard?.includes('F^2=V'),'prior source-vs-standard defect immutable');

 // Independent finite CP1 witness evaluation: only bidegree (1,1) survives in degree two.
 const M=scope;
 ok(M?.manifold==='complex projective line CP1'&&M?.underlying_topology==='S2'&&M?.complex_dimension===1&&M?.smooth_compact_Kahler===true,'CP1 valid compact Kähler scope');
 ok(M?.cohomology_degree_n===2&&M?.weight_w===2&&M?.p===1&&M?.q===1,'consistent n=w=2, p=q=1');
 const facts=M?.mathematical_independent_inputs;
 ok(facts?.length===2&&facts[0]?.name==='NONZERO_KAHLER_CLASS'&&facts[0]?.dimension===1&&facts[1]?.name==='HOLOMORPHIC_COTANGENT_RANK_ONE','independent CP1 facts recorded');
 const top=facts?.[0]?.dimension,holomorphicRank=M?.complex_dimension,p=M?.p,n=M?.cohomology_degree_n;
 const I=[{holomorphic_degree:1,antiholomorphic_degree:1,dimension:top}];
 const strict=k=>I.filter(x=>x.holomorphic_degree<=holomorphicRank&&x.holomorphic_degree>k).reduce((a,x)=>a+x.dimension,0);
 const weak=k=>I.filter(x=>x.holomorphic_degree<=holomorphicRank&&x.holomorphic_degree>=k).reduce((a,x)=>a+x.dimension,0);
 const Fp=strict(p),Ftwo=strict(n-p+1),intersect=Fp===0?0:Math.min(Fp,top),comp=Fp+Ftwo;
 ok(top===1&&Fp===0&&Ftwo===0&&intersect===0&&comp===0,'independent source-strict filtration actually fails CP1');
 ok(M?.V?.dimension_complex===top&&M?.source_strict_i_greater_than_p?.F1_dimension===Fp&&M?.source_strict_i_greater_than_p?.F2_dimension===Ftwo,'recorded witness exact evaluated dimensions');
 ok(M?.source_intersection_consequence?.lhs_dimension===top&&M?.source_intersection_consequence?.rhs_dimension===intersect&&M?.source_intersection_consequence?.consistent===false,'first source conjunction contradiction');
 ok(M?.source_complement_consequence?.lhs_dimension===comp&&M?.source_complement_consequence?.rhs_dimension===top&&M?.source_complement_consequence?.consistent===false,'second source conjunction contradiction');
 ok(M?.source_terminal_F2_consequence?.lhs_dimension===Ftwo&&M?.source_terminal_F2_consequence?.rhs_dimension===top&&M?.source_terminal_F2_consequence?.consistent===false,'source terminal F2=V contradicted');
 ok(M?.independent_comparison_not_author_text?.hypothetical_index_relation==='i>=p'&&M?.independent_comparison_not_author_text?.hypothetical_F1_dimension===weak(p)&&M?.independent_comparison_not_author_text?.non_author_patch_proposed===false,'weaker mathematical contrast but no source patch');
 ok(w?.inference?.logical_status==='NON_AUTHOR_EXTERNAL_MATH_NEGATIVE_CONTROL'&&w?.inference?.not_falsified?.includes('WOIT_PHYSICAL_UNIFICATION_PROGRAM')&&w?.inference?.not_falsified?.includes('SOURCE_FIDELITY_OF_PRINTED_FORMULAS'),'negative counterexample not claimed blanket refutation');
 const st=g?.current_lawful_state;ok(st?.G0_open===true,'G0 still open');
 for(const key of ['G0_complete','G0_frozen','source_census_frozen','all_nine_source_full_reverse_assertion_enumeration_complete','Oct03_mutable_source_byte_identity_verified','complete_W_151_semantic_demand_membership_requalified','G1_authorized','G2_authorized','G3_authorized','G4_authorized','G5_authorized','G5H_authorized','G6_authorized','G7_authorized','recursive_IA_authorized','NEI_authorized','DTS_authorized','DP_authorized','cross_track_synthesis_authorized'])ok(st?.[key]===false,'G0-stage false '+key);
 ok(g?.verification_at_record_creation?.W05_W103_CP1_NodeCI==='PENDING_CURRENT_GITHUB_NODE_RUN'&&g?.verification_at_record_creation?.third_party==='OWNER_BYPASSED_NOT_PASSED','no falsely prequalified CI/external');
 return errors;
}
const errs=[];for(const[k,v]of Object.entries(pin)){let f={source:'s',gate:'oldG',register:'r',coverage:'c',old86:'d',reverse:'oracle',witness:'w',predecessor_defect:'defect'}[k];if(blobsha(f)!==v)errs.push('input blob mismatch '+k)}
const positive=validate(initial);errs.push(...positive.map(x=>'POSITIVE '+x));
const mutationCases=[
 ['different original source revision',x=>x.oracle.source.revision='arXiv:2202.02657v1'],
 ['delete original Hodge source row',x=>x.oracle.source_rows.pop()],
 ['source interval gap',x=>x.oracle.source_rows[2].html_lines[0]=187],
 ['source HTML start shifted',x=>x.oracle.source.html_lines[0]=176],
 ['PDF page shifted',x=>x.oracle.source.pdf_indices=[6,7]],
 ['relabel source as original exhaustive complete',x=>x.oracle.full_nine_W_units_reverse_assertion_completeness=true],
 ['source text rewrote F2 to F0',x=>x.s.items.find(y=>y.id==='W-SSC-103').obligation=x.s.items.find(y=>y.id==='W-SSC-103').obligation.replace('F^2=V','F^0=V')],
 ['source strict greater to weak',x=>x.s.items.find(y=>y.id==='W-SSC-103').source_expression_census.statements[0].rhs.binder.relation='GREATER_OR_EQUAL'],
 ['source intersection dropped',x=>x.s.items.find(y=>y.id==='W-SSC-103').source_expression_census.statements.pop()],
 ['source conjugation lost',x=>x.s.items.find(y=>y.id==='W-SSC-103').source_expression_census.statements[1].rhs.right.operator='IDENTITY'],
 ['source mixed exclusion lost',x=>x.s.items.find(y=>y.id==='W-SSC-103').obligation=x.s.items.find(y=>y.id==='W-SSC-103').obligation.replace('mixed Hodge case is excluded','mixed Hodge INCLUDED')],
 ['full 151 missing one source',x=>x.s.items.pop()],
 ['source source item count adjusted',x=>x.s.census_item_count=150],
 ['register W103 changed',x=>x.r.rows.find(y=>y.census_id==='W-SSC-103').source_body_exact='WRONG'],
 ['coverage W103 shortened',x=>x.c.rows.find(y=>y.census_id==='W-SSC-103').body_length_chars=1],
 ['86 projection membership changed',x=>x.d.items.pop()],
 ['counterexample M not Kaehler',x=>x.w.counterexample.smooth_compact_Kahler=false],
 ['counterexample complex dimension 2',x=>x.w.counterexample.complex_dimension=2],
 ['counterexample H11 made zero',x=>x.w.counterexample.mathematical_independent_inputs[0].dimension=0],
 ['counterexample Hodge degree 1',x=>x.w.counterexample.cohomology_degree_n=1],
 ['counterexample q changed',x=>x.w.counterexample.q=0],
 ['counterexample F1 set1',x=>x.w.counterexample.source_strict_i_greater_than_p.F1_dimension=1],
 ['counterexample F2 set1',x=>x.w.counterexample.source_strict_i_greater_than_p.F2_dimension=1],
 ['counterexample intersection declared equal',x=>x.w.counterexample.source_intersection_consequence.consistent=true],
 ['counterexample complement declared equal',x=>x.w.counterexample.source_complement_consequence.consistent=true],
 ['counterexample F2 terminal declared equal',x=>x.w.counterexample.source_terminal_F2_consequence.consistent=true],
 ['counterexample fake weak contrast',x=>x.w.counterexample.independent_comparison_not_author_text.hypothetical_F1_dimension=0],
 ['counterexample says author patch',x=>x.w.counterexample.independent_comparison_not_author_text.non_author_patch_proposed=true],
 ['counterexample falsely disproves Woit unification',x=>x.w.inference.not_falsified=x.w.inference.not_falsified.filter(y=>y!=='WOIT_PHYSICAL_UNIFICATION_PROGRAM')],
 ['counterexample source text edit',x=>x.w.exact_source_preservation.source_bodies_changed=true],
 ['G0 source pin stale',x=>x.g.current_source_census.git_blob_sha='WRONG'],
 ['stage parent pin stale',x=>x.g.supersedes.git_blob_sha='WRONG'],
 ['new oracle evidence SHA forged',x=>x.g.W05_W103_source_first_conjunction_oracle.git_blob_sha='WRONG'],
 ['CP1 witness evidence SHA forged',x=>x.g.W05_W103_CP1_literal_conjunction_counterexample.git_blob_sha='WRONG'],
 ['negative verifier hash forged',x=>x.g.W05_W103_CP1_negative_verifier.git_blob_sha='WRONG'],
 ['G0 frozen',x=>x.g.current_lawful_state.G0_frozen=true],
 ['G1 authorized',x=>x.g.current_lawful_state.G1_authorized=true],
 ['G7 authorized',x=>x.g.current_lawful_state.G7_authorized=true],
 ['original mutable October3 falsely verified',x=>x.g.current_lawful_state.Oct03_mutable_source_byte_identity_verified=true],
 ['W-L synthesis enabled',x=>x.g.current_lawful_state.cross_track_synthesis_authorized=true],
 ['third-party bypass becomes PASS',x=>x.g.verification_at_record_creation.third_party='PASSED']
];
const rejected=[],escaped=[],crashed=[];
for(const[name,fn]of mutationCases){const q=clone(initial),before=JSON.stringify(q);try{fn(q);if(before===JSON.stringify(q))escaped.push(name+': no mutation');else if(validate(q).length)rejected.push(name);else escaped.push(name)}catch(err){crashed.push(name+': '+err.message)}}
errs.push(...escaped.map(x=>'ESCAPED '+x),...crashed.map(x=>'CRASH '+x));
console.log(JSON.stringify({suite:'W05 W103 CP1 literal-source Hodge negative control G0 0.1',pass:errs.length===0,positive_errors:positive,errors:errs,hostile_controls:mutationCases.length,rejected:rejected.length,escaped:escaped.length,crashed:crashed.length,source_items:151,source_structured_incidents:327,source_census_changed:false,original_printed_identity_consistent:false,cp1_H11_dimension:1,cp1_strict_F1_dimension:0,cp1_strict_F2_dimension:0,current_stage:'G0_OPEN_UNFROZEN'}));
if(errs.length)process.exitCode=1;
