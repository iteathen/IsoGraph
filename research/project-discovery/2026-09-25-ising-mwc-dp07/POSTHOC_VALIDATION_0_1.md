# Post-hoc external validation 0.1

**Status:** POST-DISCOVERY validation only  
**Used to generate the blind DP result:** no

This record was created only after:

- both source freezes;
- both independent native renderings;
- the blind comparison view;
- the DP 0.7 pass;
- the common-core/residual result.

## Validation V1 — MWC and Ising coupling mechanisms are scientifically distinguished

Published bacterial-chemoreceptor modeling explicitly compares:

- MWC-style isolated strongly coupled / all-or-none clusters; and
- Ising-style one- or two-dimensional nearest-neighbor coupled receptor lattices.

This independently agrees with the DP residual:

```text
MWC:
    global/all-or-none conformational coordination

Ising:
    local nearest-neighbor pair coupling
```

Sources:

- Mello & Tu / related receptor-coupling literature summarized in “Receptor-Receptor Coupling in Bacterial Chemotaxis: Evidence for Strongly Coupled Clusters” (PNAS/PMC record).
- “Quantitative modeling of bacterial chemotaxis: Signal amplification and accurate adaptation,” which states an MWC all-or-none sub-cluster can be viewed as an infinite-coupling limit within clusters while Ising-type models use finite/local couplings.

This validation does not convert the frozen generic MWC molecule and finite 1D Ising chain into whole-system isomorphs.

## Validation V2 — MWC cooperativity can be indirect rather than direct pair coupling

The statistical-mechanics MWC review describes cooperativity as arising from indirect regulation: ligand binding shifts probability toward the conformation with higher affinity, which changes subsequent binding probability.

It contrasts this with models using direct energetic interactions between bound ligands.

This independently supports the DP distinction:

```text
common collective/statistical effect
    != common primitive coupling mechanism
```

Source:

- Marzen, Garcia, Phillips, “Statistical Mechanics of Monod-Wyman-Changeux (MWC) Models” (2013).

## Validation V3 — field / chemical-potential role has an established exact statistical-mechanics analogue

The classic lattice-gas/Ising equivalence establishes an exact analytic relationship between:

- Ising magnetic-field parameter; and
- lattice-gas chemical potential,

under the binary occupation/spin transformation.

This independently supports the DP-27 parameter-role correspondence discovered here.

Source:

- T. D. Lee and C. N. Yang, “Statistical Theory of Equations of State and Phase Transitions. II. Lattice Gas and Ising Model,” *Physical Review* 87 (1952) 410–419, DOI 10.1103/PhysRev.87.410.

## Validation disposition

```text
blind common-core result:              externally consistent
interaction-topology residual:         externally consistent
external-bias role correspondence:      externally consistent
whole-structure isomorphism:            still rejected
post-hoc source leakage into discovery: no
```
