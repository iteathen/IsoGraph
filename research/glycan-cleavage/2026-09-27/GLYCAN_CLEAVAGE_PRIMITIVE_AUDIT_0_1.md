# Glycan cleavage primitive rendering audit 0.1

**Status:** author/source-coverage audit; cold reconstruction pending  
**Date:** 2026-09-27  
**Source blob:** `7565778decc21d865f9fd81b10bd483a36e091e4`  
**Native blob:** `f5ef6f08df03c01cb03d8dea1f9da87cc2fa29c4`  
**Rendering contract:** Core 0.20 primitive-logic closure candidate (unqualified)

## 1. Scope actually rendered

The artifact renders the idealized finite optimization problem frozen in `GLYCAN_CLEAVAGE_SOURCE_FREEZE_0_1.md`.

It does not claim a complete biochemical model.

Static site susceptibility is supplied as exact closed-world instance data. Kinetics, incomplete digestion, concentration/time, simultaneous cocktails, state-dependent chemistry outside that input, endoglycosidase behavior, synthesis, and input uncertainty are outside this exact claim.

## 2. Source-to-native coverage

| Source obligation | Native support | Author disposition |
| --- | --- | --- |
| finite duplicate-free residue/enzyme/target carriers | `181001`, `181004` | PASS |
| distinguished root in residue and target lists | `181004` | PASS |
| root has no parent | `181004` | PASS |
| every nonroot has exactly one represented parent | `181004` | PASS |
| parent endpoints lie in represented residue carrier | `181004` | PASS |
| finite rooted acyclicity/orientation | existential rank relation inside `181004`, using primitive successor and `7013` | PASS |
| target subset and ancestor closure | `181004` | PASS |
| state identity ignores list order | `181002` + `181003` | PASS |
| terminal iff present and has no present child | `181005` | PASS |
| eligible iff terminal, not retained, and susceptibility tuple exists | `181006` | PASS |
| one microscopic cleavage removes exactly one eligible site | `181007` + `181008` | PASS |
| no other state membership changes | universal biconditional in `181007` | PASS |
| treatment uses one selected enzyme through all microsteps | threaded parameter in `181016` | PASS |
| treatment ends only when no matching eligible site remains | `181009` base condition in `181016` | PASS |
| zero-cleavage treatment allowed only when already saturated | empty-trace branch of `181016` | PASS |
| microtrace is finite | explicit finite trace constructors + `181015` natural length | PASS |
| treatment trajectory is a finite enzyme list | Primitive Data Constructors + `181017` | PASS |
| repeated enzyme identities are allowed | no duplicate-free constraint on trajectory list | PASS |
| initial state is full residue list | `181018` invokes `181017` from RL | PASS |
| successful final state equals target extensionally | `181018` invokes run with TG final state; base uses `181003` | PASS |
| cost is number of treatments | primitive-rendered `7431` LENGTH in `181019` | PASS |
| optimal means no solving trajectory has smaller length | universal solving competitor + `7013(n,m)` in `181019` | PASS |
| ties remain multiple valid optima | no uniqueness/canonical-order clause in `181019` | PASS |
| P/M are closed-world extensional inputs | raw relation-object incidence only; no rule behavior imported | PASS for frozen model |
| no biochemical name supplies semantics | domain labels absent from native payload | PASS |

## 3. Mechanical audit after syntax repair

The first parser pass found delimiter defects in the initially committed native text. That historical observation is preserved.

The minimum repair changed only block-tail closing parentheses.

After repair:

~~~text
top-level blocks:                  17
delimiter parse:                   PASS
free native variables:             0
undeclared local predicate IDs:    0
missing expected IFF definitions:  0
human/domain label hits:            0
semantic DERIVED_VIEW_OF use:       0
semantic QU_UNEXPANDED use:         0
~~~

The imported primitive-role vocabulary header contains the IDs for those roles once each; they are not used as semantic assertions in this rendering.

## 4. Primitive stopping-point audit

No local semantic operator is accepted merely by name.

The only bottom-level categories are:

- primitive logical composition/binding/application;
- raw carrier/value/tag/field identities;
- finite constructor structure;
- raw extensional relation incidence;
- primitive-rendered natural-number support.

`MEMBER`, `LENGTH`, and `LE` are traceable derived views, not authoritative leaves.

## 5. Important modeling boundary

The static susceptibility relation deliberately packages all version-0.1 site-specific chemistry into frozen extensional input tuples.

That is lawful only for this scoped optimization problem because the internal chemical reason why a tuple is present does not affect the logical trajectory once the tuple is supplied.

A later problem that asks IsoGraph to derive susceptibility from monosaccharide identity, linkage, anomericity, branching context, kinetics, or molecular environment must expand those facts instead of reusing `M` as an unexplained oracle.

## 6. Remaining verification gate

Author inspection cannot qualify exact source reconstruction.

Before this rendering is admitted for downstream discovery:

1. freeze the exact candidate and dependency blobs;
2. run an isolated reasoner on the native bundle **without the source freeze or this audit**;
3. freeze that reconstruction;
4. compare it against the frozen source with a separate verifier;
5. preserve every mismatch; do not repair toward the expected source answer without locating the defect owner.

## Current disposition

~~~text
author source coverage:        PASS
author primitive closure:      PASS
mechanical structure:          PASS
cold native reconstruction:    PENDING
source/reconstruction sameness:PENDING
downstream DP/NEI admission:   BLOCKED UNTIL VERIFICATION
~~~
