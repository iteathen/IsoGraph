# IsoGraph Experiment 004 — RUN-S03 scoring report

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Decoder:** Claude (external model, user-operated)  
**Cold report:** `RUN-S03_COLD_CLAUDE_001.md`  
**Hidden scorer:** `Q004_S03_ASSERTIONS_004.json`

## Evidence-order note

The Claude cold report was supplied in the chat before scorer exposure and is preserved verbatim in `RUN-S03_COLD_CLAUDE_001.md`. During repository handling, the scorer file was fetched before the report was committed, so repository persistence order is not the ideal `freeze -> unblind` order. The cold text itself nevertheless predates scorer exposure in the conversation. This sequencing deviation is recorded rather than hidden; no cold text was edited after unblinding.

## Scoring

| Expected assertion | Verdict | Basis |
|---|---|---|
| `case_1 = invalid_unowned_variable_in_closed_object` | **AGREE** | Report identifies `?0` as unowned, states implication adds no owner, and marks the closed object invalid. |
| `case_2 = valid_explicit_quantifier_owner` | **AGREE** | Report explicitly identifies `*?0` as the owner and states the object is not invalid on ownership grounds. Its separate §14.1 domain/generator completeness caveat is orthogonal to the S03 ownership assertion and does not contradict it. |
| `case_3 = valid_explicit_open_interface_owner` | **AGREE** | Report identifies `^6302` as explicit ownership/exposure and marks the open body well-formed. |
| `declarative_implication_implicitly_binds_variable = false` | **AGREE** | Report repeatedly states that implication supplies no owner. |
| `unowned_variable_default = no implicit universal existential or wildcard meaning` | **AGREE** | Report explicitly rejects all three implicit interpretations. |

## Result

```text
AGREE:      5
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PASS.

## Non-scored observations

The report raises a separate §14.1 issue for case #2: binder ownership is valid, while a fully qualified quantified construction would still require a determined domain/generator. That distinction is real in the consolidated spec, but it is outside the hidden S03 ownership expectation and therefore is not scored as a discrepancy here.

The report also records several parser/fixture interpretation cautions. None changes the five hidden assertions above, so no specification repair is justified from RUN-S03 scoring alone.
