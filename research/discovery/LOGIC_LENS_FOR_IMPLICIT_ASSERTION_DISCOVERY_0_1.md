# Logic Lens for Implicit-Assertion Discovery — 0.1

**Status:** non-authoritative discovery reference  
**Purpose:** refresh high-value logical and discrete-structural search patterns before or during implicit-assertion expansion  
**Semantic authority:** none by itself  
**Admission authority:** Core 0.19 plus the represented or pinned governing semantics of the system under study  
**Discovery consumer:** Discovery Protocol, especially DP 0.8

This guide exists because a discovery reasoner can satisfy Core 0.19 while still failing to notice elementary consequences that would materially change the visible support topology.

It is intentionally **not** a new logic built into IsoGraph.

The governing boundary is:

```text
reference material
    -> suggests relationships worth testing

represented premises + pinned authority
    -> determine whether the relationship is actually valid

Core 0.19
    -> determines whether the resulting implicit support may be admitted
```

In short:

```text
reason to search
    != reason to believe
```

---

# 1. Why use a logic lens?

An exact primitive representation may contain enough structure to establish facts that no source stated explicitly.

If those consequences are not surfaced, Discovery Protocol may mistakenly treat:

- derived assertions as independent;
- residual classes as separately generated facts;
- implied constraints as additional machinery;
- alternative support paths as unrelated;
- sufficient support as larger than necessary.

The logic lens is therefore a **search refresher**, not a theorem oracle.

---

# 2. High-value questions

Before treating represented assertions as independent, ask:

```text
What necessarily follows?

What cannot simultaneously hold?

Which alternatives are collectively exhaustive?

Which alternatives form a partition?

Is one class the residual/complement of the others?

Which assertions imply others?

Which assertions are equivalent?

Which conditions are necessary?

Which conditions are sufficient?

Which relations are transitive under the governing authority?

Which sets/constraints subsume others?

Which assertions remain invariant across admissible QU realizations?

Which facts can be reconstructed from a smaller generating support?

Which represented outcomes are logically derivable from others and therefore may not require an independent detector for the current objective?
```

A positive answer is only a discovery lead until its governing authority is identified.

---

# 3. Propositional patterns worth testing

When authorized by the represented logic, inspect structures involving:

## 3.1 Implication

```text
A -> B
```

Search questions:

```text
Does A establish B?
Is B already available through another support path?
Is A necessary for the target or merely one sufficient route?
```

Do not silently use contraposition unless the governing logic licenses it.

## 3.2 Conjunction

```text
A AND B
```

Search questions:

```text
Are both premises load-bearing?
Does one premise imply the other?
Is the conjunction itself reused as a derived support?
```

## 3.3 Disjunction and case structure

```text
A OR B
```

or more generally:

```text
A1 OR A2 OR ... OR An
```

Search for:

- exhaustiveness;
- overlap versus mutual exclusion;
- branch-specific support;
- residual branches;
- duplicated downstream conclusions.

## 3.4 Negation / exclusion

Search for represented incompatibility:

```text
A -> NOT B
```

or explicit constraints that prevent simultaneous truth.

Do not infer exclusion from different labels.

---

# 4. Exclusive / exhaustive partitions

A particularly high-value structure is a finite family whose members are both:

```text
mutually exclusive
AND
collectively exhaustive
```

For an authorized partition:

```text
{A, B, C}
```

the reasoner should test consequences such as:

```text
A -> NOT B
A -> NOT C

B -> NOT A
B -> NOT C

C -> NOT A
C -> NOT B

NOT A AND NOT B -> C
NOT A AND NOT C -> B
NOT B AND NOT C -> A
```

These consequences expose an important distinction:

```text
semantic member of a partition
    != requirement for an independent detector
```

An ordered classifier may therefore require fewer independent tests than there are semantic outcomes, provided the earlier tests are exact under the governing authority and the residual branch is exhaustive. Independent evidence for a residual class may still exist and should not be erased merely because the class is derivable.

This is a generic partition pattern, not a game-specific rule.

---

# 5. Necessary and sufficient conditions

For a target `O`, distinguish:

```text
A is necessary:
    O -> A

A is sufficient:
    A -> O

A is necessary and sufficient:
    A <-> O
```

Discovery should not confuse:

```text
often present
used by current implementation
computed before O
correlated with O
```

with necessity.

This distinction is especially important for DP 0.8 counterfactual removal.

---

# 6. Equivalence and alternative support

If two support structures establish the same target under the same authority, inspect whether they are:

```text
exactly equivalent
one-way substitutable
scope-equivalent
conditionally equivalent
different but both sufficient
unknown
```

Do not promote shared output alone to structural equivalence.

Alternative sufficient support may remain materially different in:

- transition anatomy;
- cost;
- scope;
- proof burden;
- QU dependence;
- identity consequences;
- side effects.

---

# 7. Set and constraint patterns

Where the governing domain supplies set/constraint semantics, inspect:

```text
subset / superset
disjointness
partition
cover
intersection
union
complement
constraint implication
constraint redundancy
subsumption
domination under a declared order
```

These patterns frequently expose support that is represented separately but logically dependent.

Do not import set semantics merely because source notation looks set-like.

---

# 8. Transitive and closure patterns

Where a relation is represented or pinned as transitive, a chain such as:

```text
R(A,B)
R(B,C)
```

may support:

```text
R(A,C)
```

Core 0.19 already uses transitivity as an illustrative exact implicit-assertion example.

The discovery lesson is broader:

> Inspect whether local assertions participate in a governing closure relation before treating every explicit edge as an independent information source.

Closure does not imply that explicit provenance should be erased.

---

# 9. Residual and complement reasoning

A residual class is not automatically an independent fact generator.

When the universe and exclusions are authorized, search for forms like:

```text
Universe
- established alternatives
= residual class
```

or:

```text
all admissible cases exhausted except X
    ->
X
```

This is useful for:

- classifications;
- state machines;
- proof cases;
- protocol outcomes;
- error categories;
- finite domain partitions;
- exact game outcomes;
- other exhaustive decision structures.

Again, the universe/exhaustiveness relation must be represented or pinned.

---

# 10. QU discipline

Unknown structure blocks premature logical closure when admissible realizations disagree.

Ask:

```text
Does this consequence hold in every admissible realization?

Does a refinement discharge the uncertainty?

Am I silently selecting one convenient realization?
```

If the consequence is invariant across the relevant QU family, qualified authority may support an exact implicit assertion while preserving QU provenance.

If realizations disagree, unconditional exact support is not available.

---

# 11. DTS discipline

Logical endpoint similarity may hide transition differences.

Before substituting one support path for another, ask whether the governing target depends on:

```text
ordering
guards
introduced information
removed information
boundary crossing
side effects
mechanism
transition evidence
```

If so, route through DTS.

```text
same final proposition
    != automatically interchangeable transition path
```

---

# 12. Suggested discovery workflow

A lightweight pass may use:

```text
1. collect explicit assertions and currently admitted implicit assertions
2. identify the governing logic / domain rule authority
3. inspect local high-value patterns:
       implication
       exclusion
       exhaustiveness
       partition
       equivalence
       necessary/sufficient conditions
       set/constraint inclusion
       closure
       residual classes
4. generate candidate implicit assertions
5. validate each candidate under Core 0.19
6. add admitted assertions with support lineage
7. repeat while the selected pass yields material new support
8. hand the expanded graph to ordinary DP analysis
```

This is a search procedure, not a universal semantic-completeness claim.

A no-change pass means only that this selected procedure found nothing further.

---

# 13. Recommended refresher material

These sources are useful for refreshing standard logical/discrete reasoning patterns. They do not become IsoGraph authority merely by being listed here.

- Open Logic Project — rigorous, modular material on propositional and first-order logic, proof systems, natural deduction, soundness, completeness, set theory, and related formal methods:  
  https://openlogicproject.org/
- `forall x: Calgary` / Open Logic Project — natural-deduction rules for truth-functional logic:  
  https://forallx.openlogicproject.org/html/Ch17.html
- MIT OpenCourseWare, *Mathematics for Computer Science* — propositions, predicates, proofs, case analysis, sets, relations, directed graphs, state machines, and related discrete structures:  
  https://ocw.mit.edu/courses/6-1200j-mathematics-for-computer-science-spring-2024/pages/readings/

A discovery packet may include a compact selected excerpt or locally maintained summary only when licensing, provenance, and prompt-size constraints are satisfied.

External textbook material is **contextual refresher material**, not a substitute for represented semantic authority.

---

# 14. Working summary

```text
Look for consequences before assuming independence.

Look for exclusion and exhaustiveness.

Look for partitions and residual classes.

Look for necessary versus merely used support.

Look for sufficient alternatives.

Use logic to generate questions.

Use represented authority to answer them.

Core 0.19 decides what implicit support counts.

Discovery decides where it is worth looking.
```
