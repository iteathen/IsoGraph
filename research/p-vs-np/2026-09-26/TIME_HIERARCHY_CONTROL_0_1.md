# P vs NP campaign control — machine-checked time hierarchy 0.1

**Status:** positive separation control; not a P-vs-NP result  
**Source:** `uds-psl/coq-library-complexity@14b5f413d2fb7adecde79c5451b483f9a1af59a8`  
**File:** `theories/HierarchyTheorem/TimeHierarchyTheorem.v`  
**Blob:** `bcf6bf1d1920cd09ebf1c1b21eabcd547e7fab83`

## Frozen theorem

For a time-constructible function `f` satisfying `n <= f n`, the formal source proves:

```text
exists P,
    P notin Timeo(f)
    AND
    P in TimeO(n * f(n) * f(n))
```

The source theorem name is `TimeHierarchyTheorem`.

## Why this is a control

The theorem supplies a real machine-checked computational-complexity separation.

It therefore tests whether IsoGraph can preserve the anatomy of a successful lower-bound/separation argument without confusing that success with authority to separate P and NP.

## Required campaign behavior

A valid discovery pass may observe that:

- diagonal/self-reference machinery can prove some time-class separations;
- a source-backed lower-bound theorem exists in this formal computational model.

It may **not** infer:

```text
time hierarchy separation
    -> P != NP
```

The relativization barrier layer is specifically intended to falsify that sort of extrapolation when the proof technique remains relativizing.

## Control disposition

```text
known separation: YES
P-vs-NP resolution: NO
transfer of technique to P-vs-NP: QU / barrier-audited
```
