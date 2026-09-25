# Experiment 017 — Authoring Audit

**Status:** pre-trigger deterministic review

## Source provenance

Frozen Connect4 inputs are copied byte-for-byte into `experiments/017/source/` and pinned by source repository path, source revision and git blob in `SOURCE_MANIFEST.json`.

The implementation snapshot is `solver/isometric@eb8928fe6f4c4b3dba6ad3e2d42f186947a6ebf2`, which already passed Connect4's Isometric native WSL workflow run `35478469795`.

The research theorem snapshot is from `research/semantic-quotient@6b913c4099f5242152dfc2e34b2c3e1a92fe9df7`.

## Isolation

The cold packet explicitly forbids:
- `Q_CONGRUENCE_INDEPENDENT_REVIEW_0_1.md`;
- hidden assertions;
- scorer;
- this author audit;
- qualification reviews;
- prior Experiment 017 evidence.

Thus the model sees the candidate theorem and raw semantic/implementation evidence, not our internal adjudication.

## Coverage

C01-C18 separately test:
- theorem scope;
- support/action frontier;
- terminal token;
- antichain absorption + first-win stopping;
- successor q_o;
- rank induction;
- exact W/D/L/distance/action-value consequence;
- physical/history/proof negative scope;
- q_r versus literal labels;
- horizontal action transporter;
- transported child q_r;
- scalar value-cache reuse;
- proof-context non-transfer;
- value equality versus behavior identity;
- finite evidence versus theorem proof;
- NEI 0.4 result for q_o;
- q_r transporter-aware equivalence;
- overall proof-core validity.

## Scorer self-test

A perfect synthetic report must QUALIFY.

The negative self-test flips C09 to claim q_r implies literal action-label identity; the scorer must reject it.

## Limitation

This audit does not supply independent semantic evidence. It only verifies packet/scorer integrity before spending the single cold call.
