# IsoGraph Core Specification — Draft 0.19 Implicit Assertions Candidate

**Status:** unqualified normative clarification candidate  
**Base authority:** current effective Core = `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md` + the exact qualified `CORE_SPEC_DRAFT_0_18_OBSERVATION_FIRST_CANDIDATE.md` clarification  
**Short name:** Core 0.19 candidate  
**Purpose:** (1) distinguish source-explicit assertion support from necessarily or probabilistically derived implicit assertion support without introducing a universal proof calculus; and (2) make exact source-to-native formula rendering an explicit admission requirement  
**Growth rule:** adds no parser syntax, no mandatory inference algorithm, no universal theorem prover, no probability distribution, no default Bayesian prior, no new identity rule, and no permission to weaken existing Core/QU/NEI obligations

Core 0.19 is a narrow clarification over the current qualified Core. It adds assertion-support discipline and consolidates the already-existing source-fidelity obligations into an explicit exact-rendering contract.

Its purpose is to let IsoGraph expose structure that is not directly stated by a source but is nevertheless established by the represented system under its governing authority, while preserving the distinction between what the source explicitly supplied and what later reasoning recovered.

The governing principle is:

```text
an implicit assertion is discovered, not supplied
```

Core defines what may count as an implicit assertion. It does not prescribe how an agent must discover one.

Core 0.19 also makes explicit that a formula is not successfully rendered into IsoGraph merely because a structural sketch, role graph, or recognizable semantic skeleton exists. A complete rendering has **zero unresolved semantic loss** relative to the frozen source interpretation, modulo only explicitly qualified representation-only normalization.

---

# 0. Additional interpretation barriers

Do not collapse these distinctions:

```text
assertion body
    != assertion support

assertion
    != truth merely because it is represented

explicit support
    != stronger truth

implicit support
    != guess

implicit support
    != analogy

implicit support
    != DP lead

implicit label
    != authority

explicit / implicit
    != exact / Bayesian

high probability
    != exact truth

QU possibility structure
    != probability distribution

cycle in assertion structure
    != circular justification

same assertion body
    != same support lineage

implicit expansion
    != rewriting what the source explicitly said

failure to discover an implicit assertion
    != proof that no such assertion exists

operational fixed point
    != universal semantic completeness

formula skeleton
    != formula rendering

recognizable semantic shape
    != source-semantic completeness

sidecar-completed native graph
    != complete native rendering

approximate reconstruction
    != exact rendering

probabilistic/likely interpretation
    != exact rendering

source-equivalent-looking formula
    != exact bidirectional source witness

representability
    != successful rendering
```

These barriers are normative.

---

# 1. Assertion and support are separate structure

An **assertion** is assertable represented structure under a recoverable scope and semantic context.

Its body may be, as applicable:

- a proposition;
- relation;
- equality or disequality;
- constraint;
- exclusion;
- invariant;
- transition fact;
- structural fact;
- quantitative statement;
- probability/odds statement;
- or another qualified assertable construction.

Core does not make an assertion true merely because it is represented.

The body of an assertion is distinct from the structure that supports it.

One assertion body may have:

```text
one explicit support
many explicit supports
one implicit support
many implicit supports
both explicit and implicit supports
```

Materially distinct support paths remain recoverable.

```text
assertion identity
    != support identity
```

---

# 2. Explicit Assertion

An assertion has **explicit support** when the assertion body, or an exact source-faithful representation of that body, is directly supplied by the represented source under recoverable source provenance and scope.

An assertion with at least one explicit support may be called an **Explicit Assertion** relative to that source representation.

Explicit means only:

```text
the source directly supplied this assertion support
```

It does not independently mean:

```text
true
proven
exact
globally scoped
independently validated
```

An explicit assertion inherits the authority and limitations of its source.

---

# 3. Implicit Assertion

An assertion has **implicit support** when its assertion body is not directly supplied by the relevant source support, but the support state is established from already represented structure under pinned governing semantic authority.

An assertion with at least one implicit support may be called an **Implicit Assertion** relative to that support lineage.

Implicit support MUST preserve enough structure to recover, as applicable:

```text
premise assertions/supports
governing semantic/rule authority + immutable revision
scope/context
bindings/substitutions
side conditions
QU dependencies
probability/measure authority where applicable
derivation/reasoning witness or certificate
provenance/dependency lineage
support mode
resource/completeness status where material
```

The word `implicit` does not grant semantic authority.

```text
tagged IMPLICIT
    != valid implicit assertion
```

Implicit status is valid only when the supporting structure satisfies this specification.

---

# 4. Support modes are independent of explicit/implicit origin

Explicit/implicit answers:

> How did this assertion enter the represented knowledge state?

Support mode answers:

> What strength of support is actually established?

These are independent axes.

The initial Core 0.19 candidate recognizes at least:

```text
EXACT support
BAYESIAN support under separately pinned probability authority
```

This does not prevent future qualified support modes.

## 4.1 Exact support

An **Exact Implicit Assertion** is an implicit assertion whose body must hold under the represented premises, scope, unresolved-state obligations, and pinned governing semantic authority.

Plausibility, usefulness, resemblance, statistical tendency, confidence, or expectation are insufficient for exact support.

## 4.2 Bayesian support

A **Bayesian Implicit Assertion** is an implicit assertion whose quantified Bayesian support is itself established from represented probabilistic structure under pinned probability-model authority.

The assertion body is not thereby promoted to exact truth.

A Bayesian implicit support record preserves, as applicable:

```text
assertion/hypothesis body
conditioning context
prior/base measure if required
likelihood model
joint/dependence structure
QU dependency
posterior probability / odds / Bayes factor / other qualified quantity
units/logarithm base where applicable
support provenance
derivation witness
```

Core 0.19 does not define a universal Bayesian calculus.

It only permits Bayesian support when the required probability authority is represented and the resulting quantity is valid under that authority.

```text
Bayesian implicit
    != exact implicit
```

No probability threshold silently upgrades Bayesian support to exact support.

---

# 5. QU supplies the possibility structure

QU supplies the admissible possibility structure of unresolved information.

```text
QU
    = what remains admissible / possible
```

QU does not, by itself, supply:

```text
a probability distribution
a uniform prior
a base measure
a likelihood model
independence
Bayesian update authority
```

A probability distribution or weighting over QU realizations requires separately represented qualified authority.

An implicit assertion that depends on QU carries that dependency transitively unless a qualified derivation explicitly refines or discharges it.

If reasoning narrows the QU state:

```text
Q1 is a qualified refinement of Q0
```

later implicit assertions may depend on `Q1`, while provenance preserves its derivation from `Q0`.

If an assertion is invariant across every admissible realization relevant to the claim, the assertion may receive exact implicit support while its provenance still records the QU dependency and the universality witness.

If admissible realizations disagree on the assertion, it is not an unconditional exact implicit assertion.

---

# 6. Constitutional tenets of implicit assertion

The following rules constrain every admitted implicit support.

They are intentionally small and method-neutral.

## 6.1 Support fidelity

An implicit assertion may claim only the strength actually established by its support.

Exact implicit support requires necessity.

Bayesian implicit support requires valid quantified probabilistic authority.

No support mode may be silently strengthened into another.

## 6.2 No added premises

An implicit assertion MUST NOT depend on an unstated premise merely because that premise is familiar, conventional, useful, likely, domain-typical, or necessary to obtain a desired result.

Every load-bearing premise or authority must be represented or recoverable through a pinned qualified dependency.

## 6.3 Scope preservation

Every assumption, boundary, domain restriction, guard, condition, and context required by the support remains attached to the implicit assertion.

An implicit assertion MUST NOT escape the scope that makes it valid.

## 6.4 No authority amplification

An implicit assertion cannot acquire stronger semantic authority, certainty, scope, or provenance than its support justifies.

Conditional support produces conditional assertion support.

Unresolved support remains unresolved unless independently refined or discharged.

## 6.5 Recoverable support

The reason an implicit assertion is admitted must remain recoverable.

Core does not prescribe one proof or reasoning method, but another qualified reasoner/verifier must be able to inspect the support and determine what premises, authority, context, and witness justify the assertion.

## 6.6 Grounded support

Cycles in the assertion structure are permitted and may be load-bearing.

For example:

```text
A -> B -> C -> A
```

may be a valid represented cycle.

A cycle may also provide an additional implicit support path for an assertion that already has independent grounding.

However, a support cycle MUST NOT be its own sole source of authority unless separately qualified recursive/fixed-point semantics establish that grounding.

```text
cycle in structure
    != invalid

ungrounded self-support
    = invalid
```

## 6.7 Unknown remains unknown

Unresolved structure MUST NOT be silently fixed, averaged, projected away, or assigned a preferred realization merely to obtain an implicit assertion.

QU dependencies remain represented until qualified reasoning refines or discharges them.

## 6.8 Discovery cannot create validity

A comparison target, desired isomorph, Discovery Protocol lead, human expectation, scorer target, or another external search objective may motivate looking for an implicit assertion.

It MUST NOT contribute to the grounds that make the assertion valid.

```text
reason to search
    != reason to believe
```

Pair-conditioned searches remain identifiable as such when evidentiary independence matters.

## 6.9 Explicit/implicit provenance remains distinct

Implicit expansion MUST NOT rewrite history.

If an assertion was not explicit in the source, later derivation does not make it source-explicit.

If the same assertion has both explicit and implicit support, both support classes remain recoverable.

## 6.10 Failure to derive is not negation

Failure to find an implicit assertion does not establish that the assertion is not implicit.

A negative claim about derivability requires the completeness/certificate burden appropriate to that claim.

## 6.11 Iterative expansion

A newly validated implicit assertion may participate as a premise in later implicit-assertion passes.

Expansion may therefore proceed in rounds:

```text
A0 = source-supported assertions

A1 = A0 + newly admitted implicit assertions

A2 = A1 + newly admitted implicit assertions

...

An+1 = An when a pass adds no new admitted assertions
       and produces no material support refinement
```

A practical expansion run SHOULD stop when a full pass produces no new admitted assertions or material support refinements under its selected reasoning/search procedure.

That operational fixed point is not automatically proof of universal semantic closure.

A completeness claim requires separately justified coverage of the applicable inference/semantic authority and search space.

---

# 7. Iterative support lineage

Implicit assertions may depend on earlier implicit assertions.

For example:

```text
explicit A

pass 1:
    A + governing authority
        -> implicit B

pass 2:
    B + governing authority
        -> implicit C

pass 3:
    A + C + governing authority
        -> implicit D
```

The support lineage of `D` remains dependency-closed through `C`, `B`, and the explicit grounding of `A`.

Implementations MAY cache flattened dependency cones for efficiency, but cached summaries do not replace the underlying support provenance.

Derivation depth is useful metadata but does not by itself change semantic strength.

```text
depth 4 exact support
    != weaker exact support merely because it is deeper
```

---

# 8. Bayesian chains and dependence discipline

Bayesian implicit assertions may participate in later rounds when their quantified support is valid input to another represented probabilistic model.

For example, under an applicable probability authority:

```text
explicit prior/base probability structure
        ->
implicit Bayesian support for B
        ->
implicit Bayesian support for C
```

The quantitative support may change or refine between passes.

Separate evidence items are not presumed independent.

Bayesian composition requires, as applicable:

```text
qualified joint likelihood
qualified conditional-independence relation
qualified conditional probability structure
or another exact probability-model theorem
```

Two observations that share one causal/evidentiary source MUST NOT be double-counted merely because they appear as separate assertion supports.

If QU is involved, the QU possibility structure remains load-bearing unless a qualified marginalization, invariance theorem, refinement, or other authorized operation discharges the dependency.

---

# 9. Method neutrality

Core 0.19 deliberately does not define an inference catalogue.

It does not require one universal procedure for:

- theorem proving;
- algebraic deduction;
- graph closure;
- dimensional reasoning;
- probabilistic inference;
- symbolic manipulation;
- rewrite reasoning;
- physical-law propagation;
- constraint solving;
- model checking;
- or AI reasoning.

An agent may discover candidate implicit assertions by any method permitted by its operating environment.

Admission depends on the support satisfying the Core contract, not on use of a privileged discovery algorithm.

```text
Core defines what counts
    != Core dictates how to find it
```

---

# 10. Native representation posture

Core 0.19 introduces no parser token such as `therefore` or `∴`.

The candidate semantics are intended to be constructed from existing Core mechanisms:

- Semantic Identity;
- ordered incidence;
- scope/boundary;
- claims/assertable structures;
- dependencies;
- provenance;
- proof/witness structures;
- pinned semantic authority;
- QU dependencies;
- existing exact literals and extension-owned probabilistic records where applicable.

A native assertion-support representation SHOULD expose distinct semantic roles equivalent to at least:

```text
ASSERTION
ASSERTION_BODY
ASSERTION_SUPPORT
EXPLICIT_SUPPORT
IMPLICIT_SUPPORT
EXACT_SUPPORT
BAYESIAN_SUPPORT
SUPPORT_PREMISE
SUPPORT_AUTHORITY
SUPPORT_SCOPE
SUPPORT_WITNESS
SUPPORT_PROVENANCE
SUPPORT_DEPENDENCY
SUPPORT_COMPLETENESS_STATUS
```

These are semantic roles, not new parser primitives.

This first candidate deliberately does not freeze numeric stable-label allocation. Testing should determine whether the role decomposition is complete, redundant, or improperly factored before native label IDs are made durable.

---

# 11. Interaction with Discovery Protocol

Implicit assertions are Core-valid semantic structure whether or not Discovery Protocol is running.

Discovery Protocol may later define when implicit-assertion expansion is likely to have high discovery value.

For example, future DP work may investigate implicit assertions when:

- sparse explicit representations block an otherwise plausible structural correspondence;
- a residual may contain necessarily recoverable structure;
- one source states explicitly what another source may establish implicitly;
- deeper implicit rounds may expose a hidden common core.

However:

```text
DP chooses where to look
Core determines what counts
```

DP MUST NOT make an assertion implicit merely by searching for it.

This candidate does not yet modify the Discovery Protocol specification.

---

# 12. Illustrative exact example

This example is explanatory, not qualification evidence.

Suppose a pinned authority establishes transitivity for relation `R` and the explicit source supports:

```text
R(A,B)
R(B,C)
```

Then a valid witness may support the implicit assertion:

```text
R(A,C)
```

The assertion remains implicit relative to that source even if another source explicitly states `R(A,C)`.

If the transitivity authority is absent, Core 0.19 does not permit the agent to import transitivity merely because it is conventional for some relations.

---

# 13. Illustrative grounded-cycle example

This example is explanatory, not qualification evidence.

Suppose:

```text
A has explicit support

A -> B
B -> C
C -> A
```

under a governing authority that validates each step.

Then:

- `B` may receive implicit support grounded through explicit `A`;
- `C` may receive implicit support grounded through `B`;
- `A` may receive an additional implicit support path through `C`;
- the assertion cycle is preserved.

The cycle is not a circular-logic defect because its support lineage has independent explicit grounding.

If no assertion in the cycle has independent or separately qualified recursive/fixed-point grounding, the cycle alone cannot manufacture valid support.

---

# 14. Illustrative QU/Bayesian example

This example is explanatory, not qualification evidence.

Suppose a qualified QU state supplies the admissible possibility structure for `A`, and a separately pinned probability authority supplies:

```text
P(A)
P(B | A)
P(B | not A)
```

Then the applicable probability model may establish an implicit Bayesian assertion carrying the resulting `P(B)`.

That assertion:

- is implicit because the source did not directly supply the resulting support for `B`;
- is Bayesian because its support is probabilistic rather than exact;
- retains the probability-model authority;
- retains the QU dependency where load-bearing;
- may participate in a later implicit pass.

The same support MUST NOT be relabeled as exact merely because `P(B)` is numerically high.

---

# 15. Failure classification

Before revising Core 0.19 because of a failed case, classify the failure as one of:

```text
assertion-body/support conflation
explicit/implicit provenance failure
hidden-premise import
scope leakage
authority amplification
invalid exact-support claim
invalid Bayesian-support claim
probability-without-measure authority
unsupported independence/double counting
QU dependency loss
invalid QU discharge
ungrounded support cycle
valid grounded cycle incorrectly rejected
witness/provenance insufficiency
pair-conditioned confirmation bias
incomplete-search false negative
iterative-expansion failure
support-refinement/convergence failure
implementation defect
candidate semantic defect
```

A failed implementation does not by itself prove the semantic model wrong.

A passing example does not by itself qualify the model.

---

# 16. Qualification targets

Before Core 0.19 promotion, fresh qualification should test at least the following behaviors.

1. **Explicit provenance:** a directly represented source assertion receives explicit support without being upgraded to proof/truth merely by explicitness.
2. **Exact implicit derivation:** a necessary unstated result receives implicit exact support with recoverable premises, authority, scope, and witness.
3. **No hidden premise:** a tempting conclusion requiring one conventional but unrepresented premise is rejected.
4. **Scope preservation:** an assertion valid only under a condition remains conditional after several implicit passes.
5. **No authority amplification:** uncertain/conditional support does not silently become exact/global support.
6. **Grounded cycle:** an explicitly grounded `A -> B -> C -> A` cycle is preserved and may generate additional support.
7. **Ungrounded cycle:** `A because B; B because C; C because A` without independent/fixed-point grounding cannot manufacture validity.
8. **QU propagation:** a QU dependency remains load-bearing through second- and third-round implicit assertions.
9. **QU refinement/discharge:** qualified refinement is propagated and a universally invariant result may discharge QU from the conclusion while retaining provenance.
10. **No invented probability:** a QU realization family without measure authority does not become a uniform or otherwise weighted probability model.
11. **Bayesian implicit chain:** a pinned probability model can produce a Bayesian implicit assertion that validly participates in a later pass.
12. **Dependence protection:** correlated evidence is not multiplied/summed as independent without authority.
13. **No probabilistic promotion:** extremely high probability does not become exact truth without an exact bridge.
14. **Explicit + implicit support coexistence:** one assertion may retain both direct source support and an independent implicit support lineage.
15. **Discovery neutrality:** knowledge of a comparison target may motivate a search but cannot appear in the assertion's validity support.
16. **Iterative depth:** a valid assertion appearing only after multiple implicit passes is recovered with complete lineage.
17. **Fixed-point stop:** a no-new-assertion pass may terminate the operational expansion without falsely claiming universal semantic closure.
18. **Failure-to-find honesty:** incomplete search cannot establish non-derivability.

Qualification should include adversarial near-misses rather than only positive examples.

---

# 17. Working constitutional summary

Core 0.19 adds a small assertion-support discipline.

```text
An assertion body is not its support.

Explicit means:
    the source directly supplied the support.

Implicit means:
    the support emerged from already represented structure.

Exact implicit means:
    the assertion must hold under the governing authority.

Bayesian implicit means:
    quantified probabilistic support follows under separately pinned
    probability authority.

QU supplies possibility structure.
QU does not supply probability.

Implicit assertions may feed later implicit passes.

Cycles are allowed when grounded.
Cycles cannot manufacture their own authority.

Scope, uncertainty, authority, and provenance propagate unless
qualified reasoning refines or discharges them.

A search target may tell an agent where to look.
It cannot make the result true.

Failure to find is not proof of absence.

Core defines what counts.
It does not dictate how the AI reasons its way there.
```

This candidate changes no qualified Core authority until independently tested, reviewed, and promoted.

---

# 18. Exact source-to-native formula rendering

This section consolidates and strengthens the current Core source-fidelity requirements for formulas, constraints, equations, proofs, transition predicates, quantitative relations, and other logic-bearing source structure.

Its purpose is not to add a higher-level formula ontology.

Its purpose is to establish the admission condition for saying:

```text
this source formula has been rendered in IsoGraph
```

The admission condition is **exact semantic closure**.

## 18.1 Zero semantic residual

A source formula is completely rendered only when every load-bearing semantic distinction required to reconstruct the frozen source interpretation is represented in:

1. the native IsoGraph structure itself; or
2. an explicitly pinned qualified semantic dependency whose interface is itself represented and whose use is exact.

The complete native bundle MUST permit recovery of the source-semantic object with zero unresolved semantic loss, modulo only qualified representation-only normalization.

```text
source semantic object S
    ->
native bundle N
    ->
reconstructed semantic object S'

complete rendering requires:
    S' ≅ S
```

where the equivalence relation is the frozen source-semantic structural equivalence for that rendering claim.

This requirement is semantic, not byte-for-byte textual identity.

Whitespace, source spelling, alpha-renamable binder handles, transparent serialization choices, and other already-qualified representation-only differences may normalize away.

No load-bearing logic may normalize away without an exact qualified witness.

## 18.2 Primitive / qualified-leaf closure

Rendering proceeds downward until every load-bearing component reaches either:

- qualified Core structure;
- an explicitly represented primitive/model leaf with pinned authority;
- or a pinned qualified semantic construction whose exact interface is represented.

A renderer MUST NOT stop decomposition at a convenient familiar label merely because an agent understands it.

For a formula, load-bearing structure includes, as applicable:

```text
operator / relation identity
operator arity
ordered operand incidence
literal values
sign
coefficient
units / dimensions when semantic
binding
binder ownership
free-variable interface
quantifier kind
quantifier domain / generator
scope / boundary
guards / side conditions
branch / choice structure
equality / disequality kind
exact / approximate distinction
epistemic status where part of the source claim
function application
indexing
aggregation / fold operation
aggregation domain
aggregation identity/base case
ordering
multiplicity
derivative / transition semantics
probability / measure authority
unknown / alternative interpretation structure
provenance needed to reconstruct the frozen source meaning
```

This list is illustrative, not exhaustive.

The test is not whether the renderer named every familiar concept.

The test is whether removing any unrepresented distinction could change the source-semantic object.

## 18.3 No skeleton renderings

The following may be useful exploratory artifacts but are **not complete formula renderings**:

```text
role graph
dependency skeleton
operator-name graph without operator semantics
formula outline
semantic summary
heuristic decomposition
approximate reconstruction
partial factorization
lossy projection
recognition-trigger representation
English- or JSON-completed native object
```

Such artifacts MUST be labeled partial/exploratory and MUST NOT be admitted as source-faithful formula renderings for proof, structural comparison, isomorphism discovery, qualification, or implicit-assertion support.

## 18.4 No sidecar completion

Human-readable or machine-readable sidecars may supply:

- symbol gloss;
- citations;
- provenance;
- reviewer navigation;
- non-authoritative explanation;
- serialization metadata.

They MUST NOT supply load-bearing formula meaning absent from the native bundle.

```text
native payload
    = semantic/formula structure

sidecar
    = gloss/navigation/provenance only
```

If removing the sidecar makes the represented formula unreconstructable, the native rendering is incomplete.

A pinned qualified semantic authority is not a sidecar when its semantics and interface are explicit dependencies of the native bundle.

## 18.5 No silent conventional mathematics

A renderer MUST NOT rely on an agent to silently import conventional mathematical meaning merely because a notation is familiar.

Examples include:

```text
"+" means an assumed addition law
juxtaposition means multiplication
summation is associative/commutative
a derivative has ordinary calculus semantics
exp has a familiar real-exponential meaning
a field has familiar axioms
probabilities normalize conventionally
an omitted domain is "obvious"
operator precedence is conventional
```

Any such semantics that are load-bearing must be represented directly or routed through pinned qualified authority.

Pretrained recognition is not semantic authority.

## 18.6 Exact transformations only

A source formula may be rendered through an alternate exact factorization, algebraic form, quotient, canonicalization, or compact construction only when the rendering preserves an exact recoverable bridge.

For a changed semantic surface:

```text
source form S
    <-> exact witnessed transformation T
    <-> rendered form R
```

The witness must establish the claimed direction(s) under the declared scope.

If only one direction is established, only that direction may be claimed.

Approximation, empirical similarity, asymptotic equivalence, heuristic simplification, likely equivalence, or probabilistic support does not satisfy an exact-rendering claim.

## 18.7 Unknown and ambiguity fidelity

Exact rendering does not require guessing an unresolved source meaning.

If the source is ambiguous, incomplete, inconsistent, parameterized, or genuinely admits multiple faithful interpretations, the rendering preserves that structure exactly.

As applicable:

```text
known alternative interpretations
    -> represented alternatives

unresolved load-bearing value/relation
    -> QU

inconsistent source claims
    -> preserved inconsistency with provenance

missing authority
    -> missing/unresolved authority
```

Choosing a convenient realization is semantic loss.

```text
exact rendering of an unknown
    != guessing the unknown
```

## 18.8 Precision and modality preservation

Source precision and assertion strength are load-bearing.

A renderer MUST preserve distinctions such as:

```text
exact
approximate
bounded
empirical
probabilistic
conditional
existential
universal
modal
hypothetical
disproven
unknown
```

when present in the frozen source interpretation.

A renderer MUST NOT upgrade or downgrade these merely to obtain a simpler graph or stronger discovery result.

## 18.9 Formula reconstruction gate

A formula-rendering claim is not qualified by author inspection alone.

Before the rendering may serve as evidence for proof, discovery, comparison, implicit assertion, or another semantic result, the applicable qualification profile MUST establish source-semantic reconstruction.

At minimum:

```text
Q0  freeze source interpretation / alternatives
Q1  author-side semantic coverage audit
Q2  native parse / signature / closure audit
Q3  isolated native-only reconstruction by a fresh reasoner
Q4  canonical source <-> reconstruction structural comparison
Q5  targeted distinction-preservation controls
Q6  promotion for downstream semantic use
```

A profile may require stronger controls.

A failure at an earlier layer blocks downstream use.

Same-context reconstruction is not independent qualification evidence.

## 18.10 Exact reconstruction criterion

For exact rendering qualification:

```text
PASS
    =
every load-bearing source-semantic distinction is recoverable
and no unsupported semantic distinction is added

FAIL
    =
any load-bearing distinction is
missing
added
merged
split
reordered
rebound
rescoped
retyped
strengthened
weakened
approximated
guessed
or otherwise changed
without exact qualified authority
```

There is no partial credit for the exact-rendering gate.

A partial rendering may remain useful as an explicitly partial artifact.

It simply cannot be called an exact source rendering.

## 18.11 Adversarial distinction preservation

Qualification SHOULD include source variants differing by one load-bearing feature, such as:

```text
+ versus -
ordered operand swap
forall versus exists
exact versus approximate
one changed literal
one changed coefficient
one changed scope boundary
one changed binder
one changed domain restriction
one changed guard
one changed identity-sharing relation
```

The rendering and cold reconstruction must preserve the distinction rather than silently repairing the source toward a familiar formula.

## 18.12 Discovery and implicit-assertion barrier

Discovery may begin only from the semantic content actually qualified in the rendering.

A DP result MUST NOT receive evidentiary support from source meaning that exists only outside the qualified native bundle.

Likewise, explicit assertion support under Core 0.19 requires either:

- a directly represented source assertion body; or
- an exact qualified source-faithful rendering of that body.

```text
source prose
    -> incomplete skeleton
    -> DP / implicit support
```

is invalid.

The lawful path is:

```text
source
    -> exact qualified native rendering
    -> discovery / reasoning
    -> derived view / implicit assertion
```

## 18.13 Failure classification

Rendering failures should be classified before Core is changed.

Useful classes include:

```text
source-interpretation ambiguity
formula omission
operator-semantics omission
operand/arity/order loss
literal/sign/coefficient loss
binder/domain/scope loss
precision/modality loss
sidecar-authority leakage
silent conventional-semantics import
lossy transformation presented as exact
missing transformation witness
unknown collapsed to guessed value
unsupported semantic addition
cold-reconstruction failure
canonical-comparison failure
implementation/serializer defect
actual Core representability defect
```

A rendering failure does not establish a Core expressiveness defect until faithful construction from existing primitives/dependencies has been attempted and shown insufficient or materially worse under the normal Core admission rule.

## 18.14 Formula rendering constitutional summary

```text
Represent every load-bearing bit of source logic.

Stop only at qualified primitives/leaves or exact pinned dependencies.

A skeleton is not a rendering.

A sidecar cannot finish the semantics.

Familiar mathematics cannot be silently imported.

Alternative forms require exact transformation witnesses.

Unknown remains unknown.

Ambiguity remains explicit.

Precision and modality survive.

Exact rendering has no semantic residual.

Fresh native-only reconstruction must recover the frozen source semantics.

Only qualified exact renderings may serve as downstream discovery/proof evidence.
```


