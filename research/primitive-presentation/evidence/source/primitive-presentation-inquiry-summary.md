# Three Roles in Effective Symbolic Presentation

## Inquiry Summary

Josh Oshiro

---

I am trying to place a draft about a problem that seems to sit between several fields.

The simple version is this: a formal system can look very small if we count only its visible marks, but the work that makes it operate may be carried elsewhere. It may sit in parsing, application structure, evaluation rules, state conventions, boundary rules, proof checking, or readout.

The paper asks how to count that work.

The central claim is not that every formal system has three parts, three layers, or three symbols. The claim is that any productive effective symbolic presentation has to answer three questions somewhere:

1. What carries effective change or transition?
2. What supplies determinate formal objects, states, or results?
3. What settles how a transition applies to those objects, states, or results?

In the manuscript I call these alpha, beta, and gamma roles. The names are just labels. They are not names for fixed mechanisms, and they are not physical entities, forces, or laws. A single rule, parser, evaluator, state convention, or transition system may carry more than one role. The accounting point is only that if the system depends on that mechanism to be productive, the mechanism belongs in the presentation being counted.

## Core Claims

1. **Visible primitive economy is not productive-role economy.** Small alphabets and compact bases can hide work in parsing, evaluation, state conventions, boundaries, application structure, or readout.
2. **Productive effective presentation is three-role-minimal under fair accounting.** The paper argues that any productive effectively presented symbolic formal system must answer the three role-questions somewhere in its counted apparatus.
3. **The roles are more stable than their carriers.** SKI, binary encodings, Turing machines, rewriting systems, proof systems, cellular automata, and similar presentations distribute the work differently, but the same dependency questions reappear once the full productive apparatus is counted.
4. **The physics-facing claim is conditional but substantive.** If a candidate physical theory is presented as a complete effective productive formal account, then it too must answer the role-questions somewhere. The paper does not claim that physical reality is formalizable or that the roles are physical ingredients.

## Why This Is Hard To Place

The topic crosses fields because the apparatus crosses fields. A productive formal presentation can involve notation, syntax, parsing, proof checking, operational rules, encodings, machine states, interpretation, and readout. Different disciplines usually study different parts of that apparatus.

Because of that, I am not looking for one reader to judge the whole project. The most useful response may be a partial one: a field label, a known nearby distinction, a better vocabulary, or a warning from one discipline's side of the problem.

## Where Different Readers Can Help

1. **Mathematical notation and practice.** Is the distinction between visible economy and operative economy already treated under an established name? Does the paper handle notation, parsing, and presentation apparatus in a way that fits existing work on mathematical notation and formal practice?
2. **Operational semantics and formal methods.** Is "counted productive apparatus" better stated in operational-semantics, abstract-machine, rewriting, or logical-framework vocabulary? Are parser, evaluator, transition convention, state discipline, and readout being grouped in a technically responsible way?
3. **Computability and compact universality.** Do the discussions of SKI, binary encodings, Rule 110, and small universal systems correctly distinguish computational universality from completeness of the presentation apparatus?
4. **Philosophy of computation and physical computation.** Is the physics-facing claim properly conditional? The claim is not that physics is digital or computational. It is that any complete effective productive formal account of physical dynamics would have to answer the same role-questions somewhere in its counted apparatus.
5. **Logic, proof theory, and foundations.** Is the lower-bound language appropriate, or should the result be framed as a necessary-role characterization or accounting theorem? Are the definitions sharp enough to avoid circularity?

## Evidence Base

The paper does not rely on a survey in place of proof. The proof is a dependency argument: a counterexample must show productive effective presentation without determinate formal presence, without effective transition, or without any counted discipline settling how transition applies to presence.

The case studies and pressure tests have a different job. They check whether the framework survives familiar systems where the roles are not cleanly visible: SKI and lambda calculus, binary encodings, Rule 110 and cellular automata, Turing machines, rewriting systems, proof calculi, parser/grammar systems, abstract machines, and self-executing universal-machine presentations. None of the examined cases defeats the premises; the apparent counterexamples relocate, fuse, or encode the required roles.

The research base is standard: computability and effective encoding; operational semantics; abstract state machines; rewriting; proof checking; compact universal systems; mathematical notation and formal-language practice; and physics-facing discussions of computation such as Gandy's principles for mechanisms and Deutsch's Church-Turing principle. The manuscript's proposed contribution is not a new model of computation. It is a role-accounting result drawn across those areas.

## Main Example: SKI

SKI combinatory logic is useful because it is familiar, universal, and visibly compact. But its printed combinator names do not map one-to-one onto alpha, beta, and gamma.

The mapping appears only when the full productive apparatus is counted: terms and application trees, parsing, reduction rules, arity discipline, evaluator behavior, and readout. In that sense, SKI is reducible to three productive roles, not to a one-to-one assignment between its three visible combinator names and those roles.

That is why the paper needs a role-accounting framework. Visible primitive bases show what a presentation names locally. They do not always show the minimal dependencies that make the presentation operate.

## Witness And Bridge

The paper gives a visible witness using three delimiter-shaped marks. The marks are only anchors. They do not compute by themselves. The counted parser, evaluator, transition convention, and readout do the operative work.

The witness is not meant to outperform SKI or replace existing calculi. It is meant to show role-complete presentation: a presentation in which formal objects, transition procedure, application conditions, and readout conventions are part of the counted apparatus rather than silently supplied from outside.

The Bridge Theorem says, roughly, that the finite operational content of an effectively presented symbolic formal system can be represented in such a visible witness presentation, provided the relevant parser, checker, evaluator, transition convention, and readout are counted. This is a preservation claim about finite operational behavior, not a claim that every original carrier arrangement is preserved.

## Main Risk

The main risk is circularity.

A skeptical reader may say that the paper defines productivity in terms of three roles and then proves that productivity needs those roles. The manuscript tries to avoid this by first defining productivity more neutrally: mechanically specified operation over determinate formal objects or results, with recoverable finite behavior. The role analysis is then supposed to ask what must be present for that neutral productivity to occur.

I am not fully certain that the current formulation closes the objection. One reason for sending this summary is to find out whether the theorem should be stated as a true lower-bound result, a necessary-role characterization, or a useful accounting theorem.

## Scope

The intended scope is effectively presented symbolic formal systems: formal logics, proof calculi, rewriting systems, automata presentations, lambda calculi, combinatory calculi, type systems, formal grammars, programming-language cores, symbolic protocols, formal games, and machine-checkable mathematical theories.

The paper does not try to capture informal mathematical understanding as such, non-effective access, semantic truth in full generality, or every external process later described in symbols.

Mathematics is treated as an important case, not the only case. Physical reality is mentioned only conditionally: if it had a complete effective productive formal presentation, then that presentation would have to answer the same role-questions somewhere. The paper does not claim that this antecedent is true.

## What I Am Looking For

The most useful feedback would be on placement and framing, especially from the reader's own area:

1. Is this already a known distinction under better terminology?
2. Are the three role-questions sharp enough, or are they too loose?
3. Is "lower bound" the wrong language here?
4. Is the bridge/witness construction doing real work, or only illustrating the point?
5. Which field, literature, or vocabulary is the right place to look next?

The intended contribution is a role-accounting framework for primitive economy in formal presentations: a way to compare systems by the productive dependencies they must answer, rather than by visible compression alone.
