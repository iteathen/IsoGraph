# Experiment 032 — glycan primitive-rendering reconstruction

**Status:** frozen verification campaign candidate
**Date:** 2026-09-27
**Scope:** verify one domain rendering under the unqualified Core 0.20 primitive-logic closure candidate
**Not in scope:** qualification or promotion of Core 0.20; Discovery Protocol; NEI; biochemical completeness beyond the frozen 0.1 source

## Claim under test

Target native artifact:

    research/glycan-cleavage/2026-09-27/GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg

Frozen source semantics:

    research/glycan-cleavage/2026-09-27/GLYCAN_CLEAVAGE_SOURCE_FREEZE_0_1.md

The native artifact must reconstruct the frozen source semantics without relying on high-level domain labels. Every load-bearing semantic path must bottom out in primitive logic, raw carrier/data incidence, or pinned primitive-rendered data/arithmetic support.

## Gate sequence

Q0 source freeze: complete.

Q1 author source-coverage / primitive-closure audit: complete.

Q2 deterministic native parse / lexical closure / forbidden-label audit: workflow preflight.

Q3 fresh native-only reconstruction: an isolated decoder sees no source freeze, author audit, closure ledger, expected answer, prior reconstruction, DP, or NEI material.

Q4 source-to-reconstruction comparison: a separate isolated verifier receives the frozen source and frozen Q3 output.

Q5 targeted distinction preservation: the verifier explicitly checks every load-bearing source section, exclusions, optimization direction, saturation rule, repeated-operator allowance, target protection, extensional state identity, and tie behavior.

Q6 downstream admission: only after Q2-Q5 PASS.

## Isolation

Cold decoder permitted inputs:

- Core 0.20 primitive-logic closure candidate;
- Primitive Logic Kernel 0.1 role map and native kernel;
- Primitive Data Constructors 0.5 native support;
- Primitive Natural Arithmetic 0.5 native support;
- glycan primitive native artifact;
- cold reconstruction prompt.

Cold decoder forbidden inputs include the source freeze, primitive author audit, primitive closure ledger, verifier prompt, experiment evidence, repository status/agent files, DP/NEI outputs, and any expected reconstruction.

The verifier is intentionally not cold to the source. Its job is exact comparison, not discovery.

## Resource budget

One decoder call plus one isolated verifier call. Provider or infrastructure failure may use model fallback inside the same frozen run. A semantic mismatch does not authorize rerunning toward a preferred answer.

## Pass condition

Experiment 032 passes only when deterministic preflight passes, native-only reconstruction is complete enough to compare, verifier verdict is PASS, source reconstruction is PASS, primitive closure is PASS, and no load-bearing mismatch remains.

A failure remains evidence and does not by itself establish whether the owner is source, rendering, primitive dependency, decoder, or verifier.
