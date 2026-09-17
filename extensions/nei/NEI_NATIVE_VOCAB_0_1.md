# NEI 0.1 Native Vocabulary

**Status:** normative vocabulary companion to `NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md`  
**Native declaration:** `NEI_VOCAB_0_1.isg`

These stable labels are owned by the NEI 0.1 extension namespace/revision. Numeric spelling has no meaning outside that namespace/revision.

| Stable label | Role |
| --- | --- |
| `^94000` | NEI extension/profile authority record |
| `^94001` | NEI claim/result record |
| `^94002` | NEI carrier/domain |
| `^94003` | fixed evidence revision/state `E` |
| `^94004` | QU authority/revision reference when QU is required |
| `^94005` | pinned QU state `Q` when QU is required |
| `^94006` | QU admissible-realization family `R(Q)` reference |
| `^94007` | queried subject A |
| `^94008` | queried subject B |
| `^94009` | cross-realization query-anchor/correspondence authority for QU-mediated claims |
| `^94010` | identity-preserving law |
| `^94011` | identity-separating law |
| `^94012` | natural disequality/distinctness constraint |
| `^94013` | admissible NEI model for a QU-mediated claim |
| `^94014` | natural-identity equivalence relation within one admissible model |
| `^94015` | admissible model-family membership |
| `^94016` | qualified QU-mediated NEI model family `M(P,Q,E)` |
| `^94017` | semantic result `SAME` |
| `^94018` | semantic result `DISTINCT` |
| `^94019` | semantic result `UNKNOWN` |
| `^94020` | status `NO_ADMISSIBLE_MODEL` |
| `^94021` | no-model reason: inconsistent/empty QU realization family |
| `^94022` | no-model reason: undefined/unqualified query anchor |
| `^94023` | no-model reason: unsatisfied/inconsistent identity-profile law set |
| `^94024` | provenance/evidence reference |
| `^94025` | verification/qualification record |
| `^94026` | resource/completeness status |
| `^94027` | verified refinement/nesting relation between identity profiles/results |
| `^94028` | temporal manifestation / temporal identity input role |
| `^94029` | joint-realizability / equivalence-model consistency witness |
| `^94030` | optional qualified information-measure reference inherited from/associated with QU |
| `^94031` | QUI / structural-unknown correspondence evidence reference |
| `^94032` | pinned dependency/revision relation |
| `^94033` | coverage/universality certificate for a QU-mediated claim over `M(P,Q,E)` |

The vocabulary intentionally does not reproduce QU's native representation of unresolved structure. Where unresolved identity-relevant structure matters, NEI references the pinned QU authority/state and adds identity-specific roles only.

A determinate `SAME` or `DISTINCT` claim need not populate QU-specific roles merely to encode zero uncertainty. It must instead carry direct qualified evidence/profile authority sufficient to settle the identity claim without unresolved identity-relevant alternatives affecting it.

Semantic `UNKNOWN` is QU-mediated and therefore requires the applicable QU roles and model-family evidence.

The vocabulary introduces no parser tokens. These labels participate in ordinary IsoGraph incidence/scopes under the extension authority.

A concrete NEI claim must carry enough structure to recover the fields required by Section 20 of the NEI 0.1 candidate. The table does not make a governing field optional merely because it has a compact native role.
