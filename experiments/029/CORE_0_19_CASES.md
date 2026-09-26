# Experiment 029 — Core 0.19 Holdout Cases

These cases are fresh to Experiment 029.

Apply only the supplied authority. Where a case explicitly stipulates a toy rule or probability model, that stipulation is authority only for that case.

## D01 — Explicit provenance without truth promotion

A represented source directly states proposition P under source S, with recoverable source provenance and scope C.

No independent theorem, proof, or external validation is represented.

Classify whether P has explicit support, whether explicitness alone establishes exact truth, and whether source provenance/scope must remain attached.

## D02 — Exact implicit derivation

The source explicitly supplies:

`R(A,B)`
`R(B,C)`

A pinned authority explicitly states that R is transitive in scope C.

The source does not explicitly state `R(A,C)`.

Determine whether `R(A,C)` may receive implicit exact support and which support information must remain recoverable.

## D03 — Familiar hidden premise is absent

The source explicitly supplies:

`R(A,B)`
`R(B,C)`

No authority states that R is transitive.

An agent knows that relations with the same name are often transitive in a familiar domain and wants to infer `R(A,C)`.

Determine whether exact implicit support is admissible and whether conventional familiarity can act as the missing premise.

## D04 — Scope survives multiple passes

Within guard G only, explicit source support establishes P.

Pinned rules valid only under G establish:

`P -> Q`
`Q -> R`

After two implicit passes, determine whether R may be admitted, whether R becomes globally unconditional, and whether G remains recoverable in R's support.

## D05 — No authority amplification

A represented source supports P only conditionally under H and does not establish P outside H.

A pinned rule under the same condition H establishes `P -> Q`.

No authority discharges H.

Determine whether Q may be supported under H, whether Q becomes globally exact/unconditional, and whether the support may silently drop H.

## D06 — Grounded support cycle

The source explicitly supports A.

Pinned exact rules establish:

`A -> B`
`B -> C`
`C -> A`

Determine whether B and C may receive implicit exact support, whether A may retain an additional implicit support path through the cycle, and whether the cycle is invalid merely because it is cyclic.

## D07 — Ungrounded support cycle

There is no explicit support and no separately qualified recursive/fixed-point grounding.

The only proposed supports are:

`A because B`
`B because C`
`C because A`

Determine whether the cycle can manufacture valid exact support for A, B, or C and whether merely representing the cycle makes it valid.

## D08 — QU dependency through iterative depth

Explicit assertion A depends on unresolved QU object U.

Pinned exact rules establish:

`A -> B`
`B -> C`

No refinement, invariance theorem, marginalization, or discharge authority is supplied.

Determine whether B and C retain the load-bearing U dependency and whether later passes may silently remove it.

## D09 — QU refinement and invariant discharge

QU state Q0 admits realizations {r1,r2,r3}.

New independently qualified evidence refines it to Q1={r1,r2}.

Under pinned authority, proposition P is true in every realization of Q1.

Determine whether Q1 is a refinement of Q0, whether P may receive exact implicit support, whether P's assertion body must remain QU-conditional, and whether provenance must retain the Q0->Q1 refinement/universality witness.

## D10 — QU does not invent probability

A QU object admits three possibilities {u1,u2,u3}.

No probability measure, prior, likelihood, weighting, frequency, or symmetry authority is represented.

Determine whether Core 0.19 may assign a uniform prior, whether Bayesian support may be computed from QU alone, and whether the possibility family remains valid QU structure.

## D11 — Bayesian implicit chain under explicit probability authority

For this case only, a pinned probability authority explicitly supplies:

- P(A)=0.4;
- P(B|A)=0.9;
- P(B|not A)=0.2;
- the law of total probability for deriving P(B);
- P(C|B)=0.8;
- P(C|not B)=0.1;
- the same law for deriving P(C) from the derived P(B).

A is source-explicit. B and C are not source-explicit.

Determine whether B may receive Bayesian implicit support, whether that derived Bayesian support may participate in the later C pass, and whether either B or C becomes exact merely because the model is numerically determinate.

## D12 — Correlated evidence cannot be double-counted

For this case only, a probability model provides marginal likelihood information for evidence records E1 and E2.

Provenance shows E1 and E2 are two reports of the same underlying sensor event.

No joint likelihood or conditional-independence authority is supplied.

Determine whether the two likelihood contributions may be multiplied as independent, whether dependence remains load-bearing, and whether separate record identities alone establish independence.

## D13 — High probability is not exact support

A fully pinned probability model yields posterior probability 0.999999 for hypothesis H.

No exact theorem or bridge establishes H necessarily.

Determine whether H has Bayesian support, whether H may be promoted to exact support, and whether any probability threshold in Core 0.19 performs that promotion.

## D14 — Explicit and implicit support coexist

Source S directly states P, giving P explicit support.

Separately, source-supported A and B plus pinned exact authority provide an independent exact derivation of the same assertion body P.

Determine whether P may retain both explicit and implicit support, whether one support lineage overwrites the other, and whether the shared assertion body forces support identity.

## D15 — Discovery target motivates search but not validity

A qualified DP 0.7 comparison suggests that implicit assertion T would be useful to investigate.

The agent then finds represented premises X and Y plus pinned exact authority that independently establish T.

Determine whether the DP target may motivate the search, whether the DP target itself may appear as a premise/authority establishing T, and whether T may receive exact implicit support from the independent X/Y derivation.

## D16 — Multi-pass implicit lineage

The source explicitly supports A.

Pinned exact rules establish:

`A -> B`
`B -> C`
`C -> D`

The operational procedure discovers only one new assertion per pass.

Determine whether D may be admitted after the third pass, whether D's support lineage must remain dependency-closed through A/B/C and the rules, and whether greater derivation depth weakens exact semantic strength by itself.

## D17 — Operational fixed point is not universal closure

An implementation runs its selected reasoning/search procedure until one full pass adds no new admitted assertions or support refinements.

No theorem proves that the procedure is complete for every admissible inference under the represented authorities.

Determine whether the implementation may stop that operational expansion, whether it may claim universal semantic closure, and whether a universal completeness claim requires separate coverage authority/evidence.

## D18 — Failure to find is not non-derivability

A bounded search procedure fails to discover implicit assertion Z.

The search procedure has no completeness certificate for the relevant authority/search space.

Determine whether the run may report that Z was not found, whether it may conclude Z is not derivable, and whether a negative derivability claim needs an additional completeness/certificate burden.

## D19 — Skeleton plus sidecar is not exact rendering

A source formula contains an ordered binary operator, a negative coefficient, a binder, and a domain restriction.

The native IsoGraph payload records only four role labels and a dependency skeleton.

A JSON sidecar supplies the missing operator order, coefficient sign, binder ownership, and domain restriction.

Removing the sidecar makes exact reconstruction impossible.

Determine whether this is an exact source rendering, whether the native skeleton may remain useful as an explicitly partial artifact, and whether the sidecar is allowed to provide the missing load-bearing formula meaning.

## D20 — Familiar conventional mathematics is not authority

A source uses ordinary real addition.

The native bundle contains a local operation symbol `op1` but no represented operation table, no real-addition semantics, and no pinned qualified authority connecting `op1` to real addition.

A decoder recognizes the source notation and assumes `op1` must mean ordinary addition.

Determine whether the rendering may qualify as exact, whether pretrained familiarity supplies semantic authority, and whether the missing operation semantics must be represented or pinned.

## D21 — Exact transformation directionality

A source semantic object S is transformed to rendered form R.

Pinned authority proves only:

`S -> R`

It does not prove:

`R -> S`.

Separately, an empirical study shows S and R are numerically close on many examples.

Determine whether a bidirectional exact-rendering claim is established, whether the proved S->R direction may be claimed as such, and whether empirical/approximate agreement supplies the missing exact inverse.

## D22 — Unknown and ambiguity must remain unresolved

A frozen source interpretation explicitly permits two alternative parses A1 and A2.

It also contains a load-bearing coefficient k known only to be in {2,3}.

No evidence selects one parse or one coefficient value.

The proposed native rendering chooses A1 and k=2 because that makes the graph smaller.

Determine whether the proposed native object is an exact rendering, whether the alternatives/QU must remain represented, and whether choosing a convenient realization is permitted.

## D23 — Precision and modality are load-bearing

A source states:

- x is approximately 10 within tolerance 1;
- proposition P holds only if condition G;
- there exists at least one y satisfying relation R.

A proposed native rendering states:

- x equals exactly 10;
- P unconditionally;
- every y satisfies R.

Determine whether the rendering is exact and whether approximate/exact, conditional/unconditional, and existential/universal distinctions must be preserved.

## D24 — Reconstruction gate blocks downstream use

A source interpretation is frozen and the author coverage audit passes.

The native parse/signature audit also passes.

A fresh native-only reconstruction changes one source sign from negative to positive, and the targeted distinction-preservation control confirms the native bundle cannot distinguish the two signs.

The author wants to use the rendering immediately as DP evidence and explicit assertion support because most of the structure is correct.

Determine whether the exact-rendering qualification passes, whether partial credit permits calling it exact, whether downstream DP/implicit use is permitted as source-faithful evidence, and whether the failed distinction may be silently repaired toward the familiar source formula.
