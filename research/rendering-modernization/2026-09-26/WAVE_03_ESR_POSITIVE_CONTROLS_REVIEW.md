# ESR-Qualified Positive-Control Rendering Modernization Review — Wave 03

**Status:** preservation review; no semantic rewrite required

The six DP 0.7 positive-control source renderings were already qualified under Core 0.19 section 18 / ESR 0.1 and promoted at exact bytes.

Subjects:

- Ising;
- lattice gas;
- XOR;
- GF(2);
- Newtonian oscillator;
- Hamiltonian oscillator.

## Modernization disposition

The source-rendering layer already satisfies the relevant new source-fidelity standard.

Therefore:

```text
qualified exact native rendering
    -> preserve exact bytes

new implicit/discovery/sufficiency question
    -> create a separately versioned successor view
```

DP 0.8 does not create a reason to rewrite an exact source rendering merely because new discovery questions are available.

## Exact preserved blobs

| Case | Subject | Qualified Git blob SHA |
|---|---|---|
| case-01A | Ising | `62767cf9a0055215f5b77f7e9bdf79292ee95c1a` |
| case-01B | lattice gas | `8deec9bd3d46cd04b1fb7b1f7a0a535440cf3e55` |
| case-02A | XOR | `6ee0c988e9f7aa1bd2c77e8206c86ae789bca9a5` |
| case-02B | GF(2) | `046b42b20d7680d5db8c4de59e1b66eb135f1310` |
| case-03A | Newtonian oscillator | `9e2b15c160e2f872d4e23e6713494da2838c84db` |
| case-03B | Hamiltonian oscillator | `cdaf52d8c58e17a08aa9ee79d739482cfb0842a2` |

Both the qualification-side `translation-v2/<case>/NATIVE.isg` and the promoted `blind-v2` payload must remain byte-identical to those blobs.

## What still changes under the new standards

Nothing is added to the exact source bytes.

If these formulas are reused for DP 0.8, a successor discovery packet should separately declare:

- target conclusion/observable;
- support cone and any objective-relevant consumer slice;
- derived implicit support actually used;
- candidate space for any minimal/minimum claim;
- valuation profile only if an evaluable value system is supplied.

The exact-source layer remains untouched.
