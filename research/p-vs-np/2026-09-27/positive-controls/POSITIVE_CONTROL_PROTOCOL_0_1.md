# P versus NP primitive positive-control protocol 0.1

**Status:** active experimental protocol
**Branch:** `research/p-vs-np-primitive-logic-20260926`
**Recovered campaign parent:** `CAMPAIGN_CHECKPOINT_1_5.md`
**Recovered parent head before this unit:** `179251d7ba20465ec89daec7616ae0d1744eac31`
**Purpose:** run structurally different bounded-existential problems known to admit deterministic polynomial decision, while withholding their known solving procedures from the discovery input.

## Authority split

This campaign keeps the existing authority boundaries:

- Core 0.19 supplies exact source-rendering and implicit-assertion discipline.
- `CORE_SPEC_DRAFT_0_20_PRIMITIVE_LOGIC_CLOSURE_CANDIDATE.md` is used only as the unqualified experimental primitive-closure constraint.
- qualified NEI 0.4 semantics remain a separate identity layer.
- qualified QU 0.1 remains the unresolved-structure layer.
- DP 0.7 primitive-first discipline remains the discovery authority.
- `P_VS_NP_IMPLICIT_NEI_DP08_RUN_0_2.md` supplies the current P-vs-NP campaign target/falsifier synthesis; “DP08” here is a campaign-run label, not a new Core primitive.

## Frozen experiment order

For every control:

1. freeze the problem/formula semantics only;
2. primitive-render every load-bearing definition;
3. audit exact reconstruction and primitive closure;
4. only after steps 1-3, derive implicit assertions;
5. add NEI query scopes and explicit QU state;
6. run DP over the primitive + implicit + NEI state;
7. record recovered elimination laws;
8. record failed candidate laws as falsifiers;
9. compare controls only after each individual run is closed.

## Algorithm-hidden boundary

The source freeze and primitive rendering MUST NOT name, encode, cite, or smuggle in the standard solving procedure.

In particular the source/discovery input for the three initial controls must not contain solution-method labels such as:

- graph search, BFS, DFS, transitive-closure algorithm;
- forward chaining, unit propagation, Horn closure algorithm;
- Gaussian elimination, row reduction, echelon form.

Downstream implicit-assertion and DP artifacts may derive structures that later receive familiar human-facing names.

The experimental hiding boundary is not semantic uncertainty:

```text
withheld known algorithm
    != QU
```

A fixed control instance has complete closed-world input semantics. QU is present only if the represented problem itself contains unresolved alternatives, not merely because the experiment withholds a known method.

## Primitive bottom

The authoritative source render must terminate only in:

- `^150001` AND
- `^150002` OR
- `^150003` NOT
- `^150004` IMPLIES
- `^150005` IFF
- `^150006` FORALL
- `^150007` EXISTS
- `^150008` EQUAL
- ordered predicate/application incidence
- constructor tags/fields whose exact clauses are represented
- raw closed-world input relations/data

Reusable primitive arithmetic and finite-data theories may be referenced only with their primitive support path pinned; their derived names are abbreviations, not stopping leaves.

## Initial controls

### PC-R — finite directed bounded walk

Input exposes only a finite vertex carrier, a closed directed-edge relation, two distinguished vertices, and bounded witness-walk semantics.

### PC-H — Horn-form Boolean consistency

Input exposes only a finite variable carrier, a finite clause carrier, body/head incidences satisfying the Horn shape restriction, and existential assignment semantics.

### PC-G — GF(2)-form linear consistency

Input exposes only a finite variable carrier, finite equation carrier, coefficient incidences, right-hand bits, and existential Boolean-assignment semantics. XOR/parity semantics must be expanded to the primitive Boolean truth table/fold; no algebraic solver is supplied.

## Comparison rubric

For each control, record whether discovery independently recovers any of:

```text
T1  sound local dominance / simulation
T2  bounded separator / sufficient statistic
T3  polynomial hitting set / canonical witness
T4  polynomial exact aggregate recurrence
T5  constructible rejection invariant / sound abstraction
```

Also record any different exact mechanism.

A mechanism counts as recovered only when its exact support is reconstructible from the primitive input without importing the withheld solver.

## Falsifier discipline

Every proposed mechanism must include at least one attempted falsifier where a natural stronger version can fail.

Failure of one candidate mechanism is retained as negative evidence; it is not rewritten into a weaker success.

## Novelty discipline

Results are classified as one of:

```text
SOURCE_EXPLICIT
STANDARD_KNOWN_CONSEQUENCE
NEW_TO_CURRENT_ISOGRAPH_CAMPAIGN
EXTERNAL_NOVELTY_UNREVIEWED
```

No external novelty claim is permitted during this control unit. Broad literature/web research is intentionally excluded.

## Terminal truth discipline

These controls test discovery behavior only.

They do not change:

```text
P = NP:  OPEN
P != NP: OPEN
```
