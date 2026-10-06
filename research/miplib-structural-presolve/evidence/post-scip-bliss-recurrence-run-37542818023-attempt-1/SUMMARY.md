# MIPLIB post-SCIP BLISS recurrence 0.1

**Disposition:** PASS
**Completed:** 20/20

| Instance | SCIP transformed | BLISS generators | Variable-moving | Nontrivial orbits | Largest orbit | BLISS wall | Status |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 50v-10 | 233x2013 | 0 | 0 | 0 | 0 | 0.001268s | NO_VARIABLE_MOVING_GENERATOR |
| reblock115 | 4423x1150 | 43 | 43 | 1 | 44 | 0.028416s | EXACT_POST_SCIP_SYMMETRY |
| ran14x18-disj-8 | 447x504 | 0 | 0 | 0 | 0 | 0.002566s | NO_VARIABLE_MOVING_GENERATOR |
| gen-ip002 | 24x41 | 0 | 0 | 0 | 0 | 0.000277s | NO_VARIABLE_MOVING_GENERATOR |
| gen-ip054 | 27x30 | 0 | 0 | 0 | 0 | 0.000113s | NO_VARIABLE_MOVING_GENERATOR |
| ic97_potential | 522x727 | 0 | 0 | 0 | 0 | 0.000615s | NO_VARIABLE_MOVING_GENERATOR |
| pk1 | 45x86 | 0 | 0 | 0 | 0 | 0.000244s | NO_VARIABLE_MOVING_GENERATOR |
| n5-3 | 846x2354 | 208 | 208 | 89 | 181 | 0.085531s | EXACT_POST_SCIP_SYMMETRY |
| neos859080 | 120x120 | 0 | 0 | 0 | 0 | 0.000351s | NO_VARIABLE_MOVING_GENERATOR |
| neos-911970 | 107x888 | 17 | 17 | 259 | 6 | 0.004392s | EXACT_POST_SCIP_SYMMETRY |
| seymour1 | 4486x1317 | 384 | 384 | 9 | 128 | 0.518277s | EXACT_POST_SCIP_SYMMETRY |
| p200x1188c | 1388x2376 | 0 | 0 | 0 | 0 | 0.001914s | NO_VARIABLE_MOVING_GENERATOR |
| b1c1s1 | 2761x2664 | 9 | 9 | 1 | 10 | 0.006418s | EXACT_POST_SCIP_SYMMETRY |
| markshare2 | 7x67 | 6 | 6 | 1 | 7 | 0.000191s | EXACT_POST_SCIP_SYMMETRY |
| mas74 | 13x151 | 2 | 2 | 2 | 2 | 0.000603s | EXACT_POST_SCIP_SYMMETRY |
| exp-1-500-5-5 | 550x990 | 0 | 0 | 0 | 0 | 0.000793s | NO_VARIABLE_MOVING_GENERATOR |
| markshare_4_0 | 4x30 | 0 | 0 | 0 | 0 | 0.000044s | NO_VARIABLE_MOVING_GENERATOR |
| qap10 | 1820x4150 | 0 | 0 | 0 | 0 | 0.007029s | NO_VARIABLE_MOVING_GENERATOR |
| cost266-UUE | 1437x4152 | 0 | 0 | 0 | 0 | 0.005137s | NO_VARIABLE_MOVING_GENERATOR |
| mas76 | 12x151 | 2 | 2 | 2 | 2 | 0.000581s | EXACT_POST_SCIP_SYMMETRY |

## Counts

~~~json
{
  "EXACT_POST_SCIP_SYMMETRY": 8,
  "NO_VARIABLE_MOVING_GENERATOR": 12
}
~~~
