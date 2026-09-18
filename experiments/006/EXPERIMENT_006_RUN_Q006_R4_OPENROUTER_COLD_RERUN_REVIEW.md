# Experiment 006 — RUN-Q006-R4 Direct OpenRouter Cold Rerun Review

**Status:** clean focused cold rerun completed; DP 0.4 automatic scorer still reports `DOES_NOT_QUALIFY`  
**Qualification target:** `iteathen/IsoGraph@24a7a49a58214a281ae5fe8c553f99e18f229cfb`  
**Control repository:** `iteathen/OX-Alpha-Contol`  
**GitHub Actions run:** `35297059430`  
**Decoder request/resolved model:** `nvidia/nemotron-3-ultra-550b-a55b:free`  
**Provider:** Nvidia via OpenRouter  
**API attempts:** 1  
**HTTP status:** 200  
**Cost:** 0  
**Packet SHA-256:** `c4984dd4394fa0e0255ec3fd2ca74bb39a781547581fc5feeb9d1f98740f092f`  
**Report SHA-256:** `fda37d68af657f7d826db00e667ccf9ff60c2c24c624b92a7b47503e18ba66bc`

## 1. Purpose

This rerun repeated the exact direct-cold R4 qualification after IsoGraph Actions artifact cleanup.

The semantic inputs were unchanged from the prior direct cold run:

- same frozen IsoGraph SHA;
- same R4 packet;
- same decoder model;
- same hidden scorer;
- no Aider;
- no repo map;
- no agent guidance;
- no prior Experiment 006 outputs supplied before inference;
- hidden oracle/assertions used only after the semantic response was frozen.

Only the control request nonce changed.

## 2. Provider result

The direct request completed normally:

```text
HTTP status: 200
API attempts: 1
finish reason: stop
prompt tokens: 48,564
completion tokens: 4,413
reasoning tokens: 2,288
total tokens: 52,977
cost: 0
```

## 3. Automatic score

The exact current R4 scorer returned:

```text
disposition: DOES_NOT_QUALIFY

matched motifs:
  O1
  O4
  O5

deep motifs:
  O4

separator:
  NONE

NEI result if load-bearing:
  NOT_APPLICABLE

unhandled cross-residual correspondences:
  0
```

All guards passed except:

```text
enough_motifs: false
```

The scorer therefore failed only because it counted three motifs rather than the required four.

## 4. Actual frozen findings

The decoder returned the following main structural findings:

```text
A01,A02 <-> B01,B02
    domain + no-fixed-point premise

A03,A04 <-> B03
    encoder / representation
    discrete approximation + labeling versus continuous ray construction

A05 <-> B04,B05
    boundary / side-condition
    boundary-label exclusion versus retraction fixing boundary

A06 <-> B06,B07,B08
    invariant / obstruction
    combinatorial parity versus functorial algebraic obstruction

A07,A08,A09 <-> B09
    witness decoding
    refinement/compactness/continuity versus direct rejection of retraction
```

The mandatory cross-residual pass separately promoted exactly the same role correspondences:

```text
A03,A04 <-> B03
    CORRESPONDENCE / PROMOTED

A05 <-> B04,B05
    CORRESPONDENCE / PROMOTED

A06 <-> B06,B07,B08
    CORRESPONDENCE / PROMOTED

A07,A08,A09 <-> B09
    CORRESPONDENCE / PROMOTED
```

The final separator remained:

```text
kind: NONE
NEI: NOT_APPLICABLE
promotion: SUPPORTED_CANDIDATE
stop_kind: SUPPORTED_CANDIDATE
```

The decoder explicitly rejected:

```text
FULL_PROOF_ISOMORPHISM
NATURAL_IDENTITY
SAME_INTERMEDIATE_OBJECTS
```

## 5. Scorer composition mismatch is now directly demonstrated

The hidden O2 oracle is:

```text
Alpha: A04,A05
Beta:  B03,B04

boundary-directed local encoding
```

The frozen cold report independently recovered both halves:

```text
A03,A04 <-> B03
    encoder / representation

A05 <-> B04,B05
    boundary / side-condition
```

These findings jointly contain:

```text
A04,A05 <-> B03,B04
```

and the report's common core explicitly orders them as:

```text
encoder: construct structured object from assumption
boundary condition: construction constrained on boundary
obstruction: structural impossibility from constructed object + boundary condition
```

Nevertheless, the current scorer marks O2 false because its implementation searches for all required O2 overlaps inside **one individual finding**.

Therefore the rerun now directly demonstrates a scorer/factorization mismatch: a decoder can recover the O2 composite structure as two adjacent promoted dependency-connected correspondences and still receive no O2 credit.

This is no longer merely inferred from the earlier non-cold behavioral run.

## 6. O3 remains a genuine miss under the current report

The O3 oracle is:

```text
Alpha: A03,A07,A08
Beta:  B03,B04

refinement / approximation bridge
```

The decoder recognized the refinement/approximation distinction and explicitly discussed A07/A08/A09, but mapped that region only to B09 in the main finding and treated Beta as having no explicit refinement counterpart.

Therefore O3 should remain uncredited for this run.

## 7. What this means for DP 0.4

The rerun strongly supports the intended DP 0.4 corrections:

- no representation-level difference was promoted into a structural breaker;
- no unsupported natural distinction was manufactured;
- the mandatory cross-residual pass triggered;
- all discovered residual correspondences re-entered the candidate path;
- the deep obstruction correspondence O4 was recovered;
- encoder and boundary roles were both recovered;
- method-specific residuals were preserved;
- promotion remained `SUPPORTED_CANDIDATE`.

The remaining automatic qualification failure is now partly attributable to scorer composition semantics rather than discovery absence.

A narrow scorer correction can be considered without changing the hidden oracle content or lowering the four-motif threshold:

> permit a composite oracle motif to be satisfied by a bounded dependency-connected set of promoted findings/role passes whose union meets the motif's required Alpha/Beta overlaps and whose descriptions/roles are structurally compatible.

Such a correction should not allow arbitrary union of unrelated findings.

## 8. Artifact storage

The semantic report, metadata, and score were successfully emitted into the immutable workflow log before the artifact step.

The artifact upload itself still returned:

```text
Artifact storage quota has been hit.
Usage is recalculated every 6-12 hours.
```

The workflow UI records the step as non-fatal because the upload action is intentionally `continue-on-error`; this must not be mistaken for a successful artifact creation.

IsoGraph artifact cleanup had already deleted 87 older artifacts and reclaimed 5,204,856 bytes, but GitHub's account-level Actions storage meter had not yet recalculated when this rerun attempted upload. No semantic evidence was lost because log retention is now the primary fallback.

## 9. Disposition

```text
raw automatic scorer:
    DOES_NOT_QUALIFY

substantive DP 0.4 separator/obstruction behavior:
    supported

O2 semantic region:
    recovered in decomposed adjacent correspondences,
    but not credited by current single-finding scorer

O3:
    not recovered

formal qualification:
    not yet declared
```

Do not change the historical raw score for this run. Any scorer correction must be versioned and replayed against the frozen report rather than retroactively rewriting the original result.
