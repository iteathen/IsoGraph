# Quantum control extending through a hypergraph

**Date:** 2026-10-12  
**Status:** exploratory research note; not a theorem or experimental result.  
**Researcher contribution:** Joshua Oshiro proposes letting a single unmeasured tunneling-sensitive quantum state control operations across a hypergraph. He suspects that analyzing or reconstructing the graph could require extensive computation despite a very small initial entropy source, possibly connecting to complexity-class limitations.  
**Assistant contribution:** coherent-state model, physical constraints, comparison with established quantum-information results.

## Two possible physical meanings

An unread classical random bit is not automatically coherent. If a tunneling event leaves a definite physical record in a device or environment, subsequent operations may be classically correlated, not quantum entangled. A coherently maintained qubit can instead control gates that entangle additional qubits without first measuring the control.

For an initial control |+> and graph state |G>, a possible controlled evolution is:

```
|Psi> = (|0> U0|G> + |1> U1|G>)/sqrt(2).
```

This coherently combines two conditional graph evolutions. Realizing it requires unitary, coherence-preserving operations and possibly extra reversible workspace; ordinary classical graph rewrites do not automatically preserve quantum phase information. Arbitrary unknown quantum states cannot be copied, although they can control entangling operations.

## What an exact demonstration shows

Preparing an n-qubit GHZ state from one |+> control and n-1 initialized |0> qubits produces:

```
|GHZ_n> = (|0...0> + |1...1>)/sqrt(2).
```

This is entangled across many nodes. Yet the known preparation circuit can be inverted gate-by-gate, recovering |+> and the initialized auxiliary register. The graph's size alone does not force enumeration of all possible quantum configurations.

The global GHZ state is pure, with von Neumann entropy zero; its complete Z-basis readout has one bit of Shannon outcome entropy, split between all-zero and all-one outcomes. Each individual qubit has a mixed reduced state with one bit of local von Neumann entropy. These quantities measure different objects.

The incoherent all-zero/all-one mixture has identical Z-basis outcome statistics but can be distinguished from coherent GHZ by a global coherence-sensitive measurement. Thus an unknown original readout need not mean total physical indistinguishability.

## Computational status

The researcher's proposed graph may exhibit serious computational complexity for **specific** classical-simulation or measurement-probability tasks. However, publicly specified unitary gates admit inverse operations, and complicated graph evolution alone does not prove difficulty for every recovery task. If additional physical variables are unknown, they must be included in the comparison. Quantum complexity classes such as BQP are relevant; P versus NP does not by itself determine whether the proposed task has an efficient method.

The strongest question to preserve is whether **one coherent quantum control, acting through many-body graph dynamics, can yield an unusually hard-to-reconstruct physically accessible output while still remaining fully specified by a small initial classical randomness budget**. This is explicitly a hypothesis.

## Relevant published antecedents

- [IBM Quantum, whole-device entanglement and GHZ preparation](https://www.ibm.com/quantum/blog/whole-device-entanglement)
- [IBM Quantum, limitations on quantum information](https://learning.quantum.ibm.com/course/basics-of-quantum-information/quantum-circuits)
- [IBM Quantum, quantum noise and decoherence](https://quantum.cloud.ibm.com/learning/en/courses/tools-for-quantum-advantage/noise-and-errors)
- [IBM Quantum, reversible quantum circuit evaluation](https://learning.quantum.ibm.com/course/fundamentals-of-quantum-algorithms/quantum-algorithmic-foundations)
- [IBM Quantum, quantum computational complexity classes](https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice/applications-of-qc)
- [Quantum sampling complexity survey](https://www.nature.com/articles/s41534-017-0018-2)

**Provenance:** User-originated speculation, agent-assisted analysis. This review does not alter the original archival paper or qualified IsoGraph semantics.
