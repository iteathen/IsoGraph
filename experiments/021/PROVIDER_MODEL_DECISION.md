# Experiment 021 provider model decision

**Status:** transport/provider decision only; no DTS semantic change.

Experiment 021's first four attempts produced no semantic report:

- Gemini 3.5 Flash: three HTTP 503-only runs;
- Gemini 3.8 Flash: one HTTP 503-only run.

Those runs remain infrastructure/provider evidence and carry no TI disposition.

Experiment 023 later added a dedicated long-payload capability probe because tiny-call model availability was insufficient evidence for discovery-packet usability.

Persisted probe:

`experiments/023/provider/LONG_PROBE.json`

Probe result:

```text
input bytes:       36097
selected model:    gemini-3.1-flash-lite
HTTP status:       200
response:          OK
```

Experiment 023 then used the same provider path to produce a successful ~12k-token semantic discovery report.

Experiment 021 is therefore repinned to:

`gemini-3.1-flash-lite`

Only the transport model changes.

The following remain unchanged from the frozen Experiment 021 semantic target:

- DTS 0.1 candidate;
- transition corpus;
- comparison views;
- hidden assertions;
- deterministic scorer;
- expected TI / rejection / incomplete controls.

The provider/model decision supplies no DTS or TI evidence by itself.
