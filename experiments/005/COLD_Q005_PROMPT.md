# IsoGraph Experiment 005 — Cold Obligation-Sufficiency Prompt

You are an isolated IsoGraph qualification decoder.

Read only:
1. `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_CANDIDATE.md`
2. `experiments/005/Q005_OBLIGATION_SUFFICIENCY.isg`
3. this prompt

Do not read scorer assertions, results, author analysis, previous Experiment 005 outputs, external reviews, or any other file.

Use the Draft 0.16 candidate exactly as supplied. Do not improve, redesign, or weaken it.

For this synthetic fixture only, interpret these records:

```text
^90000 CASE CASE_ID BODY
^90001 OBJECT OBJECT_ID BODY
^90003 CONTEXT CONTEXT_ID INCLUDED_RELATION_LABEL_SCOPE
^90005 FACTORIZATION SOURCE_ID FACTOR_ID
^90006 D_RECORD SOURCE_ID COMPARISON_ID EXACT_RECONSTRUCTABLE_FLAG
^90007 PROOF_PROFILE PROFILE_ID CHECK_SET
^90009 CLAIM LEFT_ID RIGHT_ID CONTEXT_ID PROFILE_ID RELATION_KIND_LITERAL
^90011 MAPPING LEFT_ID RIGHT_ID PAIR_SCOPE

^93001 INCIDENCE_TOPOLOGY_CHECK
```

`#1` in a `^90009` CLAIM denotes an `ISOMORPHISM` claim.

Stable labels are governed by the candidate specification. A context's included-relation scope controls which relation labels participate in that synthetic comparison; it does not by itself authorize stable-label renaming.

## Tasks

### Q005-01
Compare objects `1000` and `2000` under V0.

1. State whether an isomorphism exists and provide the minimum witness evidence needed for that existential claim.
2. Analyze the materially distinct isomorphism family created by the eight symmetric leaves.
3. State what evidence would be required to claim the *complete* isomorphism family, and whether explicit enumeration of every mapping is semantically required if an exact family certificate is available.

### Q005-02
For object `3000`, analyze its automorphisms separately under contexts `3010` and `3011`.

1. Determine whether swapping identities `31` and `32` is structurally admissible under each context.
2. State whether a witness quotient justified under one context may automatically be reused under the other.
3. Explain what must be frozen/verified if such a quotient is used to prune witness search or establish witness-family coverage.

### Q005-03
The source IDs `4000` and `5000` each have two independently listed factorization nodes.

1. Compare `4100` with `5100`.
2. Compare `4101` with `5101`.
3. State what the first comparison alone can and cannot establish about the named factorization nodes versus the complete declared factorization space.
4. State what additional coverage burden applies to a claim that there is no correspondence anywhere in the declared factorization space.

### Q005-04
Compare `6000` and `7000` under V0.

1. State whether they are isomorphic and give a witness if so.
2. No canonical serializer/canonical-label record is supplied. State whether the structural relation may nevertheless qualify, and why.

### Q005-05
Compare `8000` and `9000` under V0.

1. Determine whether they are isomorphic.
2. If a direct separating invariant/certificate is available, state it exactly.
3. State whether exhaustive mapping search is additionally required for the certified negative.

### Q005-06
Compare `10000` into `11000` under context `10010`.

1. Determine whether weak embedding from `10000` into `11000` exists.
2. Determine whether strong/induced embedding exists under the same included signature.
3. State whether qualifying the weak relation requires also proving the stronger relation.
4. Account for any target residual relevant to the weak relation.

### Q005-07
Analyze source/comparison pairs `12000 -> 12100` and `13000 -> 13100`.

1. Compare comparison-stage objects `12100` and `13100` under V0.
2. State whether a comparison-stage relation and pairwise reconstruction claim may qualify even though both `^90006` records mark full-source exact reconstruction unavailable (`#0`).
3. State exactly which stronger reconstruction claim remains unavailable and why the two layers must not be conflated.

### Q005-08
Audit the supplied claim over `14000` and `15000`.

The claim uses context `16010`, proof profile `16000`, and the supplied node mapping. Profile `16000` lists only `^93001`, the incidence-topology check.

1. Determine whether the claimed isomorphism is actually qualified under the frozen structural semantics.
2. Identify any load-bearing dependency omitted by the proof profile.
3. State whether a proof profile may make an invalid claim valid merely by omitting the failing dependency.
4. Classify the claim as qualified or rejected under dependency-closed verification.

## Final report

For each case, give:

- the structural result;
- the exact evidence obligation actually required;
- any stronger computation that is *not* required;
- any unresolved ambiguity/resource limit;
- whether the Draft 0.16 clarification survives this case.

Finish with an overall disposition:

```text
QUALIFIES
PARTIAL
FAILS
UNKNOWN_RESOURCE_LIMIT
```

Freeze the complete report before consulting anything else.
