import fs from 'node:fs';

const ledger=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/CORE021_CLOSURE_LEDGER_0_34.json','utf8'));
const w134=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W134_EUCLIDEAN_SU2_ROLE_PSEUDOREAL_CLOSURE_PACKET_0_1.json','utf8'));
const w009=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W009_EUCLIDEAN_LEFT_SPINOR_INTERNAL_SU2_CLOSURE_PACKET_0_1.json','utf8'));

const disp=new Map(ledger.dispositions.map(d=>[d.census_id,d.closure_mode]));
for(const id of ['W-SSC-134','W-SSC-009']) if(disp.get(id)!=='CLOSED_SCHEMA') throw new Error(id+' is not closed in ledger 0.34');

if(w134.reconstruction.su2_R_role!==205131) throw new Error('W134 SU2_R role drift');
if(w134.reconstruction.su2_R_vector_action!==205121) throw new Error('W134 SU2_R action drift');
if(w134.reconstruction.su2_L_role!==205130) throw new Error('W134 SU2_L role drift');
if(w134.reconstruction.su2_L_spacetime_action!=='TRIVIAL') throw new Error('W134 spacetime-trivial guard lost');
if(w009.reconstruction.left_spinor_group_representation!==949101) throw new Error('W009 internal action drift');

console.log(JSON.stringify({
 census_id:'W-SSC-013',
 result:'COMPOSITIONAL_DEPENDENCY_CLOSED',
 supports:['W-SSC-134','W-SSC-009'],
 geometric_role:205131,
 internal_role:205130
},null,2));
