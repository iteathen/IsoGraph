# W Euclidean HP1 Homogeneous Coordinates Source Instance 0.1

**Status:** W-TRACK SOURCE-LOCAL NATIVE INSTANCE  
**Source target:** W-SSC-053 / W01 Appendix A.3.3

This instance gives the exact homogeneous-coordinate quotient underlying the existing Euclidean base carrier.

For source quaternions `u,v`, not both zero:

```text
[u:v]_H -> base point.
```

The finite chart is

```text
[u:v] -> u v^{-1}
```

when `v != 0`.

The infinity chart is

```text
[u:0] -> infinity
```

for `u != 0`.

The inverse relation uses the exact two-sided quaternion inverse 998141.

## Right-scalar equivalence

998211 defines homogeneous equivalence exactly by a nonzero right quaternion scalar:

```text
(u,v) ~ (u r, v r),  r != 0.
```

The instance requires:

- every nonzero homogeneous pair maps to exactly one base point;
- every base point has a homogeneous representative;
- two nonzero pairs map to the same base point iff they are right-scalar equivalent.

Thus the existing W023 `H plus infinity` carrier is now an exact homogeneous quaternionic projective-line quotient, not only a one-point chart.

No topology, smooth structure, or metric on HP1 is added.
