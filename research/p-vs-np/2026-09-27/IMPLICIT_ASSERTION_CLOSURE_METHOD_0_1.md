# P versus NP implicit-assertion closure campaign 0.1

**Status:** active research closure process  
**Primitive authority surface:** `P_VS_NP_PRIMITIVE_BUNDLE_0_3.isg`  
**Identity overlay:** `P_VS_NP_NEI_OVERLAY_0_2.isg`  
**Assertion semantics:** Core 0.19 implicit-assertion discipline  
**Primitive-closure discipline:** Core 0.20 candidate  
**QU authority:** qualified QU 0.1  
**NEI authority:** qualified NEI 0.4

## Goal

Recover exact assertions that are not directly written as source assertions but are forced by the primitive represented system.

The campaign does **not** claim universal theorem-proving completeness.

It does attempt systematic closure over the classes of inference that are load-bearing for the current P-vs-NP problem.

## Admission fields

Every admitted implicit assertion record carries:

```text
ID
assertion body
support mode
scope
premises
governing authority
derivation witness
QU dependency
NEI dependency where any
provenance lineage
side conditions
resource/completeness status
downstream relevance
```

Only `EXACT` implicit assertions are admitted in the current campaign.

No Bayesian assertions are needed unless a separately qualified probability model enters later.

## Inference families exercised

The closure campaign runs these exact families repeatedly.

### L — first-order logical closure

- conjunction elimination/introduction;
- implication application;
- biconditional direction extraction;
- contradiction/exclusion;
- quantifier instantiation/generalization where side conditions permit;
- equality reflexivity/symmetry/transitivity;
- equality substitution.

### D — datatype/constructor closure

- constructor disjointness;
- field functionality;
- constructor extensionality;
- structural induction consequences;
- unique recursive measurement where derivable.

### R — relation/function closure

- totality + functionality -> unique result;
- exact recursive relation composition;
- reachability decomposition/composition;
- terminal/no-successor consequences.

### A — arithmetic closure

- order consequences from additive definition;
- polynomial-bound consequences from primitive arithmetic;
- finite fixed-structure quantities become input-independent constants;
- composition of represented polynomial bounds when explicitly derivable.

### C — computation closure

- deterministic transition uniqueness -> unique next configuration;
- deterministic path uniqueness;
- functional realization is a special case of branching realization;
- fixed finite branching yields constant local branching;
- bounded path -> polynomial-length choice/certificate representation;
- deterministic path verification;
- branch/certificate factorization.

### N — NEI-supported identity closure

- constructor extensionality -> exact SAME;
- exact disequality -> exact DISTINCT;
- scoped future-behavior equivalence -> scoped SAME;
- unresolved identity-relevant continuation -> QU-mediated identity rather than guessed SAME.

### O — objective-scoped closure

Only when the declared target contract is included:

- internal witness identity is not externally required if only extensional Boolean language value is observable;
- alternate realizations may be substituted if they preserve the target relation.

These are kept separate from source-semantic assertions.

## Iteration

```text
A0 = explicit primitive assertion schemas

A1 = A0 + pass-1 exact implicit assertions

A2 = A1 + consequences using A1

...

stop one operational run only when:
    one full selected-family pass adds no assertion
    and refines no material support lineage.
```

Operational fixed point is not a claim that no undiscovered exact consequence exists.

## Failure discipline

A candidate is not admitted when any of these remains unresolved:

```text
hidden premise
missing rule authority
scope ambiguity
QU dependence not represented
identity scope ambiguity
proof/certificate gap
resource-only inability to verify
circular support
```

It remains on the residual candidate ledger.

## Search-order discipline

Implicit closure precedes the next major DP campaign.

After each material closure round:

```text
implicit assertions
    -> NEI re-evaluation
    -> DP re-evaluation.
```

DP discoveries that are exact logical consequences are fed back into the implicit layer only after independent Core-0.19 admission review.
