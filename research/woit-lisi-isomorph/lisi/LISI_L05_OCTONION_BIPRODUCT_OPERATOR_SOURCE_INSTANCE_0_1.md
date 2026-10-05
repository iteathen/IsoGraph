# L05 Octonionic Bi-Product Operator Source Instance 0.1

**Status:** SOURCE-LOCAL PARTIAL RENDERING OF `L-SSC-127`  
**Native:** `LISI_L05_OCTONION_BIPRODUCT_OPERATOR_SOURCE_INSTANCE_0_1.isg`

## Reduced source structure

This artifact renders the lower invariant content of L05's statement that octonionic multiplication is nonassociative and that the bi-product operators are strictly larger than imaginary single multiplication.

### Nonassociativity

The exact version-of-record O table supplies an explicit basis witness:

~~~text
(e1 e2) e3 != e1 (e2 e3)
~~~

The native graph preserves the exact signed outputs from the frozen source table.

### Twenty-eight bi-product operators

A new real vector carrier 226000 has an exact 28-element basis indexed by:

~~~text
(c,d), 0 <= c < d <= 7.
~~~

Each basis operator acts on the source O carrier by the source composition rule:

~~~text
B_cd(x) = (x e_d) tilde(e_c)
~~~

with e_d acting first.

The operator action is bilinear and the 28 basis values are represented by the exact dimension-28 schema 225001.

### Imaginary right multiplication is only a seven-dimensional subspace

A separate exact 7-dimensional carrier 226100 represents ordinary imaginary right multiplications.

Its basis injects linearly into the bi-product space as:

~~~text
R_ei -> B_0i, i=1,...,7.
~~~

The native file also includes an explicit witness that B_12 is outside this injection image.

Thus the source statement that the bi-product operator space cannot be reduced to imaginary O multiplication is represented below the English label.

## Remaining L-SSC-127 surface

This is not yet the complete frozen item.

Still open is the exact identification of the 28-dimensional bi-product operator algebra with `so(8)`:

- metric-skew endomorphism semantics;
- faithful operator representation;
- commutator/Lie-bracket closure;
- all-and-only reconstruction of the skew endomorphism algebra.

Those will be rendered separately rather than treating `so(8)` as an opaque leaf.

The ordinary-O source inconsistency remains preserved; this artifact uses the exact frozen table and does not repair it.
