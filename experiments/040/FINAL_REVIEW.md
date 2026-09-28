# Experiment 040 — final review

**Status:** COMPLETE / falsifier found
**Date:** 2026-09-27
**Workflow run:** 36354408755, attempt 1
**Frozen source SHA:** 720c9c353f2af68d1117962076f5d11571ac3f6b
**Internal parent:** A18 / A19 joint-path boundary

## Three-enzyme result

Enumerated all four-path families built from run-compressed singleton words over three enzymes through path length 3:

- candidate words: 21;
- four-path families tested: 5,985.

A concrete J3 counterexample was found and realized as four disjoint glycan chains:

    010
    012
    101
    210

Results:

    full optimum = 6
    J3 = 5.

One full optimum witness:

    010210.

Every three-path subfamily has optimum 5.

The direct singleton glycan realization also has optimum 6.

Therefore Experiment 039's J3 exactness is a finite-surface result, not a universal three-enzyme theorem.

## Two-enzyme control

Run-compressed binary paths through length 8, family sizes 2 through 4:

- words: 16;
- families tested: 2,500;
- J2 counterexamples: 0.

This agrees with the independent A19 proof that binary treatment words reduce to one of two alternating forms and J2 is universally exact in the frozen model.

## Disposition

Preserve:

- universal binary theorem: J2=OPT for <=2 effective treatment classes;
- explicit three-enzyme falsifier: J3<OPT;
- small-h J_h only as a resource/strength hierarchy beyond the binary case.

Next investigate the minimum path-family size required to witness OPT and whether that witness width can grow beyond 4 for a fixed three-enzyme alphabet.