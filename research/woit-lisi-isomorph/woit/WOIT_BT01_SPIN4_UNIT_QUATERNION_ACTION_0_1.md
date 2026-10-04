# Woit BT01 Spin(4) Unit-Quaternion Action 0.1

**Status:** SOURCE-LOCAL AXIOMATIC ACTION INSTANCE — PRE-SEAL  
**Native:** WOIT_BT01_SPIN4_UNIT_QUATERNION_ACTION_0_1.isg  
**Source:** W01 §2.1; quaternion presentation support from W01/W05

## SU(2) factors without opaque group labels

199102 is the unit-norm subgroup of Woit's exact quaternion carrier 189310.

Its multiplication and inverse are:
- source quaternion product 189315;
- source quaternion conjugation 189317.

Through 199000 it is a genuine group.

The Woit Spin(4) decomposition uses two independent **roles** of this SU(2)-presentation:
- 199106 = left factor role;
- 199107 = right factor role.

Using one underlying unit-quaternion presentation does not identify the two factor roles.

## Source vector action

199105 is defined exactly by:

~~~text
ACT(g_L,g_R,x,y)
IFF
y = g_L x g_R^{-1}.
~~~

The inverse is the exact unit-quaternion group inverse.

Thus W-A0-040 is reconstructed without leaving:
- SU(2);
- inverse;
- or group action

as opaque behavior.

## Scope

This closes the algebraic Spin(4) action used by the BT01 slice.

It does not yet close:
- topology/smooth Lie-group structure;
- global bundle actions;
- W-A0-002's later physical/internal role interpretation.

## Closure disposition

~~~text
W-A0-040:
    CLOSED_SCHEMA_SOURCE_INSTANCE
~~~
