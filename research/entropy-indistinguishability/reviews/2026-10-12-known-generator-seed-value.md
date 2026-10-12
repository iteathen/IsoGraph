# Known generator: can a short physical seed match a longer seed?

**Research date:** 2026-10-12  
**Status:** conditional analytical result and researcher-originated open comparison question; not a novel security theorem or an experimental result.  
**Attribution:** Joshua Oshiro originated the revised comparison—**the outsider now knows the generating process**, and asks whether a short physical seed can be as *valuable* as a longer one. The formal restrictions, counterexamples, source comparisons, and scoped formulation below are AI-assisted analysis.  
**Research antecedent:** [Single-output source non-identifiability](2026-10-12-single-output-source-nonidentifiability.md), whose **unknown-generator** assumption is explicitly relaxed here. Original archival documents remain unchanged.

## New experiment: what knowledge changes

Previous case: outsider receives an output y but knows neither the seed nor the generating method. Multiple generative explanations remain compatible with exactly the same observation.

**New case:** outsider knows a deterministic generator G and its algorithm, but does not know the seed S. The public mechanism now allows the outsider to enumerate *all* candidate outputs for a small seed space. This can make the short-source and long-source distributions readily distinguishable, even if one realized output happens to be equal in both cases.

~~~text
G : {0,1}^k → {0,1}^n
Y = G(S), S uniform and secret
public: G, k, n
unknown: particular S
~~~

We must separate four meanings of "as valuable":

1. same **realized output value** (two histories can collide);
2. same **information-theoretic entropy or unpredictability against unlimited computation**;
3. same **practical computational security** for a specified bounded attack model and intended task;
4. same **source-provenance evidence** when one sees only one output, knows the generator family, and wishes to identify which process actually ran.

Equality in (1) does **not** imply equality in (2)–(4). But two generators with very different seed sizes can still both meet a particular adequacy threshold for (3).

## Exact mathematical restrictions

For deterministic known G and seed S:

~~~text
H(G(S)) ≤ H(S) ≤ k;
H_infinity(G(S)) ≤ H_infinity(S) ≤ k.
~~~

Here the min-entropy bound holds because the most likely seed maps to some output occurring with at least that seed's probability. No deterministic known map increases unconditional Shannon or min-entropy.

The output distribution has support of size at most 2^k. If U_n is a uniform n-bit string, then the total-variation distance obeys:

~~~text
TV(Law(G(S)), Law(U_n)) ≥ 1 - 2^(k-n),   n > k.
~~~

**Proof of bound:** Let A be the image of G. Under G(S), Pr[A] = 1; under U_n, Pr[A] = |A|/2^n ≤ 2^(k-n). Choosing A as a distinguishing event establishes the inequality.

When G is public and k is small, enumeration of all 2^k seeds is a valid distinguishing/reconstruction strategy for outputs exposed as such. If k=1, there are at most **two possible output strings**, regardless of how intricate G is. A three-million-operation evaluator per seed may be slow but does not create more possibilities; its computation time is not additional source entropy and does not generally yield comparable cryptographic robustness.

**Crucial single-output subtlety:** If one long-seed realization accidentally produces exactly the same y that the short generator could produce, both histories remain logically possible from y alone. However the **likelihoods** may differ dramatically when the public source models are known. In an illustrative injective 1-bit generator, a matching particular y has likelihood 1/2 under the short generator versus 2^-n under a uniform n-bit generator. With equal model priors the evidence overwhelmingly favors the short process; it never uniquely *proves* actual provenance.

## Where the short-seed proposal DOES work

For security limited to feasible adversaries, cryptographic **pseudorandom generators** deliberately stretch a sufficiently large *unpredictable seed* into many more output bits than it contains. The public algorithm can be known. Security means that a declared class of efficient distinguishers or predictors cannot distinguish the result from a true-random source except within a specified advantage.

Example research comparison:

~~~text
128 independently unpredictable physical seed bits
      + public, well-designed cryptographic DRBG
      → long output stream intended to provide up to 128-bit
        computational security in its intended model.
~~~

The same length stream drawn directly from a much larger physical random source might offer **no additional practical benefit** for a task whose adversary capability and design target are already met at 128-bit security. That gives a rigorous direction for an application-relative "equally valuable" claim. It does **not** make the two distributions information-theoretically identical, or provide 256-bit brute-force security from 128 independent seed bits.

By contrast, one or two genuinely random seed bits cannot yield robust security against an outsider who knows the algorithm and can enumerate the two or four candidates. A true random single bit **is** fully adequate if the only task is to make one unbiased binary choice; a longer random seed would not improve the result for that task.

If the generator intermittently incorporates new independent physical entropy, it may provide improved unpredictability, but it is no longer a pure deterministic function of only the original short seed. The fresh entropy must be included in the accounting.

## Sources, current framework and open distinction

- [NIST SP 800-90A Rev. 1](https://csrc.nist.gov/pubs/sp/800/90/a/r1/final): approved publicly specified deterministic random bit generator mechanisms; security strengths and entropy requirements.
- [NIST SP 800-90B](https://csrc.nist.gov/pubs/sp/800/90/b/final): validated physical entropy-source principles and min-entropy estimation.
- [NIST SP 800-90C, final Sept 25 2025](https://csrc.nist.gov/pubs/sp/800/90/c/final): combined random-bit-generator constructions using entropy sources and DRBGs.
- [NIST IR 8427](https://csrc.nist.gov/pubs/ir/8427/final): security strength and output unpredictability related to min-entropy.
- [Stanford CS255 cryptography lecture notes](https://crypto.stanford.edu/~dwu4/notes/CS255LectureNotes.pdf): formal computational indistinguishability of pseudorandom-generator output from uniform output, with defined efficient adversaries.

The important clarification is **not** that knowing the generator automatically invalidates the research. It splits the question:

> Can a smaller genuinely random seed, processed by a publicly known algorithm, supply **the same utility or computational security for a specified task and adversary model** as a larger physical entropy source?

**Yes in some task-relative and computationally bounded cases; no in general for equal information-theoretic randomness or greater-than-seed brute-force security.** This conclusion is standard cryptographic theory, not independently claimed as a new theorem.

The next question for the user's own research, if pursued, is whether there is a *finer notion of physical utility or indistinguishability* that yields an unexpected equivalence beyond existing pseudorandom-generator security definitions. That remains an **open-ended research hypothesis**, not a proof claim.

**Do not misattribute certainty:** the user's earlier equal-mean-brute-force statement was explicitly a **suspicion** in the *unknown-generator* setting. This turn asks a **new question** for a known generator; it does not assert that a one-bit public-seed system has high security.
