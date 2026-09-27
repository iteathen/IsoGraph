# P versus NP NEI overlay 0.3 — existential-observable scope

**Status:** research successor  
**Predecessor:** `P_VS_NP_NEI_OVERLAY_0_2.isg`

## New query Q-EXISTS

Record:

`160009`

Carrier:

residual/prefix objects.

Question:

> For the fixed input, verifier, remaining bound and qualified QU state, do these two residuals have the same truth value for **existence of at least one accepting continuation**?

For residual (p), explanatory derived observable:

```text
E(p)
    :=
exists admissible suffix s:
    C_p(s).
```

The natural identity object in this scope is only this terminal existential observable.

Thus:

```text
Q-EXISTS SAME
    iff
E(p)=E(q).
```

This scope is intentionally coarser than `Q-RESIDUAL`, which preserves the entire continuation relation (C_p).

## QU

Continuation alternatives remain QU-mediated.

No result may discard a realization because it would change (E(p)) or (E(q)).

## Anti-circularity

A procedure cannot:

```text
want Q-EXISTS SAME
-> assume both residuals have / lack an accepting continuation
-> restrict QU accordingly
-> claim identity.
```

The observable must be derived from independently represented continuation semantics.

## Important limitation

Q-EXISTS is an identity scope for the terminal Boolean objective.

It is not automatically a congruence under appending the same next witness symbol.

Therefore it cannot replace Q-RESIDUAL in a local dynamic program unless an additional exact composition law is established.
