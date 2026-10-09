import fs from 'node:fs';
import crypto from 'node:crypto';
const P={"oldS":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_36.json","S":"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_37.json","oldD":"experiments/062/W_G0_W05_S61_BRAUER_SOURCE_DEMAND_PROJECTION_0_20.json","D":"experiments/062/W_G0_W05_S53_SOURCE_DEMAND_PROJECTION_0_21.json","oldR":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_22.json","R":"experiments/062/W_G0_ALL_151_SOURCE_MEMBERSHIP_REGISTER_0_23.json","oldC":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_21.json","C":"experiments/062/W_G0_LINE_BY_LINE_151_COVERAGE_0_22.json","oldG":"experiments/062/W_CURRENT_STAGE_GATE_0_76.json","G":"experiments/062/W_CURRENT_STAGE_GATE_0_77.json","O":"experiments/062/W05_G0_S53_NONABELIAN_HODGE_SOURCE_FIRST_0_1.json","F":"experiments/062/W05_G0_S53_SIMPSON_DELIGNE_SOURCE_DEFECT_0_1.json","ci":"experiments/062/W02_G0_S43_CORRECTED_NODE_CI_RESULT_0_1.json","hist":"experiments/062/W_G0_OCT03_HISTORICAL_TREE_ARTIFACT_RECOVERY_0_2.json","inv":"experiments/062/W_G0_NINE_SOURCE_COVERAGE_STATUS_0_4.json","self":"experiments/062/tools/verify-w05-s53-source-origin-g0-0-1.mjs"};
const pins={"oldS":"631cd8b54e34ccca5b4a6de050a3136d3a26de7b","S":"7ff385d7194cb98faa71119eb51545cce1da41e1","oldD":"bf8fefd99f69d6a6d22c59de2c2380456d35e37a","D":"7920016c19aede43dd81287761793ee331cb5955","oldR":"184bdfec1607c047e088c8e7ca514e72f339bfa4","R":"1e977b5d9285c2df0e23b3d113d0aaeef1fe2155","oldC":"5f802bc063d1a84124b6e86607e5d25331c7e88f","C":"2874adbd70adac2858cef3e4c00b8d97a9ea4a3d","oldG":"5013f9cb0b59f6918565b964fc0961f78fdbff22","O":"5ff946f6152818171fb3e9751895317dc671f4ae","F":"f566b683ce0545142490c73b6aa60e7d30afbed8","ci":"249af3c1f870536dc80ea2b157b68f7f43999843","hist":"e8e34ef6f6d117adeffa1ff3b17a7a0668dc9a5c","inv":"f77c3926a50fb67843ac5db42a16297aa7a33343"};
const cp=x=>JSON.parse(JSON.stringify(x));
const sha=k=>{const b=fs.readFileSync(P[k]);return crypto.createHash('sha1').update(Buffer.from('blob '+b.length)).update(Buffer.from([0])).update(b).digest('hex')};
const check=function check(a,context){
 const err=[],ok=(x,m)=>{if(!x)err.push(m)},eq=(x,y)=>JSON.stringify(x)===JSON.stringify(y),p=context.pins;
 const {S,oldS,D,oldD,R,oldR,C,oldC,G,oldG,O,F,ci,hist,inv}=a;
 ok(G?.schema==="isograph.exp062-w-current-stage-gate.v0.77"&&oldG?.schema==="isograph.exp062-w-current-stage-gate.v0.76"&&G?.supersedes?.git_blob_sha===p.oldG,"correct W G0 stage lineage");
 ok(G?.current_source_census?.git_blob_sha===p.S&&G?.current_all_151_conservation_register?.git_blob_sha===p.R&&G?.current_source_coverage?.git_blob_sha===p.C&&G?.current_historical_86_member_projection?.git_blob_sha===p.D,"G0 all source pins");
 ok(G?.current_W05_section53_primary_source_oracle?.git_blob_sha===p.O,"source-first oracle pin");
 ok(G?.current_W05_section53_source_defect?.git_blob_sha===p.F,"source defect pin");
 ok(G?.current_W02_v04_NodeCI?.git_blob_sha===p.ci&&G?.current_W02_v04_NodeCI?.current_source0_37_qualified===false,"W02 Node historical only");
 ok(G?.current_W03_W04_Oct03_archive_recovery?.git_blob_sha===p.hist&&G?.current_W_nine_source_inventory?.git_blob_sha===p.inv,"Oct3 and nine-source inventory pins");
 ok(G?.current_W05_section53_source_verifier?.path===context.P.self&&G?.current_W05_section53_source_verifier?.git_blob_sha===context.selfSha,"exact self verifier");
 ok(S?.schema==="woit.source-semantic-census.v0.37"&&S?.items?.length===151&&S?.source_count===9&&S?.predecessor?.git_blob_sha===p.oldS&&S?.closure_claims?.sealed===false,"SSC0.37 item count and G0 open");
 ok(eq(S?.items?.map(x=>x.id),oldS?.items?.map(x=>x.id))&&eq(S?.items?.filter((x,i)=>!eq(x,oldS.items[i])).map(x=>x.id),["W-SSC-104"]),"W104 only changed; 150 exact");
 const n=S?.items?.find(x=>x.id==="W-SSC-104"),b=oldS?.items?.find(x=>x.id==="W-SSC-104");
 ok(b?.source_expression_census?.statements?.length===2&&n?.source_expression_census?.statements?.length===5&&eq(b?.source_expression_census?.statements,n?.source_expression_census?.statements?.slice(0,2)),"original two W104 statements retained");
 ok(b?.obligation?.includes("lambda=1 giving ordinary flat connections")&&n?.obligation?.includes("lambda=1 giving usual connections")&&!n?.obligation?.includes("lambda=1 giving ordinary flat connections")&&n?.obligation?.includes("SIMPSON")&&n?.obligation?.includes("DELIGNE"),"author credit/λ1 exact");
 ok(O?.schema==="isograph.exp062-w05-s53-nonabelian-hodge-source-first-v0.1"&&O?.original_source?.arxiv_revision==="2202.02657v2"&&eq(O?.original_source?.html_line_interval,[212,219])&&O?.original_source?.pdf_index===7&&O?.source_first_intervals?.length===4,"primary W05 source v2 page and HTML rows");
 if(O?.source_first_intervals?.length===4)for(let i=0;i<4;i++)ok(O.source_first_intervals[i].ordinal===i+1&&(i===0||O.source_first_intervals[i].html[0]===O.source_first_intervals[i-1].html[1]+1),"source first contiguous "+i);
 const ss=O?.restored_source_incidences||[];
 ok(eq(ss.map(x=>x.id),["W05-104-03","W05-104-04","W05-104-05"])&&eq(n?.source_expression_census?.statements?.slice(2),ss),"independent W104 3 source incidences exact");
 ok(ss[0]?.credited_person==="Carlos Simpson"&&ss[0]?.source_name_literal==="Simpson"&&ss[0]?.citation_index==="15"&&ss[0]?.negative?.includes("NO_WOIT_PRIORITY_CLAIM"),"Simpson credit scope");
 ok(ss[1]?.case_binding?.X==="RIEMANN_SURFACE_SIGMA"&&ss[1]?.case_binding?.moduli_property==="HYPERKAHLER"&&ss[1]?.presentation_roles?.length===3,"X=Sigma moduli qualifier");
 ok(ss[2]?.credited_person==="Pierre Deligne"&&ss[2]?.source_name_literal==="Deligne"&&eq(ss[2]?.source_cases,[{lambda:1,source_literal:"usual connections",role:"USUAL_CONNECTIONS"},{lambda:0,source_literal:"Higgs bundles",role:"HIGGS_BUNDLES"}])&&ss[2]?.source_negative==="THE_SOURCE_LAMBDA1_SENTENCE_DOES_NOT_BY_ITSELF_STATE_ALL_USUAL_CONNECTIONS_ARE_FLAT","Deligne case and negativity");
 ok(F?.status==="CONFIRMED_AUTHOR_ATTRIBUTION_AND_LAMBDA1_SOURCE_SCOPE_DRIFT_G0"&&F?.source_first_oracle?.git_blob_sha===p.O&&F?.old_census?.git_blob_sha===p.oldS&&F?.affected_issues?.length===4,"source attribution defect lineage");
 ok(D?.items?.length===86&&D?.schema==="isograph.exp062-w-g0-source-demand-projection.v0.21"&&D?.current_source?.git_blob_sha===p.S&&D?.predecessor_W_only_demand?.git_blob_sha===p.oldD&&D?.replay_policy?.G1_authorized===false,"86 historical partial");
 ok(eq(D?.items?.filter((x,i)=>!eq(x,oldD.items[i])).map(x=>x.census_id),["W-SSC-104"]),"other 85 historical members exact");
 ok(R?.rows?.length===151&&R?.schema==="isograph.exp062-w-g0-all-151-source-membership-register.v0.23"&&R?.source_census?.git_blob_sha===p.S&&R?.historical_86_projection?.git_blob_sha===p.D,"151 register pinned");
 ok(C?.rows?.length===151&&C?.schema==="isograph.exp062-w-g0-line-by-line-151-coverage.v0.22"&&C?.source_census?.git_blob_sha===p.S&&C?.reconstructed_register?.git_blob_sha===p.R,"151 coverage pinned");
 ok(eq(R?.rows?.filter((x,i)=>!eq(x,oldR.rows[i])).map(x=>x.census_id),["W-SSC-104"])&&eq(C?.rows?.filter((x,i)=>!eq(x,oldC.rows[i])).map(x=>x.census_id),["W-SSC-104"]),"other 150 register and coverage rows exact");
 let typed=0;const units={};
 if(S?.items?.length===151&&R?.rows?.length===151&&C?.rows?.length===151)for(let i=0;i<151;i++){
  const x=S.items[i],r=R.rows[i],c=C.rows[i],l=x.source_expression_census?.statements?.length||0,unit=/^(W01|W02|W03|W04a|W04b|W04c|W04d|W04e|W05)/.exec(x.source)?.[0];typed+=l;units[unit]=(units[unit]||0)+l;
  ok(r.census_id===x.id&&r.source_body_exact===x.obligation&&r.source_expression_statement_count===l&&c.census_id===x.id&&c.body_length_chars===x.obligation.length&&c.source_expression_statement_count===l&&c.stage_authority===false,"151 aligned "+i);
 }
 ok(typed===330&&units.W05===57&&eq(units,R?.counts?.current_source_expression_units)&&C?.counts?.total_structured_source_incidents===330&&C?.by_unit?.W05?.source_expression_statements===57,"all 330 typed incidence exact");
 if(D?.items?.length===86)for(const d of D.items){const x=S.items.find(t=>t.id===d.census_id);ok(d.body===x?.obligation&&eq(d.source_formula_incidences||[],x?.source_expression_census?.statements||[]),"86 item source exact "+d.census_id)}
 ok(inv?.source_census?.git_blob_sha===p.S&&inv?.summary?.structured_incidences===330&&inv?.summary?.all_nine_original_source_reverse_exhaustive===false&&inv?.units?.length===9,"nine-unit source inventory no reverse claim");
 ok(hist?.GitHub_history_audit?.checked_commit_count===16&&hist?.GitHub_history_audit?.checked?.every(t=>t.recursive_tree_truncated===false&&t.matching_original_W03_W04_raw_snapshot_paths.length===0)&&hist?.Actions_archive_audit?.run_count===16&&hist?.Actions_archive_audit?.total_currently_listed===0&&hist?.conclusions?.oct3_original_byte_identity_verified===false,"Oct3 bounded 16-tree and 16 artifact checks, bytes unknown");
 ok(ci?.run?.id===37974732198&&ci?.run?.positive_pass===true&&ci?.run?.hostile_rejected===52&&ci?.run?.escaped===0&&ci?.test_inputs?.source_census?.git_blob_sha===p.oldS,"prior narrow W02 Node success on old SSC0.36 only");
 ok(G?.verification_at_record_creation?.W05_S53_NodeCI==="PENDING_THIS_COMMIT"&&G?.verification_at_record_creation?.third_party==="OWNER_BYPASSED_NOT_PASSED","Node new pending and external bypass");
 const st=G?.current_lawful_state;ok(st?.G0_open===true,"G0 remains open");for(const key of ["G0_complete","G0_frozen","source_census_frozen","all_nine_source_full_reverse_assertion_enumeration_complete","Oct03_mutable_source_byte_identity_verified","complete_W_151_semantic_demand_membership_requalified","G1_authorized","G2_authorized","G3_authorized","G4_authorized","G5_authorized","G6_authorized","G7_authorized","recursive_IA_authorized","NEI_authorized","DTS_authorized","DP_authorized","cross_track_synthesis_authorized"])ok(st?.[key]===false,"unauthorized "+key);
 return err;
};
const mutations=[
["other W source item edited",x=>{x.S.items[0].obligation+="BAD"}],
["W104 Simpson citation dropped",x=>{x.O.restored_source_incidences[0].citation_index="BAD"}],
["W104 author becomes Woit",x=>{x.O.restored_source_incidences[0].credited_person="Woit"}],
["W104 no-priority guard removed",x=>{x.O.restored_source_incidences[0].negative=[]}],
["X=Sigma condition generalized",x=>{x.O.restored_source_incidences[1].case_binding.X="ALL_X"}],
["X=Sigma hyperkahler removed",x=>{x.O.restored_source_incidences[1].case_binding.moduli_property="NONE"}],
["third moduli presentation missing",x=>{x.O.restored_source_incidences[1].presentation_roles.pop()}],
["Deligne credit substituted",x=>{x.O.restored_source_incidences[2].credited_person="Woit"}],
["lambda 1 changed to flat",x=>{x.O.restored_source_incidences[2].source_cases[0].source_literal="flat connections"}],
["lambda 0 Higgs role changed",x=>{x.O.restored_source_incidences[2].source_cases[1].role="USUAL_CONNECTIONS"}],
["lambda 1 negative removed",x=>{x.O.restored_source_incidences[2].source_negative="NONE"}],
["source version changed",x=>{x.O.original_source.arxiv_revision="2202.02657v1"}],
["source first interval removed",x=>{x.O.source_first_intervals.pop()}],
["source first interval gap",x=>{x.O.source_first_intervals[2].html[0]=222}],
["source W104 typed incident dropped",x=>{x.S.items.find(t=>t.id==="W-SSC-104").source_expression_census.statements.pop()}],
["source old lambda flat restored",x=>{x.S.items.find(t=>t.id==="W-SSC-104").obligation="lambda=1 giving ordinary flat connections"}],
["source item removed",x=>{x.S.items.pop()}],
["source defect falsified",x=>{x.F.status="NO_DEFECT"}],
["historical 86 member removed",x=>{x.D.items.pop()}],
["historical 86 W104 changed",x=>{x.D.items.find(t=>t.census_id==="W-SSC-104").body="BAD"}],
["register W104 changed",x=>{x.R.rows.find(t=>t.census_id==="W-SSC-104").source_body_exact="BAD"}],
["coverage W104 typed count old",x=>{x.C.rows.find(t=>t.census_id==="W-SSC-104").source_expression_statement_count=2}],
["W05 total incorrectly 54",x=>{x.C.by_unit.W05.source_expression_statements=54}],
["inventory falsely complete",x=>{x.inv.summary.all_nine_original_source_reverse_exhaustive=true}],
["history October3 byte falsely verified",x=>{x.hist.conclusions.oct3_original_byte_identity_verified=true}],
["history workflow artifact fabricated",x=>{x.hist.Actions_archive_audit.total_currently_listed=1}],
["history Git tree truncated",x=>{x.hist.GitHub_history_audit.checked[0].recursive_tree_truncated=true}],
["prior W02 Node 51 instead 52",x=>{x.ci.run.hostile_rejected=51}],
["prior W02 Node promoted current",x=>{x.G.current_W02_v04_NodeCI.current_source0_37_qualified=true}],
["gate source pin stale",x=>{x.G.current_source_census.git_blob_sha="BAD"}],
["gate register pin stale",x=>{x.G.current_all_151_conservation_register.git_blob_sha="BAD"}],
["gate oracle pin forged",x=>{x.G.current_W05_section53_primary_source_oracle.git_blob_sha="BAD"}],
["gate verifier self pin forged",x=>{x.G.current_W05_section53_source_verifier.git_blob_sha="BAD"}],
["gate prior G0 pin forged",x=>{x.G.supersedes.git_blob_sha="BAD"}],
["new node success falsely preclaimed",x=>{x.G.verification_at_record_creation.W05_S53_NodeCI="SUCCESS"}],
["G0 frozen",x=>{x.G.current_lawful_state.G0_frozen=true}],
["G1 authorized",x=>{x.G.current_lawful_state.G1_authorized=true}],
["L semantic bridge authorized",x=>{x.G.current_lawful_state.cross_track_synthesis_authorized=true}],
["third-party bypass called passed",x=>{x.G.verification_at_record_creation.third_party="PASSED"}]
];
const q=Object.fromEntries([...Object.keys(pins),'G'].map(k=>[k,JSON.parse(fs.readFileSync(P[k],'utf8'))]));
const ctx={pins,P,selfSha:sha('self')};
const pinErr=[];for(const[k,s]of Object.entries(pins))if(sha(k)!==s)pinErr.push('SHA '+k);
const pos=check(q,ctx);
if(pos.length||pinErr.length){console.log(JSON.stringify({suite:'W05 S53 source attribution G0 0.1',pass:false,positive_pass:false,positive_errors:pos,pin_errors:pinErr,mutants_qualified:false}));process.exitCode=1;}
else{
 const rejected=[],escaped=[],crashed=[];
 for(const[n,fn]of mutations){const y=cp(q),before=JSON.stringify(y);try{fn(y);if(JSON.stringify(y)===before)escaped.push(n+':no-effect');else if(check(y,ctx).length)rejected.push(n);else escaped.push(n)}catch(e){crashed.push(n+':'+e.message)}}
 const pass=escaped.length===0&&crashed.length===0;
 console.log(JSON.stringify({suite:'W05 S53 source attribution G0 0.1',pass,positive_pass:true,positive_errors:[],source_items:151,typed_incidences:330,W05_typed:57,other150_unchanged:true,old86_partial:true,hostile_controls:mutations.length,rejected:rejected.length,escaped,crashed,G0:'OPEN_UNFROZEN'}));
 if(!pass)process.exitCode=1;
}
