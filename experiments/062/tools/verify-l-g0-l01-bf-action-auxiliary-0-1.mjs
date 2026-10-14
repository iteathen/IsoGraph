// L-only Experiment 062 G0: frozen L01 BF auxiliary elimination and boundary scope.
// Internal exact algebraic verification, not a global E8/action physical qualification.
import fs from 'node:fs';
import crypto from 'node:crypto';

const R='research/woit-lisi-isomorph/lisi/', E='experiments/062/';
const paths={
 packet:R+'LISI_L01_BF_ACTION_AUXILIARY_G0_0_1.json',
 sscOld:R+'SOURCE_SEMANTIC_CENSUS_0_32.json',
 sscNew:R+'SOURCE_SEMANTIC_CENSUS_0_33.json',
 gateOld:E+'L_CURRENT_STAGE_GATE_0_32.json',
 gateNew:E+'L_CURRENT_STAGE_GATE_0_33.json',
 gamma:R+'LISI_L01_GRAVIWEAK_CL71_H1_SOURCE_G0_0_1.json',
 visual:R+'LISI_L01_31_PAGE_VISUAL_SOURCE_G0_AUDIT_0_1.json'
};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const issues=[],assert=(v,msg)=>{if(!v)issues.push(msg)};
const packet=load(paths.packet),sscOld=load(paths.sscOld),sscNew=load(paths.sscNew),gateOld=load(paths.gateOld),gateNew=load(paths.gateNew),gammaSource=load(paths.gamma);

function sourceGuards(p=packet,old=sscOld,current=sscNew,gate=gateNew) {
 const misses=[],need=(v,n)=>{if(!v)misses.push(n)};
 need(p.schema==='isograph.lisi-L01-BF-action-gravity-auxiliary-G0.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.authority===false,'track/stage/authority');
 need(p.source?.id==='L01'&&p.source.revision==='arXiv:0711.0770v1'&&JSON.stringify(p.source.printed_pages)==='[25,26]','original source');
 for(const [name,path] of [['prior_ssc',paths.sscOld],['prior_gate',paths.gateOld],['original_gamma',paths.gamma],['prior_visual_ledger',paths.visual]])
  need(p.dependencies?.[name]?.path===path&&p.dependencies?.[name]?.git_blob_sha===blob(path),'pinned parent '+name);
 need(p.source_facts?.action_3_7==='S=integral<trace(Bdot Fdot + (pi*G/4)*BG*BG*gamma - Bprime*star(Bprime))>','BF source coefficients/signs');
 need(p.source_facts?.gamma==='gamma=Gamma1 Gamma2 Gamma3 Gamma4, gravitational Clifford volume element in original gamma order','original pseudoscalar definition');
 need(p.source_facts?.source_gravity_onshell_B==='BG=(2/(pi*G))*FG*gamma' && p.source_facts?.source_gravity_onshell_action==='SG=(1/(pi*G))*integral<trace(FG*FG*gamma)>','original BG elimination source formula');
 need(p.source_facts?.source_non_gravity_action==='Sprime=-(1/4)*integral<trace(Fprime*star(Fprime))>','original nonG sign/quarter');
 need(p.source_facts?.reduced_3_8?.includes('[UP_TO_BOUNDARY]') && p.source_facts?.gravitational_after_discard?.includes('AFTER dropping curvature boundary term'),'no unconditional action equivalence');
 need(p.source_facts?.source_curvature_boundary==='<Rcurvature*Rcurvature*gamma>=d(<(omega*d(omega)+(1/3)*omega*omega*omega)*gamma>)','keep original boundary formula');
 need(p.source_facts?.cosmological_scale==='Lambda=(3/4)*phi^2, as source vacuum-sector interpretation','cosmological scope');
 need(p.roles?.BG?.form_degree===2&&p.roles?.Bprime?.form_degree===2&&p.roles?.Bfermion?.form_degree===3&&p.roles?.Bfermion?.anti_Grassmann===true,'source auxiliary form/statistics types');
 need(p.roles?.gamma?.Clifford_grade===4&&p.roles?.gamma?.spacetime_form_degree===0,'Clifford gamma is not a differential four-form');
 need(p.roles?.star?.requires==='invertible four-dimensional Lorentzian frame/coframe'&&p.roles?.phi?.form_degree===0,'metric and Higgs types');
 need(p.project_math?.gravity_rescaling==='Y=(pi*G/2)*BG; the gravitational Lagrangian times pi*G becomes <2 Y wedge FG + Y wedge Y gamma>','BF normalization');
 need(p.project_math?.non_grav_Euler_Lagrange==='Fprime-2 star(Bprime)=0 -> Bprime=-(1/2)star(Fprime)','Hodge stationary sign');
 const t=p.source_modality_guards;
 need(t?.original_3_8_only_up_to_boundary===true&&t?.gravitational_RR_term_retained_before_reduction===true&&t?.boundary_discard_is_explicit===true&&t?.arbitrary_boundaries_equivalent===false,'boundary scope');
 need(t?.fermionic_multiplier_not_eliminated_by_bosonic_variation===true&&t?.Hodge_requires_non_degenerate_Lorentzian_coframe===true,'auxiliary/scope distinction');
 for(const key of ['full_E8_action_derivation_complete','arbitrary_signatures_covered','all_source_assertions_cold_audited','G1_authorized','current_source_census_frozen','author_math_error_proved','cross_author_semantics_authorized','external_cold_qualification_passed'])
  need(t?.[key]===false,'no source/stage promotion '+key);
 need(p.source_census_delta?.current_source_items===191&&p.source_census_delta.changed_only?.join('|')==='L-SSC-042|L-SSC-043'&&p.source_census_delta.unchanged_complete_records===189,'planned item/record conservation');
 need(old.items?.length===191 && current.items?.length===191 && new Set(old.items.map(x=>x.id)).size===191 && new Set(current.items.map(x=>x.id)).size===191,'complete census ID count');
 const A=new Map(old.items.map(x=>[x.id,x])), B=new Map(current.items.map(x=>[x.id,x]));
 const changed=[];
 for(const [id,item] of A){
  if(!B.has(id))misses.push('lost SSC '+id);
  else if(JSON.stringify(item)!==JSON.stringify(B.get(id)))changed.push(id);
 }
 for(const id of B.keys())if(!A.has(id))misses.push('invented SSC '+id);
 need(changed.join('|')==='L-SSC-042|L-SSC-043','only source L042/L043 changed: '+changed.join(','));
 for(const id of ['L-SSC-042','L-SSC-043']){
  const ancestor=A.get(id),descendant=B.get(id);
  need(descendant?.body?.startsWith(ancestor?.body||'ANCESTOR_NOT_FOUND'),'source body positive claims preserved '+id);
  const o=descendant?.source_expression_census?.L01_BF_ACTION_G0;
  need(o?.source_packet?.path===paths.packet&&o?.source_packet?.git_blob_sha===blob(paths.packet)&&o?.source_revision==='arXiv:0711.0770v1','new source graph lineage '+id);
  need(o?.exact_e8_action_qualification===false&&o?.full_boundary_elimination_qualified===false,'per-claim incompleteness '+id);
 }
 need(current.guards?.source_census_freeze_complete===false&&current.guards?.dp_allowed===false&&current.revision?.predecessor_git_blob_sha===blob(paths.sscOld)&&current.revision?.source_packet?.git_blob_sha===blob(paths.packet),'SSC033 source/freeze');
 need(current.revision?.changed_source_items?.join('|')==='L-SSC-042|L-SSC-043','SSC revision declaration');
 need(gate?.stage==='G0'&&gate?.authority_effect==='PROCEDURAL_STAGE_ROUTING_ONLY'&&gate?.semantic_authority===false&&gate.predecessor_gate?.git_blob_sha===blob(paths.gateOld),'G0 only gate provenance');
 need(gate.current_source_census?.git_blob_sha===blob(paths.sscNew)&&gate.current_source_census?.source_identities===191&&gate.current_lawful_state?.G1_authorized===false&&gate.current_lawful_state?.cross_track_synthesis_authorized===false,'G0 descendant census / firewall');
 need(gammaSource.gamma_source?.source_metric==='eta=diag(+1,+1,+1,-1,+1,+1,+1,+1) for THIS SOURCE GENERATOR ORDER (first 3 grav space; Gamma4 grav time; four prime electroweak positive)','original Clifford metric');
 need(!JSON.stringify(p).includes('W-SSC-'),'no imported W semantics');
 return misses;
}
issues.push(...sourceGuards());

// Original source Cl(7,1): exact real signed bit-Blade geometric multiplication.
// This is a separate implementation from the earlier finite-field H1 verifiers.
const eta=[1,1,1,-1,1,1,1,1];
const blade=(m,k=1)=>({m,k});
const identity=blade(0,1),Gamma=blade(15,1);
function cmul(a,b){
 let coeff=a.k*b.k;
 for(let i=0;i<8;i++)if(a.m&(1<<i))for(let j=0;j<8;j++)if(b.m&(1<<j)){
  if(i>j)coeff=-coeff;
  if(i===j)coeff*=eta[i];
 }
 return blade(a.m^b.m,coeff);
}
const equal=(a,b)=>a.m===b.m&&a.k===b.k;
const negative=a=>blade(a.m,-a.k);
assert(equal(cmul(Gamma,Gamma),blade(0,-1)),'original source gravity gamma^2=-1');
const GG=[];
for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)GG.push(cmul(blade(1<<i),blade(1<<j)));
assert(GG.length===6,'six source so(3,1) Clifford bivectors');
for(const [i,g] of GG.entries()){
 assert(equal(cmul(g,Gamma),cmul(Gamma,g)),'gamma commutes gravity bivector '+i);
 assert(GG.some(h=>equal(cmul(g,Gamma),h)||equal(cmul(g,Gamma),negative(h))),'gamma preserves grav bivector space '+i);
}
function wedge(a,b){
 if(a&b)return 0;
 let s=1;
 for(let i=0;i<4;i++)if(a&(1<<i))for(let j=0;j<4;j++)if(b&(1<<j)&&i>j)s=-s;
 return s;
}
const forms=[];
for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)forms.push((1<<i)|(1<<j));
const basis=[];
for(const g of GG)for(const fm of forms)basis.push({c:g,fm});
const gammaAct=a=>({c:cmul(a.c,Gamma),fm:a.fm});
function tracePair(a,b,volume=false) {
 const w=wedge(a.fm,b.fm);
 if(!w)return 0;
 const prod=volume?cmul(cmul(a.c,b.c),Gamma):cmul(a.c,b.c);
 return prod.m===0 ? w*prod.k : 0;
}
let gravitationalStationarity=0,gravitationalOnshell=0,gravNonzeroPair=0;
let wrongGQuadratic=0,wrongGMultiplier=0,wrongGNormalization=0,omittedGVolume=0;
for(const d of basis)for(const f of basis) {
 const gD=gammaAct(d),gF=gammaAct(f),ggF=gammaAct(gF);
 const stationary=2*tracePair(d,f)+tracePair(d,ggF)+tracePair(gF,gD);
 const onshell=2*tracePair(gD,f)+tracePair(gD,gF,true)-tracePair(d,f,true);
 assert(stationary===0,'gravity stationary BF functional component');
 assert(onshell===0,'gravity eliminated BF functional component');
 gravitationalStationarity++;gravitationalOnshell++;
 if(tracePair(d,f,true)!==0)gravNonzeroPair++;
 if(2*tracePair(gD,f)-tracePair(gD,gF,true)-tracePair(d,f,true)!==0)wrongGQuadratic++;
 if(-2*tracePair(gD,f)+tracePair(gD,gF,true)-tracePair(d,f,true)!==0)wrongGMultiplier++;
 if(tracePair(gD,f)+tracePair(gD,gF,true)-tracePair(d,f,true)!==0)wrongGNormalization++;
 if(2*tracePair(gD,f)+tracePair(gD,gF)-tracePair(d,f,true)!==0)omittedGVolume++;
}
assert(gravitationalStationarity===1296&&gravitationalOnshell===1296&&gravNonzeroPair>0,'all 36x36 gravity bilinear tests actually executed');
for(const [name,n] of Object.entries({wrongGQuadratic,wrongGMultiplier,wrongGNormalization,omittedGVolume}))
 assert(n>0,'gravity mutant escaped '+name);

// Four-dimensional Lorentzian Hodge operator on two-forms; derived from
// e_I ^ *e_I = g(e_I,e_I) vol and oriented complementary form.
const formBasis=forms.map(m=>blade(m));
function hodge(f,metric=[1,1,1,-1]){
 const complement=15^f.m;
 let q=f.k*wedge(f.m,complement);
 for(let i=0;i<4;i++)if(f.m&(1<<i))q*=metric[i];
 return blade(complement,q);
}
const formPair=(a,b)=>wedge(a.m,b.m)*a.k*b.k;
for(const f of formBasis)assert(equal(hodge(hodge(f)),negative(f)),'Lorentz star^2=-1 on two-forms');
let nonGravityStationarity=0,nonGravityOnshell=0,nonGravityNonzero=0,
 wrongEuclideanHodge=0,wrongHodgeScale=0,wrongOtherGaugeSign=0;
for(const d of formBasis)for(const f of formBasis){
 const B2=negative(hodge(f)); // 2 B'=-*F'
 const stationary=2*formPair(d,f)-formPair(d,hodge(B2))-formPair(B2,hodge(d));
 const onshell=-formPair(hodge(d),f)+formPair(d,hodge(f));
 assert(stationary===0,'Lorentz Hodge auxiliary stationary');
 assert(onshell===0,'Lorentz Hodge on-shell -1/4 coefficient');
 nonGravityStationarity++;nonGravityOnshell++;
 if(formPair(d,hodge(f))!==0)nonGravityNonzero++;
 const eB2=negative(hodge(f,[1,1,1,1])); // deliberately wrong spacetime signature
 if(2*formPair(d,f)-formPair(d,hodge(eB2,[1,1,1,1]))-formPair(eB2,hodge(d,[1,1,1,1]))!==0)wrongEuclideanHodge++;
 const twoB=blade(B2.m,B2.k*2); // wrong multiplier B'=-*F instead of -1/2*F
 if(2*formPair(d,f)-formPair(d,hodge(twoB))-formPair(twoB,hodge(d))!==0)wrongHodgeScale++;
 if(-formPair(hodge(d),f)-formPair(d,hodge(f))!==0)wrongOtherGaugeSign++;
}
assert(nonGravityStationarity===36&&nonGravityOnshell===36&&nonGravityNonzero>0,'all 6x6 Hodge tests nonvacuous');
for(const [name,n]of Object.entries({wrongEuclideanHodge,wrongHodgeScale,wrongOtherGaugeSign}))
 assert(n>0,'nonG Hodge mutant escaped '+name);

// Fail-closed hostile packet mutation probes; false-positive passing is fatal.
const clone=x=>structuredClone(x);
const srcMutants=[
 ['wrong source revision',x=>{x.source.revision='arXiv:0711.0770v2'}],
 ['wrong gamma orientation',x=>{x.source_facts.gamma='gamma=Gamma4 Gamma1 Gamma2 Gamma3'}],
 ['wrong BF gravity coefficient',x=>{x.source_facts.action_3_7=x.source_facts.action_3_7.replace('(pi*G/4)','(pi*G/2)')}],
 ['wrong nonG BF source sign',x=>{x.source_facts.action_3_7=x.source_facts.action_3_7.replace(' - Bprime*star',' + Bprime*star')}],
 ['wrong BG on-shell scaling',x=>{x.source_facts.source_gravity_onshell_B='BG=-(2/(pi*G))*FG*gamma'}],
 ['wrong Hodge reduction coefficient',x=>{x.source_facts.source_non_gravity_action=x.source_facts.source_non_gravity_action.replace('-(1/4)','+(1/4)')}],
 ['drop mod-boundary',x=>{x.source_facts.reduced_3_8=x.source_facts.reduced_3_8.replace(' [UP_TO_BOUNDARY]','')}],
 ['claim arbitrary boundaries',x=>{x.source_modality_guards.arbitrary_boundaries_equivalent=true}],
 ['turn fermion into bosonic twoform',x=>{x.roles.Bfermion.form_degree=2}],
 ['allow G1',x=>{x.source_modality_guards.G1_authorized=true}],
 ['fake old census pin',x=>{x.dependencies.prior_ssc.git_blob_sha='STALE'}],
 ['drop full-closure limitation',x=>{x.source_modality_guards.full_E8_action_derivation_complete=true}]
];
let sourceMutantsRejected=0;
if(!issues.length)for(const [name,mutate]of srcMutants){
 const candidate=clone(packet);mutate(candidate);
 if(sourceGuards(candidate).length===0)issues.push('ESCAPED_SOURCE_MUTATION '+name);
 else sourceMutantsRejected++;
}
console.log(JSON.stringify({
 schema:'isograph.exp062-L01-gravity-BF-and-Hodge-G0.v0.1',
 pass:issues.length===0,issues,source_revision:'L01 arXiv:0711.0770v1',
 stage:'G0',gamma_square:-1,grav_bivectors:GG.length,space_twoforms:forms.length,
 gravity_stationarity_basis_pairs:gravitationalStationarity,
 gravity_onshell_basis_pairs:gravitationalOnshell,
 gravity_nonzero_trace_volume_pairings:gravNonzeroPair,
 lorentzian_hodge_square:-1,nonG_stationarity_pairs:nonGravityStationarity,
 nonG_onshell_pairs:nonGravityOnshell,nonG_nonzero_Hodge_pairings:nonGravityNonzero,
 math_mutants_detected:{wrongGQuadratic,wrongGMultiplier,wrongGNormalization,omittedGVolume,wrongEuclideanHodge,wrongHodgeScale,wrongOtherGaugeSign},
 source_mutants_defined:srcMutants.length,source_mutants_rejected:sourceMutantsRejected,
 ssc_ids:sscNew.items?.length,ssc_changed_items:['L-SSC-042','L-SSC-043'],unchanged_source_records:189,
 boundary_term_must_remain:true,complete_E8_action_proved:false,
 source_census_frozen:false,G1_authorized:false,external_cold_review_passed:false,
 cross_track_comparison_authorized:false
},null,2));
if(issues.length)process.exitCode=1;
