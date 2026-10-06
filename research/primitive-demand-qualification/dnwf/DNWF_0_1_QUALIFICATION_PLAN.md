# DNWF 0.1 Qualification Plan

**Status:** frozen qualification plan  
**Candidate:** `DNWF_0_1_CANDIDATE.md` / `DNWF_0_1_CANDIDATE.json`  
**Frozen source census:** `DNWF_SOURCE_SEMANTIC_CENSUS_0_2.json`  
**Dependency:** qualified cumulative Core 0.17–0.21 only

DNWF is a semantic-extension candidate. It proposes one new qualified relation:

```text
WF_TERM_ALGEBRA(Sigma, Mu)
```

No Woit/Lisi source object, arithmetic object, or domain-specific mathematical construction is part of the candidate.

## Q0 — freeze and interpretation closure

Freeze:

- DNWF SSC 0.2;
- candidate prose + machine-readable surface;
- candidate relation ID `160100`;
- raw finite signature-metadata relation IDs `160110`–`160116`;
- Core dependency revision;
- qualification prompt/schema;
- positive/negative/mutation fixtures;
- scorer.

Pass requires zero ambiguity about:

- signature packet semantics;
- recursive versus external field roles;
- constructor coverage/separation;
- well-foundedness;
- least generated carrier;
- fold existence/uniqueness;
- derived induction burden;
- explicit non-claims.

## Q1 — exact semantic coverage

Every SSC item must map to candidate sections:

- DNWF-SSC-001 -> §2;
- DNWF-SSC-002 -> §3.1–§3.5;
- DNWF-SSC-003 -> §3.2–§3.3;
- DNWF-SSC-004 -> §4 structural induction;
- DNWF-SSC-005 -> §3.6 / §4 structural recursion;
- DNWF-SSC-006 -> §3.4 / §4 finite-tree exclusion;
- DNWF-SSC-007 -> §6 explicit non-claims.

Pass requires no candidate semantic clause unsupported by the SSC.

## Q2 — candidate/interface integrity

Deterministic pass requires:

- exactly one new semantic relation;
- raw metadata relations remain finite extensional packet data only;
- no arithmetic/index/cardinality semantics in the candidate;
- no source-domain names in the semantic relation or normative clauses;
- no parser/Core syntax change;
- a candidate occurrence can be carried through ordinary Core `PREDICATE_APPLICATION`;
- all explicit non-claims remain present.

Q2 does **not** qualify the semantics.

## Q3 — two independent fresh cold reconstructions

Two isolated decoders receive only:

1. qualified Core authority required for syntax/logic;
2. frozen DNWF candidate;
3. a frozen signature/claim packet;
4. reconstruction output schema.

They do not receive the expected semantic classification or scorer assertions.

Each must reconstruct the intended DNWF obligations and distinguish valid from invalid controls.

## Q4 — canonical semantic sameness

For each decoder, compare reconstruction with the hidden semantic oracle.

Required exact distinctions include:

- recursive vs external fields;
- tag disjointness;
- fieldwise constructor injectivity;
- coverage/no-junk;
- finite well-foundedness;
- least-carrier semantics;
- fold existence and uniqueness;
- structural induction consequence.

## Q5 — adversarial mutation controls

At minimum freeze fresh controls for:

1. recursive field changed to external;
2. external field changed to recursive;
3. constructor tag overlap introduced;
4. one constructor case omitted;
5. field order swapped;
6. constructor injectivity removed;
7. junk member admitted;
8. cyclic recursive member admitted;
9. fold existence retained but uniqueness removed;
10. fold allowed to recurse through an external field;
11. induction restricted to a strict subset;
12. arithmetic/cardinality semantics spuriously added.

Every mutation must remain distinguishable.

## Q6 — scorer-blind independent verification

An independent verifier inspects frozen packet identity, Q0–Q5 evidence, isolation, scorer behavior, and overclaim discipline.

## Q7 — promotion

Allowed dispositions:

- QUALIFIED
- QUALIFIED_WITH_EXPLICIT_SCOPE
- DOES_NOT_QUALIFY
- INCOMPLETE_EVIDENCE
- INFRASTRUCTURE_FAILURE

Only a qualified disposition may make `WF_TERM_ALGEBRA` semantic authority.

## Current campaign rule

Until Q7:

```text
DNWF candidate != authority
DNIA remains blocked on DNWF
W remains blocked at its primitive-domain boundary
L remains independent
DP/IA/NEI/DTS state for W/L is unchanged
```
