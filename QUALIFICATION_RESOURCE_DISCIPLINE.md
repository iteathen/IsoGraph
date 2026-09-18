# IsoGraph Qualification Resource Discipline

**Status:** project qualification guidance  
**Purpose:** preserve qualification accuracy and completeness while minimizing externally rate-limited agent and CI usage.

IsoGraph qualification uses external resources that are not free or unlimited. Gemini cold-decoder/verifier calls and GitHub Actions executions MUST therefore be treated as scarce qualification resources.

The optimization target is:

```text
minimize external model calls + GitHub executions + CI runtime
subject to:
    complete semantic coverage
    cold-test isolation
    reproducibility
    sufficient independent evidence
    accurate failure diagnosis
```

Cost reduction MUST NOT weaken the semantic claim being qualified. Instead, test design should increase the information gained per external execution.

## 1. Freeze before spending external resources

Before invoking Gemini or starting a qualification workflow:

- freeze the candidate semantic artifact/revision;
- freeze the qualification corpus and prompt;
- freeze hidden assertions/scoring material where used;
- run deterministic syntax, reference, hash, schema, and packet-integrity checks first;
- resolve obvious authoring defects before the external run.

Do not use Gemini or GitHub Actions as an iterative editor/linter when deterministic checks can find the same problem.

## 2. Batch semantic controls

Prefer one compact qualification packet containing multiple orthogonal, high-information controls over one external invocation per case.

A good control set should:

- cover every normative obligation needed for the qualification claim;
- include adversarial boundary cases and important negative controls;
- use paired/metamorphic cases where one small structural change should change the result;
- avoid redundant cases that exercise the same semantic distinction without adding coverage;
- remain diagnostically separable so one failure can still be localized.

Case count is not itself evidence quality. Optimize for obligation coverage per case and per model invocation.

## 3. Default Gemini budget

For a frozen qualification candidate, the default target is:

1. **one cold decoder invocation** covering the entire frozen corpus;
2. deterministic/post-freeze scoring of that frozen output without another model call where possible;
3. **at most one independent verifier invocation** when the qualification claim warrants independent agent evidence.

Additional Gemini calls require a recorded reason, such as:

- malformed or incomplete external output;
- provider/infrastructure failure;
- a materially changed frozen candidate/corpus;
- a specific unresolved semantic ambiguity that cannot be adjudicated deterministically;
- an independent verification obligation not discharged by the existing run.

Do not rerun simply to obtain a more favorable answer.

Where a second verifier is needed, give it the minimum evidence necessary for its independent task rather than replaying the entire research history.

## 4. Default GitHub Actions budget

Prefer one batched workflow run per frozen qualification phase.

Unless a qualification obligation requires physical isolation between jobs:

- use one job rather than a matrix of one job per case;
- execute deterministic preflight, packet assembly, one external decoder call, output freezing, and deterministic validation in one workflow when isolation can still be preserved;
- emit durable evidence to workflow logs and/or intentional repository history rather than retaining Actions artifacts;
- when an artifact is genuinely useful as same-run transport, treat it as transient owned state and delete all artifacts created by that workflow run in an `if: always()` cleanup step before termination;
- do not use GitHub Actions cache storage for qualification state;
- avoid push-triggered workflows during iterative authoring; prefer explicit/manual or tightly path-filtered qualification triggers;
- batch repository changes before triggering qualification;
- do not create a new workflow version merely to rerun the same semantic test.

Independent verification may be a second workflow/run if separation is load-bearing. It should consume a committed/frozen report or recorded hash rather than relying on retained Actions storage or repeating the first external call.

## 5. Preserve cold isolation without multiplying calls

Cold isolation is about information boundaries, not process count.

A single workflow may safely perform several phases if the cold agent receives only its authorized packet and cannot access hidden assertions, expected results, prior outputs, author audits, or scorer material before its response is frozen.

After freezing and hashing the cold output, deterministic scoring may use hidden assertions without requiring another decoder invocation.

A verifier should be blind to hidden material not required by its verification role.

## 6. Prefer deterministic evidence where equivalent

Use deterministic scripts/checks instead of an external agent for:

- hash/revision verification;
- exact file/packet membership;
- syntax/parsing invariants that have deterministic parsers;
- expected absence/presence of forbidden terms;
- structural equality of generated artifacts;
- score aggregation from already frozen semantic judgments;
- provenance/manifests;
- workflow/evidence integrity.

Use an external agent for the parts that actually require fresh semantic reconstruction, interpretation, or adversarial reasoning.

## 7. Do not trade completeness for cost

A resource budget is subordinate to qualification correctness.

If complete qualification genuinely requires another independent semantic observation, perform it and record why. The discipline is to eliminate redundant external work, not necessary evidence.

If rate limits prevent the required evidence, leave the candidate unqualified rather than silently reducing the proof burden.

## 8. Record resource provenance

Each final qualification review SHOULD record, where available:

```text
frozen candidate revision/blob
frozen corpus revision/hash
number of Gemini semantic invocations
number of independent verifier invocations
number of GitHub Actions qualification runs
workflow/run identifiers
external-call failures/retries and reasons
whether deterministic checks were run before external calls
```

This makes qualification cost auditable and helps later experiments improve information gained per invocation.

## 9. QU/NEI qualification default

For the QU 0.1 / NEI 0.1 candidates, design the future qualification corpus jointly where doing so does not contaminate claim boundaries.

Prefer a small set of cases that simultaneously exercise:

- relational unknown structure versus opaque UNKNOWN;
- admissible realization closure and exclusion;
- OPEN / DETERMINATE / INCONSISTENT / INCOMPLETE_SCOPE distinctions;
- QU refinement versus revision;
- QUI discovery under alpha-renaming/domain-independent structure;
- QUI not implying equal actual resolution or NEI SAME;
- determinate NEI SAME/DISTINCT without artificial QU materialization;
- QU-mediated NEI SAME/DISTINCT/UNKNOWN;
- absence of distinction not implying SAME;
- incomplete computation not implying semantic UNKNOWN;
- circular QU restriction not qualifying a downstream identity/isomorphism claim.

The target should be one frozen high-information corpus, not separate external runs for each bullet.

## 10. Governing principle

```text
Spend external resources on independent semantic information,
not on mechanical work or repeated confirmation.
```

A qualification design is better when it preserves the same or stronger evidentiary coverage with fewer externally rate-limited executions.