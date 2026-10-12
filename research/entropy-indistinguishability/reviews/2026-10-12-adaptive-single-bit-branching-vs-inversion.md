# Adaptive single-bit branching: entropy does not measure inversion complexity

**Research date:** 2026-10-12  
**Status:** adversarial conceptual analysis of a researcher-originated **hypothesis**, not an independently proved cryptographic hardness result or physical entropy amplification.  
**Research context:** [entropy and indistinguishability research log](../DISCUSSION_LOG.md); [one-bit serial sampling distinction](2026-10-12-one-bit-stream-512-cycle-seed.md).  
**Attribution:** Joshua Oshiro introduced a *single total physical bit* used to change where a deterministic pseudorandom state is sampled, with the resulting bits recursively controlling later positions, operations and repetition counts. The NP-style inversion-hardness conjecture and the claim that Shannon entropy alone may not capture inversion cost are the researcher's. The formal branch-counting analysis and bounded reproducible example here are AI-assisted.

## What was actually proposed

The user now specifies **one genuine entropy bit sampled once**, not a fresh sample on each iteration. The publicly known mechanism uses that bit to alter a pseudorandomly chosen position inside another evolving deterministic sequence; later sampled sequence values control which position to modify next and how many iterations to perform; the process may cascade through arbitrarily many deterministic operations. The researcher **suspects** this feedback can make an outsider's reverse reconstruction a hard search problem even though the system consumes only one fresh physical random bit.

**The assistant must not misread this as a single local output-bit flip.** There may be profound, nonlinear, state-dependent effects that spread to much or all of the output.

## The mathematical branch-counting fact

Let B be the only unknown initial variable in {0,1}, and let Z collect every other input/state/parameter. Let F be the complete publicly known *deterministic* adaptive program, including any intermediate PRNGs, branch conditions, dynamic sample offsets, state mutations, and loop counts.

~~~text
Y = F(Z, B)
~~~

For any **fixed and known** Z, the entire computation has only two possible execution traces and resulting outputs:

~~~text
T_0 = Execute(F,Z,0)
T_1 = Execute(F,Z,1)
Y_0 = Output(T_0)
Y_1 = Output(T_1)
~~~

All later branches depend on B and previously determined states; they do not correspond to independent random choices. If F terminates on both possibilities, even very different traces give at most two possible final outputs; if B is a fair bit, H(Y | Z) ≤ 1 bit.

This remains true even if each trace has millions of operations, many conditional branches, or an avalanche of changed output bits.

**Forward attack:** Given a particular observed y, a party who knows Z and can execute F computes the two outputs and checks them against y. This takes at most two executions of the full F. It need not undo the intermediate operations and does not depend on how hard F is to reverse mathematically. If F is itself extremely expensive to evaluate, then each execution may be expensive; that is the evaluation cost, not exponential *search over unknown B*.

## What changes when other state is unknown

If the protected message M, a secret generator initialization P, a private key K, a hidden entropy state, or other input is unknown, write instead:

~~~text
Y = F(B,Z),   Z unknown or partially unknown.
~~~

The inverse problem can then be computationally difficult; for each candidate Z there can be up to two B branches, and the number of possible Z values can grow with its length. A change in B may genuinely alter which deterministic computations are applied to Z, possibly altering inversion hardness or attack strategy in particular constructions.

But **the number of random choices supplied by B is still one**, and the existence of a hard inverse does not imply that the bit generated many new independent random bits. It is essential to identify which parts of Z are unknown, to whom, and which constitute entropy, secret key material or merely unresolved structure.

More strongly, if one has efficient inverse procedures for *each fixed branch* F_0(Z) and F_1(Z), then inversion of the combined map F(B,Z) can be performed by attempting both branch inversions and checking the candidates. An unproved NP-style problem cannot arise **solely** from the need to decide between two efficiently invertible branches. If either branch itself embeds a hard inverse problem, the whole task may be hard, but the hardness is an embedded deterministic computation, not a branching explosion created by the one bit.

## A reproducible demonstration that respects the dynamic feedback

The [companion code](evidence/adaptive_single_bit_cascade.py) uses an initially public 512-bit state. At each of 512 rounds, it computes a SHA-256 digest of the current state to choose an offset, changes a state bit using B only at the initial round, uses the evolving state to select a variable number of repeated update steps, and makes further state-dependent updates. All later decisions may diverge due to the original bit.

**Bounded sample results for a fixed public initial state:**

~~~text
B=0: 1,510 total adaptive substeps
B=1: 1,515 total adaptive substeps
final SHA-256 digests differ in 123 of 256 positions.
~~~

The output digests have substantial differences and the intermediate sample locations and loop counts diverge rapidly. Yet the outsider can execute these **two** complete forward paths and check which matches the observed result; no reconstruction of the individual internal decisions is required.

This is a pedagogical deterministic test, **not a secure cryptographic scheme**. SHA-256 is simply a convenient public state-mixing function. It does not assert that all adaptive systems are easy to reverse when additional secret inputs exist.

## What Shannon entropy does and does not say

Shannon source entropy restricts how much unconditional randomness may result from a *known deterministic transformation* of a random input. It is a probability-distribution property, not a bound on the time needed to compute the inverse of a cryptographic function.

Therefore **“only one bit of entropy” and “the full deterministic inverse problem is computationally hard” are logically compatible**, once additional unknown inputs or an intrinsically hard inversion problem are specified. Conversely, **“the computation branches at many intermediate points”** does not establish an NP-hard search over exponentially many *independent* possibilities when they are all fixed by the same single bit.

Standard one-way functions are established theoretical definitions for the separation between easy forward evaluation and computationally difficult inversion under suitable assumptions. Their existence in the strong cryptographic sense is not currently proven unconditionally; their properties involve a *family* of instances, distributions and attack models rather than a single finite unparameterized program. See [Stanford's one-way function notes](https://crypto.stanford.edu/pbc/notes/crypto/oneway.html) and [CMU cryptography lecture notes](https://www.cs.cmu.edu/~goyal/15356/lecture_notes.pdf).

An **NP-style problem** requires a defined family of inverse/decision instances, input length, witness relation, and complexity claim. A complex adaptive computation does not become NP-hard merely because the program uses conditional branches. The researcher's expression is therefore preserved as a **suspected computational-hardness effect**, not reported as a finding or certainty.

## Potentially testable hypothesis, stated fairly

> If one physically unpredictable bit selects an adaptive trajectory through a deterministic but publicly known stateful generator, can it substantially increase average-case inversion cost for an outsider who lacks some separately specified state Z, compared with an otherwise matched zero-entropy generator?

That is a meaningful research question. Its answer depends on (1) what Z is, (2) what counts as inversion success, (3) how the cost is measured, (4) whether the adversary can compute the two forward trajectories for a candidate Z, and (5) what hard deterministic function is present independently of B.

**Disposition:** The adaptive cascade itself is taken seriously and can dramatically change outputs. The independent-information bound remains at one bit if B is the sole unknown. Computational difficulty may remain a real problem when there are other unknown inputs, but is not directly measured by Shannon entropy and is not automatically induced by exponential uncertainty from a single bit. This is a scoped analysis of the user's *suspicion*, not an attempt to attribute a theorem claim.
