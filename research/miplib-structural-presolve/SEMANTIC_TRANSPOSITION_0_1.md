# MIPLIB semantic transposition prototype 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Question

Can a post-presolve MIP contain variables that are **semantically interchangeable under the feasible polyhedron and objective** even though their exchange is not a formulation automorphism?

This is deliberately stronger than graph symmetry.

## Frozen targets

- `glass4` — positive control; known exact formulation swap.
- `n5-3` — higher-order automorphisms exist, but the earlier two-variable general-swap screen did not find a transposition.
- `neos-911970` — same reason.

All tests start from the HiGHS 1.15.1 presolved residual.

## Candidate generation

Group variables by an intentionally coarse one-hop signature:

- objective coefficient;
- lower/upper bounds;
- integrality type;
- multiset of incident tuples `(coefficient, row lower, row upper)`.

Sort candidate pairs lexicographically by variable name. Test at most 40 pairs per instance. Skip pairs already certified by the exact formulation-swap test when classifying **semantic-only** results.

## Exact semantic test

The residual is converted to exact rational linear arithmetic by serializing every binary64 coefficient/bound with 17 significant digits and parsing that decimal as a rational number.

For a candidate transposition `S=(x y)`:

1. require identical objective coefficient, bounds, and integrality;
2. construct the full continuous relaxation `P` in Z3 rational arithmetic;
3. only rows whose coefficient vector changes under `S` need checking;
4. for every finite lower/upper side of every affected row, ask whether `P` admits a point violating the swapped row side;
5. the pair passes only if every such query is UNSAT.

Because `S` is an involution, `P => S(P)` implies `P = S(P)`. Equal objective coefficients make the transposition objective-preserving. The proof is stronger than required for the MIP because it holds over the continuous relaxation.

Any solver UNKNOWN/time-out is inconclusive, never a certificate.

## Scope

“Exact” here is exact relative to the **decimal-rationalized exported residual representation**. This is a prototype research certificate, not Core-0.21 qualification or a claim about unrounded source-domain coefficients.

## Outcome

- `EXACT_SEMANTIC_ONLY_SWAP` — semantic transposition proven and no exact row-multiset formulation swap exists.
- `FORMULATION_SWAP_ONLY_OR_ALSO` — semantic proof succeeds but it is already a formulation symmetry.
- `NO_SEMANTIC_SWAP_FOUND` — no tested pair proves.
- `INCONCLUSIVE` — query budget/timeouts prevent a disposition.

The `glass4` positive control must be recovered for the harness to pass.
