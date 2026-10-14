# DNWF 0.1 Native Vocabulary

**Status:** unqualified normative vocabulary companion to `DNWF_0_1_CANDIDATE.md`  
**Native declaration:** `DNWF_VOCAB_0_1.isg`  
**Qualified dependency:** cumulative Core 0.17–0.21 only  
**Growth rule:** extension-owned semantic relation plus finite packet-metadata relations; no parser syntax and no second graph substrate

These stable labels are owned by the frozen DNWF 0.1 candidate revision. Numeric spelling has no meaning outside that revision.

| Stable label | Role |
| --- | --- |
| `^160100` | DNWF semantic relation `WF_TERM_ALGEBRA(Sigma, Mu)` |
| `^160110` | signature packet incidence: `SIGNATURE_HAS_CONSTRUCTOR` |
| `^160111` | signature packet incidence: `CONSTRUCTOR_HAS_FIELD` |
| `^160112` | signature packet incidence: `FIRST_FIELD` |
| `^160113` | signature packet incidence: `NEXT_FIELD` |
| `^160114` | signature packet incidence: `LAST_FIELD` |
| `^160115` | signature packet incidence: `FIELD_IS_RECURSIVE` |
| `^160116` | signature packet incidence: `FIELD_HAS_EXTERNAL_CARRIER` |

## Semantic boundary

Only `^160100` is proposed as new semantic extension authority.

The metadata relations `^160110`–`^160116` have **finite extensional packet-incidence semantics only**. They do not independently supply:

- list or numeric-index semantics;
- arity/cardinality;
- order arithmetic;
- constructor closure/coverage;
- well-foundedness;
- induction;
- recursion/fold;
- equality laws.

Those DNWF obligations are owned by the frozen semantics of `WF_TERM_ALGEBRA`.

In particular, `FIRST_FIELD/NEXT_FIELD/LAST_FIELD` identify the explicit field-correspondence chain present in one frozen packet. They are not a generic natural-number or list theory.

## Core reuse

DNWF adds no parser token. A material DNWF claim is represented through ordinary qualified Core logical structure, including ordinary `PREDICATE_APPLICATION`, with an explicitly represented signature packet and one `WF_TERM_ALGEBRA(Sigma,Mu)` occurrence.

The vocabulary does not make DNWF qualified. It becomes usable semantic authority only if the exact DNWF candidate revision passes its independent Q0–Q7 qualification campaign.
