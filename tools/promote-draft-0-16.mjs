import fs from 'node:fs';
import crypto from 'node:crypto';

const sourcePath = 'CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md';
const outputPath = 'CORE_SPEC_DRAFT_0_16_CONSOLIDATED_QUALIFIED.md';
const expectedSourceBlob = '0cc6d2e3e08606a99324ee36b6ff5a6a5067efb8';

const source = fs.readFileSync(sourcePath, 'utf8');
const header = Buffer.from(`blob ${Buffer.byteLength(source)}\0`);
const sourceBlob = crypto.createHash('sha1').update(header).update(source).digest('hex');
if (sourceBlob !== expectedSourceBlob) {
  throw new Error(`Tested Draft 0.16 candidate blob mismatch: expected ${expectedSourceBlob}, got ${sourceBlob}`);
}

function replaceOnce(text, needle, replacement, label) {
  const at = text.indexOf(needle);
  if (at < 0) throw new Error(`Missing promotion anchor: ${label}`);
  if (text.indexOf(needle, at + needle.length) >= 0) throw new Error(`Non-unique promotion anchor: ${label}`);
  return text.slice(0, at) + replacement + text.slice(at + needle.length);
}

let out = source;
out = replaceOnce(out,
  '# IsoGraph Core Specification — Draft 0.16 Consolidated Candidate',
  '# IsoGraph Core Specification — Draft 0.16 Consolidated Qualified',
  'title');
out = replaceOnce(out,
  '**Status:** unqualified consolidated successor candidate; focused obligation-sufficiency qualification pending  ',
  '**Status:** qualified consolidated authority; Experiment 005 obligation-sufficiency qualification complete  ',
  'status');
out = replaceOnce(out,
  '**Authority:** self-contained candidate semantic authority for new Draft 0.16 qualification artifacts; Draft 0.15 remains the last qualified authority until this successor qualifies  ',
  '**Authority:** self-contained current qualified semantic authority for Draft 0.16 artifacts  ',
  'authority');
out = replaceOnce(out,
  'This document consolidates the surviving qualified Draft 0.15 rules plus the Draft 0.16 obligation-sufficiency clarifications into one candidate authority. A Draft 0.16 decoder or verifier does **not** need to replay the amendment chain to determine candidate semantics.',
  'This document consolidates the surviving qualified Draft 0.15 rules plus the qualified Draft 0.16 obligation-sufficiency clarifications into one current authority. A Draft 0.16 decoder or verifier does **not** need to replay the amendment chain to determine current semantics.',
  'intro');
out = replaceOnce(out,
`Draft 0.16 is an **unqualified successor candidate**. Draft 0.15 remains the last qualified semantic authority until the focused controls in Section 42.3 complete under isolated reconstruction, post-freeze scoring, and independent verification.

Draft 0.16 does not authorize retroactive reinterpretation of Draft 0.15 artifacts or Experiment 004 evidence.`,
`Draft 0.16 is a **qualified consolidated authority** for the obligation-sufficiency clarification layer. The focused controls in Section 42.3 completed under Experiment 005 using isolated cold reconstruction, post-freeze scoring, scorer-blind independent verification, and final review.

Qualification provenance:

- frozen semantic candidate/corpus commit: \`fa733d533cd683c5064c4f31fa6c083fa3aed21d\`;
- tested candidate Git blob: \`0cc6d2e3e08606a99324ee36b6ff5a6a5067efb8\`;
- cold workflow: \`35252295888\`, frozen cold report SHA-256 \`9078e33a7ae9f75eca75e2f9327a3f3e4e76e77c3223df5f03c5ce96dcbc5d9d\`;
- post-freeze scoring: 8 PASS / 0 PARTIAL / 0 FAIL / 0 UNKNOWN;
- scorer-blind verifier workflow: \`35252625515\`, verifier disposition \`VERIFIED\`, verifier report SHA-256 \`da45f19397f842eb08c9cea57cf77b108ee8dcf808c0c1f1989e72ca3d7b8eb3\`;
- final review: \`experiments/005/EXPERIMENT_005_FINAL_QUALIFICATION_REVIEW.md\`.

This promotion changes qualification status/provenance only. The normative clarification rules are identical to the tested candidate blob above.

Draft 0.16 does not authorize retroactive reinterpretation of Draft 0.15 artifacts or Experiment 004 evidence.`,
  'qualification-status');

fs.writeFileSync(outputPath, out);
console.log(JSON.stringify({
  source_blob: sourceBlob,
  output: outputPath,
  output_sha256: crypto.createHash('sha256').update(out).digest('hex')
}, null, 2));
