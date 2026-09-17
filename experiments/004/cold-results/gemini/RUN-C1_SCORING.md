# Experiment 004 — Gemini RUN-C1 scoring

**Qualification source:** `30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Gemini model:** `gemini-3.5-flash`  
**Workflow run:** `35191919970`  
**Cold artifact:** `isograph-exp004-RUN-C1-cold-v3` (`10484393260`)  
**Frozen report SHA-256:** `144088f50e173602025e1e42b16f438ad01ad1c4893e2b68e1978b6cfffd1c54`  
**Scorer:** `PHASE_C_ASSERTIONS_004.json`

## Q004-11

All five scored expectations agree: non-isomorphic; no strong embedding; valid weak embedding; map `10→20, 11→21`; target residual `(^5101 20 21)`.

## Q004-12

Gemini recovered the scorer-intended accounting as its **Alternative A**: common `^5200` edge with `30→40, 31→41`; residual nodes `32` and `42`; boundary cuts `(^5201 31 32)` and `(^5202 41 42)`; no post-hoc relation dropping; no V0 mapping of `^5201` to `^5202`.

However, it also preserved an **Alternative B** in which `32→42` is added to the common node mapping and the two mismatched incident edges become edge-only residuals rather than boundary cuts. That conflicts with the frozen scorer's required accounting for the strongest justified common core, whose rationale treats the source-specific incident nodes and relations as residual/cut structure rather than an unsupported additional common-node correspondence.

Scoring:

- expected common core `(^5200 A0 A1)` — **PARTIAL** (reported, but a larger conflicting alternative was also accepted)
- core map example `30→40, 31→41` — **AGREE**
- A-only residual node `32` — **PARTIAL**
- B-only residual node `42` — **PARTIAL**
- A boundary cut `(^5201 31 32)` — **PARTIAL**
- B boundary cut `(^5202 41 42)` — **PARTIAL**
- may drop cut relations = false — **AGREE**
- may map `^5201` to `^5202` under V0 = false — **AGREE**

Discrepancy class: **witness/accounting error**. The decoder generated the intended accounting, but then admitted a second accounting that maps two nodes whose only incident load-bearing relations are rigid and mismatched. No Core Specification repair is indicated from this result.

## Q004-13

All four scored expectations agree: V0 isomorphism; at least two materially distinct witnesses; both expected leaf-swap mappings are explicitly enumerated; deterministic canonical labeling may not silently keep only one.

```text
AGREE:      12
PARTIAL:    5
DISAGREE:   0
NOT TESTED: 0
```

**Disposition:** PARTIAL — Q004-11 and Q004-13 pass cleanly; Q004-12 contains the correct expected accounting plus one conflicting extra alternative.
