# Experiment 017 — Connect4 q Congruence Qualification Plan

**Status:** frozen qualification design  
**Semantic owner:** iteathen/Connect4  
**Qualification host:** iteathen/IsoGraph  
**Source manifest:** `experiments/017/SOURCE_MANIFEST.json`  
**Cases:** `experiments/017/CASES.md`  
**Cold prompt:** `experiments/017/COLD_PROMPT.md`  
**Hidden assertions:** `experiments/017/hidden/ASSERTIONS.json`  
**Resource target:** one Gemini semantic call

## Claim

Qualify the standard-7x6 orientation-sensitive q_o congruence theorem and the separate horizontal-reflection q_r orbit/cache relation.

Required result shape:

```text
q_o equality
    -> same literal legal columns
    -> same terminal token per literal action
    -> same nonterminal successor q_o
    -> same complete orientation-sensitive action-labelled future game

horizontal reflection
    -> q_r orbit quotient
    -> action transporter c <-> 6-c when orientation differs
    -> exact scalar value/cache reuse

q_r
    != literal action-label identity without transporter
    != physical occurrence identity
    != non-q proof/certificate identity
```

## Isolation

Cold packet includes only:
- exact frozen Connect4 source snapshots listed in SOURCE_MANIFEST;
- qualified NEI 0.4;
- public C01-C18 holdout;
- public serializer prompt.

It excludes:
- the internal Connect4 q independent review;
- hidden assertions/scorer;
- author audit;
- prior Experiment 017 outputs/evidence;
- expected verdicts.

## Scoring

All C01-C18 must match proposition-specific hidden assertions.

The overall verdict must be:

```text
q_o_congruence = VALID_UNDER_DECLARED_SCOPE
q_r_distinction_required = true
```

Any semantic mismatch, missing/duplicate case, malformed answer shape, or packet-isolation failure yields DOES_NOT_QUALIFY.

## Resource discipline

One cold semantic call. One in-run retry only for 5xx provider failure. No rerun to improve a semantic answer.
