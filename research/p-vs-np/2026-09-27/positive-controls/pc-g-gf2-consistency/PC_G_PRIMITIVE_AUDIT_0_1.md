# PC-G primitive rendering audit 0.1

**Status:** exact-source/primitive-closure audit candidate
**Source:** `PC_G_SOURCE_FREEZE_0_1.md`
**Native:** `PC_G_PRIMITIVE_0_1.isg`

## Pinned primitive dependencies

- `research/primitive-logic/PRIMITIVE_LOGIC_KERNEL_0_1.isg`
  - blob `2630336da5c4117a15a43c1dc0847536b33ed083`;
- `research/primitive-logic/PRIMITIVE_DATA_CONSTRUCTORS_0_5.isg`
  - blob `c0479ac1de1a1c8ff5737221133601618b1a56cf`;
- `research/primitive-logic/PRIMITIVE_NATURAL_ARITHMETIC_0_5.isg`
  - blob `fde4915b3a056430e0cb7a3a327e26abc1c7b09b`.

The control uses:

- `MEMBER=7430`;
- `LENGTH=7431`;
- `LE=7013`;
- Boolean AND extension `7441`.

Each is primitive-supported in the pinned dependency artifact.

## Control-local IDs

```text
172000  raw carrier for closed-world input-relation objects
172101  witness-membership bit
172102  coefficient bit
172103  XOR truth-table relation
172104  right-hand bit
172105  ordered finite parity
172106  one-equation satisfaction
172107  full control truth
```

All except the raw input-relation carrier and the explicitly enumerated XOR relation are expanded by IFF structure.

## XOR is not an opaque algebraic leaf

`172103` is represented by exactly four raw extension tuples:

```text
0,0 -> 0
0,1 -> 1
1,0 -> 1
1,1 -> 0.
```

No associativity, cancellation, vector-space law, rank theorem, or linear-algebra procedure is imported by its ID.

Any such property used downstream must be derived from this finite relation plus the represented recursion.

## Closed-world coefficient/RHS reconstruction

`172102` converts COEF presence/absence into an exact Boolean bit.

`172104` converts RHS1 presence/absence into an exact Boolean bit.

These conversions are justified only because the source explicitly freezes both input relations as closed-world.

## Ordered parity reconstruction

`172105` is recursively defined over the explicit variable list:

- NIL has parity 0;
- CONS takes the coefficient bit and witness-membership bit of the head;
- Boolean-AND forms the term;
- the term is XORed with the recursively computed tail parity.

The recursive call is on the proper list tail under the pinned finite-list inductive authority.

Thus no generic SUM, field, vector, matrix, or equation-evaluation primitive is hidden.

## Equation/control reconstruction

`172106` equates recursively computed parity with the recursively reconstructed RHS bit.

`172107` existentially quantifies a bounded assignment witness and universally requires equation truth over the explicit equation list.

Input endpoint closure and witness membership closure are explicit.

## Algorithm-hiding audit

The primitive input contains no:

- pivot;
- basis;
- row operation;
- rank;
- elimination order;
- normal form;
- canonical solution;
- contradiction-row construction.

Those are unavailable as source-explicit discovery hints.

## Primitive-leaf audit

After dependency expansion, the load-bearing support ends in:

- equality;
- Boolean composition;
- quantification;
- ordered predicate incidence;
- list constructor incidence;
- exact Boolean truth-table tuples;
- raw closed-world input tuples.

The human-facing “GF(2)” label is not used as an authoritative native leaf.

## QU state

The coefficient and RHS extensions are fixed closed-world data.

No semantic QU is required. The deliberately hidden known solver is not QU.

## Admission status

Source reconstruction: **PASS (author audit)**  
Primitive-closure trace: **PASS (author audit)**  
Algorithm-hidden boundary: **PASS**  
Independent parser/round-trip qualification: **pending campaign validation**

This is an experimental positive-control candidate, not a newly qualified Core artifact.
