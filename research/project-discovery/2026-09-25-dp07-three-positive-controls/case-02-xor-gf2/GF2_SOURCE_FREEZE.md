# Case 02B — linear equations over GF(2) source freeze

**Status:** FROZEN
**Pair mapping consulted during rendering:** no

```text
variables y_i over GF(2)={0,1}
assignment y
equation row E_j has coefficients a_ji in GF(2) and RHS c_j
E_j satisfied iff sum_i a_ji y_i = c_j in GF(2)
system satisfied iff every equation row is satisfied
```

Independent source anchors:

- https://ocw.mit.edu/courses/18-413-error-correcting-codes-laboratory-spring-2004/resources/gf2/
- https://www.cs.cmu.edu/afs/cs.cmu.edu/academic/class/15750-s22/www/notes/recitation1.pdf

Local reconstruction roles:

```text
4100 system
4110 variable family
4111 GF(2) element domain
4112 assignment
4113 equation-row family
4114 nonzero coefficient/variable incidence
4115 right-hand side
4116 finite GF(2) sum
4117 equation satisfaction
4118 all-equations satisfaction
```
