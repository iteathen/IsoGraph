# Primitive Presentation: An Incomplete Inquiry into Representation, Minimality, and Self-Grounding

**Joshua Oshiro**

**Research status:** Incomplete and concluded investigation. This is a retrospective rewrite of an unsuccessful proof manuscript, **not** a proof of primitive minimality, a new incompleteness theorem, or a demonstrated physical limitation.

**Revision:** 2026-10-12. Working authorial draft; not submitted for peer review or approved as a final publication.

**Provenance:** The research question, attempted reduction, account of recurring circularity, and suspected self-reference boundary are the author's. This rewritten presentation was prepared with AI/agent assistance in connection with the IsoGraph Project, a system designed by Joshua Oshiro. The earlier manuscript and original supporting materials are preserved unchanged and separately identified below.

---

## Abstract

This paper reports an unfinished investigation into whether there is a primitive structural content common to all productive formal representations, regardless of the symbols or mathematical languages in which they are expressed. The motivation was not to identify a privileged alphabet or a particular computation as the physical origin of reality. It was to determine whether sufficiently reduced semantic structures could expose relationships also present in the physical world from which our measurements arise.

The investigation began with a distinction between **visible symbolic economy** and **the complete apparatus required for a formal system to do anything**. An alphabet alone does not specify parsing, rule application, evaluation, state, or readout. Comparisons of primitive representations therefore must state which operational and interpretive resources are being counted. A three-mark encoding of SKI combinatory logic was constructed to show that universal effective computation can be represented with a small visible vocabulary and a specified operating apparatus. The marks are placeholders, not fundamental physical objects.

The attempted next step was to establish that a complete productive representation cannot be reduced to two irreducible functional roles. This lower-bound argument did not succeed. It repeatedly depended on the same role distinctions whose independence it was intended to establish. The resulting circularity is retained here both as a problem with the proposed proof and as the observation that prompted a broader suspicion: when an account aims to encompass representation itself—and ultimately the reality containing the investigator and the apparatus of validation—it may approach a **self-reference or self-grounding boundary**.

The suspected boundary resembles Gödel- and Tarski-style limits in some respects, but this investigation does **not** prove that such a limit applies to every structured language or to physical reality. Nor does it prove that a two-role representation is impossible. The author does not currently see a way to substantiate the broader claim by proof or empirical evidence and has chosen not to continue the minimality program. The purpose of this paper is to preserve the problem, the constructions, the failure, and the resulting hypothesis without converting an inconclusive investigation into a theorem.

**Keywords:** primitive representation; formal semantics; complete comparison; computability; combinatory logic; interpreters; self-reference; Gödel-style limitation; structural invariants; incomplete research.

---

## 1. The problem was never primarily about an alphabet

Formal systems are generally encountered as expressions written in some particular symbolic language. The visible alphabet, formation rules, and conventional readings of these expressions are often treated as the immediate objects of study.

There is a different question behind that familiar presentation: **Which structural conditions are indispensable to a formal system's ability to express and produce determinate results, regardless of how those conditions are encoded?**

The earliest ambition of this work was broader still. Physical research proceeds from observations of reality toward mathematical descriptions. Those descriptions may preserve genuine structure while also introducing conventions, coordinate choices, auxiliary apparatus, and representational differences. If a formal representation could be reduced sufficiently far without losing what makes it operative, perhaps common relations in apparently unrelated physical and mathematical descriptions would become easier to identify.

The intended endpoint was thus **not human-readable notation**, nor a claim that three particular glyphs appear at the origin of matter, space, or time. It was a representation whose relationships were reduced far enough that structural correspondences might be compared across different presentations.

This motivation made two tasks inseparable in the original inquiry:

1. Identify what an effectively productive formal presentation must have available to work at all.
2. Determine whether what remains after representational reduction is genuinely invariant, rather than an artifact of the language, interpreter, or accounting method used in the reduction.

The first task is manageable within selected mathematical descriptions. The second becomes substantially harder when the comparison is intended to range over **all structured language**, including possible formalisms not yet specified. The symbols introduced in the earlier paper were meant to stand for functional distinctions across that entire domain. They were never meant to denote a particular stock of physical primitives.

That ambition also reveals an epistemic difficulty. A formalism is itself one structured representation among the things under investigation. An absolute assertion about all representation must explain why its own distinctions are not merely one more set of representational choices.

The present paper records where that difficulty became decisive for the author.

## 2. The scope of what can actually be demonstrated

The research question ranges broadly over possible structured representations. A completed mathematical theorem cannot simply inherit that range from the motivating question.

For the parts of the work involving computability, the demonstrable target is narrower: **effectively presented symbolic systems** whose relevant finite expressions, well-formedness conditions, transformation or checking rules, and results can be mechanically specified or encoded.

That restriction matters. Computational universality guarantees the ability to simulate computations in an appropriate effective class. It does not guarantee the representation of every non-effective mathematical structure or every possible physical ontology. The fact that a very small program can generate great complexity does not by itself prove that its representation is the primitive structure of reality.

Accordingly, this paper distinguishes four levels of claim:

| Level | What may be said | Status in this work |
| --- | --- | --- |
| **Historical** | The investigation used three proposed role questions, built a small-alphabet witness, and failed to establish the intended lower bound. | Documented by the original manuscript and research record. |
| **Constructive** | With a specified parser and reduction relation, a finite encoding can represent SKI combinatory computation in three visible marks. | Supported by the construction and standard computability results; bounded checks do not replace proof. |
| **Methodological** | A comparison of productive formal representations must state its completeness boundary, including any required parser, interpreter, evaluator, and readout. | A justified comparison discipline, not a unique minimality theorem. |
| **Foundational** | Exhaustive representational reduction may encounter an unavoidable self-grounding limit analogous to known self-reference theorems. | **Author's suspicion**, not established by proof or empirical evidence. |

The manuscript uses the phrase **complete comparison** for what an earlier version called *fair accounting*. The newer term is preferable because it makes clear that completeness is relative to an explicitly chosen comparison target. It does not posit an abstract universal bookkeeper who already knows the correct final ontology.

Throughout this work, **primitive** means a resource treated as not further decomposed **within a specified formulation**. This is not a claim of absolute underivability. A feature may be primitive for one theory, encoded in another, or unnecessary under a third formulation. Those cases should not be equated without defining the criterion under which two formulations are considered equivalent.

## 3. What must be counted when comparing systems

Consider a finite string in an unfamiliar notation. Even if its alphabet is tiny, the string does not by itself establish whether it is a term, an instruction, a state, a proof, an input, or an output.

A productive formal presentation may depend on several kinds of apparatus:

- **Admissible expressions and configurations:** which finite arrangements count as legal objects.
- **Formation and parsing:** how boundaries, application, binding, arity, and other syntactic relationships are determined.
- **Effective operations:** what transitions, rewrites, inferences, checks, or evaluations are permitted.
- **Conditions of application:** how a rule matches an object, state, or subexpression, and where it acts.
- **Execution or derivation discipline:** how successive applications are selected or coordinated, when such a discipline is load-bearing.
- **Acceptance and readout:** what counts as a valid finite result and how that result is recovered or interpreted.

A given formulation may fuse several of these functions into one rule or distribute one function across several devices. The list is **not** a declaration of irreducible primitives. It is an inventory of places where apparently simple visible expressions can rely on additional specified structure.

The key methodological requirement is this:

> When comparing the expressive or productive resources of different formulations, do not count a required mechanism in one while treating an equivalent required mechanism in the other as free background.

A two-character encoding accompanied by a complete parser and evaluator may be a fully described formal system. It is not only the two characters. Equally, a three-character encoding is not an independently operative system merely because its marks are visually distinguishable.

The same rule must be applied to both.

This requirement is not intended to settle questions about the material hardware running a computation, the ontology of its mathematical objects, or the truth of a theory about the world. The boundary must be stated. A specification of symbolic execution can be complete for a chosen formal task without claiming to explain why physical reality implements that specification.

### 3.1. Full specification is not intrinsic physical existence

A rewriting rule can be given as an exact mathematical relation. Its semantics can be clear without having a particular computer execute it. A physical implementation introduces different questions about material realization, measurement, and causal coupling.

The original inquiry sometimes moved too readily between these two levels. It is now necessary to preserve the distinction:

~~~text
A fully specified formal operation
    is not automatically
an independently realized physical process.

A faithful operational simulation
    is not automatically
an ontological identification.
~~~

The fact that an executor can be encoded into a second formalism is itself a formal result, not a demonstration that every justificatory or physical implementation layer has been eliminated.

## 4. The historical three-role proposal

The investigation organized its candidate productive dependencies into three questions. The original symbols are retained here to preserve the intellectual history, not because they are accepted as a final irreducible basis.

| Historical symbol | Question it was intended to identify |
| --- | --- |
| **α** | What supplies effective difference, transition, derivation, update, or productive change? |
| **β** | What supplies determinate formal presence—an object, expression, configuration, state, or result? |
| **γ** | What determines how the transition applies to the determinate item, including matching, boundary, application, or readout? |

In the earlier paper the central assertion became:

~~~text
For every productive, completely counted formal presentation,
the three α/β/γ dependency questions must be answered,
and no smaller primitive role basis can do that work.
~~~

There is a useful intuition behind this taxonomy. If a notation is interpreted as a working system, one can ask what the objects are, what happens to them, and what makes the operation applicable in a determinate way.

But an important logical step was never supplied: **why are these three questions independently irreducible, rather than three ways to describe aspects of one specified relation?**

For example, let a finite transition system have state set S and a function:

~~~text
S = {0,1}
f : S -> S
f(0) = 1
f(1) = 0
~~~

The single function specifies both a transition and its applicability to the states in its domain. Under the historical taxonomy, the same function can be described as supplying α and γ. That classification may be informative. It does not, by itself, prove that α and γ are independently primitive.

An attempt to save the proposed minimum by saying that every fused mechanism must secretly implement two distinct primitive roles depends on having **already established the correct criterion for dividing those roles**. That is precisely what the minimality argument was supposed to determine.

This is why the three-part factorization should now be treated as **a candidate method for examining presentations**, not as a proven unique basis shared by all of them.

The work does not establish that the three questions are meaningless. It establishes that using them as an initial descriptive scheme is insufficient to prove their independent necessity.

## 5. What the three-mark construction really accomplished

The original manuscript included a concrete encoding intended to demonstrate that a productive universal computational presentation can use three visible marks. It chose a left delimiter, a right delimiter, and a dot-like mark:

~~~text
Σ = { "(", ")", "∅" }
~~~

It specified terms for the S, K, and I combinators and application:

~~~text
SAtom ::= "(" "∅" ")"
KAtom ::= "(" "∅" "∅" ")"
IAtom ::= "(" "∅" "∅" "∅" ")"

Term  ::= SAtom | KAtom | IAtom | App
App   ::= "(" "(" Term ")" "(" Term ")" ")"
~~~

The encodings can be read recursively. After the first opening delimiter, an immediate dot begins an atom, while an additional opening delimiter begins an application structure. The parser also uses the full formation grammar to identify the two complete operands of an application.

The representation can transport ordinary SKI computation by giving a mechanically specified reduction relation:

~~~text
I x       -> x
K x y     -> x
S x y z   -> x z (y z)
~~~

That transition may be implemented by parsing the encoded expression, applying one valid SKI rewrite, and encoding the resulting term again. In other words:

~~~text
coded term
    -> parse / decode
    -> SKI reduction
    -> encode resulting term
~~~

This construction has a legitimate formal point. SKI combinatory logic is computationally universal. An effective, unambiguous encoding of its terms and reductions preserves its computational capabilities in the chosen operational sense.

The witness is **not** a proof that three visible symbols are necessary. It is also **not** a proof that the left delimiter, point mark, and right delimiter naturally correspond to three irreducible functional roles. Their assignments in the old manuscript are an interpretive overlay; the grammar and evaluator do the productive work.

There is no claim that three marks are the smallest possible alphabet for universal computation. Small binary and other universal representations are well known.

### 5.1. What was independently checked later

A later bounded review checked thousands of finite SKI terms for encode/decode consistency, along with a handful of sample reductions. It supported the local grammar construction but did not establish universality afresh, the three-role theorem, or a physical correspondence.

That review also found that several free-standing delimiter examples in the historical exposition were not well-formed under the **specific** SKI grammar stated in the proof. The illustrative strings and the actual accepted term grammar must not be conflated. The unchanged source and reproducible bounded checker preserve this discrepancy.

The formal achievement of the construction can be retained without using the illustration to support conclusions it cannot carry.

## 6. The attempted three-to-two reduction

Once the three-mark example was available, the investigation turned to whether a **complete productive primitive representation** could be reduced below the proposed three roles.

The difficulty was not that no one had shown how to put a universal computation into a string of zeroes and ones. The difficulty was determining whether a two-role formulation could satisfy the complete-comparison requirement **without merely moving a necessary function into background machinery and then omitting it from the count**.

That question must nevertheless be separated from literal alphabet size.

For example, consider a binary combinatory presentation whose terms obey:

~~~text
Term ::= "00"
       | "01"
       | "1" Term Term
~~~

The first two alternatives encode two combinators, and the third encodes application of two recursively parsed complete terms. Parsing is explicitly defined, rather than presumed to arise from undifferentiated bits. A complete operational presentation also gives the combinator reduction schemas, a rule for applying them, and a result convention.

Consequently, the assertion that **two visible characters cannot support a universal formal presentation** is false if a grammar and evaluator may be explicitly counted as part of the formal system. That binary system is not just two abstract bits; it includes the machinery responsible for how those bits operate. Precisely for that reason, it is a valuable test of the original accounting requirement.

But this does not answer the different question the author was attempting to settle:

> Can every load-bearing productive dependency, under an independently defined criterion of primitive-role identity, be reduced to only two genuinely irreducible role families?

The historical inquiry did not produce a satisfactory proof that the answer is no. Nor did it produce a proof that the answer must be yes.

The phrase **"no satisfactory two-symbol reduction was found"** must therefore be read as the author's account of the *stronger complete primitive-role objective*, not as a denial of already known two-character computational languages.

That distinction is essential to preserving the work accurately.

### 6.1. Why proving impossibility became the harder problem

A constructive proof of sufficiency can supply an explicit grammar, evaluator, and witness. A universal lower-bound claim must rule out **every admitted alternative formulation**, including alternatives that package the same behaviors in unexpected ways.

The original attempt used the three-role questions themselves as a test for alternatives. A candidate that appeared to use two roles could then be said to contain the third implicitly. Yet that judgment presupposed the very role division in dispute.

A non-circular lower-bound argument would require a more independent criterion for deciding whether a combined operation genuinely contains separately necessary dependencies. The investigation did not identify such a criterion that also retained the proposed representation-independent scope.

At that point, the author stopped regarding the proof as established.

## 7. What the circularity showed—and what it did not

The author first encountered the circularity as a technical obstruction. The more attempts were made to prove the three-role minimum, the more the proof seemed to rely on the role scheme it sought to justify.

The author then asked why the obstruction kept recurring.

One possible explanation is local and mathematical: the proposed categories had been built into the method used to classify alternatives. Another is broader: an attempt to reduce **the whole structure of representation**, including the procedures used to justify the reduction, may repeatedly encounter its own criteria as unexamined prerequisites.

The second possibility is the foundational suspicion that ultimately interested the author most.

It is important not to erase either side. A circular derivation does **not automatically demonstrate** that the desired conclusion is impossible. But a formally demonstrated incompatibility among self-referential requirements **can** be a positive negative result. In that case the self-reference is the mechanism that exposes the obstruction rather than an error to be edited away.

The inquiry as preserved here establishes neither a universal impossibility nor an independent theorem about three roles. It does preserve a recurring, recognized dependency problem in the historical proof strategy.

The author considers that recurrence a **sign of a possible boundary**. A sign means evidence suggesting an explanation, not conclusive proof of it.

That distinction is deliberate.

## 8. The self-grounding suspicion

The author's wider research interest concerned the relationship between formal semantic representations and physical reality. To investigate this relation, one takes empirical observations and constructs a formal theory of the physical system responsible for them.

But the act of measurement is itself physical. The observer, the apparatus, the recording process, and the production and interpretation of the theory occur within the same reality the theory is supposed to explain.

A schematic relation is:

~~~text
physical reality R
    -> measured/observed information M
    -> formal representation F

F is then used to explain R,
including whatever in R produced M and F.
~~~

For a local physical theory this need not be problematic: one can use external calibration standards relative to the target, compare independent instruments, and test competing predictions. The difficulty becomes sharper if the ambition is not local adequacy but **an ultimate, fully self-contained proof that the complete theory of reality correctly certifies every condition of its own truth, interpretation, and verification**.

The investigator cannot simply assume an independent standpoint outside the entirety of physical reality. Incorporating the validating machinery into the formal account may move the need for justification into the enlarged account.

The author's suspicion is:

> A sufficiently comprehensive and expressive representation of physical reality may encounter a Gödel-style self-reference boundary when it attempts to ground and certify its own completeness and correspondence to that reality from entirely within itself.

This sentence is a **conjectural interpretation of the historical obstruction**. It is not written as a theorem and not presented as a result supported by an empirical demonstration. The author presently sees no way to settle it through the original primitive-minimality method and does not regard the remaining work as a productive research direction.

The suspicion could be true in some precise sense, false as a universal claim, or partly attributable to the particular proof strategy and assumptions originally selected.

### 8.1. Why Gödel and Tarski are relevant but do not settle it

Gödel's incompleteness results establish limits on consistent, effectively axiomatized theories that can express enough arithmetic. Those limits do not automatically apply to every system with a finite alphabet or to every formalizable physical theory.

Tarski-style self-reference results show that certain sufficiently expressive formal languages cannot consistently contain their own unrestricted truth predicate with all expected truth conditions.

These are rigorous examples of **incompatible demands imposed on formal self-description**. They give the author's suspicion a recognizable mathematical shape. They do not imply that the Primitive Presentation roles instantiate the same conditions or that their minimal number is three.

There is also work on limits of physical inference by agents or devices embedded in the universe being investigated. Such results provide relevant antecedents under specified physical-inference assumptions; they do not establish that a complete physical-law generator is in principle unknowable.

The author does not claim to have extended these theorems to all structured languages. The term **Gödel-style** is retained precisely because a direct application of Gödel's established theorem has not been demonstrated.

### 8.2. Moving to a metatheory does not answer every question

A limitation within one formal system can sometimes be demonstrated from a stronger metatheory. That is an important part of how mathematical impossibility results work.

But when the research goal is **absolute** self-grounding, using a stronger framework may only relocate the question of why that framework has authority and why its correspondence to the underlying world should be accepted.

That relocation does not itself prove an infinite regress, nor prove that every possible metatheory is inadequate. It explains why the author remained dissatisfied with a proof that merely shifted unexamined machinery into another formal description.

The concern is about **unconditional certification of the entire account**, not a denial that strong, useful, and rigorous relative proofs can be made.

## 9. Why the present work remains incomplete

The original manuscript was framed as having proved a three-role minimum. That conclusion must be withdrawn as an established result.

For clarity, here is the disposition of the principal claims.

| Claim | Disposition |
| --- | --- |
| A finite visible alphabet can encode an effectively specified universal computational presentation when parsing and reduction are defined. | Supported in the relevant effective-computational scope; not a novelty claim. |
| A complete comparison should not omit machinery required by the behavior being compared. | Retained methodological principle; depends on a declared comparison target. |
| The historical α/β/γ questions can usefully locate productive functions. | Retained as a candidate analytical factorization. |
| Every productive formal presentation has **exactly three independently irreducible roles**. | **Not proved.** |
| A complete two-role formulation is impossible in every possible representation. | **Not proved.** |
| Two visible characters cannot support a computationally universal presentation when its evaluator is fully specified. | **Not a defensible general claim.** |
| The experienced circularity proves that physical reality has an absolute self-reference boundary. | **Not established.** |
| The circularity may be a sign that the attempted absolute reduction encounters a self-grounding limitation. | **Author's suspicion; unresolved.** |
| Computable representation of a physical theory proves the structure of the underlying physical world. | **Not established.** |

The failure is not described as proof of its opposite. Not having proved a three-role minimum does not prove that no meaningful three-part structural account could exist. Conversely, repeatedly failing to construct a two-role reduction does not establish that one is impossible.

The inquiry has an authentic negative outcome: the proof architecture does not independently support the claim of minimality it was designed to establish.

The author's more ambitious explanation for **why** this happened remains conjectural.

## 10. What is preserved from the original research

Several features of the investigation remain worth keeping as research history even if the principal theorem does not survive.

### 10.1. The difference between expression and operation

The manuscript's most durable question asks whether allegedly simple formal representations are simple only because their interpreters, parsers, or application rules have been left uncounted.

This is a useful question in comparisons across mathematical languages, implementations, and operational models. It is not a discovery that all such systems have the same ultimate primitives.

### 10.2. The distinction between description and structural content

A sign or construct may be primitive within a mathematical presentation yet derivative or eliminable under a different formulation. Whether the same **structural content** survives those changes cannot be settled by the labels assigned to its pieces.

This concern informed the larger search for structural invariants across formal and physical theories. It remains worthwhile independently of the original minimality theorem.

### 10.3. The three-role factorization as a historical heuristic

The α/β/γ decomposition can still help describe where transitions, formal objects, and application conditions are supplied. It must not function as a definition that predetermines the minimum number of irreducible primitives.

Using the roles as questions is legitimate; using their names to certify their own necessity is not.

### 10.4. An explicit computational witness

The historical delimiter-shaped SKI encoding is preserved as a witness that small symbolic alphabets with specified operational apparatus can represent rich computation. It does not privilege the glyphs and does not prove a minimum.

### 10.5. A documented limit of the method

The author's inability to construct a satisfactory proof of a universal two-role obstruction, together with recognition of circular dependence in the proposed proof, is part of the record. The work should not be rewritten to make the path appear to have succeeded.

### 10.6. The suspicion about self-grounding

The final conceptual observation is that a theory aspiring to account for all structured representation—and ultimately all physical reality—may have to represent its own conditions of interpretation. The author suspects that this objective encounters a Gödel-like boundary.

The record must identify this as **a suspicion prompted by the investigation**, not as a demonstrated law or a contradiction already isolated under formal assumptions.

## 11. Why the research was stopped

Continuing a research program is not the only way to preserve its value.

The author considered whether an alternative formalism or stronger metatheory might establish the desired absolute lower bound. In the end, he judged that the proof attempt was likely to reproduce the same self-reference difficulty while yielding no defensible universal minimality result.

This is a statement of the author's research judgment and practical decision. It is **not** a demonstration that future researchers could never derive a scoped theorem or that a precise Gödel-like proposition could not be established under stronger assumptions.

The distinction matters especially here. An impossibility claim cannot be obtained simply by making the quantifier broader than the evidence. Nor is it necessary to keep working indefinitely in order to report honestly that the original approach reached an impasse.

This inquiry is therefore **concluded without its intended proof**. Its historical claims and conjectural interpretation are retained, while no additional empirical program or proof-search obligation is asserted.

The failure to obtain the sought-after result does not make the observations imaginary. It means the observations must retain their actual evidential status.

## 12. Conclusion

The investigation began with the hope that progressively reducing symbolic representation would expose a minimal structure shared across mathematical descriptions, perhaps helping to identify structural relationships between semantics and physical reality.

It established a useful requirement for comparing effective presentations: count the apparatus necessary for their operation, not merely the visible symbols. It preserved a three-mark computational encoding and explored a three-part functional analysis.

It did not establish that the three roles are universally irreducible. It did not establish that a complete two-role productive formulation is impossible. Attempts to do so repeatedly relied on unresolved assumptions about the role divisions being proved.

The author interprets that recurrence as a possible sign of a deeper self-reference limit: perhaps a sufficiently comprehensive representation cannot completely and unconditionally ground its own interpretation and verification when it seeks to encompass the reality of which those processes are themselves part.

**That is the author's suspicion, not the paper's theorem.**

This is therefore an **incomplete foundational inquiry**, not a failed attempt disguised as a successful proof and not a demonstration that reality itself is unknowable. It preserves what was constructed, what could not be established, and the unresolved question that led the author to stop.

---

## Appendix A. Historical development and continuity of source material

The earlier manuscript was titled **Three Roles in Effective Symbolic Presentation: Fair Accounting, Local Syntax, and Visible Role-Carriers** and was supplied as an inquiry submission draft. Its main technical and conceptual layers were:

1. A distinction between descriptive minimality and productive-role accounting.
2. A broader apparatus boundary including parser, evaluator, rules, application, boundary and readout.
3. A proposed α/β/γ three-role basis and an attempted non-collapse/minimality proof.
4. A universal computation witness through a three-mark encoding of SKI.
5. Illustrations using other formal systems, including Rule 110 and various rewriting and proof systems.
6. A conditional discussion of possible relevance to physical formalization.
7. A recognition in its limitations that internal formal consequences do not certify physical correspondence without further grounding.

Subsequent adversarial review rejected the claim that the main theorem had established unique irreducible minimality. Discussions with the author clarified the original motivation, the difficulty of the two-role reduction, and the author's identification of a suspected self-grounding limit.

The chronology is preserved as **research development**, not as proof that the final suspicion was independently demonstrated.

The following retained source artifacts remain the historical record:

- [Original complete manuscript](../evidence/source/primitive-presentation.md)
- [Original inquiry summary](../evidence/source/primitive-presentation-inquiry-summary.md)
- [Original development notes](../evidence/source/supplementary/primitive-presentation-development-notes.md)
- [Original role case studies](../evidence/source/supplementary/role-definition-case-studies.md)
- [Original experimental Model A](../evidence/source/supplementary/model-a-dimension-birth.html)
- [Original experimental Model B](../evidence/source/supplementary/model-b-field-ignition.py)
- [Research provenance and file hashes](../SOURCE_IMPORT.json)
- [Adversarial review](../reviews/2026-10-12-critical-review-and-self-reference.md)
- [Two-symbol analysis](../reviews/2026-10-12-two-symbol-boundary-and-counted-executor.md)
- [Self-reference obstruction assessment](../reviews/2026-10-12-self-reference-as-obstruction-certificate.md)
- [Substantive research discussion log](../DISCUSSION_LOG.md)

The original materials are retained without retroactive revision. This paper is a new interpretive and editorial document.

## Appendix B. Why the original proof did not establish the intended lower bound

The invalidating dependency can be summarized without reconstructing every earlier lemma.

First, the proposed three-role account names the very functional distinctions later called universally necessary. Then it tests any alternative basis by asking whether each of those three questions receives an answer. If a purported two-role formalism contains a single function that performs both transition and application, the original proof classifies that function as carrying two distinct primitive roles.

That last classification does not necessarily follow from the behavior of the function. It follows from the **prior decision to analyze the behavior as three questions**.

The conclusion that there must be at least three independently primitive questions is therefore not established by the test. The test tells us how the selected vocabulary can classify the example. An independent minimality conclusion would require a different argument for what counts as a primitive role, and why the proposed dependencies cannot be fused in the relevant equivalence class.

This is the exact local inferential issue. The author's larger self-grounding conjecture may explain why a broader absolute reduction is difficult, but it is not needed to recognize the local shortfall in the claimed lower-bound proof.

Conversely, this local critique is not evidence that self-reference can never yield a genuine impossibility theorem. It preserves the possibility that, in a suitably defined formal setting, incompatible self-description requirements could be proved inconsistent.

The unresolved choice between those explanations is part of the incomplete result.

## Appendix C. References and provenance

### Primary research sources

Joshua Oshiro, *Three Roles in Effective Symbolic Presentation: Fair Accounting, Local Syntax, and Visible Role-Carriers*, historical inquiry submission draft; unchanged archive held in this project's **evidence/source** directory.

Joshua Oshiro and AI-assisted research discussion, *Primitive Presentation: Critical Review, Two-Symbol Reduction, and the Self-Grounding Interpretation*, preserved dated research log and review artifacts linked in Appendix A. The researcher's statements about why the program ended are recorded as retrospective first-person interpretation, not certified global priority.

### External antecedents

- A. M. Turing, “On Computable Numbers, with an Application to the Entscheidungsproblem,” *Proceedings of the London Mathematical Society*, 1936–1937 — effective computation and universal machines.
- H. B. Curry and R. Feys, *Combinatory Logic*, Volume I, 1958 — standard combinatory logic background.
- Matthew Cook, “Universality in Elementary Cellular Automata,” *Complex Systems* 15 (2004) — Rule 110 as an independent illustration of computational universality from small rules.
- John Tromp, “Binary Lambda Calculus,” 2006 — related compact effective representation; this paper does not assert that two-mark computation is impossible.
- Kurt Gödel, 1931 incompleteness results; explanatory entry: [Gödel's Incompleteness Theorems, Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/goedel-incompleteness/).
- Alfred Tarski, semantic truth and undefinability; explanatory entry: [Tarski's Truth Definitions, Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/tarski-truth/).
- David H. Wolpert, “Physical Limits of Inference,” *Physica D* 237 (2008), [DOI: 10.1016/j.physd.2008.03.040](https://doi.org/10.1016/j.physd.2008.03.040) — an external formal antecedent concerning inference devices embedded in their physical universe. It does not prove the present suspicion.

This reference list identifies relevant antecedents; it is not represented as a comprehensive prior-art audit or as independent verification of the conjecture.

### Provenance and contribution note

Joshua Oshiro originated the primitive-presentation research direction, the historical reduction attempt, and the later interpretation of recurrent circularity as a possible self-grounding limitation. He is the author of this research paper and designer of the IsoGraph system.

This rewritten manuscript was drafted with AI/agent assistance through the IsoGraph research process. That assistance included reconstruction of the original source, adversarial assessment of the lower-bound argument, review of the interpretive distinctions, and editorial organization. This redraft is subject to the author's further review and does not retrospectively turn AI-originated phrasings or analysis into sole human discoveries.

The qualified IsoGraph semantic specifications are **not changed** by this manuscript. No new theorem, independent empirical finding, or novelty claim is asserted.

**End of incomplete inquiry.**
