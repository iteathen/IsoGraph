import fs from "node:fs";

const src=fs.readFileSync("research/woit-lisi-isomorph/lisi/LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg","utf8");
const basis=[214310,214311,214312,214313,214314,214315,214316,214317];
const neg=[214318,214319,214320,214321,214322,214323,214324,214325];
const re=/\(\^150010\s+214305\s+(\d+)\s+(\d+)\s+(\d+)\)/g;
const raw=new Map();let m;while((m=re.exec(src)))raw.set(m[1]+","+m[2],Number(m[3]));

function mul([s1,i],[s2,j]){
  const out=raw.get(basis[i]+","+basis[j]);
  let k=basis.indexOf(out),sg=1;if(k<0){k=neg.indexOf(out);sg=-1;}
  return [s1*s2*sg,k];
}
const kap=([s,k])=>[k===0?s:-s,k];
const pairs=[];for(let c=0;c<8;c++)for(let d=c+1;d<8;d++)pairs.push([c,d]);
const mats=[];
for(const [c,d] of pairs){
  const M=Array.from({length:8},()=>Array(8).fill(0)),kc=kap([1,c]);
  for(let x=0;x<8;x++){
    const first=mul([1,x],[1,d]);
    const [s,k]=mul(first,kc);
    M[k][x]=s;
  }
  mats.push(M);
}
const flat=M=>M.flat();
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
let skew_failures=0;
for(const M of mats)for(let x=0;x<8;x++)for(let y=0;y<8;y++)if(M[y][x]+M[x][y]!==0)skew_failures++;

function comm(A,B){
  return A.map((row,i)=>row.map((_,j)=>{
    let s=0;for(let k=0;k<8;k++)s+=A[i][k]*B[k][j]-B[i][k]*A[k][j];return s;
  }));
}
const baseRank=rank(mats.map(flat));
let commutators_outside_span=0;
for(let i=0;i<28;i++)for(let j=0;j<28;j++){
  if(rank([...mats.map(flat),flat(comm(mats[i],mats[j]))])!==baseRank)commutators_outside_span++;
}
const result={
  schema:"woit-lisi.l127-so8-source-falsifier.v0.1",
  biproduct_span_rank:baseRank,
  metric_skew_failures:skew_failures,
  commutators_outside_span,
  source_repair_used:false
};
result.pass=
  result.biproduct_span_rank===28 &&
  result.metric_skew_failures===14 &&
  result.commutators_outside_span===336;
console.log(JSON.stringify(result,null,2));
if(!result.pass)process.exitCode=1;
