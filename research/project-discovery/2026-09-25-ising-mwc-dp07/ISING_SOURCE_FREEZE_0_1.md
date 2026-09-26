# Physics source freeze — 1D nearest-neighbor Ising model 0.1

**Status:** FROZEN source interpretation for this campaign  
**Domain:** statistical physics  
**Cross-system comparison used during freeze:** no

## Frozen subject

A finite one-dimensional periodic Ising chain with:

- a finite ordered/cyclic set of sites;
- one binary spin variable per site, σ_i ∈ {-1,+1};
- nearest-neighbor interaction coupling J;
- external field h;
- inverse temperature β;
- canonical Boltzmann weighting over complete spin configurations.

Selected energy convention:

```text
E(σ)
    =
-J * sum_i σ_i σ_{i+1}
-h * sum_i σ_i
```

with periodic boundary σ_{N+1}=σ_1.

Configuration weight:

```text
w(σ) = exp(-β E(σ))
```

Partition normalization:

```text
Z = sum_over_configurations w(σ)
P(σ) = w(σ) / Z
```

The rendering preserves the distinction between:

- site identity;
- spin value;
- neighbor relation;
- pair interaction;
- field interaction;
- total energy;
- configuration weight;
- partition sum;
- normalized probability.

## Source anchors

1. Stephen G. Brush, “History of the Lenz-Ising Model,” *Reviews of Modern Physics* 39, 883 (1967), DOI 10.1103/RevModPhys.39.883. Historical/source-context anchor.
2. University of Utah Physics, “Hamiltonian” Ising model notes. Source for binary ±1 site variables, nearest-neighbor Hamiltonian, optional external field, and periodic lattice treatment.
3. Daniel Harlow, *QFT II* notes, §8.5 “Transfer matrix and the Hamiltonian formulation for the 1D Ising model.” Source for a finite periodic 1D Ising chain, Boltzmann partition function, and exact repeated transfer construction `Z = Tr(T^N)`.

## Scope exclusions

This freeze does not require:

- thermodynamic-limit critical behavior;
- 2D Onsager solution;
- renormalization group;
- Monte Carlo dynamics;
- quantum Ising semantics;
- a particular material realization.

Those may be represented in other campaigns but are outside this candidate.

## Source-faithfulness note

The chosen model combines standard source-supported features into one declared finite 1D Ising candidate. The campaign compares that declared model, not all things called “Ising model.”
