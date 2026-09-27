# P vs NP IsoGraph campaign — source registry 0.1

**Status:** research source freeze; no semantic authority effect  
**Campaign branch:** `research/p-vs-np-isograph-20260926`  
**Campaign date:** 2026-09-26  
**Purpose:** freeze the source envelope before rendering or discovery.

## Governing IsoGraph discipline

This campaign follows the current qualified Core 0.17/0.18/0.19 + QU 0.1 + NEI 0.4 + DP 0.1-0.7 + DTS 0.1 stack.

For rendering discipline it follows the modernization profile at blob:

`8adf65452780484499a82d4c9977b23aff15e22e`

For experimental discovery only, it may pin DP 0.8 candidate blob:

`46b94fe4cbd407d6d690980604fe5eb854220f67`

DP 0.8 is unqualified and gains no authority from this campaign.

## S0 — official problem statement

Primary public authority:

- Clay Mathematics Institute, **P vs NP**, status: unsolved.
- Official problem description by Stephen Cook, *The P versus NP Problem*.

Frozen semantic target used here:

```text
Determine whether every language accepted by some nondeterministic
polynomial-time algorithm is also accepted by some deterministic
polynomial-time algorithm.
```

Equivalent class-level target:

```text
P = NP ?
```

The campaign must permit either resolution. It must not encode `P != NP` as an assumption.

Public references:
- https://www.claymath.org/millennium/p-vs-np/
- https://www.claymath.org/wp-content/uploads/2022/02/MPPc.pdf

## S1 — machine-checked complexity foundation

Repository:

`uds-psl/coq-library-complexity@14b5f413d2fb7adecde79c5451b483f9a1af59a8`

The repository describes itself as a Coq library of complexity theory and contains a mechanized Cook-Levin theorem.

Pinned files:

### P / NP / polynomial reductions

`theories/Complexity/NP.v`

Blob:

`f92971a055eb87131449e6eceebd005a6776833c`

Load-bearing source facts used by the foundation rendering:

- `inTimePoly P`: existence of a decision-time bound that is polynomial and monotone;
- `inNP P`: a polynomial-time certificate relation with polynomially bounded witnesses;
- `inP P := inTimePoly P`;
- `P_NP_incl`: every represented P predicate is in NP;
- polynomial many-one reduction `P ⪯p Q`: a polynomial-time function preserving truth iff;
- reduction transitivity;
- NP membership pulls backward through polynomial reductions;
- `NPhard P`: every NP predicate polynomially reduces to P.

### Cook-Levin

`theories/NP/SAT/CookLevin.v`

Blob:

`d88fa3025d3a7716a9ab4366aab421af67204262`

Pinned exact conclusion:

```text
CookLevin : NPcomplete SAT
```

The formal reduction chain exposed by the file includes:

```text
GenNP
 -> LMGenNP
 -> fixed multi-tape TM generic NP
 -> fixed single-tape TM generic NP
 -> FlatSingleTMGenNP
 -> FlatTCC
 -> FlatCC
 -> BinaryCC
 -> FSAT
 -> SAT
```

and separately reaches 3-SAT.

### SAT verifier / NP containment

`theories/NP/SAT/SAT_inNP.v`

Blob:

`bff210b358cf23c9c4d6b018a698520b5b722433`

The file constructs a polynomially bounded satisfying-assignment verifier and is consumed by `CookLevin` for SAT-in-NP.

Companion publication/formalization repository:

`uds-psl/cook-levin@e24a92af25746f6758a09ea1dc51e57491508e60`

This is corroborating provenance, not an additional semantic premise.

## S2 — relativization barrier

Theodore Baker, John Gill, Robert Solovay, **Relativizations of the P =? NP Question**, SIAM Journal on Computing 4(4), 1975, 431-442.

DOI:

`10.1137/0204037`

Pinned barrier fact:

```text
there exists a recursive oracle A with P^A = NP^A
and
there exists a recursive oracle B with P^B != NP^B
```

Campaign interpretation:

A proof method whose reasoning relativizes uniformly cannot by itself settle the unrelativized P-vs-NP question in either direction.

This is a method barrier, not evidence for either truth value of P = NP.

## S3 — Natural Proofs barrier

Alexander A. Razborov, Steven Rudich, **Natural Proofs**, Journal of Computer and System Sciences 55(1), 1997, 24-35.

DOI:

`10.1006/jcss.1997.1494`

Pinned barrier scope:

- the paper defines constructivity, largeness, and usefulness conditions for natural properties;
- under its hardness/pseudorandomness assumption, natural-proof techniques of the relevant strength cannot establish the desired superpolynomial lower bounds for general circuits.

Campaign interpretation:

This barrier is conditional and circuit-lower-bound scoped. It must not be rewritten as an unconditional theorem that every possible P-vs-NP proof must be "unnatural".

## S4 — algebrization barrier

Scott Aaronson, Avi Wigderson, **Algebrization: A New Barrier in Complexity Theory**, ACM Transactions on Computation Theory 1(1), 2009.

DOI:

`10.1145/1490270.1490272`

The paper explicitly classifies P versus NP among the major questions requiring non-algebrizing techniques under its framework.

Campaign interpretation:

Algebrization is a barrier on a broad proof-technique family. It is not a semantic premise about whether P equals NP.

## Source hierarchy

For this campaign:

1. the Clay/Cook statement owns the top-level problem target;
2. the pinned Coq source owns the machine-checked P/NP/reduction/Cook-Levin foundation used in the exact foundation rendering;
3. the original barrier papers own their respective barrier claims and scopes;
4. IsoGraph discovery artifacts may expose consequences but may not silently strengthen any source;
5. unresolved scope, assumptions, or cross-barrier composition remains QU.

## Immediate exclusions

Do not import as assumptions:

- `P != NP`;
- `P = NP`;
- existence of one-way functions;
- existence of strong pseudorandom generators;
- a universal circuit-lower-bound formulation equivalent to P vs NP unless separately pinned;
- the proposition that one technique crossing one barrier crosses the others;
- a claim that Cook-Levin itself supplies a lower bound;
- a claim that SAT's observed practical hardness implies SAT not in P.

These are discovery or open questions, not source facts.
