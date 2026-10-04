# BT01 Chiral Clifford Extension Candidate 0.1

**Status:** STRONGER REFINEMENT CANDIDATE — LISI SOURCE-EXPLICIT / WOIT SOURCE-DERIVED

## Lisi source

L05 explicitly gives, for its usual Cl(0,n) minus convention,

~~~text
Gamma_L(v)
=
[ 0          -tilde(v) ]
[ v           0        ]
~~~

on the negative/positive chiral pair and states the Clifford identity. For n=4 this is its quaternionic Cl(0,4) vector representation.

## Woit source-local derivation

W01 independently gives:
- Euclidean x as the same quaternion/Pauli 2x2 matrix;
- |x|^2=det(x)=x conjugate(x);
- S_R and S_L;
- x in Hom(S_R,S_L).

W02 uses the same vector-matrix identification in the Euclidean Dirac operator and explicitly discusses a Clifford algebra basis element in the distinguished direction.

These source structures canonically give the derived block operator

~~~text
Gamma_W(x)
=
[ 0          -x^dagger ]
[ x           0        ]
~~~

on S_R + S_L.

For the Euclidean quaternion matrix representation,

~~~text
x^dagger x = x x^dagger = |x|^2 I,
~~~

hence

~~~text
Gamma_W(x)^2 = -|x|^2 I.
~~~

This is the Cl(0,4) square relation with Q(x)=-|x|^2.

The full block packaging is a standard mathematical consequence of Woit's source geometry, not an explicit Woit theory postulate.

## Comparison

The existing exact parameter representation gives

~~~text
x = rho(v)
x^dagger = rho(tilde(v)).
~~~

Therefore the Woit-derived block vector and Lisi's explicit Clifford vector coincide in the pinned quaternion/Pauli representation view.

The resulting bivectors generate the same chiral so(4)=su(2)+su(2) skeleton already independently exposed in the two sources.

## Remaining obligations

1. freeze the Woit derivation independently as an IA/source-mathematical consequence;
2. native-instantiate 195000 on both source packages;
3. route Q=-norm explicitly;
4. preserve Woit twistor/global and Lisi triality/exceptional residuals;
5. do not relabel the derived Woit packaging as source-explicit.

## Disposition

~~~text
Lisi chiral Cl(0,4):
    SOURCE-EXPLICIT

Woit chiral block:
    STANDARD DERIVATION FROM SOURCE DATA

block representation equality:
    STRONG CANDIDATE

cross-track Clifford isomorphism:
    NOT YET ADMITTED
~~~
