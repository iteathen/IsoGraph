#!/usr/bin/env node
'use strict';
// Same-agent frozen source-candidate MECHANICAL preflight, not an independent cold audit or theory qualification.
const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const gitBlob=p=>{const b=fs.readFileSync(p);return crypto.createHash('sha1').update(Buffer.concat([Buffer.from('blob '+b.length+String.fromCharCode(0)),b])).digest('hex');};
const ROOT="experiments/062/W_G1_W01_EINSTEIN_WEAK_SOURCE_FIRST_CANDIDATES_0_1.json";
const SOURCE={ssc:"research/woit-lisi-isomorph/woit/SOURCE_SEMANTIC_CENSUS_0_70.json",source_inverse:"experiments/062/W_G0_NINE_CURRENT_SOURCE_FIRST_INVENTORY_0_1.json",current_G0:"experiments/062/W_G0_CURRENT_AUTHOR_SOURCE_STAGE_GATE_0_2.json",qualified_G1:"experiments/062/W_G1_CURRENT_AUTHOR_SOURCE_LOCAL_CONVERGENCE_STAGE_0_8.json"};
const SHAS={ssc:'f13075a1e2b039bab66e738cc992e121cd6c9947',source_inverse:'6a959eabe8803770bc8e9851e288de6535821477',current_G0:'e3848f4025a733d33b8b8b3411fa779e8b0a5b9a',qualified_G1:'8dced9390509bbb18e22a9327c8acf1d6013c23c'};
const CANDIDATE_BLOB='b4785401d186c6f348eb075f9dd35996ada57f15';
for(const [key,file] of Object.entries(SOURCE))assert.equal(gitBlob(file),SHAS[key],'frozen authority '+key);
assert.equal(gitBlob(ROOT),CANDIDATE_BLOB,'exact same-author candidate version');
const S=read(SOURCE.ssc),I=read(SOURCE.source_inverse),G=read(SOURCE.current_G0),T=read(SOURCE.qualified_G1),C=read(ROOT);
const fixed=[
  [
    {
      "id": "W-SSC-031-G1-W01-EW-1",
      "typed": "W01-031-EINSTEIN-01",
      "lines": [
        205,
        205
      ],
      "op": "TORSION_FREE_EINSTEIN_SCOPE",
      "argument": "omega spin connection, Riemannian four-geometry",
      "result": "torsion-free scope antecedent",
      "deps": [],
      "guard": "No statement for arbitrary torsionful omega"
    },
    {
      "id": "W-SSC-031-G1-W01-EW-2",
      "typed": "W01-031-EINSTEIN-01",
      "lines": [
        205,
        207
      ],
      "op": "VACUUM_EINSTEIN_MINUS_RIGHT_ZERO",
      "argument": "Omega_(-,R)(omega), right-chiral/Hodge-minus",
      "result": "Omega_(-,R)(omega)=0",
      "deps": [
        "TORSION_FREE_EINSTEIN_SCOPE"
      ],
      "guard": "Einstein criterion only under printed torsion-free premise"
    },
    {
      "id": "W-SSC-031-G1-W01-EW-3",
      "typed": "W01-031-EINSTEIN-02",
      "lines": [
        209,
        210
      ],
      "op": "CONSEQUENT_PLUS_LEFT_ZERO",
      "argument": "Omega_(+,L)(omega), left-chiral/Hodge-plus",
      "result": "Omega_(+,L)(omega)=0",
      "deps": [
        "VACUUM_EINSTEIN_MINUS_RIGHT_ZERO",
        "TORSION_FREE_EINSTEIN_SCOPE"
      ],
      "guard": "Conditional implication, not independent block equality"
    },
    {
      "id": "W-SSC-031-G1-W01-EW-4",
      "typed": "W01-031-HALFFLAT-03",
      "lines": [
        211,
        211
      ],
      "op": "DISTINCT_MINUS_LEFT_HALF_FLAT",
      "argument": "Omega_(-,L), left-chiral/Hodge-minus",
      "result": "self-dual or half-flat solutions if Omega_(-,L)=0",
      "deps": [],
      "guard": "Not interchangeable with Einstein Omega_(-,R) condition"
    },
    {
      "id": "W-SSC-031-G1-W01-EW-5",
      "typed": "W01-031-CHIRAL-04",
      "lines": [
        211,
        211
      ],
      "op": "CHIRAL_RIGHT_CURVATURE_REPLACEMENT",
      "argument": "Palatini full curvature Omega(omega), right Omega_R",
      "result": "proposed Omega -> Omega_R right chiral Palatini action",
      "deps": [],
      "guard": "Not complete quantized gravity dynamics"
    },
    {
      "id": "W-SSC-031-G1-W01-EW-6",
      "typed": "W01-031-CHIRAL-04",
      "lines": [
        212,
        212
      ],
      "op": "RIGHT_CONNECTION_VARIATION",
      "argument": "omega_R, right su(2) connection",
      "result": "omega_R determined as right component of torsion-free spin connection",
      "deps": [
        "CHIRAL_RIGHT_CURVATURE_REPLACEMENT"
      ],
      "guard": "No independent determination of omega_L"
    },
    {
      "id": "W-SSC-031-G1-W01-EW-7",
      "typed": "W01-031-CHIRAL-04",
      "lines": [
        212,
        212
      ],
      "op": "LEFT_CONNECTION_CURVATURE_ABSENCE",
      "argument": "omega_L, Omega_L(omega_L)",
      "result": "omitted from right chiral action",
      "deps": [
        "CHIRAL_RIGHT_CURVATURE_REPLACEMENT"
      ],
      "guard": "Omission is only from the chiral formulation"
    },
    {
      "id": "W-SSC-031-G1-W01-EW-8",
      "typed": "W01-031-CHIRAL-04",
      "lines": [
        212,
        212
      ],
      "op": "LEFT_CONNECTION_FREEDOM_IF_TORSION",
      "argument": "omega_L and torsion-permitted side condition",
      "result": "omega_L can be arbitrary only if torsion allowed",
      "deps": [
        "LEFT_CONNECTION_CURVATURE_ABSENCE"
      ],
      "guard": "Torsion-free fixes left connection"
    }
  ],
  [
    {
      "id": "W-SSC-032-G1-W01-EW-1",
      "typed": "W01-SEC32-EW-01",
      "lines": [
        219,
        219
      ],
      "op": "GRAVITY_THETA_RIGHT_CONNECTION",
      "argument": "theta R4-valued form, omega_R su(2)_R",
      "result": "proposed gravity-side pair",
      "deps": [],
      "guard": "Author source role, not full physical proof"
    },
    {
      "id": "W-SSC-032-G1-W01-EW-2",
      "typed": "W01-SEC32-EW-01",
      "lines": [
        219,
        219
      ],
      "op": "WEAK_LEFT_CONNECTION_TIME_HIGGS",
      "argument": "omega_L su(2)_L, theta imaginary-time component",
      "result": "weak connection and proposed Higgs",
      "deps": [],
      "guard": "Not full theta or omega_R"
    },
    {
      "id": "W-SSC-032-G1-W01-EW-3",
      "typed": "W01-SEC32-EW-02",
      "lines": [
        220,
        220
      ],
      "op": "CONVENTIONAL_YM_HIGGS_DYNAMICS_CLAIM",
      "argument": "left weak field, usual Yang-Mills and Higgs terms",
      "result": "author states ordinary dynamics can be assigned",
      "deps": [
        "WEAK_LEFT_CONNECTION_TIME_HIGGS"
      ],
      "guard": "No complete derived model in source section"
    },
    {
      "id": "W-SSC-032-G1-W01-EW-4",
      "typed": "W01-SEC32-EW-03",
      "lines": [
        221,
        225
      ],
      "op": "EXTRA_U1_MISSING",
      "argument": "SU2L alone, additional U1",
      "result": "first author-stated gauge-symmetry problem",
      "deps": [
        "WEAK_LEFT_CONNECTION_TIME_HIGGS"
      ],
      "guard": "Do not invent an already-existing U1"
    },
    {
      "id": "W-SSC-032-G1-W01-EW-5",
      "typed": "W01-SEC32-EW-04",
      "lines": [
        227,
        229
      ],
      "op": "SU2R_HIGGS_NONINVARIANCE",
      "argument": "one-form Higgs, SU2L/SU2R nontrivial actions",
      "result": "second author-stated problem",
      "deps": [
        "WEAK_LEFT_CONNECTION_TIME_HIGGS"
      ],
      "guard": "Desired SU2R invariance not possessed by original one-form"
    },
    {
      "id": "W-SSC-032-G1-W01-EW-6",
      "typed": "W01-SEC32-EW-05",
      "lines": [
        229,
        229
      ],
      "op": "DESIRED_U2_C2_REP",
      "argument": "extra U1, SU2L, U2, defining C2 Higgs",
      "result": "desired U2/defining-C2 representation",
      "deps": [
        "EXTRA_U1_MISSING",
        "SU2R_HIGGS_NONINVARIANCE"
      ],
      "guard": "Not literal U2=SU2xU1 identity or already complete construction"
    },
    {
      "id": "W-SSC-032-G1-W01-EW-7",
      "typed": "W01-SEC32-EW-06",
      "lines": [
        230,
        230
      ],
      "op": "TWISTOR_FORWARD_PROPOSAL",
      "argument": "twistor-space reformulation in following section",
      "result": "source claim that twistor space can address the problems",
      "deps": [
        "EXTRA_U1_MISSING",
        "SU2R_HIGGS_NONINVARIANCE"
      ],
      "guard": "No completed section-3.2 dynamical theory"
    }
  ]
];
const project=o=>({id:o.id,typed:o.original_typed_statement_id,lines:o.original_rendered_html_lines,op:o.source_operation_or_relation,argument:o.argument_and_carrier_roles,result:o.result_role,deps:o.within_body_dependencies,guard:o.source_modality_and_negative_guard});
function check(c){
 assert.equal(c.schema,'isograph.exp062-w-G1-W01-Einstein-weak-source-candidate.v0.1');
 assert.equal(c.track,'W');assert.equal(c.semantic_authority,false);
 assert.equal(c.status,'CANDIDATE_NOT_INDEPENDENTLY_COLD_QUALIFIED');
 assert.equal(c.source.revision,'arXiv:2104.05099v2 (2021-10-14)');
 assert.equal(c.source.url,'https://arxiv.org/html/2104.05099v2');
 assert.equal(c.source.original_source_byte_hash_newly_authenticated,false);
 assert.equal(c.source.October03_historical_mutable_raw_bytes_authenticated,false);
 assert.equal(G.current.G0_frozen,true);assert.equal(T.source_reconciliation.current_source_local_reviewed_count,39);
 assert.deepEqual(c.counts,{original_G0_bodies:151,previous_qualified_G1_bodies:39,G1_unqualified_remaining:112,candidate_bodies:2,candidate_typed_statements:10,candidate_source_occurrences:15});
 for(const [k,p] of Object.entries(c.exact_pins)){assert.equal(p.path,SOURCE[k]);assert.equal(p.sha,SHAS[k]);}
 assert.equal(c.qualification.current_author_G0_frozen,true);
 for(const k of Object.keys(c.qualification).filter(k=>k!=='current_author_G0_frozen'))assert.equal(c.qualification[k],false,'gate '+k);
 assert.equal(c.rows.length,2);
 let total=0;
 for(let i=0;i<2;i++){
  const id=['W-SSC-031','W-SSC-032'][i],r=c.rows[i],s=S.items.find(x=>x.id===id),inv=I.current_ssc_to_original_inverse.find(x=>x.ssc_id===id);
  assert.equal(r.census_id,id);assert.equal(r.unit,'W01');
  assert.equal(r.frozen_obligation_exact,s.obligation);
  assert.deepEqual(r.frozen_typed_statements_exact,s.source_expression_census.statements);
  assert.deepEqual(r.original_G0_source_keys,inv.original_source_keys);
  assert.deepEqual(r.original_G0_typed_ids,inv.source_typed_statement_ids);
  assert.deepEqual(r.occurrences.map(project),fixed[i]);
  assert.equal(r.occurrences.length,[8,7][i]);
  const ops=new Set(r.occurrences.map(x=>x.source_operation_or_relation));
  const typed=new Set(r.occurrences.map(x=>x.original_typed_statement_id));
  assert.deepEqual([...typed].sort(),[...inv.source_typed_statement_ids].sort());
  for(let j=0;j<r.occurrences.length;j++){
   const o=r.occurrences[j];total++;
   assert.equal(o.source_version,'2104.05099v2');
   assert.equal(o.source_binder_scope,'W01 section-specific author assertion/conditional/proposal; no added formal universal quantifier');
   assert.equal(o.scope,'SOURCE_LOCAL_ONLY');
   assert.equal(o.named_mathematics,'UNEXPANDED');
   assert.equal(o.L_semantic_import,false);assert.equal(o.independent_cold_qualified,false);
   for(const d of o.within_body_dependencies)assert.ok(ops.has(d),'valid local dependency '+d);
  }
 }
 assert.equal(total,15);
 assert.equal(c.finite_non_source_negative_control.minus_right,0);
 assert.equal(c.finite_non_source_negative_control.plus_left,1);
 assert.equal(c.finite_non_source_negative_control.source_truth_claim,false);
}
check(C);
let count=0;
function hostile(name,act){const c=JSON.parse(JSON.stringify(C));act(c);let threw=false;try{check(c)}catch{threw=true}assert.ok(threw,'escaped hostile '+name);count++;}
for(let i=0;i<15;i++){
 hostile('semantic operation '+i,c=>{const o=(i<8?c.rows[0].occurrences[i]:c.rows[1].occurrences[i-8]);o.source_operation_or_relation='INCORRECT';});
 hostile('negative source modality '+i,c=>{const o=(i<8?c.rows[0].occurrences[i]:c.rows[1].occurrences[i-8]);o.source_modality_and_negative_guard='erased';});
}
hostile('dependency deletion',c=>{c.rows[0].occurrences[2].within_body_dependencies=[];});
hostile('typed source swapped',c=>{c.rows[1].occurrences[6].original_typed_statement_id='W01-SEC32-EW-02';});
hostile('false cold promotion',c=>{c.rows[0].occurrences[0].independent_cold_qualified=true;});
hostile('cross author import',c=>{c.rows[0].occurrences[0].L_semantic_import=true;});
hostile('false G1 complete',c=>{c.qualification.global_G1_complete=true;});
hostile('false merged PR',c=>{c.qualification.PR70_merge_authorized=true;});
hostile('destroy frozen reciprocal',c=>{c.rows[0].original_G0_source_keys=[];});
hostile('wrong historical identity',c=>{c.source.October03_historical_mutable_raw_bytes_authenticated=true;});
assert.equal(count,38);
console.log('W G1 W01 Einstein+weak: 2 frozen bodies, 10 G0 typed, 15 occurrences; '+count+'/38 mechanical adversarial controls rejected. Not independently cold-qualified; G1 stays 39/151.');
