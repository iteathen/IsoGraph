# Case 01B — nearest-neighbor lattice-gas source freeze

**Status:** FROZEN
**Pair mapping consulted during rendering:** no

```text
finite lattice sites i
n_i in {0,1}
neighbor relation <ij>
G(n)=epsilon sum_<ij> n_i n_j - mu sum_i n_i
w(n)=exp(-beta G(n))
Xi=sum_n w(n)
P(n)=w(n)/Xi
```

Independent source anchors:

- https://pmc.ncbi.nlm.nih.gov/articles/PMC12385361/
- https://pmc.ncbi.nlm.nih.gov/articles/PMC11203012/

Do not consult the Ising/lattice-gas mapping while rendering.

Local reconstruction roles:

```text
2100 model
2110 site family
2111 occupation occurrence
2112 binary {0,1} domain
2113 configuration family
2114 neighbor relation
2115 pair contribution
2116 chemical-potential/count contribution
2117 grand-energy score
2118 exponential weight
2119 grand partition
2120 normalized probability
2121 epsilon
2122 mu
2123 beta
```
