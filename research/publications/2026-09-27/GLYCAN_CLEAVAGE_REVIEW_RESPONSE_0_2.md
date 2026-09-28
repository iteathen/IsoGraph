# Response to mathematical review — glycan cleavage paper revision 0.2

**Paper:** `GLYCAN_CLEAVAGE_PHASE_ALGEBRA_AND_SYNCHRONIZATION_0_2.md`  
**Author:** Joshua Oshiro  
**Date:** 2026-09-28

The review was accepted as substantive and technically useful. The original publication 0.1 remains immutable; revision 0.2 incorporates the corrections below.

## Substantive issues

### 1. Threshold-universe equivalence

**Accepted.**

Added Lemma 5, the exact-length padding lemma.

For an effective alphabet with at least two classes:

```text
solution of length <= L
IFF
run-compressed solution of length exactly L.
```

The proof removes adjacent equivalent treatments, then pads by appending a class different from the current final class. Treatment insertion cannot recreate removed nodes.

The critical-cover equivalence is now explicitly justified:

```text
OPT(F) > L
IFF
union_P D_L(P) = U_L.
```

Project support: G-IA455 in A30.

### 2. Effective treatment classes / preorder uniqueness

**Accepted.**

Added a formal definition:

```text
e ~ f
IFF
S*_e = S*_f
IFF
phase_e = phase_f on every valid state.
```

An effective treatment class is one class in `E / ~`.

Also corrected two overstatements:

- the dominance-aware minimal boundary is unique in the quotient by mutual `<=Msub` equivalence, not necessarily as one raw representative set;
- the binary theorem yields at most two optimum **effective-class words**; the raw optimum family may be larger because equivalent raw enzymes may substitute.

Project support: G-IA452–G-IA454 in A30.

### 3. General path coverage and maximal-path sufficiency

**Accepted.**

Added:

- leaf-first path orientation;
- set-valued coverage definition using absence of a treatment-spanning resistant chain inside the path;
- infeasible-instance convention `OPT=+infinity`;
- short proof of maximal-path sufficiency directly from the resistant-chain dual.

The historical A8 proof/correction remains preserved because it predates A13 and was valid after its local proof repair.

Project support: G-IA449–G-IA451.

### 4. Width-173 sharpening

**Accepted.**

Added the ternary cyclic universal-supersequence lemma:

```text
every run-compressed ternary word
of length ell
embeds in a cyclic word
of length 2*ell+1.
```

Therefore every such path family has:

```text
OPT <= 2*ell+1.
```

Consequences added to the paper:

- threshold `L=2*ell` is the maximal possible failure threshold for fixed path length ell;
- Experiment 047's width-173 family has exact `OPT=21`, not merely `OPT>20`;
- the omitted-`p9` defect is structurally explained: it reduced the test to length-9 paths, for which a length-19 cyclic universal word exists.

Project support: G-IA456–G-IA459.

## Overstatement corrections

### Internal reconstruction wording

Changed "independently reconstructed" to explicit **internal project cold reconstruction** wording.

The paper now also notes that Core 0.20 and DP 0.8 were qualified after Experiment 032; that later qualification does not make Experiment 032 external validation.

### Section 9 title

Changed:

```text
Three Enzymes: Pairwise Reasoning Fails
```

to:

```text
Three Enzymes: Even Three-Path Reasoning Can Fail
```

because the exhibited result is `J3 < OPT`.

### Poset-dimension corollary

The `S_173`/dimension statement remains because the proof is correct, but it is now explicitly described as an order-theoretic **by-product**, not a novelty claim about dimension theory for subword orders.

## Editorial corrections

- Experiment 043 path-length cell now reads only `6`; the refined-search note is moved to prose below the table.
- References are renumbered in strict first-appearance order.
- Repository-relative `../../` links are replaced by absolute GitHub permalinks pinned to exact commits.
- PCCSP metadata confirmed as *Computers & Operations Research* 124 (2020), article 105063; it has an article number rather than a conventional page range.
- CALCO 2025 metadata confirmed as LIPIcs 342, pages 16:1–16:12.
- DOI metadata rechecked for Higman, Maier, Finkel–Schnoebelen, Dushnik–Miller, PCCSP, and CALCO references.

## Immutable history

Publication 0.1 is not rewritten.

The mathematical corrections/refinements are versioned separately as:

- `research/glycan-cleavage/2026-09-27/GLYCAN_PUBLICATION_REVIEW_REFINEMENTS_A30_0_1.md`;
- G-IA449 through G-IA459.

Revision 0.2 is the current reviewed publication candidate.
