# DP_DISCOVERY_0_1 native schema

This schema governs research/navier-stokes-proof/DP_DISCOVERY_0_1.isg.

Status: discovery bookkeeping only. It does not add Core or Discovery Protocol semantics.

## Source namespace import

SI 8000 identifies the frozen source rendering used by this discovery pass:

NAVIER_STOKES_FORCED_BLOWUP_0_1.isg
git blob: 23b3d6c877ef80d17be018913c82b0c8255368be

Relation ^72001 declares imported source SIs. Source SIs referenced in the discovery artifact retain the meanings recorded in NAVIER_STOKES_FORCED_BLOWUP_0_1_SCHEMA.md.

## Local labels

| Label | Role |
|---|---|
| ^72000 | DP run record |
| ^72001 | explicit source-namespace import |
| ^72002 | discovery candidate |
| ^72003 | protocol used |
| ^72004 | lifecycle status |
| ^72005 | source/mapped region |
| ^72006 | candidate dependency |
| ^72007 | common core / mapped role |
| ^72008 | retained residual |
| ^72009 | falsifier attempted |
| ^72010 | falsifier survived |
| ^72011 | structural breaker |
| ^72012 | breaker obligation kind |
| ^72013 | cross-residual pass |
| ^72014 | candidate disposition |
| ^72015 | QU impact |
| ^72016 | NEI result/status |
| ^72017 | next recommended work |
| ^72018 | synthesis relation |
| ^72019 | source-exact promotion discovered during DP |
| ^72020 | candidate scope |
| ^72021 | local claim explicitly not made |

## Lifecycle status SIs

| SI | Status |
|---|---|
| 72100 | LEAD |
| 72101 | CANDIDATE |
| 72102 | SUPPORTED_CANDIDATE |
| 72103 | REJECTED |
| 72104 | DORMANT |

## Breaker-kind SIs

| SI | Meaning |
|---|---|
| 72200 | CONSTRAINT_COMPATIBILITY |
| 72201 | DEPENDENCY_DIRECTION |
| 72202 | DOMAIN_OR_BOUNDARY |
| 72203 | RECONSTRUCTION_OBLIGATION |
| 72204 | ARITY_OR_MULTIPLICITY |

## Protocol SIs used

These are local handles for the named qualified DP 0.1–0.4 procedures, not new DP semantics.

| SI | Protocol |
|---|---|
| 72301 | DP-01 cross-boundary |
| 72302 | DP-02 constraints |
| 72303 | DP-03 interfaces |
| 72304 | DP-04 dependency topology |
| 72305 | DP-05 QU topology |
| 72306 | DP-06 repeated motifs |
| 72307 | DP-07 alternative factorization |
| 72308 | DP-08 residual structure |
| 72310 | DP-10 role equivalence |
| 72311 | DP-11 invariants across variation |
| 72313 | DP-13 multi-scale |
| 72314 | DP-14 transformation invariance |
| 72321 | DP-21 recurrence |
| 72322 | DP-22 composition |
| 72323 | DP-23 reconstruction |
| 72324 | DP-24 proof/witness topology |
| 72326 | DP-26 boundary movement |
| 72327 | DP-27 parameter role |
| 72329 | DP-29 ordering |
| 72331 | DP-31 conservation/balance |
| 72333 | DP-33 special cases |
| 72335 | DP-35 exception structure |
| 72338 | DP-38 identity audit |

## Candidate SIs

| SI | Discovery finding |
|---|---|
| 7301 | D01 monotone accuracy ladder -> arbitrary residual order |
| 7302 | D02 protected blowup geometric channel |
| 7303 | D03 residual -> smooth prescribed force interface |
| 7304 | D04 complementary flat-residual/exact-zero-exterior factorization |
| 7305 | D05 correction-stage recurrence skeleton |
| 7306 | D06 sigma_j <-> a_j correspondence attempt |
| 7307 | D07 constructive-engine / transport / obstruction factorization |
| 7308 | D08 contract-preserving transport motif |
| 7309 | D09 whole-space C / periodic D common proof core |
| 7310 | D10 compact generative synthesis |
| 7311 | D09 full-contract isomorphism attempt |
| 7312 | D04 same-residual-mechanism identification attempt |

## Non-claims

- SUPPORTED_CANDIDATE is not QUALIFIED_CLAIM.
- Candidate common core is not structural isomorphism unless separately proved.
- No candidate here upgrades any NEI query.
- Candidate QU refinement is not a verified ^95020 relation.
- D10 is not proved minimal or complete.
