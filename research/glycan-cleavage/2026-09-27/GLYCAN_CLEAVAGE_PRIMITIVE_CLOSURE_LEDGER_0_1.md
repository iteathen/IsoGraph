# Glycan cleavage primitive closure ledger 0.1

**Status:** author-side closure ledger; not independent qualification  
**Date:** 2026-09-27  
**Branch:** `research/glycan-cleavage-primitive-20260927`  
**Source:** `GLYCAN_CLEAVAGE_SOURCE_FREEZE_0_1.md`  
**Native:** `GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg`  
**Research rendering contract:** `CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md` (unqualified successor candidate)

This ledger classifies every local semantic symbol in the native rendering. It does not promote Core 0.20 and does not replace cold reconstruction.

## Pinned primitive support

| Artifact | Git blob |
| --- | --- |
| Core 0.20 primitive-logic closure candidate | `ef9ea2584ec24f87c956d486040d3cbbd7d49f79` |
| Primitive Logic Kernel 0.1 | `2630336da5c4117a15a43c1dc0847536b33ed083` |
| Primitive Logic Kernel 0.1 role map | `49dd4c746cbdd3df1bb2075aacc679cbce534384` |
| Primitive Data Constructors 0.5 | `c0479ac1de1a1c8ff5737221133601618b1a56cf` |
| Primitive Natural Arithmetic 0.5 | `fde4915b3a056430e0cb7a3a327e26abc1c7b09b` |

The glycan rendering uses no transition-computation package. Treatment execution is expanded locally.

## Local closure ledger

| ID | Author gloss only | Closure status | Primitive expansion / reason |
| --- | --- | --- | --- |
| `181000` | relation-object carrier | RAW_DATA_ATOM | Opaque carrier identity only. All behavior occurs through ordered primitive predicate incidence and explicit constraints. |
| `181001` | duplicate-free list | DERIVED_VIEW | IFF recursion over empty/cons, membership, NOT, AND, EXISTS. |
| `181002` | membership subset | DERIVED_VIEW | IFF universal implication over primitive-rendered MEMBER. |
| `181003` | extensional state equality | DERIVED_VIEW | IFF mutual `181002`; no list-order semantics imported. |
| `181004` | instance well-formedness | DERIVED_VIEW | IFF conjunction of list closure, root/parent constraints, target closure, relation endpoint closure, and existential rank witness. |
| `181005` | exposed/terminal predicate | DERIVED_VIEW | IFF state membership AND NOT EXISTS retained child under raw parent incidence. |
| `181006` | site eligible for selected operator | DERIVED_VIEW | IFF `181005` AND not-target-membership AND raw susceptibility incidence. |
| `181007` | delete-one result | DERIVED_VIEW | IFF duplicate-free output AND universal extensional membership equation. |
| `181008` | one microscopic step | DERIVED_VIEW | IFF EXISTS site satisfying `181006` and `181007`. |
| `181009` | saturated/no eligible site | DERIVED_VIEW | IFF NOT EXISTS `181006`. |
| `181010` | finite same-operator microtrace carrier | CLOSED_PRIMITIVE | Local finite constructor carrier; constructor/case structure is explicit. |
| `181011` | empty microtrace | RAW_DATA_ATOM | Exact raw constructor value. |
| `181012` | nonempty microtrace tag | RAW_DATA_ATOM | Constructor tag only; carries no behavior. |
| `181013` | next-state field | RAW_DATA_ATOM | Ordered constructor field role only. |
| `181014` | tail-trace field | RAW_DATA_ATOM | Ordered constructor field role only. |
| `181015` | microtrace length | DERIVED_VIEW | IFF primitive natural zero/successor recursion. |
| `181016` | exhaustive one-operator treatment | DERIVED_VIEW | IFF empty saturated case OR one microstep plus recursive finite tail. Same selected operator is threaded through every recursive step. |
| `181017` | finite treatment-list execution | DERIVED_VIEW | IFF empty trajectory extensional identity OR list-head treatment plus recursive tail. |
| `181018` | reaches retained target | DERIVED_VIEW | IFF instance well-formedness AND trajectory execution from initial list to target list. |
| `181019` | minimum-treatment solution | DERIVED_VIEW | IFF solves AND natural length n AND every solving trajectory length m satisfies n <= m. |

## Referenced support views

The following IDs are not accepted as primitive leaves:

- `7430` MEMBER — exact derived view into Primitive Data Constructors 0.5;
- `7431` LENGTH — exact derived view into Primitive Data Constructors 0.5;
- `7013` LE — exact derived view into Primitive Natural Arithmetic 0.5.

Their pinned support continues to primitive logic and raw data.

## Raw extensional inputs

The two instance relation objects corresponding to parent incidence and site susceptibility have no hidden rule semantics in the native kernel.

They are supplied extensionally for each frozen instance. Primitive application expresses only ordered tuple incidence.

The existential rank relation used to witness acyclicity is likewise not a named arithmetic function with hidden behavior. Its relevant behavior is constrained entirely by the represented root/rank/uniqueness/order formula.

## QU state

`QU_UNEXPANDED`: **none in the 0.1 problem scope**.

This is not a claim that real enzymology contains no uncertainty. Version 0.1 intentionally freezes a deterministic closed-world susceptibility relation and excludes kinetics, incomplete digestion, and state-dependent specificity not already supplied by the instance.

## Derived-label deletion firewall

The native file contains the Core-0.20 role vocabulary header, so IDs such as `^150020` and `^150021` appear once as imported role names.

There is no semantic use of `DERIVED_VIEW_OF` or `QU_UNEXPANDED` inside the rendered support.

The local IDs `181001`–`181019` are abbreviations with explicit IFF/construction support. Their human glosses are not present in the native file and are not required to traverse the primitive support.

## Current closure disposition

~~~text
author primitive-closure audit:
    PASS

mechanical syntax / lexical binding:
    PASS after preserved delimiter repair

cold native-only reconstruction:
    PENDING

source-vs-cold reconstruction comparison:
    PENDING

Core 0.20 qualification:
    NOT CLAIMED
~~~
