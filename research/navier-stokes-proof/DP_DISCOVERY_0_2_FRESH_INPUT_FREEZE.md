# Fresh Discovery Protocol run 0.2 — input freeze

**Purpose:** restart Discovery Protocol analysis from the beginning using the enriched source-faithful rendering.

## Frozen discovery-visible inputs

- IsoGraph source rendering:
  - path: `research/navier-stokes-proof/NAVIER_STOKES_FORCED_BLOWUP_0_1.isg`
  - git blob: `6e01f6b7bb8579e08d5e5135a4e9ea5965677763`
- source schema:
  - `NAVIER_STOKES_FORCED_BLOWUP_0_1_SCHEMA.md`
- source manifest:
  - `SOURCE_MANIFEST_0_1.md`
- source validation:
  - `VALIDATION_0_1.md`
- qualified IsoGraph Core 0.17
- qualified QU 0.1
- qualified NEI 0.4
- qualified cumulative Discovery Protocols 0.1–0.4
- pinned OpenAI formal source:
  - `openai/NavierStokesAndEuler@f9e8bc5b38b6e212696e8a30e3e91517af887bbd`

## Excluded from candidate generation

The following existing research artifacts are not discovery inputs for this fresh pass:

- `DP_DISCOVERY_0_1.md`
- `DP_DISCOVERY_0_1.isg`
- `DP_DISCOVERY_0_1_SCHEMA.md`
- `DP_VALIDATION_0_1.md`
- `REDUCED_FORMULA_0_2.md`
- `REDUCED_FORMULA_0_2.isg`
- `REDUCED_FORMULA_EQUIVALENCE_0_2.md`
- `REDUCED_FORMULA_VALIDATION_0_2.md`

They may be compared only **after** the fresh findings are frozen.

## Independence note

This is a control-plane restart of the discovery procedure, not a claim that the executing model has no conversational memory. Independence is enforced operationally by source restriction and by freezing the fresh candidate set before any comparison with prior discovery outputs.

## Output naming

Fresh outputs use the `DP_DISCOVERY_0_2_FRESH*` prefix.
