import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root=fileURLToPath(new URL('../../../',import.meta.url));
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'isograph-exp008-score-'));

function baseReport(){
  return {
    protocols_used:['constraint-structure','dependency-topology'],
    reranking_reason:'The generated-sequence dependency was a high-information bridge.',
    findings:[
      {
        alpha_steps:['A01','A02'],
        beta_steps:['B01','B02'],
        description:'Both construct an orbit by repeated application of one fixed generator.',
        falsification:'A changing generator on either side would break this correspondence.'
      },
      {
        alpha_steps:['A02','A03'],
        beta_steps:['B02','B03'],
        description:'Ambient finite capacity forces a dependency witness in the initial generated segment.',
        falsification:'If either ambient setting admitted the displayed generated objects independently, the witness would fail.'
      },
      {
        alpha_steps:['A03','A05'],
        beta_steps:['B03','B04'],
        description:'The witness becomes a finite rule constraining subsequent sequence values.',
        falsification:'The correspondence would fail if the witness could not be rewritten into a reusable finite rule.'
      },
      {
        alpha_steps:['A04','A05'],
        beta_steps:['B05'],
        description:'Applying the same generator propagates the dependency to every forward shift.',
        falsification:'A non-compatible generator would destroy propagation.'
      },
      {
        alpha_steps:['A06','A07','A08'],
        beta_steps:['B06','B07','B08'],
        description:'Finite initial data plus a persistent rule reconstructs the infinite future, with different local mechanisms.',
        falsification:'If either future required unbounded new independent information, the common compression role would fail.'
      }
    ],
    common_core:[
      'one fixed generator produces a forward orbit',
      'finite ambient capacity forces a dependency witness',
      'the generator propagates that witness',
      'finite data plus the propagated rule determines the infinite future'
    ],
    alpha_residual_steps:['A03','A06'],
    beta_residual_steps:['B03','B06'],
    residual_explanation:'Alpha uses literal state equality and eventual periodicity; Beta uses linear dependence and a recurrence without requiring repeated vectors.',
    rejected_overclaims:[
      'Full proof isomorphism is not established',
      'Natural identity of the two mechanisms is not established',
      'Same intermediate objects are not established',
      'Same algorithm is not established'
    ],
    promotion:'SUPPORTED_CANDIDATE',
    stop_reason:'The supported common architecture is recorded and the remaining machinery-specific residuals have low marginal value for this claim.'
  };
}

function score(report){
  const out=path.join(tmp,Math.random().toString(16).slice(2));
  fs.mkdirSync(out,{recursive:true});
  fs.writeFileSync(path.join(out,'EXP008_PARSED_REPORT.json'),JSON.stringify(report,null,2)+'\n');
  execFileSync(process.execPath,['experiments/008/tools/score-exp008.mjs'],{
    cwd:root,
    env:{...process.env,EXP008_OUT:out},
    stdio:'pipe'
  });
  return JSON.parse(fs.readFileSync(path.join(out,'EXP008_SCORE.json'),'utf8'));
}

try{
  const semantic=score(baseReport());
  assert.equal(semantic.disposition,'QUALIFIES');
  assert.deepEqual(semantic.matched_motifs,['O1','O2','O3','O4','O5']);
  assert.deepEqual(semantic.deep_motifs_matched,['O2','O3','O4']);
  assert.equal(semantic.guards.semantic_overclaims_rejected,true);
  assert.equal(semantic.serializer_diagnostics.exact_canonical_string_coverage_complete,false);

  const missing=baseReport();
  missing.rejected_overclaims=missing.rejected_overclaims.slice(0,3);
  const missingScore=score(missing);
  assert.equal(missingScore.disposition,'DOES_NOT_QUALIFY');
  assert.equal(missingScore.guards.semantic_overclaims_rejected,false);
  assert.deepEqual(missingScore.rejection_audit.missing_concepts,['SAME_ALGORITHM']);

  const canonical=baseReport();
  canonical.rejected_overclaims=[
    'FULL_PROOF_ISOMORPHISM',
    'NATURAL_IDENTITY',
    'SAME_INTERMEDIATE_OBJECTS',
    'SAME_ALGORITHM'
  ];
  const canonicalScore=score(canonical);
  assert.equal(canonicalScore.disposition,'QUALIFIES');
  assert.equal(canonicalScore.serializer_diagnostics.exact_canonical_string_coverage_complete,true);

  console.log('Experiment 008 scorer tests: PASS');
}finally{
  fs.rmSync(tmp,{recursive:true,force:true});
}
