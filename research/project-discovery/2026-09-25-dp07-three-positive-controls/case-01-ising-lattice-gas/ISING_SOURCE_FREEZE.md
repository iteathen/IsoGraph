# Case 01A — finite nearest-neighbor Ising source freeze

**Status:** FROZEN
**Pair mapping consulted during rendering:** no

```text
finite sites i
s_i in {-1,+1}
neighbor relation <ij>
E(s) = -J sum_<ij> s_i s_j - h sum_i s_i
w(s)=exp(-beta E(s))
Z=sum_s w(s)
P(s)=w(s)/Z
```

Independent source anchors:

- https://www.web.stanford.edu/~peastman/statmech/phasetransitions.html
- https://courses.physics.ucsd.edu/2025/Spring/physics210a/LECTURES/SUMMARIES.pdf

Do not import the lattice-gas transformation.

Local reconstruction roles:

```text
1100 model
1110 site family
1111 local spin occurrence
1112 binary {-1,+1} domain
1113 configuration family
1114 neighbor relation
1115 pair contribution
1116 field contribution
1117 total energy
1118 exponential weight
1119 partition
1120 normalized probability
1121 J
1122 h
1123 beta
```
