# MIPLIB structural presolve — symmetry follow-up

**Disposition:** PASS
**Exact restricted transpositions:** 1
**Chosen pair:** ['z1&3.4', 'z1&3.8']

## Controlled comparison

| Variant | Status | Incumbent | Bound | Gap | Nodes | LP iterations | Wall |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Baseline presolved residual | Not Set | 0.0 | 0.0 | inf | -1 | -1 | 0.0000s |
| + exact symmetry breaker | Not Set | 0.0 | 0.0 | inf | -1 | -1 | 0.0000s |

The symmetry breaker is accepted only after an exact coefficient-level transposition check. Equal refinement color alone is not sufficient.

This pass tests one exact consequence of the first-run structural lead; it is not a claim that the restricted detector is a complete symmetry algorithm.
