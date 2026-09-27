# AC0 PARITY / AC0-natural barrier comparison — DP 0.8 run 0.1

**Status:** experimental discovery synthesis; no P-vs-NP theorem  
**Inputs:**
- `AC0_PARITY_RENDER_0_1.isg`
- `AC0_PARITY_RENDER_0_1_AUDIT.md`
- `AC0_NATURAL_BARRIER_2026_0_1.md`

## Objective

Determine what kinds of modifications to the successful PARITY lower-bound proof are structurally relevant to escaping the contemporary AC0-natural barrier.

## 1. Quantitative improvement and barrier escape are distinct objectives

The formal PARITY proof has many tunable/support components:

- restriction density;
- switching cutoff;
- live-variable reserve;
- round-zero calibration;
- depth-reduction arithmetic;
- circuit-to-formula expansion constants.

Improving one of these can strengthen the numerical lower bound.

But the 2026 barrier is stated for the **proof property's AC0-natural distinguisher class**, not for one particular choice of those constants.

Therefore:

```text
better switching parameters
    can improve theorem valuation/strength

better switching parameters
    do not by themselves establish
    a different barrier signature
```

DP must not confuse these objectives.

## 2. The present formal proof has a source-visible barrier signature

The PARITY control follows:

```text
random restriction
 -> switching simplification
 -> efficiently recognizable structural property
 -> parity contradiction
```

The modern barrier source explicitly places switching-lemma lower bounds in the AC0-natural family.

Thus an optimization that preserves this complete topology remains inside the represented barrier class unless a source-backed analysis proves otherwise.

## 3. First barrier-relevant support question

The highest-value question is no longer:

```text
which switching inequality is weakest?
```

It is:

```text
which support relation makes the proof property
AC0-constructive/natural in the barrier's sense?
```

That relation has not yet been exactly rendered.

Therefore the campaign cannot currently identify the minimum change needed to escape AC0-naturality.

Disposition:

```text
AC0-naturality consumer relation = QU
```

This is now a required source-rendering target.

## 4. Depth-role split remains useful but is not a barrier escape

The prior DP run separated:

```text
D_switch — depth in repeated switching collapse
D_unfold — depth in circuit-to-formula sharing expansion
```

Eliminating `D_unfold` with a DAG-native proof would improve the factorization and could improve quantitative loss.

However:

```text
D_unfold removed
    !=
AC0-natural property removed
```

unless the new proof changes the barrier's constructivity/naturality predicate.

Therefore DAG-native restriction remains interesting, but it is no longer mistaken for a barrier-crossing result.

## 5. Local switching budget is similarly orthogonal

Replacing global total-size support with the narrower local:

```text
switchingGateBudget
```

can generalize an internal collapse theorem.

But if the resulting lower-bound property remains AC0-natural, the 2026 barrier still applies at its stated scope.

Again:

```text
smaller sufficient support
    !=
barrier escape
```

This is the same sufficiency-versus-valuation distinction seen in IsoMax, now applied to proof-method classes.

## 6. New two-dimensional campaign state

Every candidate extension should now record:

```text
S = semantic/theorem sufficiency
Q = quantitative theorem strength
B = barrier signature
```

Examples:

### parameter optimization

```text
S: preserved
Q: possibly improved
B: unchanged unless separately proved
```

### DAG-native switching

```text
S: QU until constructed
Q: potentially improved
B: QU; no automatic change
```

### replacement of the natural distinguishing property

```text
S: QU
Q: QU
B: potentially changed — requires exact barrier-definition comparison
```

The third category is the only one directly aimed at barrier escape.

## 7. Self-reference is a control, not a discovery

The 2026 source itself notes the self-referential structure:

```text
switching lemma
 -> helps secure PRG
 -> PRG yields barrier
 -> barrier constrains AC0-natural proofs including switching-lemma proofs
```

IsoGraph can render this topology, but must not claim it as a new discovery.

Its value is as a particularly strong positive control for cyclic-looking provenance that is not logical circularity: theorem A can be used to prove a limitation theorem about a class containing methods based on A.

## 8. Implication for P-vs-NP search order

The current campaign should not try to extrapolate the PARITY proof directly toward unrestricted circuits.

The next barrier-aware order is:

1. exact-render the definition of AC0-natural proof used by the 2026 barrier;
2. locate where the formal PARITY proof induces the corresponding constructive distinguisher/property;
3. mark that consumer edge;
4. compare another successful lower-bound method with a different naturality signature;
5. only then ask DP for an alternative factorization that changes `B`.

Until steps 1–3 are complete:

```text
barrier-escape mechanism = QU
```

## 9. Novelty status

No new complexity theorem is claimed.

The useful IsoGraph result is methodological and structural:

```text
proof optimization space
    has at least two orthogonal directions:

    theorem-strength improvement
    barrier-signature change
```

The current formal control gives many candidates in the first direction and none yet established in the second.

That distinction prevents a large class of false P-vs-NP leads.
