# DTS 0.1 Native Vocabulary

**Status:** unqualified normative vocabulary companion to `DETAILED_TRANSITION_SYSTEM_0_1_CANDIDATE.md`  
**Native declaration:** `DTS_VOCAB_0_1.isg`  
**Namespace range:** `^96000`–`^96027`  
**Growth rule:** extension-owned semantic roles only; no Core parser syntax or second structural substrate

These labels are owned by the DTS 0.1 extension namespace/revision. Numeric spelling has no meaning outside that authority.

| Stable label | Role |
| --- | --- |
| `^96000` | DTS extension/profile authority record |
| `^96001` | transition `tau` |
| `^96002` | source state / `pi-(tau)` |
| `^96003` | target state / `pi+(tau)` |
| `^96004` | transition anatomy scope |
| `^96005` | preserved structure `K` |
| `^96006` | removed structure `Delta-` |
| `^96007` | introduced structure `Delta+` |
| `^96008` | changed incidence / rewiring `Delta~` |
| `^96009` | boundary/interface structure `B` |
| `^96010` | decomposition `D` |
| `^96011` | decomposition member / subtransition relation |
| `^96012` | ordering/dependency structure `O` |
| `^96013` | evidence/provenance reference `E` |
| `^96014` | closure/completeness authority |
| `^96015` | pinned QU dependency/reference |
| `^96016` | comparison/view authority `C` |
| `^96017` | load-bearing transition region declaration |
| `^96018` | projected/irrelevant region declaration with authority |
| `^96019` | Transition Isomorph (TI) claim |
| `^96020` | TI mapping/witness/certificate |
| `^96021` | TI residual structure |
| `^96022` | pinned decomposition/factorization authority |
| `^96023` | verification/qualification record |
| `^96024` | pinned dependency / immutable revision |
| `^96025` | source projection relation |
| `^96026` | target projection relation |
| `^96027` | mechanism/profile reference; carries no base mechanism semantics |

## Reuse rules

`^96009` does not define a new boundary object. It points to ordinary IsoGraph boundary/interface structure interpreted in the DTS transition role.

`^96015` does not define DTS-specific unknown semantics. It references qualified QU structure. Internal unresolved structure remains QU structure under the applicable QU authority.

`^96027` records a profile/mechanism dependency only. It does not make DPO, sequential execution, concurrency, cost, or any other mechanism part of DTS base semantics.

## Omission rule

A DTS artifact may use only roles required by its claim and profile, but omission never weakens the governing semantic obligation. In particular:

```text
missing ^96015
    != proof that no unresolved transition structure exists
```

A claim with no QU instance still requires sufficient `^96014` closure/completeness authority for every load-bearing transition region.

## TI representation

A material `^96019` TI record should recover, directly or through pinned dependencies:

```text
transition A
transition B
comparison/view authority
load-bearing regions
projected regions + projection authority
pinned decomposition/factorization where load-bearing
QU dependencies where applicable
mapping/witness
residual structure
verification record
immutable provenance/revision dependencies
```

The vocabulary introduces no dedicated syntax. These labels participate in ordinary IsoGraph scopes and incidences under DTS authority.
