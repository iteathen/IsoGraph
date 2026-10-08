import fs from 'node:fs';
import crypto from 'node:crypto';
const root='research/woit-lisi-isomorph/lisi/',exp='experiments/062/';
const p={before:root+'SOURCE_SEMANTIC_CENSUS_0_11.json',after:root+'SOURCE_SEMANTIC_CENSUS_0_12.json',packet:root+'LISI_L05_F4_EQ15_EQ16_SOURCE_G0_0_1.json',table:root+'LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_2.json'};
const get=x=>JSON.parse(fs.readFileSync(x,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const old=get(p.before),curr=get(p.after),packet=get(p.packet),ledger=get(p.table);
function check(s=curr){
 const err=[],ok=(yes,label)=>{if(!yes)err.push(label)},o=old.items.find(x=>x.id==='L-SSC-133'),n=s.items.find(x=>x.id==='L-SSC-133'),r=n?.source_expression_census||{},z=r.f4_eq15_eq16_source||{},rev=s.revision||{};
 ok(s.schema==='woit-lisi.track-l.source-semantic-census.v0.12'&&s.status?.includes('G0')&&s.status?.includes('UNFROZEN'),'SSC only unfrozen G0');
 ok(s.item_count===191&&s.items?.length===191&&j(s.items.map(x=>x.id))===j(old.items.map(x=>x.id)),'191 source identity conservation');
 ok(j(s.items.filter((v,i)=>j(v)!==j(old.items[i])).map(x=>x.id))===j(['L-SSC-133']),'exactly one item changed');
 ok(old.items.filter(x=>x.id!=='L-SSC-133').every(x=>j(x)===j(s.items.find(y=>y.id===x.id))),'all 190 full predecessor bodies retained');
 ok(rev.predecessor_path===p.before&&rev.predecessor_git_blob_sha===sha(p.before)&&rev.source_packet?.path===p.packet&&rev.source_packet?.git_blob_sha===sha(p.packet),'pinned source parentage');
 ok(rev.changed_source_items?.length===1&&rev.changed_source_items[0]==='L-SSC-133'&&rev.unchanged_source_items===190,'conservation metadata');
 ok(rev.source_literal_ci_pass?.run_id===37825594872&&rev.source_literal_ci_pass?.status==='success'&&rev.source_literal_ci_pass?.eq16_brackets===10&&rev.source_literal_ci_pass?.split_sign_rows===3&&rev.source_literal_ci_pass?.finite_Lie_bracket_computation==='NOT_RUN'&&rev.source_literal_ci_pass?.external_cold_review_passed===false,'no fake octonion Lie or external proof');
 ok(rev.source_census_frozen===false&&rev.section4_full_source_complete===false&&rev.L01_L06_source_complete===false&&rev.G1_authorized===false,'downstream not qualified');
 ok(s.guards?.section4_f4_eq15_eq16_source_subscope_transcribed===true&&s.guards?.section4_f4_eq16_source_bracket_rows===10&&s.guards?.section4_f4_split_source_sign_rows===3,'source scope and row counts');
 ok(s.guards?.section4_f4_and_split_cases_complete===false&&s.guards?.section4_L133_source_census_complete===false&&s.guards?.source_census_freeze_complete===false&&s.guards?.L132_replay_authorized===false&&s.guards?.recursive_IA_authorized===false,'no stage evasion');
 ok(z.source_packet?.git_blob_sha===sha(p.packet)&&z.source_packet?.path===p.packet&&z.finite_octonion_Lie_bracket_tests==='NOT_RUN'&&z.full_section4_3_source_complete===false&&z.primitive_reduction_qualified===false&&z.external_cold_review_passed===false,'unreduced source incidence');
 ok(j(z.eq15)===j(packet.eq15)&&j(z.source_indices)===j(packet.indices)&&j(z.eq16)===j(packet.eq16)&&j(z.negative)===j(packet.preserved_source_negative_evidence),'Eq15 Eq16 source packet fully reconstructs');
 ok(z.eq16?.brackets?.length===10&&z.eq16?.split_real_form?.brackets?.length===3,'10+3 signed source families');
 ok(j(r.sp3_eq13_eq14_source)===j(o.source_expression_census.sp3_eq13_eq14_source),'previous exact Eq13 Eq14 occurrence not overwritten');
 ok(r.unexpanded_other_section4?.length===8&&r.unexpanded_other_section4[6]?.id==='L4-OTHER-07'&&r.unexpanded_other_section4[6]?.status?.includes('EQ17_AND_ALL_LATER_OPEN'),'f4 source remainder explicitly open');
 ok(r.source_specific_qualifications_issued===false&&r.lower_primitive_reduction==='NOT_COMPLETE','no borrowed Lie theorem');
 const body=n?.body||'';
 ok(body.startsWith(o.body.split('and §4.3 f4/split-octonion families remain unextracted or incomplete')[0]),'previous positive source body preserved');
 ok(!body.includes('and §4.3 f4/split-octonion families remain unextracted or incomplete'),'obsolete all-unextracted status revised');
 ok(body.includes('Eq.(17) onward')&&body.includes('G3 CORE_CLOSED')&&body.includes('No finite octonionic Lie algebra theorem'),'open source/materialization negative claims');
 ok(body.includes(packet.eq15.sum)&&body.includes(packet.eq15.printed_relation)&&body.includes('OCTONIONIC COMPOSITIONAL-OPERATOR REPRESENTATION'),'Eq15 source literal and source modality');
 for(const x of packet.eq16.brackets)ok(body.includes(x.id+': '+x.lhs+' = '+x.rhs),'Eq16 source row '+x.id);
 for(const x of packet.eq16.split_real_form.brackets)ok(body.includes(x.id+': '+x.lhs+' = '+x.rhs),'split source row '+x.id);
 ok(body.includes('MINUS for compact f4(-52)')&&body.includes('PLUS for f4(-20)')&&body.includes('split f4(4)'),'source branches not conflated');
 ok(body.includes('e6*e7=-e2 AND e7*e6=-e2'),'source contradiction not normalized');
 ok(ledger.basis_multiplication_tables.find(x=>x.carrier==='O').entries[6][7]==='-e2'&&ledger.basis_multiplication_tables.find(x=>x.carrier==='O').entries[7][6]==='-e2','frozen contradictory table preserved');
 ok(!j(n).includes('W-SSC-')&&s.guards?.cross_author_semantics_available===false,'L independent');
 return err;
}
const baseline=check(),errors=[...baseline],mutants=[];
for(let i=0;i<10;i++)mutants.push(['Eq16 row '+(i+1),s=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.f4_eq15_eq16_source.eq16.brackets[i].rhs='BAD'}]);
for(let i=0;i<3;i++)mutants.push(['split row '+(i+1),s=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.f4_eq15_eq16_source.eq16.split_real_form.brackets[i].rhs='BAD'}]);
mutants.push(
 ['alter source packet pin',s=>{s.revision.source_packet.git_blob_sha='STALE'}],
 ['alter previous exact source',s=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.sp3_eq13_eq14_source.finite_basis_checks=0}],
 ['drop source Eq15 matrix',s=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.f4_eq15_eq16_source.eq15.matrix[0][1]='v'}],
 ['split sign polarity',s=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.f4_eq15_eq16_source.eq16.split_real_form.brackets[0].rhs='PLUS'}],
 ['G1 premature',s=>{s.revision.G1_authorized=true}],
 ['f4 complete fabrication',s=>{s.guards.section4_f4_and_split_cases_complete=true}],
 ['erase source remainder',s=>{s.items.find(x=>x.id==='L-SSC-133').body=s.items.find(x=>x.id==='L-SSC-133').body.replace('Eq.(17) onward','all f4 proved')}],
 ['erase O conflict',s=>{s.items.find(x=>x.id==='L-SSC-133').body=s.items.find(x=>x.id==='L-SSC-133').body.replace('e7*e6=-e2','e7*e6=+e2')}],
 ['erase old source',s=>{s.items.find(x=>x.id==='L-SSC-129').body='old lost'}],
 ['cross W semantics',s=>{s.items.find(x=>x.id==='L-SSC-133').body+=' W-SSC-103'}],
 ['invent finite octonion theorem',s=>{s.items.find(x=>x.id==='L-SSC-133').source_expression_census.f4_eq15_eq16_source.finite_octonion_Lie_bracket_tests='PASS'}],
 ['pretend cold review',s=>{s.revision.source_literal_ci_pass.external_cold_review_passed=true}]
);
let rejected=0;
if(!baseline.length)for(const [name,fn]of mutants){const s=cp(curr),before=j(s);fn(s);if(j(s)===before)errors.push('no-op mutation '+name);else if(check(s).length===0)errors.push('escaped mutation '+name);else rejected++;}
const out={schema:'isograph.exp062-l-ssc012-f4-source.v0.1',pass:errors.length===0,errors,identities:191,unchanged:190,changed:'L-SSC-133',Eq16_rows:10,split_sign_rows:3,adversarial_defined:mutants.length,adversarial_rejected:rejected,adversarial_gate:baseline.length===0?'TESTED':'UNTESTED_BASELINE_FAILURE',full_source_frozen:false,octonion_Lie_mathematical_test:'NOT_RUN',G1_authorized:false,external_cold_review_passed:false};
console.log(JSON.stringify(out,null,2));if(errors.length)process.exitCode=1;
