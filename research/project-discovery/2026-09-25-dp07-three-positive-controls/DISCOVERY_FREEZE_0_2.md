# Blind discovery freeze 0.2

**Status:** FROZEN BEFORE CURRENT ORACLE SCORING  
**Workflow run:** `36222604050`  
**Workflow attempt:** `1`  
**Experiment SHA:** `821ba98e957b43d8def31bbfabf7253a2b47e429`  
**Evidence commit:** `98fbf2d6619f90a83c9b7d2ee11f5a4ffb18c854`  
**Translation Q7 promotion:** `f13aca1420327d7c1dc9a95ff78df44ffd820170`  
**Selected discovery model:** `gemini-3.1-flash-lite`  
**Cold outcome:** success  
**Packet SHA-256:** `93439fbe2ba502edbe01cab94e71f7952e3809b594b2d7418cb2c7e7bf79fcc5`  
**Report SHA-256:** `3f26c87f45b6a4a895b958a6b653b2831c23372f79ab765e3ddc01129eb18839`

This checkpoint freezes the DP 0.7 output produced from the ESR-qualified `blind-v2` packet before current hidden-oracle/scoring adjudication.

The workflow verified the promoted translation gate before execution, and the persisted evidence contains the exact dry-run packet identity, input manifest, metadata, raw report, and parsed report.

## Blind reasoner dispositions

These are the external reasoner's own unscored dispositions:

```text
case-01: EXACT_WITNESS
case-02: EXACT_WITNESS
case-03: EXACT_WITNESS
```

They are not accepted qualification results.

## Blind report summary

### case-01

The reasoner treated the two structures as directly isomorphic under role renaming and proposed direct parameter renaming between the pair and one-body coefficients.

### case-02

The reasoner mapped the two-valued logical representation to `#0/#1`, mapped parity/row-sum structure, and claimed an exact witness.

### case-03

The reasoner treated the two oscillator representations as directly isomorphic under state-variable and energy-role renaming and claimed an exact witness.

## Pre-scoring cautions visible from the blind output

Without applying the hidden oracle, the report itself contains claims that require later exact checking, including:

- whether case-01 is a direct parameter renaming or requires a nontrivial affine state/parameter transformation;
- whether case-03 permits direct `v <-> p` and `a <-> H` renaming or requires a derived bridge;
- whether each claimed zero-residual exact witness is supported by the promoted native structures.

No correction or oracle judgment is made in this freeze.

The frozen external report remains:

`research/project-discovery/2026-09-25-dp07-three-positive-controls/evidence/run-36222604050/PARSED_REPORT.json`
