# Experiment 016 — NEI 0.4 Final Qualification Review

**Disposition:** QUALIFIES  
**Qualified semantic candidate:** `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md`  
**Candidate SHA-256:** `6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee`  
**Qualification branch:** `qualification/nei-0-4-016-20260919`  
**Trigger SHA:** `0bb78c5038ebea387e60154470d36c7b78be9650`  
**Workflow run:** `35478421676`  
**Workflow attempt:** 1  
**Cold model:** `gemini-3.5-flash`  
**External semantic calls:** 1  
**Provider retries:** 0  
**Authority effect of this review:** qualifies the exact NEI 0.4 semantic candidate; promotion/routing is a separate repository action

## 1. Frozen evidence identity

Dry and live packet SHA-256 were identical:

```text
5a303d9f5634a5bc6895d33b7553efd2930621c3cdb15369ceaa31aea6b4eefd
```

Frozen report SHA-256:

```text
299d943f741adb6e7650f429cad38ee4def91f7ad2404295bbb35fecde178bfe
```

The API returned HTTP 200 in one attempt and terminated normally.

The cold packet contained:
- Core 0.17;
- QU 0.1;
- qualified historical NEI 0.1/0.2;
- NEI 0.3 precursor;
- NEI 0.4 candidate;
- NEI native vocabulary 0.2 explanatory companion;
- public Q01-Q18 holdout;
- public serializer contract.

It excluded hidden assertions, scorer, author audit, prior evidence and expected semantic answers.

## 2. Deterministic preflight

Before the external call:

- runner syntax passed;
- scorer syntax passed;
- scorer self-test passed;
- a perfect synthetic report qualified;
- a one-field identity overclaim was rejected;
- dry packet isolation passed;
- packet manifest contained the required candidate/QU/cases;
- no hidden/scoring path entered the cold packet.

**Disposition: PASS.**

## 3. Cold semantic result

The frozen cold report returned Q01-Q18 exactly once and in order.

Deterministic score:

```text
disposition          QUALIFIES
NEI 0.4              PASS
failed cases         none
duplicates           none
unexpected cases     none
case coverage        exact
packet self-audit    true
module assessment    SUPPORTED
```

All 18 proposition-specific cases passed with zero mismatches.

## 4. Qualified semantic obligations

### Derived identity, not profile answer tags

Q01 and Q18 reconstructed SAME from uniqueness/domain constraints with no profile declaration of sameness.

Q02 reconstructed DISTINCT from simultaneous disjoint-location constraints with no identity-separating answer tag.

**PASS.**

### Exact identity versus probabilistic evidence

Q03 and Q04 kept exact semantic UNKNOWN despite Bayes factors of (10^9) and (10^{-9}).

No probabilistic threshold became SAME or DISTINCT.

Q13 correctly treated an exact identity theorem as exact evidence rather than an infinite/huge Bayesian weight.

Q14 correctly allowed semantic UNKNOWN to coexist with posterior identity probability 0.9.

**PASS.**

### Bayes factor versus posterior

Q05 kept BF=10 fixed while changing prior odds changed posterior odds from 10 to 10/9.

**PASS.**

### Evidence dependence and lineage

Q06 recognized three files derived from one sensor event as one independent evidence event and required a joint/dependence model.

Q07 allowed BF factorization only under explicit qualified conditional independence and recovered joint BF=15.

Q16 retained one evidence event across five derivative artifacts and prohibited multiplying them as independent evidence.

**PASS.**

### QU as identity uncertainty substrate

Q08 refused to marginalize QU-dependent evidence into one scalar without a probability distribution and preserved realization-conditioned/set-valued evidence.

Q09 recognized robust coidentity evidence across every QU realization without promoting exact SAME.

Q10 lawfully marginalized only because a qualified probability model over QU was supplied, recovering:

```text
P(E|I)       = 0.6
P(E|not-I)   = 0.25
BF           = 2.4
exact NEI    = UNKNOWN
```

Q11 classified missing identity-relevant QU as INCOMPLETE_UNQUALIFIED rather than semantic UNKNOWN.

Q12 preserved the information difference between one shared unknown referent and two distinct equal-valued unknown referents.

**PASS.**

### Scoped equivalence versus global identity

Q15 preserved exact scoped quotient equivalence while keeping the wider identity query UNKNOWN.

**PASS.**

### Anti-circularity

Q17 rejected restricting QU to SAME-compatible realizations and fitting evidence on that restricted family.

**PASS.**

## 5. Resource discipline

The qualification used exactly one external semantic invocation.

No second invocation was used for reassurance or score improvement.

No provider retry was consumed.

**PASS.**

## 6. Historical authority

This qualification does not rewrite historical NEI 0.1/0.2 evidence.

Their exact prior qualification remains valid at those revisions.

NEI 0.4 is a successor semantic revision that changes the active architecture:
- SAME/DISTINCT emerge from admissible identity models;
- profile answer tags are not the current mechanism;
- exact/probabilistic evidence are distinct;
- Bayesian evidence is dependence-aware;
- QU is mandatory when identity-relevant unresolved structure matters;
- QU does not invent a probability distribution.

Historical claims remain interpretable at their pinned revisions.

## 7. Scope limits

This qualification does not prove:
- a universal ontology of identity;
- correctness of every future domain's probability model;
- that every identity query has a Bayesian interpretation;
- that a specific Connect4 q theorem is true;
- that QU supplies probabilities;
- universal discovery completeness.

It qualifies the declared NEI 0.4 semantic contract.

## 8. Final disposition

```text
frozen candidate identity                     PASS
cold isolation                                PASS
derived SAME/DISTINCT                         PASS
probabilistic evidence != exact identity      PASS
BF != posterior                               PASS
evidence dependence/lineage                   PASS
QU-conditioned evidence                       PASS
missing QU fail-closed                        PASS
shared-vs-split unknown structure             PASS
exact evidence                                PASS
scoped quotient discipline                    PASS
anti-circularity                              PASS
all 18 holdout cases                          PASS
external semantic calls                         1
mismatches                                      0
formal disposition                        QUALIFIES
```

**NEI 0.4 QUALIFIES at SHA-256 `6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee`.**
