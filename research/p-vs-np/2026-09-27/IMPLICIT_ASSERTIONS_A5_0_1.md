# P versus NP implicit-assertion pass A5 — choice normalization, complement, and residual congruence

**Status:** admitted exact implicit assertions, round 5  
**Premise state:** A0 + corrected A1 + A2 + A3 + A4  
**Support mode:** EXACT throughout unless explicitly conditional

---

## IA-054 — one selected transition tuple determines at most one next configuration

### Scope

A branching realization; no transition-functionality assumption.

### Premise

Fix:

- current configuration `c`;
- one exact legal transition tuple
  `(q,read,q',write,move)`
  matching `c`'s current state/symbol.

### Body

There is at most one configuration `c'` produced by that selected tuple.

### Support

- one-step left/right update clauses;
- functional configuration fields;
- functional list HEAD/TAIL;
- NIL/CONS disjointness;
- configuration extensionality.

### Significance

Branching uncertainty lies in **which legal tuple is selected**, not in ambiguity after a tuple has been selected.

**Disposition:** ADMITTED EXACT.

---

## IA-055 — a legal transition-code sequence determines at most one replay path

### Scope

One fixed branching realization and the exact tuple-code system from `IA-024`.

### Body

Given:

```text
input x
transition-code sequence w
```

there is at most one configuration sequence obtained by:

1. exact primitive initialization;
2. decoding each code to its unique legal tuple;
3. applying that tuple.

### Support

- `IA-005` unique initialization;
- `IA-024` canonical exact tuple code;
- `IA-054`.

### Disposition

ADMITTED EXACT.

---

## IA-056 — accepting paths and valid accepting transition-code sequences correspond

### Forward

Every positive-terminal exact path determines a transition-code sequence.

### Reverse

Every code sequence that:

- decodes to legal matching tuples at every step;
- replays from primitive initialization;
- ends at positive terminal;

determines a genuine positive-terminal primitive path.

### Support

- exact-n path recursion;
- one-step tuple witness;
- `IA-024`;
- `IA-055`.

### Identity note

Different transition-code strings cannot be merged solely because they reach the same final configuration; path identity and residual identity remain separate questions.

### Disposition

ADMITTED EXACT.

---

## IA-057 — accepting transition-choice certificates have length linear in path length

### Body

For one fixed realization there is a constant `K` such that an `i`-step path has a transition-code certificate of bit length:

```text
<= K * i.
```

### Support

- each transition tuple has fixed input-independent code width (`IA-024`);
- one code is emitted per path step.

### Consequence

Since path length is polynomially bounded:

```text
choice-certificate length
```

is polynomially bounded.

### Disposition

ADMITTED EXACT.

---

## IA-058 — transition-choice certificate verification is deterministic polynomial time

### Body

There is a functional polynomial verifier that:

1. computes primitive initialization from `x`;
2. decodes each fixed-width transition code;
3. checks the code identifies a legal tuple matching current state/read symbol;
4. applies the uniquely determined update (`IA-054`);
5. accepts iff the replay ends at positive terminal.

### Complexity support

- certificate contains polynomially many codes (`IA-057`);
- each code has fixed width;
- fixed transition relation is hardwired finite data;
- represented tape span grows at most linearly with step count (`IA-028`);
- a deliberately scan-based single-tape implementation has polynomial overhead.

### Disposition

ADMITTED EXACT.

---

## IA-059 — full tableau materialization is nonessential for certificate sufficiency

### Declared objective

Establish existence of a polynomial witness relation for acceptance.

### Body

The full configuration tableau from `IA-030` is not uniquely necessary.

The shorter transition-choice sequence from `IA-057` plus deterministic replay from the input is sufficient.

### Support

- `IA-056`;
- `IA-058`.

### DP classification

```text
full tableau:
    NONESSENTIAL_FOR_SUFFICIENCY
    for the certificate/verifier objective.
```

It may still be useful as a locally checkable proof object.

### Disposition

ADMITTED EXACT objective-scoped assertion.

---

## IA-060 — every bounded-total realization has at least one terminal path for every input

### Scope

Branching or functional realization satisfying:

- nonterminal transition totality;
- terminal no-outgoing clauses;
- bound-terminal clause.

### Body

For every input there exists some `i <= b` and terminal configuration `h` reachable in exactly `i` steps.

### Witness

Starting at `c0`:

- if terminal, stop;
- otherwise totality supplies a successor;
- repeat.

If no terminal appears before `b`, the recursively chosen prefix reaches some configuration at exactly `b`; the bound clause makes it terminal.

This is finite dependent choice over the represented natural bound.

### Disposition

ADMITTED EXACT.

---

## IA-061 — a functional realization has exactly one terminal outcome for each input

### Body

For one functional realization/input there is exactly one maximal terminal path outcome.

The terminal polarity is exactly one of:

```text
positive
negative.
```

### Support

- existence: `IA-060`;
- path uniqueness: `IA-007`;
- no terminal continuation: `IA-008`;
- terminal polarity uniqueness: `IA-021`.

### Disposition

ADMITTED EXACT.

---

## IA-062 — functional polynomial realizability is closed under complement

### Body

If raw unary relation `L` has a functional polynomial realization, then the pointwise complement:

```text
Lbar(x) IFF NOT L(x)
```

also has a functional polynomial realization.

### Construction

Use the same:

- finite state list;
- symbol list;
- transition relation;
- bound.

Exchange only the interpretation of the two existing terminal identities:

```text
new positive = old negative
new negative = old positive.
```

Both terminal identities already have no outgoing transition and are disequal.

By `IA-061`, every input ends in exactly one polarity.

Thus:

```text
NOT L(x)
IFF
old path ends negative
IFF
new path ends positive.
```

### Disposition

ADMITTED EXACT.

---

## IA-063 — false branching instances have only negative maximal branches

### Scope

One branching realization.

### Body

If:

```text
NOT L(x)
```

then every maximal terminal path from the input ends at the negative terminal state.

### Support

- `IA-060`: every branch can be extended to terminal within the bound;
- `IA-010`: `NOT L(x)` forbids every positive terminal path;
- only positive/negative terminal identities satisfy the terminal-bound condition.

### Note

This does not make complement branching-realizable by existential acceptance.

It is a universal statement over branches.

### Disposition

ADMITTED EXACT.

---

## IA-064 — bounded existential and bounded universal projections are dual through complement

### Define

For functional-polynomial verifier relation `V(x,w)` and polynomial witness domain `W_x`:

```text
E_V(x)
    := exists w in W_x: V(x,w)

A_V(x)
    := forall w in W_x: V(x,w).
```

### Body

```text
A_V(x)
IFF
NOT E_notV(x).
```

### Support

First-order De Morgan duality over the exact bounded witness domain.

By `IA-062`, `not V` remains functionally polynomial whenever `V` is.

### Disposition

ADMITTED EXACT.

---

## IA-065 — universal closure of functional polynomial relations is equivalent to existential closure

### Statement

The following two universal closure principles are equivalent inside the primitive model:

```text
EXISTS-CLOSURE:
    every polynomially bounded existential projection
    of a functional-polynomial relation
    is functionally polynomial.

FORALL-CLOSURE:
    every polynomially bounded universal projection
    of a functional-polynomial relation
    is functionally polynomial.
```

### Support

- `IA-062` complement closure;
- `IA-064`.

Each principle derives the other by complementing the verifier and the projected result.

### Disposition

ADMITTED EXACT.

---

## IA-066 — adjacent same-polarity bounded quantifiers can be paired into one block

### Existential form

```text
exists u:
exists v:
    R(x,u,v)
```

is exactly equivalent to:

```text
exists z:
    R'(x,z)
```

where `z` is an exact self-delimiting pair encoding of `(u,v)`.

### Universal form

Likewise:

```text
forall u:
forall v:
    R(x,u,v)
```

can be paired into one bounded universal block.

### Polynomial bound

The pair encoding has length linear in the sum of component lengths.

A sum of polynomial bounds is polynomial.

### Disposition

ADMITTED EXACT.

---

## IA-067 — existential closure would collapse every fixed finite bounded-quantifier alternation over a functional-polynomial predicate

### Premise

Assume `EXISTS-CLOSURE` from `IA-065`.

### Body

For any fixed finite sequence of polynomially bounded quantifier blocks:

```text
Q1 w1 Q2 w2 ... Qk wk:
    V(x,w1,...,wk)
```

where each `Qi` is EXISTS or FORALL and `V` is functionally polynomial, the resulting unary relation is functionally polynomial.

### Witness

Induct from the innermost block outward.

- existential block: use EXISTS-CLOSURE;
- universal block: use equivalent FORALL-CLOSURE (`IA-065`);
- adjacent same-polarity blocks may be paired (`IA-066`).

`k` is fixed, so a finite composition of polynomial constructions remains polynomial.

### Status

Conditional on EXISTS-CLOSURE, which is exactly the unresolved P-vs-NP direction.

### Disposition

ADMITTED EXACT CONDITIONAL.

---

## IA-068 — residual scoped SAME is exactly continuation-language equality under complete Q-RESIDUAL authority

### Scope

The `Q-RESIDUAL` query context with complete:

- suffix domain;
- remaining-resource scope;
- verifier authority;
- QU closure.

### Body

```text
NEI_scope(p,q)=SAME
IFF
for every admissible suffix s:
    C_p(s) IFF C_q(s).
```

### Support

- forward: scoped identity is identity of the future-acceptance quotient, so equal quotient objects have equal membership on every suffix;
- reverse: `IA-040`.

### DISTINCT counterpart

By `IA-041`, one distinguishing suffix yields DISTINCT.

### Disposition

ADMITTED EXACT, scope-bound.

---

## IA-069 — residual SAME is a right congruence under common witness extension

### Premise

At witness depth `t`:

```text
p ~ q
```

under `Q-RESIDUAL`.

Let `a` be the same admissible next witness symbol for both residuals.

### Body

At the next depth:

```text
p·a ~ q·a.
```

### Witness

For every remaining suffix `s`:

```text
C_(p·a)(s)
    =
C_p(a·s)
    =
C_q(a·s)
    =
C_(q·a)(s).
```

Use `IA-068`.

### Scope condition

Remaining-bound accounting must update identically on both sides.

### Disposition

ADMITTED EXACT.

---

## IA-070 — residual-class successor is automatically well-defined

### Body

Under exact `Q-RESIDUAL` equivalence, applying the same next witness symbol to two representatives of one class yields members of one next class.

### Support

`IA-069`.

### Consequence

The quotient transition by next witness symbol does not require an additional semantic well-definedness assumption.

Only its **efficient computability** remains an algorithmic burden.

### Disposition

ADMITTED EXACT.

---

## IA-071 — residual SAME automatically preserves terminal acceptance

### Body

If two residuals are scoped SAME, then their acceptance value at zero remaining witness symbols is equal.

### Support

`IA-068` instantiated at the empty suffix.

### Consequence

Acceptance class-invariance is intrinsic to the exact residual identity definition.

It need not remain a separate premise in the quotient-DP theorem.

### Disposition

ADMITTED EXACT.

---

## IA-072 — sharpened NEI residual-width sufficient condition

### Prior theorem

`IA-047` required:

- polynomial width;
- polynomial identity;
- polynomial successor construction;
- class-invariant acceptance;
- well-defined class transitions.

### Refinement

`IA-070` and `IA-071` discharge the last two as semantic consequences of exact residual identity.

Thus it is sufficient to establish:

1. polynomial witness depth;
2. polynomial number of reachable exact residual NEI classes per depth;
3. polynomial-time exact identity/canonicalization;
4. polynomial-time construction/canonicalization of next residual representatives;
5. fixed finite or polynomially enumerable next-symbol alphabet;
6. anti-circular independence of identity authority.

Then deterministic polynomial layer propagation follows.

### Disposition

ADMITTED EXACT SUPPORT REFINEMENT.

---

# A5 central consequences

Two major hidden structures are now explicit:

```text
branching computation
    =
deterministic replay
+ existential choice string
```

and:

```text
exact residual identity
    is a right congruence
    over future witness extension.
```

This sharpens the unresolved bottleneck.

The semantic quotient transition is already sound.

The unresolved questions are primarily:

```text
How many exact residual classes exist?
Can exact class identity/canonicalization be computed cheaply?
```

# No resolution claim

No universal polynomial residual-width bound is established.

No universal polynomial identity algorithm is established.

P versus NP remains open.
