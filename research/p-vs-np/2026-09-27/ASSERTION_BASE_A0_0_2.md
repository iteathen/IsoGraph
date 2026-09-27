# P versus NP assertion base A0 — corrected explicit primitive assertion schemas 0.2

Status: current explicit starting state for implicit-assertion expansion
Primitive bundle: P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg
Supersedes: ASSERTION_BASE_A0_0_1.md for current provenance
Correction: transition-table machine properties are witness-scoped, not global transition-theory axioms.

The entries below inventory assertion bodies directly represented in the corrected native primitive bundle. They do not replace the native formulas.

## A0-L — primitive logic

EA-001 Equality is exact primitive logical structure.

EA-002 AND/OR/NOT/IMPLIES/IFF are represented with exact scopes.

EA-003 FORALL and EXISTS bind variables over declared carriers.

EA-004 predicate/function application is ordered incidence only; no hidden domain behavior is imported.

## A0-N — natural/data theory

EA-010 Every represented natural object is ZERO or a successor object with a predecessor.

EA-011 ZERO is not a successor.

EA-012 predecessor field of a successor is functional.

EA-013 two successor objects with the same predecessor are equal.

EA-014 the represented natural induction schema is present.

EA-015 addition has exact zero/successor recursive clauses.

EA-016 multiplication has exact zero/successor recursive clauses.

EA-017 exponentiation has exact zero/successor recursive clauses.

EA-018 order is defined by existence of an additive residual.

## A0-LIST — finite list theory

EA-020 every represented list is NIL or CONS(head,tail).

EA-021 NIL is not CONS.

EA-022 HEAD is functional.

EA-023 TAIL is functional.

EA-024 two CONS objects with the same HEAD and TAIL are equal.

EA-025 membership is recursively defined.

EA-026 length is recursively defined.

EA-027 every represented list has at least one represented natural length.

## A0-CFG — reusable configuration/transition support

EA-030 state, tape-symbol and movement roles are explicitly tagged/disjoint.

EA-031 each represented configuration has state/left/current/right fields.

EA-032 each configuration field is functional.

EA-033 configurations with the same four fields are equal.

EA-037 one-step transition is exactly the represented left/right tape-update relation parameterized by a supplied raw transition relation.

EA-038 exact-n reachability has zero and successor recursive clauses.

EA-039 bit-list recognition and empty/nonempty input initialization structure are represented.

Important scoping correction:

EA-034, EA-035 and EA-036 are not global axioms of the reusable transition-support layer.

They are realization-witness assertions below.

## A0-REALIZATION — machine-witness-scoped transition properties

For each antecedent/consequent realization witness with its own Q,G,D:

EA-034 every D tuple is typed against that witness's finite Q/G and movement values.

EA-035 positive and negative terminal states have no outgoing D tuple.

EA-036 every nonterminal q in Q and every read symbol a in G has at least one outgoing D tuple.

For the consequent functional witness only:

EA-056 transition tuples sharing current-state/read-symbol inputs have equal next-state/write/movement outputs.

No EA-056 constraint applies to the antecedent branching witness.

## A0-BOUND — quantitative support

For each realization witness's own bound relation:

EA-040 the bound relation is total over represented naturals.

EA-041 the bound relation is functional.

EA-042 the bound relation has explicit eventual c*n^k upper support.

## A0-TRUTH — top P-vs-NP primitive formula

For every raw unary relation L on admissible represented finite bit lists:

EA-050 antecedent existentially quantifies one finite branching transition witness.

EA-051 antecedent witness is total on its nonterminal state/symbol pairs.

EA-052 antecedent witness has all-branch bounded termination.

EA-053 L(x) iff a bounded exact path reaches the positive terminal state.

EA-054 consequent existentially quantifies a second witness for the same L.

EA-055 consequent repeats the branching obligations.

EA-056 consequent additionally requires functional uniqueness of same-input transition tuples.

EA-057 theorem body is the universal implication EA-050..053 -> EA-054..056.

## A0-NEI — qualified identity facts already materialized

EA-060 positive and negative terminal raw values are exactly disequal.

EA-061 same-field configuration constructor equality supplies exact constructor identity under the applicable scope.

EA-062 residual/future-behavior identity remains QU-mediated unless continuation closure is exact.

## Provenance correction

The predecessor A0_0_1 named bundle 0.3.

Bundle 0.3 is rejected as current authority because it accidentally imported generic global deterministic uniqueness.

A0_0_2 preserves the intended explicit assertion bodies while correcting their native provenance and machine-property scope.

No new mathematical P-vs-NP assertion is introduced here.
