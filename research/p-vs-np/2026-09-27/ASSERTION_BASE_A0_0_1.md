# P versus NP assertion base A0 — explicit primitive assertion schemas

**Status:** frozen explicit starting state for implicit-assertion expansion  
**Primitive bundle:** `P_VS_NP_PRIMITIVE_BUNDLE_0_3.isg`

The entries below are *schema-level inventories* of assertion bodies directly represented in the native primitive bundle.

They do not replace the native formulas.

## A0-L — primitive logic

`EA-001` Equality relation is available as exact primitive logical structure.

`EA-002` AND/OR/NOT/IMPLIES/IFF are represented with their exact scopes.

`EA-003` FORALL and EXISTS bind represented variables over declared carriers.

`EA-004` predicate/function application has ordered incidence only; no hidden behavior is imported.

## A0-N — natural/data theory

`EA-010` Every natural object is ZERO or a successor object with a predecessor.

`EA-011` ZERO is not a successor.

`EA-012` predecessor field of a successor is functional.

`EA-013` two successor objects with the same predecessor are equal.

`EA-014` natural induction schema is represented.

`EA-015` addition has exact zero/successor recursive clauses.

`EA-016` multiplication has exact zero/successor recursive clauses.

`EA-017` exponentiation has exact zero/successor recursive clauses.

`EA-018` order is defined by existence of an additive residual.

## A0-LIST — finite list theory

`EA-020` every list is NIL or CONS(head,tail).

`EA-021` NIL is not CONS.

`EA-022` HEAD is functional.

`EA-023` TAIL is functional.

`EA-024` two CONS objects with the same HEAD and TAIL are equal.

`EA-025` list membership is recursively defined.

`EA-026` list length is recursively defined.

`EA-027` every list has at least one represented natural length.

## A0-CFG — configuration/transition theory

`EA-030` state, tape symbol and movement roles are explicitly tagged/disjoint.

`EA-031` each configuration has state/left/current/right fields.

`EA-032` each configuration field is functional.

`EA-033` configurations with the same four fields are equal.

`EA-034` every transition tuple is typed against the finite state/symbol/movement roles.

`EA-035` positive and negative terminal states have no outgoing transition tuple.

`EA-036` every nonterminal represented state/symbol pair has at least one outgoing transition tuple.

`EA-037` one-step transition is exactly the represented left/right tape-update cases.

`EA-038` exact-n reachability has zero and successor recursive clauses.

`EA-039` bit-list input initialization is represented by empty/nonempty constructor cases.

## A0-BOUND — quantitative support

`EA-040` each witness bound relation is total over naturals.

`EA-041` each witness bound relation is functional.

`EA-042` each witness bound relation has explicit eventual `c*n^k` upper support.

## A0-TRUTH — top P-vs-NP primitive formula

For every raw unary relation `L` on admissible finite bit lists:

`EA-050` antecedent existentially quantifies a branching finite transition witness.

`EA-051` antecedent witness is total on nonterminal state/symbol pairs.

`EA-052` antecedent witness has bounded branch termination.

`EA-053` `L(x)` iff a bounded exact path reaches positive terminal state.

`EA-054` consequent existentially quantifies a second witness for the same `L`.

`EA-055` consequent repeats the branching obligations.

`EA-056` consequent additionally requires functional uniqueness of transition tuples sharing current-state/read-symbol inputs.

`EA-057` the theorem body is the universal implication `EA-050..053 -> EA-054..056`.

## A0-NEI — qualified identity facts already materialized

`EA-060` positive and negative terminal raw values are exactly disequal.

`EA-061` duplicate same-field configuration control is exact SAME under the configuration identity scope.

`EA-062` residual/future-behavior identity remains QU-mediated unless continuation closure is exact.

## Explicit provenance rule

These assertion schemas are explicit *relative to the primitive bundle*, not necessarily explicit in Cook/Clay prose or the original Coq source.

Implicit/explicit classification in the next passes is always relative to this A0 representation state.
