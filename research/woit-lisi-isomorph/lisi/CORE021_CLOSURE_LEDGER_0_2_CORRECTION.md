# Lisi Core-0.21 Closure Ledger 0.2 Correction

**Status:** 0.2 HASH FIELDS DEFECTIVE / SUPERSEDED BY 0.3  
**Affected artifact:** `CORE021_CLOSURE_LEDGER_0_2.json`

The 0.2 graph/disposition construction was structurally sound, but the local SHA-256 implementation used while generating its frozen hashes had an internal working-variable error.

A canonical validation against the Core-0.21 hashing contract detected mismatches in:

- source semantic census hash;
- semantic scope hash;
- primitive-kernel hash;
- governing-authority hash;
- inference-profile hash.

No IA fixed point or downstream DP/NEI/DTS result was created from 0.2.

Successor `CORE021_CLOSURE_LEDGER_0_3.json` preserves the same node graph and L125/L126 dispositions and replaces only the recomputed frozen hash fields (plus a diagnostic correction marker).

The correction was checked with a known SHA-256 test vector:

~~~text
SHA256("abc")
= ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
~~~
