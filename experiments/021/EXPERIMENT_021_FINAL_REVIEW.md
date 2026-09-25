# Experiment 021 — Final Development Review

**Status:** immutable `DOES_NOT_PASS` scorer disposition with a public-output-contract defect  
**Semantic run:** `36188362082`  
**Frozen source SHA:** `e4ab799559bf01820b980eeaa46234721398cb4b`  
**Model:** `gemini-3.1-flash-lite`

## First successful semantic execution

After five provider-only failures, run `36188362082` produced the first frozen Experiment 021 semantic report:

```text
HTTP status:        200
API attempts:       1
semantic report:    produced
scorer:             executed
scorer disposition: DOES_NOT_PASS
```

Packet SHA-256:

`d3e8d5aaa916e70df0514e0ff62a9fedf61284708e51b879a2f466d83acf2369`

Report SHA-256:

`0d86578222f84e413ccb0076c2c6a0e0483c0daf1aeca19760bee76a32d08be1`

## What the decoder recovered

The decoder emitted four transition-comparison claims. Every emitted required claim matched the hidden expected disposition and evidence shape:

1. `T01 / T03 / C_CONCEPT` -> **TI** with residuals;
2. `T04A / T04B / C_WORKER_EFFECT` -> **TI** with decomposition/order residuals;
3. `T04A / T04B / C_PROCESS` -> **REJECTED** because decomposition/order are load-bearing;
4. `T01 / T06 / C_CLASSIFICATION` -> **INCOMPLETE** with explicit QU dependencies.

All global methodology guards passed:

```text
duplicate claim keys:          none
claim schema/reasoning:        valid
same endpoints sufficient:     false
TI implies NEI SAME:           false
projected QU erased:           false
packet isolation self-audit:   true
```

The report also independently identified:
- decomposition-topology sensitivity;
- QU-bearing transition correspondence/incompleteness.

## Why the scorer failed

The hidden scorer required eight specific pair/view claims.

The public prompt did **not** require those eight claims. It said:

> “For every pair you consider materially informative under a supplied view, return a claim.”

The decoder lawfully selected four claims.

The scorer therefore marked these four required-but-unrequested claims missing:

- `T01 / T02 / C_CLASSIFICATION`;
- `T01 / T03 / C_CLASSIFICATION`;
- `T04A / T05 / C_WORKER_EFFECT`;
- `T01 / T06 / C_CONCEPT`.

No emitted claim had a wrong disposition.

Thus the failure owner is the **Experiment 021 public output contract versus hidden scorer coverage requirement**.

```text
semantic mismatch on emitted claim: 0
missing hidden-required claims:       4
methodology guard failures:           0
```

## Disposition

The immutable Experiment 021 scorer disposition remains `DOES_NOT_PASS`.

It MUST NOT be rewritten to PASS.

However:

```text
Experiment 021 DOES_NOT_PASS
    != DTS falsified
    != TI semantics falsified
```

The run supplies positive development evidence for the four emitted claims and exposes a harness-contract defect for full campaign coverage.

## Corrective action

Create a fresh experiment with a **public comparison-request contract** that names the pair/view obligations to be answered while keeping their expected dispositions hidden.

Do not modify:
- the frozen Experiment 021 report;
- its scorer disposition;
- DTS 0.1 semantics merely to satisfy the hidden scorer.

The fresh campaign should test all eight intended controls under a disclosed output contract.
