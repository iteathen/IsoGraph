import fs from "node:fs";

const src=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg","utf8");
const basis=[214310,214311,214312,214313,214314,214315,214316,214317];
const neg=[214318,214319,214320,214321,214322,214323,214324,214325];
const prod=214305;
const re=new RegExp("\\(\\^150010\\s+"+prod+"\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)\\)","g");
const raw=new Map();let m;while((m=re.exec(src)))raw.set(m[1]+","+m[2],Number(m[3]));

function signedIndex(atom){
  let i=basis.indexOf(atom);if(i>=0)return [1,i];
  i=neg.indexOf(atom);if(i>=0)return [-1,i];
  throw new Error("bad signed atom "+atom);
}
function mul([s1,i],[s2,j]){
  const out=raw.get(basis[i]+","+basis[j]);
  let k=basis.indexOf(out),sg=1;if(k<0){k=neg.indexOf(out);sg=-1;}
  return [s1*s2*sg,k];
}
const kap=([s,k])=>[k===0?s:-s,k];
function rank(rows){
  const A=rows.map(r=>r.map(Number));let rr=0,cc=0;
  while(rr<A.length&&cc<A[0].length){
    let p=rr;while(p<A.length&&Math.abs(A[p][cc])<1e-9)p++;
    if(p===A.length){cc++;continue;}
    [A[rr],A[p]]=[A[p],A[rr]];
    const q=A[rr][cc];for(let j=cc;j<A[rr].length;j++)A[rr][j]/=q;
    for(let i=0;i<A.length;i++)if(i!==rr&&Math.abs(A[i][cc])>1e-9){
      const f=A[i][cc];for(let j=cc;j<A[i].length;j++)A[i][j]-=f*A[rr][j];
    }
    rr++;cc++;
  }
  return rr;
}
let associativity_failures=0;
for(let a=0;a<8;a++)for(let b=0;b<8;b++)for(let c=0;c<8;c++){
  const ab=mul([1,a],[1,b]),bc=mul([1,b],[1,c]);
  const left=mul(ab,[1,c]),right=mul([1,a],bc);
  if(left[0]!==right[0]||left[1]!==right[1])associativity_failures++;
}

const right=[];
for(let d=1;d<8;d++){
  const M=Array.from({length:8},()=>Array(8).fill(0));
  for(let x=0;x<8;x++){const [s,k]=mul([1,x],[1,d]);M[k][x]=s;}
  right.push(M.flat());
}
const bip=[];
for(let c=0;c<8;c++)for(let d=c+1;d<8;d++){
  const M=Array.from({length:8},()=>Array(8).fill(0));
  const kc=kap([1,c]);
  for(let x=0;x<8;x++){
    const first=mul([1,x],[1,d]);
    const [s,k]=mul(first,kc);
    M[k][x]=s;
  }
  bip.push(M.flat());
}
const result={
  schema:"woit-lisi.l127-biproduct-operator-falsifier.v0.1",
  associativity_failures,
  imaginary_right_span_rank:rank(right),
  biproduct_count:bip.length,
  biproduct_span_rank:rank(bip),
  combined_span_rank:rank([...right,...bip]),
  source_repair_used:false
};
result.pass=
  result.associativity_failures===162 &&
  result.imaginary_right_span_rank===7 &&
  result.biproduct_count===28 &&
  result.biproduct_span_rank===28 &&
  result.combined_span_rank===28;
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
