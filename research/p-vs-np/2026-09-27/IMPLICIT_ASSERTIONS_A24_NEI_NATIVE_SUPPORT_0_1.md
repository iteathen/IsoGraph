# P versus NP implicit-assertion pass A24 — NEI/QU native-support closure

**Status:** admitted exact support restrictions, round 24
**Premise state:** corrected A0 + A1-A23 with A21 correction
**Qualified authority:** NEI 0.4 + QU 0.1
**Corrected native overlay:** P_VS_NP_NEI_OVERLAY_0_5.isg
**Semantic scope contract:** P_VS_NP_NEI_SCOPE_CONTRACT_0_1.md

## IA-340 — an incomplete NEI query template cannot support an exact result

### Premise

A native NEI record lacks enough instantiated:

- subjects/anchors;
- identity-domain authority;
- exact evidence;
- admissible identity-model family;
- required QU/closure authority

to define the qualified identity question completely.

### Body

The record is:

~~~text
INCOMPLETE / UNQUALIFIED.
~~~

It cannot support SAME, DISTINCT, or semantic UNKNOWN.

### Support

Qualified NEI 0.4 fail-closed semantics.

### Disposition

ADMITTED EXACT SUPPORT RESTRICTION.

## IA-341 — opaque evidence/model handles do not discharge NEI authority

### Body

A local SI referenced as:

~~~text
fixed evidence
exact theorem/certificate
admissible identity-model family
~~~

does not acquire those semantics merely from the role edge.

Its load-bearing content must be represented or resolved through a pinned qualified dependency.

### Support

- Core exact-rendering/provenance discipline;
- NEI 0.4 exact-evidence/model-family semantics.

### Disposition

ADMITTED EXACT SUPPORT RESTRICTION.

## IA-342 — QU OPEN requires recoverable admissible-realization semantics

### Premise

A purported QU state does not determine enough of its:

- possibility universe;
- constraints;
- closure/scope authority;
- fixed/open structure;
- admissible realization family R(Q).

### Body

The correct status is:

~~~text
INCOMPLETE_SCOPE
~~~

not OPEN.

### Support

Qualified QU 0.1 sections on OPEN and INCOMPLETE_SCOPE.

### Disposition

ADMITTED EXACT SUPPORT RESTRICTION.

## IA-343 — scoped quotient equality supports only the relation owned by that scope

### Premise

For an exact quotient/value map Q_S:

~~~text
Q_S(a)=Q_S(b).
~~~

### Body

The equality establishes the scoped relation owned by S.

It may be expressed as scoped SAME only when the identity query explicitly asks identity of that quotient/value under exact value-identity authority.

It does not establish global natural identity of a and b.

### Support

Qualified NEI 0.4 scoped-quotient discipline.

### Disposition

ADMITTED EXACT.

## IA-344 — an NEI result role must be downstream of independent identity authority

### Body

A native SAME/DISTINCT/UNKNOWN result role is not self-justifying.

For exact admission, the result must be reconstructible from an independently pinned query context, evidence, admissible-model family, and required QU state.

A query/profile cannot place the desired result into its own premises and cite the resulting record as proof.

### Support

NEI 0.4 identity-must-emerge and anti-circularity rules.

### Disposition

ADMITTED EXACT SUPPORT RESTRICTION.

# A24 central result

The P-vs-NP identity mathematics remains usable, but the native evidence boundary is now explicit:

~~~text
semantic scope definition
    != instantiated qualified NEI result

opaque native handle
    != semantic authority

missing QU family
    != OPEN

scoped SAME
    != global SAME.
~~~

This closes the native-support weakness found in overlay 0.4 without weakening the valid Q-RESIDUAL/Q-EXISTS/Q-MIN/Q-COUNT mathematics.
