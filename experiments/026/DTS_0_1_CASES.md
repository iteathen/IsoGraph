# Experiment 026 — Fresh DTS 0.1 Qualification Holdout

These cases are qualification evidence candidates, not development examples from Experiments 020–025.

## Q01 — Ordinary Core structure without DTS

An ordinary IsoGraph state graph G contains nodes, relations, scopes and boundaries, but no transition claim.

A validator proposes that, after DTS is installed, every ordinary state graph must contain a DTS transition object to remain valid.

Determine whether G remains valid as an ordinary Core structure and whether DTS materialization is required.

## Q02 — Recoverable transition projections

A represented transition tau declares:

```text
source-state = G0
target-state = G1
```

and separately represents transition anatomy.

Determine pi-(tau), pi+(tau), and whether the source/target projections are recoverable without inventing a second state representation.

## Q03 — One structural substrate

Representation A encodes K, Delta-, Delta+, Delta~, B, D and O using ordinary IsoGraph nodes/relations interpreted under DTS role vocabulary.

Representation B stores the only semantic transition anatomy in an opaque external transition payload that ordinary IsoGraph comparison cannot inspect.

Determine which representation is compatible with the DTS one-substrate rule.

## Q04 — Boundary reuse

An ordinary IsoGraph boundary/interface object B0 already connects fixed structure and a QU-bearing interface.

A DTS transition uses that same interface role.

An implementer proposes copying B0 into a new DTS-only boundary primitive with independent semantics.

Determine whether DTS should reuse B0 and whether a separate DTS boundary primitive is required.

## Q05 — Determinate transition without artificial QU

A complete execution record plus pinned closure authority determines every region load-bearing for claim C.

No unresolved transition structure remains relevant to C.

The transition contains no QU instance.

Determine whether an artificial QU must be created and whether C may be complete under the stated authority.

## Q06 — Unresolved load-bearing delta

A transition's introduced relation family may contain either one or two relations. That unresolved cardinality can change the comparison result.

The representation uses a DTS-private token `UNKNOWN_DELTA` and supplies no QU realization family.

Determine whether QU semantics are required, whether the private token is an adequate substitute, and the status of the stronger comparison claim without QU.

## Q07 — Omitted potentially load-bearing region

A transition comparison ignores an unobserved internal region R. R could change a load-bearing effect. No QU represents R, and no closure or irrelevance authority covers it.

Determine whether omission may be treated as an empty region and whether the stronger TI claim may proceed.

## Q08 — Same endpoints

Transitions TA and TB both relate the same G0 to the same G1.

TA and TB have no verified transition-region mapping. Their observed internal changes differ.

Determine whether the equal source/target projections establish TI.

## Q09 — Scoped TI with residual

TA and TB have verified correspondence over K, Delta-, Delta+, B and the declared source/target roles.

Their decompositions differ.

Comparison view C_effect was independently pinned before comparison and explicitly projects D.

The mapping witness verifies every load-bearing region.

Determine the TI disposition and what happens to the decomposition difference.

## Q10 — Lawful alternate decompositions under an effect view

One source-anchored transition has two lawful decompositions, D1 and D2, with identical source, target, K, deltas and B.

An independently pinned effect view declares D and O non-load-bearing.

Determine whether the decomposition difference alone blocks scoped TI and whether it should remain represented.

## Q11 — Decomposition is load-bearing

The same transition pair is compared under C_process, which explicitly makes D and O load-bearing.

D1 is a linear four-stage chain.
D2 is a branching three-stage partial order.
No isomorphism exists between the declared D/O structures.

Determine the TI disposition and whether D/O supply a concrete breaker.

## Q12 — QU-bearing structural correspondence versus actual realization

Two transition regions contain qualified QU structures with corresponding open roles, constraints and interfaces under a pinned view.

Their actual future realizations have not occurred and are not known equal.

Determine whether qualified structural transition correspondence may be supported and whether equality of actual QU realizations follows.

## Q13 — TI versus natural identity

A qualified TI is established between transitions involving subjects A and B.

No NEI identity theorem, model-family result, or other identity authority is supplied.

Determine whether NEI SAME follows from TI and whether a natural-identity conclusion requires NEI authority.

## Q14 — Profile qualification versus DTS base

A transition is validly represented under DTS base semantics.

A separately versioned DPO rewrite profile fails one of its own profile-specific conditions.

Determine whether that profile result by itself determines DTS base qualification and whether base/profile qualification burdens are separate.

## Q15 — Seductive false correspondence

TA and TB use the same action labels and have equal counts of introduced/removed relations.

Under the pinned comparison view, a boundary role is load-bearing.

TA maps input -> result.
TB maps control -> result, and no lawful boundary-role mapping exists.

Determine the TI disposition and whether surface labels/counts are sufficient.

## Q16 — Circular projection choice

An investigator wants TA and TB to be TI.

After observing that their ordering structures differ, the investigator creates a new comparison view that projects ordering solely so the desired TI will succeed.

No independent authority for that view existed before the target claim.

Determine whether this qualifies as admissible TI evidence.

## Q17 — Incomplete observation with no QU object

Only the source and target snapshots of a process were observed.

An unobserved intermediate change may affect the stated transition claim.

No QU object is present and no closure authority establishes completeness.

Determine whether absence of QU proves the transition complete and the status of the stronger completeness claim.

## Q18 — QU wholly inside qualified projected regions

Before comparing TA and TB, view C was independently qualified.

C makes boundary roles and target concept load-bearing, while explicitly projecting source carrier representation, recognition mechanism, D and O.

TB contains QU only inside those projected regions. A separate ownership witness proves no QU can alter any load-bearing field, and every admissible realization has the same load-bearing target concept.

Determine whether the QU may remain projected residual structure and whether scoped TI may proceed without choosing one actual realization.

## Q19 — Transition observed before mechanism

An observation establishes G0 -> G1 plus a source-faithful delta.

The generating mechanism and cause are unknown and are not load-bearing for the stated transition-observation claim.

Determine whether the transition itself is validly representable before its mechanism is known and whether a known mechanism is required.

## Q20 — Role factorization versus invariants

TA and TB have the same counts of K, Delta+ and B roles.

Their load-bearing incidence topology differs.

No invariant theorem or structural mapping is supplied.

Determine whether DTS role factorization itself proves an invariant and whether matching role counts prove TI.
