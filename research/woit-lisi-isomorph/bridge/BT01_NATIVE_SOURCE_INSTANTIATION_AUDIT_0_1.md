# BT01 Native Source Instantiation Audit 0.1

**Status:** PARTIAL PASS — BOTH SOURCE ACTION SKELETONS NOW NATIVE-INSTANTIATED
**Date:** 2026-10-03

## Woit

Native file:
`../woit/WOIT_BT01_SOURCE_INSTANCE_0_1.isg`

Direct source presentation:

~~~text
V_C = Hom(S_R,S_L)
A_W : V_C x S_R -> S_L
dim_C S_R = dim_C S_L = 2.
~~~

Disposition:

~~~text
187300 source instantiation:
    PRESENT

187600 chiral dimensions:
    PRESENT

global 187206/187207 twistor quotient:
    NOT YET ASSERTED
~~~

The global projective step is withheld because Woit's global geometry uses S_R subset T and S_L=T/S_R rather than one globally pinned direct-sum splitting.

## Lisi

Native file:
`../lisi/LISI_BT01_SOURCE_INSTANCE_0_1.isg`

Direct source presentation:

~~~text
V_R
Q_minus_R
Q_plus_R
A_L : V_R x Q_minus_R -> Q_plus_R
dim_R each carrier = 4.
~~~

Disposition:

~~~text
187200 source instantiation:
    PRESENT

187601 dimensions:
    PRESENT

complex 187500/187300 lift:
    NOT YET ASSERTED
~~~

The complex lift is withheld until the tilde/conjugation and Pauli representation are explicitly transported.

## Comparison consequence

The two native source instances now meet at different levels of the abstraction lattice:

~~~text
Woit:
    already in complex Hom presentation

Lisi:
    direct real quaternionic bilinear presentation.
~~~

The bridge transform is therefore correctly typed as a representation transport, not a literal identity of the original presentations.

## Remaining exact obligations

1. Lisi real-to-complex representation transport with the tilde convention preserved.
2. Woit local-splitting/global-Grassmannian reconstruction.
3. Map both transported presentations into the same 187500/187300 comparison view.
4. Reconstruct the projective incidence relation.
5. Preserve source residuals and run NEI only after track sealing.
