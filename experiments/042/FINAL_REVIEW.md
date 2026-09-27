# Experiment 042 — final review

**Status:** PASS
**Date:** 2026-09-27
**Workflow run:** 36355307514, attempt 1
**Frozen source SHA:** e94584b71aa5718adced9166c1b63916de88ccf5
**Internal parent:** A21 ternary witness-width line

## Result

- treatment alphabet size: 3;
- path family size: 24;
- every path length: 5;
- total non-target chain nodes: 120;
- duplicate paths: none;
- non-run-compressed paths: none.

Exhaustive irredundant-word verification:

- words enumerated through length 10: 3,070;
- run-compressed words of length 10: 1,536;
- full-family solution of length <=10: none;
- one-path deletion cases with a length-10 witness: 24 / 24;
- length-11 words enumerated: 3,072;
- full-family length-11 solutions: 137.

Therefore:

    OPT(full family) = 11

and every proper family obtained by deleting one path has optimum <=10.

By the one-path deletion criterion:

    witness width = 24.

## Interpretation

This is an unconditional finite frozen-model witness that three treatment labels can require at least 24 simultaneously load-bearing path constraints to force the exact optimum.

The obstruction is realized entirely by independent singleton-susceptibility chains. It does not require branching, multi-enzyme sites, uncertainty, or shared non-target ancestry.

## Boundary

This does not prove ternary witness width is unbounded.

A22 separately records the conditional complexity result: assuming the cited PCCSP hardness theorem and P!=NP, no universal constant ternary witness-width bound can exist.

## Next

Use the finite length-threshold word universe explicitly:

- each path defines the set of candidate length-L words that fail it;
- a critical witness family is a minimal cover of the candidate-word universe;
- private deletion witnesses certify minimality.

Search this set-cover/Helly representation for scalable constructions or larger exact critical families.