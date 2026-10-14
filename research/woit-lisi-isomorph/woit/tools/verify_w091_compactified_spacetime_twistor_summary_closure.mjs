import fs from 'node:fs';

const packet=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W091_COMPACTIFIED_SPACETIME_TWISTOR_SUMMARY_CLOSURE_PACKET_0_1.json','utf8'));
const w047=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W047_GRASSMANNIAN_BUNDLE_KLEIN_CLOSURE_PACKET_0_2.json','utf8'));
const w023=JSON.parse(fs.readFileSync('research/woit-lisi-isomorph/woit/W023_TWISTOR_P1_CLOSURE_PACKET_0_2.json','utf8'));

for(const [name,p] of [['W047',w047],['W023',w023]]){
  if(!String(p.status).includes('REVALIDATED') && !String(p.status).includes('CLOSED')){
    throw new Error(name+' support is not current/closed: '+p.status);
  }
}
if(w047.reconstruction.twistor_vector_space!==202100) throw new Error('T carrier drift');
if(w047.reconstruction.grassmannian_two_plane_carrier!==990100) throw new Error('Gr carrier drift');
if(w047.reconstruction.reference_right_spinor_plane!==990110) throw new Error('reference S_R plane drift');
if(w023.reconstruction.projective_twistor_carrier!==202113) throw new Error('PT carrier drift');
if(w023.reconstruction.projection!==202126) throw new Error('twistor projection drift');

console.log(JSON.stringify({
  census_id:'W-SSC-091',
  result:'COMPOSITIONAL_DEPENDENCY_CLOSED',
  supports:[
    'W047_GRASSMANNIAN_BUNDLE_KLEIN_CLOSURE_PACKET_0_2.json',
    'W023_TWISTOR_P1_CLOSURE_PACKET_0_2.json'
  ],
  exact_roles:{
    T:202100,
    Gr2T:990100,
    reference_right_plane:990110,
    PT:202113,
    projection:202126
  }
},null,2));
