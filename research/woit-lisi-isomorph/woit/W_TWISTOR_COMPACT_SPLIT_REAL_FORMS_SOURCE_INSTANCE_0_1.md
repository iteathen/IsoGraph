# W Twistor Compact / Split Real-Form Source Instance 0.1

**Status:** W-TRACK SOURCE-LOCAL NATIVE INSTANCE  
**Source targets:** W-SSC-051, W-SSC-092

This instance supplies the two real-form structures not already covered by W014 (Minkowski SU(2,2)-role) and W053 (Euclidean SL(2,H)-role).

## Ordinary conjugation and split real form

999100 is exact componentwise complex conjugation on the exact twistor carrier (T=C4), pinned by fixing the four exact source basis vectors.

999150 is its fixed real carrier:

```text
T_R = { t in T | conj(t)=t }.
```

It is an exact four-dimensional real vector space.

999160–999166 provide the split source group/action package: an exact complex-linear action commuting with ordinary conjugation and restricting to an exact action on (T_R).

This is the load-bearing SL(4,R)-role real structure.

## Positive-Hermitian compact real form

999120 is an exact Hermitian form on (T) with basis signature

```text
(+,+,+,+).
```

999130–999135 provide an exact source group/action preserving this form, together with its induced projective action.

This is the load-bearing SU(4)-role real structure.

## Boundary

The four-real-form family is governed by `W_TWISTOR_FOUR_REAL_FORMS_BOUNDARY_0_1.json`.

The exact fixed/signature/action behavior is authoritative. Explicit determinant-one matrix normalization, common parent-group embeddings, and Spin covering topology are intentionally outside this boundary for W051/W092.
