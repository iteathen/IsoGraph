# P vs NP barrier map 0.1 — source/scope audit

**Status:** source-backed barrier rendering; mixed exact/conditional claims; no P-vs-NP conclusion  
**Native graph:** `P_VS_NP_BARRIERS_0_1.isg`

## Purpose

Represent the major barriers as constraints on **proof methods**, not as evidence for either truth value of `P = NP`.

The graph deliberately keeps three barrier families separate:

1. relativization;
2. Natural Proofs;
3. algebrization.

No relation asserts that crossing one crosses another.

## Relation dictionary

| Relation | Meaning |
|---|---|
| `^131000` | represented barrier-layer object |
| `^131001` | problem has alternative terminal conclusions |
| `^131002` | proof-method family / method predicate |
| `^131003` | method has a structural property |
| `^131004` | source theorem supplies witness world/object |
| `^131005` | witness world establishes stated class relation |
| `^131006` | paired witness worlds have opposite P/NP outcomes |
| `^131007` | equality oracle outcome |
| `^131008` | separation oracle outcome |
| `^131009` | barrier does not entail target truth value |
| `^131010` | Natural-Proofs defining condition |
| `^131011` | hardness/pseudorandomness assumption |
| `^131012` | conditional Natural-Proofs barrier implication |
| `^131013` | blocked lower-bound objective |
| `^131014` | algebrizing method family |
| `^131015` | algebraic-oracle extension support |
| `^131016` | source barrier classification |
| `^131017` | P-vs-NP resolution requires escaping represented method family |
| `^131018` | barrier conclusion is a method constraint |
| `^131019` | method constraint leaves both truth values semantically open |
| `^131020` | barrier layer applies to resolution search but does not decide it |

## Objects

### Top-level target

- `3000`: resolve P versus NP
- `3001`: terminal conclusion `P = NP`
- `3002`: terminal conclusion `P != NP`

Both conclusions remain represented and neither is privileged.

## Relativization block

- `3003`: relativizing proof-method family
- `3004`: Baker-Gill-Solovay oracle construction theorem
- `3005`: paired recursive-oracle witnesses
- `3006`: opposite relativized outcomes
- `3007`: some recursive oracle A satisfies `P^A = NP^A`
- `3008`: some recursive oracle B satisfies `P^B != NP^B`

Source:

Baker, Gill, Solovay, *Relativizations of the P =? NP Question*, SIAM J. Comput. 4(4), 1975, DOI `10.1137/0204037`.

### Exact scope

The existence of opposite oracle worlds is source-explicit.

Derived barrier consequence used by the campaign:

```text
a proof argument that relativizes uniformly
cannot settle unrelativized P versus NP
by a conclusion that would persist in all oracle worlds
```

This is a proof-method falsifier.

It is not:

```text
evidence that P = NP
or
evidence that P != NP
```

## Natural Proofs block

- `3010`: natural-property proof family
- `3011`: constructivity
- `3012`: largeness
- `3013`: usefulness against the target circuit class
- `3014`: hardness / pseudorandomness assumption
- `3015`: superpolynomial lower-bound objective for general circuits

Source:

Razborov and Rudich, *Natural Proofs*, JCSS 55(1), 1997, DOI `10.1006/jcss.1997.1494`.

### Scope firewall

The barrier is conditional on the relevant hardness/pseudorandomness assumption and is framed for natural circuit-lower-bound properties.

The graph therefore does not assert:

- an unconditional ban on all lower-bound proofs;
- that a constructive polynomial-time SAT algorithm is blocked by Natural Proofs;
- that every possible P-vs-NP separation proof is a natural proof.

## Algebrization block

- `3016`: algebrizing proof-method family
- `3017`: oracle plus low-degree/algebraic extension access
- `3018`: source classification that P versus NP requires non-algebrizing techniques under this framework

Source:

Aaronson and Wigderson, *Algebrization: A New Barrier in Complexity Theory*, ToCT 1(1), 2009, DOI `10.1145/1490270.1490272`.

### Scope firewall

The algebrization barrier does not determine the truth of P versus NP.

The source itself is especially useful as a control because arithmetization can overcome ordinary relativization while still algebrizing. Therefore:

```text
non-relativizing
    !=
non-algebrizing
```

and crossing the first barrier is not sufficient evidence of crossing the third.

## Barrier-layer object

- `3020`: combined method-constraint layer

This is a discovery/accounting view only. It does not assert that one method must satisfy one universal conjunction of all barrier predicates before any useful theorem can be proved.

Different proof objectives engage different barriers differently.

## Critical objective split

The graph preserves two qualitatively different resolution routes:

### Equality route

Construct or prove a deterministic polynomial-time procedure sufficient for all NP languages, commonly mediated by an NP-complete problem.

Natural-Proofs circuit-lower-bound restrictions do not automatically apply to this constructive route.

### Separation route

Exhibit/prove a language in NP not in P, potentially through circuit/lower-bound machinery or another separation mechanism.

Circuit-lower-bound routes may engage Natural Proofs, while other separation routes require their own exact barrier audit.

Therefore:

```text
P = NP route support
    !=
P != NP route support
```

This asymmetry is load-bearing for later DP analysis.

## Disposition

- relativization witness facts: source-exact high-level theorem statement;
- Natural-Proofs barrier: conditional, scope retained;
- algebrization barrier: source-backed method barrier;
- combined barrier graph: discovery/accounting view;
- P-vs-NP truth value: OPEN / QU;
- global claim that these are all possible barriers: NOT MADE.
