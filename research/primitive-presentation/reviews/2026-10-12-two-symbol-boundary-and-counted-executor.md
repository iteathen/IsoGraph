# Two visible symbols, complete operational accounting, and the significance of recurring circularity

**Research discussion:** 2026-10-12.  
**Status:** adversarial hypothesis stress test and methodological clarification; not a physical no-go theorem or proof of a primitive-role lower bound.  
**Researcher:** Joshua Oshiro (three-symbol inquiry, two-symbol obstruction, repeated circularity as **sign/evidence** of possible boundary).  
**Assistant contribution:** counted two-symbol construction, separation of alphabet from total primitive apparatus, bounded verification, and counter-hypothesis analysis.  
**Source manuscript:** [Three Roles in Effective Symbolic Presentation](../evidence/source/primitive-presentation.md).  
**Research discussion evidence:** [DISCUSSION_LOG.md](../DISCUSSION_LOG.md).

## 1. Researcher's correction: “sign” does not mean proof

The researcher's intended chronology:

1. A three-mark SKI-compatible productive presentation was specified, with parser/evaluator and other apparatus expressly counted.
2. The next goal was to reduce to **two** while retaining a **complete** account of all machinery that makes the system operative, rather than claiming universal computation from printed bits alone.
3. The researcher could not construct a satisfactory two-symbol *primitive-role* reduction and could not establish its impossibility without repeatedly importing the desired third role or dependency into the proof.
4. That recurring self-reference/circular justification was seen as a **sign**—an evidential clue, **not an unarguable proof**—that this style of primitive reduction might be nearing a deeper foundation/self-grounding boundary.

This is a substantive observational claim about the research process. The current paper does not preserve enough exhaustive counterexample/proof-attempt data to establish a general impossibility, or even the empirical rate of failure across genuinely independent strategies. The author's confidence should not be confused with a theorem or statistical probability.

## 2. Four different quantities must be kept separate

- **Printed alphabet cardinality**: number of distinguishable object-language marks, e.g. 2 for {0,1} or 3 for the manuscript's {opening,closing,dot}.
- **Syntactic and operational specification**: formation grammar, parsing, application, reduction or update rules, evaluation scheduling, initial configuration, termination/output/readout.
- **Irreducible productive roles**: proposed independent dependencies remaining when a complete comparison of that operational apparatus is made under an explicitly specified primitive-role identity/decomposition criterion.
- **Physical self-grounding**: why a particular formal rule and its concrete interpreter correctly describes and is realized by the world that includes the interpreter and its measurement.

A two-mark alphabet with a counted interpreter satisfies one notion of *formally complete presentation*, but does not demonstrate only two independent primitive *roles* or an unconditioned physical self-sufficiency. Conversely, the three-mark witness also requires a counted parser/evaluator; it is not literally self-executing by the unaided glyphs.

## 3. A counted binary combinatory-logic presentation (stress test)

A known binary SK combinatory presentation admits the object grammar:

~~~text
Term ::= 00 | 01 | 1 Term Term
00 = K
01 = S
1xy = application of parsed term x to parsed term y
~~~

The parse is deterministically recoverable because the first bit selects an atom or application; in an atom the second bit disambiguates K or S; in an application the grammar recursively parses **exactly two complete subterms**. Program termination can be determined by complete consumption of a finite input string. The *metasyntactic* words Term, K, S, and x/y are names used to describe the language, not additional program tokens.

A **counted** operational specification must additionally define:

1. The source alphabet **and** the grammar above.
2. Admissible finite well-formed terms and rejection of incomplete/trailing-bit strings.
3. Reduction rules for parsed subterms:

~~~text
1100xy       -> x
11101xyz     -> 11xz1yz
~~~

4. Matching of x/y/z as complete parsed terms, not raw byte substrings; replacements only at genuine subterm boundaries.
5. A reduction strategy for deterministic runs where required (e.g. leftmost-outermost), treatment of nontermination, and explicit readout (e.g. the reached normal form, if any).
6. A concrete executor/interpreter if the target is an **implemented** computation rather than a mathematical rewriting relation.

This is not the claim “binary itself is Turing complete.” Rather, this is a two-symbol **object language plus explicitly counted grammar, evaluator and readout**. It is universal because SK combinatory logic is computationally universal, and the binary syntax preserves its application trees and reductions. The formal *definition* of the evaluator is still provided in a metatheory; a claim that all possible meta-level dependence has been eliminated is not supported.

### Direct comparison with the archived three-symbol witness

The manuscript's §7 three-symbol SKI witness defines a grammar and decode–reduce–encode evaluator **outside the mere glyphs**; it correctly treats these as part of the counted productive presentation.

A fair comparison must apply exactly that accounting standard to the binary system. One must either:

- Admit both as **finite formal presentations with counted rules and parsers** (then three visible signs are not necessary for universality); or
- Demand a far stronger notion of full *intrinsic* realization with no uninterpreted or independently supplied execution rules (then **both** constructions need to meet that new standard).

Admitting the three-symbol evaluator while disqualifying the two-symbol evaluator as “outside the alphabet” would make the desired lower bound definitional, not mathematical.

None of this disproves a hypothetical lower bound of three independently necessary **role families**. It does show that an impossibility assertion based solely on “two printed marks cannot delimit and compute” does not survive explicit prefix parsing and rule accounting.

## 4. Bounded computational evidence

The included [binary_combinatory_accounting_probe.py](evidence/binary_combinatory_accounting_probe.py) implements an explicit parser, encoder, K/S reductions, leftmost-outermost reduction selection, a finite readout representation, and malformed-term rejection.

A bounded check of the construction yielded:

- 550 distinct K/S application trees with at most four application nodes, encoded and decoded without collisions;
- three sample reductions matching expected K/S rewrites;
- eight selected incomplete or trailing-bit strings rejected.

The expected results are archived in [binary_combinatory_accounting_results.json](evidence/binary_combinatory_accounting_results.json). The finite test does not independently prove universality, interpreter-free existence, minimal role-count, or any physical ontology claim. The underlying universality of SK is established independently in combinatory logic.

## 5. Why the repeated circularity still matters

Possible explanations for repeated circular proofs include:

- **True impossibility** of a specified two-role complete primitive system;
- **Definitional circularity** from stipulating three dependencies, then counting two-function mechanisms as satisfying all three;
- **Changing the accounting boundary** when a binary candidate relocates information into a parser or state;
- **Open completeness/identifiability problems** from attempting to ground a formal description of reality using only resources it describes;
- **Limited proof or construction search** even if the desired reduction exists.

These alternatives have different falsifiers and consequences. Repeated circularity is **evidence of an obstruction in the attempted approach**; deciding *which* obstruction requires independent comparisons. It is not negligible, but it cannot uniquely identify a Gödel-style **physical** boundary without proving the requisite internal self-reference and totality conditions.

The pattern might be more general than “three versus two”: whenever a formal description attempts to eliminate the last external interpreter or self-certify its own truth of reality, the justification can recur at a larger metalevel. This is a promising self-grounding hypothesis, not presently an impossibility theorem applicable to all formalized physics.

## 6. A discriminating next test

Freeze an independent comparison standard before searching for a reduction:

- **Target A: Two alphabet signs.** Satisfied by counted binary combinatory syntax and rewriting; no proof of a 3-glyph lower bound.
- **Target B: At most two primitive role families.** Requires formal definition of *role independence*, admissible fusions/decompositions, and exact behavioral equivalence; the current manuscript has not demonstrated an impossibility.
- **Target C: Completely intrinsic generator with no auxiliary interpreter, rule metadata, or external meta-assumptions.** Must state whether “intrinsic” denotes a formal object, executable interpreter, physical dynamics, or its own truth certification. Test three-mark and two-mark systems alike. This may surface a genuine metatheoretic or physical self-grounding issue, but is a different problem from alphabet cardinality.

A successful counterexample must be allowed to **falsify** the proposed minimum, not be re-labeled as secretly having three independent roles solely because the original taxonomy asked three questions.

## Disposition

The user's “sign” interpretation is preserved precisely: evidence of a candidate boundary, not a proof of its existence. The two-symbol construction rebuts a narrow alphabet-level impossibility, but **does not settle** the stronger irreducible-role or internal self-grounding problems motivating the original work. The key repair is to establish which claim is being tested before the word “impossible” has meaning.

## References and provenance

- Source manuscript, §2.1–2.2 and §7; historical formulation retained intact.
- [Binary combinatory logic operational definition](https://esolangs.org/wiki/Binary_combinatory_logic) — explicit two-mark grammar and K/S rewrite patterns.
- John Tromp, [Binary Lambda Calculus](https://tromp.github.io/cl/Binary_lambda_calculus.html) — independent related two-mark universality formalism with explicit self-delimiting description, interpretation, and I/O rules.
- [Gödel's Incompleteness Theorems](https://plato.stanford.edu/entries/goedel-incompleteness/) (Stanford Encyclopedia of Philosophy) — precise restrictions on what formal incompleteness asserts.
- For the broader physical epistemic issue, see [Reflexive physical inference](2026-10-12-reflexive-physical-inference-boundary.md), which also identifies Wolpert's directly relevant work. No part of this review asserts the author's global-origin conclusion as a settled theorem.
