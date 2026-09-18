# Experiment 006 — Hidden Discovery Oracle and Benchmark Provenance

**SCORER/REVIEWER ONLY. DO NOT INCLUDE IN THE COLD PACKET.**

## 1. Benchmark identity

The benchmark uses two independently presented proof styles for the Brouwer fixed-point theorem:

- **Proof Alpha:** the combinatorial route through Sperner-style labeling/parity plus refinement/compactness;
- **Proof Beta:** the fixed-point-free-map -> boundary retraction -> algebraic-topological no-retraction contradiction.

The cold artifacts deliberately remove theorem names, author names, citations, and the known relationship.

## 2. Independent source provenance

The benchmark skeletons are paraphrased mathematical structures rather than copied source prose.

Alpha source family:
- combinatorial Brouwer proof through Sperner's lemma, as presented in expository treatments such as Harper, *Explorations of Sperner's Lemma and Its Applications*, University of Chicago REU material.

Beta source family:
- standard no-retraction/homology proof of Brouwer, as presented in independent expository treatments such as the Rutgers note *The Brouwer Fixed Point Theorem*.

Historical-unification oracle:
- Nikolai V. Ivanov, *Sperner's Lemma, the Brouwer Fixed-Point Theorem, and Cohomology*, arXiv:0906.5193 (2009), https://arxiv.org/abs/0906.5193

Ivanov explicitly explains that the combinatorial proof of Sperner's lemma can be regarded as a cochain-level version of a standard cohomological argument, and that the standard deduction of Brouwer from Sperner is similar to the deduction from the no-retraction theorem and is closely related to simplicial approximation.

This oracle is used only after the cold report is frozen.

## 3. Oracle motifs

### O1 — contradiction architecture

Expected Alpha region:
```text
A02, A09, A10
```

Expected Beta region:
```text
B02, B08, B10
```

Structural content:
- assume absence of a fixed point;
- derive a globally impossible structure/condition;
- contradiction forces the target.

This motif alone is too generic to qualify DP.

### O2 — boundary-directed local encoding

Expected Alpha region:
```text
A04, A05
```

Expected Beta region:
```text
B03, B04
```

Structural content:
- Alpha's label at a vertex is selected from the sign/direction of displacement between the point and its image;
- the boundary condition excludes the label corresponding to the face containing the point;
- Beta turns the same fixed-point-free displacement direction into an explicit ray-to-boundary map/retraction.

A strong discovery need not reproduce this wording, but it should identify that Alpha's local label/boundary compatibility is a discrete encoding of information carried globally by Beta's boundary-directed construction.

### O3 — refinement / approximation bridge

Expected Alpha region:
```text
A03, A07, A08
```

Expected Beta region:
```text
B03, B04
```

Structural content:
- Alpha samples the continuous problem on arbitrarily fine finite subdivisions;
- labels on shrinking simplices encode local behavior that converges to the continuous structure;
- this has the role of a discrete/simplicial approximation to the boundary-directed continuous construction.

### O4 — parity versus global topological obstruction

Expected Alpha region:
```text
A06
```

Expected Beta region:
```text
B06, B07, B08
```

Structural content:
- Alpha's odd-parity/full-label result is not merely an arbitrary finite counting trick;
- it is the discrete obstruction preventing the boundary-compatible local data from extending without producing the required interior witness;
- Beta states the same kind of obstruction through functorial algebraic topology: nontrivial boundary information cannot factor through the trivial interior invariant;
- Ivanov's stronger historical connection identifies the combinatorial parity argument with a cochain-level/cohomological argument.

This is a deep motif.

### O5 — terminal contradiction with different residual machinery

Expected Alpha region:
```text
A09, A10
```

Expected Beta region:
```text
B08, B09, B10
```

Structural content:
- both produce a contradiction to the no-fixed-point assumption;
- Alpha reaches it through shrinking labeled simplices and coordinate inequalities;
- Beta reaches it by proving a retraction impossible through a global invariant.

The methods are not therefore fully isomorphic.

## 4. Required residual recognition

Alpha-specific residual machinery should include at least two of:

```text
A03 finite triangulation/refinement
A04 local coordinate labeling
A06 combinatorial parity/full-label lemma
A07 compactness/subsequence witness selection
A08 shrinking-simplex common-limit mechanism
```

Beta-specific residual machinery should include at least two of:

```text
B03 explicit ray-to-boundary map
B04 explicit retraction structure
B06 functorial invariant
B07 boundary/interior invariant computation
B08 factorization-through-trivial-object obstruction
```

Residual recognition is mandatory. A claim that the proofs are simply the same proof is a failure.

## 5. Critical overclaims

The cold result must explicitly reject:

```text
FULL_PROOF_ISOMORPHISM
NATURAL_IDENTITY
SAME_INTERMEDIATE_OBJECTS
```

The benchmark supports a nontrivial common proof structure / transformation relationship, not literal identity of every object or step.

## 6. DP promotion expectation

Expected lifecycle result:

```text
SUPPORTED_CANDIDATE
```

`CANDIDATE` may be scored PARTIAL if the substantive motifs are found but falsification/support is insufficient.

`QUALIFIED_CLAIM` is an overpromotion unless the report separately demonstrates the full IsoGraph semantic obligations for the exact claimed relation, which this packet is not designed to provide.

## 7. Success threshold

For DP `QUALIFIES`, require:

- at least four of O1–O5 matched;
- at least one deep motif among O2/O3/O4 matched;
- required residual recognition on both sides;
- all three critical overclaims explicitly rejected;
- at least one concrete falsification attempt against the strongest candidate;
- promotion exactly `SUPPORTED_CANDIDATE`;
- use of structurally relevant DP protocols rather than identifier/lexical coincidence as primary evidence.

A result matching only O1 and O5 is generic proof-by-contradiction recognition and does not qualify DP.

## 8. Memorization limitation

Because the mathematical relationship is part of the public literature and may appear in model training data, this benchmark cannot prove zero prior familiarity. The anonymization removes direct names/citations and forces the response to supply step-level structural mappings.

A future stronger benchmark may use a less famous independently documented unification or a newly constructed held-out pair. Experiment 006 nevertheless tests whether DP causes the agent to produce the correct relational structure rather than merely state a known theorem name.
