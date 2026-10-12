# Three Roles in Effective Symbolic Presentation

## Fair Accounting, Local Syntax, and Visible Role-Carriers

**Josh Oshiro**  

*Inquiry submission draft.*

---

## Abstract

This paper asks what remains primitive in a formal presentation once visible symbols, encodings, parsers, evaluators, and operational roles are all counted.

Within the fair-accounting framework developed here, the paper argues that productive effectively presented symbolic formal systems must answer three primitive dependency questions somewhere in their counted apparatus: **α** asks what supplies effective difference or transition, **β** asks what supplies determinate presence, and **γ** asks what settles how transition bears on presence. The claim applies only insofar as finite objects, role distinctions, formation rules, transformations, derivations, evaluations, or checks form part of an effectively presented symbolic formal system. It does not claim to capture non-effective access, informal mathematical understanding as such, or every external process later described in symbolic terms.

The argument does not introduce a new universal calculus. It isolates a role-accounting point: alphabetic compression is not role elimination. In the compressed systems considered here, one- and two-token universal encodings work by relocating or multiplexing role distinctions into parser state, transition rules, evaluator conventions, boundary conditions, or readout apparatus. Under fair accounting, those dependencies remain part of the productive presentation.

When the three dependency answers are carried by distinct visible primitive marks without hidden demultiplexing, the role lower bound appears as a three-symbol lower bound for faithful role-explicit visibility. A delimiter-shaped witness makes this concrete: three visible marks serve as local role-anchors inside a counted grammar and evaluator, and an explicit effective encoding transports SKI combinatory logic into that witness syntax. The glyphs themselves are not privileged; the parser, evaluator, transition convention, and readout apparatus operationalize the visible anchors.

Mathematics is an important instance, not the full scope of the claim. The claim applies to effectively formalized mathematics only insofar as mathematics is presented through symbolic formal systems with effective syntax and mechanically checkable finite derivations. More broadly, primitive alphabets and presentation apparatuses are layer-relative role-carrier systems: foundational accounting must count not merely surface marks, but the productive roles carried by marks, rules, conventions, and apparatus.


**Keywords:** symbolic formal systems; computability; primitive symbols; presentation apparatus; combinatory logic; operational reducibility; Gödel coding; Turing completeness; role-explicit visibility; fair accounting; productive presentation

---

## 1. Introduction

Formal systems often present themselves through visible alphabets. A compact first-order set-theoretic vocabulary, for example, may use marks such as

```text
=  (  )  ¬  ∧  ∀  ∈
```

or a related finite basis from which further logical and mathematical notions are defined. Such alphabets are real primitives at the descriptive layer: the notation starts with them, readers manipulate them, and proof systems assign them formal behavior.

The claim is not limited to mathematics. Effectively presented symbolic formal systems are **three-role-minimal under fair accounting**: any such system, when productive, must answer three dependency questions somewhere in its counted productive apparatus: what carries effective transition, what supplies determinate presence, and what settles the determinacy of transition over presence. No proper subset suffices unless the missing question is answered elsewhere in counted apparatus. Conversely, the finite operational content of any such system can, in principle, be effectively represented inside an operationally faithful three-visible-carrier realization, with the required parser, evaluator, transition convention, and readout apparatus counted rather than treated as free background.

A symbolic formal system is in scope when its finite objects, role distinctions, formation rules, transformations, derivations, evaluations, or checking procedures are effectively representable. This includes ordinary formal logics, proof calculi, rewriting systems, automata presentations, lambda calculi, combinatory calculi, type systems, formal grammars, programming-language cores, symbolic protocols, formal games, and machine-checkable mathematical theories, insofar as their relevant operations are effective. Mathematics is therefore an important special case, not the boundary of the thesis.

The motivation for role-minimality is not aesthetic compression. Ordinary primitive bases reveal what a presentation names visibly; they do not by themselves reveal the minimal dependencies that make the presentation operate. SKI combinatory logic is instructive for this reason: its printed combinator names do not map cleanly one-to-one onto the three roles, but once its full productive apparatus is counted--application structure, parsing, reduction rules, arity discipline, evaluator behavior, and readout--the role questions reappear. This is why the paper uses a productive-role framework rather than ordinary visible-basis counting.

The broader motivation is discovery-oriented. Across effective formal presentations, visible carriers vary: combinators, strings, states, rows, proof objects, transition tables, parsers, and evaluators distribute the work differently. The claim defended here is that, within effective productive presentation, the dependency questions are more stable than those local carriers. That stability is the methodological payoff of the paper: the roles provide a disciplined comparison target for other formal domains, including formal models used in physics, whenever those domains are presented as effective productive formal systems. This is not a proof that physical reality is formalizable, nor a claim that the three roles are physical entities, forces, or laws. It is a conditional search proposal with force inside its antecedent: wherever a candidate effective formal account supplies productive change, determinate presence, and determinate application or readout, fair accounting should ask where those roles are carried.

**Central Claims.**

1. **Visible primitive economy is not productive-role economy.** A presentation can have a tiny visible alphabet while relying on parser, evaluator, state, boundary, application, or readout apparatus to do essential productive work.
2. **Productive effective presentation is three-role-minimal under fair accounting.** Any productive effectively presented symbolic formal system must answer the α, β, and γ dependency questions somewhere in its counted apparatus.
3. **The roles are more stable than their carriers.** SKI, binary encodings, Turing-machine presentations, rewriting systems, proof systems, cellular automata, and other effective presentations distribute the work differently, but the same dependency questions reappear when the productive apparatus is counted.
4. **The physics-facing claim is conditional but substantive.** Any candidate complete effective productive formal account of physical dynamics would have to answer the same dependency questions somewhere in its counted apparatus. The carriers may be unfamiliar, hidden, fused, or relocated, but the dependency questions cannot simply disappear.

**Evidence Base for the Central Claims.**  
The support offered here is not an empirical survey of all possible systems. It is a convergence argument from standard formal practice, plus a dependency proof. No finite list of examples can rule out every imaginable counterexample. Instead, the paper identifies what any counterexample would have to do: exhibit productive effective presentation without determinate formal presence, without effective transition, or without any counted discipline settling how transition bears on presence. The examined pressure cases do not do that. They relocate, fuse, or encode the roles.

```text
claim supported                         established source of support
visible economy differs from role work  notation and representation studies;
                                        descriptional complexity and small systems
                                        (Dutilh Novaes 2012; Schlimm 2025;
                                        Tromp 2006; Neary and Woods 2009)

formal productivity uses presence,      Turing machines, operational semantics,
transition, and bearing discipline      abstract state machines, rewriting,
                                        proof checking, and model checking
                                        (Turing 1936; Plotkin 1981;
                                        Gurevich 2000; Baader and Nipkow 1998;
                                        Clarke, Grumberg, and Peled 1999)

small universal systems do not remove   SKI/lambda calculus, binary calculi,
productive apparatus                    Rule 110, tag systems, and small
                                        universal-machine work
                                        (Curry and Feys 1958; Barendregt 1984;
                                        Cook 2004; Tromp 2006;
                                        Neary and Woods 2009)

role-carriers move across layers        encoding, Gödel numbering, operational
                                        simulation, ASMs, and internalized
                                        universal-machine interpretation
                                        (Gödel 1931; Turing 1936;
                                        Gurevich 2000; Copeland 2024)

physics-facing use is conditional       physical/computational Church-Turing
rather than a physical-entity claim     discussions and mechanistic principles
                                        show the legitimacy and difficulty of
                                        formulating computation-like constraints
                                        on physical processes
                                        (Gandy 1980; Deutsch 1985;
                                        Copeland 2024)

truth-about-reality is a boundary       Gödel/Tarski-style limitative results
not crossed by internal consequence     support the general warning that formal
alone                                   consequence and semantic/truth grounding
                                        are distinct issues
                                        (Gödel 1931; Tarski 1936)
```

This limitation is not special to the present argument. Every formal system, insofar as it claims truth about what is real, depends on some bridge between internal formal consequence and real-world correspondence. That bridge may involve interpretation, measurement, implementation, empirical calibration, causal coupling, or some other grounding relation. A formal system can represent such a bridge as further formal structure, but then the same question reappears at the widened boundary: why that formalized bridge is truth-apt for reality. The present paper can partially name that boundary, but it does not cross it.

The scope of the claim concerns local answers to dependency questions, not a complete dictionary of possible realizers: once a productive layer and accounting regime are fixed, some counted feature, or connected set of features, must answer each primitive dependency question.

This paper therefore distinguishes two layers. The **local presentation language** consists of the marks, terms, grammar, parser, evaluator, conventions, and readout by which a particular system presents formal content. The **productive-role layer** consists of the counted dependencies by which the presentation operates. This is not a general semantic theory: semantic interpretation matters here only when it is part of the effective apparatus being counted. A local sign, rule, or state may realize α, β, or γ, but it is not identical with the role it carries.

The role analysis should not be read through ordinary object/action/rule intuition. In compressed, encoded, self-executing, or layer-shifting presentations, claimed answers to the required dependency questions may be assigned to structures that do not resemble familiar syntactic components. The argument therefore relies only on the functional dependency questions stated above and on fair accounting of whatever counted apparatus is claimed to answer them.

In the sense used here, primitiveness is a same-layer dependency claim. A symbol is primitive at a layer when the role it carries is one of the starting resources of that layer rather than a role derived from other counted resources in that same layer. If the role is derivable from those resources, the symbol may remain useful as notation, abbreviation, or interface, but it is not primitive in the layer being counted.

Surface compression is not formal economy. A reduced alphabet is a reduced primitive basis only when the roles removed from the visible marks are not reintroduced or derived elsewhere in the same counted apparatus. The surface presentation must be honest: it cannot claim economy by hiding assumptions, abstractions, or role-bearing machinery outside the count.

Three-role minimality is the primary lower bound. Its visible-symbol form follows for faithful role-explicit presentations: if a presentation represents each required primitive role-family by a distinct visible primitive mark, then at least three visible primitive marks are required. This is not a weakening of the role claim. It separates the universal dependency from one particular mode of carrying it: visible marks.

The letters α, β, and γ are placeholders, not names for mechanisms. They are labels for required functional roles in an effective presentation, not proposed physical entities, mathematical primitives, particles, forces, or laws. A compact delimiter-shaped visible witness is used because it makes the delimiter point concrete: delimiter-like marks can be assigned operational primitive roles while still functioning as delimiters in the local syntax. By an explicit effective grammar, this witness syntax can encode SKI combinatory logic, and therefore can support universal computation. The glyphs themselves are not privileged; they witness that the three required dependency answers can be made visible while retaining universal computational power.

The argument fixes one accounting rule: roles count where they are carried. From that rule it derives three-role minimality for productive effectively presented symbolic formal systems, then shows the visible bound is tight by an explicit SKI encoding. The later examples test the same accounting rule against familiar alphabets, syntax, delimiters, binary token renaming, and self-execution as internalized interpretation.

The paper is organized as follows. Sections 2-7 give the definitions, accounting rule, neutral apparatus core, effective encoding, three-role minimality theorem, visible witness, and bridge theorem. Sections 8-18 apply that argument in familiar and compressed formal settings.

## 2. Descriptive Minimality, Productive Roles, and Presentation Apparatus

The important distinction is not between small and large alphabets. It is between visible marks and the productive roles those marks carry.

**Descriptive minimality** concerns the economy of the notation used to state, prove, define, or communicate formal content.

**Productive-role minimality** concerns the dependency questions that must still be answered in the counted apparatus after replaceable marks have been removed, encoded, multiplexed, or relocated.

A formal language may be descriptively economical while still depending on roles supplied by grammar, parser state, proof-checking rules, transition rules, boundary conventions, output conventions, or an interpreter. A primitive alphabet is therefore only one component of a broader presentation apparatus.

The definitions below follow a limited-definition discipline. When a term is introduced for logical reasons, the definition gives the minimal role-condition needed by the argument. When a term is introduced for accounting or exposition, the definition gives only what that use requires. In both cases, the description identifies a feature of the relevant role-family, not the complete set of accurate descriptions of that role-family. The aim is to fix minimum and maximum constraints: the minimum condition without which the term is not being realized, and the broadest defensible range of local realizers that can satisfy that condition.

**Definition 0: Primitive and Derivative Relative to a Layer.**  
Here, **primitive** does not mean absolutely underivable. A feature is primitive relative to a presentation when that presentation treats the feature's role as an undecomposed starting resource at that layer. A feature is derivative relative to a substrate when that feature's role can be carried by other admitted resources of the substrate through an effective encoding, generation, simulation, or operation. Thus primitive status is indexed to layer, role, and admissible encoding: primitive means undecomposed here, not underivable anywhere.

This definition is justified by the need to avoid an absolute reading of primitiveness. It fixes only the layer-relative feature needed for the argument, not every legitimate use of the word primitive.

**Definition 1: Presentation Apparatus.**  
The **presentation apparatus** of an effectively presented formal system is the effectively specified means by which the system's formal objects and formal roles are made available at the descriptive layer.

This definition is role-based rather than mark-based. A feature belongs to the presentation apparatus not because it has a particular typographical appearance, but because the formal system uses it to make operative distinctions available at the descriptive layer.

This is an accounting term. It identifies the machinery relevant to effective presentation, not every physical, psychological, or social condition under which a formal system might be used.

**Definition 2: Formal Role.**  
A feature has a **formal role** when variation in that feature can affect mechanically specified behavior of the system.

This includes effects on well-formedness, structural interpretation, binding, admissible transformation, proof checking, evaluation, or any other effective operation, but the list is illustrative rather than definitional. The clamp is functional: if changing the feature cannot change any mechanically specified behavior, the feature has no formal role in the present sense.

If a feature belongs to the presentation apparatus and has an effectively specified formal role, then it belongs to the operative formal layer. When that role is mechanically specified, it can be encoded with the rest of the system under an effective encoding into a universal substrate.

This definition is justified by the counting problem. It marks the minimum feature that makes something operative for the present argument: mechanically relevant variation.

Formal roles are therefore relation-indexed. A carrier has a role only as part of a specified presentation relation. If the same carrier is exported to, encoded by, interpreted inside, or coupled to another presentation, its role must be assessed again in that second layer rather than inherited from the first.

**Definition 3: Operable, Readable, and Productive Formal Presentation.**  
A presentation is **operable** when it supplies at least one mechanically specified effective operation over finite formal items.

A presentation is **readable** when it supplies determinate formal presence from which a formal item, condition, result, or output can be identified or recovered.

Transitions, transformations, derivation steps, evaluations, checks, parses, and updates are examples of operability. Expressions, configurations, proof objects, base conditions, results, and outputs are examples of readable presence. The definitions are clamped by function: operability requires effective operation; readability requires determinate recoverable presence.

A presentation is **productive** when it is both operable and readable:

```text
Productive(X) := Operable(X) and Readable(X).
```

This definition intentionally does not name the three-role conclusion. It only says that the presentation has mechanically determined operation and determinate formal objects/results. The three-role lower-bound argument below derives the required dependencies for such productivity under fair accounting.

This is a domain-selection definition. It fixes the class of presentations addressed by the theorem; it is not a theory of mathematical understanding.

**Definition 4: Role-Explicit Presentation.**  
A presentation is **role-explicit** when the answers to the α, β, and γ dependency questions are carried by specified counted features of the presentation apparatus rather than by uncounted background. A presentation is **visibly role-explicit** when those answers have distinct visible primitive anchors. It is **faithfully role-explicit** when those visible anchors are operationalized by counted apparatus rather than by uncounted demultiplexing, interpretation, or execution.

This definition is introduced for comparison. It says only enough to compare hidden, multiplexed, and visible role-anchors; it does not require that every productive presentation display the roles visibly, and it does not treat visible marks as productive apart from counted apparatus.

**Definition 5: Self-Executing Presentation.**  
A presentation is **self-executing** when the apparatus that carries execution is itself included in the counted formal presentation. Computation then proceeds by the presentation's own counted transition discipline over its own counted configurations. In this accounting sense, a self-executing presentation may still be abstract; the point is not independent physical implementation, but the absence of an uncounted external executor.

This is an accounting condition, not a physical implementation claim. It is used only to distinguish presentations that count their executor from presentations that leave execution outside the formal apparatus.

**Definition 6: Fair Accounting / Counted Productive Apparatus.**  
Fair accounting is the no-hidden-executor condition. A presentation is counted fairly when its productive apparatus is counted honestly, truly, and completely. It is **honest** when no required productive dependency is hidden outside the count. It is **true** when the counted apparatus matches what the presentation actually uses to produce formal behavior. It is **complete** when every dependency actually required for that behavior is counted, whether visible or hidden, named or unnamed, anticipated or not anticipated by the present vocabulary.

This definition is justified by the comparison being made. Alphabet-size, visible-symbol count, and role-count can only be compared if the productive machinery on which the presentation depends is included in the accounting.

Let `A(X)` denote the full counted apparatus-role set of a presentation `X`: the roles actually needed for `X` to produce formal computation or formal operation. A role is counted whenever productivity depends on it, whatever carrier or implementation supplies it. This convention does not add new operative machinery to a presentation; it classifies the productive structure on which the presentation already depends rather than treating that structure as free background.

The notation `A(X)` is indexed to the presentation boundary being counted. If a presentation `X` is coupled to an adjacent presentation `Y`, fair accounting may be applied to `X`, to `Y`, or to the composite presentation, but the carrier classifications are recalculated for the chosen boundary. The same mark, rule, table, state, or interpreter may supply one role in `X` and another role in `Y` or in the composite system.

Fair accounting is not a rival to ordinary alphabet-size counting; it is a correction for cases where alphabet-size counting ignores machinery on which the encoding depends. A presentation may have a small visible alphabet while relying on a larger productive apparatus. If a required productive dependency is carried by a transition discipline, parser, machine configuration, boundary convention, evaluator, executor, or any other counted carrier, that dependency belongs to the counted apparatus even if no separate glyph names it. In particular, the resolution/application role need not be a separate printed symbol or separate module. The claim is only that the dependency must be counted somewhere.

### 2.1 Neutral Productive-Apparatus Core

Before introducing the symbols α, β, and γ, the same dependency structure can be stated in neutral apparatus vocabulary. A productive effective presentation must answer at least:

```text
C: determinate presence;

T: effective transition;

D: determinacy of transition over presence.
```

This schema is not yet primitive-role terminology. It is a neutral description of what is needed for a presentation to do formal work rather than merely display uninterpreted marks. The terms are intentionally broad, but each is clamped by function: `C` supplies something determinate for formal operation to concern or recover; `T` supplies effective operation; `D` settles how the operation bears on what is determinate. A productive presentation may implement these dependencies in many ways, and the schema does not assume in advance that each dependency must have a separate carrier. Where an implementation treats one carrier as doing several kinds of dependency work, fair accounting counts each claimed dependency there. Such implementation fusion, if present, does not remove a dependency; it identifies where the relevant dependency work is being assigned.

This decomposition is not offered as a new machine model. It abstracts a familiar pattern in operational accounts of computation: Turing machines use configurations and transition tables; structural operational semantics presents behavior by configurations and transition rules; abstract state machines describe algorithms as state changes governed by rules; and rewriting systems operate on objects by rewrite relations or rules (Turing 1936; Plotkin 1981; Gurevich 2000; Dershowitz and Jouannaud 1990; Baader and Nipkow 1998). These frameworks do not prove the terminology used here, but they support the operational pattern the neutral schema isolates.

**Neutral Non-Collapse Lemma.**  
No proper subset of `{ C, T, D }` suffices for productive effective presentation unless the missing dependency question is answered by additional apparatus, in which case fair accounting counts it where it is carried.

**Proof.**  
With `C` alone, there is determinate presence, but no effective transition and no determination of how transition bears on that presence. With `T` alone, there is possible effective transition, but no determinate presence for it to concern and no determination of its bearing on such presence. With `D` alone, there may be a way of settling the bearing of transition on presence, but no transition and no presence to relate.

With `C` and `T` but without `D`, there may be determinate presence and effective transition, but the presentation does not yet settle how the transition bears on that presence. If a supposedly complete transition already settles that bearing, then it is carrying `D` as well as `T`, and fair accounting counts both dependencies.

With `C` and `D` but without `T`, there may be determinate presence and a way of settling how transition would bear on it, but no effective transition occurs. If an apparent convention changes or advances what is present, then it supplies the missing `T` dependency.

With `T` and `D` but without `C`, there may be effective transition and a way of settling its bearing, but no determinate presence for that transition to concern or produce. If an apparent input, state, object, or result is present, then the missing `C` dependency has been supplied.

Thus productive effective presentation must answer all three dependency questions. Apparent counterexamples either fail productivity or assign missing dependency work to other counted apparatus, including cases where an analysis treats one carrier or mechanism as doing several kinds of work. Under fair accounting, such carriers are counted by the dependencies they are claimed to supply, not by the number of visible marks or modules used. ∎

The primitive-role terminology names this neutral structure:

```text
T -> α, effective transition;
C -> β, determinate presence;
D -> γ, determinacy of transition over presence.
```

The mapping is the paper's role-name assignment for the dependencies isolated by the neutral apparatus schema. The rest of the paper uses these labels because they are meant to track the same abstract structure across symbols, proof systems, parsers, evaluators, machine configurations, encodings, and self-executing presentations.

The main theorem should therefore be read as an accounting theorem inside the fair-accounting framework developed here. It does not replace the standard theorems of computability theory. It states which productive dependencies must be counted, shows that ordinary alphabet compression does not remove those dependencies, and shows that the relevant finite operational content is preserved under the standard effective encodings used below.

### 2.2 Formal Role-Counting Core

The three-role claim is a dependency claim over productive presentations rather than an informal symbol-counting slogan. The full counted apparatus-role set of a presentation is written as `A(X)`. For compact formal notation, write the proposed irreducible productive-role basis as:

```text
B_3 = { α, β, γ }
```

`B_3` is bookkeeping notation for the three role-families isolated by the dependency argument. It is not a complete inventory of formal roles, and it is not a claim that the bare symbols `α`, `β`, and `γ` form a complete system.

**α: effective transition role-family.**  
The minimum condition for α is effective transition: some counted feature must supply mechanically determinate change, advance, transformation, derivation, update, evaluation, or step. Its maximal defensible scope is any local realizer that supplies such transition in the counted presentation, including a visible mark, rule, evaluator, machine update, parser behavior, rewrite relation, or encoded procedure. This definition is warranted by operability: without some α-realizer, the presentation has no mechanically specified operation. The description identifies the transition feature required by the argument, not the full set of accurate descriptions of α.

**β: determinate presence role-family.**  
The minimum condition for β is determinate recoverable presence: some counted feature must supply something for operation to concern, preserve, transform, halt on, emit, or read. Its maximal defensible scope is any local realizer that supplies such presence, including an object, state, configuration, expression, proof object, base case, output, encoded rule, or machine datum. This definition is warranted by readability: without some β-realizer, there is no determinate formal item or result for the presentation to operate on or recover. The description identifies the presence feature required by the argument, not the full set of accurate descriptions of β.

**γ: determinacy-of-bearing role-family.**  
The minimum condition for γ is determinate bearing: some counted feature must settle how transition bears on determinate presence. Its maximal defensible scope is any local realizer that determines application, parsing, rule-use, boundary, completion, acceptance, readout, or transition-over-state in the counted presentation. This definition is warranted by productivity: α and β together do not yet determine a formal step unless something settles their bearing. γ is not a rule in the narrow sense, though rules may realize it. Parser state, arity discipline, evaluator context, boundary convention, or machine organization may also realize it. The description identifies the bearing feature required by the argument, not the full set of accurate descriptions of γ.

**Principle of Necessary-Role Characterization.** α, β, and γ are maximally general role-primitives, so the paper does not try to give a universal inventory of their realizations. A precise description is local to a chosen presentation layer and accounting regime. The local presentation language supplies examples and carriers; the productive-role layer supplies only the necessary role test. The invariant claim is this: every productive presentation must answer what supplies effective difference, what supplies determinate presence, and what settles their bearing.

For a given presentation `X`, the notation `Requires(X, α)` should therefore be read as: `X` must have the α-dependency question answered by some counted local realizer. Likewise for `β` and `γ`. The abstract role-name remains invariant, but its local carrier and exact operational description are fixed only after the layer, presentation, and accounting regime have been specified.

The role-families are intentionally broad because they are minimal dependency families, not implementation types. If they were defined as narrowly as ordinary mechanisms such as parser, state register, rule table, delimiter, transition function, or output convention, they would no longer capture the common productive structure shared across proof systems, automata, calculi, encodings, interpreters, and self-executing presentations. Their breadth is therefore expected, but it is not unconstrained. Each local characterization is governed by a functional criterion: α concerns effective transition; β concerns determinate presence; γ concerns the determinacy of transition over presence. The terms are meant to be broad enough to cover productive effective presentations, narrow enough to classify dependencies by function within a fixed layer, and explicit enough that examples can be checked without relying on typographical appearance.

Terms such as origin, opening, point, state, result, and resolution are mnemonic glosses, not load-bearing definitions. The operational characterizations above guide the theorem locally: α supplies effective transition, β supplies determinate presence, and γ makes transition determinate over presence in the presentation layer being counted. The glosses may help identify the roles in known systems, but they do not add claims about physical composition, and the theorem does not depend on a complete universal dictionary of primitive-role realizations. A transition may realize α, a state may realize β, and a rule may realize γ, but α is not merely transition, β is not merely state, and γ is not merely rule.

This basis is therefore role-invariant but carrier-relative: the abstract roles are invariant, while their carriers are mobile. A mark, expression, rule, state, parser convention, transition table, interpreter, or machine component may realize different primitive roles in different layers or arrangements. What matters under fair accounting is not what a carrier is in isolation, but which dependency it supplies in the counted productive layer.

α, β, and γ belong to the productive-role layer. The visible witness syntax belongs to a local presentation language. The syntax matters because it shows that the three dependencies can be given distinct visible anchors, but the lower-bound claim concerns the roles, not the glyphs.

The order `{ α, β, γ }` is conventional rather than formally load-bearing. It is used consistently because it matches the explanatory sequence of the role-explicit presentation: α supplies transition, β supplies determinate presence, and γ settles how transition bears on presence. The dependency claim concerns all three questions being answered, not their temporal or absolute priority.

**Principle of Primitive-Role Carrier Relativity.** The primitive roles are functionally distinct but carrier-relative. Role assignment is indexed to a presentation layer and accounting boundary, not to a carrier in isolation. A productive presentation must answer the α, β, and γ dependency questions somewhere in its counted apparatus, but in this framework no carrier possesses one of these roles absolutely across all layers. A rule may realize γ at the object layer because it resolves how transition applies to point; the same rule may realize β at a meta-layer when it is encoded as a determinate object of inspection, proof, transformation, or simulation; and a loaded rule may realize α when it becomes the source of formal transition. The same mobility can occur between connected adjacent systems. This is treated as part of the theory's account of how formal systems operate across encoding, interpretation, compilation, simulation, and self-execution.

This point is easy to misread if the roles are treated as a static hierarchy of marks, rules, interpreters, and meta-interpreters. The accounting here does not assign roles by rank in such a hierarchy. It asks, within the selected productive boundary, which dependency a feature supplies. When the boundary changes, the classification may change with it. This is not a weakness in the foundation; it follows from doing logical inference over highly abstract role-concepts whose exact realizers are fixed only relative to a presentation layer and accounting regime.

The point of writing these as role-families is not to blur them, but to avoid a false implementation-specific reading. A point, configuration, output, and base object need not be the same component in every system; each can fall under the same determinate state-bearing dependency family when it supplies something determinate for formal operation to transform, preserve, halt on, emit, or read. Likewise, rule, application, boundary, parsing, and completion need not be one printed mark or one module; each can fall under the same resolution dependency family when it determines how transition applies to determinate presence or how formal structure is completed or read.

**Local Modal Indexing and Shared Interfaces.**  
The chosen accounting boundary should not be imagined as a one-dimensional stack of components. A counted presentation may contain connected local modes such as reading, matching, applying, updating, checking, accepting, and outputting. Role assignment is indexed to these local dependency relations as well as to the overall presentation boundary. A carrier at the interface of two connected modes may be credited with different dependency work relative to those modes: for example, resolving how determinate presence is taken up for operation in one relation, and participating in effective advance in the next. The theorem is neutral about whether any proposed sharing analysis succeeds in a particular case. It says only that if a carrier is credited with several kinds of dependency work, fair accounting counts those claimed dependencies there; if it is not doing that work, the dependency must be answered elsewhere.

This point explains why concrete systems often appear to blur α and γ without collapsing the dependency questions. In a Turing-machine presentation, the transition table is read relative to a current configuration and enacted relative to the next configuration. In a cellular automaton, a local rule and neighborhood convention resolve present cell values for update and also participate in producing the next row or generation. In SKI and lambda reduction, arity, redex selection, substitution discipline, and rewrite clauses settle admissibility relative to a term and participate in contraction when applied. In proof checking, an inference schema and its side conditions settle the bearing of premises on a conclusion and participate in derivation extension when the rule is accepted. These examples do not prove an additional theorem about universal role-sharing; they clarify the accounting discipline. The same implementation unit may sit at a shared interface, while the dependency questions remain distinct.

Representative stress tests support the same reading:

```text
presentation layer          β: presence              α: advance              γ: bearing discipline
Rule 110 / CA               row, cells, neighborhoods next row/generation     neighborhood, rule, synchrony
Turing machine              tape, head, state         machine step            table lookup, halt/readout
SKI / lambda calculus       term/application tree     contraction/reduction   arity, redex, substitution
proof calculus              formulas, proof states    inference/check step    rule schema, side conditions
parser / automaton          input, stack, state       parse/state advance     grammar or transition relation
nondeterministic system     current configuration     admissible branch step  allowed relation, acceptance
```

The table is illustrative rather than load-bearing. Its purpose is to show that the role definitions are not tuned only to one witness system. Across these examples, β is formal presence inside the counted presentation, α is effective advance or productive difference, and γ is admissible bearing, application, boundary, acceptance, or readout discipline. In nondeterministic, relational, stochastic, or proof-search settings, γ need not select a unique successor; it may settle an admissible relation, family, distribution, or search discipline.

Use `X` below for an arbitrary presentation and reserve **β** for the point/state-bearing primitive role. Write:

```text
Operable(X)
```

when `X` supplies at least one mechanically specified effective operation over finite formal items. Write:

```text
Readable(X)
```

when `X` supplies determinate recoverable formal presence. Write:

```text
Productive(X) := Operable(X) and Readable(X).
```

Write:

```text
Universal(X)
```

when `X` can simulate any effective computation. Write:

```text
ProductiveUniversal(X) := Productive(X) and Universal(X).
```

Define role-dependence as follows:

```text
Requires(X, r)
```

means that the dependency question named by role `r` must be answered somewhere in the counted apparatus for `X` to determine the relevant productive behavior. The clamp is counterfactual: if removing `r` from the counted apparatus leaves the relevant productive behavior undetermined, then `X` requires `r`. This is a dependency claim about the presentation apparatus, not a claim about literally deleting symbols from already-written expressions.

The fair-counting convention can then be written:

```text
Fair(X) := for every role r, if Requires(X, r), then r ∈ A(X).
```

The lower-bound claim is not that the entire role universe of formal presentation is exactly `B_3`. A given presentation may contain many additional roles. Nor is the claim that the bare names `α`, `β`, and `γ`, without effective rules and carriers, constitute a complete formal system. The three-role basis is not a complete inventory of all formal roles; it names the minimal irreducible dependency questions that every productive effective presentation must answer under fair accounting. In bookkeeping notation, the claim is that the three-role basis is included in every fair-counted productive apparatus:

```text
For every X,
if Productive(X) and Fair(X), then B_3 ⊆ A(X).
```

Equivalently:

```text
For every X,
if Productive(X) and Fair(X), then
Requires(X, α) and Requires(X, β) and Requires(X, γ).
```

The universal case is a direct specialization:

```text
For every X,
if ProductiveUniversal(X) and Fair(X), then B_3 ⊆ A(X).
```

The connection between roles and visible symbols is not assumed; it is defined by a realization relation. Let `Σ_X` be the visible primitive alphabet of a presentation `X`. A visible primitive symbol is a concrete carrier; a productive role is an abstract functional dependency. Write a realization map as:

```text
ρ_X : Σ_X -> Pow(A(X))
```

where `Pow(A(X))` is the powerset of the full counted apparatus-role set. Thus a visible symbol may carry one role, several roles, or no required productive role. Multiplexing is allowed only when the demultiplexing apparatus is counted.

Write:

```text
RoleExplicitVisible_3(X)
```

when every role in `B_3` has some visible primitive anchor in `X` rather than being supplied only by non-visible apparatus.

Write:

```text
FaithfulVisible_3(X)
```

when `RoleExplicitVisible_3(X)` holds and the visible anchoring of `B_3` is operationally faithful, distinct, and non-degenerate. Here **operationally faithful** means faithful to finite operational content: finite objects, well-formedness behavior, finite step behavior, accepted finite derivations or evaluations, and output recovery. It does not mean that the visible marks act without counted parser, evaluator, transition, or readout apparatus.

For faithful role-explicit visibility:

```text
1. every role in `B_3` has at least one visible primitive anchor;
2. no role in `B_3` is operationalized only by hidden or uncounted apparatus;
3. distinct roles in `B_3` have distinct primitive visible carriers;
4. no visible carrier is made to do multiple primitive roles by appeal to an
   uncounted parser, evaluator, interpreter, boundary convention, transition
   context, or metalinguistic rule.
```

Under this condition, visible symbol-count and role-count are not vaguely analogous; they are isomorphic for the required primitive carriers:

```text
FaithfulVisible_3(X) -> |Σ_required| = |B_3| = 3.
```

This is the formal bridge between minimal roles and minimal visible symbols. Outside faithful role-explicit realization, the two measures separate. A one- or two-symbol encoding may still be universal while obtaining visible compression through **role multiplexing** or **role relocation**. When a single mark carries several roles, some demultiplexing apparatus determines when the mark functions as state, relation, boundary, application, output, or transition. That apparatus may be parser state, position, arity, a transition rule, a boundary convention, a machine configuration, an evaluator, or an interpreter. Under fair accounting, the demultiplexing apparatus is counted.

The visible-symbol consequence is therefore:

```text
For every X,
if Productive(X), Fair(X), and FaithfulVisible_3(X), then
X requires at least three visible primitive role-carriers for `B_3`.
```

This is the formal shape of the lower-bound claim. It does not deny that binary or unary compressed encodings exist. It says that if such encodings are productive, then at least one required dependency answer has been multiplexed through a visible mark or relocated into apparatus that must be counted under `Fair(X)`.

Visible compactness is not formal minimality. If a supposedly minimal alphabet depends on uncounted operative machinery, then the alphabet is minimal only by hiding part of the system. Under fair accounting, the hidden machinery must be counted, and the presentation is not role-minimal merely because its surface token count is small.

## 3. Effectively Presented Formal Systems

For present purposes, an **effectively presented formal system** is a tuple

```text
L = (Σ_L, E_L, W_L, R_L, P_L)
```

where:

```text
Σ_L  is a finite primitive alphabet or finite primitive basis;
E_L  is the set of finite expressions or expression-objects over that basis;
W_L  is a decidable well-formedness relation on E_L;
R_L  is a finite or effectively specified collection of proof, evaluation,
     derivation, or transformation relations whose finite instances are
     mechanically checkable;
P_L  is the effectively specified presentation apparatus through which
     formal objects and formal roles are made available at the descriptive
     layer.
```

This definition covers the effective operational layers of symbolic formal systems such as propositional calculi, first-order calculi, set-theoretic languages, arithmetic languages, lambda-calculus presentations, combinatory calculi, rewriting systems, automata presentations, formal grammars, type-theoretic proof systems, formal protocols, programming-language cores, formal games, and formal proof calculi, provided that their finite objects and relevant formation, checking, evaluation, derivation, or transformation procedures are effective.

Some standard formal languages use infinitely many variables or constants. Such languages are included when the variable supply or symbol generation convention is itself finitely and effectively specified. What matters here is not that only finitely many written marks ever occur in practice, but that finite expressions, finite proofs, and their relevant checking procedures are effectively representable.

The computability restriction is essential. If a purported formal system depends on non-computable formation rules, non-mechanical proof rules, or non-effective access, then the theorem below does not automatically apply. This restriction marks the effective finite-operation boundary of the claim: mechanically checkable finite proof objects and computable transformations do not imply decidability of all truths expressible in the system, proof of the system's own consistency, or escape from incompleteness. The claim concerns counted finite operations and productive apparatus, not completeness for truth.

## 4. Universal Substrates and Small Object-Level Bases

Let `U` be a computational substrate with an object-level primitive basis `Σ_U`. This basis may be an alphabet, an instruction set, a set of constructors, or a set of primitive operators, depending on the formalism. The substrate `U` is assumed to be Turing complete: it can simulate any Turing-computable procedure under some effective encoding.

The relevant case is not merely that a substrate can have a three-element object-level basis, such as the three combinators `S`, `K`, and `I` in SKI combinatory logic. The claim is that productive universal presentation inherits the three-role basis somewhere in the full counted apparatus. The relevant point is not that every practical notation for SKI can be printed with only three visible glyphs. Practical presentations may use grouping, application conventions, whitespace, tree structure, or metalinguistic notation. The point is that a presentation may appear to use fewer visible tokens while still depending on the same three productive roles through hidden apparatus.

The number three therefore has one primary role in this manuscript: it is the claimed fair-accounting lower bound for productive presentation. The universal case inherits this dependency. This is not a raw glyph-count theorem over every compressed string notation. Other minimalist systems, including one-combinator and binary encodings associated with Iota, Jot, binary lambda calculus, and binary combinatory logic, push the visible or object-level basis lower in various senses. The paper treats these examples as pressure tests rather than counterexamples: they show that visible token count can be compressed by relocating relation, state, or resolution/application into an interpreter, parser, transition rule, tape convention, boundary convention, output convention, or evaluation context. Under fair accounting, those relocated roles remain part of the productive apparatus.

Thus, throughout this manuscript, claims about a "three-symbol" presentation should be read as role-explicit visibility claims, not as unrestricted impossibility claims about every conceivable encoding. The unrestricted claim that no universal computation can ever be encoded with fewer than three visible glyphs is not the target. The target is the accounting error: alphabetic compression is not role elimination. The point is not to find the smallest alphabet. The point is to expose which relationships must be present for a symbolic presentation to do work at all.

If the claim is that there are three irreducible dependency questions, then a three-carrier visible witness is the tightest way to display them without either multiplexing them or adding irrelevant extra surface. The three-symbol witness is therefore not an unrestricted lower bound on alphabet size; it is the tight visible witness for the three required dependency questions when each is given a distinct visible carrier and the remaining apparatus is counted.

A two-symbol presentation may still be universal, but it must multiplex or relocate at least one required role. A larger alphabet may be useful, readable, or historically natural, but the added symbols are not needed to witness the three-role dependency structure.

Because the broader project is concerned with revealing fundamental relationship structure rather than merely compressing notation, this paper functions as a bridge: it separates visible symbol economy from productive-role economy, so later applications can ask which relationships are structurally required and which are artifacts of a chosen presentation.

### 4.1 SKI as a Role-Transport Example

SKI is not used here as a mere convenience benchmark, and it is not treated as the theory itself. It is used as an established universal witness whose productive apparatus can be analyzed in primitive-role terms and transported into a role-explicit presentation with three visible role-carriers and counted parser/evaluator apparatus. This rests on established work in lambda calculus and combinatory logic. Lambda calculus is a standard formal model of computation based on abstraction and application. Combinatory logic is historically and technically connected with lambda calculus, and SKI combinatory logic supplies a small object-level basis of combinators `S`, `K`, and `I`, together with application, from which lambda-calculus computation can be represented.

The reduction rules are:

```text
I x       -> x
K x y     -> x
S x y z   -> x z (y z)
```

These rules assign operative transformation roles inside a full applicative presentation. Moreover, `I` is definable from `S` and `K`, for example as `S K K`, so SKI should not be mistaken for a proof that three named combinators are absolutely necessary as printed glyphs. SKI is used here as a familiar universal source calculus whose productive structure can be effectively transported into the role-explicit delimiter witness below.

The important point is stronger than the observation that SKI has hidden machinery. SKI is not a clean visible-symbol map onto the three roles. The printed combinator names `S`, `K`, and `I` do not correspond one-to-one to α, β, and γ, and the paper does not claim that they do. SKI maps to the three-role analysis only when the full productive apparatus is counted: determinate terms and application trees, formation rules, reduction behavior, arity discipline, parsing, evaluator convention, and readout.

Under fair productive accounting, SKI still answers the same three role-questions. Terms, application trees, configurations, and possible normal forms supply determinate formal presence; contraction and reduction supply effective transition; and rewrite clauses, arity discipline, parsing, redex selection, substitution or application convention, and readout settle how transition bears on determinate terms. The roles are therefore distributed across the full presentation rather than carried by the three visible combinator names alone. SKI is reducible to the three productive roles, not to a one-to-one assignment between its three printed names and those roles.

This is why a productive-role framework is needed. Visible primitive bases reveal the local vocabulary of a presentation, but they do not reliably expose the minimal dependencies that make that presentation operate. Under an effective translation, the same operative roles can be carried by other marks, encodings, rules, states, or evaluators. The transport into the role-explicit witness below demonstrates that the three-role basis can carry the same finite universal computational content as the familiar SKI presentation while making the productive-role accounting explicit.

## 5. Computable Encoding Disciplines

A **computable encoding discipline** from `L` to `U` is an effective method assigning finite `U`-representations to the finite operational content of `L`.

This includes whatever finite objects, operative roles, and mechanically checkable steps belong to the effective formal layer being represented. The encoding need not be efficient, readable, or surface-faithful. It need only be effective, finite on finite inputs, and mechanically usable within `U`.

A familiar precedent is Gödel coding, in which formal symbols, formulas, and proofs are assigned natural numbers by effective means. The argument does not require Gödel's particular coding method; it uses only the general fact that effectively presented finite symbolic objects, structural roles, and procedures can be mechanically encoded.

The preservation target is **finite operational content**: finite objects, role distinctions, parsing or well-formedness conditions, and mechanical proof/evaluation/transformation steps needed to reproduce the same operative behavior.

Call an encoding **three-role-preserving** when it preserves finite operational content and the encoded presentation answers the α, β, and γ dependency questions somewhere in the counted apparatus. Role-carriers may move, but the required dependencies must remain counted. Call it **operationally faithful three-role-preserving** when the preservation is faithful to finite operational content: finite objects, well-formedness behavior, finite step behavior, accepted finite derivations or evaluations, and output recovery. Call it **faithful visible three-role-preserving** when, in addition, the three primitive role-families are carried by distinct visible primitive marks without uncounted demultiplexing.

## 6. Operational Reducibility

**Definition 7: Operational Reducibility.**  
An effectively presented formal system `L` is **operationally reducible** to a Turing-complete substrate `U` when a computable encoding discipline lets `U` represent and operate the finite operational content of `L`.

The clamp is finite and operational: reducibility concerns only the finite objects, roles, checks, transformations, and readouts included in the chosen effective presentation. Equivalently, `U` can, under the chosen encoding and where relevant:

```text
1. represent the primitive symbols or primitive constructors of L;
2. represent finite expressions or expression-objects of L;
3. represent the formally significant roles of the presentation apparatus;
4. generate candidate expressions of L;
5. decide the relevant well-formedness relation of L;
6. check finite proof steps, derivation steps, or transformation steps of L;
7. simulate the effective proof, evaluation, or transformation procedures of L.
```

Operational reducibility does not imply that `L` is false, unnecessary, meaningless, or eliminated as a useful theory. It means that `L` is executable or representable within `U` in the specified effective sense.

### 6.1 Established Bridges Used by the Argument

The proof below does not attempt to re-establish the standard equivalence machinery of computability theory. It relies on familiar results and frameworks:

```text
1. effective symbolic procedures can be encoded and mechanically simulated;
2. lambda calculus, combinatory logic, Turing machines, and related models
   provide mutually interpretable accounts of effective computation;
3. SKI combinatory logic is a canonical universal applicative witness;
4. operational semantics, abstract machines, and rewriting systems routinely
   present computation as determinate configurations transformed by rules.
```

The three-role basis is not a rival framework. It isolates a role-accounting pattern that these frameworks already rely on when they become productive presentations. Terms, configurations, proof states, machine states, or rows provide determinate presence. Rewrite rules, transition functions, proof steps, or evaluators provide transition. Parsers, arity disciplines, boundary conventions, rule application, and output conventions provide resolution. The theorem below abstracts this common productive structure and asks that it be counted wherever it is carried.

## 7. Proof Spine: Theorems, Bridge, and Witnesses

This section contains the proof-bearing material. The dependency lemmas and the Main Theorem carry the lower-bound claim. The Witness Proposition and the Bridge Theorem supply the visible sufficiency construction and the preservation bridge. The standard internalization observation, the Direct Witness, and the external-interpretation consequence show that interpretation and role-shifting can be internalized in standard effective presentations. The later sections do not add hidden premises to the theorem; they apply and illustrate the argument established here.

**The Core Negative Claim Is a Dependency Result, Not a Survey of Possibilities.**  
The argument does not try to inspect every imaginable two-role vocabulary. It first derives three failure conditions from productivity itself: without determinate presence there is no item or result; without effective transition there is no productive advance; without determinacy of transition over presence there is no settled step, application, completion, or readout. A proposed smaller basis succeeds only by showing that one of these failure conditions is not real. Merely naming two broader roles does not reduce the dependency count; if one named role answers two required dependency questions, it is a composite carrier under fair accounting, not a single primitive productive role-family.

**Background Fact: Effective Formal Operations Are Simulable in Universal Substrates.**  
Let `L` be an effectively presented formal system. Let `U` be a Turing-complete substrate. If there exists a computable encoding discipline from the finite objects, mechanical operations, and effectively specified presentation roles of `L` into `U`, then `L` is operationally reducible to `U`.

This is the standard computability bridge used by the argument, not a new theorem about computability. Since the relevant objects, checks, transformations, and presentation roles of `L` are effectively specified, they can be represented by Turing-computable procedures or finite structural codes. A Turing-complete substrate equipped with the chosen encoding can simulate those procedures and operate the encoded formal layer.

**Background Consequences of Operational Reducibility.**  
The following consequences fix the comparison being made. They are ordinary consequences of effective encoding and simulation; they orient the three-role argument but do not supply the three-role lower bound.

1. **Layer-relative primitive alphabets.** If an effectively presented formal system `L` with object-level primitive basis `Σ_L` is operationally reducible to a Turing-complete substrate `U` with a smaller object-level primitive basis `Σ_U`, then `Σ_L` remains primitive at the descriptive layer of `L` but is not absolutely primitive in the operational/generative sense used here relative to `U`.

2. **Interface status of primitive alphabets.** Primitive alphabets organize the descriptive layer in which formulas are written, proofs are communicated, and systems are used. They need not be lowest-level generative primitives when the formal layer is operationally reducible to a smaller universal substrate.

3. **Substrate relocatability.** The finite expressions, proof objects where present, presentation roles, checking relations, and computable transformations of an effectively presented formal system can be relocated across universal substrates under effective encoding.

4. **Notation-invariance up to effective encoding.** Surface alphabets and presentation apparatuses may change while preserving finite operational content: finite objects, checking relations, structural roles, and computable transformations.

5. **Interface and compression status.** Primitive symbols may package useful relations, operations, structural roles, and inferential conveniences for human-facing practice without serving as absolute lowest-level generative atoms.

**Background Lemma: Presentation Apparatus Reducibility.**  
Let `L` be an effectively presented formal system with presentation apparatus `P_L`. If the formal roles of features in `P_L` are effectively specified, then those role-carrying features can be encoded with `L` in any Turing-complete substrate equipped with an effective encoding discipline for `L`.

The reason is the same standard bridge: an effectively specified role can be represented by a mechanical procedure or finite structural representation. If a delimiter, parser convention, binding rule, proof-checking condition, or evaluator behavior affects formal operation, then it belongs to the effective operative layer and can be encoded with the rest of the system.

Thus delimiters are not outside the reduction when they have effectively specified formal roles, and the layer-relative thesis applies to the presentation apparatus as a whole, not only to primitive alphabets narrowly construed.

**Witness Proposition: A Faithful Visible Delimiter Witness via SKI.**  
Let `Σ_W = { (, ), ∅ }`, where `(`, `∅`, and `)` are assigned as distinct visible anchors for the α-, β-, and γ-role families inside the counted grammar and evaluator. This is the **visible delimiter witness presentation**. The marks do not carry productive force in isolation; their role-bearing status is fixed by the effective grammar, parser, evaluator, transition convention, and readout apparatus counted with the presentation. There exists an effective, uniquely decodable encoding of SKI combinatory logic into finite strings over `Σ_W`. Consequently, `Σ_W` can serve as the visible alphabet of a Turing-complete formal presentation.

**Proof.**  
SKI combinatory logic is computationally universal. It is therefore sufficient to give an effective encoding of SKI terms and SKI reduction into strings over `Σ_W`.

To avoid relying on an implicit parser, specify the grammar as part of the counted presentation apparatus. To keep object-language tokens distinct from metasyntactic notation, write:

```text
Open  = "("
Close = ")"
Dot   = "∅"

Term  ::= SAtom | KAtom | IAtom | App
SAtom ::= Open Dot Close
KAtom ::= Open Dot Dot Close
IAtom ::= Open Dot Dot Dot Close
App   ::= Open Open Term Close Open Term Close Close
```

Define the encoding recursively:

```text
E(S)         = Open Dot Close
E(K)         = Open Dot Dot Close
E(I)         = Open Dot Dot Dot Close
E(App(x,y))  = Open Open E(x) Close Open E(y) Close Close
```

This grammar gives an effective and uniquely decodable translation from every finite SKI term to a finite string over `Σ_W`. The atom forms are finite delimited state-marker sequences, while application uses a distinct outer delimiter form containing two delimited subterms. Unique decodability follows because after an initial `Open`, the next token distinguishes atom forms from application form: `Dot` begins an atom, while `Open` begins an application wrapper; the application grammar then recursively delimits exactly two subterms. Decoding is computable by recursive descent over the specified grammar.

The grammar is not free background. It is part of the counted presentation apparatus. In this construction, the visible marks provide distinct visible anchors for the three required role-families: `(` anchors the α role, `∅` anchors the β role, and `)` anchors the γ role. The transition itself is carried by the counted evaluation relation and reduction discipline, not by the bare glyph `(`. Likewise, `)` does not carry resolution by typographical shape alone; it carries γ inside the specified presentation because the counted grammar and evaluator use it to close structures, delimit application, and determine how encoded terms are read and reduced. The visible marks expose local role-carriers, while the counted parser, evaluator, transition convention, and readout apparatus operationalize them.

Transport the SKI reduction rules through the encoding:

```text
E(I x)       -> E(x)
E(K x y)     -> E(x)
E(S x y z)   -> E(x z (y z))
```

Equivalently, define the one-step witness evaluation relation on well-formed witness terms by decode-reduce-encode:

```text
s ->_W t
iff Decode(s) = u,
    u ->_SKI v,
    and t = E(v).
```

Malformed witness strings are rejected by the counted parser. Multi-step witness evaluation is the reflexive transitive closure of `->_W`. This gives an explicit effective transition relation over witness strings: parse a witness term, decode it to the corresponding SKI term, perform one SKI reduction when available, and re-encode the result as a witness term.

Since the translation preserves SKI terms and reductions effectively, every SKI computation can be simulated by the `Σ_W` presentation. Since SKI is computationally universal, the `Σ_W` presentation is computationally universal. Therefore this witness syntax shows that the three-role basis can be given distinct visible anchors while retaining universal computational power, with the parser, evaluator, transition relation, and readout conventions counted as the apparatus that operationalizes those anchors. ∎

This witness should not be read as a claim that the particular glyphs `(`, `)`, and `∅` are intrinsically privileged, or that a glyph carries transition, presence, or resolution apart from a counted presentation. They are convenient visible anchors for the operational role-families: effective transition, determinate presence, and determinacy of transition over presence. Any three distinguishable marks could play the same visible-anchor roles under an effective encoding discipline. The primitive unit, within a given presentation, is the assigned formal role in the counted apparatus rather than the glyph.

Nor is the witness offered as a more efficient or more natural computational system than SKI. Its purpose is to demonstrate role-complete presentation: a presentation in which formal objects, transition procedure, application conditions, and readout conventions are part of the counted apparatus rather than silently supplied from outside. The witness therefore makes constructive the same point that SKI makes diagnostically. SKI shows that visible primitive names need not expose the productive-role basis; the witness shows that the required roles can be made explicit while preserving finite universal computational content under an effective encoding.

**Bridge Theorem: Visible Representation-Preservation for Effective Formal Layers.**  
Let `L` be an effectively presented symbolic formal system. Present the finite operational layer of `L` by the following effective data:

```text
Obj_L:    a finite-object coding for expressions, proof objects,
          configurations, intermediate states, and finite results;

WF_L:     a decidable well-formedness predicate on coded L-objects;

Step_L:   a computable step/checking relation for finite derivation,
          proof-checking, evaluation, rewrite, or transformation steps;

Run_L:    a computable finite-run/checking procedure when L treats a whole
          derivation, proof, evaluation, or certificate as the accepted object;

Out_L:    a computable readout map for accepted finite results.
```

Then there exists an operational visible witness presentation `W(L)` over the witness alphabet `Σ_W` such that `W(L)` preserves the finite operational content of `L` and re-realizes the required dependency answers inside the counted witness apparatus.

This is a role-basis claim, not an apparatus-size claim. The construction may contain a large parser, evaluator, encoded procedure library, data-coding convention, acceptance convention, and readout map. Those components are counted rather than hidden. The bridge does not claim to copy the source presentation's original carrier layout. It preserves the chosen finite operational behavior and re-realizes the required dependency answers in the witness presentation. Three-role minimality says that the dependency questions of effective transition, determinate presence, and determinacy of transition over presence cannot be left unanswered in productive presentation. It does not say that every productive presentation can be made small in rule count, program length, complexity, memory, or implementation burden.

More explicitly, there are computable maps `e` and `d` such that:

```text
1. every finite L-object x has a finite witness code e(x);
2. WF_L(x) holds iff the counted witness checker accepts e(x);
3. Step_L(x,y) holds iff the counted witness apparatus, by evaluating
   the encoded procedure [Step_L] on the encoded pair (e(x), e(y)),
   reaches the designated acceptance result;
4. every finite accepted L-derivation, proof, evaluation, or certificate is
   accepted by the witness run-checker on the corresponding sequence of
   witness codes, and conversely for the designated simulation image;
5. for every accepted finite L-result y represented in the witness
   presentation, d(e(y)) = y.
```

The preservation is therefore exact for the chosen finite operational layer: finite objects, well-formedness, finite step behavior, finite accepted derivations or evaluations, and readout of finite results. It makes no claim beyond that layer, and it does not require the target presentation to preserve the source presentation's original role-carrier geography.

Moreover, this construction is operationally faithful in the limited role-re-realizing sense defined here. In the operationally faithful visible realization, the three visible marks anchor the primitive role-families, while the parser, checker, evaluator, transition convention, and readout map are counted apparatus rather than uncounted background.

**Proof.**  
Since `L` is effectively presented, its finite expressions, proof objects, configurations, intermediate states, and finite results can be mechanically encoded. Its well-formedness relation is decidable, and its finite proof, derivation, evaluation, checking, or transformation steps are mechanically checkable or computably simulable. Its relevant presentation-apparatus roles are effectively specified by assumption. Thus the data `Obj_L`, `WF_L`, `Step_L`, `Run_L`, and `Out_L` can be represented by finite codes for computable procedures.

Choose a standard effective coding into natural numbers or finite strings. Let:

```text
code_L(x)       be the code of a finite L-object x;
code(WF_L)      be a program index deciding well-formedness;
code(Step_L)    be a program index checking or simulating finite L-steps;
code(Run_L)     be a program index checking finite accepted runs or certificates;
code(Out_L)     be a program index recovering accepted finite results.
```

By the standard universality of SKI combinatory logic, each of these computable procedures can be represented by an SKI term under a suitable effective data coding. Write those representing terms as:

```text
[WF_L], [Step_L], [Run_L], [Out_L].
```

By the Witness Proposition, SKI terms and their reductions have an effective, uniquely decodable encoding into `Σ_W` strings, with the grammar, parser, and reduction apparatus counted as part of the presentation. Define `W(L)` to be the counted visible witness presentation containing:

```text
1. the witness grammar and parser;
2. the encoded universal evaluator for SKI reduction;
3. the encoded procedure terms [WF_L], [Step_L], [Run_L], and [Out_L];
4. the finite data-coding convention for L-objects;
5. the designated acceptance conventions for well-formedness, steps, runs,
   and readout;
6. the readout map d from accepted witness codes back to finite L-objects.
```

For any finite object `x` of `L`, define `e(x)` to be the witness encoding of the data code `code_L(x)` under this presentation. Because the coding and decoding procedures are effective, `e(x)` is finite and mechanically recoverable. Because `[WF_L]` computes `WF_L`, the counted witness checker accepts `e(x)` exactly when `WF_L(x)` holds. Because `[Step_L]` represents the computable source step/checking relation, evaluating `[Step_L]` on the encoded pair `(e(x), e(y))` reaches the designated acceptance result exactly when `Step_L(x,y)` holds. This evaluation may take many internal witness transitions; preservation concerns the accepted finite source-step relation, not one-step identity between the source presentation and the witness presentation. Because `[Run_L]` computes finite accepted runs or certificates, accepted finite derivations, evaluations, proof checks, and certificates of `L` are accepted in the witness presentation on their corresponding sequences of codes. The witness presentation may have additional internal reductions from its evaluator and encodings, but these are target-level simulation steps rather than additional source-level runs; restricted to the designated simulation image and decoded back through `d`, the accepted `L`-runs are exactly those accepted by `[Run_L]`. Because `[Out_L]` computes the readout map, every accepted finite result represented in the witness presentation decodes back to the corresponding finite `L`-result under `d`.

Thus the bridge is not merely an appeal to universality in the abstract. It is a construction schema with source-specific inputs: encode finite objects, encode the source procedures that decide or check the operative layer, represent those procedures in SKI, transport the SKI representation into the visible witness syntax, and count the parser, evaluator, transition convention, and readout map as part of the apparatus. The visible marks supply distinct visible anchors for α, β, and γ, while the counted apparatus supplies the effective machinery by which those anchors operate. Therefore `W(L)` is an operationally faithful visible presentation that preserves the finite operational content of `L` while re-realizing the three required dependency answers in the counted witness apparatus. ∎

**Observation: Typographical Neutrality of Primitive Marks.**  
Let `A` and `B` be finite alphabets of the same cardinality. Any effectively presented formal system over `A` can be transported to `B` by an injective renaming of tokens. Therefore typographical identity is not a source of primitive status. Primitive status belongs to the assigned formal role within a presentation, not to the visual mark itself.

**Reason.**  
Let `r : A -> B` be a bijective token renaming, extended homomorphically over finite strings and structurally over expression objects. A parser, checker, or evaluator for the system over `A` can be converted into one over `B` by applying `r^{-1}` before evaluation, or by rewriting the parser and rules to recognize the corresponding `B`-tokens directly. Well-formedness, proof checking, and transformation behavior are preserved under the renaming. Thus the operative content depends on the assigned roles and rules, not on the visual identities of the marks. ∎

**Observation: Formal Operation Is Relational.**  
In an effectively presented formal system, no presentation feature has operative force in isolation. Its formal role is determined by its effective relations to expressions, positions, rules, transformations, checking procedures, or evaluations. Therefore formal operation is relational in the operational sense used here.

**Reason.**  
By Definition 2, a feature has a formal role only when variation in that feature affects a mechanically specified operation of the system. Such effects are defined by relations among expressions, structural positions, admissible transformations, proof-checking procedures, or evaluation rules. A mark considered apart from those relations performs no formal operation. Hence operative force belongs to the feature-in-system, not to the isolated glyph. ∎


**Lemma 0: Dependency Roles Belong to the Productive Apparatus.**  
If a presentation cannot be parsed, evaluated, updated, halted, or read without a role supplied by an interpreter, parser, boundary convention, machine configuration, tape convention, transition rule, or output convention, then that role belongs to the counted productive apparatus of the presentation.

**Proof.**  
By Definition 6, the counted productive apparatus includes the roles actually needed for formal productivity, regardless of whether they are printed as glyphs. If a computation depends on a parser, boundary convention, transition rule, state convention, or output convention, then removing that role changes whether the presentation can produce formal behavior. Therefore the role is part of the productive apparatus. ∎


**Lemma 1: Unary State Repetition Does Not Internally Distinguish State Structure.**  
Let `Σ_1 = { ∅ }` be a one-role presentation in which `∅` is treated as a state marker. Every finite expression over `Σ_1` is of the form `∅^n`. Considered only as a string over that unary alphabet, such an expression does not internally determine whether it is one extended state, `n` separate states, grouped states, a numeral, a program index, an output stream, or an unfinished expression. Length can of course be used to encode such distinctions once a convention is supplied; the point is that the supplied convention is doing the distinguishing. Any such distinction must be supplied by additional apparatus: a boundary convention, parser state, external decoder, length rule, clocking rule, tape convention, or evaluation context.

**Proof.**  
A finite string over a one-symbol alphabet contains no internal symbol difference. The only available variation is repetition count. Boundaries, groupings, nesting, segmentation, and state-role distinctions are not present as features of the string itself. If such distinctions are made, they are introduced by a rule or context beyond the repeated mark. Therefore a unary state marker alone cannot internally distinguish state structure. ∎

**Lemma 2: A Pure Delimiter Pair Gives Relation Without Explicit State.**  
Let `Σ_2 = { (, ) }` be a two-role delimiter presentation in which the two marks are assigned start and end delimiter roles. Such a system can make relational structure visible by forming empty enclosures, nesting, adjacency, and containment. However, without an explicit determinate-presence marker or an explicit rule treating some delimiter compound as the determinate object, the structures produced are empty relational structures unless a β-role is supplied by an additional rule or hidden apparatus.

**Proof.**  
The marks `(` and `)` can distinguish opening from closing and can therefore support relational organization such as `()`, `(())`, `()()`, and `(()())`. These expressions encode boundaries and nesting. But if the only roles present are delimiter roles, no mark in the presentation functions as an internal determinate-presence carrier. The system can display relation, but the terminal content of the relation is empty unless a rule interprets some relational form itself as determinate presence. Such an interpretation supplies an additional β-role, even if the β-carrier is a compound form such as `()` rather than a separate glyph. Therefore a pure delimiter pair gives explicit relation without explicit determinate presence. ∎

**Lemma 3.1: Readability Requires a State-Bearing Role.**  
If `Readable(X)`, then `Requires(X, β)`.

**Proof.**  
`Readable(X)` means that the presentation yields, identifies, or preserves a determinate formal object, configuration, base condition, result, output, or state-bearing structure. If the state-bearing role-family is not supplied anywhere in the counted apparatus, there is no determinate item for the presentation to identify, preserve, halt on, transform, or read. Therefore readability depends on the state-bearing role-family. Hence `Requires(X, β)`. ∎

**Lemma 3.2: Operability Requires a Relation/Transition Role.**  
If `Operable(X)`, then `Requires(X, α)`.

**Proof.**  
`Operable(X)` means that the presentation supplies at least one mechanically specified effective operation over finite formal items. If the effective-transition role-family is not supplied anywhere in the counted apparatus, no mechanically specified operation remains. Hence `Requires(X, α)`. ∎

**Lemma 3.3: Productive Operation Requires Determinacy of Transition Over Presence.**  
If `Operable(X)` and `Readable(X)`, then `Requires(X, γ)`.

**Proof.**  
Effective operation and determinate presence do not by themselves determine productive formal behavior. The presentation must also settle how the operation bears on the presence in a determinate way. If this γ-dependency is absent from the counted apparatus, the presentation may contain possible operations and possible determinate items, but it does not determine a productive formal step or readable result. Therefore productive behavior depends on determinacy of transition over presence. Hence `Requires(X, γ)`. ∎

**Lemma 3.4: Non-Omission of the Abstract Role Basis.**  
Productive effective presentation must answer all three dependency questions: what carries effective advance, what supplies determinate presence, and what settles how advance bears on presence. No proper subset of `{ α, β, γ }` suffices unless the missing dependency question is answered by additional apparatus, in which case fair accounting counts that role where it is carried.

**Proof.**  
The claim follows from the neutral non-collapse lemma under the identification `T -> α`, `C -> β`, and `D -> γ`. The claim concerns dependency questions, not separately implemented components. The argument does not assume that each dependency question must have its own carrier. If an implementation or analysis treats one carrier as answering more than one primitive dependency question, each claimed answer is counted where that carrier supplies it.

Consider the possible omissions.

With **β** alone, a determinate object, string, term, state, or output may exist, but no formal transition and no rule-governed application or readout is determined. The presentation may be readable, but it is not productive.

With **α** alone, there is at most a transition gesture without determinate relata, input state, output state, or result. Without β, there is no determinate formal item over which transition is defined; without γ, there is no determined mode of application or completion.

With **γ** alone, a rule schema, boundary discipline, or resolution convention has nothing determinate to apply to and no transition to resolve. It is an unapplied constraint, not a productive presentation.

With **α** and **β** but without **γ**, there may be determinate states and possible transitions, but the presentation does not determine which transition applies, how composition is parsed, where boundaries fall, when a configuration is complete, or how output is read.

With **α** and **γ** but without **β**, there may be a transition discipline and an application rule, but no determinate object, state, configuration, or result for them to operate on. Any apparent object or output would supply the missing β-role.

With **β** and **γ** but without **α**, there may be determinate objects and constraints on their form or interpretation, but no derivation, evaluation, update, or transformation. Any apparent operation would supply the missing α-role.

Thus every proper subset either fails productivity or depends on an additional convention, parser state, evaluator behavior, machine configuration, boundary convention, transition rule, or readout discipline that answers the missing dependency question. Under fair accounting, that supplied role belongs to the counted apparatus. Therefore productive effective presentation requires answers to all three dependency questions somewhere in the counted apparatus. ∎

**Lemma 3.5: Alternative Bases Must Cover the Same Dependency Questions.**  
Any adequate productive-role basis for effective symbolic presentation must answer the same dependency questions isolated here: effective transition, determinate presence, and determinacy of transition over presence.

Here, **covering the same dependency questions** does not mean that the basis uses the names `α`, `β`, and `γ`, or that it uses three visible symbols, three modules, or three separately implemented mechanisms. It means that for each dependency question, some role, combination of roles, or counted carrier in the alternative basis supplies the needed functional answer. A basis may rename the dependencies. It may treat several dependency answers as carried together. It may distribute one dependency across several mechanisms. But if it is productive and fairly counted, it cannot leave any of the three questions unanswered rather than merely renaming, combining, or relocating the answer.

A primitive productive role-family is therefore not any broad description one chooses to name. It is a minimal dependency question that productive presentation must have answered somewhere. If removing one proposed role removes answers to more than one dependency question, then that proposed role is a composite package or carrier, not a primitive role-family at the dependency level.

**Proof.**  
Let `B` be any proposed productive-role basis for an effective symbolic presentation under fair accounting. If `B` supports productive presentation, then the presentation is operable and readable. By Lemma 3.1, it requires determinate presence. By Lemma 3.2, it requires effective transition. By Lemma 3.3, it requires determinacy of transition over presence.

Therefore `B` must answer all three dependency questions somewhere in its counted apparatus. If `B` has a role that already includes applicable transition over determinate presence, then that role carries both the α-dependency and the γ-dependency; the dependencies have been combined, not eliminated. If `B` has a state/update pair whose update rule already determines application, then the update rule carries γ as well as α. If `B` uses an interpreter, parser, boundary convention, machine configuration, or readout discipline to settle application or output, then fair accounting counts that mechanism as the carrier of the relevant dependency.

Thus any adequate alternative basis either covers the α-, β-, and γ-dependency questions up to renaming and carrier relocation, or it fails to be productive. The names may vary and the implementation may fuse or distribute roles, but the same dependency questions must be answered somewhere. ∎

The theorem below is therefore not a discovery of an unfamiliar computational ingredient. Its force is diagnostic: it identifies which dependency questions must be answered when a presentation claims primitive economy. The result would be trivially circular if productive presentation were defined as already containing α, β, and γ. Instead, productivity was introduced without those role names, as mechanically specified operation together with recoverable formal presence. The three-role analysis then asks which questions must be answered, without assuming in advance that the answers must appear as separate modules, separate visible marks, or separately isolated mechanisms.

There is also missing machinery that this theorem does not explain. The theorem does not say why a productive presentation exists, why a particular presentation boundary is in force, why these roles are jointly available, or why one apparatus rather than another obtains. Those are grounding, selection, implementation, or origination questions. The same reasoning problem appears at the foundation of any formal system that claims truth about real things: the system can generate internal consequence, but it cannot by formal consequence alone certify its own correspondence to reality. That correspondence requires a further bridge. The bridge may be formalized and counted, but then the question recurs at the boundary of the enlarged formal apparatus. This marks a philosophy boundary that can be partially described from inside the present project but is not crossed here. The present result is conditional: once an effective productive symbolic presentation is given, its counted apparatus must answer the productive dependency questions analyzed below. If the missing machinery is itself formalized as part of an effective presentation, then it too must be counted by the role it plays; if it is not so formalized, it remains outside the theorem.

**Main Theorem: Three-Role Minimality Under Fair Accounting of Productive Apparatus.**  
For every effective presentation `X`:

```text
Productive(X) and Fair(X) -> B_3 ⊆ A(X).
```

Equivalently:

```text
Productive(X) and Fair(X)
  -> Requires(X, α) and Requires(X, β) and Requires(X, γ).
```

Moreover, no proper subset of `B_3` is sufficient for productive effective presentation under fair accounting unless the missing dependency question is answered elsewhere in counted apparatus, and any adequate alternative productive-role basis must cover the same dependency questions in the sense of Lemma 3.5. If `X` is faithful role-explicit in the visible, distinct-carrier sense for `B_3`, then faithful visible anchoring of those three role-families requires at least three visible primitive role-carriers. In this sense, the three-role basis is the minimal productive role basis up to renaming, implementation, and carrier relocation, and three is a lower bound for fair-counted, faithful role-explicit visibility. The universal case inherits the same lower bound.

In prose: under fair accounting of the counted productive apparatus, a productive presentation must answer at least three functional dependency questions somewhere in the full apparatus:

```text
1. α, effective transition:
   the role-family by which configurations can be related, transformed,
   updated, derived, or advanced;

2. β, determinate presence:
   the role-family by which there is a determinate locus, object, configuration,
   base condition, result, or output to transform, read, halt on, emit, or preserve;

3. γ, determinacy of transition over presence:
   the role-family by which transition bears on determinate presence in a
   settled effective way.
```

These roles need not appear as three visible glyphs. They may be carried by symbols, syntax, machine state, parser state, a transition rule, a tape convention, a boundary convention, or an interpreter. Such examples are local realizations, not a complete dictionary. The lower-bound claim is therefore not a raw glyph-count theorem over compressed strings. It is a minimality theorem over the **counted productive apparatus**. A compressed one- or two-token encoding can be universal while relocating or multiplexing at least one of these roles into apparatus that is not visible in the printed code. When the three roles are represented by distinct visible primitive marks in a faithful role-explicit realization rather than hidden or multiplexed in apparatus, the lower bound becomes a three-symbol lower bound for visible role-carriers. The witness construction gives one explicit local realization of that case.

The theorem does not require `γ` to be a separate glyph, or even a separate named component of the implementation. A system may treat resolution/application as part of its transition rule, parser, arity discipline, boundary convention, or evaluator. That does not refute the dependency; it identifies where the dependency question is being assigned. The roles are distinct as questions, not necessarily as implementation locations. The theorem is neutral on whether any proposed fusion of carriers succeeds. It does not need to prove that such fusion is possible or impossible in general. It needs only the accounting point: whenever one mechanism is claimed to do several kinds of dependency work, fair accounting counts the dependencies claimed there; if the mechanism does not do that work, the dependency must be answered elsewhere or productivity fails. The point is that three functional dependency questions must be answered somewhere in the counted productive apparatus: α, β, and γ.

**Proof.**  
Assume `Productive(X)` and `Fair(X)`. By Definition 3, `Productive(X)` means `Operable(X)` and `Readable(X)`. By Lemma 3.1, `Requires(X, β)`: the β question must be answered by some counted local realizer of determinate presence. By Lemma 3.2, `Requires(X, α)`: the α question must be answered by some counted local realizer of effective transition. By Lemma 3.3, `Requires(X, γ)`: the γ question must be answered by some counted local realizer that settles how transition bears on presence. Since `Fair(X)` counts every role required for productive behavior, the α, β, and γ role-families are realized in `A(X)`. Therefore `B_3 ⊆ A(X)`.

By Lemma 3.4, no proper subset of `B_3` is sufficient for productive effective presentation under fair accounting unless the missing dependency question is answered elsewhere. Thus the inclusion `B_3 ⊆ A(X)` is minimal: α, β, and γ name the three dependency questions that must be answered, and any apparent reduction below the three role-families either destroys productivity or relocates, multiplexes, or supplies the missing answer in additional counted apparatus.

By Lemma 3.5, this minimality is not merely an artifact of the chosen letters. Any alternative productive-role basis that succeeds under fair accounting must answer the same dependency questions named by α, β, and γ. It may name them differently or assign several dependency answers to fewer visible carriers, but then those carriers are being credited with multiple counted functions. Therefore the three-role basis is canonical at the dependency-question level, not at the level of typographical names or implementation modules.

If `X` is also faithful role-explicit for `B_3`, then each role-family in `B_3` has a distinct visible primitive anchor and no role in `B_3` is operationalized only by hidden or uncounted apparatus. Since `|B_3| = 3`, at least three visible primitive role-anchors are required in that faithful visible realization. The Witness Proposition supplies the matching upper bound for faithful role-explicit universal visibility by showing that the visible witness syntax, with counted parser/evaluator apparatus, can encode a universal calculus. Thus the bound is tight for faithful role-explicit productive universal visibility: leaving one dependency question unanswered fails to be productive, while three visible primitive anchors suffice when the roles are faithfully anchored and the operational apparatus is counted. ∎

The theorem uses α, β, and γ as necessary-role tests, not as an exhaustive dictionary. A counterexample would have to be a productive, effective, fair-counted presentation whose full counted apparatus leaves one of the α, β, or γ dependency questions unanswered. If it lacks determinate presence, it is not readable. If it lacks effective transition, it is not operable. If it lacks determinacy of transition over presence, it has possible items and possible operations but no settled productive step, application, completion, or readout. If an alleged counterexample supplies the missing dependency through a parser, evaluator, convention, transition rule, machine state, output discipline, or other mechanism, then fair accounting counts that mechanism where it is carried. Such a case is not a refutation of the theorem; it is an instance of it.

This theorem distinguishes two questions that are often conflated. A two-token string system can encode universal computation in a compressed way. But if the system is productive, then the interpreter, parser, transition rule, machine state, boundary convention, application convention, or output convention that makes it productive must be counted. The theorem therefore does more than note that some machinery is hidden: it identifies the functional dependency questions that the argument claims any productive presentation must answer. Once counted fairly, the full productive presentation must answer the α, β, and γ questions somewhere.

This is the point at which the familiar universality claim must be sharpened. Turing completeness establishes relational universality: it tells us what computations a specified system can simulate. Productive presentation requires more: that the simulating relation operate over distinguishable presence with a determinate mode of application, execution, and readout. In this precise sense, **Turing completeness is not presentation-completeness**. Binary universality refutes only a naive three-glyph lower bound. It does not refute three-role minimality under fair accounting; it demonstrates how one or more required dependency answers can be compressed into apparatus outside the visible code.

**Corollary: Counted Role-Carrier Minimality in the Faithful Case.**  
Within a fixed presentation layer and accounting boundary, an honest, non-multiplexed, role-explicit productive presentation gives each required dependency answer its own counted primitive role-anchor. Here non-multiplexed means that no counted primitive role-anchor is treated as anchoring more than one required dependency answer for purposes of the comparison inside that boundary. Consequently, once the three required answers are faithfully anchored, any attempted reduction in counted primitive role-anchors either drops a required dependency or reintroduces multiplexing, relocation, or hidden apparatus that fair accounting must count.

**Main Consequence: Three-Role Minimality and Operationally Faithful Three-Symbol Realization of Effectively Presented Symbolic Formal Systems.**  
The three-role basis is the minimal productive role basis of effectively presented symbolic formal systems under fair accounting: any such system, when productive, must answer the α, β, and γ dependency questions somewhere in its counted productive apparatus, and no proper subset suffices unless the missing question is answered elsewhere in counted apparatus. When those roles have distinct visible primitive anchors in an operationally faithful role-explicit realization, the same finite operational content is presentable with three visible primitive role-anchors.

Equivalently:

```text
Effectively presented symbolic formal systems are three-role-minimal under fair
accounting, and their finite operational content has an operationally faithful
three-visible-carrier realization under role-explicit visibility.
```

The first clause is a necessity and minimality claim about productive dependency questions. The second is a sufficiency claim about an operationally faithful visible re-realization of the corresponding roles. The witness alphabet does not supply the lower bound; it shows that the lower bound can be met visibly with distinct anchors for the required role-families and counted apparatus that operationalizes them. Effectively formalized mathematics is an important instance of this broader result, not the full scope of it.

**Justification.**  
Let `L` be an effectively presented symbolic formal system whose finite objects, role distinctions, formation rules, transformations, derivations, evaluations, or checks are effectively representable. By the Bridge Theorem, there exists an effective visible witness presentation `W(L)` whose counted parser, checker, evaluator, transition convention, and readout map preserve the finite operational content of `L`: finite objects, well-formedness behavior, finite proof or derivation steps, finite evaluation or transformation behavior, and accepted output recovery.

By the Main Theorem, any productive presentation of such effective symbolic content must answer the α, β, and γ dependency questions somewhere in its counted productive apparatus, and none of the three questions can be left unanswered without loss of productivity or relocation into additional apparatus. The Bridge Theorem supplies the corresponding sufficiency direction: the finite operational content of `L` can be carried by an operationally faithful visible presentation that re-realizes the corresponding roles in counted apparatus. Therefore any such `L`, insofar as it is productive and effectively presented, is three-role-minimal under fair accounting; and its finite operational content has an operationally faithful three-visible-carrier realization under role-explicit visibility. ∎

**Three-Role Equivalence Criterion.**  
Call a presentation **honest** when it is productive, effective, and fair-counted: its visible syntax, parser, evaluator, transition rule, state discipline, boundary convention, and output/readout convention are counted wherever productivity depends on them.

If `X` and `Y` are honest universal presentations, then they are computationally equivalent in the usual weak sense that each can simulate the finite effective computations of the other under some effective encoding. By the Main Theorem, each also realizes the three-role basis somewhere in its counted apparatus. For the purposes of this paper, the stronger proposed notion of three-role equivalence adds a preservation condition:

```text
X ≃_3role Y
```

when there are effective translations in both directions that preserve finite operational content and preserve the primitive roles up to carrier relocation. Under this criterion, `X` and `Y` are equivalent as productive-role presentations, even if their visible alphabets, grammars, reduction rules, or machine organizations differ. Without such translations, the Main Theorem gives shared primitive-role realization, not automatic strong three-role equivalence.

This is the intended bridge between SKI, the visible witness construction, binary calculi, Turing-machine presentations, rewriting systems, cellular automata, and other universal formalisms. The three-role basis is not another calculus beside them. It identifies the dependency questions that an honest productive presentation must answer before universality can be operational rather than merely encoded.

**Standard Internalization Observation: Interpretation Can Be Internalized.**  
Let a productive computation be specified by a program `p` and an effective interpreter `I`. In the ordinary universal-machine setting, there is an effectively specified transition presentation `T` whose initial configuration encodes both `p` and `I`, and whose transition rule simulates the steps of `I` on `p`. If `I` is universal, then `T` is universal.

**Reason.**  
Because `I` is effective, its step relation can be represented by a Turing-computable transition procedure. Encode the description of `I`, the program `p`, and the necessary execution convention into a finite initial configuration of a transition system `T`. Define the transition rule of `T` to simulate one step of `I` on the encoded program and interpreter state. This is the standard internalization move underlying universal machines: the interpreter that was formerly treated as external is represented in the system's own configuration and operated by its own transition rule.

Therefore, in this standard internalization sense, the computation formerly described as `I(p)` can be re-presented as the autonomous evolution of `T` from a single initial configuration. If `I` is universal, then `T` can simulate any effective computation by varying the encoded program and initial configuration. Hence `T` is a universal self-executing transition presentation. ∎

**Direct Witness: Role Interchange in a Universal Turing Presentation.**  
There exists a Turing-complete productive presentation in which the same finite carrier realizes different primitive roles at different layers. More precisely, the role assignment is indexed to a local dependency question inside the presentation: whether the carrier is being inspected as determinate object, used to settle how a transition bears on a configuration, or used in producing the next configuration. In that sense, a transition rule can be **γ** at the simulated-machine layer while its finite code is **β** at the universal-machine layer, and the act of applying that encoded rule participates in **α** at the simulation layer.

**Proof.**  
Let `U` be a universal Turing-machine presentation. Let `M` be any Turing machine with transition table `δ_M`, and let `w` be an input. The universal machine operates on a finite initial configuration containing a code:

```text
<δ_M, q_0, w, tape convention, readout convention>
```

At the universal-machine layer, this code is a finite determinate object on the tape or in the initial configuration. It is therefore a **β**-carrier at that layer: something the universal machine can identify, scan, preserve, transform, and read.

The universal machine also has its own fixed transition rule `δ_U`. Together with its parsing convention for machine descriptions, current-state convention, head-position convention, tape convention, and halting/readout convention, `δ_U` supplies the counted apparatus by which `U` resolves how to simulate one step of `M`. At the universal-machine layer, the sequence of configurations of `U` supplies **α** as transition, the configurations and encoded data supply **β**, and the fixed rule/application/readout discipline of `U` supplies **γ**.

Now pass to the simulated-machine layer. The same finite carrier `δ_M` that was tape data for `U` is no longer merely an inert object. It is the rule table of the simulated machine. For each simulated configuration `(q, a, tape)`, `δ_M(q,a)` determines the next simulated state, written symbol, and head movement. Thus the same carrier that realized **β** at the universal-machine layer realizes **γ** at the simulated-machine layer: it resolves how transition applies to a simulated configuration. When `U` applies the encoded table to advance the simulated configuration from `c` to `c'`, the encoded rule also participates in the simulated **α** step from `c` to `c'`.

This is not a change in the intrinsic nature of the marks. It is a change in counted layer. At one layer, `δ_M` is data inspected by `U`; at another layer, it is the rule discipline of `M`; in the act of simulation, it is used to produce the next simulated transition. Since `U` is universal, this role-interchange occurs inside a Turing-complete productive presentation. Therefore role interchange between layers is not merely metaphorical: it is realized by the standard universal-machine construction. ∎

By the Bridge Theorem, the finite operational content of this universal-machine witness can itself be represented in an operational visible witness presentation. Thus the role interchange just exhibited is not confined to Turing-machine notation; it is available inside a three-visible-carrier realization at the level of finite operational content.

**Standard Corollary: External Interpretation Is Not Essential in the Universal-Machine Setting.**  
In the ordinary universal-machine setting, a productive universal computation described as program plus effective interpreter can be re-presented as a self-executing transition system by internalizing the interpreter, program, state space, and transition convention into the formal apparatus. The resulting presentation may be inefficient, but in that setting it no longer depends on an uncounted external interpreter.

This consequence strengthens the three-role minimality thesis. A compressed universal encoding may hide state, boundary, output, or evaluator roles in an external apparatus. A self-executing presentation makes the productive apparatus internal: state is acted upon by relation according to an effective transition rule. Universal Turing machines and universal cellular automata provide familiar forms of this internalization; Rule 110 is a standard example of a fixed transition rule whose evolutions can support universal computation from suitable initial configurations (Cook 2004).

The core argument is complete at this point. The remaining sections are organized by use: applications show how the theorem reads in familiar formal settings, illustrations clarify carrier behavior, and stress tests address compressed or layer-shifting presentations that might otherwise look like counterexamples.

## 8. Application: A Seven-Symbol Set-Theoretic Presentation

This section is an application of the theorem to a familiar descriptive interface. It is not a premise of three-role minimality; it shows how the fair-accounting distinction applies to ordinary mathematical notation.

Consider a compact set-theoretic vocabulary such as

```text
=  (  )  ¬  ∧  ∀  ∈
```

or a similar finite basis for first-order set-theoretic reasoning. Such a vocabulary may be descriptively economical. Membership supplies the central set-theoretic relation, while equality, logical operations, quantification, and grouping support formal expression. Many ordinary mathematical notions can then be defined downstream.

However, the expressions of such a language are finite formal objects. Its grammar is mechanically specified. Its proof rules are mechanically checkable. Its derivations can be represented as finite symbolic sequences or finite proof objects. Therefore, under an effective encoding discipline, the language can be represented and operated within any Turing-complete substrate.

If the chosen substrate has a smaller object-level primitive basis, then the seven-symbol vocabulary is not absolutely primitive in the operational/generative sense. It may remain an excellent descriptive interface, but it is not a smallest generative basis relative to that substrate.

This example illustrates the general distinction:

```text
seven-symbol formal language:
  compact descriptive interface

role-explicit three-visible-carrier realization:
  generative/executable basis capable of representing and operating that interface
```

The example also illustrates the Main Consequence. The finite operational content presented through such a formal system is not bound, in principle, to the seven-symbol descriptive alphabet. Once the formal system is effectively specified, its syntax and derivations can be encoded and operated inside an operationally faithful role-explicit realization with three visible role-carriers and counted operational apparatus.

### 8.1 Application: Proof-System Case Study Across Formulas, Derivations, Rules, and Checking

This case study is a compact application to proof systems. Its purpose is to show the primitive roles across several productive layers of a single formal practice: formulas, derivation trees, inference rules, parser/checker behavior, and proof output.

A mechanically checkable proof system makes the primitive roles especially visible. Consider an ordinary effective proof calculus: a Hilbert system, natural-deduction system, sequent calculus, type-theoretic proof system, or proof-assistant kernel. The details differ, but the counted productive apparatus has the same role structure.

At the formula layer, well-formed formulas are determinate symbolic objects. A parser or formation judgment decides which strings or trees count as formulas. In primitive-role terms, the formula or parse tree supplies **β** as determinate presence; the grammar or formation relation supplies **γ** because it resolves which symbol arrangements count as complete well-formed objects; and formula construction supplies **α** when it generates or transforms candidate expressions into larger expressions.

At the derivation layer, a proof is not merely a list of marks. It is a finite object whose lines, tree nodes, premises, discharged assumptions, contexts, or sequents must be identified and related. A derivation tree or proof state supplies **β**. An inference step supplies **α** by moving from earlier proof states, premises, or subderivations to a later proof state or conclusion. The inference rule schema, together with side conditions such as substitution, variable freshness, discharge, context management, or type compatibility, supplies **γ** by determining when that transition is licensed.

At the checking layer, the proof checker is counted apparatus. It parses formulas, identifies rule instances, verifies side conditions, tracks dependencies, and accepts or rejects a finite proof object. The current proof object and checker state supply **β**; the checking pass or verification step supplies **α**; and the kernel rules, parser, matching algorithm, boundary conventions, and success/failure criterion supply **γ**. The accepted theorem, certificate, normal form, judgment, or proof output again supplies **β** as a readable result.

This case also shows why alphabet counting alone is too weak. The visible vocabulary of a proof system may be small, large, or heavily abbreviated, but proof productivity depends on more than the printed vocabulary. It depends on formation rules, inference rules, substitution discipline, proof-object structure, parser/checker behavior, and output convention. If those roles are hidden outside the visible alphabet, the presentation may be notationally compact, but it is not productively role-minimal. Under fair accounting, the proof system realizes the three-role basis wherever those roles are carried.

## 9. Accounting Clarification: Syntax, Grouping, and Hidden Structure

This section clarifies what fair accounting counts when syntactic structure is carried by grammar, grouping, parser behavior, or convention rather than by visible primitive symbols.

A natural objection is that the comparison between visible alphabets and universal substrates may depend on what counts as a primitive symbol. Parentheses, variables, application, binding, and parse-tree structure may be treated differently across formalisms.

This objection is important but does not defeat the layer-relative claim. Formal systems require operative structure. If such structure is not counted as part of the visible primitive alphabet, it is externalized into grammar, convention, or metatheory. It does not disappear. The present argument does not require one universally correct way to count parentheses or application syntax. Rather, it says that once the full effective formal layer is specified, including its syntax and checking procedures, that layer can be encoded and simulated by a universal substrate.

Syntax is not free. If syntax contributes to well-formedness, structural interpretation, binding, transformation, proof checking, or evaluation, then it is operative structure. It may be hidden from the visible alphabet, but it is not absent from the formal system.

Thus the question for this paper is not merely whether a given mark should count as a primitive symbol. It is whether the whole operative formal layer is primitive in the operational sense used here or whether it is representable inside a smaller universal substrate. In the effective case, it is representable.

## 10. Illustration: Delimiters, Empty Structure, and Encapsulation

This section is an illustration of role-carrier mobility. It shows how apparently empty or merely punctuational structures can carry productive roles once an effective presentation assigns them formal behavior.

Delimiters can carry formal structure even when the delimited region contains no named atom. Consider a presentation using only the two visible marks `{` and `}`. Let the empty delimited expression `{}` serve as the base empty object. Then nesting and containment immediately distinguish further structures such as `{{}}`, `{{{}}`, and `{{}{{}}}`.

These strings differ without requiring a separate symbol for emptiness. The empty object is represented by an empty region under an effective presentation rule. Further objects arise from nesting, containment, and structural position.

This does not make the delimiter marks irreducible. Their structural roles are still operative roles. Once the grammar is effective, the same distinctions can be encoded as trees, binary strings, stack configurations, combinatory terms, or other finite representations.

This also does not refute three-role minimality. If an empty delimited region serves as a base object, then the determinate-presence role is being carried by the empty-region formation rule rather than by a third visible glyph. Under fair accounting, that rule is part of the productive apparatus. The visible alphabet may have two marks, while the counted apparatus still answers the effective-transition, determinate-presence, and determinacy-of-bearing questions.

## 11. Illustration: Delimiter Patterns and Organization Schemes

This section continues the delimiter illustration at the level of pattern conventions. It is not needed for the lower-bound proof; it shows why typographical habits should not be mistaken for fixed formal roles.

A delimiter-only presentation need not be restricted to ordinary balanced notation. Once delimiter marks are treated as part of an effective presentation apparatus, delimiter patterns themselves may be assigned formal roles. A pattern has no fixed operative role by itself. In one system, it may be invalid; in another, it may serve as a separator, closure event, transition, or composition operator.

## 12. Stress Test: Two-Token Delimiter Presentations of Universal Computation

This section compares the theorem with two-token universal encodings. Binary universality challenges naive three-glyph claims, but it supports the fair-accounting thesis by showing role relocation rather than role elimination.

The strongest version of the delimiter point made here is not merely that delimiters can carry structure. It is that delimiter-shaped tokens can serve as the visible alphabet of a universal substrate. This can be shown conservatively by using known binary universal encodings. Binary lambda calculus and binary combinatory logic provide binary representations of lambda-calculus and combinatory-logic terms. Such systems use two token types, conventionally written as `0` and `1`, to encode universal computation.

Choose two delimiter-shaped marks, for example `(` and `)`, and define a token renaming `0 -> (` and `1 -> )`. Every binary program in the universal binary calculus has a corresponding delimiter-token string under this renaming. The parser and evaluator are unchanged except for the names of the two token types. Since the original binary calculus is universal, the delimiter-token presentation is universal as well.

This proof is deliberately modest. It does not claim that ordinary balanced punctuation, without further grammar, is automatically Turing complete. It claims that the visible marks normally regarded as delimiters can be chosen as the two tokens of a universal formal substrate. Their typographical identity as delimiters does not prevent them from serving as generative primitives.

**Stress-Test Observation: Two-Token Delimiter Universality.**  
If there exists a universal binary formalism over the alphabet `{0,1}`, then any pair of distinct visible marks, including a pair of delimiter marks, can serve as the visible alphabet of an isomorphic universal presentation by effective token renaming.

**Token-renaming argument.**  
Let `B` be a universal binary formalism over `{0,1}`. Let `{d0,d1}` be any pair of distinct marks. Define an injective renaming `r` by `r(0)=d0` and `r(1)=d1`, extended homomorphically over finite strings. For every binary string `s`, `r(s)` is a finite string over `{d0,d1}`. Parsing and evaluation can be transported through `r` by applying `r^{-1}` before using the original binary parser and evaluator, or equivalently by rewriting the parser to recognize `d0` and `d1` directly. Since `B` is universal, the renamed presentation is universal. ∎

This observation is not a two-role sufficiency result. It shows that two visible marks can encode a universal binary calculus when the binary parser, evaluator, application convention, boundary convention, and output convention are supplied. Under fair accounting, those supplied conventions remain part of the productive apparatus. The result is therefore treated here as role relocation, not role elimination.

## 13. Conditional Extension: Encapsulation and Computation

This section is a conditional extension. It explains what would follow if nesting, adjacency, or boundary patterns were assigned a direct effective rewrite discipline, without using such a construction as a premise of the main theorem.

The preceding observation uses token renaming and therefore proves universality at the level of a two-token visible alphabet. It does not, by itself, prove that balanced encapsulation alone is universal. A stronger delimiter-centered construction would assign computation directly to nesting, adjacency, boundary events, or rewrite behavior.

Delimiter-style systems provide a useful motivating form for this idea. In such a presentation, the primitive visible marks may be only an opener and a closer. The empty pair supplies a base object, while nesting and adjacency supply structural organization. Under an effective grammar and rewrite discipline, delimiter strings become operative objects rather than mere typographical groupings.

No full delimiter calculus is required as a premise. The claim is instead conditional and structural: if delimiter nesting, adjacency, or boundary patterns are assigned effective formal roles, then those roles belong to the operative presentation apparatus. If the resulting rewrite system is universal, then delimiters are primitive within that presentation while remaining derivative relative to any lower universal substrate that encodes it.

## 14. Witness Detail: A Local Delimiter Syntax

This section expands the visible witness already used above. The specific syntax is included because it shows delimiter-shaped marks functioning as operational primitives inside a counted grammar, not because the marks themselves are privileged.

As defined in the Witness Proposition, `Σ_W` assigns a left delimiter, a point mark, and a right delimiter as visible anchors for the α-, β-, and γ-role families inside the counted grammar and evaluator. This is the **delimiter witness presentation**. Any three distinguishable marks could play the same visible-anchor roles under an effective role-preserving translation.

The witness syntax makes the primitive role division visible without treating any glyph as productive in isolation. The left delimiter anchors the α role, the point mark anchors the β role, and the right delimiter anchors the γ role inside the counted grammar and evaluator. From these anchored roles and the counted apparatus, one can generate distinct formal structures such as `∅`, `(∅)`, `((∅))`, and `(∅(∅))`.

The distinctions arise from the interaction between determinate-presence marking and relational encapsulation. They are not tied to multiple named atoms. A string such as `∅∅∅∅∅∅` does not internally determine whether it is one extended state, six states, grouped states, a numeral, a program index, or an output stream. A pure delimiter string such as `(()())` makes relation visible, but without a determinate-presence marker it presents empty relation unless determinate presence is supplied by rule or context. The witness syntax displays visible anchors for all three primitive role-families at once: effective transition, determinate presence, and determinacy of transition over presence.

### 14.1 Local Role-Patterns Are Not the Invariant

The three-role basis is the invariant dependency claim; it is not a rule that every local expression must visibly contain one α-carrier, one β-carrier, and one γ-carrier in that order. A witness expression may contain local role-patterns such as `αββ`, `ββγ`, `ααβ`, or `γββ` when its carriers are classified at a particular layer of analysis. This does not change the three-role basis into one of those local patterns. It means only that, at that layer, the local carriers being inspected are serving those local roles.

For example, a point marker may be **β** at the object-expression layer because it supplies determinate presence. The encoded expression containing that marker may later become **β** at a meta-layer because the whole expression is now the determinate object inspected by a parser or evaluator. A rule that realizes **γ** at one layer may become **β** at another layer when it is encoded as a finite object of proof, transformation, simulation, or comparison. A stored rule may then become **α** when loaded and applied as the source of transition.

The distinction is between **local carrier classification** and **global productive dependency**. The witness syntax supplies visible role-carriers for the three-role basis, but the three-role basis does not require every subexpression, parse fragment, encoded object, or emergent pattern to display the whole triad locally. What must hold is that the full counted apparatus answers the effective-transition, determinate-presence, and determinacy-of-bearing questions somewhere.

## 15. Internalization Application: Self-Execution and Abstract Role-Carriers

This section applies the no-hidden-executor idea to self-execution. It explains how execution can be brought inside the counted apparatus rather than left as an external interpreter.

Turing completeness answers what can be simulated. Self-execution asks where the simulating activity is counted. A detached code string, by itself, is not yet a productive presentation unless some apparatus executes, evaluates, reduces, or transitions it. If an abstract reduction system or evaluator is supplied as part of the formalism, then that system is part of the counted apparatus. If that apparatus is instead treated as external and uncounted, then part of the productive machine has been hidden outside the presentation.

A self-executing presentation internalizes that executor. It supplies a configuration space, admissible initial states, transition rules, update discipline, and output convention inside the counted apparatus. Computation is then the evolution of configurations under the system's own transition discipline, not merely the evaluation of an inert string by an unspecified reader.

The three-role basis belongs to the productive-role layer. The witness syntax supplies visible role-anchors inside a local presentation language. Execution sketches do not define the basis or replace the universality witness. They show the same accounting principle dynamically: if execution is part of productivity, then configuration, transition, update order, boundary policy, and readout belong to the counted apparatus.

## 16. Stress Test: Carrier Relativity at Scale in Rule 110

This section is a scale test for carrier relativity. Rule 110 is not used to prove universality here; it shows how the primitive roles can remain functionally distinct while their carriers shift across computational layers.

At the cell-update layer, the role analysis classifies local update or row-to-row evolution as **α**, binary cell values and local neighborhoods as **β**, and the Rule 110 lookup rule that resolves each local neighborhood into its next-state value as **γ**.

At the emergent-particle layer, persistent localized structures become the determinate objects of description. On that layer of analysis, their propagation can be read as **α** because it carries formal movement through the field, while their collisions can be read as **γ** because interactions resolve into determinate outgoing structures, annihilations, or transformed patterns.

At the simulated-computation layer, **β** may be encoded symbolic data carried by the automaton's evolving structure, **α** may be the simulated computational step realized through the automaton's evolution, and **γ** may be the formal correspondence that resolves those evolutions as operations of the simulated system.

The lesson is not that the roles collapse. The lesson is that the carriers move. A binary automaton may have only two cell states at the surface, while its productive apparatus includes update, local resolution, boundary conventions, emergent carriers, and interpretation layers. Under fair accounting, those dependencies must be counted where they are carried.

## 17. Consequence: Primitive or Derivative Status Must Be Indexed

This section draws a consequence of the preceding accounting: primitive or derivative status is layer-relative and role-indexed, not an absolute property of an isolated mark.

In this terminology, a symbol cannot be both primitive and derivative in the same role at the same layer. It can be primitive at one layer and derivative at another. In an ordinary set-theoretic notation, braces may be primitive presentation marks. In a binary or combinatory substrate that encodes set-theoretic syntax, those braces are derivative encoded objects. In a delimiter-only calculus, delimiter marks may again be primitive. The role changes with the layer.

## 18. Consequence: Minimality and Redundancy

This section draws the corresponding minimality consequence. Additional marks may improve readability or interface design without being irreducible productive dependencies.

If a system uses delimiters as its generative substrate, then adding ordinary logical symbols as primitives may be useful for readability, but it is not generatively minimal relative to that substrate and encoding discipline when the added symbols carry no irreducible productive role beyond what the substrate and counted apparatus already supply. Conversely, if a system uses logical or combinatory operators as its generative substrate, adding delimiters as primitive marks is redundant in the same generative sense whenever their structural roles are derivable by encoding without adding an irreducible productive role.

This does not prove that there is one unique minimal basis. It shows that potential primitive bases can stand on equal operational ground without being jointly necessary for generative minimality when combined in a claimed minimal basis.

## 19. Related Work and Positioning

The argument is built from standard materials, but it asks a different accounting question. Classical computability theory supplies the background equivalence between effective procedures, Turing-computable functions, lambda-definability, and related models of computation (Church 1936; Turing 1936; Kleene 1952; Minsky 1967; Copeland 2024). Gödel-style coding shows that finite symbolic objects, proofs, and mechanical procedures can be effectively encoded (Gödel 1931). In this paper, those results support the encoding part of the Bridge Theorem: once the finite operational layer of a formal system is effectively specified, it can be represented inside a universal substrate.

Combinatory logic and lambda calculus supply the main universality witness. The tradition running from Schönfinkel and Curry through standard lambda-calculus and combinatory-logic treatments establishes SKI as a familiar universal applicative system whose terms and reductions can be effectively transported into a role-explicit visible syntax (Schönfinkel 1924; Curry and Feys 1958; Barendregt 1984; Hindley and Seldin 2008; Bimbó 2024).

Work on compact universal systems, including one-combinator systems, binary lambda calculus, binary combinatory logic, very small universal machines, and Rule 110, provides the main pressure test for the present claim (Barker 2001; Cook 2004; Stay 2005; Tromp 2006; Neary and Woods 2009). Such examples show that visible token count, state-symbol counts, or local rule descriptions can be driven very low. The fair-accounting framework explains why this need not eliminate productive roles: compressed encodings relocate or multiplex roles into parser, evaluator, machine configuration, transition convention, boundary discipline, background pattern, or readout apparatus.

Operational semantics, rewriting systems, abstract machines, and proof checking provide the practical model of formal productivity used here. Structural operational semantics defines behavior through syntactic configurations, transition relations, and rules (Plotkin 1981). Rewriting systems operate on formal objects by rule-governed replacements (Dershowitz and Jouannaud 1990; Baader and Nipkow 1998). Abstract state machines formulate algorithms in terms of states and state-transforming rules, and the ASM thesis gives a respected attempt to capture algorithms at their natural level of abstraction (Gurevich 2000). Model checking and transition-system methods likewise treat behavior through states, transitions, and satisfaction/readout conditions (Clarke, Grumberg, and Peled 1999). The three-role basis does not replace these frameworks. It abstracts the common dependency structure that appears when such systems are treated as productive effective presentations.

Work on mathematical notation and formal-language practice supports the distinction between visible marks and operative structure. Dutilh Novaes analyzes formal languages not merely as inert strings but as notational, cognitive, and rule-governed tools for reasoning (Dutilh Novaes 2012). Schlimm's systematic study of mathematical notations foregrounds the design, use, cognitive demands, material basis, and practice-dependence of notation (Schlimm 2025). This literature does not prove the three-role theorem, but it supports one of the paper's central premises: visible notation and operative mathematical work should not be conflated.

The physics-facing claim is supported only conditionally, and deliberately so. Gandy's principles for mechanisms and Deutsch's Church-Turing principle are examples of serious attempts to connect computation-like formal constraints with physical processes (Gandy 1980; Deutsch 1985; Copeland 2024). The present paper does not adopt those theses as premises and does not claim that physics is digital or computational. Their relevance is methodological: they show that it is legitimate, but delicate, to ask what structural constraints a physical process must satisfy if it is to be captured by a complete effective formal account. The present claim is narrower: if such an account is productive and effective, its counted apparatus must answer the three dependency questions isolated here.

Finally, Gödel and Tarski mark the boundary between internal formal consequence and truth or self-certification (Gödel 1931; Tarski 1936). These limitative results are not used to prove the main theorem. They support the paper's caution that a formal presentation, even one that can encode its own syntax or interpreter, does not thereby establish its own global truth about reality. That boundary is part of the reason the physics-facing conclusion is stated as a conditional search target rather than as a claim about physical composition.

## 20. Contribution: What Is New and What Is Not

The technical ingredients used here are standard. Effective coding of formal objects, mechanical proof checking, Turing-complete simulation, lambda calculus, combinatory logic, binary encodings, and Gödel-style encodings are not new. The theorem is therefore not offered as a surprising new result in computability theory.

The point is a consequence that is easily blurred in discussions of primitive formal alphabets:

```text
A primitive alphabet may be primitive for description while derivative for generation.
```

The phrase **three-role minimality** marks the claim for effectively presented symbolic formal systems. It does not replace existing notions such as interpretation, definitional extension, conservative extension, coding, or simulation. Rather, it emphasizes a particular comparison: the difference between a visible descriptive basis and the counted productive apparatus capable of operating the formal system. The resulting claim is concise: **alphabetic minimality is not productive-role minimality**.

The theorem also clarifies the slogan introduced above: **Turing completeness is not presentation-completeness**. Turing completeness is an extensional universality notion: it tells us what computations a specified system can simulate once its operative interpretation, transition discipline, state convention, and readout are in place. It does not, by itself, give a fair accounting of the apparatus that makes the simulation productive.

A formal language may be primitive as a descriptive notation: it may be the vocabulary in which a theory is stated, taught, extended, or used. At the same time, it may be derivative as a generative layer: its strings, parse trees, proof objects, delimiters, and checking procedures may be encoded within a smaller universal substrate. Under the fair-accounting framework developed here, primitive alphabets and presentation apparatuses in effectively presented symbolic formal systems function as descriptive interface primitives whenever their productive roles can be carried by lower-level or alternative effective apparatus. They are not absolute generative atoms simply because a given presentation treats them as primitive.

## 21. Objections and Replies

### 21.1 Encoding is layer-relative representation

Encoding a formal system inside a substrate establishes a relation between layers: a descriptive formal layer and a generative substrate capable of operating that layer. This relation is used only to compare primitive bases and presentation roles. It shows that a visible alphabet or presentation apparatus may be primitive for presentation while failing to be primitive for lowest-level operation.

### 21.2 Three-role dependency is not the claim that all truth is decidable

The assertion that effectively presented symbolic formal systems are three-role-minimal under fair accounting does not imply that all mathematical statements are decidable, that all truths of a theory are mechanically discoverable, or that undecidability disappears. It says only that the finite syntax, finite proof objects where present, presentation roles, and mechanical checking or transformation procedures of an effectively presented system must answer the α, β, and γ dependency questions somewhere in the counted productive apparatus, and that these roles can be given distinct visible anchors in a role-explicit realization.

### 21.3 Smaller substrates may be inefficient

A universal substrate with a small object-level basis may represent a larger formal system only through long, inefficient, unreadable encodings. This is granted. Efficiency, readability, and primitive-basis size are distinct properties. A notation may be practically superior while still being operationally reducible to a smaller basis.

### 21.4 SKI and similar systems still require application structure

Combinatory calculi require application structure or conventions for reading terms. Using SKI as a motivating example does not deny that structure; it asks where that structure is carried and counted. SKI remains a useful universal witness, but its productive presentation is more than the printed names `S`, `K`, and `I`. It includes application, parsing, reduction rules, arity discipline, and readout conventions. The visible witness is used to show that additional visible symbols are not strictly required for the relevant finite operational content, provided the grammar and evaluator are counted. This does not imply that richer notation should not be used. It only separates useful descriptive notation from irreducible productive role-dependence.

### 21.5 Three is a fair-accounting lower bound, not an unrestricted glyph impossibility theorem

The phrase "three-role dependency" is not a convenience benchmark. It marks the fair-accounting claim behind three-role minimality. Productive presentation must answer the α, β, and γ dependency questions somewhere in the full apparatus. Some presentations reduce the visible token count through one-combinator, binary, or other compressed encodings. These do not weaken the claim. They show that visible token count depends on layer, encoding discipline, and representation of application, while productive roles may be carried by hidden apparatus.

The stronger lower-bound claim in the Main Theorem is not a raw glyph-count claim over every compressed encoding. It concerns dependency roles in productive presentation under fair accounting. Binary encodings can be universal by relocating state, boundary, parsing, transition, application, or output roles into the interpreter or presentation apparatus. Once those productive dependencies are counted, the α, β, and γ questions must be answered somewhere in the full apparatus. When those roles are represented by distinct visible primitive marks in a faithful role-explicit realization rather than hidden or multiplexed in apparatus, this yields a three-symbol lower bound for visible role-carriers.

### 21.6 Minimal symbols abstract minimal roles only under faithful realization

Minimal symbol count and minimal role count are not identical by default, but they are structurally equivalent under faithful role-explicit realization. A primitive visible symbol is a carrier; a primitive role is the abstract dependency carried. The realization map `ρ_X : Σ_X -> Pow(A(X))` specifies this relation. If `ρ_X` gives each required role a distinct visible primitive carrier and does not use uncounted apparatus to decide which role a mark is playing, then the required visible alphabet for the three-role basis is isomorphic to the required three-role basis.

The equivalence fails when roles are multiplexed or relocated. A one-symbol system may use the same mark as state, boundary, and transition only if some context distinguishes these uses. A two-symbol system may carry three roles only if at least one symbol is role-multiplexed or at least one role is supplied outside the visible code. In both cases, the missing distinction is supplied by parser state, position, arity, machine configuration, transition convention, output convention, evaluator, or interpreter. Under fair accounting, that demultiplexing apparatus is part of the productive presentation. Thus compressed visible symbol count is not eliminated role count; it is relocated or multiplexed role structure.

### 21.7 The witness alphabet is not privileged by its glyphs

The witness alphabet is used as a clear example because it visibly separates anchors for effective transition, determinate presence, and determinacy of transition over presence inside a counted grammar and evaluator, while also showing that delimiter-shaped marks can have operative primitive roles. The argument does not claim that these glyphs are privileged. The Witness Proposition shows that these anchored roles can support a universal presentation; the typographical-neutrality observation shows that typographical identity is neutral under effective role-preserving translation. The primitive unit is the assigned formal role within a presentation, not the glyph itself.

### 21.8 Unary and binary encodings do not eliminate the missing roles

A unary encoding appears to use only one visible mark, but a bare repeated mark does not internally supply segmentation, grouping, output, or state distinction. Any such distinction is supplied by a boundary convention, length rule, external decoder, parser state, or evaluation context. Binary encodings can be universal, but they also rely on an evaluator and presentation apparatus that supplies the state, boundary, application, or output roles not visible as separate glyphs in the encoded string. These encodings are therefore compatible with the three-role lower-bound thesis: in the paper's accounting, they compress or relocate roles rather than eliminating them.

A simple diagnosis is provided by any renamed universal binary calculus. The visible program uses only two token types, but productive use of the code still requires a boundary convention for complete programs, a parser or decoding discipline for well-formed objects, an evaluator or transition rule for effective advance, and a readout convention for results. In that full presentation, the binary string supplies finite encoded presence, while advance and application/readout are carried by the supplied apparatus. The two-mark surface is therefore a compression of visible marks, not a disappearance of the productive dependencies.

### 21.9 Fair accounting is not arbitrary bookkeeping

The fair-accounting convention does not add arbitrary structure to force the conclusion. It is the no-hidden-executor condition: count the apparatus on which productivity actually depends, and do not treat that apparatus as free background. If a purported one- or two-symbol system can be parsed, evaluated, halted, updated, or read only because a boundary convention, interpreter state, transition rule, output convention, executor, or machine configuration is supplied, then that apparatus is part of the productive formal system. The lower-bound claim concerns the full productive presentation, not a detached printed code.

This is a strong but ordinary completeness demand. The count must be honest, true, and complete: honest because no required productive dependency may be hidden outside the presentation, true because the count must match the machinery actually used, and complete because it includes every dependency required for productive behavior whether or not that dependency is already named in the paper's examples. The intended test is functional rather than list-based: if productivity depends on a future or unfamiliar mechanism, fair accounting counts that mechanism by the role it supplies.

This is why the argument does not rely on standard alphabet-size alone. Alphabet-size alone is an incomplete measure of productive formal presentation whenever the encoding depends on uncounted machinery. If resolution/application is carried by a transition rule, then the γ question is answered by the transition rule; if state is carried by machine configuration, then the β question is answered by the configuration discipline. The theorem counts functional dependencies, not merely visible marks.

### 21.10 Delimiters are just punctuation

They may be punctuation in one notation, but that is not an intrinsic property. Under Definition 2, if their use changes formal structure or checking behavior, they have a formal role. If they are used as tokens in a universal binary formalism, they are generative tokens. Their role is assigned by the system.

### 21.11 Token renaming is too trivial

The renaming proof is intentionally trivial. Its point is not to discover a new universal calculus. Its point is to remove one assumed barrier: delimiter-shaped marks are not inherently non-generative. A mark's ordinary use as punctuation does not prevent it from serving as a primitive token of a universal presentation.

### 21.12 Balanced delimiters alone have not been proved universal here

Two claims should be distinguished. The first, proved by token renaming, is that delimiter-shaped tokens can be the alphabet of a universal presentation. The second, suggested by delimiter-calculus examples, is that nesting and encapsulation can be assigned operative roles and may support universal systems when equipped with suitable rewrite rules. This manuscript does not depend on the second claim as a premise.

### 21.13 Descriptive foundations remain legitimate

Nothing in the argument prevents set theory, type theory, arithmetic, or other systems from serving as descriptive or organizational foundations. The argument separates descriptive foundational roles from generative substrate roles. A theory may remain foundational for mathematical practice, in that descriptive or organizational sense, even if it is operationally reducible to a smaller computational substrate.

### 21.14 Infinite variable supplies do not automatically escape the argument

Many formal languages use infinitely many variables. In ordinary presentations, however, variable names and finite expressions are generated by finite effective rules. Such systems remain effectively presented in the relevant sense. The argument fails only for systems whose formation, checking, or derivation conditions are genuinely non-effective or not finitely specifiable.

De Bruijn indices provide a concrete example of this relocation of structure. Named variables are useful at the descriptive interface, but bound-variable names can be replaced by numerical references to binding depth. This removes dependence on an infinite supply of distinct bound-variable names and turns alpha-equivalent terms into a more canonical nameless representation. The point is not that de Bruijn notation is always preferable for human use; it is that a feature that appears alphabetic or name-based at one layer can be shifted into structural encoding at another layer. This illustrates the claim that visible primitive resources and operative generative structure need not coincide.

### 21.15 Human readability still matters

Human readability matters for proof practice, pedagogy, debugging, and theory design. The claim is not that delimiters should be removed from ordinary notation. The claim is that their usefulness does not make them absolute generative primitives.

### 21.16 Does execution require state?

Yes, but state need not always appear as a third visible glyph in a compressed code. A formal presentation and its execution should be distinguished. A two-token alphabet can be sufficient for universal symbolic representation, but productive execution requires distinguishable configurations, output, base conditions, or state-bearing structures somewhere in the full formal machine. In binary systems, those roles may be supplied by machine configuration, tape state, parser state, halting convention, or evaluator context rather than by a separate printed symbol. Three-role minimality says that productive presentation must answer the α, β, and γ dependency questions somewhere; it does not say that every compressed encoding must print those roles as three glyphs.

### 21.17 Informal practice exceeds any single formal presentation

The Main Consequence applies only to symbolic formal systems insofar as their relevant objects and operations are effectively presented. It does not try to capture mathematical practice, informal explanation, design intent, or interpretation outside the counted effective apparatus.

### 21.18 Self-execution does not mean every notation executes itself as written

The self-execution thesis is an internalization claim, not an intrinsic property of marks. It does not say that a formula, program string, or delimiter expression executes without rules. It invokes the standard universal-machine observation that, in ordinary computability settings, an effective external interpreter can be represented in a transition system's own configuration and rule. The uncounted interpreter becomes counted apparatus.

## 22. Limits of the Claim

The argument does not rely on three constructors as a mere convenience benchmark. It claims that three functional dependency questions must be answered under fair accounting of productive presentation. Their universal descriptions are schematic; their precise descriptions are local. Some systems compress below three visible token types under particular conventions, but they do so by relocating one or more required answers into apparatus. The argument does not show:

```text
1. that three visible glyphs are the absolute minimum for every compressed encoding;
2. that any particular three-symbol glyph set is uniquely fundamental;
3. that ordinary mathematical notation should be abandoned;
4. that formal systems are unreal or merely illusory;
5. that representability settles every question of priority or interpretation;
6. that smaller primitive bases are computationally efficient;
7. that all notions of primitiveness reduce to alphabet size;
8. that non-effective formal systems are reducible in this sense;
9. that all mathematical truth is decidable or mechanically discoverable;
10. that informal mathematical understanding is exhausted by formal syntax;
11. that notation-invariance up to effective encoding erases differences in
    use, readability, or proof practice;
12. that ordinary delimiters are intrinsically Turing complete;
13. that balanced set notation alone is universal without additional rules;
14. that concrete execution requires no material or implementation-level state;
15. that there is a unique minimal universal alphabet;
16. that binary or unary encodings are impossible; they are instead treated as compressed presentations that relocate roles into apparatus;
17. that developmental execution sketches are premises of the formal proof;
18. that suggestive external mappings count as established results without separate validation;
19. that α, β, and γ have been exhaustively defined by a complete universal dictionary;
20. that physical reality is formalizable as an effective productive formal system;
21. that the theorem explains why any productive presentation exists, why a presentation boundary is in force, or why one apparatus rather than another obtains.
```

The possible physical significance is therefore conditional. If physical reality has a complete effective productive formal presentation, then the Main Theorem applies to that presentation as a formal presentation. In that case the three role-families would constrain any such formal account. The point is not that the present manuscript identifies the physical origin of that pattern, the reason the formal presentation exists, or the missing machinery by which an apparatus is selected or put in force. Nor does it cross the broader philosophy boundary between internal formal consequence and truth about real things. That boundary is general: formal consequence alone does not establish why a formal presentation is true of reality rather than merely internally well governed. It identifies a conditional target: if the antecedent holds, then an adequate formal account should supply, in some recognizable local form, the productive-role shape isolated here.

The result is restricted to effective presentation and operational simulation. Within that restriction, effectively presented symbolic formal systems are three-role-minimal under fair accounting, and primitive alphabets and presentation apparatuses are layer-relative. The broader implications are likewise restricted: formal foundations are layered, relocatable, and interface-mediated only in the operational sense developed above.

## 23. Conclusion

The result is that **the three-role basis is the minimal productive role basis of effectively presented symbolic formal systems under fair accounting**. Any such system, when productive, must answer the α, β, and γ dependency questions somewhere in its counted productive apparatus, and no proper subset suffices unless the missing question is answered elsewhere in counted apparatus. This applies insofar as finite objects, role distinctions, formation rules, transformations, derivations, evaluations, or checks form part of an effectively presented symbolic formal system; effectively formalized mathematics is one important instance.

Primitiveness is a same-layer dependency claim. A symbol is primitive at a layer only when the role it carries is one of that layer's starting resources rather than a role derived from other counted resources in the same layer. If a reduced presentation hides one of the required dependency answers in parser structure, transition rules, boundary conventions, state conventions, output conventions, or an interpreter, the dependency has not been eliminated. It has been carried elsewhere, and fair accounting counts it there.

Within effectively presented symbolic formal systems, this separates alphabetic economy from productive-role economy. Surface compression is not formal economy unless the dependency answers compressed out of the visible alphabet are also absent from the counted apparatus. A compact notation may be excellent for human-facing description while relying on productive roles carried by lower or alternative apparatus.

SKI illustrates the point in a precise way. Its visible combinator basis is genuinely small, but its printed names do not themselves display the productive-role basis. The three roles become visible only when the full applicative apparatus is counted: terms and application trees, reduction clauses, arity discipline, parsing, evaluator convention, and readout. Thus SKI is not a counterexample to three-role minimality; it is evidence that visible primitive bases and minimal productive roles are different accounting targets.

This also separates Turing completeness from presentation-completeness. A system may be universal in the standard computational sense while leaving its executor, parser, state discipline, boundary convention, or readout outside the visible code. Fair accounting does not deny the universality claim; it completes the presentation account by asking where those productive dependencies are carried.

The lower-bound claim is role-theoretic, not a raw glyph-count theorem. Nor does it require a complete definition of every primitive-role realization. It says that productive presentation must answer the three primitive dependency questions somewhere in the counted apparatus. It becomes a three-symbol lower bound only for faithful role-explicit visibility, where the required role-families are carried by distinct visible primitive marks rather than hidden or multiplexed elsewhere.

The bound is tight in that class. The delimiter witness gives an operationally faithful visible anchoring of the three role-families, and an explicit grammar encodes SKI combinatory logic into that witness syntax. Thus the three dependency answers are necessary under fair accounting, and three visible anchors with counted operational apparatus are sufficient for role-explicit universal presentation.

Self-execution completes one side of the accounting picture. Turing completeness says what can be simulated; self-execution asks where the simulating activity is carried. The three-role basis describes the abstract role framework: effective transition, determinate presence, and determinacy of transition over presence. The visible syntax only witnesses that framework locally. Execution sketches do not replace the three-role minimality theorem; they show how the executor itself can be brought inside the counted apparatus rather than left as hidden background.

This gives the physics-facing motivation its proper form. The paper does not infer physical composition from a formal accounting theorem. It does establish a strong conditional target: in any candidate effective productive formal account, including a formal account proposed for physical dynamics, the three dependency questions must be answered somewhere in the counted apparatus. The carriers may be unfamiliar, hidden, fused, or relocated, but the dependency questions cannot simply disappear.

## Acknowledgments

The author thanks readers who provide formal criticism, domain-specific references, and publication guidance.

## References

Baader, F., & Nipkow, T. (1998). *Term Rewriting and All That*. Cambridge University Press.

Barendregt, H. P. (1984). *The Lambda Calculus: Its Syntax and Semantics* (revised ed.). North-Holland.

Barker, C. (2001). *Iota and Jot: The Simplest Languages?* Archived project page.

Bimbó, K. (2024). *Combinatory Logic*. In E. N. Zalta & U. Nodelman (Eds.), *The Stanford Encyclopedia of Philosophy*. https://plato.stanford.edu/entries/logic-combinatory/

Church, A. (1936). An unsolvable problem of elementary number theory. *American Journal of Mathematics, 58*(2), 345–363.

Clarke, E. M., Grumberg, O., & Peled, D. A. (1999). *Model Checking*. MIT Press.

Cook, M. (2004). Universality in elementary cellular automata. *Complex Systems, 15*(1), 1–40. https://doi.org/10.25088/ComplexSystems.15.1.1

Copeland, B. J. (2024). *The Church-Turing Thesis*. In E. N. Zalta & U. Nodelman (Eds.), *The Stanford Encyclopedia of Philosophy*. https://plato.stanford.edu/entries/church-turing/

Curry, H. B., & Feys, R. (1958). *Combinatory Logic, Volume I* (with two sections by W. Craig). North-Holland.

de Bruijn, N. G. (1972). Lambda calculus notation with nameless dummies: A tool for automatic formula manipulation, with application to the Church-Rosser theorem. *Indagationes Mathematicae, 34*, 381–392.

Dershowitz, N., & Jouannaud, J.-P. (1990). Rewrite systems. In J. van Leeuwen (Ed.), *Handbook of Theoretical Computer Science, Volume B: Formal Models and Semantics* (pp. 243–320). Elsevier and MIT Press.

Deutsch, D. (1985). Quantum theory, the Church-Turing principle and the universal quantum computer. *Proceedings of the Royal Society of London A, 400*(1818), 97–117. https://doi.org/10.1098/rspa.1985.0070

Dutilh Novaes, C. (2012). *Formal Languages in Logic: A Philosophical and Cognitive Analysis*. Cambridge University Press.

Gandy, R. (1980). Church's thesis and principles for mechanisms. In J. Barwise, H. J. Keisler, & K. Kunen (Eds.), *The Kleene Symposium* (pp. 123–148). North-Holland.

Gödel, K. (1931). Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I. *Monatshefte für Mathematik und Physik, 38*, 173–198.

Gurevich, Y. (2000). Sequential abstract-state machines capture sequential algorithms. *ACM Transactions on Computational Logic, 1*(1), 77–111.

Hindley, J. R., & Seldin, J. P. (2008). *Lambda-Calculus and Combinators: An Introduction* (2nd ed.). Cambridge University Press.

Kleene, S. C. (1952). *Introduction to Metamathematics*. North-Holland.

Minsky, M. L. (1967). *Computation: Finite and Infinite Machines*. Prentice-Hall.

Neary, T., & Woods, D. (2009). The complexity of small universal Turing machines: A survey. *Theoretical Computer Science, 410*(4–5), 443–450. https://doi.org/10.1016/j.tcs.2008.09.051

Plotkin, G. D. (1981). *A Structural Approach to Operational Semantics*. DAIMI FN-19, Aarhus University.

Schlimm, D. (2025). *Mathematical Notations*. Cambridge University Press. https://doi.org/10.1017/9781009472128

Schönfinkel, M. (1924). Über die Bausteine der mathematischen Logik. *Mathematische Annalen, 92*, 305–316.

Stay, M. (2005). Very simple Chaitin machines for concrete AIT. *Fundamenta Informaticae, 68*(4), 339–361.

Tarski, A. (1936). Der Wahrheitsbegriff in den formalisierten Sprachen. *Studia Philosophica, 1*, 261–405.

Tromp, J. (2006). Binary lambda calculus and combinatory logic. *Dagstuhl Seminar Proceedings 06051*. https://doi.org/10.4230/DagSemProc.06051.4

Turing, A. M. (1936). On computable numbers, with an application to the Entscheidungsproblem. *Proceedings of the London Mathematical Society, 42*(2), 230–265.

---


