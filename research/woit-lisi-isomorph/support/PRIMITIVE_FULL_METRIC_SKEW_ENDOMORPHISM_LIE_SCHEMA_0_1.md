# Primitive Full Metric-Skew Endomorphism Lie Schema 0.1

**Status:** RESEARCH-LOCAL STRUCTURAL SUPPORT  
**Native:** `PRIMITIVE_FULL_METRIC_SKEW_ENDOMORPHISM_LIE_SCHEMA_0_1.isg`

## 227000

227000 represents a Lie algebra **extensionally** as all metric-skew linear endomorphisms of a nondegenerate symmetric quadratic space.

It requires:

1. a quadratic space through schema 185002;
2. a Lie-algebra carrier through schema 184004;
3. a bilinear action of the Lie carrier on the vector carrier through schema 187200;
4. every represented action is skew with respect to the bilinear form;
5. the action is faithful: two Lie elements with the same action are equal;
6. completeness: every represented linear endomorphism relation that is metric-skew is the action of some Lie element;
7. the Lie bracket acts exactly as the commutator of endomorphisms.

The completeness clause quantifies over relation objects directly. Therefore the schema does not infer equality with a named classical Lie algebra merely from matching dimensions.

## Non-coverage

The schema contains no dimension, signature, Spin/SO name, matrix presentation, or physical interpretation.

A source instance must separately supply the vector dimension/signature and a finite presentation of the Lie carrier when those are load-bearing.
