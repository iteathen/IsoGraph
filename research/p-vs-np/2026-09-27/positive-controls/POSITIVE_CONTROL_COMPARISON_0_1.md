# P versus NP algorithm-hidden positive controls — comparison 0.1

**Status:** completed first three-control comparison
**Input freeze:** DISCOVERY_INPUT_MANIFEST_0_1.json
**Controls:** PC-R bounded walk; PC-H Horn-form consistency; PC-G parity-system consistency
**Truth status:** no P-vs-NP theorem

## 1. Recovery table

| Control | Primary recovered mechanism | T1 | T2 | T3 | T4 | T5 |
|---|---|---:|---:|---:|---:|---:|
| PC-R | future-sufficient state + exact OR recurrence | not needed | **yes** | no | **yes** | not separate |
| PC-H | forced-consequence saturation | no | not counted | **yes** | not counted | **yes** |
| PC-G | reversible constraint normalization | no | not counted | **yes** | no | **yes** |

The mechanisms are intentionally not collapsed into one label.

## 2. Important negative comparison results

### No shared witness monotonicity

PC-H and PC-G both falsify ordinary assignment-inclusion monotonicity.

Therefore the positive controls do not support a generic law:

~~~text
more true witness bits
    ->
more acceptance.
~~~

### No shared model-intersection law

PC-H models are intersection-closed.

PC-G falsifies that law with:

~~~text
x XOR y = 1.
~~~

Thus Horn least-model structure is not the common explanation.

### No shared dominance requirement

PC-R reaches polynomial decision through an exact recurrence without a nontrivial one-way dominance law.

PC-H and PC-G use different exact constructions.

Therefore dominance remains a high-value topology, but it is not necessary to explain all three positive controls.

### No shared exact-quotient requirement

None of the three controls computes the coarsest exact semantic quotient.

- PC-R keeps a possibly finer (vertex,budget) statistic.
- PC-H constructs a least model by local forced consequences.
- PC-G uses locally certified solution-set-preserving transforms.

This directly reinforces:

~~~text
maximum semantic compression
    !=
required operational structure.
~~~

## 3. Common primitive structure that survived

Despite the different high-level mechanisms, every control recovered all of the following.

### C1 — an exact local law derived from primitive semantics

PC-R:

~~~text
one recurrence layer from the next smaller budget.
~~~

PC-H:

~~~text
a headed clause with already-forced BODY forces its HEAD.
~~~

PC-G:

~~~text
retain A; replace B by A XOR B
preserves the complete solution set.
~~~

No law is imported from a named solver.

### C2 — a polynomially represented retained support object

PC-R:

~~~text
at most n^2 (vertex,budget) cells.
~~~

PC-H:

~~~text
one forced-variable set over at most n variables.
~~~

PC-G:

~~~text
m rows of n+1 bits.
~~~

### C3 — a source-indexed well-founded progress rank

PC-R consumes remaining witness-step budget.

PC-H consumes the finite supply of not-yet-forced variables whenever a strict expansion occurs.

PC-G consumes an unused variable coordinate whenever a pivot is established.

In all three:

~~~text
number of strict rank advances <= polynomial source size.
~~~

### C4 — polynomial local access

Each exact update is built from explicit finite input tuples, finite constructor data, exact Boolean/logical operations, and polynomial scans of the retained support.

No complete Q-EXISTS, Q-RESIDUAL, dominance, or solution-set-identity oracle is called.

### C5 — exact terminal extraction

PC-R reads one root recurrence value.

PC-H either obtains the constructed least model or a forced headless-clause contradiction.

PC-G either obtains a constructed assignment or an all-zero/one-RHS contradiction row.

## 4. New campaign derived view: ranked local exact support transformation

The common pattern can be described as:

~~~text
primitive source semantics
    ->
locally justified exact support transformation / recurrence
    ->
polynomial retained support
    ->
source-indexed polynomial progress rank
    ->
exact terminal objective.
~~~

Short experimental name:

~~~text
RLEST
= ranked local exact support transformation.
~~~

This is a **derived discovery view**, not a new Core primitive and not yet a new globally admitted implicit-assertion family.

## 5. Why RLEST is not yet a P-vs-NP result

The statement:

~~~text
if a polynomially constructible exact polynomial-state procedure exists,
then the problem is polynomial
~~~

is nearly definitional.

RLEST is useful only if its antecedents can be recognized from primitive verifier structure without already solving the existential projection.

Therefore the next research question is not:

~~~text
does every verifier have some RLEST description?
~~~

but:

~~~text
is there a non-circular primitive local law
that guarantees polynomial retained support
while a source-indexed rank is consumed?
~~~

The retained-support bound is the critical part.

## 6. Three coordinate-handling modes exposed by the controls

A sharper comparison distinguishes how one source-bounded degree of freedom is removed from future uncertainty.

### A — aggregate

PC-R does not choose one outgoing witness continuation.

It computes an exact OR aggregate over all local alternatives into a bounded state cell.

### F — force

PC-H derives that some variable value is mandatory in every model.

No branch remains for that coordinate once forced.

### E — eliminate by equivalence-preserving transform

PC-G rewrites constraints so a coordinate can become a pivot and be removed from the remaining equations without changing the solution set.

These are three different primitive ways of avoiding explicit enumeration of complete witnesses.

Experimental shorthand:

~~~text
AFE = aggregate / force / eliminate.
~~~

Again, this is a discovery view, not a completeness theorem.

## 7. Main falsifier for AFE/RLEST

The controls do **not** establish that every bounded-existential verifier admits A, F, or E with polynomial retained support.

A hard target may permit an exact local elimination law whose output support grows exponentially.

Thus:

~~~text
exact coordinate elimination
    !=
polynomial elimination.
~~~

That support-growth question is the next high-value projection target.

## 8. NEI synthesis

NEI contributed differently in each control:

- PC-R: statistic equality is sound evidence for Q-RESIDUAL SAME.
- PC-H: list identity separates from extensional assignment/closure identity.
- PC-G: local row rewrites prove Q-SOLUTION SAME despite raw syntactic difference.

The shared lesson is:

~~~text
use cheaply certified scoped SAME where it arises;
do not demand complete identity classification.
~~~

## 9. QU synthesis

All three frozen controls are closed-world.

No load-bearing semantic QU remained.

The algorithm-hiding boundary was explicitly separated from QU.

## 10. Novelty classification

The individual algorithms/laws are standard known mathematics.

RLEST and AFE are **NEW_TO_CURRENT_ISOGRAPH_CAMPAIGN** comparative views only.

External novelty is **UNREVIEWED** and no broader novelty claim is made.

## 11. Projection gate

The requested positive-control gate is now satisfied.

A harder/complete target may be examined next, but only with these restrictions:

1. primitive-render the target first;
2. derive local A/F/E candidates from target semantics rather than inserting a solver;
3. track retained-support growth explicitly;
4. preserve failures as falsifiers;
5. do not treat exact elimination as polynomial unless construction and support bounds are independently established.

## 12. Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
