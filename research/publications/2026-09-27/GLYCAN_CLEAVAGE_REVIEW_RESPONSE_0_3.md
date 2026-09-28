# Response to second mathematical review — glycan cleavage paper revision 0.3

**Paper:** `GLYCAN_CLEAVAGE_PHASE_ALGEBRA_AND_SYNCHRONIZATION_0_3.md`  
**Author:** Joshua Oshiro  
**Project-local date:** 2026-09-27 (America/Los_Angeles)  
**Repository timestamp convention:** commits after 17:00 PDT appear as 2026-09-28 UTC

The second review was accepted. Publication 0.2 remains immutable; revision 0.3 incorporates the remaining mathematical and editorial corrections.

## Remaining issues from review

### 1. Garbled §7 sentence

**Fixed.**

The duplicated phrase:

```text
Reading labels leaf-first along the path, Along a path, ...
```

was replaced by one grammatical sentence.

### 2. Singleton restriction on subsequence-form D_L

**Accepted and strengthened.**

Revision 0.3 defines the general set-valued path failure set:

```text
D^cov_L(P)
=
{ w in U_L | w does not cover P }.
```

By exact-length padding and maximal-path sufficiency:

```text
OPT > L
IFF
union_P D^cov_L(P) = U_L.
```

Only in the singleton subclass is this rewritten as:

```text
D_L(P)
=
{ w in U_L |
  COMP(P) is not a subsequence of w }.
```

Experiments 040–047 use that singleton specialization.

Project support: G-IA460–G-IA461 in A31.

### 3. Finiteness of the minimal boundary

**Accepted.**

Higman's lemma is now used as a proof step rather than contextual analogy.

Because the effective treatment alphabet is finite and quasi-ordered, generalized subsequence embedding is a well-quasi-order. The solving language is upward closed; its minimal quotient elements form an antichain; therefore the minimal quotient boundary is finite.

Project support: G-IA462.

Primary reference rechecked:

Graham Higman, "Ordering by Divisibility in Abstract Algebras", *Proceedings of the London Mathematical Society* s3-2(1):326–336, 1952, DOI 10.1112/plms/s3-2.1.326.

### 4. Path terminology

**Fixed.**

Revision 0.3 uses "maximal non-target path" consistently. "Active" remains a state concept rather than part of the path-name terminology.

### 5. Poset-dimension literature check

**Performed, with limited negative result.**

A targeted search checked representative sources on:

- finite word posets ordered by subsequence;
- classical/generalized subword order;
- Möbius/topological structure;
- logic of subword order.

Representative sources checked include:

- Péter L. Erdős, Péter Sziklai, David C. Torney, "A Finite Word Poset", *Electronic Journal of Combinatorics* 8(2), R8, DOI 10.37236/1607;
- Peter R. W. McNamara and Bruce E. Sagan, "The Möbius function of generalized subword order", *Advances in Mathematics* 229(5):2741–2766, DOI 10.1016/j.aim.2012.01.019.

The targeted search did not locate a direct published Dushnik–Miller dimension bound for the classical fixed-alphabet subsequence poset.

This is **not** evidence that no stronger result exists.

Revision 0.3 therefore retains the `S_173` / dimension-`>=173` statement only as a structural by-product and makes no novelty claim for it.

### 6. Date convention

**Clarified.**

The user's project-local date for this revision is:

```text
2026-09-27
America/Los_Angeles
```

GitHub commits made after 17:00 PDT are timestamped:

```text
2026-09-28 UTC.
```

Revision 0.3 states both dates explicitly.

The citation uses the project-local revision date while documenting the UTC repository timestamp convention.

### 7. Bundled bibliography entries

**Split.**

The prior bundled entries are now separate references for:

- Qualified Module Authority Manifest;
- Current Integrated Semantic Stack;
- A28 width-173 derivation;
- Experiment 047 final review.

References are mechanically numbered by true first appearance.

### 8. PCCSP and CALCO metadata

**Rechecked.**

PCCSP:

- Reinhard Bürgy, Alain Hertz, Pierre Baptiste;
- *Computers & Operations Research* 124 (2020);
- article 105063;
- DOI 10.1016/j.cor.2020.105063.

CALCO 2025:

- Quentin Aristote;
- LIPIcs volume 342;
- pages 16:1–16:12;
- DOI 10.4230/LIPIcs.CALCO.2025.16.

## Additional bug-story sharpening

The review's prediction was accepted and proved.

The defective Experiment 047 kernel consumed all length-9 prefixes of the intended complete length-10 candidate universe.

Every run-compressed ternary length-9 word occurs as such a prefix.

Experiment 046 proves no universal word of length 18 for a subset of those paths, while the cyclic ternary ceiling supplies a universal word of length 19 for all length-9 paths.

Therefore the defective kernel's accidental path universe has exact universal-word minimum:

```text
19.
```

It should admit universal words at both thresholds 19 and 20.

Project support: G-IA463–G-IA464.

## Open-question framing

The review's suggested formulation is adopted as a conjecture, not as an exact claim.

Let:

```text
W_max(ell)
=
maximum cardinality of an inclusion-minimal
failure cover for run-compressed ternary
paths of length ell at L=2*ell.
```

Open conjecture:

```text
W_max(ell) is unbounded as ell -> infinity.
```

Observed widths for ell=5..10 increase while their fraction of the full path universe decreases. No growth law is inferred.

## Immutable history

Publication revisions 0.1 and 0.2 remain unchanged.

Second-round exact refinements are versioned as:

- `GLYCAN_PUBLICATION_REVIEW_REFINEMENTS_A31_0_1.md`;
- G-IA460 through G-IA464.

Revision 0.3 is the current second-round reviewed publication candidate.
