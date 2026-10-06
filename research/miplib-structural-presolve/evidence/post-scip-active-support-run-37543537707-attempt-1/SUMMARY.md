# Post-SCIP BLISS active-support audit 0.1

**Disposition:** PASS

| Instance | Active vars | Export-only vars | BLISS gens | Active-moving gens | Active largest orbit | Status |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| 50v-10 | 2013 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| reblock115 | 1106 | 44 | 43 | 0 | 0 | EXPORT_ONLY_SYMMETRY |
| ran14x18-disj-8 | 504 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| gen-ip002 | 41 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| gen-ip054 | 30 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| ic97_potential | 726 | 1 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| pk1 | 86 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| n5-3 | 2142 | 212 | 208 | 2 | 2 | EXACT_ACTIVE_POST_SCIP_SYMMETRY |
| neos859080 | 120 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| neos-911970 | 888 | 0 | 17 | 17 | 6 | EXACT_ACTIVE_POST_SCIP_SYMMETRY |
| seymour1 | 931 | 386 | 384 | 2 | 2 | EXACT_ACTIVE_POST_SCIP_SYMMETRY |
| p200x1188c | 2376 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| b1c1s1 | 2654 | 10 | 9 | 0 | 0 | EXPORT_ONLY_SYMMETRY |
| markshare2 | 60 | 7 | 6 | 0 | 0 | EXPORT_ONLY_SYMMETRY |
| mas74 | 150 | 1 | 2 | 2 | 2 | EXACT_ACTIVE_POST_SCIP_SYMMETRY |
| exp-1-500-5-5 | 990 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| markshare_4_0 | 30 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| qap10 | 4150 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| cost266-UUE | 4152 | 0 | 0 | 0 | 0 | NO_VARIABLE_MOVING_GENERATOR |
| mas76 | 150 | 1 | 2 | 2 | 2 | EXACT_ACTIVE_POST_SCIP_SYMMETRY |

## Counts

~~~json
{
  "EXACT_ACTIVE_POST_SCIP_SYMMETRY": 5,
  "EXPORT_ONLY_SYMMETRY": 3,
  "NO_VARIABLE_MOVING_GENERATOR": 12
}
~~~

Only generators that move variables SCIP still reports as active transformed variables count as commercially relevant symmetry.
