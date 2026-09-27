# HJP depth-3 naturalization holdout — source registry 0.1

**Status:** frozen boundary control for the P-vs-NP IsoGraph campaign; no authority effect

## Primary lower-bound source

Johan Håstad, Stasys Jukna, Pavel Pudlák,

**Top-Down Lower Bounds for Depth-Three Circuits**

Computational Complexity 5(2):99–112, 1995.  
DOI: `10.1007/BF01268140`.

An author-hosted PDF was inspected for the source proof architecture.

## Primary holdout/barrier source

Bruno Loff, Suhail Sherif, Navid Talebanfard, Francesca Ugazio,

**The Switching Lemma shows what the Switching Lemma cannot prove: an unconditional natural-proofs barrier**

arXiv:2606.12631, June 2026.

Relevant locations:

- Section 3.2.1 — k-limit/top-down proofs and the unresolved naturalization;
- Appendix B — properties used in Håstad–Jukna–Pudlák lower bounds and their natural variants.

## Frozen HJP target

HJP Section 4 defines a function with `n = 2*s*m` variables:

```text
S_(s,m)(x,y)
    =
OR over i=1..s
    AND over j=1..m
        (NOT x_(i,j) OR NOT y_(i,j)).
```

For `s = m ≈ sqrt(n/2)`, the source proves:

- the function has a linear-size Sigma-3 representation;
- every Pi-3 circuit computing it has size `2^(Omega(sqrt(n)))`;
- the displayed constant in Theorem 4.2 is approximately `0.453` in the exponent.

The 2026 paper describes the dual/compositional form as:

```text
AND_sqrt(n) o OR_sqrt(n) o AND_2
```

and highlights the resulting Sigma-3 versus Pi-3 separation.

## Frozen proof skeleton

HJP Section 4 uses:

1. a paired-variable restriction;
2. circuit simplification: large negative bottom fan-in gates are killed;
3. target preservation: the same restriction converts the target to a block OR-of-ANDs of literals;
4. Lemma 4.1: if that block function is computed by a Pi-3 circuit with bounded negative bottom fan-in, then its size obeys a combinatorial lower bound;
5. the k-limit/limit argument, via the earlier combinatorial lemma, closes the contradiction.

The restriction may be chosen probabilistically or derandomized by conditional expectation.

## 2026 naturalization status

The 2026 paper states that it could not yet naturalize the `2^(Omega(sqrt(n)))` lower bound for this target and leaves finding an AC0-natural lower bound of the same asymptotic strength as an open problem.

This means:

```text
AC0-natural proof known absent: NO
AC0-natural proof currently known: NO, per pinned 2026 source
non-naturalizability theorem: NO
status: QU / open
```

Failure to find a naturalization is not evidence that no naturalization exists.

## Neighboring positive control

The same 2026 source gives a natural high-sensitivity/k-limit property that yields slightly weaker depth-3 lower bounds for Majority and PARITY.

That neighboring result is a positive naturalization control, not a substitute for the holdout target.

## Campaign purpose

Use the holdout to identify **where the source proof becomes target-specific in a way that the known natural variant does not preserve**.

Do not use it as evidence for:

- an escape from the AC0-natural barrier;
- an unrestricted circuit lower bound;
- P != NP.
