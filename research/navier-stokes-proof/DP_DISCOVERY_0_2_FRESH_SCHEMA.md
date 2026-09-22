# DP_DISCOVERY_0_2_FRESH native schema

Status: fresh Discovery Protocol bookkeeping only.

Source namespace:
- NAVIER_STOKES_FORCED_BLOWUP_0_1.isg
- source blob 6e01f6b7bb8579e08d5e5135a4e9ea5965677763

The old DP/RF artifacts were excluded from candidate generation. See DP_DISCOVERY_0_2_FRESH_INPUT_FREEZE.md.

## Local labels

| Label | Role |
|---|---|
| ^74000 | fresh DP run |
| ^74001 | source-namespace import |
| ^74002 | finding |
| ^74003 | protocol |
| ^74004 | lifecycle |
| ^74005 | mapped source region |
| ^74006 | depends on finding |
| ^74007 | common structural role |
| ^74008 | residual / limitation |
| ^74009 | falsifier |
| ^74010 | falsifier survived |
| ^74011 | breaker |
| ^74012 | breaker kind |
| ^74013 | QU impact |
| ^74014 | NEI status |
| ^74015 | synthesis |
| ^74016 | next test |
| ^74017 | explicit non-claim |

## Lifecycle SIs

| SI | Status |
|---|---|
| 74100 | LEAD |
| 74101 | CANDIDATE |
| 74102 | SUPPORTED_CANDIDATE |
| 74103 | REJECTED |

## Breaker SIs

| SI | Meaning |
|---|---|
| 74200 | domain/recurrence/consumer mismatch |
| 74201 | exact-equality vs asymptotic-flatness mismatch |
| 74202 | full-contract obligation mismatch |

## Finding SIs

| SI | Finding |
|---|---|
| 7501 | F01 geometric coloring locally linearizes cross-label nonlinearity |
| 7502 | F02 incompressibility by representation |
| 7503 | F03 exact residual three-channel normal form |
| 7504 | F04 four-part correction operator |
| 7505 | F05 recurring FiveRows obstruction interface |
| 7506 | F06 two-level nonlinear factorization |
| 7507 | F07 synchronized multi-view recurrence |
| 7508 | F08 common continuation frame |
| 7509 | F09 auxiliary torus lift/average/project candidate |
| 7510 | F10 staged exactness candidate |
| 7511 | F11 nested accuracy/extraction refinements |
| 7512 | F12 contract-closure/compression boundary |
| 7513 | F13 three-role geometry candidate |
| 7514 | F14 local-blowup/global-energy separation candidate |
| 7520 | S0.2 fresh synthesis |
| 7531 | R01 sigma vs diagonal schedule identification |
| 7532 | R02 flat residual vs exact-zero exterior identification |
| 7533 | R03 whole-space vs periodic full-contract isomorphism |

## Protocol handles

Local handles only:
- 74301 DP-01
- 74302 DP-02
- 74303 DP-03
- 74304 DP-04
- 74306 DP-06
- 74307 DP-07
- 74308 DP-08
- 74310 DP-10
- 74311 DP-11
- 74313 DP-13
- 74314 DP-14
- 74317 DP-17
- 74321 DP-21
- 74322 DP-22
- 74323 DP-23
- 74324 DP-24
- 74325 DP-25
- 74326 DP-26
- 74327 DP-27
- 74329 DP-29
- 74330 DP-30
- 74331 DP-31
- 74332 DP-32
- 74333 DP-33
- 74335 DP-35
- 74336 DP-36

## Status boundary

SUPPORTED_CANDIDATE remains discovery output, not QUALIFIED_CLAIM.
