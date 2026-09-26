# Experiment 031 — Attempt 1 Infrastructure Review

**Workflow run:** `36254045214`  
**Trigger SHA:** `a13c26fc4faad7741a53f3fe0042ffce413948ad`  
**Semantic decoder executed:** no  
**Semantic disposition:** none

## Failure

The deterministic cold-input guard used the generic forbidden substring `ASSERTIONS`.

That substring is also legitimately present in the qualified Core 0.19 filename:

`CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md`

The dry-run packet constructor therefore rejected the authority file before any provider call.

## Classification

```text
failure class: harness / input-filter false positive
semantic evidence produced: none
hidden scorer executed against decoder output: no
qualification effect: none
```

The scorer self-test itself passed before this failure.

## Correction

Remove only the overbroad generic `ASSERTIONS` substring from the allowlist guard. The existing `hidden/` prohibition already blocks `experiments/031/hidden/ASSERTIONS.json`.

No public case, hidden expected answer, semantic authority, or scoring rule is changed.
