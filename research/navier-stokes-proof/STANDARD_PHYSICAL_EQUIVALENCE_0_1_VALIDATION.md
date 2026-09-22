# Standard physical-form equivalence 0.1 — validation

Classification: source-relative validation of the continuum equivalence proof.

This is not experimental validation and not independent validation of the published mathematics.

## Source pin

- OpenAI formalization: \`f9e8bc5b38b6e212696e8a30e3e91517af887bbd\`
- Source IsoGraph rendering: \`6e01f6b7bb8579e08d5e5135a4e9ea5965677763\`

## Native integrity

\`STANDARD_PHYSICAL_EQUIVALENCE_0_1.isg\`:
- relation occurrences: 74
- source imports: 41
- missing source imports: 0
- balanced delimiters: PASS
- undeclared labels: 0
- suspicious tokens: 0

## Dimensional map

For \(L_0,T_0,\rho>0\),

\[
X=L_0x,\quad T=T_0t,
\]

\[
U=\frac{L_0}{T_0}u,\quad
P=\rho\frac{L_0^2}{T_0^2}p,\quad
F=\frac{L_0}{T_0^2}f,\quad
\nu_{\rm phys}=\frac{L_0^2}{T_0}\nu.
\]

All field evaluations are understood at \((t,x)=(T/T_0,X/L_0)\).

The inverse is explicit, so the base continuum map is bijective.

## Units audit

| Quantity | Physical units |
|---|---|
| \(X\) | L |
| \(T\) | T |
| \(U\) | L T\(^{-1}\) |
| \(P\) | M L\(^{-1}\) T\(^{-2}\) |
| \(F\) | L T\(^{-2}\) |
| \(\rho F\) | M L\(^{-2}\) T\(^{-2}\) |
| \(\nu_{\rm phys}\) | L\(^2\) T\(^{-1}\) |
| \(\nabla_XU\) | T\(^{-1}\) |
| vorticity | T\(^{-1}\) |
| momentum-flux tensor \(\rho U_iU_j\) | M L\(^{-1}\) T\(^{-2}\) |
| total kinetic energy | M L\(^2\) T\(^{-2}\) |
| viscous dissipation power | M L\(^2\) T\(^{-3}\) |

Pressure note:
the source equation uses \(+\nabla p\), i.e. density-one/kinematic pressure convention. The dimensional pressure is therefore \(P=\rho U_0^2p\), so the dimensional equation contains \((1/\rho)\nabla_XP\).

Force note:
the source \(f\) is body acceleration. Physical force density is \(\rho F\).

## PDE scaling audit

Each term scales by the same factor \(L_0/T_0^2\):

\[
\partial_TU
=
\frac{L_0}{T_0^2}\partial_tu,
\]

\[
(U\cdot\nabla_X)U
=
\frac{L_0}{T_0^2}(u\cdot\nabla)u,
\]

\[
\nu_{\rm phys}\Delta_XU
=
\frac{L_0}{T_0^2}\nu\Delta u,
\]

\[
\frac1\rho\nabla_XP
=
\frac{L_0}{T_0^2}\nabla p.
\]

Therefore source residual = source force iff dimensional residual = dimensional force.

Result: PASS.

## Divergence audit

\[
\nabla_X\cdot U
=
T_0^{-1}\nabla\cdot u.
\]

Zero divergence is preserved and reflected.

Result: PASS.

## Smoothness/support audit

The coordinate map is a linear diffeomorphism. Therefore:
- smoothness is equivalent;
- compact support is equivalent after scaling;
- positive-time support is equivalent;
- zero initial data is equivalent.

Result: PASS.

## Energy audit

Source:
\[
E=\frac12\int|u|^2dx.
\]

Physical:
\[
E_{\rm phys}
=
\frac{\rho}{2}\int|U|^2dX.
\]

Hence

\[
E_{\rm phys}(T_0t)
=
\rho\frac{L_0^5}{T_0^2}E(t).
\]

Uniform boundedness is preserved and reflected.

Result: PASS.

## Dissipation audit

Source:
\[
D=\int|\nabla u|^2dx.
\]

Dimensional viscous power:
\[
\varepsilon_{\rm phys}
=
\rho\nu_{\rm phys}\int|\nabla_XU|^2dX
=
\rho\nu\frac{L_0^5}{T_0^3}D.
\]

The source work term scales by the same power factor:
\[
\rho\int U\cdot F\,dX
=
\rho\frac{L_0^5}{T_0^3}\int u\cdot f\,dx.
\]

Thus the energy identity commutes with dimensionalization.

Result: PASS.

## Blowup audit

\[
\|U(T_0t)\|_\infty
=
\frac{L_0}{T_0}\|u(t)\|_\infty.
\]

The multiplicative factor is positive and finite, so source \(L^\infty\) blowup is equivalent to dimensional velocity blowup.

Result: PASS.

## Momentum-flux / covariance audit

The formal source proves exact double/torus-average quadratic identities realizing the requested stress.

Under the same deterministic averaging operator \(\mathcal A\),

\[
\rho\mathcal A[U'_iU'_j]
=
\rho\frac{L_0^2}{T_0^2}\mathcal A[u'_iu'_j].
\]

Therefore the covariance identity is exactly a dimensional momentum-flux identity.

Boundary:
the source \(\mathcal A\) is not automatically identified with experimental Reynolds averaging.

Result:
- continuum momentum-flux interpretation: PASS;
- statistical/turbulence Reynolds-stress identity: NOT CLAIMED.

## FiveRows audit

The source exact definition is a system of five radial integrals, and the source proves a smooth compactly supported repair satisfying them.

Therefore the label "five-component integral compatibility constraint" is exact.

Boundary:
the reduced profile variables are not identified with five direct sensor channels.

Result:
- continuum/internal integral interpretation: PASS;
- direct measurement equivalence: NOT CLAIMED.

## Protected path audit

The source proves exact equality between corrected/localized velocity and the base along a selected Eulerian curve.

Coordinate scaling maps that path bijectively to the dimensional Eulerian curve.

Result: PASS.

Lagrangian particle-path interpretation: NOT CLAIMED.

## Measurement non-equivalence

A real observation operator generally samples, filters, averages, and adds noise:

\[
Y=\mathcal O(U,P,F).
\]

No injectivity theorem for \(\mathcal O\) is supplied. Therefore real finite-resolution data are not equivalent to the complete continuum fields in general.

Result:
- continuum equivalence: PASS;
- ordinary instrument-data equivalence: FAIL IN GENERAL.

## Final disposition

### Exact equivalence

\[
\boxed{
\text{source continuum formulation}
\cong
\text{standard dimensional continuum formulation}
}
\]

for the PDE, divergence constraint, smoothness/support, force, velocity-gradient observables, quadratic momentum-flux identity, energy, dissipation, blowup, and protected Eulerian path.

### Limited interpretation

FiveRows is an exact derived integral constraint but not a standard direct measurement channel.

### Non-equivalence

\[
\boxed{
\text{complete continuum solution}
\not\cong
\text{ordinary finite-resolution instrument data}
}
\]

without an additional injective observation model.
