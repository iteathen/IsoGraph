# Case 03B — Hamiltonian phase-space oscillator source freeze

**Status:** FROZEN
**Pair mapping consulted during rendering:** no

```text
phase-space coordinates q(t), p(t)
m>0
k>0
H(q,p)=p^2/(2m)+kq^2/2
qdot=partial H/partial p=p/m
pdot=-partial H/partial q=-kq
```

Independent source anchors:

- https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/9579/sicm_edition_2.zip/chapter006.html
- https://math.mit.edu/~djk/calculus_beginners/chapter19/section03.html

Do not insert the Newton second-order equation into this rendering.

Local reconstruction roles:

```text
6100 model
6110 time domain
6111 q occurrence
6112 p occurrence
6113 q derivative
6114 p derivative
6115 Hamiltonian
6116 kinetic contribution
6117 potential contribution
6118 mass
6119 stiffness
6120 qdot relation
6121 pdot relation
```
