# Experiment 005 — Final Draft 0.16 Qualification Review

**Qualified clarification layer:** Draft 0.16 obligation sufficiency  
**Frozen candidate/corpus:** `fa733d533cd683c5064c4f31fa6c083fa3aed21d`  
**Tested candidate Git blob:** `0cc6d2e3e08606a99324ee36b6ff5a6a5067efb8`  
**Cold workflow:** `35252295888`  
**Cold artifact:** `10510136341`  
**Cold artifact ZIP SHA-256:** `bc4d6ce23425f5db67b91cad0167358dcd9da239c3c4d67dd1f7867ec5e6aadb`  
**Frozen cold report SHA-256:** `9078e33a7ae9f75eca75e2f9327a3f3e4e76e77c3223df5f03c5ce96dcbc5d9d`  
**Independent verifier workflow:** `35252625515`  
**Verifier artifact:** `10510431318`  
**Verifier artifact ZIP SHA-256:** `b876f8a73e9be8285939027fb61b0f90f9e0d03e702ce4a5c2065115afaebb5e`  
**Verifier report SHA-256:** `da45f19397f842eb08c9cea57cf77b108ee8dcf808c0c1f1989e72ca3d7b8eb3`

## Outcome

Experiment 005 qualifies the Draft 0.16 obligation-sufficiency clarification layer exercised by the frozen eight-case corpus.

Post-freeze scorer disposition:

```text
PASS:     8
PARTIAL:  0
FAIL:     0
UNKNOWN:  0
```

Independent scorer-blind verifier disposition:

```text
VERIFIED
unresolved obligations: none
```

Final review found no discrepancy between the frozen fixture, hidden assertions, cold report, verifier report, and the tested Draft 0.16 candidate semantics.

## Qualified clarifications

The focused evidence supports the following rules without adding or weakening the substrate:

1. **Claim-bounded dependency-closed obligations.** A claim must discharge every real dependency it has, but verification does not semantically require a stronger relation, stronger reconstruction layer, stronger completeness/optimality property, or unrelated gate.
2. **Proof-method neutrality.** Correctness is determined by qualified evidence obligations, not by a mandatory canonicalization, exhaustive-search, or refinement algorithm, subject to frozen qualification/isolation constraints.
3. **Claim-typed witness sufficiency.** Existential, lower-bound, uniqueness, exact-class-count, complete-family, and optimality claims require correspondingly different coverage; an existential claim does not require complete witness enumeration.
4. **Context-scoped witness quotients.** Witness equivalence is valid only under its independently qualified frozen claim context and cannot be silently reused when a later context exposes a previously irrelevant distinction.
5. **Exact witness-family certificates.** Exact verified finite/generative family descriptions can replace eager enumeration when coverage is proved. For isomorphism, one verified isomorphism together with an exact verified generating description of the relevant automorphism group compactly represents the complete isomorphism family.
6. **Claim-scoped factorization coverage.** A result at explicitly named factorization/extraction nodes remains local unless declared factorization-space coverage is exhausted or certified.

## Control review

### Q005-01 — witness sufficiency

The eight-leaf stars are isomorphic. One verified mapping is sufficient for the existential claim. The complete family contains `8! = 40320` mappings, and a complete-family claim requires exact coverage rather than enumeration specifically. The cold report did not claim that merely naming `S8` self-certifies coverage; it correctly stated the required exact verified generator/coverage burden.

### Q005-02 — quotient scope

The `31 <-> 32` symmetry exists when `^91002` is excluded and fails when `^91002` is included. This directly falsifies any rule treating witness equivalence as globally reusable. Pre-search quotient use for pruning/coverage must be frozen and qualified in the affected context.

### Q005-03 — factorization coverage

`4100` versus `5100` is non-isomorphic while the independently frozen alternative pair `4101` versus `5101` is isomorphic. Therefore a local negative cannot become a factorization-space negative without declared coverage. The clarification preserves discovery completeness rather than weakening it.

### Q005-04 — proof-method neutrality

A direct bijective witness qualifies the path isomorphism without any canonical-label record. This confirms that canonicalization is a possible proof/discovery method, not a semantic prerequisite when the relation obligations are otherwise discharged.

### Q005-05 — certified negative

Direct member-occurrence multiplicity `1 != 2` is a valid separating invariant. Exhaustive mapping search adds no semantic proof burden once that qualified certificate establishes non-isomorphism.

### Q005-06 — relation strength

Weak embedding succeeds while strong/induced embedding fails because the target contains an additional included relation among mapped objects. The weak claim retains its target residual and does not inherit the stronger reflection obligation.

### Q005-07 — reconstruction layers

The comparison-stage objects are isomorphic even though both D records explicitly mark full-source exact reconstruction unavailable. Pairwise reconstruction remains qualified at its stated layer; it cannot be promoted to source reconstruction.

### Q005-08 — dependency closure

A topology-only proof profile cannot validate the supplied V0 isomorphism claim because differing rigid stable relation labels remain a load-bearing dependency. Claim-bounded verification therefore does not permit a malicious or incomplete profile to erase correctness obligations.

## Adversarial checks that remain rejected

Qualification does **not** introduce:

- a globally minimal/smallest-view requirement;
- a required progressive cheap-to-expensive search schedule;
- mandatory post-D fingerprinting;
- a global canonical factorization or canonical-labeling prerequisite;
- weaker D-local/source reconstruction accounting;
- heuristic fingerprints or incomplete searches as proof;
- automatic witness collapse without independently qualified context and coverage.

## Performance claim boundary

Draft 0.16 makes no implementation-speed guarantee and prescribes no runtime data structure or algorithm. Its qualified performance contribution is narrower and semantic:

> the specification does not mandate proof/search work stronger than the dependency-closed claim being made, while preserving all load-bearing information and correctness obligations.

Whether a particular implementation realizes a wall-clock or memory improvement remains outside this qualification claim.

## Promotion decision

**QUALIFIED.**

The tested semantic candidate is promoted without changing its normative clarification rules. `CORE_SPEC_DRAFT_0_16_CONSOLIDATED_QUALIFIED.md` is mechanically derived from the exact tested candidate blob and changes only title/status/provenance material.

Draft 0.15 remains immutable historical qualification evidence for Experiment 004; Draft 0.16 does not retroactively reinterpret those artifacts.
