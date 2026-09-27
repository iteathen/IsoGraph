# P vs NP — DP 0.8 structural discovery run 0.2

**Status:** experimental discovery; no authority effect; no resolution claim  
**Predecessor:** `INITIAL_DP08_RUN_0_1.md`  
**New source-backed input:** `P_VS_NP_RESOLUTION_ROUTES_0_1.isg` + audit  
**DP input:** unqualified DP 0.8 candidate blob `46b94fe4cbd407d6d690980604fe5eb854220f67`

## 1. Route factorization is load-bearing

The official Cook problem description supplies two explicit **sufficient** proof routes with different support:

```text
equality route:
    polynomial-time algorithm
    for 3-SAT / another NP-complete problem
        -> P = NP

separation circuit route:
    superpolynomial unrestricted-circuit lower bound
    for a specific NP-complete problem
        -> P != NP
```

Neither route is stated to be necessary.

Therefore the top-level discovery graph must branch **before** barrier analysis.

A single undifferentiated target:

```text
solve P vs NP
    -> cross barriers
```

is structurally incorrect.

The correct topology is at least:

```text
solve P vs NP
    ->
    {candidate equality proof topology,
     candidate separation proof topology}
    ->
    route-specific barrier obligations
```

## 2. Natural Proofs constrains a strengthened sufficient target, not P != NP itself

Cook's official description establishes:

```text
L in P
    -> L has polynomial-size Boolean circuit families
```

and hence:

```text
superpolynomial unrestricted-circuit lower bound
for one NP-complete problem
    -> P != NP
```

The Natural-Proofs barrier is attached to the circuit-lower-bound route.

DP consequence:

```text
Natural-Proofs barrier
    -> obstruction to one strong sufficient route

Natural-Proofs barrier
    != obstruction attached definitionally to P != NP
```

This is an important target-strength distinction.

The circuit route proves a **nonuniform lower bound strong enough to imply the uniform separation**.

The campaign must not infer the converse:

```text
P != NP
    -> NP-complete problem has superpolynomial circuit complexity
```

No such converse is represented by the source.

### Structural implication

A future candidate P-not-equal-NP argument can be rejected by Natural Proofs only after DP establishes that the candidate actually factors through the relevant natural circuit-lower-bound target.

The barrier cannot be inherited merely because the final conclusion is `P != NP`.

## 3. Equality and separation have asymmetric barrier surfaces

The official source explicitly allows:

- a constructive polynomial-time algorithm route to equality;
- even a conceivable nonconstructive equality proof;
- diagonalization/reduction and Boolean-circuit lower bounds as major tried separation routes.

Therefore the barrier surface is asymmetric.

### Equality side

Natural Proofs does not automatically constrain a direct algorithm witness.

A concrete polynomial-time algorithm for an NP-complete problem would itself supply the key computational witness.

### Separation side

A circuit lower-bound proof may engage Natural Proofs.

A diagonalization/reduction proof may engage relativization.

An arithmetization-based nonrelativizing proof may still engage algebrization.

Thus:

```text
barrier family
    belongs to
proof-topology class

not
terminal truth value
```

## 4. Barriers form coordinates, not a linear ladder

The first control set already falsifies a simple hierarchy.

Aaronson-Wigderson identify results that:

```text
do not relativize
but
do algebrize
```

Therefore:

```text
escape relativization
    !=
escape algebrization
```

Natural-Proofs status is a different coordinate because its trigger involves:

- a property of Boolean functions;
- constructivity;
- largeness;
- usefulness;
- a hardness/pseudorandomness assumption.

So the current search representation should use a barrier signature:

```text
(R, N, A, U, M)
```

where:

- `R`: relativization behavior;
- `N`: Natural-Proofs applicability and assumptions;
- `A`: algebrization behavior;
- `U`: uniform/nonuniform target scope;
- `M`: computational-model scope.

QU is allowed independently in each coordinate.

## 5. First exact high-value comparison question

The next useful question is **not**:

```text
what trick proves P != NP?
```

It is:

```text
what support changes between:

A. a successful separation that relativizes or whose oracle behavior is unresolved;

B. a successful nonrelativizing separation that still algebrizes;

C. a successful restricted circuit lower bound;

D. the unrestricted NP-complete circuit-lower-bound target?
```

The comparison should isolate the first relation that changes barrier signature.

That relation is a candidate discovery lead.

## 6. Control C3 gives a concrete barrier-crossing witness

The algebrization source classifies arithmetization-based separation results such as:

```text
MA_EXP notsubset P/poly
```

as nonrelativizing yet algebrizing.

This provides a real intermediate state:

```text
relativization escaped
algebrization not escaped
```

Thus "nonrelativizing proof" is not an endpoint property. It is one coordinate on a path.

### Lead

Render the exact proof architecture of one such result and compare it with the algebraic-query counterworld used by the algebrization barrier.

The high-value question becomes:

```text
which proof dependency survives ordinary oracle replacement
but is neutralized by low-degree algebraic extension?
```

That is a much narrower target for IsoGraph than "beat algebrization".

## 7. Restricted circuit lower bounds supply a second intermediate state

Cook's official description records exponential lower bounds for NP problems in restricted circuit models, including monotone circuits and bounded-depth circuits.

Therefore:

```text
strong lower bound
    is achievable
under
restricted circuit semantics
```

while unrestricted circuit lower bounds for explicit functions remain far weaker.

DP must preserve the restriction as a load-bearing premise.

### Lead

Render one successful restricted lower-bound proof and explicitly mark the first point where its circuit-class restriction is consumed.

Then ask:

```text
is the restriction required by the mathematical invariant itself,
or by the chosen representation / decomposition of the proof?
```

This is directly analogous to the packaging-dependency question that produced the Navier result, but no outcome is presumed.

## 8. P-versus-NP may benefit from "consumer analysis" of lower-bound hypotheses

The Navier campaign showed that a property carried through a proof package can be formally required by APIs while unused by the final consumer.

The P-vs-NP analogue is now well-defined:

```text
restricted lower-bound proof
    carries circuit-class restrictions
    through multiple lemmas

ask:
    where is each restriction first genuinely consumed?
```

Possible outcomes:

- every restriction is genuinely load-bearing;
- some restriction is used only by a packaging theorem;
- one restriction can be weakened on a downstream route;
- an alternate factorization exposes a different sufficient hypothesis.

This is a legitimate DP target because it asks about a **known successful restricted proof**, not the unresolved theorem directly.

## 9. A barrier itself can have packaging dependencies

Barrier theorems also have interfaces.

For Natural Proofs, the operative bundle contains:

```text
constructivity
largeness
usefulness
hardness/pseudorandomness assumption
target circuit class
```

For algebrization, the operative bundle contains a particular algebraic-oracle extension framework.

DP should separately ask:

```text
which barrier premises are intrinsically required
for the exact barrier conclusion,
and which are presentation/package choices?
```

This does **not** mean weakening a premise invalidly.

It means rendering the barrier theorem itself with the same exact-source discipline as the target proofs.

A discovered alternate barrier factorization would improve our map of what a candidate proof really must evade.

## 10. No new P-vs-NP theorem

The 0.2 run has not produced a new theorem resolving or narrowing the truth value of P versus NP.

The strongest result is architectural:

```text
barrier analysis must be route-specific,
and the Natural-Proofs barrier attaches to
a stronger nonuniform sufficient separation route
rather than directly to the base P != NP node.
```

This is source-backed and changes how the campaign should be organized.

## 11. Next execution units

1. Expand the exact Cook-Levin reduction chain natively rather than leaving it as one theorem package.
2. Render the official equality/circuit route source in the same native vocabulary as the Coq foundation.
3. Exact-render one successful restricted circuit lower-bound proof.
4. Exact-render one nonrelativizing-but-algebrizing separation.
5. Run independent comparison only after each rendering passes reconstruction.
6. Apply DP to the restrictions/assumptions at their **first genuine consumer**.
7. Preserve all unresolved barrier coordinates as QU.

## Disposition

```text
P = NP: OPEN
P != NP: OPEN
new theorem about truth value: NONE

new campaign architecture:
    route-specific barrier topology

highest-value discovery seam:
    exact consumer location of restrictions
    inside successful restricted lower-bound proofs
```
