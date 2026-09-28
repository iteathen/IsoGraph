# Glycan publication preflight audit 0.2

**Status:** PASS / reviewed-publication gate  
**Date:** 2026-09-28  
**Publication candidate:** `research/publications/2026-09-27/GLYCAN_CLEAVAGE_PHASE_ALGEBRA_AND_SYNCHRONIZATION_0_2.md`  
**Historical publication retained:** `..._0_1.md`

## Mathematical review incorporation

Confirmed present in revision 0.2:

- exact-length padding lemma;
- explicit set-valued path coverage;
- leaf-first path convention;
- resistant-chain proof of maximal-path sufficiency;
- infeasible-instance convention `OPT=+infinity`;
- exact definition of effective treatment classes;
- quotient-scoped uniqueness of the dominance-aware minimal boundary;
- class-level rather than raw-word two-enzyme family bound;
- ternary universal-supersequence ceiling `2*ell+1`;
- exact `OPT(F_173)=21`;
- threshold `2*ell` maximal-failure interpretation;
- Experiment 047 omitted-symbol structural explanation;
- poset-dimension result marked as by-product rather than novelty claim.

Project support:

```text
G-IA449..G-IA459
```

in A30.

## Computational evidence

No computational result was changed by the mathematical review.

Width-173 evidence remains the repaired Node.js Experiment 047 run:

- run `36358828377`;
- exact candidate-path count 1,536;
- exact threshold-word count 1,572,864;
- exact pair surface 2,415,919,104;
- uncovered threshold words 0;
- missing private witnesses 0;
- witness width 173.

Revision 0.2 adds only the mathematical upper bound that sharpens `OPT>20` to `OPT=21`.

## Citation audit

Mechanical publication audit:

```text
reference labels:          [1] through [30], contiguous
first appearance:          [1] through [30], in order
relative repository links: 0
IsoGraph evidence links:   absolute commit-pinned permalinks
```

Primary-source metadata rechecked for:

- Higman (1952);
- Maier (1978);
- Bürgy, Hertz & Baptiste (2020);
- Escardó (2003);
- Finkel & Schnoebelen (2001);
- Dushnik & Miller (1941);
- Aristote (CALCO 2025).

Specific reviewer questions:

- PCCSP uses article number `105063`, not a conventional page range;
- CALCO 2025 pages are `16:1–16:12`.

## Attribution gate

Required author:

```text
Joshua Oshiro
```

Required disclosure remains present:

```text
Agent-assisted research produced using the IsoGraph system designed by Joshua Oshiro.
```

The provenance note continues to distinguish:

- Joshua Oshiro authorship;
- Joshua Oshiro design of IsoGraph;
- AI/agent assistance;
- external prior work.

## Claim boundary

Revision 0.2 still does NOT claim:

- complete real enzymology;
- external validation of IsoGraph;
- unbounded ternary witness width;
- maximality of width 173 at threshold 20;
- novelty of classical SCS, nuclei, WSTS, PCCSP, Higman order, set-cover, or poset-dimension theory.

## Disposition

```text
mathematical review incorporation: PASS
computational provenance unchanged: PASS
reference ordering:                PASS
permalink stability:               PASS
attribution/provenance:            PASS
claim-boundary discipline:         PASS
publication revision 0.2:          READY FOR REPO VERIFY / PR REVIEW
```
