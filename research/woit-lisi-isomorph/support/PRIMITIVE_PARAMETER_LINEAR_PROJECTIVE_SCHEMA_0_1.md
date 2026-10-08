# Primitive Parameter-Linear Projective Action Schema 0.1

**Status:** RESEARCH-LOCAL BRIDGE SUPPORT — CURRENT MINIMAL BT01 FRONTIER  
**Native:** PRIMITIVE_PARAMETER_LINEAR_PROJECTIVE_SCHEMA_0_1.isg

## Correction addressed

The earlier 187200 typed-bilinear schema made the parameter carrier V and both chiral carriers vector spaces over the same scalar field.

That is a legitimate stronger schema, but it is not necessary for the twistor-incidence bridge and can be too strong for source-faithful Euclidean/quaternionic instantiation.

The actual minimum requirement is:

~~~text
parameter carrier V
complex/scalar vector spaces S_minus and S_plus
for each v in V:
    A_v : S_minus -> S_plus is linear.
~~~

No scalar multiplication on V is required by the projectivization step.

## 187300

187300 requires:
- one abstract field C;
- S_minus and S_plus vector spaces over C;
- an arbitrary parameter carrier V;
- a total action ACT(v,s,t);
- additivity and C-linearity in the spinor argument s.

Thus each parameter v selects a linear map A_v.

## 187301

187301 is the composite bridge view:

~~~text
187300 parameter-linear action
+ 187206 quotient of nonzero chiral pairs
+ 187207 parameterized projective incidence.
~~~

This is now the preferred neutral BT01 abstraction frontier.

## Relation to 187200

~~~text
187200:
    stronger
    bilinear in parameter and spinor over one field

187300:
    weaker
    parameter is only an index/carrier
    action is linear only where projectivization needs it
~~~

If a source proves 187200, it automatically has the structural content needed for 187300 after projection.

A source that only proves 187300 is not promoted to 187200.

## Source relevance

### Woit
For Euclidean Woit geometry the parameter may be a real/quaternionic spacetime vector while S_R and S_L carry complex structures.

The fixed parameter acts complex-linearly on the selected spinor presentation.

### Lisi
The quaternionic relation is naturally real before a compatible complex structure is chosen. After the quaternionic/complex lift is made explicit, fixed left multiplication supplies the required complex-linear map on the spinor representative.

## Current disposition

187300/187301 replace 187200/187208 as the preferred **minimum** bridge candidate.

The stronger schemas remain valid refinements and are not retracted.
