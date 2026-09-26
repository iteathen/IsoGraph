# DP 0.7 exact-closure rerun diagnostic 0.3

**Status:** DIAGNOSTIC ONLY — NOT QUALIFICATION EVIDENCE  
**Workflow run:** `36223276471`  
**Experiment SHA:** `26eaf3862368ef1e8047d2606b779a09b445321d`  
**Evidence commit:** `719d5d09c3a3971d3fc1fce5be5ca54f1b5fc0e7`  
**Protocol revision:** `b0b0d7f19f35bdd6e651aca7e31132f6cbffb800`  
**Prompt revision:** `1a4ea6207c3c9f5c0e6d0c7d9ec3a523729682f3`  
**Selected model:** `gemini-3.1-flash-lite`  
**Packet SHA-256:** `7bd559b8ec778f6485db93996120299ada3d07e410597d964090fbf90f1bb2a0`  
**Report SHA-256:** `ec7b90d9167f8768671899bbe256bcdb9048c84e0863e8263e595710f2921b90`

## Purpose

This rerun tested the new DP 0.7 exact-witness support-closure rule and an explicit blind-output audit schema.

It reused the same six ESR-qualified/Q7-promoted native bundles.

## Observed behavior

The reasoner again returned `EXACT_WITNESS` for all three cases.

The added audit fields did not create real primitive closure. Each case was reduced to one vague support check with an `Identity` transformation and a self-declared `PASS`.

Examples:

- case-01: identity transformation over “Energy and weight definitions”;
- case-02: identity transformation over “Parity row definitions”;
- case-03: identity transformation over “Hamiltonian and derivative definitions”.

This does not satisfy DP 0.7 section 13.1 as amended.

The result therefore demonstrates:

```text
required self-audit fields
    !=
independent support closure
```

and:

```text
model-declared PASS
    !=
verified exact witness
```

## Independent authority defect discovered during review

The packet also lacks explicit semantic authority for several laws required to establish the known positive transformations.

Case-01 exact transformation requires, among other things:

- ordinary real addition/multiplication/negation/distribution;
- finite-sum/fold semantics;
- exponential transport over an additive state-independent constant;
- semantics of an undirected regular-degree interaction graph sufficient for the required incidence counting.

Case-03 exact transformation requires, among other things:

- ordinary real multiplication/division;
- positivity implying nonzero denominator where used;
- time-derivative semantics;
- constant-scalar derivative linearity.

Those laws are not represented in the promoted native bundles and are not pinned by any authority currently included in the blind packet.

Under the Core 0.19 exact-rendering discipline, pretrained familiarity with those laws cannot substitute for explicit authority.

Therefore this run cannot establish DP 0.7 exact-discovery qualification even if its proposed transformations had been mathematically correct.

## Required correction

Before the next qualification attempt:

1. add an explicit experiment-scoped semantic authority containing only the generic operation/graph/derivative laws needed to interpret and transform the represented structures;
2. pin that authority in the discovery manifest and packet hash;
3. keep correspondence oracles, parameter mappings, and expected witnesses withheld;
4. require every nonliteral transformation step in an exact-witness audit to cite the semantic authority it uses;
5. preserve the independent hidden-oracle score after the blind report is frozen.

No Core primitive change is indicated.
