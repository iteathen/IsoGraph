# HJP holdout — sensitivity obstruction and T/U/L/C comparison 0.1

**Status:** derived exact result inside the pinned HJP/2026 source scope; novelty not asserted  
**Parent:** `HJP_NATURALIZATION_HOLDOUT_DP08_RUN_0_1.md`

## 1. Target convention

Use the HJP Section-4 target:

```text
F(x,y)
  =
OR over i in [s]
  AND over j in [m]
    (NOT x_(i,j) OR NOT y_(i,j))
```

with total input count:

```text
N = 2*s*m.
```

The holdout setting takes `s` and `m` on the order of `sqrt(N)`; the symmetric choice is `s = m = sqrt(N/2)` up to integer calibration.

The dual/complement notation in the 2026 paper is equivalent for the circuit-polarity separation, but this derivation stays in HJP's displayed Section-4 convention.

## 2. Exact sensitivity lemma

### Claim

For every input `z` such that:

```text
F(z) = 0,
```

the ordinary one-bit sensitivity satisfies:

```text
sens(F,z) <= 2*s.
```

### Proof

Write the row term:

```text
R_i
  =
AND over j
    C_(i,j)

C_(i,j)
  =
(NOT x_(i,j) OR NOT y_(i,j)).
```

If `F(z)=0`, then every row term `R_i(z)=0`.

Therefore every row `i` contains at least one false clause `C_(i,j)`. A clause is false exactly when:

```text
x_(i,j) = 1
AND
y_(i,j) = 1.
```

A one-bit flip can affect clauses in only one row.

For a flip in row `i` to change the full output from `0` to `1`, after that flip the row term `R_i` must become `1`. Hence before the flip row `i` must have had exactly one false clause. If the unique false clause is indexed by `j`, there are only two one-bit flips that can repair it:

```text
x_(i,j): 1 -> 0

or

y_(i,j): 1 -> 0.
```

Thus each row contributes at most two sensitive coordinates.

There are `s` rows, so:

```text
sens(F,z) <= 2*s.
```

QED.

## 3. Consequence at the holdout scaling

For `s = sqrt(N/2)`:

```text
2*s = sqrt(2*N).
```

Hence every zero-input has sensitivity:

```text
O(sqrt(N)).
```

The natural high-sensitivity property in the 2026 Appendix requires a large set of zero-inputs whose sensitivity is at least:

```text
(1 - 100*log(N)/sqrt(N)) * N/2.
```

For sufficiently large `N`, that threshold is `Theta(N)`.

Therefore the HJP Section-4 target cannot satisfy that natural property for sufficiently large `N`.

This gives an exact reason for the source statement that the known natural property “does not apply” to the holdout target.

## 4. T/U/L/C comparison

For a candidate natural property `Psi`, record:

- `T`: HJP holdout target satisfies `Psi`;
- `U`: `Psi` is useful at `2^(Omega(sqrt(N)))` Pi-3 lower-bound strength;
- `L`: `Psi` is large on the relevant random-function distribution;
- `C`: `Psi` is AC0-constructive from the truth table.

### A. Exact target identity / exact block-structure property

A trivial property recognizing exactly the HJP target or its exact block presentation has:

```text
T = YES
U = YES
L = NO
C = YES
```

`U` follows because the pinned HJP theorem proves the target's hard-side lower bound.

`C` is trivial for equality to one fixed truth table/block target at truth-table input scale.

`L` fails maximally: a fixed target identity property accepts a vanishingly small fraction of all Boolean functions.

This is only a baseline, not a proposed natural proof.

### B. 2026 high-sensitivity / k-limit natural property

The 2026 source establishes:

```text
U = YES
L = YES
C = YES
```

for the displayed natural property, at `2^((1-o(1))*sqrt(N)/2)` general depth-3 lower-bound strength, which is already `2^(Omega(sqrt(N)))`.

The sensitivity lemma above establishes for the HJP Section-4 target:

```text
T = NO
```

for sufficiently large `N`.

Therefore:

```text
(T,U,L,C)
  =
(NO, YES, YES, YES)
```

for this known neighboring natural property relative to the HJP holdout target.

## 5. Sharpened naturalization gap

The source-level open question can now be expressed more tightly.

The known natural property is **not too weak** asymptotically for the holdout objective.

It already supplies `U`, `L`, and `C`.

Its failure is target acceptance:

```text
T.
```

Conversely, the target-specific property trivially supplies `T`, `U`, and `C`, but fails `L`.

So the current interpolation is:

```text
specific endpoint:
    (T,U,not-L,C)

natural endpoint:
    (not-T,U,L,C)
```

The missing property must preserve the already-achievable `U` and `C` while simultaneously satisfying:

```text
T AND L.
```

This is a sharper decomposition than treating all four natural-proof obligations as equally unresolved.

## 6. First-consumer interpretation

Why does the high-sensitivity natural property miss the target?

The HJP target is designed around **pair/block structure**, and its hard-side proof preserves that structure through a paired restriction.

At zero-inputs, this same block structure sharply limits ordinary one-bit sensitivity to at most `2s`.

Thus the target-specific semantic structure that makes the HJP restriction useful is in direct tension with the particular high-one-bit-sensitivity property used by the neighboring natural proof.

This does not prove that target acceptance and largeness are fundamentally incompatible.

It proves only that **this known natural interpolation coordinate fails exactly at T**.

## 7. Candidate search consequence

Do not spend the next pass attempting to strengthen the known high-sensitivity bound.

Its lower-bound strength `U` is already sufficient asymptotically.

Instead search for a different large/constructive property compatible with the target's block semantics.

Candidate properties should be tested in this order:

```text
T — does the HJP target actually satisfy it?
L — is it large?
C — is it AC0-constructive?
U — does it still imply the needed limit/lower-bound structure?
```

This ordering avoids repeating the already-falsified high-sensitivity route.

## 8. Novelty boundary

The 2026 paper explicitly states that its known natural property does not apply to the holdout.

The exact sensitivity bound:

```text
zero-input sensitivity <= 2*s
```

and the resulting localization of the known natural property's failure to `T` are derived here from the pinned HJP target definition.

This file does **not** claim that the observation is absent from all prior literature.

It is new to the current IsoGraph corpus unless an earlier source is later found.

No new circuit lower bound and no naturalization of the holdout is claimed.
