# P versus NP implicit-assertion A1 correction 0.1

**Status:** corrective successor record  
**Predecessor:** `IMPLICIT_ASSERTIONS_A1_0_1.md`

The predecessor remains immutable research history.

## Correction C1 — IA-013 round placement

`IA-013` deterministic terminal-polarity uniqueness is mathematically supported, but its predecessor support record cited natural-order comparability without first admitting that consequence from A0.

Therefore:

```text
IA-013 in A1 predecessor:
    SUPERSEDED AS ROUND-1 ADMISSION

assertion body:
    retained as candidate

new admission:
    occurs in A2 after exact order closure.
```

This is a support-lineage correction, not a semantic rejection.

## Correction C2 — IA-009 strict-order wording

The predecessor wrote `j>b`.

For native support, interpret this only as the primitive exact condition:

```text
LE(S(b),j).
```

That form directly supplies a nonempty residual path length through the represented addition/order definitions.

No unrepresented arithmetic comparison is imported.

## Corrected A1 accepted set

The corrected round-1 accepted set is:

```text
IA-001 .. IA-012
IA-014
IA-015
```

with `IA-013` deferred to A2.

No other A1 disposition changes.
