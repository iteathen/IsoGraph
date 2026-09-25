# Experiment 023 provider/model decision

**Status:** transport/provider decision only; no semantic change.

Initial attempt used `gemini-2.5-pro` and returned HTTP 404 before any semantic report.

A dedicated provider capability probe then tested currently advertised text models using a tiny non-semantic prompt. The persisted result is:

`experiments/023/provider/PROBE.json`

Probe result:

- `gemini-pro-latest` -> HTTP 429 quota;
- `gemini-2.5-flash` -> HTTP 404, retired for new users;
- `gemini-3.1-pro-preview` -> HTTP 429 quota;
- `gemini-3.6-flash` -> HTTP 200.

Experiment 023 is therefore repinned to:

`gemini-3.6-flash`

The following remain unchanged:

- source barrier corpus;
- native `.isg` rendering;
- focused Discovery authority;
- public prompt;
- hidden methodology controls;
- deterministic scorer.

The model change supplies no discovery evidence by itself.
