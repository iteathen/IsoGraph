# IsoGraph Discovery Protocols — 0.7 Primitive-First Derived Structural Views Candidate

**Status:** unqualified normative successor candidate  
**Short name:** DP 0.7  
**Base dependencies:** DP 0.1, DP 0.2, DP 0.3, DP 0.4, DP 0.5, and DP 0.6  
**Core dependency:** current qualified Core 0.17 + Core 0.18 observation-first clarification; when source formulas are newly rendered for a DP 0.7 campaign, this branch additionally requires Core 0.19 exact source-rendering section 18 before the rendering may serve as source-faithful discovery evidence  
**Identity dependency:** qualified NEI 0.4 only when a discovery conclusion actually relies on natural/domain identity or distinctness  
**QU dependency:** qualified QU 0.1 whenever unresolved structure is load-bearing for a derived view or comparison  
**DTS dependency:** qualified DTS 0.1 only when a discovery conclusion depends on detailed transition anatomy  
**Development note:** this candidate may be tested alongside unqualified Core 0.19 implicit-assertion work, but does not require Core 0.19 for its base meaning  
**Growth rule:** adds no Core primitive, parser syntax, structural relation, identity result, fixed high-level ontology, mandatory abstraction taxonomy, mandatory search algorithm, or exhaustive pattern catalogue

DP 0.7 extends DP 0.5 sections 8-9:

- derived versus explicit structure;
- minimal generating structure as a discovery question.

Its purpose is to protect IsoGraph's primitive-first discovery behavior when agents construct useful higher-level descriptions of represented structure.

The governing rule is:

> **Higher-level structural concepts are recoverable views over primitive IsoGraph structure. They do not replace, strengthen, or alter the primitive structure from which they are derived.**

All DP 0.1-0.6 behavior remains in force.

---

# 0. Interpretation barriers

Do not collapse these distinctions:

```text
primitive construction
    != high-level label

derived structural view
    != new Core primitive

same high-level label
    != same primitive structure

different high-level labels
    != different primitive structure

recognizable pattern
    != semantic proof authority

useful abstraction
    != canonical factorization

compressed description
    != lossless primitive representation

view correspondence
    != structural isomorphism

structural isomorphism
    != NEI SAME

structural mismatch
    != NEI DISTINCT

cycle
    != automatically recursion

recursion
    != automatically loop

represented exit
    != exit necessarily reached

recurrent edge
    != progress
    != convergence
    != termination

unknown unfolding
    != permission to invent an unfolding
```

These barriers are normative.

---

# 1. Primitive-first discovery

IsoGraph discovery should move upward in abstraction only after the relevant source structure has been represented exactly at the primitive/qualified-leaf level required by the applicable rendering claim.

For newly authored source-formula renderings under this branch:

```text
primitive-first
    presupposes
exact source-to-native rendering qualification
```

A role graph, dependency skeleton, heuristic decomposition, lossy projection, or sidecar-completed formula may be explored as an explicitly partial artifact, but it MUST NOT serve as source-faithful evidence for a DP structural/isomorphism claim.

DP does not repair or complete an inadequate source rendering.

```text
rendering correctness
    precedes
discovery correctness
```

Preferred direction:

```text
source structure
    ->
primitive IsoGraph construction
    ->
structural comparison / discovery
    ->
derived higher-level view
```

Do not substitute:

```text
source terminology
    ->
high-level label
    ->
label comparison
```

for primitive structural comparison.

A source term such as:

```text
recursion
feedback
loop
proof
algorithm
state machine
cause
symmetry
equilibrium
closure
```

may guide where to inspect, but the term itself is not structural authority.

---

# 2. Derived structural views

A **derived structural view** is a recoverable higher-level interpretation of already represented primitive structure under declared scope and semantic authority.

Examples may include views such as:

```text
recurrence
loop
recursive structure
mutual recurrence
fixed-point-shaped structure
entry/exit organization
feedback organization
branching
pipeline
proof dependency
state-machine phase
conservation pattern
quotient pattern
```

This list is illustrative and non-exhaustive.

A derived view is not admitted merely because an agent recognizes a familiar concept.

It SHOULD preserve, as applicable:

```text
primitive support cone
scope / boundary
governing semantic authority
QU dependencies
DTS dependencies
identity dependencies
provenance
loss / projection declarations
alternative competing views
```

The view remains reconstructable from its support.

---

# 3. Labels do not define structure

A high-level label may describe a structure after the structure is established.

The label MUST NOT be used as the reason the structure exists.

For example:

```text
source says "recursive"
    != proof of recursive structural correspondence

source says "feedback"
    != proof that two feedback-labeled systems share a structure

source says "fixed point"
    != permission to import a fixed-point theorem
```

Likewise, differing vocabulary must not block primitive comparison.

```text
system A calls pattern "recursion"
system B calls pattern "iteration"
system C calls pattern "feedback"

different names
    != structural difference
```

DP should compare the represented construction before deciding whether the named concepts correspond.

---

# 4. Derived views are not exclusive taxonomies

DP MUST NOT force structurally rich systems into one exclusive high-level category unless the applicable authority actually requires exclusivity.

The same primitive structure may support several simultaneously valid views under different scopes.

For example:

```text
cyclic
AND recurrent
AND recursive under one execution authority
AND fixed-point-shaped under another mathematical view
```

may all be legitimate descriptions.

Conversely, two structures sharing one high-level label may differ materially at the primitive level.

DP should preserve overlapping or competing views when they are structurally supported.

---

# 5. Comparison order

When looking for structural correspondence between systems, prefer this order:

```text
1. align primitive representation scope
2. preserve unresolved distinctions / QU
3. compare primitive relational construction
4. identify candidate structural correspondence
5. derive useful higher-level common views
6. qualify stronger identity/equivalence claims under the proper authority
```

Do not reverse this by first asserting a common high-level class and then forcing the primitive structures to fit it.

A high-level view may suggest a comparison, but it cannot define the comparison result.

---

# 6. Minimal generating structure remains a discovery question

DP 0.5 section 9 remains in force.

DP 0.7 adds:

A higher-level description may expose a smaller or cleaner generating structure, but that description does not authorize deletion of explicit primitive relations.

If a derived view appears to compress the representation:

```text
explicit primitive structure
    ->
candidate generating pattern
```

determine whether the relationship is:

```text
exact reconstruction
lossy projection
scoped quotient
partial factorization
correlation
heuristic summary
unknown
```

before treating the higher-level view as a substitute.

Canonical minimality still requires its own authority/evidence.

---

# 7. Recurrence as an illustrative derived view

Recurrence is an important example because high-level vocabulary can easily obscure primitive common structure.

DP may derive a recurrence-oriented view from primitive relations that, under the applicable authority, expose roles such as:

```text
entry relation(s)
continuation / re-entry relation(s)
carried state or argument relations
external relations entering during continuation
exit relation(s)
branching alternatives
unresolved continuation structure
```

These role names are a derived view.

They are not mandatory Core primitives.

The represented internal structure may itself contain:

```text
loops
recursion
mutual recursion
branching
nested recurrence
fixed-point behavior
additional recurrence
arbitrary non-recurrent structure
```

DP MUST NOT require one fixed recurrence grammar.

---

# 8. Graph shape alone does not determine recurrence semantics

A cycle in primitive structure does not, by graph shape alone, establish:

```text
recursion
iteration
feedback control
new invocation
new occurrence
fixed-point semantics
termination behavior
```

Those interpretations require the relevant semantic authority.

Similarly:

```text
same node revisited
new occurrence of same schema
same semantic state
same storage occurrence
same natural object
```

must not be collapsed merely because a diagram appears cyclic.

Use Core scope/identity structure and NEI when natural identity is actually at issue.

---

# 9. Unfolding need not be materialized

A recurrent/recursive structure may be represented faithfully without materializing every possible iteration, invocation, or unfolding.

Where the primitive construction plus governing authority establishes a recurrent schema, a derived view may describe its unfolding compactly.

Possible unfolding status may include, as appropriate:

```text
known finite
finite with unknown count
bounded but unresolved
branching with unresolved shape
unbounded
possibly nonterminating
coinductive/productive
other authority-defined form
```

DP 0.7 introduces none of these as universal Core statuses.

Use the applicable authority and QU when the distinction is load-bearing.

---

# 10. QU preserves unresolved unfolding structure

When the number, shape, termination, branch choice, recurrence depth, external feed, or other unfolding property is unresolved and matters to the discovery claim, preserve it through QU.

Examples:

```text
QU over admissible recurrence counts

QU over admissible unfolding trees/graphs

QU over which external input appears at which occurrence

QU over whether an exit is ever reached

QU over which recurrent branch is taken
```

Do not replace an unresolved unfolding with a convenient representative merely to make two structures align.

If every admissible realization preserves the same derived structural property, that invariant may be established under the applicable QU authority.

---

# 11. Exit, progress, convergence, and termination remain separate

A derived recurrence view may contain an exit relation without establishing that the exit is reachable or reached.

```text
exit represented
    != termination established
```

A recurrence/re-entry relation does not itself establish:

```text
progress
strict decrease
convergence
termination
productivity
bounded depth
```

Those require their own represented support or semantic authority.

This preserves Core 0.17 section 20's requirements for recursive/fixed-point definitions where applicable.

---

# 12. Primitive correspondence can precede conceptual correspondence

DP should remain open to discovering that two systems share primitive organization before any common domain concept is known.

Example shape:

```text
System A primitive construction
        \
         -> structural correspondence
        /
System B primitive construction

only afterward:
    "both admit the same recurrence-oriented derived view"
```

This direction is preferred over injecting a common concept before comparison.

The purpose is to make domain vocabulary less able to hide or manufacture isomorphism.

---

# 13. Derived views may themselves become discovery inputs

Once a derived view is established with recoverable primitive support, DP may use that view as a convenience layer for further discovery.

However:

1. the primitive support remains authoritative;
2. the view's declared loss/projection scope remains attached;
3. the view MUST NOT gain stronger semantics merely through repeated reuse;
4. later comparison SHOULD descend back to primitive support when the derived abstraction could hide a material distinction.

Thus:

```text
primitive structure
    ->
derived view
    ->
higher-order comparison
```

is permitted.

But:

```text
derived view
    ->
forgotten primitive support
    ->
self-confirming abstraction
```

is not.

This is especially important in recursive Project Discovery passes.

## 13.1 Exact correspondence promotion gate

A derived or familiar common view may nominate a candidate correspondence.

It MUST NOT, by itself, promote that candidate to an exact structural witness.

Before DP emits or promotes any claim equivalent to:

```text
EXACT_WITNESS
exact structural correspondence
structural isomorphism
exact reconstruction
exact equivalence
```

the comparison MUST descend back to the authoritative primitive/qualified-leaf support on both sides.

For an exact claim, item 4 above is therefore strengthened from `SHOULD` to `MUST`.

The exact-witness audit MUST:

1. freeze the candidate mapping/transformation before checking it;
2. enumerate every load-bearing represented assertion needed by the claimed correspondence on both sides;
3. map or transform each such assertion using only represented structure and explicitly applicable qualified semantic authority;
4. reconstruct the supported B-side structure from A under the candidate transformation;
5. reconstruct the supported A-side structure from B under the inverse transformation;
6. check represented domains/ranges, scope, binding, arity, operator role, ordering where material, sign/coefficient/value distinctions, exact/approximate status, and other load-bearing distinctions;
7. preserve and explicitly account for representation-only residuals, additive constants, auxiliary coordinates, projections, quotients, or other non-identical structure rather than declaring them absent;
8. attempt local falsification against represented distinctions that would fail if the candidate mapping were merely familiar rather than exact;
9. refuse semantic repair toward a familiar target when the represented candidate mapping fails.

The governing shape is:

```text
primitive/qualified support A
    -> candidate transformation T
    -> reconstructed B'

primitive/qualified support B
    -> inverse transformation T^-1
    -> reconstructed A'

exact promotion requires:
    B' structurally same as represented B
    A' structurally same as represented A
    zero unresolved load-bearing difference
```

This is a structural correspondence qualification rule, not an NEI natural-object identity result.

If any load-bearing obligation is missing, false, unsupported, or unresolved:

```text
candidate / partial / scoped witness
    MAY remain

EXACT_WITNESS
    MUST NOT be promoted
```

Use QU when the unresolved structure is genuinely unknown and load-bearing.

A high-level recognition that survives only by skipping this descent is evidence of a candidate view, not evidence of exact isomorphism.

---

# 14. Interaction with implicit assertions

When Core 0.19 or another qualified future assertion-support authority is in use, an implicit assertion may expose a derived structural view or may itself become part of that view's support.

DP 0.7 does not determine whether the implicit assertion is valid.

```text
DP:
    where / what structure to investigate

assertion-support authority:
    what derived assertion is actually established
```

A desired high-level view MUST NOT be used as a hidden premise to manufacture the implicit assertions needed to support that same view.

---

# 15. Interaction with DTS

When a derived view depends on transition anatomy rather than only state/relational structure, route the analysis through DTS.

For example, two recurrent structures may share:

```text
state correspondence
```

while differing in:

```text
transition decomposition
ordering
boundary crossing
introduced/removed information
evidence lineage
```

A high-level recurrence label must not erase those DTS distinctions.

---

# 16. Failure classification

When a derived-view comparison fails or disagrees, classify the failure before changing primitive representation.

Candidate failure classes include:

```text
primitive source representation incomplete
primitive scope mismatch
derived-view support incomplete
derived-view scope mismatch
label-driven bias
taxonomy lock-in
lossy abstraction treated as exact
unknown unfolding collapsed
identity/occurrence distinction collapsed
transition anatomy omitted
false common abstraction
false negative caused by domain vocabulary
implementation/decoder defect
exact-witness support audit skipped or incomplete
actual structural difference
```

This list is discovery bookkeeping, not a new ontology.

---

# 17. Qualification targets

Before DP 0.7 promotion, fresh qualification should test at least:

1. **Same primitive pattern, different labels:** differently named domain structures are recognized as structurally corresponding without label assistance.
2. **Same label, different primitive structure:** two systems both called "recursive" are not forced into correspondence when their primitive constructions differ.
3. **Loop plus recursion:** a mixed recurrent structure is faithfully represented without requiring one exclusive taxonomy.
4. **Mutual/branching recurrence:** derived views tolerate multiple re-entry paths, multiple exits, and nested structure.
5. **Unknown finite unfolding:** QU preserves unresolved recurrence count without inventing a count.
6. **Unknown branching/unfolding shape:** QU preserves a non-scalar unfolding possibility space.
7. **Possible nontermination:** represented exit structure does not become a false termination claim.
8. **Cycle that is not recursion:** a cyclic primitive graph is not automatically labeled recursive.
9. **Multiple valid views:** one primitive construction supports several higher-level descriptions without semantic conflict.
10. **Lossy abstraction:** a convenient higher-level summary is prevented from masquerading as exact primitive reconstruction.
11. **Primitive-first isomorph discovery:** two disparate systems expose a structural match at primitive level that would be obscured by their domain vocabulary.
12. **False high-level match control:** shared terminology does not overcome a real primitive mismatch.
13. **Derived-view recursion:** an established derived view can participate in a later discovery pass without losing its primitive provenance.
14. **QU invariant:** a structural property shared across all admissible unfoldings may be established without selecting one realization.
15. **DTS-sensitive case:** state-level recurrence similarity does not erase material transition-level differences.
16. **Identity-sensitive case:** structural correspondence is not promoted to NEI SAME without identity authority.
17. **Exact-witness support closure:** a familiar or useful common view cannot be promoted to an exact witness until the candidate transformation closes bidirectionally against all load-bearing primitive support, including distinction-sensitive local falsification.

Qualification should include blind cases where the discovery reasoner is not told the expected high-level category.

---

# 18. Working summary

```text
Represent downward.
Discover upward.

Primitive structure comes first.

High-level concepts are derived views,
not substitutes for primitive construction.

Labels may guide attention.
They do not define structure.

Different labels may hide the same structure.
The same label may hide different structures.

A derived view can be useful without becoming Core ontology.

Recurrence, loop, recursion, feedback, and fixed-point language
are examples of recoverable interpretations,
not mandatory primitive categories.

Unknown unfolding remains unknown.

Exit does not imply termination.
Recurrence does not imply progress or convergence.

When abstraction may hide a material distinction,
descend back to primitive support.

Discovery should expose common structure;
it should not manufacture common structure.
```

DP 0.7 changes no Core primitive or qualified discovery authority until independently tested, reviewed, and promoted.
