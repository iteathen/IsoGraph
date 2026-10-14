# L04 p3 Spin-component algebra: bounded finite L-only G0 diagnostic 0.1

**Evidence status: internal, local exact finite test only; not source-reconstruction qualification, physical theorem, or G0 promotion.**

## Primary source and discrepancy

Source is Lisi, arXiv:2407.02497v2, printed p3, original SHA256 5655350615517fafc0604cb9fcf2c22852489f8dc70f84849dd9df6510e19422; original atom L04-P003-B001, SHA256 599069870dfbe88de38891eb84e32d38aed9ca92ca66a0cee397c2cb98c15f5f. The paper twice prints Spin(1,3)=Spin+(1,3) × {1,P T_U}, unlike its earlier Pin-extension display using ⋊. The upstream source correction (SSC0.85 and gate0.154) retains the × symbol. This diagnostic does not replace it.

## Exact generated finite algebra

Work in unquotiented Cl(1,3), with e0²=+1, e1²=e2²=e3²=-1, distinct generators anticommuting, P=e0, T_U=e1e2e3, and z=P T_U=e0e1e2e3. Direct signed-blade multiplication verifies P²=T_U²=1, P T_U=-T_U P, and z²=-1. Thus z has order four and {1,z} is *not* a subgroup under unquotiented multiplication.

Define a=e1e2, b=e2e3, H0=<a,b>, and G0=<H0,z>. Exact finite closure gives H0 of order 8 (Q8), G0 of order 16, with z centralizing H0, z²=-1 in H0, and z outside H0. The 32 pairs in H0×C4 cover G0 twice; their kernel is {(1,1),(-1,c²)}, giving the *conditional finite presentation* G0 ≅ (H0×C4)/<(-1,c²)>. G0 has center C4, whereas H0×C2 has center C2×C2, so these *finite groups* are not isomorphic.

A distinct, important counter-control exists: x=az is outside H0, x²=1, and x b x^{-1}=-b. Hence this same finite G0 also admits a *nontrivial semidirect* H0⋊C2 presentation using x. The semidirect presentation does **not** license an editorial replacement of the author-printed ×.

## Limits and open questions

This exact 16-element diagnostic is not the full Spin+(1,3) or Spin(1,3), does not prove a full-group center/cover classification, and does not decide whether Lisi intended coset representatives, a central quotient, a projective treatment, or literal direct-product group equality. A full lifting argument would require explicit full Spin+ group semantics, component coverage, center and quotient/coset interpretations. The source claim and the independent algebraic interpretation remain separately represented.

## Replay

From the repository root run:

    node experiments/062/tools/verify-l-g0-l04-spin-component-algebra-0-1.mjs

The Node 22 standard-library verifier calculates exact blade signs, finite subgroup closures, centers and orders, two-to-one central quotient fibers, and the semidirect coset involution. It rejects **16/16** hostile source, algebra and authority mutations under local deterministic replay. This is not an independent cold review, external validation, or all-source audit.

**Gates unchanged:** Six original L sources, 350 original source groups and 191 SSC roots remain scoped as in stage0.154; 18 mapped L04 original semantic groups remain cold-open, all six whole-original source cold reviews are incomplete, G0/SSC remain unfrozen. No G1+, recursive IA/NEI/DP, W import, cross-track synthesis or PR #70 merge is authorized. Earlier source/CI failures retain their original dispositions.

**Provenance:** The frozen source statements are Lisi's. The conditional finite diagnostic is agent-produced research on 2026-10-11 within the L track under Joshua Oshiro's research direction. No publication authorship or priority claim follows.
