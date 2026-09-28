# Glycan cleavage NEI pass 5 — treatment-language identity 0.1

**Status:** exact scoped identity pass complete
**Date:** 2026-09-27
**Inputs:** A0-A5 + NEI passes 1-4
**Authority:** qualified NEI 0.4 + QU 0.1

A5 supplies exact recursive authority for Q-G-SUBTREE-SOLVE values. This pass applies identity only to those exact language/objective values.

## G-N044 — Q-G-SUBTREE-SOLVE now has an exact recursive construction

For every represented node r, A5 defines L_r exactly from finite child-language values, target membership, and root susceptibility.

Therefore instantiated equality of two L_r values is admissible exact evidence for:

~~~text
Q-G-SUBTREE-SOLVE SAME.
~~~

A separating raw treatment word gives Q-G-SUBTREE-SOLVE DISTINCT.

No raw subtree identity follows.

## G-N045 — mutual child-language dominance is exactly language SAME

For subtree languages:

~~~text
L_a subset L_b
AND
L_b subset L_a

IFF

L_a = L_b.
~~~

Thus mutual solve-language dominance gives Q-G-SUBTREE-SOLVE SAME.

One-way inclusion remains ordinary dominance.

## G-N046 — equal child-language values are recursively substitutable

If two child occurrences are Q-G-SUBTREE-SOLVE SAME, either language value may occupy that position in the A5 parent language equation without changing the parent language.

This is exact substitution of scoped values.

The raw child occurrences remain separately represented.

## G-N047 — structurally different subtrees may be objective-language SAME

A5 no longer requires equal SIG or RESP for recursive objective substitution.

If exact language equality is established:

~~~text
L_a = L_b,
~~~

then a and b are Q-G-SUBTREE-SOLVE SAME even if their SIG values differ.

This is a genuine coarser objective identity.

It must be proved from exact language semantics, not guessed from finite examples.

## G-N048 — inclusion-minimal child-language antichain is a parent objective-interface value

For one parent p, define:

~~~text
MINCHILD(p)
=
set of inclusion-minimal distinct child L_c values.
~~~

A5 proves that the intersection of all child constraints equals the intersection over MINCHILD(p).

Thus exact equality of MINCHILD values gives scoped SAME of the parent child-constraint interface.

This is identity of the objective-interface value, not identity of child collections.

## G-N049 — language dominance is not identity

When:

~~~text
L_hard proper-subset L_easy,
~~~

the easier child constraint is redundant in conjunction, but the two language values are DISTINCT under Q-G-SUBTREE-SOLVE.

Redundancy does not become SAME.

This distinction is required to preserve NEI discipline.

## G-N050 — raw instance and recursive L_root representation are solution-language SAME

A5 gives:

~~~text
raw solution language
=
L_root.
~~~

Therefore the verified primitive problem and the recursive language representation are scoped SAME under Q-G-INSTANCE-SOLUTION-LANGUAGE.

They remain different representations globally.

## G-N051 — equal global language fixes the complete optimum-family value

Because the objective is shortest word in the exact global language:

~~~text
same L_global
->
same minimum length
AND
same complete set of raw minimum words.
~~~

Thus solution-language SAME is stronger than Q-G-MIN-REMAIN or optimum-value SAME.

## G-N052 — finite recognizer implementation does not define identity

Different finite recognizers may accept the same exact L_r.

Automaton/state-layout equality is not required for Q-G-SUBTREE-SOLVE SAME.

Conversely, sharing a recognizer shape without an exact accepted-language theorem does not establish SAME.

## G-N053 — no new raw global identity or semantic UNKNOWN

All language identities are exact scoped values.

Raw residues, raw operators, raw subtrees, traces, and trajectory-list objects remain governed by their separate identity questions.

No uncertainty enters the frozen 0.1 language equations, so semantic UNKNOWN is not introduced.

## Pass-5 NEI disposition

~~~text
new exact scoped language laws:  9
new raw-object identity results: 0
new semantic UNKNOWN results:    0
new QU refinements:              0
~~~

This pass adds no new transition or objective semantics beyond A5.

A complete implicit re-pass is now required. If it produces no new exact assertion or support refinement, a final NEI no-new pass will establish the operational fixed point for the declared scope.
