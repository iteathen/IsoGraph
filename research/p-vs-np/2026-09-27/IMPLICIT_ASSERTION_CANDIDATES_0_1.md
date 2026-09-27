# P versus NP implicit-assertion candidate residual ledger 0.1

**Status:** open candidate ledger  
**Rule:** presence here is a reason to investigate, not support for truth.

## High priority candidates

`CA-001` natural representation is unique by repeated successor structure.

`CA-002` list length is unique.

`CA-003` exact-n deterministic reachability endpoint is unique.

`CA-004` deterministic witness implies branching witness for the same extensional language.

`CA-005` positive and negative terminal reachability are mutually exclusive in a deterministic realization.

`CA-006` every accepting branch determines a finite sequence of local transition choices.

`CA-007` local transition-choice alphabet has input-independent finite cardinality for one fixed witness.

`CA-008` accepting choice sequence length is polynomially bounded.

`CA-009` a candidate choice sequence can be verified deterministically in polynomial time.

`CA-010` branching realization yields polynomial witness/verifier factorization.

`CA-011` polynomial witness/verifier factorization yields a branching realization.

`CA-012` the primitive truth residual is bounded existential projection over deterministic polynomial verification.

`CA-013` polynomially many witness candidates imply deterministic polynomial enumeration.

`CA-014` logarithmic witness length over a fixed finite witness alphabet implies polynomial candidate count.

`CA-015` polynomial efficiently-computable residual quotient width implies deterministic polynomial propagation.

`CA-016` NEI residual SAME is an equivalence relation inside one fixed qualified scope.

`CA-017` exact continuation equivalence implies NEI scoped SAME for residuals.

`CA-018` global prefix DISTINCT can coexist with residual scoped SAME.

`CA-019` exact scoped SAME permits substitution in any consumer whose observable factors entirely through that scope.

`CA-020` raw state count upper-bounds exact NEI residual class count.

`CA-021` if all reachable residuals at each depth are exact NEI SAME, existential projection collapses to one path-independent residual per depth.

## Medium priority candidates

`CA-030` reachable tape support after `t` steps is contained in the initial support plus distance `t`.

`CA-031` a path verifier can encode configurations using polynomial space in input size plus path length.

`CA-032` finite fixed state/symbol/transition tables contribute only input-independent constants to verifier complexity.

`CA-033` deterministic path verification time is polynomial in input length plus encoded path length.

`CA-034` a bounded branching computation can be represented as an existentially quantified bit/list witness even if raw transition choices have non-binary arity.

`CA-035` all witness encodings with fixed finite choice alphabet are polynomially interconvertible.

`CA-036` the consequence of `CA-010` is representation-independent up to exact encoding bridges.

## Identity candidates requiring special care

`CA-040` two raw relation objects with identical extensions are globally SAME.

Current disposition: **do not admit** without a pinned global identity theory for extensional relations.

`CA-041` two computation realizations computing the same `L` are globally SAME.

Current disposition: **do not admit**; same observable language is not global realization identity.

`CA-042` same continuation truth table is global witness-prefix SAME.

Current disposition: **reject globally**; candidate only for scoped residual identity.

## Completeness candidates

`CA-050` selected inference-family fixed point is complete for every relevant implicit assertion.

Current disposition: **not established**.

`CA-051` no additional exact implicit assertion exists outside the selected inference families.

Current disposition: **not established**.

These remain explicit so an operational no-change pass cannot be misreported as universal closure.
