# Primitive finite-data constructors 0.2 — correction audit

**Status:** unqualified successor  
**Predecessor:** `PRIMITIVE_DATA_CONSTRUCTORS_0_1.isg`

0.1 contained an unbound tail variable in the native membership recursion.

0.2 replaces membership and length by full biconditional constructor definitions:

```text
member(x,l)
    iff
l is CONS(h,t)
and (x=h or member(x,t))

length(l,n)
    iff
(l=NIL and n=ZERO)
or
(l=CONS(h,t) and length(t,m) and n=SUCC(m)).
```

The raw Boolean truth tables and constructor identities are preserved.

No container operation is a primitive leaf.
