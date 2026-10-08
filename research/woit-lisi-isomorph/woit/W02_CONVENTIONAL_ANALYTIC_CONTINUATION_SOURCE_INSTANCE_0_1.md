# W02 Conventional Analytic-Continuation Source Instance 0.1

**Status:** W-TRACK SOURCE-LOCAL NATIVE INSTANCE  
**Source target:** W-SSC-129 / W-A0-048

This instance renders the conventional W02 analytic-continuation picture as an exact relation among two real forms of the same complex matrix carrier.

## Common complex carrier

The exact source carrier is `204110 = M2(C)`.

Two exact complex bases are asserted:

```text
Minkowski-derived basis:
I, sigma1, sigma2, sigma3

Euclidean-derived basis:
i I, sigma1, sigma2, sigma3.
```

Because each four-element set is an exact complex basis of the same four-complex-dimensional carrier, complexification of either real coordinate presentation yields the same complex spacetime carrier.

## Minkowski and Euclidean real slices

- Minkowski real carrier: 204130 with embedding 204151.
- Euclidean real carrier: 205100 with embedding 205111.

The embeddings pin:

```text
Minkowski: e0 -> I
Euclidean:  tau -> i I

spatial basis -> sigma1,sigma2,sigma3
```

## Wick / analytic-continuation map

948100 is an exact real-linear bijection:

```text
e0 -> tau
e1 -> e1
e2 -> e2
e3 -> e3.
```

948101 is the induced relation between the two embedded matrix slices.

Thus, inside the common complex carrier, only the time basis acquires the factor of (i).

## Real-form actions

The actual conventional complex action and the distinct source group real-form conditions remain those of corrected `W02_CONVENTIONAL_REAL_FORMS_SOURCE_INSTANCE_0_2.isg`:

- SL(2,C)_L x SL(2,C)_R on the complex carrier;
- conjugate-diagonal Lorentz real form;
- independent SU(2)_L x SU(2)_R Euclidean real form.

No identity between the Lorentz and Euclidean real groups is asserted.
