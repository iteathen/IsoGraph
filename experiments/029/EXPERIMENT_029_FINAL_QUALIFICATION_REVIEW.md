# Experiment 029 — Core 0.19 Final Qualification Review

**Candidate:** `CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md`  
**Candidate Git blob:** `ae482dda774456a855af942dc8d15fcfd5aae0bb`  
**Candidate SHA-256:** `8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2`  
**Formal disposition:** **DOES_NOT_QUALIFY**  
**Scored workflow run:** `36232773749`  
**Frozen source SHA:** `cd96569b4f89d946382a89da2a94665dace30eaf`  
**Evidence commit:** `396055367a7ac96a867cea44809f07e0db03bdc5`

## Result

```text
case coverage:          24 / 24
PASS:                   23
FAIL:                    1
mismatches:              1
scoring guards:          all true
module assessment:       SUPPORTED
formal disposition:      DOES_NOT_QUALIFY
```

The sole failing case is D09.

All other implicit-assertion controls D01–D08 and D10–D18 passed.

All exact-rendering boundary controls D19–D24 passed.

The ESR predecessor remains separately successful at 6/6 qualified source renderings with Q7 promotion.

## D09 mismatch

D09 asked whether, after a qualified QU refinement Q0 -> Q1 and proof that proposition P holds in every admissible realization of Q1:

- Q1 is a refinement;
- P may receive exact implicit support;
- P's **assertion body** must remain QU-conditional;
- provenance must retain the refinement/universality witness.

The frozen decoder answered:

```text
q1_is_refinement:                       true
p_exact_implicit:                       true
qu_condition_required_in_assertion_body:true
provenance_retains_refinement_witness: true
```

The hidden contract expected only the third field to be false.

## Why the frozen failure is retained

Core 0.19 itself distinguishes:

```text
assertion body != assertion support
```

and section 16 target 9 explicitly requires:

> a universally invariant result may discharge QU from the conclusion while retaining provenance.

QU 0.1 likewise defines a NECESSARY claim over a realization family as one that holds for every admissible realization.

Therefore the intended distinction is:

```text
assertion body:
    P

support/scope/provenance:
    qualified Q1 realization family
    + Q0 -> Q1 refinement
    + universality witness
```

The reasoner correctly recovered exactness and retained provenance, but conflated the support/scope dependency with a requirement to embed the QU condition in the assertion body itself.

That is one false negative under the frozen contract.

The score is not rewritten.

## Infrastructure history

Initial workflow run `36232502296` produced malformed JSON because the 32,768 output budget was consumed by hidden reasoning and terminated with `MAX_TOKENS`.

That run is infrastructure-only evidence and is recorded in `EXECUTION_DIAGNOSTIC_0_1.md`.

The output budget was changed to 65,536 under RED→GREEN deterministic testing before the scored run.

## Next qualification action

Do **not** replay D09 or the same D01–D24 packet merely to obtain a favorable answer.

Use a fresh focused holdout for the exact D09 distinction:

- assertion body versus support/scope;
- invariant QU discharge from the conclusion;
- provenance retention;
- adversarial near-misses where QU cannot be discharged;
- later scope escape prevention.

If that fresh focused delta passes at the same candidate bytes, it may be combined with the 23/24 unaffected Experiment 029 evidence and the successful ESR predecessor as the qualification chain for Core 0.19.

Until then Core 0.19 remains unqualified.
