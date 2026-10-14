# Primitive Exterior-2 / Hodge Eigensplit Schemas 0.1

**Status:** RESEARCH-LOCAL DIFFERENTIAL-FORM SUPPORT  
**Native:** PRIMITIVE_EXTERIOR2_HODGE_SPLIT_SCHEMA_0_1.isg

## 205510 — exterior two-form presentation in dimension four

205510 takes:
- an exact four-dimensional vector space with basis v0,v1,v2,v3;
- an exact six-dimensional vector space with basis f01,f02,f03,f23,f31,f12;
- a typed bilinear WEDGE map.

It pins the six basis wedges and requires antisymmetry and u wedge u = 0.

Because the six form values are an exact basis and WEDGE is bilinear, this finitely presents the exterior-two-form carrier needed by W02.

It does not yet define wedge products between higher-degree forms.

## 205511 — Hodge eigenspace split

205511 takes:
- a vector space of forms;
- a linear STAR endomorphism;
- two distinct scalar eigenvalues LP and LM;
- PLUS/MINUS subspace predicates.

The subspaces are defined exactly as the LP and LM eigenspaces of STAR, and every form has a unique PLUS+MINUS decomposition.

This schema is signature-neutral.

W02 will instantiate:
- Euclidean two-forms with eigenvalues +1 and -1;
- complexified Minkowski two-forms with eigenvalues +i and -i.

No metric signature is inferred merely from the eigenvalue labels; the source-specific Hodge action must be supplied.
