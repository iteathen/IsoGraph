# P versus NP — NEI 0.4 + DP 0.8 discovery run 0.1

**Status:** experimental cross-module research result; no P-vs-NP resolution  
**Primitive input:** `P_VS_NP_PRIMITIVE_BUNDLE_0_3.isg`  
**NEI overlay:** `P_VS_NP_NEI_OVERLAY_0_2.isg`  
**NEI authority:** qualified NEI 0.4  
**QU authority:** qualified QU 0.1  
**Discovery procedure:** experimental DP 0.8

## 1. Identity is now part of the discovery state

The primitive graph determines logical structure.

NEI asks which represented referents are:

```text
SAME
DISTINCT
UNKNOWN
or
INCOMPLETE
```

under a declared identity scope.

This matters because a search state count based on raw representations can radically overcount the number of semantically distinct residual objects.

The campaign therefore distinguishes:

```text
raw representation multiplicity
    !=
natural identity multiplicity
    !=
scoped quotient multiplicity.
```

## 2. Global identity and residual identity are different questions

Let two witness prefixes be represented by finite list objects `p` and `q`.

They may be globally DISTINCT as list objects because their primitive constructor fields differ.

Define, only for discovery, a future-acceptance scope for a fixed input `x` and remaining witness bound.

For prefix `p`, let its residual continuation relation be:

```text
C_p(s)
    :=
V(x, p || s)
```

for admissible suffixes `s` within the remaining bound.

Then:

```text
p != q globally
```

does not prevent:

```text
C_p = C_q
```

inside the future-acceptance quotient.

Qualified NEI 0.4 allows exactly this distinction:

```text
global DISTINCT
+
scoped SAME
```

without contradiction.

The scoped SAME may not be promoted to global identity.

## 3. NEI residual identity

For the query scope `Q-RESIDUAL`, two residual objects are exact scoped SAME only when the admissible identity-model family forces the same continuation object.

An exact sufficient condition is:

```text
for every admissible remaining suffix s:

    C_p(s) IFF C_q(s).
```

If future-continuation structure is unresolved, the comparison is evaluated over the pinned QU realization family.

### SAME

Every admissible identity model coidentifies the residuals under the scope.

### DISTINCT

Every admissible identity model separates the residuals under the scope.

### UNKNOWN

The qualified nonempty model family contains both scoped outcomes.

### INCOMPLETE

Required identity-relevant QU, anchors, or closure authority are missing.

Absence of an observed difference is never enough for SAME.

## 4. NEI residual width

For one input `x` and witness position/depth `t`, define the discovery quantity:

```text
W_NEI(x,t)
    =
number of exact NEI SAME classes
of reachable residual objects
under the future-acceptance scope.
```

This is a class-count quantity, not a probability distribution and not automatically an entropy.

The maximum scoped width is:

```text
W_NEI(x)
    =
max_t W_NEI(x,t).
```

This is a discovery/valuation view, not a Core primitive.

## 5. Exact sufficient condition for existential elimination

The earlier primitive DP run showed that the P-vs-NP residual is:

```text
exists polynomial-size w:
    V(x,w).
```

NEI sharpens the dynamic-programming sufficient condition.

Suppose for a verifier family:

1. witness length is polynomially bounded;
2. `W_NEI(x)` is polynomially bounded in `|x|`;
3. scoped identity/class membership can be computed in polynomial time;
4. successor identity classes for each next witness symbol can be computed in polynomial time;
5. acceptance is invariant inside each scoped SAME class;
6. the identity procedure does not solve the original existential question circularly.

Then a deterministic algorithm can propagate the reachable NEI identity classes layer by layer.

The number of layers is polynomial.

The number of classes per layer is polynomial.

The outgoing witness alphabet is fixed/finite or polynomially manageable.

Therefore the existential projection is deterministically polynomial-time decidable.

This is an exact sufficient condition.

It is a representation-independent refinement of the earlier statement:

```text
polynomial residual-state width
    -> polynomial dynamic programming.
```

The relevant states are now **qualified scoped identities**, not raw serialized states.

## 6. Why this matters

A verifier may generate exponentially many raw prefixes while having only polynomially many naturally identical residual futures.

Conversely, two syntactically similar or isomorphic prefixes may remain DISTINCT in the residual scope if some admissible continuation distinguishes them.

Therefore:

```text
raw count can be too large
and
structural similarity can be too coarse.
```

NEI supplies the identity question between those errors.

## 7. QU is load-bearing

Residual future behavior may depend on unresolved transitions, values, or continuation structure.

The campaign must preserve those possibilities in QU.

A proposed compression is invalid if it does:

```text
want residual SAME
    ->
discard distinguishing QU realizations
    ->
observe no remaining difference
    ->
merge states.
```

That is the NEI 0.4 anti-circularity failure shape.

A lawful SAME must survive the original qualified QU family.

## 8. Constructor identity is different from behavioral identity

The NEI audit recovered two kinds of identity.

### Exact mathematical constructor identity

Examples:

```text
same predecessor successor
same-head/same-tail list cell
same four-field configuration.
```

These are exact global identity statements under the primitive datatype theory.

### Scoped behavioral identity

Examples:

```text
different configurations
with the same future acceptance behavior

different witness prefixes
with the same continuation relation.
```

These are scoped quotient identities.

They cannot be silently substituted for global constructor identity.

This distinction is now explicit in the P-vs-NP campaign.

## 9. Full computation realizations

Two full branching/deterministic realizations may compute the same unary relation `L`.

That gives exact equality of the externally relevant truth relation.

It does not establish that the realizations themselves are one natural object.

For the P-vs-NP theorem this is desirable:

```text
same externally observed L
    is required

same internal realization identity
    is not required.
```

So NEI prevents DP from imposing a false same-machine obligation.

## 10. Natural entropic identity

No entropy scalar is invented.

NEI's exact identity family and QU preserve the information needed to ask identity questions.

Possible later information measures include class count or another qualified measure over the identity partition.

But:

```text
class count
    != automatically Shannon entropy

QU realization family
    != probability distribution

maximum coarseness
    != NEI SAME.
```

Any entropy-like measure will require its own explicit information-measure authority.

## 11. Identity-focused discovery target

The strongest new search question is now:

> Which primitive laws cause many witness-prefix residuals to become exact NEI SAME under future acceptance?

Candidate mechanisms may include:

```text
commuting independent choices
idempotent updates
canonical aggregation
locality / bounded separators
symmetry with exact transporter
monotone closure
algebraic cancellation
constraint propagation reaching a canonical residual.
```

These are search categories only.

No candidate is assumed to hold universally.

## 12. Falsifiers

A proposed NEI residual collapse fails if:

- one admissible suffix distinguishes the two residuals;
- one admissible QU realization distinguishes them;
- class identity requires solving the original existential question;
- the quotient forgets remaining resource/bound information that affects acceptance;
- a scoped SAME is used as global identity;
- provenance/witness output is required by the objective but discarded by the quotient.

For the current P-vs-NP truth objective, only the final Boolean language value is externally required, so witness-prefix global identity is not itself an output obligation.

## 13. Relationship to P versus NP

A universal polynomial bound on efficiently computable NEI residual width for every polynomial verifier would give a deterministic polynomial-time elimination method for bounded existential projection.

That would settle the represented equality direction.

No such bound is known or claimed.

A proof that some NP predicate necessarily has superpolynomial NEI residual width under every admissible efficiently computable exact quotient could contribute to a separation route, but that statement is much stronger than anything established here.

## 14. Novelty disposition

No new P-vs-NP theorem is claimed.

The main IsoGraph/NEI result is a sharper representation of the search bottleneck:

```text
not:
    how many raw nondeterministic states are there?

but:
    how many exact future-relevant natural identity classes remain,
    and can those identities be computed cheaply?
```

This is the identity-aware target for the next Discovery Protocol campaign.
