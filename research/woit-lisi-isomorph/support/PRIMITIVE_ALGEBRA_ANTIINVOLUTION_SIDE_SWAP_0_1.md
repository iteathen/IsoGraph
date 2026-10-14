# Primitive Algebra Anti-Involution / Side-Swap Schema 0.1

**Status:** RESEARCH-LOCAL BT01/B06 SUPPORT
**Native:** PRIMITIVE_ALGEBRA_ANTIINVOLUTION_SIDE_SWAP_0_1.isg

188000 represents a unital associative algebra with a linear involution KAPPA satisfying multiplication-order reversal:

~~~text
KAPPA(x y) = KAPPA(y) KAPPA(x).
~~~

188001 records the exact side-swap consequence:

~~~text
KAPPA( u KAPPA(x) ) = x KAPPA(u)
KAPPA o L_u o KAPPA = R_KAPPA(u).
~~~

188002 specializes to elements with KAPPA(u)=-u, as for imaginary quaternion units.

This closes the algebraic connection between left- and right-multiplication complex-structure families. It does not establish that source chiral/physical roles may be exchanged; that remains an NEI/reconstruction obligation.

KAPPA here is algebra conjugation. It is not complex conjugation and not Woit's pseudoreal twistor map.
