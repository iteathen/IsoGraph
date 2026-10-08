# L05 Time-Like Generalized Reflection Source Instance 0.1

**Status:** SOURCE-LOCAL TIME-LIKE BRANCH / PRE-QUALIFICATION  
**Native:** `LISI_L05_TIMELIKE_GENERALIZED_REFLECTION_SOURCE_INSTANCE_0_1.isg`  
**Frozen target:** corrected `L-SSC-130` in `SOURCE_SEMANTIC_CENSUS_0_2.json`

## Scope

Only split families admit represented negative-norm unit directions:

~~~text
C', H', O'
~~~

This file renders exactly the source branch:

~~~text
s_u = -1
sqrt(s_u) = i.
~~~

Relation `229000` pins the source phase to the represented Lisi imaginary unit and checks `i*i = embed(-1)`.

## Typed formulas

The authoritative spacelike 0.2 formulas are reused at coefficient level with the source sign changed to `s_u=-1`.

For each reflection:

- the role preserved by the odd reflection has coefficient factor `-s_u=+1` and is embedded into the complexified target with no extra phase;
- the two exchanged roles are embedded into their complexified targets and multiplied by the source imaginary unit.

The three split-family relation sets are:

~~~text
C':  229100 / 229101 / 229102
H':  229300 / 229301 / 229302
O':  229500 / 229501 / 229502
~~~

for vector-, negative-spinor-, and positive-spinor-directed generalized reflections respectively.

## Positive-chiral convention

The positive-chiral output follows the corrected spacelike 0.2 typed semantics. It is reconstructed through the L128 tilde coefficient map before scalar extension; the stale 0.1 all-branch handling is not reused.

## Boundary

This file closes the explicit time-like reflection **map formulas and sqrt-sign branch**.

It does not yet claim:

- anti-invariance of the scalar-extended triality form;
- invariance of arbitrary even time-like reflection compositions;
- identification of complexified outputs with a chosen real form;
- the later alternate anti-linear real-structure statement.

Those are separate successor obligations.

No Woit or synthesis semantics are used.
