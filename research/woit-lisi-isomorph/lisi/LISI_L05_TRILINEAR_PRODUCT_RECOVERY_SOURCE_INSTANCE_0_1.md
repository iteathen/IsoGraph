# L05 Cyclic Trilinear / Product-Recovery Source Instance 0.1

**Status:** SOURCE-LOCAL NATIVE TRIALITY-FORM INSTANCE / PRE-QUALIFICATION  
**Native:** `LISI_L05_TRILINEAR_PRODUCT_RECOVERY_SOURCE_INSTANCE_0_1.isg`  
**Frozen target:** `L-SSC-129`  
**Source:** L05 §3, equation (6) and adjacent text

## Reduced structure

For every frozen ordinary/split coefficient family:

~~~text
C, C', H, H', O, O'
~~~

the source trilinear form is reduced to:

~~~text
T(x,y,z) = B(z, x*y)
~~~

over the represented coefficient carrier.

The generic source-independent semantics come from `220000`:

- product-induced trilinear relation;
- pairing-based recovery relation;
- existence and uniqueness of the recovered product;
- exact `REC <-> PROD` reconstruction.

The source cyclicity statement is separately instantiated through `220001`.

## Typed source form

The source roles remain distinct.

For each coefficient family, a typed scalar relation

~~~text
T_typed(v, psi, chi, r)
~~~

is defined only by transporting:

~~~text
v   -> coefficient x
psi -> coefficient y
chi -> source tilde/conjugated coefficient z
~~~

through the already-closed L128 coefficient maps and then evaluating the coefficient trilinear relation.

The typed relation is explicitly instantiated as a scalar trilinear form over the three represented role vector spaces.

## Product recovery

The recovery relation is defined only from the scalar functional and bilinear pairing:

~~~text
REC(x,y,h)
iff
for every represented probe z and scalar r,
    T(x,y,z,r) iff B(z,h,r).
~~~

The schema then requires:

~~~text
REC(x,y,h) iff PROD(x,y,h).
~~~

Thus L05's statement that the multiplication can be recovered from the triality form is represented as structure, not prose.

## Ordinary-O discrepancy

The version-of-record ordinary-O table remains inconsistent with the source cyclic/composition package.

The trilinear definition and recovery relation are still representable from the exact source table and metric.

The cyclicity assertion is preserved as source semantics and remains inconsistent on the same localized ordinary-O coefficient triples already exposed by L126.

No source repair is used.

## Firewall

No Woit semantics, bridge mapping, or unification hypothesis occurs in this instance.
