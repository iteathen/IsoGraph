# L05 Complexified Role Carriers 0.1

**Status:** SOURCE-LOCAL SCALAR-EXTENSION SUPPORT / NAMESPACE-CORRECTED / PRE-QUALIFICATION  
**Native:** `LISI_L05_COMPLEXIFIED_ROLE_CARRIERS_0_2.isg`  
**Uses:** closed L128 role copies, Lisi-local complex field, finite scalar-extension schema 222000–222002

## Purpose

L05 generalized reflections contain the source factor:

~~~text
sqrt(s_u)
~~~

with:

~~~text
s_u = +1  -> sqrt(s_u)=1
s_u = -1  -> sqrt(s_u)=i.
~~~

The time-like split branch therefore cannot be represented honestly as a map only between the existing real role carriers.

This file constructs explicit scalar extensions of every L05 source role:

~~~text
V, Q_minus, Q_plus
~~~

for all six coefficient families:

~~~text
C, C', H, H', O, O'.
~~~

Each target is a vector space over the already-rendered Lisi complex field `198100`, and each real role embeds basis-by-basis through a real-linear injection.

## What this does not assert

A complexified role is not identified with the original real role.

This file does not say that time-like generalized reflections preserve a chosen real form. L05's later Lie-algebra argument uses an alternative anti-linear real-structure operator for that claim; that is a separate source obligation.

It also does not assert any generalized reflection formula yet.

## Reconstruction map

### C
- V: real 218000 -> complex 228000 via 228020
- M: real 218020 -> complex 228030 via 228050
- P: real 218040 -> complex 228060 via 228080

### Cprime
- V: real 218100 -> complex 228100 via 228120
- M: real 218120 -> complex 228130 via 228150
- P: real 218140 -> complex 228160 via 228180

### H
- V: real 218200 -> complex 228200 via 228220
- M: real 218220 -> complex 228230 via 228250
- P: real 218240 -> complex 228260 via 228280

### Hprime
- V: real 218300 -> complex 228300 via 228320
- M: real 218320 -> complex 228330 via 228350
- P: real 218340 -> complex 228360 via 228380

### O
- V: real 218400 -> complex 228400 via 228420
- M: real 218420 -> complex 228430 via 228450
- P: real 218440 -> complex 228460 via 228480

### Oprime
- V: real 218500 -> complex 228500 via 228520
- M: real 218520 -> complex 228530 via 228550
- P: real 218540 -> complex 228560 via 228580


## Namespace correction

Revision 0.1 used the 223xxx range concurrently with the independently developed spacelike-reflection branch.

That collision was detected before the complexified/time-like branch was admitted to a Core-0.21 closure packet.

Revision 0.2 moves this entire local namespace by +5000:

~~~text
223000–223599 -> 228000–228599
~~~

No source semantics change.
