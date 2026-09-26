# Navier–Stokes Rendering Modernization Review — Wave 02

**Status:** active modernization review  
**Source family:** `research/navier-stokes-proof/`  
**Pinned formal source:** `openai/NavierStokesAndEuler@f9e8bc5b38b6e212696e8a30e3e91517af887bbd`  
**Rule:** existing research artifacts remain preserved; native bytes change only when the new standard exposes a real semantic gap.

## Modernization result by native artifact

| Native artifact | Existing role | New-standard disposition | Native rewrite? |
|---|---|---|---|
| `NAVIER_STOKES_FORCED_BLOWUP_0_1.isg` | high-retention source rendering | Core 0.19 exact-source qualification burden remains open; explicit source-exact/source-derived/QU boundaries already exist | **successor required before exact-source qualification**, not rewritten yet |
| `REDUCED_FORMULA_0_2.isg` | derived 8-component proof/interface reduction | already has target coverage and deletion witnesses; reinterpret as **minimal under fixed G1–G8 deletion candidate space**, not minimum | no semantic rewrite required |
| `STANDARD_PHYSICAL_EQUIVALENCE_0_1.isg` | derived continuum equivalence proof | already separates exact continuum equivalence from finite-resolution measurement non-equivalence | no semantic rewrite required |
| `FRESH_SYNTHESIS_S0_3.isg` | source-relative proof-interface synthesis | source-relative sufficiency/deletion structure already explicit; global minimum not claimed | no semantic rewrite required |
| `S0_4_ATOMIC_MINIMALITY.isg` | 25-atom source-relative deletion graph | terminology already matches DP 0.8's **minimal/irreducible**, explicitly not cardinality minimum | no semantic rewrite required |
| `S0_5_GENERATOR_CLOSURE.isg` | generator/closure typed normal form | already prevents replacing a generator with its downstream consequence; smaller generative basis remains open | no semantic rewrite required |
| `DP_DISCOVERY_0_1.isg` | historical DP 0.1–0.4 discovery ledger | preserved predecessor; does not contain DP 0.8 sufficiency/valuation concepts | preserve |
| `DP_DISCOVERY_0_2_FRESH.isg` | fresh DP 0.1–0.4 discovery ledger | preserved predecessor; new DP 0.8 support analysis should be a successor view | **new successor view required** |

## 1. Main source rendering — actual gap

`NAVIER_STOKES_FORCED_BLOWUP_0_1.isg` is high-retention and well-provenanced, but its validation predates Core 0.19 exact source-rendering requirements.

Existing strengths:

- source revision pinned;
- contract fields mechanically covered;
- source-exact and source-derived relation types separated;
- QU incompleteness boundaries represented;
- NEI overclaims blocked;
- provenance edges retained.

Remaining exact-rendering burden:

- there is no ESR Q0–Q7 qualification packet proving complete native-only reconstruction of the full declared source-semantic object;
- parameterized property families compress lower-level semantics and therefore need an explicit Core 0.19 coverage argument before they can support an exact-source claim;
- existing deterministic validation is not cold reconstruction qualification.

Disposition:

```text
research rendering: retained
exact-source qualification: not established
modern successor: required before any exact-source promotion
```

The successor should be driven by an exact coverage audit, not by blindly expanding every Lean helper declaration.

## 2. RF-0.2 — DP 0.8 terminology correction

RF-0.2 already tests deletion of every G1–G8 component.

Under DP 0.8 terminology, the established statement is:

```text
declared target:
    represented whole-space R3/C + periodic/D interface obligations

declared candidate space:
    subsets of the fixed G1–G8 component vocabulary
    under deletion-only reduction

result:
    G1–G8 is minimal / irreducible under that removal relation

not established:
    globally smallest proof
    minimum over alternate factorizations
    minimum component count over all possible abstractions
```

This is already consistent with the original validation's non-claims.

No native semantic rewrite is justified solely to rename an already-correct result.

## 3. S0.4 — minimum versus minimal

S0.4 is an especially strong pre-existing positive example for DP 0.8.

It establishes:

- 25 source-backed interfaces;
- a first downstream consumer for every atom;
- a deletion witness for every atom;
- final-target reachability.

Therefore:

```text
minimal under subset deletion
within the declared 25-atom interface vocabulary
```

is supported.

A **minimum** claim is not supported because alternate interface vocabularies/factorizations are not exhausted.

The existing audit already says this. No rewrite is needed.

## 4. S0.5 — generator/consequence discipline

S0.5 already captures another new-standard principle:

```text
downstream consequence
    != substitute for the generator that establishes it
```

The typed split:

- 16 generators/structural mechanisms;
- 9 closure/bridge theorems;

prevents an apparently smaller graph from obtaining simplicity by postulating the desired conclusion.

This aligns with DP 0.8's sufficiency firewall.

No valuation profile is supplied, so S0.5 should not be ranked by transition count or another invented cost.

## 5. Standard physical equivalence

The 0.1 physical-equivalence graph already carries a critical scope boundary:

```text
exact dimensional continuum equivalence
    != finite-resolution measurement equivalence
```

That distinction must remain load-bearing under any support minimization.

No DP 0.8 reduction is currently requested, so no new minimum-support claim should be manufactured.

## 6. Discovery ledgers

DP 0.1 and fresh DP 0.2 remain historical discovery records.

They should not be rewritten to pretend DP 0.8 existed at the time.

A successor DP 0.8 view should instead import the current Navier family and explicitly record:

- declared objective(s);
- support cone / bounded objective-relevant slice;
- existing deletion-witness minimality results;
- minimum-not-established boundaries;
- any genuinely nonessential support found;
- valuation status only where an evaluable profile is supplied.

## 7. Next native work

Wave 02 native work should therefore be narrow:

1. create a DP 0.8 successor support/discovery graph rather than modifying old DP ledgers;
2. create a Core 0.19 source-coverage audit for `NAVIER_STOKES_FORCED_BLOWUP_0_1.isg`;
3. only if that audit exposes native semantic loss, author `NAVIER_STOKES_FORCED_BLOWUP_0_2.isg`;
4. do not create meaningless version bumps for RF/S0.3/S0.4/S0.5/physical-equivalence graphs whose existing native semantics already satisfy the new distinction being checked.

This preserves the project's "do nothing when nothing is needed" discipline.
