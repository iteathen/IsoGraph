# Experiment 030 — Baseline Authority

**Status:** frozen focused-regression baseline

## Candidate under test

Core 0.19 candidate Git blob:

`ae482dda774456a855af942dc8d15fcfd5aae0bb`

Candidate SHA-256 recorded by Experiment 029:

`8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2`

The candidate bytes are unchanged from the scored Experiment 029 run.

## Qualified dependency

QU 0.1 SHA-256:

`1f1510b41e4351726e4d9e714eb32ece0d5e69f0964255aabd7b4a6e94eee4cc`

QU 0.1 supplies admissible-realization semantics and semantic refinement.

## Predecessor qualification evidence

Experiment 029 scored:

```text
D01-D24:
PASS 23
FAIL 1
all guards true
formal disposition DOES_NOT_QUALIFY
```

Only D09 failed.

The failure is immutable and is not included in the cold packet.

Core 0.19 section 16 target 9 states:

> qualified refinement is propagated and a universally invariant result may discharge QU from the conclusion while retaining provenance.

The candidate also normatively separates assertion body from assertion support.

Experiment 030 uses fresh cases to test that distinction rather than replaying D09.

## ESR section-18 predecessor

The six-rendering ESR 0.1 campaign remains successful:

```text
qualified source renderings: 6 / 6
Q7 promotion: PASS
```

That evidence is not replayed in this focused regression.

## Governing distinction

For these cases preserve:

```text
assertion body
    !=
support / scope / provenance

QU discharged from conclusion/body by universality
    !=
QU provenance erased

exact within qualified scope
    !=
valid outside that scope

same assertion body
    !=
same support lineage
```
