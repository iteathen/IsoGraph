# IsoGraph Discovery Protocols — 0.2 Candidate

**Status:** unqualified normative correction candidate  
**Short name:** DP 0.2  
**Base dependency:** `extensions/discovery/DISCOVERY_PROTOCOLS_0_1_CANDIDATE.md`  
**Core dependency:** `CORE_SPEC_DRAFT_0_17_CONSOLIDATED_QUALIFIED.md` or an exact qualified bridge  
**Identity dependency:** `extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_1_CANDIDATE.md` or an exact qualified bridge when a discovery branch uses natural identity as a distinction test  
**QU dependency:** `extensions/qu/QUANTIFIABLE_UNKNOWN_SPEC_0_1_CANDIDATE.md` or an exact qualified bridge when unresolved identity-relevant or structural alternatives matter  
**Evidence motivating this revision:** `experiments/006/EXPERIMENT_006_RUN_Q006_REVIEW.md` and `experiments/006/RUN_Q006_DECOMPOSITION_REPLAY.md`  
**Growth rule:** adds no core syntax, comparison relation, identity primitive, proof rule, mandatory solver, or semantic authority

DP 0.2 is a correction layer over DP 0.1. All DP 0.1 rules remain in force except where this document explicitly replaces, strengthens, or reroutes them.

The principal correction is:

> **A representationally different residual is not yet a natural distinction and is not, by itself, a stopping condition.**

When two regions occupy corresponding load-bearing roles, DP must recursively decompose the residual and, where the apparent distinction may be representational, use NEI to test whether the distinction itself is justified before treating it as a separator.

---

# 0. Constitutional additions

DP 0.2 adds the following interpretation barriers:

```text
different SI
    != natural distinction

different factorization
    != natural distinction

different mathematical machinery
    != natural distinction

different implementation
    != natural distinction

different source vocabulary
    != natural distinction

residual
    != terminal divergence

failed literal isomorphism
    != failure of higher-level role correspondence

role correspondence
    != NEI SAME

absence of NEI DISTINCT evidence
    != NEI SAME

NEI UNKNOWN / incomplete identity authority
    != permission to terminate on the apparent distinction
```

DP remains a discovery module. It does not gain identity authority from this revision.

NEI is used here as a **distinction audit**:

```text
DP proposes that two represented regions may realize one load-bearing role
    -> NEI asks whether their apparent difference is a justified natural distinction
    -> the NEI result constrains discovery routing
```

NEI truth conditions remain entirely governed by NEI.

---

# 1. RUN-Q006 failure model

RUN-Q006 found a high-level common proof shell and then classified the intermediate mechanisms as divergent residuals. The manual replay showed that the unmatched middle contained a deeper common structure that appeared only after factorization by role.

The failure had four interacting causes:

1. literal boundary objects were compared before boundary roles were decomposed;
2. local encodings were left at formulation-specific surface form;
3. obstruction nodes were aligned by proximity to the final contradiction rather than by proof role/dependency position;
4. once the middle was called a residual, residual status was allowed to terminate recursion before an identity/distinction audit.

DP 0.2 corrects all four.

---

# 2. Cross-Residual Decomposition Gate

## 2.1 Trigger

A **cross-residual decomposition gate** is mandatory when all of the following are true:

1. a nontrivial correspondence has already been found on both sides of a residual region;
2. the residual lies on a load-bearing dependency path between those matched regions;
3. the residuals differ materially in vocabulary, factorization, implementation, proof method, representation, or local object type;
4. no qualified natural distinction has yet been established that explains why the residuals must remain distinct.

Canonical shape:

```text
matched upstream role
        |
        v
 [residual region A]      [residual region B]
        |                        |
        v                        v
matched downstream role / obligation
```

This configuration is positive evidence that the residuals deserve another decomposition pass. It is not proof that they correspond, but it forbids declaring them terminal merely because their machinery looks different.

## 2.2 Required pass

Before stopping on such a residual, the agent MUST perform at least one explicit recursive role decomposition using the strongest applicable combination of:

```text
DP-07  alternative factorization
DP-10  role-equivalent elements
DP-11  invariants across variation/formulation
DP-13  multi-scale common substructure
DP-14  transformation invariants
DP-24  proof/witness topology
DP-37  equivalent constraint/obstruction closure
DP-38  semantic-identity candidate / distinction audit
```

Other protocols may be promoted when evidence warrants them.

## 2.3 Required questions

The recursive pass MUST ask at least:

```text
What enters each residual region?
What leaves it?
What obligation does it discharge?
What constraints does it preserve or enforce?
What information is encoded, transformed, or discarded?
What invariant or obstruction does it establish?
What witness does it produce or eliminate?
What part is formulation-specific carrier machinery?
What part is required by the surrounding matched structure?
Could the two regions be alternate factorizations or representations of one natural role?
```

## 2.4 Exit conditions

The gate may close only when at least one of these is recorded:

1. **deeper correspondence found** — preserve it and continue normal discovery;
2. **qualified natural distinction found** — the residual difference may become a justified separator;
3. **structural breaker found** — a load-bearing role/constraint/dependency mismatch defeats the candidate;
4. **insufficient decomposition authority** — record `DORMANT` or incomplete search, not natural divergence;
5. **marginal-value stop after the mandatory pass** — record exactly which stronger decompositions were attempted and why further work is not justified by current cost/evidence.

`different machinery` alone is not an exit condition.

---

# 3. Role decomposition before object comparison

When direct object-level comparison fails but the objects occupy corresponding positions in an already-supported larger structure, the agent MUST compare their **roles** before using the object mismatch as negative evidence.

The generic decomposition template is:

```text
carrier / domain
input, defect, premise, or demand
encoder / representation map
boundary or side-condition enforcer
constraint / invariant carrier
obstruction / exclusion / impossibility mechanism
witness generator or eliminator
refinement / approximation adapter
reconstruction / decoder
claim discharge / output
```

Not every domain uses every role. Agents should instantiate only roles actually supported by the artifacts.

For mathematical proofs, particularly useful roles include:

```text
assumption
local witness
local encoding
boundary condition
extension condition
invariant
obstruction
existential witness
approximation/refinement
limit/closure step
decoder
contradiction
```

For engineering artifacts, analogous roles may be:

```text
input
state representation
interface
validation constraint
transformation
invariant
failure barrier
adapter
reconstruction
output
```

A failed literal mapping between carriers does not defeat a role mapping unless carrier identity is itself load-bearing under the active comparison authority.

---

# 4. Dependency-role alignment rule

Agents MUST align candidate nodes primarily by **dependency role**, not by textual order or proximity to the final result.

Before mapping two major nodes, compare:

```text
predecessor obligations
successor obligations
input/output role
quantifier strength
whether the node encodes, transports, obstructs, witnesses, decodes, or discharges
which constraints become available after the node
```

Two steps that both occur near the end of a proof or pipeline may have different roles.

Conversely, one atomic step on one side may correspond to several decomposed steps on the other.

DP therefore permits and SHOULD actively test mappings of the form:

```text
one node <-> subgraph
subgraph <-> one node
subgraph <-> subgraph
```

when reconstruction and role preservation are explicit.

---

# 5. Asymmetric black-box decomposition rule

A common discovery hazard is asymmetric granularity:

```text
side A: one named theorem / opaque component / bundled transformation
side B: several exposed internal steps
```

This asymmetry MUST NOT be treated as evidence that side A lacks side B's internal structure.

The agent must classify the comparison as one of:

```text
A. role-level correspondence is testable at the exposed interface;
B. deeper correspondence requires decomposing/opening the black box;
C. authority forbids opening the black box, so deeper comparison is incomplete;
D. an exposed load-bearing contract already separates them.
```

If `A`, compare at the common exposed role level.
If `B`, promote DP-07 / DP-24 / DP-37 or the domain-appropriate decomposition protocol.
If `C`, preserve the question as incomplete rather than distinct.
If `D`, record the actual separating evidence.

---

# 6. NEI Distinction Audit Gate

## 6.1 Purpose

DP 0.1 treated DP-38 mainly as a late identity-research protocol. DP 0.2 promotes NEI much earlier whenever a discovery branch risks using representational difference as if it were a natural distinction.

The question is not initially:

```text
Are these definitely the same thing?
```

It is:

```text
Is the distinction I am about to rely on actually justified as a natural distinction?
```

## 6.2 Mandatory trigger

An NEI distinction audit is REQUIRED before an agent uses a difference as a stopping separator when:

1. two regions/elements occupy corresponding load-bearing roles under a supported candidate mapping; and
2. their remaining differences are substantially attributable to one or more of:

```text
SI / namespace separation
source-document separation
administrative boundary
factorization choice
serialization or notation
implementation strategy
proof technique
coordinate system
representation carrier
intermediate-object naming/type whose natural significance is not independently established
```

The audit is also required when DP-08 residual analysis would otherwise conclude that two matched-role regions are `different machinery` or `domain-specific residuals`.

## 6.3 Audit construction

The agent SHOULD construct the smallest applicable NEI query:

```text
P = identity profile appropriate to the candidate natural role
E = fixed structural evidence already established by DP
Q = pinned QU state only when unresolved identity-relevant structure can affect the answer
subjects = the two SI-addressed represented regions/roles
```

The identity profile should make explicit which relations are identity-preserving or identity-separating for the research question.

DP structural correspondences may enter `E` only through a qualified bridge permitted by NEI. DP ranking, similarity, isomorphism, QUI, or common-core size never independently certifies `SAME`.

## 6.4 Routing by NEI outcome

### `SAME`

If qualified NEI returns `SAME`:

- treat the two represented regions as one natural object/role for the relevant discovery profile;
- preserve their separate SIs, provenance, source structure, and representation-specific residuals;
- continue searching for the representation transformation/factorization that explains their different presentations.

### `DISTINCT`

If qualified NEI returns `DISTINCT`:

- the distinction is a legitimate separator for that pinned profile/evidence context;
- preserve the separating evidence explicitly;
- stopping or branching the search on that distinction is allowed when appropriate.

### `UNKNOWN`

If NEI returns semantic `UNKNOWN`:

- natural distinction is not established;
- natural sameness is also not established;
- the apparent difference MUST NOT be used as a conclusive stopping separator;
- continue structural decomposition if the expected information value remains material, or record the branch as unresolved/dormant.

### incomplete / unavailable authority / undefined anchor

If the NEI question cannot qualify because identity authority, QU, coverage, or anchors are incomplete:

- do not infer `SAME`;
- do not infer `DISTINCT`;
- do not relabel representational difference as natural difference;
- record the identity question as incomplete and route discovery according to structural evidence and cost.

### no admissible model

If the pinned NEI problem itself has no admissible model, classify the underlying inconsistency according to NEI. Do not treat inconsistency as a useful `DISTINCT` result.

## 6.5 Anti-circularity

NEI must not be configured merely to erase a residual and improve a DP match.

Forbidden:

```text
choose an identity profile that declares the desired regions SAME
because making them SAME improves the common core
```

Required:

```text
identity profile/bridge is independently justified
-> evaluate the distinction
-> let the result constrain discovery
```

---

# 7. Replacement rule for DP-08 residual discovery

For DP 0.2, the DP-08 `Expand`, `Stop / cost`, and `Next` behavior from DP 0.1 is strengthened as follows.

## Expand

After identifying a residual:

1. record its attachment points to the matched structure;
2. determine whether it lies on a load-bearing path between matched roles;
3. if yes, invoke the Cross-Residual Decomposition Gate;
4. factor the residual by functional role before declaring domain specificity;
5. if matched roles remain but representation differs, invoke the NEI Distinction Audit Gate;
6. only then classify the residual as common structure, justified difference, unresolved identity, or low-value domain-specific remainder.

## Stop / cost

The agent MUST NOT stop merely because:

```text
the residuals use different mathematical machinery
the residuals use different implementation technologies
one side is discrete and the other continuous
one side is symbolic and the other operational
one side is local and the other global
one side uses a named theorem and the other an explicit construction
```

A stop is permitted after the mandatory cross-residual pass when there is a recorded breaker, qualified distinction, explicit incompleteness, or low marginal information value supported by the attempts already made.

## Next

For a residual attached between corresponding upstream/downstream roles, promote in this order as evidence warrants:

```text
DP-07 alternative factorization
DP-10 role equivalence
DP-13 multi-scale structure
DP-24 proof/witness or obligation topology
DP-11 invariant across formulation
DP-37 equivalent closure/obstruction
DP-38 NEI distinction audit
```

Then consider DP-14, DP-19, DP-23, DP-34, DP-35, DP-36 or other protocols appropriate to the residual.

The order is adaptive; it is not semantic authority.

---

# 8. Replacement rule for DP-38 semantic-identity discovery

DP-38 is no longer only a low-ranked optional identity investigation.

It has two entry modes.

## Mode A — identity is the research target

This retains DP 0.1 behavior: generate and test an NEI hypothesis because natural identity itself matters.

## Mode B — identity is a discovery-control question

This is new in DP 0.2.

Trigger Mode B when an apparent distinction is about to:

- terminate a structural search;
- split one candidate common core into two supposedly different natural objects;
- classify a residual as domain-specific;
- reject a cross-formulation correspondence;
- justify refusing further factorization;

and that distinction has not been independently established as natural rather than representational.

Mode B asks only enough NEI to determine whether the proposed separator is justified.

DP-38 Mode B SHOULD be promoted immediately after strong role correspondence is found across materially different representations.

---

# 9. Mathematical/theorem discovery promotion correction

For mathematical/theorem comparison, the DP 0.1 promotion list is replaced by:

```text
DP-02 constraints
DP-04 dependency topology
DP-06 motifs
DP-07 alternative factorization
DP-10 role equivalence
DP-11 invariants across formulation
DP-13 multi-scale structure
DP-19 duality when indicated
DP-24 proof/witness topology
DP-29 partial order
DP-31 conservation/balance
DP-33 special cases
DP-35 exceptions
DP-37 equivalent closures/obstructions
DP-38 NEI distinction audit when corresponding roles differ in formulation
```

`DP-38` moves up dynamically as soon as the search risks treating a formulation difference as a natural separator.

For proof comparisons, use the role template in Section 3 before concluding that proof-specific machinery is irreducible residual.

---

# 10. Expansion-discipline correction

DP 0.1 Section 9 is strengthened.

When a candidate has matched structure on both sides of a residual, expansion order becomes:

```text
1. verify immediate mapped relations;
2. inspect one-hop load-bearing neighborhoods;
3. compare attached constraints;
4. compare interfaces/boundaries by role;
5. inspect dependency/reachability consequences;
6. identify residual attachment points;
7. if residual is load-bearing between matched regions, invoke cross-residual decomposition;
8. test alternate factorization / multi-scale role decomposition;
9. audit apparent natural distinctions with NEI where triggered;
10. only then decide whether to stop, widen, or promote the candidate.
```

This sequence prevents residual labeling from terminating the very decomposition DP-08 was intended to stimulate.

---

# 11. Residual-first rule correction

DP 0.1's residual-first principle remains valid but gains a recursion requirement.

Correct interpretation:

```text
find common core
    -> inspect residual
    -> decompose residual by role
    -> compare residuals at alternate factorization/scale
    -> audit representational distinctions with NEI when triggered
    -> preserve both deeper common structure and genuine residual
```

Incorrect interpretation:

```text
find common core
    -> call everything else residual
    -> conclude residual machinery differs
    -> stop
```

A residual is a **search target**, not a negative classification.

---

# 12. Identity-sensitive stopping rule

Before any discovery branch terminates on a claimed distinction `D(a,b)`, record which of the following supports the stop:

```text
qualified semantic/natural distinctness
load-bearing structural breaker under the active view
scope/authority explicitly declares the difference rigid
mandatory decomposition exhausted to the justified cost bound
identity question remains incomplete/UNKNOWN but further work is not worth current cost
```

If the last condition applies, the correct result is cost-bounded `DORMANT`/unresolved, not `DISTINCT` and not “no deeper correspondence.”

---

# 13. Discovery ledger additions

DP 0.2 adds these ledger fields when applicable:

```text
cross_residual_gate_triggered
residual_attachment_points
role_decomposition_attempted
alternate_factorizations_attempted
asymmetric_black_box_status
nei_distinction_audit_triggered
nei_profile_revision
nei_evidence_revision
nei_qu_revision_if_any
nei_result_or_incomplete_reason
separator_authority
stop_justification
```

This allows a later agent to distinguish:

- a genuinely separated structure;
- a search that stopped for cost;
- an unresolved identity question;
- a residual that was never decomposed deeply enough.

---

# 14. Qualification targets for DP 0.2

DP 0.2 remains unqualified.

Before promotion, qualification should demonstrate at least:

1. **cross-residual recursion:** matched upstream/downstream roles with a load-bearing unmatched middle trigger another decomposition pass rather than immediate termination;
2. **role before carrier:** a failed literal carrier isomorphism does not suppress a valid higher-level role correspondence;
3. **dependency-role alignment:** obstruction/encoder/witness/decoder nodes are aligned by proof role rather than textual proximity;
4. **one-to-subgraph mapping:** an atomic step on one side can correspond to a decomposed region on the other without forcing false full isomorphism;
5. **black-box asymmetry:** opaque-vs-decomposed structure produces role-level correspondence or explicit incompleteness, not unsupported distinctness;
6. **NEI distinction audit:** strong role correspondence plus representation-level difference invokes NEI before the difference is used as a natural separator;
7. **NEI SAME routing:** qualified SAME preserves distinct SIs/provenance while allowing one natural role/object for discovery;
8. **NEI DISTINCT routing:** qualified DISTINCT can legitimately separate the branch;
9. **NEI UNKNOWN routing:** UNKNOWN does not become SAME, but also cannot justify stopping on natural distinctness;
10. **NEI incomplete routing:** missing identity authority remains incomplete rather than becoming a separator;
11. **anti-circularity:** DP cannot configure NEI merely to increase match size;
12. **residual preservation:** deeper common structure may be found without erasing genuine method-specific residuals;
13. **cost discipline:** mandatory recursive/NEI gates do not imply exhaustive search and can terminate as `DORMANT` with explicit resource justification;
14. **proof-unification replay:** a sufficiently decomposed independent proof pair with a known hidden unification causes the agent to recover the load-bearing obstruction/encoding relationship or to identify exactly which remaining black box prevents that recovery.

A future proof benchmark SHOULD separate:

```text
A. discovery of the common obstruction theorem/role;
B. discovery of the approximation/deduction bridge;
```

and SHOULD avoid hiding one side's entire deep obstruction inside an opaque theorem call when the opposite side exposes that obstruction internally.

---

# 15. Working constitutional summary

DP 0.2 adds six governing corrections:

1. **Residual is not divergence.** A load-bearing residual between matched regions gets another decomposition pass.
2. **Role precedes carrier.** Different objects or machinery may realize one structural role.
3. **Align by dependency function.** Do not map steps merely because they occur at similar textual depth or near the same conclusion.
4. **Audit distinctions with NEI.** When a same-role residual differs mainly by representation/factorization/formulation, test whether the distinction itself is naturally justified before relying on it.
5. **UNKNOWN is not a separator.** NEI uncertainty preserves the search question; it does not silently prove SAME or DISTINCT.
6. **Stop explicitly.** A search may stop for a breaker, qualified distinction, incompleteness, or cost—but never merely because the remaining machinery looks different.

The intended effect is:

```text
apparent difference
    -> decompose
    -> compare roles
    -> audit identity/distinction when appropriate
    -> only then preserve as genuine residual or separator
```

This correction directly addresses the failure exposed by RUN-Q006 while preserving DP's original separation between discovery strategy and semantic authority.
