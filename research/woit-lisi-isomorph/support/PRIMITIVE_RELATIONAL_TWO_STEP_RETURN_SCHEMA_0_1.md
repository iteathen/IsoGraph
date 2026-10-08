# Relational Fixed-Point-Free Two-Step Return Interface 0.1

**Status:** G6 hypothesis candidate; not authority  
**Primitive/schema ID:** `221101`

## Exact scope

The schema represents only an abstract carrier predicate `P` and a binary relation `R`.

It requires:

```text
R(x,y) -> P(x) and P(y)

P(x) and P(y) and P(z) and R(x,y) and R(y,z)
    -> z = x

P(x) -> not R(x,x)
```

It does not require any represented element to have an outgoing relation. It does not require single-valuedness, functionhood, symmetry, surjectivity, injectivity, nonemptiness, finiteness, or cardinality properties.

No projective, quaternionic, twistor, geometric, topological, field, vector, real-form, or antipodal semantics are part of the schema.
