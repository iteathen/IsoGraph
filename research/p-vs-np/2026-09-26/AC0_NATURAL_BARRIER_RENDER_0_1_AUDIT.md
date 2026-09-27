# AC0-natural barrier rendering 0.1 — source/scope audit

**Status:** source-backed research rendering; no P-vs-NP authority effect  
**Native graph:** `AC0_NATURAL_BARRIER_RENDER_0_1.isg`  
**Source:** Loff, Sherif, Talebanfard, Ugazio, *The Switching Lemma shows what the Switching Lemma cannot prove: an unconditional natural-proofs barrier*, arXiv:2606.12631v1, June 2026.

## Source pages pinned for 0.1

The exact 0.1 rendering uses:

- Definition 2.3 — AC0-natural properties;
- Lemma 4 — PRF excludes a matching natural property;
- Section 3.1.1 / Corollary 7 — naturalization of Switching-Lemma lower bounds;
- Corollary 30 — local PRF and corresponding nonexistence of matching natural proof;
- Corollary 31 — quantitative unconditional AC0-natural barrier.

No claim is made that 0.1 reconstructs the full PRF construction proof.

## Relation dictionary

| Relation | Role |
|---|---|
| `^134000` | object belongs to barrier rendering |
| `^134001` | natural-property definition bundle |
| `^134002` | property has usefulness |
| `^134003` | usefulness rejects easy circuit class |
| `^134004` | property has largeness |
| `^134005` | largeness lower-bounds acceptance on a random function |
| `^134006` | property has constructivity |
| `^134007` | constructivity places property in small AC0 class |
| `^134008` | PRF parameter bundle |
| `^134009` | PRF fools property class |
| `^134010` | PRF contradicts matching natural property |
| `^134011` | Lemma 4 exclusion |
| `^134012` | switching method implies naturalization candidate |
| `^134013` | extracted switching property bundle |
| `^134014` | switching corollary proves usefulness |
| `^134015` | random-function argument proves largeness |
| `^134016` | extracted property is AC0-constructive |
| `^134017` | explicit constructivity parameters |
| `^134018` | hard target function satisfies extracted property |
| `^134019` | property implies lower bound for target |
| `^134020` | Corollary 30 instantiates Lemma 4 |
| `^134021` | Corollary 31 quantitative parameter bundle |
| `^134022` | target circuit depth/size regime |
| `^134023` | natural-property depth/size regime |
| `^134024` | PRF support supplies pseudorandom easy functions |
| `^134025` | natural property would distinguish PRF from uniform |
| `^134026` | contradiction forces quantitative alternative |
| `^134027` | polynomial-size constant-depth specialization |
| `^134028` | unconditional AC0-natural ceiling |

## Object dictionary

### Definition 2.3

- `5100`: `(n,d,S,dPhi,SPhi,p)`-natural property
- `5101`: predicate Phi on n-variable truth tables
- `5102`: usefulness
- `5103`: largeness
- `5104`: constructivity
- `5105`: easy function class `F(n,d,S)`
- `5106`: `f in F(n,d,S) -> Phi(f)=0`
- `5107`: uniform random n-variable Boolean function
- `5108`: `Pr[Phi(f)=1] >= p`
- `5109`: truth-table input length `2^n`
- `5110`: `Phi in F(2^n,dPhi,SPhi)`

The graph keeps `d,S` for the functions being lower-bounded separate from `dPhi,SPhi` for the property/distinguisher.

### Lemma 4

- `5111`: matching pseudorandom function generator
- `5112`: nonexistence of matching natural property

The proof uses all three natural-property clauses:

```text
PRF output is easy
    -> usefulness says Phi(PRF)=0

random function
    -> largeness says Phi(random)=1 with probability at least epsilon

Phi is constructive
    -> Phi belongs to the distinguisher class fooled by the PRF
```

Hence a matching PRF contradicts existence of the natural property.

### Switching-Lemma naturalization

- `5113`: Switching-Lemma lower-bound proof family
- `5114`: extracted natural property
- `5115`: nonconstant on every Boolean subcube of selected dimension
- `5116`: largeness of that anti-monochromatic-subcube property
- `5117`: Switching-Lemma corollary giving a monochromatic subcube to every easy function
- `5118`: random functions satisfy the extracted property with high probability
- `5119`: AC0 truth-table test for the extracted property
- `5120`: depth-2, size `O(N^2)` implementation where `N=2^n`
- `5121`: PARITY / another target nonconstant on every required subcube
- `5122`: target satisfies the extracted property

Source Section 3.1.1 states that, under the switching parameters, an easy depth-`d`, size-`S` function has a monochromatic subcube of sufficiently large dimension. Therefore the extracted property

```text
Phi(f) = 1
iff
f is nonconstant on every Boolean subcube of dimension s
```

is useful.

For `s = 2 log n` in the displayed regime, a random function has the property with probability `1-o(1)`, and the paper states that it can be tested from the truth table by a depth-2 AC0 circuit of size `O(N^2)`.

PARITY has the property, so the natural property yields the lower bound.

### Corollaries 30 and 31

- `5123`: Corollary 30 local PRF
- `5124`: easy-function depth/size support of PRF
- `5125`: distinguisher depth/size parameters
- `5126`: PRF outputs belong to the target easy circuit class
- `5127`: PRF fools the candidate AC0-natural distinguisher class
- `5128`: matching natural property would distinguish PRF from uniform
- `5129`: Corollary 31 quantitative alternative
- `5130`: polynomial-size constant-/loglog-depth natural-property specialization

The source states:

```text
for d >= 7,
no constant-depth (even loglog-depth), polynomial-size AC0 property
can yield a natural-proof lower bound larger than
2^(n^(7/(d-5)))
for depth-d circuits.
```

The more general Corollary 31 retains explicit `epsilon`, `alpha`, `dPhi`, `SPhi` alternatives. The simplified bound is represented only at its stated specialization.

## Exact barrier trigger

The barrier trigger is **not** the syntactic occurrence of the Switching Lemma.

It is the existence of a property satisfying:

```text
usefulness
AND largeness
AND constructivity
```

at parameters matched by a pseudorandom function.

This distinction is source-explicit: the paper says the formal notion is the natural property, while “natural proof” and “naturalizable proof” are informal proof classifications.

Therefore the native barrier must attach to the naturalized property bundle rather than to a theorem-name node such as `SwitchingLemma`.

## Naturalization firewall

A proof may use target-specific facts that do not themselves look large or constructive.

The paper explicitly allows a proof to be called natural when a slight modification/extraction yields a natural property with comparable lower-bound force.

Therefore:

```text
explicit proof graph does not contain Phi
    !=
proof is outside the natural-proofs barrier
```

For campaign purposes, barrier classification requires checking the closure under represented naturalization/extraction transforms, not merely searching one proof graph for an explicit natural-property node.

This is a representation rule derived directly from Definition 2.4's source discussion.

## Relationship to the formal Lean PARITY control

The Lean development proves PARITY lower bounds through exact restrictions, narrow DNF, parity-under-restriction and a terminal misclassification theorem.

The 2026 paper gives a naturalized switching proof through the more general property:

```text
nonconstant on every sufficiently large subcube
```

The 0.1 barrier rendering therefore does **not** identify the Lean proof object with the paper's extracted property by NEI.

Instead it records a proposed source-supported **naturalization map**:

```text
formal switching lower-bound architecture
    -> source-described switching proof family
    -> extracted anti-monochromatic-subcube property
```

Exact theorem-by-theorem equivalence of the Lean proof to this naturalized presentation remains a separate comparison obligation.

## Qualification boundary

- source theorem/definition statements above: pinned;
- native rendering: audited, not independently qualified;
- full PRF proof reconstruction: not present in 0.1;
- Lean-to-naturalized-proof exact equivalence: not yet qualified;
- P-vs-NP consequence: none.
