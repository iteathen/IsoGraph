# Core 0.21 Rendering-Conservation Ledger Contract

**Status:** qualification/tooling contract; not semantic authority  
**Contract version:** core-0.21-ledger-0.2  
**Purpose:** define the minimum machine-readable fields used by Core 0.21 deterministic qualification tooling  
**Semantic authority:** the exact Core 0.21 candidate and its qualified predecessors

A campaign-specific extractor may use any internal representation, but a strict Core 0.21 qualification must derive an equivalent ledger mechanically from the authoritative native bundle plus frozen Source Semantic Census.

Version 0.2 hardens the initial contract after implementation review. It adds canonical recomputation of the census/scope/kernel/QU/authority/profile hashes, authoritative-node reachability, closure-path authority checks, reconstruction-reference checks, grounded-cycle checks, and explicit termination-QU separation. These are qualification-tooling improvements and do not change Core 0.21 semantics.

## Required top-level fields

~~~text
version = core-0.21-ledger-0.2
frozen
scope
governing_authority
inference_profile
census[]
nodes[]
dispositions[]
scope_revision
ia_fixed_point
~~~

## Canonical hashing

The reference checker does not trust self-declared hashes for structures present in the ledger.

It recursively canonicalizes JSON objects by lexicographically sorting object keys. Top-level census and node collections are sorted by stable ID before hashing. Nested array order remains significant.

The checker recomputes:

~~~text
source_semantic_census_sha256
    = SHA256(canonical(census sorted by ID))

semantic_scope_sha256
    = SHA256(canonical(scope))

primitive_kernel_sha256
    = SHA256(canonical(all authoritative nodes sorted by ID))

qu_state_sha256
    = NONE
      when no authoritative QUALIFIED_QU_BOUNDARY exists

      otherwise

      SHA256(canonical(authoritative QU-boundary nodes sorted by ID))

governing_authority_sha256
    = SHA256(canonical(governing_authority))

inference_profile_sha256
    = SHA256(canonical(inference_profile))
~~~

source_interpretation_sha256 remains a pinned external/source artifact hash and therefore is format-checked but not recomputed from the ledger.

Any authoritative graph change therefore changes the primitive-kernel hash and invalidates an IA fixed point that still cites the old hash.

## Scope descriptor

The scope object requires at least:

~~~text
id
declared_census_ids[]
boundary_refs[]
~~~

declared_census_ids must name exactly the current frozen census membership.

A scope revision does not rewrite this object in historical evidence; it creates a new target with its own scope object/hash.

## Governing-authority and inference-profile descriptors

governing_authority and inference_profile are canonical machine-readable descriptors whose exact contents are campaign-specific.

They must be sufficient to distinguish the authority/profile revision used for the current closure claim.

Because their canonical hashes enter the IA fixed-point tuple, changing either descriptor invalidates current IA closure while preserving the old fixed point as historical evidence.

## Census items

Each item requires:

~~~text
id
kind
source_provenance
scope_ref
semantic_body_ref
~~~

IDs must be unique.

## Nodes

Each graph-derived node requires:

~~~text
id
classification
authoritative
authority_owner when authoritative
children[]
source_census_ids[]
closure_mode
reconstruction_path[]
unexpanded_dependencies[]
~~~

Every child reference must resolve to a ledger node.

Every authoritative node:

- must reference at least one valid census item;
- must be reachable from at least one current census disposition;
- must not be a DERIVED_VIEW;
- must not be orphaned outside the closure graph.

Every node traversed by an authoritative body/support/dependency path must itself be authoritative.

Permitted authoritative terminal classifications are:

~~~text
CORE_PRIMITIVE
RAW_DATA_ATOM
PRIMITIVE_EXTENTIONAL_INCIDENCE
QUALIFIED_QU_BOUNDARY
~~~

A CORE_PRIMITIVE leaf is owned by CORE.

A QUALIFIED_QU_BOUNDARY is owned by QU and additionally records:

~~~text
qualified = true
known_semantics_primitive_closed = true
selected_realization = false
~~~

A closure path that terminates only in a support cycle and reaches no permitted terminal form fails strict closure.

## Census dispositions

Exactly one current disposition must exist per census item.

Allowed modes:

~~~text
CLOSED_PRIMITIVE
CLOSED_SCHEMA
CLOSED_WITH_QUALIFIED_QU_BOUNDARY
INCOMPLETE_UNEXPANDED
~~~

A disposition records:

~~~text
census_id
closure_mode
body_roots[]
support_roots[]
dependency_roots[]
reconstruction_path[]
evidence_dispositions[]
~~~

body_roots must be nonempty.

Closed modes require a nonempty reconstruction path containing the census identity. Every other reconstruction-path reference must resolve to a graph node.

INCOMPLETE_UNEXPANDED is valid historical/diagnostic evidence but makes the ledger non-qualifying for strict primitive closure.

CLOSED_PRIMITIVE may not traverse a qualified QU boundary.

CLOSED_WITH_QUALIFIED_QU_BOUNDARY must traverse at least one valid qualified QU boundary.

## Schema metadata

CLOSED_SCHEMA requires at least one body/root node carrying:

~~~text
coverage = EXACT_ALL_AND_ONLY
generator_components[]
hidden_side_conditions_unresolved = false
materialization = NONE | PARTIAL | COMPLETE
termination_status =
    PROVEN_TERMINATING
    | FIXED_FINITE_COUNT
    | QUALIFIED_QU_TERMINATION
    | NOT_LOAD_BEARING
termination_qu_nodes[]
~~~

Every generator component must resolve through the authoritative node graph to permitted terminal forms without relying on unresolved QU.

materialization need not be COMPLETE.

If termination_status = QUALIFIED_QU_TERMINATION, termination_qu_nodes must identify the qualified QU boundary/boundaries that represent the unresolved termination property.

For every other termination status, termination_qu_nodes must be empty.

A CLOSED_SCHEMA closure path may contain QU only through its declared termination_qu_nodes. QU affecting the generator itself requires a different closure treatment; it may not be hidden inside Schema Closure.

## Scope revision

If present, scope_revision must record:

~~~text
old_target_id
old_scope_sha256
new_target_id
new_scope_sha256
removed_census_ids[]
added_census_ids[]
changed_boundaries[]
reason
old_target_preserved = true
in_place_mutation = false
~~~

The target IDs must differ.

The old and new scope hashes must differ.

The new target ID and new scope hash must equal the current frozen target and canonical scope hash.

## IA fixed point

When a campaign asserts a current IA fixed point, record the six Core 0.21 input hashes and a deterministic ID.

The reference checker computes:

~~~text
IA_FIXED_POINT_ID =
SHA256(
    primitive_kernel_sha256
    + newline
    + source_semantic_census_sha256
    + newline
    + semantic_scope_sha256
    + newline
    + qu_state_sha256
    + newline
    + governing_authority_sha256
    + newline
    + inference_profile_sha256
)
~~~

Every input must equal the corresponding recomputed/frozen field.

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

Semantic truth/soundness of domain claims still requires the applicable qualification oracle/reasoner.

The deterministic checker validates structural obligations; it does not become a theorem prover.
