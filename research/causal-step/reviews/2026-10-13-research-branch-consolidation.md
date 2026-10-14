# Research branch consolidation — Causal Step and adjacent foundational records

**Recorded:** 2026-10-13 (America/Los_Angeles)  
**Scope:** repository administration and research-source preservation, not a new physical theory or an IsoGraph qualification campaign  
**Researcher instruction:** consolidate committed work, review related pull requests, and maintain a coherent research history **without merging into `main`**. See [verbatim Causal Step discussion entry](../DISCUSSION_LOG.md).  
**Authoritative future research branch:** **`research/causal-step`**. Established from the reviewed consolidated head `09a8d68a862570e798f42fb6f93ee96c7428e8a9`. Earlier dated Causal Step branches remain provenance checkpoints, not competing working heads.

## Initial branch audit and integration boundary

GitHub reported **23** branches at the first audit and **seven** open PRs. Explicit compare of the then-working branch `research/causal-step-foundational-bridges-20261013` against **all 11 older `research/causal-step-*` branches** returned **zero commits ahead on each historical branch**: each was an exact ancestor of the chosen continuation, so no manual replay, copy, squashing, or redundant merge was warranted.

The relevant historical research branches in that audit were:

- `research/causal-step-20261012`
- `research/causal-step-constraint-lab-20261012`
- `research/causal-step-nonnewtonian-ablation-20261012`
- `research/causal-step-particle-emergence-20261012`
- `research/causal-step-gfe-bianconi-20261012`
- `research/causal-step-higher-order-rewrites-20261012`
- `research/causal-step-complexity-filter-20261012`
- `research/causal-step-complexity-long-horizon-20261012`
- `research/causal-step-entropy-completeness-20261013`
- `research/causal-step-entropy-model-mechanism-20261013`
- `research/causal-step-topology-holography-20261013`

All prior negative Model A dimensionality results, k5/#81 period-five observations, T1–T4 exact synthetic experiments, historical caveats, frozen source proofs, discussion records and source SHA citations therefore already belonged to this single history. **Do not update all old branch pointers to the modern head**: those are historically meaningful provenance snapshots, and forcing them forward would erase their useful stage distinctions.

## Pull request review/disposition

| PR | Research content | Reviewed result on the shared research lineage | GitHub disposition |
|---|---|---|---|
| [#78](https://github.com/iteathen/IsoGraph/pull/78) | Original Causal Step, Model A controls, negative dimension correction | The PR head `24023b43e6bfc702e489dc23edf1295f167f941b` was already an **ancestor** with zero outstanding commits; retained in the current history | Closed as already incorporated, **not** merged into main |
| [#75](https://github.com/iteathen/IsoGraph/pull/75) | Imported foundational archive: Primitive Presentation, entropy/indistinguishability, separately owned Minimal Rule/Minimum Representation sketches | 20-file review; **12/12** original source-file Git blobs match their `SOURCE_IMPORT.json` manifests, private `internal-documents/` and duplicate ZIPs excluded; additive index reconciliation. Incorporated through actual two-parent research merge `11dd96169d9d2f2abfac1438cc00b1688a1d6b95` | **Merged to dated research branch**; now also ancestor of `research/causal-step`; main unchanged |
| [#76](https://github.com/iteathen/IsoGraph/pull/76) | Primitive Presentation critical review, historical failed/withdrawn universal-three-role proof, incomplete/concluded redraft, bounded grammar counterexamples | 12-file review; original imported source retained untouched; finite grammar results marked bounded; no paper publication or qualified theorem implied | **Merged by repository-allowed rebase**, tip `b2e41a8e8e0894505b5cb12aaf53af42860bbba3` |
| [#77](https://github.com/iteathen/IsoGraph/pull/77) | Entropy and Indistinguishability critical research: source vs apparent entropy, conjectural complete physical indistinguishability | 14-file review; distinct first-level project and bounded vs complete observer distinctions retained; no cryptographic or physical theorem promoted | **Merged by repository-allowed rebase**, tip `d8c7dd4ee2998d755d5fdb22d3b4a23d81178c46` |
| [#74](https://github.com/iteathen/IsoGraph/pull/74) | Emergent Reality Foundations and Minimal Rule direction | Four-file review; both source project documents byte-identical at Git blobs `678da4149c4aacd33874bf2f16fb3edb6089a99b` and `91ab6b6234c7bb9daa5714c7ee2617c8681e640f`; additive indexes preserved | **Content incorporated** at `09a8d68a862570e798f42fb6f93ee96c7428e8a9`; original PR closed as **superseded**, not falsely labeled GitHub-merged |

**Why the non-merge distinction matters:** GitHub repository settings allow squash/rebase PR merges but disallow normal PR merge commits. PR #76 and #77 used the permitted **rebase** method. PR #74 had a true shared-index merge conflict; its reviewed research files were copied **without altering their source Git blob identities**, and the two competing index insertions were reconciled on the common branch as a **linear, single-parent commit**, rather than falsely claiming it received the native PR “merged” status or bypassing the conflict. PR #75 had already been integrated as a two-parent Git-data merge and GitHub itself marked it merged; that historical choice is accurately recorded rather than rewritten.

GitHub automatically deleted some merged PR head branches. Remaining older remote branch refs are **historical references**, not evidence that their work remains outside the consolidated branch.

## Projects retained as separate research topics inside the shared Git history

- [Causal Step](../README.md): exploratory higher-order causal generative physics, including T1–T4 finite structural tests; two original provisional premises unchanged.
- [Emergent Reality Foundations](../../emergent-reality-foundations/README.md): source-origin/minimal-rule constraints, speculative foundational organizing back-pressure distinguished from statistical entropy.
- [Primitive Presentation](../../primitive-presentation/README.md): historical incomplete three-role inquiry, separate Minimum Representation and physics-to-SKI methodology, original archive unchanged.
- [Entropy and Indistinguishability](../../entropy-indistinguishability/README.md): comparison of source entropy and possible physical observational equivalence, distinct from the organizing back-pressure hypothesis.
- [Archived two-sketch index](../../minimal-role-reduction-adapter/README.md): preserved original bytes and correct logical project ownership, not a separate active research program.

Keeping these as **different first-level research dossiers on one Git branch** unifies access and histories **without conflating their scientific claims**.

## Deliberately excluded work

- Open [#70](https://github.com/iteathen/IsoGraph/pull/70), Woit/Lisi unification synthesis: independent track, still active, separate gate/provenance.
- Open [#71](https://github.com/iteathen/IsoGraph/pull/71), glycan protocol planner: unrelated application implementation.
- Current `main` and qualified Core/QU/NEI/DP/DTS/EI specs: **untouched**.
- No GitHub Actions, qualification resources or external model calls intentionally invoked for this consolidation.

## Verification limits and continuing discipline

All writes performed through the GitHub connector produced committed Git objects/branch updates. The assistant environment did **not** have a local Git checkout of IsoGraph; thus no claim is made about possible uncommitted changes in the researcher's own workstation or other agent environments. Those require checking `git status` in the relevant checkout.

This administrative merge did **not rerun** the earlier physics toy experiments or independently validate their results. It checked history ancestry, relevant PR diffs, source identities, provenance classification, branch targets, merged PR status and index coverage. The original 8,000-rewrite generator and evidence remain frozen on their recorded blob identities.

**Future workflow:** Use `research/causal-step` as the **single long-lived working branch** for continued Causal Step experiments and related references. If a truly independent, risky or short-lived experiment needs a temporary branch, base it on the stable research branch; review and integrate or explicitly retire it before starting another parallel research line. Avoid merging Causal Step into `main` without a separate explicit decision. Preserve Woit/Lisi independence and prior failures.
