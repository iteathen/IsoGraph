# PC-H NEI / QU scopes 0.1

**Status:** experimental control-local overlay
**Identity authority:** qualified NEI 0.4 semantics
**Unknown authority:** qualified QU 0.1 semantics
**Primitive source:** `PC_H_PRIMITIVE_0_1.isg`
**Implicit support:** `PC_H_IMPLICIT_ASSERTIONS_0_1.md`

## 1. Global identity

Witness lists retain ordinary constructor identity.

Different list order, duplicate multiplicity, or different list cells can make two witness objects globally DISTINCT even when they encode the same assignment.

## 2. Q-H-ASSIGN — extensional assignment identity

For two witness lists `w1,w2` in one fixed instance:

```text
w1 ~A w2
IFF
for every variable x in VL:
    MEMBER(x,w1) IFF MEMBER(x,w2).
```

PC-H-IA-001 proves that Q-H-ASSIGN SAME preserves every clause truth value and the whole control truth.

This is scoped assignment identity, not global list identity.

## 3. Q-H-MODEL — model-set role

A satisfying assignment is characterized by its Q-H-ASSIGN membership extension.

When a model exists, the exact least model `M_min` is a unique minimum under subset order.

Uniqueness under this scoped order does not make its witness-list serialization globally canonical. The campaign uses the first-occurrence order in `VL` only to construct one deterministic list view.

## 4. Q-H-CLOSURE — local consequence state

For expansion states `F,G`:

```text
F ~C G
IFF
they have the same exact variable-membership extension.
```

The next EXPAND result is then the same under the fixed BODY/HEAD input.

This is process-state identity under the derived consequence construction.

It is not claimed to be the coarsest exact residual quotient of the original existential witness space.

## 5. Q-H-EXISTS — terminal objective identity

```text
E_H(instance)
=
exists satisfying witness assignment.
```

This has two semantic values.

As in the main campaign, its tiny semantic range does not provide its own access method.

## 6. Identity/accessibility distinction

The semantic least model is definable as:

```text
intersection of all models.
```

But polynomial access is supplied instead by the locally generated sequence:

```text
F_0, F_1, ..., F_*.
```

Thus:

```text
semantic canonical object
    != cheap access

local exact construction
    -> cheap access in this control.
```

## 7. QU state

BODY, HEAD, VL and CL are closed-world fixed input data.

No semantic QU is load-bearing.

Withholding the standard solution mechanism is experimental masking, not unresolved problem structure.

If clause incidence were unresolved, QU would have to preserve its admissible realization family. Omitting such load-bearing QU would make the affected identity query INCOMPLETE rather than semantic UNKNOWN.
