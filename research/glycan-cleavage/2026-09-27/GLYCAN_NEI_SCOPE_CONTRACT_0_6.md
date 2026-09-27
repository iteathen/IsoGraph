# Glycan cleavage NEI semantic scope contract 0.6

**Status:** successor scope contract after DP-fed A14
**Date:** 2026-09-27
**Supersedes for current campaign routing:** GLYCAN_NEI_SCOPE_CONTRACT_0_5.md while retaining all earlier scopes
**Qualified identity authority:** NEI 0.4
**Qualified unknown authority:** QU 0.1

Version 0.6 adds the unique dominance-boundary and finite pattern-language scopes exposed by A14.

## Q-G-DOMINANCE-MINIMAL-BOUNDARY

Fix one frozen instance, its raw operator alphabet EL, and exact effective-susceptibility preorder <=M.

Identity object:

~~~text
B_M
=
the exact set of <=Msub-minimal solving raw words.
~~~

A14 proves B_M is unique for the fixed pair:

~~~text
(L_global, <=Msub).
~~~

Scoped SAME means exact raw-word set equality under the fixed alphabet correspondence.

One basis word present on one side and absent on the other is a separating witness.

## Q-G-DOMINANCE-PATTERN-LANGUAGE

For each B=[a_1,...,a_m] in B_M define finite symbol classes:

~~~text
UP(a_i)
=
{ b in EL |
  S*_a_i subseteq S*_b }.
~~~

The identity object is the exact finite union of set-valued ordered subsequence patterns:

~~~text
union over B in B_M of

Sigma*
UP(a_1)
Sigma*
...
UP(a_m)
Sigma*.
~~~

A14 proves this language is exactly L_global.

Different serialized pattern orders or construction procedures are irrelevant when the resulting exact language is equal.

## Relation to earlier basis scopes

B_M is a raw-word set value distinct from B_global in general.

The following are exact alternate complete-language representations under their attached expansion authority:

~~~text
B_global
+
ordinary subsequence upward closure

and

B_M
+
<=Msub upward closure.
~~~

Therefore neither basis set is declared SAME as the other merely because both reconstruct L_global.

Their reconstructed complete language values are SAME.

## Q-G-DECISION-BOUNDARY

Fix <=Msub.

The exact decision boundary is:

~~~text
minimal TRUE words = B_M.
~~~

The FALSE region is the complementary downset.

No finite maximal-FALSE value is part of this scope unless separately established for a narrower instance.

## Global identity boundary

No B_M result identifies:

- raw operators globally;
- raw words with their dominating variants;
- pattern-construction algorithms;
- basis enumeration records.

A basis word and a strictly dominating solution word are distinct raw word values even though one generates the other under <=Msub.

## QU boundary

All values are exact under frozen 0.1 susceptibility and transition semantics.

A successor model with uncertain effective susceptibility must route <=M, <=Msub, B_M, and the pattern language through qualified QU realization families.
