# Woit H-to-C2 pseudoreal 0.1/0.2 correction

**Status:** PREDECESSORS REJECTED FOR CURRENT CLOSURE SUPPORT  
**Date:** 2026-10-04

A scalar-operation handle defect was found during strict W primitive-closure work.

The reusable field schemas have always used the positional contract:

```text
ADD, MUL, NEG, INV, ZERO, ONE
```

and `WOIT_BT01_SOURCE_INSTANCE_0_1.isg` binds the source handles in that order.

The H↔C2 0.1/0.2 source instance nevertheless used 189003 as multiplication and 189004 as negation in three pins. Those pins were therefore not licensed by the field schema.

Successor 0.3 repairs the three incidences. Historical files remain preserved.

Affected current closure packets must be reissued; they are not silently grandfathered.
