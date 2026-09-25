# Experiment 026 — DTS 0.1 fresh qualification holdout

**Status:** complete — DTS 0.1 QUALIFIED.

This campaign is the fresh semantic qualification holdout for DTS 0.1.

It contains 20 new proposition-specific cases covering every DTS 0.1 Section 13 target plus:
- claim-relative projection of QU wholly inside independently qualified projected regions;
- transition observation before mechanism;
- role factorization versus invariant/TI proof.

Development Experiments 020–025 are intentionally excluded from the cold packet.

The public prompt discloses the complete output schema. Hidden assertions contain only the expected semantic values.

No hidden string-length, alias, pair-selection, or serializer condition is qualification-bearing.

## Result

```text
cold decoder run:          36190237108
case coverage:             20 / 20 PASS
formal scorer disposition: QUALIFIES
promotion verifier run:    36190514681
verifier verdict:          SUPPORT_PROMOTION
final module disposition:  QUALIFIED
```

See `EXPERIMENT_026_FINAL_QUALIFICATION_REVIEW.md` and `../../qualification/DTS_0_1_QUALIFICATION.md`.
