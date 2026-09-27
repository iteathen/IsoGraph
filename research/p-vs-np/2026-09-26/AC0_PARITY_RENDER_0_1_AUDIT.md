# AC0 PARITY rendering 0.1 — exact support audit

**Status:** source-semantic research rendering; not independently qualified  
**Native graph:** `AC0_PARITY_RENDER_0_1.isg`  
**Frozen source:** `formalcs/circuit-complexity@9b19e6c5c9c6d331db018e8cf73d55d3c389e0f1`

## Declared target

Represent the support architecture of the formal fixed-depth PARITY lower bound closely enough to ask:

- where constant depth is first consumed;
- where polynomial-size information is first consumed;
- where unbounded-fan-in/proper DNF structure is first consumed;
- which transformations are merely one sufficient factorization;
- which endpoint hypotheses are already implied by a package.

No claim is made that 0.1 encodes every implementation lemma in the repository.

## Relation dictionary

| Relation | Role |
|---|---|
| `^133000` | object belongs to the rendered control |
| `^133001` | package contains required property |
| `^133002` | package/property instantiation |
| `^133003` | parity-computation contract supplies well-formedness |
| `^133004` | circuit is unfolded to formula |
| `^133005` | semantics-preserving normalization/conversion |
| `^133006` | depth support |
| `^133007` | parity semantics transported |
| `^133008` | sharing-expansion support |
| `^133009` | depth bounds sharing-expansion exponent |
| `^133010` | circuit-to-formula quantitative bridge |
| `^133011` | general formula normalization |
| `^133012` | alternative sufficient factorization |
| `^133013` | leveled formula enters restriction pipeline |
| `^133014` | global size bound supplies local switching budget/count |
| `^133015` | depth supplies switching-round / terminal-reserve count |
| `^133016` | restriction collapse produces live set and narrow DNF |
| `^133017` | switching lemma supports collapse |
| `^133018` | exact-cardinality/density hypotheses support switching lemma |
| `^133019` | switching output controls DNF width |
| `^133020` | narrow-width condition enters terminal parity obstruction |
| `^133021` | parity-under-restriction yields offset law |
| `^133022` | narrow DNF misclassifies parity/complement |
| `^133023` | offset law aligns restricted parity |
| `^133024` | live witness assembled to original input |
| `^133025` | formula/circuit semantic equality transports witness |
| `^133026` | contradiction establishes lower bound / family corollary |

## Object dictionary

### Circuit endpoint

- `5000`: AC0 circuit-family/package assumptions
- `5001`: sharp circuit PARITY lower bound
- `5002`: well-formed circuit
- `5003`: fixed computation-depth support
- `5004`: input-width equality
- `5005`: total circuit-size bound / candidate small-size assumption
- `5006`: `CircuitComputesParity`
- `5007`: `CircuitComputesParity`'s `WellFormed` component
- `5008`: `toUFIByPos` sharing-unfold
- `5009`: `normalizeNullary`
- `5010`: formula obtained from circuit
- `5011`: formula depth bound
- `5013`: transported `FormulaComputesParity`
- `5037`: formula-size expansion under unfolding
- `5038`: depth-dependent exponent controlling that expansion

### Formula/restriction path

- `5014`: quantitative formula root lower bound
- `5015`: general formula
- `5016`: leveling/proper-bottom normalization
- `5017`: properly leveled formula package
- `5018`: restriction-to-narrow-DNF collapse
- `5019`: surviving live-variable set
- `5020`: narrow proper DNF
- `5021`: exact switching lemma
- `5022`: exact-cardinality restriction/density/width hypotheses
- `5023`: DNF width strictly below live-variable count
- `5024`: parity-under-restriction offset relation
- `5025`: narrow-DNF parity/complement misclassification
- `5026`: assembled full-input counterexample
- `5027`: formula lower-bound contradiction
- `5028`: AC0-family noncomputability corollary

### Split coarse assumptions

- `5032`: polynomial-size quantity `c*n^k`
- `5033`: local switching-gate/count budget derived from total size
- `5034`: `d-2` repeated nonterminal switching rounds
- `5035`: terminal depth-two live-variable reserve

### Signature packaging

- `5029`: explicit theorem parameter `hd : 1 <= d`
- `5030`: bundled package field `d > 0`

## Reconstruction findings

### F1 — conceptual core is exactly three-way after restriction

The source's `Core.lean` explicitly exposes:

```text
restriction to narrow DNF
+ parity offset under restriction
+ narrow-DNF parity obstruction
-> original-formula misclassification witness
```

0.1 preserves this and does not add a fourth analytic ingredient.

### F2 — fixed depth has at least two distinct consumers

At circuit level, the same coarse depth bound participates in two different roles.

**Role D1 — mathematical collapse depth**

Inside the Håstad formula argument, depth controls the number of switching rounds and the terminal reserve:

```text
(20*t)^(d-2) * (40*(t+1))
```

**Role D2 — representation/sharing expansion**

When a shared-gate circuit is unfolded to a formula, the source bounds formula node count by a power of `circuit.gates.length + 1` whose exponent is controlled by gate depth. The sharp circuit theorem then uses this to relate a hypothetical small circuit to a sufficiently small unfolded formula.

Therefore:

```text
constant depth
    is one source parameter
but
    has two distinct support occurrences
```

This is a DTS/support distinction. Neither occurrence is currently removable.

### F3 — total size factors through a smaller local switching budget

The switching-round state does **not** carry the original `c*n^k` total-size statement as such. It carries:

```text
bottom_fan_in
bottom_budget : switchingGateBudget ... < 2^t
```

Round zero derives the switching budget from total formula size using:

```text
switchingGateBudget <= ufiFormulaCircuitSize
```

plus the candidate small-size inequality.

Thus total polynomial size is one sufficient upstream source for a more local combinatorial budget.

This does not make total size removable from the final size-lower-bound theorem, where it is the quantity contradicted.

It does identify a narrower internal interface:

```text
global small-size assumption
    -> local switching budget
    -> switching rounds
```

which is important for later alternative-factorization tests.

### F4 — explicit `1 <= d` is a genuine package redundancy in several leveled-formula interfaces

The type:

`LeveledUFIFormulaOfSizePolyNAndDepthD n c k d`

already contains the field:

```text
d > 0
```

which is equivalent over naturals to `1 <= d`.

Yet several lemmas separately accept:

```text
hd : 1 <= d
```

including the conceptual core and restriction composition.

For any call where a value of the leveled package is already available:

```text
formula package includes d > 0
    -> 1 <= d
```

so the separately supplied `hd` is:

```text
NONESSENTIAL_FOR_SUFFICIENCY
as an independent hypothesis occurrence
```

at those signatures.

The positivity of depth itself remains load-bearing where consumed. This is a **formal packaging redundancy**, not a circuit-complexity theorem.

### F5 — leveling normalization is not uniquely necessary support for the general formula endpoint

The source explicitly contains two general-formula routes:

1. normalize to a properly leveled formula, then use the conceptual core;
2. `hastad_parity_lower_bound_general_direct`, documented as applying the quantitative root theorem directly without that separate normalization route.

Therefore:

```text
one particular explicit leveling-normalization route
    != uniquely necessary support
for the general formula lower-bound endpoint
```

This is source-explicit, so IsoGraph must **not** claim it as a new discovery.

### F6 — circuit-to-formula conversion is load-bearing only for the represented circuit proof factorization

The sharp circuit theorem currently obtains its circuit result by:

```text
shared circuit
 -> unfolded formula
 -> nullary normalization
 -> formula lower bound
 -> formula-size/circuit-size comparison
 -> circuit lower bound
```

This proves the conversion is load-bearing in the current formal route.

It does not prove that every PARITY circuit lower-bound proof requires formula unfolding.

A direct DAG-aware switching argument is an alternative-factorization QU, not an admitted bypass.

## Exact first-consumer map

| Source condition | First clear consumer in rendered route | Status |
|---|---|---|
| fixed depth | iterative switching count / terminal reserve | load-bearing |
| fixed depth, circuit route | DAG-to-formula expansion bound | load-bearing in current route |
| total candidate size | round-zero count/budget derivation | load-bearing upstream source; local interface is narrower |
| proper leveled shape | bottom extraction/switching machinery | load-bearing in that route; alternative general route exists |
| DNF width | `narrow_dnf_misclassifies_parity` | load-bearing |
| exact restriction density/cardinality | `switching_lemma_exact` | load-bearing for that exact lemma |
| parity computation | terminal contradiction | load-bearing |
| explicit `hd : 1<=d` beside leveled package | no independent consumer; derivable from package | nonessential occurrence |
| formula sharing removal | quantitative circuit-to-formula route | load-bearing in current route only |

## Qualification boundary

The source itself is machine checked.

This IsoGraph 0.1 rendering has not undergone an independent exact-rendering qualification run.

Therefore:

```text
source facts: pinned
rendering reconstruction: audited
rendering qualification: pending
discovery claims: experimental
P-vs-NP implication: none
```
