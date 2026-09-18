# Experiment 006 — OpenRouter Free Behavioral Review

**Status:** independent post-freeze behavioral evidence; not formal qualification  
**Control run:** `iteathen/OX-Alpha-Contol` Actions run `35290213466`  
**Target branch:** `iteathen/IsoGraph@spec/nei-qu-rewrite`  
**Model request:** `openrouter/free` free-model router  
**Purpose:** obtain an independent focused R4 decoder result after Gemini free-tier daily quota exhaustion.

## Execution provenance

The mobile-safe Ox control workflow reached OpenRouter successfully after earlier infrastructure-only failures were repaired.

The successful semantic request used:

```text
OpenRouter route: openrouter/free
Aider repo-map: disabled
target: iteathen/IsoGraph
base branch: spec/nei-qu-rewrite
```

The model returned a complete R4 analysis in the workflow log. Aider did not materialize the requested Markdown report because the response was emitted as report content rather than an Aider edit patch. Therefore no target PR was created from this run.

The frozen workflow log is the evidence source. Hidden scorer/oracle material was inspected only afterward.

## Isolation limitation

This result is **not formal cold qualification evidence**.

The control runner additionally supplied account-global `AGENTS.md`, target `AGENTS.md`, and `CONTRIBUTING.md` as read-only context. The model's hidden reasoning also recognized the Alpha proof tradition by name despite the task instruction not to use theorem-name recognition as evidence.

Accordingly this result is useful behavioral/conformance evidence only.

## Recovered structure

The decoder reported five main findings, including:

```text
A02 <-> B02
    contradiction/no-fixed-point premise

A05 <-> B04,B05
    boundary-condition role

A06 <-> B07,B08
    obstruction/exclusion role

A03,A04,A07,A08,A09 <-> B03,B04,B06
    asymmetric encoder/witness/decoder region

A10 <-> B10
    contradiction discharge
```

Its mandatory cross-residual pass separately recorded:

```text
A03,A04 <-> B03
    encoder/representation correspondence
    candidate disposition: PROMOTED

A05 <-> B04,B05
    boundary/side-condition correspondence
    candidate disposition: PROMOTED

A06 <-> B07,B08
    obstruction/exclusion correspondence
    candidate disposition: PROMOTED

A07,A08,A09 <-> B03,B04,B06
    witness-generation/decoder correspondence
    candidate disposition: EXPANDED
```

The decoder explicitly refused to treat differing mathematical machinery as a structural breaker:

```text
separator.kind = NONE
separator.breaker.obligation_kind = NONE
nei_result_if_load_bearing = NOT_APPLICABLE
promotion = SUPPORTED_CANDIDATE
stop_kind = SUPPORTED_CANDIDATE
```

It also rejected:

```text
FULL_PROOF_ISOMORPHISM
NATURAL_IDENTITY
SAME_INTERMEDIATE_OBJECTS
```

## Hidden-oracle score after freeze

Applying the current hidden Experiment 006 R4 scorer to the frozen answer gives:

```text
matched motifs:
    O1
    O3
    O4
    O5

deep motifs:
    O3
    O4
```

All current R4 guards pass except one:

```text
finding_width_valid: FAIL
```

The failing finding used five Alpha step IDs:

```text
A03,A04,A07,A08,A09 <-> B03,B04,B06
```

while the prompt/scorer permits at most four steps per side per finding.

Every other guard passed:

```text
enough_findings
enough_motifs
deep_motif_found
alpha_residuals_preserved
beta_residuals_preserved
overclaims_rejected
supported_candidate
falsification_recorded
common_core_recorded
reranking_explained
cross_residual_triggered
cross_residual_role_pass_recorded
cross_residual_deep_correspondence
cross_residual_correspondences_handled
separator_legal
structural_breaker_concrete_if_used
stop_kind_legal
dormant_not_false_rejection
```

Automatic disposition under the exact R4 scorer:

```text
DOES_NOT_QUALIFY
```

because qualification requires every guard.

## Interpretation

This run is strong evidence that DP 0.4 corrected the substantive failure exposed by R3:

- formulation difference was not relabeled as a breaker;
- deep obstruction correspondence was recovered;
- cross-residual correspondences were promoted/expanded;
- the decoder preserved residual machinery;
- no unsupported NEI distinction was invented.

The remaining scorer miss is output-shape compliance rather than the prior semantic discovery failure.

However, because the control route was not strictly cold and the model used theorem-recognition language in hidden reasoning, this result must not be promoted into formal DP 0.4 qualification.

A future clean R4 execution should use a direct cold API packet rather than an Aider coding-agent wrapper, preserve the existing hidden oracle, and enforce the four-step finding width in the prompt/output validation before scoring.
