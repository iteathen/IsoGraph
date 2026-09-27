# PC-H implicit assertion closure 0.1 — Horn-form consistency control

**Status:** control-local exact implicit assertions
**Primitive premise:** `PC_H_PRIMITIVE_0_1.isg`
**Source premise:** `PC_H_SOURCE_FREEZE_0_1.md`

No assertion below is source-explicit.

## PC-H-IA-001 — witness-list order and duplication are semantically irrelevant

For a witness list `w`, source truth uses `w` only through membership:

```text
TRUE_w(x) IFF MEMBER(x,w).
```

Therefore any two witness lists with the same variable-membership extension give the same truth value to every source clause.

**Disposition:** ADMITTED EXACT.

## PC-H-IA-002 — the model family is closed under intersection

Let `M` and `N` be two satisfying assignment sets for one fixed instance.

Define:

```text
I = M intersection N.
```

Then `I` also satisfies every source clause.

### Proof

Assume a clause were false under `I`.

Then every BODY variable of that clause is in `I`, hence in both `M` and `N`.

If the clause has no HEAD, both `M` and `N` would therefore falsify it, contradiction.

If it has HEAD `h`, falsity under `I` means `h` is absent from at least one of `M,N`. That assignment contains every BODY variable but omits the HEAD and thus falsifies the clause, contradiction.

**Disposition:** ADMITTED EXACT.

## PC-H-IA-003 — a nonempty model family has a unique least assignment set

The variable carrier is finite, hence the model family is finite.

If at least one model exists, intersect all models:

```text
M_min = intersection { M : M satisfies the instance }.
```

By repeated PC-H-IA-002, `M_min` is itself a model.

For every model `M`:

```text
M_min subseteq M.
```

Therefore the least model is unique as an assignment set.

### Accessibility firewall

This semantic definition does **not** supply a polynomial procedure: directly forming “the intersection of all models” could require access to the entire model family.

**Disposition:** ADMITTED EXACT.

## PC-H-IA-004 — one local headed clause forces its HEAD once its BODY is already forced

Let `F` be a set of variables known to occur in every satisfying assignment.

If:

```text
HEAD(c,h)
```

and every BODY variable of `c` is in `F`, then `h` occurs in every satisfying assignment.

### Proof

Every model contains all BODY variables. The first source satisfaction disjunct is therefore false. The clause can be true only through its HEAD disjunct, forcing `h`.

**Disposition:** ADMITTED EXACT.

## PC-H-IA-005 — a headless clause whose BODY is forced is an exact rejection invariant

If every BODY variable of a headless clause `c` occurs in every satisfying assignment, then no satisfying assignment exists.

### Proof

The HEAD disjunct is unavailable and no BODY variable can be absent, so the source clause cannot be satisfied.

**Disposition:** ADMITTED EXACT.

## PC-H-IA-006 — define the local consequence expansion

For a variable set `F`, define:

```text
EXPAND(F)
=
F
union
{
  h :
    exists c:
      HEAD(c,h)
      AND
      every BODY variable of c is in F
}.
```

This is a derived construction over the exact source BODY/HEAD tuples.

From PC-H-IA-004:

```text
F subseteq every model
    ->
EXPAND(F) subseteq every model.
```

**Disposition:** ADMITTED EXACT.

## PC-H-IA-007 — repeated expansion is monotone and reaches a fixed point after at most n strict additions

Start:

```text
F_0 = empty.
```

Iterate:

```text
F_(i+1)=EXPAND(F_i).
```

Then:

```text
F_i subseteq F_(i+1).
```

Every strict change adds at least one previously absent variable.

There are at most `n` distinct variables occurring in a variable list of length `n`.

Therefore a fixed point `F_*` is reached after at most `n` strict-growth stages.

**Disposition:** ADMITTED EXACT.

## PC-H-IA-008 — the fixed point is contained in every satisfying assignment

```text
for every model M:
    F_* subseteq M.
```

### Proof

Base: `F_0=empty subseteq M`.

Step: PC-H-IA-006 preserves the “contained in every model” property.

Induct over the finite expansion sequence.

**Disposition:** ADMITTED EXACT.

## PC-H-IA-009 — if no forced headless clause is violated, the fixed point itself is a model

Assume there is no headless clause whose entire BODY is contained in `F_*`.

Take any source clause `c`.

- If some BODY variable is absent from `F_*`, the first source disjunct satisfies `c`.
- Otherwise every BODY variable is in `F_*`.
  - The clause cannot be headless by the assumption.
  - Let `HEAD(c,h)`. Fixed-point closure under EXPAND forces `h in F_*`, so the HEAD disjunct satisfies `c`.

Thus every clause is satisfied.

**Disposition:** ADMITTED EXACT.

## PC-H-IA-010 — exact decision criterion

```text
the instance is satisfiable
IFF
no headless clause has BODY subseteq F_*.
```

### Forward

If a violating headless clause existed, PC-H-IA-005 and PC-H-IA-008 would reject every model.

### Reverse

PC-H-IA-009 makes `F_*` a model.

**Disposition:** ADMITTED EXACT.

## PC-H-IA-011 — the fixed point equals the semantic least model when a model exists

If the instance is satisfiable:

- PC-H-IA-008 gives `F_* subseteq M_min`;
- PC-H-IA-009 makes `F_*` itself a model;
- leastness of `M_min` gives `M_min subseteq F_*`.

Hence:

```text
F_*=M_min.
```

This derives the semantic least model through a local construction rather than enumerating all models.

**Disposition:** ADMITTED EXACT.

## PC-H-IA-012 — the fixed point and rejection test are polynomially constructible

Each expansion stage can be implemented by finite scans of:

- the explicit clause list;
- explicit BODY tuples;
- explicit HEAD tuples;
- the current finite membership set.

There are at most `n` strict-growth stages.

A deliberately naive repeated scan is already polynomial in the explicit input size.

The final headless-clause test is another finite scan.

**Disposition:** ADMITTED EXACT.

## PC-H-IA-013 — a canonical source witness is polynomially constructible on YES instances

When the instance is satisfiable, represent `F_*` as a duplicate-free witness list in the order induced by the first occurrences in `VL`.

Its length is at most `n`.

By PC-H-IA-009 it satisfies the source formula.

Thus:

```text
H(x)={canonical_list(F_*)}
```

is a polynomially constructible singleton hitting set for this control family.

**Disposition:** ADMITTED EXACT.

**Campaign connector:** T3 recovered.

## PC-H-IA-014 — a constructible NO certificate is exposed by the same closure

On a NO instance, PC-H-IA-010 yields a headless clause `c` such that:

```text
BODY(c) subseteq F_*.
```

The finite expansion trace establishes that every variable in `F_*` is forced in every model.

Therefore the pair:

```text
(expansion trace, violating headless clause)
```

is an exact polynomially constructible rejection witness.

**Disposition:** ADMITTED EXACT.

**Campaign connector:** T5 recovered.

## Falsifier PC-H-F1 — the all-false assignment is not universally sufficient

One empty-BODY headed clause:

```text
HEAD(c,h)
```

forces `h` true.

The all-false assignment fails.

## Falsifier PC-H-F2 — the all-true assignment is not universally sufficient

One headless clause with BODY `{x}` is satisfied only when `x` is false.

The all-true assignment fails.

## Falsifier PC-H-F3 — source satisfaction is not upward-monotone in assignment inclusion

For the headless BODY `{x}` clause:

```text
empty assignment = satisfying
{x}              = rejecting.
```

So adding true variables can destroy truth.

## Falsifier PC-H-F4 — source satisfaction is not downward-monotone in assignment inclusion

For the empty-BODY headed clause requiring `h`:

```text
{h}   = satisfying
empty = rejecting.
```

So removing true variables can destroy truth.

## Falsifier PC-H-F5 — semantic leastness alone is not the polynomial construction

PC-H-IA-003 defines `M_min` as an intersection of all models.

That definition may quantify over exponentially many assignments.

The polynomial result depends on PC-H-IA-004 through PC-H-IA-012: local forced consequences plus a polynomial rank bound on strict additions.

## Classification

Intersection closure, least-model semantics, and local consequence saturation are **STANDARD_KNOWN_CONSEQUENCE** for this Horn-form control.

Their primitive/NEI/accessibility decomposition is **NEW_TO_CURRENT_ISOGRAPH_CAMPAIGN** only.
