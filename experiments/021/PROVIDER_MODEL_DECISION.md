# Experiment 021 provider model decision

**Status:** transport/provider decision only; no DTS semantic change

Experiment 021 initially targeted `gemini-3.5-flash`, matching the recent IsoGraph qualification campaigns.

Three successive discovery triggers produced only provider failures:

- workflow `36183338156`: HTTP 503 after 2 attempts;
- workflow `36183579627`: HTTP 503 after 2 attempts;
- workflow `36183859218`: HTTP 503 after 2 attempts.

No semantic report or score was produced by any of those runs.

A dedicated model-discovery workflow then queried the provider's current `generateContent` model list and persisted it at:

`experiments/021/provider/MODELS.json`

The list includes the exact non-preview model:

`models/gemini-3.8-flash`

with:
- input token limit: 1,048,576;
- output token limit: 65,536.

Experiment 021 is therefore repinned to `gemini-3.8-flash`.

This changes only the execution provider/model used for the cold development-discovery call. The following remain byte-for-byte unchanged from the frozen Experiment 021 semantic target:

- DTS 0.1 candidate;
- transition corpus;
- comparison views;
- hidden assertions;
- deterministic scorer;
- expected propositions.

The model change is justified solely by repeated provider failure on the prior endpoint and is not evidence for or against any TI claim.
