# Glycan cleavage implicit assertions A1 — exact closure pass 1

**Status:** exact implicit research assertions admitted from A0
**Date:** 2026-09-27
**Input:** GLYCAN_ASSERTION_BASE_A0_0_1.md + verified primitive native graph
**Support mode:** EXACT only
**NEI dependency:** none in this pass
**QU dependency:** none inside the frozen 0.1 scope

This pass applies first-order, datatype, finite-tree, transition, and objective closure before the first NEI pass.

High-level terminology below is navigation only. Each admitted assertion is supported by the primitive/native definitions named in its witness.

---

## Root/tree closure

### G-IA001 — every represented node has a finite parent chain ending at root

**Body.** Under 181004, every r in RL is either root or has a finite repeated-parent chain whose terminal node is root.

**Support.** G-E002–G-E005, G-E008.

**Witness.** Every non-root has exactly one parent. Following a parent strictly decreases the represented natural rank. An infinite parent chain is impossible in the finite represented carrier, and the only represented node permitted to have no parent is root.

### G-IA002 — parent cycles are impossible

**Body.** No nonempty directed cycle can consist of represented P(child,parent) edges.

**Support.** G-E008.

**Witness.** Every parent edge forces a strict rank decrease when traversed child-to-parent. Returning to the initial node would force its natural rank to be strictly less than itself.

### G-IA003 — every target node carries its complete ancestor chain in the target

**Body.** If r in TG, every node on its finite parent chain through P is also in TG, through root.

**Support.** G-E007 + G-IA001.

---

## One-step state closure

### G-IA004 — a microscopic successor is a subset of its predecessor

If 181008(...,S,Sp), then every member of Sp is a member of S.

**Support.** G-E011–G-E012.

### G-IA005 — a microscopic successor removes exactly its chosen eligible member

For the witness r in 181008:

~~~text
r in S
r notin Sp

forall x != r:
    x in Sp IFF x in S
~~~

No other membership changes.

**Support.** G-E009–G-E012.

### G-IA006 — target membership is invariant under a microscopic step

If TG subset S and 181008(...,S,Sp), then TG subset Sp.

**Witness.** The removed witness is required by 181006 not to occur in TG; every other member is preserved.

### G-IA007 — ancestor closure is invariant under a microscopic step

Assume S is ancestor-closed under P and 181008(...,S,Sp).

Then Sp is ancestor-closed.

**Witness.** Let c in Sp and P(c,p). Then c in S, so p in S. The removed site r cannot equal p: eligibility made r terminal in S, while c in S would be a represented child of r. Therefore p != r, hence p in Sp.

### G-IA008 — every microscopic step is a strict extensional descent

If 181008(...,S,Sp), then:

~~~text
Sp subset S
AND
NOT (S subset Sp)
~~~

**Witness.** G-IA004 plus the eligible witness r in S and r notin Sp.

---

## Same-operator local algebra

### G-IA009 — deleting one eligible site cannot make another distinct eligible site ineligible

Fix one operator e.

If distinct r and s are both eligible in S, and s is removed to obtain Ss, then r remains eligible in Ss.

**Witness.**

- r remains present because r != s;
- removing s cannot add a child of r;
- r was already terminal;
- target membership and M(e,r) are static.

The symmetric statement holds exchanging r and s.

### G-IA010 — simultaneous same-operator microscopic choices form an exact diamond

Under G-IA009, deleting r then s and deleting s then r are both valid and reach extensionally equal states:

~~~text
S minus {r,s}.
~~~

**Support.** G-IA005 + G-IA009 + 181003.

### G-IA011 — microscopic same-operator deletion terminates

There is no infinite sequence of 181008(...,e,...) steps from one finite represented state.

**Witness.** Each step is a strict extensional deletion of one currently present element and never creates an element. The starting carrier is finite.

### G-IA012 — same-operator microscopic reduction is confluent

Any two finite same-e deletion paths from one state can be extended to extensionally equal saturated states.

**Witness.** Induction on the finite number of possible remaining deletions:

- zero choice: already saturated;
- one choice: immediate;
- competing first choices: G-IA010 joins the two first-step branches after two deletions;
- apply the induction hypothesis below the joined state.

This is a primitive-supported proof; confluence is not imported as an opaque theorem label.

---

## One exhaustive phase

### G-IA013 — every completed phase ends saturated

If 181016(...,e,S,Sf,tr), then 181009(...,e,Sf).

**Witness.** Structural induction on tr; the empty branch states saturation explicitly, and the nonempty branch delegates to its strictly shorter tail.

### G-IA014 — every completed phase is reductive

If 181016(...,e,S,Sf,tr), then Sf subset S.

**Witness.** Structural induction on the finite trace using G-IA004.

### G-IA015 — a completed phase preserves the target

If TG subset S and 181016(...,e,S,Sf,tr), then TG subset Sf.

**Witness.** Structural induction using G-IA006.

### G-IA016 — a completed phase preserves ancestor closure

If S is ancestor-closed and 181016(...,e,S,Sf,tr), then Sf is ancestor-closed.

**Witness.** Structural induction using G-IA007.

### G-IA017 — a completed phase deletes only static matching, non-target sites

Every site removed anywhere in an e phase satisfies:

~~~text
M(e,r)
AND
r notin TG
~~~

at its deletion step.

**Support.** G-E010, G-E012, G-E016.

### G-IA018 — descendant-before-ancestor precedence inside a phase

If both a represented node p and one of its represented descendants are deleted during the same phase, every surviving descendant blocking p must be deleted before p.

In particular, a direct child present in the state must be absent before its parent can be deleted.

**Support.** terminality G-E009 and exact deletion G-E011.

### G-IA019 — a saturated same-operator final state is extensionally unique

For fixed P,M,TG,e,S, if:

~~~text
181016(...,e,S,Sf1,tr1)
181016(...,e,S,Sf2,tr2)
~~~

then:

~~~text
181003(Sf1,Sf2).
~~~

**Witness.** G-IA011 termination + G-IA012 confluence + G-IA013 saturation.

### G-IA020 — a complete same-operator phase exists

For every finite valid state S and selected e in EL, at least one Sf,tr satisfies 181016(...,e,S,Sf,tr).

**Witness.**

- if saturated, use the empty trace branch;
- otherwise choose one represented eligible site and recurse after its strict deletion;
- G-IA011 guarantees the construction terminates.

### G-IA021 — the phase defines an exact extensional state transformer

For fixed instance data and e, define the derived view:

~~~text
C_e(S) = the unique extensional Sf
         for which a complete e-phase exists.
~~~

G-IA019 supplies uniqueness modulo 181003; G-IA020 supplies existence.

This definition introduces no new primitive.

### G-IA022 — the phase transformer is reductive, target-preserving, ancestor-closure-preserving, and saturated

For valid S:

~~~text
C_e(S) subset S
TG subset S -> TG subset C_e(S)
ancestor_closed(S) -> ancestor_closed(C_e(S))
saturated(e,C_e(S))
~~~

**Support.** G-IA013–G-IA016.

### G-IA023 — same-operator saturation is idempotent

~~~text
C_e(C_e(S)) =ext C_e(S).
~~~

**Witness.** G-IA022 makes C_e(S) saturated. The empty-trace phase therefore exists from C_e(S) to itself, and G-IA019 makes that output unique.

### G-IA024 — zero-step phase iff the start is saturated

An empty microtrace witnesses an e phase from S to an extensionally equal final state exactly when S is saturated for e.

**Support.** the empty branch of G-E016 and 181003.

---

## Exact survivor characterization

### G-IA025 — bottom-up survivor equation for one phase

Let F = C_e(S).

For every r in S:

~~~text
r in F
IFF
(
    r in TG
    OR NOT M(e,r)
    OR EXISTS c:
         c in F
         AND P(c,r)
)
~~~

**Forward direction.** If r survives, is not target, and matches e, saturation forbids it from being terminal in F; therefore a represented child survives.

**Reverse direction.**

- target sites are never eligible;
- nonmatching sites are never eligible;
- if a child survives, r can never become terminal before the phase ends.

This is a derived fixed-point equation, not an additional transition rule.

### G-IA026 — phase transformation is monotone over valid ancestor-closed states

For fixed instance and e, let valid states S1,S2 both contain TG and be ancestor-closed.

If:

~~~text
S1 subset S2
~~~

then:

~~~text
C_e(S1) subset C_e(S2).
~~~

**Witness.** Induct bottom-up through the finite rooted structure using G-IA025. Every reason a node survives in the smaller state—target protection, nonmatching status, or a surviving child—also holds in the larger state after applying the induction hypothesis to children.

---

## Finite trajectory closure

### G-IA027 — a finite operator sequence is reductive

If 181017(...,S,T,Sf), then Sf subset S.

**Witness.** Structural induction on T using G-IA014.

### G-IA028 — target membership is invariant across a trajectory

If TG subset S and 181017(...,S,T,Sf), then TG subset Sf.

**Witness.** structural induction using G-IA015.

### G-IA029 — ancestor closure is invariant across a trajectory

If S is ancestor-closed and 181017(...,S,T,Sf), then Sf is ancestor-closed.

**Witness.** structural induction using G-IA016.

### G-IA030 — trajectory continuation depends only on current extensional state, not history

For a fixed instance and suffix T, if 181003(S1,S2), then every execution of T from S1 has an extensionally equal final state to execution of T from S2.

**Witness.** Induction on T; same starting membership gives the same eligibility relation, and G-IA019 gives a unique extensional phase output at every head operator.

---

## Operator algebra and objective consequences

### G-IA031 — adjacent equal operators collapse

For any valid state S:

~~~text
execute([e,e],S)
    =ext
execute([e],S).
~~~

**Witness.** first phase yields C_e(S); G-IA023 makes the second phase identity on that state.

### G-IA032 — an optimal solving trajectory contains no adjacent repeated operator

If an optimal solving T contained ...,e,e,..., G-IA031 plus G-IA030 would permit deleting one occurrence without changing the final target, producing a strictly shorter solving trajectory.

Contradiction.

### G-IA033 — an optimal solving trajectory contains no zero-effect phase

If one phase in a solving trajectory leaves its input state extensionally unchanged, removing that treatment preserves the state at the next suffix boundary. G-IA030 therefore preserves the final result while reducing trajectory length.

Thus every phase of an optimal solving trajectory strictly changes the extensional state.

### G-IA034 — optimal trajectory length is bounded by the number of removable non-target sites

If a solution exists, each phase of an optimal solution removes at least one site by G-IA033.

Removed sites are never recreated and target sites are never removed.

Therefore the number of treatment phases in an optimal solution cannot exceed the finite number of represented sites outside TG.

This is a finite bound, not a claim that every non-target site is individually removable.

### G-IA035 — the scoped optimum search is finite

EL is finite and G-IA034 bounds the length of any minimum solving sequence whenever a solution exists.

Therefore exhaustive search for the minimum is finite within the frozen 0.1 model, although its size may still be combinatorially large.

No polynomial-time claim follows.

### G-IA036 — identical susceptibility columns induce identical phase transformers

Fix two represented operator identities e1,e2.

If:

~~~text
forall r in RL:
    M(e1,r) IFF M(e2,r)
~~~

then for every valid state S:

~~~text
C_e1(S) =ext C_e2(S).
~~~

**Witness.** The eligibility predicates are pointwise identical for every state; G-IA019 then gives the same unique saturated normal form.

### G-IA037 — an operator with no susceptible represented site is an identity transformer

If:

~~~text
forall r in RL:
    NOT M(e,r)
~~~

then every valid state is already saturated for e, so:

~~~text
C_e(S) =ext S.
~~~

Such an operator cannot appear in an optimal solving trajectory.

---

## Exact anti-overclaim controls

### G-IA038 — nonadjacent reuse of one operator can be necessary

The model does **not** imply that each operator is used at most once.

Exact witness family:

~~~text
root in TG

chain:
    a parent=root
    b parent=a
    c parent=b

susceptibility:
    M(A,a)
    M(B,b)
    M(A,c)

no other relevant M tuples
~~~

From the full state:

1. phase A removes c and then blocks on b;
2. phase B removes b;
3. phase A is required again to remove a.

Thus the model permits a necessary pattern:

~~~text
A, B, A.
~~~

This falsifies any candidate theorem "an optimum uses each operator at most once."

### G-IA039 — phase order can matter

The model does **not** make arbitrary operators commute.

Exact witness:

~~~text
root in TG
P(b,root)
P(a,b)
M(A,a)
M(B,b)
~~~

Then A followed by B can remove both non-target sites, while B followed by A leaves b after those two phases because B is initially blocked by a.

Any commutation assertion therefore requires represented structural side conditions.

---

## Pass-1 disposition

~~~text
new exact implicit assertions: 39
Bayesian assertions:            0
NEI-derived assertions:         0
QU-dependent assertions:        0
rejected overclaims preserved:  2 explicit counterexample boundaries
~~~

The next stage is NEI pass 1 over these exact results.
