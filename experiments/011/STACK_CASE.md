# Experiment 011 — Integrated Module-Stack Holdout

This is one sealed integrated case. Treat the source records as already independently frozen before comparison. Do not alter their factorizations or authority after seeing the other source.

## Alpha source

Frozen source Alpha contains an atomic stage `A1` and one independently qualified exact factorization of that stage:

```text
A1  <exact-D>  A1a -> A1b
```

The source-faithful comparison-stage factorization selected before pairing is:

```text
A0(input boundary)
  -> A1a
  -> A1b
  -> A2
  -> A3(output boundary)
```

Additional Alpha structure:

```text
open referent u
A1a.limit -> u
A2.limit  -> u
domain(u) = {1,2,3}
constraint u != 3
```

The same unresolved referent `u` is shared by both roles.

Source labels:

```text
A1a label: "screen"
A1b label: "bind"
A2  label: "relay"
```

The atomic `A1` representation remains source-recoverable through the exact D record. It is not a pairwise residual of the decomposed comparison node.

## Beta source

Frozen Beta comparison-stage structure:

```text
B0(input boundary)
  -> B1
  -> B2
  -> B3
  -> B4(output boundary)
```

Additional Beta structure:

```text
open referent v
B1.limit -> v
B3.limit -> v
domain(v) = {1,2,3}
constraint v != 3
```

The same unresolved referent `v` is shared by both roles.

Beta also contains two target-only structures:

```text
Guard(B2,B3, provenance_tag)
B0 -> B5 -> B6(audit boundary)
```

The guard is load-bearing under the active view.

Source labels:

```text
B1 label: "filter"
B2 label: "join"
B3 label: "transport"
B5 label: "screen"
```

The label `screen` on B5 is intentionally misleading.

## Frozen comparison policy

Before pairing, the comparison policy fixed:

- names/labels are non-rigid retrieval metadata;
- ordered dependency direction is load-bearing;
- input/output boundaries are load-bearing;
- shared-open-referent topology and QU constraints are included;
- Alpha uses the already frozen decomposed A1a/A1b factorization for this local comparison claim;
- Beta uses its native B1/B2 decomposition;
- no factorization is declared canonical;
- parameter values `u` and `v` may be structurally mapped;
- all shown Beta target-only structure remains in the accounting universe;
- relation kinds sought include strong embedding, weak embedding, common core, and certified negative where justified;
- no NEI profile or cross-domain natural-identity authority is supplied for `u` and `v`.

## Tasks

Determine the strongest defensible integrated result.

Your result must address:

1. the structural mapping/common core;
2. whether the corresponding QU open regions are structurally compatible/QUI-like under the frozen view;
3. the QU state of `u` and `v`;
4. whether NEI SAME/DISTINCT/UNKNOWN is established, or whether identity authority is incomplete;
5. strong versus weak embedding;
6. pairwise residuals, including the misleading-label audit branch;
7. why Alpha's atomic A1 representation belongs to source-local D provenance rather than pairwise residual accounting;
8. whether any factorization may be called canonical;
9. which tempting stronger claims must be rejected.
