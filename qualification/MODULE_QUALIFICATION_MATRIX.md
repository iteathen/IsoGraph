# IsoGraph Module Qualification Matrix

**Status:** governing qualification plan  
**Date:** 2026-09-18  
**Qualified semantic baseline:** `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`

This matrix separates module semantic qualification from implementation testing, discovery performance, and integrated-stack compatibility.

```text
module semantic qualification
    != implementation qualification
    != discovery performance
    != integrated-stack qualification
```

## Promotion dispositions

A qualification review MUST end in exactly one of:

- `QUALIFIED`
- `QUALIFIED_WITH_EXPLICIT_SCOPE`
- `DOES_NOT_QUALIFY`
- `INCOMPLETE_EVIDENCE`
- `INFRASTRUCTURE_FAILURE`

A frozen candidate is never silently edited after a cold result. A semantic revision starts a new frozen candidate and only the affected dependency-closed obligations are rerun.

## Module dependency graph

```text
Core 0.17 (qualified)
    |
    +--> QRC 0.1 (qualification infrastructure only)
    |
    +--> QU 0.1
            |
            +--> NEI 0.1 + 0.2 cumulative effective module
                    |
                    +--> Discovery Protocols 0.1-0.4 where identity conclusions are used

Core + QRC + QU + NEI + DP
    -> integrated-stack qualification
```

QRC is not semantic authority and is not a semantic dependency of QU/NEI/DP. It is qualification infrastructure used by harnesses.

## Core 0.17

**State:** QUALIFIED baseline; no new campaign.

**Claims retained:** Core Draft 0.17 exactly as qualified, including SI description correction, claim-bounded obligation closure, source fidelity, factorization/comparison discipline, and native witness authority.

**Non-claims:** no QU, NEI, or DP semantics are imported into Core.

**Qualification action:** dependency/provenance check only. Do not spend a new external semantic call unless Core itself changes.

## QRC 0.1

**Kind:** qualification infrastructure.

**Qualification obligations:**
- exact canonical IDs satisfy semantic and exact-serialization coverage;
- public natural-language labels can satisfy semantic coverage without hidden token requirements;
- structured canonical entries work;
- vague identity text does not false-positive as `NATURAL_IDENTITY`;
- missing concepts remain missing;
- no hidden alias table is required.

**Evidence type:** deterministic.

**Cold boundary:** not applicable to the mechanism itself. A post-freeze blind holdout must demonstrate that the contract can be used without leaking hidden answers.

**Promotion gate:** deterministic suite passes and at least one new blind holdout frozen after QRC uses it successfully.

**State:** infrastructure qualification is recorded separately in `qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_QUALIFICATION.md`.

## QU 0.1

**Dependencies:** Core 0.17.

**Normative claims under qualification:**
- unknown information can remain first-class relational structure;
- admissible-realization semantics are pinned by declared authority;
- open/determinate/inconsistent/incomplete-scope states remain distinct;
- semantic unresolved is not incomplete computation;
- refinement narrows one realization family while incompatible authority change is revision;
- QU structure can participate in ordinary comparison and QUI claims.

**Explicit non-claims:**
- QU is not a solver, Bayesian engine, measurement process, entropy maximizer, or experiment selector;
- equal information scalars do not imply structural equivalence;
- QUI does not imply equal actual resolutions or natural identity.

**Required adversarial coverage:** all targets in QU 0.1 Section 25.

**Failure classes:** use QU 0.1 Section 24 before any repair.

**Evidence split:**
- deterministic: packet integrity, syntax, provenance, scorer mechanics;
- semantic cold: reconstruction/classification of adversarial QU cases;
- independent verifier: dependency-closed review of the frozen report where promotion is sought.

**Promotion gate:** all QU obligations pass with no hidden dependency, circular restriction, or unresolved qualification-bearing ambiguity.

## NEI 0.1 + 0.2 cumulative effective module

**Dependencies:** Core 0.17; QU 0.1 only for claims whose result depends on unresolved identity-relevant possibilities.

**Revision discipline:** 0.1 remains the base semantics; 0.2 is the current clarification layer. Promotion must identify both immutable revisions.

**Normative claims under qualification:**
- SI addressability is not natural-identity evidence;
- determinate SAME/DISTINCT can qualify without artificial zero-uncertainty QU;
- unresolved identity-relevant possibilities require pinned QU;
- SAME, DISTINCT, semantic UNKNOWN, and no-admissible-model states have distinct evidence burdens;
- application semantics are preserved exactly and affect identity only under declared authority;
- absence of distinction does not imply SAME.

**Explicit non-claims:**
- structural isomorphism/QUI alone is not identity proof;
- different SI/method/factorization alone is not DISTINCT;
- same-looking representation alone is not SAME;
- incomplete computation is not semantic UNKNOWN.

**Required adversarial coverage:** NEI 0.1 Section 24 plus NEI 0.2 Section 10.

**Failure classes:** NEI 0.1 Section 23.

**Promotion gate:** dependency-closed QU obligations pass where invoked; direct determinate paths pass independently; circular downstream isomorphism/identity evidence is rejected.

## Discovery Protocols 0.1-0.4 cumulative effective module

**Dependencies:** Core 0.17. QU and NEI are dependencies only for discovery branches that actually rely on those semantics.

**Revision discipline:** qualify current cumulative behavior, not each historical revision as an independent current module.

**Normative claims under qualification:**
- ranked structural-first candidate discovery;
- residual-first and unknown-first search discipline;
- cross-residual recursion;
- role-before-carrier and one-node-to-subgraph alignment;
- structural breaker = concrete failed load-bearing obligation;
- cross-residual correspondence is promoted/expanded/falsified/incomplete rather than discarded;
- discovery priority never supplies semantic authority.

**Explicit non-claims:**
- no universal completeness guarantee;
- no requirement for exhaustive search;
- no natural identity conclusion without NEI authority;
- no full isomorphism merely from deep role correspondence.

**Required adversarial coverage:** DP 0.2 Section 14, DP 0.3 Section 12, DP 0.4 Section 8, plus structural-first controls from DP 0.1.

**Cold boundary:** final holdout must be new to the decoder; expected mappings, hidden motifs, scorer assertions, historical outputs, repository map, and author audits are excluded.

**Promotion gate:** fresh blind semantic success plus independently verified residual/overclaim discipline and no protocol-specific hidden token requirement.

## Integrated stack

**Dependencies:** only modules already promoted for the claims exercised.

**Objective:** test composition, not re-prove every lower-layer obligation.

**Required case shape:** one sealed source corpus containing fixed structure, structured unknowns, alternative factorizations, misleading labels, partial correspondences, real residuals, an identity question, and at least one tempting false analogy.

**Required output:** source-faithful representation decisions, QU where required, frozen-factorization discipline, discovery candidates, common core, residuals, bounded QUI/NEI conclusions, unknown/incomplete states where appropriate, falsification attempts, and independently verifiable witnesses.

**Promotion gate:** no new unsound inference path appears from module composition.

## Resource discipline

Default semantic budget per frozen campaign:

1. one cold decoder invocation over the full frozen corpus;
2. deterministic post-freeze scoring;
3. at most one independent verifier invocation when module promotion warrants it.

Additional external calls require a recorded evidentiary or infrastructure reason.

## Current execution order

1. QRC 0.1 infrastructure qualification record.
2. Experiment 009: joint QU 0.1 + NEI 0.1/0.2 qualification.
3. Experiment 010: cumulative Discovery Protocol qualification.
4. Experiment 011: integrated-stack qualification.
