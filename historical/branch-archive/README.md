# Historical Connect4 Qualification Branch Archive — 2026-09-25

This directory preserves two pre-existing IsoGraph qualification branches whose original experiment numbers now collide with newer, unrelated experiments on current `main`.

The archive is inert historical evidence. It does not reactivate the old workflows and does not renumber or reinterpret the frozen qualification runs.

## Preserved branch: q congruence

Original branch:

`qualification/connect4-q-017-20260919`

Frozen source head:

`1954a88bbec52e589dddfadaccdf2c467017b109`

Original qualification identity:

`Experiment 017 — Connect4 q Congruence`

Frozen result:

- disposition: `QUALIFIES`
- cases: 18 / 18 PASS
- workflow run: `35479007618`
- failed cases: none

Archive root:

`historical/branch-archive/qualification-connect4-q-017-20260919/`

## Preserved branch: Connect4 game theory 1.2

Original branch:

`qualification/connect4-game-theory-018-20260919`

Frozen source head:

`37c2b05efe54181d1e35abf78bec41ab25186338`

Original qualification identity:

`Experiment 018 — Connect4 Game-Theory 1.2 Final Qualification`

Frozen result:

- disposition: `QUALIFIES`
- cases: 16 / 16 PASS
- workflow run: `35479497878`
- failed cases: none

Archive root:

`historical/branch-archive/qualification-connect4-game-theory-018-20260919/`

## Why the archive exists

Current IsoGraph `main` later reused `experiments/017` for Core 0.18 qualification and `experiments/018` for Discovery Protocol successor qualification.

Directly merging these old branches would therefore overwrite/collide with current authority evidence.

The complete unique branch deltas are preserved under branch-specific archive roots instead. Original relative paths are retained beneath each archive root, including old workflow files. Because those workflow files are not under root `.github/workflows/`, they are historical text only and cannot trigger GitHub Actions.

## Authority boundary

Preservation does not by itself make these old Connect4 artifacts current IsoGraph semantic authority.

Their historical qualification dispositions remain exactly what the frozen runs recorded. Any promotion into a current Connect4 authority remains governed by the Connect4 research/authority process and its own current evidence.

## Retirement rule

After this archive is merged and its blob identity is verified, the two original qualification branches no longer need to carry unique durable evidence and may be retired.

Do not apply this retirement rule to externally referenced compatibility branches such as:

`work/navier-stokes-proof-isograph-20260921`
