# Primitive Bivariate Action / First-Variation Interface 0.1

**Status:** RESEARCH-LOCAL VARIATIONAL SUPPORT  
**Native:** PRIMITIVE_BIVARIATE_ACTION_VARIATION_SCHEMA_0_1.isg

## 211000

211000 represents an action on two configuration carriers X and Y together with first variations in explicitly represented variation spaces DX and DY.

It requires:
- a scalar field;
- vector-space structure on DX and DY;
- a total action ACT:X x Y -> scalar;
- total single-valued first-variation relations VARX and VARY;
- stationary predicates defined exactly by vanishing of the relevant first variation for every allowed variation direction.

Thus:

~~~text
STATX(x,y)
IFF
VARX(x,y,dx)=0 for every dx in DX

STATY(x,y)
IFF
VARY(x,y,dy)=0 for every dy in DY.
~~~

## Deliberate limitation

This is an axiomatic first-variation interface.

It does not derive VARX/VARY from limits, topology, or functional analysis. A source instance must separately justify which relations are the first variations of its action.

For the W02 chiral-GR claim this is the appropriate boundary before a full calculus/manifold layer is rendered.
