# Experiment 024 — Corrected TI comparison-contract campaign

**Status:** fresh Phase 5 development campaign; not DTS qualification

Experiment 021 produced a real isolated TI-discovery report, but its public prompt allowed the decoder to choose only pairs it considered materially informative while the hidden scorer required eight specific pair/view claims.

Experiment 024 corrects that contract defect.

## What is public

`COMPARISON_REQUESTS.json` publishes the eight pair/view obligations that must be answered.

It does **not** publish:
- expected dispositions;
- required residual presence;
- required QU evidence;
- any structural mapping or reasoning answer.

The transition corpus and views are the exact frozen Experiment 021 artifacts.

## What remains hidden

`hidden/ASSERTIONS.json` retains the expected TI / REJECTED / INCOMPLETE dispositions and evidence-shape requirements.

## Purpose

This is a coverage-completion campaign, not a redesign of DTS.

A clean pass closes the Phase 5 evidence burden together with the independently blind discoveries already recovered in Experiment 021.

A substantive mismatch must be preserved and investigated rather than rewritten away.
