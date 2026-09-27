# P vs NP unified IsoGraph 0.2 — reconstruction and coverage audit

**Status:** successor discovery rendering; source-backed and derived layers kept distinct; not independently qualified  
**Native graph:** `P_VS_NP_UNIFIED_0_2.isg`  
**Predecessors:**
- `P_VS_NP_FOUNDATION_0_1.isg`
- `P_VS_NP_BARRIERS_0_1.isg`
- `P_VS_NP_RESOLUTION_ROUTES_0_1.isg`

## Purpose

Consolidate the current campaign into one graph before further discovery.

0.2 contains four layers:

1. class semantics and exact residuals;
2. Cook-Levin / NP-completeness support;
3. sufficient equality and separation routes;
4. proof-method barriers and unresolved bridges.

It does **not** claim to represent every known complexity-theory result.

## Relation dictionary

| Relation | Role |
|---|---|
| `^138000` | represented object |
| `^138001` | problem has two terminal conclusions |
| `^138002` | class inclusion |
| `^138003` | exact residual/equivalence under represented inclusion |
| `^138004` | non-inclusion has a witness language |
| `^138005` | polynomial many-one reduction |
| `^138006` | ordered reduction chain |
| `^138007` | NP-complete bundle |
| `^138008` | sufficient resolution route |
| `^138009` | stronger-than-base sufficient route |
| `^138010` | candidate proof belongs to method class |
| `^138011` | method class meets barrier theorem |
| `^138012` | barrier constrains method but leaves both truth values open |
| `^138013` | unresolved/QU support join |
| `^138014` | source theorem |
| `^138015` | source theorem has proof-support substructure |
| `^138016` | computational-model bridge obligation |
| `^138017` | uniform/nonuniform bridge obligation |
| `^138018` | alternative sufficient proof topology |
| `^138019` | reserved |
| `^138020` | Natural-Proofs route attachment |
| `^138021` | algebrization route attachment |
| `^138022` | relativization route attachment |
| `^138023` | route-specific barrier accounting view |
| `^138024`–`^138026` | reserved for successor exact bridge expansion |

## Object dictionary

### Top-level classes and outcomes

- `6000`: resolve P versus NP
- `6001`: `P = NP`
- `6002`: `P != NP`
- `6003`: class `P`
- `6004`: class `NP`
- `6005`: source theorem `P ⊆ NP`
- `6006`: reverse inclusion `NP ⊆ P`
- `6007`: witness language `L ∈ NP \ P`

### Exact residual structure

Because `P ⊆ NP` is already established:

```text
P = NP
    iff
NP ⊆ P
```

and:

```text
P != NP
    iff
exists L in NP \ P.
```

These are **derived support-view facts** under ordinary class/set extensionality plus the established inclusion. They are not claimed to be literal statements from the Coq source.

### SAT / NP-completeness

- `6008`: SAT
- `6009`: `SAT ∈ NP`
- `6010`: SAT is NP-hard
- `6011`: `NPcomplete SAT`
- `6012`: SAT verifier/certificate support
- `6013`: NP-hardness reduction support

The source theorem `CookLevin : NPcomplete SAT` is retained as a theorem endpoint.

### Expanded Cook-Levin chain

- `6014`: `GenNP`
- `6015`: `LMGenNP`
- `6016`: fixed multi-tape TM generic NP problem
- `6017`: fixed single-tape TM generic NP problem
- `6018`: `FlatSingleTMGenNP`
- `6019`: `FlatTCC`
- `6020`: `FlatCC`
- `6021`: `BinaryCC`
- final target: SAT (`6008`)

The pinned Coq file actually exposes an additional `FSAT` stage before SAT. In 0.2, `6021 -> 6008` is therefore a **coarse summary edge**, not an exact one-step source reduction.

This is intentionally flagged as a remaining rendering defect to correct in 0.3.

### Source theorem objects

- `6022`: formal reduction-chain theorem family
- `6023`: formal Cook-Levin endpoint theorem

### Equality route

- `6024`: polynomial-time algorithm for SAT / another NP-complete problem
- `6025`: represented NP-completeness-to-equality bridge

The official Cook problem statement owns the sufficient route:

```text
polytime algorithm for an NP-complete problem
    -> P = NP.
```

The current Coq foundation graph does not yet natively contain a separately pinned closure theorem:

```text
A <=p B
AND B in P
    -> A in P.
```

So `6025` remains a **missing exact internal bridge** even though the overall sufficient route is source-backed by Cook.

### Separation circuit route

- `6026`: unrestricted-circuit lower-bound route
- `6027`: superpolynomial circuit lower bound for a specific NP-complete problem

Cook's problem description owns the one-way sufficient route:

```text
superpolynomial unrestricted-circuit lower bound
for one NP-complete problem
    -> P != NP.
```

This route is stronger than the base semantic separation objective.

### Other proof topologies

- `6028`: nonconstructive/equality alternative
- `6029`: non-circuit separation alternative

These are **open route placeholders**, not concrete proof methods. Their presence prevents the graph from falsely treating the two displayed routes as exhaustive.

### Relativization

- `6030`: candidate proof
- `6031`: proof is uniformly relativizing
- `6032`: Baker-Gill-Solovay barrier applies

### Natural Proofs

- `6033`: candidate circuit lower-bound proof
- `6034`: proof naturalizes to a useful/large/constructive property under the relevant assumption
- `6035`: Natural-Proofs barrier applies

### Algebrization

- `6036`: candidate proof
- `6037`: proof algebrizes
- `6038`: algebrization barrier applies

### Route-specific attachments

- `6039`: Natural-Proofs accounting attaches to the strengthened circuit route
- `6040`: algebrization accounting attaches to candidate proof topology
- `6041`: relativization accounting attaches to candidate proof topology
- `6042`: route/barrier accounting view

## Exactness and completeness audit

### Preserved exactly/source-backed at current scope

- `P ⊆ NP`;
- P/NP/certificate definitions in the pinned Coq model;
- polynomial many-one reduction definition and transitivity;
- NP-hardness and NP-completeness definitions;
- `NPcomplete SAT`;
- official sufficient equality route through an NP-complete problem;
- official sufficient separation route through unrestricted circuit lower bounds;
- major barrier scopes as method constraints, not truth-value evidence.

### Derived support admitted in 0.2

- `P=NP iff NP⊆P`, using `P⊆NP`;
- `P!=NP iff exists L∈NP\P`, using `P⊆NP`;
- barriers attach after proof-route classification, not directly to a truth value.

### Remaining exact-rendering defects / QU

1. **Cook-Levin chain granularity**
   - `FSAT` is omitted from the current native chain.
   - 0.3 must split `BinaryCC -> FSAT -> SAT`.

2. **P closure under polynomial reductions**
   - the current formal graph lacks a pinned source theorem/derived proof object for:
     `A <=p B` and `B in P` imply `A in P`.
   - required for an internally closed SAT-in-P derivation.

3. **Official-model bridge**
   - exact polynomial-overhead relation between the pinned Coq/L model and the standard Turing-machine statement remains unrendered.

4. **Uniform/nonuniform bridge**
   - the circuit separation route is source-backed at the official-problem level;
   - the graph does not yet contain a complete native derivation of every uniform/nonuniform intermediate.

5. **Barrier classification of a concrete candidate proof**
   - method membership (`relativizing`, `natural`, `algebrizing`) is objective/proof-specific and remains QU until a concrete proof topology is supplied.

6. **Candidate-space completeness**
   - the represented resolution routes are not exhaustive.

## Reconstruction disposition

The previous subgraphs are now synchronized in one successor view, but 0.2 is **not an exact-complete P-vs-NP rendering** yet because the defects above are material.

Disposition:

```text
unified successor rendering:
    COMPLETE ENOUGH FOR CLAIM-BOUNDED DP
    NOT YET COMPLETE ENOUGH FOR GLOBAL MINIMUM/EXHAUSTIVENESS CLAIMS

authority effect:
    NONE
```
