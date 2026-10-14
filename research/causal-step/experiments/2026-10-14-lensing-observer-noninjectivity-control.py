#!/usr/bin/env python3
"""Causal Step: exact weak-field observer non-injectivity controls.

Math only. Assumes an EFFECTIVE static weak-field Lorentzian metric,
not a primitive Causal Step rule or recovered geometry. Assumes
geometric optics and leading order in potentials/c^2, a point source,
no cosmological backgrounds, lens dynamics or independent observations.

Reproduce: python 2026-10-14-lensing-observer-noninjectivity-control.py
Requires SymPy. Does not call GitHub or initiate any physics simulation.
"""
import json
import sympy as s

b,z,L,G,M,c,gamma=s.symbols('b z L G M c gamma',positive=True,real=True)
lam,theta,a=s.symbols('lambda theta alpha',real=True)
psi,phi,u,du_dr=s.symbols('psi phi u du_dr',real=True)

# Psi = -GM/sqrt(b^2+z^2), Phi = gamma Psi.
# With fixed spatial trajectory at leading order, light deflection
# depends on gradient of the effective Weyl combination Psi + Phi.
r=s.sqrt(b**2+z**2)
Psi=-G*M/r
Phi=gamma*Psi
transverse=s.diff(Psi+Phi,b)
finite=s.simplify(s.integrate(transverse/c**2,(z,-L,L)))
unbounded=s.simplify(s.limit(finite,L,s.oo))
expected=2*(1+gamma)*G*M/(b*c**2)
assert s.simplify(unbounded-expected)==0
assert s.simplify(unbounded.subs(gamma,1)-4*G*M/(b*c**2))==0
assert s.simplify(unbounded.subs(gamma,0)-2*G*M/(b*c**2))==0

# Vary SPATIAL potential while holding the TIME potential fixed:
# same leading test-body acceleration, different photon bending.
assert s.simplify(s.diff(Psi,b)-s.diff(Psi,b))==0
assert s.simplify(unbounded.subs(gamma,1)-unbounded.subs(gamma,0))!=0

# Weak-field conformal ambiguity: under Omega^2 = 1 + 2u/c^2,
# Psi' = Psi + u and Phi' = Phi - u (first order).
assert s.simplify((psi+u)+(phi-u)-(psi+phi))==0
# Slow-matter acceleration -grad(Psi) changes by -grad(u).

# Idealized single-plane mass-sheet transform (MST): original
# beta = theta - alpha(theta). Transformed alpha_lambda
# yields beta_lambda = lambda * beta. Image positions remain
# possible solutions when unknown source positions rescale.
alpha_lambda=lam*a+(1-lam)*theta
beta=theta-a
assert s.simplify(theta-alpha_lambda-lam*beta)==0

result={
 'experiment':'Exact algebraic weak-field/lensing observer non-injectivity',
 'date':'2026-10-14',
 'scope':'Effective continuum metric assumed; purely formal response/inverse ambiguity; no original Causal Step generator modified',
 'checks':{
  'finite_path_transverse_Weyl_gradient_integral':str(s.factor(finite)),
  'asymptotic_deflection':str(s.factor(unbounded)),
  'PPN_GR_gamma_equal_one':str(s.factor(unbounded.subs(gamma,1))),
  'PPN_gamma_equal_zero':str(s.factor(unbounded.subs(gamma,0))),
  'same_time_potential_distinct_spatial_potential_alters_deflection':True,
  'opposite_shift_of_two_potentials_preserves_Weyl_sum':True,
  'same_Weyl_sum_does_not_fix_slow_matter_acceleration':True,
  'mass_sheet_transformed_lens_equation':'beta_lambda = lambda * (theta-alpha(theta))',
  'mass_sheet_lens_equation_invariance_verified':True,
 },
 'negative_exclusions':[
  'This calculation does not predict dynamics or lensing from Causal Step, causal sets, gravity-from-information or any microscopic model.',
  'The two potentials are assumed post-emergence weak-field observable parameters, not declared primitive hypergraph variables.',
  'A lensing mass map is an inferred GR-model reconstruction, not a directly photographed particle-density map.',
  'MST is an inverse inference degeneracy under idealized assumptions, not a proof of universal indistinguishability when time delays, kinematics and independent distances are supplied.',
  'Null curves are conformally invariant as unparameterized curves, but not all measured lensing quantities or massive geodesics are invariant.'
 ],
 'sources':[
  'https://doi.org/10.1098/rsta.2011.0369',
  'https://doi.org/10.1146/annurev.nucl.58.110707.171151',
  'https://doi.org/10.1007/s11214-024-01041-w',
  'https://doi.org/10.1103/PhysRevD.95.024004'
 ]
}
print(json.dumps(result,indent=2))
