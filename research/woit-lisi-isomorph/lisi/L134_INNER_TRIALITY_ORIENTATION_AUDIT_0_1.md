# L134 Inner-Triality Matrix Orientation Audit 0.1

**Status:** SOURCE ORIENTATION DISCREPANCY / CONVENTION INVERSION  
**Frozen target:** `L-SSC-134`  
**Source:** L05 §4.2

L05 gives both:

1. a textual canonical basis cycle

~~~text
gamma_a -> Qminus_a -> Qplus_a -> gamma_a
T_M     -> T_V      -> T_P       -> T_M
~~~

and

2. an explicit inner-automorphism matrix

~~~text
g_t = [[0,0,1],
       [1,0,0],
       [0,1,0]]

A' = g_t A g_t^{-1}
~~~

for the source matrix

~~~text
A = [[M,          -kappa(v),   psi],
     [v,           P,         -kappa(chi)],
     [-kappa(psi), chi,        V]]
~~~

Direct finite matrix conjugation gives:

~~~text
A' = [[V,          -kappa(psi), chi],
      [psi,         M,          -kappa(v)],
      [-kappa(chi), v,           P]]
~~~

so the **coordinate** transport is

~~~text
(M,P,V,v,psi,chi)
    -> (V,M,P,psi,chi,v).
~~~

Therefore the induced **basis** cycle is the inverse orientation:

~~~text
gamma  -> Qplus -> Qminus -> gamma
T_M    -> T_P   -> T_V    -> T_M.
~~~

Both cycles have order three. The issue is orientation, not failure of triality.

## Disposition

Do not silently replace either source statement.

For L134 closure:

- preserve the textual generator cycle;
- preserve the printed matrix and its exact conjugation action;
- record that the printed `g_t` realizes the inverse triality orientation relative to the textual basis-arrow convention;
- treat `g_t^{-1}` as the matrix realizing the stated arrow direction only as a derived diagnostic, not a source rewrite.

This is source-local evidence and uses no Woit or synthesis semantics.
