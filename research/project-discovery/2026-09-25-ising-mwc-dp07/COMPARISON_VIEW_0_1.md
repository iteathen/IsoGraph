# Blind comparison view 0.1

**Status:** FROZEN before DP result  
**Inputs:** `ISING_RENDER_0_1.isg`, `MWC_RENDER_0_1.isg`

## Evidence visible to structural comparison

Visible:

- ordered-incidence topology;
- SI occurrence structure;
- local stable-label incidence signatures;
- declared source scope/boundaries;
- exact finite/binary-domain cardinality where independently source-backed;
- independently source-backed mathematical operation roles such as finite aggregation, exponential weighting, and normalization;
- parameter dimensional/role information only after an unlabeled structural candidate exists.

Not evidence:

- filenames;
- domain titles;
- the words Ising, MWC, spin, ligand, receptor, magnet, allostery, cooperativity, active, inactive;
- shared scientific ontology labels;
- raw local label numbers;
- raw SI numbers;
- literature claiming an Ising/MWC relationship;
- an expected answer.

## Mapping rules

1. Bare SI may alpha-map only within the comparison witness.
2. Independent stable-label IDs are not sameness evidence.
3. A local relation label may map to another only after its incidence role and source authority are compatible.
4. Lossy projections must remain declared as projections.
5. Residual source structure is preserved.
6. Whole-structure isomorphism is rejected if any load-bearing residual remains unmatched.
7. A derived higher-level view is output, never input evidence for the same match.

## Comparison objective

Search for:

- exact common substructure;
- exact parameter-role correspondences;
- alternative factorization exposing additional common structure;
- residuals that block whole-structure isomorphism.

Do not maximize match size by deleting the Ising neighbor relation or the MWC global-conformation relation.
