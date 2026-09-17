# IsoGraph Experiment 004 — Results / Qualification Ledger

**Status:** first current-authority Draft 0.15 qualification checkpoint reached for the frozen Experiment 004 corpus, with explicit partials.

## Current semantic authority

```text
../../CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md
```

Frozen qualification corpus:

```text
main @ 30d9b0f0a84cb6005fae1d8f82b1777fd24c0215
```

The source Draft 0.13/0.14/0.15 documents remain historical provenance and rationale. The consolidated Draft 0.15 candidate is the semantic authority qualified here. No Core Specification mutation was made during qualification.

## Qualification evidence

Cold evidence:

```text
earlier Claude/manual evidence branch: experiment/004-cold-results-claude
Gemini cold workflow:                  35191919970
Gemini cold model:                     gemini-3.5-flash, high thinking
Gemini raw evidence archive:           d78a806322198e084e5016f44f813401bff72ad3
```

Independent scorer-blind verifier evidence:

```text
initial verifier workflow:             35234338405
continuation verifier workflow:        35237237782
final C2 verifier workflow:            35240263716
Flash-Lite verifier workflow:          35239572341
D17/D17B verifier workflow:            35246313461
complete durable archive workflow:     35248055284
complete durable archive commit:       e8c206b4f1219ee9aed4ed46adc97df2a9399f79
```

The complete selected verifier evidence is preserved verbatim under:

```text
experiments/004/cold-results/verifier/
```

Each selected verifier run retains its exact packet, raw API response, extracted report, and metadata. The verifier packets excluded hidden assertions, expected answers, scoring reports, qualification ledgers, prior verifier outputs, and external reviews.

Final review:

```text
EXPERIMENT_004_FINAL_QUALIFICATION_REVIEW.md
```

## Final audited disposition

Across all 21 frozen cold reports:

```text
PASS:     15
PARTIAL:   6
FAIL:      0
UNKNOWN:   0
```

PASS:

```text
RUN-A
RUN-S01
RUN-S02
RUN-S03
RUN-S04
RUN-S05
RUN-S06
RUN-S07
RUN-S08
RUN-B
RUN-D09
RUN-D10
RUN-D16
RUN-D17
RUN-D18
```

PARTIAL:

```text
RUN-C1
RUN-C2
RUN-D17B
RUN-D19
RUN-D20S
RUN-D20L
```

No final run is classified FAIL or UNKNOWN/RESOURCE_LIMIT.

Blind-verifier self-dispositions were:

```text
VERIFIED:                           19
VERIFIED_WITH_NON_MATERIAL_ISSUES:  1  (RUN-S03)
PARTIAL:                             1  (RUN-D20L)
FAILED / UNKNOWN:                    0
```

Verifier self-disposition is evidence, not authority. Final review retained or introduced PARTIAL dispositions where scorer assertions, fixtures, prompts, or direct Draft 0.15 grammar checks established defects that a blind verifier did not flag.

## Surviving partials

- **RUN-C1:** intended accounting recovered; the report's competing node-extended common-core alternative exposes an unresolved relation-strength/optimality basis in the report/protocol rather than a representation failure.
- **RUN-C2:** intended targets recovered, but the report also supplied a false reversed VS mapping that violates ordered incidence.
- **RUN-D17B:** native topology recovered, but the report added unsupported English role gloss and its final terminal diagram omitted two body links identified elsewhere in the same report.
- **RUN-D19:** reusable novel topology and negative certificate recovered, but the report leaked a familiar shape name, emitted illegal symbolic-caret labels in a claimed native schema, and mislabeled a weak common core as induced.
- **RUN-D20S:** requested structural-only retrieval result is correct; unsolicited claimed native witness/certificate records use illegal symbolic-caret labels.
- **RUN-D20L:** requested label-assisted analysis is correct; unsolicited native policy/witness/certificate records use illegal symbolic-caret labels.

The frozen cold reports are preserved verbatim and are not repaired.

## Qualification conclusion

No surviving discrepancy demonstrates a representation-expressiveness failure in Draft 0.15.

The frozen corpus exercised and provided current-authority qualification evidence for:

- occurrence-preserving scope and rewrite semantics;
- nested-boundary preservation;
- identity and namespace discipline;
- variable ownership and reference hygiene;
- rewrite event identity and multiplicity;
- exact semantic D versus archival residual distinctions;
- source-local versus pairwise residual accounting;
- independent extraction/factorization freeze;
- embedding/common-core accounting and mapping multiplicity;
- certified-negative versus incomplete-search discipline;
- stage-specific fingerprint/index invariance;
- class non-vacuity/selectivity;
- native policy/witness/result self-description;
- unresolved source-interpretation preservation;
- novel-class induction without forced registry labeling;
- structural-only versus label-assisted retrieval;
- reference-binding placement and arity preservation;
- rule-side splice semantics;
- infix parse determinism;
- first-class NAC versus matcher evaluation context;
- canonical serializer/index scoping.

Claimed negatives were accepted only when backed by an actual separating invariant/certificate or complete structural contradiction. Mere verifier agreement was not treated as verification.

Q004-17 and Q004-17B demonstrate that required policy/witness/result structures can be represented natively with numeric stable labels and reconstructed from native topology. The invalid symbolic records emitted in D19/D20S/D20L therefore classify as decoder serialization non-conformance, not substrate insufficiency.

## Specification mutation decision

**No Draft 0.15 mutation is warranted from Experiment 004.**

The observed discrepancies are decoder/report serialization, ordered-incidence mapping, semantic-label leakage, accounting/report completeness, and a C1 protocol/scorer ambiguity. Existing Draft 0.15 rules already state the load-bearing representation requirements implicated by those defects.

The specification-growth freeze therefore does not need to be broken to repair this frozen campaign.

## Claim boundary

This checkpoint is corpus-bounded. It does not establish general correctness for untested structures, larger search spaces, arbitrary external domains, or future representation revisions. It also does not qualify every decoder behavior: native-record emission discipline remains imperfect in D19/D20S/D20L even though the representation itself supports legal native records.

## Post-checkpoint seam

Experiment 004 qualification required for this checkpoint is complete.

Any follow-up should be a new, explicitly versioned activity rather than rewriting frozen evidence. Candidate follow-ups include decoder-conformance regression pressure for numeric native labels and a separately frozen clarification/test of C1 common-core maximality/relation-strength ordering. Neither follow-up currently justifies modifying Draft 0.15.
