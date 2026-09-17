# Experiment 004 — Gemini RUN-S07 scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Cold artifact:** `isograph-exp004-RUN-S07-cold-v3` (`10484600723`)  
**Frozen report SHA-256:** `58b6d5774826840e125b5b2667ada3f4f22a1388b53eb342271ea4cf90d55c32`  
**Scorer:** `experiments/004/Q004_S07_ASSERTIONS_004.json`

## Result

| Assertion | Verdict | Evidence from frozen report |
|---|---|---|
| inert NAC object exists but is not evaluated | AGREE | Report explicitly identifies `!(10 20)` as existing inert data and not evaluated. |
| matcher binding is `?0 -> 1` | AGREE | Positive `(10 ?0)` matches `(10 1)` and report gives `?0 -> 1`. |
| matcher negative condition is satisfied | AGREE | Report evaluates `!(20 1)` as satisfied. |
| reason is no direct `(20 1)` occurrence in target boundary | AGREE | Report states target scope `7000` lacks `(20 1)`. |
| forbidden placement is profile-validation failure inside ordered incidence | AGREE | Report classifies `(40 !(10 20))` as profile-validation failure. |
| forbidden case is not an ambient negative query | AGREE | Report explicitly says no ambient evaluation occurs. |
| NAC existence does not imply evaluation | AGREE | Report preserves the existence/evaluation distinction in inert and forbidden cases. |

```text
AGREE:      7
PARTIAL:    0
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PASS.

No specification repair is indicated by RUN-S07. The report additionally described the successor that would result if the matched rule were executed; that statement is outside the scored S07 assertions and does not affect the score.
