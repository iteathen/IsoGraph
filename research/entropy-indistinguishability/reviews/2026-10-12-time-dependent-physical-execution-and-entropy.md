# Time-dependent physical execution and entropy indistinguishability

**Date:** 2026-10-12  
**Status:** substantive research discussion, conditional model, and reviewer analysis; **not** an experimental result, new Shannon theorem, or proof of universal physical indistinguishability.  
**Human research direction:** Joshua Oshiro's argument that an abstract deterministic expression suppresses the time-dependent physical mechanisms involved when the expression is executed; an ostensibly fixed bit may change unpredictably between reads, even when a program is only trying to read the same storage location, and this could cause hidden entropy to enter at physical realization boundaries. The researcher suspects the resulting observer/indistinguishability issue is difficult to escape at any computational layer.  
**Assistant role:** source comparison, explicit distinction between storage and process entropy, formal conditionalization, and limits of the generalization.  
**Conversation:** [research discussion log](../DISCUSSION_LOG.md).

## 1. The substantive point

The user is *not* asserting that the algorithm intentionally asks for new random input each time. The proposal is:

~~~text
Physical register/cell B(t) changes with its physical environment.
Formal algorithm: "read the same variable B" repeatedly.
Physical execution: read B(t_1), B(t_2), ... at different times.
~~~

If the underlying device undergoes stochastic changes between reads, the observations may differ, and the actual executed process has input from the time-evolving environment even though the formal program contains no explicit random number generator.

This is a legitimate distinction. A physical source whose output width is one bit can contribute **new uncertainty over time** through successive events. The total randomness in its observed trajectory is not bounded by the number of bits it stores at a single instant.

Experimentally relevant antecedents include random telegraph noise in semiconductor devices (for example, stochastic charge trapping and release), as well as standard physical entropy-source modeling. **The example is a noisy classical memory/readout process influenced by microscale/quantum phenomena, not automatically a coherent qubit or a register with unresolvable quantum state.**

## 2. A minimal mathematical model

Let X be the declared formal input, B(t) the physical bit as a time-varying random process, and T=(t_1,...,t_n) the read schedule (which might itself depend on the outcomes of earlier reads). A physical implementation might be modeled as:

~~~text
Y = F(X, B(t_1), B(t_2), ..., B(t_n), other physical state).
~~~

**Conditioned on X, the specified program F, the schedule and all other fixed state**, the entropy of a deterministic output is no larger than the joint entropy of the observed physical noise samples:

~~~text
H(Y | X,F,T,other fixed state) 
   <= H(B(t_1), ..., B(t_n) | X,F,T,other fixed state).
~~~

If a register evolves under a simple stationary Markov flip model with per-interval flip probability p, its initial bit is uniform, and no other effects occur, then the joint entropy of N reads is:

~~~text
H(B_1,...,B_N) = 1 + (N-1)*h_2(p),
h_2(p) = -p log_2(p) - (1-p) log_2(1-p).
~~~

Thus the same one-bit location can yield N bits of entropy at p=1/2 or only one bit at p=0 or p=1. All claims require the model's assumptions; real memory noise may be time-correlated, read-disturbed, temperature-dependent, and nonstationary.

An important nuance: a variable **time interval alone** is not an additional randomness source. Unpredictability enters only if physical state evolution, readout noise, scheduling, or external environmental interaction makes a variable stochastic in the model. Not every physical computation is meaningfully affected by such noise in its delivered logical output.

## 3. What is genuinely different from symbolic computation

The paper-level map x -> f(x) abstracts the internal operating mechanism. When implemented, there is more apparatus:

- a physical state of gates/memory, clocking and readout,
- dynamical evolution between instruction steps,
- stochastic perturbations or uncontrolled environmental inputs,
- protections such as error correction and validation,
- the interface specifying which traces and outcomes count as observations.

Therefore a claim of *physical indistinguishability* must compare actual **time-indexed output and interaction histories**, not merely equality of abstract source code or a single output value.

For two generative/physical models G_A and G_B, let Π be a declared class of adaptive physical experimental protocols, including permitted read times and interventions. A scoped operational equivalence is:

~~~text
G_A ~_Π G_B  iff
for all π in Π:
  Law(Transcript(G_A,π)) = Law(Transcript(G_B,π)).
~~~

The equality must include whatever state and timing effects are observable. This is a strong condition. If the two models' time-dependent noise leaves different outcome statistics accessible to a permitted experiment, then they are *not* equivalent under that Π. If **all** admissible protocols produce the same physical transcripts, their operational distinction is absent; the researcher's separate *natural identity* principle would then identify physical realizations, but that identity principle remains an additional foundational interpretation.

## 4. Does it prove no one can escape the observer problem at any layer?

**Not as a universal theorem.** Physical implementation can create additional unmodeled uncertainty at some layers, but standard error correction, redundancy, shielding, fault tolerance, and physical design can suppress its effects on the *logical* computation, even though microscopic components remain physical.

For a reliable implementation, the input-output map may be nearly deterministic or may match a particular deterministic model to very high confidence under explicitly stated noise assumptions. Time-indexed implementation is unavoidable for an actual physical computer; *effective randomness in every logically accessible output* is not.

The user's phrase that the problem appears inescapable “at any layer I can foresee” should be retained as a **research suspicion about absolute, complete physical description**, not reframed as a claimed proof that all physical algorithms are stochastic or indistinguishable.

Likewise, entropy is not absent from existing formal mathematics: stochastic-process entropy, entropy rates, conditional entropy, noise models, and physical entropy-source validation already handle such processes. The broader **identity** question—whether different source descriptions that induce all the same physical outcomes denote physically different realities—is separate from whether Shannon mathematics can describe time-dependent randomness.

## 5. How the example improves the entropy project

The user's strongest point is about **comparison scope**:

> An abstract statement about a declared seed is not necessarily a complete description of the randomness that influences a *physical execution*. If an implementation has accessible, time-varying stochastic state, a comparison that counts only the initial seed can miss physical sources of uncertainty.

This has consequences for the original short-source-versus-long-source example. If an apparently one-bit procedure repeatedly reads an unstable physical storage location, then the *full effective random input* may be the entire bit trajectory, not the original one-bit state. In this case source entropy does not mysteriously multiply; additional physical uncertainty entered over time. A fair complete comparison must count that input.

The remaining harder question is whether two *complete* physical generative histories can differ in source entropy while **every** accessible interaction and continuation is indistinguishable. The noisy-read illustration motivates the importance of including time-dependent interactions; it does not establish global equivalence in itself.

## External antecedents and fidelity

- [NIST SP 800-90B, Recommendation for the Entropy Sources Used for Random Bit Generation](https://csrc.nist.gov/pubs/sp/800/90/b/final) — measurement of source unpredictability, non-IID samples, source health tests.
- [Narayanan, *Random Telegraph Noise: From Device-Level Origins to Circuit-Level Consequences* (2025)](https://escholarship.org/uc/item/8kq180mg) — time-dependent variability in semiconductor devices due to stochastic charge trapping.
- [Phys. Rev. A 107, 042422 (2023)](https://doi.org/10.1103/PhysRevA.107.042422) — fault-tolerant quantum computation as an example of reliable logical computation despite physical noise.
- [Von Neumann's fault-tolerance tradition, as summarized by Reichardt](https://doi.org/10.1007/978-0-387-30162-4_143) — rigorous separation of unreliable physical components from reliable logical computation under noise assumptions.

**Disposition:** Strong methodological refinement about temporal realization and complete accounting; uncertain strong generalization to an absolute, universally inescapable physical observer-equivalence boundary. No new theorem, verified hardware implementation, or change to qualified IsoGraph NEI semantics.
