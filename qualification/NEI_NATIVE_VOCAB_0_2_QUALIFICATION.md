# NEI 0.4 Native Vocabulary 0.2 — Deterministic Qualification

**Status:** QUALIFIES as native vocabulary companion  
**Semantic owner:** `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md`  
**Human companion:** `extensions/nei/NEI_NATIVE_VOCAB_0_2.md`  
**Native declaration:** `extensions/nei/NEI_VOCAB_0_2.isg`  
**Human companion git blob:** `5609ab560e67ae9ef039817f4f135fefdb718311`  
**Native declaration git blob:** `d30ea93cb35ddbaabff63019f1d970925472aaab`

## Scope

This qualification establishes that the native declaration exactly exposes the extension-owned stable roles documented by the human vocabulary companion.

It does not independently qualify the semantics of NEI 0.4; those are qualified by Experiment 016.

## Mechanical checks

```text
documented successor roles          36
native successor roles              36
range                               ^94100..^94135
missing native roles                 0
extra native roles                   0
role-set equality                   PASS
NEI revision authority anchor       PASS
collision with historical ^940xx    none by namespace/range
```

The native declaration reuses historical `^94000` only as the NEI extension/revision authority role, exactly as documented by the companion.

No parser syntax or Core primitive is added.

## Disposition

```text
native vocabulary role closure      PASS
human/native role-set equality      PASS
authority anchor                    PASS
semantic status                     inherited from exact NEI 0.4 qualification
```

**QUALIFIES as the native vocabulary companion for the promoted NEI 0.4 revision.**
