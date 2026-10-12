# One-bit entropy, adaptive Rule 110 evolution, and computational irreducibility

**Research date:** 2026-10-12  
**Status:** AI-assisted adversarial analysis of Joshua Oshiro's explicitly tentative hardness hypothesis. Not a new proof of one-wayness, a cryptosystem, a Rule 110 lower bound, a result of equal average brute-force cost, or a result that Shannon entropy is invalid.  
**Input:** user's 2026-10-12 substantive conversation following the single-bit adaptive-generator discussion. Original historical working notes unchanged.

## 1. Researcher's intended argument

The investigator proposes taking a **single physical random bit once**, making it affect a pseudorandom sampling position, and allowing the altered pseudorandom state to control later operations and a computationally universal rewrite process such as Rule 110 or a Ruliad-like multiway structure. Iterated operations can change later branch choices, graph rewrites and terminal outputs. The investigator suspects that such obfuscation can be made arbitrarily difficult to reverse, perhaps equaling the *absolute average attack effort* for a conventional encryption process using a larger secret seed.

The point of invoking Rule 110 is computational irreducibility, not a claim that Rule 110 itself is an encryption algorithm. The researcher is **asking** whether the backward problem admits a general shortcut and whether a proof of comparable brute-force cost is possible, not asserting it has been proved.

## 2. Three independent properties

1. **Input entropy**: with public and fixed other inputs Z and a sole fair physical bit B, H(B)=1; the output of a known deterministic F(Z,B) has conditional Shannon entropy at most one bit. The generator may nevertheless produce a huge and visually complicated output.
2. **Forward-evaluation work**: the cost T of evaluating F(Z,B) may be extremely large, even for zero-entropy inputs. Computational irreducibility is a proposed stronger property that certain specified outputs have no substantially faster general procedure than evolving their rules. This is independent of output-entropy quantity.
3. **Attack work / secrecy**: an attacker's cost to learn a message, distinguish outcomes, or recover a hidden input depends on what is public, what is hidden, which goal is pursued, and which shortcut algorithms can exist. Forward sequentiality alone is not a proof of inversion hardness or message confidentiality.

The researcher's hypothesis is strongest when phrased about (2) and (3), **not** about creation of new statistical entropy.

## 3. Two-trajectory bound, even with adaptive internal branching

Assume the entire deterministic program F, its parameters Z, and termination horizon are public and fixed. Only B∈{0,1} is unknown. The complete executions are then

~~~text
Trace0 = Execute(F, Z, B=0)
Trace1 = Execute(F, Z, B=1)
~~~

The number of internal branches and rewrites on each trace can be enormous, and their trajectories may differ sharply, but the *number of possible complete execution histories under the unknown input* is at most two.

**Upper-bound attack:** run the public program forward for both candidates and compare with the observed output, if the output comparison is well-defined. The total cost is no more than the sum of those two evaluations plus comparison. If each execution takes T, the algorithm costs O(2T), not an exponential search over internally **dependent** decisions.

This does **not** mean the whole attack is fast in absolute wall-clock terms. T could itself be astronomical or effectively sequential.

If instead other parameters, secret message M, machine state Z, or nondeterministic rule choices are unknown, then the number of candidate histories may be large. Those unknowns must be included and separately accounted for; they cannot be inferred to arise as independently secret information from B alone.

## 4. A crucial asymmetry: absolute delay versus security amplification

Imagine F takes about T ≈ 2^128 sequential operations to compute either of the two branches and no shortcut is known. An attacker might then expend absolute work comparable to brute-forcing a conventional 128-bit key in a fast cipher. That is compatible with the researcher's intuition about **absolute computational cost**.

However, when the legitimate party also has to execute F to obtain the output, its cost is around T, whereas an attacker trying both possibilities incurs at most about 2T. So the attacker-to-legitimate-party cost factor associated with the *one secret bit* is at most about two candidate executions. In a conventional well-designed key-based cryptosystem, the legitimate party performs one relatively cheap encryption/decryption while an exhaustive key search requires a large number of similarly cheap candidate operations. These are not equivalent protection profiles.

If an efficient trapdoor is given only to the authorized party, that changes the model and introduces another piece of privileged information; if an irreversible public computation serves as a time-lock puzzle, it intentionally charges substantial work and may not guarantee confidentiality or reusable secret-key strength. Reuse of the same two candidate states across many messages may permit precomputation.

For correctly decryptable public encryption with *only a one-bit key*, decrypting with both keys can give at most two plaintext candidates for each ciphertext. By Shannon's perfect-secrecy key-space lower bound, such a system cannot offer perfect secrecy over a large plaintext space; computational delay does not change that information-theoretic constraint.

## 5. What Rule 110 actually establishes

Matthew Cook proved Rule 110 is computationally universal under appropriately constructed initial configurations. This enables encoding of universal computations and thereby undecidable **unbounded-future** behavior questions across the relevant general class of inputs.

- It is **not** a theorem that *every finite* Rule 110 trajectory requires step-by-step evaluation.
- It is **not** a theorem that every output or initial-condition inverse problem of Rule 110 is hard.
- Given a finite prescribed time horizon, direct simulation is a decision procedure for the resulting finite-time outcome, though the cost may be high.
- General undecidability about whether some future event ever occurs is not the same claim as a cryptographic lower bound for a promised terminating finite generator.

The strongest possible result for the proposed construction would therefore require independently specifying a cost model, task, input family, adversary, precomputation allowances, and a *lower bound or justified sequentiality assumption* for the relevant observable, rather than relying on Rule 110's universality alone.

Wolfram's discussion of computational irreducibility itself acknowledges limited domains/pockets where the full behavior can be shortcut or particular properties can be predicted.

## 6. Direct answer to the researcher's challenge

**No generic universal algorithm is available to decide all unbounded futures of universal Rule 110-like systems.** Some prediction questions are formally undecidable.

**Yes, there is a generic two-candidate *forward-comparison procedure* for any finite terminating deterministic construction when only B is unknown and everything else is fixed and public.** That procedure may still be extraordinarily slow if forward evaluation itself is very expensive; it does not reverse the internal graph.

**No result presently shown establishes that the user's chosen adaptive one-bit construction forces work comparable to brute-forcing a large conventional secret key.** However, there is no contradiction in constructing an *expensive public computation* controlled by only one bit. The unresolved issue is sequential work versus efficiently recoverable secrets, not Shannon source entropy.

The proposal is an explicit **computational-hardness suspicion**. The observed logical branching can be vast internally, without being a vast **secret choice space**. If the user intends a more demanding adversarial task, preserve the distinction and formalize that task before claiming a security equivalence.

## External technical antecedents

- Matthew Cook, *Universality in Elementary Cellular Automata* (2004), [Complex Systems](https://www.complex-systems.com/abstracts/v15_i01_a01/): Rule 110 universal computation.
- Stephen Wolfram, [Computational Irreducibility (NKS)](https://www.wolframscience.com/nks/p741--computational-irreducibility/): the proposed no-shortcut phenomenon and limits/exceptional reducible cases.
- Jonathan Katz, Julian Loss and Jiayu Xu, [On the Security of Time-Lock Puzzles and Timed Commitments](https://eprint.iacr.org/2020/730): sequential-effort assumptions and their careful security conditions.
- [MIT 6.5620 Lecture 1: Intro & Perfect Secrecy](https://mit6875.github.io/Lecnotes-v2/lecture-01.html): formal one-time-pad/secrecy key-space lower bound and its scope.
- Previous project analyses: [adaptive one-bit feedback](2026-10-12-adaptive-single-bit-branching-vs-inversion.md) and [one-bit source sampled over time](2026-10-12-one-bit-stream-512-cycle-seed.md). The latter is a different construction that introduces fresh entropy over many samples.

**Provenance and authority:** The user's candidate generative construction and research motivation are human-originated; the distinction among evaluation time, inverse complexity, uncertainty and attack work is AI-assisted review. No empirical validation, source-independent proof of hardness or change to qualified IsoGraph identity semantics is claimed.
