# Experiment 057 — Core 0.21 Fresh Qualification Cases

## C01 — Hard definition stays in scope
A frozen source census contains assertion A. Its named operator is difficult to reduce. The renderer removes A from the strict packet without any scope-revision record and qualifies the remaining assertions.

## C02 — One source item expands many ways
One frozen source assertion expands exactly into seven primitive relations plus three raw data atoms. Its source identity and reconstruction path remain recorded.

## C03 — Shared primitive support
Two frozen source assertions depend on the same primitive incidence P plus different primitive guards. The ledger references P from both assertions instead of duplicating P.

## C04 — Non-assertional guard omitted
All source propositions are present, but a load-bearing source guard controlling when relation R applies is absent from the Source Semantic Census and cannot be reconstructed.

## C05 — Silent scope shrink
The frozen scope contains domains D1 and D2. D2 is hard to reduce, so the final packet silently changes its scope to D1 and retains the original qualification-target identity.

## C06 — Explicit scope revision
A campaign freezes target T0 over D1+D2. It later decides to qualify only D1. It preserves T0 unchanged, creates target T1 with a new scope hash and census, records the removed D2 items and reason, and makes no claim that D2 was semantically irrelevant.

## C07 — Rejected rendering attempt
Source item A is represented by candidate node X. X is shown invalid and marked REJECTED_INVALID_REPRESENTATION. No alternative representation of A has yet been completed.

## C08 — Primitive premises, opaque body
Premises P and Q are primitive-closed. The asserted conclusion is named OP(P,Q), but OP has load-bearing semantics not represented below the assertion body.

## C09 — Reducible parity label
A relation PARITY(x) is used authoritatively. The frozen source defines PARITY by exact bit-incidence/XOR structure, and that definition is available to the renderer.

## C10 — Missing definition
A source relation MYST(x,y) has load-bearing behavior, but the defining authority/interface is unavailable. The source does not describe MYST as an unknown-valued domain quantity.

## C11 — Genuine QU-bounded source unknown
The source explicitly leaves parameter q unresolved between two constrained realizations. Qualified QU represents both possibilities, all known membership/constraint semantics are primitive-supported, and neither realization is selected.

## C12 — Opaque QU escape
A renderer points to a qualified QU object but hides a known load-bearing membership rule inside the QU label rather than representing that rule below it.

## C13 — Million-step loop
A loop has an exact initial state, exact continuation predicate, exact one-step transition, exact index/successor semantics, and a fixed terminal index of one million. Only the first ten states are materialized.

## C14 — Exact recursion, unknown termination
A recursive rule has exact base predicate, exact recursive-step semantics, exact argument transformation, and exact result composition. Whether every admissible input terminates is unresolved and load-bearing for a separate termination question.

## C15 — Infinite generated tree
A recursively defined tree may be infinite. Its root rule and child-generation relation exactly characterize all and only admissible nodes. No theorem about finiteness is claimed.

## C16 — Prefix-only generator
A candidate generator reproduces the first 100 observed members of a source sequence, but no evidence establishes that it generates all and only source-admissible members beyond that prefix.

## C17 — Closed generator, unproved downstream property
An exact schema generates all and only members of family F. A proposed derived theorem says every member of F has property Z, but no support for Z has been provided.

## C18 — Loop label as leaf
A native node labeled LOOP is the sole support for iterative behavior. Its continuation predicate and step relation are described only in English sidecar prose.

## C19 — Primitive negative witness
The active universal candidate is: phase is a function only of sign over the declared route domain. Two in-domain routes have the same primitive-closed sign value but different primitive-closed phase values.

## C20 — IA fixed point after kernel change
An IA pass reached a no-change fixed point for primitive-kernel hash K0. A later valid reduction replaces one opaque relation with lower structure, producing kernel hash K1 while census, scope, QU state, authority, and search profile remain otherwise fixed.

## C21 — New IA exposed by reduction
After the K0->K1 reduction, the lower primitive structure plus pinned governing authority now establishes implication A -> B, with A already established. The previous IA pass could not see the lower relation.

## C22 — Sound but incomplete
A frozen Source Semantic Census contains ten items. The final packet includes nine, all nine are sound and reconstruct exactly, and the tenth has no disposition.

## C23 — Complete but unsound
All ten frozen census items have dispositions and reconstruction paths, but one exact assertion uses an invalid implication not licensed by the governing authority.

## C24 — Scope hash drift
The final packet's represented scope differs from the frozen semantic-scope hash. No SCOPE_REVISION exists.

## C25 — Derived-view deletion
A high-level named abstraction accelerates discovery. Deleting every DERIVED_VIEW node leaves a primitive support graph that exactly reconstructs every closed in-scope census item.

## C26 — Full-family authority boundary
A rendering uses Core 0.21 census/schema rules, a load-bearing structured unknown, a transition-order distinction, an identity question, an experimental warrant, and an EI observation. A proposal lets Core 0.21 directly choose the QU realization, decide transition equivalence, establish natural identity, issue the warrant, and treat the observation as truth.
