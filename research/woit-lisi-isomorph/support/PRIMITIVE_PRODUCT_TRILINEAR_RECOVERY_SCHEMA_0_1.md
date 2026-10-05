# Primitive Product-Induced Trilinear / Recovery Schema 0.1

**Status:** RESEARCH-LOCAL GENERIC SUPPORT  
**Native:** `PRIMITIVE_PRODUCT_TRILINEAR_RECOVERY_SCHEMA_0_1.isg`

## 220000 — product-induced scalar trilinear with product recovery

Given a source composition-algebra presentation with product `PROD`, nondegenerate bilinear form `B`, and norm `Q`, 220000 introduces two relations:

~~~text
T(x,y,z,r)
REC(x,y,h)
~~~

`T` is exactly the scalar pairing

~~~text
r = B(z, x*y)
~~~

represented by quantified primitive incidence.

`REC(x,y,h)` means that `h` has exactly the same represented scalar pairings against every probe `z` as the trilinear functional `T(x,y,z,-)`.

The schema explicitly requires:

- existence of a recovery value for every represented pair `x,y`;
- uniqueness of that recovery value.

Thus the product is recoverable from the trilinear functional plus the represented nondegenerate pairing without introducing a named duality or Riesz-representation primitive.

The schema also instantiates the generic trilinear-form schema 185005. It does not assert cyclicity.

## 220001 — cyclicity of a scalar trilinear form

220001 requires an already rendered scalar trilinear form and expands the source statement

~~~text
T(x,y,z) = T(y,z,x)
~~~

as a quantified biconditional over the represented scalar-output relation.

No triality group, role permutation, exceptional algebra, or physical interpretation is imported.

## Boundary

These are representation schemas only. A source instance must separately provide its carrier, product, bilinear form, coefficient-role transports, and any evidence/consistency disposition.
