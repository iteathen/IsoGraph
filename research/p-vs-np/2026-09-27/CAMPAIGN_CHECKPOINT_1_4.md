# P versus NP primitive-logic campaign — checkpoint 1.4

**Branch:** `research/p-vs-np-primitive-logic-20260926`  
**Date:** 2026-09-27

## NEI integration complete

Qualified NEI 0.4 is now explicitly applied to the primitive P-vs-NP rendering.

New durable artifacts:

- `P_VS_NP_PRIMITIVE_BUNDLE_0_3.isg`
- `P_VS_NP_PRIMITIVE_BUNDLE_0_3_AUDIT.md`
- `P_VS_NP_NEI_OVERLAY_0_2.isg`
- `P_VS_NP_NEI_OVERLAY_0_1.md`
- `P_VS_NP_NEI_OVERLAY_0_1_AUDIT.md`
- `P_VS_NP_NEI_OVERLAY_0_2_AUDIT.md`
- `P_VS_NP_NEI_DP08_RUN_0_1.md`

## Identity corrections

NEI exposed missing constructor identity closure.

The primitive theory now includes exact identity laws for:

```text
natural successors
list cells
configurations.
```

## Central identity distinction

```text
global object identity
    !=
future-behavior scoped identity.
```

Different witness prefixes may remain globally DISTINCT while being SAME in the exact future-acceptance quotient.

## New DP target

Define residual width after NEI identity collapse:

```text
W_NEI(x,t)
    =
number of exact scoped residual identity classes.
```

If:

- witness depth is polynomial;
- `W_NEI` is polynomial;
- class identity and successor-class construction are polynomial-time computable;
- acceptance is class-invariant;

then deterministic polynomial dynamic propagation eliminates the existential projection.

## QU rule

Residual SAME must hold over the complete qualified QU realization family.

Missing QU is incomplete, not UNKNOWN.

Identity-driven QU restriction is forbidden.

## Current truth status

```text
P = NP: OPEN
P != NP: OPEN

universal polynomial NEI residual width:
    NOT ESTABLISHED
```

## Next work

Use several known polynomial-time bounded-existential problems as positive controls.

For each:

1. primitive-render the existential verifier;
2. construct the NEI residual identity query;
3. recover the exact law causing residual identities to collapse;
4. test the law against counterexamples;
5. only then project surviving structure toward harder problems.
