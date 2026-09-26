# Ising primitive-oriented rendering 0.1

**Status:** independently frozen exploratory rendering  
**Native artifact:** `ISING_RENDER_0_1.isg`  
**Source freeze:** `ISING_SOURCE_FREEZE_0_1.md`  
**Cross-system information used:** none

## Representation posture

This artifact does not introduce an IsoGraph primitive called `ISING`, `SPIN`, `MAGNET`, or `TRANSFER_MATRIX`.

The native file is ordinary ordered incidence over opaque SI plus local stable labels.

The labels below are reconstruction handles only.

## Local SI roles

```text
1000 model scope
1010 finite site-index family
1011 site-indexed spin-value occurrence family
1012 two-valued spin domain {-1,+1}
1013 complete configuration family
1014 nearest-neighbor relation over sites
1015 pair-interaction contribution family
1016 field-interaction contribution family
1017 total configuration energy
1018 configuration Boltzmann weight
1019 partition sum
1020 normalized configuration probability
1021 magnetization-style weighted observable
1022 coupling parameter J
1023 external field parameter h
1024 inverse temperature beta
1025 periodic/cyclic boundary relation
1026 finite-sum/aggregation operation authority
1027 exponential/Boltzmann transform authority
1028 normalization/division authority
```

## Local label roles

```text
^41001  value occurrence indexed by site
^41002  value occurrence constrained to binary domain
^41003  configuration consists of complete site-value assignment
^41004  neighbor relation formed over cyclic site domain
^41005  pair contribution depends on neighbor relation, two incident spin values, J
^41006  field contribution depends on one spin value and h
^41007  total energy aggregates pair + field contributions
^41008  weight derives from energy and beta through exponential authority
^41009  partition aggregates weights over the configuration family
^41010  probability normalizes one configuration weight by partition
^41011  observable aggregates spin values under normalized probabilities
^41012  periodic closure binds end/start into neighbor structure
^41013  model parameter incidence
```

## Load-bearing shape

```text
finite cyclic index structure
    ->
binary local value at each index
    ->
complete assignment

neighbor pair + two local values + J
    -> pair energy contributions

local value + h
    -> field energy contributions

all contributions
    -> total energy
    -> exponential weight

weights over all assignments
    -> partition
    -> normalized distribution

normalized distribution + local values
    -> observable aggregate
```

## Exact residuals / boundaries

The following are deliberately preserved:

1. interaction topology is local nearest-neighbor coupling on a cycle;
2. there is no separate global binary latent state in this frozen rendering;
3. each site carries its own binary value;
4. the probability distribution is over complete assignments of all site values;
5. no kinetic spin-flip process is represented;
6. the thermodynamic limit is outside scope.

The rendering is intended to preserve the source model's relational structure, not to claim primitive minimality is already proved.
