# NEI 0.4 Native Vocabulary Companion — 0.2

**Status:** unqualified native-vocabulary companion to `NATURAL_ENTROPIC_IDENTITY_SPEC_0_4_CANDIDATE.md`  
**Qualified historical vocabulary retained:** `NEI_NATIVE_VOCAB_0_1.md` / `NEI_VOCAB_0_1.isg`  
**Growth rule:** adds extension-owned semantic roles only; no parser syntax or Core primitive

The 0.1 vocabulary remains exact historical authority for NEI 0.1/0.2 claims.

This 0.2 companion supplies successor roles for NEI 0.4's derived-identity and probabilistic-evidence semantics. It deliberately does **not** reinterpret historical `^94010` / `^94011` identity-preserving/separating-law records.

| Stable label | Role |
| --- | --- |
| `^94100` | NEI 0.4 identity query-context record |
| `^94101` | queried identity hypothesis / proposition |
| `^94102` | identity carrier/domain |
| `^94103` | query scope/context |
| `^94104` | query subject A |
| `^94105` | query subject B |
| `^94106` | query-anchor/correspondence authority |
| `^94107` | fixed exact evidence state E |
| `^94108` | exact identity-relevant evidence item |
| `^94109` | probabilistic identity-evidence item |
| `^94110` | evidence observation |
| `^94111` | evidence provenance / lineage |
| `^94112` | evidence-dependence relation / model |
| `^94113` | qualified conditional-independence assertion |
| `^94114` | probability / likelihood-model authority |
| `^94115` | likelihood under identity hypothesis |
| `^94116` | likelihood under alternative identity hypothesis |
| `^94117` | Bayes factor |
| `^94118` | log Bayes factor / identity evidence weight |
| `^94119` | coidentity evidence direction |
| `^94120` | separation evidence direction |
| `^94121` | identity-neutral evidence direction |
| `^94122` | optional prior odds |
| `^94123` | optional posterior odds / derived epistemic confidence |
| `^94124` | pinned QU dependency |
| `^94125` | QU realization-conditioned evidence function |
| `^94126` | admissible evidence-weight set/range over QU |
| `^94127` | qualified marginal-likelihood result over QU |
| `^94128` | admissible identity-model family |
| `^94129` | exact identity theorem/certificate |
| `^94130` | incomplete/unqualified identity query |
| `^94131` | NEI 0.4 qualification/verification record |
| `^94132` | resource/completeness status |
| `^94133` | pinned dependency / immutable revision |
| `^94134` | evidence-combination/joint-likelihood record |
| `^94135` | anti-circularity / independence-of-authority witness |

## Reused qualified result roles

NEI 0.4 continues to use the qualified NEI 0.1 result roles where applicable:

- `^94017` — SAME;
- `^94018` — DISTINCT;
- `^94019` — semantic UNKNOWN;
- `^94020` — NO_ADMISSIBLE_MODEL.

Those result labels keep their existing exact semantics. NEI 0.4 changes how successor claims derive them; it does not create probabilistic variants of SAME/DISTINCT.

## Bayesian evidence representation

A probabilistic evidence item should be reconstructible as a relation among:

```text
identity query/hypothesis
observation
conditioning scope
likelihood-model authority
P(E | I, C)
P(E | not-I, C)
Bayes factor
log Bayes factor
provenance / lineage
dependence structure
QU dependency where applicable
```

A bare numeric `^94118` value without its likelihood/provenance/dependence authority is not a qualified identity-evidence record.

## QU representation rule

`^94124` references the qualified QU state; this vocabulary does not duplicate QU's native open-region representation.

When evidence strength varies by QU realization, represent that dependence through `^94125` and, where exact compact representation is available, `^94126`.

A single `^94117` / `^94118` scalar is permitted only when the NEI 0.4 conditions for lawful scalarization are discharged.

## Evidence combination rule

`^94134` MUST identify whether evidence is combined by:

- a qualified joint likelihood;
- a qualified conditional-independence factorization;
- another exact probability-model theorem.

No relation in this vocabulary means “sum these weights because they are separate records.”

## Historical compatibility

Historical 0.1/0.2 claims remain decoded with the 0.1 vocabulary and their exact revision semantics.

Successor 0.4 claims SHOULD NOT use `^94010` or `^94011` as application answer tags. Exact domain theorems belong in ordinary represented evidence and may be referenced through `^94129`.

