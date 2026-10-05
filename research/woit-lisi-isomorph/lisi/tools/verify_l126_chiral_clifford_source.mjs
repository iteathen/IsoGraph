// Deterministic L-SSC-126 source-table falsifier.
// Reads the frozen Track-L source instances and checks L05 eqs. (3)-(4)
// without repairing the ordinary-octonion source table.
import fs from "node:fs";

const root="research/woit-lisi-isomorph/lisi";
const cText=fs.readFileSync(root+"/LISI_L05_COMPLEX_SPLIT_COMPLEX_SOURCE_INSTANCE_0_2.isg","utf8");
const xText=fs.readFileSync(root+"/LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg","utf8");

function parseProd(text,prod){
  const re=new RegExp("\\(\\^150010\\s+"+prod+"\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)\\)","g");
  const m=new Map(); let z; while((z=re.exec(text)))m.set(z[1]+","+z[2],Number(z[3])); return m;
}
const Htable=[[[1,0],[1,1],[1,2],[1,3]],[[1,1],[-1,0],[1,3],[-1,2]],[[1,2],[-1,3],[-1,0],[1,1]],[[1,3],[1,2],[-1,1],[-1,0]]];
const defs=[{"name":"C","carrier":214000,"prod":214005,"basis":[214010,214011],"neg":[214013,214014],"sig":[1,1],"source":"research/woit-lisi-isomorph/lisi/LISI_L05_COMPLEX_SPLIT_COMPLEX_SOURCE_INSTANCE_0_2.isg"},{"name":"Cprime","carrier":214100,"prod":214105,"basis":[214110,214111],"neg":[214113,214114],"sig":[1,-1],"source":"research/woit-lisi-isomorph/lisi/LISI_L05_COMPLEX_SPLIT_COMPLEX_SOURCE_INSTANCE_0_2.isg"},{"name":"H","carrier":189200,"basis":[189206,189210,189211,189212],"neg":null,"sig":[1,1,1,1],"source":"research/woit-lisi-isomorph/support/PRIMITIVE_QUATERNION_PRESENTATION_0_1.isg"},{"name":"Hprime","carrier":214200,"prod":214205,"basis":[214210,214211,214212,214213],"neg":[214214,214215,214216,214217],"sig":[1,-1,1,-1],"source":"research/woit-lisi-isomorph/lisi/LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg"},{"name":"O","carrier":214300,"prod":214305,"basis":[214310,214311,214312,214313,214314,214315,214316,214317],"neg":[214318,214319,214320,214321,214322,214323,214324,214325],"sig":[1,1,1,1,1,1,1,1],"source":"research/woit-lisi-isomorph/lisi/LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg"},{"name":"Oprime","carrier":214400,"prod":214405,"basis":[214410,214411,214412,214413,214414,214415,214416,214417],"neg":[214418,214419,214420,214421,214422,214423,214424,214425],"sig":[1,1,1,1,-1,-1,-1,-1],"source":"research/woit-lisi-isomorph/lisi/LISI_L05_SPLIT_QUATERNION_OCTONION_SOURCE_INSTANCES_0_2.isg"}];
function coeff(D,c,a,b){
  if(D.name==="H"){const [sg,k]=Htable[c][a];return k===b?sg*(b===0?1:-1):0;}
  const text=(D.name==="C"||D.name==="Cprime")?cText:xText;
  if(!D.pm)D.pm=parseProd(text,D.prod);
  const out=D.pm.get(D.basis[c]+","+D.basis[a]); if(out===undefined)return 0;
  let k=D.basis.indexOf(out),sg=1; if(k<0){k=D.neg.indexOf(out);sg=-1;}
  return k===b?sg*(b===0?1:-1):0;
}
const results=[];
for(const D of defs){
  const n=D.basis.length; let cyc=0,cliff=0;
  const G=Array.from({length:n},()=>Array.from({length:n},()=>Array(n).fill(0)));
  for(let c=0;c<n;c++)for(let a=0;a<n;a++)for(let b=0;b<n;b++){
    const g=coeff(D,c,a,b);G[c][b][a]=g;
    if(D.sig[b]*g!==D.sig[c]*coeff(D,a,b,c))cyc++;
  }
  const BG=Array.from({length:n},(_,c)=>Array.from({length:n},(_,r)=>Array.from({length:n},(_,k)=>D.sig[c]*G[c][k][r])));
  for(let c=0;c<n;c++)for(let d=0;d<n;d++)for(let r=0;r<n;r++)for(let k=0;k<n;k++){
    let lhs=0;for(let j=0;j<n;j++)lhs+=BG[c][r][j]*G[d][j][k]+BG[d][r][j]*G[c][j][k];
    const rhs=(r===k&&c===d)?2*D.sig[c]:0;
    if(lhs!==rhs)cliff++;
  }
  results.push({name:D.name,cyclic_failures:cyc,clifford_identity_failures:cliff});
}
const pass=results.every(x=>x.name==="O"?(x.cyclic_failures===2&&x.clifford_identity_failures===28):(x.cyclic_failures===0&&x.clifford_identity_failures===0));
console.log(JSON.stringify({results,source_repair_used:false,pass},null,2));
if(!pass)process.exitCode=1;
