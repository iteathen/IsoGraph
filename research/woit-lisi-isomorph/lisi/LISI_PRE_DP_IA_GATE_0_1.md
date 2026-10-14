# Lisi Pre-DP Implicit-Assertion Gate 0.1

**Status:** MANDATORY PRE-DP GATE — NOT YET SATISFIED  
**Track:** L only  
**Date:** 2026-10-04  
**IA profile:** `IMPLICIT_ASSERTION_PROFILE_0_1.md`

## Governing authority

This gate is required by the current IsoGraph stack and campaign contract:

- `CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md`
- `CORE_SPEC_DRAFT_0_21_RENDERING_CONSERVATION_SCHEMA_CLOSURE_CANDIDATE.md`
- `../FULL_ISOGRAPH_TREATMENT_CONTRACT_0_1.md`

Core 0.19 permits recursive IA expansion:

~~~text
A0 = source-supported assertions
A1 = A0 + newly admitted implicit assertions
A2 = A1 + newly admitted implicit assertions
...
~~~

A newly validated IA may be used as a premise in a later IA pass.

Core 0.21 then requires the operational fixed point to be tied to the frozen input tuple and invalidates it if any load-bearing input changes.

## Required fixed-point tuple

A current IA fixed point must pin at least:

~~~text
primitive kernel
Source Semantic Census
semantic scope
QU state
governing authority
selected IA inference/search profile
~~~

The current L frozen SSC is:

~~~text
SOURCE_SEMANTIC_CENSUS_0_1.json
~~~

The current L IA profile is:

~~~text
IMPLICIT_ASSERTION_PROFILE_0_1.md
~~~

The primitive kernel is **not yet closed**, so a current IA fixed point cannot yet be claimed.

## Exact pre-DP sequence

Track L MUST execute:

~~~text
1. authoritative native compilation
2. primitive/schema closure
3. mechanically derived Core-0.21 closure ledger
4. verify source coverage / reconstruction / scope / authority routing

5. run source-local IA pass
6. validate every new IA support lineage
7. primitive-close each IA body, support, and transitive load-bearing dependency
8. add validated IAs to the premise set
9. rerun IA search
10. repeat 5–9 until a no-change pass
11. record the current IA fixed-point identity for the pinned tuple

12. run applicable NEI
13. run DTS
14. only then run Discovery Protocol
~~~

## Invalidation rule

The IA fixed point MUST reopen if any of these change:

- primitive expansion/kernel;
- SSC;
- semantic scope;
- QU state;
- governing authority;
- IA search/inference profile.

An earlier fixed point remains historical evidence only.

## Anti-bias / firewall rule

Until Track L seals:

- IA search is Lisi-source-local;
- no Woit semantics may enter IA premises;
- the L05 Woit citation remains opaque;
- no bridge/unification hypothesis may be used as an IA premise;
- DP leads are not implicit assertions.

## Current disposition

~~~text
native routing compilation:
    PRESENT

primitive/schema closure:
    INCOMPLETE

current IA fixed point:
    NOT YET LEGAL TO CLAIM

NEI:
    BLOCKED BY PRECEDING GATES

DTS:
    BLOCKED FOR FINAL PASS

DP:
    BLOCKED
~~~

This gate must be satisfied before any Track-L DP pass.
