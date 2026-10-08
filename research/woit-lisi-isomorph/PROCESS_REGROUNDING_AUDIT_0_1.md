# Woit–Lisi Process Re-grounding Audit 0.1

**Status:** ACTIVE PROCESS RECOVERY — NO NEW CLOSURE PROMOTIONS  
**Date:** 2026-10-05

## Reason

The campaign drifted from IsoGraph's prescribed primitive-first procedure into hand-designed domain-specific closure machinery. Existing artifacts are preserved as evidence; they are not discarded.

The controlling distinction is:

> IsoGraph discovers the abstraction boundary. A domain-familiar construction chosen by an agent is not closure authority merely because it can be encoded and verified.

## Authority restored

The recovery is governed by the qualified Core chain through Core 0.21, the Core-0.21 ledger contract, current IA semantics/profile, NEI 0.4, DTS 0.1, cumulative Discovery Protocol 0.1–0.10, and the primitive-first unification method.

Closure packets are evidence under audit. They are not the authority used to decide whether their own source item is closed.

## Frozen source inputs

### W

- SSC: `woit/SOURCE_SEMANTIC_CENSUS_0_2.json` — 151 items.
- authoritative routing compilation: `woit/WOIT_NATIVE_COMPILATION_MANIFEST_0_2.json`.
- audited promoted ledger: `woit/CORE021_CLOSURE_LEDGER_0_47.json`.

### L

- SSC: `lisi/SOURCE_SEMANTIC_CENSUS_0_2.json` — 191 items.
- authoritative routing compilation: `lisi/LISI_NATIVE_COMPILATION_MANIFEST_0_4.json`.
- audited promoted ledger: `lisi/CORE021_CLOSURE_LEDGER_0_16.json`.

The later L ledger 0.17 and pre-DP gate 0.4 are explicitly non-authoritative process-drift evidence. L136's source instance and falsifier remain useful evidence, but its promotion is withdrawn pending graph-first re-derivation.

## Conservative promotion audit

A prior closure is placed into **REQUIRES_DERIVATION_AUDIT** whenever its authoritative closure path traverses a campaign-created `RESEARCH_LOCAL_SCHEMA` node.

This is intentionally conservative. It does not say every such schema is wrong. It says the schema may not certify its own admission. The source graph and qualified IsoGraph authority must independently regenerate it or a lower equivalent.

Current result:

| Track | prior promoted closed | provisionally retained | requires derivation audit |
|---|---:|---:|---:|
| W | 79 | 35 | 44 |
| L | 39 | 26 | 13 |

The retained set is only a provisional starting baseline. It still requires exact source reconstruction and graph-derived ledger regeneration before any strict closure claim.

## Recovery sequence

1. Audit each provisionally retained item directly against its frozen SSC body and native graph.
2. Audit each `REQUIRES_DERIVATION_AUDIT` item without using its closure packet as a semantic premise.
3. Demote any agent-chosen abstraction boundary to research candidate/support evidence.
4. Repair the campaign extractor so the ledger is mechanically generated from SSC + authoritative native graph, with canonical Core-0.21 hashes.
5. Regenerate W and L ledgers and run structural gates.
6. Do not begin IA until the applicable track is actually primitive/schema closed.
7. Run recursive source-local IA to no-change fixed point.
8. Then NEI, DTS, and only then Discovery Protocol.
9. Cross-track structural comparison remains forbidden until both tracks seal independently.

No Woit semantics may repair Lisi and no Lisi semantics may repair Woit.
