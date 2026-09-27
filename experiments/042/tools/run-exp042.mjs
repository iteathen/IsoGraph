import fs from 'node:fs';

const OUT='out/exp042';
fs.mkdirSync(OUT,{recursive:true});

const pathStrings=[
  '10210','20120','01202','01020','21202','02101',
  '10120','21020','21021','01010','01012','02021',
  '20121','02102','20210','12010','20202','01201',
  '02012','12101','12012','10102','10212','10201'
];
const paths=pathStrings.map(s=>[...s].map(Number));

function isRunCompressed(w){
  for(let i=1;i<w.length;i++) if(w[i]===w[i-1]) return false;
  return true;
}
function isSubseq(p,t){
  let i=0;
  for(const x of t){
    if(i<p.length && p[i]===x) i++;
  }
  return i===p.length;
}
function* wordsLen(L){
  if(L===0){yield [];return;}
  const w=Array(L);
  function* rec(i){
    if(i===L){yield w.slice();return;}
    for(let a=0;a<3;a++){
      if(i>0 && w[i-1]===a) continue;
      w[i]=a;
      yield* rec(i+1);
    }
  }
  yield* rec(0);
}
function coversAll(t,skip=-1){
  for(let i=0;i<paths.length;i++){
    if(i===skip) continue;
    if(!isSubseq(paths[i],t)) return false;
  }
  return true;
}

const duplicatePaths=new Set(pathStrings).size!==pathStrings.length;
const nonCompressed=pathStrings.filter(s=>!isRunCompressed([...s].map(Number)));

let fullShortWitness=null;
let fullShortLength=null;
let enumeratedThrough10=0;
const countsByLength={};
for(let L=0;L<=10;L++){
  let c=0;
  for(const w of wordsLen(L)){
    c++; enumeratedThrough10++;
    if(fullShortWitness===null && coversAll(w)){
      fullShortWitness=w.slice();
      fullShortLength=L;
    }
  }
  countsByLength[L]=c;
}

const deletionWitnesses=[];
for(let drop=0;drop<paths.length;drop++){
  let witness=null;
  for(const w of wordsLen(10)){
    if(coversAll(w,drop)){witness=w.slice();break;}
  }
  deletionWitnesses.push({drop,path:pathStrings[drop],witness});
}

let full11=null;
let length11Enumerated=0;
let full11Count=0;
for(const w of wordsLen(11)){
  length11Enumerated++;
  if(coversAll(w)){
    full11Count++;
    if(full11===null) full11=w.slice();
  }
}

const missingDeletion=deletionWitnesses.filter(x=>x.witness===null);
const pass=
  !duplicatePaths &&
  nonCompressed.length===0 &&
  fullShortWitness===null &&
  missingDeletion.length===0 &&
  full11!==null;

const result={
  experiment:'042',
  disposition:pass?'PASS':'FAIL',
  alphabet_size:3,
  family_size:paths.length,
  path_length_set:[...new Set(paths.map(p=>p.length))],
  total_glycan_non_target_nodes:paths.reduce((a,p)=>a+p.length,0),
  duplicate_paths:duplicatePaths,
  non_run_compressed_paths:nonCompressed,
  words_enumerated_through_10:enumeratedThrough10,
  words_by_length:countsByLength,
  full_solution_at_length_le_10:fullShortWitness,
  full_solution_short_length:fullShortLength,
  deletion_witnesses:deletionWitnesses,
  missing_deletion_witnesses:missingDeletion.length,
  length11_words_enumerated:length11Enumerated,
  full_length11_solution_count:full11Count,
  first_full_length11_solution:full11,
  exact_full_opt:pass?11:null,
  exact_witness_width:pass?24:null
};

fs.writeFileSync(OUT+'/RESULT.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({
  experiment:result.experiment,
  disposition:result.disposition,
  family_size:result.family_size,
  total_nodes:result.total_glycan_non_target_nodes,
  words_enumerated_through_10:result.words_enumerated_through_10,
  full_solution_at_length_le_10:result.full_solution_at_length_le_10,
  missing_deletion_witnesses:result.missing_deletion_witnesses,
  length11_words_enumerated:result.length11_words_enumerated,
  full_length11_solution_count:result.full_length11_solution_count,
  first_full_length11_solution:result.first_full_length11_solution,
  exact_full_opt:result.exact_full_opt,
  exact_witness_width:result.exact_witness_width
},null,2));
if(!pass) process.exitCode=1;
