# Documentation Rendering Audit — 2026-09-26

**Scope:** repository-wide Markdown/text rendering audit  
**Audit runner:** `tools/audit-doc-rendering.mjs`  
**Final audit run:** `36274210115`

## Trigger

A visible README formula rendered as raw markup such as:

```text
\\[
\\boxed{
\\text{knowledge}
...
```

The underlying bytes were valid UTF-8. The defect was unsupported/inconsistently rendered TeX delimiters in Markdown, not character encoding corruption.

## Full-tree audit

Files scanned:

`594`

Corrected pre-fix audit:

```text
total findings:                    926
unsupported display delimiters:    293
raw TeX commands outside math:     415
unsupported inline delimiters:     218

mutable-documentation findings:    796
protected/frozen findings:         130
```

No Unicode replacement characters, noncharacters, unexpected BOMs, control characters, or probable mojibake were detected by the corrected scanner.

## Mutable documentation repair

Twelve mutable files were mechanically repaired. Only Markdown math delimiters outside fenced code were changed:

```text
\\[  ->  $$
\\]  ->  $$
\\(  ->  $
\\)  ->  $
```

Formula bodies and ordinary prose were not transformed.

Files repaired:

- `README.md`
- `DESIGN_NOTES.md`
- `research/navier-stokes-proof/STANDARD_PHYSICAL_EQUIVALENCE_0_1.md`
- `research/navier-stokes-proof/STANDARD_PHYSICAL_EQUIVALENCE_0_1_VALIDATION.md`
- `research/navier-stokes-proof/REDUCED_FORMULA_0_2.md`
- `research/navier-stokes-proof/FRESH_SYNTHESIS_S0_3_PROOF.md`
- `research/navier-stokes-proof/S0_5_GENERATOR_CLOSURE_NORMAL_FORM.md`
- `research/navier-stokes-proof/S0_4_ATOMIC_MINIMALITY_AUDIT.md`
- `research/navier-stokes-proof/REDUCED_FORMULA_EQUIVALENCE_0_2.md`
- `research/navier-stokes-proof/FRESH_SYNTHESIS_S0_3.md`
- `research/navier-stokes-proof/S0_5_GENERATOR_CLOSURE_VALIDATION.md`
- `research/navier-stokes-proof/S0_4_ATOMIC_MINIMALITY_VALIDATION.md`

Fix workflow:

`36274133094`

The workflow required a post-fix whole-tree scan with zero mutable findings before committing.

Result:

```text
mutable_documentation_findings = 0
```

## Protected residual findings

Final audit result:

```text
total residual findings:           130
mutable findings:                    0
qualified/versioned spec:           65
frozen experiment evidence:         65
```

The 65 versioned-spec findings are all in:

`CORE_SPEC_DRAFT_0_1.md`

That file is historical/versioned provenance. It is not rewritten solely to improve Markdown rendering.

The remaining 65 findings are frozen raw Experiment 004/005 decoder/verifier evidence, principally:

- `experiments/004/cold-results/gemini/raw/RUN-S04/COLD_REPORT.txt`
- `experiments/004/cold-results/verifier/RUN-S04/VERIFIER_PACKET.txt`
- other frozen Experiment 004 raw/verifier packets with small counts;
- `experiments/005/cold-results/RUN-Q005/COLD_REPORT.txt`;
- `experiments/005/verifier/RUN-Q005/VERIFIER_PACKET.txt`.

These files preserve exact historical model/evidence output. Presentation cleanup must not rewrite them.

## Prevention

The repository `Verify` workflow now executes:

`node tools/audit-doc-rendering.mjs --enforce-mutable`

Any future unsupported TeX delimiter, raw TeX command outside supported math, Unicode replacement/noncharacter, unexpected BOM, probable mojibake, or control-character finding in mutable documentation causes Verify to fail. Fenced code blocks and inline backtick code spans are excluded from TeX-rendering checks because literal markup examples are intentional there.

Protected historical/versioned artifacts are reported but do not fail the mutable-documentation gate.

## Disposition

```text
current mutable documentation rendering: CLEAN
historical/versioned protected rendering debt: PRESERVED / DOCUMENTED
semantic authority changes: NONE
historical evidence rewrites: NONE
```
