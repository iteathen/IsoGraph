# Supplementary Role-Definition Case Studies

These case studies are supplementary stress tests for the role definitions in the main manuscript. They are not premises of the formal theorem and should not be read as an independent proof. Their purpose is narrower: to show that the dependency-question framing is not tuned only to SKI, Rule 110, or the visible delimiter witness.

The working definitions tested here are:

```text
α: effective advance, productive difference, update, reduction, derivation,
   evaluation, generation, checking, or transformation.

β: determinate formal presence, such as an item, state, configuration,
   expression, proof object, base condition, result, or output.

γ: admissible bearing of advance on presence, such as application,
   rule-use, matching, arity, scope, binding, neighborhood, boundary,
   synchronization, completion, acceptance, or readout.
```

The roles classify dependencies, not modules. A carrier may be credited with different work at connected local interfaces, but this is an accounting assignment rather than an absolute property of the carrier. If a mechanism is claimed to settle application and also participate in advance, fair accounting counts both claimed dependencies there. If it does not do that work, the missing dependency must be answered elsewhere.

## Representative Cases

### Rule 110

Layer: elementary cellular automaton execution.

- β: current row, indexed cells, binary cell values, local neighborhoods.
- α: production of the next row.
- γ: neighborhood convention, Rule 110 lookup table, synchronous writeback, and boundary policy if finite.

The local rule and writeback discipline sit at a shared interface. Relative to the current row, they settle how present cell values are taken up for update. Relative to next-row production, they participate in effective advance.

### Conway's Game of Life

Layer: cellular automaton execution.

- β: grid configuration, live/dead cell values, cell coordinates.
- α: generation-to-generation advance.
- γ: Moore-neighborhood count, B3/S23 rule, simultaneity convention, and boundary convention.

The example shows why γ is not unique-successor selection in isolation. The bearing discipline includes neighborhood shape, survival/birth conditions, and synchrony.

### Turing Machine

Layer: standard deterministic machine execution.

- β: tape contents, head position, and current state.
- α: one machine-step advance.
- γ: transition-table lookup by current state and scanned symbol, write/move/state-update convention, halt convention, and readout convention.

Ordinary language may call the transition table "the transition." Under dependency accounting, the table also settles bearing: it specifies how a current configuration is taken up for an admissible next move.

### Nondeterministic Turing Machine

Layer: nondeterministic machine execution.

- β: tape contents, head position, and current state.
- α: admissible branch or step production.
- γ: transition relation determining allowed next moves, branching convention, and acceptance convention.

This case stresses an important clamp: γ need not determine a unique successor. It may determine an admissible relation or family of next steps.

### Lambda Calculus

Layer: term reduction.

- β: lambda terms, variables, abstractions, applications, and candidate redexes.
- α: reduction activity or term transformation.
- γ: beta-reduction schema, redex admissibility, substitution discipline, binding and scope, alpha-conversion hygiene, and evaluation strategy if a deterministic evaluator is specified.

Unstrategized lambda calculus is relational rather than deterministic, so γ is admissible bearing rather than a chosen next term.

### SKI Combinatory Logic

Layer: combinatory reduction.

- β: combinator terms and application trees.
- α: contraction or reduction activity.
- γ: application parsing, arity discipline, rewrite clauses for `I`, `K`, and `S`, and readout or normal-form convention if used.

The case clarifies that a productive presentation of SKI includes more than the visible names of the combinators. Application structure and rewrite admissibility are part of the counted apparatus.

### String Rewriting and Semi-Thue Systems

Layer: abstract string rewriting.

- β: current string or word over an alphabet.
- α: rewrite or replacement step.
- γ: pattern matching, production rule, occurrence selection, replacement convention, and strategy when specified.

For nondeterministic rewrite systems, γ determines admissible rewrites rather than a single chosen rewrite.

### Proof Calculus

Layer: proof construction or checking.

- β: formulas, sequents, proof lines, proof trees, assumptions, and contexts.
- α: inference, checking, or derivation-extension step.
- γ: inference rule schema, premise matching, substitution, variable freshness, discharge, and side conditions.

Proof systems make γ especially visible because side conditions, freshness requirements, and discharge rules determine whether an apparent step is admissible.

### Parser or Formal Grammar

Layer: syntactic recognition.

- β: input string, token stream, parse stack, parse tree state, or automaton state.
- α: parse advance, derivation step, or state/input-consumption advance.
- γ: grammar productions, precedence and associativity conventions, parser strategy, transition relation, and acceptance condition.

Ambiguous grammars and nondeterministic automata again show why γ is not identical with determinism. It may specify the admissible parse relation.

### Register Machine or Bytecode VM

Layer: instruction execution.

- β: register values, stack, heap or local variables, instruction pointer, and program text or bytecode stream.
- α: instruction dispatch and state update.
- γ: opcode semantics, operand decoding, addressing convention, branch condition, stack-effect convention, halt convention, and output convention.

The interpreter or dispatch mechanism is apparatus-heavy. That makes it useful for fair accounting: small bytecode alphabets do not eliminate the dependency work performed by decoding and execution conventions.

### Algebraic Manipulation

Layer: equational reasoning.

- β: equation, terms, variables, and domain context.
- α: transformation, checking, or derivation step.
- γ: allowed algebraic rules, equality interpretation, domain assumptions, and side conditions such as when cancellation is admissible.

For example, manipulating `p = 2p` depends on side conditions. Cancelling `p` is not just a visible symbol operation; its admissibility depends on the counted domain and rule discipline.

### Formal Quantum Circuit Simulation

Layer: effective formal simulation of circuit evolution.

- β: register state, vector or density matrix, qubit labels, and circuit description.
- α: gate application, measurement update, or evolution step.
- γ: gate placement and order, tensor-factor convention, unitary or measurement rule, basis convention, and readout.

This is included only at the formal simulation layer. Physical interpretation remains outside the scope unless it is part of the counted formal presentation.

## Cross-Case Findings

1. **α should not be identified with the whole transition relation.**  
   In many examples, the transition relation also contains application, matching, boundary, or readout discipline. α is the effective advance aspect, not the entire packaged map.

2. **γ should be defined as admissible bearing, not deterministic successor selection.**  
   Nondeterministic machines, relational rewrite systems, ambiguous grammars, proof search, stochastic presentations, and formal quantum simulations may specify relations, distributions, or admissible families rather than one next state.

3. **β is the most stable dependency family.**  
   Across the examples, β is the formal presence that operation concerns, transforms, preserves, halts on, emits, or reads. Its main boundary is that it is formal presence inside the counted presentation, not external meaning as such.

4. **Shared interfaces are expected.**  
   Many systems use one implementation unit at the interface between bearing and advance. This does not collapse α and γ. It means role assignment must be indexed to local dependency relations inside the chosen accounting boundary.

5. **The broad definitions remain disciplined when locally indexed.**  
   The useful test is not "what kind of object is this carrier absolutely?" but:
   - Does it carry effective advance?
   - Does it supply determinate formal presence?
   - Does it settle admissible bearing, application, boundary, acceptance, or readout?

These findings support the main manuscript's guardrail: the accounting boundary need not be one-dimensional. A presentation may contain connected local modes such as reading, matching, applying, updating, checking, accepting, and outputting. Role assignment is indexed to those local dependency relations, not to carriers in isolation.
