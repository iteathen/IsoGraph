# Woit–Lisi Process Re-grounding Audit 0.2

**Status:** ACTIVE PROCESS RECOVERY — ALL PRIOR CLOSURE PROMOTIONS REQUIRE RE-DERIVATION  
**Date:** 2026-10-05  
**Predecessor:** `PROCESS_REGROUNDING_AUDIT_0_1.json`

## Result

The first recovery pass quarantined closures whose paths traversed campaign-created `RESEARCH_LOCAL_SCHEMA` nodes. This second pass tests the remaining provisional closures against the current authoritative native compilation.

| Track | historical promoted closures | accepted after re-grounding | require re-derivation |
|---|---:|---:|---:|
| W | 79 | 0 | 79 |
| L | 39 | 0 | 39 |

This does **not** say the prior mathematical work is false. It says those artifacts are not presently closure authority under the graph-first IsoGraph procedure.

## W

Audit 0.1 provisionally retained 35 W items.

- 31 are not closed in `woit/WOIT_NATIVE_COMPILATION_MANIFEST_0_2.json`.
- 4 are routing-marked closed there: W-SSC-023, W-SSC-024, W-SSC-026, W-SSC-098.

The W manifest explicitly states that those closed-schema markers are routing metadata and that semantic closure authority comes from the corresponding ledger reconstruction paths / closure packets. Because closure packets are now under process audit, those four markers cannot preserve accepted semantic closure by themselves.

Together with the 44 items already quarantined for `RESEARCH_LOCAL_SCHEMA` traversal, all 79 W promotions require independent graph-first re-derivation.

## L

`lisi/LISI_NATIVE_COMPILATION_MANIFEST_0_4.json` is explicitly a pre-closure authoritative routing compilation over SSC 0.2. It marks every one of the 191 source bodies `INCOMPLETE_UNEXPANDED`.

Therefore:

- the 13 L closures already quarantined for `RESEARCH_LOCAL_SCHEMA` traversal remain under derivation audit;
- the other 26 promotions are ledger-only relative to the authoritative native routing graph.

All 39 closures in ledger 0.16 require re-derivation. L136 / ledger 0.17 remains non-authoritative process-drift evidence.

## Governing rule

> Accepted closure must be mechanically derivable from the frozen SSC plus the current authoritative native graph and qualified IsoGraph authority.

A ledger, closure packet, named mathematical construction, or hand-frozen abstraction boundary cannot supply the semantic structure needed to justify its own admission.

## Evidence preservation

No historical packet, schema, source instance, falsifier, verifier, or ledger is deleted. They remain candidate/support evidence. A prior construction may be re-admitted if the graph-first procedure independently regenerates its structure and reconstructs the frozen source body.

## Next required action

Repair the campaign extractor and regenerate baseline Core-0.21 ledgers directly from SSC 0.2 plus the authoritative native routing graph, with every body reopened until primitive/schema derivation is reconstructed. Then run the Core-0.21 structural gates before resuming closure work.
