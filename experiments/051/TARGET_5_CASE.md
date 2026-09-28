# Experiment 051 — Hidden distinction with no defect

## H01 — Two correctly scoped latency records

Source A exposes:

    metric = end_to_end_latency_ms
    value = 120

Its public contract defines this as request arrival through client-visible completion.

Source B exposes:

    metric = service_latency_ms
    value = 80

Its public contract defines this as server execution time only, excluding queue and network delay.

Both source records are faithfully represented.
Both source contracts are satisfied.
No comparator, test oracle, specification, or authority says the two quantities must be equal.
No system has transformed one into the other.

An investigator notices that the numeric values differ and asks whether one represented source should be repaired so that they agree.

Determine whether either represented source requires repair, whether the semantic distinction between the quantities is established, whether normalization into one common quantity is justified, and whether a false repair is permitted.
