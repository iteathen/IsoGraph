# Experiment 028 — Qualified Baseline Authority

**Status:** frozen baseline record for focused DP 0.7 successor qualification  
**Purpose:** pin already-qualified predecessor/dependency authority without re-proving it in the Experiment 028 cold call

## Qualified semantic baseline

Experiment 028 treats the following exact revisions as already qualified authority:

- Core 0.18 SHA-256: `51be43bec990b0c7baf93914e074c5fc9a29ec64b00eaf91eb25b672d9c04a63`
- QU 0.1 SHA-256: `1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc`
- NEI 0.4 SHA-256: `6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee`
- DP 0.1 SHA-256: `25fb4f84343633a22b08b2375fa085c2e01dc7f8a799a0e038b3fcf7ecc73c6b`
- DP 0.2 SHA-256: `9b121b767f5ca52759bd9a7a42d32dd1e6f12872c2bcfb370277a6292dd6011c`
- DP 0.3 SHA-256: `c37c9caebe33dc0b7f021638ab1679930f0e7edfbb3bd9368efdfc48538a11ee`
- DP 0.4 SHA-256: `35e70a19f0eb6a1893f541465d76e7d37d028a9128391562afcd6c9260d462cd`
- DP 0.5 SHA-256: `522a1a1a89b5f1fc753e17f76a58902c0f58543916d35a51a2c60dd64fcbea0b`
- DP 0.6 SHA-256: `2494a135c11e5d8a2c7da63af7cbf12ed78d769536f917fd5c216d4a932fcd44`
- DTS 0.1 SHA-256: `9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad`

Predecessor qualification records:

- `experiments/018/EXPERIMENT_018_FINAL_QUALIFICATION_REVIEW.md` — DP 0.1–0.6 cumulative module `QUALIFIES`
- `experiments/027/EXPERIMENT_027_FINAL_QUALIFICATION_REVIEW.md` — current qualified stack including DTS `QUALIFIES`

These records are baseline authority only. Experiment 028 does not reuse their hidden answers or decoder outputs.

## DP 0.7 candidate revision

The DP 0.7 candidate under test is:

`extensions/discovery/DISCOVERY_PROTOCOLS_0_7_CANDIDATE.md`

Accepted three-positive-control packet recorded its SHA-256 as:

`7b4ba0cc7b895f39212080892d13b7f0a1d7d67c41267ed44291d11c5e63a08d`

Experiment 028 must mechanically verify that the candidate bytes still match this revision before semantic execution.

## Fresh predecessor evidence for section 17 targets 11 and 17

The completed three-positive-control campaign is fresh DP 0.7 evidence at the current candidate revision.

Durable checkpoint:

- completed branch head: `fe7874b1cb612c89c76984d7ceb32326466b2149`
- accepted blind workflow run: `36228776786`
- accepted experiment SHA: `414405f1cd527b529464ab2fb63ec7695d5f5165`
- accepted evidence commit: `500c6e398331694d922267c9bc38cfa563e6d89e`
- hidden score commit: `20a82f30f775883e03018c54ff12d208514a9848`
- campaign close commit: `fe7874b1cb612c89c76984d7ceb32326466b2149`
- final score: `research/project-discovery/2026-09-25-dp07-three-positive-controls/SCORE_0_4.json`
- final report: `research/project-discovery/2026-09-25-dp07-three-positive-controls/FINAL_REPORT_0_4.md`

That campaign supplies fresh evidence for:

- section 17 target 11: primitive-first isomorph discovery;
- section 17 target 17: exact-witness support closure.

All three positive controls passed hidden-oracle scoring and the mechanical exact-role coverage gate.

## Baseline boundary

Already-qualified dependency semantics may be used where invoked, but they remain separate modules.

In particular:

- QU authority owns represented unresolved possibility structure;
- NEI authority owns natural/domain identity conclusions;
- DTS authority owns detailed transition anatomy when load-bearing;
- DP discovery priority is never proof authority by itself;
- structural correspondence is not automatically NEI SAME;
- state-level common views do not erase load-bearing DTS differences.

Experiment 028 tests only the DP 0.7 successor burden not already discharged above.
