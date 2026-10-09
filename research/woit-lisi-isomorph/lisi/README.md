# Lisi full IsoGraph treatment

**Track:** L
**Current status:** ACTIVE — source-fidelity correctness reopening at G0; historical G5 boundary superseded for complete-source claims; primitive closure incomplete
**Source target:** ../SOURCE_CORPUS_FREEZE_0_2.md
**Cross-author semantics available:** NO
**L-only public-explanation leads:** [2026-10-08 author-source search notes](AUTHOR_PUBLIC_EXPLANATIONS_NOTES_2026-10-08.md) — external authored commentary, version history, historical notebook and replies to independently verify; not an amendment to the frozen L source, primitive authority, or a W–L hypothesis. No outreach before complete G7, three/four independent adversarial passes, and question-specific exhaustive prior-public search.

## Objective

Produce a complete source-faithful Core-0.21 rendering of the frozen Garrett Lisi corpus independently of Peter Woit. This track is successful even if no later bridge survives.

## Current formulation family

Current provisional formulations are L-F1 E8 principal-bundle/superconnection formulation, L-F2 generic gauge/gravity/Higgs symmetry-breaking formulation, L-F3 Spin(11,3)/Majorana-Weyl/E8(-24) embedding, L-F4 generalized Cartan/deforming-Lie-group geometry, L-F5 CPTt discrete-symmetry/Clifford formulation, and L-F6 division-algebra/Clifford/triality/exceptional scaffold.

See ../TRACK_L_FORMULATION_MAP_0_1.md, ../TRACK_L_DTS_WORKING_0_1.md, and ../FORMULATION_FAMILY_GRAPH_0_1.json.

## Current G0 source-fidelity audit and invalidation (2026-10-08)

### Independent publication-version recheck (2026-10-08)

A fresh **direct visual examination** of the [published Springer L05 PDF](https://link.springer.com/content/pdf/10.1007/s00006-026-01447-5.pdf), printed pages 3–5, establishes that Eq. (1) ordinary O has `e6*e7=-e2` **and** `e7*e6=-e2`, while the paper defines row/column-ordered multiplication, imaginary conjugation, scalar ordinary `n_ab=delta_ab`, and product-conjugation reversal. **The inconsistency is source-internal and cannot be removed by index-transposition, nonassociativity or alternate signature conventions.**

Unlike a publisher-only typesetting-error hypothesis, the public [2025 viXra preprint](https://rxiv.org/pdf/2504.0179v1.pdf), page 3, also contains both negative cells. The later [arXiv 2609.12112v1](https://arxiv.org/abs/2609.12112v1), submitted September 10, 2026, changes the ordinary-O *row e6, column e7* value to `+e2`; a direct 64-cell comparison finds no other change in that multiplication table. This may be a correction of an earlier copied sign error, but the author's actual intent and any formal Springer correction remain **unestablished**. The later table is **not frozen journal source authority**.

The new independent [source-version re-audit](LISI_L05_OCTONION_INDEPENDENT_VERSION_REAUDIT_0_1.json) uses a separately visually entered 8×8 journal table, checks all 64 ordered conjugation and metric basis cases, gives the explicit nonzero zero-divisor pair `(e0-e6)(e2-e7)=0`, reconstructs both distinct original Γ/barΓ conventions, compares 36 Clifford pairs and Eq.(4) 512 coefficient triples, and tests the 28 source Eq.(5) bivector operators in **both** chiral blocks and **both** barΓ interpretations at primes 1009 and 10007. Journal-only results: two ordered conjugation reversals and two ordinary metric cases fail; source Γ/barΓ definitions differ twice; each Clifford construction violates 7/36 generator-pair identities and 28 16×16 entries; four Eq.(4) M-coefficient triples fail; and 168/378 source bivector commutators fail closure under every explicit test variant. Replacing that one cell as a **diagnostic only** makes all *these specific tested cases* pass, without proving all Clifford/f4 construction theorems.

The independent replay CI [`37851752108`](https://github.com/iteathen/IsoGraph/actions/runs/37851752108) passed **22/22 effective adversarial mutants**. Its first run `37851631738` failed because two mutated table inputs bypassed a cached input oracle (20/22); the defect is explicitly preserved in `experiments/062/L05_INDEPENDENT_REAUDIT_CACHED_TABLE_MUTATION_ESCAPE_0_1.json` and the verifier re-reads the mutated table fields on every invocation. **All results are internal source-scoped finite evidence, not external cold verification, full mathematical qualification, or authorization to reopen G1–G7.**

### Governing current source checkpoint: G0, SSC 0.20 / stage gate 0.20

**Current lawful L status: G0 source research only; SSC 0.20 UNFROZEN; G1–G7, Recursive IA, Discovery, W/L comparison, and merging UNAUTHORIZED.** The current L-only procedural gate is `experiments/062/L_CURRENT_STAGE_GATE_0_20.json`, consuming `SOURCE_SEMANTIC_CENSUS_0_20.json` with all **191 stable source IDs**, exactly **L-SSC-030** revised, and all **190 other complete source records conserved from SSC 0.19**.

L01 §2.2.1 Eq. (2.8) is now independently finite-reconstructed from the author's original `arXiv:0711.0770v1` printed Pauli/Cl(3,1) 4×4 gamma matrices in `LISI_L01_EQ2_8_CHIRAL_SOURCE_FINITE_G0_0_1.json`. The matrix test checks **16 ordered Clifford gamma anticommutator pairs**, the **six** spatial/boost bivector generators, **729** six-real-coefficient combinations from `{-1,0,1}^6`, and **11,664** 4×4 source connection entries. There were **zero source-block discrepancies** in this finite domain, plus a source-excluded complex coefficient falsifier showing the source's chiral reality condition requires **six REAL coefficients**. Eq. (2.8) left connection uses `omegaS−i*omegaT` while the right uses `omegaS+i*omegaT`. An unproven entrywise complex-conjugate relation between the two displayed 2×2 matrices was **not** asserted: the source condition concerns the individual coefficient roles.

Finite Eq. (2.8) source run `37871145207` passed **25/25 hostile mutants**; SSC0.20 source conservation run `37871318015` passed **23/23**; current procedural gate0.20 run `37871568975` passed **23/23**. These are **G0 source-local finite controls only**, not full Clifford/Lie theorem qualification or independent complete source-cold audit. The author's original printed `Spin⁺(3,1) ≅ SL(2,C) = SL(2,R)×SL(2,R)` real-group assertion remains independently falsified by center and Killing-form invariants in `LISI_L01_SPIN_REAL_GROUP_ISOMORPHISM_SOURCE_DEFECT_G0_0_1.json`, with no authorized source correction or claim that the whole E8 construction fails.

L01's other seven source-modalities remain conserved from SSC0.19, including root normalization scope, tentative physical generation/triality, curvature coefficients, inseparable xPhi interactions, and action equivalences only up to boundary terms. All 31 original L01 PDF pages had historical visual coverage but no source-wide complete native formula AST/primitive qualification. The source-wide L02–L06 and L05 split Γ, ordered triality/phase/after-Eq17 reflection domains remain open. Earlier L05 published-octonion double-negative table and its exact Clifford, cyclic, and rational bivector counterexamples are preserved without substituting the later arXiv variant. Historical G1–G7 fixed points/green tests remain outside the current G0 authority tuple. Owner exception waives only external-review calls, **not** these substantive gates.

**Next lawful action:** continue direct frozen L01–L06 G0 assertion-by-assertion source reconstruction, including the next incomplete L01 root/weight and triality/action formulas, before any G1 replay. PR #70 remains draft and unmerged.

### Historical predecessor source checkpoint: G0, SSC 0.19 / stage gate 0.19

**Current lawful L status: G0 OPEN / 191 source IDs / SSC UNFROZEN / G1–G7 AND RECURSIVE IA NOT AUTHORIZED.** `experiments/062/L_CURRENT_STAGE_GATE_0_19.json` is the latest L-only procedural routing record, consuming `SOURCE_SEMANTIC_CENSUS_0_19.json`. The new SSC changes exactly **L-SSC-028, 030, 033, 039, 040, 042 and 043**, retaining all **184 other full records** from 0.18 and all 191 SI handles unchanged. Neither source-version provenance nor the author-positive predecessor bodies were overwritten.

**L01 primary-source recheck.** The 31-page original `arXiv:0711.0770v1` source and eight corrected equation locators were audited in `LISI_L01_31_PAGE_VISUAL_SOURCE_G0_AUDIT_0_1.json` and `LISI_L01_EQUATION_LOCATOR_G0_DEFECT_0_1.json`. Frozen-source locator SSC0.18 source CI `37858146999` passed its scoped 183-body conservation and eight source-label changes. L01 §2.2.1 source Eq. (2.8) explicitly pairs `omega_L=omega_S−i omega_T` with `omega_R=omega_S+i omega_T`; the components have a complex-conjugation reality relation and are **not** independent. Six other restored source modalities preserve root-bracket normalization as a presentation choice, tentative E8 triality physical assignments, exact gravity `1/2` and `-1/8` coefficients, the shared `xPhi*xPhi` curvature term, and BF/Einstein-Hilbert action equivalence only **modulo dropped boundary terms**. The source-only seven-claim CI `37870344713` passed **22/22 effective hostile mutations**; the new SSC0.19 CI `37870574868` passed **24/24**; stage gate0.19 CI `37870767908` passed **23/23**.

A separate exact source-page and real-group audit `LISI_L01_SPIN_REAL_GROUP_ISOMORPHISM_SOURCE_DEFECT_G0_0_1.json` preserves the author's printed assertion `Spin⁺(3,1)≈SL(2,C)=SL(2,R)×SL(2,R)` **verbatim as source data**, but independently rejects the claimed **REAL** direct-product isomorphism: centers have orders **2 versus 4**, and real Lie-algebra Killing-form inertias are **(3+,3−) versus (4+,2−)**. An equality after complexification is not the printed real-group equality. The passing proof verifier `37858801330` and the SSC source replay do **not** correct the author's paper, determine his intended replacement, or invalidate the whole E8 research program. The older 19/21 mutation-escape verifier remains historical negative infrastructure evidence.

**Earlier L05 source evidence remains intact:** published ordinary-octonion double-negative `e6e7=-e2` and `e7e6=-e2`; exact 7/36 Clifford generator anticommutator failures; 4/512 cyclic coefficient counterexample triples; and exact-rational 168/378 upper bivector commutators outside their purported 28-dimensional span. The distinct later arXiv edition's `e6e7=+e2` is not substituted for frozen journal source. Historic G1–G7 fixed points and old local hypothesis qualifications are not current source authority.

**Remaining source/audit burden:** all 31 original L01 pages were visually scanned, but **zero of the 30 L01-related source items has a complete independent source-expression AST/native Core reconstruction certificate**. The seven specific modalities above are scoped G0 repairs, not whole-item closure; 23 other L01-related claims and the full L02–L06 frozen corpus must also be audited. L05 split-metric lowered Γ, nonassociative `t/t²`, after-Eq.17 reflections, phase/root actions and other source assertions remain open. Prior `SOURCE_TRAVERSAL_LEDGER_0_11.json` “COMPLETE” is bound to historical SSC0.2 only; mechanical 1,191/1,205-file inventories are historical byte/syntax coverage, **not semantic source proofs**. Owner bypass waives only outside reviewer calls, never the substantive checks. No G0 fixed point, primitive closure, Recursive IA, cross-track comparison, author contact or merge is permitted at this stage.

### Historical predecessor source checkpoint: G0, SSC 0.16 / stage gate 0.17

**Exact lawful status: G0 OPEN; SSC 0.16 UNFROZEN; G1–G7, Recursive IA, Discovery Protocol and cross-track synthesis NOT AUTHORIZED.** The current gate is `experiments/062/L_CURRENT_STAGE_GATE_0_17.json`; current `SOURCE_SEMANTIC_CENSUS_0_16.json` has **191 preserved source obligations, with only L-SSC-133 changed and 190 unrelated full items byte-for-byte conserved** relative to SSC 0.15. This is a source-census revision under review, **not** whole-source Assertion Census Conservation, primitive/schema closure, or current qualification.

L05 published §4.3 Eq. (17), printed journal page 19, now has a G0 source-literal packet at `LISI_L05_F4_EQ17_SOURCE_G0_0_1.json`: all **four** printed bracket components, **three** diagonal B_M/B_P/B_V roles, and the right-first compositional-octonion example. Its first transcription wrongly conjugated the second ψ operand within a `t²` term; direct printed-page audit found that source actually conjugates the **first** ψ operand. The correction and improper quaternion/octonion carrier generalization are preserved by `experiments/062/L133_EQ17_PSI_CONJUGATION_SOURCE_FIDELITY_DEFECT_0_1.json` and in the packet revision. Source Eq. (17) CI `37846801752` passed **29** hostile mutations; SSC 0.16 CI `37847116335` passed **24**, preserving the other 190 items; gate0.17 CI `37847527623` passed **19** gate-promotion mutants. All three checks cover **exact recorded source strings/provenance only**; they do NOT prove f4 Lie algebra, the all-and-only semantics of `t` or `t²`, full reflection matrices, root phases, split/noncompact cases, or source-wide closure.

The previous Eq. (1) published ordinary O source-table conflict (both `e6e7=-e2` and `e7e6=-e2`), Eq. (2)–(3) Clifford counterexamples, Eq. (4) four-cycle source-coefficient counterexamples, and Eq. (5) bivector antisymmetry/Lie nonclosure remain visible and unrepaired. The source author’s September arXiv variant does **not** silently replace the 2026-08-29 frozen journal. The owner temporarily bypassed only external third-party review calls, **not** source/semantic review or stage gates; no external review has passed.

The mechanical 0.1 inventory `L_G0_FULL_TRACK_AUDIT_COVERAGE_0_1.json` froze **1,191 files at its old HEAD**, with 550 JSON parses, 180 JavaScript syntax checks, 1,252,109 line records, 16 hostile mutants, and **zero current full-source cold-audit qualifications** (CI `37846189663`). It remains historical at its original HEAD. Its exact successor `L_G0_FULL_TRACK_AUDIT_COVERAGE_DELTA_0_2.json` now reconciles **1,205** in-scope files (14 additions, one revised L dossier, no removals), with **1,267,218** line records mechanically read, 556 JSON parses, 184 script syntax checks, and **20/20 effective adversarial mutations** in CI `37848329548`. The original failed baseline `37847970197` is retained: it compared directory-group order to global path order and evaluated no mutants. These are **byte/syntax coverage results only**, with zero full current cold primary-source item passes; later additions require another exact successor. Mechanical pinning does not substitute for a full line-by-line independent source-semantic review of the 191 obligations.

**Next lawful step:** exhaustively inspect frozen L01–L06 assertions and their exact corresponding current SSC records. For L05, finish §4.3 reflection matrices, γ_ab actions, t/t² operator domains and phase/root constraints, alongside open §2 lowered Γ indices, §4.1 split/Cartan/root tables, and Eq. (17)-onward formulas. Full G0 fixed point, any current G1–G7 replay, IA, DP, cross-track synthesis, module promotion, author outreach, or PR merge remain blocked. PR #70 remains draft and unmerged.

### Historical predecessor source checkpoint: G0, SSC 0.15 / stage gate 0.16

**Current lawful status: G0 OPEN; 191 source obligations; source census UNFROZEN; G1–G7 and source-track Recursive IA UNAUTHORIZED.** `experiments/062/L_CURRENT_STAGE_GATE_0_16.json` is the current L-only procedural authority-routing record, consuming `SOURCE_SEMANTIC_CENSUS_0_15.json`. The latter changes only **L-SSC-126** from 0.14, preserves the other **190 full previous source items**, and retains all 191 source identities. This is Assertion Census Conservation relative to the previous candidate, **not** full primary-source assertion completeness or primitive closure.

L05 §2 Eq. (5) was further transcribed in `LISI_L05_EQ5_INDEXED_BIVECTOR_SOURCE_RECONSTRUCTION_0_1.json`, preserving the upper free `a,e` / bound `b`, lower free `b,f` / bound `a`, signed chiral matrix operands, conjugated indices and right-first octonionic application. Finite source-only verification `37839333341` checked **15,136 signed matrix-cell cases** and rejected **27 effective mutants**. SSC 0.14 conservation passed `37839907021` with **22 mutants**; G0 stage gate 0.15 passed `37840304665`. The printed ordinary-octonion table remains internally incompatible with source Clifford and bivector assertions: the 28 upper source matrices have **168/378 commutators outside their span** in two finite-field rank checks. No author-table cell was normalized, no universal Clifford/Lie theorem qualified, and the later arXiv source version is not interchangeable with the frozen journal.

L05 §2 Eq. (4) is now conserved at four exact ordered source multiplication-coefficient members in `LISI_L05_EQ4_CYCLIC_SOURCE_G0_0_1.json`. Direct ordinary C/H source-table controls pass, but the frozen journal ordinary O has **four counterexample triples among 512**, preserving every index and sign. Source packet CI `37840813885` rejected **23 mutants**, SSC 0.15 CI `37841417817` rejected **20**, and G0 gate 0.16 CI `37841785711` rejected **20**. The other four lowered `Γ/̄Γ` terms of Eq. (4) and split-metric index lowering remain **unverified**, as do the rest of frozen L01–L06. Failed intermediate verifiers, including source-version guard escapes, packet field mismatches and mutation-crash fixes, remain in `experiments/062` as negative infrastructure evidence; they are not silently reported as passes.

**Historical completeness warning:** `SOURCE_TRAVERSAL_LEDGER_0_11.json` reports six-source completion for its pinned **SSC 0.2**, not for SSC 0.15. None of the older G1–G7 fixed-point/qualification workflows establishes current source closure. The owner bypass waives **external reviewer calls only**; an external verification PASS may not be asserted. The new audit coverage inventory records every known L research/support/G-stage artifact as examined mechanically, directly reviewed, or explicitly *not yet line-by-line source audited*; it is not a blanket completion certificate.

Immediate lawful work remains complete primary-source G0 transcription and adversarial review of the unverified Eq. (4) Γ/index cases, L05 §4.1 root/split and §4.3 Eq. (17)-onward formulas, and the remaining L01–L06 source assertions. Every unexamined item must stay open. PR #70 is draft, unmerged, and no cross-track semantics, hypothesis or bridge is authority.

### Historical predecessor source checkpoint: G0, SSC 0.13 / stage gate 0.14

**Status: G0 OPEN / SSC NOT FROZEN / G1–G7 NOT AUTHORIZED.** The governing L procedural record is `experiments/062/L_CURRENT_STAGE_GATE_0_14.json`; its predecessor 0.13 and all earlier stage gates remain historical evidence. `SOURCE_SEMANTIC_CENSUS_0_13.json` contains **191 stable identities** and adds direct negative-source evidence only to **L-SSC-126**, conserving all **190** unrelated source items verbatim from 0.12.

Independent hostile reconstruction of L05 §2's published ordinary-octonion table into both source versions of Γ/barΓ found a new source-level inconsistency: Eq. (2)'s `barGamma = Gamma^T` and coefficient-table definition differ in two entries (c=6, positions (2,7) and (7,2)). Eq. (3)'s negative-Clifford anticommutator then fails for **7 of 36** unordered generator pairs, at **28 entries** of the reconstructed 16×16 matrices. The direct-M and transpose variants independently show 7/28, while ordinary complex and quaternionic controls remain consistent. The earlier printed Eq.(1) octonionic double-negative cells are conserved unchanged; alternative one-cell repairs are **diagnostic only, never replacements for source text**. Audit: `experiments/062/L126_L05_EQ2_EQ3_OCTONION_CLIFFORD_SOURCE_CONTRADICTION_0_1.json`.

The hostile mathematical checker passed **20 effective mutations** at run `37834203305`. The new SSC0.13 exact-provenance/190-body conservation checker passed **21 effective mutations** at run `37834466685`. Its earlier checker attempts `37833925600` and `37834051764` failed on witness-key fixture mismatches; neither evaluated adversarial mutations and both are preserved in the defect ledger.

Separate G0–G7 hostility review `experiments/062/L_G0_TO_G7_HOSTILE_STAGE_PROVENANCE_AUDIT_0_1.json` traced the real historical stage chain: old G1 extraction 0.25, G2 occurrence graph, G3's **151 scoped bodies / 818 occurrences**, G4 and G5 old fixed points, G6 campaign-local hypothesis qualifications, and G7's **four-body** targeted replay. Its independent Node CI `37834981548` rejected **26/26** stage-provenance mutations. The latest procedural gate verifier `37835368480` rejected **18/18** further unauthorized-stage and stale-green-CI mutations. These passes establish defensive routing **only**, not full-source correctness, mathematical theorem validation, or current G-stage closure.

The current counterexample directly affects source-asserted Clifford `L-SSC-126`, the dependent `L-SSC-127` bivectors, and the `L-SSC-133` `f4` use of Γ operators. The past G7 and provisional G6 results remain scoped historical evidence for their exact old authority tuples, not current L source authority. Third-party review is bypassed only by the owner's temporary external-call exception, never passed.

**Next lawful step:** continue the exact independent G0 source audit of L05 §2 Eq.(5) Γ/M indexed operators, §4.1 split/Cartan roots, §4.2 alternate realizations and phases, §4.3 Eq.(17) onward, and the remainder of frozen L01–L06. Conserve source-negative evidence and reach a full source-local fixed point before any G1 replay, primitive closure, Recursive IA, Discovery or W/L comparison. PR #70 remains draft and unmerged.

### Historical predecessor source checkpoint: G0, SSC 0.12 / stage gate 0.12

`experiments/062/L_CURRENT_STAGE_GATE_0_12.json` supersedes gate 0.11 for L-only G0 source work. `SOURCE_SEMANTIC_CENSUS_0_12.json` retains **191/191 source identities**, changes only **L-SSC-133** from 0.11 and conserves the other **190 complete source items**; no freeze, G1 approval, SI promotion, Recursive IA, DP, Discovery or W/L synthesis follows.

L05 §4.3 Eq.(15)/(16) is now transcribed in `LISI_L05_F4_EQ15_EQ16_SOURCE_G0_0_1.json`: Eq.(15) is a **compositional octonionic bi-product representation**, not a naive associative `su(3,O)` matrix Lie identity, with right-first octonion multiplication. Eq.(16) has **10 exact bracket families**, and the paper separately gives **three split `f4(4)` sign rows**. The `∓` sign branches for ordinary `f4(-52)` and `f4(-20)` are distinct from split `f4(4)` with metric `diag(++++----)`. The author's equality-of-metrics requirement for triality is conditional source modality. The printed ordinary-O contradictory table and Eq.(5) Γ/M gaps remain unresolved; **no finite octonion Lie-algebra mathematics was tested or claimed**.

G0 exact source packet CI `37825594872` passed ten Eq.(16) rows, three split rows and **26/26 effective mutation controls**. SSC 0.12 CI `37825937865` passed exact 191-ID/190-body conservation with **26/26 effective mutations**, retaining the previous Eq.(13)/(14) source checkpoint. Stage gate0.12 integrity CI `37826248923` passed all mandatory source replay and procedural checks. Earlier 0.11 CI and the two recorded failed verifier fixtures remain historical evidence; the owner bypass still exempts only outside reviewer calls.

L05 §4.3 **Eq.(17) onward**, the full ordered octonion operator/triality, reflection and phase rules, and all source coverage beyond these two pages remain open. So do L05 §2 Eq.(5), §4.1 root/split, §4.2 alternate realizations and t orientation, and the complete L01–L06 assertion census. The only lawful next steps remain G0 source-accurate conservation and independent adversarial replay; no G1–G7 descendant may be reused as current authority.

### Historical predecessor source checkpoint: G0, SSC 0.11 / stage gate 0.11

`experiments/062/L_CURRENT_STAGE_GATE_0_11.json` governed this historical L-only checkpoint. `SOURCE_SEMANTIC_CENSUS_0_11.json` is a 191-ID **UNFROZEN, SOURCE-INCOMPLETE G0 candidate**. Its one changed body is L-SSC-133; the other 190 full predecessor items are exactly conserved. No historical G1–G7, IA, DP, cross-track or primitive qualification is restored.

New L05 §4.2 ordinary-quaternion source packet `LISI_L05_SP3_EQ13_EQ14_SOURCE_G0_0_1.json` records all 15 ordered Eq. (13) bracket families (A,B,C imaginary indices 1..3, a,b,c full indices 0..3), the separately Killing-normalized 1/sqrt(2) 3x3 basis, and Eq. (14)'s signed matrix-reflection action. The phase observation is **negative**: the printed root/Cartan reflection by itself does not fix root-vector phases. `experiments/062/L05_SP3_EQ14_ROOT_PHASE_SOURCE_FIDELITY_DEFECT_0_1.json` preserves a historical occurrence's erroneous conflation of conjugation with completed root phases.

The independent finite source H-table/matrix check passed **216/216** generator-pair/reflection basis cases and rejected **24** source-packet mutations (Node CI run `37823910939`). The SSC0.11 reconstruction check passed 191 stable IDs, 190 unchanged predecessor bodies, 15 source expressions and **27 effective adversarial mutations** (Node CI run `37824604048`). Failed intermediate verifier runs `37823733174` (old 198-case expectation) and `37824412749` (baseline failure masking mutation tests) are preserved with their defects; neither is source-theorem authority. The owner waiver still bypasses external cold review rather than passing it.

Remaining G0 work includes L05 §2 Eq.(5) full Γ/M-indexed equality; §4.1 split/Cartan/root phase tables; §4.2 real/complex alternative realizations, canonical t orientation and native closure; §4.3 f4 ordinary/split brackets; and a full independent L01–L06 source census. The printed ordinary-O source inconsistency remains deliberately unnormalized. Descendants L129/L130/L131 → L132 → L133/L134 may replay only after an admissible complete source checkpoint; no premature G1 or Recursive IA.

### Historical predecessor source checkpoint: G0, SSC 0.10 / stage gate 0.10

`experiments/062/L_CURRENT_STAGE_GATE_0_10.json` controlled its historical scope. `SOURCE_SEMANTIC_CENSUS_0_10.json` was a 191-item **source-census candidate, not frozen or qualified**. It preserves all eight previously corrected L125–L132 source items and adds explicit L133 §4 source equations, changing exactly one body from SSC 0.9. Full source Assertion Census Conservation, primitive/schema closure, global source-track G1–G7, Recursive IA, Discovery Protocol, and any W/L comparison remain unauthorized.

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
