# Lisi Core-0.21 Closure Ledger 0.6 Audit

**Status:** PARTIAL PRIMITIVE/SCHEMA CLOSURE — REBASED ON CORRECTED SSC 0.2  
**Current target:** `LISI_FULL_RENDERING_0_2`  
**Predecessor target:** `LISI_FULL_RENDERING_0_1`

Primitive reduction of L05 generalized reflections exposed a source-semantic defect in the frozen census wording for `L-SSC-130`. The corrected census is `SOURCE_SEMANTIC_CENSUS_0_2.json`.

The old target and ledger remain historical evidence. This ledger is a new Core-0.21 target, not an in-place mutation.

## Revalidated closed items

The correction changes only L-SSC-130. The already-closed bodies are semantically unchanged and were revalidated:

- `L-SSC-125`
- `L-SSC-126`
- `L-SSC-128`
- `L-SSC-129`

The authoritative node graph is unchanged, so the primitive-kernel hash remains identical to ledger 0.5. Census, scope, source-interpretation, and inference-profile hashes are recomputed for the new target.

## Current counts

~~~text
closed schema:           4
incomplete/unexpanded: 187
IA fixed point:       NONE
NEI:                 BLOCKED
DTS final pass:      BLOCKED
DP:                  BLOCKED
~~~

L-SSC-130 remains open with corrected semantics:

~~~text
individual generalized reflections:
    anti-invariant on the triality form with role exchange/sign

even generalized-reflection compositions:
    triality-group transformations preserving T
~~~

No cross-author semantics are available.
