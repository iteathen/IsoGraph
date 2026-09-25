# Experiment 023 provider/model decision

**Status:** transport/provider decision only; no semantic change.

Provider history:
- `gemini-2.5-pro` -> full Experiment 023 request HTTP 404;
- `gemini-3.6-flash` -> tiny capability probe HTTP 200, but full Experiment 023 requests HTTP 503 even after reducing output budget;
- long-payload probe (~36,097 bytes) on `gemini-3.1-flash-lite` -> HTTP 200, response `OK`.

Persisted provider evidence:
- `experiments/023/provider/PROBE.json`;
- `experiments/023/provider/LONG_PROBE.json`;
- `experiments/023/PROVIDER_FAILURES.md`.

Experiment 023 is therefore repinned to:

`gemini-3.1-flash-lite`

The response budget remains 8192 tokens.

The following remain unchanged:
- source barrier corpus;
- native `.isg` rendering;
- focused Discovery authority;
- public prompt;
- hidden methodology controls;
- deterministic scorer.

This provider/model choice supplies no discovery evidence by itself.
