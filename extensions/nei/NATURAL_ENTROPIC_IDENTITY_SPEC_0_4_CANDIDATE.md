# IsoGraph Natural Entropic Identity Extension — 0.4 Candidate

**Status:** unqualified normative successor candidate  
**Short name:** NEI 0.4  
**Supersedes for successor research:** `NATURAL_ENTROPIC_IDENTITY_SPEC_0_3_CANDIDATE.md`  
**Qualified base authority retained:** NEI 0.1 + NEI 0.2 at the exact revisions in `qualification/QUALIFIED_MODULES_2026-09-18.md`  
**Core dependency:** qualified Core 0.17, plus the observation-first obligations of Core 0.18 candidate where this successor work depends on them  
**QU dependency:** qualified QU is REQUIRED whenever unresolved identity-relevant structure can affect identity classification, evidence interpretation, evidence dependence, or probabilistic evidence strength  
**Native vocabulary companion:** `NEI_NATIVE_VOCAB_0_2.md` / `NEI_VOCAB_0_2.isg`  
**Growth rule:** adds no Core primitive and no new exact NEI result status; it revises how identity authority/evidence is represented and introduces an optional probabilistic evidence-strength layer

NEI 0.4 makes three substantive corrections:

1. **SAME and DISTINCT are derived outputs, never profile-declared answers.**
2. **Probabilistic identity evidence is represented explicitly and may carry a Bayesian evidence weight, but probability never substitutes for exact identity truth.**
3. **QU is part of the identity problem whenever unresolved structure can affect identity or identity evidence. A loss of QU structure is a loss of identity information.**

This is a semantic revision candidate, not merely wording cleanup. Qualified NEI 0.1 + 0.2 remain current authority until this revision is independently qualified and promoted.

---

# 0. Constitutional barriers

Do not collapse these distinctions:

```text
identity question
    != identity answer

identity query context/profile
    != declaration of SAME or DISTINCT

structural equivalence
    != automatic NEI SAME

represented difference
    != automatic NEI DISTINCT

identity evidence
    != identity truth

strong probabilistic evidence
    != exact SAME

weak probabilistic evidence
    != exact DISTINCT

posterior probability
    != NEI classification

Bayes factor
    != posterior probability

identity evidence weight
    != independent evidence count

multiple observations
    != multiple independent observations

QU realization family
    != probability distribution over realizations

opaque UNKNOWN
    != QU

missing QU
    != semantic NEI UNKNOWN

same scoped quotient
    != global natural identity

exact identity theorem/certificate
    != finite probabilistic weight

evidence lineage
    != evidence independence
```

These barriers are normative.

---

# 1. Identity must emerge

NEI is intended to answer an identity question from represented structure and evidence.

The governing direction is:

```text
represented facts
+ domain structure
+ constraints
+ causal / temporal / ownership structure
+ exact evidence
+ probabilistic evidence
+ QU when identity-relevant uncertainty exists
    ->
admissible identity models
    ->
derived NEI result
```

The system MUST NOT require an application to predeclare:

```text
relation R is identity-preserving
relation S is identity-separating
```

as a shortcut for the conclusion it is supposed to derive.

A domain may contain exact relations, physical laws, causal facts, replacement events, equality theories, legal identities, lineage facts, or other structure that constrains admissible identity models. NEI reasons from those semantics.

If those facts force one identity relation, the result follows.

If they do not, the identity remains unresolved.

This replaces the earlier successor-research habit of treating profile-owned “identity-preserving” and “identity-separating” tags as primary identity authority.

Historical qualified claims under NEI 0.1 + 0.2 remain interpreted under their original revisions.

---

# 2. Identity query context

NEI still requires an explicit query context, but that context defines the question rather than its answer.

A pinned identity query context `P` provides, as applicable:

```text
queried carrier/domain
queried referents or anchors
claim scope
temporal / spatial / causal frame
which represented observations are in scope
domain laws and constraints
admissible transformations / projections
provenance and revision dependencies
closure/completeness authority
applicable QU state
applicable probability model authority
```

It MUST NOT contain a field whose semantics are merely:

```text
if relation R is present, call these subjects SAME
```

unless that relation itself is an exact identity theorem in the represented object/domain theory. In that case NEI consumes the theorem as exact evidence; the profile does not manufacture its identity meaning.

The query context answers:

> Which identity question are we asking, over what domain and evidence?

It does not answer:

> Are these two referents the same?

---

# 3. Exact identity model family

For a query over referents `a,b`, NEI constructs or characterizes the admissible identity-model family:

```text
M(P,E[,Q])
```

where:

- `P` is the pinned identity query context;
- `E` is the fixed exact represented evidence/dependencies;
- `Q` is the pinned QU state whenever unresolved identity-relevant structure matters.

Each admissible model contains an identity equivalence relation over the applicable carrier and MUST satisfy every represented domain constraint and exact identity-relevant fact admitted by the query.

No coarseness preference exists.

No compression preference exists.

No “merge unless disproven” rule exists.

No “keep separate unless proven same” rule is silently substituted for the semantic model family.

The exact result is derived:

## SAME

```text
NEI(a,b) = SAME
```

iff every admissible identity model in the qualified nonempty family makes `a` and `b` coidentical.

## DISTINCT

```text
NEI(a,b) = DISTINCT
```

iff every admissible identity model in the qualified nonempty family separates `a` and `b`.

## UNKNOWN

```text
NEI(a,b) = UNKNOWN
```

iff the qualified nonempty model family contains at least one admissible SAME model and at least one admissible DISTINCT model.

This preserves the qualified NEI 0.1 distinction:

```text
semantic UNKNOWN
    != missing authority
    != incomplete computation
    != absent QU
```

If the necessary model family cannot be defined because required identity/QU/anchor/closure authority is absent, the query remains incomplete/unqualified.

---

# 4. QU is the uncertainty substrate of NEI

Whenever unresolved structure can affect identity classification, QU is not auxiliary metadata. It is part of the identity state.

The governing relation is:

```text
known identity-relevant structure
        +
QU = maximally constrained represented structure
     of what remains unresolved
        ->
admissible identity models
        ->
NEI
```

A loss of QU structure is a loss of identity information.

NEI MUST use QU when unresolved identity-relevant possibilities can affect:

- SAME versus DISTINCT classification;
- the admissibility of an identity model;
- query-anchor correspondence;
- evidence relevance;
- evidence dependence;
- probabilistic likelihood;
- Bayesian evidence weight;
- scope/closure of a claimed identity result.

A bare `UNKNOWN` marker cannot substitute for QU.

These information states are not interchangeable:

```text
A.x -> u
B.x -> u
```

```text
A.x -> u1
B.x -> u2
constraint value(u1) = value(u2)
```

```text
A.x -> UNKNOWN
B.x -> UNKNOWN
```

The first shares one unresolved referent.

The second has two distinct represented referents constrained equal in value.

The third preserves almost none of that identity-relevant structure.

NEI MUST NOT infer identity as though these states were equivalent.

---

# 5. Missing QU fails closed

If unresolved identity-relevant structure exists but the required QU possibility universe, constraints, anchors, or closure authority have not been represented, then:

```text
identity query = INCOMPLETE / UNQUALIFIED
```

not:

```text
SAME
DISTINCT
UNKNOWN
```

Semantic `UNKNOWN` remains a positive exact statement about a qualified admissible model family containing both identity outcomes.

Missing representation is not such a family.

---

# 6. Identity evidence

NEI 0.4 uses **identity evidence** as the general term for observations that bear on an identity hypothesis.

Do not use “sameness hint” as a semantic term.

Identity evidence may favor coidentity, favor separation, or be neutral.

The preferred directional terms are:

```text
coidentity evidence
separation evidence
identity-neutral evidence
```

These are evidence directions, not NEI results.

Each material identity-evidence item should preserve, as applicable:

```text
observation
queried identity hypothesis
scope
authority revision
evidence provenance / lineage
QU dependencies
conditioning context
dependence relations to other evidence
probability-model authority
exact versus probabilistic status
evidence strength when qualified
```

---

# 7. Exact evidence versus probabilistic evidence

## 7.1 Exact identity-relevant evidence

Exact evidence constrains the admissible identity-model family directly.

Examples may include:

- exact causal continuity/discontinuity facts;
- exact physical exclusivity constraints;
- exact reconstruction theorem;
- exact legal/domain identity theorem;
- exact replacement/destruction fact;
- exact object-theory result under a qualified bridge;
- exact impossibility certificate.

Exact evidence SHOULD NOT be encoded as an arbitrarily huge finite Bayesian weight.

If exact evidence eliminates all models of one identity outcome, exact NEI classification follows through the model family.

## 7.2 Probabilistic identity evidence

Probabilistic evidence changes epistemic support among unresolved identity hypotheses without itself establishing exact NEI truth.

For identity hypothesis `I` and observation `E` under conditioning context `C`:

```text
BF_I(E | C)
    =
P(E | I, C)
/
P(E | not-I, C)
```

The preferred stored strength is the log Bayes factor:

```text
w_I(E | C) = log BF_I(E | C)
```

with the logarithm base explicitly represented when serialized.

Interpretation:

```text
w > 0   -> evidence favors coidentity
w = 0   -> identity-neutral evidence
w < 0   -> evidence favors separation
```

NEI defines no universal verbal scale such as “weak”, “strong”, or “decisive” at fixed thresholds.

A domain may define display categories, but they are presentation policy, not semantic NEI truth.

---

# 8. Bayes factor is not posterior probability

A Bayes factor measures how one observation changes relative support between identity hypotheses.

It does not include a prior.

If a qualified prior is available:

```text
posterior odds
    =
prior odds
*
joint Bayes factor
```

or in log form:

```text
log posterior odds
    =
log prior odds
+
log joint Bayes factor
```

An application MUST NOT invent a prior merely to produce a posterior identity probability.

A posterior probability, when available, is an epistemic confidence quantity.

It is not an NEI result status.

NEI MUST NOT define a threshold such as:

```text
P(identity) > 0.999999
    -> SAME
```

nor:

```text
P(identity) < 0.000001
    -> DISTINCT
```

Exact identity truth and probabilistic confidence remain separate dimensions.

---

# 9. Evidence dependence is load-bearing

Bayesian evidence weights are additive in log space only under the represented independence conditions.

For observations `E1...En`:

```text
sum_i log BF(Ei)
```

is valid only when the required conditional-independence assumptions are qualified under the identity hypotheses and conditioning context.

Five observations produced by one underlying cause are not five independent pieces of evidence merely because they appear in five files or measurements.

NEI probabilistic evidence MUST preserve:

- evidence lineage;
- shared causal source;
- known conditional dependence;
- shared measurement process;
- derived-versus-independent observations;
- model coupling through QU.

When independence is not established, use a qualified joint likelihood model or preserve the dependence unresolved.

Do not double-count correlated evidence.

---

# 10. QU precedes Bayesian aggregation

When probabilistic identity evidence depends on unresolved structure, likelihood evaluation is conditioned on QU.

For realization `r in R(Q)`, evidence strength may be realization-relative:

```text
w_I(E | r)
```

A single scalar weight is justified only when one of these conditions is met:

1. the evidence weight is invariant across every admissible realization relevant to the claim; or
2. a qualified probability model over the unresolved structure supplies the required marginal likelihoods under both identity hypotheses; or
3. an exact theorem reduces the QU dependence to a determinate value.

QU by itself supplies an admissible realization family.

It does **not** automatically supply a probability distribution over that family.

Therefore, absent qualified probability authority, NEI MUST NOT silently average over QU realizations.

Instead preserve the structured result, for example as:

```text
realization-conditioned evidence function
set/range of admissible evidence weights
symbolic likelihood expression over Q
```

or another exact information-preserving representation.

This prevents Bayesian arithmetic from inventing an uncertainty distribution that the represented knowledge never supplied.

---

# 11. Robust evidence under QU

QU can strengthen probabilistic reasoning even when it does not yield one scalar weight.

Examples:

## Robust coidentity evidence

If:

```text
for every admissible r in R(Q):
    w_I(E | r) > 0
```

then the evidence robustly favors coidentity across the represented uncertainty.

This still does not imply exact NEI `SAME`.

## Robust separation evidence

If:

```text
for every admissible r in R(Q):
    w_I(E | r) < 0
```

then the evidence robustly favors separation.

This still does not imply exact NEI `DISTINCT`.

## Directionally unresolved evidence

If admissible realizations contain both positive and negative evidence weights, then the evidential direction itself depends on unresolved structure.

That dependence must remain represented in QU.

---

# 12. Exact result and probabilistic confidence can coexist

A complete NEI record may contain both:

```text
exact identity status
probabilistic identity evidence/confidence
```

when both are meaningful.

Examples:

```text
SAME + finite probabilistic evidence record
```

may occur when an exact theorem settles identity while empirical evidence is retained for provenance or model calibration.

Likewise:

```text
UNKNOWN + posterior odds
```

may be meaningful when exact represented possibilities still permit both identity outcomes but a qualified probabilistic model assigns them different plausibilities.

The probability layer does not overwrite the exact semantic layer.

---

# 13. Profiles no longer own identity-preserving/separating tags

NEI 0.4 deprecates, for successor claims, the profile pattern:

```text
identity-preserving law
identity-separating law
```

when those fields merely label application relations with the desired identity answer.

Successor query contexts should instead preserve:

- ordinary domain laws;
- ordinary observations;
- exact constraints;
- query scope;
- model authority;
- probability authority;
- QU structure.

NEI then derives which identity models survive.

Historical NEI 0.1/0.2 artifacts using the older roles remain valid under their exact qualified revisions.

The old native roles are not retroactively reinterpreted.

---

# 14. Structural correspondence remains evidence, not identity

An isomorphism, bisimulation, equal fingerprint, same quotient class, common proof role, equal behavior vector, or equal operation-word result may be important identity evidence.

None is automatically `SAME`.

Its effect depends on the represented identity model and evidence authority.

The correct path is:

```text
structural correspondence
    ->
identity evidence item
    ->
exact/probabilistic identity model
    ->
derived NEI result
```

not:

```text
structural correspondence
    -> SAME
```

This keeps Discovery Protocol output separate from identity authority.

---

# 15. Scoped quotients

NEI 0.3's scoped-quotient discipline is retained.

If:

```text
Q_S(a) = Q_S(b)
```

then the quotient establishes exactly the relation owned by scope `S`.

That equality may become identity evidence for a broader NEI query, but it does not automatically establish global identity.

Any unresolved distinction that can affect the wider identity question must remain represented through QU or exact evidence.

---

# 16. Evidence evolution and QU refinement

As QU refines, identity evidence may refine.

A genuine QU refinement can:

- narrow the admissible identity-model family;
- narrow a range of admissible Bayes factors;
- change a robust evidence direction into a determinate scalar;
- resolve semantic `UNKNOWN` into exact `SAME` or `DISTINCT`;
- invalidate a probabilistic model whose conditioning assumptions no longer hold.

Historical claims remain tied to their exact P/E/Q revisions.

A later result does not rewrite an earlier claim.

---

# 17. Anti-circularity

The desired identity result MUST NOT choose the evidence model or QU restriction later cited as proof of that identity.

Forbidden shape:

```text
want SAME
    ->
restrict QU to SAME-compatible realizations
    ->
fit likelihood model on restricted family
    ->
obtain large positive Bayes factor
    ->
claim SAME
```

Likewise, a desired DISTINCT result cannot manufacture a separating prior, evidence model, or QU restriction.

Evidence and uncertainty authority must be independently pinned.

---

# 18. Native representation consequences

Successor native NEI representation requires roles for:

- identity query context;
- identity carrier and scope;
- queried subjects/anchors;
- exact evidence;
- probabilistic evidence;
- evidence provenance/lineage;
- evidence dependence;
- likelihood-model authority;
- Bayes factor / log Bayes factor;
- optional prior/posterior odds;
- QU dependency;
- realization-conditioned evidence;
- evidence-weight range/set when no lawful marginal exists;
- admissible identity-model family;
- exact NEI result;
- qualification/completeness state.

The native vocabulary companion defines these roles without adding parser syntax.

---

# 19. Qualification targets

NEI 0.4 MUST NOT be promoted until fresh qualification covers at least:

1. SAME emerges from admissible identity models without a profile field declaring the pair identity-preserving;
2. DISTINCT likewise emerges from represented constraints rather than a profile answer tag;
3. strong positive probabilistic evidence does not become exact SAME;
4. strong negative probabilistic evidence does not become exact DISTINCT;
5. an optional posterior changes with a prior while the Bayes factor remains unchanged;
6. correlated observations cannot have log Bayes factors naively summed;
7. conditionally independent observations can be combined under an explicit independence authority;
8. identity evidence whose likelihood varies across QU realizations remains realization-conditioned or range-valued when no probability distribution over Q is qualified;
9. qualified probability authority permits lawful marginal likelihoods over QU;
10. missing identity-relevant QU leaves the claim incomplete rather than UNKNOWN;
11. one shared unresolved referent and two distinct-but-value-equal unresolved referents remain different identity information states;
12. exact evidence can force SAME/DISTINCT without being encoded as an arbitrary finite evidence weight;
13. semantic UNKNOWN may coexist with non-neutral posterior odds;
14. a scoped quotient supplies only scoped evidence and does not silently become global SAME;
15. evidence-lineage duplication is not double-counted as independent evidence;
16. anti-circularity rejects identity-driven QU restriction or likelihood construction.

---

# 20. Working summary

```text
Identity is derived.

The query context asks the question.
It does not declare the answer.

Facts and constraints shape admissible identity models.
Exact identity follows only when the model family forces it.

Identity evidence may be probabilistic.
Its preferred strength measure is a log Bayes factor.

Evidence strength is not identity truth.
Posterior probability is not NEI SAME/DISTINCT.

QU is the uncertainty substrate of NEI.
If unresolved structure can affect identity or identity evidence,
represent it.

A loss of QU structure is a loss of identity information.

Never invent a probability distribution over QU.
Never double-count correlated evidence.
Never convert missing authority into semantic UNKNOWN.

SAME and DISTINCT should fall out of the represented structure
because they are true under the identity question,
not because an application profile told NEI to say so.
```

All qualified NEI 0.1 + 0.2 claims remain historical/current authority until this successor revision is independently qualified and promoted.
