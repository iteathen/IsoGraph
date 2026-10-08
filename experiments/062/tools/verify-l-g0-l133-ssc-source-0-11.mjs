import fs from 'node:fs';
import crypto from 'node:crypto';
const d='research/woit-lisi-isomorph/lisi/',e='experiments/062/';
const files={old:d+'SOURCE_SEMANTIC_CENSUS_0_10.json',current:d+'SOURCE_SEMANTIC_CENSUS_0_11.json',packet:d+'LISI_L05_SP3_EQ13_EQ14_SOURCE_G0_0_1.json',defect:e+'L05_SP3_EQ14_ROOT_PHASE_SOURCE_FIDELITY_DEFECT_0_1.json'};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,copy=x=>JSON.parse(j(x));
const gitSHA=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const old=load(files.old),now=load(files.current),src=load(files.packet),def=load(files.defect);
function verify(c=now){
 const errs=[],ck=(b,s)=>{if(!b)errs.push(s)};
 const o=old.items.find(x=>x.id==='L-SSC-133'),n=c.items.find(x=>x.id==='L-SSC-133'),r=n?.source_expression_census?.sp3_eq13_eq14_source||{},v=c.revision||{};
 ck(c.schema==='woit-lisi.track-l.source-semantic-census.v0.11'&&c.status.includes('UNFROZEN'),'G0 successor not frozen');
 ck(c.items?.length===191&&c.item_count===191,'191 stable SSC IDs');
 ck(j(c.items.map(x=>x.id))===j(old.items.map(x=>x.id)),'all source identities/order');
 ck(j(c.items.filter((x,i)=>j(x)!==j(old.items[i])).map(x=>x.id))===j(['L-SSC-133']),'only one body changed');
 ck(old.items.filter(x=>x.id!=='L-SSC-133').every(x=>j(x)===j(c.items.find(y=>y.id===x.id))),'190 full prior bodies unchanged');
 ck(v.predecessor_git_blob_sha===gitSHA(files.old)&&v.source_packet?.git_blob_sha===gitSHA(files.packet)&&v.phase_scope_defect?.git_blob_sha===gitSHA(files.defect),'immutable source graph provenance pins');
 ck(v.changed_source_items?.length===1&&v.changed_source_items[0]==='L-SSC-133'&&v.unchanged_source_items===190,'conservation metadata matches graph');
 ck(v.finite_replay?.run_id===37823910939&&v.finite_replay?.cases===216&&v.finite_replay?.adversarial_mutations===24&&v.finite_replay?.external_verification_passed===false,'source finite replay declared exactly');
 ck(v.historical_failed_fixture?.run_id===37823733174,'historical CI failure visible');
 ck(v.G1_authorized===false&&v.source_census_frozen===false&&v.section4_source_complete===false&&v.L01_L06_source_complete===false,'never promote G0');
 ck(c.guards?.source_census_freeze_complete===false&&c.guards?.section4_L133_source_census_complete===false&&c.guards?.L132_replay_authorized===false&&c.guards?.recursive_IA_authorized===false,'downstream remains invalidated');
 ck(c.guards?.section4_sp3_eq13_source_15_rows_transcribed===true&&c.guards?.section4_eq14_reflection_source_transcribed===true&&c.guards?.section4_eq14_root_phase_complete===false,'affirmative plus negative source-guard pairing');
 ck(r.packet?.git_blob_sha===gitSHA(files.packet)&&r.defect?.git_blob_sha===gitSHA(files.defect),'L133 exact source packet pins');
 ck(j(r.source_basis)===j(src.matrix_basis)&&j(r.binders)===j(src.indices),'Killing normalization and source binders');
 ck(j(r.eq13_rows)===j(src.brackets)&&r.eq13_rows?.length===15,'all 15 exact source bracket records');
 ck(j(r.eq14)===j(src.eq14)&&r.phase_underdetermination_preserved===true,'Eq14 and root-phase modality');
 ck(r.finite_basis_checks===216&&r.adversarial_mutations_rejected===24&&r.source_census_frozen===false&&r.source_completeness_qualified===false,'finite-only contract');
 const body=n?.body||'';
 ck(body.startsWith(o.body.split('Further §4.1 split complex')[0]),'all predecessor positive source assertions retained');
 ck(!body.includes('§4.2 Eq.(13) and §4.3 f4/split-octonion bracket families remain unextracted'),'obsolete gap status cleared');
 for(const cell of src.matrix_basis.entries.flat())ck(body.includes(cell),'Eq13 exact source matrix cell retained: '+cell);
 for(const x of src.brackets)ck(body.includes(x.id+': '+x.lhs+' = '+x.rhs),'Eq13 source formula reconstructed in body: '+x.id);
 ck(body.includes(src.eq14.reflection.output)&&body.includes(j(src.eq14.reflection.gR)),'Eq14 ordered output and signed gR');
 ck(body.includes('do NOT themselves specify phases')&&body.includes('SOURCE ASSERTIONS')&&body.includes('G1 and descendant closure remain OPEN'),'negative phase/scope authority nonclaims');
 const other=n?.source_expression_census?.unexpanded_other_section4||[];
 ck(other.length===8&&other[3]?.id==='L4-OTHER-04'&&other[4]?.id==='L4-OTHER-05','all eight section4 role IDs still present');
 ck(other[3]?.status?.includes('G1_AND_RECONSTRUCTION_OPEN')&&other[4]?.behavior?.includes('do not fix root-vector phases')&&other[4]?.status?.includes('ROOT_PHASE_NONDETERMINATION'),'closed-only-source transcript, not math reduction');
 ck(n?.source_expression_census?.lower_primitive_reduction==='NOT_COMPLETE'&&n?.source_expression_census?.source_specific_qualifications_issued===false,'L semantic authority no promotion');
 ck(!j(n).includes('W-SSC-')&&c.guards?.cross_author_semantics_available===false,'track independence');
 ck(def.affected_id==='L-SSC-133'&&def.stage==='G0'&&def.authority===false,'defect retained');
 return errs;
}
const baselineErrors=verify(),errors=[...baselineErrors];
const muts=[];
for(let i=0;i<15;i++)muts.push(['remove exact formula '+(i+1),c=>{c.items.find(x=>x.id==='L-SSC-133').source_expression_census.sp3_eq13_eq14_source.eq13_rows[i].rhs='MISSING'}]);
muts.push(
 ['body omits bracket',c=>{const t=c.items.find(x=>x.id==='L-SSC-133');t.body=t.body.replace('L4-SP3-EQ13-15:', 'OMITTED:')}],
 ['matrix normalization',c=>{c.items.find(x=>x.id==='L-SSC-133').source_expression_census.sp3_eq13_eq14_source.source_basis.entries[0][1]='no 1/sqrt2'}],
 ['Eq14 plus-sign',c=>{c.items.find(x=>x.id==='L-SSC-133').source_expression_census.sp3_eq13_eq14_source.eq14.reflection.output='A(M,V,P,tilde(psi),tilde(v),tilde(chi))'}],
 ['phase invented',c=>{c.guards.section4_eq14_root_phase_complete=true}],
 ['predecessor pin stale',c=>{c.revision.predecessor_git_blob_sha='stale'}],
 ['source packet pin stale',c=>{c.revision.source_packet.git_blob_sha='stale'}],
 ['defect pin stale',c=>{c.revision.phase_scope_defect.git_blob_sha='stale'}],
 ['delete old SSC claim',c=>{c.items.find(x=>x.id==='L-SSC-127').body='discarded'}],
 ['G1 unauthorized',c=>{c.revision.G1_authorized=true}],
 ['root phase false source claim',c=>{c.items.find(x=>x.id==='L-SSC-133').source_expression_census.unexpanded_other_section4[4].behavior='exact root vector phases fully known'}],
 ['phase nonclaim lost',c=>{c.items.find(x=>x.id==='L-SSC-133').body=c.items.find(x=>x.id==='L-SSC-133').body.replace('do NOT themselves specify phases','fully specify phases')}],
 ['external verification fabricated',c=>{c.revision.finite_replay.external_verification_passed=true}]
);
let rejections=0;
if(!baselineErrors.length)for(const [name,change]of muts){const mutant=copy(now),before=j(mutant);change(mutant);if(j(mutant)===before)errors.push('mutation no-op: '+name);else if(verify(mutant).length===0)errors.push('mutation escaped: '+name);else rejections++;}
const out={schema:'isograph.exp062-l-ssc011-source-fidelity-replay.v0.1',pass:errors.length===0,errors,source_items:191,unchanged_previous_source_items:190,changed_source_item:'L-SSC-133',eq13_bracket_rows:15,adversarial_mutations_rejected:rejections,adversarial_mutations_defined:muts.length,mutation_gate:baselineErrors.length?'UNTESTED_BASELINE_FAILURE':'TESTED',G1_authorized:false,external_verification_claimed:false};
console.log(JSON.stringify(out,null,2));if(errors.length)process.exitCode=1;
