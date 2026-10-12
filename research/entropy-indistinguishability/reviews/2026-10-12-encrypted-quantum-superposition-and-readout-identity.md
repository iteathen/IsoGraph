# Encrypted data in superposition: unknown output versus indeterminate classical data

**Research date:** 2026-10-12  
**Status:** exploratory application of quantum information to the Entropy and Indistinguishability project. Standard formal identities are distinguished from the researcher's broader unproved natural-identity hypothesis.  
**Human-originated prompt:** Joshua Oshiro suggested that the *encrypted data itself* may be stored in quantum superposition, such that not even the party controlling the data can know a particular classical value before readout.  
**AI role:** conditional models, quantum-information distinctions, critique, literature linkage, and archival record.  
**Source of research discussion:** [Discussion log](../DISCUSSION_LOG.md).

## The new question

The earlier examples concerned an unstable physical bit, unknown seed, stochastic time evolution, or a large computationally complex deterministic generator. This variant changes the **type of information being stored**: the ciphertext (or the underlying logical message) could be an actual coherent **quantum state**, rather than an ordinary classical bit string.

The distinction between *epistemic uncertainty* about a pre-existing classical value and *measurement uncertainty* of a quantum state is essential to assessing this example. A conventional bit may have a fixed but unknown value. A qubit can instead be deliberately prepared as a coherent superposition for which a given measurement has multiple possible outcomes.

Quantum encryption of arbitrary qubit states exists at the level of formal protocols (e.g. the quantum one-time pad); the proposed research use is an example of quantum-information theory, **not evidence that a classical cache spontaneously stores coherent ciphertext**.

## Two distinct meanings of encrypted superposition

### Case A: definite classical message, quantum ciphertext

Suppose the original logical message is a known classical bit m∈{0,1}, encoded as |m>. Quantum encryption can transform this into a nonclassical ciphertext while preserving a legitimate quantum decryption procedure such that

~~~text
Enc_k(|m>) = |C_m>
Dec_k(|C_m>) = |m>
~~~

and a readout of the decrypted bit in the computational basis is then *deterministic*, absent noise and implementation error.

In a more general coherent scheme, an ancillary quantum register may be in superposition while the definite classical message remains recoverable. **Quantum ciphertext does not automatically mean that the authorized party lacks a definite classical plaintext.**

### Case B: the message itself is a quantum superposition

Let

~~~text
|ψ> = (|0> + |1>)/√2
|C> = U_k |ψ>
U_k† |C> = |ψ>.
~~~

The legitimate party who applies the inverse encryption *recovers the quantum state*. Measuring in the {|0>,|1>} basis then gives either classical value with probability 1/2. Even knowing the encryption key and generator does not predetermine which classical measurement outcome appears.

This is a coherent version of the researcher's suggestion: the party can know the **quantum state description** yet not have a definite **classical bit value** to read before a measurement is performed. The quantum state is itself well-defined; it is the value of a selected classical measurement that is not certain.

If the task was to store a **specific pre-existing classical secret**, this construction is not a substitute for reliable classical encryption/decryption. If the intended information is quantum, retaining coherence and recovering |ψ> is a legitimate objective.

## Relation to the project's entropy distinctions

For the pure state

~~~text
ρ_pure = |+><+|,   |+> = (|0> + |1>)/√2,
~~~

the von Neumann entropy is **zero**:

~~~text
S(ρ_pure) = -Tr(ρ_pure log₂ ρ_pure) = 0.
~~~

Yet a computational-basis measurement yields a fair 0/1 outcome with **one bit of Shannon entropy**:

~~~text
H(Z-measurement result) = 1 bit.
~~~

By contrast, the maximally mixed state

~~~text
ρ_mix = 1/2 |0><0| + 1/2 |1><1| = I/2
~~~

has von Neumann entropy **one bit** and *also* yields a fair 0/1 outcome under a Z-basis measurement.

This is a rigorous example of the importance of declaring the **state, probability model, and measurement** used when comparing entropy. It is not a violation of either quantum or classical information theory.

**Crucial indistinguishability test:** These two preparations cannot be distinguished by *Z-basis measurement alone*. But they can be distinguished by an X-basis measurement: the pure state |+> gives the + result with probability 1, while the maximally mixed state gives +/− with probability 1/2 each.

Consequently, **identical randomness in one chosen readout does not establish total physical indistinguishability**, even in a quantum system. The broader natural-identity proposal requires equality under all physically admissible measurements and interventions, including interference-sensitive measurements where relevant.

## Exact operational condition within quantum theory

For density operators ρ and σ on the **same accessible quantum system**, the probabilities of outcome j for a POVM with effects {E_j} satisfy

~~~text
P_ρ(j) = Tr(ρ E_j)
P_σ(j) = Tr(σ E_j).
~~~

If *every physically allowed quantum POVM on that system* is admitted as an ideal operational test, then all measurement distributions coincide **if and only if ρ=σ**.

This is a concrete formal expression of exhaustive quantum operational indistinguishability (within the assumptions of standard finite-dimensional quantum mechanics). It does **not** entail the full identity of the physical preparation histories, inaccessible environments, or joint entangled states. Different global states can have the same reduced density matrix accessible to an observer.

Thus a quantum layer **sharpens**, rather than dissolves, the user's proposed distinction between observable equivalence and the total physical reality being identified.

## Quantum measurement and temporal sampling

The superposed qubit can yield a genuinely probabilistic outcome at a **single** read event; no time-separated stochastic bit flipping is required.

Conversely, after an ideal projective Z-basis measurement, an immediate repeated ideal Z measurement of the same undisturbed system returns the same value. Multiple reads do not automatically accumulate independently sampled randomness from a single unchanged qubit.

This relates directly to the earlier physical unstable-register thought experiment while keeping distinct:
- a noisy *classical* bit with stochastic evolution in time;
- a *quantum* coherent superposition;
- a *classical* probability mixture of definite bit states;
- measurement backaction and the choice of measurement basis.

These are physically distinguishable models under suitable access conditions.

## Implication for quantum encryption and secrecy

Quantum one-time-pad schemes use a classical secret key and quantum gates to encrypt an unknown quantum plaintext, hiding its state from an unauthorized observer and allowing authorized decryption. In standard perfect quantum one-time padding of an n-qubit plaintext with a uniformly secret 2n-bit key, averaging over keys produces a maximally mixed ciphertext state for an adversary without the key.

This is a distinct source of confidentiality from "the plaintext has not yet become a classical value." Quantum uncertainty about the measurement result is not automatically cryptographic secrecy, and entropy of the ciphertext measurement is not automatically secret-key entropy.

If the party storing the state knows its preparation, they may know the probability amplitudes exactly yet still not know a future individual classical measurement outcome.

## Researcher's natural-identity hypothesis: where this leaves it

The researcher's strong hypothesis is that two purported physical realizations with no physically possible distinguishing property are naturally identical, rather than merely conventionally equivalent.

Quantum theory provides a way to state *operational indistinguishability* exactly for an accessible subsystem via density operators and POVMs. It also supplies an important falsification pattern: **pure superposition and classical mixture may look identical to one kind of reader but are not globally equivalent for all measurements**.

To apply the strong natural-identity hypothesis, one would need to include all available quantum interference, entanglement, side information, environment and allowed interaction histories. A single classical readout cannot establish total sameness.

**Status:** A legitimate quantum-information extension to the source/apparent randomness question, but not a newly established physical identity theorem or a contradiction with Shannon entropy.

## References and provenance

- [NIST, What Is Quantum Cryptography?](https://www.nist.gov/cybersecurity-and-privacy/what-quantum-cryptography) — measurement, superposition, no-cloning, quantum-state encryption.
- [TU Delft OpenCourseWare, Encrypting qubits with the quantum one-time pad](https://ocw.tudelft.nl/course-lectures/1-3-1-encrypting-qubits-quantum-one-time-pad/) — quantum encryption/decryption in a controlled protocol.
- [QAGORA, Quantum One-Time Pad](https://qagora.ed.ac.uk/qpz/protocols/quantum-one-time-pad/) — explicit Pauli-twirling formula, classical key and density-matrix perspective.
- [NIST, Quantum Computing Explained](https://www.nist.gov/quantum-information-science/quantum-computing-explained) — coherence and measurement of qubits.
- Original [Entropy and Indistinguishability working note](../evidence/source/entropy-indistinguishability-working-note.md) and [later strict natural identity analysis](2026-10-12-strict-natural-identity-clarification.md).

All source documents remain unchanged. The new thought experiment is user-originated; formal distinctions and explanatory examples are AI-assisted.
