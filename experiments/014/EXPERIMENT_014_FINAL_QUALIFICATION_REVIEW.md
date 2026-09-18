# Experiment 014 — Final Discovery Protocol Qualification Review

**Frozen qualification SHA:** `288c9a22085fcae7b7d7014aac3e8175421089f3`  
**Workflow run:** `35376711200`  
**Attempt 1:** provider failure, HTTP 503 after the allowed retries; no semantic report.  
**Attempt 2:** successful semantic run at the same frozen SHA and packet.  
**Decoder:** `gemini-3.5-flash`  
**Attempt-2 HTTP:** 200, one API attempt  
**Packet SHA-256:** `1aac75c3d434677179fa19dccd6f515176b659d672d53b87fb5b676757c88159`  
**Attempt-2 report SHA-256:** `a50d0ceb77ba8b8fc206e68884eb89d8badb0a004a65daaa47e90900e0000a35`

## Formal semantic disposition

`QUALIFIES`

Attempt-2 deterministic score, recorded in the immutable workflow logs:

- disposition: `QUALIFIES`
- QRC semantic rejection coverage: true
- mismatches: none
- deterministic preflight: PASS
- packet identity check: PASS
- qualification enforcement: PASS

## Workflow-status caveat

The GitHub job concluded `failure` only because the post-score persistence step attempted to push evidence to a branch that had already advanced when attempt-1 provider-failure evidence was committed. The push was rejected as non-fast-forward.

This occurred **after** the semantic call, packet-identity verification, deterministic score, and qualification enforcement had all succeeded. It is an evidence-publication plumbing failure, not a qualification failure.

The run logs are durable qualification evidence under the repository resource policy. No further semantic call is warranted.

## Qualification significance

Experiment 014 used a fresh finite-resource proof topology and a public mapping wire contract requiring array-valued endpoints for both singleton and multi-step mappings. This removes the hidden serializer-shape defect exposed by Experiment 012.

The passing score establishes the remaining formal DP mapping/overclaim obligations on a fresh holdout.

Historical failed dispositions remain unchanged:

- Experiment 010 remains `DOES_NOT_QUALIFY`; its review separates one oracle defect from one real omitted overclaim.
- Experiment 012 remains `DOES_NOT_QUALIFY`; its review records the undisclosed singleton-array serializer defect while preserving its successful semantic behavior.

Experiment 014 is the fresh corrected formal evidence, not a rewritten score of either earlier run.
