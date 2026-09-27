# P versus NP — NEI 0.4 identity overlay 0.1

**Status:** research identity overlay; NEI 0.4 semantics are qualified, this domain application is not yet independently qualified  
**Primitive dependency:** `P_VS_NP_PRIMITIVE_BUNDLE_0_3.isg`  
**NEI authority:** qualified NEI 0.4  
**QU authority:** qualified QU 0.1

## Purpose

The primitive logic kernel answers:

> What logical structure is present?

The NEI overlay asks:

> Which represented referents are naturally the same object, distinct objects, or still identity-unresolved under an explicit scope?

NEI is not folded into Core.

It remains a separately versioned extension over the primitive graph.

## Authority pins

NEI 0.4:

`extensions/nei/NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md`

Qualified semantic SHA-256:

`6e2f0efb1f4bfbfa55bc2c5597f1ecc5b4d7bb734216543c21ba72089b0aacee`

Native vocabulary:

- `NEI_NATIVE_VOCAB_0_2.md`
- `NEI_VOCAB_0_2.isg`

QU 0.1 remains the identity-uncertainty substrate whenever unresolved structure can change identity classification.

## Serialization

`P_VS_NP_NEI_OVERLAY_0_1.isg` contains query-context records.

Stable record identities `160000` through `160008` are local to this overlay.

The records do not declare identity answers in their query contexts.

Where an exact result is already forced, the result role is attached separately after the exact evidence/model-family structure.

## Q-NAT — primitive natural-object identity

Record:

`160000`

Carrier:

primitive natural carrier `7000`.

Scope:

global mathematical identity inside the primitive Peano-style object theory.

Exact evidence:

- ZERO is not a successor;
- successor predecessor fields are functional;
- two successor objects with the same predecessor are equal;
- successor construction is recursively grounded in the natural carrier.

Therefore, for instantiated subjects:

```text
same successor predecessor
    -> exact SAME

ZERO versus successor
    -> exact DISTINCT

different exact predecessors
    -> DISTINCT when their disequality is established.
```

If predecessor identity depends on QU, the natural-number identity result inherits that QU.

## Q-LIST — primitive list-object identity

Record:

`160001`

Carrier:

finite list carrier `7420`.

Exact evidence:

- NIL and CONS are disjoint;
- HEAD and TAIL are functional;
- two CONS objects with the same HEAD and TAIL are equal;
- list tails are recursively list objects;
- every list has a finite primitive-natural length.

Thus:

```text
same constructor + recursively SAME fields
    -> SAME

NIL versus CONS
    -> DISTINCT

exact field difference
    -> DISTINCT.
```

Unknown field identity is not erased; it becomes QU-mediated identity.

## Q-CONFIG — primitive configuration identity

Record:

`160002`

Carrier:

configuration carrier `8010`.

Exact evidence:

- state/left/current/right fields are functional;
- configuration identity is extensional in those four fields.

Thus two configurations with the same four exact fields are one mathematical configuration object.

A configuration field difference establishes DISTINCT only when the differing field identities are themselves exact.

This is one place NEI exposed a defect in the predecessor primitive rendering: field functionality without constructor extensionality left duplicate indistinguishable configuration referents admissible. Primitive transition 0.8 closes that gap.

## Q-RELATION-GLOBAL — global identity of raw relation objects

Record:

`160003`

Carrier:

raw extensional relation identity carrier `7900`.

Current status:

`INCOMPLETE / UNQUALIFIED`.

Reason:

the primitive bundle deliberately gives a raw relation object its extension/behavior but does not yet pin one universal **global natural identity theory for relation objects**.

Two relation records can have exact structural correspondence without NEI being authorized to conclude global SAME.

NEI 0.4 explicitly requires:

```text
structural equivalence
    != automatic SAME.
```

Before a global relation-identity result is allowed, the query must declare whether the domain object is:

- a purely extensional mathematical relation;
- a provenance-bearing relation artifact;
- a scoped behavioral quotient;
- another exact identity domain.

This is not semantic UNKNOWN yet; the required query authority is incomplete.

## Q-CONFIG-FUTURE — configuration identity in future-acceptance scope

Record:

`160004`

This is a **scoped quotient identity question**, not global configuration identity.

Scope fixes, as applicable:

- one transition relation;
- one remaining step budget;
- terminal observation polarity;
- admissible continuation structure.

Two configurations may be globally DISTINCT by their primitive fields while still having identical future acceptance behavior under this scope.

The identity-relevant open region is represented through QU state `164004`.

NEI rule:

```text
if every admissible realization gives
the same future-acceptance quotient object
    -> scoped SAME

if every admissible realization separates them
under the scoped identity theory
    -> scoped DISTINCT

if qualified admissible models contain both outcomes
    -> semantic UNKNOWN

if required QU is absent
    -> INCOMPLETE, not UNKNOWN.
```

No scoped SAME may be promoted to global configuration SAME.

## Q-RESIDUAL — witness-prefix / residual-computation identity

Record:

`160005`

This is the most important P-vs-NP discovery query.

The queried underlying objects are witness-prefix or residual-state representations.

Global prefix/list identity remains ordinary constructor identity.

The NEI scope instead asks:

> Do these residuals represent the same unresolved future acceptance object?

The exact observable is the set/relation of admissible suffix continuations that reach positive terminal truth within the remaining witness/time bound.

This continuation structure may be partially unresolved, so QU state `164005` is mandatory whenever exact continuation behavior has not been closed.

The desired identity is **not** declared by “looks similar,” equal hashes, equal state counts, bisimulation labels, or a DP heuristic.

It must emerge from the admissible identity models.

### Exact scoped SAME

If exact evidence establishes:

```text
for every admissible remaining suffix:
    residual A accepts the suffix
    iff
    residual B accepts the suffix
```

under the same remaining resource scope, then the exact future-acceptance quotient is equal.

That supplies exact SAME **inside this quotient scope**.

It does not make the original witness prefixes globally identical.

### QU-mediated UNKNOWN

If unresolved continuation structure permits both:

```text
same future quotient
and
different future quotient
```

then the exact NEI result is UNKNOWN.

### Anti-circularity

The desired state compression must not choose a QU restriction that removes distinguishing continuations and then cite the restricted family as proof of SAME.

Record `165505` is the overlay's anti-circularity obligation.

## Q-REALIZATION — identity of two full computation realizations

Record:

`160006`

Two different realizations can compute exactly the same unary relation `L`.

That is exact semantic correspondence relevant to the P-vs-NP objective.

It is not, by itself, global natural identity of the realization objects.

The query remains incomplete until a global realization-identity theory and anchors are pinned.

This prevents the existential witnesses on the two sides of the P-vs-NP formula from being falsely identified merely because their externally observed language is the same.

## Concrete exact control — terminal positive versus terminal negative

Record:

`160007`

Subjects:

- positive terminal raw value `8002`;
- negative terminal raw value `8003`.

Primitive exact evidence says those values are unequal.

Under the mathematical raw-value identity scope, every admissible identity model separates them.

Result:

`DISTINCT`.

This result is derived; the query context does not contain a separating answer tag.

## Concrete exact control — duplicate configuration construction

Record:

`160008`

The overlay constructs two configuration referents `167000` and `167001` with exactly the same primitive fields:

```text
state   = start
left    = NIL
current = blank
right   = NIL
```

Primitive configuration extensionality forces equality.

Result:

`SAME`.

Again, SAME is derived from exact constructor/domain law, not profile-declared.

## Natural entropic identity and information measures

NEI does not invent an entropy scalar.

For this campaign, “entropic identity” means the qualified NEI identity structure carried through exact evidence and QU.

An optional information measure over identity classes may be introduced later only with explicit measure authority.

In particular:

```text
number of raw states
    != identity entropy

number of NEI quotient classes
    != automatically a Shannon entropy

QU realization family
    != probability distribution.
```

This keeps the identity collapse information-preserving.

## Discovery use

NEI is permitted to expose SAME classes for discovery.

Any collapse used to support a P-vs-NP claim must preserve:

- the exact query scope;
- QU;
- constructor/global identity where relevant;
- the distinction between scoped SAME and global SAME;
- any required provenance/witness obligations.

The primitive truth bundle remains the final exact-support surface.
