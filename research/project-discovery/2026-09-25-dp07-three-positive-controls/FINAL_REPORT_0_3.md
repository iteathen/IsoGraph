# DP 0.7 three-positive-control run — Final report 0.3

**Status:** COMPLETE AUTHORITY-COMPLETE BLIND RUN — QUALIFICATION NOT ESTABLISHED  
**Workflow run:** `36224030592`  
**Experiment SHA:** `1708d6f309d4d823229d18d1cba2516da5af278e`  
**Evidence commit:** `b5dd2f1a0b842d1dd2b05b67aa097588e09d794a`  
**Pre-oracle freeze:** `DISCOVERY_FREEZE_0_3.md`  
**Translation Q7 promotion:** `f13aca1420327d7c1dc9a95ff78df44ffd820170`  
**Discovery model:** `gemini-3-flash-preview`  
**Packet SHA-256:** `db1b45cc57b2f19af12f07e3b1f307b2a5c7344eb2453b79c09052134b351c5d`  
**Report SHA-256:** `0bba35f0f47d1af684fca915522f0faf6458ceec59cf041c7ff81c103fa2fa81`  
**Oracle access during discovery:** none

## Scored result

The blind reasoner returned `EXACT_WITNESS` for all three controls.

Hidden-oracle adjudication accepts one of those exact claims and downgrades two for incomplete load-bearing closure:

```text
case-01: PARTIAL_WITNESS_RECOVERED
case-02: PARTIAL_WITNESS_RECOVERED
case-03: KNOWN_POSITIVE_WITNESS_RECOVERED

accepted exact witnesses: 1 / 3
DP 0.7 qualification: NOT ESTABLISHED
current run: FAILS QUALIFICATION GATE
```

The detailed score is recorded in `SCORE_0_3.json`.

## Case 01

The run corrected the major defects from the previous attempt.

It recovered:

```text
s = 2n - 1
n = (s + 1)/2

epsilon = -4J
mu      = 2h - 4J
```

and it used the represented degree-2 graph structure to transport the one-body term. It also preserved a configuration-independent energy-offset residual and cited the included normalization authority.

The remaining exactness defect is narrower but load-bearing: the cross-system inverse-scale parameter transport is not stated.

Both local signatures contain a symbol glossed `beta`, but the governing prompt explicitly says matching signature glosses are not proof that the two local symbols are directly identical.

To establish the normalized ensemble from:

```text
E_A = E_B + C
```

the witness must also establish the required relation between the two inverse-scale parameters. The obvious exact candidate is:

```text
beta_B = beta_A
```

but the frozen report never makes or audits that mapping.

Therefore the probability/partition closure is incomplete even though the underlying affine state/energy transformation is correct.

## Case 02

The run recovered:

```text
F <-> 0
T <-> 1
XOR <-> GF(2) addition
target <-> rhs
```

and it correctly distinguished the inner finite fold from the outer universal all-constraint/all-row satisfaction condition.

The remaining exactness defect is the selected-member support.

The promoted A structure uses `selected_variables`; the promoted B structure uses `selected_nonzero_variables`. The experiment authority explicitly states that selected-member families remain a separate represented obligation and must be mapped.

The frozen report says parity maps to row sum, but never explicitly discharges:

```text
selected variable
    <->
nonzero / coefficient-1 row member
```

as its own load-bearing mapping.

That leaves the exact per-constraint reconstruction incomplete, so the known correspondence is positive but not fully closed.

## Case 03

The required positive witness is recovered.

The report establishes:

```text
p = m v = m qdot
pdot = m a = m qddot
qdot = p/m
pdot = -kq
```

and reconstructs:

```text
m qddot + kq = 0
```

in one direction and both Hamilton equations in the other.

The bridge `p=m v` also accounts for the phase-space momentum coordinate without inventing an additional physical degree of freedom.

This case is scored:

```text
KNOWN_POSITIVE_WITNESS_RECOVERED
```

The report additionally says that `D(H,t)=0` follows from the equations. That statement is not admitted as experiment evidence because the pinned derivative authority does not include the product/chain rules needed for that derivation. It is non-load-bearing for the required Newton/Hamilton witness, so it is rejected separately rather than used to fail the core case.

## Main finding

The campaign has now removed the earlier major confounds:

```text
exact source rendering:             established
Q7 translation promotion:           established
generic transformation authority:   pinned
preferred full external reasoner:   used
exact-support protocol rule:         present
oracle isolation:                    established
```

Yet the reasoner still promoted incomplete audits to `EXACT_WITNESS`.

The remaining failure is therefore not an identified Core representability defect and not an identified missing DP 0.7 normative rule.

DP 0.7 section 13.1 and the blind prompt already require exhaustive load-bearing descent.

The remaining weakness is enforcement:

```text
reasoner says every load-bearing role was checked
    !=
mechanically demonstrated coverage of every represented role
```

## Required next correction

Do not weaken the exact gate.

Add a blind mechanical completeness layer for exact-witness candidates.

A practical minimal form is:

1. enumerate every local signature symbol actually used by each promoted native bundle;
2. require the reasoner to classify every used symbol as mapped, transformed, residual, shared infrastructure, or explicitly non-load-bearing;
3. require a counterpart or residual explanation where applicable;
4. mechanically reject `EXACT_WITNESS` if any used symbol is absent, duplicated ambiguously, or left unresolved;
5. keep the hidden oracle scorer independent.

This is a qualification-harness correction. It does not require a new Core primitive.

## Disposition

```text
ESR source rendering gate:                 PASS 6 / 6
Q7 promotion:                              PASS
authority-complete blind execution:        PASS
known positive transformation recovered:   3 / 3
accepted exact witness:                    1 / 3
DP 0.7 qualification:                      NOT ESTABLISHED
next action:                               mechanical exact-coverage gate + rerun
```
