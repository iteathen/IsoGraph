# L05 Ordinary-Octonion Multiplication-Table Source Discrepancy 0.1

**Status:** SOURCE-INTERNAL DISCREPANCY  
**Track:** L only  
**Source:** L05 version of record, §2, multiplication table (1) and the adjacent metric/conjugation equations  
**Affected frozen census:** `L-SSC-125`, downstream `L-SSC-126`

## Source facts preserved

The version-of-record table gives:

~~~text
e6 e7 = -e2
e7 e6 = -e2
~~~

The same source section also states:

~~~text
KAPPA(xy) = KAPPA(y) KAPPA(x)
KAPPA(ei) = -ei for i>0
n_ab = delta_ab for the ordinary division algebras.
~~~

These are preserved as distinct source assertions. They are not normalized to a textbook octonion table.

## Direct contradiction

Using only those source facts:

~~~text
KAPPA(e6 e7)
    = KAPPA(-e2)
    = +e2

KAPPA(e7) KAPPA(e6)
    = (-e7)(-e6)
    = e7 e6
    = -e2.
~~~

So the source table and the source conjugation-order rule cannot both hold over the represented real carrier.

## Composition witness

The same table gives a stronger finite witness.

Let:

~~~text
x = e0 - e6
y = e2 - e7.
~~~

Expanding with the displayed table gives:

~~~text
xy = 0.
~~~

But the source ordinary-octonion metric is positive definite:

~~~text
Q(x)=2
Q(y)=2.
~~~

Hence source norm composition would require:

~~~text
Q(xy)=4,
~~~

while the table gives zero.

## Falsifier

A deterministic sparse-coefficient test checks 73 vectors and 5,329 ordered pairs.

~~~text
exact ordinary-O source table:
    norm-composition failures       28
    conjugation-order failures     506

split-quaternion control:
    0 / 0

split-octonion control:
    0 / 0
~~~

The controls make this a localized ordinary-O table discrepancy rather than a generic verifier error.

## Repair diagnostic — quarantined

Changing only:

~~~text
e6 e7 : -e2 -> +e2
~~~

makes both sparse falsifiers pass.

Changing the opposite entry instead restores anti-commutation but still leaves composition failures.

The passing sign flip is therefore a useful repair diagnostic, but it is **not source semantics** and is not used to close Track L.

## IsoGraph disposition

This is handled according to the campaign's clue-preserving discrepancy rule:

~~~text
source table:
    PRESERVED

source conjugation/composition claims:
    PRESERVED

evidence disposition:
    INCONSISTENT_SOURCE

silent correction:
    FORBIDDEN
~~~

The existing native table artifact remains useful as a faithful rendering of the inconsistent source claims. It must not be cited as a consistency-qualified composition-algebra witness without this discrepancy record.
