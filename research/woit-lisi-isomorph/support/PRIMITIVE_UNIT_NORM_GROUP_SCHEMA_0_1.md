# Primitive Unit-Norm Group Schema 0.1

**Status:** RESEARCH-LOCAL GROUP SUPPORT  
**Native:** PRIMITIVE_UNIT_NORM_GROUP_SCHEMA_0_1.isg

Schema 199000 takes an associative composition algebra with conjugation and exposes its unit-norm elements as a group.

It defines:

~~~text
U(x) IFF x is in the algebra carrier AND N(x)=1.
~~~

Group multiplication is exactly the restricted algebra product.

Group inverse is exactly the algebra anti-involution/conjugation.

The algebra unit is the group identity.

The resulting group is required to instantiate abstract group schema 184001, while the exact restriction relations prevent hidden alternative multiplication/inverse semantics.

For the quaternion source instance this is the unit-quaternion presentation of SU(2). The name SU(2) remains a navigation/source role; the native behavior is carried by the unit-norm group axioms.
