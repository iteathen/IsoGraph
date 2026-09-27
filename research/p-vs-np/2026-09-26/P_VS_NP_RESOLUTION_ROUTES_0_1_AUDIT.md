# P vs NP resolution routes 0.1 — source/scope audit

**Status:** source-backed route rendering; no resolution claim  
**Native graph:** `P_VS_NP_RESOLUTION_ROUTES_0_1.isg`

## Primary source

Stephen Cook, *The P versus NP Problem*, official Clay Mathematics Institute problem description, in *The Millennium Prize Problems*.

Relevant source pages in the published volume:

- page 98: equality route discussion;
- page 99: Boolean-circuit separation route and Natural-Proofs context.

## Relation dictionary

| Relation | Meaning |
|---|---|
| `^132000` | represented route-layer object |
| `^132001` | resolution target has two alternative conclusions |
| `^132002` | constructive polynomial-time algorithm route |
| `^132003` | algorithm solves an NP-complete problem |
| `^132004` | route is sufficient for equality conclusion |
| `^132005` | unrestricted Boolean-circuit lower-bound route |
| `^132006` | selected problem is NP-complete |
| `^132007` | every circuit family for that problem requires superpolynomial size |
| `^132008` | route is sufficient for separation conclusion |
| `^132009` | equality-route source support |
| `^132010` | separation-route source support |
| `^132011` | Natural-Proofs barrier attaches to circuit lower-bound route |
| `^132012` | circuit lower-bound route targets separation |
| `^132013` | route topology is objective-scoped |

## Objects

- `4000`: resolve P versus NP
- `4001`: `P = NP`
- `4002`: `P != NP`
- `4003`: polynomial-time algorithm for 3-SAT / another known NP-complete problem
- `4004`: equality conclusion reached through NP-completeness
- `4005`: unrestricted Boolean-circuit lower-bound route
- `4006`: specific NP-complete problem such as 3-SAT
- `4007`: superpolynomial lower bound on every Boolean-circuit family solving it
- `4008`: official equality-route source passage
- `4009`: official circuit-route source passage

## Exact route claims retained

### Equality route

The official description states that an evident route to `P = NP` is to exhibit a polynomial-time algorithm for 3-SAT or another known NP-complete problem.

The graph records this as **sufficient support**, not as a claim that every proof of `P = NP` must be constructive. Cook explicitly notes that a nonconstructive proof is conceivable.

Thus:

```text
polytime algorithm for a known NP-complete problem
    -> sufficient for P = NP
```

but not:

```text
P = NP
    -> every proof must exhibit such an algorithm
```

### Separation circuit route

The official description states that every language in P has polynomial-size Boolean circuit families and therefore a superpolynomial circuit lower bound for a specific NP-complete problem such as 3-SAT suffices to prove `P != NP`.

Thus:

```text
superpolynomial unrestricted-circuit lower bound
for one specific NP-complete problem
    -> P != NP
```

This is a one-way sufficient route.

The converse is not asserted.

## Barrier placement consequence

The Natural-Proofs barrier belongs on the unrestricted-circuit-lower-bound route, not directly on the semantic node `P != NP`.

This matters because:

```text
barrier on one sufficient route
    !=
barrier on every possible route to the same target
```

The graph keeps this distinction native.

## Authority boundary

This rendering does not add:

- a claim that the two displayed routes exhaust all possibilities;
- a claim that P-versus-NP equality requires an explicit algorithm;
- a claim that P-versus-NP separation requires circuit lower bounds;
- a converse from `P != NP` to any particular circuit lower bound.

Those remain outside the source claim.
