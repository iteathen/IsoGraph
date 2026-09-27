# P versus NP implicit-assertion A21 correction 0.1

**Status:** corrective successor record
**Predecessor:** IMPLICIT_ASSERTIONS_A21_LOCAL_SIMULATION_0_1.md
**Corrected primitive authority:** P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg
**NEI scope authority:** P_VS_NP_NEI_SCOPE_CONTRACT_0_1.md

## Correction C1 — IA-304 exact-equivalence claim is too strong

Predecessor IA-304 claimed:

~~~text
p <=F q

IFF

CURRENT(p)->CURRENT(q)

AND

every legal next label of p
has the same legal label at q
with dominated children.
~~~

The reverse direction is sound.

The forward direction is false when p has a legal **dead** branch.

Exact dominance only constrains accepting continuations.

Counterexample:

- CURRENT(p)=CURRENT(q)=FALSE;
- p has legal label a to child p_dead;
- p_dead has no accepting continuation;
- q has no legal label a;
- neither p nor q has any accepting continuation.

Then:

~~~text
C_p = empty
C_q = empty

so

p <=F q
AND
q <=F p.
~~~

But predecessor IA-304's all-legal-transition simulation from p to q fails at label a.

Disposition:

~~~text
IA-304 predecessor:
    SUPERSEDED AS EXACT EQUIVALENCE
~~~

## Correction C2 — IA-305 inherits the same completeness error

Mutual all-legal-transition simulation is sufficient for Q-RESIDUAL SAME, but not necessary when the residual representations contain semantically dead legal branches.

Disposition:

~~~text
IA-305 predecessor:
    SUPERSEDED AS EXACT EQUIVALENCE
~~~

The valid sufficient theorem already exists as IA-308.

## Correction C3 — IA-306 remains valid without IA-304

IA-306 only claims:

~~~text
locally closed all-legal forward simulation
    ->
continuation dominance.
~~~

That implication is correct by direct induction on remaining horizon.

No exact-completeness theorem is required.

IA-306 is RETAINED with its support rewritten as direct induction rather than predecessor IA-304.

## Correction C4 — IA-309 title

The predecessor title says local simulation can prove SAME/DISTINCT structure.

Its actual body proves:

- one-way simulation -> dominance;
- mutual simulations -> SAME.

Failure of simulation does not prove DISTINCT, as IA-315 correctly states.

The corrected title is:

~~~text
local simulation can prove dominance/SAME without enumerating suffixes.
~~~

The body is otherwise retained.

## IA-337 — exact dominance has a live-child one-layer characterization

### Scope

Same fixed verifier/input/remaining horizon.

Let:

~~~text
DOM_t(p,q)
IFF
p <=F q.
~~~

For deterministic labeled NEXT after choice normalization, at nonterminal depth:

~~~text
DOM_t(p,q)

IFF

(CURRENT(p) -> CURRENT(q))

AND

for every next label a and child p':

    NEXT(p,a)=p'
    AND
    E_(t+1)(p')=TRUE

    ->

    exists q':
        NEXT(q,a)=q'
        AND
        DOM_(t+1)(p',q').
~~~

No obligation is imposed for a legal p-child whose continuation language is empty.

### Forward proof

If p's child p' has an accepting suffix s, then a·s is an accepting continuation from p.

Dominance transfers a·s to q.

Therefore q must admit the same first label a to q', and every accepting suffix of p' transfers to q'.

### Reverse proof

Every accepting continuation from p is either:

- empty/current, handled by CURRENT implication; or
- a·s through a child p' with E(p')=TRUE.

The live-child clause supplies q' and child dominance, transferring s.

### Disposition

ADMITTED EXACT.

## IA-338 — exact Q-RESIDUAL SAME is mutual live dominance

### Body

~~~text
Q-RESIDUAL SAME(p,q)

IFF

DOM_t(p,q)
AND
DOM_t(q,p),
~~~

with DOM characterized by IA-337.

### Support

- IA-200 mutual continuation dominance = Q-RESIDUAL SAME;
- IA-337 exact recursive characterization of each dominance direction.

### Disposition

ADMITTED EXACT.

## IA-339 — all-legal local simulation is sound but not complete

### Body

The simulation condition of IA-306 is a sound sufficient condition for dominance.

It is not necessary in general because semantically dead legal transitions may differ between residual representations.

Likewise mutual IA-306 simulations are sufficient but not necessary for Q-RESIDUAL SAME.

### Support

Dead-branch counterexample above.

### Consequence

Simulation failure is not merely a search failure; even complete search for an all-legal simulation relation may fail on a pair that is truly Q-RESIDUAL SAME.

This strengthens the firewall already recorded by IA-315.

### Disposition

ADMITTED EXACT.
