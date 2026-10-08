# BT01 Dimension and Reality Check 0.1

**Status:** PARTIAL PASS / CONVENTION MAPPING REMAINS OPEN  
**Candidate:** BT01 quaternionic complex-structure lift

## Woit side

The Woit source family independently supplies:

~~~text
H identified with C2
H2 identified with C4
PT = CP3
S4 = HP1
fiber = CP1.
~~~

W05 also supplies the quaternionic/pseudoreal twistor structure:
- multiplication by j gives the antilinear twistor real structure;
- it squares to -1 on C2 coordinates;
- it squares to +1 on projective lines;
- it has no fixed points on CP1.

Therefore the dimension package required by the quaternionic lift is source-supported on Woit.

## Lisi side

L05's quaternionic case uses:
- a four-real-dimensional quaternion carrier;
- real vector and real chiral-spinor roles of the same coefficient dimension;
- Cl(0,4) representative matrices from the quaternion multiplication table.

Choosing a compatible complex structure on H gives the standard real-to-complex conversion:

~~~text
H : 4 real dimensions = 2 complex dimensions.
~~~

Thus:

~~~text
H + H : 8 real dimensions = 4 complex dimensions.
~~~

and the graph of fixed quaternionic left multiplication has:

~~~text
4 real dimensions = 2 complex dimensions.
~~~

This is the correct dimension pattern for:

~~~text
CP3 ambient projectivization
CP1 graph projectivization.
~~~

## Important convention issue

Lisi's dual incidence relation uses the represented positive-chiral division element with a conjugation/tilde convention.

The correct complex structure must therefore be attached to the represented chiral carrier, not inferred from the symbol chi alone.

This convention matching is not yet native-closed.

## Disposition

~~~text
Woit 2C / 4C dimensions:
    SOURCE-SUPPORTED

Lisi quaternionic 4R carriers:
    SOURCE-SUPPORTED

4R -> 2C compatible-complex conversion:
    MATHEMATICALLY VALID / native schema pending

CP1-in-CP3 dimension pattern:
    PASSES CONDITIONALLY

exact reality/chirality convention map:
    OPEN
~~~

There is no dimension obstruction at BT01. The remaining risk is the source-specific real/chiral structure, not raw dimension.
