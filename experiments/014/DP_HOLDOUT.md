# Experiment 014 — Fresh DP Mapping-Contract Holdout

Use cumulative Discovery Protocols 0.1-0.4.

## T01 — Resource exhaustion topology

Alpha:

```text
A01: an admissible process begins with integer budget N >= 0
A02: every nonterminal step irreversibly consumes at least one budget unit
A03: after k nonterminal steps, cumulative consumption is at least k units
A04: more than N nonterminal steps would therefore consume more than N units
A05: total consumption cannot exceed the initial N-unit budget
A06: exceeding N steps contradicts A05, so every admissible process terminates after at most N nonterminal steps
```

Beta:

```text
B01: an admissible process begins with a finite pool of M distinct tokens
B02: every nonterminal transition removes one token from the pool
B03: removed tokens are never reinserted during the process
B04: after k nonterminal transitions, exactly k distinct tokens have been removed
B05: more than M nonterminal transitions would therefore require removing more than M distinct tokens
B06: more than M distinct tokens cannot be removed from the initial M-token pool
B07: exceeding M transitions contradicts B06, so every admissible process terminates after at most M nonterminal transitions
```

Frozen comparison view:

- map parameter N <-> M;
- names/carrier implementation are non-rigid;
- dependency direction, finite-resource bound, per-step resource decrease, contradiction role, and bounded-termination conclusion are load-bearing;
- the scalar-budget implementation and distinct-token implementation are not asserted to be the same mechanism;
- relation sought is the strongest defensible common proof topology, not automatic full-proof isomorphism.

Discover the common topology. Where one side packages a role into one step and the other decomposes it, use one-node-to-subgraph alignment. Preserve method-specific residuals and reject unsupported stronger claims.
