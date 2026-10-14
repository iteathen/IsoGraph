# L05 Typed Coefficient Roles Source Instance 0.1

**Status:** SOURCE-LOCAL NATIVE ROLE/COEFFICIENT REPRESENTATION / PRE-SEAL  
**Native:** `LISI_L05_TYPED_COEFFICIENT_ROLES_SOURCE_INSTANCE_0_1.isg`  
**Frozen target:** `L-SSC-128`

## Source structure

L05 represents, for each ordinary or split composition-algebra case, three typed roles:

~~~text
V
Q_minus
Q_plus
~~~

with coefficient carriers of the same represented real dimension.

This artifact keeps those role carriers **distinct**. It does not infer that structural isomorphism means identity.

For each of:

~~~text
C, C', H, H', O, O'
~~~

it supplies:

- one source-vector role carrier;
- one negative-chiral role carrier;
- one positive-chiral role carrier;
- exact 2/4/8-element bases;
- exact linear bijections into the corresponding L05 coefficient algebra.

## Positive-spinor tilde convention

The vector and negative-chiral bases map directly:

~~~text
v_a   -> e_a
m_a   -> e_a
~~~

The positive-chiral basis is transported through the source conjugation:

~~~text
p_a   -> KAPPA(e_a).
~~~

Thus the tilde/conjugated basis convention is represented in the map itself rather than erased by an informal identification.

## Six source cases

- **C**: coefficient carrier 214000; V 218000; Q_minus 218020; Q_plus 218040; maps 218060/218061/218062.
- **Cprime**: coefficient carrier 214100; V 218100; Q_minus 218120; Q_plus 218140; maps 218160/218161/218162.
- **H**: coefficient carrier 189200; V 218200; Q_minus 218220; Q_plus 218240; maps 218260/218261/218262.
- **Hprime**: coefficient carrier 214200; V 218300; Q_minus 218320; Q_plus 218340; maps 218360/218361/218362.
- **O**: coefficient carrier 214300; V 218400; Q_minus 218420; Q_plus 218440; maps 218460/218461/218462.
- **Oprime**: coefficient carrier 214400; V 218500; Q_minus 218520; Q_plus 218540; maps 218560/218561/218562.

## Boundary

This artifact represents role/coefficient structure only.

It does not claim:

- that the three roles are naturally identical;
- a triality automorphism;
- a Clifford action;
- a physical generation interpretation;
- cross-author equivalence.

The ordinary-octonion source inconsistency remains elsewhere in the L05 source graph; no repair is used here.
