# P versus NP implicit-assertion pass A11 — fixed-horizon normalization and recursive residual identity

**Status:** admitted exact implicit assertions, round 11  
**Premise state:** A0 + corrected A1 + A2-A10

---

## IA-149 — variable bounded witness length can be normalized to one fixed horizon

### Premise

Witnesses have length:

```text
<= p(|x|).
```

### Construction

Extend the fixed witness alphabet by one exact control symbol:

```text
STOP.
```

Represent a variable-length witness `w` by a fixed-horizon sequence of length:

```text
p(|x|)+1
```

containing:

```text
w · STOP · PAD...
```

where PAD is a fixed post-STOP symbol/value and the verifier ignores everything after the first STOP.

Malformed sequences with no STOP by the horizon reject.

### Body

The bounded existential projection is unchanged.

### Complexity

Encoding/decoding and the normalized verifier add only polynomial overhead.

### Disposition

ADMITTED EXACT.

---

## IA-150 — residual width at depth zero is one

### Scope

One fixed input `x`, verifier, and normalized witness horizon.

### Body

At witness depth `0`, the only raw prefix is the empty prefix.

Therefore:

```text
W_NEI(x,0)=1.
```

### Support

Unique NIL prefix plus exact quotient definition.

### Disposition

ADMITTED EXACT.

---

## IA-151 — terminal-depth residual width is at most two

### Scope

Normalized exact horizon `m`.

### Body

At depth `m`, no witness symbols remain.

The future-acceptance quotient of a full witness has only the empty-suffix observation:

```text
accept
or
reject.
```

Therefore:

```text
W_NEI(x,m) <= 2.
```

If all complete witnesses have the same truth value, width is `1`.

### Support

`IA-068` with suffix domain containing only the empty suffix.

### Disposition

ADMITTED EXACT.

---

## IA-152 — finite-horizon residual identity has a recursive one-layer characterization

### Scope

Depth `t < m` in normalized fixed-horizon witness space with finite next-symbol alphabet `A`.

### Body

Residual prefixes `p,q` are exact Q-RESIDUAL SAME iff:

```text
CURRENT(p) = CURRENT(q)

AND

for every a in A:
    p·a  ~_{t+1}  q·a.
```

Here:

```text
CURRENT(p)
```

means the verifier truth for the immediate STOP/empty-continuation observation admitted at that depth.

If STOP is represented as an ordinary next symbol rather than immediate observation, the equivalent formulation places STOP among the finite successor-symbol cases.

### Proof

#### Forward

Residual SAME gives equality for every continuation.

In particular:

- the empty/STOP continuation agrees;
- every continuation beginning with symbol `a` agrees.

The latter is successor SAME by `IA-068`.

#### Reverse

Every admissible continuation is either:

- the current stop/empty case; or
- begins with some next symbol `a` followed by a shorter continuation.

Agreement on current outcome plus SAME of every corresponding child therefore gives agreement on all continuations.

Apply `IA-068`.

### Disposition

ADMITTED EXACT.

---

## IA-153 — child-class signature is a complete residual invariant

### Define

For residual `p` at depth `t`, let:

```text
SIG_t(p)
    :=
(
  CURRENT(p),
  CLASS_{t+1}(p·a1),
  ...,
  CLASS_{t+1}(p·ak)
)
```

for the fixed ordered next-symbol alphabet.

### Body

```text
SIG_t(p)=SIG_t(q)
IFF
p ~_t q.
```

### Support

`IA-152`.

### Identity status

This signature is a complete invariant for the **scoped residual identity**, not global prefix identity.

### Disposition

ADMITTED EXACT.

---

## IA-154 — recursive residual signatures give an exact bottom-up partition-refinement procedure

### Premise

The complete reachable raw prefix set at every depth is explicitly enumerable.

### Body

Exact residual classes can be computed bottom-up:

1. terminal depth: classify by accept/reject (`IA-151`);
2. at depth `t`, compute `SIG_t` from already classified children;
3. merge exactly equal signatures.

### Correctness

By `IA-153`, equal signatures are exactly NEI residual SAME.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-155 — explicit bottom-up partition refinement can still be exponentially large

### Body

`IA-154` does not imply a polynomial algorithm for arbitrary polynomial witness horizon.

### Support

The raw prefix domain at depth `t` may contain exponentially many prefixes.

Bottom-up classification over every raw prefix can therefore require exponential work even though each individual signature computation is local.

### Disposition

ADMITTED EXACT NON-IMPLICATION.

---

## IA-156 — next-layer width is bounded by current width times alphabet size

### Body

For reachable exact residual classes:

```text
W_NEI(x,t+1)
    <=
|A| * W_NEI(x,t),
```

where `|A|` is the fixed normalized witness alphabet size.

### Support

Each class at depth `t` has at most one exact successor class per symbol by `IA-070`.

Every reachable depth-`t+1` class is reached from some reachable parent class and one next symbol.

### Native counting interpretation

Use a complete representative list and finite alphabet representative list; form the parent-class/symbol product enumeration.

### Disposition

ADMITTED EXACT.

---

## IA-157 — trivial endpoint width does not imply easy existential projection

### Body

Every normalized bounded existential problem has:

```text
W_NEI(x,0)=1
W_NEI(x,m)<=2.
```

Yet the represented P-vs-NP closure question remains unresolved.

Therefore small width at the first or final layer alone is insufficient.

### Support

`IA-150`, `IA-151`, scope of the unresolved theorem.

### Disposition

ADMITTED EXACT SUPPORT NON-IMPLICATION.

---

## IA-158 — all nontrivial residual-width burden lies in intermediate layers

### Body

For normalized witness horizon, any superconstant/superpolynomial residual-width obstruction must occur at some:

```text
0 < t < m.
```

### Support

Endpoint bounds `IA-150` and `IA-151`.

### Disposition

ADMITTED EXACT.

---

## IA-159 — polynomial generation of distinct recursive signatures suffices for deterministic polynomial decision

### Premises

For every input/depth:

1. the set of reachable **distinct** `SIG_t` values can be generated without enumerating all raw prefixes;
2. generation uses polynomial total time;
3. the number of generated signatures is polynomial;
4. exact child signature references are preserved.

### Body

The bounded existential projection is functionally polynomial.

### Witness

The generated signatures are complete canonical residual IDs (`IA-153`).

Use sharpened quotient propagation `IA-072`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-160 — polynomial witness hitting set is a generic existential-elimination law

### Premises

There exists deterministic polynomial procedure producing a list:

```text
H(x)
```

of polynomially many admissible witnesses such that:

```text
exists w: V(x,w)
    ->
exists h in H(x): V(x,h).
```

### Body

The existential projection is functionally polynomial.

### Witness

Evaluate `V` on every member of `H(x)`.

### Support

`IA-037`.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-161 — several earlier elimination laws produce polynomial hitting sets

### Examples

### Dominating witness

`IA-116`:

```text
H(x)={C(x)}.
```

### Polynomial-image canonicalization

`IA-119`:

```text
H(x)=enumerated canonical image.
```

### Exact symmetry quotient

`IA-120`:

```text
H(x)=one canonical representative per reachable orbit.
```

### Body

Each is a specialized construction of `IA-160`.

### Disposition

ADMITTED EXACT.

---

## IA-162 — polynomial hitting set and polynomial residual quotient are different sufficient topologies

### Body

A polynomial hitting set need only intersect the accepting witness set when it is nonempty.

A residual quotient must preserve **all future acceptance behavior** at every relevant prefix.

Therefore:

```text
hitting-set sufficiency
    !=
future-behavior quotient sufficiency.
```

Neither topology is definitionally a refinement of the other without additional structure.

### Consequence

A language may admit a small canonical/hitting witness route even when residual width is inconvenient, so `W_NEI` is not a universal lower bound on all existential-elimination strategies.

### Support

- `IA-160`;
- candidate-space scope of `IA-109/140`.

### Disposition

ADMITTED EXACT.

---

# A11 central result

NEI residual identity now has a local recursive form:

```text
identity at depth t
    =
current outcome
+ vector of child identities at depth t+1.
```

This is an exact semantic recursion.

It does **not** by itself solve the exponential raw-prefix-generation problem.

The campaign therefore has at least two distinct positive search routes:

```text
1. generate polynomially many distinct recursive residual signatures;

2. construct a polynomial witness hitting set without representing
   the full residual quotient.
```

Both are exact sufficient routes.

Neither is assumed universal.

# P-vs-NP status

OPEN.
