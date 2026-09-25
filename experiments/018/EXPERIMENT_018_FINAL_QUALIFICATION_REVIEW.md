# Experiment 018 — Discovery Protocols 0.6 Final Qualification Review

**Qualified baseline:** Discovery Protocols 0.1–0.4 cumulative module  
**Successor artifacts:** `DISCOVERY_PROTOCOLS_0_5_CANDIDATE.md` + `DISCOVERY_PROTOCOLS_0_6_CANDIDATE.md`  
**Formal disposition:** **QUALIFIES**  
**Successful workflow run:** `36177381347`  
**Frozen qualification SHA:** `7118f32caf829c3894994d8b98f0406640de04dd`

## Result

```text
D01-D14:             14 / 14 PASS
mismatches:          0
scoring guards:      all true
module assessment:   SUPPORTED
formal disposition:  QUALIFIES
successful report:   1
successful run API attempts: 2
successful HTTP:     200
```

The successful focused packet qualified the DP 0.5/0.6 successor obligations on top of the already-qualified DP 0.1–0.4 baseline.

It recovered:
- semantic-quantity alignment before value-conflict judgment;
- independent qualification and discovery dispositions;
- real decoder error with a surviving structural lead;
- explicit-vs-derived predicate distinction;
- hidden-distinction splitting;
- scoped equivalence without global identity;
- QU-preserving treatment of unresolved load-bearing structure;
- dependency-cone propagation;
- qualification completion with an open discovery lead;
- ordinary-error closure after structural falsification;
- bounded rather than exhaustive search;
- natural identity routing through current NEI 0.4;
- non-identity structural claims proceeding without artificial NEI;
- QU use only when unresolved structure is load-bearing;
- determinate cases proceeding without artificial QU instances.

## Exact successor hashes

- DP 0.5 SHA-256: `522a1a1a89b5f1fc753e17f76a58902c0f58543916d35a51a2c60dd64fcbea0b`
- DP 0.6 SHA-256: `2494a135c11e5d8a2c7da63af7cbf12ed78d769536f917fd5c216d4a932fcd44`
- Core 0.18 SHA-256: `51be43bec990b0c7baf93914e074c5fc9a29ec64b00eaf91eb25b672d9c04a63`
- QU 0.1 SHA-256: `1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc`
- NEI 0.4 SHA-256: `6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee`
- focused packet SHA-256: `dc2e7bc1cf8284a8fc7eb1b4019eec7574aa8a18a89c1f8844686f11ee158505`
- report SHA-256: `a0973e6273a5501c90a537e5fc5cf137016c44f2e86aad59911c9f7d356fa8b5`

## Provider-failure history

The original oversized cumulative packet was attempted twice through workflow run `36176965999`; both attempts produced only HTTP 503 provider failures and no semantic report or score.

The packet was then reduced under Core obligation-sufficiency discipline: qualified DP 0.1–0.4 was pinned as baseline rather than semantically re-proved. Candidate semantics, public cases and hidden expected propositions were unchanged.

The successful focused run itself required two API attempts, with the in-run 5xx retry ending in HTTP 200.

Provider failures are preserved as infrastructure evidence and do not count as semantic dispositions.

## Promotion

Promote Discovery Protocols 0.1–0.6 as the current cumulative qualified module at the exact revisions above plus the previously qualified DP 0.1–0.4 hashes.

DP remains discovery/search guidance. It does not become semantic proof authority.
