# IsoGraph Exact Source Rendering Qualification Contract — 0.1 Candidate

**Status:** unqualified qualification-contract candidate  
**Short name:** ESR 0.1  
**Core dependency:** `CORE_SPEC_DRAFT_0_19_IMPLICIT_ASSERTIONS_CANDIDATE.md`, section 18  
**Purpose:** make exact source-to-native formula rendering mechanically admissible or rejectable before downstream proof/discovery use  
**Growth rule:** adds no Core primitive, parser syntax, formula operator, theorem rule, or discovery method

---

# 0. Constitutional boundary

This contract scores one claim only:

> **The supplied native IsoGraph bundle is an exact rendering of the frozen source-semantic object under the declared interpretation and scope.**

It does not score:

- whether the source claim is true;
- whether the formula is useful;
- whether the representation is minimal;
- whether another exact factorization is better;
- whether a discovery result follows;
- whether a natural-language explanation sounds equivalent.

The exact-rendering gate is binary.

```text
EXACT_RENDERING_QUALIFIED
or
EXACT_RENDERING_NOT_QUALIFIED
```

No partial semantic credit upgrades a failure to qualification.

---

# 1. Frozen qualification packet

Every qualification freezes:

```text
source artifact / source-semantic oracle
declared source interpretation
scope / domain assumptions
ambiguities / alternatives / QU
native IsoGraph bundle
all pinned semantic dependencies
semantic signature/gloss if used
representation-only normalization policy
reconstruction policy
canonical comparison policy
mutation-control set
qualification revision
```

Every load-bearing dependency is immutable/content-pinned.

Changing any load-bearing item creates a new qualification revision.

---

# 2. Sidecar authority barrier

A semantic signature or human sidecar may contain only information permitted by Core 0.19 section 18.4.

The scorer MUST test:

```text
native bundle + pinned semantic authorities
    -> enough to reconstruct source semantics

native bundle + gloss-only signature
    -> allowed

native bundle + sidecar formula meaning
    -> FAIL
```

A sidecar that supplies a missing operator, operand, sign, equation, binding, domain, guard, quantifier, uncertainty, or other load-bearing formula fact invalidates the rendering claim.

---

# 3. Qualification stages

## Q0 — Source freeze and interpretation closure

Freeze the semantic object being rendered.

Pass requires:

- exact source revision;
- declared interpretation;
- source scope;
- unresolved ambiguity preserved;
- source precision/modality recorded;
- no later pair/discovery target used to choose the source interpretation.

If the source is genuinely ambiguous, the frozen oracle represents the admissible alternatives rather than choosing one silently.

## Q1 — Native semantic coverage

Perform an author-side and mechanical coverage audit.

For every load-bearing source item, identify its native support or pinned semantic dependency.

Coverage classes include, as applicable:

```text
object / variable
operator / relation
arity
operand incidence / order
literal
sign
coefficient
domain
unit / dimension
binder / ownership
quantifier
scope
guard / condition
function application
index
aggregation operator
aggregation domain
aggregation identity/base case
transition / derivative semantics
equality kind
precision/modality
probability authority
unknown/alternative
provenance
```

Pass requires:

```text
uncovered load-bearing source items = 0
unsupported load-bearing native additions = 0
```

## Q2 — Native closure and parse integrity

Pass requires:

- legal native syntax;
- declared/pinned semantic symbols;
- no unowned free variable;
- no accidental namespace collision;
- no illegal binder capture;
- reconstructable dependency closure;
- deterministic parse under the frozen Core/profile.

A syntactically valid bundle can still fail Q1/Q3-Q5.

## Q3 — Independent cold reconstruction

At least **two independent fresh decoder executions** receive only:

1. the frozen Core/profile/semantic authorities required to interpret the native bundle;
2. the native bundle;
3. a gloss-only semantic signature if the qualification declares one;
4. the reconstruction output schema.

They MUST NOT receive:

- the source formula/prose;
- expected reconstruction;
- source-domain name when unnecessary to interpretation;
- encoder transcript;
- discovery target;
- pair mapping;
- scorer assertions;
- previous decoder output.

Same-context decoding is not qualification evidence.

Each decoder reconstructs the complete semantic object in canonical scorer form.

## Q4 — Canonical source/reconstruction sameness

For every independent decoder:

```text
source semantic oracle S
decoder reconstruction S_i
```

Pass requires an exact verified witness:

```text
S_i ≅ S
```

under the declared source-semantic equivalence and representation-only normalization policy.

The scorer rejects any load-bearing:

```text
omission
addition
merge
split
reorder
rebinding
rescoping
retyping
precision change
modality change
guessed value
invented authority
unwitnessed simplification
```

All required independent decoders must pass.

## Q5 — Adversarial distinction preservation

Run targeted one-difference controls.

A control mutates exactly one load-bearing source distinction and rerenders/reconstructs under the same qualification method where applicable.

Required control families SHOULD include every category material to the source. Candidate mutations include:

```text
+ <-> -
operand order swap
one literal change
one coefficient change
forall <-> exists
exact <-> approximate
one domain restriction
one scope boundary
one binder ownership
one guard
one identity-sharing relation
one unknown resolved/introduced
one branch removed/added
```

Pass requires that the native rendering and cold reconstruction preserve the mutation rather than silently normalize/repair it toward the familiar source.

For small formulas, all materially distinct single-feature mutations SHOULD be exhausted when practical.

## Q6 — Scorer-blind verification

At least one independent verifier that did not author the native rendering inspects:

- frozen packet identity;
- Q1 coverage;
- Q2 closure;
- Q3 isolation;
- Q4 exactness witnesses;
- Q5 mutation results.

The verifier receives scorer assertions only after decoder outputs are frozen.

## Q7 — Promotion

Only after Q0-Q6 pass may the bundle be marked:

```text
EXACT_SOURCE_RENDERING_QUALIFIED
```

The promotion record pins every dependency/evidence revision.

Only this promoted rendering may be used as exact source-semantic evidence in downstream:

- Discovery Protocol campaigns;
- proof/derivation;
- implicit-assertion qualification;
- structural comparison/isomorphism qualification;
- source-faithful synthesis.

---

# 4. Exactness scoring

The exact-rendering metric is binary.

```text
PASS
    iff
    every load-bearing source distinction is represented/recoverable exactly
    AND
    no unsupported semantic distinction is introduced
    AND
    every required independent cold reconstruction is canonically source-equivalent
    AND
    required adversarial controls preserve their changed distinction

FAIL
    otherwise
```

A useful partial representation may receive a separate descriptive disposition:

```text
PARTIAL_EXPLORATORY_REPRESENTATION
```

but never:

```text
EXACT_SOURCE_RENDERING_QUALIFIED
```

---

# 5. Exact alternate forms

A native formula need not duplicate the source surface.

A transformed native form qualifies only if the packet contains a verified exact bridge sufficient for the declared reconstruction claim.

Examples:

```text
alpha-renaming
qualified canonicalization
exact algebraic factorization
exact expansion/contraction
exact change of coordinates
exact definitional elimination/introduction
```

are permitted only under their exact witness/authority.

For a bidirectional rendering claim, bidirectional recovery must be established.

A one-way implication is not equivalence.

---

# 6. Unknown and ambiguity controls

Qualification MUST distinguish:

```text
unknown source value
    != guessed value

source ambiguity
    != renderer choice

multiple admissible readings
    != one convenient reading

incomplete source
    != completed conventional formula
```

When QU is load-bearing, cold reconstruction must recover the QU structure/possibility boundary, not one arbitrary realization.

---

# 7. No pretrained-semantic completion

A decoder may possess general knowledge, but qualification evidence must show that the native packet carries the source-specific structure.

Adversarial mutation controls are the primary detector.

If a decoder repeatedly reconstructs the familiar canonical formula while ignoring a represented mutation, the rendering/decoder path fails distinction preservation.

Recognition of a known formula is not reconstruction evidence.

---

# 8. Evidence timing

Qualification is revision-bound.

Evidence produced before a load-bearing Core/rendering-contract change does not automatically qualify the new revision.

Earlier evidence may be reused only when an explicit review proves that:

- the exact packet is unchanged where required;
- every new obligation was already satisfied;
- isolation remains valid;
- the old evidence is independently rescored under the new contract.

Otherwise rerun.

There is no grandfathering by filename, branch continuity, or conceptual similarity.

---

# 9. Failure classification

Use at least:

```text
SOURCE_FREEZE_DEFECT
SOURCE_INTERPRETATION_AMBIGUITY
NATIVE_COVERAGE_GAP
NATIVE_UNSUPPORTED_ADDITION
SIDECAR_AUTHORITY_LEAK
PARSE_OR_BINDING_DEFECT
SEMANTIC_DEPENDENCY_GAP
COLD_RECONSTRUCTION_OMISSION
COLD_RECONSTRUCTION_ADDITION
COLD_RECONSTRUCTION_REPAIR_BIAS
CANONICAL_SAMENESS_FAILURE
MUTATION_DISTINCTION_LOSS
VERIFICATION_DEFECT
RESOURCE_OR_PROVIDER_FAILURE
CORE_REPRESENTABILITY_CANDIDATE_DEFECT
```

Do not revise Core merely because an authoring/serialization/decoder implementation failed.

---

# 10. Working rule

```text
No guessing.
No approximation.
No semantic skeletons.
No sidecar completion.
No familiar-form repair.

Render all invariant source logic exactly.

Then prove the rendering reconstructs exactly.

Only then use it for discovery.
```
