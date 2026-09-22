# S0.4 atomic minimality — validation

Classification: source-relative interface irreducibility validation.

This is not a claim of globally minimal mathematics or proof uniqueness.

## Frozen authority

- formal source: `openai/NavierStokesAndEuler@f9e8bc5b38b6e212696e8a30e3e91517af887bbd`
- source rendering: `NAVIER_STOKES_FORCED_BLOWUP_0_1.isg`
- predecessor proof: S0.3 source-relative interface proof

## Native integrity

`S0_4_ATOMIC_MINIMALITY.isg`:
- blob: `6ee79d66cf8d2c98deec875bbaac13a3a74f62c2`
- relation occurrences: 126
- atom count: 25
- source imports: 34
- missing source imports: 0
- balanced delimiters: PASS
- undeclared labels: 0

## Deletion reachability test

Mechanically evaluated rule:

1. remove one atom (A_i);
2. mark every remaining atom with no unsatisfied dependencies available;
3. propagate availability until fixed point;
4. test reachability of:
   - R3 forced-breakdown target;
   - periodic forced-breakdown target.

Result:

- A0–A21: deleting any one makes **both** final targets unreachable.
- A22: deletion leaves R3 reachable but makes the periodic target unreachable.
- A23: deletion makes R3 unreachable but leaves the periodic target reachable.
- A24: deletion leaves R3 reachable but makes the periodic target unreachable.

Therefore:

[
orall iin{0,ldots,24},
quad
	ext{delete}(A_i)
Rightarrow
	ext{at least one declared final target is unreachable}.
]

Result: **PASS**.

## Target-specific interpretation

### Shared core

A0–A21 form the source-relative shared construction/transport core required by both represented theorem families.

### Whole-space-only obstruction

A23 is specific to the whole-space finite-energy competitor class.

### Periodic-only layer

A22 is the compression/periodization adapter and A24 is the periodic smooth-competitor obstruction.

This confirms the earlier rejection of a full whole-space/periodic contract isomorphism.

## Merge audit

The audit explicitly preserves distinctions that have different source consumers:

- flat base remainder vs exact-zero exterior;
- four correction contributions;
- invariant gain vs physical residual-rate bridge;
- diagonal extraction vs local theorem packaging;
- singular seed vs protected-ray transfer;
- localization vs smooth force extension;
- whole-space vs periodic uniqueness;
- viscosity transport vs compression/periodization.

Reader-facing prose may group some of these mechanisms, but the atomic proof graph must not identify them.

## Disposition

### S0.3

- source-relative interface sufficiency: PASS
- ten-box deletion test: PASS
- global minimality: NOT ESTABLISHED because several boxes are composite

### S0.4

- atomic source-backed interfaces: 25/25
- deletion witnesses: 25/25
- source-import integrity: PASS
- mechanical final-target deletion test: PASS

**Disposition: PASS — source-relative irreducible under the declared interface vocabulary.**

## Remaining stronger target

A stronger minimality result would require one of:

1. formalizing S0.4 as an axiom/interface layer in Lean and re-deriving the final theorem from it;
2. mechanically extracting the complete Lean declaration dependency closure and computing a minimal cut/basis under a frozen semantic quotient;
3. finding a derivation of one A-atom from the others, which would falsify the current irreducibility partition.

Until then, do not describe S0.4 as a mathematically unique or cardinality-minimal proof.
