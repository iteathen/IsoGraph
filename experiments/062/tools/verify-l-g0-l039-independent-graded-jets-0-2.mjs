// L-only G0 verification successor. This supplements, and never rewrites,
// the historical 0.1 finite Clifford and mutation run.
import './verify-l-g0-l039-common-basis-normalization-0-1.mjs';
import fs from 'node:fs';
import crypto from 'node:crypto';

const L='research/woit-lisi-isomorph/lisi/', E='experiments/062/';
const path={
 old:L+'SOURCE_SEMANTIC_CENSUS_0_30.json',
 current:L+'SOURCE_SEMANTIC_CENSUS_0_31.json',
 packet:L+'LISI_L01_GRADED_H1_COMMON_BASIS_NORMALIZATION_G0_0_1.json',
 graded:L+'LISI_L01_H1_GRADED_CURVATURE_EQ3_1_TO_EQ3_5_SOURCE_G0_0_1.json',
 priorGate:E+'L_CURRENT_STAGE_GATE_0_30.json',
 gate:E+'L_CURRENT_STAGE_GATE_0_31.json',
 defect:E+'L039_GRADED_JET_NORMALIZATION_TAUTOLOGY_VERIFIER_DEFECT_0_1.json'
};
const get=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+'\0'),b])).digest('hex')};
const Old=get(path.old),Current=get(path.current),Packet=get(path.packet),Graded=get(path.graded),Gate=get(path.gate),Defect=get(path.defect);
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const copy=x=>JSON.parse(JSON.stringify(x));

function sourceGuards(c=Current,p=Packet,g=Gate){
 const errors=[],require=(v,reason)=>{if(!v)errors.push(reason)};
 require(c.schema==='woit-lisi.track-l.source-semantic-census.v0.31'&&c.track==='L'&&c.status.includes('UNFROZEN'),'current unfrozen L SSC0.31');
 require(c.item_count===191&&c.items.length===191&&eq(c.items.map(x=>x.id),Old.items.map(x=>x.id)),'191 stable L SI identities');
 const changed=c.items.filter((x,i)=>!eq(x,Old.items[i])).map(x=>x.id);
 require(eq(changed,['L-SSC-039']),'exact one L039 revision');
 require(Old.items.filter(x=>x.id!=='L-SSC-039').every(x=>eq(x,c.items.find(y=>y.id===x.id))),'190 full predecessor source records conserved');
 const old=Old.items.find(x=>x.id==='L-SSC-039'),item=c.items.find(x=>x.id==='L-SSC-039');
 require(item?.body.startsWith(old.body+' '),'L039 predecessor semantic assertions and negative evidence append-only');
 require(c.revision?.predecessor_path===path.old&&c.revision?.predecessor_git_blob_sha===sha(path.old),'SSC0.30 predecessor exact SHA');
 require(c.revision?.source_packet?.path===path.packet&&c.revision?.source_packet?.git_blob_sha===sha(path.packet),'source-normalization packet SHA');
 require(p.schema==='isograph.lisi-l01-h1-graded-common-basis-normalization-g0.v0.1'&&p.stage==='G0'&&p.track==='L','L-only source packet not qualified theory');
 require(p.definition?.H1==='H1=(1/2)*omega+(1/4)*E+(W+B1)'&&p.definition?.mixed_1form_E?.includes('phi^alpha real scalar'),'source 1/4 and graded Higgs typing');
 require(p.definition?.source_named_mixed_formula==='F_gw=(de+(1/2)[omega,e])*phi-e*(dphi+[W+B1,phi])','printed unscaled named Eq3.4');
 require(Graded.actor_degrees?.find(x=>x.id==='e')?.form_degree===1&&Graded.actor_degrees?.find(x=>x.id==='phi')?.form_degree===0,'frozen source e one-form phi scalar');
 require(Graded.source_equations?.find(x=>x.id==='L01-EQ3.4-FGW')?.source_literal==='F_gw=(d(e)+(1/2)*[omega,e])*phi-e*(d(phi)+[W+B1,phi])=T*phi-e*D(phi)'&&p.definition?.source_named_mixed_formula==='F_gw=(de+(1/2)[omega,e])*phi-e*(dphi+[W+B1,phi])','source Eq3.4 compact project notation and exact printed source tokens independently conserved');
 require(g.schema==='isograph.exp062-l-current-stage-gate.v0.31'&&g.current_source_census?.path===path.current&&g.current_source_census?.git_blob_sha===sha(path.current),'successor procedural gate pinned to SSC31');
 require(g.predecessor_gate?.path===path.priorGate&&g.predecessor_gate?.git_blob_sha===sha(path.priorGate),'historical G0 gate30 pin');
 require(g.corrective_verifier?.path==='experiments/062/tools/verify-l-g0-l039-independent-graded-jets-0-2.mjs'&&g.verifier_defect?.path===path.defect,'corrective provenance routed');
 require(Defect.historical_workflow_run===37912033114&&Defect.affected_scope==='96 NONDEGENERATE COFRAME JETS ONLY'&&Defect.repair_disposition==='REOPEN_JET_CALCULATION_NOT_SOURCE_AUTHORITY','tautological jet CI not presented as complete');
 for(const flag of ['authority','source_census_frozen','full_source_cold_audit_complete','author_mathematical_error_confirmed','source_math_theorem_qualified','G1_authorized','external_cold_review_passed'])require(p[flag]===false,'packet no scientific promotion '+flag);
 for(const flag of ['source_census_frozen','full_L01_L06_cold_audit_complete','apparent_factor_four_source_error_proved','common_output_normalization_source_qualified','full_graded_curvature_mathematical_theorem_qualified','G1_authorized','global_authority_promoted'])require(c.revision?.[flag]===false,'SSC no promotion '+flag);
 for(const flag of ['G1_authorized','G2_G7_authorized','recursive_IA_authorized','cross_track_synthesis_authorized','author_mathematical_error_confirmed','source_output_basis_qualified','external_review_passed','source_census_frozen'])require(g.current_lawful_state?.[flag]===false,'gate no promotion '+flag);
 require(g.current_lawful_state?.G0_source_audit_open===true,'G0 reopen explicit');
 require(!JSON.stringify([c.items.find(x=>x.id==='L-SSC-039'),p,g]).includes('W-SSC-'),'no W semantics imported');
 return errors;
}

// Each raw derivative comes from the 1-jet of the one-form CONNECTION:
// A_j(x)=(1/4)*e^mu_j(x)*phi^alpha(x)*M_(mu,alpha).
// The named expression is independently evaluated from source Eq3.4:
// (d e^mu) phi^alpha - e^mu wedge d phi^alpha (with omega=W=B1=0).
// The comparison is CONDITIONAL on a common unscaled mixed generator M.
// Coefficient and form-order transformations are not copied from one side.
function jet(kind,mu,alpha,k,opt={}){
 const n=4, scale=opt.rawScale??0.25, degree=opt.phiDegree??0;
 const e=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?(opt.frameScale??1):0));
 const dE=Array.from({length:n},()=>Array.from({length:n},()=>Array(n).fill(0)));
 const phi=Array.from({length:n},(_,a)=>a===alpha?1:0);
 const dPhi=Array.from({length:n},()=>Array(n).fill(0));
 if(kind==='gradient')dPhi[alpha][k]=1;
 else if(kind==='torsion')dE[mu][k][mu]=1;
 else throw Error('unrecognized 1-jet');
 // This finite test uses a diagonal tetrad at the base point; its exact
 // determinant is the product of diagonal entries.
 const det=e.reduce((d,row,i)=>d*row[i],1);
 const partialConn=(p,j)=>scale*(dE[mu][p][j]*phi[alpha]+
   (opt.rawProductSign??1)*e[mu][j]*dPhi[alpha][p]);
 const raw=(p,q)=>(opt.rawExteriorSign??1)*(partialConn(p,q)-partialConn(q,p));
 const named=(p,q)=>(opt.namedTorsionSign??1)*(dE[mu][p][q]-dE[mu][q][p])*phi[alpha]-
   (opt.namedHiggsSign??1)*(e[mu][p]*dPhi[alpha][q]-e[mu][q]*dPhi[alpha][p]);
 return {raw,named,det,degree};
}
function checkJets(opt={}){
 let gradient=0,torsion=0,failures=0,first=null,nonzero=0;
 for(const kind of ['gradient','torsion'])
 for(let mu=0;mu<4;mu++)for(let alpha=0;alpha<4;alpha++)for(let k=0;k<4;k++)if(mu!==k){
  const j=jet(kind,mu,alpha,k,opt);
  const p=Math.min(k,mu),q=Math.max(k,mu),sign=mu<k?-1:1;
  const raw=j.raw(p,q),named=j.named(p,q);
  // Must detect both wrong source numbers and spuriously equal assigned operands.
  // Check all 6 2-form coefficients, not only the cherry-picked nonzero witness.
  let ok=j.det===1&&j.degree===0&&raw!==0&&raw!==named&&
    raw===sign/4&&named===sign&&4*raw===named;
  for(let x=0;x<4;x++)for(let y=x+1;y<4;y++){
   const expected=(x===p&&y===q)?sign:0;
   if(j.named(x,y)!==expected||j.raw(x,y)!==expected/4)ok=false;
  }
  if(!ok){failures++;first??={kind,mu,alpha,k,raw,named,det:j.det,degree:j.degree}}
  nonzero++;
  if(kind==='gradient')gradient++;else torsion++;
 }
 return {gradient,torsion,nonzero,failures,first};
}
const base=checkJets(),issues=sourceGuards();
if(base.gradient!==48||base.torsion!==48||base.failures!==0)issues.push('BASELINE graded coframe 1-jet failure '+JSON.stringify(base));
const jetMutants=[
 ['quadruple H1 mixed raw coefficient',{rawScale:1}],
 ['erase H1 mixed factor',{rawScale:0}],
 ['wrong exterior orientation',{rawExteriorSign:-1}],
 ['wrong scalar product derivative sign',{rawProductSign:-1}],
 ['reverse named torsion sign',{namedTorsionSign:-1}],
 ['reverse named Higgs derivative sign',{namedHiggsSign:-1}],
 ['incorrect Higgs form degree',{phiDegree:1}],
 ['degenerate coframe',{frameScale:0}]
];
let jetRejected=0;
if(!issues.length)for(const [name,mutation] of jetMutants){
 const z=checkJets(mutation);
 if(z.failures===0)issues.push('ESCAPED JET MUTATION '+name);
 else jetRejected++;
}
const packetMutants=[
 ['claim author error',(c,p)=>{p.author_mathematical_error_confirmed=true}],
 ['replace printed one quarter',(c,p)=>{p.definition.H1='H1=(1/2)*omega+E+(W+B1)'}],
 ['fake graded Higgs scalar',(c,p)=>{p.definition.mixed_1form_E='phi^alpha one-form'}],
 ['forge source normalized basis',(c,p)=>{c.revision.common_output_normalization_source_qualified=true}],
 ['erase unrelated L05 source',(c,p)=>{c.items.find(x=>x.id==='L-SSC-127').body='removed'}],
 ['promote G1',(c,p,g)=>{g.current_lawful_state.G1_authorized=true}],
 ['misroute successor gate',(c,p,g)=>{g.current_source_census.git_blob_sha='stale'}],
 ['turn source error from OPEN to proved',(c,p,g)=>{g.current_lawful_state.author_mathematical_error_confirmed=true}]
];
let packetRejected=0;
if(!issues.length)for(const [name,fn]of packetMutants){
 const c=copy(Current),p=copy(Packet),g=copy(Gate);fn(c,p,g);
 if(sourceGuards(c,p,g).length===0)issues.push('ESCAPED SOURCE MUTATION '+name);
 else packetRejected++;
}
if(process.exitCode)issues.push('historical base verifier failed');
console.log(JSON.stringify({schema:'isograph.exp062-l-l039-independent-graded-jet-replay.v0.2',pass:!issues.length,errors:issues,
 source_identity_count:191,changed_source_items:['L-SSC-039'],unchanged_source_items:190,
 independently_computed_gradient_jets:base.gradient,independently_computed_torsion_jets:base.torsion,
 valid_nonzero_unscaled_generator_diagnostics:base.nonzero,conditional_raw_to_named_ratio:4,
 new_adversarial_defined:jetMutants.length+packetMutants.length,
 new_adversarial_rejected:jetRejected+packetRejected,
 prior_clifford_math_checks_separately_imported:true,
 source_mathematical_error_confirmed:false,full_source_audit_complete:false,G1_authorized:false,
 external_review_passed:false},null,2));
if(issues.length)process.exitCode=1;
