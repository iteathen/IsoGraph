# Experiment 029 — Core 0.19 Qualification Holdout

These cases are fresh to Experiment 029.

Apply the supplied current qualified Core baseline, QU 0.1 where invoked, and the Core 0.19 candidate exactly.

## C01 — Explicit provenance is not truth amplification

A source directly states proposition P inside scope S. The native representation preserves P, S, and source provenance exactly.

No proof authority, external validation, or stronger truth certificate is supplied.

Determine whether P may receive explicit support, whether explicitness itself proves P true, and whether the source scope/authority limitations remain attached.

## C02 — Exact implicit derivation with full support

The source explicitly supplies:

`R(a,b)`
`R(b,c)`

A pinned authority, identified by immutable revision, states that R is transitive inside scope S.

The source does not state `R(a,c)`.

A derivation record preserves the two premise supports, scope S, substitution/bindings, the pinned transitivity authority, and the derivation witness.

Determine whether `R(a,c)` may receive exact implicit support, whether it becomes source-explicit, and whether the support is recoverable.

## C03 — Conventional hidden premise

The source supplies:

`M(x)`

An investigator wants to derive Q(x). The only available rule is:

`M(x) AND N(x) -> Q(x)`

N(x) is conventional in the domain but is neither represented nor supplied by any pinned dependency.

Determine whether Q(x) may receive exact implicit support and whether the familiar conventional premise may be silently imported.

## C04 — Scope preserved through several rounds

Inside condition G and scope S:

- explicit A is supplied;
- pinned rule 1 gives A -> B;
- pinned rule 2 gives B -> C.

Neither rule applies outside G/S.

After two implicit passes the system has B and C.

Determine whether C remains conditional on G/S, whether C may be promoted to a global unconditional assertion, and whether the support lineage must retain the scope dependency.

## C05 — No authority amplification

A source supplies uncertain support for H under condition K.

A valid derivation under pinned authority yields J only when H and K hold.

No exact theorem establishes H.

Determine whether J may be labeled unconditional exact truth, whether the uncertainty/condition may be dropped, and whether the derived support may exceed the strength/scope of its premises.

## C06 — Grounded support cycle

Explicit A has independent source support.

Pinned authority validates:

`A -> B`
`B -> C`
`C -> A`

The support graph therefore contains a cycle.

Determine whether B and C may receive implicit support grounded through A, whether A may retain an additional implicit support path through C, and whether the cycle is invalid merely because it is cyclic.

## C07 — Ungrounded support cycle

No assertion has independent explicit support.

The only support relations are:

`A because B`
`B because C`
`C because A`

No recursive/fixed-point semantic authority supplies an external grounding theorem.

Determine whether the cycle may manufacture valid support, whether the cycle may still be represented as structure, and whether separate grounding authority would be required for validity.

## C08 — QU propagation across implicit rounds

Qualified QU Q represents two admissible values of unresolved relation U.

Under U=true, explicit A plus pinned authority yields B and then C.

Under U=false, neither B nor C holds.

The actual realization is unresolved.

Determine whether the QU dependency propagates from B to C, whether unconditional exact C is admitted, and whether choosing U=true merely to derive C is allowed.

## C09 — QU refinement and invariant discharge

Qualified QU Q0 has four admissible realizations.

New independent evidence yields a qualified refinement Q1 containing two of those realizations.

A later derivation proves assertion Z in every Q1 realization.

The proof records the universality witness and provenance from Q0 -> Q1.

Determine whether Q1 may replace Q0 for later support, whether Z may receive exact implicit support without selecting one Q1 realization, and whether the Q0/Q1 lineage remains recoverable.

## C10 — QU is not a probability distribution

A qualified QU contains four admissible realizations.

No measure, weighting, prior, likelihood, independence relation, or probability-model authority is supplied.

An investigator assigns probability 0.25 to each realization solely because there are four.

Determine whether that probability assignment is authorized, whether Bayesian implicit support may be built from it, and whether QU by itself supplies only possibility structure.

## C11 — Bayesian implicit chain under pinned authority

A pinned probability authority supplies:

`P(A)=0.4`
`P(B|A)=0.8`
`P(B|not A)=0.2`

and exact rules for the applicable total-probability calculation.

The resulting quantified support for B is not source-explicit.

A second pinned probabilistic model explicitly accepts the quantified B-support value as an input to calculate support for C.

No exact bridge turns either probability into necessity.

Determine whether B may receive Bayesian implicit support, whether that support may participate in the later probabilistic pass for C, and whether B or C thereby becomes exact truth.

## C12 — Correlated evidence cannot be double-counted

Evidence items E1 and E2 are represented separately but both derive from the same underlying measurement event M.

A Bayesian model would produce a much stronger posterior if E1 and E2 were multiplied as conditionally independent.

No independence theorem or joint likelihood is supplied.

Determine whether the two evidence items may be treated as independent, whether their shared lineage is load-bearing, and whether stronger combined Bayesian support requires an applicable dependence/joint authority.

## C13 — High probability is not exact truth

A valid pinned Bayesian model establishes:

`P(H | evidence) = 0.999999999`.

No exact theorem or bridge establishes H in every admissible model.

Determine whether H has Bayesian implicit support, whether the high probability may be promoted to exact implicit support, and whether any probability threshold alone supplies exact truth.

## C14 — Explicit and implicit support coexist

Source X explicitly states proposition P.

Independently, source-supported premises A and B plus pinned authority derive the same assertion body P.

The explicit support and implicit derivation have different provenance lineages.

Determine whether P may retain both explicit and implicit support, whether the later derivation rewrites P as having been implicit-only or explicit-only, and whether the distinct support lineages remain recoverable.

## C15 — Discovery target is motivation, not validity support

A DP comparison suggests that deriving relation K in system A would make A align with system B.

The investigator searches A and finds a complete derivation of K from represented premises and pinned authority.

The desired A/B correspondence is not used in the derivation.

Determine whether K may receive implicit support, whether the comparison target may appear as a validity premise, and whether the reason to search is itself evidence for K.

## C16 — Multi-pass implicit lineage

Explicit A is supplied.

Pinned rules establish only:

`A -> B`
`B -> C`
`C -> D`

The selected expansion procedure discovers at most one new derivation depth per pass.

D first appears on pass 3.

Determine whether D may be admitted with exact implicit support, whether its dependency lineage must remain closed through C, B, and A, and whether derivation depth alone weakens exact support.

## C17 — Operational fixed-point stop is not universal completeness

An iterative expansion procedure runs until one full pass adds no new assertions or support refinements.

The procedure is known to inspect only a bounded subset of all inference strategies permitted by the governing semantic authorities.

Determine whether the run may operationally stop, whether the no-change pass proves universal semantic closure, and whether a universal completeness claim needs separate coverage authority.

## C18 — Failure to find is not non-derivability

A bounded search procedure fails to discover implicit assertion P.

The procedure has no completeness theorem and did not exhaust all applicable inference methods.

Determine whether the system may conclude that P is not derivable, whether the failed search may be recorded honestly, and whether a negative derivability claim requires its own completeness/certificate burden.

## C19 — Formula skeleton is not exact rendering

A source formula contains:

- operator F with arity 3;
- ordered operands x,y,z;
- guard G;
- exact coefficient -2;
- universal quantifier over domain D.

The proposed native artifact records only nodes named F,x,y,z and a generic dependency edge from F to each operand.

It omits operand order, guard G, coefficient -2, quantifier kind, and domain D.

Determine whether this is an exact source rendering, whether it may remain an explicitly partial exploratory artifact, and whether it may serve as source-faithful proof/discovery evidence.

## C20 — Sidecar cannot finish missing semantics

A native bundle records relation R(x,y) but omits a load-bearing condition C and sign distinction.

A JSON sidecar says:

`condition=C; sign=negative`.

The sidecar is not a pinned semantic authority; it was written only to help readers.

Removing it makes the source formula unreconstructable.

Determine whether the combined package qualifies as an exact native rendering and whether the sidecar may supply the missing load-bearing semantics.

## C21 — Familiar mathematics cannot be silently imported

A native formula uses an application node labelled locally as `op7` over real-valued operands.

The source meaning requires ordinary real addition, including its algebraic laws.

No native relation or pinned authority states that `op7` is addition.

The decoder recognizes the surrounding source as a familiar equation and assumes addition.

Determine whether exact rendering is established and whether pretrained/familiar mathematical recognition may supply the missing operator semantics.

## C22 — Alternate representation without exact transformation witness

Source S is rendered as alternate form R.

The author claims S and R are equivalent and they agree on all tested numerical examples.

Only the implication `S -> R` has been formally established.

No reverse implication or exact equivalence theorem is pinned.

Determine whether a bidirectional exact-rendering claim is qualified, whether a one-way rendering claim may be limited to the proven direction, and whether empirical agreement can replace the missing exact bridge.

## C23 — Ambiguous source meaning remains ambiguous

A frozen source admits exactly two live interpretations I1 and I2 because one operator scope is genuinely unresolved.

Both interpretations are consistent with the source evidence.

The renderer chooses I1 because it is more common in the domain and produces a simpler graph.

Determine whether that single-choice rendering is exact for the frozen ambiguous source, whether both admissible interpretations must remain represented, and whether choosing the familiar interpretation counts as semantic loss.

## C24 — Precision and modality are load-bearing

The source states:

`x ≈ 1.0 within tolerance 0.1 under condition H`.

A proposed native rendering records exact equality `x = 1.0` and drops H.

All other structure is preserved.

Determine whether the rendering is exact and whether approximation/condition distinctions may be strengthened away.

## C25 — Adversarial one-distinction mutation

A qualification corpus contains a familiar equation whose exact source has coefficient +3.

A mutation changes only that coefficient to -3.

The native rerendering encodes -3 exactly.

A cold decoder reconstructs +3 because it recognizes the familiar canonical formula and silently repairs the sign.

Determine whether the rendering/reconstruction path passes the mutation-preservation qualification gate and whether familiar-form repair is permitted in exact rendering qualification.

## C26 — Downstream barrier for incomplete rendering

A source assertion P has only a partial native skeleton that has not passed exact source reconstruction.

A later DP comparison and implicit-assertion derivation both want to use source-specific meaning that exists only in the original prose, not in the qualified native bundle.

Determine whether the skeleton may serve as source-faithful DP evidence, whether it may establish explicit assertion support for P under Core 0.19, and what must happen before downstream semantic use is allowed.
