# HJP depth-3 naturalization holdout rendering 0.1 — source/support audit

**Status:** source-backed research rendering; no complexity-authority effect  
**Native graph:** `HJP_NATURALIZATION_HOLDOUT_RENDER_0_1.isg`

## Relation dictionary

| Relation | Role |
|---|---|
| `^135000` | rendered object |
| `^135001` | target theorem package |
| `^135002` | target has small easy-side circuit |
| `^135003` | proof applies paired restriction |
| `^135004` | restriction simplifies candidate hard-side circuit |
| `^135005` | restriction preserves target into structured residual |
| `^135006` | simplified circuit has bounded negative bottom fan-in |
| `^135007` | restricted target has block form |
| `^135008` | block form enters Lemma 4.1 |
| `^135009` | Lemma 4.1 separation pair |
| `^135010` | accepting/rejecting level-set support |
| `^135011` | k-limit contradiction |
| `^135012` | combinatorial limit lemma |
| `^135013` | combinatorial contradiction yields lower bound |
| `^135014` | one restriction has two support roles |
| `^135015` | role split |
| `^135016` | circuit-generic role |
| `^135017` | target-semantic role |
| `^135018` | AC0-natural property bundle |
| `^135019` | usefulness |
| `^135020` | largeness |
| `^135021` | constructivity |
| `^135022` | neighboring natural k-limit/sensitivity route |
| `^135023` | neighboring route gives weaker depth-3 bound |
| `^135024` | neighboring property does not establish holdout target result |
| `^135025` | naturalization status remains open |

## Object dictionary

- `5200`: HJP Section-4 block target `S_(s,m)`
- `5201`: linear-size Sigma-3 representation
- `5202`: `2^(Omega(sqrt(n)))` Pi-3 lower bound
- `5203`: Sigma-3 / Pi-3 exponential separation
- `5204`: explicit small easy-side formula
- `5205`: paired-variable restriction
- `5206`: large-negative-fan-in gate elimination
- `5207`: target-preserving restriction identity
- `5208`: bounded-negative-bottom-fan-in Pi-3 candidate
- `5209`: restricted block OR-of-ANDs target
- `5210`: HJP Lemma 4.1
- `5211`: low-weight rejecting side `A`
- `5212`: exact-weight/block accepting side `B`
- `5213`: k-limit obstruction
- `5214`: HJP combinatorial lower-bound inequality
- `5215`: dual-role restriction event
- `5216`: generic circuit-simplification role
- `5217`: target-semantic-closure role
- `5218`: required AC0-natural replacement property bundle
- `5219`: usefulness against the hard-side circuit class
- `5220`: largeness on random functions
- `5221`: small AC0 truth-table constructivity
- `5222`: HJP lower-bound mechanism supplies usefulness when its structural property holds
- `5223`: candidate property must be large
- `5224`: candidate property must be constructible
- `5225`: Meir–Wigderson/high-sensitivity natural k-limit property
- `5226`: slightly weaker natural depth-3 lower bound
- `5227`: 2026 source says that known natural property does not solve the HJP holdout
- `5228`: holdout naturalization question
- `5229`: QU / open

## Exact dual-role restriction split

The same HJP restriction is consumed in two logically different places.

### R-circuit — generic simplification

Fixing one variable in each target pair lets the proof kill bottom gates with too many negated inputs.

This role is about the hypothetical Pi-3 circuit and an averaging/conditional-expectation argument.

### R-target — semantic closure

For the specific HJP target, the same paired assignment transforms each two-literal block:

```text
(NOT x OR NOT y)
```

into one surviving negated literal.

Thus the full target becomes the block function required by Lemma 4.1.

This role depends on the target's pair/block semantics.

Therefore:

```text
one physical restriction
    !=
one semantic dependency
```

The rendering separates the two occurrences.

## First naturalization seam

The circuit-simplification role is not, by itself, the holdout: it is a generic operation on the candidate circuit.

The unresolved issue is preserving enough **hard target structure after simplification** using a property that is simultaneously:

```text
useful
large
AC0-constructive.
```

The exact block identity is one sufficient way to preserve the HJP target through the restriction. It is not claimed globally necessary.

The 2026 source gives an abstraction in terms of limit/k-limit properties and gives natural variants for neighboring functions, but explicitly states that the known natural property does not produce the same holdout separation.

Disposition:

```text
R-circuit: source-backed
R-target: source-backed
natural replacement for R-target at same asymptotic strength: QU
```

## Source-explicit abstraction firewall

The 2026 Appendix already abstracts HJP's target-specific proof into properties such as limitfulness and presents natural neighboring properties.

Therefore IsoGraph must not claim as novel that exact syntactic block identity can be replaced by a semantic limit property. That abstraction is source-explicit.

The open question is stronger:

```text
find a property accepted by the holdout target
that is:
    useful at the required Pi-3 lower-bound strength,
    large,
    AC0-constructive.
```

## Lower-bound direction

The source target is easy for one depth-3 polarity and hard for the dual polarity.

The rendering keeps that asymmetry explicit. It must not be flattened into a generic statement that the function is simply “hard for depth 3.”

## Authority boundary

This rendering uses source theorem/proof structure from HJP and the 2026 naturalization survey.

It is not independently formalized or machine checked.

No claim of non-naturalizability is made.
