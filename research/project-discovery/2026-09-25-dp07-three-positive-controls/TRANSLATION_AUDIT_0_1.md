# Translation qualification audit 0.1

**Status:** FAIL — current six native files are not yet source-faithful translations  
**Effect on prior DP run:** preliminary diagnostic only; not admissible DP 0.7 evidence

## Governing precedent

IsoGraph Experiment 001 requires:

```text
source X
-> native C
-> fresh isolated reconstruction X'

PASS only if:
X' is canonically structurally isomorphic to X
```

Any load-bearing distinction that is lost, added, merged, reordered, rescoped, or reinterpreted fails exact reconstruction.

Experiment 002 later identified a specific bad pattern:

```text
native payload = proposition/role identity only
sidecar        = proposition meaning
```

and required the formula structure itself to become native.

## Finding

The three-positive-control campaign currently repeats that earlier failure mode in miniature.

The six `.isg` files preserve useful role/dependency skeletons, but their Markdown source freezes still carry source semantics that are absent from the native payload.

Examples:

- the Ising native file says that a pair-contribution role depends on a neighbor relation, a local-value role, and J; it does not natively encode `-J s_i s_j`, the two endpoints, or the pair sum;
- the XOR file names a fold role but does not natively encode the XOR truth table or an equivalent algebraic authority;
- the Newton file exposes derivative/inertial/restoring roles but does not natively encode `m qddot + kq = 0`;
- the Hamilton file exposes H/kinetic/potential/qdot/pdot roles but does not natively encode the actual equations.

Therefore a cold decoder given the native payload alone cannot reconstruct the frozen source exactly without importing missing semantics.

## Disposition

All six translations fail the author-side semantic-coverage gate.

No cold sameness test should be counted until that gate passes.

The already completed DP run `36213568767` is retained as useful diagnostic evidence about DP behavior on skeletal representations, but its result is **not** evidence that DP 0.7 succeeds on rigorously translated source systems.

## Required translation pipeline

For every source candidate:

```text
source freeze
    ->
independent normalized source oracle
    ->
native IsoGraph translation
    ->
author-side formula/coverage audit
    ->
mechanical native integrity audit
    ->
fresh isolated native-only reconstruction
    ->
canonical source/reconstruction isomorphism check
    ->
adversarial distinction-preservation checks
    ->
TRANSLATION QUALIFIED
    ->
only then enter Discovery Protocol
```

Human-readable semantic sidecars may remain for review, but they cannot carry load-bearing meaning absent from the native bundle.

## Sameness criterion

This campaign uses **source-semantic structural equivalence**, not NEI natural-object identity.

The translation passes only when the reconstructed native object is canonically isomorphic to the normalized source object under the declared source interpretation and scope.

No partial credit is sufficient for the exact-translation gate.
