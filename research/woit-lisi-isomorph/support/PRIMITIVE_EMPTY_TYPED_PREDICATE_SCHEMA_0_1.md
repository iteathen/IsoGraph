# Empty Typed Predicate on Carrier Interface 0.1

**Status:** G6 hypothesis candidate; not authority  
**Primitive/schema ID:** `221103`

## Exact scope

The schema represents only:

- a carrier predicate `U`;
- a unary predicate `B` typed on `U`;
- emptiness of `B` on represented `U)-elements.

It requires:

```text
B(x) -> U(x)
U(x) -> not B(x)
```

It does not require nonemptiness of `U`, existence of any `B)-member, complementarity, geometry, topology, field/vector structure, projective structure, real-form semantics, conjugation semantics, or any source-domain interpretation.

The meaning of `B` remains an external lower semantic obligation of any source instance.
