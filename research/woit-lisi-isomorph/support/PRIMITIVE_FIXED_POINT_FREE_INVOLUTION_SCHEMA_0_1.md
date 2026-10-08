# Fixed-Point-Free Involution Interface 0.1

**Status:** G6 hypothesis candidate; not authority  
**Origin:** W-track G5H hypothesis `FIXED_POINT_FREE_INVOLUTION_INTERFACE_0_1`  
**Primitive/schema ID:** `221100`

## Scope

The schema is source-neutral. It represents only:

- a carrier predicate `P`;
- a total single-valued self-map `F : P -> P`;
- involution: applying `F` twice returns the original represented element;
- fixed-point-freeness: a represented element is never mapped to itself.

It does not define or assume projective space, twistor geometry, quaternionic structure, antipodal maps, topology, vector spaces, fields, conjugation, or any W/L source object.

The carrier may be empty. Nonemptiness, finiteness, cardinality, parity, topology, and geometry are outside scope.

## Exact behavioral contract

For represented `x,y,z`:

```text
TOTAL_SINGLE_VALUED(F : P -> P)

P(x) and F(x,y) and F(y,z)
    -> z = x

P(x) and F(x,y)
    -> y != x
```

This is intended to be an exact Core-definable reusable schema. Qualification of the schema does not establish that any source instance supplies `P` and `F`; source-track reconstruction remains a separate G7 obligation.
