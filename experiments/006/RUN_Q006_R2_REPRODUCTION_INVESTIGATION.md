# Experiment 006 — RUN-Q006-R2 Reproduction and Investigation

**Status:** post-freeze reproduction/investigation; not qualification evidence  
**Frozen R2 qualification commit:** `4e29435b53d5f34eeac527acbe9b64d59dec61f0`  
**Actions run:** `35272524596`  
**Successful semantic artifact:** `10518692928`  
**Purpose:** independently reproduce the R2 discovery task from the frozen packet, determine whether the benchmark contains enough information to satisfy the hidden oracle, and isolate whether the failure lies in source information, DP semantics, DP execution, NEI integration, or the qualification harness.

---

## 1. Reproduction basis

The successful R2 artifact was unpacked and inspected directly.

Frozen packet properties:

```text
packet bytes:          240,937
prompt tokens:          50,778
model thoughts tokens:  15,431
model output tokens:     2,721
finish reason:           STOP
provider status:         200
```

The R2 packet correctly included both:

```text
extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md
extensions/discovery/DISCOVERY_PROTOCOLS_0_2_CANDIDATE.md
```

so the failure is **not** caused by omitting DP 0.1's base authority.

The R2 prompt also explicitly instructed the decoder to apply DP 0.1 together with the DP 0.2 correction layer.

---

## 2. Frozen R2 behavior reproduced

The R2 decoder used:

```text
DP-24 proof/witness topology
DP-04 dependency topology
DP-10 role equivalence
DP-02 constraint structure
DP-20 exclusion structure
DP-37 equivalent closure
DP-38 NEI distinction audit
```

It found four reported correspondences:

```text
A01              <-> B01
A02              <-> B02
A05              <-> B04,B05
A09,A10          <-> B08,B09,B10
```

and retained:

```text
Alpha residual: A03,A04,A06,A07,A08
Beta residual:  B03,B06,B07
```

Its stopping rationale stated that the residual mechanisms had been verified as representationally distinct under an NEI distinction audit.

The hidden oracle scored only:

```text
O1 contradiction architecture
O5 terminal contradiction
```

and no deep motif.

---

## 3. Independent manual conformance replay

The same frozen Alpha/Beta proof artifacts were then analyzed without changing either artifact and without using the hidden oracle during the decomposition step.

The minimum robust role decomposition is:

### 3.1 Shared premise layer

```text
A02 <-> B02
```

Both negate the target and thereby establish a nonzero displacement/defect condition everywhere.

### 3.2 Boundary-directed encoding layer

```text
A04,A05 <-> B03,B04
```

Role factorization:

```text
nonzero displacement / defect
    -> encode defect toward a boundary-indexed object
    -> enforce compatibility at the boundary
```

Alpha realization:

```text
choose displacement coordinate j
-> label vertex j
-> face j excludes label j
```

Beta realization:

```text
choose displacement ray direction
-> distinguished boundary point
-> boundary points are fixed by the construction
```

This is a role correspondence, not literal carrier identity.

### 3.3 Obstruction layer

```text
A06 <-> B06,B07,B08
```

Role factorization:

```text
boundary-compatible data
    -> transport/count through an invariant
    -> show an interior extension without the required witness is impossible
```

Alpha realizes this as a parity/full-label obstruction.

Beta realizes it as a functorial invariant plus impossible factorization through a trivial interior invariant.

Again, no claim of literal identity between parity and the algebraic invariant is needed to recognize their common load-bearing obstruction role.

### 3.4 Terminal discharge layer

```text
A09,A10 <-> B08,B09,B10
```

There is a shared outer contradiction/discharge role, while method-specific residual remains explicit:

- Alpha decodes limiting finite witnesses into an exact fixed point;
- Beta rules out the retraction directly.

### 3.5 Conservatively sufficient oracle coverage

The manual replay intentionally did **not** rely on the more interpretive approximation motif O3.

Using only the correspondences above, the unchanged scorer matches:

```text
O1 PASS
O2 PASS  deep
O4 PASS  deep
O5 PASS
```

That is four motifs including two deep motifs, sufficient for the existing DP qualification threshold.

All other existing guards can also be discharged:

```text
finding width               PASS
>=4 findings                PASS
>=4 oracle motifs           PASS
deep motif                  PASS
Alpha residual preservation PASS
Beta residual preservation  PASS
overclaim rejection         PASS
SUPPORTED_CANDIDATE         PASS
relevant protocols          PASS
falsification records       PASS
common core                 PASS
reranking rationale         PASS
stop rationale              PASS
```

Therefore:

> **The frozen proof pair contains sufficient information for a DP-conforming agent to pass the unchanged DP oracle without external historical knowledge and without relying on O3.**

This rules out benchmark information insufficiency as the primary explanation for R2's DP failure.

---

## 4. Exact decomposition failure reproduced

The decisive error is still the same alignment error exposed after RUN-Q006.

R2 treated:

```text
A09,A10 <-> B08,B09,B10
```

as the principal obstruction correspondence.

But dependency-role decomposition shows:

```text
A09 = witness decoder / exact-target reconstruction
B08 = obstruction / impossible factorization
```

They do not occupy the same load-bearing role.

The obstruction is one layer earlier on Alpha:

```text
A06 <-> B06,B07,B08
```

Once this is aligned correctly, `A04,A05 <-> B03,B04` becomes visible as the preceding encoder/boundary layer.

Thus the missed structure did not require discovering a subtle historical theorem name. It required honoring DP 0.2's own dependency-role alignment rule.

---

## 5. NEI reproduction: what a proper audit would actually return

DP 0.2 requires NEI before a same-role representational difference is used as a natural separator.

For either candidate pair:

```text
A04,A05 versus B03,B04
A06 versus B06,B07,B08
```

the frozen packet supplies:

- structural role evidence;
- different SIs / source steps / formulations;
- no explicit natural-identity profile proving these proof-role regions `SAME`;
- no qualified natural disequality / identity-separating law proving them `DISTINCT`.

Under NEI 0.1, a determinate claim cannot be settled merely from absence of contrary evidence.

Therefore the correct audit outcome from the supplied authority is **not** a qualified `DISTINCT`.

Without an independently pinned profile/bridge sufficient to settle identity, the audit is best classified as:

```text
INCOMPLETE_UNQUALIFIED
```

for natural identity.

Operational consequence under DP 0.2:

```text
NEI audit incomplete
    -> cannot infer SAME
    -> cannot infer DISTINCT
    -> representational difference cannot become a stopping separator
    -> continue cross-residual decomposition while information value remains material
```

R2 instead claimed that the residuals were “verified as representationally distinct under the NEI distinction audit.”

No such qualified NEI result was supplied.

This is a direct DP 0.2 conformance failure.

---

## 6. Qualification-harness defect: DP 0.2 obligations were not representable in the required output

DP 0.2 adds discovery-ledger fields including:

```text
cross_residual_gate_triggered
residual_attachment_points
role_decomposition_attempted
alternate_factorizations_attempted
asymmetric_black_box_status
nei_distinction_audit_triggered
nei_profile_revision
nei_evidence_revision
nei_qu_revision_if_any
nei_result_or_incomplete_reason
separator_authority
stop_justification
```

But `COLD_Q006_R2_PROMPT.md` reused the old DP 0.1 output schema and required exactly:

```text
protocols_used
reranking_reason
findings
common_core
alpha_residual_steps
beta_residual_steps
rejected_overclaims
promotion
stop_reason
```

There is no required field for:

- cross-residual gate discharge;
- recursive factorization attempt;
- actual NEI query/profile/evidence;
- NEI outcome;
- separator authority.

The prompt also says the returned object MUST have the supplied shape, discouraging extra conformance fields.

Consequently, R2 permitted this invalid pattern:

```text
mention DP-38
say “NEI distinction audit” in prose
claim the residual is distinct
stop
```

without mechanically visible evidence that the required gate was actually discharged.

This means R2 was a useful **behavioral regression test**, but it was not a complete conformance qualification for DP 0.2's newly introduced obligations.

---

## 7. Scorer defect: new DP 0.2 obligations were not scored

The R2 deterministic scorer remained essentially the RUN-Q006 scorer.

It checked:

- motif overlap;
- residual preservation;
- overclaim rejection;
- protocol IDs;
- falsification text;
- promotion;
- generic reranking/stop text.

It did **not** check:

```text
cross-residual gate triggered?
role decomposition actually recorded?
alternate factorization attempted?
NEI distinction audit actually instantiated?
what NEI result was obtained?
was separator authority qualified?
was stop legal under that NEI result?
```

Therefore even a hypothetical R2 motif pass would not, by itself, have qualified the most important new DP 0.2 semantics.

---

## 8. Integrated-packet attention pressure

R2's cold packet contained approximately:

```text
50,778 input tokens
30 QU/NEI semantic control cases
DP 0.1 full protocol module
DP 0.2 correction layer
Core authority
QU authority
NEI authority
proof pair
```

The model spent approximately:

```text
15,431 thought tokens
2,721 output tokens
```

This does not prove that context size caused the failure. However, the test combines a large number of relatively mechanical QU/NEI classification controls with one qualitatively harder structural-discovery task in a single invocation.

That creates a plausible **attention-allocation confound**:

```text
resource-efficient batching
    may reduce external-call count
    while also diluting reasoning effort on the highest-complexity control
```

This should be isolated rather than assumed.

A future conformance run can remain resource-efficient while giving the DP benchmark a dedicated semantic call, or by removing already-qualified/redundant QU cases from the DP-specific revision test.

The correct optimization target is information per external call, not minimum call count at any cost.

---

## 9. Root-cause classification

### Not the primary cause

```text
benchmark lacks enough structure        NO
DP 0.1 omitted from R2 packet           NO
hidden oracle requires O3 to pass       NO
provider failure on successful attempt  NO
```

### Demonstrated causes

```text
R2 decoder violated dependency-role alignment       YES
R2 decoder failed mandatory cross-residual recursion YES
R2 decoder asserted NEI distinction without authority YES
R2 prompt omitted DP 0.2 gate-discharge fields       YES
R2 scorer omitted DP 0.2 gate-discharge checks       YES
```

### Plausible but not established

```text
50k-token integrated packet diluted DP reasoning      POSSIBLE
model-specific reasoning weakness                     POSSIBLE
benchmark A06 black-box asymmetry increased difficulty POSSIBLE CONTRIBUTOR
```

---

## 10. What a valid next conformance test must require

A corrected DP 0.2 conformance output must make gate discharge explicit.

At minimum, for every terminal residual branch:

```json
{
  "cross_residual_gate": {
    "triggered": true,
    "upstream_matches": ["..."],
    "downstream_matches": ["..."],
    "residual_alpha": ["..."],
    "residual_beta": ["..."],
    "role_decomposition": ["..."],
    "alternate_factorizations_attempted": ["..."],
    "result": "DEEPER_CORRESPONDENCE|BREAKER|INCOMPLETE|DORMANT"
  },
  "nei_distinction_audit": {
    "triggered": true,
    "subjects": ["...", "..."],
    "profile_authority": "...|UNAVAILABLE",
    "evidence_authority": "...|UNAVAILABLE",
    "qu_authority": "...|NOT_REQUIRED|UNAVAILABLE",
    "result": "SAME|DISTINCT|UNKNOWN|NO_ADMISSIBLE_MODEL|INCOMPLETE_UNQUALIFIED",
    "separator_authorized": false
  }
}
```

The deterministic scorer should reject a stop when:

```text
cross-residual trigger exists
AND gate record missing
```

or when:

```text
NEI separator is invoked
AND result != qualified DISTINCT
AND stop relies on natural distinctness
```

This converts the correction from advisory prose into a dischargeable obligation.

---

## 11. Minimal next benchmark

The next revision test does not need another broad QU/NEI campaign.

A high-information, low-cost test should use:

```text
Core authority required for comparison
NEI authority required for distinction audit
DP 0.1 + DP 0.2
same Alpha/Beta proof pair
same hidden DP oracle
new DP 0.2 gate-aware output schema
new deterministic gate scorer
```

QU is included only if the selected NEI audit actually requires unresolved identity-relevant structure.

The expected audit for the current proof pair, absent an independently supplied natural-identity profile, is:

```text
INCOMPLETE_UNQUALIFIED
```

which must **prevent**, not authorize, terminal separation.

The discovery agent should then continue decomposition and can pass conservatively by recovering:

```text
O1 + O2 + O4 + O5
```

without needing O3.

---

## 12. Conclusion

RUN-Q006-R2 is reproducibly diagnosable.

The benchmark contains enough visible relational structure to recover a qualifying deep common core.

The principal failure was not lack of information. It was failure to turn DP 0.2's new conceptual rules into **obligations that the agent had to explicitly discharge**.

The cold decoder consequently performed a lexical/prose imitation of the new behavior:

```text
used DP-38 label
mentioned an NEI audit
called residuals distinct
stopped
```

without actually proving a natural distinction or recursively decomposing the residual.

The next correction should therefore focus on **operational gate records and deterministic conformance checks**, not additional explanatory prose.