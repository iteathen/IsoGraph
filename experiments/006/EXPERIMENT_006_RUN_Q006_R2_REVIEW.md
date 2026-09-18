# Experiment 006 — RUN-Q006-R2 Frozen Qualification Review

**Status:** completed R2 evidence; integrated qualification did not pass  
**Run:** `RUN-Q006-R2`  
**Qualification commit:** `4e29435b53d5f34eeac527acbe9b64d59dec61f0`  
**GitHub Actions run:** `35272524596`  
**Successful evidence artifact:** `10518692928` (`isograph-exp006-RUN-Q006-R2`)  
**Initial provider-failure artifact:** `10519287879`  
**Model:** `gemini-3.5-flash`  
**Selected discovery authority:** DP 0.1 + DP 0.2 correction layer

## 1. Resource/provenance result

The first workflow attempt reached Gemini but received HTTP 503 after the runner's one permitted 5xx retry:

```text
workflow attempt 1
Gemini API attempts: 2
final provider status: 503
semantic report: none
```

Because this was an explicit provider/infrastructure failure, the exact same failed job was rerun once without changing the qualification commit, corpus, prompt, oracle, or scorer.

The infrastructure retry succeeded:

```text
workflow attempt 2
Gemini API attempts: 1
provider status: 200
semantic report: frozen
```

Total R2 external usage:

```text
GitHub workflow run IDs: 1
GitHub job attempts:      2
Gemini API attempts:      3
successful semantic reports: 1
```

No additional verifier call was used.

## 2. Frozen deterministic score

```text
QU:         QUALIFIES            13 / 13
NEI:        PARTIAL              16 / 17
DP:         DOES_NOT_QUALIFY
Integrated: DOES_NOT_QUALIFY
```

The QU scorer normalization correction successfully removed the RUN-Q006 singular/plural spelling false negative.

NEI-13 remained unchanged and again produced `NO_ADMISSIBLE_MODEL` rather than scorer-expected `INCOMPLETE_UNQUALIFIED`; R2 therefore confirms the previously identified NEI result-status ambiguity rather than resolving it.

## 3. DP comparison with RUN-Q006

RUN-Q006 matched only oracle motifs:

```text
O1 contradiction architecture
O5 terminal contradiction
```

RUN-Q006-R2 again matched only:

```text
O1 contradiction architecture
O5 terminal contradiction
```

No deep motif was recovered:

```text
O2 boundary-directed local encoding: MISS
O3 refinement / approximation bridge: MISS
O4 parity versus global obstruction: MISS
```

Thus DP 0.2 did not qualify on the unchanged benchmark.

## 4. What DP 0.2 changed in the cold behavior

The R2 decoder did visibly consume some DP 0.2 concepts.

It used:

```text
DP-24 proof/witness topology
DP-04 dependency topology
DP-10 role equivalence
DP-02 constraint structure
DP-20 exclusion structure
DP-37 equivalent closure
DP-38 NEI distinction audit
```

It also explicitly stated that DP-38 was promoted because the intermediate steps differed representationally.

That is an improvement over RUN-Q006 at the level of protocol selection.

However, the added protocols did not change the decisive decomposition.

## 5. Repeated decomposition failure

### 5.1 Encoder/boundary layer remained under-decomposed

R2 found:

```text
A05 <-> B04,B05
```

and described both as boundary conditions.

But it did not include:

```text
A04 <-> B03
```

as the corresponding displacement-to-boundary encoder layer.

Therefore it missed oracle motif O2, which requires recognizing the combined role:

```text
nonzero displacement/defect
    -> boundary-directed representation
    -> boundary compatibility

Alpha: A04,A05
Beta:  B03,B04
```

R2 moved one step closer than RUN-Q006 by matching boundary enforcement explicitly, but it still failed to decompose the encoder plus boundary condition as one common functional region.

### 5.2 Obstruction nodes were misaligned again

R2 again mapped:

```text
A09,A10 <-> B08,B09,B10
```

and called both a global obstruction/contradiction layer.

This repeats the central RUN-Q006 alignment error.

`A09` is witness decoding from limiting coordinate inequalities to an exact fixed point. It is not the analogue of `B08`.

The stronger role alignment remains:

```text
A06 <-> B06,B07,B08
```

where both regions carry the no-extension / obstruction burden.

R2 left `A06`, `B06`, and `B07` in the residual set and therefore missed oracle motif O4.

### 5.3 Approximation bridge remained entirely residual

R2 left:

```text
Alpha: A03,A07,A08
Beta:  B03/B04 relationship not connected to them
```

without discovering the role-level approximation bridge expected by O3.

No multi-scale/refinement correspondence was developed.

## 6. DP 0.2 NEI audit was invoked but not actually discharged

This is the most important new failure exposed by R2.

The cold report's stop reason says:

> the intermediate steps ... are verified as representationally distinct residuals under the NEI distinction audit

But the report does not supply a qualified NEI identity profile, fixed evidence revision, QU state if required, identity-separating law, or NEI result establishing `DISTINCT` for the residual proof-role regions.

The discovery output schema also had no explicit fields requiring the agent to record:

```text
nei_distinction_audit_triggered
nei_profile_revision
nei_evidence_revision
nei_qu_revision_if_any
nei_result_or_incomplete_reason
separator_authority
```

although DP 0.2 adds those fields to its discovery ledger.

Consequently, the agent was able to *say* it performed an NEI audit without demonstrating that the audit produced a qualified separator.

This violates the intended DP 0.2 routing:

```text
role correspondence
-> NEI distinction audit
-> only qualified DISTINCT may become a natural separator
-> UNKNOWN/incomplete cannot justify terminal divergence
```

No qualified `DISTINCT` was established in R2.

Therefore the R2 stop reason is unsupported under DP 0.2 itself.

## 7. Cross-residual gate was named in authority but not operationally enforced

The residual had the canonical gate shape:

```text
matched no-fixed-point assumption
        |
        v
large unmatched middle
        |
        v
matched final contradiction / target discharge
```

DP 0.2 requires another role/factorization pass before terminal divergence.

R2's protocol list did not include DP-07 alternative factorization, DP-11 invariant-across-formulation, or DP-13 multi-scale comparison, and it did not produce a recorded cross-residual gate state.

It therefore treated the mandatory gate as advisory prose rather than a completion obligation.

## 8. Implication for DP 0.2

R2 shows that the conceptual correction is directionally correct but not sufficiently operational for an agent to reliably execute it.

The next correction pressure is not merely "add more explanation." The protocol needs a **dischargeable discovery obligation**:

```text
if cross-residual trigger conditions hold:
    a gate record MUST exist
    AND at least one recursive factorization/role pass MUST be recorded
    AND any NEI-based separator MUST carry an explicit qualified NEI result or explicit incomplete/UNKNOWN status
    AND stop is invalid until those fields are discharged
```

In other words, DP needs the same obligation-sufficiency discipline already used elsewhere in IsoGraph: mandatory discovery gates should be represented as obligations whose absence is mechanically visible, not only as prose instructions an agent can claim to have followed.

## 9. Benchmark/harness implication

The R2 output schema reused the RUN-Q006 DP shape and therefore did not require DP 0.2's new ledger fields.

That made the test weaker as a conformance test for the new correction layer.

A future R3 test should preserve the same hidden proof oracle but require explicit records for:

```text
cross_residual_gate_triggered
residual_attachment_points
role_decomposition_attempted
alternate_factorizations_attempted
asymmetric_black_box_status
nei_distinction_audit_triggered
nei_result_or_incomplete_reason
separator_authority
stop_justification
```

This would make it impossible to pass or terminate merely by mentioning NEI or cross-residual reasoning without discharging the corresponding discovery obligations.

## 10. Frozen disposition

```text
QU:  QUALIFIES on all 13 controls
NEI: PARTIAL; NEI-13 ambiguity reproduced
DP:  DOES_NOT_QUALIFY; deep hidden unification still not rediscovered
Integrated: DOES_NOT_QUALIFY
```

RUN-Q006-R2 remains immutable evidence for the exact qualification commit. No DP/NEI/QU candidate is modified by this review.
