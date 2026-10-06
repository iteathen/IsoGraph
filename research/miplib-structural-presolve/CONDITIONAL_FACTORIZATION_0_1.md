# MIPLIB conditional-factorization screen 0.1

**Date:** 2026-10-06  
**Status:** frozen before results.

## Sample

Use the same 24 post-HiGHS residual models as the dominance/factorization screen.

## Exact structural target

Construct the row-variable incidence graph of each presolved residual.

Find **binary variable articulation points**. A binary variable `x` qualifies when deleting its incidence-graph node disconnects the graph into at least two nonempty row/variable regions.

Then:

[
OPT(P)=min{OPT(Pmid x=0),,OPT(Pmid x=1)}
]

for minimization (max for maximization), and after either value is fixed, the resulting disconnected regions are conditionally independent except for the now-fixed contribution of `x`.

This is an exact two-case decomposition. It is not itself a claim that using the decomposition is faster than branch-and-bound.

## Ranking

For every binary articulation variable, record:

- number of resulting components;
- size of largest component;
- size of second-largest component;
- fraction of the non-articulation graph outside the largest component.

Rank candidates by the amount of structure separated from the largest component. Do not benchmark until after this screen is frozen and run.

A null result means only that single-variable articulation is absent; it does not exclude two-variable or larger separators.
