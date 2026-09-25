# Experiment 023 provider/model decision

Experiment 021 encountered repeated HTTP 503 provider failures on `gemini-3.5-flash` and `gemini-3.8-flash`.

The provider model-discovery record in `experiments/021/provider/MODELS.json` currently lists `models/gemini-2.5-pro` as a non-preview `generateContent` model with:

- input token limit: 1,048,576;
- output token limit: 65,536.

Experiment 023 therefore pins its first cold discovery attempt to:

`gemini-2.5-pro`

This is a transport/model choice only. It does not alter the barrier corpus, Discovery Protocol semantics, or evaluation controls.

If the provider fails before returning a report, the failure is infrastructure evidence and carries no discovery disposition.
