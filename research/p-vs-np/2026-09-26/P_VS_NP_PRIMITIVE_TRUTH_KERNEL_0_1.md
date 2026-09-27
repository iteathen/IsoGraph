# P versus NP primitive truth kernel 0.1

**Status:** unqualified primitive rendering candidate  
**Native file:** `P_VS_NP_PRIMITIVE_TRUTH_KERNEL_0_1.isg`  
**Core profile:** experimental Core 0.20 primitive-logic closure candidate

## Native-content rule

The native truth file contains no stable semantic label for:

- P;
- NP;
- SAT;
- NP-completeness;
- algorithm;
- machine;
- decision procedure;
- complexity class;
- acceptance;
- polynomial time.

Those names occur only in non-authoritative explanation/discovery material.

The native file uses only:

- primitive logical role labels `^150xxx`;
- raw carrier identities;
- raw constructor/data identities;
- raw extensional relation-graph variables;
- transparent low-level relations whose complete primitive definitions are bundled separately.

## Bare logical content

The single top formula quantifies over a raw unary relation graph `L` on finite bit-list objects.

The antecedent says that there exist finite control/symbol lists, a raw transition graph, and a polynomially bounded natural-function graph satisfying the branching transition clauses.

The consequent says that the **same raw unary relation graph `L`** has another such witness whose transition graph additionally satisfies functional uniqueness.

Written with explanatory words only:

```text
for every unary relation L over finite bit strings:

    existence of a polynomially bounded
    finite branching transition realization of L

implies

    existence of a polynomially bounded
    finite functional transition realization of L.
```

The unresolved familiar statement `NP subset P` is a derived view of this formula.

## What "branching transition realization" expands to

There is no native branching-machine node.

The antecedent consists directly of logical clauses asserting:

1. finite lists containing distinguished start and two distinct halt-state atoms;
2. a finite symbol list containing two bit atoms and one blank atom;
3. typing of every raw transition tuple against those lists;
4. no outgoing tuple from either halt state;
5. at least one outgoing tuple for every nonhalt state/symbol pair;
6. a total raw bound graph;
7. existential polynomial-growth witnesses expressed through primitive Peano arithmetic;
8. for every primitive bit list, primitive initialization data;
9. truth of `L(x)` iff there is a bounded exact-step path to the positive terminal state;
10. no path can survive nonterminally through the bound.

## What "functional" adds

Only one additional clause:

```text
if two transition tuples have the same current-state and read-symbol fields,
their next-state, write-symbol, and movement fields are equal.
```

Dropping this clause turns any consequent witness into an antecedent witness. The already-known deterministic-subcase direction is therefore structural in this kernel.

## Low-level transparent dependencies

The native truth formula uses anonymous relation SIs whose definitions are themselves primitive-expanded in:

- `PRIMITIVE_NATURAL_ARITHMETIC_0_2.isg`;
- `PRIMITIVE_DATA_CONSTRUCTORS_0_2.isg`;
- `PRIMITIVE_FINITE_TRANSITION_COMPUTATION_0_3.isg`.

In particular:

- natural order, multiplication, and power are recursive logical definitions;
- list membership and length are constructor recursion;
- exact-step reachability is recursive relational composition;
- bit-list recognition is constructor recursion.

Those SIs are not semantic stopping points. Primitive closure requires their definitions in the same bundle.

## SAT and Cook-Levin

SAT and Cook-Levin are deliberately absent from this authoritative truth kernel.

They may be attached later as Discovery Protocol views and proof-route adapters.

They cannot serve as primitive support.

## Remaining qualification boundary

The present kernel chooses a conventional finite-control two-way tape representation with finite alphabets and finite bit-string inputs.

Its polynomial-overhead equivalence to the exact official problem convention has not yet been primitive-rendered and qualified.

Therefore:

```text
primitive kernel construction: present
official-model equivalence: QU
official P-vs-NP resolution: not claimed
```

The kernel itself also remains unqualified under the new Core 0.20 candidate.
