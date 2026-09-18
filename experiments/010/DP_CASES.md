# Experiment 010 — Discovery Protocol Qualification Cases

These cases are public cold-visible structures. Analyze them using Core 0.17 plus Discovery Protocols 0.1-0.4. QU/NEI authority is available only where a case explicitly supplies it.

## D01 — Misleading labels, same load-bearing structure

Left:
```text
L1 "archive" -> L2 "compress" -> L3 "publish"
constraint: L2 preserves ordered pair (source,target)
boundary: input at L1, output at L3
```

Right:
```text
R1 "publish" -> R2 "archive" -> R3 "compress"
constraint: R2 preserves ordered pair (source,target)
boundary: input at R1, output at R3
```

Names are declared non-rigid. Incidence, dependency direction, preservation constraint, and boundaries are the comparison signature.

Question: should lexical mismatch/swapping defeat the structural correspondence?

## D02 — Same labels, concrete structural breaker

Left and right use identical labels `load -> transform -> emit`.

Left constraint:
```text
transform preserves ordered incidence (a,b)
```

Right constraint:
```text
transform necessarily reverses it to (b,a)
```

The active comparison requires ordered-incidence preservation.

Question: is rejection justified? If so, identify the separator kind and failed obligation.

## D03 — Different machinery only

Left performs a role in one atomic theorem-like step.
Right performs the analogous role by three explicit operational steps.
No included boundary, incidence, multiplicity, constraint, dependency direction, or reconstruction obligation is known to fail.

Question: may "different machinery" alone terminate the candidate as a structural breaker?

## D04 — Cross-residual correspondence must re-enter discovery

A candidate already maps:

```text
A1 <-> B1     upstream boundary role
A5 <-> B7     downstream reconstruction role
```

The unmatched middle is:

```text
Alpha:
A2 -> A3 -> A4

Beta:
B2 -> B3 -> B4 -> B5 -> B6
```

A bounded cross-residual pass finds:

```text
A3 <-> subgraph(B3,B4,B5)
```

as a role correspondence. No concrete breaker has yet been found.

Question: what must happen to that correspondence before the same residual can justify terminal rejection?

## D05 — Rigid application authority

Two candidate structures match under the ordinary structural signature. The active application comparison profile explicitly declares field `jurisdiction_code` rigid and identity-separating for this application-level comparison. The two frozen values differ.

No natural-identity conclusion is being claimed.

Question: may the branch be rejected, and under what separator kind?

## D06 — Missing identity authority

Two structures exhibit strong role correspondence but use different SIs, different source files, and different factorization depth.

There is no qualified NEI DISTINCT result and no rigid application authority making those differences load-bearing.

Question: may the branch be rejected on natural distinctness or relabeled as a generic structural breaker?

## D07 — Cost-bounded stop

A candidate survives immediate structural checks. The next recursive factorization pass is permitted but exceeds the frozen resource budget. No separating invariant, concrete structural breaker, rigid authority, or qualified NEI DISTINCT result exists.

Question: what terminal discovery state is legal?

## D08 — Fresh one-to-subgraph proof-topology holdout

Alpha:
```text
A01: two admissible candidates x,y are each related to the same anchor r
A02: each candidate is within one local budget h of r
A03: a composition law bounds separation(x,y) by 2h
A04: admissibility requires any genuinely distinct valid pair to have separation greater than 2h
A05: A03 and A04 cannot both hold for a distinct pair
A06: therefore at most one admissible candidate can occupy the anchor role
```

Beta:
```text
B01: two admissible records p,q both map to the same observation o
B02: each record has residual cost at most k relative to o
B03: introduce a bridge object carrying the two residual witnesses
B04: compose the bridge to obtain cost(p,q) <= cost(p,o)+cost(o,q)
B05: the residual budgets imply cost(p,q) <= 2k
B06: admissibility requires inequivalent valid records to have cost(p,q) > 2k
B07: B05 and B06 contradict inequivalence
B08: therefore the observation role has at most one admissible equivalence class
```

The comparison view maps `h <-> k` parametrically, treats names as non-rigid, and includes dependency direction, inequality direction, candidate/anchor roles, contradiction role, and terminal uniqueness role. It does not assert that Alpha and Beta use the same intermediate objects or algorithm.

Question: discover the strongest defensible common proof topology, including any one-node-to-subgraph correspondence and method-specific residual.
