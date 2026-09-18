# IsoGraph Experiment 004 — RUN-S02 scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Cold report:** `RUN-S02_COLD_CLAUDE_001.md`  
**Scorer:** OpenAI assistant after cold report freeze  
**Hidden scorer opened only after cold freeze:** yes

## Assertion comparison

| Assertion | Verdict | Evidence from frozen cold report |
|---|---|---|
| `case_1_successor_direct_members = [20, 21]` | AGREE | Reports exact successor member structure `[20 21]`. |
| `case_1_direct_member_count = 2` | AGREE | Reports successor direct member occurrence count `2`. |
| `case_2_successor_direct_member_count = 1` | AGREE | Reports successor direct member occurrence count `1`. |
| `case_2_direct_member_is_nested_scope = true` | AGREE | Reports the sole direct member is a literal nested scope `[20 21]`. |
| `case_2_nested_scope_direct_members = [20, 21]` | AGREE | Reports nested scope contains direct members `20` and `21`. |
| `rule_outer_scopes_are_inserted_as_nested_members = false` | AGREE | Explicitly states outer RHS brackets are rule-side containers and are not inserted as semantic nested scopes. |
| `lhs_outer_container_is_literal_nested_scope = false` | AGREE | Explicitly states outer LHS rule container is not a literal nested scope to be matched. |

## Result

```text
AGREE:      7
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PASS.

## Additional cold-report observations

The cold report records four cautions about identifier interpretation, matching discipline, token semantics, and whitespace-delimited scope members. None changes any scored assertion and none demonstrates a conflict with the frozen scorer. They remain preserved as decoder observations rather than being promoted to specification defects.
