# Experiment 006 — RUN-Q006-R3 Focused Qualification Review

**Status:** completed focused run; DP 0.3 did not qualify  
**Run:** `RUN-Q006-R3`  
**Qualification commit:** `850411c47467e3da3c37858a2b8edc69e5711117`  
**GitHub Actions run:** `35274993549`  
**Evidence artifact:** `10520610641`  
**Model:** `gemini-3.5-flash`  
**API attempts:** 1  
**HTTP status:** 200  
**Packet SHA-256:** `7f6321985e89518cd3851ea9aab1885ffc7a7ac658c0ab50a24ac3c5b53eebaf`  
**Report SHA-256:** `52075c4d6253dc3018e6bef45439cf09c08fe4bf60c74f5d2b13cf8756f18801`

## 1. Focused scope

R3 intentionally removed the prior QU/NEI case suite. The cold packet contained only:

- Core Draft 0.17;
- NEI 0.1 + NEI 0.2 clarification;
- DP 0.1 + DP 0.2 + DP 0.3 correction layers;
- Proof Alpha;
- Proof Beta;
- the focused R3 prompt.

The hidden proof oracle and scorer remained unavailable to the cold decoder.

Resource usage:

```text
GitHub qualification run: 1
Gemini semantic calls:    1
provider retries:         0
prompt tokens:            47,874
thought tokens:            3,360
output tokens:             1,054
```

This removes the earlier broad-suite attention confound as the primary explanation for the failure.

## 2. Frozen score

```text
DP 0.3 focused result: DOES_NOT_QUALIFY
matched motifs:           O1, O5
deep motifs:              none
```

The run again missed:

```text
O2  A04,A05 <-> B03,B04   boundary-directed encoding
O3  refinement/approximation bridge
O4  A06 <-> B06,B07,B08   obstruction layer
```

## 3. What improved

R3 did execute the new bookkeeping more faithfully than R2.

It recorded:

```text
cross_residual_pass.triggered = true
```

and supplied role passes including:

```text
A06 <-> B08
role: Obstruction / Impossibility Mechanism
result: CORRESPONDENCE
```

and:

```text
A03,A07,A08 <-> B03,B05,B06
role: Witness Generation / Refinement
result: INCOMPLETE
```

Most importantly, the NEI behavior improved.

R3 reported:

```text
separator.kind = STRUCTURAL_BREAKER
nei_result_if_load_bearing = INCOMPLETE_UNQUALIFIED
```

It did **not** repeat R2's unsupported claim that NEI had verified the residuals naturally distinct.

This is evidence that NEI 0.2's anti-presumption clarification and DP 0.3's evidence-matched identity burden materially improved identity handling.

## 4. Remaining decisive failure: structural-breaker relabeling

The stop still relied on:

> `Incompatible intermediate mathematical structures: discrete simplicial triangulations and limits (Alpha) vs. continuous retractions and algebraic functors (Beta).`

This was labeled:

```text
separator.kind = STRUCTURAL_BREAKER
```

But this is not yet a demonstrated structural breaker under the active comparison.

It states that the implementations/formulations differ. It does not identify a specific load-bearing incompatibility such as:

```text
relation preservation/reflection failure
constraint contradiction
arity mismatch
multiplicity mismatch
reversed dependency
incompatible boundary obligation
incompatible reconstruction obligation
rigid application/domain rule
```

The manual replay already established that discrete-versus-continuous machinery can coexist with the deeper role correspondences:

```text
A04,A05 <-> B03,B04
A06      <-> B06,B07,B08
```

Therefore R3 found a new escape hatch:

```text
representation/method difference
-> call it STRUCTURAL_BREAKER
-> terminate
```

This is the same underlying premature-separation behavior moved from NEI into the structural-separator category.

## 5. Cross-residual discovery was recorded but not promoted

The R3 decoder actually found part of the important obstruction relation:

```text
A06 <-> B08
```

inside `cross_residual_pass`.

However, it did not promote that role correspondence into the main `findings` / `common_core`, and it did not expand Beta's obstruction region to:

```text
B06,B07,B08
```

Likewise, it matched:

```text
A05 <-> B04
```

but did not expand backward to the encoder pair:

```text
A04,A05 <-> B03,B04
```

So the cross-residual gate became a side record rather than a mechanism that updates the discovery state.

The needed operational rule is small:

> A `CORRESPONDENCE` produced by a mandatory cross-residual pass becomes a discovery candidate that must be tested/expanded like any other correspondence before the same residual can be used as a terminal separator.

This does not require declaring it true or qualified; it prevents the agent from finding a correspondence in the gate and then ignoring it in the final decomposition.

## 6. Minimal structural-breaker clarification

The next DP clarification should avoid a long catalog or new ontology.

A compact rule is sufficient:

> **A structural breaker must identify a concrete failure of a load-bearing obligation under the active comparison/view authority. Merely naming different carriers, methods, technologies, mathematical formalisms, or decomposition styles is not by itself a structural breaker.**

Examples of qualifying breaker evidence include a specific preservation/reflection failure, incompatible constraint, cardinality mismatch, dependency reversal, required-interface mismatch, or reconstruction failure.

Application/domain authority remains respected: if an application explicitly declares a difference rigid/load-bearing, use `RIGID_AUTHORITY` rather than pretending the difference was discovered as a generic structural incompatibility.

This is consistent with the user's anti-presumption requirement:

- do not dismiss application-defined distinctions;
- do not silently strengthen them into NEI meaning;
- do not silently rebrand formulation differences as structural impossibility either.

## 7. Scorer issue found during R3

The focused scorer marked:

```text
cross_residual_deep_pass = PASS
```

because the `INCOMPLETE` role pass

```text
A03,A07,A08 <-> B03,B05,B06
```

overlapped oracle O3 sufficiently.

The scorer did not require the role-pass result itself to be `CORRESPONDENCE`.

This did not cause the overall R3 failure—the run still missed the main motif requirements—but a future scorer should count a deep role pass only when the pass result is actually `CORRESPONDENCE` (or another explicitly accepted supported state).

## 8. Disposition

```text
NEI 0.2 anti-presumption behavior: IMPROVED / supported by R3 behavior
DP 0.3 separator discipline:       PARTIAL
DP proof rediscovery:               DOES_NOT_QUALIFY
```

No further qualification rerun is justified without another explicit candidate/scorer revision.

The strongest remaining defect is no longer NEI overreach. It is DP accepting a category-level formulation difference as a structural breaker without a concrete failed structural obligation.
