# Standard physical-form equivalence proof 0.1

**Status:** exact continuum-representation equivalence plus an explicit non-equivalence boundary for finite-resolution measurement.

**Source pin:** \`openai/NavierStokesAndEuler@f9e8bc5b38b6e212696e8a30e3e91517af887bbd\`.

**Scope:** This theorem proves that the source Navier–Stokes fields and a standard dimensional continuum-fluid formulation are related by an invertible change of units/coordinates, and that the main physically interpretable derived quantities commute with that change. It does **not** claim that real laboratory measurements are invertible images of the theorem fields.

---

# 1. Source formulation

The source equation is

\[
\mathcal R_\nu[u,p]
=
\partial_tu+(u\cdot\nabla)u-\nu\Delta u+\nabla p
=
f,
\qquad
\nabla\cdot u=0.
\]

Here:
- \(x\in\mathbb R^3\) and \(t\in\mathbb R\) are the source coordinates;
- \(u\) is velocity;
- \(p\) is pressure divided by constant density in standard physical units;
- \(f\) is body acceleration;
- \(\nu>0\) is kinematic viscosity.

The pinned Lean source defines exactly this residual in
\`NavierStokes/R3/ProblemStatement.lean::navierStokesResidual\`.

---

# 2. Dimensionalization map

Choose arbitrary constants

\[
L_0>0,\qquad T_0>0,\qquad \rho>0.
\]

Define dimensional coordinates

\[
X=L_0x,\qquad T=T_0t.
\]

Define the dimensional fields

\[
U(T,X)
=
\frac{L_0}{T_0}
u\!\left(\frac{T}{T_0},\frac{X}{L_0}\right),
\]

\[
P(T,X)
=
\rho\frac{L_0^2}{T_0^2}
p\!\left(\frac{T}{T_0},\frac{X}{L_0}\right),
\]

\[
F(T,X)
=
\frac{L_0}{T_0^2}
f\!\left(\frac{T}{T_0},\frac{X}{L_0}\right),
\]

and

\[
\nu_{\rm phys}
=
\frac{L_0^2}{T_0}\nu.
\]

Here \(F\) is body acceleration. The corresponding force per unit volume is \(\rho F\).

Call this map

\[
\mathcal D_{L_0,T_0,\rho}(u,p,f,\nu)
=
(U,P,F,\nu_{\rm phys}).
\]

Its inverse is explicit:

\[
u(t,x)
=
\frac{T_0}{L_0}U(T_0t,L_0x),
\]

\[
p(t,x)
=
\frac{T_0^2}{\rho L_0^2}P(T_0t,L_0x),
\]

\[
f(t,x)
=
\frac{T_0^2}{L_0}F(T_0t,L_0x),
\]

\[
\nu
=
\frac{T_0}{L_0^2}\nu_{\rm phys}.
\]

Therefore \(\mathcal D_{L_0,T_0,\rho}\) is bijective on continuum field tuples.

---

# 3. PDE equivalence theorem

## Theorem 3.1

For \(L_0,T_0,\rho>0\),

\[
\mathcal R_\nu[u,p]=f
\]

if and only if

\[
\partial_TU+(U\cdot\nabla_X)U
-\nu_{\rm phys}\Delta_XU
+\frac1\rho\nabla_XP
=
F.
\]

### Proof

By the chain rule,

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

and

\[
\frac1\rho\nabla_XP
=
\frac{L_0}{T_0^2}\nabla p.
\]

Hence

\[
\boxed{
\mathcal R_{\rm phys}[U,P]
=
\frac{L_0}{T_0^2}
\mathcal R_\nu[u,p].
}
\]

Likewise,

\[
F
=
\frac{L_0}{T_0^2}f.
\]

Since \(L_0/T_0^2>0\),

\[
\mathcal R_\nu[u,p]=f
\iff
\mathcal R_{\rm phys}[U,P]=F.
\]

QED.

This is the basic exact equivalence.

---

# 4. Incompressibility equivalence

The divergence transforms as

\[
\nabla_X\cdot U
=
\frac1{T_0}\nabla\cdot u.
\]

Therefore

\[
\boxed{
\nabla\cdot u=0
\iff
\nabla_X\cdot U=0.
}
\]

This agrees with the source structural realization:
\`SpatialCurl.spatialDivergence_spatialCurl\` proves exact divergence freedom for curl-generated velocity fields.

The source's "incompressibility by representation" therefore has the ordinary physical meaning of a divergence-free velocity field; no interpretation change is involved.

---

# 5. Smoothness and support equivalence

The spacetime map

\[
(t,x)\mapsto(T_0t,L_0x)
\]

is a smooth linear diffeomorphism.

Therefore:
- \(C^\infty\) regularity is preserved in both directions;
- compact spatial support is preserved under the scaled compact set \(L_0K\);
- compact spacetime support is preserved;
- positive-time support is preserved because \(T_0>0\);
- zero initial data is preserved because \(T=0\iff t=0\).

Thus the source support/smoothness clauses have direct dimensional continuum equivalents.

For a source singular time \(t_*=1\),

\[
T_*=T_0.
\]

---

# 6. Velocity, gradient, vorticity, and strain

The dimensional velocity scale is

\[
U_0=\frac{L_0}{T_0}.
\]

Hence

\[
U=U_0u.
\]

Spatial velocity gradients satisfy

\[
\nabla_XU
=
\frac1{T_0}\nabla u.
\]

Therefore vorticity

\[
\omega=\nabla\times u,
\qquad
\Omega=\nabla_X\times U
\]

satisfies

\[
\boxed{
\Omega=\frac1{T_0}\omega.
}
\]

The symmetric strain tensor obeys the same scaling:

\[
\boxed{
S_{\rm phys}
=
\frac1{T_0}S.
}
\]

Thus velocity, vorticity, and strain are exact continuum observables corresponding to source fields.

---

# 7. Quadratic momentum-flux equivalence

The source contains exact auxiliary averages of quadratic velocity products. In particular, the signed-wave construction proves an identity of the form

\[
\mathcal A
\left[
u'_r u'_j + u'_j u'_r
\right]
=
T_j,
\]

where \(\mathcal A\) is the source's auxiliary torus/double-average operator and \(T\) is the requested stress.

The pinned formal source proves this through
\`SignedCovariance.physical_signed_cross_covariance\` and its use in
\`SignedWaveUpdate\`.

Define the corresponding dimensional momentum-flux tensor under the **same averaging operator**

\[
\Pi_{ij}^{\rm phys}
=
\rho\,\mathcal A[U'_iU'_j].
\]

Because

\[
U'_iU'_j
=
\frac{L_0^2}{T_0^2}u'_iu'_j,
\]

we obtain

\[
\boxed{
\Pi_{ij}^{\rm phys}
=
\rho\frac{L_0^2}{T_0^2}
\Pi_{ij}^{\rm src}.
}
\]

Thus the source covariance/stress identity is exactly a dimensional quadratic momentum-flux identity after multiplication by the standard momentum-flux scale

\[
\rho U_0^2.
\]

## Important boundary

The source average \(\mathcal A\) is an auxiliary deterministic average, not automatically a laboratory ensemble/time average.

Therefore the correct physical label is:

**quadratic momentum flux under the construction's averaging operator**.

Calling it "Reynolds stress measured in turbulence" would require an additional statistical/ergodic identification not proved here.

---

# 8. Residual/stress equivalence

The source proves

\[
\mathcal R[u_B,p_B]
=
F_{\rm stress}+E_B
\]

for the slow background, with \(E_B\) flat to all orders and the stress term localized to the active annulus.

Under dimensionalization,

\[
\boxed{
\mathcal R_{\rm phys}[U_B,P_B]
=
\frac{L_0}{T_0^2}F_{\rm stress}
+
\frac{L_0}{T_0^2}E_B.
}
\]

Hence:
- the background momentum imbalance;
- the stress-induced correction force;
- the residual remainder

all retain their exact algebraic relationship.

This is an exact continuum mechanical interpretation, not an analogy.

---

# 9. FiveRows equivalence boundary

The source's \`FiveRowRank.FiveRows\` is exactly a system of five radial integral constraints:

\[
\int R^2\,\delta V\,dR=0,
\]

\[
\int R\,\delta G\,dR=0,
\]

plus three additional weighted moment equations equated to the three components of the current debt vector.

The source proves existence of compactly supported smooth corrections satisfying these five equations.

Therefore FiveRows has an exact interpretation as a **five-component integral compatibility constraint**.

However, the profile variables \(V,G,\delta V,\delta G\) are internal reduced/profile coordinates, not direct Cartesian instrument channels.

Thus:

\[
\boxed{
\text{FiveRows is exactly computable from the continuum construction,}
}
\]

but

\[
\boxed{
\text{FiveRows is not identified with a standard five-sensor measurement.}
}
\]

A further coordinate-reconstruction theorem would be required to express every row purely in directly measured Cartesian velocity/pressure fields.

---

# 10. Energy equivalence

The source kinetic energy is

\[
E(t)
=
\frac12\int_{\mathbb R^3}|u(t,x)|^2\,dx.
\]

The physical kinetic energy is

\[
E_{\rm phys}(T)
=
\frac{\rho}{2}
\int_{\mathbb R^3}|U(T,X)|^2\,dX.
\]

Since

\[
dX=L_0^3dx
\]

and

\[
|U|^2=\frac{L_0^2}{T_0^2}|u|^2,
\]

we have

\[
\boxed{
E_{\rm phys}(T_0t)
=
\rho\frac{L_0^5}{T_0^2}E(t).
}
\]

The multiplicative factor is finite and strictly positive. Therefore

\[
\boxed{
E(t)\text{ uniformly bounded}
\iff
E_{\rm phys}(T)\text{ uniformly bounded}.
}
\]

The source finite-energy conclusion is therefore exactly the ordinary finite kinetic-energy statement after dimensionalization.

---

# 11. Dissipation equivalence

The source dissipation functional is

\[
D(t)
=
\int_{\mathbb R^3}|\nabla u|^2\,dx
\]

with the componentwise sum written explicitly in Lean.

Because

\[
\nabla_XU=\frac1{T_0}\nabla u,
\]

\[
\int|\nabla_XU|^2\,dX
=
\frac{L_0^3}{T_0^2}D(t).
\]

The physical viscous dissipation power is

\[
\varepsilon_{\rm phys}(T)
=
\rho\nu_{\rm phys}
\int|\nabla_XU|^2\,dX.
\]

Using

\[
\nu_{\rm phys}=\frac{L_0^2}{T_0}\nu,
\]

we obtain

\[
\boxed{
\varepsilon_{\rm phys}(T_0t)
=
\rho\nu
\frac{L_0^5}{T_0^3}D(t).
}
\]

The source energy identity

\[
\frac{d}{dt}\int |u|^2
=
-2\nu D
+
2\int u\cdot f
\]

therefore becomes precisely the dimensional work-energy identity

\[
\boxed{
\frac{dE_{\rm phys}}{dT}
=
-\varepsilon_{\rm phys}
+
\rho\int U\cdot F\,dX.
}
\]

So the energy/dissipation labels are exact standard physical quantities.

---

# 12. Blowup equivalence

Velocity norms scale as

\[
\|U(T_0t)\|_{L^\infty}
=
\frac{L_0}{T_0}
\|u(t)\|_{L^\infty}.
\]

Since \(L_0/T_0>0\),

\[
\boxed{
\limsup_{t\to1^-}\|u(t)\|_\infty=\infty
\iff
\limsup_{T\to T_0^-}\|U(T)\|_\infty=\infty.
}
\]

Thus the source blowup statement is exactly the standard dimensional velocity blowup statement.

The quantitative source angular-growth law

\[
u_\theta
\sim
\tau^{-A}(e_0+O(\tau^{2h}))
\]

maps to

\[
U_\theta
\sim
\frac{L_0}{T_0}
\left(1-\frac{T}{T_0}\right)^{-A}
\left(e_0+O\!\left((1-T/T_0)^{2h}\right)\right).
\]

No qualitative change occurs.

---

# 13. Protected-ray equivalence

The source proves exact equality along a selected Eulerian path:

\[
u(t,x_*(t))
=
u_{\rm base}(t,x_*(t)).
\]

Define

\[
X_*(T)
=
L_0\,x_*\!\left(\frac{T}{T_0}\right).
\]

Then

\[
\boxed{
U(T,X_*(T))
=
U_{\rm base}(T,X_*(T)).
}
\]

Thus the protected blowup channel is exactly preserved by dimensionalization.

This path is an Eulerian observation curve. No Lagrangian particle-trajectory claim is implied.

---

# 14. Force equivalence

The source force is not merely analogous to the residual: the formal source proves

\[
f(t,x)
=
\mathcal R[u,p](t,x)
\qquad (0\le t<1).
\]

Under dimensionalization,

\[
F(T,X)
=
\frac{L_0}{T_0^2}f(t,x)
\]

and Theorem 3.1 gives

\[
\boxed{
F(T,X)
=
\mathcal R_{\rm phys}[U,P](T,X)
}
\]

for \(0\le T<T_0\).

Therefore the physical forcing label is exact.

---

# 15. Support-scale equivalence

Any source length \(\ell(t)\) maps to

\[
\ell_{\rm phys}(T)
=
L_0\ell(T/T_0).
\]

Hence source asymptotics such as

\[
\ell_r\asymp\tau^{1/2},
\qquad
\ell_z\asymp\tau^{1/2-h}
\]

translate directly to

\[
\ell_{r,\rm phys}
\asymp
L_0(1-T/T_0)^{1/2},
\]

\[
\ell_{z,\rm phys}
\asymp
L_0(1-T/T_0)^{1/2-h}.
\]

Ratios and exponents are invariant.

---

# 16. Exact dictionary

The following labels are exact continuum-equivalent quantities.

| Source quantity | Standard physical quantity | Scaling |
|---|---|---|
| \(x\) | position \(X\) | \(X=L_0x\) |
| \(t\) | time \(T\) | \(T=T_0t\) |
| \(u\) | velocity \(U\) | \(U=(L_0/T_0)u\) |
| \(p\) | pressure \(P\) | \(P=\rho L_0^2/T_0^2\,p\) |
| \(f\) | body acceleration \(F\) | \(F=L_0/T_0^2\,f\) |
| \(\nu\) | kinematic viscosity | \(\nu_{\rm phys}=L_0^2/T_0\,\nu\) |
| \(\nabla u\) | velocity gradient | \(T_0^{-1}\nabla u\) |
| \(\omega\) | vorticity | \(\Omega=T_0^{-1}\omega\) |
| strain | strain rate | \(T_0^{-1}S\) |
| quadratic covariance | momentum flux | \(\rho L_0^2/T_0^2\) times source covariance |
| residual | momentum acceleration imbalance | \(L_0/T_0^2\) times source residual |
| kinetic energy | physical kinetic energy | \(\rho L_0^5/T_0^2\) times source energy |
| dissipation functional | viscous power after multiplying by \(\rho\nu_{\rm phys}\) | \(\rho\nu L_0^5/T_0^3\) times source \(D\) |
| blowup path | Eulerian observation path | \(X_*(T)=L_0x_*(T/T_0)\) |
| support radius/width | physical length | \(L_0\) times source length |

---

# 17. What is not part of the equivalence

The following objects are proof/construction coordinates, not standard physical observables:

- stage accuracy \(\sigma_j\);
- diagonal schedule \(a_j\);
- label IDs and auxiliary indexing;
- QU/NEI state;
- Lean proof objects;
- coherence certificates;
- most chart bookkeeping.

They may control or certify the physical fields, but assigning them sensor units would be a category error.

FiveRows is intermediate: it is an exact continuum-derived integral constraint, but not a standard direct measurement channel.

---

# 18. Measurement theorem and non-equivalence boundary

Let

\[
\mathcal O
\]

be a real measurement operator: sampling, finite spatial resolution, temporal averaging, noise, missing pressure data, etc.

Then measured data are

\[
Y=\mathcal O(U,P,F).
\]

In general \(\mathcal O\) is not injective.

Therefore

\[
Y_1=Y_2
\not\Rightarrow
(U_1,P_1,F_1)=(U_2,P_2,F_2).
\]

Hence:

\[
\boxed{
\text{the theorem is NOT equivalent to ordinary finite-resolution experimental data.}
}
\]

If instead one assumes an ideal observation operator

\[
\mathcal O_{\rm ideal}(U,P,F)=(U,P,F)
\]

or any invertible full-field equivalent, then

\[
\boxed{
\text{source formulation}
\;\cong\;
\text{dimensional continuum formulation}
\;\cong\;
\text{ideal full-field observation}.
}
\]

That is the maximal valid equivalence statement.

---

# 19. Commutative diagram

\[
\boxed{
\begin{array}{ccc}
(u,p,f,\nu)
&\xleftrightarrow[\mathcal D^{-1}]{\mathcal D}&
(U,P,F,\nu_{\rm phys})
\\[2mm]
\downarrow \Phi_{\rm src}
&&
\downarrow \Phi_{\rm phys}
\\[2mm]
\text{source derived quantities}
&\xleftrightarrow{\text{exact scaling}}&
\text{physical continuum observables}
\\[2mm]
&&
\downarrow\mathcal O
\\
&&
\text{instrument data}
\end{array}
}
\]

The upper square commutes exactly for the quantities proved above.

The final observation arrow is generally lossy and is not part of the equivalence.

---

# 20. Conclusion

## Proven

For every \(L_0,T_0,\rho>0\), dimensionalization is an invertible representation change that preserves and reflects:

- the forced incompressible Navier–Stokes equation;
- divergence freedom;
- smoothness and compact support;
- positive-time force support;
- velocity/vorticity/strain fields;
- the construction's quadratic momentum-flux identities;
- residual/stress identities;
- kinetic energy;
- viscous dissipation;
- blowup;
- the protected Eulerian blowup path.

Therefore the scientist-facing dimensional continuum formulation is **mathematically equivalent** to the source formulation for these quantities.

## Not proven / false in general

Finite-resolution laboratory measurements are not equivalent to the complete theorem fields unless an injective ideal observation model is separately assumed.

This boundary is essential: it permits physical understanding without falsely claiming experimental realizability or observability of every proof-internal object.
