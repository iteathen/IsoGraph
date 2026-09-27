# Glycan cleavage implicit assertions A2 — NEI-fed closure pass 2

**Status:** exact implicit research assertions admitted after NEI pass 1
**Date:** 2026-09-27
**Inputs:** A0 + A1 + GLYCAN_NEI_PASS_1_0_1.md
**Support mode:** EXACT only
**QU dependency:** none in the frozen 0.1 scope

This pass uses the exact state/future-behavior identity scopes from NEI pass 1 but does not promote scoped identity to global raw-object identity.

---

## Lossless state structure

### G-IA040 — every reachable state is a rooted ancestor-closed subtree containing the target

The initial state RL contains root and is ancestor-closed by the represented parent constraints.

G-IA028/G-IA029 show that every trajectory preserves TG membership and ancestor closure.

Therefore every reachable extensional state is a finite rooted ancestor-closed represented subtree containing TG.

### G-IA041 — the terminal frontier of a valid state is an antichain

Define the frontier of valid state S as the set of represented terminal nodes in S.

No two distinct frontier nodes can stand in a strict ancestor relation.

Otherwise the ancestor frontier node would have a represented child on the path to the descendant and would not be terminal.

### G-IA042 — a valid state is exactly reconstructible from its frontier

For every node x in a finite valid state S:

- either x is terminal;
- or repeatedly choose a child still in S;
- finiteness forces the descent to reach a terminal f in S;
- x lies on the unique parent chain from f to root.

Thus:

~~~text
S
=
union of the represented ancestor chains
of all frontier nodes of S.
~~~

No state information is lost by replacing a valid state with its exact terminal frontier plus the fixed parent authority.

### G-IA043 — equal frontiers iff equal valid state values

For valid states S1,S2:

~~~text
frontier(S1) = frontier(S2)
IFF
181003(S1,S2).
~~~

Forward: G-IA042 reconstructs the same ancestor closure.

Reverse: extensional state equality gives the same terminal predicate.

This creates a lossless alternate state representation; it is not a new primitive.

### G-IA044 — local eligibility is a frontier filter

For valid S:

~~~text
eligible(e,S,r)
IFF
r in frontier(S)
AND
r notin TG
AND
M(e,r).
~~~

Thus all immediate microscopic choices are visible at the frontier.

---

## Monotone continuation structure

### G-IA045 — every fixed treatment suffix is monotone on valid states

Fix a finite treatment sequence T.

For valid ancestor-closed states S1,S2 with TG contained in both:

~~~text
S1 subset S2
->
execute(T,S1) subset execute(T,S2).
~~~

**Witness.** Structural induction on T using phase monotonicity G-IA026.

### G-IA046 — define the exact solving-suffix language of a state

For one fixed instance define:

~~~text
L(S)
=
{ finite treatment sequences T |
  execute(T,S) =ext TG }.
~~~

This is a derived exact relation over the finite operator alphabet and finite sequence carrier.

### G-IA047 — smaller valid states continuation-dominate larger valid states

For valid states:

~~~text
S1 subset S2
->
L(S2) subset L(S1).
~~~

**Witness.** Let T solve S2. By G-IA045:

~~~text
TG subset execute(T,S1)
   subset execute(T,S2)
   = TG.
~~~

Hence execute(T,S1)=TG.

This is exact reachability dominance, not identity.

### G-IA048 — minimum remaining treatment count is monotone

Define:

~~~text
D(S)
=
minimum LENGTH(T) over T in L(S),
or INF when L(S) is empty.
~~~

Then:

~~~text
S1 subset S2
->
D(S1) <= D(S2)
~~~

under the exact extended-order convention where every finite natural is <= INF.

This follows immediately from G-IA047.

### G-IA049 — prefix state/cost dominance

Suppose two prefixes from the frozen initial state reach valid states S1,S2 at costs c1,c2.

If:

~~~text
S1 subset S2
AND
c1 <= c2
~~~

then prefix 2 cannot produce a strictly better total treatment count than prefix 1.

Every suffix available to prefix 2 is also available to prefix 1, and prefix 1 has no larger accumulated cost.

### G-IA050 — equal-state lower-cost prefix strictly dominates higher-cost history

If two prefixes reach Q-G-STATE SAME states and one prefix has smaller treatment count, the longer prefix cannot belong to a minimum solution.

This is G-IA049 with extensional equality in both subset directions.

### G-IA051 — one best cost per extensional state is sufficient for optimal-value search

For the task:

~~~text
compute the minimum treatment count
and retain at least one optimum witness
~~~

a search may keep only the smallest discovered prefix cost for each Q-G-STATE/Q-G-CONTINUATION class.

Any higher-cost history reaching the same state is dominated by G-IA050.

**Enumeration boundary.** The frozen source asks for every minimum trajectory. Equal-cost alternate histories must therefore remain recoverable when complete optimum enumeration is required.

### G-IA052 — the exact frontier can key the same safe state quotient

By G-IA043:

~~~text
same exact frontier
IFF
same Q-G-STATE value
IFF
same Q-G-CONTINUATION value.
~~~

Thus a lossless frontier representation may replace the full ancestor-closed state representation for state indexing, provided the fixed parent structure remains available for reconstruction.

---

## NEI-supported operator substitution

### G-IA053 — phase-transformer SAME permits operator replacement in any sequence context

If e1 and e2 are Q-G-PHASE-TRANSFORMER SAME, then for any valid state S and any common suffix U:

~~~text
execute(e1 :: U,S)
    =ext
execute(e2 :: U,S).
~~~

A common prefix may also precede the replacement because it merely determines the valid current state supplied to the identical transformer values.

### G-IA054 — susceptibility-vector SAME is a sufficient replacement certificate

G-N005 + G-N006 + G-IA053 yield:

~~~text
Q-G-SUSCEPTIBILITY SAME(e1,e2)
->
e1 and e2 are interchangeable
at every treatment position
for the frozen instance.
~~~

This is transformation-local interchangeability, not global operator identity.

### G-IA055 — an identity phase transformer is removable from every context

If:

~~~text
forall valid S:
    C_e(S) =ext S
~~~

then deleting occurrence e from any trajectory preserves the final extensional state.

Therefore no minimum-length trajectory contains such an occurrence.

G-IA037 is one sufficient source-level condition for this identity transformer.

### G-IA056 — sequence-transformer SAME is a composition congruence

If T1 and T2 are Q-G-SEQUENCE-TRANSFORMER SAME, then for arbitrary finite prefix P and suffix U:

~~~text
P ++ T1 ++ U
and
P ++ T2 ++ U
~~~

are also Q-G-SEQUENCE-TRANSFORMER SAME.

**Witness.** Deterministic extensional state transformers compose associatively.

### G-IA057 — a shorter transformer-equivalent segment excludes the longer segment from any optimum

If:

~~~text
Q-G-SEQUENCE-TRANSFORMER SAME(Tshort,Tlong)
AND
LENGTH(Tshort) < LENGTH(Tlong)
~~~

then no minimum trajectory contains Tlong as a replaceable contiguous segment.

Replace it by Tshort using G-IA056 and preserve the final state at lower cost.

Adjacent duplicate elimination G-IA032 is one instance.

---

## Finite transformation algebra

### G-IA058 — treatment sequences generate a finite transformation monoid on valid state values

For one frozen finite instance:

- Q-G-STATE has finitely many values because every state is a subset of finite RL;
- every treatment operator denotes one total deterministic extensional transformer C_e by G-IA019/G-IA020;
- the empty sequence denotes the identity transformation;
- finite sequence execution is associative composition.

Therefore treatment sequences generate a finite transformation monoid on the exact state quotient.

Every generator C_e is idempotent by G-IA023.

This is a derived algebraic view, not Core authority.

### G-IA059 — an optimal trajectory never revisits an extensional state

Trajectory states form a subset-decreasing chain by G-IA027.

If a later state equaled an earlier state extensionally, every intervening subset step would also have to preserve that same set.

The intervening segment is therefore removable by G-IA030, contradicting optimality.

### G-IA060 — an optimum is a strict chain of state reductions

Every treatment occurrence in an optimal trajectory strictly reduces the current extensional state.

Equivalently:

~~~text
S0 proper-superset S1 proper-superset ... proper-superset Sk=TG.
~~~

This restates G-IA033/G-IA059 as a state-order property.

---

## Exact branch independence and commutation

### G-IA061 — strict ancestor relation is exact finite transitive parent closure

Define:

~~~text
ANC(a,d)
~~~

iff a occurs strictly above d on the unique finite parent chain from d to root.

G-IA001/G-IA002 make ANC exact and acyclic.

### G-IA062 — define cross-ancestry independence of two operators

For represented operators e and f, define CROSS_INDEPENDENT(e,f) when no two distinct non-target sites r,s satisfy:

~~~text
M(e,r)
AND
M(f,s)
AND
(
    ANC(r,s)
    OR
    ANC(s,r)
).
~~~

Shared susceptibility at the same raw site is permitted by this condition.

The definition depends only on frozen P,M,TG.

### G-IA063 — cross-independent phase transformers commute

If CROSS_INDEPENDENT(e,f), then for every valid state S:

~~~text
C_e(C_f(S))
    =ext
C_f(C_e(S)).
~~~

**Witness.** An e-deletion cannot be the descendant blocker whose removal newly exposes a distinct f-matched ancestor, and symmetrically for f. Any site matched by both operators and immediately removable may be deleted by either first with the same extensional effect. Independent branch deletions form repeated local diamonds. Finite termination joins the complete phase orders.

This is a sufficient condition, not claimed necessary.

### G-IA064 — adjacent cross-independent operators may swap at equal cost

G-IA063 gives:

~~~text
[e,f]
and
[f,e]
~~~

Q-G-SEQUENCE-TRANSFORMER SAME whenever CROSS_INDEPENDENT(e,f).

Their lengths are equal.

### G-IA065 — commuting-swap closure preserves the exact sequence transformer

Any two finite trajectories related by a finite sequence of adjacent swaps, each justified by an exact phase-commutation theorem at that scope, have the same Q-G-SEQUENCE-TRANSFORMER value.

No canonical ordering is required.

---

## Susceptibility and phase dominance

### G-IA066 — susceptibility inclusion reverses into survivor inclusion

Suppose:

~~~text
forall r in RL:
    M(e1,r) -> M(e2,r).
~~~

Then for every valid state S:

~~~text
C_e2(S) subset C_e1(S).
~~~

Interpretation: e2 can delete every site e1 can delete, and possibly more.

**Witness.** Use the survivor equation G-IA025 bottom-up. Every survival reason under the broader susceptibility e2 is also a survival reason under e1; e2 has fewer nonmatching survival cases.

### G-IA067 — state-local stronger phase output dominates weaker phase output for the objective

At one current state S, if:

~~~text
C_e2(S) subset C_e1(S)
~~~

then after paying the same one-treatment cost, every solving suffix available after e1 is also a solving suffix after e2 by G-IA047.

Thus choosing e2 cannot produce a worse minimum remaining treatment count than choosing e1.

### G-IA068 — susceptibility superset gives global objective dominance of one treatment choice

G-IA066 + G-IA067 give:

~~~text
M-column(e1) subset M-column(e2)
->
e2 is never worse than e1
as a one-treatment choice
at any valid state.
~~~

This supports value-preserving branch pruning when only an optimum value or one optimum witness is required.

### G-IA069 — objective dominance does not erase alternate minimum trajectories

The frozen source asks for every minimum treatment trajectory.

A dominated e1 branch may still tie an e2 branch in total minimum length.

Therefore objective-dominance pruning is safe for:

~~~text
minimum value
or one optimum witness
~~~

but complete enumeration of all raw minimum sequences requires preserving or reconstructing tied dominated alternatives.

This boundary is load-bearing.

### G-IA070 — exact quotient search can separate value search from all-witness expansion

For minimum-value computation, search may operate over:

- Q-G-STATE classes, keyed losslessly by frontiers;
- Q-G-PHASE-TRANSFORMER operator classes;
- objective dominance G-IA049/G-IA067;
- exact commutation/transformer equivalence.

For enumeration of every minimum raw trajectory, the quotient result must retain enough witness-family provenance to expand all equal-cost raw representatives.

This is an exact consequence of Core witness-family discipline plus the source objective.

---

## Pass-2 disposition

~~~text
new exact implicit assertions:       31
cumulative exact implicit assertions:70
new NEI-fed substitution laws:        5
new dominance laws:                   6
new commutation laws:                 5
new lossless state-view laws:         5
QU-dependent assertions:              0
~~~

The next stage is NEI pass 2 over the newly exposed frontier, solving-language, minimum-remaining, commutation, and dominance structure.
