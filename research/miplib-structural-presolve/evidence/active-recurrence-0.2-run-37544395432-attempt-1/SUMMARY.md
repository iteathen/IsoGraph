# Post-SCIP active-support recurrence 0.2

**Disposition:** PASS

| Instance | Active vars | Export-only vars | BLISS gens | Active-moving gens | Active largest orbit | Status |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| mc11 | 3040 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| mcsched | 1495 | 78 | 92 | 15 | 2 | EXACT_ACTIVE_POST_SCIP_SYMMETRY |
| mik-250-20-75-4 | 270 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| neos-1171737 | 2340 | 0 | 29 | 29 | 30 | EXACT_ACTIVE_POST_SCIP_SYMMETRY |
| neos-2657525-crna | 435 | 4 | 3 | 0 | 0 | EXPORT_ONLY_SYMMETRY |
| neos-3024952-loue | 3255 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| neos-3046615-murg | 154 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| neos-3381206-awhea | 2375 | 0 | 474 | 474 | 475 | EXACT_ACTIVE_POST_SCIP_SYMMETRY |
| neos-3627168-kasai | 1400 | 59 | 60 | 2 | 14 | EXACT_ACTIVE_POST_SCIP_SYMMETRY |
| neos-3754480-nidda | 253 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| neos-4338804-snowy | 1344 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| neos-4387871-tavua | 3654 | 344 | 342 | 0 | 0 | EXPORT_ONLY_SYMMETRY |
| neos-4954672-berkel | 651 | 462 | 461 | 0 | 0 | EXPORT_ONLY_SYMMETRY |
| neos-860300 | 1216 | 168 | 167 | 0 | 0 | EXPORT_ONLY_SYMMETRY |
| neos17 | 511 | 24 | 23 | 0 | 0 | EXPORT_ONLY_SYMMETRY |
| neos5 | 63 | 0 | 2 | 2 | 4 | EXACT_ACTIVE_POST_SCIP_SYMMETRY |
| ns1208400 | 2596 | 284 | 290 | 7 | 24 | EXACT_ACTIVE_POST_SCIP_SYMMETRY |
| ns1830653 | 672 | 957 | 953 | 0 | 0 | EXPORT_ONLY_SYMMETRY |
| peg-solitaire-a3 | 4169 | 368 | 366 | 0 | 0 | EXPORT_ONLY_SYMMETRY |
| pg | 2690 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |

## Counts

~~~json
{
  "EXACT_ACTIVE_POST_SCIP_SYMMETRY": 6,
  "EXPORT_ONLY_SYMMETRY": 7,
  "NO_VARIABLE_MOVING_GENERATOR": 7
}
~~~

This is the independent second-block recurrence test; only generators moving SCIP-active transformed variables count.
