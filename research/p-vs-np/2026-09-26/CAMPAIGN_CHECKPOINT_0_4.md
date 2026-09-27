# P vs NP IsoGraph campaign — checkpoint 0.4

**Branch:** `research/p-vs-np-isograph-20260926`

## New derived result

For the HJP Section-4 target with `N=2*s*m`, every zero-input has one-bit sensitivity at most:

```text
2*s.
```

At `s=m≈sqrt(N/2)` this is `O(sqrt(N))`.

The neighboring 2026 AC0-natural property requires `Theta(N)` sensitivity on a large zero-input set.

Therefore the HJP holdout target provably fails that known natural property for sufficiently large `N`.

## Naturalization vector

Current endpoints:

```text
target-specific:
    (T,U,L,C) = (YES, YES, NO, YES)

known high-sensitivity natural property:
    (T,U,L,C) = (NO, YES, YES, YES)
```

The unresolved interpolation is specifically to recover `T AND L` while retaining `U AND C`.

## Significance

This does not solve the open naturalization problem.

It does remove one ambiguity: the known natural property is already strong enough as a lower-bound mechanism; its obstruction is incompatibility with the target, not insufficient lower-bound strength.

## Next hinge

Search for a target-compatible restriction/limit invariant that is simultaneously:

- large on uniform random functions;
- AC0-constructive;
- useful for the HJP holdout lower bound.

Keep all candidate properties QU until all four obligations are checked.
