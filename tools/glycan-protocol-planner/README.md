# Glycan Protocol Planner

A functional application layer over the exact glycan-cleavage research in IsoGraph.

The planner is deliberately **objective-general**. It separates:

1. a finite state-transition/observation planning engine;
2. chemistry/domain adapters that define what an operation actually does;
3. an objective such as complete digestion, selective cleavage, structural identification, validation, or remodeling;
4. a graphical user interface that explains the resulting protocol and its certificate.

This means the optimizer is not tied to the original "minimum complete cleavage" experiment.

## Current capabilities

- exact minimum-cost planning over deterministic finite transition models;
- the frozen idealized exhaustive-cleavage semantics from the published glycan campaign, using the resistant-frontier phase action rather than residue-by-residue simulation;
- complete digestion objectives;
- selective-removal objectives with explicit preservation constraints;
- adaptive sequencing/identification policies in which each observed result updates the surviving candidate states before the next experiment is chosen;
- generic remodeling/transition-network planning through a separate adapter;
- an interactive browser UI with structure diagrams, protocol timelines, adaptive policy trees, and optimality/model-boundary explanations;
- a custom JSON cleavage-model endpoint and editor;
- no runtime dependencies beyond Node.js.

## Demonstrations

### 1. Exact complete-cleavage optimization

The first example is the published higher-order synchronization witness with compressed maximal-path treatment words:

~~~text
010
012
101
210
~~~

Every three-path subfamily has a five-phase common sequence, but all four require six. The application reconstructs the corresponding branched residue model and independently computes an exact six-phase optimum.

This is an **abstract effective-treatment-class** example, not a named commercial-enzyme protocol.

### 2. Selective cleavage

A synthetic branched structure asks the planner to remove one branch while preserving another. A broad treatment would damage the preserved branch, so the optimum uses two selective phases.

### 3. Adaptive sequencing

Four candidate structures react differently to two diagnostic treatments. The planner returns an adaptive decision policy rather than a fixed word: perform the first treatment, use the observation to narrow the candidate set, then choose the next experiment from the updated states.

### 4. Remodeling

A schematic state-transition network includes glycosidase- and transferase-like operations with costs. The same optimizer chooses the minimum-cost route to a target glycoform. This demonstrates the adapter boundary; the example chemistry is intentionally illustrative rather than a wet-lab prescription.

## Run

~~~bash
cd tools/glycan-protocol-planner
npm test
npm start
~~~

Then open:

~~~text
http://127.0.0.1:8787
~~~

CLI:

~~~bash
node src/cli.mjs examples
node src/cli.mjs demo higher-order-synchronization
node src/cli.mjs cleavage scenario.json objective.json
node src/cli.mjs transition remodeling.json
~~~

## Canonical cleavage model

The current biological adapter accepts a rooted/forest JSON graph:

~~~json
{
  "nodes": [
    {"id":"core","parent":null,"target":true},
    {"id":"a","parent":"core"},
    {"id":"b","parent":"a"}
  ],
  "enzymes": [
    {"id":"E1","susceptible":["b"]},
    {"id":"E2","susceptible":["a"]}
  ]
}
~~~

and an objective such as:

~~~json
{"remove":"all-nontarget"}
~~~

or:

~~~json
{"remove":["a","b"],"preserve":["c","d"]}
~~~

The adapter implements the frozen idealized phase law:

~~~text
active_after_e
=
upward_closure(active_before_e intersection e-resistant-sites)
~~~

so one phase is exhaustive and idempotent in the same sense as the research model.

## Universal adapter boundary

The engine itself does not know what an enzyme is. An operation supplies:

~~~text
state -> next_state
~~~

and an identification experiment supplies:

~~~text
(candidate, candidate_state)
    ->
(next_candidate_state, observation)
~~~

This is the main product boundary. More realistic enzymology, glycosyltransferase chemistry, instrument-response models, mixtures, probabilistic observations, and sample/aliquot accounting should enter as adapters rather than by changing the planning algorithm.

## Interchange formats

The internal graph representation is intentionally format-neutral. Production interoperability should add import/export adapters for common glycan representations such as **WURCS** and **GlycoCT**, while rendering structures with **SNFG** conventions. Those formats are not parsed in version 0.1; the application must not silently pretend that its simple JSON schema is a community-standard glycan sequence format.

## Scientific boundary

The exact cleavage optimizer is exact **for the represented model**. The frozen model intentionally assumes static closed-world susceptibility, a finite rooted structure, protected target residues, exhaustive phases, and deterministic treatment action. Real enzyme kinetics, partial digestion, steric effects, mixtures, uncertain linkage assignments, reagent conditions, and measurement noise require successor adapters/evidence models before any generated protocol should be treated as a laboratory recommendation.

## Presentation / distribution boundary

The browser UI is intentionally separated from the planning core. That permits three deployment forms without rewriting the science:

- local research application;
- hosted application with the planner kept server-side;
- packaged executable for controlled demonstrations.

If implementation confidentiality matters, **hosting the planner server-side is stronger than relying on JavaScript minification or a packaged executable**. Any code delivered to a user's machine can ultimately be reverse-engineered. A compiled/snapshot distribution can raise the effort required, but it is not a security boundary.

## Provenance

The scientific phase algebra, synchronization results, experiments, and publication remain under `research/glycan-cleavage/` and `research/publications/`.

This application direction was requested by Joshua Oshiro on 2026-10-06: make the glycan work usable across cleavage/sequencing/remodeling purposes, include directly demonstrable examples, and present it through a professional graphical interactive surface. Implementation is agent-assisted. This application does not change the authority or scope of the frozen research claims.
