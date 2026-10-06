# DNWF 0.1 Cold Qualification Prompt — 0.2

You are evaluating a frozen semantic-extension candidate.

Inputs supplied to you:
1. the qualified Core material needed to read the candidate;
2. `DNWF_0_1_CANDIDATE.md`;
3. `DNWF_COLD_CASES_0_2.json`.

You are **not** given expected answers, scorer rules, prior decoder outputs, or the hidden oracle.

For every case return:

```json
{
  "case_id": "...",
  "classification": "CONSISTENT_DNWF | INCONSISTENT_DNWF | DISTINCT_SEMANTICS | OVERCLAIM",
  "load_bearing_reason": ["..."],
  "must_follow": ["..."],
  "must_not_follow": ["..."]
}
```

Requirements:
- reconstruct DNWF semantics from the frozen candidate rather than from familiar datatype terminology;
- preserve recursive versus external field distinctions;
- preserve constructor tag and field order distinctions;
- enforce constructor coverage/separation, well-foundedness, leastness, unique fold, and structural induction;
- reject arithmetic/cardinality/domain semantics not supplied by DNWF;
- do not mention or infer Woit, Lisi, physics, or any application-domain object.

Return only the case array in the requested schema.

This 0.2 successor supersedes the unexecuted 0.1 holdout for qualification because it closes the frozen Q5 mutation-coverage defect before any cold decoder run.
