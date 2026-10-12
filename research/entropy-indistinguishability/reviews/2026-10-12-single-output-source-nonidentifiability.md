# Single-output source non-identifiability — short versus long entropy seeds

**Date:** 2026-10-12  
**Status:** clarification of the original user-originated research question; elementary conditional non-identifiability proof with explicit boundaries. Not a novel cryptographic hardness theorem, a physical entropy increase, or a proof of global natural identity.  
**Historical inputs:** [Original working note](../evidence/source/entropy-indistinguishability-working-note.md), [original literature map](../evidence/source/adjacent-research-map.md), [verbatim research discussion](../DISCUSSION_LOG.md).  
**Attribution:** Joshua Oshiro supplied the example and central claim: two unequal physical entropy inputs processed by an unknown mapping produce an **exactly equal output**, leaving an external observer unable to recover source size from that observed value alone. The conditional formalization, distinctions and sources here are AI-assisted.

## The user's actual comparison

The thought experiment assumes a physical source of entropy (suggested example: digital records of random hardware errors, hypothetically sampled *before correction*), two differently sized random seeds, and some transformation that applies each seed to produce an output.

~~~text
1-bit seed S_1  --- unknown transformation G_1 ---> output y
longer seed S_m --- unknown transformation G_m ---> output y
~~~

The outputs are **exactly the same finite bit string**, not statistically similar, nor merely indistinguishable under a currently available instrument. The outside analyst is given only **one instance y**, without the seeds, transformations, hardware trace, or provenance metadata.

The claim **is not** that a 1-bit seed creates m bits of Shannon entropy through a known deterministic map. The claim is that **the completed output does not uniquely reveal the seed entropy or generating history** when the relevant generating map is unknown and no additional evidence is supplied.

This is a question about **inverse reconstruction**, source identification, conditional uncertainty, and how hidden process knowledge changes what may be inferred. It is not primarily about proving that two numerically separate physical objects are the same. The latter natural-identity conjecture was a later extrapolation and should not eclipse the original entropy/seed question.

## The exact limited result that follows

Let Y be finite output data and consider a class C of candidate generative pairs (G,s) with seed lengths of various sizes. Define the observation map

~~~text
π : C → {0,1}^n
π(G,s) = G(s).
~~~

**Conditional non-identifiability proposition:** If C contains two admissible pairs (G_1,s_1) and (G_m,s_m) whose seeds have *different lengths* but

~~~text
G_1(s_1) = G_m(s_m) = y,
~~~

then **no rule depending only on the output y can always recover the true seed length for every admissible pair in C**.

**Proof:** Such a proposed rule h must return the same h(y) on both identical observations; if the actual seed length differs, h(y) is wrong in at least one admissible case. QED.

The same argument applies to unique identification of the exact generating pair. **The result is conditional on both candidates being admitted and all side information being the same**; it is not a theorem that an outsider has zero statistical distinguishing advantage across *full distributions* of observations.

If the observer's entire input and any randomization resources are identical across the two cases, any specified algorithm has the same distribution of outputs on that input. This statement is elementary **input indistinguishability**. It is stronger than simply saying the analyst has limited practical computing power, but it is **narrower** than proving that recovering a seed or breaking a secret algorithm has the same computational complexity across systems.

## Why the meaning of "just as hard" matters

Distinguish possible outsider tasks:

1. **Identify which source history actually produced this isolated y.** If both histories are admissible and nothing distinguishes them in the available input, no output-only algorithm can be *guaranteed* correct in both. This is the proven claim above.
2. **Assign probabilities to source histories.** This still can be possible with stated prior probabilities and output-likelihood models; identical observations do not require equal posterior plausibility. Without priors or knowledge about candidate process families, this posterior is not determined.
3. **Find a seed for a given, known generator.** Recoverability and search costs can differ greatly with seed length, structure and public algorithm. For a deterministic public generator with exactly one uniformly random seed bit, at most two outputs need be checked; unknown code is doing important informational work.
4. **Predict future output from the same generator.** One observed y may be insufficient, but a subsequent stream or additional samples can reveal restrictions. With a 1-bit seed and a fixed deterministic generator there are at most two possible outputs, and repetitions or released implementation details can distinguish it from larger-source randomness.
5. **Establish the physical identity of the two histories.** Equal final y proves only equality of those output records; a full physical history could differ in devices, dissipated heat, correlations, discarded bits, or source entropy distribution. That separate global-identity claim requires the much stronger exhaustive premise recorded in the previous natural-identity note.

The user's "equally hard for an outsider" is most robust for (1) when the outsider sees only one y and does not know the method. It **does not entail** equal cryptographic security for all possible attacks or auxiliary information.

## Shannon entropy — known map versus unknown map

For a fixed known deterministic map G and a random seed S,

~~~text
H(G(S)) ≤ H(S).
~~~

If G is unknown to the observer, G itself is an uncertain parameter (perhaps represented by a random variable Θ under the observer's hypotheses). Then

~~~text
H(Y | G) ≤ H(S | G)       [when Y=G(S)]
H(Y) ≤ H(S,G).
~~~

Conditioning and averaging over unknown G can make the observer's uncertainty about Y much larger than the *seed-only* entropy. That additional uncertainty arises because the generating map is not known; it is not physically created Shannon entropy by a one-bit deterministic seed.

A fixed but unknown generator does not automatically contribute fresh **physical random entropy**. Treating G as random is an epistemic probability model over possible generators; whether G contains a genuine secret random key or other independently sampled randomness is a separate factual question. To measure the full security or information budget, **count every relevant hidden parameter**, not only the explicitly identified seed.

This is consistent with the original note's refusal to claim deterministic entropy creation and directly connects to the user's older complete-comparison concern without importing an alleged universal minimality theorem.

## About the quantum tunneling error-cache example

The putative "2 nm processor storing all pre-correction quantum-tunneling errors" is treated here as a **hypothetical random-bit collection apparatus**, not an established feature of ordinary commercial microprocessors. Error-correcting memory circuits can calculate error syndromes and correct corrupted bits, but they do not generally expose a record of individual "quantum tunneling particles" or guarantee independent, unbiased random bits. The 2 nm process size alone does not establish such a mechanism.

For the mathematical argument, substitute any validated physical entropy source with known characteristics; the source's physical implementation is not needed to demonstrate single-output non-identifiability. When designing a real source, health testing, min-entropy estimation, conditioning and correlations matter.

References: [Microchip SRAM ECC documentation](https://onlinedocs.microchip.com/oxy/GUID-7A87AF7C-8456-416F-A89B-41F172C54117-en-US-10/GUID-F41F013A-8C04-44AD-9382-C37BE0D54216.html), [NIST SP 800-90B](https://csrc.nist.gov/pubs/sp/800/90/b/final), [NIST randomness certification explanation](https://www.nist.gov/news-events/news/2018/04/nists-new-quantum-method-generates-really-random-numbers).

## Research disposition and connection to the original paper

The original question should lead the dossier: **identical observed values need not certify identical source-entropy budgets, and an unknown transformation cannot be uniquely recovered from its one output without extra constraints.** This is a precise, defensible instance of **observation-level provenance non-identifiability**.

The physically stronger "all possible interactions imply natural identity" conjecture is distinct, and the earlier neutrino discussion was a side application, not the central motivating example. No new global physical identity theorem is claimed or qualified here.

**Candidate concise statement:**

> If an outsider is given only a single output string that could have been produced by either a short-entropy seed or a longer-entropy seed through unknown admissible generating operations, the output alone cannot identify the true seed length or the generating operation. This observational non-identifiability does not imply equal source Shannon entropy, identical output distributions, or equal security against attacks involving additional knowledge.

## Attribution and authority

The original small-versus-large seed thought experiment and its intended outsider perspective were provided by Joshua Oshiro. The explicit observation-map proposition, proof, uncertainty relations, and objections were assembled by AI assistance on 2026-10-12. The original two research documents are preserved unmodified. This note is research only and creates no new IsoGraph semantic or physical identity authority.
