# MWC primitive-oriented rendering 0.1

**Status:** independently frozen exploratory rendering  
**Native artifact:** `MWC_RENDER_0_1.isg`  
**Source freeze:** `MWC_SOURCE_FREEZE_0_1.md`  
**Cross-system information used:** none

## Representation posture

This artifact does not introduce an IsoGraph primitive called `MWC`, `ALLOSTERY`, `RECEPTOR`, `LIGAND`, `ACTIVE`, or `COOPERATIVITY`.

The native file is ordinary ordered incidence over opaque SI plus an independent local stable-label namespace.

## Local SI roles

```text
2000 model scope
2010 finite binding-site index family
2011 site-indexed occupancy occurrence family
2012 binary occupancy domain {0,1}
2013 one global conformation occurrence
2014 binary conformation domain
2015 molecular microstate family
2016 concerted-conformation constraint/association
2017 conformation-energy contribution
2018 site binding-energy contribution family
2019 total molecular state energy
2020 bound-ligand count
2021 microstate Gibbs/Boltzmann weight
2022 partition sum
2023 normalized microstate probability
2024 activity/conformation weighted observable
2025 occupancy weighted observable
2026 conformation-energy parameter family
2027 conformation-dependent binding parameter family
2028 ligand chemical potential / concentration-control input
2029 inverse temperature beta
2030 finite-sum/aggregation authority
2031 exponential/Gibbs transform authority
2032 normalization/division authority
```

## Local label roles

```text
^52001  occupancy occurrence indexed by binding site
^52002  occupancy occurrence constrained to binary domain
^52003  one global conformation constrained to binary domain
^52004  microstate combines global conformation with complete occupancy assignment
^52005  conformation energy depends on global conformation
^52006  binding contribution depends on occupancy and global conformation
^52007  total state energy aggregates conformation + binding contributions
^52008  bound count aggregates occupancies
^52009  weight depends on energy, bound count, ligand chemical potential, beta
^52010  partition aggregates weights over molecular microstates
^52011  probability normalizes one microstate weight by partition
^52012  activity observable aggregates global conformation under normalized probability
^52013  occupancy observable aggregates site occupancies under normalized probability
^52014  concerted association makes one global conformation load-bearing for site contributions
```

## Load-bearing shape

```text
finite site-index structure
    ->
binary occupancy at each site
    +
one global binary conformation
    ->
complete molecular microstate

global conformation
    -> conformation energy

local occupancy + same global conformation
    -> site binding contribution

all contributions
    -> total state energy

state energy + bound count + ligand control
    -> exponential statistical weight

weights over all microstates
    -> partition
    -> normalized distribution

normalized distribution
    -> conformation/activity aggregate
    -> occupancy aggregate
```

## Load-bearing concerted distinction

The frozen MWC candidate contains **one global conformation degree of freedom per molecular microstate**.

It does not contain one independent conformation variable per binding site.

That is how the concerted constraint is represented positively in this version.

## Exact residuals / boundaries

1. binding-site occupancies are local binary variables;
2. conformation is a separate global binary variable;
3. every binding contribution depends on that same global conformation;
4. there is no direct nearest-neighbor occupancy/occupancy energy edge in this frozen model;
5. ligand control enters through the statistical weight/binding thermodynamics;
6. kinetic conformational-transition rates are outside scope.

The rendering is intended to preserve source model structure, not to claim primitive minimality is already proved.
