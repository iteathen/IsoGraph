# P versus NP implicit-assertion pass A26 — robust deadness and filtering refinement

**Status:** admitted exact/conditional support assertions, round 26
**Premise state:** corrected A0 + A1-A25
**Qualified authority:** QU 0.1 + NEI 0.4 where identity scope is involved
**Primitive authority:** P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg

This round closes safety obligations exposed by A25 under unresolved structure.

---

## IA-355 — QU-mediated dead filtering requires robust deadness

### Scope

A residual child's continuation semantics depends on a qualified QU state Q with admissible realization family R(Q).

### Premise

A parent edge is to be removed using a dead-child certificate.

### Body

The certificate is sound across the declared QU scope only if exact support establishes:

~~~text
for every r in R(Q):
    E_r(child)=FALSE.
~~~

An equivalent exact theorem/certificate may discharge the same universal obligation without enumerating R(Q).

### Support

Removing the edge claims that it contributes no accepting continuation under the governing semantics.

If one admissible realization makes the child live, deleting the edge can change the existential objective in that realization.

### Disposition

ADMITTED EXACT SUPPORT CONDITION.

---

## IA-356 — UNKNOWN or INCOMPLETE deadness cannot justify filtering

### Semantic UNKNOWN

If the qualified realization/model family contains both:

~~~text
child dead
child live,
~~~

then the edge is not robustly dead and cannot be removed by DEADHAT.

### INCOMPLETE

If required QU/closure/evidence authority is absent, deadness is unqualified.

That also cannot justify filtering.

### Body

~~~text
UNKNOWN deadness
    != dead certificate

INCOMPLETE deadness
    != dead certificate.
~~~

### Support

IA-355 + qualified QU/NEI fail-closed discipline.

### Disposition

ADMITTED EXACT SUPPORT RESTRICTION.

---

## IA-357 — sound dead-certificate refinement monotonically weakens simulation obligations

### Premises

For the same residual system let two sound certificate relations satisfy:

~~~text
DEADHAT_1 subseteq DEADHAT_2
subseteq exact dead edges.
~~~

### Body

Every label obligation remaining under DEADHAT_2 also remains under DEADHAT_1 or is a subset thereof.

Therefore any relation satisfying IA-347 under DEADHAT_1 also satisfies the local obligation test under DEADHAT_2.

For greatest dead-filtered simulation relations:

~~~text
R_1 subseteq R_2.
~~~

### Interpretation

Adding more **sound** dead certificates can expose additional true dominance proofs but cannot invalidate an already sound filtered-simulation proof.

### Disposition

ADMITTED EXACT.

---

## IA-358 — one false dead certificate can make filtered simulation unsound

### Counterexample

Let:

~~~text
CURRENT(p)=FALSE
CURRENT(q)=FALSE.
~~~

Let p have one legal label a to child p' with:

~~~text
E(p')=TRUE.
~~~

Let q have no legal a transition.

Then:

~~~text
NOT (p <=F q)
~~~

because p has an accepting continuation beginning with a that q lacks.

If an unsound certificate falsely marks:

~~~text
DEADHAT(p,a)=TRUE,
~~~

the local filtered simulation obligations may become empty and incorrectly accept the pair.

### Body

DEADHAT soundness is load-bearing.

### Disposition

ADMITTED EXACT COUNTERASSERTION.

---

## IA-359 — upper emptiness can certify deadness; lower emptiness cannot

### Upper abstraction

If:

~~~text
C_child subseteq U
AND
U=empty,
~~~

then child is exactly dead.

This is IA-353.

### Lower abstraction

If:

~~~text
Lw subseteq C_child
AND
Lw=empty,
~~~

no deadness conclusion follows.

The concrete continuation language may still be nonempty.

### Support

IA-262/263.

### Disposition

ADMITTED EXACT.

---

## IA-360 — local negative evidence can reduce support on a globally positive instance

### Body

A root residual may satisfy:

~~~text
E(root)=TRUE
~~~

while some legal child satisfies:

~~~text
E(child)=FALSE.
~~~

An exact/sound local rejection certificate for that child may therefore remove the child even though the whole input is a YES instance.

### Consequence

Negative evidence is not only a terminal NO-proof mechanism.

It can be a local support-reduction mechanism inside positive computations.

### Support

Finite OR semantics + IA-345/346.

### Disposition

ADMITTED EXACT.

---

# A26 central result

The safe refinement direction is one-sided:

~~~text
prove dead
    -> remove obligation

fail to find live witness
    -> no removal

UNKNOWN
    -> no removal

INCOMPLETE
    -> no removal.
~~~

As exact negative evidence accumulates, the simulation obligation set can shrink monotonically.

This creates a lawful progressive discovery loop:

~~~text
sound negative evidence
    ->
dead-support filtering
    ->
easier local simulation/dominance checks
    ->
smaller retained support where structure permits.
~~~

The loop does not alter QU to obtain the desired result.

# P-vs-NP status

OPEN.
