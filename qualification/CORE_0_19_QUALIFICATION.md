# Core 0.19 Qualification Authority — 2026-09-26

**Status:** qualified cumulative Core clarification  
**Base Core authority:** `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md` + exact qualified Core 0.18 clarification  
**Qualified clarification artifact:** `CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md`  
**Core 0.19 SHA-256:** `8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2`

Core 0.19 is qualified at the exact tested bytes as a cumulative clarification over the current qualified Core.

The historical `_CANDIDATE` filename is retained because those exact bytes were tested. Filename spelling does not determine qualification status.

## Formal evidence chain

### Experiment 029 — broad holdout

Workflow run:

`36232906621`

Frozen SHA:

`db80f31a84b103210f5772740f5fdfc2ffe15bae`

Evidence commit:

`55975f0571b3862b60a0c5130d8c0045c968f1bd`

Frozen formal disposition:

`DOES_NOT_QUALIFY`

The failed disposition remains immutable.

Its frozen score established:

```text
section-16 implicit-assertion cases: 18 / 18 PASS
section-18 policy cases:               7 / 8 PASS
total:                                25 / 26 PASS
scoring guards:                       all true
only failed case:                     C25
```

Post-freeze review found that C25's public key `mutation_control_passes` ambiguously conflated mutation preservation with successful adversarial failure detection.

The reasoner's C25 explanation itself applied Core 0.19 section 18.11 correctly.

The frozen score was not changed.

Records:

- `experiments/029/EXPERIMENT_029_FINAL_QUALIFICATION_REVIEW.md`
- `experiments/029/C25_CONTRACT_DIAGNOSTIC.md`

### Experiment 030 — fresh corrected mutation regression

Successful workflow run:

`36233426103`

Frozen regression SHA:

`8bd51f07f300fa5e57bef25ce914536024f55513`

Evidence commit:

`0e6e1220e549e1cc4c03392f1257ce124a559257`

Formal disposition:

`QUALIFIES`

Result:

```text
R01 mutation preserved:       PASS
R02 familiar-form repair:     PASS
case coverage:                2 / 2 PASS
mismatches:                   0
scoring guards:               all true
module assessment:            SUPPORTED
```

Packet SHA-256:

`b302cfdd401700612422c77c66d506af6c0e333e7466cc0b0333fcfc39cff4a6`

Report SHA-256:

`4dd36d15fd00164f80d75a95af456cc8ccac63dd4832284cb0e6e3daf7aecd46`

The fresh public fields separately asked:

- whether the decoder preserved the mutated distinction;
- whether exact-rendering qualification passes;
- whether familiar-form repair is allowed.

This discharges the only unresolved semantic burden left by Experiment 029 without rescoring Experiment 029.

### Concrete section-18 exact-rendering evidence

The DP 0.7 three-positive-control campaign independently exercised Core 0.19 section 18 on six source-to-native renderings.

Promotion record:

`research/project-discovery/2026-09-25-dp07-three-positive-controls/translation-v2/PROMOTION_0_1.json`

It pins:

```text
contract:           ESR-0.1
core requirement:   Core 0.19 section 18
all six qualified:  true
Q7 promotion:       PASS
```

Every promoted rendering passed the campaign's:

- source interpretation freeze;
- zero-gap semantic coverage;
- parse/signature/binding/dependency closure;
- at least two independent native-only cold reconstructions;
- exact source/reconstruction sameness;
- adversarial one-distinction controls;
- scorer-blind verification;
- explicit downstream-use promotion.

This supplies concrete reconstruction evidence in addition to Experiment 029/030's constitutional policy cases.

## Qualified Core 0.19 scope

The qualification establishes the tested Core 0.19 clarification semantics for:

### Assertion/support separation

- assertion body and assertion support remain distinct;
- explicit support records direct source provenance and does not amplify truth;
- implicit support requires represented premises, authority, scope, witness, and lineage;
- one assertion body may retain multiple materially distinct support paths.

### Exact implicit support

- necessary unstated consequences may receive exact implicit support under pinned authority;
- familiar but unrepresented premises cannot be imported;
- scope and conditions propagate;
- support cannot gain stronger authority than its grounds;
- recoverable support provenance remains mandatory.

### Grounding and iteration

- grounded support cycles are permitted;
- ungrounded self-supporting cycles cannot manufacture validity;
- later implicit assertions may depend on earlier implicit assertions;
- dependency-closed lineage is preserved;
- derivation depth alone does not weaken exact support;
- an operational no-change pass may stop one selected procedure without proving universal semantic closure;
- failure to discover does not prove non-derivability.

### QU and probabilistic discipline

- load-bearing QU dependencies propagate transitively unless validly refined/discharged;
- qualified QU refinement may support later assertions;
- invariance across all admissible realizations may establish exact support while preserving QU provenance;
- QU possibility structure does not supply a probability distribution;
- Bayesian implicit support requires separately pinned probability-model authority;
- evidence dependence/joint structure remains load-bearing;
- no probability threshold silently upgrades Bayesian support to exact truth.

QU remains a separately versioned qualified dependency and is not imported into Core.

### Provenance and discovery neutrality

- explicit and implicit support may coexist for the same assertion body;
- later implicit derivation does not rewrite source-explicit history;
- a comparison/discovery target may motivate search but cannot become validity evidence.

### Exact source rendering

A source-to-native exact-rendering claim requires zero unresolved semantic loss under the declared source interpretation, modulo qualified representation-only normalization.

Qualified behavior includes:

- primitive/qualified-leaf semantic closure;
- formula skeletons remaining partial rather than exact;
- no sidecar completion of missing load-bearing semantics;
- no silent import of familiar conventional mathematics;
- alternate forms requiring the exact claimed transformation witness;
- ambiguity and unknown structure remaining explicit;
- precision/modality/scope surviving rendering;
- adversarial mutations being reconstructed as mutated rather than repaired toward familiarity;
- incomplete renderings being blocked from source-faithful proof, discovery, comparison, and explicit assertion-support use.

## Current effective Core

Current Core authority is now cumulative:

```text
Core 0.17 qualified base
+
Core 0.18 qualified observation-first clarification
+
Core 0.19 qualified assertion-support / exact-rendering clarification
```

Core 0.19 adds no parser syntax, universal proof procedure, probability distribution, default prior, or new identity rule.

Its separately qualified dependencies remain separate modules.

## Historical evidence rule

Experiment 029 remains `DOES_NOT_QUALIFY` at its exact frozen contract.

Experiment 030 is the fresh corrected focused regression.

The six ESR renderings remain qualified only at their exact promoted packet revisions.

No historical failure is rewritten by this promotion.

## Qualification conclusion

Promote the exact Core 0.19 candidate bytes:

`8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2`

as the current cumulative Core clarification over Core 0.17 + Core 0.18.
