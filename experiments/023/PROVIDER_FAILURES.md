# Experiment 023 provider failure — workflow run 36185715484

**Disposition:** infrastructure/provider failure  
**Semantic report:** none  
**Discovery score:** none  
**Corpus implication:** none

Source SHA:

`b27cc158c9b99a89884b7dfb2615c58008df255d`

The run passed deterministic preflight and attempted the cold discovery call with:

`gemini-2.5-pro`

Result:

- API attempts: 1;
- HTTP status: 404;
- semantic status: `PROVIDER_FAILURE`;
- packet SHA-256: `fe36f6db7cf7d035b5f8bfe3a4a23a76538c71c5ac4dde5220ee53b2c42e5b71`;
- no model report;
- no score.

This is not a Discovery Protocol disposition.

The Experiment 023 barrier corpus, native IsoGraph rendering, hidden methodology controls, and deterministic scorer remain unchanged.

Because Experiment 021 already encountered repeated HTTP 503s on Gemini 3.5 Flash and Gemini 3.8 Flash, the next provider step is a tiny capability probe over currently advertised text models before another semantic discovery call is attempted.
