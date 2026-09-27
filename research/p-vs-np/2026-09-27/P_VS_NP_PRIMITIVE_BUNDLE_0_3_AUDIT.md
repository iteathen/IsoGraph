# P versus NP primitive bundle 0.3 — NEI identity-closure audit

**Status:** unqualified primitive-closure successor  
**Native artifact:** `P_VS_NP_PRIMITIVE_BUNDLE_0_3.isg`

## Difference from 0.2

NEI auditing exposed that the predecessor primitive structure did not fully close identity for constructor-built objects.

0.3 incorporates exact primitive identity laws for:

- natural successors;
- list CONS objects;
- configurations.

## Exact constructor identity

### Natural successor

The predecessor field is functional.

Two successor objects with the same predecessor are equal.

Thus successor identity is not left to raw SI spelling.

### List cell

HEAD and TAIL are functional.

Two CONS objects with the same HEAD and TAIL are equal.

NIL remains disjoint from CONS.

### Configuration

State, left-list, current-symbol and right-list fields are functional.

Two configuration objects with the same four fields are equal.

## NEI significance

Without these clauses, an admissible identity model could contain duplicate raw objects with identical constructor structure.

That would make otherwise mathematical datatype identity underdetermined.

The new clauses make exact object identity emerge from represented domain structure, matching qualified NEI 0.4 discipline.

## Mechanical state

Bundle construction validates:

```text
free native variables:       0
delimiter residuals:         0
derived-view metadata:       absent
high-level complexity labels absent
```

The primitive bundle itself does not import NEI result roles.

NEI remains an overlay/extension rather than a Core primitive.
