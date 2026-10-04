# Track L — Source-Side Formulation Map 0.1

**Status:** PROVISIONAL SOURCE-SIDE MAP — NOT PRIMITIVE-CLOSED  
**Corpus:** `SOURCE_CORPUS_FREEZE_0_2.md`

This map is built from Lisi-side sources only. The Woit reference inside L05 is stored opaquely and supplies no semantics here.

## Formulation nodes

### L-F1 — E8 principal-bundle / superconnection formulation
Source: L01.

Core source posture:
- Standard Model and gravitational fields are components of an E8-valued connection/superconnection on a four-dimensional base;
- triality is invoked for generations;
- frame/Higgs, gauge, gravity, and fermion sectors are organized inside the exceptional algebra.

### L-F2 — generic gauge/gravity/Higgs symmetry-breaking formulation
Source: L02.

Core source posture:
- begin with a Lie-algebra-valued gauge field and a fully gauge-invariant action;
- spontaneous breaking yields Lorentz, Yang-Mills, Higgs/complement sectors;
- the mechanism is formulated more generally than any one E8 embedding.

### L-F3 — Spin(11,3) / Majorana-Weyl / E8(-24) embedding
Source: L03.

Core source posture:
- one fermion generation is represented as 64 real components;
- the gauge/gravity action matches a positive-chiral real Majorana-Weyl Spin(11,3) spinor;
- Spin(11,3) embeds through Spin(12,4) into E8(-24).

### L-F4 — generalized Cartan / deforming-Lie-group geometry
Source: L06.

Core source posture:
- the fundamental geometry is reframed from a principal bundle over an externally given spacetime to a deforming Lie group with embedded four-dimensional spacetime;
- the earlier triality/generation idea is explicitly reconsidered because it did not fit cleanly in the original principal-bundle geometry;
- triality-related spacetime regions supply a new generation interpretation.

### L-F5 — CPTt discrete-symmetry / Clifford formulation
Source: L04.

Core source posture:
- C, P, and T are discrete operations on fermionic states;
- an order-three triality operation extends this structure across generations;
- the representation uses Clifford/Pin/biquaternionic machinery.

### L-F6 — division-algebra / Clifford / triality / exceptional scaffold
Source: L05.

Core source posture:
- division/split-composition algebra multiplication can be represented as chiral Clifford matrices;
- vector and two chiral-spinor roles share a triality structure;
- triality, generalized reflections, magic-square Lie algebras, exceptional structures, and particle-model applications are linked;
- the source explicitly encourages movement among these mathematical starting points.

## Same-author relation ledger

| Relation | From | To | Current strength | Source witness | Residual / caution |
|---|---|---|---|---|---|
| L-R01 | L-F1 | L-F2 | MECHANISM_GENERALIZATION | L02 formulates gauge/gravity/Higgs breaking without requiring the full E8 model. | Not equivalent to L-F1; fermion/generation content is not supplied by L-F2 alone. |
| L-R02 | L-F1 | L-F3 | PARTIAL_ALGEBRAIC_EXPLICITIFICATION | L03 explicitly realizes one-generation gravity/SM action inside Spin(11,3) and E8(-24). | L03 does not establish the original three-generation triality claim. |
| L-R03 | L-F1 | L-F4 | AUTHOR_EXPLICIT_GEOMETRIC_REFRAME | L06 says the earlier triality suggestion did not make perfect sense in the E8 principal-bundle geometry and supplies generalized Cartan geometry instead. | This is a correction/reframing, not a proof of equivalence. |
| L-R04 | L-F3 | L-F4 | EMBEDDING_RETAINED_UNDER_REFRAME | L06 retains Spin(11,3)/Spin(12,4)/E8 algebra while changing the geometry in which it is interpreted. | Need primitive DTS account of which structures are preserved. |
| L-R05 | L-F5 | L-F6 | DISCRETE_TRIALITY_MODULE_TO_SCAFFOLD | L05 begins from CPTt motivation and embeds triality into the broader division/Clifford/exceptional construction. | Full dynamical relation to L-F5 remains to be rendered. |
| L-R06 | L-F3 | L-F6 | CLIFFORD_REPRESENTATION_REFACTORIZATION_CANDIDATE | Both use explicit real chiral Clifford/spinor structures; L05 makes coefficient-level division/Clifford identification explicit. | Same mathematical substrate does not imply same physical model. |
| L-R07 | L-F1 | L-F6 | UPDATED_EXCEPTIONAL_FORMULATION | L05 revisits exceptional-unification applications through the triality/division-algebra scaffold. | Particle assignments and generation interpretation are revision-sensitive. |
| L-R08 | L-F6 | L-F6 | INTERNAL_MULTI_START_EQUIVALENCE_CLAIM | L05 explicitly says the connected subjects may be approached from whichever starting point is familiar and gives explicit vector/spinor/division coefficient identifications. | Must be decomposed into exact local equivalences; not every listed subject is globally isomorphic. |

## Source-native external-reference edge

L-F6 contains an explicit statement that its quaternionic incidence relation is a Euclidean twistor incidence relation and cites an external Woit paper.

During Track L construction this is represented only as:

```text
L-F6
  -> EXTERNAL_RELATION_REFERENCE
  -> XREF-L05-033
```

The target semantics are unavailable to this map.

See `SOURCE_NATIVE_CROSS_REFERENCE_QUARANTINE_0_1.md`.

## Formulation-family partition — current provisional view

```text
connection / geometry family:
    L-F1
    L-F2
    L-F4

spinor / algebraic embedding family:
    L-F3

discrete/triality family:
    L-F5

division-Clifford-triality-exceptional scaffold:
    L-F6
    overlapping L-F3 and L-F5
```

The most important same-author transition currently appears to be L-F1 -> L-F4: the algebraic unification goal remains while the geometry owning spacetime/frame/generation semantics changes.

## Bridgeability is not yet evaluated

No Lisi formulation is selected as "best." Cross-track bridgeability waits for primitive closure and sealed same-author transforms.
