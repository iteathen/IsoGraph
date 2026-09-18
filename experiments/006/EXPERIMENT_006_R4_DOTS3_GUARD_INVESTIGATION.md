# Experiment 006 — R4 Dots3 Guard Investigation

**Status:** scorer/prompt investigation only; historical cold score remains unchanged  
**Source cold run:** `iteathen/OX-Alpha-Contol` Actions run `35298420470`  
**Frozen model:** `dots-studio/dots-3-note-preview:free`  
**Frozen packet SHA-256:** `89042dd96a762919e7b373385f1cbadc4cca6d29bc53acacce63237623bc3c9c`  
**Frozen report SHA-256:** `13dc83d197477863e32f279f9e097bc87f18c2e9dc627c5acf2f06c2939006e1`

## 1. Original score

The unchanged R4 scorer produced:

```text
DOES_NOT_QUALIFY
motifs: O1, O2, O4, O5
deep: O2, O4
```

Exactly two guards failed:

```text
beta_residuals_preserved
cross_residual_deep_correspondence
```

The run therefore met the motif threshold and deep-motif threshold.

## 2. Frozen Dots3 structure

Main findings included:

```text
A04,A05 <-> B03,B04
    boundary-compatible encoding

A06 <-> B06,B07,B08
    invariant / obstruction
```

Those are exact hidden-oracle O2 and O4 regions.

The common core likewise recorded:

```text
boundary-compatible encoding
invariant distinguishing boundary from interior
contradiction discharge
```

The report preserved Alpha residual steps:

```text
A03, A07, A08
```

but listed only:

```text
B05
```

as Beta residual.

Its cross-residual pass then operated on the remaining unmatched material:

```text
A03 <-> B05       INCOMPLETE
A07,A08 <-> []    INCOMPLETE
```

and returned `INCOMPLETE`, without inventing a breaker or identity distinction.

## 3. cross_residual_deep_correspondence is path-sensitive

Current R4 scoring sets:

```text
cross_residual_deep_correspondence = true
```

only when a `CORRESPONDENCE` entry *inside* `cross_residual_pass.role_passes` independently satisfies a hidden deep motif.

That requirement is stronger than DP 0.4.

DP 0.4 requires:

1. the mandatory residual pass to be real discovery work;
2. any correspondence found in that pass to re-enter the normal candidate path;
3. one-node/subgraph alignment where appropriate;
4. the proof-pair regression to recover a deep encoder/boundary **or** obstruction correspondence;
5. real method-specific residuals to remain preserved.

It does not require a deep correspondence already present in the main candidate to be rediscovered again inside the residual ledger.

Dots3 found O2 and O4 before the remaining residual pass. The residual gate then examined only the leftover Alpha refinement/witness material and Beta B05.

Requiring O2/O4 to occur again inside that reduced residual pass makes qualification dependent on discovery order/output factorization rather than represented discovery content.

### Finding

```text
cross_residual_deep_correspondence
```

should not be a mandatory independent qualification guard.

The existing combination is sufficient and path-independent:

```text
deep_motif_found
cross_residual_triggered
cross_residual_role_pass_recorded
cross_residual_correspondences_handled
```

If the gate itself discovers a correspondence, the existing handling guard already verifies that it is promoted, expanded, or concretely falsified.

The historical score must not be rewritten; this is a harness defect identified after freeze.

## 4. beta_residuals_preserved exposes a schema ambiguity

DP 0.2 explicitly permits a region to have a shared role while retaining representation-specific residual structure:

```text
preserve both deeper common structure and genuine residual
```

and for NEI SAME routing:

```text
preserve ... representation-specific residuals
```

The historical decomposition replay likewise treats:

```text
A04,A05 <-> B03,B04
A06       <-> B06,B07,B08
```

as role correspondences while still requiring method-specific residual preservation.

Therefore finding membership and residual membership are not mutually exclusive.

But the R4 prompt says only:

```text
Preserve Alpha-specific and Beta-specific residual step IDs.
```

It never tells a cold decoder that:

- residual means *unmatched method/formulation content after role abstraction*, not merely a top-level unmatched step;
- a step ID may appear in both a correspondence finding and a residual list.

Dots3's behavior is exactly what this ambiguity predicts: it matched B03/B04 and B06-B08 at role level, described their Beta-specific retraction/algebraic machinery in prose, then omitted them from `beta_residual_steps` because they were already represented as matched.

### Finding

The residual guard is legitimate in intent, but the output contract is under-specified.

The next cold prompt should state explicitly:

> Residual membership is orthogonal to correspondence membership. A step may appear in both a finding and a residual list when its load-bearing role corresponds but its local method, representation, factorization, or machinery remains specific to one proof.

The scorer should continue requiring at least two residual-pool IDs per side after that clarification. It should not infer residual membership from prose post hoc.

Therefore the frozen Dots3 result still does not formally pass.

## 5. Minimal corrected qualification harness

No DP 0.4 semantic revision is justified by this investigation.

A corrected successor harness should make exactly two changes:

1. **Prompt/schema clarification:** define residual-list overlap as above.
2. **Scorer correction:** remove `cross_residual_deep_correspondence` as an independent mandatory guard; retain it as diagnostic evidence only.

Keep unchanged:

- hidden oracle motifs;
- four-of-five motif threshold;
- at least one deep motif requirement;
- per-finding width;
- residual minimums;
- overclaim rejection;
- `SUPPORTED_CANDIDATE` requirement;
- mandatory cross-residual trigger/role-pass record;
- correspondence re-entry enforcement;
- structural-breaker legality;
- all frozen historical scores.

## 6. Counterfactual on the frozen Dots3 report

Under the corrected path-independent gate logic:

```text
deep main finding present: yes
cross-residual gate triggered: yes
role passes recorded: yes
unhandled cross-residual correspondences: zero
```

The cross-residual defect disappears.

Dots3 still fails the historical residual field because it emitted only B05 in `beta_residual_steps`.

Its prose/main findings mention all Beta machinery in the residual pool:

```text
B03, B04, B06, B07, B08
```

but those IDs must not be retroactively inserted into the frozen output.

## 7. Disposition

```text
DP 0.4 semantic revision needed: NO
R4 scorer defect found: YES
R4 prompt/schema ambiguity found: YES
Frozen Dots3 formal pass: NO
Corrected successor qualification warranted: YES
```
