# Experiment 012 — Focused DP Qualification Holdout

This is a fresh focused holdout. Use cumulative Discovery Protocols 0.1-0.4.

## R01 — Supported correspondence without identity separator

Two structures have already passed ordinary structural checks and exhibit a verified local role correspondence.

They differ in SI spelling, source file, and factorization depth. No rigid application authority makes those differences load-bearing. No qualified NEI DISTINCT result exists. No concrete structural obligation fails.

Question: what candidate states remain legal, and which separator kinds are illegal?

## R02 — Fresh termination-topology correspondence

Alpha:
```text
A01: admissible execution steps relate state s to successor t
A02: every state has measure mu(s) in finite ordered set {0,...,N}
A03: every nonterminal execution step strictly decreases the measure
A04: an infinite execution would induce an infinite strictly descending sequence in that finite order
A05: such a sequence is impossible
A06: therefore every admissible execution terminates
```

Beta:
```text
B01: admissible dependency steps relate item p to successor q
B02: a finite layer assignment lambda is derived from the frozen acyclic dependency structure
B03: every dependency step moves to a strictly lower layer
B04: the layer range is finite and bounded below
B05: an infinite dependency chain would require endlessly lower layers
B06: that is impossible
B07: therefore every admissible dependency chain terminates
```

The comparison view treats names as non-rigid and includes dependency direction, strict-decrease direction, finite/well-founded bound, contradiction role, and terminal termination role. The method used to obtain the measure/layer is not rigid.

Question: discover the strongest common proof topology, including any one-to-subgraph role mapping and method-specific residual. Explicitly reject stronger claims not supported by the topology.
