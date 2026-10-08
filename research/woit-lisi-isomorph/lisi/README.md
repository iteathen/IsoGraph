# Lisi full IsoGraph treatment

**Track:** L
**Current status:** ACTIVE — source-fidelity correctness reopening at G0; historical G5 boundary superseded for complete-source claims; primitive closure incomplete
**Source target:** ../SOURCE_CORPUS_FREEZE_0_2.md
**Cross-author semantics available:** NO

## Objective

Produce a complete source-faithful Core-0.21 rendering of the frozen Garrett Lisi corpus independently of Peter Woit. This track is successful even if no later bridge survives.

## Current formulation family

Current provisional formulations are L-F1 E8 principal-bundle/superconnection formulation, L-F2 generic gauge/gravity/Higgs symmetry-breaking formulation, L-F3 Spin(11,3)/Majorana-Weyl/E8(-24) embedding, L-F4 generalized Cartan/deforming-Lie-group geometry, L-F5 CPTt discrete-symmetry/Clifford formulation, and L-F6 division-algebra/Clifford/triality/exceptional scaffold.

See ../TRACK_L_FORMULATION_MAP_0_1.md, ../TRACK_L_DTS_WORKING_0_1.md, and ../FORMULATION_FAMILY_GRAPH_0_1.json.

## Current G0 source-fidelity audit and invalidation (2026-10-08)

### Governing current source checkpoint: G0, SSC 0.10 / stage gate 0.10

`experiments/062/L_CURRENT_STAGE_GATE_0_10.json` controls the L lane. `SOURCE_SEMANTIC_CENSUS_0_10.json` is the newest 191-item **source-census candidate, not frozen or qualified**. It preserves all eight previously corrected L125–L132 source items and adds explicit L133 §4 source equations, changing exactly one body from SSC 0.9. Full source Assertion Census Conservation, primitive/schema closure, global source-track G1–G7, Recursive IA, Discovery Protocol, and any W/L comparison remain unauthorized.

The direct frozen L05 Eq.(1) source check identified a severe source-fidelity failure in the earlier signed table ledger: the printed ordinary-octonion table has **both** `e6 e7=-e2` and `e7 e6=-e2`, although its conjugation-reversal axiom conflicts with that pair. `LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_1.json` silently replaced the second with `+e2`, and the old green CI oracle repeated that mathematical normalization. `...LEDGER_0_2.json` restores the exact printed two-negative-cell source, preserves the inconsistency and previous negative witnesses, retains the other 167 table entries and 15 formula rows, and makes no mathematical repair. `SOURCE_SEMANTIC_CENSUS_0_8.json` attaches corrected source provenance. Source-literal test run **37813728562** passed 168 cell assertions and 25 adversarial controls. Earlier CI run **37807515374** is historical, not source-completeness authority.

The printed L05 §2 `Cl(0,2)` worked example is now conserved explicitly in `LISI_L05_CL02_WORKED_EXAMPLE_SOURCE_MATRICES_0_1.json` with its two `Gamma` 2×2 matrices, two chiral `gamma` 4×4 matrices and four typed basis spinors. Exact finite reconstruction and 17 adversarial controls passed in GitHub Actions run **37814117693**. `SOURCE_SEMANTIC_CENSUS_0_9.json` carries that single L127 addition with the other 190 identities unchanged; run **37814407801** verified this replay and 11 additional source-census mutations. This does not qualify general Clifford identities. L05 §2 Eq.(5) full `Gamma/M` source-index presentation remains open.

L05 §4/L133 was independently reopened because historical `L133_G1_SOURCE_INCIDENCE_0_1.json` and `L133_G3_CORE_DEFINABILITY_0_1.json` did not reconstruct printed formulas. SSC **0.10** now includes six ordinary/split labelled decompositions, the su(3) and sp(3) exact 3×3 source matrices, 5+6 component commutator equations, and 13+3 explicit su(3) basis-bracket rows, preserving the other 190 SSC records. Run **37815232875** passed six finite direct matrix-commutator comparisons with seven adversarial controls, plus SSC0.10 structural/source replay and 15 mutations. These tests do not establish a universal Lie theorem. The complete §4.1 root/Cartan/phase table, split-complex formula family, §4.2 Eq.(13)/(14) and §4.3 f4/split cases remain incomplete.

L127 SI-corrected G7 0.2 remains narrow historical evidence; it does not override newly discovered source defects. L129/L130/L131 must be rebuilt before L132, and L133 after verified L132. Owner external-verification bypass remains active only for outside-review calls; no external review passed. No new SI/module has been promoted and PR #70 must remain draft/unmerged.

### Historical source-census checkpoints (0.7/0.8 and earlier)
### Former SSC 0.7 and G0 gate 0.8 (superseded)

The historical procedural gate was `experiments/062/L_CURRENT_STAGE_GATE_0_8.json`. The former unqualified **NOT FROZEN** source-census candidate was `SOURCE_SEMANTIC_CENSUS_0_7.json`; no G1-G7 replay, source-track Recursive IA or unification is authorized.

Direct frozen L05 section 2 inspection exposed omitted source-level behavior in L-SSC-125 to L-SSC-127. `LISI_L05_SECTION2_TABLE_AND_CLIFFORD_FORMULA_LEDGER_0_1.json` conserves six signed ordinary/split multiplication tables (168 row/column signed source entries) and 15 explicit formula records for equations (1)-(5). The source ledger is manual primary-source transcription, not independently cold-reviewed. Source Eq.(5) precise matrix-index positions and the Cl(0,2) worked example remain to be reconstructed.

The 0.7 SSC changed only L125-L127 versus 0.6, preserving 188 other items, six L128 coefficient formulas and 44 L129-L132 expression records. GitHub Actions CI run `37807515374` passed all 168 source-cell checks and 20 adversarial mutation cases after correcting a premature-G1 flag mutation escape in historical run `37807377432`. L128's separate local source-census CI run `37806073112` also passed; none establish full six-source SSC completeness.

L127's SI-repaired G7 0.2 remains historical campaign-local scoped evidence only. L129-L131, L132 and L133 current replay remain blocked by upstream source completeness. Owner bypass waives third-party reviewer calls, not source-fidelity verification or stage ordering.

### Additional L05 section 4 source-granularity defect

The independent §4 audit confirmed that historical `L133_G1_SOURCE_INCIDENCE_0_1.json` and `L133_G3_CORE_DEFINABILITY_0_1.json` do not reconstruct the source's explicit bracket equations from their broad source-family labels. The defect is preserved as `experiments/062/L_G0_L05_SECTION4_L133_SOURCE_FIDELITY_DEFECT_0_1.json`. A targeted `L_G0_L05_SECTION4_L133_SOURCE_EXPRESSION_AUDIT_0_1.json` now conserves the six family-role decompositions, source `su(3)` and `sp(3)` matrix expressions, five complex and six quaternionic commutator components, and partial basis-bracket data.

A separate `verify-l-g0-l05-section4-matrix-source-0-1.mjs` passed **six finite matrix-commutator pairs and seven adversarial source mutations** in a local V8 replay, pinned by `L_G0_L05_SECTION4_MATRIX_SOURCE_LOCAL_REPLAY_0_1.json`. This is not a universal theorem, GitHub Actions CI qualification, or a full §4 source census: the complete `su(3)` root/Cartan bracket table, split variants, quaternionic Eq.(13), and `f_4` cases remain unexpanded. SSC0.7 then lacked the Section 4 additions; successor SSC0.10 now carries a source-conserved subset and remains unfrozen. L133 G1/G3 are not current even though the earlier local pass used five `CORE_CLOSED` dispositions.

### Historical 0.5 source-census checkpoint
The preceding L stage gate was `experiments/062/L_CURRENT_STAGE_GATE_0_5.json`. Targeted repair `L127_G7_TARGETED_CLOSURE_0_2.json` preserves the corrected SI namespace (scalar-extension 225000, dimension-seven 225010, corrected L127 source 246xxx), but it is not a whole-track source-closure certificate.

The L05 §3 source audit reopened **L-SSC-129–132** for omitted assertions and compressed equation modality. `SOURCE_SEMANTIC_CENSUS_0_5.json` retains 191 identities and 187 unrelated source items unchanged, adding 44 exact-role/index/polarity/approximation source-expression rows. The source audit is `experiments/062/L_G0_L05_SECTION3_SOURCE_ASSERTION_REOPEN_AUDIT_0_3.json`. SSC0.5 is **candidate, not frozen, not qualified**.

The v0.5 standalone source verifier failed one adversarial test involving a missing duality denominator. The defect and failed verifier remain historical evidence. Corrected verifier v0.6 rejected 16/16 mutations under local deterministic V8 replay of current GitHub file contents; a separate Node/GitHub Actions qualifying run has **not** passed. External review remains owner-bypassed, not passed.

Because the upstream frozen SSC is incomplete for this revised source target, L129/L130/L131 must be replayed before L132, and L133 remains downstream of L132. No source-local Recursive IA, cross-track synthesis or Discovery Protocol is authorized.

## Full-treatment gates

| Gate | State |
|---|---|
| corpus frozen | PASS — 0.2 |
| source traversal complete | HISTORICAL — previous six-source traversal ledger exists; current full-source semantic completeness is reopened after L05 §3 omissions |
| SSC frozen complete | **REOPENED/NOT CURRENT** — historical 0.2 is retained as a defective-completeness baseline; 0.10 is the latest source-expression successor candidate, **not frozen** |
| primitive math support complete | BLOCKED — G0 source-census correctness gate; historical G5 (345 unresolved classes) is for an incomplete predecessor source tuple |
| native .isg bundle | HISTORICAL / PARTIAL — previous renderings exist but cannot reconstruct newly restored G0 source obligations |
| graph-derived closure ledger | IN PROGRESS — existing Core-0.21 ledger/gates remain separate closure evidence; Experiment 062 does not convert unresolved G5 classes into closures |
| recursive IA fixed point | BLOCKED — primitive/schema closure incomplete; L G5 explicitly leaves IA unauthorized |
| NEI pass | BLOCKED — primitive closure / IA not complete |
| DTS pass | PARTIAL / PROVISIONAL |
| DP pass | BLOCKED — primitive closure / IA not complete |
| EI warrants | NONE YET |
| reconstruction audit | NOT YET |
| sealed | NO |

## High-risk reductions

Lie groups/algebras/embeddings; Clifford matrices; chiral spinors; Majorana-Weyl constraints; Spin(11,3), Spin(12,4), E8(-24); principal bundles/superconnections/curvature; extended Plebanski action; symmetry breaking; frame-Higgs factorization; Cartan/generalized Cartan geometry; deforming Lie group/embedded spacetime; C/P/T/triality; division/split-composition algebras; trilinear triality; generalized reflections; magic square/exceptional algebras; triality eigenspaces/Vinberg theta; generation assignments; unresolved dynamics.

## Revision discipline

L01–L06 remain separate source formulations. L06 explicitly reframes a problem in L01 rather than merely restating it. L05's Woit citation remains opaque until both tracks seal.

## Firewall

No Woit twistor definition, Euclidean-incidence construction, SU(2,2) interpretation, or proposed bridge may close a Lisi item before sealing.

## BT01 source-native bridge support

- `LISI_BT01_SOURCE_INSTANCE_0_1.isg` — direct real typed action instance.
- `LISI_BT01_QUATERNION_COEFFICIENT_TRANSPORT_0_1.isg` — preserves the source tilde convention while transporting vector/chiral roles to quaternion multiplication and the neutral 187500 intertwiner package.

- `LISI_BT01_PAULI_MATRIX_SOURCE_INSTANCE_0_1.isg` / `.md` — Lisi-local complex field, finite M2(C) matrix-unit presentation, explicit Pauli elements, and multiplicative H→M2(C) source representation.
- `LISI_L05_QUATERNION_TRIALITY_SOURCE_INSTANCE_0_1.isg` / `.md` — source-native quaternionic scalar triality form and canonical order-three vector/Q_minus/Q_plus role cycle, preserving the tilde-basis convention.


Current working assertion base: `ASSERTION_BASE_A0_0_12.md`.

Current source traversal ledger: `SOURCE_TRAVERSAL_LEDGER_0_10.json`.

Historical frozen SSC baseline (source-incomplete for L05 §3): `SOURCE_SEMANTIC_CENSUS_0_2.json`. Latest NOT-FROZEN source-census candidate: `SOURCE_SEMANTIC_CENSUS_0_10.json`.

Historical working census immediately before freeze: `../TRACK_L_WORKING_SSC_0_8.md`.


## Implicit-assertion gate

- `LISI_PRE_DP_IA_GATE_0_1.md` / `.json` — mandatory recursive source-local IA gate. DP is prohibited until a current IA fixed point is reached after primitive/schema closure; any load-bearing kernel/SSC/scope/QU/authority/profile change reopens IA.

## Current execution gate

Discovery Protocol is blocked.

The required order is:

~~~text
corrected L SSC G0 [REOPENED — NOT YET SOURCE COMPLETE]
-> rebuild authoritative L native .isg source bundle [BLOCKED ON G0]
-> primitive/schema closure
-> mechanically derived Core-0.21 closure ledger
-> five Core qualification gates
-> recursive IA rounds with every IA body/support/dependency primitive-closed
-> no-change pass + pinned current IA fixed point
-> applicable NEI
-> DTS
-> only then DP
~~~

Existing partial native source instances remain evidence/components; they do not constitute the authoritative full-track compilation while the SSC is open.


## Historical graph-first primitive-demand checkpoint — Experiment 062 (superseded by G0 source-fidelity reopening)

The prior category/regex primitive-demand line has been superseded by the graph-first procedure in `research/primitive-demand-qualification/PRIMITIVE_DEMAND_GRAPH_FIRST_METHOD_0_2.md`. The current **L-only** state is:

- **G1 semantic occurrence census:** frozen source-local fixed point at `experiments/062/L_EXTRACTION_RECONCILED_0_25.json`, covering the 151 unresolved L demand bodies with **818 semantic occurrences**. This record preserves the corrected L130 individual-reflection/even-composition distinction and the L05 ordinary-octonion inconsistency without repair.
- **G2 neutral occurrence graph:** materialized and verified from the frozen G1 occurrence census. No W evidence or predeclared primitive/basis category enters the L graph.
- **G3 qualified-Core definability:** fixed at **82 `CORE_CLOSED` / 736 `UNEXPANDED_DEMAND`**, with zero Core-schema candidates and zero qualified-QU boundary candidates. Only L-local G4 was authorized.
- **G4 L-local alpha-renamed structural quotient:** mechanically verified and frozen at **345 structural classes** over the 736 unresolved roots: **282 singleton / 63 multi-member**, largest class size 64. Exact rooted graph isomorphism, duplicate-class exclusion, source-text relabel invariance, and deterministic replay pass. Structural equivalence is not semantic equivalence.
- **G5 L-local candidate-basis synthesis:** verified at **0 lawful reusable candidates / 345 unresolved boundaries**. The 63 repeated structural classes contain only 5 uniform source-relation labels and 58 source-semantically heterogeneous classes; a separate collective L-source sufficiency review also found no class or cross-class recurrence family with enough frozen semantics to state an exact reusable expansion/reconstruction contract.
- **G6:** not entered because G5 produced no reusable module/extension candidate to qualify.
- **Track consequence:** L primitive closure remains **incomplete**. Recursive IA, final NEI/DTS/DP, sealing, and cross-author comparison remain blocked.

Durable boundary artifacts:

- `experiments/062/L_G4_FIXED_POINT_0_1.json`
- `experiments/062/L_G5_RESIDUAL_RECONSTRUCTION_FRONTIER_0_1.json`
- `experiments/062/L_G5_CANDIDATE_BASIS_SYNTHESIS_0_1.json`
- `experiments/062/L_G5_SOURCE_SUFFICIENCY_REVIEW_0_1.json`
- `experiments/062/L_G5_FIXED_POINT_0_1.json`

The L track may lawfully reopen from this boundary only if new frozen L source evidence supplies exact lower semantics, a separately qualified generic module supplies exact source-faithful semantics, or a later lawfully authorized graph-first candidate is independently qualified and then consumed by L under G7. Do **not** start recursive IA or use NEI/DTS/DP to bypass this boundary.

## L06 v2 full-source expansion

The current L06 census was taken from the frozen arXiv v2 paper, including the full Cartan/generalized-Cartan/superconnection/regional-fermion construction and the source's explicit assumptions and discussion-level limitations.

All six frozen L sources passed the final census-conservation review. Track L source traversal is complete and the 191-item SSC is frozen. This does **not** imply native compilation or primitive closure.
