# Glycan cleavage explicit assertion base A0 — 0.1

**Status:** frozen explicit/source-supported base for iterative closure  
**Date:** 2026-09-27  
**Native authority:** `GLYCAN_CLEAVAGE_PRIMITIVE_0_1.isg`, blob `f5ef6f08df03c01cb03d8dea1f9da87cc2fa29c4`  
**Source:** `GLYCAN_CLEAVAGE_SOURCE_FREEZE_0_1.md`  
**Assertion semantics:** qualified Core 0.19  
**Primitive-closure research discipline:** Core 0.20 candidate

This file does not contain implicit results.

It freezes the source/native facts from which the requested implicit-assertion / NEI loop proceeds.

## A0 records

### G-E001 — finite duplicate-free input carriers

Exact source support:

- `RL`, `EL`, and `TG` are finite list objects;
- `181001` defines duplicate-free list structure;
- `181004` requires `181001(RL)`, `181001(EL)`, and `181001(TG)`.

### G-E002 — root membership

`181004` requires:

~~~text
root in RL
root in TG
TG subset RL
~~~

### G-E003 — root has no parent

`181004` requires:

~~~text
forall p:
    NOT P(root,p)
~~~

### G-E004 — every non-root represented node has exactly one represented parent

For every `c in RL` with `c != root`, `181004` requires one `p in RL` such that `P(c,p)`, and every `p2` satisfying `P(c,p2)` equals `p`.

### G-E005 — parent endpoint closure

~~~text
P(c,p)
->
c in RL AND p in RL
~~~

### G-E006 — susceptibility endpoint closure

~~~text
M(e,r)
->
e in EL AND r in RL
~~~

No additional behavior is carried by `e`, `r`, or `M` labels.

### G-E007 — target ancestor closure

~~~text
c in TG
AND
P(c,p)
->
p in TG
~~~

### G-E008 — rank support for rooted acyclicity

`181004` existentially supplies a relation object `D` such that:

- `D(root,0)`;
- every `r in RL` has exactly one natural rank;
- if `P(c,p)`, `D(c,nc)`, and `D(p,np)`, then `np+1 <= nc`.

### G-E009 — terminal/exposed state predicate

`181005(P,S,r)` iff:

~~~text
r in S
AND
NOT EXISTS c:
    c in S
    AND P(c,r)
~~~

### G-E010 — local eligibility

`181006(P,M,TG,e,S,r)` iff:

~~~text
181005(P,S,r)
AND
r notin TG
AND
M(e,r)
~~~

### G-E011 — exact one-element deletion relation

`181007(S,r,Sp)` iff:

- `Sp` is duplicate-free; and
- for every raw element `x`:

~~~text
x in Sp
IFF
x in S AND x != r
~~~

### G-E012 — microscopic transition

`181008(P,M,TG,e,S,Sp)` iff there exists `r` satisfying both:

~~~text
181006(P,M,TG,e,S,r)
181007(S,r,Sp)
~~~

### G-E013 — saturation

`181009(P,M,TG,e,S)` iff there exists no `r` satisfying `181006(P,M,TG,e,S,r)`.

### G-E014 — finite microtrace constructors

The local carrier `181010` has:

- raw empty value `181011`;
- nonempty constructor tag `181012`;
- next-state field `181013`;
- tail field `181014`;
- constructor disjointness;
- field functionality;
- constructor extensionality;
- every trace object is empty or nonempty with represented fields.

### G-E015 — microtrace natural length

`181015(tr,n)` is defined recursively:

~~~text
empty trace <-> length 0

nonempty trace:
    length(tail)=m
    n=succ(m)
~~~

Every trace has a represented natural length.

### G-E016 — one exhaustive same-operator phase

`181016(P,M,TG,e,S,Sf,tr)` iff:

~~~text
empty trace:
    S = Sf extensionally
    AND Sf is saturated for e

OR

nonempty trace:
    head state S1
    AND one microscopic e-step S -> S1
    AND 181016(...,e,S1,Sf,tail)
~~~

### G-E017 — finite operator-sequence execution

`181017(RL,EL,TG,P,M,S,T,Sf)` iff:

~~~text
empty T:
    S = Sf extensionally

OR

T = e :: tail
AND e in EL
AND EXISTS S1,tr:
    one exhaustive e phase S -> S1
    AND execute tail from S1 -> Sf
~~~

### G-E018 — solving trajectory

`181018(RL,EL,TG,root,P,M,T)` iff:

~~~text
181004(RL,EL,TG,root,P,M)
AND
181017(RL,EL,TG,P,M,RL,T,TG)
~~~

### G-E019 — optimal solving trajectory

`181019(...,T)` iff:

- `T` solves;
- `LENGTH(T)=n`;
- every solving `T2` with `LENGTH(T2)=m` satisfies `n <= m`.

There is no uniqueness or canonical-order clause.

## Closure scope selected for this campaign

The iterative campaign is intentionally bounded to exact consequences relevant to:

- rooted finite structure;
- reachable-state invariants;
- deletion/phase/sequence semantics;
- exact operator algebra induced by the frozen 0.1 model;
- minimum-treatment objective;
- identity/equivalence scopes that can change the exact search quotient.

It does not attempt arbitrary theorem enumeration over natural arithmetic or unrelated logical tautologies.

Only exact assertions are admitted. No Bayesian assertion mode is used.

## Fixed-point rule

Each implicit pass consumes all previously admitted assertions plus the latest admissible NEI results.

Each NEI pass consumes the primitive/source base plus all admitted exact implicit assertions.

Stop after:

~~~text
one complete implicit pass:
    no new exact assertion
    and no material support refinement

followed by one complete NEI pass:
    no new identity result
    no identity-scope refinement
    and no QU/authority refinement
~~~

This is an operational fixed point for the declared scope, not universal semantic completeness.
