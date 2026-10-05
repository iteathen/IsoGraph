import fs from "node:fs";

const root="research/woit-lisi-isomorph/lisi";
const source=fs.readFileSync(root+"/LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg","utf8");
const native=fs.readFileSync(root+"/LISI_L05_OCTONION_TRIALITY_MATRIX_SOURCE_INSTANCE_0_1.isg","utf8");

function parseProd(text,prod){
  const re=new RegExp("\\(\\^150010\\s+"+prod+"\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)\\)","g");
  const m=new Map(); let z;
  while((z=re.exec(text)))m.set(z[1]+","+z[2],Number(z[3]));
  return m;
}
function parseRel(text,rel,arity){
  const parts=Array.from({length:arity},()=>"(\\d+)").join("\\s+");
  const re=new RegExp("\\(\\^150010\\s+"+rel+"\\s+"+parts+"\\)","g");
  const out=[];let z;while((z=re.exec(text)))out.push(z.slice(1).map(Number));return out;
}
function mm(A,B){return A.map(r=>B[0].map((_,j)=>r.reduce((s,v,k)=>s+v*B[k][j],0)));}
function tr(A){return A[0].map((_,j)=>A.map(r=>r[j]));}
const pairs=[];for(let a=0;a<8;a++)for(let b=a+1;b<8;b++)pairs.push([a,b]);

const defs=[
 {name:"O",prod:214305,basis:[214310,214311,214312,214313,214314,214315,214316,214317],neg:[214318,214319,214320,214321,214322,214323,214324,214325],sig:[1,1,1,1,1,1,1,1],overall:-1,coeffRel:240000,pairRel:240054,blockRel:240052,gammaBase:240100,blockBase:240060},
 {name:"Oprime",prod:214405,basis:[214410,214411,214412,214413,214414,214415,214416,214417],neg:[214418,214419,214420,214421,214422,214423,214424,214425],sig:[1,1,1,1,-1,-1,-1,-1],overall:1,coeffRel:240001,pairRel:240055,blockRel:240053,gammaBase:240200,blockBase:240070}
];

function coeff(D,c,a,b){
  if(!D.pm)D.pm=parseProd(source,D.prod);
  const out=D.pm.get(D.basis[c]+","+D.basis[a]);
  let k=D.basis.indexOf(out),sg=1;
  if(k<0){k=D.neg.indexOf(out);sg=-1;}
  return k===b?sg*(b===0?1:-1):0;
}
const scalarToNum=new Map([[189105,0],[240011,1],[240012,-1]]);
const results=[];

for(const D of defs){
  const G=Array.from({length:8},()=>Array.from({length:8},()=>Array(8).fill(0)));
  for(let c=0;c<8;c++)for(let r=0;r<8;r++)for(let a=0;a<8;a++)G[c][r][a]=coeff(D,c,a,r);

  const expected=Array.from({length:28},()=>Array(28).fill(0));
  for(let i=0;i<28;i++){
    const [a,b]=pairs[i];
    for(let j=0;j<28;j++){
      const [c,d]=pairs[j],M=mm(tr(G[c]),G[d]);
      expected[i][j]=D.overall*D.sig[a]*D.sig[d]*M[a][b];
    }
  }

  const actual=Array.from({length:28},()=>Array(28).fill(null));
  for(const [gi,gj,s] of parseRel(native,D.coeffRel,3)){
    const i=gi-D.gammaBase,j=gj-D.gammaBase;
    if(i>=0&&i<28&&j>=0&&j<28)actual[i][j]=scalarToNum.get(s);
  }
  let coefficient_mismatches=0;
  for(let i=0;i<28;i++)for(let j=0;j<28;j++)if(actual[i][j]!==expected[i][j])coefficient_mismatches++;

  const NN=mm(expected,tr(expected)),N3=mm(mm(expected,expected),expected);
  let orthogonality_failures=0,order3_failures=0;
  for(let i=0;i<28;i++)for(let j=0;j<28;j++){
    if(NN[i][j]!== (i===j?4:0))orthogonality_failures++;
    if(N3[i][j]!== (i===j?8:0))order3_failures++;
  }

  const adj=Array.from({length:28},()=>new Set());
  for(let i=0;i<28;i++)for(let j=0;j<28;j++)if(expected[i][j]){adj[i].add(j);adj[j].add(i);}
  const seen=new Set(),blocks=[];
  for(let i=0;i<28;i++)if(!seen.has(i)){
    const st=[i],b=[];seen.add(i);
    while(st.length){const u=st.pop();b.push(u);for(const v of adj[u])if(!seen.has(v)){seen.add(v);st.push(v);}}
    blocks.push(b.sort((a,b)=>a-b));
  }

  const nativeBlocks=new Map();
  for(const [block,g] of parseRel(native,D.blockRel,2)){
    if(!nativeBlocks.has(block))nativeBlocks.set(block,[]);
    nativeBlocks.get(block).push(g-D.gammaBase);
  }
  const gotBlocks=[...nativeBlocks.values()].map(b=>b.sort((a,b)=>a-b)).sort((a,b)=>a[0]-b[0]);
  const expBlocks=blocks.map(b=>[...b]).sort((a,b)=>a[0]-b[0]);
  const block_match=JSON.stringify(gotBlocks)===JSON.stringify(expBlocks);
  const support_counts=[...new Set(expected.map(r=>r.filter(x=>x!==0).length))];

  let split_signature_pattern_failures=0;
  if(D.name==="Oprime"){
    for(const b of blocks){
      const sigs=b.map(i=>{const [a,c]=pairs[i],sa=D.sig[a],sb=D.sig[c];return sa===sb?(sa===1?"ss":"tt"):"st";});
      const ss=sigs.filter(x=>x==="ss").length,tt=sigs.filter(x=>x==="tt").length,st=sigs.filter(x=>x==="st").length;
      if(!((ss===2&&tt===2&&st===0)||(st===4)))split_signature_pattern_failures++;
    }
  }

  results.push({
    name:D.name,
    coefficient_facts:parseRel(native,D.coeffRel,3).length,
    coefficient_mismatches,
    support_counts,
    block_count:blocks.length,
    block_sizes:[...new Set(blocks.map(b=>b.length))],
    native_block_match:block_match,
    orthogonality_failures,
    order3_failures,
    split_signature_pattern_failures
  });
}

const schemaCalls={
  dimension28:(native.match(/\(\^150010\s+225001\b/g)||[]).length,
  signedHalfBlocks:(native.match(/\(\^150010\s+239001\b/g)||[]).length,
  splitSignatureBlocks:(native.match(/\(\^150010\s+239002\b/g)||[]).length
};

const pass=
  results[0].coefficient_mismatches===0 &&
  results[0].support_counts.length===1 && results[0].support_counts[0]===4 &&
  results[0].block_count===7 && results[0].block_sizes.length===1 && results[0].block_sizes[0]===4 &&
  results[0].native_block_match &&
  results[0].orthogonality_failures===36 &&
  results[0].order3_failures===100 &&
  results[1].coefficient_mismatches===0 &&
  results[1].support_counts.length===1 && results[1].support_counts[0]===4 &&
  results[1].block_count===7 && results[1].block_sizes.length===1 && results[1].block_sizes[0]===4 &&
  results[1].native_block_match &&
  results[1].orthogonality_failures===0 &&
  results[1].order3_failures===0 &&
  results[1].split_signature_pattern_failures===0 &&
  schemaCalls.dimension28===2 &&
  schemaCalls.signedHalfBlocks===14 &&
  schemaCalls.splitSignatureBlocks===7;

const result={
  schema:"woit-lisi.l136-triality-matrix-falsifier.v0.1",
  source_repair_used:false,
  lowered_index_rule:"split coefficients include n_aa on the lower input spinor index and n_dd on raised Gamma^d",
  results,
  schemaCalls,
  expected_compact_O_disposition:"INCONSISTENT_SOURCE",
  pass
};
console.log(JSON.stringify(result,null,2));
if(!pass)process.exitCode=1;
