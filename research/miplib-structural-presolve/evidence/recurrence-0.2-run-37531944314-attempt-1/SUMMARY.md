# MIPLIB recurrence 0.2 — general exact swap

**Disposition:** PASS
**Positive control glass4:** PASS

| Instance | Post-HiGHS | Candidate classes | Exact swaps | Signal |
| --- | ---: | ---: | ---: | --- |
| glass4 | 392x317 | 1 | 1 | EXACT_GENERAL_SWAP |
| 50v-10 | 233x2013 | 0 | 0 | NO_SIGNAL |
| reblock115 | 4448x1109 | 0 | 0 | NO_SIGNAL |
| ran14x18-disj-8 | 447x504 | 0 | 0 | NO_SIGNAL |
| gen-ip002 | 24x41 | 0 | 0 | NO_SIGNAL |
| gen-ip054 | 27x30 | 0 | 0 | NO_SIGNAL |
| ic97_potential | 522x726 | 0 | 0 | NO_SIGNAL |
| pk1 | 45x86 | 0 | 0 | NO_SIGNAL |
| n5-3 | 836x2139 | 136 | 0 | LEAD_ONLY |
| neos859080 | 120x120 | 0 | 0 | NO_SIGNAL |
| neos-911970 | 107x888 | 259 | 0 | LEAD_ONLY |
| seymour1 | 4563x890 | 4 | 1 | EXACT_GENERAL_SWAP |
| p200x1188c | 1388x2376 | 0 | 0 | NO_SIGNAL |
| b1c1s1 | 2748x2718 | 0 | 0 | NO_SIGNAL |
| markshare2 | 7x67 | 0 | 0 | NO_SIGNAL |
| mas74 | 13x148 | 0 | 0 | NO_SIGNAL |
| exp-1-500-5-5 | 550x990 | 0 | 0 | NO_SIGNAL |
| markshare_4_0 | 4x34 | 0 | 0 | NO_SIGNAL |
| qap10 | 1820x4150 | 0 | 0 | NO_SIGNAL |
| cost266-UUE | 1429x4136 | 0 | 0 | NO_SIGNAL |
| mas76 | 12x148 | 0 | 0 | NO_SIGNAL |

## Counts

~~~json
{
  "EXACT_GENERAL_SWAP": 2,
  "LEAD_ONLY": 2,
  "NO_SIGNAL": 17
}
~~~

Exact positives received a directional 10-second baseline vs symmetry-breaker comparison; those timings do not qualify performance.
