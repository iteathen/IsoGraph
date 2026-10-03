# B01 <-> B02 Representation-Transform Candidate 0.1

**Status:** STRONG PROVISIONAL CANDIDATE — NOT AN ADMITTED ISOMORPH  
**Native:** `B01_B02_REPRESENTATION_TRANSFORM_CANDIDATE_0_1.isg`

## Observation

The leading candidate no longer looks like a direct match between two identically presented objects.

Instead the source families expose two different presentations of a possible common relation:

~~~text
B01:
vector + chiral spinor
    -> opposite chiral spinor
typed bilinear / Clifford-like action

B02:
base/spacetime parameter
    -> represented projective subspace
projective twistor incidence
~~~

Lisi 2026 explicitly writes the vector–positive-chiral-spinor to negative-chiral-spinor relation in division/Clifford form and states that, in the quaternionic case, this is the incidence relation for a Euclidean twistor.

Woit's Euclidean twistor formulation identifies compactified Euclidean spacetime with HP1 and projective twistor space with CP3 fibering over HP1 with CP1 fiber, while the twistor-P1 work emphasizes the quaternionic realization.

The campaign hypothesis is therefore:

~~~text
algebraic chiral-action presentation
    -- quaternionic realization + projectivization -->
geometric twistor-incidence presentation
~~~

not:

~~~text
full Woit theory == full Lisi theory
~~~

## Native candidate roles

| ID | Navigation gloss |
|---|---|
| 187100 | candidate representation transform |
| 187101 | preserved relational core |
| 187102 | quaternionic-realization guard |
| 187103 | algebraic/Clifford/triality residual |
| 187104 | projective/fibration/geometric residual |
| 187105 | typed three-role incidence core |
| 187106 | source-native external evidence handle |
| 187107 | nonzero/projective quotient core |
| 187108 | source-specific compatibility conditions |

The relation IDs 187920–187926 encode source, target, preserved core, guard, residuals, and evidence incidences. Their labels are navigation only.

## Exact obligations before admission

### T01 — typed carrier map
Establish source-local carriers corresponding to:
- vector/base element v;
- one chiral spinor-like element chi;
- the opposite chiral spinor-like element psi.

### T02 — algebraic incidence
Derive, from the Lisi native source rendering rather than this bridge file, the represented relation whose source formula has the form:

~~~text
psi = action(v, chi)
~~~

with exact type, reality, chirality, and nonzero guards.

### T03 — Woit geometric incidence
Derive, from the Woit native source rendering, the projective/subspace incidence relation independently.

### T04 — quaternionic realization
Show that the source-local quaternionic structures on each side instantiate the same neutral algebraic schema under a pinned mapping.

### T05 — projective well-definedness
Show that the algebraic relation descends through the relevant nonzero-scalar equivalence without changing the declared incidence relation.

### T06 — reconstruction
Prove the exact source-scoped direction(s) of reconstruction. Do not assume all three variables are mutually recoverable without the required nonzero/invertibility conditions.

### T07 — residuals
Keep separate:
- Lisi triality, generalized-reflection, exceptional, and E8 structure;
- Woit CP3/HP1 fibration, real-form, spacetime, and unification interpretation.

## Falsifiers

The candidate fails or weakens if:
- Woit's incidence cannot be reconstructed from the neutral relation without importing Lisi-only axioms;
- Lisi's quaternionic relation requires extra structure that has no Woit-side counterpart even after projectivization;
- the projective quotient is not compatible with the bilinear action under the source scaling rules;
- chirality/reality conditions disagree at the proposed common level;
- the apparent match exists only because a source residual was incorrectly projected away.

## Current disposition

~~~text
source-native clue:
    STRONG

neutral transform graph:
    CREATED

source-local primitive instantiations:
    NOT YET COMPLETE

isomorphism:
    NOT CLAIMED
~~~
