# P versus NP implicit-assertion coverage frontier 0.1

**Status:** claim-bounded coverage record, not a universal closure certificate  
**Current index:** `IMPLICIT_ASSERTION_INDEX_0_5.json`

## Machine-audited state

```text
admitted implicit assertions: 184
missing IA references:        0
support cycles:               0
max normalized depth:         11
superseded admission:         IA-013 predecessor placement
```

## Covered inference families

### Primitive logic and equality

- conjunction/implication/IFF consequences;
- equality substitution;
- constructor extensionality;
- exact disequality;
- quantifier duality/distribution safeguards.

### Primitive arithmetic/data

- functionality of addition/multiplication/power;
- natural order reflexivity/transitivity/antisymmetry/totality;
- strict residual decomposition;
- list-length uniqueness;
- finite member coding;
- polynomial bound closure.

### Computation

- unique initialization;
- deterministic one-step/path functionality;
- terminal-path properties;
- bounded-totality consequences;
- tape-span bounds;
- certificate/tableau/choice-sequence encodings;
- branching <-> bounded verifier projection;
- complement and Boolean closure;
- fixed finite relation compilation;
- representation renaming invariance.

### NEI / QU

- exact constructor SAME/DISTINCT;
- future-residual scoped identity;
- existential-observable scoped identity;
- QU-mediated UNKNOWN/incomplete discipline;
- residual identity complexity;
- coarsest exact future congruence;
- minimum semantic residual quotient;
- objective-vs-compositional identity separation.

### Generic existential-elimination laws

- dominating canonical witness;
- monotone/antitone witness collapse;
- polynomial-image canonicalization;
- exact symmetry quotient;
- independent-factor decomposition;
- sufficient statistics;
- bounded separators;
- polynomial residual invariants;
- polynomial witness hitting sets.

## Not covered / still open

### Mathematical truth

```text
universal bounded existential closure:
    OPEN
```

### Universal residual structure

```text
polynomial W_NEI for every verifier:
    NOT ESTABLISHED

polynomial exact residual identity for every verifier:
    NOT ESTABLISHED
```

The latter universal principle is assertion-equivalent in strength to the unresolved existential closure result.

### Official model bridge

Primitive convention alignment to the exact official computational formulation remains a separate qualification workstream.

Polynomial robustness of standard models is source-backed, but the primitive bridge is not complete.

### Domain-specific complete-problem structure

The authoritative truth kernel deliberately excludes SAT/Cook-Levin.

If SAT or another complete problem is used as a DP stress target, its own primitive rendering and implicit-assertion closure remain to be performed.

### Other identity questions

Only currently declared NEI query contexts have been expanded.

No claim is made that every useful identity scope has already been imagined.

### Probabilistic/Bayesian assertions

None admitted.

No qualified probability model is currently load-bearing.

### Arbitrary theorem closure

No claim is made that every theorem of the represented first-order/arithmetic system has been enumerated.

The closure target is **P-vs-NP-relevant, dependency-closed implicit structure**, not every mathematical consequence.

## Reopening rule

The candidate frontier MUST be reopened when:

- DP proposes a new exact support topology;
- NEI discovers a new identity scope;
- QU receives a material refinement;
- a complete problem is primitive-rendered;
- a new mathematical/domain theorem is pinned;
- an assertion proof uses an unnamed premise;
- a support audit finds a new derivation path.

## Negative-result discipline

A full selected-family pass with no new assertions may justify:

```text
operational fixed point for that pass.
```

It does not justify:

```text
no additional implicit assertion exists.
```
