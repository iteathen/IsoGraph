# DP 0.7 mechanical role-coverage diagnostic 0.4

**Status:** DIAGNOSTIC ONLY — REJECTED BEFORE BLIND REPORT ACCEPTANCE  
**Workflow run:** `36228618460`  
**Experiment SHA:** `d10bcf6074b93b21103756625b8697a580520ba3`  
**Evidence commit:** `1c3d9b4b2bcfcde9229f9bcd844c7c980235d540`  
**Packet SHA-256:** `8a18f93053500c50d965bd0cddde28f37f4f3534a81c826b18649b0f86f0c3f5`

The external reasoner returned syntactically valid JSON within the expanded output budget, but the new mechanical exact-role coverage gate rejected the report before `PARSED_REPORT.json` was accepted.

## Gate failure

```text
case-03 exact role coverage failed:
  missing B counterpart for ^94004
  missing B counterpart for ^94010
```

The raw report classified:

- `^94004` (`H`) as `TRANSFORMED` with no counterpart while simultaneously describing it as a derived energy residual;
- `^94010` (`real_divide`) as `SHARED_INFRASTRUCTURE` with no opposite-side counterpart.

Both violate the frozen output contract:

```text
MAPPED / TRANSFORMED / SHARED_INFRASTRUCTURE
    -> require at least one valid opposite-side counterpart

RESIDUAL / NON_LOAD_BEARING
    -> may have no counterpart, with justification
```

This is therefore an external-reasoner execution failure caught by the intended mechanical gate, not a reason to weaken the gate.

## Positive diagnostic

The same raw report explicitly covered the two prior hidden-score omissions:

- case 01 maps A-side `beta` to B-side `beta`;
- case 02 maps `selected_variables` to `selected_nonzero_variables`.

Those observations are diagnostic only because the full report did not pass the mechanical acceptance gate.

The raw rejected output remains preserved at:

`research/project-discovery/2026-09-25-dp07-three-positive-controls/evidence/run-36228618460/COLD_REPORT_RAW.txt`
