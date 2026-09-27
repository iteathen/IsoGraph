# P vs NP unified IsoGraph 0.3 — bridge-closed audit

**Status:** successor rendering; equality route internally closed in pinned model; not independently qualified  
**Predecessor:** `P_VS_NP_UNIFIED_0_2.isg`

## Changes from 0.2

### Cook-Levin chain repaired

New object:

```text
6043 = FSAT
```

The exact displayed source chain is now:

```text
GenNP
 -> LMGenNP
 -> fixed multi-tape generic NP
 -> fixed single-tape generic NP
 -> FlatSingleTMGenNP
 -> FlatTCC
 -> FlatCC
 -> BinaryCC
 -> FSAT
 -> SAT.
```

### P-reduction closure bridge added

New objects:

```text
6044 = backward closure of P under <=p
6045 = polynomial-time composition support
6046 = reduction correctness/decider composition support
```

The bridge is derived from the pinned reduction definition, `inP` definition, and polynomial-time-composition theorem.

### Formal-model SAT equivalence closed

0.3 now records the derived equivalence:

```text
P = NP
    iff
SAT in P
```

inside the pinned formal complexity model.

The forward direction uses `SAT in NP`.

The reverse direction uses:

```text
SAT NP-hard
+
SAT in P
+
backward reduction closure of P.
```

## Relation additions

- `^138027`: derived reduction-closure bridge
- `^138028`: computational composition support
- `^138029`: exact ordered Cook-Levin chain including FSAT

## Remaining material gaps

### Official-model bridge

Still QU:

```text
pinned Coq/L class semantics
    <-> 
official standard Turing-machine P/NP semantics
```

at the exact polynomial-overhead level required for authority transfer.

### Circuit route internalization

The official source owns the sufficient circuit route, but the native graph still lacks a complete formal derivation of:

```text
P language
    -> polynomial-size unrestricted circuit family
```

and the exact connection from that fact to the chosen NP-complete circuit lower-bound target.

### Candidate route completeness

The equality/separation route space remains intentionally non-exhaustive.

## Disposition

Within the pinned formal model:

```text
equality target:
    mechanically concentrated to SAT in P

separation target:
    remains existential class separation,
    with unrestricted circuits as one stronger sufficient route
```

No P-vs-NP resolution is claimed.
