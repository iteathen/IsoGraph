# DP 0.9 Minimum Sufficient Support / Valuation migration — 2026-09-28

**Status:** successor research migration; no qualified authority effect  
**Source line:** PR #48 / `candidate/dp08-sufficiency-valuation-20260926`  
**Current qualified family:** Core through 0.20 + QU 0.1 + NEI 0.4 + DP 0.1–0.8 + DTS 0.1

## Why this migration exists

The repository now has a qualified Discovery Protocol 0.8 with a different semantic role: clue-preserving discrepancy adjudication. The older open PR #48 independently used the version number 0.8 for Minimum Sufficient Support and Valuation.

Those two semantic successors must not share one version number.

## Disposition

The general Minimum Sufficient Support / Valuation work is preserved as a new unqualified successor:

`extensions/discovery/DISCOVERY_PROTOCOLS_0_9_MINIMUM_SUFFICIENT_SUPPORT_VALUATION_CANDIDATE.md`

Its qualification plan is rebased onto the current qualified Core 0.20 / DP 0.8 family and removes dependence on any external solver or repository as a motivating control. Real-world controls must instead come from frozen, exact-rendered IsoGraph research domains and must be cross-domain.

The optional logic-lens companion is preserved as non-authoritative search guidance.

## Authority boundary

This migration does not:

- modify qualified Core semantics;
- modify qualified DP 0.8 semantics;
- qualify DP 0.9;
- change the current qualified-module manifest;
- change the current integrated-stack authority;
- reinterpret historical qualification evidence.

DP 0.9 remains successor research until fresh qualification and, if successful, fresh integration qualification are completed.

## Rendering modernization dependency

PR #49 was stacked on the older PR #48 line. Its rendering-modernization artifacts remain separate salvage work and must be rebased or selectively migrated onto current `main` without importing the obsolete DP 0.8 version assignment.
