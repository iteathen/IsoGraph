# L-SSC-134 Quaternionic 3×3 Inner-Triality Closure Packet 0.1

**Status:** CANDIDATE CLOSED_SCHEMA — READY FOR CORE-0.21 LEDGER INTEGRATION  
**Source:** L05 §4.2  
**Frozen census:** `L-SSC-134`

The source body is reduced without leaving `sp(3)`, “inner automorphism,” or a root-space rotation as opaque semantic leaves.

## Matrix realization

The three compact factors inside the already-closed `tri(H)` rendering are injected into the quaternion carrier with basis:

~~~text
t1 -> i
t2 -> j
t3 -> k
~~~

and the injection is required to preserve the Lie bracket through the quaternion commutator.

The three typed H roles come from closed L128.

The source matrix is reconstructed entry by entry:

~~~text
[[M,           -KAPPA(v),   psi],
 [v,            P,          -KAPPA(chi)],
 [-KAPPA(psi),  chi,         V]].
~~~

## Inner triality

The printed source matrix

~~~text
g_t = [[0,0,1],
       [1,0,0],
       [0,1,0]]
~~~

acts through exact finite entry-permutation schema 243100, so the statement

~~~text
A' = g_t A g_t^{-1}
~~~

contains no unexpanded matrix-multiplication leaf.

## Orientation evidence

The source separately prints the basis arrows

~~~text
gamma -> Qminus -> Qplus -> gamma
T_M   -> T_V    -> T_P    -> T_M.
~~~

Direct conjugation by the printed `g_t` realizes the inverse orientation.

Both transformations are order three. The packet preserves both source statements and records the evidence disposition:

~~~text
SOURCE_ORIENTATION_DISCREPANCY_OR_CONVENTION_INVERSION
~~~

rather than rewriting either one.

## Root phases

The source statement that a root-space rotation does not by itself determine the phases of root-vector maps is preserved as a raw source non-determination guard. No missing phase assignment is invented.

## Recursive closure check

~~~text
new native/support files:         5
declared new project-local IDs:  25
duplicate declarations:           0
unresolved new local refs:        0
unreachable new files:            0
prior closed bodies:     L125,L128,L132
~~~

The full parent Lie bracket remains owned by L133; it is not required to close the matrix realization and inner action claimed by L134.

No Woit or synthesis semantics occur in this packet.
