# Navier–Stokes IsoGraph Rendering 0.1 — Deterministic Validation

**Classification:** internal deterministic representation audit only.  
**Not:** mathematical proof qualification, independent external validation, or IsoGraph semantic qualification.

## Revisions

- IsoGraph branch base: `148a91b576aa8de6f92c34aa305fc55fd458c452`
- OpenAI formalization source: `f9e8bc5b38b6e212696e8a30e3e91517af887bbd`
- Native artifact: `NAVIER_STOKES_FORCED_BLOWUP_0_1.isg`

## Source-contract coverage

Mechanical extraction from the pinned Lean source gives:

| Contract | Source fields | Represented |
|---|---:|---:|
| R3 `ProblemStatement.CandidateProperties` | 12 | 12 |
| `LocalPaper.Properties` | 19 | 19 |
| `PeriodicPaper.CandidateProperties` | 16 | 16 |

The exact source field names are preserved in `SOURCE_MANIFEST_0_1.md`.

## Native surface sanity

Latest deterministic check of the native artifact:

- balanced `() [] {}` delimiters: PASS
- undeclared stable labels: 0
- suspicious/non-Core tokens under the restricted artifact surface: 0
- native relation occurrences: 541
- QU state records: 4
- NEI query-context records: 4

This check verifies only the restricted serialization surface used by this artifact. It is not a substitute for a full Core 0.17 parser/semantic verifier.

## Provenance checks

The native artifact includes source/declaration-family anchors for the retained load-bearing declarations, each pinned through source revision SI `1010`.

The Markdown source manifest records the exact repository revision and source declaration names.

## QU audit

The artifact deliberately preserves these unresolved/completeness boundaries:

1. full transitive Lean dependency closure not yet semantically rendered — `INCOMPLETE_SCOPE`;
2. complete internal paper↔Lean lemma alignment not established — `INCOMPLETE_SCOPE`;
3. correction-stage quotient/equivalence space — `OPEN` under a bounded represented question, with no quotient authorized yet;
4. physical/thermodynamic realizability — `INCOMPLETE_SCOPE`, outside the formal theorem authority.

No generic opaque UNKNOWN token substitutes for these structures.

## NEI audit

Four identity questions are represented:
- generic correction schema vs concrete stage occurrence;
- raw/local velocity vs localized whole-space velocity;
- whole-space candidate vs periodized candidate;
- paper theorem statement vs Lean theorem representation.

All remain `INCOMPLETE/UNQUALIFIED` for NEI 0.4. The artifact asserts no NEI `SAME`, `DISTINCT`, or semantic `UNKNOWN` because no qualified admissible natural-identity model sufficient for those broader queries has been supplied.

## Anti-overclaim checks

The representation explicitly preserves these barriers:

- bounded kinetic energy does not imply bounded pointwise velocity;
- all-order residual flatness does not mean the residual is identically zero throughout the construction region;
- exact zero residual is separately represented for the heat exterior;
- formal comparator alternatives C/D do not establish physical realizability;
- a generic correction step is not the same occurrence as its stage instances;
- structural correspondence is not natural identity;
- different SI/source representation is not natural distinctness.

## Remaining incompleteness

The representation is intentionally high-retention but not exhaustive over every Lean helper declaration. Low-level derivative, extension, integral, chart, support, and algebraic lemmas are compressed beneath parameterized property families when the retained higher-level declaration already exposes their load-bearing contract.

A future expansion should be driven by a concrete dependency that proves one of those compressed distinctions is consumed differently downstream, not by raw file count.
