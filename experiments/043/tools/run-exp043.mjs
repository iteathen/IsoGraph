import fs from 'node:fs';

const OUT='out/exp043';
fs.mkdirSync(OUT,{recursive:true});

function wordsLen(L){
  const out=[];
  if(L===0)return [[]];
  const w=Array(L);
  function rec(i){
    if(i===L){out.push(w.slice());return;}
    for(let a=0;a<3;a++){
      if(i>0&&w[i-1]===a)continue;
      w[i]=a;
      rec(i+1);
    }
  }
  rec(0);
  return out;
}

function key(w){return w.join('');}

function isSubseq(p,w){
  let i=0;
  for(const x of w){
    if(i<p.length&&p[i]===x)i++;
  }
  return i===p.length;
}

function xorshift(seed){
  let x=seed>>>0;
  return ()=>{
    x^=(x<<13)>>>0;
    x^=x>>>17;
    x^=(x<<5)>>>0;
    x>>>=0;
    return x;
  };
}

function shuffledIndices(n,rng){
  const a=Array.from({length:n},(_,i)=>i);
  for(let i=n-1;i>0;i--){
    const j=rng()%(i+1);
    const t=a[i];a[i]=a[j];a[j]=t;
  }
  return a;
}

const paths=wordsLen(6);
const universe=wordsLen(12);

if(paths.length!==96)throw new Error('unexpected path count');
if(universe.length!==6144)throw new Error('unexpected universe count');

const forbidden=paths.map(()=>[]);
const initialCount=new Uint16Array(universe.length);

for(let p=0;p<paths.length;p++){
  const list=forbidden[p];
  for(let u=0;u<universe.length;u++){
    if(!isSubseq(paths[p],universe[u])){
      list.push(u);
      initialCount[u]++;
    }
  }
}

let uncoveredInitial=0;
for(const c of initialCount)if(c===0)uncoveredInitial++;
if(uncoveredInitial!==0)throw new Error('all candidate paths do not cover threshold universe');

const TRIALS=50000;
const rng=xorshift(0x04312026);
let best=null;
const hist={};

for(let trial=0;trial<TRIALS;trial++){
  const selected=new Uint8Array(paths.length);
  selected.fill(1);
  const counts=new Uint16Array(initialCount);
  let size=paths.length;
  const order=shuffledIndices(paths.length,rng);

  for(const p of order){
    let removable=true;
    for(const u of forbidden[p]){
      if(counts[u]===1){removable=false;break;}
    }
    if(!removable)continue;
    selected[p]=0;
    size--;
    for(const u of forbidden[p])counts[u]--;
  }

  hist[size]=(hist[size]||0)+1;
  if(best===null||size>best.size){
    const ids=[];
    for(let p=0;p<selected.length;p++)if(selected[p])ids.push(p);
    best={size,ids,trial};
  }
}

if(!best)throw new Error('no cover produced');

const bestCounts=new Uint16Array(universe.length);
for(const p of best.ids)for(const u of forbidden[p])bestCounts[u]++;

let uncovered=0;
for(const c of bestCounts)if(c===0)uncovered++;

const privateWitnesses=[];
for(const p of best.ids){
  let privateU=-1;
  for(const u of forbidden[p]){
    if(bestCounts[u]===1){privateU=u;break;}
  }
  privateWitnesses.push({
    path_index:p,
    path:key(paths[p]),
    private_word_index:privateU,
    private_word:privateU>=0?key(universe[privateU]):null
  });
}

const missingPrivate=privateWitnesses.filter(x=>x.private_word_index<0);

function coversSelected(w){
  for(const p of best.ids){
    if(!isSubseq(paths[p],w))return false;
  }
  return true;
}

let firstFull=null;
let firstFullLength=null;
let checkedAbove={};
for(let L=13;L<=17&&firstFull===null;L++){
  const words=wordsLen(L);
  let checked=0;
  for(const w of words){
    checked++;
    if(coversSelected(w)){
      firstFull=w.slice();
      firstFullLength=L;
      break;
    }
  }
  checkedAbove[L]=checked;
}

let deletionFailures=0;
for(const x of privateWitnesses){
  if(x.private_word_index<0){deletionFailures++;continue;}
  const w=universe[x.private_word_index];
  for(const p of best.ids){
    if(p===x.path_index)continue;
    if(!isSubseq(paths[p],w)){deletionFailures++;break;}
  }
  if(isSubseq(paths[x.path_index],w))deletionFailures++;
}

const exactWidth=
  uncovered===0 &&
  missingPrivate.length===0 &&
  deletionFailures===0
    ? best.size
    : null;

const result={
  experiment:'043',
  disposition:exactWidth!==null?'PASS':'FAIL',
  alphabet_size:3,
  candidate_path_length:6,
  candidate_path_count:paths.length,
  threshold_length:12,
  threshold_universe_size:universe.length,
  randomized_trials:TRIALS,
  cover_size_histogram:hist,
  best_trial:best.trial,
  best_cover_size:best.size,
  selected_paths:best.ids.map(p=>key(paths[p])),
  threshold_uncovered_words:uncovered,
  private_witness_count:privateWitnesses.length,
  missing_private_witnesses:missingPrivate.length,
  deletion_witness_verification_failures:deletionFailures,
  private_witnesses:privateWitnesses,
  first_full_solution_length:firstFullLength,
  first_full_solution:firstFull?key(firstFull):null,
  above_threshold_words_checked:checkedAbove,
  exact_witness_width:exactWidth,
  total_glycan_non_target_nodes:best.ids.length*6
};

fs.writeFileSync(OUT+'/RESULT.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({
  experiment:result.experiment,
  disposition:result.disposition,
  randomized_trials:result.randomized_trials,
  best_cover_size:result.best_cover_size,
  threshold_uncovered_words:result.threshold_uncovered_words,
  missing_private_witnesses:result.missing_private_witnesses,
  deletion_witness_verification_failures:result.deletion_witness_verification_failures,
  first_full_solution_length:result.first_full_solution_length,
  first_full_solution:result.first_full_solution,
  exact_witness_width:result.exact_witness_width,
  total_glycan_non_target_nodes:result.total_glycan_non_target_nodes,
  histogram:result.cover_size_histogram
},null,2));

if(result.disposition!=='PASS')process.exitCode=1;
