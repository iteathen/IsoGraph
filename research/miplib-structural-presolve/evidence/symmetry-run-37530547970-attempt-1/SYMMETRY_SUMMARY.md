# MIPLIB structural presolve — symmetry follow-up

**Disposition:** PASS
**Exact restricted transpositions:** 1
**Chosen pair:** ['z1&3.4', 'z1&3.8']

## Controlled comparison

| Variant | Status | Incumbent | Bound | Gap | Nodes | LP iterations | Wall |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Baseline presolved residual | Time limit reached | 1800016825.0 | 801934375.9053406 | 0.5544850666018966 | 36611 | 693746 | 30.0021s |
| + exact symmetry breaker | Time limit reached | 1800013600.000001 | 800004827.3585689 | 0.5555562317092668 | 26510 | 531526 | 30.0030s |

The symmetry breaker is accepted only after an exact coefficient-level transposition check. Equal refinement color alone is not sufficient.

This pass tests one exact consequence of the first-run structural lead; it is not a claim that the restricted detector is a complete symmetry algorithm.
