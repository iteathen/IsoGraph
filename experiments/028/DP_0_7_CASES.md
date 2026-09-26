# Experiment 028 — DP 0.7 Derived-View Holdout

These cases are fresh to Experiment 028.

Use the supplied DP 0.7 candidate plus the qualified dependency authority only where the case actually invokes it.

Do not make a global negative-isomorphism claim merely because one candidate mapping fails.

## D01 — Same primitive pattern, different labels

Structure A is described by its source as a `handoff chain`.

Structure B is described by its source as a `feedback relay`.

After exact primitive rendering, both contain the same scoped organization up to alpha-renaming:

- one entry relation;
- one state-carrying continuation relation;
- one re-entry relation to the same continuation schema;
- one represented exit relation;
- the same branch condition controlling continuation versus exit.

No identity claim about the natural objects is requested.

Determine whether the label difference blocks structural correspondence, whether the comparison should proceed from primitive structure, and whether label assistance is required to recover the common recurrence-oriented view.

## D02 — Same label, primitive breaker

Two systems are both called `recursive`.

A contains a represented continuation relation that creates a new occurrence of schema R under the supplied execution authority and carries argument x into that occurrence.

B contains a state graph cycle B0 -> B1 -> B0. Its authority states only state revisitation; it does not represent a new occurrence, invocation, or carried argument.

A candidate claims an exact recursive correspondence solely because both sources use the word `recursive`.

Determine whether the shared label is sufficient, whether that candidate exact correspondence survives primitive checking, whether the cyclic common core may still be retained, and whether failure of this candidate establishes that no other isomorphism can exist.

## D03 — Loop plus recursion, multiple valid views

A primitive construction has:

- an outer state cycle L0 -> L1 -> L0 under iterative transition authority;
- while in L1, a branch may create a new occurrence of schema R with carried argument y;
- R may recursively create another R occurrence or return to L1;
- an exit relation from L0 is separately represented.

All relations are explicit.

Determine whether a loop-oriented derived view is supported, whether a recursion-oriented derived view is supported, whether one exclusive taxonomy must be chosen, and whether the coexistence of both views creates a semantic conflict.

## D04 — Mutual, branching, and nested recurrence

A primitive construction has entry E into schema A.

Within A:

- branch p creates occurrence B;
- branch q creates occurrence C;
- B may create a new A occurrence;
- C may create another C occurrence and may also return to A;
- A has two distinct represented exits X1 and X2.

The applicable occurrence semantics are explicit. The branching and exit relations are not unresolved.

Determine whether DP 0.7 requires one fixed recurrence grammar and whether a recurrence-oriented derived view may preserve multiple re-entry paths, multiple exits, and nested recurrence simultaneously.

## D05 — Unknown finite unfolding count

A qualified QU object represents an unresolved recurrence count N with admissible values:

`N in {2,3,4,5}`.

For every admissible realization:

- the same entry relation exists;
- the same recurrence schema is used;
- the same carried-state relation is preserved;
- the final represented exit exists.

The actual value of N is unresolved and is load-bearing for claims about exact occurrence count, but not for the claim that the structure is recurrent.

Determine whether DP may invent one occurrence count, whether the QU must remain represented, and whether the recurrence-oriented invariant may be established without resolving N.

## D06 — Unknown branching shape is non-scalar

A qualified QU object represents two admissible unfolding shapes for the same recurrent schema:

- realization U1 branches once and then rejoins;
- realization U2 branches twice with one nested branch before rejoining.

Both preserve the same entry, recurrence, and exit relations at the declared comparison scope.

No scalar branch-count variable is sufficient to reconstruct which admissible topology occurred.

Determine whether DP may collapse this unknown into a single scalar count, whether the non-scalar QU possibility structure must remain, and whether selecting one representative unfolding is permitted.

## D07 — Exit does not prove termination

A recurrent schema contains an explicit exit branch.

A qualified QU object preserves an unresolved branch-choice sequence under which:

- some admissible realizations eventually take the exit;
- some admissible realizations continue recurrence without ever taking the exit.

No ranking function, strict decrease relation, progress theorem, fairness law, or convergence authority is supplied.

Determine whether termination is established, whether progress/convergence is established, whether the represented exit remains valid, and whether possible nontermination must remain explicit.

## D08 — Cycle without recursion

A finite state-transition structure contains:

`S0 -> S1 -> S2 -> S0`.

The governing authority says each arrow changes the current state of one continuing process.

It explicitly does not create a new invocation, occurrence, stack frame, schema instance, or copied argument environment.

Determine whether cyclic structure is established, whether recursion is thereby established, and whether additional semantic authority would be required to call this recursion.

## D09 — Lossy derived view

Primitive structure P has two distinct boundary relations b1 and b2.

A convenient derived view V records only:

`boundary_present = true`

and deliberately forgets which primitive boundary relation is present.

Both P1={b1} and P2={b2} project to the same V.

An investigator proposes replacing P by V as an exact representation because V is shorter and useful for later grouping.

Determine whether V may substitute for P as an exact reconstruction, whether its loss/projection must remain declared, whether primitive support remains authoritative, and whether V may still be reused as a convenience layer.

## D10 — Derived view reused in a later comparison

System A has an already-established derived recurrence view VA with complete primitive provenance.

System B has an already-established derived recurrence view VB with complete primitive provenance.

VA and VB look identical at the derived-view level.

Descending to primitive support reveals one load-bearing boundary relation r in A whose counterpart in B has different incidence under the requested exact comparison scope.

Determine whether established derived views may participate in later discovery, whether an exact higher-order correspondence may be accepted without descending to primitive support, whether this exact candidate survives the descent, and whether the valid common recurrence view must be discarded merely because exact correspondence fails.

## D11 — QU invariant across all admissible unfoldings

A qualified QU family contains several admissible unfolding graphs.

Their internal branching and exact occurrence counts differ.

Every admissible realization nevertheless contains:

- exactly one represented entry into recurrent schema R;
- at least one valid re-entry relation to R;
- a represented exit relation X.

The actual realization is unresolved.

Determine whether the common recurrence property may be established as an invariant, whether one realization must be selected first, whether the actual unfolding shape becomes known, and whether the QU family remains represented.

## D12 — DTS-sensitive recurrence comparison

Two systems have the same state-level recurrence view:

`A -> B -> A`.

Under a pinned DTS process view, transition T1 requires substep u before v, while transition T2 requires v before u.

That order is load-bearing for the requested exact transition correspondence and no order-preserving mapping exists.

All state-level recurrence relations still correspond.

Determine whether the state-level recurrence common view may remain valid, whether exact DTS transition correspondence holds, and whether the load-bearing transition-order difference must remain explicit.

## D13 — Structural correspondence without natural identity

Two represented systems have an exact structural correspondence under a fully qualified recurrence-oriented view.

All load-bearing primitive relations map, and no structural residual remains under that view.

The downstream question asks whether the two represented subjects are the same natural/domain object.

No qualified identity theorem is supplied for that question.

Determine whether the structural correspondence may stand, whether NEI SAME is established by that correspondence, which authority owns the natural-identity conclusion, and whether structural isomorphism itself is natural-identity proof.
