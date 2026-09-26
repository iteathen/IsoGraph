# Experiment 029 — Core 0.19 Final Qualification Review

**Candidate:** `CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md`  
**Candidate SHA-256:** `8db3f6554afb12d3f6de78789f771bb09484d27babd7fd98782cb92d704402c2`  
**Workflow run:** `36232906621`  
**Frozen qualification SHA:** `db80f31a84b103210f5772740f5fdfc2ffe15bae`  
**Evidence commit:** `55975f0571b3862b60a0c5130d8c0045c968f1bd`  
**Formal disposition:** **DOES_NOT_QUALIFY**

## Frozen score

```text
C01-C18 implicit assertion:      18 / 18 PASS
C19-C26 exact rendering:          7 / 8 PASS
total:                           25 / 26 PASS
failed case:                     C25
scoring guards:                  all true
module assessment from decoder:  SUPPORTED
formal scorer disposition:       DOES_NOT_QUALIFY
```

Packet SHA-256:

`47765dd38937d1f3e2759df42bcc256eb40192515a2e18db9e1303009a09d354`

Frozen report SHA-256:

`70bf24fa2dc1a0b2ae3386195313c23db96e9ae4aa04dc2d36b16cb3afdc9eea`

## Passed burden

All eighteen Core 0.19 section-16 implicit-assertion targets passed.

Seven of eight fresh section-18 constitutional controls also passed:

- formula skeleton is not exact rendering;
- sidecar completion is forbidden;
- familiar mathematics is not semantic authority;
- alternate form requires the claimed exact transformation witness;
- ambiguity/unknown remains explicit;
- precision/modality distinctions remain load-bearing;
- incomplete renderings cannot feed source-faithful downstream semantics.

## C25

The frozen output returned:

```json
{
  "mutation_control_passes": true,
  "familiar_form_repair_allowed": false
}
```

while explaining that silent repair toward a familiar formula is a qualification failure under Core 0.19 section 18.11.

Post-freeze review identified the public boolean key as ambiguous between preservation success and adversarial-test detection success.

The score remains immutable and is not reinterpreted.

See:

`experiments/029/C25_CONTRACT_DIAGNOSTIC.md`

## Successor regression

Experiment 030 uses fresh cases and unambiguous serializer fields to test only the unresolved mutation-preservation burden.

Experiment 029 remains a formal failed qualification run and serves as revision-bound partial evidence for the 25 cases that passed their frozen contract.
