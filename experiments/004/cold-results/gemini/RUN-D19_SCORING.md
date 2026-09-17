# Experiment 004 — Gemini RUN-D19 scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Cold artifact:** `isograph-exp004-RUN-D19-cold-v3` (`10484988097`)  
**Frozen report SHA-256:** `a4de33a06b902997111b2505a7ca3b576396fa71dcb020143a57aad500e1a437`  
**Scorer:** `Q004_19_ASSERTIONS_004.json`

## Hidden-scorer comparison

All 11 hidden scorer expectations are substantively recovered:

- positive instances `#1/#2/#3` — AGREE
- positives are pairwise V0-isomorphic — AGREE
- expected example maps `1→10,2→11,3→12,4→13` and `1→20,2→21,3→22,4→23` — AGREE
- induced candidate graph `(A B),(A C),(B D),(C D)` — AGREE
- B/C branch automorphism — AGREE
- negative `^5902 #1` does not match — AGREE
- failure reason is lack of reconvergence to one shared D — AGREE
- disposition `NEW_CANDIDATE_CLASS` — AGREE
- no supplied registry label is required/forced — AGREE in substance
- promotion remains unqualified pending held-out/adversarial evidence — AGREE

## Additional cold-report defects

Two unscored defects prevent a clean PASS.

1. **Familiar-name leakage.** The governing cold prompt explicitly says `Do not infer a familiar class name`, but the report repeatedly calls the structure a "diamond" and invents `^novel_diamond_schema`. The structural schema itself is correct, but attaching the familiar semantic name violates the cold discovery instruction. This is classified as **decoder/search implementation error / label-semantic leakage**, not evidence that the representation required such a label.

2. **Self-inconsistent common-core accounting.** The report labels a proposed 3-edge common structure a "Maximum Induced Isomorphism" while mapping all four A-side nodes. Yet A retains an additional edge `(3 4)` among two mapped nodes that is absent on the B side; under an induced/strong claim that extra relation blocks reflection. On the B side, `(32 34)` connects mapped identity `32` to residual identity `34`, so complete item accounting should preserve the cut incidence rather than classify the whole edge only as an ordinary B-only residual. This is a **witness/accounting error** in an auxiliary analysis section. It does not change the correct negative-instance failure or candidate schema.

The report's explicit minimality discussion does declare a metric, as required by the prompt; no discrepancy is assigned merely for making that metric-scoped claim.

**Disposition:** PARTIAL. The intended novel structural class and every hidden scorer target were recovered, but the cold report violated the no-familiar-name instruction and added an inconsistent induced/common-core accounting claim.
