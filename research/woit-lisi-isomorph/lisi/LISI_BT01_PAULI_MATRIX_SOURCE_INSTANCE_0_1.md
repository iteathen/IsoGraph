# Lisi BT01 Pauli Matrix Source Instance 0.1

**Status:** SOURCE-LOCAL NATIVE COMPLEX-MATRIX REPRESENTATION  
**Native:** LISI_BT01_PAULI_MATRIX_SOURCE_INSTANCE_0_1.isg  
**Source:** L05 quaternionic sp(3)/Cl(0,4) Pauli representation

## Independent complex scalar carrier

198100 is a Lisi-local algebraic complex field carrier.

198107 embeds the existing Lisi real scalar carrier 189100 into it. No Woit scalar object is imported.

198108 is the source imaginary unit i with i²=-1.

## Exact M2(C) presentation

198120 instantiates finite matrix-algebra schema 198000 with matrix-unit basis:

~~~text
E11,E12,E21,E22.
~~~

This gives exact 2x2 matrix multiplication without using the word "matrix" as hidden semantics.

## Pauli elements

The source Pauli matrices are constructed algebraically:

~~~text
sigma0 = I = E11+E22
sigma1 = E12+E21
sigma2 = -i E12 + i E21
sigma3 = E11-E22.
~~~

The source quaternion basis representation is then:

~~~text
e0 = sigma0
e1 = -i sigma1
e2 = -i sigma2
e3 = -i sigma3.
~~~

These are represented by 198126 and 198150–198152.

## Quaternion-to-matrix representation

198141 is a real-linear injection from source quaternion carrier 189200 into the real scalar restriction of M2(C).

It maps:

~~~text
1 -> e0
i -> e1
j -> e2
k -> e3
~~~

and the native multiplication-preservation clause requires:

~~~text
rho(xy)=rho(x)rho(y).
~~~

Thus the source representation is an algebra representation, not only a basis-label correspondence.

## Closure consequence

~~~text
L-A0-033 Pauli basis formula:
    CLOSED_SCHEMA_SOURCE_INSTANCE

L-A0-034 quaternionic entries -> complex matrix representation:
    CLOSED_SCHEMA_SOURCE_INSTANCE
~~~

No Woit object is used to obtain this closure.
