# Glycan cleavage implicit assertions A3 — recursive subtree closure pass 3

**Status:** exact implicit research assertions admitted after NEI pass 2
**Date:** 2026-09-27
**Inputs:** A0 + A1 + NEI1 + A2 + NEI2
**Support mode:** EXACT only
**QU dependency:** none in frozen 0.1 scope

This pass investigates only structure that follows from the finite rooted tree, static susceptibility relation, target marking, and global treatment semantics.

---

## Parent-observation boundary

### G-IA071 — a parent observes each direct child only through child presence

For a represented parent p in current state S:

~~~text
p is terminal
IFF
p in S
AND
there does not exist child c in S with P(c,p).
~~~

Thus the parent-facing contribution of one direct child occurrence is exactly the Boolean fact:

~~~text
child root still present?
~~~

The parent does not inspect the internal deletion history of that child subtree.

### G-IA072 — target completion observes child subtrees through completion conjunction

For a retained target node p, local completion of the subtree rooted at p requires:

- p remains present;
- every non-target descendant is absent.

Equivalently, every direct child subtree must itself have reached its target-restricted completion state.

Thus a retained parent combines direct-child completion observations by logical AND.

For a non-target node, local subtree completion occurs exactly when that node is absent; its removal already required all direct child roots to be absent.

---

## Recursive signature

### G-IA073 — define exact recursive treatment-structure signature SIG

For represented node r define the derived value SIG(r) bottom-up as the triple:

~~~text
(
    target_flag(r),

    susceptibility_vector(r)
        = exact set of e in EL with M(e,r),

    child_signature_set(r)
        = exact SET of SIG(c)
          over direct children P(c,r)
)
~~~

The third component is a set, not a multiset.

This definition is proposed only after G-IA071/G-IA072 identify how duplicate child behavior enters the treatment semantics.

### G-IA074 — SIG is well-founded and finite

G-IA001/G-IA002 give a finite acyclic rooted parent structure.

Therefore SIG can be defined by induction from leaves toward root.

No recursive signature value depends on itself through an unresolved cycle.

The number of distinct SIG values is finite and no greater than the number of represented nodes.

### G-IA075 — equal leaf signatures give equal treatment behavior

For leaves r1,r2:

~~~text
SIG(r1)=SIG(r2)
~~~

means equal target flag and equal susceptibility vector, with both child-signature sets empty.

Under every treatment prefix, their root-presence and local-completion observations therefore agree.

This is the base case for recursive behavioral equivalence.

### G-IA076 — equal child-signature classes evolve synchronously

Assume two direct child subtrees begin with equal SIG values.

Under any common finite treatment prefix, their corresponding root-presence and local-completion observations remain equal.

**Witness.** Induction on subtree height and treatment prefixes:

- equal signatures give equal target flag and root susceptibility;
- equal child-signature sets pair each required child behavior class;
- phase eligibility uses only current child-root presence, target flag, and susceptibility;
- identical treatment operators are applied globally to both;
- same-operator saturation is deterministic extensionally by G-IA019.

This is a behavioral theorem about SIG equality, not a claim of global raw-subtree identity.

### G-IA077 — repeated equal child behavior contributes idempotently to parent exposure

Suppose a parent has k >= 1 direct child occurrences whose subtrees have the same SIG value.

By G-IA076 their root-presence Booleans are equal after every treatment prefix.

The parent exposure condition contains:

~~~text
exists surviving child.
~~~

For k repeated equal Boolean values b:

~~~text
b OR b OR ... OR b
IFF
b.
~~~

Therefore multiplicity k>0 of one equal child-signature class does not change when the parent becomes terminal.

### G-IA078 — repeated equal child behavior contributes idempotently to retained-subtree completion

For a retained target parent, duplicate equal child-signature classes have equal local-completion Booleans after every prefix.

The parent completion condition contains conjunction over all direct child completions.

For k repeated equal Boolean values q:

~~~text
q AND q AND ... AND q
IFF
q.
~~~

Therefore multiplicity k>0 of one equal child-signature class does not change local completion of a retained parent.

### G-IA079 — multiplicity collapse is exact only within one equal behavior class

G-IA077/G-IA078 permit:

~~~text
k copies of one equal SIG child class
->
one present copy of that class
~~~

for parent exposure and local target-completion behavior.

They do not permit collapsing two distinct child classes merely because both happen to be present or absent in one observed state.

The equality theorem must hold for the full declared treatment-behavior scope.

---

## Recursive behavior theorem

### G-IA080 — equal SIG implies equal root-presence response for every treatment sequence

For nodes r1,r2 with:

~~~text
SIG(r1)=SIG(r2),
~~~

the Boolean function:

~~~text
T -> root of the represented subtree is present
     after treatment prefix T
~~~

is identical.

**Witness.** Induction on SIG/subtree height using G-IA075–G-IA078.

### G-IA081 — equal SIG implies equal local target-completion response for every treatment sequence

For nodes r1,r2 with equal SIG, the Boolean function:

~~~text
T -> all non-target structure in the rooted subtree
     has been removed after T
~~~

is identical.

**Witness.**

- non-target root: completion iff root is absent;
- target root: completion iff the root remains and every distinct child-signature class is complete;
- use G-IA078 and induction on child signatures.

### G-IA082 — define exact subtree trajectory-response value RESP

For represented node r define:

~~~text
RESP(r)(T)
=
(
    root_present_after_T,
    subtree_complete_after_T
)
~~~

for every finite raw treatment sequence T, with execution starting from the full represented subtree state.

RESP is a derived exact function/value.

G-IA080/G-IA081 establish:

~~~text
SIG(r1)=SIG(r2)
->
RESP(r1)=RESP(r2).
~~~

The converse is not asserted.

### G-IA083 — subtree solving language depends only on RESP

Define local subtree solving language:

~~~text
L_sub(r)
=
{ T |
  subtree rooted at r is locally complete after T }.
~~~

Then:

~~~text
RESP(r1)=RESP(r2)
->
L_sub(r1)=L_sub(r2).
~~~

Equal SIG is one sufficient certificate through G-IA082.

### G-IA084 — duplicate equal-SIG sibling subtrees do not change treatment-sequence requirements

If a parent has one or multiple direct child occurrences with the same SIG value, the exact set of treatment sequences needed to:

- expose the parent;
- complete the parent subtree;

is unchanged by replacing positive multiplicity of that child class with one representative occurrence.

This follows from synchronous behavior plus Boolean idempotence, not from deleting raw evidence.

### G-IA085 — multiplicity collapse preserves treatment trajectories but not microscopic trace multiplicity

The source objective enumerates treatment-operator sequences.

Replacing repeated equal-SIG child occurrences by one behavior representative does not change which treatment sequences solve the represented subtree.

It can change the number and identities of microscopic deletion events/traces.

Therefore the collapse is exact for:

~~~text
treatment trajectory reachability
minimum treatment count
all raw treatment-sequence witnesses
~~~

but not for:

~~~text
enumeration of every microscopic cleavage trace.
~~~

That boundary matches the frozen source objective.

---

## Pass-3 disposition

~~~text
new exact implicit assertions:        15
cumulative exact implicit assertions: 85
new recursive signature:               SIG
new exact response value:              RESP
new multiplicity-collapse theorem:     yes
new global raw-identity claim:         none
QU-dependent assertions:               0
~~~

The next NEI pass must decide only scoped identity of SIG/RESP values and must not turn duplicate raw branches into global natural coidentity.
