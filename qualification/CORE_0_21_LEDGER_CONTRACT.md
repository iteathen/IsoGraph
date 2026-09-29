# Core 0.21 Rendering-Conservation Ledger Contract

**Status:** qualification/tooling contract; not semantic authority  
**Purpose:** define the minimum machine-readable fields used by Core 0.21 deterministic qualification tooling  
**Semantic authority:** the exact Core 0.21 candidate and its qualified predecessors

A campaign-specific extractor may use any internal representation, but a strict Core 0.21 qualification must derive an equivalent ledger mechanically from the authoritative native bundle plus frozen Source Semantic Census.

## Required top-level fields

~~~text
version
frozen
census[]
nodes[]
dispositions[]
scope_revision
ia_fixed_point
~~~

The frozen object records exact hashes for:

~~~text
qualification target
source interpretation
Source Semantic Census
semantic scope
primitive kernel
QU state or exact NONE marker
governing authority
inference/search profile
~~~

## Census items

Each item requires:

~~~text
id
kind
source provenance
scope reference
semantic body reference
~~~

IDs must be unique.

## Nodes

Each graph-derived node requires:

~~~text
id
classification
authoritative
children[]
source census IDs[]
closure mode
reconstruction path[]
unexpanded dependencies[]
~~~

Permitted authoritative terminal classifications are:

~~~text
CORE_PRIMITIVE
RAW_DATA_ATOM
PRIMITIVE_EXTENTIONAL_INCIDENCE
QUALIFIED_QU_BOUNDARY
~~~

A QUALIFIED_QU_BOUNDARY additionally records:

~~~text
qualified = true
known semantics primitive closed = true
selected realization = false
~~~

## Census dispositions

Exactly one disposition must exist per census item.

Allowed modes:

~~~text
CLOSED_PRIMITIVE
CLOSED_SCHEMA
CLOSED_WITH_QUALIFIED_QU_BOUNDARY
INCOMPLETE_UNEXPANDED
~~~

A disposition records:

~~~text
census ID
closure mode
body roots[]
support roots[]
dependency roots[]
reconstruction path[]
evidence dispositions[]
~~~

Closed modes require a nonempty reconstruction path.

INCOMPLETE_UNEXPANDED is valid historical/diagnostic evidence but makes the ledger non-qualifying for strict primitive closure.

## Schema metadata

CLOSED_SCHEMA requires at least one root with:

~~~text
coverage = EXACT_ALL_AND_ONLY
generator components[]
hidden side conditions unresolved = false
materialization = NONE | PARTIAL | COMPLETE
termination status =
    PROVEN_TERMINATING
    | FIXED_FINITE_COUNT
    | QUALIFIED_QU_TERMINATION
    | NOT_LOAD_BEARING
~~~

Every generator component must resolve through the node graph to permitted authoritative terminal forms.

Materialization need not be complete.

## Scope revision

If present it must record old/new target and scope hashes, removed/added census IDs, changed boundaries, reason, old_target_preserved = true, and in_place_mutation = false.

The new scope hash must equal the frozen current semantic scope hash.

## IA fixed point

When a campaign asserts a current IA fixed point, record the six input hashes named by Core 0.21 and a deterministic ID.

The reference checker computes the ID as SHA-256 of the six UTF-8 values in this exact order separated by newline:

~~~text
primitive kernel
Source Semantic Census
semantic scope
QU state
governing authority
inference/search profile
~~~

Every input must equal the corresponding frozen field.

A mismatch means the fixed point is historical/stale for the current target.

## Deterministic structural gates

The reference checker reports separately:

~~~text
SOUNDNESS_STRUCTURE
COVERAGE
RECONSTRUCTION
SCOPE_INTEGRITY
AUTHORITY_ROUTING_STRUCTURE
IA_FIXED_POINT_CURRENT
STRICT_CLOSURE
~~~

Semantic truth/soundness of domain claims still requires the applicable qualification oracle/reasoner. The deterministic checker validates structural obligations; it does not become a theorem prover.
