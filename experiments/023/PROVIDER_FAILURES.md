# Experiment 023 provider failures

These runs are infrastructure/provider evidence only. None produced a semantic report or discovery score.

## Run 36185715484 — gemini-2.5-pro

- source SHA: `b27cc158c9b99a89884b7dfb2615c58008df255d`;
- deterministic preflight: PASS;
- API attempts: 1;
- HTTP status: 404;
- packet SHA-256: `fe36f6db7cf7d035b5f8bfe3a4a23a76538c71c5ac4dde5220ee53b2c42e5b71`;
- semantic status: `PROVIDER_FAILURE`;
- no model report;
- no score.

A subsequent provider capability probe showed that this model name is retired/unavailable for this account.

## Run 36186088486 — gemini-3.6-flash

- source SHA: `079ff2530b21e2778d8d03bb4afb9942f2171290`;
- deterministic preflight: PASS;
- API attempts: 2;
- HTTP status: 503;
- packet SHA-256: `a45e21d6a62f6d4162824f17f9901014d6ff31ba7394f693e0ce1a9ddc361f7b`;
- semantic status: `PROVIDER_FAILURE`;
- no model report;
- no score.

The same `gemini-3.6-flash` endpoint returned HTTP 200 to the tiny provider capability probe immediately beforehand, so the endpoint is callable.

The next retry keeps the same model, corpus, prompt, controls and scorer but reduces the requested maximum output size to lower request capacity pressure.

No provider failure is interpreted as a Discovery Protocol result.

## Run 36186394227 — gemini-3.6-flash, reduced output budget

- source SHA: `30eeb903280ee0fdb26cedcded247fad490b79f4`;
- deterministic preflight: PASS;
- API attempts: 2;
- HTTP status: 503;
- packet SHA-256: `fc9ca2b6beb737ce6ab6ab8c532354eddc2667e0a0dad567fa98e8aa0d1d9ef3`;
- max output tokens: 8192;
- semantic status: `PROVIDER_FAILURE`;
- no model report;
- no score.

Reducing the requested output budget did not resolve the full-packet provider failure. The next provider diagnostic tests long-payload acceptance on a lighter advertised text model using non-semantic filler.
