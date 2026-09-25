# Reduced formula 0.2 — forced Navier–Stokes blowup proof

**Status:** source-backed abstraction candidate after equivalence testing against the published proof outline and the pinned Lean formalization.

**Published paper:** *Finite Time Blowup for Navier–Stokes* (OpenAI), 166 pages, source URL pinned in the OpenAI formalization metadata.

**Lean source:** \`openai/NavierStokesAndEuler@f9e8bc5b38b6e212696e8a30e3e91517af887bbd\`.

This formula supersedes the earlier D10 wording for equivalence work. The earlier D10 remains preserved in the DP ledger as a failed, under-complete abstraction.

## RF-0.2

### G1 — singular background + admissible annular stress

Construct a concentrating, exactly divergence-free axisymmetric background with:
- prescribed singular inner-core growth;
- a heat exterior with identically zero residual;
- matched pressure/radial-moment data joining inner and exterior profiles;
- an annular tangential residual represented as a stress divergence plus an all-order flat remainder;
- an admissible stress-cone condition giving a positive two-direction covariance representation of the target stress.

Correct the background recursively in powers of the small similarity parameter so the background residual has the form

\[
R(u_B,p_B)=-\operatorname{div}_{cyl}T_{\rm phys}+E_B,
\]

where \(T_{\rm phys}\) is annular and \(E_B\) is flat to every order.

### G2 — oscillatory realization of the annular stress

Construct two support-separated pulse families whose:
- linearized background-shear/viscous dynamics produce localized growth followed by decay;
- auxiliary-torus labeling prevents unwanted cross-label products while preserving intended same-label interactions;
- exact physical curls make every velocity increment divergence-free;
- averaged quadratic covariance realizes the prescribed leading annular stress;
- curl, cutoff, self-interaction, and covariance remainders are retained at higher order.

Thus the leading covariance divergence cancels the leading background stress divergence without discarding the new residual terms it creates.

### G3 — complete residual-correction cycle

For the full current residual, repeat a fixed four-part correction cycle:

1. solve supported nonzero angular Fourier-mode equations;
2. use signed amplitude increments/cross covariance to correct averaged stress;
3. correct the angular mean through the auxiliary-time/mean inversion, including divergence-free realization;
4. solve radial-moment/pressure repair equations so the required integral constraints and compact support persist.

After each operation:
- recompute the full residual, including linear, quadratic, curl, cutoff, pressure, and reconstruction terms;
- preserve the run invariants (analytic bounds, coherence, periodicity/support and moment conditions);
- advance the residual-accuracy coordinate
  \(\sigma_{j+1}=\sigma_j+1/10\);
- retain a derivative-order loss independent of stage.

For fixed derivative order \(m\), finite-stage residual power therefore tends to \(+\infty\) with \(j\).

### G4 — diagonal summation + protected singular/exterior channels

Choose a rapidly growing diagonal schedule and shrinking cutoffs so that:
- the velocity/potential/direct/pressure series are smooth and locally finite before \(t=1\);
- all residual derivatives are flat to arbitrary order at the singular spacetime point;
- the selected inner blowup ray remains in a region where all annular corrections vanish, hence the corrected/localized velocity equals the original singular slow base there;
- the outer heat region retains identically zero residual.

This produces the local theorem interface:
- potential/direct decomposition and exact incompressibility;
- smooth one-sided derivative limits away from the singular point;
- arbitrary-order residual flatness on bounded similarity regions;
- exact heat exterior;
- quantitative angular blowup growth.

### G5 — residual-to-force completion and compact localization

Use the potential/direct decomposition to localize in space and time while preserving incompressibility and leaving the late-time singular channel unchanged.

Let the presingular Navier–Stokes residual provide the past-side force. Its compatible all-order boundary jets at \(t=1\) define a smooth spacetime extension.

The resulting prescribed force:
- equals the activated Navier–Stokes residual exactly for \(0\le t<1\);
- is \(C^\infty\);
- has the required compact positive-time support after whole-space localization;
- preserves the blowup path because the cutoffs equal one there.

### G6 — finite-energy closure

From:
- compact velocity support;
- smooth compact force;
- zero initial velocity;
- exact forced Navier–Stokes equation;
- incompressibility;

derive the whole-space energy balance, then the energy-rate inequality and scalar Gronwall/integrating-factor estimate. This yields uniform finite kinetic energy on \([0,1)\), with the stronger integrated-dissipation consequences available downstream.

### G7 — contract-preserving transport

Transport the constructed witness without reopening the internal correction engine:

- spatial/amplitude scaling: viscosity one -> every \(\nu>0\), preserving singular time and candidate obligations;
- initial-rest delayed parabolic compression: fit the compact candidate into the periodic fundamental region;
- periodization: whole-space compact witness -> periodic witness with the periodic contract;
- comparator adapters: candidate contracts -> the official alternatives C and D.

Each transport has its own side conditions; they share a role, not an identity.

### G8 — global-continuation obstruction

For the appropriate target setting, assume a global smooth competitor with the same force and zero initial data.

Use the setting-specific uniqueness/comparison theorem to obtain agreement with the constructed solution for every \(T<1\). The competitor therefore inherits the constructed blowup path, contradicting global smooth boundedness.

- R3/C: competitor class includes the uniform finite-energy condition.
- periodic/D: competitor class carries periodicity instead; the same energy hypothesis is not required.

Therefore no admissible global smooth competitor exists.

## Compact dependency chain

\[
G1
\to G2
\to G3
\to G4
\to G5
\to G6
\to G8,
\]

with

\[
G5\to G7\to G8
\]

for viscosity/domain transport and comparator-facing theorem forms.

More structurally:

\[
\boxed{
\begin{aligned}
&\text{singular background with annular stress}\\
&\xrightarrow{\text{oscillatory covariance}}
\text{leading stress cancellation}\\
&\xrightarrow{\text{full correction cycle}}
\text{arbitrarily high residual order}\\
&\xrightarrow{\text{diagonal sum}}
\text{flat local residual + protected blowup}\\
&\xrightarrow{\text{smooth residual extension}}
\text{compact smooth force}\\
&\xrightarrow{\text{energy closure}}
\text{finite-energy singular candidate}\\
&\xrightarrow{\text{transport}}
\text{R3/periodic target candidate}\\
&\xrightarrow{\text{uniqueness + blowup}}
\text{no global smooth competitor.}
\end{aligned}}
\]

## What RF-0.2 intentionally compresses

RF-0.2 compresses:
- individual coefficient/derivative lemmas;
- specific chart formulas once their interface obligations are retained;
- repeated stage instances once the exact recurrence/invariant family is represented;
- implementation-level Lean decomposition.

It does **not** compress away:
- stress-cone/moment matching;
- auxiliary support separation;
- oscillatory covariance realization;
- the four correction roles;
- exact-zero exterior vs merely flat residual;
- distinct \(\sigma_j\) and diagonal schedule roles;
- finite-energy closure;
- whole-space vs periodic competitor residuals.

## Equivalence scope

“Equivalent” for RF-0.2 means **proof-outline/interface equivalent** to the published solution under the frozen abstraction view:

1. every major load-bearing role in the paper's proof outline and every top-level proof section has a mapped RF component;
2. every RF component is backed by the published proof and the pinned formalization;
3. the mapped dependency direction is preserved;
4. unmatched load-bearing obligations remain explicit residuals;
5. no claim is made that RF-0.2 is a line-by-line replacement proof, a minimal generator, or a theorem formally proved inside IsoGraph.
