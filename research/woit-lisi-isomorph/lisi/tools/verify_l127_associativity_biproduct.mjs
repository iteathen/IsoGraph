import fs from "node:fs";

const src=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg","utf8");
const basis=[214310,214311,214312,214313,214314,214315,214316,214317];
const neg=[214318,214319,214320,214321,214322,214323,214324,214325];
const re=/\(\^150010\s+214305\s+(\d+)\s+(\d+)\s+(\d+)\)/g,P=new Map();let z;
while((z=re.exec(src))){
 const i=basis.indexOf(+z[1]),j=basis.indexOf(+z[2]);if(i<0||j<0)continue;
 let k=basis.indexOf(+z[3]),sg=1;if(k<0){k=neg.indexOf(+z[3]);sg=-1;}
 P.set(i+","+j,[sg,k]);
}
const mul=(x,y)=>{const q=P.get(x[1]+","+y[1]);return [x[0]*y[0]*q[0],q[1]];};
const kap=x=>[x[1]===0?x[0]:-x[0],x[1]];

const ab=mul([1,1],[1,2]);
const left=mul(ab,[1,3]);
const bc=mul([1,2],[1,3]);
const right=mul([1,1],bc);
const nonassoc=(left[0]===-1&&left[1]===6&&right[0]===1&&right[1]===6);

const ops=[];let skewFailures=0;
for(let c=0;c<8;c++)for(let d=c+1;d<8;d++){
 const M=Array.from({length:8},()=>Array(8).fill(0));
 for(let x=0;x<8;x++){
  const dx=mul([1,d],[1,x]);
  const out=mul(kap([1,c]),dx);
  M[out[1]][x]+=out[0];
 }
 let bad=0;
 for(let i=0;i<8;i++)for(let j=0;j<8;j++)if(M[i][j]+M[j][i]!==0)bad++;
 if(bad)skewFailures++;
 ops.push(M);
}
let A=ops.map(M=>M.flat().map(Number)),row=0,rank=0;
for(let col=0;col<64&&row<A.length;col++){
 let piv=row;while(piv<A.length&&Math.abs(A[piv][col])<1e-9)piv++;
 if(piv===A.length)continue;
 [A[row],A[piv]]=[A[piv],A[row]];
 const pv=A[row][col];for(let j=col;j<64;j++)A[row][j]/=pv;
 for(let i=0;i<A.length;i++)if(i!==row&&Math.abs(A[i][col])>1e-9){const f=A[i][col];for(let j=col;j<64;j++)A[i][j]-=f*A[row][j];}
 row++;rank++;
}
const result={
 census_id:"L-SSC-127",
 nonassociativity_witness_pass:nonassoc,
 biproduct_operator_count:ops.length,
 biproduct_linear_rank:rank,
 exact_source_metric_skew_failures:skewFailures,
 expected_skew_failures_from_preserved_O_discrepancy:7,
 source_repair_used:false,
 pass:nonassoc&&ops.length===28&&rank===28&&skewFailures===7
};
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
