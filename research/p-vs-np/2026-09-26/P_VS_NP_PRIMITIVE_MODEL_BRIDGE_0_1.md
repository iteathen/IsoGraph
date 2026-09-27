# P versus NP primitive model bridge 0.1

**Status:** source-backed bridge decomposition; primitive alignment still incomplete  
**Purpose:** refine the sole remaining authority-transfer QU without enlarging the P-vs-NP truth kernel

## Frozen formal sources

### Time invariance

Repository:

`uds-psl/time-invariance-thesis-for-L@14485a957e7202c6eeee9c71ec7b83e4fa75d8fd`

File:

`theories/summary.v`

Blob:

`86ac32c3eab2797a8f19fa547d968a637c12d2c7`

Machine-checked results include:

```text
TimeInvarianceThesis_wrt_Simulation_L_to_TM
TimeInvarianceThesis_wrt_Simulation_TM_to_L
TimeInvarianceThesis_wrt_Computability_L_to_TM
TimeInvarianceThesis_wrt_Computability_TM_to_L
```

The source supplies explicit polynomial/linear-overhead simulation bounds between weak call-by-value L computation and finite multi-tape Turing-machine computation.

### Multi-tape to single-tape

Repository:

`uds-psl/coq-library-complexity@14b5f413d2fb7adecde79c5451b483f9a1af59a8`

Files:

- `theories/NP/TM/M_multi2mono.v`
- `theories/NP/TM/mTM_to_singleTapeTM.v`
- `theories/TM/PrettyBounds/M2MBounds.v`

Pinned source theorem:

```text
TMGenNP_mTM_to_TMGenNP_singleTM :
    mTMGenNP_fixed M
      <=p
    TMGenNP_fixed (projT1 M__mono)
```

The implementation supplies a concrete single-tape simulation and explicit polynomially controlled step/size bounds.

## What is now source-closed

The previous broad QU:

```text
formal model
    <->
standard Turing computation
```

was too coarse.

The following structural facts are source-backed:

```text
L computation
    -> polynomial-overhead multi-tape TM simulation

multi-tape TM computation
    -> polynomial-overhead L simulation

multi-tape TM
    -> polynomial-overhead single-tape simulation

single-tape TM
    -> multi-tape TM
```

where the last direction is the one-tape special case of the multi-tape model.

Thus polynomial robustness across these model families is not a research unknown.

## Remaining primitive alignment obligations

The remaining work is definitional/representation alignment between the branch's primitive tape kernel and the formal source machines.

### A — tape representation

Primitive branch:

```text
left list
current symbol
right list
blank extension.
```

Formal source:

its own tape datatype / encoded multi-tape representation.

Need exact relation preserving:

```text
read symbol
write
left/right movement
blank extension.
```

### B — movement vocabulary

The primitive truth kernel currently uses:

```text
LEFT
RIGHT.
```

The formal source machine vocabulary also admits a no-move action in some layers.

A primitive bridge must either:

- add NO-MOVE to the primitive model; or
- represent the exact constant-overhead simulation of NO-MOVE by the allowed primitive steps.

This is a concrete alignment obligation, not an open complexity issue.

### C — input convention

Need exact mapping between:

- primitive finite bit-list initialization;
- source initial tape construction.

### D — halting polarity

Need an exact mapping between:

- primitive positive/negative terminal identities;
- source accept/reject or Boolean-output convention used for language decision.

### E — step-count transport

Need primitive arithmetic support for the source polynomial overhead bound after configuration encoding.

## Disposition

```text
polynomial model robustness:
    SOURCE-BACKED

multi-tape -> single-tape polynomial simulation:
    SOURCE-BACKED

primitive tape datatype alignment:
    OPEN IMPLEMENTATION/RENDERING OBLIGATION

new complexity theorem needed:
    NO
```

This bridge work is qualification work. It does not alter the mathematical truth kernel.
