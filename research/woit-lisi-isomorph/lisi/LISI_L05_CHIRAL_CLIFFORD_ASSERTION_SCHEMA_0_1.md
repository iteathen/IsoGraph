# L05 Chiral Clifford Assertion Schema 0.1

**Status:** TRACK-L SOURCE ASSERTION RENDERING / PRE-QUALIFICATION  
**Native:** `LISI_L05_CHIRAL_CLIFFORD_ASSERTION_SCHEMA_0_1.isg`  
**Frozen target:** `L-SSC-126`

## Purpose

This file primitive-renders the semantic assertions that sit above the finite coefficient tensor in L05 equations (2)–(4).

For each of the six source carriers it defines:

- `Gamma_minus(v,m)=v m` using the source product;
- `Gamma_plus(v,p)=-KAPPA(v) p`;
- the Clifford bilinear form as the negative of the composition bilinear form;
- the Clifford quadratic form as the negative of the composition norm.

It then instantiates primitive chiral-Clifford schema `195000`, whose body explicitly requires both chiral square identities.

## Cyclic coefficient assertion

`217160(carrier)` expands to a quantified primitive formula over the exact finite coefficient tensor from `LISI_L05_CHIRAL_CLIFFORD_COEFFICIENT_SOURCE_OVERLAY_0_1.isg`.

For all represented basis triples:

~~~text
M_ca(tilde b) = M_ab(tilde c)
~~~

after lowering the output index with the source metric.

The source asserts `217160` for all six ordinary/split carriers.

## Inconsistent ordinary-O source

The version-of-record ordinary-O multiplication table conflicts with the source composition/conjugation claims. Therefore its derived coefficient tensor contradicts the simultaneously represented Clifford/cyclic assertions.

That contradiction is preserved.

Representation closure does not mean that the represented source assertions are mutually true.

## Boundary

This file does not repair the O table and does not use Woit or synthesis semantics.
