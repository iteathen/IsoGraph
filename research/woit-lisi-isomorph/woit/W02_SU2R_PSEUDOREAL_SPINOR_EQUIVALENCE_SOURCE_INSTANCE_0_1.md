# W02 SU(2)_R Pseudoreal Spinor Equivalence Source Instance 0.1

**Status:** W-TRACK SOURCE-LOCAL NATIVE INSTANCE  
**Source target:** W-SSC-134 / W-A0-053

This instance supplies the previously missing representation-theoretic part of W02's statement that, on the Euclidean real slice, the right spinor and its conjugate become equivalent SU(2)_R representations.

## 1. Exact matrix action on S_R

945100 is the standard bilinear M2(C) action on the exact two-complex-dimensional source spinor carrier S_R.

It is pinned on the exact matrix units and source spinor basis:

```text
E11 e1 = e1     E11 e2 = 0
E12 e1 = 0      E12 e2 = e1
E21 e1 = e2     E21 e2 = 0
E22 e1 = 0      E22 e2 = e2
```

945101 restricts this action to the corrected SU(2)_R source role 205131 and is instantiated as a complex-linear group representation.

## 2. Conjugate-spinor action

944110 is the already native conjugate-semilinear bijection

```text
S_R -> overline(S_R).
```

Its source basis is pinned by:

```text
e1 -> bar(e1)
e2 -> bar(e2).
```

945102 is the exact transported SU(2)_R action on the conjugate carrier:

```text
bar(g.v) = g_conj . bar(v).
```

It is itself instantiated as a complex-linear group representation on the conjugate carrier.

## 3. Pseudoreal intertwiner

945110 is a complex-linear bijection

```text
K : overline(S_R) -> S_R
```

with basis convention fixed by the same quaternionic-j / epsilon convention already used in the W source family:

```text
K(bar(e1)) = e2
K(bar(e2)) = -e1.
```

945120 is the exact identity bijection on the SU(2)_R group carrier.

Schema 188101 then requires exact action transport through K:

```text
K(g_conj . bar(v)) = g . K(bar(v)).
```

This is the explicit representation equivalence missing from the earlier W02 source instances.

## Boundaries

- No SU(2)_L role is inferred from this file.
- No physical/internal interpretation is added.
- No topology or smooth Lie-group structure is asserted.
- The corrected W02 group identity 204116=I is used throughout.
- No Lisi or cross-track semantics are premises.
