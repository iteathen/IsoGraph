# IsoGraph Discovery Protocols — 0.8 Minimum Sufficient Support and Valuation Candidate

**Status:** unqualified normative successor candidate  
**Short name:** DP 0.8  
**Base dependencies:** DP 0.1 through DP 0.7  
**Core dependency:** current qualified Core 0.17 + Core 0.18 + Core 0.19 when implicit assertions or exact source rendering are used  
**Identity dependency:** qualified NEI 0.4 only when a discovery conclusion actually relies on natural/domain identity or distinctness  
**QU dependency:** qualified QU 0.1 whenever unresolved structure is load-bearing for sufficiency, substitution, or valuation  
**DTS dependency:** qualified DTS 0.1 when sufficiency or substitution depends on detailed transition anatomy  
**Companion discovery reference:** `research/discovery/LOGIC_LENS_FOR_IMPLICIT_ASSERTION_DISCOVERY_0_1.md` is optional non-authoritative search guidance, not semantic authority  
**Growth rule:** adds no Core primitive, parser syntax, universal inference calculus, universal optimizer, universal cost unit, mandatory implementation strategy, or fixed value system

DP 0.8 extends the cumulative Discovery Protocol with a second direction of structural discovery:

> **Discovery should identify not only structure that is present or missing, but also which represented support is actually necessary for a declared conclusion and which qualified alternatives can reach that same conclusion.**

The governing sequence is:

```text
represent faithfully
-> expose explicit and valid implicit structure
-> declare the target conclusion / observable
-> discover sufficient support
-> preserve alternative sufficient topologies
-> apply an explicit valuation profile if selection is desired
```

All DP 0.1–0.7 behavior remains in force.

---

# 0. Interpretation barriers

Do not collapse these distinctions:

```text
minimal Core representation
    != minimum sufficient support for one objective

represented semantic structure
    != structure that must be used for one objective

semantic outcome
    != independent runtime predicate

dependency / support connection
    != load-bearing necessity

locally consumed output
    != necessary support for the declared downstream objective

sufficient
    != minimal

minimal sufficient
    != minimum over a declared candidate space

fewest transitions
    != lowest cost

lower cost
    != semantically sufficient

valuation
    != semantic authority

optimization preference
    != proof of correctness

faster
    != better unless the valuation profile says so

one sufficient topology
    != unique sufficient topology

derivable assertion
    != permission to erase its semantic representation

removable from one execution objective
    != globally irrelevant

unobserved effect
    != proved absence of effect

logic refresher
    != governing logic authority
```

These barriers are normative.

---

# 1. Core representation remains faithful and primitive-first

DP 0.8 does not change the Core design target.

Core IsoGraph should remain a minimal primitive representation sufficient to preserve the represented source semantics and expose emergent structure.

DP 0.8 therefore does **not** authorize deleting semantically valid represented structure merely because one application objective does not require that structure during execution.

The distinction is:

```text
Core:
    what structure must be represented faithfully?

DP 0.8:
    what represented support must be used
    for this declared conclusion / observable?
```

A valid discovery result may therefore preserve a rich semantic graph while identifying a smaller objective-scoped support graph.

Preferred posture:

```text
represent minimally
preserve the represented meaning completely
discover freely
use only what is necessary for the declared objective
```

The final line is a Discovery Protocol question, not a Core omission rule.

---

# 2. Implicit-assertion expansion is a high-value discovery precursor

Core 0.19 defines what may count as valid implicit assertion support. It deliberately does not prescribe a universal inference algorithm.

DP 0.8 strengthens the search side:

> **Before concluding that represented assertions are independent, discovery SHOULD inspect whether elementary logical, relational, set, constraint, or domain-authorized consequences make one assertion derivable from others.**

High-value candidate relationships include, when supported by the governing authority:

```text
implication
equivalence
mutual exclusion
collective exhaustiveness
partition / complement
necessary condition
sufficient condition
conjunction / disjunction consequence
set inclusion
subsumption
constraint implication
transitive consequence
residual / remainder class
invariance
domination under a declared order
```

This list is illustrative, not an inference catalogue.

The purpose is to expose candidate implicit assertions and support dependence.

The governing barrier remains:

```text
reason to search
    != reason to believe

familiar logical pattern
    != authority to import that logic
```

Any admitted implicit assertion must satisfy Core 0.19 under represented or pinned governing authority.

The optional logic-lens companion may refresh search patterns. It supplies no semantic premise.

---

# 3. Declare the discovery objective before reducing support

Minimum-sufficient-support analysis is objective-scoped.

Before claiming that structure is necessary, unnecessary, substitutable, dominated, or preferable, record enough context to identify:

```text
target conclusion / observable
fixed inputs / admissible input domain
semantic scope
declared authority envelope
required precision / modality
required externally visible behavior
load-bearing QU state
load-bearing DTS transition obligations
identity obligations if any
invariants that must be preserved
allowed transformations / substitutions
valuation profile if selection is desired
```

A component-local return value is not automatically the target observable.

If the application objective is a downstream result, discovery must follow enough consumer topology to judge support relative to that result.

---

# 4. Support cone and objective-relevant analysis slice

For a declared target `O`, the **support cone** is the upstream represented dependency/support structure that may contribute to establishing `O` under the declared objective context.

It may include:

```text
explicit assertions
valid implicit assertions
constraints
transition relations
guards
dependencies
proof/witness structure
QU refinements
DTS anatomy
authoritative transformations
```

The support cone is a discovery view over represented structure. It is not a new Core substrate.

When judging whether an intermediate result is actually necessary for a farther downstream observable, the support cone alone may be too narrow. DP may construct an **objective-relevant analysis slice** containing the support cone plus only the consumer/fallback topology needed to evaluate that necessity.

Such a slice may include:

```text
immediate consumers
downstream target consumers
alternate closure / fallback paths
bypass relations
required externally visible effects
```

The slice is claim-bounded. It SHOULD NOT expand through unrelated downstream behavior merely because that behavior exists.

This distinction prevents two opposite errors:

```text
upstream-only view
    -> falsely treats a locally consumed value as globally necessary

unbounded whole-system expansion
    -> adds irrelevant structure and cost to the discovery question
```

---

# 5. Sufficient support

A support subgraph `S` is **sufficient** for target `O` only when, under the declared objective context:

```text
same admissible inputs
same declared authority envelope
same required scope
same required precision / modality
same load-bearing unknown obligations
same required externally visible behavior
    ->
S establishes O
```

Sufficiency may be exact or another explicitly permitted mode only if that mode is part of the declared objective.

An exact objective cannot be satisfied by silently substituting:

```text
approximation
heuristic
empirical similarity
likely answer
narrowed input domain
weaker output contract
discarded QU
altered transition ordering
changed identity assumptions
```

Valuation is applied only after sufficiency under the declared objective is established.

---

# 6. Minimal and minimum sufficient support

DP 0.8 distinguishes:

## 6.1 Minimal sufficient support

A sufficient support `S` is **minimal** under a declared removal/substitution relation when no permitted proper reduction of `S` remains sufficient for the same target.

This is an irreducibility claim.

It does not establish that no different sufficient support uses less structure.

## 6.2 Minimum sufficient support

A sufficient support `S*` is **minimum** only relative to an explicitly declared candidate space and support-order or measure when no established sufficient alternative in that candidate space ranks below `S*` under that order.

Examples of support orders may include:

```text
set inclusion
number of load-bearing transitions
number of support nodes
proof-step count
dependency count
another application-defined structural order
```

DP introduces no universal support-size metric.

If search has established irreducibility but has not covered the declared candidate space needed for a minimum claim, say `minimal sufficient support`, not `minimum`.

A minimum claim MUST name or recover the candidate space and ordering under which it is minimum. DP 0.8 does not require a universal search over every imaginable representation or implementation.

---

# 7. Counterfactual removal and substitution

A primary DP 0.8 search operation is:

```text
take candidate support X
remove / bypass / substitute X
preserve the declared objective context
ask whether target O remains established
```

This is a discovery counterfactual, not permission to mutate source evidence.

Possible dispositions include:

```text
LOAD_BEARING
    removal breaks sufficiency

REMOVABLE_FOR_OBJECTIVE
    removal preserves sufficiency

SUBSTITUTABLE
    another qualified support replaces X

UNRESOLVED
    available authority / QU / search coverage is insufficient
```

A `REMOVABLE_FOR_OBJECTIVE` result means only:

```text
X contributes no unique necessity
for this declared target under this scope
```

It does not mean:

```text
X is false
X is meaningless
X should be deleted from Core representation
X is globally unnecessary
```

Counterfactual tests SHOULD preserve provenance and the exact transformation/removal being tested.

---

# 8. Consumer-scope sufficiency

Discovery MUST NOT declare an upstream result necessary merely because an immediate component consumes it.

When the declared target lies downstream, inspect enough consumer topology to determine whether the upstream result contributes unique support.

Example shape:

```text
X -> local bound -> downstream exact procedure -> O

and

without X -> unresolved -> downstream exact procedure -> O
```

The existence of the first path does not prove `X` is necessary.

Conversely, the existence of an alternate downstream procedure does not prove `X` is removable unless the alternate path preserves the declared target contract.

The governing rule is:

> **Sufficiency is objective-scoped, not component-scoped.**

---

# 9. Alternative sufficient topology

Discovery SHOULD preserve materially distinct ways whose sufficiency is established under the declared objective and governing authority.

For example:

```text
S1 -> O
S2 -> O
S3 -> O
```

may all be valid.

Do not collapse them merely because they share an output.

Record, as applicable:

```text
support membership
support provenance
implicit-support dependencies
required authority
QU dependencies
DTS dependencies
scope
known residuals
transformation/substitution relation
valuation quantities
qualification status
```

Alternative sufficient topologies are discovery results.

They need not be promoted into a canonical implementation.

---

# 10. Discovery Valuation Profile

DP 0.8 permits an application to declare how established sufficient alternatives should be valued.

A **Discovery Valuation Profile** should identify, as applicable:

```text
target conclusion / observable
hard invariants
admissible transformations
valuation dimensions
valuation evidence / derivation method / units where applicable
constraints / thresholds
preference ordering
lexicographic priorities
weights only when actually supplied
tie / incomparability handling
scope and revision
```

Potential valuation dimensions include, without privilege:

```text
CPU-cycle count
wall-clock time / latency
peak memory
bytes read / written / transferred
allocation count
search nodes or states expanded
transition count
support-node / support-edge count
dependency count
proof-step or verification-obligation count
external tool / model / service call count
another explicitly supplied or derivable application metric
```

This list is illustrative and non-exhaustive. It intentionally favors quantities that can plausibly be represented, counted, derived, or measured for the system under study.

A valuation dimension need not be numeric; an application may supply a partial order, lexicographic preference, threshold constraint, or another explicit comparison rule.

DP MUST NOT invent a valuation quantity merely because a profile names it. A value used to rank alternatives must be one of:

```text
directly represented
mechanically derivable under a declared method
supplied as measured evidence with provenance
```

If a named valuation dimension cannot currently be evaluated, preserve it as unresolved and do not rank alternatives on that dimension.

DP does not assume distinct valuation dimensions are commensurable.

---

# 11. Valuation cannot redefine sufficiency

The constitutional ordering is:

```text
1. establish sufficiency
2. then value sufficient alternatives
```

Never:

```text
faster / smaller / cheaper / preferred
    ->
therefore sufficient
```

unless the declared objective itself explicitly permits a weaker result.

A valuation profile may rank or select among sufficient alternatives.

It may not silently change:

```text
inputs
semantic meaning
scope
precision
modality
unknown structure
identity assumptions
required behavior
transition obligations
correctness burden
```

to make an alternative appear better.

---

# 12. Multi-objective valuation and non-dominated alternatives

If several valuation dimensions are supplied but no complete preference ordering exists, DP MUST NOT invent one.

For example:

```text
A:
    less time
    more memory

B:
    more time
    less memory
```

with no governing priority may remain incomparable.

DP may preserve the set of alternatives not dominated under the supplied comparison rules. No special Pareto machinery is required unless the profile actually defines such an order.

A weighted scalar objective may be used only when its weights and combination rule are represented or pinned.

```text
missing preference
    != equal weights
```

```text
incomparable
    != tied
```

---

# 13. Valuation-guided implementation optimization as discovery

Implementation optimization is one possible DP application, not a universal IsoGraph objective.

After sufficient alternatives are established, DP may investigate questions such as:

```text
which sufficient topology minimizes declared cost?
which carried value could be derived on demand?
which precomputation costs more than the downstream work it avoids?
which optional accelerator has negative net value?
which repeated computation is already implied by available support?
which execution transition contributes no unique support?
which exact fallback makes an earlier bound nonessential?
```

The application must supply the relevant valuation dimensions plus enough evidence or derivation rules to evaluate them. DP may compute a quantity only when that computation is itself defined and supported.

DP should be able to conclude:

```text
semantically valid
but not preferred under this valuation
```

without reclassifying the valid structure as false or meaningless.

---

# 14. Derived residual classes and partitions

Mutually exclusive / collectively exhaustive classes are a high-value implicit-assertion search cue.

When governing authority establishes a partition:

```text
{A, B, C, ...}
```

discovery SHOULD test whether one class is a residual/complement of the others under the declared scope.

For a three-class exhaustive exclusive partition, for example:

```text
A?
    true -> A
    false -> B?
                 true -> B
                 false -> C
```

may be a sufficient classifier even though all three semantic classes remain represented.

The general lesson is:

```text
semantic class
    != independent detector

member of outcome space
    != independent information generator
```

This section does not grant classical logic or partition semantics merely from labels.

Mutual exclusion, exhaustiveness, and the relevant logic must be represented or supplied by pinned authority.

---

# 15. Interaction with Core 0.19 implicit assertions

Core 0.19 remains the authority for admitting implicit assertion support.

DP 0.8 may prioritize implicit-assertion discovery when sufficiency analysis would otherwise treat derived facts as independent.

The lawful sequence is:

```text
represented premises
+ pinned governing authority
    ->
candidate implicit assertion
    ->
Core 0.19 support validation
    ->
admitted implicit assertion
    ->
DP sufficiency / support analysis
```

Not:

```text
desired smaller topology
    ->
invent implicit assertion
    ->
declare removed support unnecessary
```

A reduction that depends on an invalid or circular implicit assertion is invalid.

---

# 16. Interaction with QU

If unresolved structure can change whether a support is sufficient, removable, substitutable, or preferred, that QU remains load-bearing.

DP MUST NOT choose a convenient realization merely to produce a smaller support graph.

Possible valid outcomes include:

```text
sufficient across every admissible realization
sufficient only under a represented refinement
sufficiency differs by realization
minimum support unresolved
valuation differs by realization
```

Where all admissible realizations preserve the same sufficiency relation, an exact invariant may be established under qualified QU authority.

---

# 17. Interaction with DTS

When support sufficiency depends on transition ordering, introduced/removed information, guards, boundary crossings, or mechanism anatomy, route the claim through DTS.

Two paths that reach the same state label may not be interchangeable if one violates a load-bearing transition obligation.

```text
same endpoint
    != same sufficient transition support
```

DP may project non-load-bearing DTS detail only under an explicitly declared view whose projection preserves the target obligation.

---

# 18. Interaction with NEI

Minimum sufficient support concerns support for a declared conclusion.

It does not itself establish natural identity.

Removing a representational distinction from one objective-scoped support graph does not establish that the represented objects are naturally the same.

Likewise, different sufficient topologies do not establish natural distinctness.

Route any natural/domain identity conclusion through NEI.

---

# 19. Search discipline

DP 0.8 adds no exhaustive optimizer requirement.

Prefer cheap high-information tests.

Useful priority cues include:

```text
derived assertion carried as independently recomputed state
multiple branches reconverging on the same target
fallback exact procedure after an optional precomputation
classification with represented exclusion/exhaustiveness
repeated bound computation whose consumer already has exact closure
duplicate support paths
expensive optional accelerator
large support cone with compact observable
one value affecting only a preference rather than correctness
one component output consumed locally but bypassable globally
```

A reasoner SHOULD consider the unchanged / no-additional-work alternative when it is admissible.

But:

```text
do nothing
    != automatically sufficient

apparent simplicity
    != established preference under the valuation profile

smallest-looking
    != minimum
```

Search may stop when additional alternatives have low expected information value relative to the active discovery objective.

Any minimum/optimum claim still carries the coverage burden for its declared candidate space and ordering.

---

# 20. Failure classification

When a sufficiency or valuation discovery fails, classify before changing representation.

Candidate failure classes include:

```text
target objective underspecified
consumer boundary too narrow
support cone incomplete
implicit assertion missed
implicit assertion invalid
hidden premise imported
partition/exclusion authority missing
QU dependency omitted
DTS dependency omitted
identity assumption imported
candidate removal changes result
candidate removal changes scope
candidate removal changes precision/modality
candidate removal changes admissible input domain
candidate substitution changes externally visible behavior
valuation dimension undefined
valuation evidence / derivation method missing
preference ordering missing
incomparable alternatives collapsed
local or sampled optimum mistaken for a minimum over the declared candidate space
cost model incorrect
implementation/measurement defect
actual load-bearing support
```

This list is discovery bookkeeping, not a new ontology.

---

# 21. Qualification targets

Before DP 0.8 promotion, fresh qualification should test at least:

1. **Implicit partition closure:** a blind case with mutually exclusive and collectively exhaustive alternatives exposes a residual class without an application-specific rule.
2. **Minimum-support positive:** a proper support subgraph establishes the same exact target under unchanged inputs, scope, and authority.
3. **Load-bearing negative:** removal of one apparently redundant relation changes the target and is rejected.
4. **Consumer-scope case:** a locally useful intermediate is discovered to be nonessential only after tracing an exact downstream fallback.
5. **Alternative sufficient topology:** multiple materially distinct sufficient subgraphs are preserved.
6. **Structural valuation:** a profile preferring fewer transitions selects accordingly without claiming universal superiority.
7. **Measured valuation reversal:** a different profile such as time, peak memory, bytes moved, or another supplied/derivable metric can prefer a topology with more transitions.
8. **Multi-objective incomparability:** absent a supplied tradeoff, non-dominated alternatives remain uncollapsed.
9. **Valuation/sufficiency firewall:** a cheaper but semantically weaker alternative is rejected for an exact objective.
10. **Input/scope firewall:** a smaller topology obtained by narrowing admissible inputs or scope is not called sufficient for the original objective.
11. **QU-sensitive sufficiency:** unresolved realizations prevent premature removal when sufficiency differs across admissible possibilities.
12. **DTS-sensitive sufficiency:** same endpoint does not erase a load-bearing transition difference.
13. **Implicit-support authority:** a familiar logical inference without represented/pinned authority remains a search lead, not admitted support.
14. **Logic-lens positive:** with appropriate authority, elementary consequence discovery expands the assertion graph before support minimization.
15. **No global erasure:** structure removable for one objective remains preserved semantically and available for another objective.
16. **Minimum-vs-minimal discipline:** a reasoner does not claim minimum from one irreducible candidate without coverage of the declared candidate space.
17. **Costed optional accelerator:** an optional accelerator is classified by net declared value rather than by mere causal connectedness.
18. **Real-world blind control:** an exact implementation topology with no optimization hint independently exposes a removable derived/optional path and preserves the original result.
19. **Anti-overfit control:** a superficially similar topology where the third branch carries unique information is retained.
20. **Full-stack boundary:** DP 0.8 composes correctly with current Core 0.19, QU 0.1, NEI 0.4, DP 0.1–0.7, and DTS 0.1 without importing their authority when not load-bearing.

Qualification should include blind cases in which the reasoner is not told:

- which support is removable;
- which valuation alternative should win;
- that a partition/complement pattern exists;
- that a real-world optimization opportunity is present.

The CPC no-draw case that motivated this revision may serve as one real-world positive control, but qualification MUST include unrelated domains and negative controls so success cannot be explained by learning a Connect4-specific rule.

---

# 22. Working summary

```text
Core represents faithfully.

Core 0.19 determines what implicit support may count.

Discovery asks what follows,
what is necessary,
what is sufficient,
what can be removed for this objective,
and what alternatives remain.

Sufficiency comes before valuation.

A value system is application-supplied.
DP does not privilege cycles, time, memory,
transition count, proof-step count, or any other metric.

Preserve multiple sufficient topologies
when the application does not rank them.

Do not optimize by mutating the problem.

Do not confuse a consumed value with a necessary value.

Do not confuse a semantic class with an independent detector.

Trace far enough downstream to the declared observable.

Represent the required semantics faithfully.
Discover sufficient support, and claim minimum only within a declared candidate space.
Then, and only then, prefer among sufficient alternatives.
```

DP 0.8 changes no Core primitive and no current qualified authority until independently tested, reviewed, and promoted.
