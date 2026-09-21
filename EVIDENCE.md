# Evidence status

This repository follows the shared [iteathen evidence and validation policy](https://github.com/iteathen/.github/blob/main/EVIDENCE_POLICY.md).

## Current posture

IsoGraph has extensive revision-scoped qualification evidence. Its cold packets, isolated decoder/verifier runs, repository-controlled scorers, holdouts, and qualification manifests are valuable **INTERNAL-QUALIFICATION** evidence.

A fresh context, hidden oracle, different model, different provider, or blind packet can increase execution independence and reduce contamination. It does **not** by itself turn a project-controlled qualification campaign into independent external validation.

Historical experiment dispositions remain immutable. This classification changes the strength of the words used to describe the evidence, not the recorded PASS/FAIL/PARTIAL/QUALIFIES results or qualified semantic authority.

## Registered claims

| Claim | Evidence class | Status |
| --- | --- | --- |
| ISG-CORE-001 — Core Draft 0.17 is current qualified Core authority under the repository's qualification system | **INTERNAL-QUALIFICATION** | qualified repository authority |
| ISG-MODULES-001 — modules named by the qualified-module manifest passed their frozen repository qualification campaigns | **INTERNAL-QUALIFICATION** | revision/hash scoped |
| ISG-EXT-001 — IsoGraph's general formal/structural claims have independent external validation | **UNVALIDATED** | no general external validation registered |

Machine-readable records are in evidence/claims.json. Genuinely external evidence belongs under evidence/external/.

## What current evidence establishes

Internal qualification can establish that frozen artifacts satisfy the exact reconstruction, scoring, obligation, holdout, and composition tests defined by their campaigns. Cold isolation is meaningful evidence about contamination resistance and reconstruction behavior within that scope.

## What it does not establish

It does not by itself establish mathematical truth outside the encoded obligations, scientific validity, completeness beyond declared coverage, community acceptance, or independent third-party reproduction.

QUALIFIES means the frozen artifact passed the named qualification contract. It must not be paraphrased as "externally validated" unless separate external evidence actually exists.

## Path to stronger evidence

Prefer externally specified problems whose truth conditions do not depend on IsoGraph terminology: established mathematical structures, independently specified grammars/semantics, published corpora, mechanically checked proof obligations, or third-party reconstruction/reproduction.

For every external packet, preserve the external oracle/source, exact IsoGraph revision, mapping/claim scope, falsifier, raw representation/output, checker or evaluator, and unresolved residuals.

## Non-mutation rule

Evidence work may encode, compare, reconstruct, falsify, and qualify IsoGraph artifacts. It must not alter Core/module semantics or qualification targets merely to make an evidence result pass. Semantic changes require their ordinary candidate/qualification lifecycle.
