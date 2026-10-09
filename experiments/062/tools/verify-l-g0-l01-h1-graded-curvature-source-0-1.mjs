import fs from 'node:fs';import crypto from 'node:crypto';
const L='research/woit-lisi-isomorph/lisi/',E='experiments/062/';
const P={packet:L+'LISI_L01_H1_GRADED_CURVATURE_EQ3_1_TO_EQ3_5_SOURCE_G0_0_1.json',
ssc:L+'SOURCE_SEMANTIC_CENSUS_0_29.json',gate:E+'L_CURRENT_STAGE_GATE_0_29.json',
ew:L+'LISI_L01_H1_EW_PURE_BIVECTOR_SOURCE_G0_0_1.json',
mixed:L+'LISI_L01_H1_PURE_GRAVITY_AND_ALL_MIXED_BRACKET_SOURCE_G0_0_1.json',
cl:L+'LISI_L01_GRAVIWEAK_CL71_H1_SOURCE_G0_0_1.json',
h1:L+'LISI_L01_H1_POSITIVE_CHIRAL_FIELD_BLOCKS_G0_0_1.json'};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8')),j=JSON.stringify,cp=x=>JSON.parse(j(x));
const gitsha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex');};
const Source=load(P.packet),SSC=load(P.ssc),Gate=load(P.gate);
const Eq=[
 ['L01-EQ3.1-A','L-SSC-037','A=H1+H2+Psi_I+Psi_II+Psi_III','SOURCE_SUPERCONNECTION_DECOMPOSITION','printed p23 Eq.(3.1)'],
 ['L01-EQ3.1-H1','L-SSC-032','H1=(1/2)*omega+(1/4)*e*phi+w_ew','SOURCE_NORMALIZED_ONE_FORM_CONNECTION','printed p23 immediately after Eq.(3.1)'],
 ['L01-EQ3.2-F','L-SSC-038','F=d(A)+(1/2)*[A,A]=d(A)+A*A=F1+F2+D(Psi_I)+D(Psi_II)+D(Psi_III)','SOURCE_GRADED_CURVATURE_AND_GRASSMANN_EXTENSION','printed p24 Eq.(3.2)'],
 ['L01-EQ3.2-F1','L-SSC-039','F1=F_G+F_gw+F_ew','SOURCE_THREE_SECTOR_GRAVIWEEK_CURVATURE','printed p24 after Eq.(3.2)'],
 ['L01-EQ3.3-FG','L-SSC-039','F_G=(1/2)*((d(omega)+(1/2)*omega*omega)+(1/8)*(e*phi)*(e*phi))=(1/2)*(R-(1/8)*e*e*phi^2)','SOURCE_GRAVITY_CURVATURE_ORDER_AND_NORMALIZATION','printed p24 Eq.(3.3)'],
 ['L01-EQ3.4-FGW','L-SSC-039','F_gw=(d(e)+(1/2)*[omega,e])*phi-e*(d(phi)+[W+B1,phi])=T*phi-e*D(phi)','SOURCE_TORSION_AND_HIGGS_DERIVATIVE_WITH_SCOPE','printed p24 Eq.(3.4)'],
 ['L01-EQ3.5-FEW','L-SSC-039','F_ew=(d(W)+W*W)+(d(B1)+B1*B1)=F_W+F_B1','SOURCE_TWO_INDEPENDENT_EW_CURVATURE_TWO_FORMS','printed p24 Eq.(3.5)']
];
const expectedActors={
omega:1,e:1,phi:0,W:1,B1:1,'e*phi':1,F1:2,F_G:2,F_gw:2,F_ew:2,
'Psi_I,II,III':'Grassmann-valued, not bosonic 1-form'
};
const parentNames=[['SSC029',P.ssc],['gate029',P.gate],['EW_source',P.ew],['mixed_coefficient_source',P.mixed],['Cl71_16x16_source',P.cl],['H1_printed_8x8_source',P.h1]];
const frag=(s,p)=>s?.includes(p)===true;
function verify(v=Source){
 const errors=[],ok=(yes,msg)=>{if(!yes)errors.push(msg)};
 ok(v.schema==='isograph.lisi-l01-graded-h1-curvature-source.g0.v0.1'&&v.track==='L'&&v.stage==='G0'&&v.status==='FROZEN_L01_EQ31_EQ35_GRADED_SOURCE_LITERAL_PARTIAL_UNQUALIFIED'&&v.authority===false,'current L source G0 partial');
 ok(v.source?.id==='L01'&&v.source?.revision==='arXiv:0711.0770v1 2007-11-06'&&v.source?.url==='https://arxiv.org/pdf/0711.0770v1'&&v.source?.section==='§3.1 Curvature'&&j(v.source.printed_pages)===j([23,24])&&v.source?.link_to?.includes('Eq.(2.10)'),'exact frozen L01 source revision and pages');
 for(const [key,p]of parentNames)ok(v.parents?.[key]?.path===p&&v.parents?.[key]?.git_blob_sha===gitsha(p),'exact source predecessor '+key);
 ok(SSC.items?.length===191&&SSC.guards?.source_census_freeze_complete===false&&Gate.current_lawful_state?.G1_authorized===false,'SSC0.29/current G0 not promoted');
 for(const key of ['source_complete','source_census_frozen','graded_curvature_theorem_qualified','G1_authorized','external_cold_review_passed'])ok(v[key]===false,'source packet not authority '+key);
 ok(v.actor_degrees?.length===11&&Object.keys(expectedActors).length===11,'all essential actors represented');
 for(const [name,degree]of Object.entries(expectedActors)){const a=v.actor_degrees?.find(x=>x.id===name);ok(a?.form_degree===degree,'form-degree/Grassmann role '+name);}
 ok(v.actor_degrees.find(a=>a.id==='B1')?.source_role?.includes('distinct from W and hypercharge B'),'independent Pati-Salam partner != W or B');
 ok(v.actor_degrees.find(a=>a.id==='e*phi')?.coefficient_H1==='1/4','original H1 mixed scalar coefficient');
 ok(v.source_equations?.length===Eq.length,'all seven page formula assertions');
 for(let i=0;i<Eq.length;i++){const x=v.source_equations?.[i]||{},[id,item,literal,force,loc]=Eq[i];
  ok(x.id===id&&x.item===item&&x.location===loc&&x.source_literal===literal&&x.force===force,'exact printed equation and modality '+id);
 }
 ok(frag(v.source_composition?.graded_form_rule,'one-form wedge one-form')&&frag(v.source_composition?.graded_form_rule,'Grassmann'),'graded wedge vs coefficient product distinction');
 ok(v.source_composition?.ordered_products?.length===4&&v.source_composition?.source_signs?.length===3,'all four operator/sign dependencies');
 ok(v.source_composition?.gauge_roles==='W su(2)_L and B1 su(2)_R separately; B1 not hypercharge B, no W=B1 identification','original independent EW roles');
 ok(frag(v.source_composition.source_signs?.[0],'OUTER one-half')&&frag(v.source_composition.source_signs?.[0],'INNER one-eighth'),'FG two independent normalization coefficients');
 ok(frag(v.source_composition.source_signs?.[1],'+de phi')&&frag(v.source_composition.source_signs?.[1],'-e(Dphi)'),'mixed torsion plus derivative minus');
 ok(frag(v.source_composition.source_signs?.[2],'no mixed W B1'),'pure su2L and su2R source 2-form sectors');
 const x=v.conditional_normalization_check||{};
 ok(x.status==='OPEN_QUANTITY_IDENTIFICATION_NOT_A_CONFIRMED_AUTHOR_MATH_ERROR'&&x.setup?.includes('omega=W=B1=0'),'normalization interpretation not invented theorem');
 ok(x.source_H1_differential_term==='d((1/4)*e*phi)=(1/4)*d(e)*phi when d(phi)=0','source H1 differential exact 1/4');
 ok(x.printed_Fgw_rhs==='F_gw=d(e)*phi when T=d(e),D(phi)=0','author Eq3.4 unscaled source expression');
 ok(x.apparent_factor==='4 between raw mixed connection derivative coefficient and printed named curvature component','real numerical factor under stated comparison contract');
 ok(frag(x.missing_premise,'projected curvature F1 mixed generator normalization')&&x.disposition==='UNRESOLVED_SOURCE_NORMALIZATION_AND_GRADED_PROJECTION; neither source erratum nor phase repair inferred','cannot claim identical source output basis');
 const rawDerivative=1/4,printedExpression=1;
 ok(rawDerivative*4===printedExpression&&rawDerivative!==printedExpression,'arithmetic raw-derivative-only conditional diagnostic');
 ok(v.retained_negative_evidence?.length===4&&v.retained_negative_evidence.some(t=>t.includes('120 mixed/mixed'))&&v.retained_negative_evidence.some(t=>t.includes('octonion')),'negative prior evidence and scope');
 for(const k of ['full_graded_field_curvature_reconstructed','normalization_field_transport_qualified','conditional_factor4_author_error_confirmed','full_L01_L06_cold_source_audit_passed','G1_authorized','external_review_passed'])ok(v.open_conditions?.[k]===false,'G0 typed source not yet qualified '+k);
 ok(v.next_lawful_step?.startsWith('Construct independent source-native common-output')&&v.next_lawful_step?.includes('not infer a mathematical or physical defect'),'next research must first prove quantity and scope');
 ok(!j(v).includes('W-SSC-'),'L-only source independence');
 return errors;
}
const baseline=verify(),errors=[...baseline],mutants=[
 ['H1 frame coefficient 1/4 erased',p=>{p.source_equations[1].source_literal=p.source_equations[1].source_literal.replace('(1/4)','(1/2)')}],
 ['source H1 phi scalar turned 1-form',p=>{p.actor_degrees.find(x=>x.id==='phi').form_degree=1}],
 ['source e frame turned scalar',p=>{p.actor_degrees.find(x=>x.id==='e').form_degree=0}],
 ['source W and B1 merged',p=>{p.source_composition.gauge_roles='W=B1'}],
 ['source B1 hypercharge conflated',p=>{p.actor_degrees.find(x=>x.id==='B1').source_role='hypercharge B'}],
 ['source E8 Grassmann roles omitted',p=>{p.source_equations[0].source_literal='A=H1+H2'}],
 ['FG outer 1/2 erased',p=>{p.source_equations[4].source_literal=p.source_equations[4].source_literal.replace('F_G=(1/2)*','F_G=')}],
 ['FG inner 1/8 erased',p=>{p.source_equations[4].source_literal=p.source_equations[4].source_literal.replace('(1/8)','(1/4)')}],
 ['FG source Clifford sign reversed',p=>{p.source_equations[4].source_literal=p.source_equations[4].source_literal.replace('R-(1/8)','R+(1/8)')}],
 ['FG phi conjugation invented',p=>{p.source_equations[4].source_literal=p.source_equations[4].source_literal.replace('phi^2','tilde(phi)^2')}],
 ['FGW minus source lost',p=>{p.source_equations[5].source_literal=p.source_equations[5].source_literal.replace('-e*(d(phi)','+e*(d(phi)')}],
 ['FGW W+B1 bracket order changed',p=>{p.source_equations[5].source_literal=p.source_equations[5].source_literal.replace('[W+B1,phi]','[phi,W+B1]')}],
 ['Few mixed W+B1 invented',p=>{p.source_equations[6].source_literal='F_ew=d(W+B1)+(W+B1)*(W+B1)'}],
 ['make ordinary matrix commutators grade-aware theorem',p=>{p.source_composition.graded_form_rule='plain 8x8 coefficient bracket equals source curvature'}],
 ['pretend normalization mismatch author error',p=>{p.conditional_normalization_check.disposition='CONFIRMED_AUTHOR_MATHEMATICAL_ERROR'}],
 ['pretend source normalization found',p=>{p.open_conditions.normalization_field_transport_qualified=true}],
 ['remove conditional missing premise',p=>{p.conditional_normalization_check.missing_premise='none'}],
 ['change source edition',p=>{p.source.revision='arXiv:0711.0770v2'}],
 ['wrong input SHA',p=>{p.parents.SSC029.git_blob_sha='stale'}],
 ['declare full L source complete',p=>{p.source_complete=true}],
 ['declare G1 permitted',p=>{p.G1_authorized=true}],
 ['declare theorem',p=>{p.graded_curvature_theorem_qualified=true}],
 ['external cold pass forged',p=>{p.external_cold_review_passed=true}],
 ['cross track W import',p=>{p.next_lawful_step+=' W-SSC-103'}]
];
let rejected=0;
if(!baseline.length)for(const [name,fn]of mutants){const t=cp(Source),before=j(t);fn(t);if(j(t)===before)errors.push('mutation NO-OP '+name);else if(verify(t).length===0)errors.push('mutation ESCAPED '+name);else rejected++;}
console.log(JSON.stringify({schema:'isograph.exp062-l01-H1-graded-source-g0.v0.1',pass:!errors.length,errors,source_equations:Eq.length,typed_actor_roles:11,
raw_frame_derivative_quarter_diagnostic:true,source_graded_curvature_math_qualified:false,author_math_error_confirmed:false,
adversarial_defined:mutants.length,adversarial_rejected:rejected,mutation_gate:baseline.length?'BASELINE_FAILED':'TESTED',G1_authorized:false,external_review_passed:false},null,2));if(errors.length)process.exitCode=1;
