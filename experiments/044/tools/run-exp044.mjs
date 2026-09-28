import fs from 'node:fs';

const OUT='out/exp044';
fs.mkdirSync(OUT,{recursive:true});

const pathStrings=[
'0101202','0101210','0102101','0102120','0120101','0120120','0120201','0120210',
'0201201','0201212','0210121','0210202','0210210','0212012','0212021','0212120',
'1010210','1010212','1012020','1020120','1020121','1020201','1020212','1021020',
'1021021','1021210','1021212','1201012','1201021','1201201','1201210','1202012',
'1202102','1210101','1210102','1212021','2010120','2012010','2012012','2012101',
'2012102','2020121','2021010','2021021','2021201','2021202','2101012','2101021',
'2101202','2102010','2102102','2102121','2120120','2121212'
];

const paths=pathStrings.map(s=>[...s].map(Number));

function* wordsLen(L){
  if(L===0){yield [];return;}
  const w=Array(L);
  function* rec(i){
    if(i===L){yield w.slice();return;}
    for(let a=0;a<3;a++){
      if(i>0&&w[i-1]===a)continue;
      w[i]=a;
      yield* rec(i+1);
    }
  }
  yield* rec(0);
}

function isSubseq(p,w){
  let i=0;
  for(const x of w) if(i<p.length&&p[i]===x)i++;
  return i===p.length;
}
function key(w){return w.join('');}

const duplicatePaths=new Set(pathStrings).size!==pathStrings.length;
const nonRunCompressed=pathStrings.filter(s=>{
  for(let i=1;i<s.length;i++)if(s[i]===s[i-1])return true;
  return false;
});

let fullShort=null;
let through14=0;
const words14=[];
for(let L=0;L<=14;L++){
  for(const w of wordsLen(L)){
    through14++;
    if(L===14)words14.push(w);
    if(fullShort===null&&paths.every(p=>isSubseq(p,w)))fullShort=w.slice();
  }
}

const failCount=new Uint16Array(words14.length);
const failedBy=Array.from({length:paths.length},()=>[]);
for(let p=0;p<paths.length;p++){
  for(let u=0;u<words14.length;u++){
    if(!isSubseq(paths[p],words14[u])){
      failCount[u]++;
      failedBy[p].push(u);
    }
  }
}

const deletionWitnesses=[];
for(let p=0;p<paths.length;p++){
  let u=-1;
  for(const x of failedBy[p]) if(failCount[x]===1){u=x;break;}
  deletionWitnesses.push({
    drop:p,
    path:pathStrings[p],
    witness_index:u,
    witness:u>=0?key(words14[u]):null
  });
}
const missing=deletionWitnesses.filter(x=>x.witness_index<0);

let full15=null, full15Count=0, checked15=0;
for(const w of wordsLen(15)){
  checked15++;
  if(paths.every(p=>isSubseq(p,w))){
    full15Count++;
    if(full15===null)full15=w.slice();
  }
}

const pass=
  !duplicatePaths &&
  nonRunCompressed.length===0 &&
  fullShort===null &&
  missing.length===0 &&
  full15!==null;

const result={
  experiment:'044',
  disposition:pass?'PASS':'FAIL',
  alphabet_size:3,
  family_size:paths.length,
  path_length:7,
  threshold_length:14,
  threshold_universe_size:words14.length,
  words_enumerated_through_14:through14,
  duplicate_paths:duplicatePaths,
  non_run_compressed_paths:nonRunCompressed,
  full_solution_length_le_14:fullShort?key(fullShort):null,
  private_witness_count:deletionWitnesses.length-missing.length,
  missing_private_witnesses:missing.length,
  deletion_witnesses:deletionWitnesses,
  length15_words_enumerated:checked15,
  full_length15_solution_count:full15Count,
  first_full_length15_solution:full15?key(full15):null,
  exact_optimum:pass?15:null,
  exact_witness_width:pass?paths.length:null,
  total_glycan_non_target_nodes:paths.length*7
};

fs.writeFileSync(OUT+'/RESULT.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({
  experiment:result.experiment,
  disposition:result.disposition,
  family_size:result.family_size,
  threshold_universe_size:result.threshold_universe_size,
  full_solution_length_le_14:result.full_solution_length_le_14,
  private_witness_count:result.private_witness_count,
  missing_private_witnesses:result.missing_private_witnesses,
  full_length15_solution_count:result.full_length15_solution_count,
  first_full_length15_solution:result.first_full_length15_solution,
  exact_optimum:result.exact_optimum,
  exact_witness_width:result.exact_witness_width,
  total_glycan_non_target_nodes:result.total_glycan_non_target_nodes
},null,2));
if(!pass)process.exitCode=1;
