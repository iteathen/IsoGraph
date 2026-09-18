# IsoGraph Experiment 004 — RUN-S06 scoring report

**Cold report:** `RUN-S06_COLD_CLAUDE_001.md`  
**Frozen before scorer access at commit:** `93c38ed2aa97c894f9b6a0761ab3812b9e9408d3`  
**Scorer:** OpenAI assistant, post-freeze  
**Hidden assertion source:** `experiments/004/Q004_S06_ASSERTIONS_004.json` at frozen qualification source `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`

## Assertion comparison

| Assertion | Verdict | Cold-report evidence |
|---|---|---|
| `Q004_S06_PARSE_01.isg = valid_single_implication` | AGREE | Reports `1 => 2` as one deterministic `implies(1, 2)` parse and valid. |
| `Q004_S06_PARSE_02.isg = valid_single_equality` | AGREE | Reports `1 == 2` as one deterministic `eq(1, 2)` parse and valid. |
| `Q004_S06_PARSE_03.isg = valid_single_instantiation` | AGREE | Reports one `@@` occurrence as deterministic `instantiate(@0, 20)` and valid. |
| `Q004_S06_PARSE_04.isg = invalid_ambiguous_mixed_infix` | AGREE | Rejects `1 => 2 == 3` because mixed infixes have no defined precedence/associativity. |
| `Q004_S06_PARSE_05.isg = invalid_ambiguous_chained_infix` | AGREE | Rejects `1 == 2 == 3` as an un-delimited chained infix. |
| `Q004_S06_PARSE_06.isg = invalid_ambiguous_chained_infix` | AGREE | Rejects `@0 @@ 20 @@ 30` as an un-delimited chained infix. |
| `ordinary_parentheses_are_transparent_parser_grouping = false` | AGREE | Explicitly states `()` denotes ordered incidence and cannot act as transparent grouping. |

## Score

```text
AGREE:      7
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PASS.

No discrepancy classification is required. The report also correctly distinguishes a semantic ordered-incidence constructor from non-semantic grouping syntax and refuses to invent precedence or associativity.
