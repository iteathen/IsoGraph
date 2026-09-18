# Experiment 004 — final Draft 0.15 qualification review

**Semantic authority:** `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`  
**Frozen qualification corpus:** `main @ 30d9b0f0a84cb6005fae1d8f82b1777fd24c0215`  
**Cold Gemini workflow:** `35191919970`  
**Raw Gemini cold archive:** `d78a806322198e084e5016f44f813401bff72ad3`  
**D17/D17B verifier harness repair:** `85496e05cf8b59f4f1319d5a4ec165a8c238d2cc`  
**D17/D17B verifier workflow:** `35246313461`  
**Complete verifier archive workflow:** `35248055284`  
**Complete verifier archive commit:** `e8c206b4f1219ee9aed4ed46adc97df2a9399f79`

## Historical evidence integration

The earlier Claude/manual cold and scoring records are preserved directly under `experiments/004/cold-results/claude/`. They were recovered from the historical `experiment/004-gemini-cold-bulk` lineage without altering any frozen report or final disposition.

The branch's artifact-retaining Gemini execution workflows were not integrated because they conflict with the current Actions storage policy and belong to a completed Draft 0.15 campaign. See `research/SURVIVING_BRANCH_RECONCILIATION_REVIEW.md`.

## Qualification checkpoint

Experiment 004 reaches its **first current-authority Draft 0.15 qualification checkpoint** for the frozen corpus, with explicit partials. The checkpoint claim is limited to the exercised representation semantics and discovery/comparison controls in this corpus. It is not a claim of general correctness outside the frozen targets.

Final audited cold-report dispositions:

```text
PASS:     15
PARTIAL:   6
FAIL:      0
UNKNOWN:   0
```

No surviving discrepancy demonstrates a Draft 0.15 representation-expressiveness failure. No Core Specification mutation is warranted from Experiment 004 evidence at this checkpoint.

## Run-by-run final disposition

| Run | Final | Blind verifier self-disposition | Final review |
|---|---|---|---|
| RUN-A | PASS | VERIFIED | Accepted abbreviated manual output; verifier checked only frozen claims. |
| RUN-S01 | PASS | VERIFIED | Reference/binding placement and occurrence semantics verified. |
| RUN-S02 | PASS | VERIFIED | Rule-side splice/literal nested-scope behavior verified. |
| RUN-S03 | PASS | VERIFIED_WITH_NON_MATERIAL_ISSUES | All ownership outcomes correct; commentary understated that same-namespace bare integer identity is a native linkage mechanism. |
| RUN-S04 | PASS | VERIFIED | D-local versus pairwise residual/reconstruction accounting verified. |
| RUN-S05 | PASS | VERIFIED | Stage-qualified fingerprint/index behavior verified. |
| RUN-S06 | PASS | VERIFIED | Infix parsing/rejection controls verified. |
| RUN-S07 | PASS | VERIFIED | First-class NAC versus matcher/profile evaluation verified. |
| RUN-S08 | PASS | VERIFIED | Serializer/index scoping and multiple-witness preservation verified. |
| RUN-B | PASS | VERIFIED | Rewrite multiplicity and distinct application-event semantics verified. |
| RUN-C1 | PARTIAL | VERIFIED | Intended results are present. Historical scorer objection to the larger node-only core is not cleanly compelled by the frozen protocol because COMMON_CORE may be weak, but the report failed to state relation strength/optimality basis; retain PARTIAL as report/protocol ambiguity, not core failure. |
| RUN-C2 | PARTIAL | VERIFIED | All intended targets recovered, but frozen cold report also asserted a reversed VS node map that violates ordered incidence. Blind verifier missed this extra false mapping. |
| RUN-D09 | PASS | VERIFIED | Semantic decomposition distinguished from archival recoverability. |
| RUN-D10 | PASS | VERIFIED | Independent extraction freeze versus pair-conditioned exploration verified. |
| RUN-D16 | PASS | VERIFIED | Non-vacuous schema positive/near-miss negative verified. |
| RUN-D17 | PASS | VERIFIED | Native self-description base topology verified. |
| RUN-D17B | PARTIAL | VERIFIED | Required native topology recovered; cold report added unsupported English role gloss and final terminal diagram omitted two body links it had identified elsewhere. |
| RUN-D18 | PASS | VERIFIED | Source ambiguity preserved; conclusion correctly conditional. |
| RUN-D19 | PARTIAL | VERIFIED | Core schema/positive maps/negative convergence certificate recovered, but report violated no-familiar-name instruction, used syntactically invalid symbolic caret labels for a claimed native schema, and called a 4-node/3-edge mapping an induced common core even though the source has an additional included edge among mapped nodes. |
| RUN-D20S | PARTIAL | VERIFIED | Requested structural-only retrieval and separating invariant are correct. Report additionally claimed E1NR/native witness and negative-certificate records using illegal symbolic caret labels; blind verifier missed this serialization defect. |
| RUN-D20L | PARTIAL | PARTIAL | Requested label-assisted analysis is correct. Verifier correctly found all added native policy/witness/certificate records syntactically invalid because Draft 0.15 requires `label := ^integer`. |

## Independent verifier stage

All 21 frozen cold reports received a successful scorer-blind verifier execution. The verifier packets contained only the original permitted cold inputs plus the frozen cold report; they excluded hidden assertions, scoring reports, qualification ledgers, expected answers, prior verifier outputs, and external reviews.

Blind-verifier self-dispositions were 19 `VERIFIED`, 1 `VERIFIED_WITH_NON_MATERIAL_ISSUES` (RUN-S03), and 1 `PARTIAL` (RUN-D20L). Final review does not silently promote verifier self-disposition to authority: RUN-C2, RUN-D17B, RUN-D19, and RUN-D20S contain report defects the blind verifier did not fully flag, so their final run dispositions remain/are PARTIAL.

Claimed negatives were accepted only where the frozen evidence supplies an actual separating invariant/certificate or a complete structural contradiction. Examples include Q004-11 occurrence-count/non-reflection invariants, Q004-14 direct occurrence-count separation and explicit incomplete-search non-certificate, Q004-19 sink-reconvergence contradiction, and Q004-20 degree-profile separation.

## Final discrepancy review

- **RUN-C1 — PARTIAL, protocol/report ambiguity.** The scorer-intended residual-node accounting is present. The additional mapping `32 -> 42` can be interpreted as a weak node-extended common core because the frozen protocol allows a COMMON_CORE result to be weak, but the report did not freeze a relation-strength/optimality basis for calling both alternatives “strongest.” This is not evidence of substrate insufficiency.
- **RUN-C2 — PARTIAL, decoder/search implementation error.** The correct VS mapping is present, but an extra reversed endpoint mapping violates ordered-incidence positions.
- **RUN-D17B — PARTIAL, label-semantic leakage + report completeness.** Native topology targets are recovered; unsupported English role gloss leaks semantics and the final terminal diagram omits two body links identified elsewhere in the same report.
- **RUN-D19 — PARTIAL, instruction leakage + serialization + accounting.** The reusable topology and negative convergence certificate are recovered. The report nevertheless names the familiar shape, emits a claimed native schema with invalid symbolic caret labels, and mislabels a weak 4-node/3-edge core as induced while omitting a source edge among mapped nodes.
- **RUN-D20S — PARTIAL, parser/serialization defect in unsolicited native records.** The requested structural-only retrieval result is correct. Added E1NR-style witness/certificate records use symbolic caret labels and are not legal Draft 0.15 terms.
- **RUN-D20L — PARTIAL, parser/serialization defect in unsolicited native records.** The requested assisted-channel analysis is correct. The blind verifier independently caught the same `label := ^integer` violation in the added policy/witness/certificate records.
- **RUN-S03 — PASS with non-material verifier note.** Ownership and validity outcomes are correct; only the prose description of same-namespace bare-ID linkage was conceptually imprecise.

## What the checkpoint qualifies

The frozen corpus exercised occurrence-preserving scope/rewrite semantics, nested boundaries, identity/namespace discipline, variable ownership, reference hygiene, D-local versus pairwise residual separation, independent extraction freeze, embedding strength, complete accounting, mapping multiplicity, certified-negative discipline, stage-specific index invariance, class non-vacuity, native self-description, source ambiguity, novel-class induction, structural-only retrieval, parser controls, NAC context, and serializer/index scoping.

Q004-17/Q004-17B directly demonstrate that the required policy/witness/result structures are representable natively with numeric stable labels and reconstructable topology. The invalid symbolic records in D19/D20S/D20L therefore show decoder serialization non-conformance, not inability of Draft 0.15 to represent those records.

## Surviving limitations

- The checkpoint is corpus-bounded; it does not establish correctness for untested structures, larger search spaces, or arbitrary external domains.
- Six frozen cold reports remain PARTIAL and are preserved verbatim; none is repaired here.
- Native-record emission discipline is not fully qualified as an agent behavior because D19/D20S/D20L fabricated non-grammar symbolic labels despite the specification already forbidding them.
- The C1 “strongest common core” wording lacks a fully frozen ordering/relation-strength criterion for node-only enlargement, so its scorer expectation should not be used as evidence for a Core Specification change.
- Some blind verifier reports missed known extra-output defects; verifier output itself remains evidence rather than authority.

## Specification mutation decision

**No Draft 0.15 mutation is warranted from Experiment 004.** The observed defects are decoder/report serialization, ordered-incidence mapping, semantic-label leakage, accounting/report completeness, and one protocol/scorer ambiguity. Existing Draft 0.15 rules already state the relevant semantics, including numeric stable-label grammar, ordered incidence, native-record authority, residual accounting, negative-certificate discipline, and the requirement for an explicit measure/partial order before maximum/optimal claims.

## Verifier artifact provenance

| Run | Workflow | Artifact | Artifact ZIP digest | Verifier report SHA-256 |
|---|---:|---:|---|---|
| RUN-A | `35234338405` | `10503380370` | `sha256:456b6a41073950f1aaa1068643799f7067de6aff78dab0cbc40e9182bc296f7b` | `26a0984fa6eace3d89970ae3344bc949b7452166cfe67ea8466d3d6e37cd541c` |
| RUN-S01 | `35234338405` | `10503050766` | `sha256:0bced9f0f25d4beeffda459fd5f120551d4d3d2fc546b74b546a5a38bd110d5d` | `015000ba120851c894bbe6928236a847ff0fdd493b1d753d255e8c67a27fbab4` |
| RUN-S02 | `35234338405` | `10502786169` | `sha256:6041bfda0c8d872425d51aa187855e2033569c783a0f88be4a28673532337dcb` | `f9eeb297debb235da331fbadf9f3d2876da08255529c32435742a2683269b565` |
| RUN-S03 | `35234338405` | `10502661379` | `sha256:cbbe93c1b13619c1545b3fe6824efebab1cbe057e2773de7c6166bf2a1eac5cc` | `b01a443efc16ff2106d58187eff5726bed3ca1c67fe6b1d0c714da404ace6a3d` |
| RUN-S04 | `35234338405` | `10502661620` | `sha256:e6c7999491af0f419941392c7e7b987e456cc6db17553fb8d2955aa5895947d0` | `3350bd66eeee5787df79d49fa35a8b4899d94c215eb18f34e226012ce8543ce6` |
| RUN-S05 | `35237237782` | `10504105410` | `sha256:79c2d7d2f4574578462ad90e44695b9fdc8bb98d093782f98fdecb374a0690e0` | `83a0aad15f2791f4fab1161f9dec744a61090e344895e85e1ff3ba664c952b41` |
| RUN-S06 | `35234338405` | `10502976153` | `sha256:ca4da1623e8fac3953e282c2e36a5aa12557b9015037c1f29aba947b18d2c78c` | `e1ddbfc7b7b5bc67285b6012ed319a10f23e757605e64fd6c54c163b19df1769` |
| RUN-S07 | `35234338405` | `10502357674` | `sha256:94de606b9017148fa0c09b2879ab0aa2fd7a39329d0831b57a9e083a9f2d9c92` | `69ae5cce4494d9e659be75a6af44862eadd4dab4205ee6dc0f20318b3ad70526` |
| RUN-S08 | `35237237782` | `10504275460` | `sha256:dad1411768a642e8932230c173edf08ce17675d34dd5fa9fad8be1bc49fbfc3d` | `daee63853dce8ff1de1ac1d7876bdc305dca6c791ceda6309dc14ca125c38ecb` |
| RUN-B | `35237237782` | `10504675575` | `sha256:f8fd9d9c03d09803348404b676e52127ab39ee534491e9307706cc8499f7a965` | `01324e43891d24dbec550fa84bf738e29435f98b9370ab077b0197d30a1c3df2` |
| RUN-C1 | `35237237782` | `10503604321` | `sha256:2de02cfa190889225c4f9ca9527539714f5dcb09e50d9c2a896a341deb7f74d0` | `57c397179215ce57de6c16c10eb6e04b82945165e709a407bdbdbf8af1d081fa` |
| RUN-C2 | `35240263716` | `10505660176` | `sha256:060f68eff05fef639046a1d59d8bd4e4c3bc4f7da30b3ead13d858af3c47fdbe` | `cddc4abb95b40b234bc85c34c93e4065c3d72eb3e9e3371454d8346ba24cb90f` |
| RUN-D09 | `35239572341` | `10504373364` | `sha256:769442230c3012e72b930dff150cad733aac9b3e6393aaa0a207501e2f727970` | `b30501ffd109ff691a32ef3a26f79485c3e4453cca25f3adcbce4c30d9a8467b` |
| RUN-D10 | `35239572341` | `10504664215` | `sha256:8524279a6261d9b01bd37cf741044d41ed995d1bc82ae21acfc93c754350e7b3` | `1028cfe35cb07eeaacb4495a4c9e534afdc07f324feede6c7ed74f98063e66e2` |
| RUN-D16 | `35239572341` | `10504154651` | `sha256:988611cd07b809679c9f6a59ea8c5b6782da9f3ffa3f100965c7ca9633b9ed05` | `624cae763217e568882d87ea6d4916a1bbe0845feed582789ef5d9707943fb07` |
| RUN-D17 | `35246313461` | `10507074117` | `sha256:46adbd74ddcd0c0aa6cc1dd1930f34526187eac30ed207a61dc7d0c5b3ef8ce8` | `43778a537a4058d365decbb77565072da29abc3363aa16102a7cb201a66f9a6c` |
| RUN-D17B | `35246313461` | `10508025892` | `sha256:5222b3d587114df653bbdb2a67a757a419079f00a0b5c7b9d47154d1da4ac4ce` | `187355a5b439ef9dcb41e6b5bfb5b75dfa405761dd9997d27f68bc87f3c6abf0` |
| RUN-D18 | `35239572341` | `10504354588` | `sha256:d19e30b9cea4526b5dab798e9553cf58c79dc12857f69bf983058d8e4026310b` | `c30089e688cc37f5aa5535b10b81d2e3aa198d404932fe3ec0b3497b9cfb2744` |
| RUN-D19 | `35239572341` | `10504848229` | `sha256:94b5a0e05215eada8de165bf4c77190061c6e28f79ee9a644059a5f24933b097` | `ca1b825d27f9f92121edab712d27b1e62ae320f4c133f103ab75c8715b0b84e1` |
| RUN-D20S | `35239572341` | `10503939993` | `sha256:c4d6b827bb167b4dd562c0985a13d1efabe0a83f405b45bf06a2593a3bdadc4b` | `76833a48e1af2aa5ce0592999c53b86b3b0b3f95a2b15320f2c64d20d08aa8a4` |
| RUN-D20L | `35239572341` | `10504409769` | `sha256:49efc33840b042e12f9ddf70c38142d33d259e70c3675e3d75aa0d325a0aea6e` | `ef63bc18609f9f091b9974bde163403180f1935e48231b8195bf3a1278277931` |

The durable verifier archive preserves each selected verifier packet, raw API response, extracted report, and metadata without repair.
