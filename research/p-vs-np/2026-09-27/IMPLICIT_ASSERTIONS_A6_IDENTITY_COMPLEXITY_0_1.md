# P versus NP implicit-assertion pass A6 — complexity of residual identity itself

**Status:** admitted exact implicit assertions, round 6  
**Premise state:** A0 + corrected A1 + A2 + A3 + A4 + A5  
**Support mode:** EXACT throughout unless conditional

This round audits the computational burden of the NEI quotient rather than treating exact identity as an oracle.

---

## IA-073 — residual DISTINCT iff a distinguishing suffix exists

### Scope

Complete determinate `Q-RESIDUAL` context:

- fixed input `x`;
- fixed verifier;
- fixed witness depth/remaining bound;
- fully represented suffix domain;
- no identity-relevant QU left unresolved.

### Body

For residuals `p,q`:

```text
NEI_scope(p,q)=DISTINCT
IFF
exists admissible suffix s:
    C_p(s) != C_q(s).
```

### Support

- reverse direction: `IA-041`;
- forward direction:
  - `IA-068` says SAME iff agreement on every admissible suffix;
  - complete quotient identity is extensional in the continuation relation;
  - with no QU ambiguity, inequality of the two quotient functions implies a point of disagreement.

### Disposition

ADMITTED EXACT.

---

## IA-074 — residual SAME is the absence of a distinguishing suffix

### Body

Under the same complete determinate scope:

```text
NEI_scope(p,q)=SAME
IFF
NOT exists admissible suffix s:
    C_p(s) != C_q(s).
```

### Support

`IA-068` + `IA-073` + classical negation over the closed suffix domain.

### NEI significance

A finite sample of matching suffixes is insufficient for SAME.

SAME needs exact closure/universality authority or another exact theorem.

### Disposition

ADMITTED EXACT.

---

## IA-075 — one distinguishing suffix is polynomially checkable

### Scope

Residuals of one functionally polynomial verifier `V` with polynomially bounded remaining suffix length.

### Body

Given candidate suffix `s`, the predicate:

```text
DISTINGUISH(x,p,q,s)
    :=
V(x,p·s) XOR V(x,q·s)
```

has a functional polynomial realization.

### Support

- deterministic polynomial verification of `V`;
- exact polynomial pair/concatenation encodings;
- functional-polynomial closure under:
  - two verifier calls;
  - NOT;
  - AND/OR/XOR composition.

### Boolean-closure witness

Run the two functional realizations sequentially and combine their two terminal truth values with fixed finite control.

### Disposition

ADMITTED EXACT.

---

## IA-076 — residual DISTINCT is itself a bounded existential projection

### Body

For polynomial verifier residuals:

```text
NEI_scope(p,q)=DISTINCT
IFF
exists polynomial-size s:
    DISTINGUISH(x,p,q,s).
```

### Support

- `IA-073`;
- `IA-075`;
- polynomial remaining witness/suffix bound.

### Consequence

Residual DISTINCT has the same primitive structural shape as a bounded existential search problem.

### Disposition

ADMITTED EXACT.

---

## IA-077 — residual SAME is a bounded universal/complement projection

### Body

```text
NEI_scope(p,q)=SAME
IFF
forall admissible polynomial-size suffix s:
    NOT DISTINGUISH(x,p,q,s).
```

Equivalently:

```text
SAME
IFF
NOT DISTINCT.
```

inside the determinate complete residual query.

### Support

- `IA-074`;
- `IA-076`.

### Disposition

ADMITTED EXACT.

---

## IA-078 — existential-projection closure would make general exact residual identity polynomial-time decidable

### Premise

Assume the unresolved universal `EXISTS-CLOSURE` principle from `IA-065`.

### Body

For every functionally polynomial verifier with polynomial suffix bound, exact determinate `Q-RESIDUAL` SAME/DISTINCT can be decided by a functional polynomial realization.

### Witness

- `IA-076`: DISTINCT is bounded existential projection of polynomial `DISTINGUISH`;
- EXISTS-CLOSURE makes DISTINCT functionally polynomial;
- `IA-062` complement closure makes SAME functionally polynomial.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-079 — a universal polynomial exact residual-identity procedure would imply existential-projection closure

### Premise schema

Suppose there is one general deterministic polynomial procedure that, for every functionally polynomial verifier and every complete residual query, decides exact:

```text
SAME versus DISTINCT.
```

### Body

Then every polynomially bounded existential projection of a functional-polynomial verifier has a functional polynomial realization.

### Reduction witness

Start with arbitrary:

```text
L(x)
IFF
exists w:
    |w| <= p(|x|)
    AND
    V(x,w),
```

where `V` is functionally polynomial.

Construct a new functionally polynomial verifier `U` whose witness begins with one selector bit:

```text
U(x, 0·s) = V(x,s)
U(x, 1·s) = FALSE.
```

Malformed encodings return FALSE.

For fixed input `x`, compare the two residuals after prefixes:

```text
p = [0]
q = [1].
```

Their continuation relations are:

```text
C_p(s) = V(x,s)
C_q(s) = FALSE.
```

Therefore:

```text
p and q are SAME
IFF
for all s: NOT V(x,s)
IFF
NOT L(x)

p and q are DISTINCT
IFF
exists s: V(x,s)
IFF
L(x).
```

The assumed polynomial identity procedure therefore decides `L(x)` in polynomial time.

Since `V,p` were arbitrary, bounded existential projection closes.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-080 — universal efficient residual identity is equivalent in strength to the unresolved existential closure principle

### Body

Within the primitive model, the following universal principles imply each other:

```text
A. every polynomial bounded existential projection
   of a functional-polynomial verifier
   is functionally polynomial;

B. exact complete residual SAME/DISTINCT
   for every functional-polynomial verifier
   is polynomial-time decidable.
```

### Support

- A -> B: `IA-078`;
- B -> A: `IA-079`.

### Interpretation firewall

This is an equivalence of **universal principles**.

It does not say residual identity is difficult for every individual verifier.

### Disposition

ADMITTED EXACT CONDITIONAL EQUIVALENCE.

---

## IA-081 — a universal polynomial residual canonicalizer would also settle the existential closure principle

### Premise

Suppose every residual of every polynomial verifier can be mapped in polynomial time to a canonical identifier such that:

```text
canonical(p)=canonical(q)
IFF
NEI_scope(p,q)=SAME.
```

### Body

EXISTS-CLOSURE follows.

### Support

Compare canonical IDs to obtain the universal identity procedure in `IA-079`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-082 — right-congruence semantics do not make quotient construction computationally free

### Body

`IA-069` establishes:

```text
semantic successor well-definedness.
```

It does not establish:

```text
polynomial-time exact identity
or
polynomial-time canonicalization.
```

### Support

- `IA-080` shows that a universal polynomial exact identity method is already equivalent in strength to the unresolved existential-closure principle.

### Disposition

ADMITTED EXACT NON-IMPLICATION.

---

## IA-083 — the identity premise in the NEI width theorem is fully load-bearing

### Prior theorem

`IA-072` gives deterministic propagation from:

- polynomial NEI residual width;
- efficient identity/canonicalization;
- efficient next-residual construction.

### Body

The efficient identity/canonicalization premise cannot be dropped from the universal theorem merely because semantic SAME classes exist.

### Support

`IA-079..082`.

A universal method for discharging that premise would already decide arbitrary bounded existential projection.

### Disposition

ADMITTED EXACT.

---

## IA-084 — NEI can still provide genuine compression on special verifier families

### Body

The universal hardness equivalence does not block verifier-specific exact identity theorems.

If an independently represented structural law proves residual identity and gives a polynomial implementation for one restricted family, `IA-072` remains a valid polynomial decision method for that family.

### Support

`IA-080` concerns universal identity across all polynomial verifiers.

NEI 0.4 permits exact domain-specific identity theorems.

### Disposition

ADMITTED EXACT.

---

## IA-085 — identity proof burden is asymmetric

### Body

Inside a complete residual quotient:

```text
DISTINCT
```

may be established by one exact distinguishing suffix.

```text
SAME
```

requires excluding every admissible distinguishing suffix unless another exact identity theorem/certificate supplies that closure.

### Support

- `IA-073`;
- `IA-074`;
- NEI 0.4 SAME/DISTINCT admissible-model semantics.

### Consequence

Discovery should preferentially preserve:

- distinguishing-suffix witnesses for DISTINCT;
- universality/closure certificates for SAME.

### Disposition

ADMITTED EXACT.

---

# A6 central result

The identity-aware quotient exposes a recursive copy of the original logical bottleneck:

```text
original:
    exists witness making verifier true

residual DISTINCT:
    exists suffix making two residuals differ

residual SAME:
    no such suffix exists.
```

Therefore:

```text
NEI identifies the correct quotient semantics
but does not magically make exact quotient identity cheap.
```

For universal P-vs-NP progress, the valuable target is not merely to define the identity relation.

It is to discover **additional primitive structure** that makes identity cheap for the target family without already assuming existential-projection closure.

# P-vs-NP status

Unchanged:

```text
OPEN.
```

No lower bound or polynomial universal identity algorithm is claimed.
