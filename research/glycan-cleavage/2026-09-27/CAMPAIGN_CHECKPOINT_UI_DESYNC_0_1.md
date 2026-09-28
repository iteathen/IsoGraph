# Glycan closure campaign checkpoint — UI desync recovery

**Date:** 2026-09-27
**Branch:** research/glycan-cleavage-primitive-20260927
**Recovered state:** branch 34 commits ahead of main, 0 behind

Durable completed stages:

1. Core / primitive double-check — PASS
2. A0 explicit assertion base
3. A1 implicit closure
4. NEI pass 1
5. A2 implicit closure
6. NEI pass 2
7. A3 recursive subtree closure
8. NEI pass 3
9. A4 exact SIG quotient
10. NEI pass 4
11. A5 treatment-language algebra
12. NEI pass 5
13. A6 static phase-assignment reduction
14. NEI pass 6

Last durable commit before this checkpoint:

    6073d6ce3bb616dde3dc3bfe48e16b386e4e5b8d

A7 ordered-layer reduction was being derived when the UI desynchronized and was not committed. Resume from A6 + NEI6 only; do not assume uncommitted A7 text is authoritative.
