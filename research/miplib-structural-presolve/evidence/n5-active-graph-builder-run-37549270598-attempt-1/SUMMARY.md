# n5-3 active graph-builder optimization profile 0.2

**Disposition:** PASS
**Repetitions:** 20
**Graph identity:** names/colors/edges/meta all identical
**BLISS generators:** 2
**Selected breakers:** t_C0021 >= t_C0026 ; t_C0027 >= t_C0028

| Builder | Median s | Min s | Max s |
| --- | ---: | ---: | ---: |
| scalar-index | 2.497695 | 2.448133 | 2.548332 |
| bulk-materialized | 0.011884 | 0.011544 | 0.015256 |

**Median speed ratio:** 210.177x

This changes only the Python/HiGHS data-access path. Exact graph and certificate outputs are required to be identical.
