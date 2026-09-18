# IsoGraph Experiment 004 — RUN-S01 scoring report

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Cold decoder:** Claude (external model, user-operated)  
**Scorer:** OpenAI GPT-5.6 Sol  
**Frozen cold report commit:** `3d7f96bd30cce0c9c34ef5df40129c1eb558fe51`  
**Hidden scorer:** `experiments/004/Q004_S01_ASSERTIONS_004.json`

The cold report was frozen before the hidden scorer was opened in this scoring pass.

## Assertion scoring

| Hidden assertion | Cold result | Verdict |
| --- | --- | --- |
| `legal_scope_binding = valid serialization directive` | Scope-level `@0=(10 11)` declared valid | **AGREE** |
| `legal_n0_direct_semantic_member_count_in_6100_scope = 2` | Reports two direct resolved `(10 11)` occurrences | **AGREE** |
| `legal_binding_survives_as_semantic_occurrence = false` | Reports binding directive removed by N0 and not semantic | **AGREE** |
| `ordered_edge_binding = invalid before semantic comparison` | Rejects ordered-edge positional binding before N0/comparison | **AGREE** |
| `declarative_operand_binding = invalid before semantic comparison` | Rejects binding as `==` operand before N0/comparison | **AGREE** |
| `n0_may_change_valid_ordered_edge_arity_by_deleting_binding = false` | Explicitly answers no | **AGREE** |

## Result

```text
AGREE:      6
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**RUN-S01: PASS.**

## Cold-report observations

The cold decoder raised four additional observations. None changes a scored assertion:

1. Revision/profile authority is supplied by the enclosing cold packet rather than repeated inside each tiny fixture. For this qualification packet that is consistent with the specification's allowance for an enclosing native/corpus contract; no scored defect is demonstrated here.
2. The declarative-binding fixture can be diagnosed both as a grammar failure and as the more specific forbidden-placement case. Both routes yield the same required pre-comparison rejection, so this is not a discrepancy in S01.
3. The decoder questioned whether a bare top-level scope qualifies as an ordinary scope-level serialization environment. The current text gives no narrower restriction, and the decoder applied the direct reading used by the scorer. No failure resulted.
4. Its identity-sharing terminology is consistent with the occurrence-versus-identity distinction and does not alter the result.

No specification repair is justified by RUN-S01. No discrepancy classification is required because every frozen assertion agrees.
