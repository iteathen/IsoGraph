# P vs NP integrated IsoGraph 0.2 — completeness audit

**Status:** integrated successor research rendering; unqualified  
**Predecessor:** `P_VS_NP_INTEGRATED_0_1.isg`  
**Native graph:** `P_VS_NP_INTEGRATED_0_2.isg`

## Why 0.2 exists

The 0.1 integrated prose correctly discussed:

- relativization;
- Natural Proofs;
- algebrization;
- restricted controls.

But the native 0.1 graph did not make the algebrization and control layers explicit enough.

0.2 preserves 0.1 as historical evidence and corrects the native coverage defect rather than rewriting it.

## Relation dictionary

| Relation | Meaning |
|---|---|
| `^141000` | integrated object |
| `^141001` | terminal outcome partition |
| `^141002` | established class inclusion |
| `^141003` | equivalence |
| `^141004` | conjunction/support bundle |
| `^141005` | known inclusion collapses equality support to reverse inclusion |
| `^141006` | existential separation witness |
| `^141007` | witness/separation equivalence |
| `^141008` | outcome is polarity of common unresolved truth bit |
| `^141009` | NP-complete bundle |
| `^141010` | NP-hardness |
| `^141011` | NP membership |
| `^141012` | polynomial reduction |
| `^141013` | reduction-closure support |
| `^141014` | arbitrary NP language reduces to hard target |
| `^141015` | derived reverse-inclusion support |
| `^141016` | sufficient equality support |
| `^141017` | equality implies complete-problem membership |
| `^141018` | SAT truth-bit quotient |
| `^141019` | generalized NP-hard-in-P route |
| `^141020` | two witness styles for membership in P |
| `^141021` | witness-style alternatives share one semantic membership fact |
| `^141022` | direct separation route bundle |
| `^141023` | witness membership/nonmembership |
| `^141024` | direct witness suffices for separation |
| `^141025` | stronger proof-method route bundle |
| `^141026` | route component |
| `^141027` | stronger nonuniform target suffices for semantic separation |
| `^141028` | Natural-Proofs barrier attaches to circuit-lower-bound route |
| `^141029` | dependency / ownership |
| `^141030` | method/barrier/control does not decide truth |
| `^141031` | control belongs to control layer |
| `^141032` | method/control layer feeds research on resolution without semantic entailment |

## Object dictionary

### Truth core

- `6100`: resolve P vs NP
- `6101`: `P = NP`
- `6102`: `P != NP`
- `6103`: P
- `6104`: NP
- `6105`: `P subset NP`
- `6106`: `NP subset P`
- `6107`: exists separating language
- `6108`: `L in NP`
- `6109`: `L notin P`

### SAT quotient

- `6110`: SAT NP-complete
- `6111`: SAT NP-hard
- `6112`: SAT in NP
- `6113`: arbitrary NP language
- `6114`: reduction to SAT
- `6115`: polynomial reduction witness
- `6116`: P closure under reductions
- `6117`: `L <=p Q`
- `6118`: `Q in P`
- `6119`: SAT in P
- `6120`: NP subset P derived through SAT
- `6121`: SAT notin P
- `6140`: unresolved SAT-membership truth bit

### General equality support

- `6122`: arbitrary NP-hard target Q
- `6123`: universal NP reduction support
- `6124`: Q in P
- `6125`: explicit polynomial-time algorithm witness
- `6126`: existential/nonconstructive membership proof

The semantic requirement is `Q in P`; explicit construction is one proof style, not an extra class-theoretic obligation.

### Direct separation support

- `6127`: direct separation topology
- `6128`: witness in NP
- `6129`: witness outside P

### Strong circuit route

- `6130`: unrestricted Boolean-circuit lower-bound route
- `6131`: selected NP-complete problem
- `6132`: superpolynomial unrestricted circuit lower bound
- `6133`: resulting strong nonuniform hardness
- `6134`: Natural-Proofs method/barrier interface
- `6135`: natural-property obligations/assumptions

The circuit route is stronger than the direct semantic witness route.

### Classical barrier layer

- `6136`: relativization barrier bundle
- `6137`: relativizing proof-method class
- `6138`: opposite oracle worlds
- `6139`: relativization exclusion

- `6145`: algebrization barrier bundle
- `6146`: algebraic-oracle extension framework
- `6147`: algebrizing proof-method class
- `6148`: algebrization exclusion

Natural Proofs remains represented separately through `6134`/`6135`.

No relation identifies these three barriers.

### Control layer

- `6141`: time-hierarchy separation control
- `6142`: AC0 PARITY lower-bound control
- `6143`: HJP depth-3 lower-bound/naturalization holdout control
- `6144`: method/control layer

The controls can inform proof-structure discovery but have no native implication into `P=NP` or `P!=NP`.

### Explicit QU frontier

- `6152`: unresolved truth `SAT in P ?`
- `6153`: equality-support realization
- `6154`: direct NP-outside-P witness
- `6155`: unrestricted NP-complete circuit lower bound
- `6156`: future relativization signature
- `6157`: future Natural-Proofs / naturalization signature
- `6158`: future algebrization signature
- `6159`: model-equivalence / formalization bridge

Each is owned by the relevant upstream object via `^141029`.

## Native coverage check

0.2 explicitly represents:

```text
truth core
SAT quotient
general NP-hard equality adapter
direct separation witness
unrestricted-circuit sufficient route
relativization barrier
Natural-Proofs barrier
algebrization barrier
time-hierarchy control
AC0 PARITY control
HJP holdout control
QU frontier
```

Thus the integrated native graph now matches the declared high-level campaign envelope.

## Semantic compression

The truth layer reduces to:

```text
known:
    P subset NP

unknown:
    NP subset P
```

and, through Cook-Levin plus reduction closure:

```text
P = NP
    <-> SAT in P

P != NP
    <-> SAT notin P.
```

This makes `SAT in P ?` a convenient one-bit quotient of the current semantic problem.

The graph does not claim that SAT is uniquely privileged; any NP-hard target in P suffices for equality.

## Method fibers

The quotient is intentionally separated from proof methods.

For equality:

```text
prove membership of an NP-hard problem in P
```

may be witnessed constructively or nonconstructively.

For separation:

```text
find one L in NP \ P
```

is enough semantically.

The unrestricted-circuit route is a stronger sufficient route:

```text
strong nonuniform lower bound
    -> uniform separation.
```

Because it is stronger, it acquires additional proof-method barriers that are not semantic requirements of `P != NP`.

## Controls are not support

The control layer is attached to the method layer only.

Therefore:

```text
time hierarchy theorem
AC0 PARITY lower bound
HJP lower bound
```

cannot support either terminal result without an explicit new bridge.

This is the formal correction to the campaign's earlier drift.

## Remaining completeness boundary

0.2 is complete only for the **current high-level campaign envelope**.

It is not a complete graph of complexity theory.

In particular it does not yet natively expand:

- all Cook-Levin intermediate reductions;
- all standard-machine equivalence proofs;
- proof complexity;
- bounded arithmetic;
- communication complexity;
- algebraic/geometric complexity;
- meta-complexity;
- cryptographic equivalences;
- every known lower-bound method.

Those are optional future method fibers, not missing truth-core semantics.

## Qualification

0.2 has not undergone independent ESR qualification.

No authority changes.

No terminal P-vs-NP conclusion is asserted.
