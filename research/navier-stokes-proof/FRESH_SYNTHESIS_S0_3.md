# Fresh synthesis S0.3 — source-backed proof interface

**Status:** repaired structural synthesis for proof.

S0.2 is retained as a failed predecessor: it began after the singular background and initial stress-realization mechanisms had already been constructed.

S0.3 adds those missing generators explicitly.

## S0.3 components

### P0 — singular background seed

Construct the concentrating axisymmetric background and pressure with:
- the prescribed blowup profile;
- exact divergence freedom;
- exact heat exterior;
- annular tangential stress;
- all-order flat base remainder;
- matched radial moments/pressure data;
- admissible positive stress cone.

Source role: Sections 4–5 and Appendices A–C; formal families rooted in the closed slow-base/profile construction, base residual, leading-stress cone, and witness closure.

### P1 — first oscillatory stress realization

Construct the primary pulse/wave families so that:
- each physical wave is solenoidal by curl realization;
- auxiliary support coloring removes unwanted cross-label transport products;
- averaged quadratic covariance realizes the annular target stress;
- the leading stress divergence is cancelled;
- curl/cutoff/linear/quadratic remainders are retained.

Source role: Sections 6–7; formal pulse/covariance/target-stress and support-separation families.

### P2 — exact residual normal form

Represent the complete current residual as:
- same-label oscillatory residual blocks;
- mean/axisymmetric residual;
- retained excluded-error ledger.

The reconstruction must be exact and restore every excluded error once.

### P3 — synchronized four-part repair cycle

Within one common gauge/window/patch/rank frame, evolve:
- physical/analytic state;
- harmonic coefficient representation;
- axisymmetric alias.

One cycle adds exactly:
1. particular wave correction;
2. signed covariance/stress correction;
3. temporal mean correction;
4. rank/moment correction.

The rank stage uses the recurring FiveRows/debt interface.

The next state is reconstructed and satisfies the same representation/coherence/periodicity interfaces.

### P4 — monotone accuracy induction

Let the stage accuracy satisfy

\[
\sigma_0=\frac15,\qquad
\sigma_{j+1}=\sigma_j+\frac1{10}.
\]

Each cycle preserves the run invariant at the new accuracy.

For derivative order \(m\), the physical residual exponent is

\[
h\sigma_j-\operatorname{fixedLoss}(m),
\]

with \(h>0\) and loss independent of \(j\). Hence for every requested residual power \(N\) and derivative order \(m\), some finite stage has exponent at least \(N\).

### P5 — diagonal extraction and local theorem closure

Choose one increasing diagonal schedule/cutoff sequence that simultaneously yields:
- smooth potential/direct/pressure sums;
- compatible away extensions;
- all-order residual jet rates;
- exact exterior;
- protected singular growth.

This closes the property-rich local theorem contract.

### P6 — compact localization and smooth residual-derived force

Localize through the potential/direct representation so incompressibility is preserved.

Use the presingular residual plus its compatible endpoint jets to construct a global smooth force that:
- equals the activated residual for \(0\le t<1\);
- is compactly supported in positive time;
- leaves the protected blowup channel unchanged.

This closes the whole-space candidate contract except for its energy consequence.

### P7 — finite-energy closure

Use compact spatial support, smooth compact force, zero initial data, divergence freedom, and the exact forced equation to derive:
- the exact energy balance;
- force-work/energy inequality;
- scalar Gronwall closure;
- uniform finite kinetic energy.

The stronger integrated-dissipation estimates follow from the same closure family.

### P8 — contract-preserving transport

Transport the closed candidate contract without reopening the correction machine:
- viscosity-one → arbitrary positive viscosity;
- initial-rest delayed parabolic compression;
- compact whole-space → periodic candidate;
- comparator-facing C/D adapters.

### P9 — global-continuation obstruction

For the relevant competitor class:
- use uniqueness/comparison to force agreement with the constructed candidate for every time \(t<1\);
- transfer the protected blowup to the hypothetical competitor;
- contradict global smooth boundedness.

Whole-space and periodic competitor classes remain distinct.

## Dependency chain

\[
P0\to P1\to P2\to P3\to P4\to P5\to P6\to P7\to P9
\]

and

\[
P6\to P8\to P9.
\]

P2–P4 describe the correction engine; P5 is the extraction boundary; P6 is the contract-closure boundary; P8–P9 consume only the closed contracts.

## Fresh structural content retained

S0.3 retains the fresh DP mechanisms rather than replacing them with opaque boxes:

- support coloring makes cross-label nonlinear transport exactly vanish;
- solenoidal representation enforces incompressibility structurally;
- residual normal form separates oscillatory/mean/error channels;
- the correction cycle has four literal contributions;
- FiveRows is the recurring finite obstruction repair;
- physical/coefficient/alias views evolve synchronously;
- all four corrections share one continuation frame;
- \(\sigma_j\) and the diagonal schedule remain distinct refinement mechanisms.

## Non-claims

S0.3 is not yet:
- a Lean theorem;
- a replacement line-by-line proof;
- a minimal-generator theorem;
- an independent validation of the published mathematics.

The accompanying proof establishes interface sufficiency relative to the pinned published/formal source.
