# P vs NP IsoGraph campaign — checkpoint 0.7

**Branch:** `research/p-vs-np-isograph-20260926`  
**Status:** structured-set certificate route falsified in its entropy-only form

## New exact negative result

For the HJP holdout target, define the zero-side subcube fixing one false pair in every row:

```text
x_(i,1)=y_(i,1)=1
for every row i.
```

It has:

```text
size    = 2^(N-2s)
entropy = N-2s
```

with deficit `Theta(sqrt(N))`.

Every coordinate set capable of repairing any HJP row must touch at least one of those frozen coordinates.

Therefore every target-repair-capable set has a length-0 certificate.

So:

```text
high entropy alone
    cannot guarantee
target-aligned certificate-free/full-support sets
```

at the required HJP scale.

The previous `MW-STRUCT` bridge is falsified.

## New target geometry

For every HJP zero input:

```text
block sensitivity = 2s = Theta(sqrt(N)).
```

But the number of minimal sensitive blocks is:

```text
sum_i 2^(t_i),
```

and can be `s*2^m` at the all-ones input.

Thus the target has:

```text
low disjoint sensitivity
+
high overlapping medium-radius repair multiplicity.
```

## Revised next hinge

Do not search for an entropy-only structured version of Meir–Wigderson Theorem 1.13.

The next candidate must use additional target-compatible support, such as:

- anti-freezing/expansion under circuit-induced conditioning;
- a property measuring structured repair multiplicity;
- or a weaker consumer than full support that still yields k-limits.

## Authority

No new circuit lower bound.

No naturalization of the HJP holdout.

No AC0-natural barrier escape.

No P-vs-NP theorem.

No qualified IsoGraph authority changed.
