# Biochemistry source freeze — Monod-Wyman-Changeux allostery 0.1

**Status:** FROZEN source interpretation for this campaign  
**Domain:** biochemistry / molecular biophysics  
**Cross-system comparison used during freeze:** no

## Frozen subject

An n-site concerted MWC molecule with:

- one global conformational state g in a two-state set, represented here as inactive/active;
- n ligand-binding sites;
- one binary occupancy variable x_i ∈ {0,1} per site;
- a concerted-conformation constraint: the sites belong to the same molecular conformation g rather than independently selecting mixed conformations;
- conformation energy ε_g;
- conformation-dependent ligand binding energy / affinity;
- ligand chemical potential (or equivalently concentration plus reference binding parameters);
- inverse temperature β;
- Gibbs/statistical weight over molecular microstates.

A microstate is structurally represented as:

```text
(g, x_1, ..., x_n)
```

with bound-ligand count:

```text
n_bound = sum_i x_i
```

and weight of the standard statistical-mechanical form:

```text
w(state)
    proportional to
exp(-β * (E_state - n_bound * μ))
```

where the state energy separates conformation and conformation-dependent binding contributions.

Normalization:

```text
Z = sum_over_microstates w(state)
P(state) = w(state) / Z
```

Activity and occupancy observables are weighted aggregates over the corresponding subsets/projections of microstates.

## Source anchors

1. J. Monod, J. Wyman, J.-P. Changeux, “On the Nature of Allosteric Transitions: A Plausible Model,” *Journal of Molecular Biology* 12 (1965) 88–118, DOI 10.1016/S0022-2836(65)80285-6.
2. J.-P. Changeux, “Allostery and the Monod-Wyman-Changeux model after 50 years,” *Annual Review of Biophysics* 41 (2012). Source for the model’s oligomeric/symmetry and discrete pre-existing conformational-state hypotheses.
3. S. Marzen, H. G. Garcia, R. Phillips, “Statistical Mechanics of Monod-Wyman-Changeux (MWC) Models” (2013). Source for explicit states-and-weights construction, inactive/active state classes, n-site generalization, Gibbs weights, activity probability, and ligand occupancy observables.

## Scope exclusions

This freeze does not require:

- induced-fit alternatives;
- KNF sequential allostery;
- protein-specific structural dynamics;
- kinetic transition rates;
- negative-cooperativity extensions;
- receptor-cluster lattice coupling beyond the basic concerted MWC molecule.

## Source-faithfulness note

The rendering treats the concerted two-state model as the subject. It does not assert that every real allosteric protein obeys MWC.
