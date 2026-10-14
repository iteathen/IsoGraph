# Woit Primitive-Closure Frontier 0.1

**Status:** ACTIVE W-TRACK FRONTIER  
**Date:** 2026-10-04  
**Current ledger:** `CORE021_CLOSURE_LEDGER_0_19.json`  
**Frozen SSC:** `SOURCE_SEMANTIC_CENSUS_0_2.json`

## Current state

```text
CLOSED_SCHEMA:           12
CLOSED_PRIMITIVE:         9
INCOMPLETE_UNEXPANDED:  130
TOTAL:                  151
```

Recursive implicit assertions are **not yet authorized**. The mandatory order remains:

```text
primitive/schema closure
-> current Core-0.21 qualification
-> recursive IA generation to operational fixed point
-> NEI
-> DTS
-> DP
```

## Corrections already absorbed

1. SSC 0.1 omitted detailed W02 assertions W-A0-047–070. SSC 0.2 restores them as W-SSC-128–151.
2. H↔C² source instance 0.1/0.2 used incorrect scalar operation handles. Current support is `WOIT_BT01_H_C2_PSEUDOREAL_SOURCE_INSTANCE_0_3.isg`.
3. W02 Minkowski-vector 0.1/0.2 contained scalar/matrix defects; 0.3 repaired equations but broke public downstream ID 204145. Current support is interface-preserving `W02_MINKOWSKI_HERMITIAN_VECTOR_SOURCE_INSTANCE_0_4.isg`.
4. Ledgers built on stale census/support revisions remain historical and are not current authority.

## High-priority open mathematical boundaries

### W02 representation layer

- **W-SSC-129** — conventional analytic-continuation relation between complex spacetime and distinct Lorentz/Euclidean real vector subspaces remains missing.
- **W-SSC-130** — exact dual-right / left tensor-Hom representation still needs a dual-spinor/tensor carrier rather than only the Hom action skeleton.
- **W-SSC-133** — standard twistor point as a C² subspace of C⁴ plus left spinor as the quotient `T/S_R` needs exact quotient/tangent semantics.
- **W-SSC-134** — SU(2)_L trivial and SU(2)_R nontrivial vector actions are rendered, but equivalence of `S_R` and `conjugate(S_R)` as SU(2)_R representations still needs an explicit intertwiner.
- **W-SSC-135** — scalar+three-vector decomposition is rendered, but the full `S_R tensor conjugate(S_R)` carrier identity is not.
- **W-SSC-136** — Osterwalder-Schrader state reconstruction / chosen reflection semantics require a dedicated state-space/reflection-positive reduction.
- **W-SSC-140–143** — Weyl Lagrangian, helicity, Euclidean Dirac reinterpretation, doubling obstruction, and Minkowski-to-Euclidean spinor maps still need equation-level native semantics.

### W02 Yang-Mills / gravity layer

- **W-SSC-146** — the self-dual Yang-Mills algebraic action identity is native, but the claim that the residual `∫Tr(F∧F)` is topological/global remains unreduced.
- **W-SSC-147** — frame/spin bundle, tetrad, connection, curvature, and Hodge decomposition need primitive bundle/connection ownership.
- **W-SSC-148** — off-diagonal curvature-block Einstein algebra is native, but the operator still must be reconstructed as curvature of the frame/spin connection.
- **W-SSC-149** — chiral GR action and variation roles are preserved, but tetrad, curvature, torsion-free, and Einstein variation semantics remain unreduced.
- **W-SSC-150** — Euclidean-real versus Minkowski-complex chiral gravitational variables depend on the preceding GR reconstruction.
- **W-SSC-151** — broad source conclusion remains blocked until the represented examples and electroweak limitation are conservatively reconstructed.

### W01/W05 global twistor layer

- **W-SSC-033** — algebraic CP¹ fibers / orthogonal complex structures are available, but the global `HP¹=S⁴` topology is still separate.
- **W-SSC-036–037** — tautological/quotient bundle, SU(3)/U(1), and generation representation semantics remain unreduced.
- **W-SSC-041–043 / 050** — Penrose/Penrose-Ward cohomology, bundle triviality, open-set side conditions, and PT state interface need native sheaf/cohomology/bundle support.
- **W-SSC-047–049** — exact Grassmannian quotient/tangent/Klein/alpha-plane semantics need W-local primitive support before use.
- **W-SSC-052** — SU(2,2) Hermitian orbit/signature geometry remains a separate exact real-form/orbit burden.
- **W-SSC-097 / 099–101** — real projective conic, invariant CP¹ family/topology, Euclidean-vs-Minkowski real-structure comparison, and O(1)⊕O(1) holomorphic bundle semantics remain.

## Next constructive targets

The strongest next finite reductions are:

1. add exact matrix-on-C² action plus pseudoreal intertwiner support to close W-SSC-134;
2. add an exact vector-space quotient / tangent-Hom schema for W-SSC-133 and W-SSC-047;
3. add exact tensor-product finite-basis support for W-SSC-130 / W-SSC-135;
4. separately build the global/topological characteristic-term support needed by W-SSC-146;
5. only after those local algebraic layers are stable, tackle frame/tetrad/connection semantics for W-SSC-147–150.

## IA firewall

Existing working IAs remain non-final:

- W-IA-BT01-001
- W-IA-BT01-002
- W-IA-W02-001

They must be revalidated against the final primitive graph and recursively extended until no new source-local IA is generated. No existing IA may be treated as the fixed point.

No Lisi semantics, bridge hypotheses, or unification candidates are available as W-track premises.
