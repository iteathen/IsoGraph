# BT01 Local Projective Alignment 0.1

**Status:** SCOPED LOCAL REPRESENTATION ALIGNMENT — PRE-SEAL / NOT PROGRAM EQUIVALENCE  
**Native certificate graph:** BT01_LOCAL_PROJECTIVE_ALIGNMENT_0_1.isg

## Inputs

The alignment uses only already independently represented material:

### Woit
- source action instance: V_C = Hom(S_R,S_L);
- exact Euclidean 2x2 matrix representation;
- local Grassmannian graph reconstruction;
- projective twistor line P(G_x) inside PT.

### Lisi
- real quaternionic source action;
- exact coefficient transport into quaternion multiplication;
- convention-preserving positive-spinor tilde map;
- Pauli/complex matrix representation;
- 187500-compatible complex-structure presentation.

The explicit Lisi-to-Woit source citation is not required for the construction.

## Pinned local comparison view

Choose the already-established source representation maps so that:

~~~text
parameter:
    x <-> v

input chirality:
    s_R <-> psi

output chirality:
    s_L <-> tilde(chi)
~~~

and use the coefficient-for-coefficient matrix equality:

~~~text
rho_W(x) = rho_L(v).
~~~

Then the source action equations become the same local matrix equation:

~~~text
s_L = rho_W(x) s_R

tilde(chi) = rho_L(v) psi.
~~~

Under the pinned coordinate maps these define the same graph plane:

~~~text
G = { (z, rho(x) z) } subset C2 + C2.
~~~

## Projective consequence

The graph G is a complex two-plane.

Therefore:

~~~text
P(G) = CP1
~~~

inside:

~~~text
P(C2 + C2) = CP3.
~~~

Since the graph plane is the same in the comparison view, projectivization gives the same local incidence line.

This is stronger than saying the two constructions are abstractly isomorphic: under the pinned local representations, the incidence subsets coincide.

## Native certificate roles

| ID | Role |
|---|---|
| 192001 | Woit local graph view |
| 192002 | Lisi transported graph view |
| 192003 | parameter representation mapping |
| 192004 | input-chiral mapping |
| 192005 | output-chiral/tilde mapping |
| 192006 | action equality witness |
| 192007 | Woit graph reconstruction |
| 192008 | neutral projective incidence support |
| 192009 | aligned local projective line |
| 192010 | Woit residual package |
| 192011 | Lisi residual package |

## Residuals intentionally preserved

### Woit residual
- global Gr(2,T)/HP1 organization;
- CP3 -> HP1 fibration;
- pseudoreal twistor structure;
- physical spacetime/internal interpretation.

### Lisi residual
- Clifford square relation;
- division-algebra conjugation;
- generalized reflections;
- triality;
- magic-square/exceptional extensions.

The scoped local alignment does not identify these residuals.

## Current result

~~~text
exact parameter matrix alignment:
    PASS

typed chiral action alignment:
    PASS

local graph-plane alignment:
    PASS under pinned representation view

local projective CP1 incidence alignment:
    PASS under pinned representation view

global Woit-Lisi theory isomorphism:
    NOT CLAIMED

post-seal NEI/DP:
    NOT YET RUN
~~~

## Falsifier boundary

This result would be invalidated if:
- the positive-spinor tilde representation map is not bijective/source-faithful;
- the complex-structure transport changes the action equation;
- the Woit graph chart is used outside its transverse domain without transition data;
- a residual is silently promoted into the common core.

None of those are assumed away here.
