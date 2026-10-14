# W Split-Signature M2(C) Real Form 0.1 correction

**Status:** 0.1 REJECTED BEFORE CLOSURE PROMOTION

Revision 0.1 accidentally reused native ID `999020` both as a matrix basis vector and as the bilinear-form relation, and failed to construct the intended `E12-E21` basis vector before using it.

No closure packet or Core ledger consumed revision 0.1.

Revision 0.2 uses distinct IDs and the exact basis:

```text
I,
E12-E21,
E11-E22,
E12+E21
```

with bilinear signature `(+,+,-,-)`.

Revision 0.1 remains historical evidence only.
