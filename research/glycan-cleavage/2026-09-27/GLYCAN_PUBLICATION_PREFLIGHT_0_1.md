# Glycan publication preflight audit 0.1

**Status:** PASS / publication gate  
**Date:** 2026-09-27  
**Publication snapshot branch:** `research/glycan-cleavage-primitive-20260927`  
**Pre-publication snapshot SHA:** `f3deefd64ee37ea8464511000c2968b73ad6722f`

## 1. Frozen model and primitive rendering

Frozen source:

- `GLYCAN_CLEAVAGE_SOURCE_FREEZE_0_1.md`
- blob `7565778decc21d865f9fd81b10bd483a36e091e4`

Verified primitive rendering:

- `GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg`
- blob `f5ef6f08df03c01cb03d8dea1f9da87cc2fa29c4`

Experiment 032:

- status: PASS;
- source/native cold reconstruction: PASS;
- targeted checks: 18/18 PASS;
- missing semantics: 0;
- unsupported semantic additions: 0;
- load-bearing unresolved items: 0.

Qualification boundary:

- Core 0.20 primitive-logic closure remains an unqualified research contract;
- qualified Core authority remains through Core 0.19;
- Experiment 032 verifies the research rendering under its declared contract and does not promote Core 0.20.

## 2. Source bibliography correction

A reference audit found one bibliographic metadata defect in the frozen source:

- `GlycoDigest` was attributed to "Royle et al., 2015";
- correct publication: Lou Gotz et al., *Bioinformatics* 30(21):3131–3133 (2014), DOI 10.1093/bioinformatics/btu425.

The frozen source blob was not modified.

Correction overlay:

- `GLYCAN_SOURCE_REFERENCE_CORRECTION_0_1.md`
- blob `aa4616e5d035156b0d30b181d924d28847f5e706`

This is bibliographic only and changes no represented model semantics.

## 3. Assertion integrity

Pre-DP fixed-point audit already established the admitted range:

    G-IA001..G-IA257
    G-N001..G-N093

A12-A14 and NEI12-14 extended that exact research surface to:

    G-IA001..G-IA303
    G-N001..G-N116

A11/NEI11 and the later NEI15 re-pass recorded no additional identity/QU result beyond the admitted numbered ranges.

Publication preflight mechanically re-audited the authoritative clue-derivation files A15-A29.

Result:

    expected definitions G-IA304..G-IA448: 145
    definitions found:                       145
    missing IDs:                             0
    duplicate authoritative IDs:             0
    references beyond admitted range:         0

Historical duplicate A19/A20 drafts remain marked SUPERSEDED and contribute no current assertion definitions.

Current exact implicit range for this publication:

    G-IA001..G-IA448

Current exact NEI range:

    G-N001..G-N116

## 4. Required proof correction

A8 G-IA191 originally had a local proof-support defect.

Current required overlay:

- `GLYCAN_IMPLICIT_ASSERTIONS_A8_CORRECTION_0_1.md`
- blob `102c31a3cdb806c08f480a465746879f76e3fbf9`

The maximal-path theorem survived; the invalid local/global tau comparison was replaced by the bottleneck-path lemma.

All publication claims that rely on maximal-path coverage or the singleton SCS reduction must cite/use the correction overlay.

## 5. Experiment disposition audit

Frozen final-review dispositions:

- Experiment 032: PASS — primitive reconstruction;
- Experiment 033: PASS — backward antichain solver;
- Experiment 034: PASS — minimal quasi-ordered automaton / star-product oracle;
- Experiment 035: PASS — counterexample-guided B_M learner;
- Experiment 036: PASS — singleton PCCSP-derived bounds;
- Experiment 037: PASS — set-valued partition lower bound;
- Experiment 038: PASS — pairwise-path residual analysis;
- Experiment 039: PASS — J2/J3 finite-surface hierarchy;
- Experiment 040: COMPLETE / falsifier found — J3 not universally exact;
- Experiment 041: PASS — explicit ternary witness-width ladder;
- Experiment 042: PASS — width 24;
- Experiment 043: PASS — width 35;
- Experiment 044: PASS — width 54;
- Experiment 045: PASS — Node-authoritative width 75;
- Experiment 046: PASS — Node-only width 113;
- Experiment 047: PASS after clue-preserving implementation repair — Node-only width 173.

## 6. Experiment 047 discrepancy audit

The first threshold-20 runner produced an apparent universal threshold word.

Independent Node verification falsified that observation.

Defect owner:

- manually unrolled `PL=10` incidence kernel consumed only `p0..p8`;
- `p9` and the tenth transition were omitted.

Minimum repair:

- add `p9`;
- add the tenth transition;
- add a fail-closed `PL===10` specialization guard;
- rerun from a fresh SHA.

Authoritative repaired run:

- workflow run `36358828377`;
- source SHA `55088c2450e689654e77ca1b70c758cb2df66933`;
- status PASS;
- threshold uncovered words 0;
- missing private witnesses 0;
- exact witness width 173.

The failed run and falsification evidence remain preserved.

## 7. Strongest exact claims admitted for publication

The paper may state:

1. one exhaustive phase has the exact resistant-frontier form

       D_e(A) = upward_closure(A intersection N_e);

2. the dual removed-ideal action is extensive, monotone, idempotent, and meet-preserving but not join-preserving in general;

3. effective non-target susceptibility exactly classifies one-phase action;

4. susceptibility dominance gives two-sided phase absorption;

5. fixed-word failure is exactly characterized by a treatment-position-spanning nondecreasing resistant chain;

6. the complete solving language has a unique finite dominance-aware minimal TRUE boundary B_M;

7. corrected maximal-path coverage is exact;

8. singleton susceptibility reduces exactly to ordinary SCS on run-compressed maximal paths;

9. with at most two effective treatment classes, J2=OPT universally and the complete optimum-word family has size at most two;

10. three treatment classes do not admit the naive J3 generalization;

11. exact finite ternary witness widths 24, 35, 54, 75, 113, and 173 have been constructed;

12. the width-173 critical cover induces the standard example S_173 in the ordinary ternary subsequence poset and therefore supplies a finite poset-dimension lower bound of at least 173.

## 8. Claims prohibited by the current evidence

The paper must NOT claim:

- that the frozen 0.1 model is complete real enzymology;
- that complete laboratory digestion is physically guaranteed;
- that Core 0.20 is qualified;
- that IsoGraph has general independent external validation;
- that ternary witness width is unconditionally unbounded;
- that 173 is the maximum threshold-20 witness width;
- that the observed finite witness-width sequence establishes a growth law;
- that all three-enzyme instances require high witness width;
- that general set-valued susceptibility is one ordinary SCS instance;
- that a generic greedy optimum theorem has been proved;
- that the project-specific structural synthesis is externally novel without a dedicated novelty review.

## 9. External-reference audit

Primary publication metadata were checked for:

- Kobata (2013), DOI 10.2183/pjab.89.97;
- Gotz et al. (2014), DOI 10.1093/bioinformatics/btu425;
- Song, Aldredge & Lebrilla (2015), DOI 10.1021/acs.analchem.5b01340;
- Ruhaak et al. (2018), DOI 10.1021/acs.chemrev.7b00732;
- Higman (1952), DOI 10.1112/plms/s3-2.1.326;
- Maier (1978), DOI 10.1145/322063.322075;
- Bürgy, Hertz & Baptiste (2020), DOI 10.1016/j.cor.2020.105063;
- Escardó (2003), DOI 10.1023/A:1023555514029;
- Finkel & Schnoebelen (2001), DOI 10.1016/S0304-3975(00)00102-X;
- Aristote (2025), DOI 10.4230/LIPIcs.CALCO.2025.16;
- Dushnik & Miller (1941), DOI 10.2307/2371374.

## 10. Publication-attribution gate

Required author:

    Joshua Oshiro

Required front-matter statement:

    Agent-assisted research produced using the IsoGraph system designed by Joshua Oshiro.

Required provenance distinctions:

- Joshua Oshiro is the author;
- Joshua Oshiro designed the IsoGraph system and methodology;
- AI/agent assistance contributed to research, structural discovery, verification, drafting, and repository operations;
- external publications and prior art retain their own authorship and attribution.

Required IsoGraph references:

- exact source/native blobs;
- Experiment 032 verification;
- A8 correction;
- A12-A14 phase/language admissions;
- A19 binary theorem;
- A21/A23 witness-width/critical-cover definitions;
- A28 width-173 result;
- A29 standard-example interpretation;
- Experiment 047 final/discrepancy reviews.

## Preflight disposition

    mathematical claim scope:     PASS
    assertion indexing:           PASS
    experiment provenance:        PASS
    discrepancy provenance:       PASS
    source-reference audit:       PASS after correction overlay
    publication attribution:      PASS
    external-reference metadata:  PASS
    publication gate:             PASS
