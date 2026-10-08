import fs from "node:fs";

const root="research/woit-lisi-isomorph/lisi";
const cText=fs.readFileSync(root+"/LISI_L05_COMPLEX_SPLIT_COMPLEX_SOURCE_INSTANCE_0_2.isg","utf8");
const xText=fs.readFileSync(root+"/LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg","utf8");
const complexText=fs.readFileSync(root+"/LISI_BT01_PAULI_MATRIX_SOURCE_INSTANCE_0_2.isg","utf8");
const timelikeText=fs.readFileSync(root+"/LISI_L05_TIMELIKE_GENERALIZED_REFLECTION_SOURCE_INSTANCE_0_1.isg","utf8");

function parseProd(text,prod){
  const re=new RegExp("\\(\\^150010\\s+"+prod+"\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)\\)","g");
  const m=new Map(); let z;
  while((z=re.exec(text)))m.set(z[1]+","+z[2],Number(z[3]));
  return m;
}
const defs=[
  {name:"Cprime",text:cText,prod:214105,basis:[214110,214111],neg:[214113,214114],sig:[1,-1],negative:[1]},
  {name:"Hprime",text:xText,prod:214205,basis:[214210,214211,214212,214213],neg:[214214,214215,214216,214217],sig:[1,-1,1,-1],negative:[1,3]},
  {name:"Oprime",text:xText,prod:214405,basis:[214410,214411,214412,214413,214414,214415,214416,214417],neg:[214418,214419,214420,214421,214422,214423,214424,214425],sig:[1,1,1,1,-1,-1,-1,-1],negative:[4,5,6,7]}
];
for(const d of defs)d.pm=parseProd(d.text,d.prod);

function bp(D,i,j){
  const out=D.pm.get(D.basis[i]+","+D.basis[j]);
  let k=D.basis.indexOf(out),sg=1;
  if(k<0){k=D.neg.indexOf(out);sg=-1;}
  if(k<0)throw new Error("unresolved product "+D.name+" "+i+","+j+" -> "+out);
  return [sg,k];
}
function mul(D,[s1,k1],[s2,k2]){
  const [s,k]=bp(D,k1,k2); return [s1*s2*s,k];
}
const kap=([s,k])=>[k===0?s:-s,k];
const B=(D,[s1,k1],[s2,k2])=>k1===k2?s1*s2*D.sig[k1]:0;
const T=(D,x,y,z)=>B(D,z,mul(D,x,y));

const correctedScalarInterface =
  complexText.includes("(^150010 182003\n    198100 198101 198102 198103 198104 198105 198106)") &&
  complexText.includes("(^150010 198102 198108 198108 198109)") &&
  complexText.includes("(^150010 198103 198106 198109)") &&
  !complexText.includes("(^150010 198103 198108 198108 198109)");

const phaseRelationUsesCorrectOps =
  /\(\^150005\s+\(\^150010\s+229000\s+\?phase\)[\s\S]*?\(\^150010\s+198100\s+\?phase\)[\s\S]*?\(\^150008\s+\?phase\s+198108\)[\s\S]*?\(\^150010\s+189103\s+189106\s+\?m1\)[\s\S]*?\(\^150010\s+198107\s+\?m1\s+\?cm1\)[\s\S]*?\(\^150010\s+198102\s+\?phase\s+\?phase\s+\?cm1\)/.test(timelikeText);

const results=[];
for(const D of defs){
  const n=D.basis.length;
  const failures={Rv:0,Rm:0,Rp:0};
  const samples=[];
  for(const ui of D.negative){
    const a=[1,ui],zu=kap(a);
    for(let xi=0;xi<n;xi++)for(let yi=0;yi<n;yi++)for(let zi=0;zi<n;zi++){
      const x=[1,xi],y=[1,yi],z=[1,zi],t0=T(D,x,y,z);

      const rv_v=mul(D,a,mul(D,kap(x),a));
      const rv_m=mul(D,kap(a),z);
      const rv_p=kap(mul(D,kap(y),kap(a)));
      const tv=T(D,rv_v,rv_m,rv_p);
      if(tv!==t0){failures.Rv++;if(samples.length<8)samples.push({type:"Rv",ui,xi,yi,zi,t0,tv});}

      const rm_v=mul(D,z,kap(a));
      const rm_m=mul(D,a,mul(D,kap(y),a));
      const rm_p=kap(mul(D,kap(a),kap(x)));
      const tm=T(D,rm_v,rm_m,rm_p);
      if(tm!==t0){failures.Rm++;if(samples.length<8)samples.push({type:"Rm",ui,xi,yi,zi,t0,tm});}

      const rp_v=mul(D,zu,kap(y));
      const rp_m=mul(D,kap(x),zu);
      const rp_p=kap(mul(D,a,mul(D,z,a)));
      const tp=T(D,rp_v,rp_m,rp_p);
      if(tp!==t0){failures.Rp++;if(samples.length<8)samples.push({type:"Rp",ui,xi,yi,zi,t0,tp});}
    }
  }
  results.push({
    name:D.name,
    negative_unit_basis:D.negative,
    cases_per_reflection:D.negative.length*n*n*n,
    real_core_cubic_failures:failures,
    samples
  });
}

const pass=correctedScalarInterface&&phaseRelationUsesCorrectOps&&results.every(r=>Object.values(r.real_core_cubic_failures).every(x=>x===0));
const result={
  schema:"isograph.exp062-l130-timelike-reflection-current-verifier.v0.1",
  census_id:"L-SSC-130",
  complex_scalar_revision:"LISI_BT01_PAULI_MATRIX_SOURCE_INSTANCE_0_2.isg",
  corrected_scalar_interface:correctedScalarInterface,
  phase_relation_229000_uses_current_multiply_and_embedding:phaseRelationUsesCorrectOps,
  branch:"s_u=-1",
  phase_relation:"phase=i and phase*phase=embed_R_to_C(-1)",
  explicit_i_outputs_per_reflection:2,
  consequence:"real coefficient core preserves T; two current-interface i phases contribute embedded -1",
  results,
  source_repair_used:false,
  old_0_1_interface_used:false,
  pass
};
console.log(JSON.stringify(result,null,2));
if(!pass)process.exitCode=1;
