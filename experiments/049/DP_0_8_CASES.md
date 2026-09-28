# Experiment 049 — DP 0.8 blind mixed discrepancy cases

For every case, determine:
- repair disposition;
- discovery disposition;
- any requested boundary fields.

Do not assume a discrepancy is a defect or a discovery.

## D01 — Shifted output slot

A serializer contract says field values must be written to positions 0,1,2 in that order. One implementation writes positions 1,2,3. A trace shows the semantic source values are correct before serialization. Correcting the index shift makes the serialized bytes match the contract. No other invariant, recurrence, or structural relation is observed before or after repair.

## D02 — Boolean connective mismatch

A frozen source rule is exactly `eligible := terminal AND enabled`. The implementation uses OR. A counterexample has terminal=false, enabled=true and is incorrectly accepted. Replacing OR with AND fixes the counterexample and every repeated control. The previously interesting accepted/nonterminal cluster disappears completely and no independent structure supports it.

## D03 — Bad branch pointer with a surviving symmetry

Two independently generated search branches should point to their own child arrays. Branch B accidentally points to branch A's array, producing duplicated counts. Repairing B's pointer removes the duplicate-count defect. After repair, an independent continuation-language comparison still proves that the two branches have exactly the same future accepted suffix language even though their child arrays and provenance differ.

## D04 — Unit conversion hiding a stronger relation

One sensor path stores seconds but its adapter labels the value as milliseconds; another path is correctly stored in milliseconds. The mismatch violates the adapter contract. After the minimum unit repair, three independently measured systems exhibit the same exact dimensionless ratio relation, with fewer residuals than before. The ratio is directly recomputed from corrected primitive measurements.

## D05 — Two latency quantities

One report measures end-to-end request latency. Another measures server service time only. Both are correctly instrumented and their scopes are documented. Their numbers differ by network and queue delay. A comparison job treated the two quantities as if they were the same metric and reported a discrepancy.

## D06 — Same scoped behavior, different subjects

Two independently implemented finite transducers have different source identities, internal state names, and construction histories. Under a declared input/output scope, complete enumeration proves the same output for every admissible input. No natural-identity theorem is supplied.

## D07 — Exact rendering versus expected number

A frozen source table records duration `1000 ms`. IsoGraph faithfully represents the literal and unit. An expected-output file says `1 ms`. The expected file has no provenance beyond "legacy expected". A direct check of the source confirms `1000 ms`; no rule authorizes rescaling the source value.

## D08 — Challenge to a correct reference

A reference formula and two independent derivations contain coefficient `-2`. An IsoGraph rendering contains `+2` because the parser dropped a unary minus. The mismatch was initially described as possible reference failure. Parser tracing locates the omitted minus; repairing it reconstructs `-2` and removes the discrepancy.

## D09 — Trusted reference pressure without adjudicating evidence

A long-standing external handbook says constant K=7. A newly received primary instrument calibration file says K=8. Both artifacts are faithfully represented and apply to what currently appears to be the same device revision. No calibration authority, date precedence rule, or independent measurement is available. A reviewer proposes changing the instrument rendering to 7 because the handbook is older and trusted.

## D10 — Correct-reference control

A source file, an independent checksum, and a separately generated reference all agree on ordered tuple `(a,b,c)`. The IsoGraph conversion emits `(a,c,b)`. Trace inspection finds the converter reversed argument positions 2 and 3.

## D11 — Faithful conflicting references

Two standards documents are both faithfully rendered. Each explicitly claims applicability to product revision R and gives a different mandatory threshold. Their publication dates differ, but no authority supplied to the case says date determines precedence. Neither rendering contains an omission or mistranscription.

## D12 — Missing authority

Two represented models disagree about whether relation r is symmetric. Model A declares symmetry; model B is silent. The comparison asks whether B's r is symmetric, but no closure rule, source statement, dataset completeness declaration, or qualified authority answers that question.

## D13 — QU-sensitive diagnosis

A qualified QU object preserves two admissible realizations of an unresolved mapping. Under realization U1, an observed mismatch is caused by an implementation index defect. Under U2, the same observed values are expected because the mapped quantities are distinct. No evidence selects U1 or U2.

## D14 — No observed difference and identity

Two represented samples agree on every measured property in the declared finite observation set. The observation set is not complete for natural identity, and no qualified identity model says those properties are sufficient. A report proposes NEI SAME because no difference was found.

## D15 — Wide dependency cone

A primitive relation p is proven mistranslated. Thirty-seven derived assertions and four cached views depend on p. Recomputing them is expensive. A proposal repairs p but marks the dependents unchanged to avoid invalidating downstream work.

## D16 — Clue survives a local parse repair

A malformed delimiter causes one formula row to be dropped. Before repair, a repeated dependency motif is observed in the remaining rows. The delimiter is repaired and the missing row restored. The same motif remains across all rows and is independently derivable from relation incidence.

## D17 — Clue disappears after repair

A byte-order bug turns several unrelated integers into repeated palindromic bit patterns. The pattern is proposed as a structural invariant. Correcting byte order removes every palindrome in the independent controls; no primitive relation corresponding to the palindrome remains.

## D18 — Recurrence across domains

A chemical workflow and a scheduler each have explicit primitive relations forming entry, recurrence, carried-state, and exit motifs. The roles correspond under a declared structural view, but their domain objects, causal mechanisms, and terminology differ. No authority supplies one shared natural ontology.

## D19 — Useful derived bottleneck view

A derived "bottleneck frontier" view is exactly reconstructible from existing primitive order and membership relations and substantially improves discovery/search. Its deletion leaves all exact claims reconstructable. A proposal promotes BOTTLENECK_FRONTIER as a new Core primitive solely because it is useful.

## D20 — Interesting anomaly collapses to ordinary error

One data row suggests a striking three-way correspondence. Integrity checking proves that row is a duplicated/corrupted import. Removing the duplicate under the established data-integrity contract eliminates the correspondence. Fresh independent rows show no related pattern.

## D21 — Expected-output-only patch

A test expects value 42; the implementation returns 43. No applicable specification is known yet. A patch changes the calculation constant so the output becomes 42. The only justification recorded is "the test becomes green."

## D22 — Representation-level mismatch only

One side serializes a set as sorted list `[a,b,c]`; the other preserves insertion order `[c,a,b]`. The comparison claim is extensional set equality, and both representations decode to the same three members. No claim depends on list order.

## D23 — Different scopes reveal a useful distinction

A theorem reports maximum memory over the entire run. A profiler report gives maximum memory inside one named phase. Both are correct under their documented scopes. A discovery pass notices that the phase maximum equals the global maximum in some runs but not others, correlated exactly with whether a later allocation phase executes.

## D24 — Enforcement gap

A qualified specification already requires every transition record to include source and destination incidence. The validator accidentally checks only source incidence, allowing a malformed record through. The semantic rule is present and unambiguous; only the validator failed to enforce it.
