# Two-Track Sketch: Physics-to-SKI Bridge and Later Signal Reduction

Working-note status: rough research notes, not paper prose. Keep this file as
a place for possible routes, hunches, burdens, and prototype plans.

## Current Framing Note

This sketch should be read through the current productive-role framework. The
older compact labels are not the load-bearing point. The load-bearing point is
that any effective productive presentation must supply:

```text
effective transition
determinate presence
determinacy of transition over presence
```

These are abstract role-families, not fixed mechanisms. A local implementation
may carry them through code, state, rules, parser behavior, machine
configuration, evaluator semantics, or other counted apparatus. The role labels
do not name static layers in a hierarchy.

## Why The Project Has Two Tracks

The bridge problem and the signal problem should stay separate.

Track 1 asks:

```text
Can ordinary physics functions that already execute correctly be translated
into a formal universal representation such as SKI?
```

Track 2 asks:

```text
After many valid translations exist, what structure survives reduction across
different implementations of the same relation?
```

The first project is about reproducible translatability. The second project is
about discovery. Mixing the two makes the burden too heavy too early.

## Track 1: Practical Physics-to-SKI Bridge

This is the lower-burden project.

The goal is not minimality. The goal is to create a clean, reproducible way to
map ordinary physics functions into SKI or another universal formal substrate.

The mapping must not hide the executor. A program does not compute by itself.
The honest object to translate is:

```text
program code + machine/executor semantics
```

not merely:

```text
program code
```

Core idea:

```text
physics function
-> executable instruction stream
-> formal intermediate representation
-> lambda calculus or combinatory expression
-> SKI
```

The important claim is simple:

```text
If a physics relation can be implemented as executable code, then its executable
behavior can be translated into a formal computational representation, and from
there into SKI.
```

This does not claim the resulting SKI term is elegant, small, or physically
revealing. It only claims the mapping is valid and reproducible.

More precisely:

```text
physics program + executor rules -> formal semantics -> SKI
```

## Why Executor Accounting Matters

The current paper's central accounting rule applies here: roles count where they
are carried. If a physics function only runs because a bytecode interpreter,
machine semantics, runtime, parser, or evaluator supplies missing productive
roles, those roles have not disappeared. They have been carried by apparatus.

For an IBM 650-style route, the adapter must account for both the program and
the productive apparatus that makes the program run:

```text
instruction format
opcode semantics
machine state
drum memory
accumulator and distributor behavior
addressing rules
next-instruction address
branch rules
arithmetic and sign rules
I/O rules if used
halt behavior
```

Otherwise the executor has been left outside the formal object being translated.

## First Prototype

Use bytecode before native machine code.

```text
Python physics function
-> Python bytecode
-> stack-machine IR
-> lambda calculus
-> SKI
```

Possible starter functions:

```text
add(a, b) = a + b
square(x) = x * x
kinetic_energy(m, v) = 0.5 * m * v * v
inverse_square(k, r) = k / (r * r)
harmonic_potential(k, x) = 0.5 * k * x * x
```

## IBM 650 Route

The IBM 650 route is attractive because it gives a historically real scientific
machine with a relatively explicit execution model.

The target is not just:

```text
IBM 650 program -> SKI
```

The target is:

```text
IBM 650 program + IBM 650 instruction semantics -> role-preserving IR -> SKI
```

The instruction mapping should be semantic, not merely trace-based:

```text
each IBM 650 instruction -> role-preserving event or term with defined semantics
```

Execution traces remain useful for testing and debugging, but the adapter should
translate the instruction set or chosen opcode subset itself. That makes the
bridge reusable instead of proving only one observed run.

First IBM 650 subset:

```text
load / transfer
store
add
multiply
branch
stop
```

First IBM 650 physics target:

```text
F = m * a
```

End-to-end success condition:

```text
IBM 650 emulator result == role-preserving IR result == SKI executor result
```

This makes the bridge executable rather than merely descriptive.

## Two Valid Implementation Routes

There are two useful routes, depending on the goal.

Route A: low-noise historical machine.

```text
Use IBM 650 when the goal is clarity, interpretability, and a clean first proof
of physics-to-SKI translation.
```

The IBM 650 is attractive because the execution stack is thin:

```text
instruction word
drum memory
accumulator / distributor
opcode semantics
next-instruction address
card / printer I/O if used
```

Route B: modern noisy machine.

```text
Use ordinary modern code when the goal is scale, convenience, and broad
coverage.
```

Modern systems contain much more noise:

```text
source language
compiler
runtime
operating system
ABI and calling convention
register allocation
floating point unit
library calls
memory allocator
microcode
cache and speculation behavior
```

This noise does not invalidate the bridge. It only makes signal extraction
harder.

```text
Noise affects interpretability, not basic translatability.
```

If the only goal is to show that a physics function can be mapped into SKI, a
noisy modern route may be acceptable. If the goal is to find clean structural
signal, a low-noise historical route is a better first target.

## Why This Matters

Most discussion of physics in SKI starts from the hardest formulation:

```text
Can physical law be expressed directly in SKI?
```

This project starts from the practical end:

```text
Can we take physics functions that already execute correctly and compile their
executable behavior into SKI?
```

That makes the bridge mechanical and testable.

The deeper motivation is conditional. If physical reality is completely
expressible as an effective productive formal system, then the minimal
productive-role structure required by such a system should appear somewhere in
the formal foundations of that reality. The bridge project does not prove this
condition. It creates a practical route for searching for recurring structural
patterns in formalized physical relations.

Looser note, not for the main paper: complete formalizability may be too strong.
Even if reality is only partly formalizable, local effective structures might
still expose the same role-shape. That would make the pattern a useful search
target, but not something established by the main argument.

## Track 1 Success Condition

A successful prototype should show:

```text
1. A source physics function.
2. Its executable instruction stream.
3. A formal IR preserving the same behavior.
4. A generated SKI expression.
5. A verification test showing matching input-output behavior.
```

The result may be huge and inefficient. That is acceptable.

The contribution is the bridge:

```text
ordinary physics code -> SKI mapping
```

Important caution: the method used to compute the physics relation may itself
obfuscate the structure we want. A valid SKI mapping may mostly reflect the
chosen algorithm, source language, bytecode, numerical method, data
representation, library call, or executor convention. That mapping proves
translatability, not minimality. For physics-facing targets, the relation must
be mapped many ways and reduced until method-specific scaffolding falls away.

Also: what humans regard as simplest may not matter. A familiar equation, a
short program, a small SKI term, or a readable notation may still be the wrong
measure of simplicity. The target is the form the relation itself seems to
force: whatever remains invariant and necessary after behavior-preserving
reductions across many methods.

Epistemic limit: this method will probably restrict how much of mapped physics
can be trusted as foundational structure. A correct executable mapping can
still reflect modeling choices, coordinate choices, numerical approximations,
measurement conventions, algorithms, and executor artifacts. Track 2 should
therefore treat reduced structures as candidates, not as direct access to
reality. Confidence increases only when a pattern survives many formulations,
methods, executors, and behavior-preserving reductions.

Negative results matter. If a candidate structure disappears when the
formulation, algorithm, numerical method, executor, or reduction path changes,
that is useful evidence. It should be recorded because it helps separate
method-specific scaffolding from structures that may belong to the relation.

Anti-overfitting rule: do not tune reductions to protect the pattern we hope to
find. The verifier should preserve behavior, not preserve the candidate shape.
If a pattern survives only because the search was shaped around it, it is not
independent signal.

## Track 2: Minimization and Signal Extraction

This is the harder research problem.

Once physics functions can be mapped into SKI, the next question is:

```text
Which parts of the mapping are essential to the physical relation, and which
parts are artifacts of language, compiler, bytecode, library, or executor?
```

This is not needed to prove the bridge exists. It is needed to find clean
signal.

## Track 2 Core Idea

Generate many valid mappings of the same relation, then compare them.

```text
same relation, different source code
same relation, different algorithms
same relation, different data representations
same relation, different languages
same relation, different compilers or bytecodes
same relation, different optimization settings
same relation, different mathematical formulations
same relation, different numerical methods
```

If a structure survives across many mappings, it may belong to the relation. If
it disappears when the implementation changes, it was probably scaffolding.

## Reduction Pipeline

```text
physics relation
-> many executable implementations
-> many formal mappings
-> behavior-preserving reductions
-> compare surviving structures
-> candidate relational signal
```

## What Counts As Signal

The signal is not expected to appear mainly as numbers.

It is more likely to appear as:

```text
preserved relationships
ratios
invariants
transition patterns
constraint structures
recurring subterms
compression patterns
behavior-preserving reductions
```

In the current framing, the hoped-for signal is a recognizable local pattern of
the minimal productive-role structure, not a literal copy of one notation.

Minimal version of the isomorphism thought:

```text
not same surface system
maybe same reduced productive-role shape
```

## Transformer Use

A transformer can help search the reduction space.

```text
input: many mappings and their source relations
task: propose compressions, alignments, and candidate shared structures
verifier: test whether behavior is preserved
output: reduced candidates and recurring patterns
```

The transformer proposes. The verifier decides.

## Track 2 Success Condition

The minimization track succeeds only if it can show:

```text
1. Multiple valid mappings of the same relation.
2. A reduction or comparison method.
3. A surviving structure that is not tied to one implementation.
4. Behavioral verification after reduction.
5. A clear distinction between relation-signal and implementation scaffolding.
```

## Relationship Between The Tracks

Track 1 builds the bridge.

```text
Can we map physics functions into SKI at all?
```

Track 2 searches for signal.

```text
Can we reduce those mappings enough to identify what belongs to the relation?
```

Do not mix the burdens.

The first project does not need to solve minimization. It only needs to make
physics-to-SKI mapping practical and reproducible.

The second project can only begin once there are enough valid mappings to
compare.
