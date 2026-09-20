# Experiment 016 — NEI 0.4 Derived-Identity / QU / Bayesian-Evidence Holdout

**Purpose:** fresh focused qualification of NEI 0.4 successor semantics.

## Q01 — SAME must emerge, not be declared

Domain facts:

- every component has exactly one immutable serial;
- no two distinct components may have the same serial;
- observations A and B are valid observations of components;
- A.serial = 17;
- B.serial = 17.

The identity query context specifies the component carrier, observations, domain laws and exact evidence. It contains no field that labels any relation "identity-preserving" or declares A/B SAME.

Determine the exact NEI result and whether the answer was profile-declared or derived from the admissible identity models.

## Q02 — DISTINCT must emerge, not be declared

Domain facts:

- a physical specimen occupies exactly one location at a given instant;
- two distinct locations L and R are disjoint;
- observations A and B refer to specimens at the same exact instant;
- A is at L;
- B is at R.

The identity query context contains no "identity-separating" answer tag.

Determine the exact NEI result.

## Q03 — Huge positive Bayes factor is not SAME

The exact qualified identity-model family contains at least one SAME model and at least one DISTINCT model.

Observation E has qualified Bayes factor:

```text
BF_I(E) = 1,000,000,000
```

favoring identity.

No exact theorem eliminates the DISTINCT models.

Determine exact NEI status, evidence direction, and whether a probability/evidence threshold may convert this into SAME.

## Q04 — Huge negative Bayes factor is not DISTINCT

The exact qualified identity-model family again contains both SAME and DISTINCT models.

Observation E has:

```text
BF_I(E) = 0.000000001
```

No exact theorem eliminates the SAME models.

Determine exact NEI status and evidence direction.

## Q05 — Bayes factor versus posterior

One observation has fixed:

```text
BF = 10
```

Two qualified prior-odds contexts are considered:

```text
A: prior odds = 1
B: prior odds = 1/9
```

The exact identity-model family still admits both identity outcomes.

Report the Bayes factor, posterior odds in A and B, and exact NEI status.

## Q06 — Correlated evidence cannot be naively multiplied

One physical sensor event S is copied into three files E1, E2, E3.

All three files display the same observation. Their provenance explicitly records that all derive from S and contain no independent measurement.

A modeler has computed the same positive marginal Bayes factor for each file considered alone.

Determine whether the three log-Bayes weights may be added as independent evidence, whether a joint/dependence model is required, and the number of independent evidence events represented.

## Q07 — Qualified conditional independence permits factorization

Two observations E1 and E2 have qualified Bayes factors:

```text
BF1 = 3
BF2 = 5
```

A qualified probability authority states E1 and E2 are conditionally independent under both I and not-I given the pinned context C.

Determine whether factorization is allowed and the joint Bayes factor.

## Q08 — QU-dependent evidence without a probability distribution

Qualified QU state Q has exactly two admissible realizations r1 and r2.

For evidence E:

```text
log BF(E | r1) = +4
log BF(E | r2) = -2
```

No probability distribution over R(Q) is supplied or authorized.

Determine whether NEI may produce one scalar marginal Bayes factor, the evidence direction, and the information-preserving representation required.

## Q09 — Robust positive evidence across QU is still not exact SAME

A qualified QU state has several admissible realizations.

For every admissible realization r:

```text
log BF(E | r) > 0
```

but the magnitudes differ.

The exact identity-model family still contains both SAME and DISTINCT models.

Determine the robust evidence direction and whether exact SAME follows.

## Q10 — Lawful marginalization over QU

A qualified probability authority supplies:

```text
P(r1 | I)     = 0.5
P(r2 | I)     = 0.5
P(E | I,r1)   = 0.8
P(E | I,r2)   = 0.4

P(r1 | not-I)   = 0.25
P(r2 | not-I)   = 0.75
P(E | not-I,r1) = 0.4
P(E | not-I,r2) = 0.2
```

The exact identity-model family still admits both SAME and DISTINCT.

Determine whether marginalization is allowed, both marginal likelihoods, the Bayes factor, and exact NEI status.

## Q11 — Missing identity-relevant QU fails incomplete

The source explicitly says an unresolved relation U may change whether A and B are one identity.

The query packet omits U's possibility universe, constraints and closure authority. No exact theorem removes U from the identity burden.

Determine the identity status, whether semantic UNKNOWN has been established, and whether U may simply be ignored.

## Q12 — Shared unknown versus distinct equal-valued unknowns

Compare:

```text
Shared:
    A.x -> u
    B.x -> u
```

with:

```text
SplitEqual:
    A.x -> u1
    B.x -> u2
    u1 and u2 are distinct represented referents
    constraint value(u1) = value(u2)
```

Determine whether these are equivalent information states, whether Shared preserves a shared referent fact, and whether equal value alone means u1/u2 are the same referent.

## Q13 — Exact identity theorem is exact evidence, not an infinite score

An exact qualified theorem over the pinned domain proves that A and B are one identity and eliminates every admissible DISTINCT model.

No probabilistic likelihood model is needed.

Determine the NEI result, whether a Bayes/log-Bayes weight must be fabricated, and how the theorem is represented.

## Q14 — Semantic UNKNOWN may coexist with non-neutral posterior

A complete exact identity-model family contains both SAME and DISTINCT models.

A separately qualified probability model and prior yield:

```text
P(I | E) = 0.9
```

Determine exact NEI status and whether the non-neutral posterior can coexist with it.

## Q15 — Scoped quotient does not silently become global identity

Under downstream scope S, an exact quotient proves:

```text
Q_S(A) = Q_S(B)
```

A wider natural-identity query includes qualified QU structure admitting both SAME and DISTINCT global identity models.

Determine whether scoped equivalence is established, the global NEI status, and whether the scoped result may be promoted to global SAME.

## Q16 — Duplicated evidence lineage is not independent evidence

The same frozen observation O appears verbatim in five artifacts.

Provenance states that all five artifacts descend from the same evidence event and no independent reproduction occurred.

Determine the independent evidence-event count, whether their Bayes factors may be multiplied as five independent observations, and whether lineage must remain represented.

## Q17 — Desired SAME cannot choose its QU restriction

Original qualified QU admits realizations compatible with SAME and DISTINCT.

A proposed proof:

```text
want SAME
-> restrict Q to SAME-compatible realizations
-> fit likelihoods on restricted Q
-> cite resulting positive evidence
-> claim SAME
```

Determine admissibility, whether the original QU changes, and whether SAME is established.

## Q18 — Query context asks the question; facts determine the answer

A clean identity query context supplies:

- carrier/domain;
- A and B anchors;
- scope;
- exact observations;
- domain constraints;
- complete closure authority.

It contains no identity-preserving/separating answer tags.

The exact domain facts are the same uniqueness facts as Q01 and force one identity model for A/B.

Determine whether the query context contains an answer tag, whether a result can still be derived, and the exact NEI result.
