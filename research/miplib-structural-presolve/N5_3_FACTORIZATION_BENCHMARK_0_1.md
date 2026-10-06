# n5-3 exact factorization benchmark 0.1

**Date:** 2026-10-06

The dominance/factorization screen found that the HiGHS-presolved `n5-3` residual separates into six disconnected row-variable incidence components:

- one large component: 2,128 columns, 831 rows, 8,316 nonzeros;
- five small components totaling 11 columns, 5 rows, 11 nonzeros.

## Exact law

For a linear objective over a feasible set whose row-variable incidence graph has disconnected components,

[
P = P_1 \times \cdots \times P_k,
qquad
f(x)=f_1(x_1)+\cdots+f_k(x_k)+c,
]

the global optimum is the sum of the independent component optima plus the one global objective offset.

This is an exact decomposition, not a heuristic.

## Controlled benchmark

Starting from the same HiGHS 1.15.1 presolved residual:

1. solve the full residual for 15 seconds with presolve disabled;
2. solve each of the five small components to optimality with objective offset zero;
3. solve only the large component for 15 seconds with presolve disabled while retaining the original objective offset;
4. combine the large-component incumbent/bound with the exact small-component optima;
5. compare status, gap, nodes, and LP iterations.

The benchmark measures whether explicitly realizing the exact factorization helps. It does not claim that disconnected-component detection is novel.
