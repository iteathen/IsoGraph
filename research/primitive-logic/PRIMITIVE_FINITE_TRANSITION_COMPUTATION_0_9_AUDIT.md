# Primitive finite transition computation 0.9 — caller-scope correction audit

**Status:** unqualified corrective successor  
**Predecessor:** `PRIMITIVE_FINITE_TRANSITION_COMPUTATION_0_8.isg`

## Defect found in 0.8

0.8 mixed two different kinds of structure:

1. reusable primitive definitions:
   - configuration constructor/fields;
   - initialization;
   - one-step transition semantics;
   - exact-n relational composition;
   - bit-list recognition;
   - polynomial-bound predicate expansion;

2. bare universally quantified **machine-instance property constraints** over arbitrary raw relation parameters.

The latter included global formulas for:

- transition tuple typing against an arbitrary state list;
- no outgoing transition from the two terminal states;
- totality for nonterminal state/read-symbol pairs;
- deterministic uniqueness.

Because these were bare universal assertions rather than definitions of a scoped predicate, bundling 0.8 made them apply to **every** raw transition relation.

Most importantly, the deterministic uniqueness block forced every relation used as a transition table to be functional.

That invalidated the P-vs-NP bundle: the nominal branching witness inherited deterministic uniqueness before the top implication was evaluated.

The arbitrary-Q typing/totality blocks were also not valid as global theory axioms: one transition relation cannot simultaneously be typed/total relative to every possible state-list parameter.

## Correction

0.9 removes those four caller-specific blocks from the reusable support module.

Removed predecessor block families:

~~~text
transition-table typing(Q,D)
terminal no-outgoing(D)
nonterminal totality(Q,D)
deterministic uniqueness(D)
~~~

These properties are not discarded semantically.

They belong inside the **caller/witness scope** that supplies the relevant finite state list, symbol list, transition relation, and branching-vs-functional choice.

The P-vs-NP truth kernel already represents these constraints inside each existential witness and is the correct scope for them.

## Retained reusable primitive support

0.9 retains:

- raw state/symbol/movement/configuration data declarations;
- state/symbol/movement tag disjointness;
- configuration existence, field functionality and exact constructor extensionality;
- exact input initialization relation;
- exact one-step tape transition relation parameterized by a supplied raw transition relation;
- exact-n relational composition;
- bit-list recognition;
- polynomial-bound relation expansion.

No reusable definition assumes transition-function uniqueness.

## Semantic effect

~~~text
0.8 bundled globally:
    all transition relations are deterministic

0.9:
    transition relations are unconstrained until the caller
    supplies exact scoped typing/totality/halting/functionality clauses.
~~~

This restores the ability to represent genuinely branching transition relations.

## Mechanical construction

0.9 is 0.8 with only top-level blocks 7-10 removed.

No retained semantic block was rewritten.

The removed blocks are preserved historically in 0.8 for provenance.

## Qualification status

0.9 is a corrective research successor and is not independently qualified.

It is intended for the corrected P-vs-NP primitive bundle.
