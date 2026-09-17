# Experiment 006 — RUN-Q006 Frozen Qualification Review

**Status:** completed frozen run; integrated qualification did not pass  
**Run:** `RUN-Q006`  
**Qualification commit:** `e63786f5cf5e4aebc248d66b9a2c64437e425265`  
**GitHub Actions run:** `35268229129`  
**Evidence artifact:** `10517770831` (`isograph-exp006-RUN-Q006`)  
**Model:** `gemini-3.5-flash`  
**Gemini semantic invocations:** 1  
**API attempts:** 1  
**HTTP status:** 200  
**Additional verifier invocations:** 0  
**Packet SHA-256:** `00db4a841445196e1ad79c6b7c21bc5682e157aa28cf5dd21844b22e5728dc89`  
**Cold report SHA-256:** `635d06446f0f759e437901fb34a2d3b3151e28883b7aa716dabd54fd7cc6aa67`

## 1. Resource-discipline result

The run met the intended external-resource budget exactly:

```text
GitHub qualification runs: 1
Gemini semantic calls:     1
Gemini provider retries:   0
Gemini preflight calls:    0
independent verifier calls:0
```

Deterministic harness syntax checks passed before the Gemini call. The cold semantic call completed successfully. Deterministic scoring and evidence upload also completed successfully. The workflow failed only at the final integrated-disposition gate because the frozen score was not `QUALIFIES`.

No rerun is justified by infrastructure failure.

## 2. Frozen automatic score

```text
QU:         PARTIAL              12 / 13 exact-label matches
NEI:        PARTIAL              16 / 17 exact expected classifications
DP:         DOES_NOT_QUALIFY
Integrated: DOES_NOT_QUALIFY
```

## 3. QU adjudication

The sole automatic QU miss was `QU-10`.

Expected label:

```text
SEMANTICS_PRESERVED_UNDER_ALPHA_RENAMING
```

Cold answer:

```text
SEMANTIC_PRESERVED_UNDER_ALPHA_RENAMING
```

The accompanying reason correctly states that lawful alpha-renaming preserves QU semantics and that SI spelling has no evidential role.

This is a deterministic scorer-label normalization defect, not a QU semantic failure. The cold answer has the intended meaning and directly satisfies the tested obligation.

Post-freeze semantic adjudication:

```text
QU semantic controls: 13 / 13
QU candidate defect demonstrated: none in RUN-Q006
scorer defect: exact-string brittleness on SEMANTIC/SEMANTICS spelling
```

This adjudication does not alter the frozen automatic score artifact.

## 4. NEI adjudication

The sole NEI miss was `NEI-13`, the inconsistent pairwise-projection case:

```text
SAME(a,b)
SAME(b,c)
DISTINCT(a,c)
```

The cold decoder returned:

```text
NO_ADMISSIBLE_MODEL
```

with the rationale that no joint equivalence model can realize all three projections.

The scorer expected:

```text
INCOMPLETE_UNQUALIFIED
```

The cold rationale correctly detects the joint inconsistency, but its result label conflates two different conditions:

1. the *underlying qualified model family* is empty; versus
2. a *proposed set of pairwise result claims* has no joint realization even though the underlying problem may have admissible models.

NEI 0.1 Section 13 forbids inconsistent pairwise projections, while its no-admissible-model status is defined for an empty underlying admissible model family. RUN-Q006 therefore exposes a genuine specification/decoder ambiguity worth correcting explicitly.

Post-freeze disposition:

```text
NEI: PARTIAL
semantic obligations correctly reconstructed: 16 / 17
required clarification: inconsistent proposed projection set != automatically empty underlying model family
```

No second model call is required to establish this discrepancy; the frozen answer and normative distinction are explicit.

## 5. Discovery Protocols result

DP did not qualify.

Protocols used:

```text
DP-24 proof/witness topology
DP-02 constraint structure
DP-10 role-equivalent elements
DP-04 dependency topology
DP-08 residual structure
```

The cold decoder found only two oracle motifs:

```text
O1 contradiction architecture
O5 terminal contradiction with different residual machinery
```

It found no deep motif among:

```text
O2 boundary-directed local encoding
O3 refinement / approximation bridge
O4 parity versus global topological obstruction
```

The report did successfully:

- preserve substantial Alpha-specific residual machinery;
- preserve substantial Beta-specific residual machinery;
- reject `FULL_PROOF_ISOMORPHISM`;
- reject `NATURAL_IDENTITY`;
- reject `SAME_INTERMEDIATE_OBJECTS`;
- record falsification attempts;
- use structurally relevant rather than lexical protocols;
- return `SUPPORTED_CANDIDATE` rather than overpromoting the result.

However, it stopped after classifying the intermediate proof machinery as divergent residuals:

> the intermediate steps are completely divergent residuals (combinatorial/limiting vs. algebraic-topological), and lower-ranked protocols are highly unlikely to yield further structural correspondences.

That stopping judgment is the substantive DP failure. The hidden oracle establishes that these apparently divergent intermediates contain the most important known unification:

- local displacement/boundary labeling corresponds structurally to the boundary-directed retraction construction;
- repeated refinement and shrinking simplices play a discrete/simplicial approximation role relative to the continuous boundary construction;
- the combinatorial parity obstruction corresponds at a deeper level to the global algebraic-topological obstruction, historically interpretable at cochain/cohomology level.

RUN-Q006 therefore demonstrates that DP 0.1 currently encourages an agent to stop too early once a generic common shell and strong residuals are found.

## 6. DP correction pressure exposed by the run

Before DP 0.1 can qualify on this benchmark, its discovery discipline should explicitly require a **cross-residual abstraction pass** when all of the following hold:

1. a strong high-level common proof/structure shell exists;
2. the endpoints/obligations of two residual regions correspond;
3. the residual mechanisms differ strongly in vocabulary or mathematical machinery;
4. those residual regions carry most of the causal/proof burden between the matched endpoints.

In that situation, `different machinery` must not itself be a stopping criterion. The agent should promote protocols such as:

```text
DP-07 alternative factorization
DP-11 invariants across admissible variation / representation
DP-24 proof-witness topology at a deeper abstraction level
DP-33 degenerate/special-case structure where useful
DP-37 equivalent constraint/obstruction closure
DP-19 dual/complementary structure when indicated
```

and ask whether the residuals are alternate realizations/encodings of a shared obstruction or transformation pattern.

The residual-first rule remains useful, but residual inspection must be capable of discovering hidden common structure *inside* residuals rather than treating residual status as evidence of non-correspondence.

## 7. Integrated disposition

```text
QU:  semantic controls effectively PASS after deterministic scorer-normalization adjudication
NEI: PARTIAL; one real result-status ambiguity exposed
DP:  DOES_NOT_QUALIFY; deep known unification not rediscovered
Integrated: DOES_NOT_QUALIFY
```

No candidate module is modified by this review. The frozen run remains immutable evidence for the exact qualification commit.

A future rerun must follow an explicit candidate/corpus revision and must not silently replace RUN-Q006.
