# IsoGraph Discovery Protocols — 0.4 Candidate

**Status:** unqualified normative correction candidate  
**Short name:** DP 0.4  
**Base dependencies:** DP 0.1, DP 0.2, and DP 0.3  
**Identity dependency:** NEI 0.1 + NEI 0.2 only when a conclusion actually relies on natural identity/distinctness  
**Evidence motivating this revision:** `experiments/006/EXPERIMENT_006_RUN_Q006_R3_REVIEW.md`  
**Growth rule:** adds no core relation, identity primitive, domain ontology, mandatory solver, or exhaustive-search obligation

DP 0.4 is a narrow correction to the remaining failure exposed by RUN-Q006-R3.

R3 correctly stopped treating representational difference as qualified NEI `DISTINCT`, but then relabeled the same unsupported distinction as a generic `STRUCTURAL_BREAKER`. R3 also discovered an obstruction-role correspondence inside the mandatory cross-residual pass and then failed to feed that discovery back into the main candidate state.

DP 0.4 therefore adds two rules only:

1. **a structural breaker must be a concrete failed load-bearing obligation, not merely a description of different machinery;**
2. **a correspondence discovered by a mandatory residual pass re-enters ordinary candidate expansion and may not be ignored when deciding whether that same residual is terminal.**

All earlier DP rules remain in force except where this document strengthens them.

---

# 0. Structural breaker means failed obligation

`STRUCTURAL_BREAKER` is discovery bookkeeping for a demonstrated incompatibility under the active comparison/view authority.

A valid structural breaker identifies:

```text
obligation being compared
left-side evidence
right-side evidence
specific failure
active comparison/view authority under which the failure matters
```

Typical obligation kinds include:

```text
RELATION_PRESERVATION
RELATION_REFLECTION
CONSTRAINT_COMPATIBILITY
DEPENDENCY_DIRECTION
ARITY_OR_MULTIPLICITY
CARDINALITY
BOUNDARY_OR_INTERFACE
CLOSURE
RECONSTRUCTION
OTHER_EXPLICIT_LOAD_BEARING_OBLIGATION
```

This list is descriptive rather than exhaustive. An application may supply another genuine load-bearing obligation.

The important condition is that a breaker state **what fails**, rather than merely state that two mechanisms look different.

---

# 1. Non-breakers

The following facts, by themselves, are not structural breakers:

```text
different mathematical formalism
different proof technique
discrete versus continuous realization
local versus global construction
symbolic versus operational implementation
different carrier type
different algorithm name
different intermediate-object vocabulary
different factorization depth
one atomic theorem call versus one decomposed subgraph
```

Any of these may participate in a real breaker if the active comparison/application authority makes a concrete consequence load-bearing.

For example:

```text
discrete vs continuous
    -> not itself a breaker
```

but:

```text
left requires exact preservation of a relation
right necessarily reverses that relation
    -> concrete relation-preservation breaker
```

Likewise, if an application explicitly declares an implementation or carrier choice rigid for the comparison, use `RIGID_AUTHORITY` with that authority rather than inventing a generic structural impossibility.

---

# 2. Anti-relabeling rule

A discovery agent must not evade an unresolved identity/representation question by changing labels:

```text
unsupported NATURAL_IDENTITY separator
    -> rename as STRUCTURAL_BREAKER
    -> stop
```

is invalid unless a concrete failed structural obligation is actually identified.

The evidence category follows the evidence; the desired stop does not select the category.

---

# 3. Cross-residual correspondence promotion

A mandatory cross-residual pass is itself discovery work.

If that pass returns:

```text
result = CORRESPONDENCE
```

for a role mapping, that mapping becomes an ordinary discovery candidate.

Before the same residual region may be used as a terminal separator, the agent must do one of:

```text
A. promote the correspondence into the main candidate/findings and test its immediate neighborhood;
B. expand the correspondence to the smallest load-bearing adjacent region suggested by dependency structure;
C. falsify the correspondence with a concrete breaker and record that breaker;
D. record that expansion is impossible because required authority/structure is unavailable, leaving the branch incomplete/DORMANT rather than rejected.
```

It is invalid to discover a correspondence in the gate, leave it in a side ledger, and then stop as though that correspondence had never been found.

---

# 4. Minimum expansion burden

Promotion does **not** require proving the correspondence globally or exhaustively.

The minimum burden is:

```text
verify mapped role
inspect one load-bearing predecessor or successor neighborhood where available
check relevant attached constraint/boundary condition
seek one concrete falsifier
```

If the candidate survives, keep it as a candidate/supported candidate and continue only as far as useful.

This preserves DP's resource discipline.

---

# 5. One-to-subgraph obstruction alignment

When one side exposes an obstruction/witness/encoder as one atomic node and the other exposes several dependent steps, the agent should test:

```text
one node <-> subgraph
```

before concluding that the atomic side lacks the subgraph's role.

For proof comparison, an obstruction node is aligned by what it prevents or forces, not by how close it appears to the final contradiction.

A later witness-decoding step must not be substituted for an earlier obstruction merely because both contribute to the final result.

---

# 6. Terminal-decision legality

A terminal `REJECTED` decision on a cross-residual branch is legal only when at least one of these is true:

```text
STRUCTURAL_BREAKER
    with a concrete failed load-bearing obligation

RIGID_AUTHORITY
    with the applicable pinned authority

NATURAL_IDENTITY
    with qualified NEI DISTINCT
```

Otherwise the branch may continue or stop `DORMANT`, but it may not assert that deeper correspondence has been disproved.

---

# 7. Minimal conformance record

When `separator_kind = STRUCTURAL_BREAKER`, record:

```text
breaker:
    obligation_kind
    left_evidence
    right_evidence
    failure
```

When the cross-residual pass reports a `CORRESPONDENCE`, record its disposition:

```text
candidate_disposition:
    PROMOTED
    EXPANDED
    FALSIFIED
    INCOMPLETE
```

If `FALSIFIED`, provide the concrete breaker.

These records exist only to make mandatory discovery behavior inspectable. They introduce no new semantic substrate.

---

# 8. Qualification targets

Focused qualification of DP 0.4 should demonstrate that:

1. different formalism/machinery alone does not qualify as `STRUCTURAL_BREAKER`;
2. a real structural breaker identifies a concrete failed obligation;
3. a correspondence found during the cross-residual pass is promoted/expanded or concretely falsified before terminal rejection;
4. one-node-to-subgraph obstruction alignment is attempted where decomposition granularity differs;
5. the known proof-pair regression recovers a deep encoder/boundary or obstruction correspondence while preserving real method-specific residuals;
6. no full-proof isomorphism, same-intermediate-object, or natural-identity overclaim is required.

---

# 9. Working summary

```text
Different machinery is evidence of difference in representation/method.
It is not yet evidence that a load-bearing structural obligation fails.

STRUCTURAL_BREAKER
    = concrete failed obligation

cross-residual CORRESPONDENCE
    = candidate that re-enters discovery
    != disposable side note
```

DP 0.4 closes the R3 escape hatch without requiring stronger identity commitments or exhaustive search.
