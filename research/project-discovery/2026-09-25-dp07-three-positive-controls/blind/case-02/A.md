# Anonymous case 02A semantic sidecar

Variables take values in a two-element domain {F,T}. Each constraint selects a finite subset of variables and a target parity r in {F,T}.

A constraint is satisfied when the parity-combination of the selected assigned values equals r.

The whole system is satisfied exactly when every constraint is satisfied.

For the binary operation ⊕:
```text
F⊕F=F
F⊕T=T
T⊕F=T
T⊕T=F
```
