# DP 0.7 three-positive-control qualification — Final report 0.4

**Status:** THREE-POSITIVE-CONTROL QUALIFICATION COMPLETE — PASS 3 / 3  
**Workflow run:** `36228776786`  
**Experiment SHA:** `414405f1cd527b529464ab2fb63ec7695d5f5165`  
**Evidence commit:** `500c6e398331694d922267c9bc38cfa563e6d89e`  
**Pre-oracle freeze:** `183882e2877cc594ba7ca1e6aff3344ba09d9517`  
**Hidden score:** `SCORE_0_4.json`  
**Translation Q7 promotion:** `f13aca1420327d7c1dc9a95ff78df44ffd820170`  
**Discovery model:** `gemini-3-flash-preview`  
**Mechanical role-coverage audit:** PASS  
**Packet SHA-256:** `ee6dad3d2e27841a5ebae87ceaa6f4880ab4de0d05d7161e5bd60ab515fa972a`  
**Report SHA-256:** `838d283002e3205a1703899b45abe79e68020b4171bd01ac5e3472a19e05664e`  
**Oracle access during discovery:** none

## Qualification result

The final blind run recovered all three frozen known-positive correspondences and survived independent hidden-oracle scoring:

```text
case-01: KNOWN_POSITIVE_WITNESS_RECOVERED
case-02: KNOWN_POSITIVE_WITNESS_RECOVERED
case-03: KNOWN_POSITIVE_WITNESS_RECOVERED

accepted exact witnesses: 3 / 3
three-positive-control stage: PASS
```

This closes the three-positive-control qualification campaign.

It does **not** by itself claim that every broader DP 0.7 qualification target in the candidate specification has been completed.

## Preconditions that were satisfied

The successful run occurred only after the campaign repaired the earlier confounds:

```text
source-to-native exactness:
    ESR 0.1 PASS for all six source renderings

translation promotion:
    Q7 PASS

discovery packet:
    blind-v2 byte-identical promoted native/signature blobs

semantic transformation authority:
    frozen and packet-pinned

exact-witness protocol:
    primitive descent + bidirectional reconstruction required

mechanical completeness:
    exhaustive role coverage required before report acceptance

reasoner:
    callable full gemini-3-flash-preview

output capacity:
    sufficient for exhaustive structured report

oracle isolation:
    preserved through evidence freeze
```

## Case 01

Recovered witness:

```text
s_i = 2 n_i - 1
n_i = (s_i + 1)/2

epsilon = -4J
mu      = 2h - 2zJ
z       = 2
beta_A  = beta_B
```

The report used the represented 2-regular undirected graph structure to obtain:

```text
sum_edges (n_left + n_right)
    = z sum_sites n_i
```

and reconstructed:

```text
E_A
 = -4J sum_edges n_i n_j
   + (2zJ - 2h) sum_sites n_i
   - J|E| + h|V|

 = E_B + C
```

with:

```text
C = -J|E| + h|V|
```

It then preserved normalized probability through the common configuration-independent weight factor.

Hidden score: `KNOWN_POSITIVE_WITNESS_RECOVERED`.

## Case 02

Recovered witness:

```text
F <-> 0
T <-> 1
xor <-> gf2_add
target <-> rhs
selected_variables <-> selected_nonzero_variables
parity <-> row_sum
local satisfaction <-> row satisfaction
global universal satisfaction <-> global universal satisfaction
```

The exact operation tables were preserved under the value bijection and the selected-member finite folds were mapped directly.

The representation's `selected_nonzero_variables` family is the encoded support of coefficient-1 entries in the GF(2) row.

Hidden score: `KNOWN_POSITIVE_WITNESS_RECOVERED`.

## Case 03

Recovered witness:

```text
q_A = q_B
m_A = m_B
k_A = k_B

v = p/m
p = m v = m qdot

a = -kq/m
pdot = m a = m qddot
```

Hamilton to Newton:

```text
qdot = p/m
pdot = -kq
p = m qdot
=> pdot = m qddot
=> m qddot + kq = 0
```

Newton to Hamilton:

```text
p = m qdot
qdot = p/m
pdot = m qddot = -kq
```

The Hamiltonian energy formula and its square/division machinery were retained as accounted representation residuals rather than treated as an extra independent physical degree of freedom.

Hidden score: `KNOWN_POSITIVE_WITNESS_RECOVERED`.

## Mechanical role-coverage gate

The preceding run `36228618460` was rejected before acceptance because case 03 misclassified two B-side roles while claiming `EXACT_WITNESS`.

That failed attempt was preserved rather than repaired.

The final run `36228776786` classified every promoted signature role exactly once and passed the mechanical gate before `PARSED_REPORT.json` was accepted.

This demonstrates the intended separation:

```text
model-declared exactness
    !=
mechanically complete exactness bookkeeping
    !=
hidden-oracle semantic correctness
```

All three layers passed on the final run.

## Remaining caution

The reasoner inferred familiar domain names from the anonymous structures.

No withheld oracle was exposed, and hidden scoring found no use of those names as structural proof authority. Nevertheless, this campaign should not be described as proving domain-unrecognizable or pretrained-knowledge-free cognition.

Its demonstrated claim is narrower:

> Given six exact ESR-qualified native renderings, explicit generic transformation authority, an oracle-blind packet, DP 0.7 exact-support rules, and mechanical role-coverage enforcement, the external reasoner recovered all three frozen exact positive correspondences.

## Final disposition

```text
ESR exact source rendering:                PASS 6 / 6
Q7 translation promotion:                  PASS
transformation authority closure:          PASS
oracle-blind execution:                    PASS
mechanical exact-role coverage:            PASS
hidden positive-control score:             PASS 3 / 3

three-positive-control qualification:       COMPLETE / PASS
full DP 0.7 specification promotion:        NOT CLAIMED BY THIS CAMPAIGN ALONE
```
