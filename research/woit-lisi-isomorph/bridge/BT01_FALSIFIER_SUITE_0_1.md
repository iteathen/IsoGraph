# BT01 Falsifier Suite 0.1

**Status:** DEDUCTIVE NEGATIVE CONTROLS — PRE-SEAL  
**Target:** BT01 quaternionic/chiral/projective bridge

The purpose is to test whether the current common core is structurally load-bearing rather than a loose analogy.

## F1 — remove the Cl(0,4) minus sign

Correct reverse action:

~~~text
Gamma_plus(v,p) = -KAPPA(v) p
Q_Cl(v) = -N(v).
~~~

Negative control:

~~~text
Gamma_plus_bad(v,p) = KAPPA(v) p.
~~~

Then:

~~~text
Gamma_plus_bad(v, Gamma_minus(v,m))
= KAPPA(v) v m
= N(v) m,
~~~

while 195000 requires:

~~~text
Q_Cl(v)m = -N(v)m.
~~~

For v=1 and any nonzero m, these differ whenever 2 != 0.

**Disposition:** REJECTED.

The minus sign is load-bearing.

---

## F2 — remove quaternion conjugation

Negative control:

~~~text
Gamma_plus_bad(v,p) = -v p.
~~~

Then:

~~~text
Gamma_plus_bad(v,Gamma_minus(v,m))
= -v^2 m.
~~~

This is not generally -N(v)m.

Explicit quaternion witness:

~~~text
v = 1+i
v^2 = 2i
N(v)=2.
~~~

So for m=1:

~~~text
-v^2 = -2i
!=
-2 = -N(v).
~~~

**Disposition:** REJECTED.

The anti-involution/conjugation is load-bearing.

---

## F3 — incoherent chirality swap

Current role map is selected by action orientation:

~~~text
S_R      <-> Q_minus
S_L      <-> Q_plus
Gamma_-  : input -> output.
~~~

Negative control:
swap Q_minus/Q_plus against S_R/S_L while leaving Gamma_- unchanged.

The mapped relation then has the wrong domain/codomain ownership and cannot instantiate the same typed action role.

A **coherent** simultaneous reversal using the source reverse action is not rejected; it is an allowed presentation change.

**Disposition:** INCOHERENT SWAP REJECTED; COHERENT DUAL ORIENTATION REMAINS EQUIVALENT CANDIDATE.

Thus the bridge depends on incidence orientation, not chirality names.

---

## F4 — collapse pseudoreal and ordinary-real structures

Negative control:
identify Woit's quaternionic/pseudoreal map with an ordinary real involution.

But the source-relevant structures satisfy different equations:

~~~text
pseudoreal carrier map:
    J^2 = -1

ordinary real involution:
    sigma^2 = +1.
~~~

Before projectivization these cannot be the same map in characteristic not 2.

Projectivization removes the scalar sign only at the quotient level.

**Disposition:** REJECTED.

The carrier-level distinction B03.Q versus B03.R is load-bearing.

---

## F5 — promote affine match to global HP1 identity

Negative control:
infer from the affine quaternionic equality

~~~text
Z=v in H
~~~

that Lisi also supplies Woit's complete:

~~~text
HP1 = H union {infinity}
CP3 -> HP1
~~~

global geometry.

No such source support exists in the current Lisi track.

**Disposition:** REJECTED BY SOURCE-COVERAGE / RESIDUAL ACCOUNTING.

The compactification point and global fibration remain Woit residuals.

---

## F6 — delete the positive-spinor tilde convention

Lisi's coefficient presentation uses the positive chiral carrier through a conjugated/tilde basis representation.

Negative control:
replace the output representation by an unconjugated coefficient map without an explicit transport.

That breaks the pinned source representation and invalidates the exact action-transport witness 188101, even if a later isomorphic presentation might exist.

**Disposition:** REJECTED AS SOURCE-UNFAITHFUL.

The tilde may be transported, but not silently deleted.

---

## Summary

| Control | Result | Load-bearing invariant |
|---|---|---|
| remove Clifford minus | FAIL | Cl(0,4) sign / negative quadratic form |
| remove conjugation | FAIL | quaternion anti-involution |
| incoherent chirality swap | FAIL | typed action orientation |
| pseudoreal = ordinary real | FAIL | square of real-structure map |
| affine = global HP1 | FAIL | global compactification/fibration residual |
| delete tilde convention | FAIL | source representation map |

The current bridge therefore does **not** survive deletion of its distinguishing relations.

That is evidence that the candidate lies above the trivial "same dimensions / both use spinors" abstraction level.
