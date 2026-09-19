# NEI 0.4 Focused Qualification Plan

**Status:** preflight qualification design; no semantic promotion  
**Candidate:** `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md`  
**Native vocabulary:** `extensions/nei/NEI_NATIVE_VOCAB_0_2.md` / `NEI_VOCAB_0_2.isg`  
**Resource policy:** `QUALIFICATION_RESOURCE_DISCIPLINE.md`  
**Current qualified authority remains:** NEI 0.1 + 0.2

## Objective

Qualify the semantic corrections introduced by NEI 0.4 without replaying unrelated already-qualified NEI 0.1/0.2 material.

The focused burden is:

1. exact identity must emerge from admissible identity models rather than profile-owned answer tags;
2. probabilistic identity evidence must remain evidence rather than becoming exact identity;
3. Bayesian evidence combination must preserve priors, dependence, provenance and conditioning;
4. QU must remain structurally present whenever unresolved information affects identity or evidence;
5. QU must not be silently converted into a probability distribution.

## Proposed qualification cases

### Q01 — SAME emerges without an answer tag

Two administrative representations are linked by exact reconstruction and causal-continuity facts. The query context defines carrier/scope but contains no `identity-preserving` label.

All admissible identity models satisfying the facts merge the subjects.

Expected:

```text
SAME
```

because the model family forces it, not because the profile declared it.

### Q02 — DISTINCT emerges without an answer tag

Two simultaneously existing physical specimen records have exact mutually exclusive location/ownership/continuity constraints that cannot be satisfied by one specimen identity.

Expected:

```text
DISTINCT
```

without any profile field saying the records are identity-separating.

### Q03 — large positive Bayes factor is not SAME

The exact admissible model family contains both SAME and DISTINCT models.

One observation has:

```text
BF = 10^9
```

in favor of coidentity.

Expected:

```text
exact NEI = UNKNOWN
probabilistic evidence = strongly favors coidentity
```

No threshold converts the evidence into SAME.

### Q04 — large negative Bayes factor is not DISTINCT

Mirror of Q03 with a very small Bayes factor.

Expected:

```text
exact NEI = UNKNOWN
probabilistic evidence = favors separation
```

### Q05 — Bayes factor versus posterior

The same evidence has one fixed Bayes factor under two different qualified priors.

Expected:
- same Bayes factor;
- different posterior odds;
- same exact NEI result.

This catches accidental conflation of evidence strength and posterior confidence.

### Q06 — correlated evidence is not additive

Three observations derive from one underlying measurement event.

Each marginal item is recorded with a positive individual BF, but the dependency graph states they are conditionally coupled.

Expected:
- naive sum of three log-BFs is invalid;
- joint likelihood or explicit dependence model is required.

### Q07 — conditionally independent evidence is additive

Two observations carry a qualified conditional-independence assertion under both identity hypotheses and the same conditioning context.

Expected:

```text
log BF_joint = log BF_1 + log BF_2
```

This checks that NEI 0.4 permits lawful factorization without making independence implicit.

### Q08 — QU-dependent evidence without a QU probability distribution

A pinned QU admits two realizations:

```text
r1 -> log BF = +4
r2 -> log BF = -2
```

No probability distribution over `R(Q)` is authorized.

Expected:
- no scalar marginal BF;
- preserve realization-conditioned evidence or the exact set/range;
- evidence direction remains QU-dependent.

### Q09 — robust evidence over QU

Every admissible QU realization yields positive log BF, but magnitudes differ.

Expected:
- robust coidentity evidence across Q;
- no exact SAME solely from that fact.

### Q10 — lawful probabilistic marginalization over QU

The probability model authority explicitly supplies the required conditional distributions over QU realizations under both identity hypotheses.

Expected:
- marginal likelihoods/BF may be computed;
- provenance records the probability authority;
- exact NEI remains separate.

### Q11 — missing QU fails incomplete

The source states that an unresolved identity-relevant relation exists outside the provided scope.

No qualified QU state represents it.

Expected:

```text
INCOMPLETE / UNQUALIFIED
```

not SAME, DISTINCT or UNKNOWN.

### Q12 — shared unknown versus distinct-but-value-equal unknowns

Compare:

```text
A.x -> u
B.x -> u
```

with:

```text
A.x -> u1
B.x -> u2
u1 != u2 as represented referents
value(u1) = value(u2)
```

Expected:
- different QU information states;
- no collapse merely because values are equal.

### Q13 — exact evidence is not an arbitrary infinite score

An exact theorem eliminates every DISTINCT model.

Expected:
- SAME through exact model-family closure;
- theorem represented as exact evidence/certificate;
- no requirement to encode `BF = infinity` or a giant finite surrogate.

### Q14 — UNKNOWN with non-neutral posterior

A qualified exact model family contains both SAME and DISTINCT possibilities.

A qualified probability model assigns posterior identity probability 0.9.

Expected:

```text
exact NEI = UNKNOWN
posterior confidence = 0.9
```

Both coexist without contradiction.

### Q15 — scoped quotient remains scoped

Two referents share an exact downstream quotient state and receive positive coidentity evidence under that scope.

A wider identity query includes an unresolved QU distinction.

Expected:
- exact scoped quotient result retained;
- broader NEI query not promoted to SAME.

### Q16 — duplicated lineage does not multiply evidence

The same observation appears in multiple artifacts derived from one evidence event.

Expected:
- one evidence lineage;
- no independent multiplication of Bayes factors.

### Q17 — anti-circular QU restriction

A proof wants SAME and restricts Q to realizations producing positive identity evidence, then cites the result as proof.

Expected:
- rejected as circular;
- original QU remains unchanged;
- no identity promotion.

### Q18 — query context asks rather than answers

A profile/context includes:
- carrier;
- scope;
- domain laws;
- observations;
- QU;
- model authority.

It contains no answer tags.

Expected:
- agent can still reconstruct the identity question and derive the correct result.

This is the direct regression for the user-directed architectural correction.

## Deterministic preflight before any external run

Before a cold semantic call:

- verify candidate/vocabulary hashes;
- verify `^94100..^94135` vocabulary declarations are unique and non-overlapping with `^94000..^94033`;
- verify qualification packet exposes NEI 0.4 but not hidden expected results;
- verify no public case requires a probability distribution that was not explicitly supplied;
- verify every Bayesian case identifies conditioning context and evidence dependence;
- verify exact-result cases do not rely on numerical thresholds;
- verify missing-QU cases cannot be mis-scored as semantic UNKNOWN;
- verify old NEI 0.1/0.2 authority files remain byte-identical.

## External resource target

After deterministic freeze:

```text
cold semantic decoder calls       1
independent verifier calls         0 or 1 only if needed
GitHub qualification runs          1
```

One batched corpus should cover Q01-Q18.

Do not spend a second semantic call to improve a score. Rerun only for provider failure, malformed output, material candidate/corpus revision, or a specific unresolved semantic ambiguity.

## Promotion condition

NEI 0.4 qualifies only if the fresh holdout establishes all of these simultaneously:

```text
identity derived, not profile-declared
exact and probabilistic layers remain separate
Bayesian evidence dependence preserved
Bayes factor != posterior
posterior != exact identity
QU required for identity-relevant unresolved structure
QU != probability distribution
missing QU != semantic UNKNOWN
correlated evidence not double-counted
scoped quotient not globally promoted
anti-circularity preserved
```

Failure in any one of these leaves NEI 0.4 unqualified while preserving the specific evidence gathered.
