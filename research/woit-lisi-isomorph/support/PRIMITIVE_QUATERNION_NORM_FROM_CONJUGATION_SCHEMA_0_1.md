# Primitive Quaternion Norm from Conjugation Schema 0.1

**Status:** RESEARCH-LOCAL FINITE QUATERNION SUPPORT  
**Native:** PRIMITIVE_QUATERNION_NORM_FROM_CONJUGATION_SCHEMA_0_1.isg

Schema 195110 starts from exact quaternion presentation 193100 and makes the usual Euclidean norm/form explicit rather than leaving "quaternion norm" as a label.

It defines:

~~~text
N(x)=n
IFF
x KAPPA(x) = n * 1.
~~~

The symmetric bilinear form B is fixed by polarization:

~~~text
B(x,y)
 = 1/2 [ N(x+y)-N(x)-N(y) ].
~~~

The exact quaternion presentation guarantees 2 is nonzero; the field inverse relation supplies 1/2.

195110 also requires the resulting package to instantiate composition-algebra schema 185003, making norm multiplicativity and nondegeneracy explicit.

For BT01 this supplies the positive Euclidean quaternion norm needed before the Cl(0,4) sign reversal Q_Cl=-N.
