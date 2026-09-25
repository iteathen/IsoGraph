# Reduced formula 0.2 — deterministic validation

Classification: internal validation of the reduced-formula artifacts and equivalence matrix.

This is not independent mathematical validation of the published proof and not an IsoGraph qualification result.

## Frozen sources

- Published solution: OpenAI, *Finite Time Blowup for Navier–Stokes*, 166-page public PDF referenced in the pinned formalization metadata.
- Lean formalization: `openai/NavierStokesAndEuler@f9e8bc5b38b6e212696e8a30e3e91517af887bbd`.
- Source IsoGraph rendering blob: `6e01f6b7bb8579e08d5e5135a4e9ea5965677763`.
- Reduced native formula blob: `e219437e9707d96ffb94af66a025e4ba84d952a8`.

## Historical falsification

The original D10 compact formula failed equivalence testing.

Missing load-bearing mechanisms:
1. background-profile / annular-stress synthesis;
2. oscillatory stress realization with auxiliary support separation and exact curls;
3. explicit internal correction roles for nonzero modes, signed covariance, mean repair, and radial-moment/pressure repair.

RF-0.2 was created by adding those mechanisms rather than weakening the equivalence standard.

## Published-solution coverage

Top-level paper regions mapped:
- Section 4 -> G1
- Section 5 -> G1
- Section 6 -> G2
- Section 7 -> G2
- Section 8 -> G3
- Section 9 -> G3/G4
- Section 10 -> G5/G6/G7/G8
- Appendix A -> G1/G4
- Appendix B -> G1
- Appendix C -> G1

Unmapped top-level proof regions: 0.

Section 3 outline roles mapped:
- concentrating field -> G1
- background stress -> G1
- oscillatory momentum transport -> G2
- correction/summation -> G3/G4
- localization/completion -> G4/G5/G6/G8
- viscosity/periodic transport -> G7

Unmapped major proof-outline roles: 0.

## Final-contract coverage

Previously mechanically extracted exact source contracts remain:
- R3 CandidateProperties: 12/12 fields represented;
- LocalPaper.Properties: 19/19 fields represented;
- periodic CandidateProperties: 16/16 fields represented.

RF-0.2 maps the generating responsibility for those contracts across G1–G8; see REDUCED_FORMULA_EQUIVALENCE_0_2.md.

## Reverse provenance

Each G1–G8 maps to both:
- named published-paper sections/mechanisms; and
- representative pinned Lean declarations/families.

Unbacked RF components: 0.

## Dependency direction

The formula preserves the published causal/proof direction:

    G1 -> G2 -> G3 -> G4 -> G5
                         G5 -> G6
                         G5 -> G7
                  G5/G6/G7 -> G8

No downstream uniqueness, energy, periodization, or comparator result is used to manufacture the upstream construction.

## Deletion test

Eight components tested.

- deleting G1 removes singular background/stress/heat-exterior generation;
- deleting G2 removes leading annular-stress realization;
- deleting G3 removes complete residual repair and sigma improvement;
- deleting G4 removes diagonal smooth sum/flatness/protected final blowup;
- deleting G5 removes compact smooth force and whole-space candidate completion;
- deleting G6 removes the finite-energy proof;
- deleting G7 removes arbitrary-viscosity/periodic/comparator transport;
- deleting G8 removes global-solution nonexistence.

Components with no load-bearing deletion witness: 0.

## Native integrity

REDUCED_FORMULA_0_2.isg:
- relation occurrences: 50
- G-components: 8/8
- component deletion-witness records: 8/8
- balanced delimiters: PASS
- undeclared stable labels: 0
- suspicious tokens: 0
- imported source SIs: 36
- missing imported source SIs: 0

## Equivalence disposition

RF-0.2:

`PASS — proof-outline/interface equivalent`

Meaning:
- complete at the selected load-bearing interface granularity;
- source-backed in both directions;
- preserves known residual distinctions.

Not meaning:
- line-by-line proof replacement;
- formal theorem-equivalence certificate;
- mathematical minimality;
- independent proof verification.
