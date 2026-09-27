# CNF target primitive rendering audit 0.1

**Status:** exact-source/primitive-closure audit candidate
**Source:** CNF_TARGET_SOURCE_FREEZE_0_1.md
**Native:** CNF_TARGET_PRIMITIVE_0_1.isg

## Pinned primitive dependencies

- research/primitive-logic/PRIMITIVE_LOGIC_KERNEL_0_1.isg
  - blob 2630336da5c4117a15a43c1dc0847536b33ed083;
- research/primitive-logic/PRIMITIVE_DATA_CONSTRUCTORS_0_5.isg
  - blob c0479ac1de1a1c8ff5737221133601618b1a56cf;
- research/primitive-logic/PRIMITIVE_NATURAL_ARITHMETIC_0_5.isg
  - blob fde4915b3a056430e0cb7a3a327e26abc1c7b09b.

MEMBER (7430), LENGTH (7431), and LE (7013) are only traceable derived views into those primitive-support artifacts.

## Control-local IDs

~~~text
173000  raw carrier for closed-world literal-relation objects
173101  derived clause-satisfaction predicate
173102  duplicate-free list predicate
173103  derived full target truth predicate
~~~

All semantic target predicates are expanded by IFF structure.

## Exact clause reconstruction

173101 expands exactly to:

~~~text
exists positive literal made true
OR
exists negative literal made true.
~~~

An empty clause has no witness for either disjunct and is false.

A clause containing both signs of the same variable is true under both membership cases; that fact is derived from the primitive formula rather than imported as a special rule.

## Exact target reconstruction

173103 represents:

- duplicate-free coordinate/clause lists;
- closure of all POS/NEG endpoints inside those lists;
- one bounded existential witness list;
- extensional assignment membership;
- universal satisfaction of every listed clause.

No CNF solver, search state, elimination rule, recurrence, or proof system is an authoritative native leaf.

## Primitive-leaf audit

After expanding pinned data/arithmetic views, target support terminates only in:

- equality;
- Boolean logical composition;
- universal/existential binding;
- ordered predicate incidence;
- finite list constructors;
- raw closed-world input tuples/data.

The human-facing CNF/SAT label is not used by the native truth path.

## Discovery boundary

The target discovery input will contain only the source freeze, native primitive rendering, and the pinned primitive dependencies.

This audit and all later implicit/NEI/DP artifacts are excluded.

## QU state

The target instance is closed-world.

No semantic QU is required for POS/NEG incidence.

## Admission status

Source reconstruction: **PASS (author audit)**  
Primitive-closure trace: **PASS (author audit)**  
Algorithm-hidden boundary: **PASS**  
Independent parser/round-trip qualification: **pending campaign validation**
