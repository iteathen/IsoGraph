# Three-positive-control scoring contract

**Status:** FROZEN BEFORE DISCOVERY

## General scoring

Score only positive or locally falsifiable obligations.

For each case:

1. recover a common primitive/substructural mapping;
2. recover the known exact transformation or an exactly equivalent witness;
3. preserve scope and parameter roles;
4. show reconstruction in both directions where the oracle supports it;
5. retain representation-only residuals rather than hiding them;
6. do not import the withheld oracle as discovery evidence;
7. do not use domain labels or raw local IDs as structural evidence.

Additional valid discoveries are allowed. They are not penalized merely because they are absent from the oracle.

A claimed mapping is rejected only when a concrete frozen structural obligation fails.

## Case 1 — Ising / lattice gas

Required witness family:

- binary local-state bijection `n=(s+1)/2`, `s=2n-1` or algebraically equivalent mapping;
- nearest-neighbor interaction preserved;
- local field/count term transported correctly;
- additive configuration-independent constant isolated;
- partition/probability correspondence under parameter transport.

## Case 2 — XOR-SAT / GF(2)

Required witness family:

- Boolean values mapped bijectively to GF(2);
- XOR mapped to addition modulo 2;
- each XOR constraint mapped to one linear equation with matching parity/right-hand side;
- conjunction mapped to simultaneous equation satisfaction;
- satisfying assignments preserved both directions.

## Case 3 — Newton / Hamilton oscillator

Required witness family:

- shared coordinate `q`;
- momentum/velocity bridge `p=m v=m qdot`;
- `qdot=p/m` reconstructs the Newton velocity relation;
- `pdot=-kq` plus `p=m qdot` reconstructs `m qddot+kq=0`;
- Newton form plus `p=m qdot` reconstructs both Hamilton equations;
- no extra physical degree of freedom invented merely because phase space uses two coordinates.

## Bookkeeping results

```text
KNOWN_POSITIVE_WITNESS_RECOVERED
PARTIAL_WITNESS_RECOVERED
WITNESS_NOT_RECOVERED
CLAIMED_MAPPING_FALSIFIED_LOCALLY
TEST_CONTAMINATED
```

These are campaign bookkeeping labels, not Core semantic statuses.
