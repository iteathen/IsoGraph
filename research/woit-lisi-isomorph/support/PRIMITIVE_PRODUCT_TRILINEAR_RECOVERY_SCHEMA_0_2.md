# Primitive Product-Induced Trilinear / Recovery Schema 0.2

**Status:** RESEARCH-LOCAL GENERIC SUPPORT  
**Native:** `PRIMITIVE_PRODUCT_TRILINEAR_RECOVERY_SCHEMA_0_2.isg`  
**Predecessor:** 0.1

## Correction

Revision 0.1 defined the recovery relation entirely through scalar pairings against the trilinear form and asserted existence/uniqueness, but did not explicitly identify the recovered value with the original product relation.

Revision 0.2 adds the exact biconditional:

~~~text
REC(x,y,h) iff PROD(x,y,h)
~~~

for represented carrier members.

Because `REC` itself is defined only through:

~~~text
T(x,y,z,-)
and
B(z,h,-)
for every represented probe z,
~~~

the product is now natively reconstructible from the trilinear functional plus the nondegenerate pairing, rather than merely being known to have a unique pairing representative.

## 220000

220000 now contains all of:

- composition-algebra support;
- exact product-induced scalar trilinear definition;
- trilinearity;
- pairing-based recovery definition;
- existence and uniqueness of recovery;
- exact equality of the recovery graph and the original product graph.

## 220001

Unchanged: source cyclicity is a quantified biconditional

~~~text
T(x,y,z,r) iff T(y,z,x,r).
~~~

No triality group or physical interpretation is imported.
