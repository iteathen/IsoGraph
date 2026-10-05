# W-SSC-027 Spin(4) Action Closure Packet 0.1

**Status:** CANDIDATE CLOSED_SCHEMA — READY FOR CORE-0.21 LEDGER INTEGRATION  
**Date:** 2026-10-04  
**Frozen census item:** W-SSC-027

## Frozen obligation

W01 represents Spin(4) by independent left/right SU(2)=Sp(1) actions, with the Euclidean vector action

```text
x -> g_L x g_R^{-1}
```

and keeps the two factor roles structurally distinct in Euclidean signature.

## Native reconstruction

`WOIT_BT01_SPIN4_UNIT_QUATERNION_ACTION_0_1.isg` defines:

- the exact unit-quaternion group carrier;
- multiplication and inverse;
- distinct left/right factor-role atoms;
- the exact four-place action relation implementing `g_L x g_R^{-1}`.

The underlying quaternion carrier is supplied by `WOIT_BT01_EUCLIDEAN_QUATERNION_PARAMETER_TRANSPORT_0_1.isg`.

## Recursive support closure

The closure packet recursively includes the unit-norm-group, quaternion-norm, quaternion finite-presentation, algebra, dimension, anti-involution, field/vector, linear-form, group/action, scalar-restriction, and linear-injection schemas.

The mechanical dependency check finds:

```text
included .isg files: 13
declared local relation IDs: 76
unresolved non-Core relation calls: 0
terminal logic authority: PRIMITIVE_LOGIC_KERNEL_0_1.isg
```

Thus no named `SU(2)`, `Sp(1)`, `Spin(4)`, `group`, `inverse`, or `quaternion` behavior is being accepted as an opaque leaf for this obligation.

## Boundary

This packet does not add topology/smoothness, global bundle actions, or W01's later physical/internal interpretation of the two factors. Those belong to separate frozen census obligations.

The next step is mechanical integration into the current Core-0.21 W closure ledger. Until that integration passes the Core structural checker, the frozen ledger remains authoritative.
