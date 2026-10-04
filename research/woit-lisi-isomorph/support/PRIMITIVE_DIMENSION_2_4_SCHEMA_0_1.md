# Primitive Complex Dimension 2 / 4 Basis Schemas 0.1

**Status:** RESEARCH-LOCAL FINITE-BASIS SUPPORT  
**Native:** PRIMITIVE_DIMENSION_2_4_SCHEMA_0_1.isg

## Purpose

The BT01 common core itself is dimension-free.

The stronger Euclidean twistor refinement requires exact witnesses for:
- two-dimensional complex chiral spaces;
- four-dimensional complex twistor space.

Dimension is not accepted as a numeric label. These schemas represent finite bases by spanning and linear-independence formulas.

## 187600 — exact two-dimensional vector-space presentation

Given a vector space V over field C and candidate basis values e1,e2:

1. e1,e2 belong to V;
2. if a e1 + b e2 = 0, then a=b=0;
3. every v in V is some a e1 + b e2.

This is an exact finite basis witness.

## 187601 — exact four-dimensional vector-space presentation

Given e1,e2,e3,e4:

1. all four belong to V;
2. a e1 + b e2 + c e3 + d e4 = 0 implies all coefficients zero;
3. every v in V has such a four-coefficient expansion.

The represented sum is grouped into two pairs; vector-space associativity makes the grouping representational only.

## What this closes

The schemas close the meanings:

~~~text
"V has an explicitly represented basis of length 2"
"V has an explicitly represented basis of length 4"
~~~

under the abstract field/vector-space support.

They do not identify:
- the field with standard C;
- H with C2;
- H2 with C4;
- any source basis with these witnesses.

Those are source-local maps.

## BT01 use

A future source packet can instantiate:

~~~text
S_minus: 187600
S_plus:  187600
T:       187601
~~~

and separately show that the paired chiral carrier reconstructs T.

Projectivization then supports the familiar CP1/CP3 dimension statement without treating those names as primitive.
