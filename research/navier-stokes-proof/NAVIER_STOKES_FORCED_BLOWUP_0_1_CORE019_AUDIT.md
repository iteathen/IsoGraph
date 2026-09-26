# Core 0.19 rendering audit — NAVIER_STOKES_FORCED_BLOWUP_0_1

**Status:** modernization audit; no qualification effect  
**Artifact:** `NAVIER_STOKES_FORCED_BLOWUP_0_1.isg`  
**Pinned formal source:** `openai/NavierStokesAndEuler@f9e8bc5b38b6e212696e8a30e3e91517af887bbd`

## 1. Correct claim classification

The 0.1 artifact is a high-retention research representation.

Its own README says it represents as much internal mathematical structure as is reasonable while compressing lower-level proof engineering. It explicitly says it is not the complete transitive Lean dependency closure.

Therefore the current artifact should **not** be retroactively described as:

```text
exact rendering of the entire published proof
or
exact rendering of the complete Lean dependency closure
```

The correct current classification is:

```text
PARTIAL_EXPLORATORY / HIGH-RETENTION SOURCE-BACKED REPRESENTATION
```

with exact subclaims only where the artifact explicitly marks a relation source-exact and the source manifest supports it.

## 2. Core 0.19 / ESR audit

### Q0 — source freeze / interpretation

Strengths:

- exact formal-source revision pinned;
- declared theorem/local/periodic contract scopes documented;
- omitted lower-level proof structure explicitly acknowledged;
- QU boundaries used for incomplete scope.

Gap for a future exact-rendering claim:

- the exact source-semantic object to be qualified must be frozen more narrowly than “as much as reasonable.”

A future ESR packet must state whether the object is:

- the three selected property contracts;
- those contracts plus named construction interfaces;
- a particular reduced proof architecture;
- or another exact finite semantic boundary.

### Q1 — native semantic coverage

Existing deterministic evidence establishes:

- R3 `CandidateProperties`: 12/12 represented;
- `LocalPaper.Properties`: 19/19 represented;
- periodic `CandidateProperties`: 16/16 represented;
- retained source declarations carry provenance;
- source-exact and source-derived relation kinds are distinct.

Not established for a whole-proof exact claim:

- formula-by-formula operator/operand/binder/quantifier coverage over the entire pinned Lean source;
- proof-helper dependency closure;
- exact reconstruction of every compressed parameterized property family.

Therefore:

```text
Q1 for selected contract fields: strong predecessor evidence
Q1 for entire proof: not established
```

### Q2 — native closure / parse integrity

Existing validation reports:

- balanced delimiters;
- no undeclared stable labels;
- no suspicious non-Core tokens under the restricted artifact surface;
- source/provenance closure for retained declarations.

This is useful deterministic evidence but was not run as an ESR Q2 packet under Core 0.19.

### Q3–Q6

Not performed for this artifact under ESR 0.1:

- two fresh isolated native-only reconstructions;
- exact canonical source/reconstruction comparison;
- adversarial one-distinction mutation controls;
- scorer-blind promotion verification.

## 3. Modernization disposition

No semantic rewrite is justified merely because Core 0.19 now exists.

The lawful sequence is:

```text
declare exact source-semantic object
    ->
build Q1 coverage map over that object
    ->
if current native bytes cover it exactly:
        qualify current bytes
else:
        author NAVIER_STOKES_FORCED_BLOWUP_0_2.isg
        only for the demonstrated gaps
```

This avoids both errors:

```text
grandfather old research into exact qualification
and
rewrite a large graph without evidence that its native semantics are deficient
```

## 4. Implicit assertions

The 0.1 artifact already distinguishes some source-exact statements from source-derived consequences.

Core 0.19 now requires any promoted implicit support to preserve recoverable:

- premises;
- governing authority;
- scope;
- witness/certificate;
- provenance/dependency lineage.

The current source-derived relations should therefore be audited individually before being used as qualified implicit-assertion evidence.

No new assertion syntax should be added to the source graph merely for this purpose.

## 5. DP 0.8

Objective/sufficiency analysis belongs in the successor discovery view:

- `DP_DISCOVERY_0_3_SUFFICIENCY.isg`

not in the source rendering.

This keeps source semantics separate from later optimization/discovery questions.
