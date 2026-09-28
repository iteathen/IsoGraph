# Experiment 048 Attempt 1 Review

**Workflow run:** 36361985554  
**Source SHA:** a96f63b544fef6a6af944d6b0022a52299299ce0  
**Formal candidate disposition:** none  
**Failure owner:** qualification output-schema contract

## Observation

The isolated decoder completed successfully and returned all 18 cases in exact order, no duplicates, no unexpected cases, a fully passing self-audit, and module assessment `SUPPORTED`.

The hidden scorer nevertheless marked all 18 cases failed.

## Cause

The hidden assertion file expected exact answer-field names such as:

- `primitive_complete`;
- `named_node_status`;
- `definition_must_expand`.

The public prompt said to use "exactly the fields requested by the case contract", but the public case text did not actually publish those field names.

The decoder therefore returned semantically equivalent fields such as:

- `primitive_completeness`;
- `linked_as_authoritative_leaf`.

The scorer treated this undisclosed serialization difference as semantic failure.

## Disposition

    HARNESS / PUBLIC-SCHEMA DEFECT CONFIRMED
    Core 0.20 semantic qualification: NOT ADJUDICATED

This run MUST NOT be described as a Core 0.20 semantic rejection.

The frozen output may be inspected diagnostically, but it cannot be retroactively rescored into a formal pass under a later schema.

## Minimum causal repair

1. publish the exact per-case answer-field names, but not their expected values;
2. include that public schema in the cold packet;
3. update the cold prompt to require those public fields;
4. update the runner isolation test to require the schema;
5. run deterministic RED then GREEN;
6. execute a fresh isolated decoder run.

The hidden expected answers remain unchanged.
