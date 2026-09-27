# Glycan algorithm campaign checkpoint — UI desync recovery 0.2

**Date:** 2026-09-27
**Branch:** research/glycan-cleavage-primitive-20260927

Durable completed state recovered from GitHub:

1. Experiment 033 — backward antichain solver — PASS.
   - 129,445 exhaustive instances;
   - 752,380 microscopic/formula phase checks;
   - 0 phase mismatches;
   - 0 forward/backward optimum mismatches;
   - mean benchmark forward states 96.81 vs backward peak antichain 7.21.

2. Experiment 034 — minimal quasi-ordered automaton / star-product oracle — PASS.
   - 6,565 basis controls;
   - 0 brute-vs-automaton B_M mismatches;
   - 41,082 star-product checks;
   - 0 star-oracle mismatches.

3. Experiment 035 — counterexample-guided B_M learner — PASS.
   - 6,565 exhaustive instances;
   - 0 learned-basis mismatches;
   - 0 invalid oracle counterexamples;
   - larger seeded controls also exact.

4. A16 PCCSP singleton lower-bound transfer committed.

5. Experiment 036 — singleton PCCSP lower bounds/immediate selection — PASS.
   - 429,531 reachable states;
   - one-class bound OC tight 98.9812%;
   - no admissibility violations;
   - tested immediate-selection certificates had 0 counterexamples.

6. A17 set-valued partition lower bound committed.

7. Experiment 037 — set-valued PLB — PASS.
   - 396,855 reachable states;
   - PLB tight 99.5747%;
   - 0 PLB > exact-distance violations;
   - 1,688 PLB-gap states remain.

Current active experiment:

8. Experiment 038 — analyze the 1,688 PLB-gap states with exact pairwise maximal-path synchronization bound P2.
   - README committed;
   - runner committed;
   - workflow committed;
   - RUN.request committed at de665fbab2bd891dce895d6bfdab60c36830d723;
   - evidence not yet persisted at the time of this checkpoint.

Experiment 038 question:

    Are the remaining PLB gaps fully explained by pairwise branch-order conflicts?

If not, preserve minimal residual examples as evidence for genuinely higher-order synchronization.

Resume from Experiment 038 evidence; do not rerun Experiments 033-037 unless a specific discrepancy requires it.