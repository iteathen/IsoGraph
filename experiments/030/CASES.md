# Experiment 030 — Fresh Core 0.19 Mutation-Preservation Holdout

These cases are fresh to Experiment 030.

Apply Core 0.19 section 18 exactly.

## R01 — Mutated distinction preserved

A familiar formula normally contains coefficient +7.

For this frozen source variant, exactly one distinction is mutated:

`+7 -> -7`.

The native rendering encodes -7.

The isolated cold reconstruction returns -7 and preserves every other source distinction.

Determine whether the decoder preserved the mutated distinction, whether the exact-rendering qualification passes this mutation case, and whether familiar-form repair would be allowed.

## R02 — Familiar-form repair destroys the mutation

A familiar formula normally contains an existential quantifier.

For this frozen source variant, exactly one distinction is mutated:

`exists -> forall`.

The native rendering encodes `forall` exactly.

The isolated cold decoder returns `exists` solely because it recognizes the familiar canonical formula.

Determine whether the decoder preserved the mutated distinction, whether the exact-rendering qualification passes this mutation case, and whether familiar-form repair is allowed.
