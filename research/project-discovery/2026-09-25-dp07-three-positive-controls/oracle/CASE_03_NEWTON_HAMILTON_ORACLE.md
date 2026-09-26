# WITHHELD ORACLE — Case 03 Newton / Hamilton oscillator

**Do not expose to discovery.**

Exact-positive validation anchor:

- https://cs448j.stanford.edu/slides/casvc-slides-09-29-canonical-equations.pdf

Witness:

```text
p=m v=m qdot
pdot=m a=m qddot
```

Hamilton -> Newton:

```text
qdot=p/m
pdot=m qddot
pdot=-kq
=> m qddot+kq=0
```

Newton -> Hamilton after introducing `p=m qdot`:

```text
qdot=p/m
pdot=m qddot=-kq
```

Phase-space factorization is a coordinate/state representation, not an additional physical degree of freedom.
