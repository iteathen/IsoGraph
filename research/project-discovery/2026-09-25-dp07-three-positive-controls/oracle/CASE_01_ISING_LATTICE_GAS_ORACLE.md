# WITHHELD ORACLE — Case 01 Ising / lattice gas

**Do not expose to discovery.**

Exact-positive anchor:

- Lee & Yang, Phys. Rev. 87, 410 (1952):
  https://journals.aps.org/pr/abstract/10.1103/PhysRev.87.410

Witness:

```text
n_i=(s_i+1)/2
s_i=2n_i-1

s_i s_j = 4n_i n_j - 2n_i - 2n_j + 1
sum_i s_i = 2 sum_i n_i - N
```

Substitution transforms the Ising score into nearest-neighbor occupation interaction plus a one-body occupation/count term plus a configuration-independent constant.

Coefficient/sign transport must be checked against the frozen conventions and lattice coordination.

Required invariant:

```text
binary bijection
+ same neighbor graph
+ transported pair term
+ transported one-body term
+ isolated state-independent constant
+ preserved normalized ensemble
```
