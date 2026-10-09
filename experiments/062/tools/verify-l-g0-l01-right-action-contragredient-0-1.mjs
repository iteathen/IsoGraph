// L-only original L01 G0: right H2 versus printed coordinate sign, exact nonabelian/dual witness.
// Conditional finite matrix model, NOT source-native E8 or a qualified change of representation.
import fs from 'node:fs';
import crypto from 'node:crypto';
const paths={
  "packet": "research/woit-lisi-isomorph/lisi/LISI_L01_RIGHT_ACTION_CONTRAGREDIENT_G0_0_1.json",
  "verifier": "experiments/062/tools/verify-l-g0-l01-right-action-contragredient-0-1.mjs",
  "workflow": ".github/workflows/experiment-062-l-g0-l01-right-action-contragredient-0-1.yml",
  "old": "research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_40.json",
  "census": "research/woit-lisi-isomorph/lisi/SOURCE_SEMANTIC_CENSUS_0_41.json",
  "oldGate": "experiments/062/L_CURRENT_STAGE_GATE_0_40.json",
  "gate": "experiments/062/L_CURRENT_STAGE_GATE_0_41.json",
  "oldPacket": "research/woit-lisi-isomorph/lisi/LISI_L01_FERMION_ACTION_COFRA_SIGN_SOURCE_G0_0_1.json"
};
const load=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const blob=p=>{const x=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+x.length+'\0'),x])).digest('hex')};
const mathAudit=function mathAudit(m={}){
 const failures=[],ck=(x,s)=>{if(!x)failures.push(s)};
 const Z=(r,c)=>Array.from({length:r},()=>Array(c).fill(0));
 const E=(n,i,j)=>{let a=Z(n,n);a[i][j]=1;return a};
 const MM=(a,b)=>{if(a[0].length!==b.length)throw Error("DIMENSION");return a.map(row=>b[0].map((_,j)=>row.reduce((s,v,k)=>s+v*b[k][j],0)))};
 const T=a=>a[0].map((_,j)=>a.map(row=>row[j]));
 const sc=(a,v)=>a.map(row=>row.map(x=>x*v)), add=(a,b)=>a.map((row,i)=>row.map((x,j)=>x+b[i][j]));
 const sub=(a,b)=>add(a,sc(b,-1));
 const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const comm=(a,b)=>sub(MM(a,b),MM(b,a));
 const psi=[[1,2,3,0],[3,-2,1,5]],G=E(4,0,1),H=E(4,1,2),K=E(4,0,2),chi=T(psi);
 const sourceR=(a,x)=>sc(MM(x,a),m.sourceSign??-1);
 const displayR=(a,x)=>sc(MM(x,sc(a,m.transportSign??-1)),m.displaySign??1);
 const dual=(a,x)=>sc(MM(m.dualTranspose===false?a:T(a),x),m.dualSign??-1);
 ck(eq(comm(G,H),K)&&!eq(K,Z(4,4)),"fixed independent sl3 root-commutator E01,E12=E02");
 ck(eq(sourceR(G,psi),sc(MM(psi,G),-1)),"negative source right action");
 ck(eq(sourceR(G,psi),displayR(G,psi))&&eq(sourceR(H,psi),displayR(H,psi)),"component equals source only after negative generator transport");
 ck(!eq(sourceR(G,psi),MM(psi,G)),"identity component sign demonstrably differs");
 ck(eq(sub(sourceR(G,sourceR(H,psi)),sourceR(H,sourceR(G,psi))),sourceR(K,psi)),"negative right module is a Lie action on noncommuting strong roots");
 ck(!eq(sub(MM(MM(psi,H),G),MM(MM(psi,G),H)),MM(psi,K)),"unnegated right module is an anti-action, not a same-bracket representation");
 ck(eq(T(sourceR(G,psi)),dual(G,chi))&&eq(T(sourceR(H,psi)),dual(H,chi)),"dual transpose carries source right action to left contragredient");
 ck(eq(sub(dual(G,dual(H,chi)),dual(H,dual(G,chi))),dual(K,chi)),"negative transpose is a genuine dual Lie representation");
 ck(!eq(comm(sc(G,-1),sc(H,-1)),sc(K,-1))&&m.claimSameLieBracket!==true,"pure global minus of nonabelian generators is not a same-bracket basis conjugation");
 let q=E(4,0,0);q[1][1]=1;q[2][2]=1;
 if(m.projectorIdentity===true)q=E(4,0,0).map((row,i)=>row.map((x,j)=>i===j?1:0));
 const strong=m.leptonColor===true?add(G,E(4,3,3)):G;
 ck(eq(MM(psi,strong),MM(MM(psi,q),strong)),"strong color quark restriction may be elided only with singlet zero-action");
 ck(eq(MM([[0,0,0,1]],q),[[0,0,0,0]]),"lepton must be an su3 singlet under the chosen projector");
 const A=[[1,2],[-3,1]];
 ck(eq(MM(A,sourceR(G,psi)),sourceR(G,MM(A,psi))),"independent commuting H1 left and H2 right actions");
 const eta=5,theta=0;
 const grassSign=(a,b)=>(a===b?0:(m.grassmannParity===0?1:(a>b?-1:1)));
 ck(grassSign(eta,theta)===-1&&grassSign(theta,eta)===1,"odd fermion and anti-fermion anticommute");
 const leftPair=grassSign(eta,theta)*3,rightPair=grassSign(eta,theta)*(-2);
 ck(leftPair===-3&&rightPair===2&&(-leftPair)===3&&(-rightPair)===-2,"uniform Grassmann pair reorder changes both sectors, not only right sector");
 const wedge=(a,b)=>{if(a&b)return 0;let s=1;for(let i=0;i<4;i++)for(let j=0;j<4;j++)if((a&(1<<i))&&(b&(1<<j))&&i>j)s=-s;return s};
 let alphaSign=m.reverseThreeForm===true?1:-1; // alpha_1 = interior_(d/dx1)volume = -dx0 dx2 dx3.
 ck(wedge(1<<1,(1<<0)|(1<<2)|(1<<3))*alphaSign===1&&wedge((1<<0)|(1<<2)|(1<<3),1<<1)*alphaSign===-1,"oriented threeform–oneform pairing has fixed ordered sign");
 const metric=[1,1,1,-1],gammaSquares=m.flipTemporalGamma===true?[1,1,1,1]:metric;
 const contraction=metric.reduce((s,v,i)=>s+v*gammaSquares[i],0);
 ck(contraction===4&&contraction*(m.higgsQuarter??0.25)===1,"Lorentzian gamma/coframe contraction and source one-quarter normalization");
 return {pass:failures.length===0,failures,exact_arithmetic:true,
  witness:"4x4 E01,E12,E02 acting on nonzero 2x4 fermion carrier; Lorentzian 4-frame",
  negative_right_module_lie_representation:true,
  naive_positive_right_module_same_bracket_representation:false,
  contragredient_dual_conditional:true,
  same_carrier_global_negative_basis_lie_automorphism:false,
  quark_projector_erasure_conditional:true,
  cross_sector_sign_flip_by_uniform_Grassmann_ordering:false,
  E8_author_generator_map_established:false};
};
const mutations=[
  [
    "reverse source H2",
    {
      "sourceSign": 1
    }
  ],
  [
    "reverse coordinate sector",
    {
      "displaySign": -1
    }
  ],
  [
    "remove opposite map",
    {
      "transportSign": 1
    }
  ],
  [
    "dual without minus",
    {
      "dualSign": 1
    }
  ],
  [
    "dual without transpose",
    {
      "dualTranspose": false
    }
  ],
  [
    "wrong global strong bracket",
    {
      "claimSameLieBracket": true
    }
  ],
  [
    "strong acts on lepton",
    {
      "leptonColor": true
    }
  ],
  [
    "lose quark projector",
    {
      "projectorIdentity": true
    }
  ],
  [
    "commuting Grassmann",
    {
      "grassmannParity": 0
    }
  ],
  [
    "reverse 3form orientation",
    {
      "reverseThreeForm": true
    }
  ],
  [
    "reverse temporal Clifford square",
    {
      "flipTemporalGamma": true
    }
  ],
  [
    "wrong Higgs 1/2",
    {
      "higgsQuarter": 0.5
    }
  ]
];
function sourceAudit(p,previous,current,g){
 const bad=[],ck=(x,s)=>{if(!x)bad.push(s)};
 ck(p.schema==='isograph.lisi-L01-right-action-contragredient-G0.v0.1'&&p.track==='L'&&p.stage==='G0'&&p.authority===false,'stage and source authority');
 ck(p.source?.id==='L01'&&p.source.revision==='arXiv:0711.0770v1'&&JSON.stringify(p.source.printed_pages)==='[3,7,16,21,23,24,27,28]','original source revision/pages');
 for(const [key,path] of [['source_fermi_packet',paths.oldPacket],['ssc040',paths.old],['gate040',paths.oldGate]])
 ck(p.provenance_parents?.[key]?.path===path&&p.provenance_parents[key]?.git_blob_sha===blob(path),'frozen original predecessor '+key);
 const layers=p.source?.original_layers||[];
 ck(layers.length===4&&layers[0]?.id==='COVARIANT_OPERATOR'&&layers[0]?.right==='-Psi*(w+B2+xPhi)-Psi_q*g'&&layers[0]?.strong_quark_projected===true,'original p24 right action and quark restriction');
 ck(layers[1]?.id==='ACTION_OPERATOR'&&layers[1]?.right==='-Psi*(w+B2+xPhi+g)'&&layers[1]?.strong_quark_projected_explicitly===false,'p27 right action with quark-projector notation omitted');
 ck(layers[2]?.id==='ACTION_COMPONENT'&&layers[2]?.right==='+Psi*w_i+Psi*B2_i+Psi*x_i*Phi+Psi*g_i','p27 positive printed component signs');
 ck(layers[3]?.id==='LIMIT_OTHER_GENERATIONS'&&layers[3]?.source.includes('not understood well enough'),'p28 non-derived action');
 const f=p.findings||[];
 ck(f.length===6&&f.map(x=>x.id).join('|')==='R01|R02|R03|R04|R05|R06','source findings all present');
 ck(f[0].claim.includes('anti-representation')&&f[1].classification==='NECESSARY_CONDITIONAL_NOT_SOURCE_AUTHORIZED'&&f[2].classification==='POSSIBLE_UNSTATED_COMPLETION_NOT_AUTHOR_ADOPTED','nonabelian/dual limits');
 ck(f[3].claim.includes('zero singlet block')&&f[3].classification==='CONDITIONAL_RECONCILIATION_OF_QUARK_PROJECTOR_NOT_RIGHT_SIGN','quark-only source boundary');
 ck(f[4].classification==='CONDITIONAL_SIGN_EXCLUSION_COMMON_PAIRING_ONLY'&&f[5].classification==='OPEN_SOURCE_REPRESENTATION_OBLIGATION','Grassmann and source gap');
 ck(p.source_capabilities_missing?.length===4,'all missing representation inputs named');
 ck(p.independent_exact_verification?.math_adversarial_mutants===12&&p.independent_exact_verification.source_adversarial_mutants===16,'declared hostile controls');
 for(const [k,v]of Object.entries(p.not_claimed||{}))ck(v===false,'no source promotion or author typo '+k);
 for(const k of ['genuine_source_discrepancy_proved','source_equivalent_transformation_proved','original_E8_representation_derived','source_typo_proved','G1_authorized','W_comparison_authorized','PR70_merge_authorized'])ck(p.not_claimed?.[k]===false,'no illicit source closure '+k);
 ck(JSON.stringify(p.scope?.changed_ids)==='["L-SSC-041","L-SSC-046"]'&&p.scope.unchanged_full_records===189&&p.scope.all_source_identities===191&&p.scope.SSC_frozen===false,'source census delta');
 const a=new Map(previous.items.map(x=>[x.id,x])),b=new Map(current.items.map(x=>[x.id,x])),changes=[];
 ck(a.size===191&&b.size===191&&current.item_count===191,'all source identities');
 for(const [id,item] of a){if(!b.has(id))bad.push('lost source '+id);else if(JSON.stringify(item)!==JSON.stringify(b.get(id)))changes.push(id)}
 for(const id of b.keys())if(!a.has(id))bad.push('invented source '+id);
 ck(changes.join('|')==='L-SSC-041|L-SSC-046','other 189 entire predecessor records unchanged');
 for(const id of ['L-SSC-041','L-SSC-046']){
 const before=a.get(id),after=b.get(id),loc=after?.source_expression_census?.L01_RIGHT_ACTION_CONTRAGREDIENT_G0;
 ck(after.body.startsWith(before.body),'positive prior source body conserved '+id);
 ck(loc?.source_packet?.path===paths.packet&&loc.source_packet.git_blob_sha===blob(paths.packet),'packet exact hash '+id);
 ck(loc?.source_right_component_mapping_qualified===false&&loc?.original_E8_matrix_qualified===false&&loc?.G1_authorized===false,'no source sign/representation closure '+id);
 }
 ck(current.status.includes('UNFROZEN')&&current.guards?.source_census_freeze_complete===false&&current.guards?.dp_allowed===false&&current.guards?.recursive_IA_authorized===false,'unfinished SSC');
 ck(current.revision?.predecessor_git_blob_sha===blob(paths.old)&&current.revision?.source_packet?.git_blob_sha===blob(paths.packet)&&current.revision?.changed_source_items?.join('|')==='L-SSC-041|L-SSC-046','census ancestry');
 ck(g?.stage==='G0'&&g?.track==='L'&&g?.semantic_authority===false&&g?.predecessor_gate?.git_blob_sha===blob(paths.oldGate),'gate ancestry');
 ck(g.current_source_census?.git_blob_sha===blob(paths.census)&&g.current_source_census.source_identities===191&&g.current_source_census.frozen===false,'gate exact source');
 ck(g.current_source_packet?.git_blob_sha===blob(paths.packet)&&g.source_verifier?.git_blob_sha===blob(paths.verifier),'gate packet/checker binding');
 ck(g.current_lawful_state?.G1_authorized===false&&g.current_lawful_state?.cross_track_synthesis_authorized===false&&g.current_lawful_state?.original_E8_right_sign_map_qualified===false,'downstream blocked');
 ck(!JSON.stringify(p).includes('W-SSC-'),'independent L-only provenance');
 return bad;
}
const first=mathAudit(),issues=[...first.failures];
let rejected=0;
for(const [name,opts]of mutations){try{if(!mathAudit(opts).pass)rejected++;else issues.push('ESCAPED_MATH_MUTANT '+name)}catch(e){issues.push('CRASHED_MATH_MUTANT '+name+': '+e.message)}}
let sourceRejected=0;
if(!process.argv.includes('--math-only')){
 const p=load(paths.packet),old=load(paths.old),cur=load(paths.census),gate=load(paths.gate);
 issues.push(...sourceAudit(p,old,cur,gate));
 const a=[
 ['rev',x=>x.source.revision='arXiv:0711.0770v2'],
 ['source-minus',x=>x.source.original_layers[0].right=x.source.original_layers[0].right.replace('-Psi','+Psi')],
 ['g-quark-projector',x=>x.source.original_layers[0].strong_quark_projected=false],
 ['operator-plus',x=>x.source.original_layers[1].right='+Psi*(w+B2+xPhi+g)'],
 ['component-minus',x=>x.source.original_layers[2].right=x.source.original_layers[2].right.replace('+Psi*w_i','-Psi*w_i')],
 ['invent-generation',x=>x.source.original_layers[3].source='All three actions completely derived'],
 ['wrong-bracket',x=>x.findings[0].claim=x.findings[0].claim.replace('anti-representation','representation')],
 ['force-identification',x=>x.findings[1].classification='SOURCE_AUTHORIZED'],
 ['dual-source-promote',x=>x.findings[2].classification='AUTHOR_ADOPTED'],
 ['lepton-not-singlet',x=>x.findings[3].classification='GENERAL_E8_THEOREM'],
 ['Grassmann-global',x=>x.findings[4].classification='SOURCE_SIGN_PROOF'],
 ['right-open-closed',x=>x.findings[5].classification='SOURCE_EQUIVALENT'],
 ['source-native-E8',x=>x.not_claimed.original_E8_representation_derived=true],
 ['author-typo',x=>x.not_claimed.source_typo_proved=true],
 ['false-stage-G1',x=>x.not_claimed.G1_authorized=true],
 ['alter-parent',x=>x.provenance_parents.ssc040.git_blob_sha='BAD']
 ];
 for(const [name,fn]of a){const c=structuredClone(p);fn(c);if(sourceAudit(c,old,cur,gate).length)sourceRejected++;else issues.push('ESCAPED_SOURCE_MUTANT '+name)}
}
console.log(JSON.stringify({schema:'isograph.exp062-L01-right-action-contragredient-G0.v0.1',pass:issues.length===0,issues,
 math:first,math_hostiles_defined:mutations.length,math_hostiles_rejected:rejected,
 source_hostiles_defined:process.argv.includes('--math-only')?0:16,source_hostiles_rejected:sourceRejected,
 L_source_identities:191,unchanged_predecessor_records:189,changed_ids:['L-SSC-041','L-SSC-046'],
 source_E8_full_reconstruction:false,source_generator_component_sign_map_closed:false,second_third_generation_actions_derived:false,
 G1_authorized:false,cross_track_synthesis_authorized:false,external_cold_review_passed:false},null,2));
if(issues.length)process.exitCode=1;
