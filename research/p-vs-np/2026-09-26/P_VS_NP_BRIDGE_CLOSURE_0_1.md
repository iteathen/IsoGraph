# P-vs-NP bridge closure 0.1 — reduction closure and Cook-Levin chain repair

**Status:** source-supported derived bridge record; no authority effect  
**Campaign branch:** `research/p-vs-np-isograph-20260926`

## 1. Cook-Levin chain repair

Pinned source:

`uds-psl/coq-library-complexity@14b5f413d2fb7adecde79c5451b483f9a1af59a8`

File:

`theories/NP/SAT/CookLevin.v`

The exact exposed chain includes:

```text
GenNP
 -> LMGenNP
 -> fixed multi-tape TM generic NP
 -> fixed single-tape TM generic NP
 -> FlatSingleTMGenNP
 -> FlatTCC
 -> FlatCC
 -> BinaryCC
 -> FSAT
 -> SAT.
```

The predecessor unified graph 0.2 incorrectly compressed the last two source steps into:

```text
BinaryCC -> SAT.
```

0.3 repairs this by inserting `FSAT`.

No semantic theorem changed.

## 2. P is closed backward under polynomial many-one reductions

Pinned source definitions:

`theories/Complexity/NP.v`
blob `f92971a055eb87131449e6eceebd005a6776833c`

give:

```text
inP B := inTimePoly B
```

and a polynomial many-one reduction:

```text
A <=p B
```

contains:

```text
f : X -> Y
polyTimeComputable f
forall x, A x <-> B (f x).
```

Pinned composition support:

`theories/Complexity/PolyTimeComputable.v`
blob `a2f38507215e46f6a46465d9c5790fe3fa30c14e`

proves:

```text
polyTimeComputable_composition:
    polyTimeComputable f
    ->
    polyTimeComputable g
    ->
    polyTimeComputable (g o f).
```

The `inTimePoly` support in `NP.v` supplies a polynomial-time decider for `B`.

Composing the reduction map with that decider yields a polynomial-time decider for `A`, and the reduction's iff obligation supplies correctness.

Therefore the source definitions and composition theorem support the derived closure:

```text
A <=p B
AND
B in P
    ->
A in P.
```

This record treats that statement as a **derived source-supported bridge**.

It is not claimed to be a separately named theorem already present in the pinned Coq file.

## 3. SAT equality corollary

Cook-Levin gives:

```text
SAT is NP-hard.
```

So for every:

```text
L in NP,
```

there exists:

```text
L <=p SAT.
```

If additionally:

```text
SAT in P,
```

reduction closure gives:

```text
L in P.
```

Thus:

```text
NP subset P.
```

Together with the already-source-established:

```text
P subset NP,
```

we get:

```text
P = NP.
```

Conversely, if:

```text
P = NP,
```

then since:

```text
SAT in NP,
```

we have:

```text
SAT in P.
```

Therefore, inside the represented class/reduction model:

```text
P = NP
    iff
SAT in P.
```

This is a derived exact equivalence relative to the pinned model.

## 4. Model boundary

The equivalence above is established **inside the pinned formal complexity model**.

The campaign still has a separate unresolved obligation:

```text
pinned Coq/L P-vs-NP model
    <-> 
official standard Turing-machine formulation
```

with polynomial-overhead equivalence.

Do not erase that boundary merely because the complexity-theory result is standard.

## Disposition

```text
Cook-Levin chain:
    repaired

P backward reduction closure:
    source-supported derived bridge

formal-model P=NP iff SAT in P:
    supported

official-model transfer:
    QU / still to render
```
