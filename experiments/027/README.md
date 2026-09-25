# Experiment 027 — DTS-inclusive current-stack qualification

**Status:** complete — expanded composition `QUALIFIES`.

Scope:

```text
Core 0.17 + Core 0.18
+ QU 0.1
+ NEI 0.4
+ DP 0.1–0.6
+ DTS 0.1
```

Result:

```text
workflow run:          36191443384
frozen source SHA:     c53856f840dc1c9ee29bb55b509f6de3f6926179
fresh cases:           18 / 18 PASS
mismatches:            0
scoring guards:        all true
module assessment:     SUPPORTED
formal disposition:    QUALIFIES
provider attempts:     1
```

The holdout was fresh relative to Experiments 019 and 026. The cold packet contained only:

- `QUALIFIED_STACK_PACKET.md`;
- `INTEGRATED_WITH_DTS_CASES.md`;
- `COLD_PROMPT.md`.

Hidden assertions, scorer code, prior Experiment 019/026 outputs, routing files, and qualification conclusions were excluded.

Final review:

`EXPERIMENT_027_FINAL_QUALIFICATION_REVIEW.md`

Current expanded integration authority:

`../../qualification/CURRENT_INTEGRATED_STACK_WITH_DTS_2026-09-25.md`

Experiment 019 remains the immutable pre-DTS integration predecessor.
