# P versus NP NEI semantic scope contract 0.1

**Status:** current human-readable semantic contract for the P-vs-NP NEI application
**Qualified authority:** NEI 0.4 + QU 0.1
**Native template overlay:** P_VS_NP_NEI_OVERLAY_0_5.isg
**Primitive authority:** P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg

This contract separates two things that predecessor overlay 0.4 blurred:

1. the exact semantics of an identity question;
2. whether one particular native query record has enough represented evidence/authority to return SAME, DISTINCT, or UNKNOWN.

The semantic scopes below are valid mathematical query definitions.
The native overlay 0.5 is deliberately fail-closed: its generic records remain INCOMPLETE until instantiated evidence/model-family structure is represented or pinned.

## 1. Global constructor identity scopes

### Q-NAT

Carrier: represented natural objects.

Exact equality authority is the primitive natural constructor theory:

- ZERO is disjoint from successor;
- predecessor fields are functional;
- same-predecessor successor objects are equal.

For instantiated subjects, an exact equality/disequality theorem may feed NEI exact evidence.

The generic Q-NAT template itself does not predeclare an answer.

### Q-LIST

Carrier: represented finite list objects.

Exact object theory:

- NIL is disjoint from CONS;
- HEAD/TAIL are functional;
- same HEAD/TAIL CONS objects are equal.

Again, an instantiated exact theorem may force SAME/DISTINCT.
The template alone does not.

### Q-CONFIG

Carrier: represented configuration objects.

Exact object theory:

- state/left/current/right fields are functional;
- equal four-field configurations are equal.

No two raw configuration SIs are called SAME merely because their fields have not yet been compared.

## 2. Global relation/realization identity remains incomplete

Q-RELATION-GLOBAL and Q-REALIZATION do not currently have one pinned global natural-identity theory.

Exact equality of relation extensions or computed language L may be useful scoped evidence but does not automatically prove global natural identity of the artifacts.

These queries remain INCOMPLETE unless a specific identity domain/theory is supplied.

## 3. Q-RESIDUAL

Fix exactly:

- one input x;
- one verifier/transition authority;
- one witness depth;
- one remaining resource bound;
- one admissible suffix domain;
- all required QU/closure authority.

For residual p define the exact continuation predicate:

~~~text
C_p(s)
=
verifier accepts the complete witness formed from p followed by admissible suffix s.
~~~

The scoped quotient value is the entire function/relation:

~~~text
s -> C_p(s).
~~~

Q-RESIDUAL scoped SAME means equality of those quotient values:

~~~text
p ~R q
IFF
for every admissible suffix s:
    C_p(s) IFF C_q(s).
~~~

This is a scoped quotient relation owned by Q-RESIDUAL.

It is not global prefix identity.

One exact distinguishing suffix proves scoped inequality/DISTINCT of the quotient values.

If continuation semantics are unresolved and a qualified QU realization family contains both equal and unequal quotient outcomes, the identity result may be semantic UNKNOWN.

If the required possibility universe, constraints, closure authority, anchors, or realization-family semantics are missing, the query is INCOMPLETE, not UNKNOWN.

## 4. Q-EXISTS

Under the same fixed input/verifier/depth/resource scope define:

~~~text
E(p)
=
exists admissible suffix s:
    C_p(s).
~~~

The identity object is the exact Boolean value E(p).

Scoped SAME means:

~~~text
E(p)=E(q).
~~~

This is objective identity only.

It does not imply Q-RESIDUAL SAME and is not generally right-congruent under common extension.

## 5. Q-MIN

Define:

~~~text
D(p)
=
minimum length of an accepting admissible continuation
or INF if none exists.
~~~

Scoped SAME means exact equality of D values.

Q-MIN refines Q-EXISTS but does not generally equal or refine Q-COUNT.

## 6. Q-COUNT

For a fixed finite continuation domain define:

~~~text
N(p)
=
number of admissible accepting continuations.
~~~

Scoped SAME means exact equality of N values.

Q-COUNT refines Q-EXISTS.

Q-COUNT and Q-MIN are generally incomparable beyond their common projection to Q-EXISTS.

## 7. Scoped quotient versus NEI global identity

The permitted inference is:

~~~text
exact quotient-value equality
    ->
the relation owned by that quotient scope holds.
~~~

It may be expressed as scoped SAME only because the query explicitly asks identity of the quotient value under exact value-equality authority.

It does not imply:

~~~text
underlying raw objects are globally naturally identical.
~~~

A broader global identity query must perform its own admissible-model reasoning.

## 8. Concrete exact controls

Two semantic controls remain exact, but overlay 0.5 does not serialize their final result roles until complete native evidence/model-family support is provided.

### Terminal values

Primitive bundle 0.4 represents:

~~~text
positive halt != negative halt.
~~~

Under the raw-value mathematical identity theory this exact disequality forces DISTINCT for those instantiated subjects.

### Duplicate configuration construction

Primitive configuration extensionality makes two configuration referents with exactly the same four fields equal.

Under the mathematical configuration identity theory, that exact equality forces SAME.

These are semantic conclusions from primitive support + qualified NEI.

They are not answers declared by the generic native query template.

## 9. QU discipline

A QU-backed NEI query may be called OPEN only when its exact admissible realization family R(Q) is recoverable from represented/pinned:

- possibility universe;
- constraints;
- interfaces where load-bearing;
- closure authority;
- fixed/open structure.

An opaque handle for any of these is not enough.

Missing required structure is INCOMPLETE_SCOPE.

Algorithm-hiding, search difficulty, or failure to compute a result is not semantic QU by itself.

## 10. Anti-circularity

Forbidden:

~~~text
desired SAME
    -> choose/restrict QU or scope
    -> remove distinguishing cases
    -> claim SAME.
~~~

Likewise a desired DISTINCT result cannot manufacture a separating identity theory.

The quotient/object semantics and QU authority must be independent of the desired classification.

## 11. Native-overlay status

P_VS_NP_NEI_OVERLAY_0_5.isg is a query-template serialization only.

It deliberately contains:

- no SAME/DISTINCT/UNKNOWN result role;
- no opaque exact-evidence theorem claim;
- no opaque admissible-model-family claim;
- no OPEN QU state.

Every query template is INCOMPLETE until an instantiated application supplies the missing authority.

This is stricter than predecessor overlay 0.4 and matches NEI 0.4 / QU 0.1 fail-closed semantics.
