# Core 0.20 + DP 0.8 Qualification Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Independently qualify Core 0.20 primitive-logic closure and Discovery Protocol 0.8 clue-preserving discrepancy adjudication, then directly qualify their composition with the current Core/QU/NEI/DTS stack.

**Architecture:** Freeze three new blind qualification experiments. Each uses public candidate authority + public case statements, a hidden deterministic oracle/scorer, packet isolation, one isolated external decoder call, frozen evidence, and an exact promotion review. Existing motivating glycan/P-vs-NP discrepancy records may inform case classes but are excluded from cold packets and hidden expected-answer generation at runtime.

**Tech Stack:** Node.js 26.7, GitHub Actions, Gemini isolated decoder, deterministic hidden JSON scorers, repository QRC 0.1 infrastructure.

**Spec:** `CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md` and `extensions/discovery/DISCOVERY_PROTOCOLS_0_8_CLUE_PRESERVING_DISCREPANCY_CANDIDATE.md`.

## Global Constraints

- Candidate bytes are frozen and hashed before live qualification.
- Historical qualified authority is immutable.
- Core 0.20 must discharge all 12 section-16 targets.
- DP 0.8 must discharge all 22 section-19 targets.
- Blind DP cases must not reveal whether the expected outcome is defect, clue, both, or neither.
- Hidden scorers may encode expected answers but may not leak into decoder packets.
- QU/NEI/DTS conclusions remain owned by their qualified modules.
- DP remains discovery/search guidance, not proof authority.
- Core 0.20 qualification does not retroactively rewrite Core-0.19-qualified artifacts.
- Promotion requires independent candidate qualification plus direct full-stack integration.
- Node.js only for qualification harness code.

## Review Focus

- High-level names accidentally accepted as primitive leaves despite available definitions.
- Raw data atoms incorrectly rejected when all behavior is separately represented.
- DP 0.8 overcorrecting ordinary bugs into “interesting clues.”
- Expected/reference outputs being privileged without locating the violated contract.
- Cross-module leakage: DP producing NEI identity or QU resolution without the owning authority.

---

### Task 1: Experiment 048 — Core 0.20 independent qualification

**Files:**
- Create: `experiments/048/*`
- Create: `.github/workflows/experiment-048-core-0-20.yml`

**Interfaces:**
- Consumes: qualified Core 0.17–0.19 and QU 0.1 plus Core 0.20 candidate.
- Produces: frozen score/disposition and exact Core 0.20 hash.

- [ ] Freeze at least 16 fresh cases covering all 12 section-16 targets, including positive raw-atom controls and predecessor-valid/0.20-incomplete controls.
- [ ] Freeze hidden expected answers before live decoder execution.
- [ ] Add deterministic scorer/runner tests and dry-run packet-isolation checks.
- [ ] Execute one isolated decoder run through GitHub Actions.
- [ ] Persist evidence and write final qualification review.
- [ ] If every qualification-bearing guard passes, write Core 0.20 qualification record; otherwise preserve failure and repair only the defect owner.

### Task 2: Experiment 049 — DP 0.8 independent adversarial qualification

**Files:**
- Create: `experiments/049/*`
- Create: `.github/workflows/experiment-049-dp-0-8.yml`

**Interfaces:**
- Consumes: qualified DP 0.1–0.7, Core 0.18/0.19, QU 0.1, NEI 0.4, DTS 0.1 where declared, plus DP 0.8 candidate.
- Produces: frozen score/disposition and exact DP 0.8 hash.

- [ ] Freeze at least 24 mixed cases covering all 22 section-19 targets.
- [ ] Include ordinary mechanical bug, semantic bug/no clue, bug+surviving clue, sharper-after-repair, hidden distinction/no defect, scoped equivalence, expected-output error, reference-side challenge, trusted-reference pressure, correct-reference control, conflicting faithful references, authority gap, QU-sensitive and NEI-sensitive cases, invalidation-cone cases, derived-view/Core boundary, unsupported interesting anomaly, and expected-output-only patch rejection.
- [ ] Do not label public cases with their intended bug/clue disposition.
- [ ] Freeze hidden expected answers and public output schema before execution.
- [ ] Run deterministic scorer tests and packet isolation.
- [ ] Execute isolated decoder; persist raw/parsed output and hidden score.
- [ ] Promote only if all 22 targets and blind-mixed guards pass.

### Task 3: Experiment 050 — direct current-stack integration

**Files:**
- Create: `experiments/050/*`
- Create: `.github/workflows/experiment-050-full-stack-core020-dp08.yml`

**Interfaces:**
- Consumes: exact revisions qualified by Tasks 1–2 plus QU 0.1, NEI 0.4, DTS 0.1 and predecessor Core/DP revisions.
- Produces: current integrated-stack qualification record.

- [ ] Freeze cross-module cases where primitive closure and discrepancy adjudication interact.
- [ ] Exercise QU_UNEXPANDED, NEI non-inference, DTS transition anatomy, derived-view deletion, faithful-rendering/reference conflict, minimum repair, and post-repair primitive support.
- [ ] Pin every module SHA-256 mechanically in preflight.
- [ ] Execute isolated full-stack decoder and hidden scorer.
- [ ] Require exact case count/order, zero unexpected cases, self-audit guards, and SUPPORTED assessments for every module.
- [ ] Write integrated-stack record and successor qualified-module manifest only after PASS.

### Task 4: Authority routing and integration

**Files:**
- Modify: `STATUS.md`
- Modify: `README.md`
- Modify: `AGENTS.md`
- Create: `qualification/CORE_0_20_QUALIFICATION.md`
- Create: `qualification/DISCOVERY_PROTOCOLS_0_1_TO_0_8_QUALIFICATION_REVIEW.md`
- Create: `qualification/CURRENT_INTEGRATED_STACK_WITH_CORE_0_20_DP_0_8_2026-09-28.md`
- Create: `qualification/QUALIFIED_MODULES_2026-09-28.md`

- [ ] Route only exact successfully tested hashes.
- [ ] Preserve predecessor manifests/reviews unchanged.
- [ ] Keep Core 0.20 and DP 0.8 filenames unchanged; status comes from the manifest, not filename.
- [ ] Run repository `Verify` on the final branch.
- [ ] Open PR to `main`, review the exact head, fix blocking findings, and merge only after required CI succeeds.
