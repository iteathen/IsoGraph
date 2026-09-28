# Experiment 032 — final verification review

**Status:** PASS
**Date:** 2026-09-27
**Workflow run:** 36345374241, attempt 1
**Frozen execution SHA:** b4ea79a36e7b9c4118bb4cf909f05021e8de4596
**Scope:** exact primitive reconstruction of the glycan-cleavage 0.1 source under the unqualified Core 0.20 primitive-logic closure research contract

## Frozen semantic artifacts

Source freeze:

    research/glycan-cleavage/2026-09-27/GLYCAN_CLEAVAGE_SOURCE_FREEZE_0_1.md
    git blob 7565778decc21d865f9fd81b10bd483a36e091e4

Native primitive rendering:

    research/glycan-cleavage/2026-09-27/GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg
    git blob f5ef6f08df03c01cb03d8dea1f9da87cc2fa29c4

Research rendering contract:

    CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md
    git blob ef9ea2584ec24f87c956d486040d3cbbd7d49f79

## Q2 deterministic result

PASS.

Recorded evidence:

- native parse: PASS;
- top-level blocks: 17;
- free native variables: 0;
- forbidden domain-label hits: 0;
- all local IDs 181000-181019 declared;
- all expected local semantic predicates have IFF expansions;
- no semantic DERIVED_VIEW_OF assertion;
- no semantic QU_UNEXPANDED assertion.

The cold packet preflight also proved:

- source freeze excluded;
- author audit excluded;
- closure ledger excluded;
- verifier prompt excluded;
- target-domain word hits in the cold packet: 0.

Cold packet SHA-256:

    6e45690467cb665bbf9365686d47ff4a1cc03c8b35effcf60e861a9f1d477c50

## Q3 native-only reconstruction

PASS as frozen reconstruction evidence.

Decoder:

    requested/selected: gemini-3-flash-preview
    HTTP: 200
    finish: STOP
    provider failures: none

Cold report SHA-256:

    7c5e6cababbaa9fe76f11c71c52d6f4715eda64ea05abcff6ac875046f0d45c7

The decoder reconstructed all local IDs 181000-181019 and recovered, without the source/domain statement:

- duplicate-free finite carriers;
- subset and extensional equality;
- finite rooted parent structure and depth/rank witness;
- retained ancestor-closed subset;
- leaf/terminal-relative-to-state relation;
- target-protected site eligibility under an external binary incidence relation;
- single local deletion;
- saturation under one fixed operator;
- finite phase trace;
- finite sequence of saturating operators;
- exact target reachability;
- minimum sequence length.

It reported no unexpanded semantic operator and no QU inside the frozen 0.1 scope.

## Q4 isolated source/reconstruction verification

PASS.

Verifier result:

    verdict: PASS
    source_reconstruction: PASS
    primitive_closure: PASS
    targeted checks: 18 / 18 PASS
    missing source semantics: []
    unsupported semantic additions: []
    mismatches: []
    load-bearing unresolved: []

Verifier packet SHA-256:

    d61bcacb4405feebabae89befe80cbfdcaccb821542a0db8647e4fe7efa5f3aa

Verifier report SHA-256:

    e16a35934c4f9db06de3f3b61802def853a38fadc2f363547ad2cfa97e89bcf5

## Model-isolation note

The verifier was a separate call with a separate packet and role.

The preferred verifier model, gemini-3.1-pro-preview, returned quota HTTP 429 on all three provider attempts. The frozen harness then used its declared fallback, gemini-3-flash-preview, which returned HTTP 200.

Therefore this run supplies:

    packet/context isolation: yes
    call isolation: yes
    model-family diversity between decoder and verifier: no

The absence of model diversity does not alter the frozen PASS under the declared Experiment 032 gate, but it is recorded rather than overstated as cross-model confirmation.

## Verification disposition

For the exact frozen 0.1 problem:

    source -> native primitive rendering -> cold reconstruction -> source comparison

round-trips without an observed load-bearing semantic difference.

Therefore:

    GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg
        = VERIFIED_RESEARCH_RENDERING

for the frozen 0.1 source semantics under the Core 0.20 research contract.

This does not mean:

- Core 0.20 is qualified or promoted;
- the 0.1 source is a complete biochemical model;
- kinetic/stochastic/context-dependent chemistry was proved irrelevant to real enzymes;
- any Discovery Protocol result has been established.

## Downstream gate

The primitive rendering is now admissible as the fixed research input for subsequent assertion completion, QU/NEI analysis, and Discovery Protocol work.

Those successor stages must not mutate this verification evidence. Semantic changes require a successor source/native revision and fresh verification.
