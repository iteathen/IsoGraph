# L-SSC-130 Generalized Reflection Closure Packet 0.1

**Status:** CANDIDATE CLOSED_SCHEMA — READY FOR CORE-0.21 LEDGER INTEGRATION  
**Source:** L05 §3  
**Frozen census:** corrected `L-SSC-130` in `SOURCE_SEMANTIC_CENSUS_0_2.json`

The source body is now reduced into separate invariant structures rather than a named "generalized reflection" leaf.

## Spacelike branch

For `s_u=+1`, the native graph contains:

- all three typed reflection formulas;
- odd-reflection involution;
- typed triality anti-invariance;
- invariant even two-reflection compositions.

## Time-like branch

For split C', H', O':

- negative-norm directions are explicit;
- `sqrt(s_u)=i` is represented by the Lisi complex field with `i*i=embed(-1)`;
- the three odd reflection maps land in exact complexified role carriers;
- scalar-extended triality is explicit;
- odd anti-invariance is explicit.

## Arbitrary complexified inputs

Each fixed-direction reflection is decomposed into three parameterized linear components.

Schema `231000` gives their C-linear extension from the embedded real basis to the complete finite scalar-extension carrier.

The native graph then reconstructs:

- whole complex-domain odd reflections;
- arbitrary pairs of odd reflections;
- complex-domain odd anti-invariance;
- invariance of arbitrary even compositions.

Finite controls give:

~~~text
odd basis cases:   6,552
even basis cases: 76,104
failures:              0
~~~

## Real-form boundary

L05's later statement that some explicit-i automorphisms are real relative to an alternate anti-linear real structure is frozen under `L-SSC-135`.

It is therefore not imported into L130 merely to make the time-like branch look real.

## Dependency audit

~~~text
new native/schema files:      18
declared project-local IDs:  448
duplicate declarations:        0
unresolved local refs:         0
unreachable files:             0
prior closed bodies reused:
    L125-BODY
    L128-BODY
    L129-BODY
~~~

The ordinary-O inconsistency remains an evidence disposition on the spacelike source branch. No repair is used.

Candidate disposition:

~~~text
CLOSED_SCHEMA
coverage = EXACT_ALL_AND_ONLY
materialization = COMPLETE
termination = NOT_LOAD_BEARING
~~~
