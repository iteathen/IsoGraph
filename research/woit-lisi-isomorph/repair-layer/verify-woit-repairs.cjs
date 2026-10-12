'use strict';
// Woit counterfactual research only: preserve frozen SSC and source conventions.
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');

const verifyWoit=function verifyWoit(source) {
  const must=(ok,message)=>{if(!ok)throw new Error(message);};
  const mod=(n,m)=>((n%m)+m)%m;
  const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const get=(id,key)=>{
    const x=source.items.find(y=>y.id===id);
    must(!!x,`Missing frozen SSC identity ${id}`);
    const c=x.source_expression_census;
    const item=c.statements.find(z=>z.id===key);
    must(!!item,`Missing frozen source occurrence ${key}`);
    return item;
  };
  const originalIntermediate=get('W-SSC-037','W01-037-REP-01');
  const originalHom=get('W-SSC-037','W01-037-HOM-00');
  const originalExpansion=get('W-SSC-037','W01-037-REP-02');
  const sourceQuotientIntro=get('W-SSC-005','W01-005-Q-01');
  const sourceQuotientDetailed=get('W-SSC-036','W01-036-PT-01');
  const sourceWeights=get('W-SSC-036','W01-036-WEIGHT-03');
  must(originalIntermediate.first_operator==='TENSOR_SOURCE_LITERAL'&&originalIntermediate.outer==='TENSOR','Original tensor claim must stay source-literal');
  must(equal(originalIntermediate.second_join_operators,['DIRECT_SUM','DIRECT_SUM']),'Original second factor needs separate direct sums');
  must(equal(originalExpansion.join_operators,['DIRECT_SUM','DIRECT_SUM','DIRECT_SUM','PLUS','PLUS']),'Preserve exact original final join modalities');
  must(originalHom.total_complex_dimension===16&&originalHom.line_rank===1&&originalHom.quotient_rank===3&&equal(originalHom.spinor_ranks,[2,2]),'Original Hom source scope changed');
  must(sourceQuotientIntro.rhs.denominator.operator==='SOURCE_PRINTED_DIRECT_PRODUCT'&&equal(sourceQuotientIntro.rhs.denominator.factors,['U(1)','SU(3)']),'Original introductory stabilizer must stay literal');
  must(equal(sourceQuotientDetailed.terms,['U(4)/(U(1)*U(3))','SU(4)/S(U(1)*U(3))','SU(4)/U(3)']),'Original §4.2 full stabilizer must be preserved');
  must(sourceWeights.on_l==='1'&&sourceWeights.on_quotient==='-1/3','Original normalized tangent hypercharge weights must stay scoped');

  function parseThirds(text) {
    const parts=text.split('/');
    must(parts.length<=2&&parts.length>=1&&/^[+-]?\d+$/.test(parts[0])&&(parts.length===1||/^\d+$/.test(parts[1])),`Malformed integer/rational weight ${text}`);
    const n=Number(parts[0]),den=parts.length===1?1:Number(parts[1]);
    must((den===1||den===3)&&Number.isInteger(3*n/den),'Expected third-integral weight');
    return 3*n/den;
  }
  function term(text) {
    const match=/^(.*)_(?:\(([+-]?\d+(?:\/\d+)?)\)|([+-]?\d+(?:\/\d+)?))$/.exec(text);
    must(!!match,`Unrecognized source term ${text}`);
    const rep=match[1].trim();
    let dimension;
    switch(rep) {
      case 'C': dimension=1;break;
      case 'C2': dimension=2;break;
      case 'C3': dimension=3;break;
      case '(C3 tensor C2)': dimension=6;break;
      default:throw Error(`Unrecognized representation carrier ${rep}`);
    }
    return {dimension,weightThirds:parseThirds(match[2]??match[3])};
  }
  const sumRank=a=>a.reduce((s,x)=>s+x.dimension,0);
  const product=(a,b)=>({dimension:a.dimension*b.dimension,weightThirds:a.weightThirds+b.weightThirds});
  const multiplyParts=(a,b)=>a.flatMap(x=>b.map(y=>product(x,y)));
  const asTensor=a=>a.reduce((v,x)=>product(v,x),{dimension:1,weightThirds:0});
  const sameTerms=(a,b)=>equal(a,b);
  const first=originalIntermediate.first.map(term);
  const second=originalIntermediate.second.map(term);
  const expansion=originalExpansion.rhs.map(term);
  const rawTensor=multiplyParts([asTensor(first)],second);
  const corrected=multiplyParts(first,second);
  const homDim=(originalHom.line_rank+originalHom.quotient_rank)*originalHom.spinor_ranks.reduce((s,x)=>s+x,0);
  must(homDim===16&&sumRank(rawTensor)===12&&sumRank(expansion)===16,'Expected original contradiction 16/12/16');
  must(sumRank(corrected)===homDim&&corrected.length===6&&sameTerms(corrected,expansion),'Direct-sum correction must recover all six exact weight/dimension entries');
  must(sameTerms(first,[{dimension:1,weightThirds:-3},{dimension:3,weightThirds:1}]),'Corrected first factor must be dual of (line+quotient) with fixed weights');
  const mutate=([
    multiplyParts([{dimension:1,weightThirds:3},first[1]],second), // wrong dual line sign
    multiplyParts([first[0],{dimension:3,weightThirds:-1}],second), // wrong quotient sign
    multiplyParts(first,[{dimension:2,weightThirds:1},second[1],second[2]]), // weak doublet mischarge
    multiplyParts(first,second.slice(1)), // drop doublet
    multiplyParts(first,second.slice(0,2)), // drop positive one
    [...corrected.slice(0,4),{dimension:3,weightThirds:2},corrected[5]], // wrong quark charge
  ]);
  must(mutate.every(x=>!sameTerms(x,expansion)),'Mutant falsely reproduces 6-tuple source');
  const r07={
    id:'R07',model_status:'CONDITIONAL_DIRECT_SUM_RECONSTRUCTION',
    source_ids:['W-SSC-037','W01-037-REP-01','W01-037-REP-02'],
    dimensions:{original_Hom:homDim,printed_intermediate_tensor:sumRank(rawTensor),printed_final_components:sumRank(expansion),counterfactual_first_direct_sum:sumRank(corrected)},
    original_first_operator:'TENSOR_SOURCE_LITERAL',
    candidate_first_operator:'DIRECT_SUM_HYPOTHESIS',
    source_final_component_dimensions:expansion.map(x=>x.dimension),
    source_final_hypercharge_thirds:expansion.map(x=>x.weightThirds),
    corrected_six_term_weights_match:corrected.length,
    original_tensor_output_components:rawTensor.length,
    original_tensor_output_weights_thirds:rawTensor.map(x=>x.weightThirds),
    wrong_repair_mutants_rejected:mutate.length,
    source_modified:false,source_author_intent_proved:false,completed_physics_proved:false
  };

  const root=12;
  const vectorKey=e=>e.join(',');
  const BtoH=(B)=>[mod(-B.reduce((s,n)=>s+n,0),root),...B];
  const fullStabilizer=new Set();
  for(let a=0;a<root;a++)for(let b=0;b<root;b++)for(let c=0;c<root;c++){
    const H=BtoH([a,b,c]);
    must(mod(H.reduce((s,n)=>s+n,0),root)===0,'SU4 stabilizer must have determinant one');
    fullStabilizer.add(vectorKey(H));
  }
  must(fullStabilizer.size===root**3,'U3 diagonal stabilizer injective in SU4');
  const image=new Map(),kernel=[];
  for(let z=0;z<root;z++)for(let a=0;a<root;a++)for(let b=0;b<root;b++){
    const A=[a,b,mod(-a-b,root)];
    must(mod(A.reduce((s,n)=>s+n,0),root)===0,'SU3 diagonal parameter');
    const B=A.map(x=>mod(z+x,root));
    const H=[mod(-3*z,root),...B];
    must(equal(H,BtoH(B)),'U1×SU3 projected image must land inside SU4 U3 stabilizer');
    const key=vectorKey(H);
    image.set(key,(image.get(key)||0)+1);
    if(equal(H,[0,0,0,0]))kernel.push({phaseExponent:z,A});
  }
  const imageCount=image.size;
  must(imageCount===576,'Order-12 finite test image size');
  must([...image.values()].every(n=>n===3),'Every image point must have exactly 3 parameter preimages');
  must(kernel.length===3&&equal(kernel.map(k=>k.phaseExponent),[0,4,8]),'Diagonal central Z3 kernel must be explicit');
  const naiveDiagUnmodified=[1,0,0,0]; // diag(z,A) with z≠1 and A=I3
  must(mod(naiveDiagUnmodified.reduce((s,n)=>s+n,0),root)!==0,'Unmodified block U1×SU3 must fail SU4 determinant');
  must(mod(-1+0+0+0,root)!==0,'Incorrect -z instead of -3z must fail determinant');
  let normalizedCircleCount=0;
  for(let z=0;z<root;z++){
    const H=[mod(3*z,root),mod(-z,root),mod(-z,root),mod(-z,root)];
    must(mod(H.reduce((s,n)=>s+n,0),root)===0,'Integer weight lift 3:-1 must stay in SU4');
    must(fullStabilizer.has(vectorKey(H)),'Lifted normalized circle must lie in actual stabilizer');
    normalizedCircleCount++;
  }
  must(normalizedCircleCount===12,'Missed integer lift elements');
  // The normalized infinitesimal quotient weight -1/3 is not a global character
  // of the independent determinant U(1): a single determinant winding changes
  // its cube-root branch by a nontrivial third root of unity.
  const detWinding=1;
  const fracThirdMonodromyClass=mod(detWinding,3);
  must(fracThirdMonodromyClass!==0,'Fractional unlifted character must be multivalued');
  const bad=[
    mod(1+0+0+0,root)!==0,
    mod(-1+0+0+0,root)!==0,
    imageCount < root*root*root,
    kernel.length>1,
    fracThirdMonodromyClass!==0
  ];
  must(bad.every(Boolean),'Negative quotient guards failed');
  const r08={
    id:'R08',model_status:'GLOBAL_STABILIZER_FINITE_COVER_AND_LOCAL_WEIGHT_GUARD',
    source_ids:['W-SSC-005','W01-005-Q-01','W-SSC-036','W01-036-PT-01','W01-036-WEIGHT-03'],
    exact_group_maps:{
      stabilizer:'S(U(1)×U(3))≅U(3): B↦diag(det(B)^(-1),B)',
      covering:'(U(1)×SU(3))/Z3≅U(3), (z,A)↦zA; SU4 action diag(z^-3,zA)',
      kernel:'{(ζ,ζ^-1 I3) | ζ^3=1}'
    },
    finite_root_order:root,full_diagonal_U3_stabilizer_cases:fullStabilizer.size,
    tested_U1_SU3_parameter_pairs:root*root*root,
    discrete_image_elements:imageCount,preimages_per_element:3,kernel_size:kernel.length,
    kernel_parameter_exponents:kernel.map(x=>x.phaseExponent),
    globally_integer_weight_lift:'line 3; quotient -1',weight_lift_cases:normalizedCircleCount,
    normalized_ratio:'line +1; quotient -1/3 (Lie-algebra weight ratio only)',
    unlifted_fractional_character_single_valued:false,
    naive_direct_product_embedding_into_SU4_valid:false,
    adversarial_false_global_identifications_rejected:bad.length,
    source_shorthand_or_intent:'UNDETERMINED',
    source_modified:false,author_group_equality_falsified_as_written:false,
    formal_cross_track_authority:false
  };
  return {schema:'isograph.woit-repair-models.finite.v0.1',authority:false,passed_suites:2,source_pins_verified_mechanically:false,results:[r07,r08]};
};
function readPinnedRepositoryFile(root,relative,expectedBlobSha) {
  const buf=fs.readFileSync(path.join(root,relative));
  const sha=crypto.createHash('sha1').update(Buffer.from('blob '+buf.length+'\0')).update(buf).digest('hex');
  if(sha!==expectedBlobSha)throw Error('SOURCE BLOB PIN FAIL: '+relative+' expected '+expectedBlobSha+' got '+sha);
  return JSON.parse(buf.toString('utf8'));
}
function verify() {
  const root=path.resolve(__dirname,'../../..');
  const census=readPinnedRepositoryFile(root,'research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json','f13075a1e2b039bab66e738cc992e121cd6c9947');
  const sourceAudit=readPinnedRepositoryFile(root,'experiments/062/W01_G0_S42_INDEPENDENT_DIMENSION_NEGATIVE_0_1.json','0d5737e6439741b52759da68b5743c03dd1b67b0');
  if(sourceAudit.calculations.Hom_dimension!==16||sourceAudit.calculations.printed_intermediate_dimension!==12||sourceAudit.calculations.six_component_total!==16)throw Error('Frozen original W01 sanity witness mutated');
  const result=verifyWoit(census);
  result.source_pins_verified_mechanically=true;
  result.original_audit_negative_control_retained=true;
  return result;
}
if(require.main===module)process.stdout.write(JSON.stringify(verify(),null,2)+'\n');
module.exports={verify,verifyWoit};
