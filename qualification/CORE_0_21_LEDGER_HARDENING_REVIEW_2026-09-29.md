# Core 0.21 Ledger Tooling Hardening Review — 2026-09-29

**Status:** COMPLETE  
**Semantic authority effect:** none  
**Core 0.21 candidate SHA-256:** `f76bc94748ab5f970fe6b21ae4734919df241912c7e5e13e07177896e5f01820` unchanged

## Reason for hardening

Final implementation review found that the first deterministic ledger checker validated closure paths rooted in census dispositions but did not independently reject an authoritative semantic node that was orphaned from every current disposition. It also trusted several frozen hashes rather than recomputing them from structures present in the ledger.

Those were qualification-tooling escape paths, not changes to Core 0.21 semantics.

## Current hardened contract

`qualification/CORE_0_21_LEDGER_CONTRACT.md` now identifies `core-0.21-ledger-0.2` and requires canonical recomputation of:

- Source Semantic Census hash;
- semantic scope hash;
- authoritative primitive-kernel hash;
- authoritative QU-state hash;
- governing-authority descriptor hash;
- inference/search-profile descriptor hash.

The checker additionally requires:

- every authoritative node is linked to at least one frozen census item;
- every authoritative node is reachable from at least one current disposition;
- every child reference resolves;
- authoritative closure paths traverse only authoritative nodes;
- closed reconstruction paths contain only known census/node references;
- support cycles alone cannot discharge closure without permitted terminal support;
- qualified QU boundaries retain correct ownership and cannot silently select a realization;
- Schema Closure generator components close independently of unresolved QU;
- QU termination is explicitly linked separately through `termination_qu_nodes`.

## Deterministic regression coverage

`tools/core021/test-core021-ledger.mjs` now contains 17 adversarial controls including:

- missing census disposition;
- missing body node;
- derived-view authority leak;
- incomplete closure;
- prefix-only schema coverage;
- hidden schema side condition;
- in-place scope mutation;
- stale IA fixed point;
- selected QU realization;
- orphan authoritative node;
- non-authoritative support on an authoritative path;
- dangling child;
- census-hash mismatch;
- primitive-kernel hash drift;
- ungrounded support cycle;
- unknown reconstruction reference;
- authoritative node without census linkage;
- plus positive/negative QU-termination controls.

Repository Verify passed on the hardened implementation.

## Evidence boundary

Experiments 057–060 remain immutable semantic qualification/integration evidence for the unchanged Core 0.21 candidate.

They used the earlier deterministic contract revision frozen in their packets. They are not rewritten or claimed to have used the hardened checker.

The hardened checker is the current implementation/qualification tooling shipped with the promotion candidate. Because it only strengthens deterministic structural enforcement and changes no semantic candidate or module boundary, no semantic requalification is implied by this tooling correction.