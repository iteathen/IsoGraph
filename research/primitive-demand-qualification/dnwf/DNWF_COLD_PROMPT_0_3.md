# DNWF 0.1 Cold Qualification Prompt — 0.3

You are evaluating a frozen semantic-extension candidate.

Inputs supplied to you:
1. the qualified Core material needed to read the candidate;
2. `DNWF_0_1_CANDIDATE.md`;
3. `DNWF_COLD_CASES_0_3.json`;
4. the public output schema.

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

## Classification token meanings

Use the tokens according to these mutually exclusive targets:

- **CONSISTENT_DNWF** — the described DNWF structure/signature and the claim made about it are compatible with the frozen candidate.
- **INCONSISTENT_DNWF** — the described signature/carrier/fold structure itself violates a DNWF requirement, such as coverage, constructor separation, recursive-field typing, well-foundedness, fold uniqueness, or coherent signature metadata.
- **DISTINCT_SEMANTICS** — two structures/signatures may each separately satisfy DNWF, but the structural mutation changes DNWF semantics and they must not be identified as semantically the same. Use this token when semantic non-equivalence is the tested distinction.
- **OVERCLAIM** — the underlying DNWF structure is not the defect being tested; a proof, report, or conclusion asserts more than DNWF licenses, including incomplete induction arguments or imported non-claims.

If a case includes a false report about two otherwise admissible structures, classify the **targeted defect** according to the definitions above rather than treating the whole prose package as one malformed structure.

Requirements:
- reconstruct DNWF semantics from the frozen candidate rather than from familiar datatype terminology;
- preserve recursive versus external field distinctions;
- preserve constructor tag and field order distinctions;
- enforce constructor coverage/separation, well-foundedness, leastness, unique fold, and structural induction;
- reject arithmetic/cardinality/domain semantics not supplied by DNWF;
- do not mention or infer Woit, Lisi, physics, or any application-domain object.

Return only the case array in the requested schema.

This 0.3 successor changes only holdout classification disambiguation after Experiment 061 attempt 1 demonstrated that 0.2 left `INCONSISTENT_DNWF`, `DISTINCT_SEMANTICS`, and `OVERCLAIM` overlapping in C15/C17/C18. DNWF candidate semantics are unchanged.
