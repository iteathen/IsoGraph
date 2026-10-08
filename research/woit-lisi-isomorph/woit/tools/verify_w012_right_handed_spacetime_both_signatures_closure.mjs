import fs from 'node:fs';

const ledger=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/CORE021_CLOSURE_LEDGER_0_34.json','utf8'));
const p=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W012_RIGHT_HANDED_SPACETIME_BOTH_SIGNATURES_CLOSURE_PACKET_0_1.json','utf8'));
const w131=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W131_RIGHT_HANDED_SPACETIME_CLOSURE_PACKET_0_3.json','utf8'));
const w135=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W135_RIGHT_SPINOR_TENSOR_EUCLIDEAN_SPLIT_CLOSURE_PACKET_0_1.json','utf8'));

const disp=new Map(ledger.dispositions.map(d=>[d.census_id,d.closure_mode]));
for(const id of ['W-SSC-131','W-SSC-135']) if(disp.get(id)!=='CLOSED_SCHEMA') throw new Error(id+' is not closed in ledger 0.34');

if(w131.reconstruction.complex_matrix_carrier!==204110) throw new Error('W131 carrier drift');
if(w131.reconstruction.right_handed_complex_action!==205120) throw new Error('W131 action drift');
if(w135.reconstruction.tensor_target_matrix_carrier!==204110) throw new Error('W135 tensor target drift');
if(w135.reconstruction.euclidean_real_carrier!==205100) throw new Error('W135 Euclidean carrier drift');
if(w135.reconstruction.euclidean_embedding_into_tensor_target!==205111) throw new Error('W135 embedding drift');

console.log(JSON.stringify({
 census_id:'W-SSC-012',
 result:'COMPOSITIONAL_DEPENDENCY_CLOSED',
 supports:['W-SSC-131','W-SSC-135'],
 shared_complex_carrier:204110
},null,2));
