# Experiment 013 — Authoring Audit

**Status:** pre-freeze.

- No generic `decision` field exists; every scored proposition has a public key and type.
- F01/F02 remove the polarity ambiguity that affected Experiment 009 C02/C05.
- F03/F04/F05 score only named subresults; no hidden top-level summary field is required.
- F05 publishes only `QUI|NOT_QUI`, avoiding the hidden `NOT_QUI` versus `STRUCTURALLY_DISTINCT` choice.
- F06 explicitly poses an NEI query while withholding identity authority, making `INCOMPLETE_AUTHORITY` the relevant category.
- F07 explicitly tests the missing-anchor boundary.
- F08 explicitly states that application-value equality/inequality has no declared NEI significance; semantic `UNKNOWN` therefore cannot be inferred merely from mixed application values.
- Scorer regression tests fail if F08 is upgraded to `UNKNOWN`.
- Cold packet excludes Experiment 009 output and hidden material.

No known qualification-bearing serializer ambiguity remains.
