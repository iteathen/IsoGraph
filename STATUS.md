# IsoGraph Status

**Project state:** research incubation / Draft 0.17 Semantic Identity description correction current  
**Repository:** `iteathen/IsoGraph`  
**Default branch:** `main`

## Current qualified semantic authority

- `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md`

Draft 0.17 is a narrow descriptive correction over the qualified Draft 0.16 authority:

- bare IDs are explicitly **Semantic Identity (SI)** handles;
- same SI means the same represented referent within the applicable SI namespace;
- different SIs remain distinct represented referents for core operations;
- SI equality or inequality does not independently establish any stronger external/natural/ontological identity relation;
- operational behavior for occurrences, references, namespaces, alpha-renaming, freshness, matching, reconstruction, comparison, and object-theory equality remains unchanged from Draft 0.16;
- no Natural Entropic Identity semantics are part of core.

The Draft 0.17 authority is deterministically derived from the exact qualified Draft 0.16 blob `8c9a3c9030388a39bb89aed9045083fa03fb3209`. The build checks that the obsolete wording `same structural identity = same object` does not survive and that external NEI extension semantics do not leak into core.

## Retained Draft 0.16 qualification evidence

`CORE_SPEC_DRAFT_0_16_CONSOLIDATED_QUALIFIED.md` remains immutable historical authority for the obligation-sufficiency clarification qualified by Experiment 005.

Experiment 005 evidence remains:

```text
cold workflow:             35252295888
cold artifact:             10510136341
cold report SHA-256:       9078e33a7ae9f75eca75e2f9327a3f3e4e76e77c3223df5f03c5ce96dcbc5d9d
post-freeze scoring:       8 PASS / 0 PARTIAL / 0 FAIL / 0 UNKNOWN
verifier workflow:         35252625515
verifier artifact:         10510431318
verifier report SHA-256:   da45f19397f842eb08c9cea57cf77b108ee8dcf808c0c1f1989e72ca3d7b8eb3
verifier disposition:      VERIFIED
unresolved obligations:    none
```

Final review remains:

- `experiments/005/EXPERIMENT_005_FINAL_QUALIFICATION_REVIEW.md`

## Qualified obligation-sufficiency layer retained in Draft 0.17

- claim-bounded dependency-closed obligation sets;
- proof-method neutrality within frozen qualification/isolation constraints;
- claim-typed witness sufficiency;
- context-scoped witness quotients;
- exact compact witness-family certificates when coverage is independently verified;
- local factorization-node claims versus factorization-space completeness.

## Explicit non-changes in Draft 0.17

Draft 0.17 introduces no:

- Natural Entropic Identity semantics;
- new syntax or irreducible primitive;
- new structural class or comparison relation;
- identity-collapse inference rule;
- temporal identity law;
- entropy/information measure;
- special extension-loading mechanism;
- change to Draft 0.16 proof/search sufficiency rules.

## Current Discovery Protocol qualification evidence

Discovery Protocols 0.1-0.4 remain candidate research and are not part of the qualified core authority.

The current evidence record is:

- Experiment 006 current-main Test 6 regression recovered O1/O2/O4/O5 and deep O2/O4, but remains post-unblind regression evidence only.
- Experiment 007, frozen at `eae08ffc562168a2bc093c74056e3b6e01b88d93`, recovered **5/5 hidden motifs** and **3/3 deep motifs** under strict cold isolation. Its immutable automatic disposition remains `DOES_NOT_QUALIFY` because the frozen scorer required hidden exact enum spellings for rejection statements that were semantically present.
- QRC 0.1 (`qualification/QUALIFICATION_REJECTION_CONTRACT_0_1_CANDIDATE.md`) separates semantic rejection coverage from exact serializer conformance. It is qualification infrastructure, not semantic authority.
- Experiment 008, frozen at `cabcdd90c2a997c69a421bb6ada9d2f1a7d31882`, returned **`QUALIFIES`**, recovered **5/5 motifs** and **3/3 deep motifs**, and passed every frozen guard in direct cold OpenRouter run `35303672370`.

Experiment 008 is genuinely fresh post-QRC blind qualification evidence, but its review records that the paired derivations expose several high-level roles relatively transparently. Read its result together with the more oblique Experiment 007 blind semantic success rather than treating either run alone as universal proof of Discovery Protocol adequacy.

No candidate is silently promoted by these results.

## Historical authority

`CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md` remains immutable qualified historical evidence for Experiment 004 and prior Draft 0.15 artifacts. Draft 0.17 does not retroactively change historical semantics or qualification evidence.

## Immediate work

Draft 0.17 remains the qualified core authority. Current discovery work should use the Experiment 007/008 evidence record and QRC 0.1 without treating those candidate layers as qualified core semantics. Further promotion, NEI, admissible-variation, invariant-extraction, or information-measure work remains separate unless its own evidence burden is discharged.
