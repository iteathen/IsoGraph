# Glycan DP resistance-chain finite sanity check 0.1

**Status:** finite sanity evidence only; not a proof substitute
**Date:** 2026-09-27
**Parent:** GLYCAN_DP_IMPLICIT_ADMISSIONS_A13_0_1.md

A small exhaustive model check tested the A13 resistance-frontier recurrence against the original saturated terminal-deletion dynamics.

## Enumeration scope

For carrier sizes n=1..4:

- every subset of possible acyclic child-to-parent edges i->j with i<j;
- a two-operator alphabet;
- every susceptibility support choice for each operator;
- every treatment word of lengths 1 through 4.

Initial active state was the complete non-target carrier.

For every case the checker compared:

1. original operational execution by repeatedly deleting one susceptible terminal node until saturation for each phase;
2. the A13 resistant endpoint recurrence:

~~~text
B_1 = N_(e_1)

B_(i+1)
=
N_(e_(i+1))
intersection
upward_closure(B_i);
~~~

3. reconstructed active state:

~~~text
A_i = upward_closure(B_i);
~~~

4. the success/failure criterion:

~~~text
word fails IFF B_k is nonempty.
~~~

## Results

Cases checked:

~~~text
507,960
~~~

Mismatches between operational final active state and recurrence reconstruction:

~~~text
0
~~~

Mismatches in success/failure classification:

~~~text
0
~~~

The tested models include:

- branching DAGs;
- repeated resistance at the same node across multiple phases;
- operators with empty/full/intermediate susceptibility;
- phase no-ops;
- same-phase cascades.

## Boundary

This finite check does not prove A13.

Semantic authority remains the direct inductions in G-IA280–G-IA291.

Its purpose is to falsify obvious orientation, strictness, or recurrence errors before downstream reuse.

## Disposition

~~~text
finite sanity evidence:
    SUPPORTS A13

semantic proof authority:
    A13 direct support

proof replacement:
    NO
~~~
