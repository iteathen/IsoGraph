# PC-R primitive rendering audit 0.1

**Status:** exact-source/primitive-closure audit candidate
**Source:** `PC_R_SOURCE_FREEZE_0_1.md`
**Native:** `PC_R_PRIMITIVE_0_1.isg`

## Pinned primitive dependencies

The control uses the branch-resident primitive support chain:

- `research/primitive-logic/PRIMITIVE_LOGIC_KERNEL_0_1.isg`
  - blob `2630336da5c4117a15a43c1dc0847536b33ed083`;
- `research/primitive-logic/PRIMITIVE_DATA_CONSTRUCTORS_0_5.isg`
  - blob `c0479ac1de1a1c8ff5737221133601618b1a56cf`;
- `research/primitive-logic/PRIMITIVE_NATURAL_ARITHMETIC_0_5.isg`
  - blob `fde4915b3a056430e0cb7a3a327e26abc1c7b09b`.

The native control uses `MEMBER` (`7430`), `LENGTH` (`7431`), and `LE` (`7013`) only as traceable derived views whose primitive definitions live in those pinned artifacts.

## Native symbol audit

Control-local IDs:

```text
170000  raw carrier of closed-world binary input-relation objects
170101  derived WALK predicate
170102  derived control-truth predicate
170201  support handle for the WALK expansion
170202  support handle for the truth expansion
```

`170101` and `170102` are not semantic leaves. Each has an explicit `IFF` expansion in the native artifact.

`E` is permitted as raw input relation data: its extension is the instance data itself. No transition/path behavior is hidden in the identity of `E`.

## Source reconstruction

The native graph reconstructs the source in this order:

1. quantify the raw closed-world edge-relation object `E`;
2. define `WALK(E,w,a,b)` by exactly two list-constructor cases:
   - singleton base with `a=b`;
   - proper-tail step requiring one represented edge and recursive truth on the strictly shorter tail;
3. quantify the vertex list and distinguished endpoints;
4. require endpoint membership and edge endpoint closure inside the vertex list;
5. obtain exact list lengths through the pinned constructor recursion;
6. require witness length `k <= n` through the pinned primitive arithmetic chain;
7. existentially quantify a witness list satisfying the walk relation.

No extra graph-theoretic theorem is imported.

## Recursive-definition closure

The only recursive control-local predicate is `170101`.

Its recursive occurrence is on `tail`, where the represented constructor facts require:

```text
w    = CONS(a,tail)
tail = CONS(v,rest)
```

and the pinned finite-list theory supplies the inductive constructor authority. Therefore the recursion follows a strict proper-tail descent rather than an unconstrained cyclic equation.

## Primitive-leaf audit

After expanding the three pinned supporting views, load-bearing support terminates in:

- identity/equality;
- Boolean composition;
- quantification/binding;
- ordered predicate incidence;
- list constructor tag/field incidence;
- raw input relation tuples/data.

No named graph-search, reachability, algorithm, recurrence, machine, or complexity-class object is an authoritative leaf.

## Algorithm-hiding audit

The primitive input contains no representation of:

- already-reached sets;
- a recurrence table;
- a traversal order;
- a transitive closure;
- residual equivalence;
- a dominance order.

These are not available to DP as source-explicit structure.

## Exactness checks

### Positive reconstruction

Any source witness list satisfying the base/step walk definition, endpoint/input closure, and length bound satisfies `170102`.

### Reverse reconstruction

Any satisfying assignment of `170102` supplies:

- one witness list;
- exact list lengths;
- the bound relation;
- an exact structural derivation of `170101`.

Unfolding `170101` yields exactly the source base/step walk semantics.

### No sidecar completion

This audit explains the native structure but adds no missing truth condition.

## QU state

The source instance is closed-world. No semantic QU is required for its edge extension.

The withheld standard solution method is experimental masking, not QU.

## Admission status

Source reconstruction: **PASS (author audit)**  
Primitive-closure trace: **PASS (author audit)**  
Algorithm-hidden boundary: **PASS**  
Independent parser/round-trip qualification: **pending campaign validation**

The artifact is therefore usable as an experimental primitive positive-control candidate, not as a newly qualified Core artifact.
