# Primitive Hodge-Pairing / Chiral Projection Schema 0.1

**Status:** RESEARCH-LOCAL ACTION SUPPORT  
**Native:** PRIMITIVE_HODGE_PAIRING_ACTION_SCHEMA_0_1.isg

## 209000 — Hodge-compatible integrated pairing

209000 takes a Hodge eigensplit package (205511) and a scalar-valued bilinear functional PAIR.

PAIR is required to be:
- bilinear;
- symmetric;
- Hodge self-adjoint: PAIR(*u,v)=PAIR(u,*v).

The scalar field is required to have 2 != 0.

This is the finite axiomatic interface needed for the W02 quantity represented source-side as:

~~~text
integral Tr(alpha wedge beta).
~~~

The schema deliberately abstracts away:
- pointwise manifold enumeration;
- a particular gauge Lie algebra basis;
- numerical integration.

Those semantics are not erased; they remain source-specific obligations outside this functional interface.

## 209001 — exact self-dual projection

209001 defines a total projection PPLUS from the Hodge-split carrier to its PLUS eigenspace:

~~~text
PPLUS(x)=p
IFF
p is PLUS
and
x=p+m for some MINUS value m.
~~~

The unique PLUS/MINUS decomposition already guaranteed by 205511 makes the projection exact.

## Derived consequence

For p in PLUS and m in MINUS, Hodge self-adjointness gives:

~~~text
PAIR(p,m)=0
~~~

because LP != LM and 2 != 0 in the W02 Euclidean instantiation.

This is the algebraic reason the ordinary Yang-Mills functional splits into independent self-dual and anti-self-dual contributions.
