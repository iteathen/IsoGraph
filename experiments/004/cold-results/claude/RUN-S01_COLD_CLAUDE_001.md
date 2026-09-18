# ISOGRAPH EXPERIMENT 004 — Q004-S01 — COLD AUDIT REPORT
 
**Auditor role:** isolated parser/structure auditor, using only the five permitted inputs (spec, three fixtures, this cold prompt). No assertions, prior outputs, or external material consulted.
  
## File 1 — `Q004_S01_LEGAL_REFERENCE_BINDING.isg`
 
```
[
  (^0 [^6100])
  (^6100 [
    @0=(10 11)
    @0
    @0
  ])
]
```
 
**Validity:** Valid.
 
The document is a top-level scope `[...]` with two direct members:
 
- `(^0 [^6100])` — an ordered edge of a label and a scope containing one label.
 
- `(^6100 [...])` — an ordered edge of a label and a scope.
 
Inside that second scope, `@0=(10 11)` is a `ref_binding` occurring as a direct scope member. Per §10.1, a reference binding is legal in "ordinary scope-level serialization environments," which is exactly its position here (a direct member of an unordered `[ ... ]` scope, not an edge child, not a declarative operand, not a choice alternative). The two subsequent `@0` occurrences are ordinary `ref` terms used as scope members, which is unrestricted.
 
**N0-resolved semantic structure:**
 
Per §10.3, N0 removes the binding directive (it occupies no semantic member occurrence after resolution) and replaces each use-site `@0` with the referred term `(10 11)`, preserving the structural identities `10` and `11` inside each occurrence while creating a distinct use-site occurrence per reference use. So the inner scope resolves to two direct member occurrences, each the ordered edge `(10 11)`, both occurrences carrying the same underlying identities `10` and `11` (occurrence ≠ identity, §8.2).
 
Top-level resolved structure:
 
```
[
  (^0 [^6100])
  (^6100 [ (10 11) (10 11) ])
]
```
 
(N0 only concerns `@`-references; the stable labels `^0` and `^6100` are unaffected by reference resolution and remain as-is.)
 
**Direct semantic member count inside the `^6100` value scope, after N0:** 2 — the two resolved occurrences of `(10 11)`.
 
**Does the binding directive itself remain a semantic occurrence?** No. §10.1 states explicitly that "after N0 resolution, the binding directive occupies no semantic member occurrence." Pre-N0 the scope had 3 declared `scope_item`s (1 binding + 2 refs); post-N0 it has 2 semantic member occurrences and zero occurrences attributable to the binding directive itself.
  
## File 2 — `Q004_S01_INVALID_EDGE_BINDING.isg`
 
```
[
  (^6100 (20 @0=(10 11) 21))
]
```
 
**Validity:** Invalid.
 
**Rule violated:** §10.1, first forbidden placement — "a reference binding is forbidden as: an ordered-edge positional child." Here `@0=(10 11)` sits as the middle positional child of the ordered edge `(20 @0=(10 11) 21)`. This is also independently excluded by the base grammar: `edge := (term ...)`, and `ref_binding` is not a member of the `term` production (`term := id | literal | label | var | ref | edge | scope | choice | negmatch | neg | forall | exists | abstract | eq | implies | rule | instantiate` — no `ref_binding`). The construct fails on both the general term grammar and the specific placement prohibition simultaneously.
 
**Rejection before semantic comparison?** Yes. This is a placement/grammar-level defect, detected at parsing/placement validation — a stage that precedes N0 resolution entirely (there is no valid resolved semantic structure to produce), and therefore necessarily precedes any structural-only retrieval or comparison step in the governing pipeline of §2.
  
## File 3 — `Q004_S01_INVALID_DECLARATIVE_BINDING.isg`
 
```
[
  @0=(10 11) == 20
]
```
 
**Validity:** Invalid.
 
**Rule violated:** §10.1, second forbidden placement — "a reference binding is forbidden as: a declarative-formula operand." `==` is the `eq` declarative constructor (§13.2), and `@0=(10 11)` occupies its left operand position. As in File 2, this is also excluded at the base grammar level: `eq := term == term`, and `ref_binding` is not a `term`, so no valid parse of `eq` can take a bare binding directive as an operand.
 
**Rejection before semantic comparison?** Yes, for the same reason as File 2 — placement/grammar rejection precedes N0 and precedes any comparison step.
  
## Final question — arity change via deleted binding directive
 
**Can any valid N0 resolution change ordered-edge arity by deleting a binding directive from an edge position?**
 
No. §10.1 forbids a reference binding from ever occupying an ordered-edge positional child in the first place, and states the placement rule's own rationale: bindings are forbidden in "any position where its disappearance after N0 would change semantic arity or member occurrence structure." Since such placement is illegal by construction, the scenario cannot arise inside a *valid* document — N0 only ever removes a binding directive from a position (ordinary scope-level) where its removal was already guaranteed not to erase a semantic tuple position or member occurrence (§10.2 closing line: "N0 may remove the binding directive only because valid placement guarantees its removal cannot erase a semantic tuple position or member occurrence"). File 2 is exactly the illegal case this rule exists to block, and it is rejected at placement, never reaching N0.
  
## Difficulties and ambiguities encountered
 
1. **No inline revision/profile binding in the fixtures.** §3 requires that "every canonical bundle identifies the applicable semantic revision/profile through explicit native bundle structure or an enclosing native corpus contract supplied with the artifact." None of the three `.isg` files contains any such explicit revision marker; the binding to Draft 0.15 semantics is supplied only externally, by the cold-prompt packet's framing ("Read only: `CORE_SPEC_DRAFT_0_15_CONSOLIDATED_CANDIDATE.md`..."), not by native structure inside the fixtures themselves. I treated the packet's external framing as authoritative for this audit since the prompt directs it, but flag that under a stricter reading of §3 the fixtures alone are under-specified as canonical bundles.
 
2. **Parse of File 3 admits two equivalent readings, both invalid.** `@0=(10 11) == 20` can be read either as (a) a well-formed `ref_binding` sitting illegally in the operand slot of an `eq`, invoking the explicit §10.1 prohibition, or (b) simply as a term-grammar failure, since `ref_binding` was never a valid `term` production to begin with, so no `eq` node is constructible at all. Both readings converge on "invalid, rejected pre-comparison," so this did not change the verdict, but the spec does not explicitly disambiguate whether such cases should be diagnosed as a placement-rule violation specifically or a bare grammar/parse failure — a distinction that could matter for failure classification under §43 (e.g., "parser/serialization defect" vs. a more specific §10 placement citation).
 
3. **Whether the top-level `[...]` in each fixture is itself inside an implied enclosing "application scope."** §10.1 says ordinary scope-level environments are "the default supported location" for a binding directive, which resolves File 1's legality cleanly. But the spec's grammar and rule sections mostly discuss scopes in the context of rewrite/application structure (§12); nothing in the permitted material states whether a bare top-level document scope with no enclosing rule/bundle context still counts unambiguously as such an environment, or whether that determination is itself profile-dependent. I proceeded on the plain reading that any ordinary `[ ... ]` is a qualifying scope-level environment per §10.1's literal wording, since no narrower restriction is stated anywhere in the permitted files.
 
4. **Identity-sharing terminology for File 1's resolved output.** The spec is explicit that N0 preserves "structural identities inside the referred term" across repeated use-sites while creating separate *occurrences* (§10.3, §8.2). I reported two occurrences of `(10 11)` sharing identities `10` and `11`, rather than describing this as "two copies of `(10 11)`," to keep faith with the occurrence-vs-identity distinction in §0 and §8.2. This is a terminology choice made for precision, not a resolution of any indeterminacy in the spec — flagged only so a scorer can check the wording matches intended semantics rather than assuming casual "copy" language was meant.
 
**Report frozen as of this audit. No scoring material, prior outputs, or external sources were consulted in producing it.**
