# Experiment 017 primary-run recovery note

Primary run `36175838410` completed its isolated semantic call and deterministic score successfully.

The scorer output was `QUALIFIES`, with C01-C12 all PASS and every public scoring guard true. The report hash was `45c81a291a84daa1eecde0f0612742c3f33b480eb831ca7f80126d1fa69b1548`.

The evidence-persist step then lost a non-fast-forward race because a later trigger commit had already advanced the branch. The raw primary report was therefore not committed.

This directory preserves only data that can be reconstructed exactly from the immutable workflow log. No semantic output is invented or regenerated.

The later run `36175890127` is separately preserved by the workflow itself and records HTTP 503 provider failure after two API attempts, with no semantic report.
