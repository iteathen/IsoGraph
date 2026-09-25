# Experiment 017 — Connect4 q_o Congruence / q_r Transport Holdout

**Source owner:** iteathen/Connect4  
**Qualification host:** iteathen/IsoGraph  
**Purpose:** independent cold semantic review of the standard-7x6 q-congruence theorem and the horizontal-reflection cache quotient.

Use only the frozen source files and governing prompt.

## C01 — Declared theorem scope

From the supplied domain and theorem candidate, classify the scope of the q-congruence theorem.

Does it concern legal nonterminal standard-7x6 states, and does it by itself establish physical-state, move-history, or proof/certificate identity?

## C02 — Support and literal legal actions

Let two legal nonterminal states have the same orientation-sensitive support vector and therefore the same q_o.

Determine whether they have:
- the same literal legal columns;
- the same landing cell for each literal legal column;
- the same side to move.

## C03 — One-action terminal token

For equal q_o states and one common literal legal column c, determine whether q_o + c fixes whether the move:
- wins immediately for the mover;
- remains nonterminal;
- or fills the board without a win and draws.

## C04 — Strict-superset residual absorption

For same-player residual requirements A proper-subset B, determine whether discarding B from the minimal antichain can change ordinary legal future winning behavior.

Account explicitly for:
- mover events in A;
- mover events in B\A;
- opponent events in A;
- opponent events in B\A;
- first-win stopping when A completes.

## C05 — Successor q_o

For equal q_o states and the same common literal legal action that is nonterminal in both, determine whether the successor orientation-sensitive q_o is uniquely determined and equal.

## C06 — Rank induction

Given C02-C05 and the fact that every legal nonterminal move increases occupied rank by one on a finite board, determine whether induction establishes the same complete orientation-sensitive action-labelled future game for equal q_o states.

## C07 — Ordinary values implied by q_o congruence

If C06 holds, determine whether equal q_o entails equality of:
- exact W/D/L;
- fastest-win/longest-loss distance under a fixed ordinary tie convention;
- exact per-literal-column action values.

## C08 — Negative identity scope

Determine whether equal q_o also establishes:
- identical colored-board ownership arrangement;
- identical ordered move history;
- identical terminal-line provenance;
- identical proof/certificate context whose guards are not derivable from q_o.

## C09 — Reflection-canonical gameplayKey

The supplied native implementation canonicalizes horizontal mirrors in gameplayKey(). The supplied regression test constructs:
- a position with column 0 full;
- its horizontal mirror with column 6 full.

Their gameplayKey() values are equal while their literal legal-column sets differ.

Determine whether gameplayKey equality can therefore mean literal action-label identity.

## C10 — Horizontal action transporter

For horizontally mirrored states, determine the exact literal action transporter between orientations.

Does action c correspond to c, to 6-c, or to an unresolved mapping?

## C11 — q_r child correspondence

The regression test applies c on one state and the transported action on its mirror, then compares terminal status and child gameplayKey().

Determine whether the supplied evidence supports exact reflection-transported child correspondence under q_r.

## C12 — Scalar value reuse under q_r

Given horizontal reflection is an exact Connect4 automorphism, determine whether q_r/gameplayKey equality is sufficient for exact scalar ordinary W/D/L/value-cache reuse.

Also determine whether this alone authorizes returning a physical literal move label without orientation/transport information.

## C13 — Proof identity under q_r

Determine whether q_r equality establishes equality of proof/certificate context containing non-q guards such as deadline, resource, realizability, or provenance premises.

## C14 — Equal scalar value versus future-behavior identity

Suppose two states have the same exact W/D/L but different action-labelled future trees.

Does scalar value equality alone establish q_o future-behavior identity?

## C15 — Evidence versus theorem

The packet contains physical controls and regression tests as well as a deductive q-congruence argument.

Determine whether finite/random/test evidence by itself proves the universal q_o theorem, or whether the universal result depends on the deductive lemmas/induction.

## C16 — NEI 0.4 consequence for q_o

Assume the q_o theorem is accepted as exact qualified evidence.

For the identity query:

> same orientation-sensitive literal action-labelled ordinary future behavior?

determine whether the admissible identity-model family is forced to SAME for equal q_o states under qualified NEI 0.4.

## C17 — NEI / equivalence consequence for q_r

For equal q_r states whose orientations differ, distinguish these two queries:

A. same literal-coordinate action-labelled future behavior with no transporter;
B. same ordinary future behavior up to the explicit horizontal-reflection action transporter.

Determine whether q_r equality proves A, B, both, or neither.

## C18 — Overall review

Classify the standard-7x6 q_o congruence proof core after reviewing the supplied domain, proof and implementation controls:

- VALID_UNDER_DECLARED_SCOPE
- MATERIAL_GAP
- CONTRADICTED

If not VALID, identify the first load-bearing failed premise. If VALID, state whether the q_o/q_r distinction is required for correct interpretation.
