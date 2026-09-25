# Experiment 024 — Final Development Review

**Status:** immutable `DOES_NOT_PASS` with one substantive semantic discrepancy and two scorer-contract false negatives  
**Workflow run:** `36188826575`  
**Frozen source SHA:** `07a51451d83f6a605de822665217e75d28e8181d`  
**Model:** `gemini-3.1-flash-lite`

## Public-contract correction succeeded

Experiment 024 publicly required all eight pair/view comparisons.

The decoder returned:

```text
public requests answered: 8 / 8
duplicate requests:        0
unexpected requests:       0
malformed claims:          0
self-audit failures:       0
HTTP status:               200
semantic report:           frozen
```

Therefore the Experiment 021 hidden-coverage defect was corrected.

## Request results

The decoder matched the hidden semantic disposition for:

- R01 — T01/T02 under C_CLASSIFICATION -> TI;
- R02 — T01/T03 under C_CONCEPT -> TI;
- R03 — T01/T03 under C_CLASSIFICATION -> REJECTED;
- R04 — T04A/T04B under C_WORKER_EFFECT -> TI;
- R05 — T04A/T04B under C_PROCESS -> REJECTED;
- R06 — T04A/T05 under C_WORKER_EFFECT -> REJECTED;
- R08 — T01/T06 under C_CLASSIFICATION -> INCOMPLETE.

R07 differed:

- hidden expectation: T01/T06 under C_CONCEPT -> TI;
- decoder result: INCOMPLETE because it treated `Q021-input` as load-bearing.

## Scorer-contract defects on R05/R06

R05 and R06 had the correct semantic disposition.

The decoder supplied breaker regions:

```text
R05 breaker: D
R06 breaker: K
```

and explained the corresponding structural mismatch in the reason field.

The public prompt specified:

`"breaker": "free text or null"`

It did not specify a minimum character length.

The hidden scorer nevertheless required breaker strings of at least eight characters. It therefore marked R05/R06 failed despite the correct semantic rejection and explicit load-bearing breaker region.

These are scorer/public-contract defects, not TI semantic disagreements.

The immutable scorer result remains unchanged.

## Substantive R07 discrepancy

R07 is the only semantic disagreement that survives public-contract review.

C_CONCEPT declares:

```text
load-bearing:
  B.input-role
  B.concept-role
  target.concept

projected:
  source carrier representation
  target recognition
  D
  O
  non-concept delta detail
```

T06 contains:
- `Q021-input` in the source carrier representation;
- `Q021-recognition` in target recognition;
- decomposition/order QUs in D/O.

The hidden expectation assumes those QUs are projected residual structure under C_CONCEPT.

The decoder instead treated `Q021-input` as affecting the load-bearing semantic input role and returned INCOMPLETE.

That disagreement must be investigated directly. Neither the hidden expectation nor the decoder is promoted by fiat.

## Next experiment

Run a focused QU-projection/region-ownership audit that asks:

1. which represented region owns each T06 QU;
2. whether that region is load-bearing or projected under C_CONCEPT;
3. whether either admissible Q021-input realization can change the C_CONCEPT load-bearing projection;
4. whether the representation supplies sufficient authority to project Q021-input without choosing an actual realization.

Do not modify DTS 0.1 merely to satisfy either side of R07 before this audit.
