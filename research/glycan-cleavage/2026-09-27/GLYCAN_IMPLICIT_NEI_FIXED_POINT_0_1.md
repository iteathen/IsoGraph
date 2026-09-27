# Glycan primitive / implicit / NEI campaign fixed point 0.1

**Status:** operational fixed point reached
**Date:** 2026-09-27
**Branch:** research/glycan-cleavage-primitive-20260927
**Primitive native:** GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg
**Primitive verification:** Experiment 032 PASS, run 36345374241
**Core 0.20 status:** unqualified research contract only
**Qualified assertion authority:** Core 0.19
**Qualified identity authority:** NEI 0.4
**Qualified unknown authority:** QU 0.1

## Requested execution order

Completed in the requested alternating order:

1. Core / primitive re-check;
2. implicit closure;
3. NEI;
4. implicit closure;
5. NEI;
6. repeated until the scoped no-new pair was reached.

Durable stages:

~~~text
Core double-check
A0 explicit base

A1 -> NEI1
A2 -> NEI2
A3 -> NEI3
A4 -> NEI4
A5 -> NEI5
A6 -> NEI6
A7 -> NEI7
A8 -> corrected A8 support -> NEI8
A9 -> NEI9
A10 -> NEI10
A11 no-new -> NEI11 no-new
~~~

## Fixed-point criterion

A11:

~~~text
new exact implicit assertions: 0
material support refinements:  0
new QU dependencies:           0
~~~

NEI11:

~~~text
new exact identity results:    0
identity-scope refinements:    0
QU refinements:                0
authority refinements:         0
~~~

Therefore the campaign reached an **operational fixed point for the declared frozen 0.1 scope**.

This is not universal logical consequence completeness.

## Mechanical assertion-support state

Current numbered exact results:

~~~text
implicit assertions:
    G-IA001 through G-IA257

NEI assertions:
    G-N001 through G-N093
~~~

The dependency audit through A9/NEI9 found:

~~~text
missing numbered definitions: 0
duplicate definitions:        0
undefined G-IA/G-N refs:      0
support cycles:                0
~~~

A10/NEI10 extend the numbering contiguously and reference predecessor support only.

The A8 correction is mandatory support for G-IA191 and its downstream maximal-path results.

## Material structural results

### 1. Same-operator cleavage is confluent

For one fixed operator and state:

- eligible distinct local deletions form exact diamonds;
- strict deletion terminates;
- every complete phase reaches one unique extensional saturated state.

Therefore each operator induces one deterministic idempotent state transformer.

### 2. Optimal histories do not need microscopic order

Treatment continuation depends only on the current extensional state.

An optimum:

- has no adjacent duplicate treatment;
- has no zero-effect treatment;
- never revisits an extensional state;
- is a strict chain of state reductions.

### 3. Exact state quotient

Reachable states are ancestor-closed rooted subtrees containing the target.

The exact terminal frontier reconstructs the state losslessly.

Equal extensional states are also equal under the complete future-treatment behavior scope.

### 4. Exact recursive subtree quotient

The campaign derives a finite recursive SIG value from:

~~~text
target flag
susceptibility vector
set of child SIG values
~~~

Equal SIG values force equal treatment response.

Duplicate sibling occurrences in one equal behavior class are parent-interface idempotent for the treatment-word objective; raw occurrence provenance is retained.

### 5. Exact treatment language

Each rooted subtree has an exact completion language L_r.

Parent requirements combine by language intersection.

The complete instance solution language is L_root.

It is upward closed under insertion of treatment symbols.

### 6. Exact solvability criterion

The frozen 0.1 instance is solvable iff every represented non-target node has at least one susceptible operator.

Equivalently this can be tested on non-target SIG types.

No additional existence obstruction remains in the idealized model.

### 7. Dynamic search collapses to static phase assignment

A treatment word solves iff non-target nodes/types can be assigned to treatment phases such that:

- the phase label is susceptible at that node/type;
- child phase <= parent phase.

This exactly removes microscopic trace choice from the word-acceptance condition.

### 8. Fixed-word existential assignment collapses further to deterministic tau

For one candidate treatment word, each type has one earliest feasible completion/removal phase tau.

The word solves iff every required tau is finite.

Thus verification of a fixed word needs neither microscopic trace search nor alternate phase-assignment search.

### 9. Minimum ordered-layer formulation

The optimum treatment count equals the minimum number of nonempty ordered layers such that:

- child layer <= parent layer;
- every layer's susceptibility-set intersection is nonempty.

A raw treatment word is recovered by choosing one operator from each layer intersection.

### 10. Exact maximal-path formulation

The original word solves iff it covers every maximal non-target path by a nondecreasing embedding into treatment positions, with each assigned symbol lying in that type's susceptibility set.

A proof-support defect in the first A8 sufficiency witness was found during the campaign and repaired with a bottleneck-path induction. The theorem and downstream reductions survived.

### 11. Exact SCS boundary

General case:

~~~text
not one ordinary SCS instance
~~~

Instead each set-valued path has a finite minimal block-pattern basis.

The complete problem is exactly a finite disjunction of ordinary common-supersequence subproblems obtained by selecting one basis pattern per retained path.

Singleton-susceptibility subclass:

~~~text
exact ordinary shortest common supersequence
of run-compressed maximal-path label words.
~~~

This resolves the earlier SCS analogy without erasing multi-operator choice or same-phase cascade.

### 12. Operator dominance

If one operator's susceptibility support is a subset of another's, replacing the dominated symbol by the dominating symbol anywhere in a solving word preserves solvability and length.

Consequences:

- optimum value / one witness can be found using only inclusion-maximal operators;
- dominated raw operators may still occur in distinct optimum raw words;
- complete raw optimum enumeration must preserve or reconstruct those alternatives.

Dominance is a preorder, not identity.

### 13. Finite exact basis of the complete solution language

Let B_global be all subsequence-minimal solving raw treatment words.

Then:

- every basis word has length <= number of non-target SIG types;
- B_global is finite;
- no two distinct basis words contain one another as proper subsequences;
- every solving word contains a B_global member as a subsequence;
- the complete solution language is the upward subsequence closure of B_global;
- the complete optimum trajectory family is exactly the shortest members of B_global.

Thus B_global is a finite exact representation of the whole raw treatment-word language, not only its optimum value.

## NEI outcome

NEI exposed useful exact scoped identities without collapsing raw objects.

Examples:

- extensional state SAME;
- all-future continuation SAME;
- phase-output SAME across different microscopic deletion orders;
- susceptibility-vector SAME;
- phase-transformer SAME;
- sequence-transformer SAME;
- SIG / RESP / subtree-language SAME;
- full solution-language SAME;
- optimum-value and optimum-family SAME;
- finite B_global SAME;
- finite path-basis SAME.

The central discipline remained:

~~~text
scoped SAME
!=
global natural identity.
~~~

No raw site, operator, trace, path, word, or representation artifact was globally merged merely from equal behavior.

## QU / UNKNOWN outcome

Inside the frozen 0.1 model:

~~~text
new QU dependencies:       0
semantic UNKNOWN results:  0
~~~

The model fixes P and M extensionally and uses deterministic saturated treatment semantics.

Broader global identity questions lacking a complete identity theory remain INCOMPLETE, not UNKNOWN.

Real biochemical uncertainties are outside 0.1 and would require explicit QU in a successor model.

## Boundaries still open

This campaign does not establish:

- Core 0.20 qualification;
- a complete biochemical model of enzymes/glycans;
- kinetic/stochastic treatment behavior;
- uncertain enzyme specificity;
- a polynomial-time optimization algorithm;
- a generic greedy optimum theorem;
- one ordinary SCS formulation for the unrestricted set-valued problem;
- global natural identity of raw objects;
- universal implicit-semantic completeness.

## Current research authority for this campaign

Use:

- verified GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg;
- GLYCAN_CORE_DOUBLE_CHECK_0_1.md;
- GLYCAN_ASSERTION_BASE_A0_0_1.md;
- A1 through A10;
- GLYCAN_IMPLICIT_ASSERTIONS_A8_CORRECTION_0_1.md;
- NEI passes 1 through 10;
- A11 no-new pass;
- NEI11 no-new pass;
- this fixed-point report.

Do not cite A8 G-IA191 without its correction overlay.

## Next-stage boundary

The implicit/NEI loop is complete within its declared scope.

A later Discovery Protocol campaign may now operate on the fixed-point graph, including:

- closure-operator algebra;
- finite language basis;
- ordered-layer geometry;
- generalized/disjunctive SCS structure;
- operator dominance;
- residual distinctions not removed by the exact quotients.

Any DP lead must project back to the primitive/exact support before exact admission.
