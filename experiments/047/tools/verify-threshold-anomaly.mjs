import fs from 'node:fs';

const OUT='out/exp047-anomaly';
fs.mkdirSync(OUT,{recursive:true});

const A=3;
const PL=10;

function gen(length){
  const count=A*(2**(length-1));
  const out=new Uint8Array(count*length);
  const cur=new Uint8Array(length);
  let row=0;
  function rec(pos,prev){
    if(pos===length){out.set(cur,row*length);row++;return;}
    for(let x=0;x<A;x++){
      if(pos&&x===prev)continue;
      cur[pos]=x;rec(pos+1,x);
    }
  }
  rec(0,-1);
  return out;
}

function isSubseq(p,po,plen,w,wo,wlen){
  let i=0;
  for(let j=0;j<wlen&&i<plen;j++) if(p[po+i]===w[wo+j]) i++;
  return i===plen;
}

function str(flat,row,len){
  let s=''; const o=row*len;
  for(let i=0;i<len;i++)s+=flat[o+i];
  return s;
}

const paths=gen(PL);
const P=paths.length/PL;

function universalAt(wFlat,row,WL){
  const wo=row*WL;
  for(let p=0;p<P;p++){
    if(!isSubseq(paths,p*PL,PL,wFlat,wo,WL)) return false;
  }
  return true;
}

function scan(WL,limitExamples=16){
  const words=gen(WL), U=words.length/WL;
  let universal=0;
  const examples=[];
  for(let u=0;u<U;u++){
    if(universalAt(words,u,WL)){
      universal++;
      if(examples.length<limitExamples) examples.push({index:u,word:str(words,u,WL)});
    }
  }
  return {length:WL,word_count:U,universal_count:universal,examples};
}

const t0=process.hrtime.bigint();
const l19=scan(19);
const t1=process.hrtime.bigint();
const l20=scan(20);
const t2=process.hrtime.bigint();

const observedIndex=69905;
const words20=gen(20);
const observed={
  index:observedIndex,
  word:str(words20,observedIndex,20),
  independently_universal:universalAt(words20,observedIndex,20)
};

const result={
  experiment:'047-anomaly-verifier',
  implementation_language:'Node.js',
  node_version:process.version,
  path_length:PL,
  path_count:P,
  length19:l19,
  length20:l20,
  observed,
  length19_ms:Number(t1-t0)/1e6,
  length20_ms:Number(t2-t1)/1e6,
  total_ms:Number(t2-t0)/1e6,
  disposition:(l19.universal_count===0 && l20.universal_count>0 && observed.independently_universal)?'CONFIRMED':'MISMATCH'
};

fs.writeFileSync(OUT+'/RESULT.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(result.disposition!=='CONFIRMED')process.exitCode=1;
