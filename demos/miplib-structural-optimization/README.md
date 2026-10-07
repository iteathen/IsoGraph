# IsoGraph MIPLIB Structural Optimization Demo

**Author:** Joshua Oshiro  
**Project:** IsoGraph™  
**Status:** reproducible application demo; not IsoGraph semantic authority  
**Source experiment date:** 2026-10-06

> Agent-assisted research produced using the IsoGraph system designed by Joshua Oshiro.

## What this demonstrates

This demo packages one of the strongest results from the exploratory MIPLIB structural-optimization campaign.

Starting from the official MIPLIB `n5-3` mixed-integer model, the experiment:

~~~text
original MIP
-> SCIP presolve with symmetry disabled for structural inspection
-> exact active-support coefficient graph
-> exact graph automorphisms
-> replay verification
-> direct original/transformed variable mapping
-> exact original-model symmetry-breaking constraints
-> fresh-seed solver qualification
~~~

The exact transformed symmetries selected by the frozen procedure were:

~~~text
t_C0021 <-> t_C0026
t_C0027 <-> t_C0028
~~~

SCIP's direct original-to-transformed mappings licensed the corresponding original-model constraints:

~~~text
C0021 >= C0026
C0027 >= C0028
~~~

These constraints preserve at least one representative of every affected symmetry orbit. They are symmetry-breaking constraints, not a change to the optimization objective.

## Main result

Two independent fresh-seed blocks benchmarked the **original MIP** under normal SCIP settings, with the structural front-end cost included in the treated variant.

### Holdout 0.6 — seeds 36–40

| Metric | Baseline | IsoGraph treatment |
| --- | ---: | ---: |
| Paired optimal solves | 5/5 | 5/5 |
| End-to-end wins | — | **5/5** |
| Median wall | 39.856 s | **25.270 s** |
| Median nodes | 1,448 | **885** |
| Median LP iterations | 227,227 | **139,787** |
| Structural front-end | — | 0.166 s |

### Replication 0.8 — seeds 41–47

| Metric | Baseline | IsoGraph treatment |
| --- | ---: | ---: |
| Paired optimal solves | 7/7 | 7/7 |
| End-to-end wins | — | **7/7** |
| Median wall | 41.904 s | **30.142 s** |
| Median end-to-end ratio | 1.000 | **0.751** |
| Median nodes | 1,318 | **936** |
| Median LP iterations | 196,706 | **126,193** |
| Structural front-end | — | 0.197 s |

Across those two predeclared fresh-seed blocks, the forward treatment won all **12/12** paired end-to-end comparisons while preserving the optimal objective within numerical tolerance.

That is a result for this model, this exact treatment, this solver family/version, and these frozen benchmark protocols. It is not a claim that MIPs generally become 25% faster.

## Why the controls matter

### Orientation is not performance-neutral

The exact symmetry also permits the reverse representative orientation:

~~~text
C0026 >= C0021
C0028 >= C0027
~~~

A fresh orientation control on seeds 67–73 found:

| Orientation | Wins | Median end-to-end / baseline |
| --- | ---: | ---: |
| Forward | **7/7** | **0.882** |
| Reverse | 3/6 paired optimal | 0.973 |

Classification: **ORIENTATION_SENSITIVE**.

So:

~~~text
exact transformation
!= automatically good solver treatment
~~~

The structural equivalence is exact; the performance consequence depends on how the solver interacts with the chosen canonical representative.

### The effect is solver-specific

The same two exact original-model constraints were tested under HiGHS 1.15.1.

Result:

- 5/5 paired solves optimal;
- only 2/5 treated runs were faster;
- baseline median time to optimum: 17.109 s;
- treated median including structural front-end: 19.315 s.

Classification: **no directional cross-solver positive**.

This is a useful negative control. The demonstrated value is not "symmetry always helps." It is that exact structural information can expose solver-specific optimization opportunities that require qualification.

### The root LP bound does not change

A continuous-relaxation mechanism test found the same LP objective, to numerical precision, with zero, one, or both exact breakers:

~~~text
baseline  3801.4705882352955
single    3801.4705882352946
double    3801.4705882352946
~~~

So the observed SCIP improvement is not explained by a stronger root LP objective. It is primarily an integer-search / symmetry-handling effect.

## Run the demo

Requirements:

- Python 3
- internet access to download the official MIPLIB `n5-3` instance
- dependencies pinned in [requirements.txt](requirements.txt)

Install:

~~~bash
python3 -m pip install -r requirements.txt
~~~

### Fast certificate mode

This downloads the exact frozen MIPLIB instance, verifies its hashes, reruns the structural discovery, replays the graph automorphism certificates, and verifies the direct mapping back to the original variables.

~~~bash
python3 demo.py
~~~

Expected selected constraints:

~~~text
C0021 >= C0026
C0027 >= C0028
~~~

Certificate mode does **not** run the long solver benchmark.

### Benchmark mode

For a short local comparison:

~~~bash
python3 demo.py --benchmark --seeds 41,42,43 --time-limit 60
~~~

For the exact seven-seed replication block:

~~~bash
python3 demo.py --benchmark --seeds 41,42,43,44,45,46,47 --time-limit 60
~~~

Benchmark timing will vary by machine. The frozen GitHub-run evidence is therefore included separately in [evidence/frozen-results.json](evidence/frozen-results.json).

## Reproducibility gates

The demo fails closed if:

- the downloaded compressed or decompressed MIP differs from the frozen SHA-256 hashes;
- the four required original variables are absent;
- SCIP no longer provides the required direct active original-to-transformed mappings;
- variable domains/types differ across that mapping;
- export-only columns cannot be safely removed from the structural graph;
- an alleged automorphism fails exact color or edge replay;
- the selected transformed breaker pairs drift from the frozen result;
- optimal baseline and treated objectives disagree beyond numerical tolerance.

## Evidence lineage

The demo packages results from the research branch:

`experiment/miplib-structural-presolve-20261006`

Key preserved evidence commits:

- `29c56a27f32c61da1d7411a8e146d90b5756e5bc` — original-model injection holdout 0.6;
- `7c0602ab97433f4496a9b78f457e94da055ca18e` — original-model replication 0.8;
- `7bccc3e1be781b821190fcfff03fe6e339e7bd98` — orientation robustness 1.3;
- `32e00dc8474dc287687b49437ad337908d287534` — HiGHS cross-solver holdout 1.0;
- `ff854ff8189a5fdb5c3bb6ec20c2a7a0f64498d7` — graph-builder optimization evidence.

The frozen summaries in this demo are convenience copies. The originating research evidence remains the audit source.

## Scope boundary

This demo is **not the full documented IsoGraph procedure**. The MIPLIB campaign began as a targeted prototype that tested particular structural reduction hypotheses. It later found and qualified the result packaged here.

IsoGraph itself is broader than symmetry analysis. The documented process includes faithful semantic rendering, primitive closure, implicit assertions, Discovery Protocol, falsification, and other structural operations according to the applicable authority.

Therefore this demo supports:

> Exact structural analysis found and qualified a solver-relevant transformation on a real MIPLIB instance.

It does **not** support:

> IsoGraph is a symmetry detector.

or:

> IsoGraph makes arbitrary MIPs faster.

## Rights and attribution

Repository-wide rights and identity terms are described in:

- [../../RIGHTS_AND_USE.md](../../RIGHTS_AND_USE.md)
- [../../NOTICE](../../NOTICE)
- [../../LICENSE](../../LICENSE)
- [../../ORIGIN_AND_PROVENANCE.md](../../ORIGIN_AND_PROVENANCE.md)
- [../../PUBLICATION_ATTRIBUTION_POLICY.md](../../PUBLICATION_ATTRIBUTION_POLICY.md)

The MIPLIB model itself is not redistributed by this demo. The script downloads the official instance from the MIPLIB site and verifies it against the frozen research hashes.
