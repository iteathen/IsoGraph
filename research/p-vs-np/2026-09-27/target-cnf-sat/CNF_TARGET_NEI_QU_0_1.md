# CNF target NEI / QU scopes 0.1

**Status:** experimental hard-target overlay
**Identity authority:** qualified NEI 0.4 semantics
**Unknown authority:** qualified QU 0.1 semantics
**Primitive source:** CNF_TARGET_PRIMITIVE_0_1.isg
**Implicit support:** CNF_TARGET_IMPLICIT_ASSERTIONS_0_1.md

## 1. Global identity

Clause objects, literal-incidence tuples, witness lists, and derived support objects retain their ordinary represented identity.

Semantic equivalence under a projected Boolean objective does not make their raw representations globally SAME.

## 2. Q-CNF-ASSIGN — extensional witness identity

For witness lists w1,w2:

~~~text
w1 ~A w2
IFF
for every x in VL:
    MEMBER(x,w1) IFF MEMBER(x,w2).
~~~

Q-CNF-ASSIGN SAME preserves every source clause truth value.

Different list objects may therefore be globally DISTINCT while Q-CNF-ASSIGN SAME.

## 3. Q-CNF-PROJECTION — projected solution-function identity

Fix a set X of variables already existentially eliminated.

For a retained support object S over the remaining variables Y, define its projected truth function:

~~~text
Phi_S(y)
=
exists assignment x to X:
    original source truth is satisfied
~~~

as represented by S.

For two retained supports S,T:

~~~text
S ~PROJ T
IFF
for every remaining assignment y:
    Phi_S(y) IFF Phi_T(y).
~~~

This is scoped semantic identity of the projected Boolean function.

It is not global syntactic identity.

## 4. Local elimination supplies exact Q-CNF-PROJECTION SAME certificates

CNF-IA-008 proves that:

~~~text
F
with x existentially open
~~~

and:

~~~text
ELIM_x(F)
over the remaining variables
~~~

have the same projected truth function.

Thus every admitted elimination step supplies a local exact certificate of Q-CNF-PROJECTION SAME.

No complete classifier for arbitrary projected-support equivalence is required.

## 5. Factorization identity is representation-scoped

CNF-IA-011 materializes one projected function as an exponentially large explicit clause family.

CNF-IA-012 represents the same function as a compact OR-of-AND factorization.

These supports are:

~~~text
globally different representations

but

Q-CNF-PROJECTION SAME.
~~~

This is direct evidence that natural operational identity must not be inferred from serialization size or syntax family.

## 6. Clause subsumption is not clause identity

If clause C subsumes D:

~~~text
C -> D
~~~

under assignment truth.

When both occur in a conjunction, D can be removed while C remains.

This is a scoped one-way redundancy/dominance fact.

It is not evidence that C and D are globally SAME.

## 7. Q-CNF-EXISTS — terminal Boolean objective

The whole target has:

~~~text
E_CNF(F)
=
exists satisfying assignment.
~~~

Q-CNF-EXISTS has at most two values.

As in the generic campaign, that compact range does not supply a construction.

## 8. Input QU state

The frozen target instance is closed-world:

- VL and CL are fixed;
- POS and NEG are complete extensions.

No semantic QU is load-bearing for one target instance.

## 9. Research QU — compact-support continuation

A separate campaign-level unknown remains after the A/F/E projection:

~~~text
Does there exist a non-circular,
polynomially constructible exact representation/factorization
whose retained size stays polynomial
and whose next elimination/propagation operations stay polynomial
for every target instance?
~~~

This is not answered by the current evidence.

The current evidence constrains it:

- explicit CNF support can explode under one exact elimination order;
- one such exploding family has a compact alternate factorization;
- local forcing can stall;
- naive Boolean case expansion has no recovered polynomial sharing theorem.

If formalized as QU, its admissible realization family must preserve at least:

~~~text
representation family
construction rule
local operation closure
size bound
operation-cost bound
target-preservation proof
ordering/policy dependence.
~~~

A bare UNKNOWN marker would lose those distinctions.

## 10. Incomplete versus UNKNOWN firewall

The campaign has not defined an exhaustive authority over every possible exact representation language or factorization.

Therefore a claim such as:

~~~text
no polynomial exact representation exists
~~~

is currently **INCOMPLETE/UNQUALIFIED**, not NEI UNKNOWN and not false.

Likewise, failure of the present A/F/E representations cannot classify the universal identity/accessibility question.

## 11. NEI synthesis

The useful identity pattern is local:

~~~text
primitive transform
    ->
exact transformation-local Q-CNF-PROJECTION SAME certificate
    ->
continue without global equivalence solving.
~~~

This is the hard-target analogue of PC-G's local solution-set identity certificates.
