# Experiment 015 — Fresh Integrated Module-Stack Holdout

The source representations and comparison policy below are independently frozen before pairing. Do not change them after observing the correspondence.

## Alpha source

Alpha contains an atomic source stage `P1` and one independently qualified exact source-local factorization:

```text
P1 <exact-D> P1a -> P1b -> P1c
```

The comparison-stage object selected before pairing is:

```text
P0(input boundary)
  -> P1a
  -> P1b
  -> P1c
  -> P2(output boundary)
```

Open structure:

```text
open referent u
P1a.level -> u
P1c.level -> u
domain(u) = {5,7}
constraint u >= 5
```

One unresolved referent `u` is shared by both roles.

Source labels:

```text
P1a label: "audit"
P1b label: "fold"
P1c label: "send"
```

The atomic P1 representation remains reconstructable through the exact D record.

## Beta source

Frozen comparison-stage structure:

```text
Q0(input boundary)
  -> Q1
  -> Q2
  -> Q3
  -> Q4(output boundary)
```

Open structure:

```text
open referent v
Q1.level -> v
Q3.level -> v
domain(v) = {5,7}
constraint v >= 5
```

One unresolved referent `v` is shared by both roles.

Beta also contains:

```text
Check(Q2,Q3, policy_tag)
Q0 -> Q5 -> Q6(external audit boundary)
```

`Check(Q2,Q3, policy_tag)` is load-bearing under the active comparison view.

Source labels:

```text
Q1 label: "screen"
Q2 label: "join"
Q3 label: "transport"
Q5 label: "audit"
```

The `audit` label on Q5 is intentionally misleading.

## Frozen comparison policy

Before pairing:

- labels/names were declared non-rigid;
- dependency direction and input/output boundaries are load-bearing;
- shared-open-referent topology, domains, and constraints are included;
- Alpha uses the already frozen P1a/P1b/P1c exact factorization for this local claim;
- Beta uses its native Q1/Q2/Q3 decomposition;
- no factorization is declared canonical;
- u and v may be structurally mapped;
- all shown Beta-only structure remains in the accounting universe;
- relation kinds sought include strong embedding, weak embedding, common core, and certified negative where justified;
- no NEI profile, natural-identity law, or cross-domain identity bridge is supplied.

## Task

Determine the strongest defensible integrated result.

Address:

1. common mapping;
2. QU state of u and v;
3. structural relation between the two open regions;
4. NEI status;
5. strong versus weak embedding;
6. Beta residuals and the misleading-label branch;
7. source-local D provenance versus pairwise residual accounting;
8. canonical-factorization status;
9. whether any of these stronger claims are established:
   - full/global isomorphism;
   - natural identity;
   - same intermediate objects;
   - same algorithm.
