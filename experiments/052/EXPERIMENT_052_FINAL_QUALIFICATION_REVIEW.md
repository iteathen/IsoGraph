# Experiment 052 — Final Current-Stack Integration Qualification Review

**Status:** COMPLETE  
**Formal disposition:** `QUALIFIES`  
**Date:** 2026-09-28  
**Workflow run:** `36365347906`  
**Frozen execution SHA:** `ab206d2edb2567cbd4219d5bcc35f0b3ec400dc6`  
**Packet SHA-256:** `f150b48832746e00b990a0059e61426d7e6e169947437a68c693898018856f11`  
**Report SHA-256:** `f4dc6fe9be7efe6a1382bf5a2d3091aeed13f6d386535e330b08afdff55d5a6f`

## Qualified module hashes exercised directly

```text
Core 0.20:
9a619b552a6ef7719e5b4b5f3a9df4a732ff4377b9bc7b86c385ed5c992b88e7

DP 0.8:
74378de9618b655888a993901e620ca841ae47f3aa406dff1d2dcc92de15fa96

QU 0.1:
1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc

NEI 0.4:
6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee

DTS 0.1:
9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad
```

## Result

```text
fresh integration cases:   16 / 16 PASS
failed cases:              0
unexpected cases:          0
duplicate cases:           0
exact case count/order:    PASS
self-audit:                PASS
all module assessments:    SUPPORTED
```

The exercised cases directly combine:

- Core 0.20 primitive-closure enforcement;
- DP 0.8 discrepancy/clue separation;
- QU-preserving unresolved alternatives;
- NEI scoped sameness without global identity overreach;
- DTS transition-anatomy enforcement;
- derived-view/Core boundaries;
- source-faithful/reference-conflict behavior;
- dependency invalidation and post-repair support;
- historical Core 0.19 compatibility boundaries.

## Attempt 1 preserved

Run `36365119438` returned substantively correct case contents and all module assessments `SUPPORTED`, but the public prompt had not required a top-level `cases` array and one I14 boolean field name was ambiguous.

Disposition:

`PUBLIC SERIALIZATION / FIELD-SEMANTICS CONTRACT DEFECT / NO INTEGRATION DISPOSITION`.

No Attempt-1 output was retroactively reshaped or rescored.

The successful run used the same semantic case set and qualified module revisions after only the public serialization contract and I14 field wording were repaired.

## Conclusion

The following exact composition is directly integration-qualified for the exercised dependency-closed scope:

```text
Core 0.17 + Core 0.18 + Core 0.19 + Core 0.20
+ QU 0.1
+ NEI 0.4
+ Discovery Protocols 0.1–0.8
+ DTS 0.1
```

This is compatibility evidence for the tested composition, not universal semantic completeness.
