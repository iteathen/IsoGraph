# U1 Triality Finite-Transport Audit 0.1

**Status:** FINITE ALGEBRAIC RESULT — ROLE-PRESERVING TRANSPORT REJECTED  
**Parent:** U1.1-TR global audit  
**Track-L input:** `../lisi/LISI_L05_QUATERNION_TRIALITY_SOURCE_INSTANCE_0_1.isg`  
**Woit input:** `../woit/WOIT_HP1_PROJECTIVE_CONVENTION_TRANSFORM_0_1.isg`  
**Falsifier:** `UNIFICATION_U1_TRIALITY_FINITE_TRANSPORT_FALSIFIER_0_1.json`

## Question

The U1.1 global extension was already rejected at the compactification patch.

This audit resolves the narrower finite-chart QU:

> Does the source-specific quaternionic L05 triality tensor survive the exact W01 <-> W05 conjugation/side-swap transport without changing the source chiral roles?

## 1. Source triality is now native on the quaternionic slice

Track L now independently renders:

~~~text
T(v,psi,chi)
    = (tilde(chi), v psi)
~~~

together with the canonical order-three role cycle:

~~~text
(v,psi,chi)
    -> (psi,chi,v).
~~~

No Woit cross-reference is used to obtain that result.

## 2. Coefficient form

For ordinary quaternions, with KAPPA the source anti-involution,

~~~text
(tilde(chi), v psi)
    = Re(chi v psi).
~~~

Therefore:

~~~text
T(v,psi,chi)
    = Re(chi v psi).
~~~

Cyclicity is the source identity:

~~~text
T(v,psi,chi)
 = T(psi,chi,v)
 = T(chi,v,psi).
~~~

## 3. Exact conjugation law

Quaternion conjugation reverses product order.

Applying KAPPA to all three raw source coefficient roles gives:

~~~text
T(KAPPA(v), KAPPA(psi), KAPPA(chi))
    = T(v, chi, psi).
~~~

Thus conjugation is not an orientation-preserving symmetry of the typed triality tensor.

It exchanges the two chiral arguments.

Equivalently, composing conjugation with an explicit exchange of the two chiral roles gives:

~~~text
T(KAPPA(v), KAPPA(chi), KAPPA(psi))
    = T(v, psi, chi).
~~~

This is exact for the quaternionic source presentation.

## 4. Exhaustive basis falsifier

The repository falsifier checks all 4^3 = 64 triples of quaternion basis elements.

Result:

~~~text
cyclicity failures:
    0

conjugation-law failures:
    0

conjugation + chiral-role-swap invariance failures:
    0
~~~

The finite computation corroborates the algebraic derivation; it is not used as a replacement for it.

## 5. Comparison with the W01 -> W05 projective transform

The established Woit convention transform is:

~~~text
(q1,q2)
    = (KAPPA(s_perp), KAPPA(s))

q
    = KAPPA(Z).
~~~

For the U0 finite graph:

~~~text
s       = psi
s_perp  = tilde(chi)
Z       = v,
~~~

so:

~~~text
q1 = chi
q2 = KAPPA(psi)
q  = KAPPA(v).
~~~

This preserves the represented HP1 geometry and the graph incidence.

However, W05 presents q1 and q2 as homogeneous quaternionic coordinates. Its selected source treatment does not assign them W01's S_R/S_L chiral roles.

Therefore there are two distinct transport statements:

### A. Role-preserving transport

Keep the U0 source roles fixed and apply the anti-involution transport.

Then the oriented scalar tensor becomes:

~~~text
T(v,psi,chi)
    -> T(v,chi,psi).
~~~

Result:

~~~text
strict source-role-preserving triality invariance:
    FAIL
~~~

### B. Conjugation plus coherent chiral-role exchange

If the homogeneous-coordinate swap is additionally interpreted as:

~~~text
Q_minus <-> Q_plus
S_R     <-> S_L,
~~~

then the scalar triality tensor is exactly invariant.

Result:

~~~text
algebraic tensor transport with explicit chiral-role exchange:
    PASS
~~~

But that role assignment is not inherited from the W05 HP1 source presentation.

It would have to be recorded as a representation/synthesis choice rather than silently treated as source identity.

## 6. U1 disposition

The former single QU is now split:

~~~text
L05 quaternionic scalar triality:
    SOURCE-NATIVE CLOSED SLICE

canonical L05 role cycle:
    SOURCE-NATIVE CLOSED SLICE

finite conjugation law:
    PASS

finite conjugation + explicit chiral-role swap:
    PASS

strict role-preserving triality chart invariance:
    FAIL

W05 source authorization of the required chiral-role swap:
    ABSENT / QU

arbitrary L05 generalized-reflection transport:
    STILL OPEN
~~~

This does not change the U1.1 global rejection.

It strengthens the reason not to attach L-ALG triality to U1.0: even before the infinity obstruction, the full typed triality tensor is not invariant under the Woit convention transform while preserving the frozen chiral roles.

## 7. Conservative boundary

No new U-edge is admitted.

A future candidate may deliberately add a coherently role-swapped representation transport, but it must be explicitly classified and falsified.

The current minimal conservative amalgam remains U1.0-PC.
