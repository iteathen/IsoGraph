import fs from 'node:fs';
import crypto from 'node:crypto';

const root='research/woit-lisi-isomorph/lisi';
const ssc=JSON.parse(fs.readFileSync(root+'/SOURCE_SEMANTIC_CENSUS_0_1.json','utf8'));
const manifest=JSON.parse(fs.readFileSync(root+'/LISI_NATIVE_COMPILATION_MANIFEST_0_1.json','utf8'));

function canonical(v){
  if(Array.isArray(v)) return '['+v.map(canonical).join(',')+']';
  if(v&&typeof v==='object') return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';
  return JSON.stringify(v);
}
const H=v=>crypto.createHash('sha256').update(canonical(v)).digest('hex');

const scope={
  id:'L_FULL_SOURCE_SCOPE_0_1',
  declared_census_ids:ssc.items.map(x=>x.id),
  boundary_refs:[
    '../SOURCE_CORPUS_FREEZE_0_2.md',
    'SOURCE_SEMANTIC_CENSUS_0_1.json',
    'LISI_SSC_PREFREEZE_CONSERVATION_0_1.md'
  ]
};
const governing_authority={
  core:'0.17-0.21 cumulative',
  qu:'0.1',
  nei:'0.4',
  dts:'0.1',
  discovery:'0.1-0.10',
  experimental_inquiry:'0.1',
  campaign:'Lisi full independent treatment',
  cross_author_semantics:false
};
const inference_profile={
  id:'L_PRE_DP_NATIVE_COMPILATION_0_1',
  stage:'PRE_PRIMITIVE_CLOSURE',
  recursive_ia:false,
  cross_author_semantics:false,
  source_census_frozen:true
};
const census=ssc.items.map(x=>({
  id:x.id,
  kind:x.kind || 'SOURCE_SEMANTIC_OBLIGATION',
  source_provenance:x.source_provenance,
  scope_ref:scope.id,
  semantic_body_ref:'SOURCE_SEMANTIC_CENSUS_0_1.json#'+x.id
}));
const manifestById=new Map(manifest.items.map(x=>[x.census_id,x]));
const nodes=census.map((c,i)=>{
  const m=manifestById.get(c.id);
  if(!m) throw new Error('manifest missing '+c.id);
  return {
    id:'L-BODY-'+String(i+1).padStart(3,'0'),
    native_atom:m.native_body_root_atom,
    classification:'UNEXPANDED_SOURCE_BODY',
    authoritative:true,
    authority_owner:'L_SOURCE_RENDERING',
    children:[],
    source_census_ids:[c.id],
    closure_mode:'INCOMPLETE_UNEXPANDED',
    reconstruction_path:[],
    unexpanded_dependencies:['PRIMITIVE_EXPANSION_REQUIRED']
  };
});
const dispositions=census.map((c,i)=>({
  census_id:c.id,
  closure_mode:'INCOMPLETE_UNEXPANDED',
  body_roots:['L-BODY-'+String(i+1).padStart(3,'0')],
  support_roots:[],
  dependency_roots:[],
  reconstruction_path:[],
  evidence_dispositions:[ssc.items[i].source_disposition_hint]
}));
const censusCanonical=[...census].sort((a,b)=>String(a.id).localeCompare(String(b.id)));
const kernel=[...nodes].filter(n=>n.authoritative).sort((a,b)=>String(a.id).localeCompare(String(b.id)));
const ledger={
  version:'core-0.21-ledger-0.2',
  frozen:{
    qualification_target_id:'LISI_FULL_RENDERING_0_1',
    source_interpretation_sha256:H({
      corpus:'../SOURCE_CORPUS_FREEZE_0_2.md',
      conservation:'LISI_SSC_PREFREEZE_CONSERVATION_0_1.md',
      frozen_ssc:'SOURCE_SEMANTIC_CENSUS_0_1.json'
    }),
    source_semantic_census_sha256:H(censusCanonical),
    semantic_scope_sha256:H(scope),
    primitive_kernel_sha256:H(kernel),
    qu_state_sha256:'NONE',
    governing_authority_sha256:H(governing_authority),
    inference_profile_sha256:H(inference_profile)
  },
  scope,
  governing_authority,
  inference_profile,
  census,
  nodes,
  dispositions,
  scope_revision:null,
  ia_fixed_point:null,
  diagnostic:{
    expected_strict_closure:false,
    reason:'191 frozen source bodies are authoritatively routed but remain INCOMPLETE_UNEXPANDED at native-compilation revision 0.1',
    native_manifest:'LISI_NATIVE_COMPILATION_MANIFEST_0_1.json'
  }
};
fs.writeFileSync(root+'/CORE021_CLOSURE_LEDGER_0_1.json',JSON.stringify(ledger,null,2)+'\n');
console.log(JSON.stringify({census:census.length,nodes:nodes.length,dispositions:dispositions.length,strict_closure:false},null,2));
