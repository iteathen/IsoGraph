# Primitive Representation, Complete Apparatus, and the Self-Grounding Problem

**Joshua Oshiro**  
**Status:** retrospective editorial redraft for consideration — **not a published theorem, proof of a three-role minimum, or proof of a physical Gödel-style no-go result**  
**Redraft recorded:** 2026-10-12  
**Research scope:** effectively presented symbolic systems; a broader all-representations question remains a conjectural motivation, not the domain of a proved universal theorem.

*Agent-assisted editorial reframing of the historical inquiry manuscript, produced in connection with the IsoGraph Project, a system designed by Joshua Oshiro. This document is a draft; its wording has not been separately approved as final authorial text.*

## Abstract

This note reports an investigation into whether productive symbolic presentation admits a representation-independent primitive minimum. The starting problem is that a compact visible alphabet does not, by itself, contain all the structure required to parse, execute, interpret, or read a formal system. Comparing primitive presentations therefore requires a complete comparison of the mechanisms on which their promised behavior depends, including syntax, evaluator, rule applicability, boundary conventions, state, and readout.

A three-mark presentation of SKI combinatory logic supplied a constructive universal-computation example when its parser and reduction machinery were counted. The example establishes effective encoding and simulation within its specified scope; it does not establish that three marks or three independently irreducible roles are necessary. The attempted next step—excluding an equally complete two-mark reduction—did not yield a valid lower-bound proof. In particular, attempts to insist that productive presentations must answer three proposed dependency questions repeatedly risked employing that decomposition as the very criterion by which competing decompositions were ruled out.

The recurrent self-reference was taken as evidence of a deeper issue: a sufficiently comprehensive account of a representational system may eventually have to count the interpretive and validating procedures used to certify the account itself. For a representation intended to illuminate physical reality, the difficulty becomes sharper because investigators and instruments belong to the world they purport to explain. This is a candidate problem of **self-grounding**, not a demonstration that all physical laws are unprovable or that a two-role reduction is impossible. Gödel- and Tarski-style limits supply suggestive precedents under specific assumptions; no new incompleteness theorem is claimed here.

The result preserved is therefore both positive and negative: complete-apparatus comparison is a necessary discipline for meaningful claims of representational reduction; the proposed three-role minimum and the supposed impossibility of a complete two-role formulation were not established. Repeated circularity is reported as a clue to a possible self-reference boundary, not presented either as a validated theorem or discarded as irrelevant failure.

## 1. Why the investigation began

Formal systems are commonly displayed through alphabets, expressions, proof rules, and chosen syntactic constructions. Their productive behavior may nevertheless depend on mechanisms not evident from those marks: parsing, binding, matching, rewrite strategy, machine state, run conventions, acceptance conditions, and output interpretation.

A claim that one system uses fewer primitives than another is incomplete if it counts the visible marks on one side but silently supplies an interpreter to the other. The investigation therefore adopted a **complete-comparison requirement**: any mechanism necessary to realize the behavior being compared must fall within the declared accounting boundary.

The underlying motivation extended beyond notation. If distinct mathematical representations encode the same physically relevant relations, perhaps deeper comparison can expose structural content that survives changes of formulation. The symbols used to ask these questions were intended as placeholders for functions of presentation, not privileged tokens of a particular calculus or proposed particles of reality.

This broader ambition is stated as motivation, **not** as a proven correspondence between symbolic formalism and physical ontology.

## 2. What the three-mark construction showed

A witness presentation used three visible marks and an explicit grammar to encode SKI combinatory terms. Its computational significance came from the specified encoding, parser, SKI reduction discipline, and readout, all of which belonged to the counted apparatus.

Within the class of effectively specified finite operational systems addressable by the encoding and simulator, such a construction can represent a wide range of formal computations. It provides a useful illustration that elaborate formal behaviors can arise within a small visible vocabulary.

But there are two different statements:

- **Sufficiency:** a specified three-mark presentation, with counted apparatus, can encode a computationally universal system.
- **Minimality:** no fully and fairly counted productive presentation can realize the same required structural functions with fewer than three irreducible primitives.

The former can be supported by the explicit construction together with established results about combinatory logic. The latter does not follow from it. The claim does not cover every possible mathematical structure merely because computation is universal for a specified effective class.

## 3. The attempted reduction from three to two

The difficult next step was not to show that strings made from two characters can encode arbitrary finite data. It was to determine whether a **complete operative presentation** could be reduced further without relocating essential structure into uncounted background apparatus.

This distinction matters. Binary or two-character computational languages still need rules for identifying complete expressions and determining what operations mean. Counting the grammar and evaluator does not invalidate their computational universality; it specifies what object of comparison is actually being called the system.

The original analysis grouped productive dependencies under three questions:

- **α:** What supplies effective transition or productive difference?
- **β:** What supplies determinate formal presence?
- **γ:** What settles how transition applies to presence?

These remain useful audit questions. But in a presentation defined by a fully specified transition function, the operative rule may jointly answer α and γ. Calling such a rule a carrier of two roles does not, without an independent theory of role individuation, prove that two separate primitive *dependencies* were required.

The attempts to establish the three-role lower bound therefore reached an impasse. Any candidate two-role basis could be redescribed as containing the proposed third role implicitly; yet that redescription relied on the very three-role classification whose irreducibility was at issue. This made the proposed impossibility claim difficult to test independently rather than proving it.

The investigation did **not** establish that a two-mark universal operational presentation is impossible; such presentations are known when their parsers and evaluators are stated explicitly. Nor did it demonstrate that only two irreducible productive role-families suffice under a separately specified criterion. The stronger role-minimality question remains open within the historical program.

## 4. The suspected self-reference boundary

The recurring impasse had a methodological consequence. Attempts to eliminate the final representational dependencies seemed to depend on standards of identification, equivalence, and primitive status that had not themselves been reduced or justified without presupposition.

At increasingly comprehensive scope, the question shifts from *what this formalism can represent* to *what authorizes its account of representation itself*.

For a formal account of physical reality, there is an additional recursion: the reality being explained contains the investigators, their instruments, their mathematical symbols, and whatever processes they use to establish the explanation. Enlarging a formal description to incorporate those processes can move the grounding question into that larger description rather than answering it absolutely.

This difficulty has a genuine affinity with mathematical self-reference. Gödel's incompleteness results and Tarski's truth results demonstrate that some demands for internal completeness, consistency certification, or unrestricted self-truth cannot be satisfied by appropriately expressive formal systems under their stated assumptions. Those results do not say that *every* structured language, every effective system, or the universe itself meets those assumptions. They also do not imply that a finite set of underlying physical rules could never be discovered.

The researcher's judgment was narrower and evidential: the repeated appearance of circular justification during primitive reduction was a **sign** that the investigated method might be approaching a self-grounding boundary. A sign is evidence to be interpreted; it is not a logically unavoidable conclusion.

If the same obstruction were shown to survive all formulations equivalent under a declared criterion, the result could eventually be formulated as a structural impossibility theorem. The historical investigation did not supply that general proof.

## 5. What remains of the result

The original inquiry does not justify a universal three-role minimality theorem. This conclusion must not be disguised by saying that any smaller system secretly has a third role whenever a rule determines applicability. Nor does a failure to prove that minimum establish its negation.

It does preserve several meaningful distinctions:

1. **Visible compression is not complete-apparatus compression.** Any comparison must state what machinery is counted and what behavior is promised.
2. **Primitive status is formulation- and scope-dependent.** A resource primitive in one presentation can be represented or derived in another; an alleged invariant must survive a declared equivalence, not merely a shared label.
3. **Representation does not certify correspondence to reality.** Simulating a formal physical description is not sufficient to establish that the simulation captures the fundamental ontology of the physical world.
4. **A circular proof attempt can disclose a real research obstruction.** To classify it as an impossibility result requires identifying incompatible demands or a provably inescapable dependency, not merely noting that one argument repeatedly returns to its premise.
5. **The ultimate self-grounding limitation remains conjectural.** It may motivate how we interpret failures of complete primitive reduction, but it is not a theorem about every formalizable universe.

## 6. Conclusion

This investigation began by looking for a minimal productive representation and for structural commonalities between formal semantics and the reality those semantics describe. It produced a computationally meaningful small-alphabet example and a methodological requirement to count the operative apparatus rather than its printed tokens alone. It did not produce a non-circular proof that three irreducible primitive roles are necessary, nor a proof that a complete two-role formulation is impossible.

The strongest uncompleted idea is that the difficulty of absolute reduction may arise at the point where a representation must account for its own conditions of interpretation and certification. The repeated circularity encountered by the author is retained as the historical evidence that motivated that possibility.

A fully demonstrated universal self-grounding boundary would be a deeper result than the original symbol count. Such a result is **not claimed here**. This note preserves the difference between what was constructed, what failed, and what the failure suggested.

The author has elected not to continue the original primitive-minimality research campaign. Preservation of the unfinished result does not oblige a further proof attempt.

## Status, references, and provenance

This is an **editorial retrospective draft**, not a new independently validated research publication or an authoritative revision of IsoGraph's qualified semantics.

Primary source and project record:

- Joshua Oshiro, [*Three Roles in Effective Symbolic Presentation* — unchanged inquiry manuscript](../evidence/source/primitive-presentation.md).
- [Initial adversarial review and self-reference analysis](../reviews/2026-10-12-critical-review-and-self-reference.md).
- [Two-symbol complete-apparatus audit](../reviews/2026-10-12-two-symbol-boundary-and-counted-executor.md).
- [Research discussion and later clarifications](../DISCUSSION_LOG.md).

Relevant established external frameworks, not claimed as originated by this project:

- Kurt Gödel, incompleteness theorems; see [Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/goedel-incompleteness/).
- Alfred Tarski, semantic truth and undefinability; see [Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/tarski-truth/).
- Classical combinatory logic and effective universal encodings; historical witness explained in the unchanged manuscript.
- David H. Wolpert, physical inference limitations; see [Physical limits of inference](https://doi.org/10.1016/j.physd.2008.03.040). The present note does not assert that Wolpert's theorem proves the author's broad conjecture.

### Provenance and contribution note

Joshua Oshiro is the author of the source research and the designer of the IsoGraph system. This retrospective redraft was prepared with AI/agent assistance through the IsoGraph research process, including editorial organization, adversarial analysis, and repository recording. The author has not yet approved this draft as a final statement for publication. AI-developed formulations in this draft are not retroactively attributed solely to the researcher. External mathematics and publications remain credited separately.

No novel priority claim or independent physics validation is asserted.
