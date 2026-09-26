# DP 0.7 three-positive-control run — Final report 0.1

**Status:** COMPLETE FIRST RUN  
**Workflow run:** `36213568767`  
**Discovery model:** `gemini-3.5-flash`  
**Packet SHA-256:** `69fe9d134e3f2f8a11713b69ff238590d59b24fb33a79a487e7ef8c76ead84a6`  
**Report SHA-256:** `4aa6a937d618ee51c55384b9af808b6966bfbb9a5d28fc1c73b79a308c6ef58a`  
**Oracle access during discovery:** none

## Executive result

The cold reasoner recovered the conceptual known-positive transformation in all three controls.

Scored result:

```text
case-01: PARTIAL_WITNESS_RECOVERED
case-02: KNOWN_POSITIVE_WITNESS_RECOVERED
case-03: PARTIAL_WITNESS_RECOVERED
```

This supports DP 0.7's usefulness, but it does not qualify DP 0.7.

## Case 01

Recovered correctly:

```text
x = 2y - 1
y = (x + 1)/2
```

and recognized that pair and one-body terms must transport.

It did not correctly establish the exact coefficient transport or explicitly isolate the additive state-independent constant.

There is also a harness defect: the anonymous control says only "fixed symmetric neighbor relation." On a non-regular graph, substituting the pair term produces degree-dependent one-body coefficients. A single scalar B-side coefficient requires a regular degree-z graph (or a site-dependent coefficient representation).

Therefore this control must be repaired before it can serve as a clean exact oracle.

## Case 02

The reasoner recovered the complete known witness:

```text
F <-> 0
T <-> 1
binary parity operation <-> addition modulo 2
constraint target <-> equation RHS
all constraints satisfied <-> all rows satisfied
```

and reconstructed both directions.

This case passes the positive witness.

However, it also claimed a concrete number of constraints and variables by counting role SIs. That cardinality is not represented and is rejected as an unsupported overclaim.

## Case 03

The reasoner recovered the mathematical bridge:

```text
p = m v = m qdot
pdot = m qddot
pdot = -kq
=> m qddot + kq = 0
```

and the reverse first-order reconstruction.

But several native SI correspondences in its mapping table are wrong. For example, the Newton mass/stiffness roles were mapped to derivative roles rather than the Hamilton-side mass/stiffness roles.

So the conceptual witness is strong, while the claimed primitive/native witness is only partial.

## Most important DP 0.7 finding

The run exposes exactly the abstraction hazard DP 0.7 was designed to address:

```text
correct higher-level correspondence
    !=
correct primitive witness
```

The reasoner could recognize the right mathematical relationship and then overreach when descending back to native structure.

A likely protocol refinement is:

> After a derived common view produces a candidate correspondence, an exact discovery result must descend back to the primitive support cone and independently verify every load-bearing mapping obligation before promotion.

That does not require a new Core primitive.

## Blindness qualification

The run was genuinely **oracle-blind**: the packet manifest and hash prove the oracle/scoring files were absent.

It was not a conclusive **primitive-only cognition** test. The anonymized equations are distinctive enough that the model inferred the hidden domain names in its derived-view text.

That did not expose the withheld witness directly, but it means pretrained domain knowledge may have aided discovery.

A stronger future test should encode the semantic operations themselves under opaque structural representations rather than expose recognizable textbook equations.

## Disposition

```text
cold/oracle isolation:                    PASS
known conceptual correspondence recovery: 3 / 3
clean exact native witness:               1 / 3
DP 0.7 usefulness:                        SUPPORTED
DP 0.7 qualification:                     NOT ESTABLISHED
harness correction required:              YES (case 01)
stronger primitive-only control needed:    YES
```
