# P versus NP continuation-support publication preflight 0.1

**Status:** publication preflight PASS  
**Date:** 2026-09-27 America/Los_Angeles  
**Paper:** `research/publications/2026-09-27/P_VS_NP_CONTINUATION_SUPPORT_REDUCTIONS_0_1.md`  
**Paper blob reviewed:** `b7375a036d5508449392ce1a52f3cb378f231e02`  
**Repository research baseline cited by paper:** `main@84e2f4d2386f9cd1a7b2c533752600eee82e44bf`

## 1. Publication policy gate

~~~text
author:
    Joshua Oshiro
    PASS

IsoGraph attribution:
    present
    PASS

agent-assistance disclosure:
    present
    PASS

IsoGraph designed by Joshua Oshiro:
    explicit
    PASS

Provenance and Contribution Note:
    present
    PASS

external references:
    present
    PASS

CC BY 4.0 license:
    present
    PASS
~~~

The requirements of `PUBLICATION_ATTRIBUTION_POLICY.md` are satisfied.

## 2. Claim-scope gate

The paper explicitly does **not** claim:

~~~text
P = NP
P != NP
a new P-vs-NP theorem
a new complexity lower bound
a universal polynomial factorization theorem
a new general tractability characterization
novelty for Myhill-Nerode equivalence
novelty for simulation/antichains
novelty for dead-state pruning
novelty for knowledge-compilation succinctness/operation tradeoffs
novelty for existential forgetting
novelty for SynNNF or SAUNF.
~~~

Current theorem status remains:

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~

PASS.

## 3. Novelty gate

Publication-support review:

`P_VS_NP_CONTINUATION_SUPPORT_BROAD_NOVELTY_REVIEW_0_1.md`

Disposition:

~~~text
individual mechanisms:
    established prior art

new P-vs-NP theorem:
    NO

new lower bound:
    NO

new general tractability characterization:
    NO

possible contribution:
    synthesis / exact alignment / methodological framing

external novelty strength:
    modest, synthesis-level, expert review still appropriate.
~~~

The paper uses the same bounded language and does not inflate the novelty claim.

PASS.

## 4. Bibliographic verification

Key load-bearing external metadata was checked against publisher/primary records.

### Myhill

`Finite Automata and the Representation of Events` appears in:

~~~text
Fundamental Concepts in the Theory of Systems
WADC Technical Report 57-624
1957
pp. 112-137.
~~~

The draft's initial WADD label was corrected to WADC.

### Nerode

~~~text
Anil Nerode
Linear Automaton Transformations
Proceedings of the American Mathematical Society
9(4):541-544
1958
DOI 10.1090/S0002-9939-1958-0135681-9.
~~~

### TACAS simulation/antichain reference

Publisher metadata confirms:

~~~text
Parosh Aziz Abdulla
Yu-Fang Chen
Lukas Holik
Richard Mayr
Tomas Vojnar

When Simulation Meets Antichains
TACAS 2010
LNCS 6015
pp. 158-174
DOI 10.1007/978-3-642-12002-2_14.
~~~

The author order was corrected before this preflight.

### Knowledge compilation

The Darwiche-Marquis knowledge-compilation map and Marquis existential-closure paper support the paper's use of:

~~~text
succinctness
queries
transformations
existential closure / forgetting
~~~

as separate representation criteria.

IJCAI publisher metadata confirms Marquis 2011 at pp. 996-1001 and DOI:

`10.5591/978-1-57735-516-8/IJCAI11-171`.

### SynNNF

Akshay et al. 2019 explicitly state that SynNNF guarantees polynomial-time synthesis and polynomial-time existential quantification for an appropriate variable order.

### SAUNF

Shah et al. 2021 explicitly state:

~~~text
polynomial-time synthesizable
IFF
polynomial-time compilable to SAUNF
~~~

and separately characterize existence of polynomial-size functional solutions through polynomial-size semantically equivalent SAUNF representations.

The paper's comparison is no stronger than those source claims.

PASS.

## 5. Citation and rendering audit

Paper references:

~~~text
reference definitions:       20
unique cited references:     20
missing definitions:          0
uncited definitions:          0
first-citation numbering:     1..20 in order
unsupported \( \) math:       0
unsupported \[ \] math:       0
~~~

The paper uses GitHub-supported dollar math delimiters.

PASS.

## 6. Continuation-support preservation results

The following propositions were rechecked directly from set semantics:

~~~text
C_p = empty
    -> dead deletion preserves union

C_p = C_q
    -> duplicate merge preserves union

C_p subseteq C_q
    -> deleting p while retaining q preserves union

exact factorization F
with denote(F)=union C_p
    -> semantic substitution under correctly implemented downstream operations

objective projection
    -> valid only under an explicitly sufficient downstream observable.
~~~

No stronger completeness claim is made.

PASS.

## 7. Dead-filtered simulation theorem

Theorem 1 assumes:

~~~text
current-acceptance transfer
sound dead-child certificates
same-label matching for every p-child not certified dead
recursive child relation.
~~~

For any accepting continuation from p:

- current acceptance transfers directly; or
- the first child is live;
- soundness prevents a live child from being marked dead;
- the matching obligation therefore applies;
- the induction hypothesis transfers the remaining suffix.

Thus:

~~~text
R_t(p,q)
    -> C_p subseteq C_q.
~~~

This is a soundness theorem only.

No completeness claim for a sound-incomplete dead filter is made.

Existing project finite sanity evidence additionally records:

~~~text
systems:                              324
ordered exact pair comparisons:     1296
filtered-simulation admissions:    30690
false dominance admissions:            0
exact-filter dominance mismatches:     0
systems with strict improvement:      78.
~~~

PASS.

## 8. CNF family algebra

For the CNF-IA-011 family:

~~~text
input clauses:
    2^d * k

clauses per remaining sign group after r eliminations:
    k^(2^r)

final explicit clauses:
    k^(2^d).
~~~

For k=2:

~~~text
N_in  = 2^(d+1)
N_out = 2^(2^d)
      = 2^(N_in/2).
~~~

This is exponential in the input clause count.

The paper correctly scopes this to:

~~~text
the stated materialized CNF representation
under the frozen elimination order.
~~~

It does not infer a representation-independent lower bound.

PASS.

## 9. Independent small-instance CNF sanity check

A separate exhaustive Boolean checker was run during publication review.

For k=2:

~~~text
d=1:
    clause counts through elimination: [4,4]
    final expected: 4
    private assignments checked: 16
    factorization mismatches: 0

d=2:
    clause counts through elimination: [8,8,16]
    final expected: 16
    private assignments checked: 256
    factorization mismatches: 0

d=3:
    clause counts through elimination: [16,16,32,256]
    final expected: 256
    private variables: 16
    private assignments checked: 65536
    factorization mismatches: 0
~~~

No final-clause subsumption pairs were found in the checked d=1..3 systems.

A separate constructive check tested every partial x-assignment for k=2 through d=4:

~~~text
d=1:  3 partial assignments, all live
d=2:  9 partial assignments, all live
d=3: 27 partial assignments, all live
d=4: 81 partial assignments, all live.
~~~

These finite tests are sanity evidence, not substitutes for the general proofs in the paper/project artifact.

PASS.

## 10. Compact-factorization equivalence

The projected explicit formula says:

~~~text
for every tuple selecting one private variable
from every sign group,
at least one selected variable is true.
~~~

Its negation is:

~~~text
there exists a tuple selecting one false private variable
from every sign group.
~~~

Such a tuple exists iff every sign group contains at least one false member.

Therefore the original projected formula is true iff:

~~~text
there exists a sign group
whose every private variable is true,
~~~

which is exactly:

~~~text
OR_sigma AND_i a_(sigma,i).
~~~

PASS.

## 11. Accessibility boundary

The paper distinguishes:

~~~text
semantic range
retained representation size
construction/update cost
next-operation cost
number of ranked stages.
~~~

It explicitly credits knowledge compilation and Boolean functional synthesis for established representation-based tractability results.

The paper does not infer that a compact factorization is efficiently discoverable or stable for arbitrary instances.

PASS.

## 12. P-vs-NP authority boundary

The paper preserves the project-local limitation:

~~~text
primitive P-vs-NP bundle:
    research-audit confirmed
    for selected finite-control tape convention

selected convention
<->
exact official P-vs-NP convention:
    not fully primitive-qualified by this research bundle.
~~~

Current IsoGraph family qualification is cited separately through the 2026-09-28 authority manifest and current integrated-stack record.

No model-equivalence gap is silently closed.

PASS.

## 13. Final disposition

~~~text
authorship/provenance:          PASS
external attribution:          PASS
novelty restraint:             PASS
citation completeness/order:   PASS
rendering syntax:              PASS
set-theoretic propositions:    PASS
dead-filter simulation:        PASS
CNF growth derivation:         PASS
compact factorization:         PASS
all-live falsifier:            PASS
accessibility firewalls:       PASS
P-vs-NP nonclaim boundary:     PASS

publication disposition:
    READY FOR PR REVIEW
~~~
