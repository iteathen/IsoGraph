# Core 0.21 Qualification

**Module:** IsoGraph Core 0.21 Rendering Conservation, Schema Closure, and Closure Invalidation  
**Disposition:** QUALIFIED  
**Date:** 2026-09-29  
**Candidate file:** CORE_SPEC_DRAFT_0_21_RENDERING_CONSERVATION_SCHEMA_CLOSURE_CANDIDATE.md  
**Qualified SHA-256:** f76bc94748ab5f970fe6b21ae4734919df241912c7e5e13e07177896e5f01820

## Evidence

Qualification uses preserved, non-retroactive evidence:

- Experiment 057 Attempt 2: C01–C25 PASS, all guards PASS, module assessment SUPPORTED; C26 retained as a public field-semantics ambiguity and not rescored.
- Experiment 058: fresh isolated authority-boundary replacement, 1/1 PASS, all guards PASS, module assessment SUPPORTED.

Final reviews:
- experiments/057/EXPERIMENT_057_FINAL_QUALIFICATION_REVIEW.md
- experiments/058/EXPERIMENT_058_FINAL_QUALIFICATION_REVIEW.md

Deterministic infrastructure:
- qualification/CORE_0_21_LEDGER_CONTRACT.md
- tools/core021/check-core021-ledger.mjs
- tools/core021/test-core021-ledger.mjs

The deterministic checker is qualification infrastructure, not semantic proof authority.

## Qualified boundary

Core 0.21 is an additive clarification over cumulative Core through 0.20.

It introduces no loop, recursion, schema, QU, or qualification-infrastructure primitive.

Schema Closure is a closure classification over ordinary primitive semantics. It requires exact all-and-only generation coverage and does not prove termination or arbitrary properties of generated members.

A structured source unknown may close through qualified QU only when the known QU semantics themselves remain traceable to primitive support. Missing definitions remain incomplete rather than being recast as domain uncertainty.

Full-stack integration with current QU, NEI, DTS, DP, and EI authority is separately required.
