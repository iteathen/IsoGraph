# Model A: correcting the 12-dimension claim and quantifying orbit-like motion

**Research date:** 2026-10-12  
**Project:** Causal Step — empirical inspection of a preserved Primitive Presentation toy model.  
**Source:** archived, unchanged supplementary Model A Dimension Birth, original source blob 4d7e6f4bb594204afa92534d697a9a32fc3ea9a0.  
**Human origin:** Joshua Oshiro reported emergent-looking circulation after roughly 200 model steps and initially noticed an apparent coincidence between the simulation's twelve dimensions and themes in Lisi/Woit investigations.  
**Later human correction:** upon learning that twelve was an explicit software ceiling, the author **withdrew that dimensional-stabilization observation as evidence**, while **maintaining the observed orbiting pattern**.  
**Assistant contribution:** source audit, actual execution, trajectory tracking, mathematical readouts and limits. This document does not modify the original model.

## Corrected dimensional observation

The original JavaScript configuration explicitly declares `internalDimCap: 12`. The dimension-birth operation checks `dim < cfg.internalDimCap` and executes at steps 1, 22, 43, ..., 232 in the default reproducible run because of persistent constraint errors and a 20-step cooldown. **Twelve is imposed by code.** It is not an independently discovered equilibrium or supporting evidence of an alignment with Lisi's or Woit's work. The user explicitly withdrew that former conjectural connection **for this experiment**. Whether some earlier or different uncapped model spontaneously stabilizes at twelve has not been tested here.

## Separate finding: sustained orbital-looking trajectories in the actual evolving nodes

The archived source has `cfg.autoView = false` by default; the camera was **not rotating** in these tests. It defines equal-and-opposite spring forces on each evolving edge, with zero initial node velocities, no global origin-attraction term, symplectic Euler position/velocity updates, and changing topology.

At selected stages, the median per-node ratio of tangential velocity magnitude to total velocity magnitude in the **first three internal coordinates**, relative to the instantaneous node center of mass (velocity measured relative to the center-of-mass velocity), was:

| Model step | Median tangential fraction |
|---:|---:|
| 100 | ~0.32 |
| 200 | ~0.59 |
| 300 | ~0.75 |
| 500 | ~0.79 |
| 1,000 | ~0.82 |

These are kinematic quantities, not claims about orbital stability, angular-momentum conservation for a changing graph, or a universal law.

### Continuous-cohort path analysis, steps 200–950

A separate local browser run invoked the **original** grow/dimension/forces/integrate update functions for 950 steps with no camera motion, no Reset command, default deterministic hash source and no damping. At step 200, a reproducible cohort was chosen by retaining nodes with IDs divisible by five; this gave **107 nodes**, tracked **at every single update** from step 200 through step 950. This window is before the later 3,000-node cap and significant pruning.

For every tracked node, its first-two-coordinate angle about the **instantaneous center of mass** was unwrapped, and the net winding divided by 2π to count revolutions:

- **65 of 107** nodes completed more than one net projected revolution.
- **33 of 107** completed more than two, and **15** more than three.
- Among the 65 with more than one net revolution, **32** rotated with positive signed winding and **33** with negative signed winding. Directional cancellation explains how widespread internal circulation can coexist with near-zero total projected angular momentum.
- A specific reproducible node, **ID 400**, completed about **+6.63 net revolutions** in that 750-step window, with nearly monotonic angular progress. Measured about the center of mass **frozen at step 200**, it still completed approximately **+6.64 revolutions**.
- Using the fixed step-200 center instead of the shifting center, **63 of 107** still completed more than one net projected revolution. The result is not created solely by a moving-origin convention.
- The tracked orbits are **irregular**: orbital radii fluctuate substantially, and many nodes reverse angular direction. “Orbit-like” is more accurate than circular, Keplerian, gravitational, permanent or globally co-rotating orbits.

The computation was performed at every update, not estimated by manually viewing selected screenshots. Node 400's largest one-update change of projected polar angle was about **1.40 radians**, smaller than π, checking that angular unwrapping did not spuriously add full turns from undersampling. Tracking uses only the **first-two-coordinate projection** of an internally higher-dimensional model; it cannot by itself establish intrinsic closed trajectories in all twelve coordinates.

### Why this matters, and what is still open

**The user-reported circulation is objectively present in the simulation dynamics.** It arises despite no manually imposed global angular spin or gravitational central potential. The pairwise spring laws and asymmetric evolving graph topology supply forces that can produce local orbital-looking movement. The total first-three-coordinate angular momentum stays extremely close to zero through most of this cohort window and subsequently deviates as the system's node population/embedding changes.

The force law, coordinate dimensions, target link length, numerical integration increment and dimension ceiling were nevertheless **programmed choices**, and nodes/edges are continually created or removed. Therefore the simulation does **not** establish an emergent gravitational law or closed-system conservation theorem.

Potential experimental controls (not performed in this specific orbital audit) include varying graph-growth source, disabling springs, holding topology fixed, comparing truly uncapped dimensions, and measuring winding in several projections or intrinsically. A sharper future question is which kinds of **asymmetric connectivity with conservation-compatible internal forces** are sufficient for persistent counter-rotating node paths.

**Data provenance:** local test scripts, every-step cohort traces, projected winding CSV and plotted sample paths were generated in the working environment and retained as conversation artifacts. The historical source and qualified IsoGraph specifications were not edited.
