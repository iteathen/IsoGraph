# Core 0.21 Qualification Plan — Rendering Conservation, Schema Closure, and Closure Invalidation

**Status:** candidate qualification plan  
**Candidate:** CORE_SPEC_DRAFT_0_21_RENDERING_CONSERVATION_SCHEMA_CLOSURE_CANDIDATE.md  
**Base qualified Core:** cumulative Core through 0.20  
**Optional semantic dependency:** qualified QU 0.1 when a case contains structured unresolved possibility  
**Qualification infrastructure:** CORE_0_21_LEDGER_CONTRACT.md plus deterministic ledger checker; these are not Core semantic authority

## Objective

Qualify whether Core 0.21 prevents primitive-closure evasion while permitting finite exact representation of generative/recursive semantics without exhaustive materialization.

The campaign must establish both positive capability and negative restraint.

## Freeze

Before the cold semantic run freeze:

- exact Core 0.21 bytes;
- exact predecessor/dependency hashes;
- public cases;
- public output schema;
- hidden expected values;
- case order;
- deterministic ledger contract and checker revision;
- provider/model policy.

Issue #62, prior review prose, hidden scorer values, motivating application results, repository status summaries, and prior model outputs must be absent from the cold packet.

## Deterministic preflight

Before any semantic call:

1. syntax-check the runner and scorer;
2. run the Core 0.21 ledger checker self-tests;
3. generate a dry packet;
4. verify exact case count/order;
5. verify candidate SHA-256;
6. verify no hidden answer file appears in the public packet.

## Fresh semantic targets

Use at least 26 fresh cases covering the candidate Section 19 targets.

Required families:

1. no-evasion / hard-to-reduce source obligation;
2. one-to-many source-to-primitive expansion;
3. shared primitive support;
4. non-assertional census coverage;
5. forbidden silent scope shrink;
6. lawful scope revision;
7. rejected representation does not discharge source census;
8. primitive premises with opaque body;
9. reducible named operator;
10. missing lower meaning;
11. qualified QU-bounded unknown;
12. opaque QU escape attempt;
13. finite loop schema;
14. unresolved termination separate from step semantics;
15. recursive schema without unrolling;
16. exact all-and-only schema coverage;
17. schema closure versus downstream theorem;
18. forbidden loop/recursion label leaf;
19. primitive negative witness;
20. IA fixed-point invalidation after deeper reduction;
21. reopened IA discovers new assertion;
22. sound-but-incomplete coverage failure;
23. complete-but-unsound soundness failure;
24. silent scope drift;
25. derived-view deletion / reconstruction;
26. authority routing and full-stack boundary.

## Independent gates

Score separately:

~~~text
SOUNDNESS
COVERAGE
RECONSTRUCTION
SCOPE_INTEGRITY
AUTHORITY_ROUTING
IA_INVALIDATION
SCHEMA_DISCIPLINE
QU_DISCIPLINE
NO_EVASION
~~~

All must pass.

## Promotion burden

Core 0.21 may be promoted only if:

- all fresh semantic cases pass;
- all deterministic structural controls pass;
- no scorer/output-contract ambiguity affects the result;
- the exact candidate hash is frozen in the final review;
- a fresh integration qualification passes against the then-current family.

Historical Core 0.20 evidence remains immutable.
