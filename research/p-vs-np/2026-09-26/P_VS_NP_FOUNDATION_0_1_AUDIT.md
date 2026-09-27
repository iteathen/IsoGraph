# P vs NP foundation rendering 0.1 — reconstruction audit

**Status:** source-semantic candidate; reconstruction checked against pinned Coq source; not yet independently qualified  
**Native graph:** `P_VS_NP_FOUNDATION_0_1.isg`  
**Primary source:** `uds-psl/coq-library-complexity@14b5f413d2fb7adecde79c5451b483f9a1af59a8`

## Scope

This rendering reconstructs the **pinned Coq foundation actually used by this campaign**:

- `inTimePoly`;
- `polyCertRel`;
- `inNP`;
- `inP`;
- `P_NP_incl`;
- polynomial many-one reduction;
- reduction transitivity;
- `NPhard`;
- `NPcomplete`;
- Cook-Levin conclusion `NPcomplete SAT`.

It does **not** claim to be a complete rendering of all standard complexity theory or of the entire Coq library.

It also does not silently identify the Coq library's computational model with every standard Turing-machine presentation of P and NP. That bridge is a separate representation/model-equivalence obligation.

## Native relation dictionary

The relation IDs below are native labels in this domain rendering. The prose gives the source referent; it does not add omitted dependencies.

| Relation | Source-semantic role |
|---|---|
| `^130000` | represented object is in the frozen foundation vocabulary |
| `^130001` | definition body / definitional expansion |
| `^130002` | existential support |
| `^130003` | conjunction / required bundle |
| `^130004` | universal quantifier support |
| `^130005` | implication |
| `^130006` | class membership premise |
| `^130007` | polynomial-time computability / decision-time support |
| `^130008` | polynomial bound support |
| `^130009` | monotonicity support |
| `^130010` | certificate-relation ownership |
| `^130011` | certificate soundness |
| `^130012` | certificate completeness/existence |
| `^130013` | polynomial many-one reduction |
| `^130014` | truth-preserving iff obligation of the reduction |
| `^130015` | reduction transitivity theorem |
| `^130016` | class inclusion |
| `^130017` | reserved: NP-hardness relation class |
| `^130018` | reserved: NP-completeness relation class |
| `^130019` | theorem / established source conclusion |
| `^130020` | theorem has named proof-support components |
| `^130021` | pinned source-file identity |
| `^130022` | source file owns represented object/conclusion |

Relations `^130017` and `^130018` are retained in the declared relation vocabulary for successor expansion; 0.1 expresses NP-hardness and NP-completeness by definitional bundles rather than separate shortcut assertions.

## Object dictionary

### P block

- `2000`: `inP P`
- `2002`: `inTimePoly P`
- `2003`: existential decision-bound package
- `2004`: inhabited decision procedure `decInTime P f`
- `2005`: `inOPoly f`
- `2006`: `monotonic f`

Reconstruction:

```text
inP P
:= inTimePoly P
:= exists f,
     inhabited(decInTime P f)
     AND inOPoly f
     AND monotonic f
```

This matches the pinned `NP.v` definition.

### NP block

- `2001`: `inNP P`
- `2007`: NP certificate package
- `2008`: existential certificate relation `R_NP : X -> term -> Prop`
- `2009`: `inTimePoly (fun '(x,y) => R_NP x y)`
- `2010`: `polyCertRel P R_NP`
- `2011`: full `polyCertRel` obligation bundle
- `2012`: soundness: `R x y -> P x`
- `2013`: completeness: `P x -> exists y, R x y` with encoded-size bound
- `2014`: witness-bound function is polynomial
- `2015`: witness-bound function is monotone

Reconstruction preserves the direction of soundness and completeness and preserves the encoded certificate-size bound. No verifier direction is reversed.

### P subset NP

- `2016`: source theorem `P_NP_incl`

The graph records:

```text
inP P -> inNP P
```

as a source theorem, not as the definition of NP.

### Polynomial reduction

- `2017`: `P ⪯p Q`
- `2018`: reduction witness package
- `2019`: existential reduction function `f`
- `2020`: `polyTimeComputable f`
- `2021`: `forall x, P x <-> Q (f x)`

The truth condition is iff, not one-way implication.

The graph separately records source theorem `reducesPolyMO_transitive`.

### NP-hardness and completeness

- `2022`: `NPhard P`
- `2023`: universal NP-reduction obligation
- `2024`: arbitrary represented predicate `Q`
- `2025`: if `inNP Q`, then `Q ⪯p P`
- `2026`: `NPcomplete P`
- `2027`: conjunction `NPhard P AND inNP P`

This reconstructs the pinned source definition:

```text
NPcomplete P := NPhard P AND inNP P
```

### Cook-Levin

- `2028`: theorem `CookLevin`
- `2029`: `NPcomplete SAT`

The source theorem body supplies two components:

- SAT is in NP;
- SAT is NP-hard through the formal reduction chain.

The native 0.1 graph records the theorem conclusion and the two component obligations. It does not yet expand every intermediate Cook-Levin reduction as a native subgraph; that is the next successor layer.

## Source objects

- `2100`: `theories/Complexity/NP.v`
- `2101`: blob `f92971a055eb87131449e6eceebd005a6776833c`
- `2102`: `theories/NP/SAT/CookLevin.v`
- `2103`: blob `d88fa3025d3a7716a9ab4366aab421af67204262`
- `2104`: `theories/NP/SAT/SAT_inNP.v`
- `2105`: blob `bff210b358cf23c9c4d6b018a698520b5b722433`

## Exactness audit

### Preserved

- existential decision bound for P;
- polynomial and monotone requirements on the bound;
- NP certificate relation;
- polynomial-time certificate verification relation;
- certificate soundness;
- certificate completeness;
- polynomial encoded witness-size bound;
- P subset NP theorem;
- existential polynomial reduction function;
- iff preservation for reductions;
- reduction transitivity;
- universal quantification in NP-hardness;
- conjunction of NP-hardness and NP membership in NP-completeness;
- exact Cook-Levin conclusion for SAT.

### Deliberately not claimed in 0.1

- exact expansion of every intermediate Cook-Levin reduction;
- exact standard-TM-model equivalence of the library's P/NP definitions;
- circuit characterizations of P or NP;
- `P = NP iff SAT in P` as source-explicit text;
- any lower bound;
- any barrier theorem.

Those belong in derived/successor views.

## Reconstruction disposition

For the declared 0.1 source scope, no listed source field has been intentionally dropped.

However, the graph has not undergone an independent ESR qualification run. Therefore:

```text
source-semantic reconstruction candidate: COMPLETE FOR DECLARED SCOPE
independent exact-rendering qualification: NOT YET RUN
authority effect: NONE
```

Any downstream DP discovery must preserve this qualification boundary.
