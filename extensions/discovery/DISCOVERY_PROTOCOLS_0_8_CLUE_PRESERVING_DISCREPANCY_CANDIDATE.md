# IsoGraph Discovery Protocols — 0.8 Clue-Preserving Discrepancy Adjudication Candidate

**Status:** unqualified normative successor candidate  
**Short name:** DP 0.8 candidate  
**Base authority:** qualified cumulative Discovery Protocols 0.1–0.7  
**Core dependency:** qualified Core 0.18 observation-first discrepancy clarification and Core 0.19 assertion-support / exact-rendering clarification  
**QU dependency:** qualified QU 0.1 whenever unresolved structure is load-bearing  
**NEI dependency:** qualified NEI 0.4 whenever natural/domain identity is load-bearing  
**DTS dependency:** qualified DTS 0.1 when transition anatomy is load-bearing  
**Growth rule:** adds no Core primitive, no universal error ontology, no privileged reference class, no mandatory external model, and no exhaustive anomaly-search requirement

DP 0.8 strengthens the observation-first discipline already qualified in Core 0.18 and DP 0.5.

> **When something appears not to work, the non-working behavior is evidence before it is a diagnosis.**

The apparent problem may be a genuine defect, a clue to hidden structure, both, or neither because two different valid things were being compared.

The protocol therefore keeps **repair disposition** and **discovery disposition** independent and forbids silently assigning the discrepancy to whichever side is less trusted, newer, less familiar, or less authoritative-looking.

All DP 0.1–0.7 behavior remains in force.

---

# 0. Constitutional barriers

Do not collapse:

~~~text
observation != diagnosis
discrepancy != defect
unexpected result != incorrect result
reference disagreement != represented-side error
agreement with expectation != proof of correctness
defect != no discovery value
successful repair != complete explanation
faithful representation != correctness of the represented thing
qualified authority != infallibility outside its qualified claim
large invalidation cone != automatically fragile design
small invalidation cone != automatically unimportant distinction
clue survives repair != proof clue is true
clue disappears after repair != proof no related structure exists
interesting anomaly != permission to avoid repairing a proved defect
~~~

---

# 1. Error/defect labels are provisional until owned

Words such as error, bug, defect, failure, bad result, wrong value, broken representation, bad reference, bad oracle, or bad implementation MUST NOT be treated as established semantic conclusions merely because a discrepancy appeared.

Before using such a label as an adjudicated fact, identify the violated contract and its owner.

Until then prefer observational descriptions such as:

~~~text
discrepancy observed
unexpected behavior
mismatch
unresolved contradiction
unsupported correspondence
unreconstructed result
~~~

This is not euphemism. It prevents a causal conclusion from being smuggled into the description of evidence.

---

# 2. Dual disposition for every material discrepancy

Maintain two independent questions.

## 2.1 Repair disposition

> Is there an established violation of an applicable contract, and where is the owner?

Illustrative bookkeeping outcomes:

~~~text
NO_REPAIR_ESTABLISHED
LOCAL_DEFECT_CONFIRMED
REPRESENTATION_DEFECT_CONFIRMED
IMPLEMENTATION_DEFECT_CONFIRMED
REFERENCE_DEFECT_POSSIBLE
AUTHORITY_GAP
SCOPE_MISMATCH
MULTIPLE_OWNERS_POSSIBLE
UNRESOLVED
~~~

These are bookkeeping labels, not new IsoGraph semantic statuses.

## 2.2 Discovery disposition

> Does the discrepancy expose a structural possibility worth preserving independently of repair?

Illustrative bookkeeping outcomes:

~~~text
NO_STRUCTURAL_LEAD
OPEN_STRUCTURAL_LEAD
STRUCTURE_ESTABLISHED
STRUCTURAL_LEAD_FALSIFIED
~~~

A confirmed defect may coexist with an open or established structural lead. A proved defect MUST NOT automatically close discovery.

---

# 3. The owner of a discrepancy is initially unresolved

When two paths disagree, DP MUST NOT assume in advance which side is wrong.

Possible owners or explanations include, as applicable:

~~~text
representation
decoder
implementation
scorer
test oracle
expected output
source artifact
source interpretation
external dataset
prior result
domain assumption
comparison scope
aggregation level
identity interpretation
authority/revision mismatch
missing dependency
unknown structure
both sides valid under different scopes
neither side because the compared quantities differ
~~~

No category is privileged merely because it is older, widely accepted, external, internal, formal, human-authored, machine-generated, or institutionally authoritative.

Authority still governs the exact claims it qualifies. It does not automatically settle broader interpretations or applications outside that claim.

---

# 4. Fidelity and correctness are separate questions

For any represented object, formula, model, specification, dataset, proof, implementation, source, or expected result, distinguish:

~~~text
FIDELITY:
    Did IsoGraph represent what the referenced object actually says or contains?

CORRECTNESS / COMPATIBILITY:
    Is that represented content itself correct, complete, consistent,
    or compatible with the other qualified evidence under the tested scope?
~~~

The first may be true while the second is false, incomplete, differently scoped, or unresolved.

A faithful IsoGraph rendering MUST NOT be edited merely to restore an expected conclusion.

If an exact rendering exposes an unsupported step, contradiction, failed implication, scope mismatch, impossible conjunction, or conflict with independently grounded evidence, preserve the discrepancy until the correct owner is established.

This rule is domain-neutral. A scientific result is only one possible example, just as a software specification, benchmark oracle, database entry, proof, test fixture, prior IsoGraph artifact, or human explanation is another.

---

# 5. Preserve the discrepancy before causal repair

DP 0.5 preservation remains mandatory.

DP 0.8 adds a counterfactual requirement for nontrivial cases: preserve enough pre-repair state to compare the structural observation before and after the minimum justified repair.

As applicable, retain:

~~~text
exact revision / input
observer / computation / reconstruction path
raw discrepancy
semantic quantity or relation
scope / view / factorization / layer
authority and provenance
QU state
NEI query context
dependency/support cone
candidate repair owner
candidate structural interpretations
~~~

The key question is:

> **What exactly did the system know when the unexpected behavior appeared?**

---

# 6. Branch competing explanations before repair

For a material discrepancy, generate the smallest useful set of competing explanations suggested by the observation.

Typical branches include:

~~~text
H_local:
    local representation/implementation defect

H_reference:
    reference/expectation side is wrong, incomplete, differently scoped,
    differently interpreted, or being asked to support too much

H_distinction:
    one assumed quantity actually contains multiple semantic quantities

H_equivalence:
    separately represented objects share a valid scoped equivalence

H_scope:
    both observations are valid under different scopes or layers

H_authority:
    required authority or closure is missing

H_unknown:
    unresolved structure can change the diagnosis

H_no_defect:
    no contract violation exists; the comparison itself was invalid
~~~

These are hypotheses, not fixed ontology.

Seek the cheapest evidence that can discriminate among the live hypotheses before committing to repair.

---

# 7. Clue-preserving repair

When a defect owner is established, use the **minimum causal repair** that restores the violated contract.

Do not simultaneously normalize neighboring discrepancies merely because they are inconvenient.

A repair record SHOULD identify:

~~~text
proved defect
defect owner
minimal change
which observations should change if diagnosis is correct
which observations are intentionally preserved
dependent claims requiring re-evaluation
~~~

After repair:

1. rerun the observation;
2. compare pre-repair and post-repair structure;
3. re-evaluate the discovery disposition independently.

This is **clue-preserving repair**.

---

# 8. Repair-invariance test

For clue H exposed by discrepancy D:

~~~text
freeze D
-> perform minimum justified repair R
-> rerun observation
-> compare H before and after R
~~~

Possible interpretations:

### 8.1 Clue disappears exactly with the defect

Evidence favors the clue being an artifact of that defect. Downgrade or falsify the lead if no independent support remains.

### 8.2 Clue survives repair

This strengthens the case that the clue is independent of the repaired defect. It does not prove the clue true.

### 8.3 Clue changes form but remains

The defect may have been masking or distorting a deeper distinction. Preserve both forms and identify what changed.

### 8.4 Clue becomes sharper after repair

Treat this as a high-value discovery signal. The repair may have removed noise rather than removed the phenomenon.

---


# 8A. Repair is also an intervention experiment

A minimum causal repair changes one identified variable or support region while preserving as much surrounding structure as possible.

That makes the repair useful not only operationally but diagnostically.

Record, where material:

~~~text
what was changed
what was held fixed
which discrepancies disappeared
which discrepancies survived
which new discrepancies appeared
which downstream claims changed
which downstream claims remained invariant
~~~

This supports a causal question:

> Was the repaired defect actually responsible for the structural phenomenon that drew attention?

A repair that removes the contract violation but leaves the structural pattern intact is evidence that the pattern has another cause or a broader support basis.

A repair that removes both exactly is evidence for a common cause.

Neither result is automatically conclusive; alternate dependencies may exist.

The repair should therefore be as narrow as practical when it is being used diagnostically.

---

# 9. Desired agreement is not a repair oracle

Forbidden pattern:

~~~text
reference / expected answer / prior conclusion says X

IsoGraph exposes not-X
or insufficient support for X

therefore edit IsoGraph until X reappears
~~~

A repair requires an independently established contract violation.

Valid repair evidence may include exact source mismatch, malformed native structure, broken scope/binding semantics, failed reconstruction, implementation behavior inconsistent with frozen semantics, mechanically falsified assertion, broken provenance, or violated qualified dependency.

Agreement with expectation is not by itself repair evidence.

---

# 10. Conflicting references are discovery objects

If two correctly represented references conflict, preserve both rather than silently choosing one.

Represent, as applicable:

~~~text
reference A support
reference B support
conflicting consequence
scope/revision of both
shared assumptions
different assumptions
unknown authority
dependency paths
~~~

Possible outcomes include one side wrong, both incomplete, different scopes, hidden assumptions, different models, translation mismatch, authority mismatch, or genuine unresolved contradiction.

Do not choose the more familiar or prestigious side merely because it is familiar or prestigious.

Do not infer equal credibility merely because both are represented. Adjudication remains evidence-sensitive.

---

# 11. Dependency invalidation is also evidence

When correction of one claim invalidates a downstream cone, preserve the propagation.

As useful, record:

~~~text
number of dependent claims
dependency depth
affected scopes/modules
alternate surviving support paths
claims that fail only because of one assumption
~~~

The shape of invalidation may reveal a hidden foundational assumption, overly central abstraction, duplicated dependence, missing alternate support path, unexpectedly strong invariant, or false equivalence inherited downstream.

Do not weaken propagation merely to reduce the blast radius.

---

# 12. Distinguish enforcement gaps from semantic gaps

Before inventing new semantics, ask:

1. Can current qualified semantics already represent the distinction?
2. Did tooling/application logic merely fail to enforce an existing rule?
3. Can a derived Discovery view preserve the clue?
4. Would an extension successor rule suffice?
5. Is new Core semantics actually necessary?

Prefer the narrowest repair that restores correctness without erasing discovery.

---

# 13. Promotion destinations

Route the result to the narrowest appropriate destination:

~~~text
local repair
tooling / validator improvement
derived Discovery view
extension successor candidate
Core successor candidate
~~~

Core escalation requires evidence that the distinction is genuinely foundational and cannot be represented faithfully through existing Core semantics plus qualified extensions and derived views.

Cross-domain recurrence raises priority but does not itself prove Core membership.

---

# 14. Cross-domain recurrence strengthens a clue

A clue observed once may be domain-specific.

A structurally corresponding clue that independently recurs across unrelated domains deserves increased discovery attention.

Ask whether the same hidden distinction, repair-invariance pattern, scope/authority boundary, dependency pattern, or support projection recurs.

DP 0.8 assigns no automatic truth or novelty score from recurrence.

---

# 15. Bounded investigation and fast paths

This protocol MUST NOT turn every typo into a research program.

Immediate repair is allowed when:

~~~text
contract is exact
owner is unambiguous
first divergence is established
no load-bearing semantic ambiguity remains
~~~

Use the deeper clue-preserving path when the discrepancy could affect identity, proof validity, scope, unknown structure, semantic equivalence, representation completeness, factorization, causality, provenance, an important external conclusion, or a broad dependency cone.

Stop when enough evidence exists to support the current dispositions.

Do not manufacture mystery after an ordinary defect is proved.

---

# 16. Falsification requirements

A discovery lead SHOULD identify what would weaken or kill it.

Examples:

~~~text
hidden distinction:
    exact authority proves the quantities identical under the disputed scope

reference-side problem:
    independent reconstruction locates a representation defect
    that fully explains the discrepancy

repair-independent clue:
    clue disappears exactly with minimum repair
    and no independent support remains

cross-domain pattern:
    proposed mapping fails a load-bearing primitive relation
~~~

This is not anomaly-preservation bias. It is a premature-closure prevention rule.

---

# 17. Evidence wording

Use wording proportional to evidence:

~~~text
observed discrepancy
confirmed defect
candidate reference conflict
open structural lead
repair-independent lead
cross-domain analogue
exact structural consequence
lead falsified
~~~

Avoid claiming a reference is wrong, an accepted result has been disproved, or an anomaly proves a new law until the corresponding burden is discharged.

---

# 18. Minimum discrepancy record

For a material discrepancy, a durable record SHOULD make recoverable:

~~~text
observation
frozen input/revision
semantic quantity/scope
authority/provenance
repair hypotheses
discovery hypotheses
QU/NEI dependencies where applicable
falsifiers
repair disposition
discovery disposition
minimum repair, if any
post-repair observation
repair-invariance result
dependency impact
promotion destination
~~~

This can be one compact record or references to existing artifacts.

---

# 19. Qualification targets

Before DP 0.8 may be promoted, fresh adversarial qualification should include at least:

1. plain mechanical defect takes the fast repair path;
2. semantic defect with no surviving clue is repaired and closed;
3. defect plus surviving structural clue keeps both dispositions;
4. minimum repair makes a clue sharper;
5. hidden distinction with no defect avoids false repair;
6. hidden scoped equivalence does not become global identity;
7. exact rendering disagrees with an expected conclusion and the expected side is not privileged automatically;
8. false reference challenge is traced to a rendering defect and withdrawn;
9. trusted/long-standing reference pressure does not replace evidence;
10. correct-reference control locates the IsoGraph-side defect;
11. two faithfully represented references conflict and both remain available pending adjudication;
12. missing authority remains incomplete rather than normalized into agreement;
13. QU-sensitive diagnosis preserves unresolved realizations;
14. identity-sensitive diagnosis does not infer SAME from absence of difference;
15. large invalidation cone propagates rather than being suppressed;
16. repair-invariance positive case preserves a surviving clue;
17. repair-invariance negative case downgrades/falsifies a disappearing clue;
18. cross-domain recurrence is investigated without inventing one ontology;
19. useful derived view remains outside Core when existing semantics already represent it;
20. interesting-looking anomaly with no surviving support is closed as ordinary error;
21. proposed patch justified only by restoration of expected output is rejected;
22. blind mixed cases where the reasoner is not told whether the correct disposition is bug, clue, both, or neither.

---

# 20. Working protocol

~~~text
OBSERVE
    preserve the discrepancy

ALIGN
    determine quantity / scope / layer / authority

BRANCH HYPOTHESES
    local defect?
    reference-side problem?
    hidden distinction?
    hidden equivalence?
    authority gap?
    unknown structure?
    invalid comparison?
    other?

SEPARATE DISPOSITIONS
    repair question
    discovery question

FALSIFY
    seek discriminating evidence

REPAIR MINIMALLY
    only after defect owner is established

RERUN
    compare pre/post repair

ASK WHAT SURVIVED
    clue disappeared?
    survived?
    changed?
    sharpened?

PROPAGATE
    re-evaluate dependencies honestly

ROUTE
    local repair?
    validator?
    derived DP view?
    extension candidate?
    Core candidate?

PRESERVE
    historical evidence and surviving clue
~~~

---

# 21. Constitutional summary

~~~text
A failure is evidence before it is a diagnosis.

A defect can also be a clue.

The owner of a discrepancy is not preassigned.

A successful repair does not erase discovery value.

A faithful representation is allowed to challenge what it represents.

Expected agreement is not a repair oracle.

Repair only an established defect owner.

After repair, ask what survived.

Do not repair away a clue.

Do not romanticize ordinary errors.

Let discrepancies remain measurement channels until evidence closes them.
~~~

DP 0.8 changes no current qualified Discovery Protocol authority until independently tested, reviewed, and promoted.
