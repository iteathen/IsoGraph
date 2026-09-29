# IsoGraph Discovery Protocols — 0.10 Experimental Warrant Candidate

**Status:** unqualified normative successor candidate  
**Short name:** DP 0.10  
**Base successor:** DP 0.9 Minimum Sufficient Support / Valuation; DP 0.10 may be promoted only after the exact DP 0.9 revision it extends is qualified  
**Core dependency:** current qualified cumulative Core through 0.20  
**QU dependency:** qualified QU 0.1 whenever represented known-unknown structure is load-bearing  
**DTS dependency:** qualified DTS 0.1 whenever transition anatomy or structural-event alignment is load-bearing  
**NEI dependency:** qualified NEI 0.4 only when natural/domain identity is load-bearing  
**Experimental consumer:** Experimental Inquiry 0.1 or another separately versioned experimental module  
**Growth rule:** adds no Core primitive, no truth status, no universal experiment ontology, no mandatory hypothesis language, and no experiment executor

DP 0.10 fills one discovery gap:

> **Discovery may establish that existing represented evidence is insufficient for the active question yet sufficiently structured that generating new observations is justified.**

That conclusion is an **Experimental Warrant**.

A warrant authorizes experimental inquiry. It does not establish the truth of a hypothesis and does not claim that the current model already contains the right variables, scope, hypotheses, or output vocabulary.

All qualified predecessor Discovery Protocol behavior remains in force.

---

# 0. Constitutional barriers

Do not collapse:

```text
warrant to experiment
    != support for a hypothesis

warrant
    != proof

warrant
    != complete hypothesis set

warrant
    != complete experimental scope

warrant
    != complete output vocabulary

warrant
    != proof that all relevant dimensions are represented

structured unknown
    != unrepresented possible structure

deferred dimension
    != excluded dimension

omission from one experiment
    != irrelevance

narrow negative result
    != falsification of a broader parent clue

experiment rationale
    != semantic premise

useful experimental variable
    != Core primitive

unexpected observation
    != noise

model break
    != observation defect
```

These barriers are normative.

---

# 1. Mission

DP 0.10 decides whether active generation of new observations is justified by the current represented evidence.

The ordinary sequence is:

```text
represented structure
+ admitted implicit assertions
+ residuals / discrepancies / QU / DTS structure
+ current discovery state
    ->
assess whether represented reasoning can materially advance the question
    ->
if not, assess whether a lawful new observation could
    ->
Experimental Warrant or NO_WARRANT
```

DP 0.10 does not design or execute the experiment.

---

# 2. Warrant conditions

An Experimental Warrant requires all of the following:

1. **Material unresolved demand.** A live question, clue, residual, discrepancy, structured unknown, failed closure, missing role, or unresolved interaction matters to the active discovery objective.
2. **Current represented insufficiency.** Existing represented reasoning does not already discharge the material question under the applicable authority.
3. **Observation leverage.** At least one class of lawful new observations has a recoverable reason to distinguish, refine, characterize, or reconstruct the unresolved structure.
4. **Recoverable rationale.** The reason to experiment is traceable to represented evidence or a gap exposed by represented evidence.
5. **No hidden-answer dependence.** The warrant does not depend on importing the result the experiment is intended to discover.
6. **Scope honesty.** The warrant records what is known about scope and what remains open rather than pretending the experiment space is complete.

If these are not satisfied, DP should return no warrant or preserve the question as unresolved.

```text
interesting question
    != automatic warrant

available compute
    != warrant

possible parameter sweep
    != warrant
```

---

# 3. Warrant record

A warrant is a discovery record over ordinary IsoGraph structure. It is not a new Core substrate.

A warrant SHOULD preserve, when applicable:

```text
active discovery objective
established anchors
parent clue / parent discrepancy / parent residual
admitted implicit assertions used
known invariants
unexplained residuals
known structural gaps
QU topology and refinement history
DTS transition/boundary structure
suspected ingredients or roles
known interactions
known or suspected outputs
known exclusions
scope evidence
deferred live dimensions
explicit open questions
prohibited information sources
reason represented reasoning is presently insufficient
reason new observations could materially advance the model
required authority boundaries
provenance
```

The record may be partial. Missing fields are not silently interpreted as empty or false.

---

# 4. Scope frontier

DP 0.10 must not require the correct experimental scope to be known in advance.

It may preserve an evolving **scope frontier** using operational bookkeeping such as:

```text
anchored
candidate
interaction
gap-derived
control
deferred
excluded
open / not-yet-modeled
```

These labels are illustrative discovery metadata, not a new semantic ontology.

Two rules are mandatory:

> **Experimental narrowing must be supported.**

and:

> **Omission is not exclusion.**

A narrow intervention may be warranted when evidence supports that narrowing. Otherwise the warrant must preserve the broader or interacting scope.

---

# 5. QU boundary

QU continues to represent sufficiently characterized known-unknown structure and admissible realization families.

DP may use QU topology as warrant evidence, including:

```text
known/unknown interfaces
coupled unknowns
invariants across admissible realizations
refinement history
repeated closure blockers
corresponding unresolved regions
constraints defining the shape of a gap
```

But:

```text
QU topology
    -> may justify experimental attention

QU topology
    != experiment choice by itself

warrant
    != selecting a QU realization
```

If a proposed warrant depends on one convenient realization while qualified QU retains several, the warrant is invalid at that scope.

---

# 6. Open-world model incompleteness

QU cannot represent an unknown dimension that has not yet been characterized enough to enter the possibility model.

DP 0.10 therefore distinguishes:

```text
represented known structure
    -> ordinary IsoGraph

structured known-unknowns
    -> QU

possible relevant structure not yet modeled
    -> open-world model incompleteness
```

Open-world model incompleteness is discovery/experimental metadata only.

It:

- supplies no semantic premise;
- is not a special QU realization;
- receives no invented probability;
- is not evidence for any specific missing structure;
- prevents the current working model, QU set, hypothesis set, scope, or output vocabulary from being treated as complete without independent completeness authority.

A model-breaking observation may therefore justify reopening scope without weakening QU semantics.

---

# 7. Experimental purposes

A warrant may identify one or more broad purposes:

## 7.1 Discriminating

Several live explanations already exist and a new observation could distinguish them.

## 7.2 Characterizing

A phenomenon is supported but its variables, dimensionality, boundary, interactions, or invariants remain insufficiently characterized.

## 7.3 Constructive / model-discovery

The represented pieces do not close. A lawful observation could test a candidate bridge, missing dependency, decomposition, dimension, coupling, or boundary structure.

The purpose is descriptive of the experimental need, not proof of the answer.

---

# 8. Gap-directed invention

DP 0.10 must not require every candidate experimental dimension to be named directly by an existing clue.

A prospective variation may be warrant-relevant when its rationale comes from:

```text
direct clue support
unexplained residual
missing dependency
failed closure
constrained QU boundary
unfilled structural role
required bridge between known pieces
interaction suggested by evidence
control needed to interpret another intervention
observation intended to detect whether another dimension exists
```

The governing rule is:

> **Every introduced experimental direction needs a recoverable discovery rationale.**

This permits gap-directed invention without arbitrary fishing.

---

# 9. Structurally meaningful alignment

Literal time, depth, step count, or iteration count is not always the correct comparison boundary.

When evidence indicates corresponding structural events, DP may warrant comparison at those events.

Examples include:

```text
same boundary role
same discharged obligation
same transition interface
same residual frontier
same structurally defined phase boundary
```

If alignment depends on transition anatomy, DTS owns the semantic transition facts.

A proposed alignment discovered after looking at outcomes remains exploratory. If it becomes load-bearing for a conclusion, preserve its post-hoc provenance and obtain fresh confirmation or independent support appropriate to the claim.

```text
useful post-hoc alignment
    != pre-registered confirmatory evidence
```

---

# 10. Negative evidence and coverage

A failed experiment may falsify only what the tested scope actually covers.

A warrant or downstream experimental record should preserve:

```text
parent clue
tested scope
coverage relation
what the proposed observation could adjudicate
what would remain live even after a negative result
```

Therefore:

> **Failure of a narrow intervention does not falsify a broader parent clue unless that intervention was independently sufficient to test the broader clue.**

This rule composes with DP 0.8 clue-preserving discrepancy handling.

---

# 11. Adaptive evidence firewall

Exploratory adaptation is allowed, but evidence lineage must remain explicit.

If an observation is used to:

- invent a variable;
- choose a boundary;
- select an interaction;
- reshape the experimental model;
- choose the next intervention;

then that observation is **adaptive discovery evidence** for the resulting model.

It may still be valid evidence, but it must not be silently reused as if it were an untouched confirmatory holdout for the same newly selected structure.

When a claim requires confirmation beyond exploratory discovery, use fresh observations, independently fixed controls, or another qualified source appropriate to the claim.

---

# 12. Warrant stopping discipline

DP should issue or renew a warrant only while:

```text
a material unresolved clue/gap remains
AND
a proposed class of observation has a recoverable reason
to materially change or refine the working model
```

No warrant is justified merely to continue searching because more combinations exist.

DP 0.9 valuation may be used, once qualified and applicable, to compare lawful experimental alternatives. It does not make minimum-cost experimentation constitutional.

---

# 13. Authority ownership

```text
Core:
    exact semantic admission / primitive support

DP 0.10:
    whether active experimentation is warranted

Experimental Inquiry:
    construction and revision of experiments / working experimental model

QU:
    represented structured known-unknowns

DTS:
    transition anatomy and transition-sensitive alignment

Core 0.19 IA:
    admission of derived assertion support

NEI:
    natural/domain identity
```

The warrant itself proves none of these downstream conclusions.

---

# 14. Qualification targets

Before promotion, fresh blind qualification must test at least:

1. no warrant when represented reasoning already closes the question;
2. warrant from partial but coherent evidence;
3. QU topology used without realization selection;
4. open-world incompleteness retained even with detailed QU;
5. scope discovery rather than predeclared complete variables;
6. justified narrow scope;
7. preservation of broad/interacting scope where required;
8. deferred dimension not treated as excluded;
9. gap-derived experimental direction;
10. unexpected/model-breaking observation anticipated as a reason to reopen scope;
11. narrow negative result limited to demonstrated coverage;
12. structurally meaningful boundary alignment;
13. post-hoc alignment provenance preserved;
14. adaptive discovery evidence not silently reused as untouched confirmation;
15. anti-randomness stopping discipline;
16. no hypothesis-truth claim from the warrant itself;
17. correct Core/QU/DTS/NEI routing;
18. cross-domain controls sufficient to rule out Connect4-specific memorization.

---

# 15. Working summary

```text
Represent what is known.
Preserve what is structured but unresolved.
Admit what follows under authority.
Ask whether represented reasoning is enough.

If not:
    identify the material gap
    identify why a new observation could matter
    preserve open scope honestly
    issue a warrant only with recoverable rationale

Warrant:
    permission to inquire
    not permission to believe.
```

DP 0.10 changes no current qualified authority until its exact revision is independently qualified and the affected integrated stack is requalified.
