# Experiment 031 — Baseline Authority

**Status:** public revision map and integration boundary; contains no hidden answers.

## Exact current authority

The cold runner mechanically verifies these SHA-256 values before execution:

- Core 0.17: `348d59017047f7d64daba2066b9b3e068c629186ee3e767551cfcb9815fe36a8`
- Core 0.18: `51be43bec990b0c7baf93914e074c5fc9a29ec64b00eaf91eb25b672d9c04a63`
- Core 0.19: `8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2`
- QU 0.1: `1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc`
- NEI 0.4: `6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee`
- DP 0.1: `25fb4f84343633a22b08b2375fa085c2e01dc7f8a799a0e038b3fcf7ecc73c6b`
- DP 0.2: `9b121b767f5ca52759bd9a7a42d32dd1e6f12872c2bcfb370277a6292dd6011c`
- DP 0.3: `c37c9caebe33dc0b7f021638ab1679930f0e7edfbb3bd9368efdfc48538a11ee`
- DP 0.4: `35e70a19f0eb6a1893f541465d76e7d37d028a9128391562afcd6c9260d462cd`
- DP 0.5: `522a1a1a89b5f1fc753e17f76a58902c0f58543916d35a51a2c60dd64fcbea0b`
- DP 0.6: `2494a135c11e5d8a2c7da63af7cbf12ed78d769536f917fd5c216d4a932fcd44`
- DP 0.7: `7b4ba0cc7b895f39212080892d13b7f0a1d7d67c41267ed44291d11c5e63a08d`
- DTS 0.1: `9d3478f605bc7f673e3dc73f62991a80c50b0eadebe7fbe755689e01452ae4ad`

## Historical integration boundary before this experiment

Before Experiment 031, the latest direct/qualified full-stack composition is revision-scoped to Core 0.18:

```text
Core 0.17 + Core 0.18
+ QU 0.1
+ NEI 0.4
+ DP 0.1–0.7
+ DTS 0.1
```

Core 0.19 is independently qualified as current Core authority but has not yet received a direct complete-stack integration qualification.

Experiment 031 exists solely to discharge that integration boundary.

## Interpretation discipline

Apply each module at its own semantic layer.

Do not silently convert:

- source explicit support into implicit support or vice versa;
- structural correspondence into natural identity;
- natural identity into transition isomorphism;
- missing QU into semantic UNKNOWN;
- a discovery priority into proof authority;
- a derived view into replacement primitive structure;
- a familiar formula into a source-faithful rendering without an exact witness;
- one procedure's no-change result into universal semantic closure;
- a later refinement into a rewrite of historical evidence;
- a target claim into authority for restricting the evidence used to prove that target.
