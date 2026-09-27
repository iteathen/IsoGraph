# PC-R NEI / QU scopes 0.1

**Status:** experimental control-local overlay
**Identity authority:** qualified NEI 0.4 semantics
**Unknown authority:** qualified QU 0.1 semantics
**Primitive source:** `PC_R_PRIMITIVE_0_1.isg`
**Implicit support:** `PC_R_IMPLICIT_ASSERTIONS_0_1.md`

## 1. Global object identity

Raw vertex identities, list cells, relation tuples, and natural/budget objects retain their exact constructor/data identity.

Two different witness-prefix list objects are not globally SAME merely because they lead to the same future behavior.

## 2. Q-R-RESIDUAL — bounded continuation-language identity

For partial witness prefixes `p,q` in one fixed PC-R instance and with their exact remaining budgets represented:

```text
p ~R q
IFF
C_p = C_q,
```

where `C_p` is the exact set of admissible future vertex continuations that reach `t` without exceeding the remaining source length bound.

This is a scoped behavioral identity only.

```text
Q-R-RESIDUAL SAME
    != GLOBAL SAME.
```

## 3. Q-R-STAT — equality of the derived sufficient statistic

Define:

```text
J(p)=(last(p),remaining_budget(p)).
```

From PC-R-IA-009:

```text
J(p)=J(q)
    ->
Q-R-RESIDUAL SAME(p,q).
```

No converse is admitted.

Thus `J` is a sound, potentially finer, operational identity certificate rather than a claim to the coarsest NEI quotient.

## 4. Q-R-EXISTS — terminal Boolean identity

```text
E_R(p)
=
exists accepting bounded continuation from p.
```

Two prefixes are Q-R-EXISTS SAME exactly when this Boolean objective has the same truth value.

This quotient has at most two values and is generally too coarse to propagate the local recurrence without additional state.

## 5. Identity hierarchy for this control

```text
GLOBAL prefix identity
        finer than
J-statistic equality
        implies
Q-R-RESIDUAL SAME
        implies
Q-R-EXISTS SAME.
```

The first implication may be strict; the second is semantic projection.

No reverse implication is assumed.

## 6. QU state

The frozen control instance is closed-world:

- the vertex list is fixed;
- the represented `E` tuples are the entire edge extension;
- `s,t` are fixed.

Therefore no semantic QU is load-bearing for the control instance.

The experiment's deliberate withholding of a known solving method is **not QU**. It removes discovery hints, not problem information.

If the edge extension itself were unresolved, the proper representation would require a QU state describing admissible edge realizations. Omitting that required QU would make an identity query **INCOMPLETE**, not semantic UNKNOWN.

## 7. NEI discovery result

The useful operational state here is not maximum identity compression.

It is the cheaply accessible exact statistic:

```text
(current vertex, remaining budget).
```

That statistic is sufficient for exact future propagation even when it distinguishes states that the minimum Q-R-RESIDUAL quotient could merge.
