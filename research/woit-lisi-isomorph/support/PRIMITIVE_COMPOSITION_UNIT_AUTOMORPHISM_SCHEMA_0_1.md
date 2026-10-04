# Primitive Composition Unit-Locus / Automorphism Schema 0.1

**Status:** RESEARCH-LOCAL B05 SUPPORT  
**Native:** PRIMITIVE_COMPOSITION_UNIT_AUTOMORPHISM_SCHEMA_0_1.isg

## 187700 — unit-norm locus of a composition algebra

187700 imports the already closed composition-algebra schema 185003 and defines:

~~~text
U(x)
IFF
x belongs to the algebra carrier
AND
Q(x) = 1.
~~~

No sphere name, dimension, octonion label, or topology is imported.

For a positive-definite eight-real-dimensional octonion instance, U becomes the familiar S7, but that is a source-specific refinement.

## 187701 — norm-preserving algebra automorphism

187701 defines an automorphism as a bijective linear endomorphism F that:
- fixes the unit;
- preserves the represented product;
- preserves the represented norm Q.

Injectivity and surjectivity are represented explicitly rather than inferred from finite dimension.

No named automorphism group such as G2 is imported.

## 187702 — unit-locus preservation

From 187701, a norm-preserving automorphism maps U to U.

This is a derived-view support surface.

## B05 use

The current B05 abstraction ladder can now separate:

~~~text
B05.0
composition algebra + unit-norm locus

B05.1
norm/product-preserving automorphism structure

B05.2
triality refinement using 185006

B05.3
source-specific generation interpretation.
~~~

Woit independently supplies only part of this ladder as developed theory; his S7/octonion generation role is explicitly speculative.

Lisi develops the algebra/triality structure much further.

The residual asymmetry must remain visible.
