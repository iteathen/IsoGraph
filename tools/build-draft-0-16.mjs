import fs from 'node:fs';
import crypto from 'node:crypto';

const sourcePath = 'CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md';
const outPath = 'CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md';
const amendmentPath = 'CORE_SPEC_DRAFT_0_16_CANDIDATE.md';
const expectedSourceBlob = '827671a58700399dbf4854252b8248e1401eb3f8';

const source = fs.readFileSync(sourcePath, 'utf8');
const blobHeader = Buffer.from(`blob ${Buffer.byteLength(source)}\0`);
const sourceBlob = crypto.createHash('sha1').update(blobHeader).update(source).digest('hex');
if (sourceBlob !== expectedSourceBlob) {
  throw new Error(`Draft 0.15 source blob mismatch: expected ${expectedSourceBlob}, got ${sourceBlob}`);
}

function replaceOnce(text, needle, replacement, label) {
  const first = text.indexOf(needle);
  if (first < 0) throw new Error(`Missing patch anchor: ${label}`);
  if (text.indexOf(needle, first + needle.length) >= 0) throw new Error(`Non-unique patch anchor: ${label}`);
  return text.slice(0, first) + replacement + text.slice(first + needle.length);
}

let out = source;

out = replaceOnce(out,
  '# IsoGraph Core Specification — Draft 0.15 Consolidated Candidate',
  '# IsoGraph Core Specification — Draft 0.16 Consolidated Candidate',
  'title');

out = replaceOnce(out,
  '**Status:** frozen consolidated candidate for qualification  ',
  '**Status:** unqualified consolidated successor candidate; focused obligation-sufficiency qualification pending  ',
  'status');

out = replaceOnce(out,
  '**Historical lineage:** Draft 0.13 consolidated candidate + Draft 0.14 qualification amendment + Draft 0.15 corrective amendment  ',
  '**Historical lineage:** qualified Draft 0.15 consolidated candidate + Draft 0.16 obligation-sufficiency clarification  ',
  'lineage');

out = replaceOnce(out,
  '**Authority:** self-contained current semantic authority for new Draft 0.15 qualification artifacts  ',
  '**Authority:** self-contained candidate semantic authority for new Draft 0.16 qualification artifacts; Draft 0.15 remains the last qualified authority until this successor qualifies  ',
  'authority');

out = replaceOnce(out,
  '**Growth rule:** this consolidation adds no domain operator, structural class, comparison relation kind, or irreducible primitive',
  '**Growth rule:** this consolidation adds no surface syntax, domain operator, structural class, comparison relation kind, D/E transformation kind, or irreducible primitive',
  'growth-rule');

out = replaceOnce(out,
  'This document consolidates the currently surviving IsoGraph rules into one authority. A current decoder or verifier does **not** need to replay Drafts 0.13, 0.14, and 0.15 to determine current semantics.',
  'This document consolidates the surviving qualified Draft 0.15 rules plus the Draft 0.16 obligation-sufficiency clarifications into one candidate authority. A Draft 0.16 decoder or verifier does **not** need to replay the amendment chain to determine candidate semantics.',
  'intro-1');

out = replaceOnce(out,
  'The source amendments remain historical evidence explaining why particular rules exist. Where wording here differs editorially from those documents, the intended semantics are the cumulative semantics of Drafts 0.13 + 0.14 + 0.15, not a new revision.',
  'Draft 0.15 remains immutable historical qualification evidence at its recorded revision. Draft 0.16 does not retroactively change Experiment 004 results. Its only semantic changes clarify how much evidence a stated claim requires, how exact witness families may be represented without mandatory enumeration, when witness quotienting is valid, how factorization-space coverage scopes claims, and that proof obligations do not prescribe stronger discovery algorithms.',
  'intro-2');

out = replaceOnce(out,
`canonical serializer output
    != unique structural witness`,
`canonical serializer output
    != unique structural witness

evidence obligation
    != discovery algorithm

one verified witness
    != complete witness family

local factorization-node claim
    != factorization-space completeness

witness equivalence in one frozen claim context
    != global witness equivalence`,
  'interpretation-barriers');

out = replaceOnce(out,
`Pair-conditioned extraction/factorization is exploratory evidence only.

## 21.2 Extraction kinds`,
`Pair-conditioned extraction/factorization is exploratory evidence only.

### 21.1.1 Claim-scoped factorization coverage

A relation established on explicitly identified frozen factorization/extraction nodes is a claim about those nodes. It does not by itself claim completeness over every allowed factorization/extraction alternative, and verifying that local relation does not require exploration of unrelated alternatives.

A claim of factorization-space completeness, discovery completeness across allowed D/extraction alternatives, or absence of any correspondence across that space MUST declare the covered factorization/extraction space and either:

- exhaust the declared space under the frozen policy; or
- provide a qualified coverage certificate proving that omitted alternatives cannot change the claimed result.

A negative result at one named factorization node remains local to that node unless such coverage evidence lifts it to the wider factorization space.

Independent-freeze requirements still apply. Claim scoping does not authorize pair-conditioned factorization to become blind qualification evidence.

## 21.2 Extraction kinds`,
  'factorization-coverage');

out = replaceOnce(out,
`Only verified witnesses/certificates become qualification evidence.

---

# 30. Common cores and complete accounting`,
`Only verified witnesses/certificates become qualification evidence.

## 29.2 Claim-bounded obligation closure

For a result under a frozen target layer, view, relation signature, transformation authority, and proof profile, verification MUST discharge the complete dependency-closed obligation set induced by the claim.

Verification MUST NOT require a stronger relation, stronger reconstruction layer, stronger completeness/optimality property, or unrelated qualification gate unless that stronger obligation is itself a dependency of the stated claim or is explicitly required by the frozen proof profile.

Once the dependency-closed obligations of the claim are discharged by qualified evidence, no additional search, canonicalization, enumeration, or proof is semantically required for that claim.

Claim-bounded verification does not permit omission of hidden prerequisites. Dependency closure includes every revision, policy, transformation, provenance, accounting, side condition, and subordinate witness on which the claim actually depends.

## 29.3 Proof-method neutrality

Semantic result requirements are evidence obligations, not mandatory discovery algorithms.

Within the frozen admissible proof profile, any qualified witness/certificate method may establish a claim if it discharges the same complete structural obligations. Canonicalization, exhaustive search, a particular refinement procedure, or another stronger proof method is mandatory only when:

- the claim explicitly concerns that method or its output;
- the frozen proof/qualification profile requires it for a load-bearing reason; or
- no weaker qualified evidence discharges the required obligations.

Method neutrality does not weaken isolation, independence, provenance, or non-circularity requirements. A qualification protocol may constrain evidence acquisition even when the underlying structural relation is method-independent.

---

# 30. Common cores and complete accounting`,
  'claim-bounded-and-method-neutral');

out = replaceOnce(out,
`## 30.2 Multiple mappings and automorphisms

Distinct verified mappings remain separate by default.

A deterministic canonical graph representative does not prove uniqueness of mapping.

Mappings may be quotient-collapsed only under an independently verified automorphism/equivalence showing irrelevance to the requested downstream operation.`,
`## 30.2 Claim-typed witness sufficiency and multiple mappings

Distinct verified mappings remain separate by default. A deterministic canonical graph representative does not prove uniqueness of mapping.

The required amount of witness evidence is determined by the claim:

- an existential mapping/isomorphism claim requires one verified witness;
- a claim of at least \`k\` materially distinct witness classes requires \`k\` verified witnesses shown pairwise inequivalent under the frozen qualified witness equivalence, if any;
- a uniqueness claim modulo a frozen witness equivalence requires one verified witness plus a coverage proof that every valid witness is equivalent to it;
- a claim of exactly \`k\` witness-equivalence classes requires complete enumeration of those classes or an exact generative/classification certificate with verified coverage;
- a claim describing the complete witness family requires complete enumeration or an exact verified family representation with verified coverage;
- maximum/optimal claims remain governed by Section 30.1.

Nothing in witness preservation requires eager enumeration when the stated claim is weaker and its complete obligations are already discharged.

## 30.3 Context-scoped witness quotients

Let \`C\` denote the frozen claim context, including the target layer, view, relation signature, transformation authority, applicable downstream observation/operation set, and proof profile.

A witness equivalence \`Q_C\` may quotient-collapse verified witnesses only when it is independently qualified as an equivalence relation and shown to preserve every load-bearing distinction, observation, and obligation exposed by \`C\`.

Absent such a qualified \`Q_C\`, distinct verified mappings remain distinct.

A quotient qualified for one claim context is not globally reusable merely because the underlying structures are unchanged. A later context that exposes a previously irrelevant port, role, provenance item, boundary, identity, or other distinction may invalidate the quotient.

If \`Q_C\` affects search pruning, witness coverage, or completeness, it MUST be frozen/qualified before the affected search. A quotient introduced only after verification to compact an already established witness family is a new derived result with its own revision and proof; it does not rewrite or erase the underlying evidence.

## 30.4 Exact witness-family certificates

A complete witness family may be represented by an exact finite description rather than by explicit enumeration when the description and its coverage are independently verified under the same frozen claim context.

For structural isomorphism specifically, if \`f : A -> B\` is one verified isomorphism and \`Aut_C(A)\` is the exact automorphism group of \`A\` under the same frozen context, then:

```text
Iso_C(A,B) = { f ∘ a | a in Aut_C(A) }
```

because every other isomorphism \`g : A -> B\` yields \`f^-1 ∘ g in Aut_C(A)\`. Therefore one verified isomorphism plus an exact verified generating description of \`Aut_C(A)\` may serve as a compact complete-family certificate.

This group/coset fact is specific to isomorphism (and separately proved analogous cases). Arbitrary embeddings, common-core mappings, simulations, or other witness families MUST NOT be compressed by this rule unless an exact family theorem/certificate is independently established for that relation.`,
  'witness-sufficiency');

out = replaceOnce(out,
`- evidence-partition/discovery isolation rules.`,
`- evidence-partition/discovery isolation rules;
- claim-bounded dependency-closed verification obligations;
- claim-typed witness-family sufficiency and context-scoped witness quotients;
- local factorization-node claims versus factorization-space completeness;
- proof-method neutrality within frozen qualification constraints.`,
  'historical-compatibility');

out = replaceOnce(out,
`No new structural class is promoted from these cases until its independent class/schema promotion burden is met.

---

# 43. Failure classification and falsifiers`,
`No new structural class is promoted from these cases until its independent class/schema promotion burden is met.

## 42.3 Draft 0.16 obligation-sufficiency controls

Before Draft 0.16 may supersede Draft 0.15 as qualified authority, focused adversarial qualification MUST exercise at least:

1. an existential isomorphism with a large automorphism family, establishing that one witness suffices for existence while complete-family claims require exact family coverage;
2. a witness quotient that is safe for one frozen downstream context but invalid when a later context exposes a previously ignored port/role/distinction;
3. a correspondence exposed only by an alternative independently frozen D/factorization node, distinguishing a valid local node claim from an invalid factorization-space completeness claim;
4. a direct verified isomorphism with no canonical form produced, establishing that canonicalization is not a semantic prerequisite;
5. a certified negative discharged by a separating invariant without exhaustive mapping search;
6. a weak relation whose corresponding stronger relation fails, establishing that verification does not silently demand the stronger relation;
7. successful pairwise comparison-stage reconstruction with failed/unavailable full-source reconstruction, establishing claim-layer separation;
8. a malicious or incomplete proof profile that attempts to omit a real dependency, establishing dependency-closure rejection.

These controls add no new primitive or comparison relation. Their purpose is to falsify the obligation-sufficiency clarifications before qualification promotion.

---

# 43. Failure classification and falsifiers`,
  'draft-016-controls');

out += `\n\n---\n\n# 45. Draft 0.16 qualification status\n\nDraft 0.16 is an **unqualified successor candidate**. Draft 0.15 remains the last qualified semantic authority until the focused controls in Section 42.3 complete under isolated reconstruction, post-freeze scoring, and independent verification.\n\nDraft 0.16 does not authorize retroactive reinterpretation of Draft 0.15 artifacts or Experiment 004 evidence.\n\nThe following were deliberately **not** introduced as normative performance shortcuts:\n\n- no requirement to choose a globally smallest/minimal comparison view;\n- no prescribed cheap-to-expensive progressive search algorithm;\n- no mandatory post-D fingerprint stage;\n- no global canonical factorization or canonical-labeling prerequisite;\n- no weakening of source-local versus pairwise reconstruction obligations;\n- no heuristic fingerprint or incomplete search upgraded into a structural proof;\n- no automatic witness quotient without a frozen qualified context and coverage proof.\n`;

const amendment = `# IsoGraph Core Specification — Draft 0.16 Candidate Amendment\n\n**Status:** unqualified corrective/performance-semantics candidate  \n**Base:** \`CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md\` at Git blob \`${expectedSourceBlob}\`  \n**Consolidated successor:** \`CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md\`  \n**Growth rule:** no new syntax, primitive, structural class, comparison relation kind, or D/E transformation kind\n\n## Purpose\n\nDraft 0.16 clarifies the amount and form of evidence required by structural claims so the specification does not accidentally mandate computation stronger than the claim itself. It preserves all load-bearing represented information and all Draft 0.15 correctness safeguards.\n\n## Normative changes\n\n1. **Claim-bounded obligation closure.** Verification discharges the complete dependency-closed obligation set of the frozen claim, but does not require a stronger relation, reconstruction layer, completeness/optimality property, or unrelated gate.\n2. **Proof-method neutrality.** Structural validity is defined by discharged evidence obligations rather than a mandatory discovery algorithm; isolation/non-circularity constraints remain enforceable qualification requirements.\n3. **Claim-typed witness sufficiency.** Existential, lower-bound, uniqueness, exact-class-count, complete-family, and optimality claims require correspondingly different witness coverage.\n4. **Context-scoped witness quotients.** Witnesses may be collapsed only under an independently qualified equivalence that preserves every load-bearing observation/obligation of the frozen claim context; quotient validity is not global.\n5. **Exact witness-family certificates.** Complete families may use exact verified generative descriptions instead of eager enumeration. For isomorphism, one verified isomorphism plus an exact verified automorphism-group generating description can compactly describe the complete family.\n6. **Claim-scoped factorization coverage.** A relation on named frozen factorization nodes is local; factorization-space completeness requires declared coverage plus exhaustion or a qualified coverage certificate.\n\n## Explicit non-changes\n\nDraft 0.16 does not require a minimal view, progressive search schedule, canonical labeling, one canonical D, post-D-only fingerprints, full-source reconstruction for pairwise-only claims, or heuristic negatives. It does not weaken independent factorization freeze, witness verification, residual accounting, or certified-negative discipline.\n\n## Qualification requirement\n\nThe consolidated candidate remains unqualified until the focused adversarial controls in its Section 42.3 pass isolated cold reconstruction, post-freeze scoring, and independent verification. Draft 0.15 remains the last qualified authority meanwhile.\n`;

fs.writeFileSync(outPath, out);
fs.writeFileSync(amendmentPath, amendment);

console.log(JSON.stringify({
  source_blob: sourceBlob,
  consolidated: outPath,
  amendment: amendmentPath,
  consolidated_sha256: crypto.createHash('sha256').update(out).digest('hex'),
  amendment_sha256: crypto.createHash('sha256').update(amendment).digest('hex')
}, null, 2));
