# PC-G implicit assertion closure 0.1 — parity-system consistency control

**Status:** control-local exact implicit assertions
**Primitive premise:** `PC_G_PRIMITIVE_0_1.isg`
**Source premise:** `PC_G_SOURCE_FREEZE_0_1.md`

No assertion below is source-explicit. The algebraic laws are derived from the two-value Boolean carrier plus the exact four-tuple XOR relation in the primitive input.

## PC-G-IA-001 — witness-list order and duplication are semantically irrelevant to assignment membership

Source assignment truth is:

```text
X_w(x)=1 IFF MEMBER(x,w).
```

Thus witness lists with the same variable-membership extension induce the same equation truth values.

**Disposition:** ADMITTED EXACT.

## PC-G-IA-002 — XOR identity and self-cancellation

For each Boolean bit `a`:

```text
a XOR 0 = a

a XOR a = 0.
```

**Support:** exhaustive lookup in the four represented XOR tuples.

**Disposition:** ADMITTED EXACT.

## PC-G-IA-003 — XOR commutativity

For Boolean `a,b`:

```text
a XOR b = b XOR a.
```

**Support:** the four represented tuples are symmetric in the first two arguments.

**Disposition:** ADMITTED EXACT.

## PC-G-IA-004 — XOR associativity

For Boolean `a,b,c`:

```text
(a XOR b) XOR c
=
a XOR (b XOR c).
```

**Support:** the Boolean carrier has exactly two values, so all eight input triples are exhaustively determined by the represented XOR table. Both parenthesizations agree in every case.

**Disposition:** ADMITTED EXACT.

## PC-G-IA-005 — Boolean AND distributes over XOR in the coefficient coordinate

For Boolean `a,b,x`:

```text
(a XOR b) AND x
=
(a AND x) XOR (b AND x).
```

**Support:** exhaustive evaluation of the eight triples using the pinned AND extension and the represented XOR extension.

**Disposition:** ADMITTED EXACT.

## PC-G-IA-006 — define an augmented row

For an input equation `e`, define its augmented bit row in the fixed duplicate-free variable order:

```text
ROW(e)
=
(c_1,...,c_n | r),
```

where each `c_i` is the exact COEF bit and `r` is the exact RHS bit.

This is a finite data view over source tuples, not a new semantic primitive.

The row has exactly `n+1` Boolean fields.

**Disposition:** ADMITTED EXACT.

## PC-G-IA-007 — equation truth is zero augmented residual

For assignment `X`, define:

```text
RES(A,X)
=
parity_i( A_i AND X_i )
XOR
A_rhs.
```

Then:

```text
equation A is satisfied by X
IFF
RES(A,X)=0.
```

**Support:** source equation truth equates left parity with RHS; XORing equal bits gives zero and, over the represented two-value table, XOR zero residual implies equality.

**Disposition:** ADMITTED EXACT.

## PC-G-IA-008 — augmented-row XOR composes residuals

Define row XOR coordinatewise:

```text
(A XOR B)_i   = A_i XOR B_i
(A XOR B)_rhs = A_rhs XOR B_rhs.
```

Then for every assignment `X`:

```text
RES(A XOR B, X)
=
RES(A,X) XOR RES(B,X).
```

### Support

Use PC-G-IA-005 coordinatewise, then PC-G-IA-003/004 to reassociate the finite parity terms and RHS bits.

Because the coordinate carrier is finite and the variable order is fixed, this is an exact finite induction over the source list.

**Disposition:** ADMITTED EXACT.

## PC-G-IA-009 — replacing one row by its XOR with another retained row preserves the complete solution set

Retain row `A` and replace row `B` by:

```text
B' = A XOR B.
```

Then for every assignment `X`:

```text
RES(A,X)=0
AND
RES(B,X)=0

IFF

RES(A,X)=0
AND
RES(B',X)=0.
```

### Forward

PC-G-IA-008 gives:

```text
RES(B',X)=0 XOR 0=0.
```

### Reverse

From `RES(A,X)=0` and `RES(B',X)=0`:

```text
RES(B,X)
=
RES(A,X) XOR RES(B',X)
=
0,
```

using self-cancellation / reversibility of XOR.

**Disposition:** ADMITTED EXACT.

## PC-G-IA-010 — row reordering preserves the complete solution set

The source requires conjunction/universal satisfaction of every listed equation.

Permuting the finite row order does not alter that conjunction.

**Disposition:** ADMITTED EXACT.

## PC-G-IA-011 — a pivot bit can be eliminated from every other row by a local solution-preserving replacement

Suppose row `P` has coefficient 1 in coordinate `j`.

For any other row `A` also having coefficient 1 at `j`, replace:

```text
A <- P XOR A.
```

At coordinate `j`:

```text
1 XOR 1 = 0.
```

By PC-G-IA-009 the complete solution set is preserved.

Rows already having coefficient 0 at `j` are left unchanged.

**Disposition:** ADMITTED EXACT.

## PC-G-IA-012 — deterministic pivot normalization has polynomial progress rank

Use the source variable order and source equation order.

Process variable coordinates from left to right.

At a coordinate not yet used as a pivot:

1. if no remaining row has coefficient 1 there, advance to the next coordinate;
2. otherwise choose the earliest remaining row with coefficient 1;
3. move it into the next pivot-row position;
4. eliminate that pivot coordinate from every other row using PC-G-IA-011.

Each successful pivot consumes a previously unused variable coordinate.

Therefore there are at most `n` pivot stages.

No stage increases row count.

Every row always has `n+1` bits.

**Disposition:** ADMITTED EXACT.

## PC-G-IA-013 — the normalization is polynomially constructible

Let `m=LENGTH(EL)`.

The retained structure contains:

```text
m rows x (n+1) bits.
```

A naive implementation may:

- scan rows to choose a pivot;
- scan all rows for elimination;
- XOR `n+1` bits per modified row.

With at most `n` pivot stages, this is polynomial in the explicit input dimensions `m,n`.

No semantic solution-set oracle is used.

**Disposition:** ADMITTED EXACT.

## PC-G-IA-014 — a zero-coefficient row with RHS 1 is an exact rejection invariant

For row:

```text
(0,...,0 | 1),
```

every assignment has:

```text
RES=1.
```

So the row is unsatisfiable.

Because every normalization step preserves the complete solution set, producing this row proves the original instance has no satisfying assignment.

**Disposition:** ADMITTED EXACT.

## PC-G-IA-015 — if normalization has no contradiction row, a satisfying assignment is constructible

After PC-G-IA-012 eliminates every pivot coordinate from every non-pivot row:

- each pivot column has 1 in exactly its pivot row and 0 in every other row;
- all nonzero rows have a pivot;
- any coefficient columns without pivots are free coordinates.

Set every free variable to 0.

For each pivot row, set its pivot variable equal to that row's RHS bit.

All other pivot columns are zero in the row, and all free-variable terms vanish.

Therefore each nonzero row is satisfied.

Any all-zero coefficient row must have RHS 0 because contradiction rows were excluded.

Thus the assignment satisfies the normalized system and, by solution-set preservation, the source system.

**Disposition:** ADMITTED EXACT.

## PC-G-IA-016 — a canonical witness/NONE construction follows

The pivot rule is deterministic under the frozen variable/equation order.

Therefore the normalization plus PC-G-IA-014/015 deterministically constructs:

```text
NONE
```

for inconsistent instances, or one exact satisfying assignment for consistent instances.

Serialize the satisfying assignment as the duplicate-free subsequence of `VL` containing precisely the variables assigned 1.

This source witness has length at most `n`.

**Disposition:** ADMITTED EXACT.

**Campaign connector:** T3 recovered as a singleton constructible witness set on YES instances; T5 recovered through the contradiction row on NO instances.

## PC-G-IA-017 — local row transformations establish scoped semantic identity without exact global identity testing

Each PC-G-IA-009 replacement supplies an explicit proof that the pre/post systems have exactly the same satisfying assignment set.

Therefore repeated normalization provides a chain of exact scoped solution-set identity facts.

No universal oracle for deciding whether arbitrary systems have the same solution set is required.

**Disposition:** ADMITTED EXACT.

## Falsifier PC-G-F1 — model intersection closure fails

Take one equation:

```text
x XOR y = 1.
```

Assignments `{x}` and `{y}` both satisfy it.

Their intersection is empty, which has parity 0 and does not satisfy it.

Therefore the PC-H intersection law does not transfer.

## Falsifier PC-G-F2 — assignment inclusion is not a sound monotone truth order

For the same equation:

```text
{x}   satisfies,
{x,y} rejects.
```

Adding a true variable can destroy truth.

Likewise the empty assignment rejects while `{x}` satisfies, so removing a true variable can also destroy truth.

## Falsifier PC-G-F3 — all-zero and all-one are not universal canonical witnesses

- equation `x=1` rejects all-zero;
- equation `x XOR y=1` rejects all-one.

## Falsifier PC-G-F4 — syntactic row identity is not semantic system identity

PC-G-IA-009 changes one row's coefficient/RHS tuple while preserving the entire solution set.

Therefore raw equation syntax is finer than the useful scoped solution-set identity.

## Falsifier PC-G-F5 — small output truth does not provide normalization

The final consistency answer is Boolean.

That two-valued range does not derive any pivot or row transformation.

The polynomial result depends on the independently accessible local reversible law and the polynomial pivot rank.

## Classification

The XOR identities and elimination construction are **STANDARD_KNOWN_CONSEQUENCE** of finite GF(2) equations.

Their primitive derivation and comparison against the current IsoGraph campaign are **NEW_TO_CURRENT_ISOGRAPH_CAMPAIGN** only.
