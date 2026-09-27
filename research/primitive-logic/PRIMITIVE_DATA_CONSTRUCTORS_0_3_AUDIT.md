# Primitive finite-data constructors 0.3 — finite-carrier closure audit

**Status:** unqualified successor

0.3 closes the carrier mismatch found during the P-vs-NP primitive audit.

## Corrections

- `7400` is now the single universal raw finite-data element carrier used by primitive lists.
- Boolean raw values are explicitly members of that carrier.
- every list-carrier object is constrained to be either NIL or a CONS with a `7400` head and list tail;
- NIL and CONS are disjoint;
- HEAD and TAIL fields are functional;
- every list object has some primitive-natural length, excluding cyclic/non-finite list objects under the primitive Peano theory;
- membership and length remain full biconditional constructor definitions.

This makes a list an explicitly finite constructor object rather than an opaque container or arbitrary graph.

The pair carrier remains available but is not load-bearing for the new standard P-vs-NP truth kernel.
