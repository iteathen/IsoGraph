# W-only G0 Scope Revision 0.2 — Current author-source rebaseline

**Status:** NEW CURRENT-SOURCE QUALIFICATION TARGET; original October 3 frozen target remains OPEN  
**Date:** 2026-10-11  
**Track:** Peter Woit / W only  
**Reason and owner direction:** On 2026-10-11 the owner directed W research to proceed on the practical premise that the current author site reflects the earlier research; this acceptance is NOT retrospective cryptographic authentication.

## Mandatory Core 0.21 scope-revision tuple

- **Old qualification target ID:** `W_G0_OCT03_SOURCE_CORPUS_0_2`.
- **Old scope hash (Git blob SHA-1):** `5775af1ab9289f97d903b39d5eb8eda241bafe78`, path `research/woit-lisi-isomorph/SOURCE_CORPUS_FREEZE_0_2.md`.
- **New qualification target ID:** `W_G0_AUTHOR_WEB_REBASELINE_2026_10_11_0_1`.
- **New scope hash (Git blob SHA-1):** `86bb7d5ad55c26ea3586f2a74f1411c2a5d843c7`, path `research/woit-lisi-isomorph/woit/W_CURRENT_AUTHOR_SOURCE_SCOPE_2026_10_11_0_1.json`.
- **Removed SSC items:** none.
- **Added SSC items:** none.
- **Changed boundary:** the *six mutable* W03/W04a–e author pages and W04d/e linked source originals are now tied to a **2026-10-11 actual retrieval** plus SHA-256 authored-content or exact PDF fingerprints, rather than claiming inaccessible original October 3 retrieval bytes. W01/W02/W05 keep their specified arXiv versioned editions. Source-native author comments retain the prior explicit narrow scope.
- **Reason:** October 3 raw source bytes were not archived and repeated prior GitHub-history attempts were inconclusive; new live source bytes are now separately captured and identified.
- **Governing procedure:** qualified cumulative Core 0.21 §4 `SCOPE_REVISION`, `AGENTS.md`, original `SOURCE_CORPUS_FREEZE_0_2.md`, and `FULL_ISOGRAPH_TREATMENT_CONTRACT_0_1.md`.
- **Provenance:** owner-requested scope change, agent-assisted source audit and GitHub Actions exact raw and normalized fingerprints. Original author Peter Woit.
- **Old target preserved:** **true**. Do not reclassify the October 3 G0 as complete, and do not rewrite its frozen historical CI failures or evidence.

## Source identity and independent G0 boundary

At head `121f390362e43b14cff54c49fc632f803b549533`, original-capture [CI 38121482287](https://github.com/iteathen/IsoGraph/actions/runs/38121482287) returned **SUCCESS** on two separate run attempts, with 6/6 identical normalized authored webpage-content SHA-256 digests and 2/2 identical original PDF raw SHA-256 digests, while unrelated WordPress HTML bytes varied. Earlier source-probe [38121249339](https://github.com/iteathen/IsoGraph/actions/runs/38121249339) remains FAILED because a verifier incorrectly searched binary PDF bytes for title text, not because retrieval failed. Corrected [0.2 run 38121378217](https://github.com/iteathen/IsoGraph/actions/runs/38121378217) and 0.3 are distinct successes.

New scope identity and preserved SSC must now be tested by a **full nine-unit bidirectional source audit**. The baseline is reproducible from pinned URL/author-body/PDF fingerprints while the current source stays available; it is not an October 3 snapshot. No G0 or G1 stage promotion arises merely by writing this revision. A fresh G0 pass, if earned, applies to the **new target only**, never to the original historical target. Neither source truth nor any physical-theory claim is inferred; no L source is consulted.
