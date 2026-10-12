# Self-reference as an obstruction certificate: what the circularity establishes

**Date:** 2026-10-12  
**Status:** exploratory analysis, not a completed proof of the Primitive Presentation minimum or a universal no-go theorem about the universe  
**Research origin:** Joshua Oshiro's substantive correction in the [Primitive Presentation research discussion](../DISCUSSION_LOG.md).  
**Assistant contribution:** clarify Gödel/Tarski history, separate inconsistent demands from inconsistent theories, and articulate a representation-invariance proof obligation.  
**Source:** historical [Primitive Presentation manuscript](../evidence/source/primitive-presentation.md); adjacent [two-symbol accounting critique](2026-10-12-two-symbol-boundary-and-counted-executor.md).

## Researcher's substantive claim

The repeated circularity arising from attempts to derive irreducible primitive presentation is **not necessarily a mistake to repair**. It may be **evidence of, or in an adequately specified case a certificate for, inconsistency among demands imposed on the attempted self-contained representation**. The researcher's objective was to compare primitive semantics to physical reality while counting every productive dependency and avoiding external unaccounted interpretation. Because a representation of *all* reality must include its own investigators, measurements, and validators, attempts to fully self-certify its grounding may encounter an invariant self-reference obstruction. The researcher explicitly resists describing this pattern solely as flawed reasoning: in the research context, discovering a structurally unavoidable circular demand would be a result.

This interpretation is recorded as a **researcher-originated candidate finding**. The original lower-bound proof's classification of a fused transition/applicability relation remains open to adversarial scrutiny. A new meta-level diagnosis does not retroactively validate its local deduction.

## Historically important Gödel distinction

Gödel's incompleteness results do **not** show that Peano arithmetic is inconsistent. They establish (under appropriate effective axiomatization, expressive strength, and consistency assumptions) that some statements cannot be settled *within* the system, and that the system cannot establish its own consistency in the relevant formal sense.

However, Gödel's historical account of his investigation describes an internally unrestricted **truth** predicate as inviting liar-style contradiction. By addressing **provability** instead of unrestricted truth, he obtained an incompleteness rather than an inconsistency result. This gives a substantial precedent for the researcher's preferred diagnosis: self-reference may reveal **an inconsistency among desired capabilities** rather than constitute a fallacious inference by the investigator.

Source: [SEP, Kurt Gödel, §2.2](https://plato.stanford.edu/entries/goedel/#IncThe); [SEP, Gödel's Incompleteness Theorems](https://plato.stanford.edu/entries/goedel-incompleteness/).

## A precise version of an actual inconsistent requirement

Suppose a sufficiently expressive consistent classical formal system T has a formula True_T(n) that is required to satisfy the unrestricted truth biconditional **within the same formal system** for *all* sentences φ of its language, including those containing True_T:

~~~text
T ⊢ True_T(⌜φ⌝) ↔ φ
~~~

Assume the system supports the diagonal/fixed-point lemma. Then it admits a sentence L for which

~~~text
T ⊢ L ↔ ¬True_T(⌜L⌝).
~~~

Substituting the truth biconditional for L gives

~~~text
T ⊢ L ↔ ¬L
~~~

which makes T inconsistent under the classical logic assumptions. Therefore **a consistent T cannot satisfy all of those internal unrestricted self-truth requirements simultaneously**.

This is an **obstruction certificate** to that precise set of demands (a Tarski-style undefinability phenomenon), not a flawed proof of an otherwise obtainable fully internal truth predicate. It survives any faithfully defined reformulation that preserves the self-truth requirement, diagonal expressiveness, and relevant logical consequence.

It does **not** prove that reality is an effectively axiomatized theory, that all embedded observers can diagonalize every physical predictor, that arbitrary “full accounting” definitions reproduce this exact inconsistency, or that a three-role lower bound follows.

Relevant external source: [SEP, Tarski's Truth Definitions](https://plato.stanford.edu/entries/tarski-truth/).

## What representation invariance does and does not say

Changing a notation, instruction set, or encoding **cannot evade** a theorem whose hypotheses and conclusions are preserved by the change. In that precise sense, a structural obstruction is formulation-invariant.

But the equivalence must be **specified and demonstrated**. Arbitrary two-symbol, three-symbol, lambda, SKI, or graph-rewrite presentations may preserve computable behavior while moving semantic interpretation into a separately described evaluator. Computational universality alone is too weak to preserve the self-truth assumptions or the number of irreducible primitive roles.

Moving to a stronger metatheory can resolve a particular local proof burden. If one now requires the stronger metatheory to satisfy the same unrestricted internal certification demands, the new theory may face an analogous obstruction; this is not a claim that every metatheory is inconsistent.

## The precise unresolved work

1. Specify the **target requirements** in Primitive Presentation that cannot be satisfied together. Is the requirement no hidden executor, independently justified primitive roles, total self-truth, self-consistency, uniquely identifiable ontology, or unconditional physical correspondence? Those are different questions.
2. Preserve the exact derivation that reproduces the circularity. Is there an independently demonstrated contradiction **between requirements** or only a proof strategy that depends on its own unvalidated role division?
3. Construct a translation between alternative candidate representations and show the specific self-reference pattern is preserved by a **declared equivalence criterion**. A genuinely invariant obstruction is stronger than a repeated failure in one calculus.
4. Distinguish mathematically relative impossibility theorems from the separate question of whether a finite formal description exactly describes the physical world.

**Disposition:** The researcher's objection corrects a serious potential misclassification: a self-referential obstruction can be a *positive negative result*. Existing Gödel/Tarski theory demonstrates that such results are possible and can be proven. The original three-versus-two **role** minimum and the proposed **physical** self-grounding obstruction remain unproved at present; they should not be dismissed merely because a prior argument is circular, nor called theorems without an independently established contradiction or impossibility under explicit hypotheses.
