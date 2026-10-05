# Woit BT01 H-to-C2 Pseudoreal Source Instance 0.3

**Status:** CURRENT SOURCE-LOCAL NATIVE INSTANCE — CORRECTED SCALAR OPERATION HANDLES  
**Native:** `WOIT_BT01_H_C2_PSEUDOREAL_SOURCE_INSTANCE_0_3.isg`  
**Source:** W05 §§2–4; W01/W05 Euclidean quaternion support  
**Predecessor:** 0.2 rejected for downstream closure until revalidated

## Correction

Versions 0.1 and 0.2 instantiated the generic W complex scalar interface in the correct positional order:

```text
189001 = ADD
189002 = MUL
189003 = NEG
189004 = INV
189005 = ZERO
189006 = ONE
```

but three source-specific pins used the handles as if MUL and NEG were shifted by one position.

The defective pins were:

```text
189004(ONE,-ONE)
189003(i,i,-ONE)
189004(i,-i)
```

Revision 0.3 corrects them to:

```text
NEG(ONE,-ONE)  = 189003(189006,197020)
MUL(i,i,-ONE) = 189002(197010,197010,197020)
NEG(i,-i)     = 189003(197010,197021)
```

and retains:

```text
CONJ(i,-i) = 197012(197010,197021).
```

## Semantics retained

All other 0.2 semantics are retained:

- exact real-linear H ↔ C2 presentation;
- J pinned to left multiplication by quaternion j;
- J²=-1;
- exact projective quotient;
- induced projective involution;
- fixed-point-free projective clause.

## Invalidation

Any closure packet that used 0.1/0.2 as authoritative support must be regenerated against 0.3.

Known current affected W frozen-census closures:

- W-SSC-023
- W-SSC-024
- W-SSC-098

W-SSC-001, W-SSC-026, and W-SSC-027 do not depend on this source instance.

No current IA fixed point exists, so there is no fixed-point invalidation beyond the already-blocked IA stage.
