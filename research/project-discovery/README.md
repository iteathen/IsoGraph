# Project Discovery research

**Current research dossier:** this README  
**Research status:** early prototype / proof-of-function research program; the intended mature Project Discovery has not yet been built.

## Mission

Project Discovery is intended to become a **large-scale research-synthesis program built on the IsoGraph family**.

Its long-term objective is not merely to run a small collection of cross-domain examples. It is to apply exact structural representation, recursive derivation, discovery, falsification, evidence analysis, and—when warranted—experimental inquiry across a very large research corpus so that many investigations can proceed in parallel.

The intended mature loop is:

~~~text
large research corpus
-> exact / auditable IsoGraph renderings
-> recursive implicit structure
-> within-domain discovery
-> cross-domain discovery
-> candidate syntheses / reductions / distinctions / conjectures
-> falsification + prior-art search + independent review
-> experiment when warranted
-> validated findings / negative results / open questions
-> new research structure returned to the corpus
-> repeat continuously
~~~

The goal is **rapid, compounding research synthesis**: every defensible finding, falsifier, structural motif, failed hypothesis, evidence distinction, and unresolved question becomes input to later research rather than disappearing into an isolated report.

Project Discovery should search for useful structure, not for dramatic headlines. A correct negative result, a hidden dependency, a simpler factorization, a transferable method, a previously unnoticed equivalence, an obstruction, or a well-posed new experiment may all be valuable outcomes.

## Intended scale

The mature vision is substantially larger than the current repository campaign.

A fully realized Project Discovery may require **hundreds or thousands of specialized research agents operating concurrently**, backed by substantially greater inference, computation, storage, indexing, orchestration, and verification capacity than the current prototype.

At that scale, agents should not simply read papers independently and produce summaries. They should participate in a coordinated research system with specialized roles such as:

- source acquisition and corpus curation;
- exact rendering and Source Semantic Census construction;
- rendering reconstruction/audit;
- recursive Implicit Assertion generation;
- QU / NEI / DTS analysis where load-bearing;
- within-domain synthesis;
- cross-domain structural retrieval and comparison;
- Minimum Sufficient Support / valuation analysis;
- counterexample and falsifier search;
- computational experiment design/execution;
- prior-art and novelty review;
- independent adversarial review;
- replication and reproducibility;
- research-dossier and publication preparation.

Discovery capacity and verification capacity must scale together. A system that can generate thousands of candidate findings but cannot independently test, falsify, reproduce, and prioritize them would create noise rather than science.

## Current state

Project Discovery is **not yet that system**.

The current repository contains a small number of bounded campaigns that demonstrate pieces of the intended pipeline.

Preserved campaigns include:

- `2026-09-25-dp07-three-positive-controls/` — a three-positive-control DP 0.7 discovery/qualification campaign using exact source renderings for Ising↔lattice-gas, XOR↔GF(2), and Newton↔Hamilton;
- `2026-09-25-ising-mwc-dp07/` — an exploratory Ising/MWC comparison that retained a real common statistical-mechanics layer while rejecting whole-system isomorphism because the interaction mechanisms differ.

Adjacent IsoGraph application research in glycan cleavage, Navier–Stokes proof structure, P versus NP, Connect4, and IsoMax/JSMinSys has repeatedly produced useful structural findings, corrections, reductions, falsifiers, or research leads. That experience motivates the larger Project Discovery hypothesis.

However, the present sample is **small, selected, and not an unbiased estimate of future discovery yield**. The current evidence does not establish:

- a universal discovery rate;
- a probability that an arbitrary paper will yield a novel result;
- that most candidate findings will survive independent review;
- that discovery throughput will scale linearly with agent count or compute;
- that the mature operation will be economically efficient;
- that agent review alone is an adequate substitute for independent human/domain review;
- that large-scale corpus synthesis can be operated reliably with today's infrastructure.

Those are themselves research and engineering questions for Project Discovery.

## What "research synthesis" means here

Project Discovery is intended to operate at several levels simultaneously.

### Within one work

Ask what is implicit, what support is actually necessary, which assumptions are load-bearing, which definitions hide reducible structure, which discrepancies reveal missing distinctions, and which questions require new evidence.

### Within one domain

Compare many papers, proofs, models, algorithms, experiments, and failed approaches to identify recurring structures, conflicting assumptions, stronger/weaker formulations, reusable reductions, hidden dependencies, and unresolved gaps.

### Across domains

Search for structural correspondences that vocabulary and disciplinary boundaries may conceal.

A result may take the form:

~~~text
same primitive structure under a lawful transformation
~~~

or:

~~~text
large common core
+
one load-bearing residual
~~~

or:

~~~text
method / obstruction / invariant in domain A
transfers to domain B
~~~

The residual can be as scientifically valuable as the correspondence.

### Across the growing discovery corpus

Validated findings should become new searchable structure.

The eventual corpus should therefore contain not only source research, but also:

- derived assertions;
- discovered correspondences;
- falsified hypotheses;
- separating invariants;
- known counterexamples;
- evidence lineages;
- MSS results;
- experiment outcomes;
- unresolved QU regions;
- reviewer disagreements;
- prior-art dispositions;
- publication and replication provenance.

This creates the possibility of compounding discovery rather than a sequence of disconnected projects.

## Resource requirements

Project Discovery's mature form is beyond what one person can reasonably operate alone.

It will require a sustained combination of **funding, technical infrastructure, research talent, domain expertise, review capacity, and program leadership**.

### Research and scientific talent

The project will need people who can own or independently challenge different parts of the research process, including:

- mathematicians and theoretical researchers;
- scientists and engineers from application domains;
- formal-methods / logic / proof researchers;
- computational researchers;
- literature and prior-art specialists;
- experimental-methodology specialists;
- independent reviewers and replication researchers.

Domain expertise is particularly important at the boundaries where an exact structural result may still be scientifically misinterpreted.

### Engineering and infrastructure talent

At larger scale, Project Discovery becomes a distributed research-computing system.

It will require expertise in:

- agent orchestration;
- distributed systems and scheduling;
- model/inference infrastructure;
- data pipelines and corpus ingestion;
- graph / structural indexing and retrieval;
- storage and provenance systems;
- reproducible computation;
- security and access control;
- observability, cost accounting, and reliability;
- public research-access infrastructure.

The system must be able to recover exactly which source, representation, model, prompt, tool, experiment, and revision contributed to a finding.

### Research operations and leadership

A large research operation also requires coordination that cannot be treated as incidental overhead.

Likely needs include:

- research/program management;
- portfolio prioritization;
- reviewer-independence management;
- experiment/resource allocation;
- publication and external-review coordination;
- partnerships with universities, laboratories, companies, and independent researchers;
- recruiting and contributor development;
- governance for revision, evidence, conflict, and disclosure.

The founder/designer should not be required to personally coordinate every research thread for the system to scale.

### Funding

The mature program will require **substantial and sustained funding** rather than only occasional compute credits.

Major cost categories are expected to include:

- model inference and agent execution;
- compute for simulations, searches, verification, and experiments;
- persistent storage and structural indexes;
- engineering and research staff;
- independent review and replication;
- specialized datasets, publications, APIs, or licensed resources where necessary;
- physical or external experimental work when a warranted inquiry cannot be performed computationally;
- security, reliability, and public-access infrastructure.

The exact budget is not yet known and should not be invented before a measured scaling study exists. A sensible development path is staged: measure research throughput, verification burden, compute cost, and failure modes at progressively larger agent counts before estimating mature operating economics.

## Organizational requirement: independence must scale with discovery

Project Discovery should not treat an agent that helped produce a result as independent validation of that result.

Participating agents are valuable for internal audit and debugging, but mature review should track provenance and independence explicitly.

A scalable review system should distinguish at least:

~~~text
participating-agent audit
non-participating blinded-agent review
different-model / different-provider review
mechanical reproduction / formal checking
independent human / domain review
external experimental replication
~~~

No layer should claim more independence than it actually has.

At Project Discovery scale, review and falsification capacity may be at least as important as raw discovery capacity.

## Infrastructure needed before grand scale

Before attempting hundreds or thousands of concurrent agents, the project needs durable infrastructure for:

1. **Corpus access** — agents must be able to retrieve public source material and repository evidence reliably without scraping fragile web interfaces.
2. **Single-document research dossiers** — each research project should expose a consolidated current artifact for humans and agents, with deeper repository material serving as provenance.
3. **Immutable provenance** — exact source/repository/model/prompt/tool/revision identity for every load-bearing result.
4. **Structural indexing** — cheap candidate retrieval across large numbers of IsoGraph renderings without treating retrieval similarity as evidence.
5. **Work orchestration** — queues, priorities, dependencies, agent specialization, budgets, cancellation, and recovery.
6. **Evidence/review graphs** — who produced, challenged, reproduced, falsified, or independently reviewed each claim.
7. **Reproducible execution** — deterministic checks and replayable computational experiments wherever possible.
8. **Cost measurement** — inference, compute, storage, human review, and verification cost per useful research outcome.
9. **Publication/access surfaces** — simple public artifacts that independent humans and agents can read and audit.
10. **Failure containment** — mechanisms that prevent correlated agent error or a faulty representation from propagating silently through the corpus.

## Scaling path

Project Discovery should grow by demonstrated capability rather than by agent count alone.

A reasonable progression is:

~~~text
current prototype:
    small number of carefully inspected campaigns

-> small coordinated research network:
    multiple simultaneous projects
    independent rendering / discovery / review roles
    measured cost and throughput

-> medium-scale synthesis:
    tens to hundreds of agents
    automated corpus ingestion + indexing
    systematic within-domain and cross-domain campaigns

-> large-scale operation:
    hundreds to thousands of agents
    continuous research synthesis
    dedicated verification / replication capacity
    substantial compute and storage
    professional research + engineering organization
~~~

Each stage should establish that the next scale improves useful, reproducible research output rather than merely increasing candidate volume.

## Success criteria

Project Discovery should not be measured by how many "novel discoveries" it claims.

A healthier set of measures includes:

- exact renderings produced and independently reconstructed;
- useful implicit assertions;
- correspondences that survive falsification;
- meaningful residual distinctions;
- assumptions/dependencies removed or shown necessary;
- counterexamples and failed hypotheses preserved;
- valid MSS/valuation results;
- externally reproduced findings;
- prior-art conflicts caught before publication;
- experiments that materially reduce uncertainty;
- research outputs accepted or constructively criticized by domain experts;
- cost per validated useful finding;
- reuse of earlier findings in later discoveries.

Novel results are especially valuable when they survive serious independent review, but the operation should prefer a true modest result over an unsupported dramatic one.

## Current-family execution

Current repository Discovery authority is cumulative DP 0.1–0.10, integrated with Core through 0.21, QU 0.1, NEI 0.4, DTS 0.1, and EI 0.1 for the qualified scope.

A new Project Discovery campaign should:

~~~text
freeze exact source interpretation + scope + Source Semantic Census
-> render load-bearing semantics to current primitive/schema closure
-> independently audit reconstruction and coverage
-> generate current IAs where applicable
-> apply QU / NEI / DTS only where their authority is load-bearing
-> run current DP behavior
-> preserve discrepancies, residuals, failed hypotheses, and falsifiers
-> issue an Experimental Warrant only when DP 0.10 supports it
-> use EI only under that warrant
-> return observations as evidence, not truth
-> subject important findings to increasingly independent review
~~~

New campaigns belong in dated/project subdirectories here and must be summarized in this README.

## Authority boundary

Project Discovery is a research program, not a semantic-authority shortcut.

Its scale, number of agents, amount of compute, or volume of findings does not weaken IsoGraph's evidence rules.

~~~text
more agents
!= more truth

more candidate findings
!= more validated findings

research throughput
!= qualification

agent consensus
!= independent verification
~~~

The mature Project Discovery succeeds only if it can increase the rate of **defensible knowledge production** while preserving exact provenance, falsifiability, reviewer independence, and explicit uncertainty.
