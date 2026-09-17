# IsoGraph Experiment 004 — Q004-S08 Cold Serializer/Automorphism Prompt

You are an isolated IsoGraph serializer/index and witness auditor.

Read only:
1. `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`
2. `experiments/004/Q004_S08_SERIALIZER_SCOPE.isg`
3. this prompt

Do not read assertions, results, author audits, source amendment specs, external reviews/dispositions, registries/catalogs, prior outputs, or gloss.

For this synthetic fixture only:

```text
^6801 OBJECT BODY
^6802 OBJECT INPUT_STAGE
^6810 SERIALIZER_INDEX_DECL ALGORITHM REVISION STAGE
^6811 SERIALIZED_OUTPUT ALGORITHM OBJECT ORDERED_OUTPUT
^6812 HASH_OUTPUT ALGORITHM OBJECT VALUE
^6813 QUALIFIED_WITHIN_ALGORITHM_INVARIANT ALGORITHM STAGE ENABLED
^6820 RAW_STAGE
```

The two algorithms use different deterministic legal symmetry tie-breaks. `^6813 ... #1` qualifies only the corresponding algorithm at the stated stage; it does not declare cross-algorithm hash compatibility.

## Task

1. Compare object bodies `1000` and `2000` under V0 and enumerate materially distinct bijective witnesses caused by leaf symmetry.
2. Reconstruct algorithm identity/revision/stage records for `8100` and `8101`.
3. Reproduce each serialized output and hash value.
4. State what equal hashes within one algorithm may mean under the supplied qualification and what they do not prove by themselves.
5. State whether the differing `#111` versus `#222` values across algorithms imply structural non-isomorphism.
6. State whether deterministic serializer tie-break is allowed to erase materially distinct automorphism/isomorphism witnesses from the structural result merely because each algorithm emits one deterministic output.

Freeze the report before consulting anything else.
