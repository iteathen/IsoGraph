# Primitive Mathematical Schema Plan 0.1

**Status:** ACTIVE RESEARCH SUPPORT PLAN — NOT QUALIFIED AUTHORITY
**Applies to:** both full-treatment tracks, with source-local instantiation
**Primitive base:** research/primitive-logic/PRIMITIVE_LOGIC_KERNEL_0_1.isg and exact supporting theories when used

## Purpose

The Woit and Lisi corpora rely on mathematical structures not covered by the current reusable primitive-logic research library. Core 0.20/0.21 forbids stopping at these labels.

The schemas below are domain-neutral mathematical reduction obligations. Source-specific dimensions, signatures, interpretations, and physical roles remain track-local.

## M01 — scalar carrier and operation graphs
Carrier membership; binary addition/multiplication graphs; additive inverse; distinguished zero/one; equality; associativity, commutativity, distributivity, identity/inverse laws; characteristic conditions when load-bearing. FIELD remains derived.

**Current reusable support:** PARTIAL / SCHEMA-CLOSED for the abstract commutative-field interface in support/PRIMITIVE_FIELD_VECTOR_SCHEMA_0_1.isg. Source-specific R/C structure remains open.

## M02 — real/complex structure
Ordered-field support when needed; complex extension or independent complex-field schema; distinguished imaginary unit; conjugation as involutive field automorphism; fixed-point real subcarrier. Analytic completeness/topology remains incomplete until explicitly rendered when load-bearing.

**Current reusable support:** algebraic involutive scalar-conjugation interface SCHEMA-CLOSED in support/PRIMITIVE_LINEAR_FORM_CHIRAL_SCHEMA_0_1.isg. Identification with standard complex conjugation, real fixed field, topology, and completeness remain open.

## M03 — vector space
Vector/scalar carriers; vector addition; scalar action; zero vector; quantified vector-space axioms. Dimension requires basis, independence, and spanning semantics.

**Current reusable support:** PARTIAL / SCHEMA-CLOSED for the abstract vector-space interface in support/PRIMITIVE_FIELD_VECTOR_SCHEMA_0_1.isg. Dimension/basis and source instantiation remain open.

## M04 — linear/multilinear maps
Total function graphs plus preservation laws. Bilinear/trilinear maps require linearity in each slot.

**Current reusable support:** linear maps and scalar-valued bilinear maps SCHEMA-CLOSED in support/PRIMITIVE_LINEAR_FORM_CHIRAL_SCHEMA_0_1.isg. General n-linear and source-specific maps remain open.

## M05 — forms and involutions
Map graph; domains; symmetry/conjugate-symmetry; nondegeneracy/signature when required; conjugation relation when used.

**Current reusable support:** bilinear and Hermitian interfaces SCHEMA-CLOSED; nondegeneracy/signature remain open.

## M06 — associative/composition/division algebra
Multiplication/unit graphs plus exact algebra laws. Division/composition properties, norm, norm multiplicativity, alternativity/associativity, and split-signature distinctions must be explicit when load-bearing.

**Current reusable support:** unital associative algebra and unital composition-algebra schemas CLOSED in support/PRIMITIVE_ALGEBRA_CLIFFORD_TRIALITY_SCHEMA_0_1.isg. Division/split classification, alternativity, and source-specific multiplication remain open.

## M07 — Clifford algebra interface
Scalar/vector/algebra carriers; algebra product; vector embedding; quadratic/bilinear form; Clifford relation; grading/chirality; basis/generator rules when dimension-specific. Matrix representation is a separate embedding claim.

**Current reusable support:** nondegenerate quadratic-space and Clifford-module action schemas CLOSED. Universal Clifford algebra, named Cl(p,q), matrix realizations, and source grading details remain open.

## M08 — Lie algebra
Carrier/vector-space support; bracket graph; bilinearity; antisymmetry; Jacobi. Subalgebra and embedding receive explicit closure/injectivity/bracket-preservation conditions.

**Current reusable support:** abstract Lie algebra, subalgebra, homomorphism, and injective embedding schemas CLOSED in support/PRIMITIVE_GROUP_LIE_REP_SCHEMA_0_1.isg. Named Lie algebras and real forms remain open.

## M09 — group and action
Group carrier/product/identity/inverse/associativity plus action graph and compatibility. Spin-group claims expose their load-bearing Clifford/Lie relation.

**Current reusable support:** abstract group and left-action schemas CLOSED. Smooth/Lie-group structure and named groups remain open.

## M10 — representation
Group/Lie action on vector carrier satisfying homomorphism/action laws. Vector, spinor, and adjoint are derived roles.

**Current reusable support:** abstract linear group representation and Lie-algebra representation schemas CLOSED. Source-specific representations remain open.

## M11 — grading/chirality
Grading/partition; positive/negative subcarriers; action preservation/exchange; chirality operator/eigenstructure when required. Majorana/Weyl conditions require explicit reality and chirality constraints.

**Current reusable support:** direct-sum Z2 chiral grading plus linear chirality operator SCHEMA-CLOSED; Majorana reality and source representation action remain open.

## M12 — projective quotient
Nonzero vector carrier; nonzero scalar rescaling relation; equivalence; quotient-class incidence.

## M13 — Grassmannian/twistor incidence
Ambient carrier; subspace carrier; membership/incidence; dimension/basis constraints; reality/orbit conditions. TWISTOR remains derived.

## M14 — real forms/conjugations
Complex carrier; involution/antilinear map; fixed-point or source reality condition; preserved form/action; orbit/signature conditions.

## M15 — manifold/local coordinate support
Point carrier; charts/domains; coordinate maps; overlap maps; differentiability assumptions required by the source.

## M16 — differential forms/exterior product
Degree carriers; wedge graph; graded laws; exterior derivative graph and source-used laws.

## M17 — principal bundle/fiber/section
Total/base carriers; projection; group action; fiber relation; sections; local trivialization/transition semantics when load-bearing.

## M18 — connection/curvature
Connection carrier; covariant derivative or local connection-form incidence; transformation behavior; curvature construction; structure equations used by the source. Ehresmann, Cartan, generalized Cartan, and superconnection remain distinct until related explicitly.

## M19 — Cartan/generalized Cartan geometry
Model group/subgroup; base or embedded-spacetime ownership; soldering/frame relation; Cartan connection; deformation/embedding structure.

## M20 — gauge/symmetry breaking
Pre-break action; distinguished field/configuration; stabilizer/unbroken structure; carrier/field decomposition; transition to post-break structure.

## M21 — triality
Three role carriers; trilinear relation/form; cyclic invariance; transformation cycling roles; preservation law; order-three condition where asserted. Spin(8), division-algebra, and generation triality remain distinct claims until related.

**Current reusable support:** trilinear form and generic cyclic triality schemas CLOSED. Spin(8), division-algebra, and generation-specific instantiations remain separate/open.

## M22 — root/weight systems
Cartan/subspace carrier; root functional/vector relation; root-space/bracket incidence; sign/structure-constant data when needed.

## M23 — quantization/Hilbert representation
Quantum states, Hilbert spaces, unitary representations, canonical/functional quantization, and Grassmann-valued fields require separate semantics when load-bearing.

## M24 — analytic continuation/Wick rotation
Complexified carrier; source/target real structures; holomorphic domain; boundary/restriction relation; extra choice/field; unresolved existence/uniqueness claims. Treat as DTS/schema, not a primitive.

## Current support disposition

~~~text
M01:
    ABSTRACT FIELD SCHEMA CLOSED; SOURCE-SPECIFIC EXTENSIONS OPEN

M03:
    ABSTRACT VECTOR-SPACE SCHEMA CLOSED; DIMENSION/SOURCE INSTANTIATION OPEN

M02:
    ALGEBRAIC CONJUGATION SCHEMA CLOSED; STANDARD R/C STRUCTURE OPEN

M04:
    LINEAR / BILINEAR SUPPORT PARTIALLY SCHEMA-CLOSED

M05:
    BILINEAR / HERMITIAN INTERFACES SCHEMA-CLOSED; SIGNATURE/NONDEGENERACY OPEN

M11:
    ABSTRACT CHIRAL DIRECT-SUM SCHEMA CLOSED; SOURCE REALITY CONDITIONS OPEN

M06:
    ASSOCIATIVE / COMPOSITION-ALGEBRA SCHEMAS CLOSED; DIVISION/SPLIT/SOURCE DETAILS OPEN

M07:
    QUADRATIC-SPACE CLIFFORD-MODULE SCHEMA CLOSED; UNIVERSAL/NAMED CLIFFORD ALGEBRAS OPEN

M08:
    ABSTRACT LIE/SUBALGEBRA/EMBEDDING SCHEMAS CLOSED; NAMED ALGEBRAS OPEN

M09:
    ABSTRACT GROUP/ACTION SCHEMAS CLOSED; LIE-GROUP/SMOOTH/NAMED GROUPS OPEN

M10:
    ABSTRACT GROUP/LIE REPRESENTATION SCHEMAS CLOSED; SOURCE REPRESENTATIONS OPEN

M12-M20:
    NOT YET FULLY PRIMITIVE-RENDERED

M21:
    ABSTRACT TRILINEAR / CYCLIC TRIALITY SCHEMAS CLOSED; SOURCE INSTANCES OPEN

M22-M24:
    NOT YET FULLY PRIMITIVE-RENDERED
~~~

This file is a burden register, not a closure ledger.
