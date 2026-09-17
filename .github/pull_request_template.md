## Owning issue

Closes #

## Outcome

Describe the externally visible result and the exact authority/revision it changes.

## IsoGraph structural discipline

Confirm, where applicable:

- [ ] Surface syntax is not being treated as irreducible primitive authority.
- [ ] Source-faithful representation is kept distinct from comparison view/projection.
- [ ] Structural identity is kept distinct from occurrence/membership.
- [ ] N0/N1 normalization is kept distinct from D factorization and E equivalence.
- [ ] No expected analogy, target class, registry mapping, or peer-conditioned decomposition is used as evidence for its own result.
- [ ] Source/D residuals and pairwise comparison residuals remain separately accounted.
- [ ] Multiple valid factorizations/mappings are preserved unless a qualified equivalence justifies collapse.
- [ ] New primitives/classes/relation kinds are introduced only after lower structural construction has been falsified or shown materially worse.

## Qualification and isolation

- [ ] Any cold decoder/verifier used only its frozen permitted-input set.
- [ ] Cold outputs were frozen before scorer assertions, expected mappings, prior outputs, or author audits were opened.
- [ ] Failures are classified before repair as decoder/verifier error, spec ambiguity, representation defect, fixture defect, protocol defect, or intended distinction.
- [ ] Positive witnesses/certificates identify immutable source, policy, dependency, and schema revisions.

## Historical evidence

- [ ] Frozen historical IsoGraph artifacts were not mass-renamed or silently reinterpreted under current IsoGraph semantics.
- [ ] Any historical-to-current bridge is explicit and independently checkable.

## Evidence

- [ ] `git diff --check`
- [ ] IsoGraph `verify` CI passes.
- [ ] Links and rendered Markdown were inspected where changed.

List exact evidence, checks not run, remaining uncertainty, and any qualification claim this PR does **not** establish.

## Certification

- [ ] Commits include a Developer Certificate of Origin `Signed-off-by` line where required by repository settings.
