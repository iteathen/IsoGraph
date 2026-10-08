# Disjoint Unary Predicates Interface 0.1

**Status:** G6 hypothesis candidate; not authority  
**Primitive/schema ID:** `221102`

## Exact scope

The schema represents only:

- a carrier predicate `U`;
- two unary predicates `A` and `B`, each typed on `U`;
- disjointness of `A` and `B`.

It requires:

```text
A(x) -> U(x)
B(x) -> U(x)
U(x) and A(x) -> not B(x)
```

It does **not** require:

- nonemptiness of `U`, `A`, or `B`;
- exhaustiveness of `A` and `B`;
- complementarity;
- equality or equivalence of the predicates;
- any projective, real-form, conic, geometric, topological, conjugation, or field semantics.

The meanings of `A` and `B` remain external lower semantic obligations of any source instance.
