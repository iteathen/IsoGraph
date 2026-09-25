# Discovery Protocols 0.1–0.6 Qualification Review — 2026-09-25

**Status:** qualified cumulative Discovery Protocol module  
**Historical qualified baseline:** DP 0.1–0.4  
**Qualified successor layers:** DP 0.5 + DP 0.6  
**Fresh qualification evidence:** Experiment 018

Current cumulative Discovery Protocol authority is:

```text
DP 0.1
+ DP 0.2
+ DP 0.3
+ DP 0.4
+ DP 0.5
+ DP 0.6
```

The exact historical DP 0.1–0.4 hashes remain those recorded in `qualification/QUALIFIED_MODULES_2026-09-18.md`.

Successor hashes:
- DP 0.5: `522a1a1a89b5f1fc753e17f76a58902c0f58543916d35a51a2c60dd64fcbea0b`
- DP 0.6: `2494a135c11e5d8a2c7da63af7cbf12ed78d769536f917fd5c216d4a932fcd44`

Experiment 018 disposition: **QUALIFIES**, 14/14 cases PASS, zero mismatches.

DP 0.6 corrects the current dependency routing:
- qualified Core 0.18 supplies observation-first discrepancy semantics;
- qualified QU 0.1 supplies unresolved-structure semantics when load-bearing;
- qualified NEI 0.4 owns natural/domain identity conclusions when invoked;
- non-identity discovery does not require NEI merely because two subjects are compared;
- determinate discovery does not require artificial QU materialization.

Discovery priority remains search guidance, not proof authority.
