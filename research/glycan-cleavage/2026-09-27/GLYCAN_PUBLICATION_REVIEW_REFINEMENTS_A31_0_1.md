# Glycan publication-review refinements A31 — singleton threshold specialization, Higman finiteness, and length-9 bug prediction 0.1

**Status:** exact refinement layer after second external mathematical review  
**Project-local date:** 2026-09-27 (America/Los_Angeles)  
**Repository commit date:** may appear as 2026-09-28 UTC  
**Prior exact implicit range:** G-IA001..G-IA459  
**Applies after:** `GLYCAN_PUBLICATION_REVIEW_REFINEMENTS_A30_0_1.md`

This layer sharpens three statements in publication revision 0.2 without changing the frozen computational evidence.

---

## G-IA460 — general threshold failure sets use path coverage

Let `U_L` be the complete set of run-compressed treatment words of exactly length `L` over the effective treatment alphabet.

For any active maximal non-target path `P`, including set-valued susceptibility, define:

```text
D^cov_L(P)
=
{ w in U_L |
  w does not cover P }
```

where path coverage is the resistant-chain definition of G-IA449.

Using:

- the exact-length padding lemma G-IA455; and
- maximal-path sufficiency G-IA450;

we obtain:

```text
OPT > L
IFF
union over maximal non-target paths P
of D^cov_L(P)
=
U_L.
```

Thus the threshold-universe cover criterion itself is not restricted to singleton susceptibility when the failure sets are defined by exact path coverage.

---

## G-IA461 — ordinary subsequence failure sets are the singleton specialization

Assume singleton susceptibility.

Read each maximal non-target path leaf-first and run-compress consecutive equal treatment labels to obtain:

```text
COMP(P).
```

The corrected singleton path theorem gives:

```text
w covers P
IFF
COMP(P) is a subsequence of w.
```

Therefore:

```text
D^cov_L(P)
=
{
  w in U_L |
  COMP(P) is not a subsequence of w
}.
```

The publication shorthand:

```text
D_L(P)
=
{w in U_L | P not<=subseq w}
```

is valid only when `P` denotes the singleton run-compressed word `COMP(P)`.

Experiments 040–047 use this singleton specialization.

---

## G-IA462 — Higman finiteness of the dominance-aware minimal boundary

The effective treatment alphabet is finite and quasi-ordered by effective susceptibility dominance.

By Higman's lemma, finite words over a finite quasi-ordered alphabet are well-quasi-ordered by generalized subsequence embedding.

The project relation:

```text
<=Msub
```

is exactly that generalized subsequence embedding on the effective treatment alphabet.

Therefore the quotient order by mutual `<=Msub` equivalence is a well-quasi-order.

The solving language is upward closed in this order.

Its minimal quotient elements form an antichain.

A well-quasi-order contains no infinite antichain.

Therefore:

```text
the set of minimal solving equivalence classes
is finite.
```

This supplies the explicit finiteness proof underlying the finite exact dominance-pattern representation.

External theorem:

Graham Higman, "Ordering by Divisibility in Abstract Algebras", *Proceedings of the London Mathematical Society* s3-2(1):326–336, 1952, DOI 10.1112/plms/s3-2.1.326.

---

## G-IA463 — all run-compressed ternary length-9 words occur as defective Experiment-047 prefixes

Experiment 047 intended to enumerate every run-compressed ternary path of length 10.

The defective kernel omitted `p_9` and consumed only the prefix:

```text
p_0,...,p_8.
```

Every run-compressed ternary word `v` of length 9 has at least one, in fact two, symbols different from its final symbol.

Appending either such symbol produces a run-compressed ternary word of length 10 with prefix `v`.

Therefore the set of prefixes actually tested by the defective kernel is exactly:

```text
the complete run-compressed ternary
length-9 path universe.
```

Duplicate prefixes do not change the common-supersequence constraint.

---

## G-IA464 — the defective length-9 universe has exact universal-word minimum 19

Experiment 046 constructed a threshold-critical singleton family of length-9 ternary paths at threshold:

```text
L = 18.
```

Its cover certificate proves that this selected subset has no common run-compressed treatment word of length 18.

Therefore the complete length-9 path universe also has no universal word of length 18.

G-IA456 gives a universal cyclic word of length:

```text
2*9+1 = 19
```

for every run-compressed ternary length-9 path.

Hence the complete run-compressed ternary length-9 universe has exact shortest universal-word length:

```text
19.
```

By G-IA463, this is exactly the path universe accidentally tested by the defective Experiment-047 kernel.

Therefore the defect predicts:

```text
universal word at length 19: YES
universal word at length 20: YES
```

for the defective kernel.

This strengthens the causal diagnosis of the omitted-`p_9` error.

---

## Research conjecture — not an admitted exact assertion

For ternary run-compressed paths of fixed length `ell`, define:

```text
W_max(ell)
=
maximum size of an inclusion-minimal
failure cover at the maximal
nontrivial threshold L=2*ell.
```

The verified finite sequence includes:

```text
ell:       5    6    7    8    9    10
width:    24   35   54   75  113   173
universe: 48   96  192  384  768  1536
fraction: .50 .365 .281 .195 .147 .113
```

The absolute width grows across these tested values while the fraction of the path universe decreases.

No growth law follows from these six points.

A clean open conjecture suggested by the maximal-threshold framing is:

```text
W_max(ell) is unbounded as ell -> infinity.
```

This remains a conjecture only.

---

## Targeted subword-order dimension literature note

A targeted search checked representative classical/foundational sources on:

- finite word posets under subsequence order;
- classical/generalized subword order;
- Möbius/topological structure;
- logical theories of subword order.

Examples checked include:

- Péter L. Erdős, Péter Sziklai, David C. Torney, "A Finite Word Poset", *Electronic Journal of Combinatorics* 8(2), R8, DOI 10.37236/1607;
- Peter R. W. McNamara and Bruce E. Sagan, "The Möbius function of generalized subword order", *Advances in Mathematics* 229(5):2741–2766, DOI 10.1016/j.aim.2012.01.019.

This targeted search did not locate a direct published Dushnik–Miller dimension bound for the classical fixed-alphabet subsequence poset.

This is not a proof that no such result exists.

Accordingly the publication continues to treat the induced `S_173` / dimension-`>=173` observation only as a structural by-product and makes no novelty claim for it.

---

## Disposition

New exact implicit assertions:

```text
G-IA460..G-IA464
```

New non-authoritative research item:

```text
W_max(ell) unbounded conjecture
```

Publication revision consequences:

- use `D^cov_L(P)` for general set-valued path failure;
- reserve subsequence-form `D_L(P)` for singleton `COMP(P)`;
- cite Higman as the finiteness theorem, not merely context;
- use "maximal non-target path" consistently;
- strengthen the Experiment-047 defect prediction to exact length-9 universal minimum 19;
- keep the poset-dimension observation explicitly non-novel/by-product scoped.
