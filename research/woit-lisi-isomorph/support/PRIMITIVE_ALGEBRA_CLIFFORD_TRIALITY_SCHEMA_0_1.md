# Primitive Algebra / Clifford / Triality Schema 0.1

**Status:** research-local reusable schema support; not qualified Core authority
**Native:** PRIMITIVE_ALGEBRA_CLIFFORD_TRIALITY_SCHEMA_0_1.isg

## Pinned dependencies

- Primitive Logic Kernel 0.1: 2630336da5c4117a15a43c1dc0847536b33ed083
- Primitive Data Constructors 0.5: c0479ac1de1a1c8ff5737221133601618b1a56cf
- Primitive Field / Vector Schema 0.1: f234db03e52a0141a6a9fea80af7badd76751d7f
- Primitive Linear / Form / Chiral Schema 0.1: ecf84b358fb77aa4f7da9c87b4df67b76c0e00a6
- Primitive Group / Lie / Representation Schema 0.1: 47397bc66824c9361e2b2930157efb62c185075d

## Local IDs

| ID | Gloss | Closure |
|---|---|---|
| 185001 | unital associative algebra schema | CLOSED_SCHEMA |
| 185002 | nondegenerate symmetric quadratic-form presentation | CLOSED_SCHEMA |
| 185003 | unital composition-algebra schema | CLOSED_SCHEMA |
| 185004 | Clifford-module representation of a quadratic space | CLOSED_SCHEMA |
| 185005 | scalar-valued trilinear form on three vector spaces | CLOSED_SCHEMA |
| 185006 | cyclic triality structure with order-three linear maps | CLOSED_SCHEMA |

## 185001

Uses a bilinear vector-valued product, unit, and associativity. It is suitable as a lower interface for matrix/endomorphism-like algebras, but does not define matrices or a universal algebra construction.

## 185002

Uses a symmetric bilinear scalar form B, a total scalar map Q with Q(v)=B(v,v), and an explicit nondegeneracy condition.

This is a pinned quadratic-form presentation, not every possible quadratic-form convention. Source instantiations must match the convention or provide an exact translation.

## 185003

Adds a bilinear unital product and norm multiplicativity Q(xy)=Q(x)Q(y). Associativity is **not** required, allowing source-local instantiation by associative or nonassociative composition algebras.

Division versus split behavior is not hidden in the label and remains a source-specific norm/isotropy obligation.

## 185004

Represents a Clifford **module**, not the universal Clifford algebra itself.

Gamma is bilinear in quadratic-space and spinor arguments and satisfies:

~~~text
gamma(v, gamma(v,s)) = Q(v) s
~~~

This is enough to state a source Clifford-action relation without treating CLIFFORD_ALGEBRA as primitive. The universal algebra/quotient property remains separately open if load-bearing.

## 185005

Defines a total scalar trilinear relation over three vector spaces and linearity in all three arguments.

## 185006

Adds three linear maps X->Y, Y->Z, Z->X:
- their cyclic composition is identity from each starting role;
- the trilinear form is invariant under the induced cyclic role transformation.

This is a generic cyclic triality schema. It is **not** by itself Spin(8) triality, division-algebra triality, generation triality, or a proof those uses are naturally identical.

## Current disposition

~~~text
M06:
    unital associative and composition-algebra interfaces SCHEMA-CLOSED;
    division/split classification and source instantiation OPEN

M07:
    quadratic-space Clifford-module interface SCHEMA-CLOSED;
    universal Clifford-algebra construction and named Cl(p,q) OPEN

M21:
    trilinear and cyclic-triality interfaces SCHEMA-CLOSED;
    source-specific triality identities/automorphism groups OPEN
~~~

No cross-track conclusion follows from shared ability to instantiate these schemas.
