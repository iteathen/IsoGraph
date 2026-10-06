# MIPLIB recurrence screen 0.1

**Disposition:** PASS
**Completed:** 20/20

| Instance | Raw | Post-HiGHS | Refined var classes | Exact transpositions | Exact quotients | Signal |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| 50v-10 | 233x2013 | 233x2013 | 0 | 0 | 0 | NO_SIGNAL |
| reblock115 | 4735x1150 | 4448x1109 | 0 | 0 | 0 | NO_SIGNAL |
| ran14x18-disj-8 | 447x504 | 447x504 | 0 | 0 | 0 | NO_SIGNAL |
| gen-ip002 | 24x41 | 24x41 | 0 | 0 | 0 | NO_SIGNAL |
| gen-ip054 | 27x30 | 27x30 | 0 | 0 | 0 | NO_SIGNAL |
| ic97_potential | 1046x728 | 522x726 | 0 | 0 | 0 | NO_SIGNAL |
| pk1 | 45x86 | 45x86 | 0 | 0 | 0 | NO_SIGNAL |
| n5-3 | 1062x2550 | 836x2139 | 136 | 0 | 0 | LEAD_ONLY |
| neos859080 | 164x160 | 120x120 | 0 | 0 | 0 | NO_SIGNAL |
| neos-911970 | 107x888 | 107x888 | 259 | 0 | 0 | LEAD_ONLY |
| seymour1 | 4944x1372 | 4563x890 | 4 | 0 | 0 | LEAD_ONLY |
| p200x1188c | 1388x2376 | 1388x2376 | 0 | 0 | 0 | NO_SIGNAL |
| b1c1s1 | 3904x3872 | 2748x2718 | 0 | 0 | 0 | NO_SIGNAL |
| markshare2 | 7x74 | 7x67 | 0 | 0 | 0 | NO_SIGNAL |
| mas74 | 13x151 | 13x148 | 0 | 0 | 0 | NO_SIGNAL |
| exp-1-500-5-5 | 550x990 | 550x990 | 0 | 0 | 0 | NO_SIGNAL |
| markshare_4_0 | 4x34 | 4x34 | 0 | 0 | 0 | NO_SIGNAL |
| qap10 | 1820x4150 | 1820x4150 | 0 | 0 | 0 | NO_SIGNAL |
| cost266-UUE | 1446x4161 | 1429x4136 | 0 | 0 | 0 | NO_SIGNAL |
| mas76 | 12x151 | 12x148 | 0 | 0 | 0 | NO_SIGNAL |

## Totals

{
  "EXACT_QUOTIENT": 0,
  "EXACT_SYMMETRY_ONLY": 0,
  "LEAD_ONLY": 3,
  "NO_SIGNAL": 17
}

Exact symmetry/quotient counts are bounded by the frozen restricted detector; absence is not proof that the model has no symmetry.
LEAD_ONLY refinement classes are not treated as legal reductions.
