# P versus NP — Discovery Protocol reapplication 0.1

**Status:** completed discovery reapplication; no P-vs-NP resolution
**Discovery authority:** qualified DP 0.7
**Primitive authority:** P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg
**Explicit assertion base:** ASSERTION_BASE_A0_0_2.md
**NEI semantic scope:** P_VS_NP_NEI_SCOPE_CONTRACT_0_1.md
**Native NEI template:** P_VS_NP_NEI_OVERLAY_0_5.isg
**Implicit index after this pass:** IMPLICIT_ASSERTION_INDEX_0_10.json
**Indexed admitted assertions:** 357
**Previous campaign synthesis:** P_VS_NP_IMPLICIT_NEI_DP08_RUN_0_4.md

The earlier DP08-named artifacts remain experimental campaign history.
This reapplication uses qualified DP 0.7 as discovery authority.

---

# 1. Primitive observation

After the bundle/NEI/A21 corrections, the authoritative terminal residual remains:

~~~text
given a functionally polynomial verifier V(x,w)
with polynomially bounded witness w,

decide

    exists w: V(x,w)

by a functional polynomial realization.
~~~

The corrected branching machine is genuinely branching.

No current NEI native record supplies a precomputed identity class.

No exact liveness/deadness oracle is available.

---

# 2. Observation exposed by the A21 correction

The rejected predecessor local-simulation equivalence preserved every legal transition.

Exact continuation dominance does not.

For existential acceptance:

~~~text
legal transition
    !=
acceptance-relevant transition.
~~~

A legal child whose continuation language is empty contributes no accepting suffix.

Therefore the primitive transition graph contains support that is semantically irrelevant to the declared Boolean objective.

This is the first new DP distinction.

---

# 3. Derived view — acceptance-relevant support cone

For residual p at one remaining horizon, define conceptually:

~~~text
LIVE(p,a)
IFF
NEXT(p,a)=p'
AND
E(p')=TRUE.
~~~

The exact continuation support of p is generated only by:

- current/empty acceptance;
- labels in LIVE(p,*);
- accepting continuation support below those children.

This is a **derived view**.

It is not a new Core primitive.

It is not currently a cheap object.

Exact LIVE access is exact Q-EXISTS access at each child and therefore is universally circular by IA-350.

---

# 4. Sound incomplete approximation — dead-support filtering

The non-circular route is one-sided.

Represent any cheap relation:

~~~text
DEADHAT(p,a)
    ->
the child under a is exactly dead.
~~~

DEADHAT may miss arbitrarily many dead children.

It must not mark a live child dead.

Then:

~~~text
legal support
    ->
remove only certified-dead support
    ->
safe obligation over-approximation of exact live support.
~~~

This produces A25:

~~~text
IA-345 dead child contributes no accepting support
IA-346 sound incomplete dead certificates permit filtering
IA-347 dead-filtered simulation -> true dominance
IA-348 all-legal and exact-live simulation are endpoint cases
IA-349 filtering can strictly improve local dominance proof
IA-350 exact universal deadness <-> existential closure
IA-351 incomplete dead certificates avoid that completeness burden
IA-352 polynomial filtered-simulation cover -> polynomial decision
IA-353 upper-abstraction emptiness -> dead certificate
IA-354 rejection invariant -> dead certificate.
~~~

---

# 5. QU refinement / safety result

Reapplying DP with the corrected fail-closed NEI/QU semantics gives a strict safety rule:

~~~text
prove dead robustly
    -> may remove

UNKNOWN
    -> must retain

INCOMPLETE
    -> must retain

failure to find a live witness
    -> must retain.
~~~

A26 records:

~~~text
IA-355 robust deadness across R(Q) is required
IA-356 UNKNOWN/INCOMPLETE cannot certify dead
IA-357 more sound dead certificates monotonically reduce obligations
IA-358 one false dead certificate can make simulation unsound
IA-359 empty upper abstraction can certify dead; empty lower abstraction cannot
IA-360 local negative evidence can prune inside a globally YES instance.
~~~

This uses QU as a preservation constraint rather than as an excuse to choose a convenient continuation realization.

---

# 6. Cross-topology bridge discovered

Previously the campaign kept:

- local dominance/simulation;
- rejection invariants;
- sound upper abstraction

as distinct sufficient mechanisms.

They remain distinct.

But DP now exposes an exact connector:

~~~text
negative invariant
or
upper abstraction proving emptiness

    ->

sound dead-child certificate

    ->

smaller local simulation obligation set

    ->

sound continuation dominance

    ->

safe pruning.
~~~

Thus negative evidence can improve a dominance-based positive search without becoming an exact global NO proof.

That connector was not explicit before the A21 correction.

---

# 7. Finite falsification result

A25's filtered-simulation law was sanity-checked over all deterministic labeled systems with:

~~~text
2 states
2 labels
horizon 2
NEXT values = invalid / state 0 / state 1
all CURRENT truth assignments.
~~~

There are:

~~~text
324 systems
1296 ordered state-pair exact comparisons.
~~~

Across every subset of actually dead edges used as a sound DEADHAT set:

~~~text
dead-filtered simulation admissions checked: 30,690
false dominance admissions:                    0.
~~~

With exact dead filtering:

~~~text
mismatches vs exact continuation dominance: 0 / 1296.
~~~

In:

~~~text
78 / 324 systems
~~~

dead filtering recognized strictly more dominance pairs than all-legal simulation.

This is finite sanity evidence only; A25 has direct inductive proofs.

---

# 8. Strong falsifier — all-live CNF family

The earlier CNF explicit-elimination support-growth family supplies an exact counterpressure.

For every complete assignment to its x variables:

- exactly one sign group remains unsatisfied by x literals;
- setting that group's private variables TRUE completes a model.

Therefore every partial x assignment is also extendible.

Hence:

~~~text
every x-prefix residual is live
every x-choice child is live
exact dead filter removes no x edge.
~~~

At the same time:

~~~text
explicit CNF variable elimination
    can materialize k^(2^d) clauses

while

an exact compact factorization exists.
~~~

Therefore:

~~~text
dead-support filtering
    !=
universal retained-support control.
~~~

It removes empty support.

It cannot compress a large family of mutually live alternatives.

This falsifier is recorded in:

CNF_TARGET_DEAD_SUPPORT_FALSIFIER_0_1.md

---

# 9. Revised interpretation of A/F/E

The prior positive-control comparison used:

~~~text
A = aggregate alternatives
F = force a coordinate
E = eliminate by exact transform.
~~~

DP 0.7 forbids treating these as an exclusive taxonomy.

The corrected primitive view is:

## A — semantic source

Every finite existential choice is fundamentally an OR/union over alternatives.

## F — degenerate aggregate after negative elimination

When all but one alternative are certified dead:

~~~text
OR(dead,...,survivor,...,dead)
    =
survivor.
~~~

Thus many forcing laws can be viewed as:

~~~text
existential aggregate
+
exact negative evidence.
~~~

This does not mean every operational forcing mechanism is identical.

## E — compiled aggregate

An exact elimination transform represents the same existential projection in another support language:

~~~text
F(0,y) OR F(1,y)
    ->
exact projected representation over y.
~~~

Its usefulness depends on retained representation size and next-operation closure.

Thus A/F/E are overlapping derived views over primitive existential disjunction, not three mutually exclusive primitives.

---

# 10. Continuation-support reduction ladder

Combining A15, A17, A23, A25 and the CNF falsifier exposes a useful derived ladder over continuation sets.

For live/reachable residual support C_i:

## Level 0 — emptiness

~~~text
C_i = empty
    ->
delete exactly.
~~~

Tool:
dead certificate / rejection invariant / empty upper abstraction.

## Level 1 — equality

~~~text
C_i = C_j
    ->
merge.
~~~

Tool:
Q-RESIDUAL scoped equality / exact invariant.

## Level 2 — inclusion

~~~text
C_i subseteq C_j
    ->
delete C_i while retaining C_j.
~~~

Tool:
continuation dominance / sound simulation.

## Level 3 — factorized union

When live supports are neither equal nor dominated:

~~~text
C_1 union ... union C_k
~~~

may still admit a compact exact shared/factorized representation.

Tool:
separator/factorization / exact transformation / reusable recurrence.

## Level 4 — objective homomorphic image

If exact set structure is unnecessary, compute only the required aggregate:

~~~text
nonempty
minimum length
count
or another exact homomorphic image.
~~~

Tool:
aggregate recurrence/circuit.

This ladder is a discovery view.

It is not claimed exhaustive for all polynomial algorithms.

---

# 11. Why maximum NEI quotienting moves further down the priority list

The corrected native NEI overlay contains no instantiated exact residual classes.

Exact universal Q-RESIDUAL identity remains equivalent in strength to the original closure problem.

The new support ladder shows that equality is only one useful relation:

~~~text
empty
equality
inclusion
factorization
aggregate image.
~~~

Therefore discovery should not begin by trying to compute the coarsest exact identity quotient.

Prefer locally certified relations that are:

- cheap;
- sound;
- incomplete if necessary;
- sufficient to reduce retained support.

NEI remains essential for preventing false merges and scope leakage.

It is not itself a free compression oracle.

---

# 12. Strongest current non-circular lead

The highest-value combined shape after this DP pass is:

~~~text
cheap sound negative evidence
    removes provably dead support

then

cheap sound inclusion/equivalence evidence
    removes dominated/duplicate support

then

exact stable factorization / aggregate sharing
    compresses the remaining mutually live incomparable support

while

retained representation
and
next-operation cost
remain polynomial.
~~~

This is more precise than the earlier generic statement:

~~~text
cheap sound incomplete structure
+
polynomial retained support.
~~~

It identifies **what kind of support survives each reduction stage**.

---

# 13. Critical circularity boundaries

Do not propose as a stand-alone solution:

~~~text
compute exact live children

compute exact dead children

compute exact Q-EXISTS

compute exact Q-RESIDUAL identity

compute exact continuation dominance

compute the minimum exact factorization.
~~~

At universal scope several of those are already equivalent in strength to the unresolved existential closure or otherwise require the missing accessibility theorem.

The useful target is a restricted structural certificate that does not classify every case.

---

# 14. New falsifiers

A candidate dead-filtering law fails if:

1. it treats UNKNOWN as dead;
2. it treats INCOMPLETE as dead;
3. it infers dead from absence of a discovered witness;
4. one admissible QU realization makes the child live;
5. a supposedly dead child has one exact accepting suffix.

A candidate support-compression law fails as a universal explanation if:

1. all branches remain live and it only removes dead support;
2. equality/dominance do not cover the live family;
3. factorized support expands before rank exhaustion;
4. a compact form requires exponential expansion for the next exact operation;
5. the representation is chosen using the unknown target answer.

---

# 15. Next exact experiment

Apply the support ladder directly to the primitive CNF target.

For each source-ordered variable layer measure:

~~~text
legal child count

provably dead child count
    by exact local contradiction / sound upper abstraction

remaining live/unknown child count

exact equality merges found by local certificates

exact dominance prunes found by local certificates

factor boundary size

factor representation size

projection cost

post-projection factor size

next-operation cost.
~~~

Use the all-live CNF-IA-011 family as a mandatory negative control:

~~~text
dead filtering must report zero x-edge prunes.
~~~

Use restricted families where local contradiction exists as positive controls.

The target question becomes:

> After safe zero/equality/inclusion reductions, can primitive incidence expose a factorization language closed under the next projection with polynomial retained support?

---

# 16. Discovery disposition

## Exact new consequences

Admitted:

~~~text
A25 IA-345..354
A26 IA-355..360.
~~~

Current machine index:

~~~text
IMPLICIT_ASSERTION_INDEX_0_10.json

357 admitted
0 missing refs
0 support cycles
max normalized depth 11.
~~~

## Derived discovery views

New to the current IsoGraph campaign:

~~~text
acceptance-relevant support cone
dead-support filtering bridge
continuation-support reduction ladder
A/F/E as overlapping views of existential union.
~~~

These are not promoted to Core primitives.

## External novelty

UNREVIEWED.

No external novelty claim is made and no broad literature search was performed.

---

# 17. Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
