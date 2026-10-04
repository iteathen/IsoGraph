# Woit–Lisi Campaign Origin and Provenance

**Status:** current campaign-specific provenance record  
**Recorded:** 2026-10-03  
**Nature:** contemporaneous project record with preserved conversation origin

## WL-ORIGIN-001 — Woit–Lisi IsoGraph comparison

**Attribution:** Joshua Oshiro — HUMAN_ORIGINATED_DIRECTION.

On 2026-10-03 Joshua identified Peter Woit's and Garrett Lisi's programs as candidates for an IsoGraph isomorph search and directed that the campaign receive its own research directory.

The AI assistant formalized the initial blind two-track research protocol under that direction.

## WL-ORIGIN-002 — formulation-family bridge search

**Attribution:** Joshua Oshiro — HUMAN_ORIGINATED_IDEA.  
**Formalization:** AI assistant — AGENT_ASSISTED_FORMALIZATION.

Joshua observed that both researchers tend to express the same underlying ideas in multiple formulations, and that not every formulation will translate well to the other program. He directed the research to identify those same-author alternative expressions and determine which representatives provide the strongest bridge in each direction.

The methodological consequence is:

```text
one author
    != one canonical rendering

same-author idea
    -> multiple source-faithful formulations
    -> explicit intra-author relation/transform graph

cross-domain search
    -> compare formulation families
    -> select bridge-relative representatives only after closure
```

The agent formalized this into `FORMULATION_FAMILY_PROTOCOL_0_1.md`.

The provenance record does not claim that formulation equivalence, change of representation, normal forms, or cross-representation comparison are new mathematical concepts. The project-specific contribution being recorded is the decision to make **intra-author formulation-family recovery a mandatory blind stage of this IsoGraph comparison**, so that a cross-domain isomorph is not missed or manufactured by representative choice.

## WL-ORIGIN-003 — full independent IsoGraph treatment for both programs

**Attribution:** Joshua Oshiro — HUMAN_ORIGINATED_DIRECTION.
**Formalization:** AI assistant — AGENT_ASSISTED_FORMALIZATION.

On 2026-10-03 Joshua directed that both the Woit and Lisi programs receive the full IsoGraph treatment, rather than being rendered only deeply enough to search for the anticipated bridge.

This changes the campaign completion criterion: bridge-sufficient partial rendering is not completion. The agent formalized the requirement in FULL_ISOGRAPH_TREATMENT_CONTRACT_0_1.md and opened separate track dossiers under woit/ and lisi/.

## WL-ORIGIN-004 — isomorph-exposure frontier for axiomatic abstraction

**Attribution:** Joshua Oshiro — HUMAN_ORIGINATED_IDEA.  
**Formalization:** AI assistant — AGENT_ASSISTED_FORMALIZATION.

On 2026-10-03 Joshua identified the abstraction boundary itself as a discovery variable: the theories should be abstracted far enough that representation-specific bulk no longer hides a common structure, while retaining the generators and distinctions necessary for a nontrivial isomorph to appear.

The agent formalized this as the **isomorph-exposure frontier** in `ISOMORPH_EXPOSURE_FRONTIER_0_1.md`: use nested lawful abstractions, compare at several levels, require upward reconstruction, and stop before deleting load-bearing distinctions.

This is a project-specific research-method decision. It does not claim novelty for abstraction, quotienting, axiomatization, or mathematical isomorphism generally.

## WL-FINDING-001 — quaternionic chiral-action / twistor-incidence transform candidate

**Category:** RESEARCH_FINDING with EXTERNAL_ANTECEDENT source support.  
**Project finding recorded:** 2026-10-03.

During the first bridge-signature construction, the strongest candidate shifted from a direct named-object correspondence to a representation transform: Lisi's division/Clifford formulation exposes a vector-to-chiral-spinor action, while Woit's formulation exposes quaternionic projective twistor incidence. Lisi's 2026 source itself states that the quaternionic case of its algebraic relation is a Euclidean twistor incidence relation and cites Woit 2021.

The project-specific finding is not that this mathematical relationship was newly discovered; the external source already states it. The finding is that, under the IsoGraph formulation-family and isomorph-exposure method, this cross-presentation transform is currently the strongest candidate common quotient and should be tested below E8 rather than beginning from the full exceptional embedding.

Current artifact: `bridge/B01_B02_REPRESENTATION_TRANSFORM_CANDIDATE_0_1.md`.

## WL-FINDING-002 — graph-projectivization bridge invariant

**Category:** RESEARCH_FINDING / agent-assisted formalization of standard mathematics.  
**Recorded:** 2026-10-03.

The bridge campaign isolated a lower invariant beneath the named quaternionic/twistor and Clifford presentations: a typed bilinear action V x S_minus -> S_plus defines, for each v, the graph of a linear map; quotienting its nonzero chiral pairs by simultaneous scalar rescaling produces a parameterized projective incidence family.

This standard graph/projectivization fact is not claimed as new mathematics. The research finding is that it is the current **isomorph-exposure frontier** for the Woit–Lisi comparison: Woit independently supplies the Hom(S_R,S_L) action and projective twistor geometry, while Lisi independently supplies the vector/chiral-spinor multiplication and explicitly identifies its quaternionic case with Euclidean twistor incidence.

Artifact: `bridge/BT01_GRAPH_PROJECTIVIZATION_COMMON_CORE_0_1.md`.

## WL-FINDING-003 — paired-complex-structure intertwiner is the convention-safe BT01 frontier

**Category:** RESEARCH_FINDING / correction.  
**Recorded:** 2026-10-03.

Source-level quaternionic convention checking showed that the bridge must not identify raw quaternion multiplication with one common complex-linear action without recording scalar handedness and chiral representation maps. Woit supplies a complex Hom(S_R,S_L) presentation while Lisi supplies both the real quaternionic multiplication presentation and a Pauli-matrix complex representation.

The campaign therefore lowered BT01 to the invariant A_v J_minus = J_plus A_v with J_minus^2=J_plus^2=-1. The complex-linear/projective presentation is derived only after a source-authorized compatible complex structure is fixed.

Artifact: `bridge/BT01_QUATERNIONIC_SIDE_CONVENTION_AUDIT_0_1.md`.
