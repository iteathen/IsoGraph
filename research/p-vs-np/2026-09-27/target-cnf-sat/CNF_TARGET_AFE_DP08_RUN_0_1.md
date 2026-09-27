# CNF target A/F/E projection — DP run 0.1

**Status:** hard-target discovery synthesis; no P-vs-NP theorem
**Frozen discovery input:** CNF_TARGET_DISCOVERY_INPUT_MANIFEST_0_1.json
**Implicit closure:** CNF_TARGET_IMPLICIT_ASSERTIONS_0_1.md
**NEI/QU overlay:** CNF_TARGET_NEI_QU_0_1.md
**Positive-control parent:** ../positive-controls/POSITIVE_CONTROL_COMMON_CORE_0_1.md

## 1. Target primitive residual

The primitive target exposes only:

~~~text
finite variable identities
finite clause identities
positive/negative literal incidences
existential assignment membership
AND across clauses
OR within clauses.
~~~

The projection therefore tests whether the positive-control coordinate-handling modes arise from those primitive relations without importing a solving architecture.

They do.

## 2. A — exact aggregation is present

For one variable x:

~~~text
exists x F(x,y)
IFF
F(0,y) OR F(1,y).
~~~

This is exact and locally accessible.

But recursively materializing both residual alternatives has no recovered universal polynomial sharing/factorization law.

Therefore:

~~~text
A exactness: PASS
A local access: PASS
A polynomial retained support: UNESTABLISHED.
~~~

T4 is not recovered universally: an exact recurrence exists, but no polynomial-size recurrence DAG has been derived for arbitrary target instances.

## 3. F — exact local forcing is present but incomplete

A clause with exactly one unresolved literal forces that literal in every satisfying extension.

A fully false clause proves rejection.

But:

~~~text
(x OR y)
AND
(NOT x OR NOT y)
~~~

has no initial local force and is not decided.

Therefore:

~~~text
F soundness: PASS
F local access: PASS
F completeness: FAIL.
~~~

This is a useful sound incomplete law, but no polynomial retained-frontier theorem follows from it alone.

## 4. E — exact projected elimination is present

Pairing clauses containing opposite signs of x yields an exact projected support over the remaining variables.

The proof is primitive Boolean case analysis, not a high-level imported theorem.

Each local step supplies a transformation-local Q-CNF-PROJECTION SAME certificate.

Therefore:

~~~text
E semantic exactness: PASS
E local construction: polynomial in current explicit support
E source-rank progress: consumes one variable
E polynomial retained support: FAILS for explicit CNF representation under the tested order.
~~~

## 5. Exact fixed-order support explosion

CNF-IA-011 constructs a family with:

~~~text
2^d * k input clauses
~~~

such that eliminating source-ordered variables x_1,...,x_d produces:

~~~text
k^(2^d)
~~~

distinct, non-tautological, pairwise non-subsuming explicit clauses.

For k=2:

~~~text
input clauses  = 2^(d+1)
output clauses = 2^(2^d).
~~~

Thus exact local elimination plus a polynomially bounded number of rank steps does not imply polynomial explicit-clause support.

This is an exact falsifier of a too-weak RLEST antecedent:

~~~text
exact local transform
+
polynomial progress rank

does NOT imply

polynomial total construction.
~~~

The retained-support bound is load-bearing.

## 6. Alternate interpretation prevents a false lower bound

DP requires testing alternate exact representations.

The same explosion family has a compact factorization:

~~~text
OR over original sign groups sigma:
    AND of all k private variables in group sigma.
~~~

Its size is proportional to the original group data.

Therefore:

~~~text
explicit CNF support explosion
    !=
representation-independent semantic explosion
    !=
lower bound against all deterministic computation.
~~~

This is the strongest falsifier produced by the hard-target projection so far.

Any argument that treats the CNF-IA-011 clause count as an inherent complexity lower bound is rejected.

## 7. Refined support metric

The positive-control quantity:

~~~text
W_i = retained exact support width/size
~~~

must be parameterized by representation authority:

~~~text
W_i(R)
=
retained exact support size
under representation/factorization family R.
~~~

A useful R must satisfy all of:

1. exact target preservation;
2. polynomial construction from the current support;
3. polynomial-size retained representation;
4. polynomial next-operation access;
5. a polynomial number of source-ranked stages.

A compact form that must be fully expanded before every next step does not satisfy the accessibility requirement.

## 8. T1-T5 target status

### T1 — sound local dominance / simulation

Clause subsumption supplies a local redundancy law.

It is exact but does not bound the whole retained support.

**Status:** partial/local recovery only.

### T2 — polynomial sufficient statistic / bounded separator

The specific explosion family has a compact exact factorization.

No universal polynomial sufficient statistic/factorization is recovered.

**Status:** restricted witness only.

### T3 — polynomial hitting set

No polynomial family of complete assignments guaranteed to hit every satisfiable target instance is recovered.

**Status:** not recovered.

### T4 — polynomial aggregate recurrence DAG

Exact Boolean aggregation is present, but a polynomial universal DAG bound is not recovered.

**Status:** not recovered universally.

### T5 — constructible rejection invariant

An empty clause is an exact rejection invariant.

Local operations may expose one, but no polynomial universal construction is recovered.

**Status:** local invariant only.

## 9. Strongest surviving target lead

The hard-target projection changes the search target from:

~~~text
find an exact elimination law
~~~

to:

~~~text
find an exact factorization family R
that is closed under the required local existential-elimination operation
with polynomial size and polynomial operation cost.
~~~

But this must pass the circularity firewall.

A universal R with all of those properties would itself yield the unresolved bounded-existential closure.

Therefore it is not progress merely to define such an R semantically.

The high-value search is for **primitive structural conditions** that force such stable compact factorization without invoking the target truth oracle.

## 10. New non-circular subtargets

The current graph suggests testing restricted primitive causes of stable factorization:

~~~text
bounded interaction boundary
local module independence
sound clause/support dominance
constructible separator state
reusable aggregate substructure
transformation-local NEI certificates.
~~~

These are discovery prompts, not universal admissions.

The most important measurable falsifier is:

~~~text
does the factorized support or its operation interface expand superpolynomially
before the source coordinate rank is exhausted?
~~~

## 11. Positive/negative asymmetry remains

YES still has one complete satisfying assignment.

NO can arise from an empty clause after exact transformations.

But the difficulty is constructing either terminal object without expanding the retained support.

The hard-target projection therefore leaves the original polarity asymmetry intact.

## 12. What has actually been learned

The positive controls and target projection together establish:

~~~text
1. exact local elimination is not rare;
2. polynomial progress rank is not enough;
3. fixed-syntax support can explode;
4. fixed-syntax explosion can be an artifact of representation;
5. compact representation alone is not enough unless future exact operations stay cheap;
6. local semantic identity certificates can avoid global identity classification.
~~~

This is a narrower and more falsifiable search space than “find compression.”

## 13. Novelty classification

All Boolean/CNF transformation facts are treated as **STANDARD_KNOWN_CONSEQUENCE** unless separately reviewed.

The RLEST/AFE comparison and representation-relative support framing are **NEW_TO_CURRENT_ISOGRAPH_CAMPAIGN**.

External novelty is **UNREVIEWED**.

## 14. Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
