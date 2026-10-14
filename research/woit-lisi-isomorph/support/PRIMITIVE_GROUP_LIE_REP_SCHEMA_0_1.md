# Primitive Group / Lie / Representation Schema 0.1

**Status:** research-local reusable schema support; not qualified Core authority
**Native:** PRIMITIVE_GROUP_LIE_REP_SCHEMA_0_1.isg

## Pinned dependencies

- Primitive Logic Kernel 0.1 native blob: 2630336da5c4117a15a43c1dc0847536b33ed083
- Primitive Data Constructors 0.5 native blob: c0479ac1de1a1c8ff5737221133601618b1a56cf
- Primitive Field / Vector Schema 0.1 native blob: f234db03e52a0141a6a9fea80af7badd76751d7f
- Primitive Linear / Form / Chiral Schema 0.1 native blob: ecf84b358fb77aa4f7da9c87b4df67b76c0e00a6

## Local IDs

| ID | Gloss | Closure |
|---|---|---|
| 184001 | group schema | CLOSED_SCHEMA |
| 184002 | left group-action schema | CLOSED_SCHEMA |
| 184003 | bilinear endomorphic product on a vector space | CLOSED_SCHEMA |
| 184004 | Lie-algebra schema | CLOSED_SCHEMA |
| 184005 | Lie-subalgebra schema | CLOSED_SCHEMA |
| 184006 | linear group representation schema | CLOSED_SCHEMA |
| 184007 | Lie-algebra representation schema | CLOSED_SCHEMA |
| 184008 | Lie-algebra homomorphism schema | CLOSED_SCHEMA |
| 184009 | injective Lie-algebra embedding schema | CLOSED_SCHEMA |

## Exact scope

184001 expands group multiplication, identity, inverse, and associativity through raw relation graphs.

184002 adds a total left action and the identity/composition action laws.

184003 gives a vector-valued product bilinear in both arguments.

184004 adds antisymmetry and the Jacobi identity to 184003.

184005 is a vector subspace closed under the represented bracket.

184006 is a group action whose action at each represented group element preserves vector addition and scalar multiplication.

184007 is bilinear in Lie and vector arguments and satisfies the bracket/commutator representation law.

184008 is a linear map preserving brackets.

184009 adds injectivity to 184008.

## Non-coverage

This file does not define:
- topology or Lie-group smoothness;
- exponentiation between group and Lie algebra;
- matrix groups;
- Spin groups;
- Clifford algebras;
- particular real forms or signatures;
- SU, SL, SO, Spin, E8, or any named source algebra/group.

Those require source-specific instantiation and additional schemas.

## Current disposition

~~~text
M08 abstract Lie algebra/subalgebra/embedding:
    SCHEMA-CLOSED
M09 abstract group/action:
    SCHEMA-CLOSED
M10 abstract group/Lie representation:
    SCHEMA-CLOSED

named source groups/algebras and their exact embeddings:
    OPEN
~~~

No Woit or Lisi claim is closed merely because it can eventually instantiate these schemas.
