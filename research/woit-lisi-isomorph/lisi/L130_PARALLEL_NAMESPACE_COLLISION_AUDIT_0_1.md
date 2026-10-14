# Parallel Local-ID Namespace Collision Audit 0.1

**Status:** DETECTED AND QUARANTINED BEFORE CLOSURE

Two concurrent workers independently allocated the `223xxx` local range.

Collision:

~~~text
complexified-role branch:
    LISI_L05_COMPLEXIFIED_ROLE_CARRIERS_0_1.isg

qualified spacelike-reflection branch:
    LISI_L05_SPACELIKE_GENERALIZED_REFLECTION_SOURCE_INSTANCE_0_2.isg

duplicate declarations:
    20
~~~

The spacelike-reflection branch is already the authoritative L130 partial frontier, so it is preserved byte-for-byte.

The complexified-role branch is reissued as revision 0.2 in:

~~~text
228000–228599
~~~

with no semantic change.

Any descendant that referenced the old collided complexified IDs is stale until explicitly rebased.

No promoted L125/L126/L128/L129 Core-0.21 body depends on the collided branch.
