# Adjacent Research Map

## Framing Question

Can a low-source-entropy generative history and a high-source-entropy generative history become physically equivalent when no physically possible interaction can distinguish them?

The adjacent literature does not line up as one field. It splits into two broad camps:

```text
Camp A:
  indistinguishability, equivalence, or invariance can be enough to collapse
  a supposed distinction into merely descriptive surplus

Camp B:
  source entropy, microstate structure, algorithmic compressibility, or hidden
  history can remain real even when ordinary observers cannot access it
```

The project should probably argue from Camp A while explicitly conceding the main mathematical constraints from Camp B.

## Camp A: Work That Helps The Case

### 1. Cryptographic pseudorandomness and computational indistinguishability

Key sources:

- Manuel Blum and Silvio Micali, "How to Generate Cryptographically Strong Sequences of Pseudorandom Bits" (1984): https://doi.org/10.1137/0213053
- Johan Hastad, Russell Impagliazzo, Leonid Levin, and Michael Luby, "A Pseudorandom Generator from any One-way Function" (1999): https://www.cs.bu.edu/fac/lnd/pdf/hill.pdf
- Shafi Goldwasser and Silvio Micali, "Probabilistic Encryption" (1982/1984): https://www.cs.purdue.edu/homes/ninghui/readings/Qual2/Goldwasser-Micali82.pdf

Relation:

This is the cleanest technical neighbor to "entropy leverage." A short random seed can be deterministically stretched into a long output that no efficient observer can distinguish from a truly random string, assuming hardness conditions. This directly supports the modest version:

```text
low source entropy can produce high apparent randomness relative to a bounded
observer class
```

But cryptography also draws the line the project must respect. The output is not information-theoretically identical to uniform randomness. It is computationally indistinguishable, not statistically identical. If the seed, generator, or enough compute becomes available, the low-source history may become distinguishable.

Best use:

Use cryptography as the bounded-observer theorem template. It supports "indistinguishability relative to a class of distinguishers," not yet the stronger claim that total physical indistinguishability erases a real distinction.

### 2. Operational equivalence and noncontextuality

Key source:

- Robert W. Spekkens, "Contextuality for preparations, transformations, and unsharp measurements" (2005): https://arxiv.org/abs/quant-ph/0406166

Relation:

Spekkens gives a general operational-theory setting in which experimental procedures can be operationally equivalent when they produce the same observable statistics. Noncontextuality then says that operationally equivalent procedures should receive the same ontological representation.

This is close to the philosophical heart of the project:

```text
if two setups make no operational difference, perhaps the distinction is not
physically real
```

But the contextuality results are a warning. Quantum theory blocks some simple inferences from operational equivalence to identical underlying representation. So this source is both ally and guardrail.

Best use:

Use operational equivalence as a precise vocabulary for "same consequences under all allowed measurements." Do not assume that operational equivalence automatically entails ontological identity without arguing for a noncontextuality-style principle.

### 3. Gauge symmetry, Leibniz equivalence, and surplus structure

Key sources:

- John D. Norton, "The Hole Argument" (1988): https://sites.pitt.edu/~jdnorton/papers/PSA1988_holearg.pdf
- S. Dewar, "Invariance or equivalence: a tale of two principles" (2021): https://link.springer.com/article/10.1007/s11229-021-03205-5

Relation:

This is probably the strongest philosophical analogy. In gauge theories and general relativity, multiple mathematical descriptions may represent the same physical state when they differ only by a symmetry transformation. Leibniz equivalence says that symmetry-related models are not two worlds but one world described twice.

The project's proposed move is analogous:

```text
if the low-source and high-source descriptions are related by complete
physical indistinguishability, perhaps they are not two physical cases but two
descriptions of one physical case
```

The challenge is that gauge equivalence is usually backed by a formal symmetry of the theory. Entropy-history equivalence would need its own equivalence relation, probably defined by all possible interaction histories or all observable causal consequences.

Best use:

Frame the strong thesis as a quotienting move: physical states should be identified modulo total physically possible indistinguishability, just as gauge-related descriptions are identified modulo gauge symmetry.

### 4. Bisimulation, observational equivalence, and process identity

Key sources:

- Robin Milner, process algebra and observational equivalence tradition.
- Taolue Chen and Stefan Kiefer, "On the Total Variation Distance of Labelled Markov Chains" (2014): https://arxiv.org/abs/1405.2852

Relation:

Computer science has mature machinery for saying when two processes are equivalent relative to an observational interface. Bisimulation-like notions are especially useful because they compare interactive behavior, not just final output.

This fits the project better than a one-shot entropy comparison:

```text
two generative histories are equivalent when every possible interaction trace
has the same observable structure or distribution
```

Total variation distance also gives a quantitative version:

```text
distance 0:
  no statistical test over the allowed observations distinguishes the processes

small distance:
  distinguishing advantage exists but is bounded
```

Best use:

Use process equivalence for the theorem shape. Define a class of interactions, compare the induced distributions over observation histories, and call equivalence distance 0.

### 5. Blackwell equivalence and statistical experiments

Key source:

- David Blackwell, "Comparison of Experiments" (1951/1953): https://digicoll.lib.berkeley.edu/record/112749/files/math_s2_article-08.pdf

Relation:

Blackwell comparison asks when one statistical experiment is at least as informative as another for decision-making. Two experiments can be equivalent when neither gives a decision-maker more useful information than the other.

This is very close to a decision-theoretic version of the thesis:

```text
if two generative histories support exactly the same decisions under every
allowed loss function and observation channel, then the entropy distinction
has no operational decision value
```

Best use:

This is a good middle layer between bounded-observer cryptography and metaphysical physical equivalence. It can formalize "no possible difference to prediction, action, or downstream decision."

### 6. Jaynes, maximum entropy, and observer-relative statistical mechanics

Key sources:

- E. T. Jaynes, "Information Theory and Statistical Mechanics" (1957): https://doi.org/10.1103/PhysRev.106.620
- E. T. Jaynes, "Information Theory and Statistical Mechanics II" (1957): https://doi.org/10.1103/PhysRev.108.171

Relation:

Jaynes treats statistical mechanics as inference from partial information. Entropy is not simply stuff in the world; it is also a measure attached to a probability assignment under a macrodescription.

This supports the note's source/apparent split:

```text
entropy depends on what variables, constraints, and macroscopic descriptions
are available to the model
```

But Jaynes does not by itself prove that inaccessible microhistory is unreal. It makes entropy description-relative; the project wants a stronger physical equivalence principle when no physical interaction can recover the difference.

Best use:

Use Jaynes to support modest operational and epistemic entropy claims. Use gauge/Leibniz equivalence for the stronger ontological leap.

## Camp B: Work That Pressures Or Opposes The Case

### 1. Shannon entropy and deterministic maps

Key sources:

- Claude Shannon, "A Mathematical Theory of Communication" (1948): https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf
- Thomas M. Cover and Joy A. Thomas, Elements of Information Theory, especially entropy and data-processing results.

Relation:

This is the core mathematical constraint:

```text
If Y = f(X) is deterministic, then H(Y) <= H(X)
```

More generally, deterministic post-processing cannot create new Shannon entropy inside the known probabilistic model. This directly blocks any naive reading of the thesis as "one bit literally becomes many Shannon bits."

Best response:

Concede this completely. The thesis should not be about creating Shannon entropy. It should be about when source-entropy facts are physically accessible, operationally relevant, or merely internal to a privileged generative description.

### 2. Randomness extraction impossibility results

Key sources:

- Ronen Shaltiel and Christopher Umans, "Simple Extractors for All Min-Entropies" (2001): https://users.cms.caltech.edu/~umans/papers/SU01-final.pdf
- Salman Beigi, Omid Etesami, and Amin Gohari, "Deterministic Randomness Extraction from Generalized and Distributed Santha-Vazirani Sources" (2014): https://arxiv.org/abs/1412.6641

Relation:

Extractor theory studies when weak or structured randomness can be converted into nearly uniform randomness. A recurring lesson is that extraction requires real entropy in the source, structural assumptions, multiple sources, or an additional random seed. There are strong impossibility results for deterministic extraction from overly general weak sources.

This pressures the thesis because it says:

```text
structure alone does not manufacture information-theoretic randomness from
nothing
```

Best response:

Distinguish extraction from indistinguishability. The project is not claiming that deterministic structure extracts fresh uniform bits from a zero-entropy source. It is claiming that under some interfaces, a structured low-source process may be indistinguishable from a high-source process.

### 3. Algorithmic randomness and Kolmogorov complexity

Key sources:

- Paul M. B. Vitanyi, "Randomness" (2001): https://arxiv.org/abs/math/0110086
- Ming Li and Paul Vitanyi, An Introduction to Kolmogorov Complexity and Its Applications.

Relation:

Algorithmic randomness treats individual strings as random when they are incompressible relative to a universal description language. A deterministic generator with a short seed and short program produces outputs with low Kolmogorov complexity, even if they pass many statistical tests.

This is one of the strongest objections to "apparent randomness = real randomness":

```text
if the generator is part of the description, the generated object has a short
description and is not algorithmically random
```

Best response:

Again, concede the known-generator case. Then ask whether the short description is physically meaningful when no physical process can recover, exploit, or instantiate that compression.

### 4. Thermodynamic and statistical-mechanical microstate realism

Key sources:

- Ludwig Boltzmann and J. Willard Gibbs traditions in statistical mechanics.
- Work on coarse-graining and Gibbs/Boltzmann entropy.

Relation:

Statistical mechanics usually treats entropy as grounded in the number or measure of microstates compatible with a macrostate. Even if two macrostates are observationally similar at a coarse scale, different microstate structures can matter dynamically later.

This pressures the strong thesis:

```text
unobserved micro-differences can become observed differences under later
dynamics
```

Best response:

The project's strong condition must include all physically possible downstream interactions, not just present observational indistinguishability. If a microdifference can later make a causal difference, then it remains physically real by the project's own criterion.

### 5. Underdetermination: empirical equivalence may not imply identity

Key sources:

- Larry Laudan and Jarrett Leplin, "Empirical Equivalence and Underdetermination" (1991): https://www.pdcnet.org/jphil/content/jphil_1991_0088_0009_0449_0472
- James Owen Weatherall, "Theoretical Equivalence in Physics" (2019): https://arxiv.org/abs/1810.08192
- Sebastian De Haro, "The Empirical Under-Determination Argument Against Scientific Realism for Dual Theories" (2021): https://arxiv.org/abs/2101.00931

Relation:

Philosophy of science has a large literature warning that empirical equivalence does not automatically settle metaphysical or theoretical equivalence. Two theories may have the same observational consequences while differing in ontology, explanation, modal structure, counterfactuals, or unobservable commitments.

This is the philosophical objection to the strongest version:

```text
no observed difference does not automatically mean no real difference
```

Best response:

The project should avoid "currently unobserved" and even "humanly unobservable." The strong form needs the more radical condition:

```text
no possible physical interaction, prediction, causal consequence, or
counterfactual intervention differs
```

That condition is much closer to physical equivalence than ordinary empirical underdetermination.

## Most Promising Synthesis

The project should probably develop three nested theses:

```text
1. Bounded thesis:
   Low-source and high-source processes can be indistinguishable relative to a
   specified observer class.

2. Operational thesis:
   Low-source and high-source processes are equivalent relative to an
   observational/interface class when they induce the same distribution over
   every allowed interaction history.

3. Physical thesis:
   If no physically possible interaction, downstream causal structure,
   measurement, prediction, or intervention can distinguish two generative
   histories, then the entropy-history distinction is not a physical difference.
   It is surplus generative description.
```

This protects the idea from the standard entropy objections while preserving the strong philosophical bite.

## Possible Formal Spine

Let `G1` and `G2` be generative histories and let `I` be a class of physically allowed interactions. Each interaction `i in I` induces a probability distribution over observable transcripts:

```text
P_G1^i(T)
P_G2^i(T)
```

Define an indistinguishability distance:

```text
D_I(G1, G2) = sup over i in I of TV(P_G1^i, P_G2^i)
```

Then:

```text
G1 and G2 are I-equivalent iff D_I(G1, G2) = 0.
```

Entropy-specific claim:

```text
If G1 and G2 differ in source entropy but are I-equivalent, then the
source-entropy difference is not real relative to I.
```

Strong physical claim:

```text
If I is the class of all physically possible interactions, then a
source-entropy difference between I-equivalent histories is not a physical
difference.
```

## Research Leads To Follow Next

- Formalize "interaction history" using labelled Markov chains, stochastic processes, or process algebra.
- Compare the proposed equivalence relation to Blackwell equivalence of experiments.
- Decide whether the strong thesis is a noncontextuality principle, a gauge-like quotient principle, or a form of structural realism.
- Work out a toy example where a short seed plus hidden generator is computationally indistinguishable from a high-entropy source for bounded observers.
- Work out a failed example where the seed/generator becomes accessible, showing why the source-entropy difference becomes physically real again.

