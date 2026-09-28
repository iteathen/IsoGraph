# Glycan publication preflight audit 0.3

**Status:** PASS / second-round reviewed-publication gate  
**Project-local date:** 2026-09-27 (America/Los_Angeles)  
**Repository timestamp convention:** 2026-09-28 UTC after local 17:00  
**Publication candidate:** `research/publications/2026-09-27/GLYCAN_CLEAVAGE_PHASE_ALGEBRA_AND_SYNCHRONIZATION_0_3.md`  
**Historical publications retained:** revisions 0.1 and 0.2

## Mathematical review incorporation

Confirmed present in revision 0.3:

- §7 duplicated phrase removed;
- "maximal non-target path" terminology used consistently;
- general set-valued coverage failure set `D^cov_L(P)`;
- subsequence-form `D_L(P)` explicitly restricted to singleton `COMP(P)`;
- Higman's lemma used as the finiteness proof for the quotient minimal boundary;
- exact defective-kernel length-9 universal minimum 19;
- project-local / UTC date convention explicit;
- bundled repository references split;
- dimension corollary remains by-product/non-novel scoped.

Project support:

```text
G-IA460..G-IA464
```

in A31.

## Computational provenance

No Experiment 047 computational evidence was changed.

Authoritative width-173 evidence remains:

- repaired Node.js Experiment 047;
- zero uncovered threshold words;
- zero missing private witnesses;
- witness width 173.

Experiment 046 is used only for the new mathematical bug-diagnosis corollary:

```text
complete ternary length-9 universal minimum = 19.
```

No experiment was rerun or rescored to obtain that corollary.

## Mechanical publication audit

```text
citation references:             contiguous, true first-appearance order
bibliography blocks:             same order as citations
relative repository links:       0
display-math single-$ lines:     0
duplicate References headings:   0
garbled singleton sentence:      absent
active/maximal terminology mix:  absent
```

## Bibliographic recheck

Confirmed primary metadata:

- PCCSP: Bürgy, Hertz & Baptiste, *Computers & Operations Research* 124 (2020), article 105063, DOI 10.1016/j.cor.2020.105063;
- CALCO 2025: Aristote, LIPIcs 342, 16:1–16:12, DOI 10.4230/LIPIcs.CALCO.2025.16;
- Higman: PLMS s3-2(1):326–336, DOI 10.1112/plms/s3-2.1.326.

Targeted dimension-context search additionally checked finite/generalized subword-order literature. No direct Dushnik–Miller dimension bound for the classical fixed-alphabet subsequence order was located in that targeted search; no absence/novelty claim follows.

## Attribution gate

Revision 0.3 contains:

- author: Joshua Oshiro;
- IsoGraph Project attribution;
- exact statement: "Agent-assisted research produced using the IsoGraph system designed by Joshua Oshiro.";
- provenance note stating Joshua Oshiro is the author and designer of the IsoGraph system/methodology;
- CC BY 4.0 license.

## Claim boundaries

Revision 0.3 still does NOT claim:

- complete real enzymology;
- external validation of IsoGraph;
- unbounded ternary witness width;
- a growth law from the six measured widths;
- maximality of width 173 at threshold 20;
- novelty for the `S_173`/dimension consequence;
- novelty for established Higman/SCS/PCCSP/WSTS/nucleus theory.

## Disposition

```text
second mathematical review:       INCORPORATED
A31 exact refinements:             PASS
citation order/permalinks:         PASS
date convention:                   PASS
attribution/provenance:            PASS
computational provenance unchanged: PASS
publication revision 0.3:          READY FOR REPO VERIFY / PR REVIEW
```
