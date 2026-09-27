# AC0 PARITY formal-control source registry 0.1

**Status:** frozen control source for the P-vs-NP IsoGraph campaign; no authority effect  
**Campaign branch:** `research/p-vs-np-isograph-20260926`

## Repository

`formalcs/circuit-complexity@9b19e6c5c9c6d331db018e8cf73d55d3c389e0f1`

The control is the machine-checked Håstad-style PARITY lower-bound development for fixed-depth unbounded-fan-in Boolean formulas and circuits.

## Pinned files

| Role | Path | Git blob |
|---|---|---|
| reading/dependency guide | `Parity/README.md` | `bc2c084359488af18cfb15536d768fe041d72972` |
| conceptual wiring | `Parity/HastadParityProof/Core.lean` | `750cb4fe4615040edb5a44be1c4fe4d67304019a` |
| parity semantics | `Parity/ParityProperties.lean` | `e00661361618c8e36f70eb88427979ef38194ced` |
| narrow-DNF contradiction | `Formulas/CnfDnf/ParityDNF.lean` | `431df6417df951867e57339d4318678a56fcc005` |
| exact switching lemma | `Formulas/CnfDnf/SwitchingLemma.lean` | `cb58d6b86cefbe9ba2807475605840947c23f694` |
| iterated depth reduction | `Parity/HastadParityProof/DepthReduction.lean` | `42087e71d03266ba3f0dea22b917812061e03d49` |
| restriction / round-zero composition | `Parity/HastadParityProof/Restriction.lean` | `06837293498eb1162f219d21166f3e44f32e9312` |
| one-third calibration | `Parity/HastadParityProof/Restriction/OneThird.lean` | `5204ee2fbed589e208ba2f53471a4a7c8b17dc0f` |
| sharp formula bound | `Parity/HastadParityProof/LowerBounds/Sharp.lean` | `a0b97038df1c1a89afae842283ade2f23f732015` |
| general formula routes | `Parity/HastadParityProof/General.lean` | `9c13550539d317edf90ec95963e5b24156762e2d` |
| formula-family package | `Formulas/CircuitFamilies.lean` | `106d6bbd23c0639e54cdfb8bcc7b24ce998af6e1` |
| circuit-family package | `Circuits/CircuitFamilies.lean` | `4bc7435d19423faafb56eecf793ec8c3f860405b` |
| circuit/formula bridge | `Parity/CircuitParityLowerBounds.lean` | `b94cd68c8855c0414495bf57c878c392b8690bed` |
| nullary normalization | `Parity/NormalizeNullary.lean` | `ccc6d7d1fd642332fb03147875f6f9ca9f8477dd` |
| sharp circuit bound | `Parity/CircuitParityLowerBoundsSharp.lean` | `b4bed35cb89c482c22f50d4d28ffa2bfd0e8e6ab` |
| AC0 family corollary | `Parity/CircuitParityLowerBoundsOneThird.lean` | `5952d87ae809bf320d4bb492a1ac56e200401688` |
| leveling normalization | `Parity/Leveling/ExistsLeveledForm.lean` | `603efac3b324c3aa65f4433d1c20f92969526512` |

## Frozen endpoints

### Exact switching lemma

`switching_lemma_exact` bounds the bad exact-cardinality restriction fraction by:

```text
(10 * sigma * w)^d
```

under its width, density and exact-cardinality hypotheses.

### Conceptual formula wiring

`hastad_parity_lower_bound_from_circuit_pieces` combines:

1. a restriction reducing a leveled AC0 formula to a narrow proper DNF;
2. parity-under-restriction with a fixed offset;
3. narrow-DNF misclassification of parity or its complement;
4. assembly back to a full input.

### Narrow-DNF terminal obstruction

`narrow_dnf_misclassifies_parity` states that a proper DNF of width less than its number of variables disagrees with parity or its complement on some input.

### Sharp circuit theorem

`circuit_parity_size_lower_bound_root_sharp` proves, for computation-depth parameter `d >= 2` and sufficiently large `n`:

```text
CircuitComputesParity n circuit
AND circuit.inputWidth = n
AND circuit.depth <= d + 1
->
2 ^ (nthRoot(d-1, n / (360 * 40^(d-2))) / (8*(d+3)))
    <= circuit.circuitSize
```

For fixed `d`, this is the advertised root-exponential fixed-depth lower bound.

### AC0 family corollary

`parity_does_not_have_ac0_circuits` proves that no fixed polynomial-size, constant-depth AC0 circuit family computes PARITY for all sufficiently large input lengths.

## Control scope

This source is a successful **restricted circuit lower bound**.

It is not:

- a lower bound for unrestricted Boolean circuits;
- a proof that PARITY is not in P/poly;
- a P-vs-NP separation;
- evidence that AC0 restrictions can be deleted.

Its value in the campaign is that every successful restriction is formally visible and can be traced to its first genuine consumer.

## Discovery discipline

DP may split coarse packages and identify alternative sufficient factorizations.

DP may not:

- erase constant depth because the final contradiction is attractive;
- generalize a switching lemma outside its declared formula class;
- replace a restricted lower bound with an unrestricted one;
- infer P != NP from PARITY notin AC0;
- classify a theorem argument as novel merely because IsoGraph rediscovers a source-explicit decomposition.
