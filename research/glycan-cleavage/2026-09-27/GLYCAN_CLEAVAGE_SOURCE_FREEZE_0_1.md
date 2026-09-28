# Optimal enzymatic cleavage trajectories — source freeze 0.1

**Status:** frozen source semantics for primitive rendering research  
**Date:** 2026-09-27  
**Branch:** research/glycan-cleavage-primitive-20260927  
**Rendering target:** Core 0.20 primitive-logic closure candidate, without changing current qualified Core authority  
**Human-facing problem label:** optimal enzymatic cleavage trajectories for complex branched glycans

## 0. Scope

This source freeze defines one deliberately exact **idealized exoglycosidase treatment problem family**.

It does **not** claim that every physical enzyme treatment is complete, context-independent, deterministic, or free of kinetic/steric effects.

The first problem is:

> Given a finite rooted branched residue structure, a finite enzyme set, a closed-world site-specific enzyme susceptibility relation, and a retained target substructure, find every treatment sequence having the minimum number of exhaustive single-enzyme treatments that reaches exactly the target.

The optimization unit is **one enzyme treatment**, not one microscopic bond-cleavage event.

A treatment is idealized as remaining active until no currently terminal, removable, enzyme-matching residue remains.

## 1. Domain facts motivating the model

The following external facts motivate the exposed-terminal cleavage structure but are not themselves used as hidden native semantics.

1. Exoglycosidases release monosaccharides from non-reducing termini, and sequential exoglycosidase digestion can recover monosaccharide sequence.
   - Kobata, "Exo- and endoglycosidases revisited", Proc Jpn Acad Ser B, 2013.
   - https://pmc.ncbi.nlm.nih.gov/articles/PMC3647078/

2. Exoglycosidase specificity can depend on terminal monosaccharide identity, linkage, anomeric character, and in some cases branching/context.
   - Royle et al., "GlycoDigest: a tool for the targeted use of exoglycosidase digestions in glycan structure determination", Bioinformatics, 2015.
   - https://pmc.ncbi.nlm.nih.gov/articles/PMC4609004/
   - Ruhaak et al., "Mass Spectrometry Approaches to Glycomic and Glycoproteomic Analyses".
   - https://pmc.ncbi.nlm.nih.gov/articles/PMC7757723/

3. Sequential digestion is used experimentally to expose subterminal residues after terminal caps are removed.
   - https://pmc.ncbi.nlm.nih.gov/articles/PMC5444872/

These sources justify treating terminal exposure and enzyme/site specificity as load-bearing distinctions.

They do **not** justify the idealized saturation assumption below; saturation is an explicit mathematical modeling choice for this problem family.

## 2. Raw input carriers

One instance supplies:

- a finite duplicate-free residue list RL;
- a finite duplicate-free enzyme list EL;
- one distinguished root residue root;
- a closed-world parent relation P(child,parent);
- a closed-world site susceptibility relation M(enzyme,residue);
- a finite duplicate-free retained-target residue list TG.

Residue identities and enzyme identities are raw carrier identities.

They carry no behavior by their names.

P and M are extensional relations supplied by the instance.

The site susceptibility relation means exactly:

~~~text
M(e,r)
IFF
in this idealized problem instance,
enzyme e is chemically permitted to cleave residue-site r
when r is terminal and otherwise removable.
~~~

All static residue/linkage/anomeric/local-context distinctions needed by the instance must already be reflected in the extension of M.

No additional enzyme meaning may be inferred from a label.

## 3. Rooted branched residue structure

The residue structure is well formed exactly when:

1. root occurs in RL;
2. root has no parent;
3. every other residue in RL has exactly one parent in RL;
4. every represented parent tuple has both endpoints in RL;
5. the parent relation is acyclic and oriented away from root.

Acyclicity is witnessed by an existential natural-number rank assignment:

~~~text
rank(root) = 0

P(child,parent)
->
rank(parent) < rank(child).
~~~

The rank witness is proof/support structure, not an additional biochemical attribute.

## 4. Retained target

TG is a duplicate-free subset of RL.

root occurs in TG.

The target is ancestor-closed:

~~~text
child in TG
AND
P(child,parent)
->
parent in TG.
~~~

No residue in TG may be cleaved.

The final state must contain exactly the residues in TG.

## 5. State

A state is represented extensionally by a duplicate-free finite residue list S.

Only membership matters.

List ordering is representational and does not change state meaning.

For every reachable state:

~~~text
S subset RL
TG subset S.
~~~

The initial state is RL.

## 6. Terminality

A residue r is terminal in state S exactly when:

~~~text
r in S
AND
there does not exist c such that:
    c in S
    AND
    P(c,r).
~~~

This is the only structural exposure rule in version 0.1.

## 7. Microscopic cleavage eligibility

Residue r is eligible for enzyme e in state S exactly when:

~~~text
r is terminal in S
AND
r notin TG
AND
M(e,r).
~~~

No kinetics, probabilities, concentrations, reaction times, accessibility corrections, or unrepresented biochemical rules are imported.

## 8. One microscopic cleavage

A microscopic cleavage removes exactly one eligible residue.

If S -> S' removes r, then:

~~~text
for every residue x:

x in S'
IFF
x in S
AND
x != r.
~~~

No other residue is created, deleted, merged, relabeled, or moved.

Because an eligible residue is terminal, this operation removes one terminal residue-site and exposes its parent only through the resulting membership change.

## 9. One exhaustive enzyme treatment

One treatment chooses exactly one enzyme e.

Starting from state S0, it performs a finite sequence of microscopic cleavages, each using the same enzyme e, producing final state Sf.

The treatment is complete exactly when:

~~~text
no residue is eligible for e in Sf.
~~~

A zero-cleavage treatment is allowed when the starting state is already saturated for that enzyme.

This is a mathematical saturation convention.

It is not a claim that laboratory digestion is always complete.

## 10. Treatment trajectory

A treatment trajectory is a finite list of enzyme identities:

~~~text
T = [e0, e1, ..., e(k-1)].
~~~

Starting from RL, each listed enzyme is applied as one exhaustive treatment to the state produced by the preceding treatment.

A trajectory solves the instance exactly when its final state equals TG extensionally.

Repeated use of the same enzyme is allowed.

In particular, the semantics intentionally permit patterns such as:

~~~text
A -> B -> A
~~~

when treatment B exposes new sites susceptible to A.

## 11. Objective

The cost of a trajectory is its number of enzyme treatments:

~~~text
cost(T) = LENGTH(T).
~~~

A solving trajectory T is optimal exactly when no solving trajectory has smaller length.

All minimum-length solving trajectories remain valid outputs.

The source does not declare a canonical optimum or preferred ordering among ties.

## 12. Closed-world boundaries

For one frozen finite instance:

~~~text
represented P tuples
    = complete parent extension

represented M tuples
    = complete site-susceptibility extension.
~~~

No missing P or M tuple may be invented by the renderer or solver.

## 13. Deliberately excluded from version 0.1

The following are outside the exact claim:

- partial/incomplete digestion;
- stochastic cleavage;
- kinetic rate constants;
- enzyme concentration or reaction time;
- competition between simultaneously present enzymes;
- multi-enzyme cocktails inside one treatment;
- state-dependent steric/context changes not already captured by static M;
- endoglycosidase internal cleavage;
- bond formation or glycosyltransferase synthesis;
- chemical protecting/unmasking steps;
- mass-yield optimization;
- monetary or laboratory-time cost;
- uncertainty in the input glycan;
- uncertainty in enzyme specificity.

Those may become later explicit extensions or QU-bearing layers.

They must not leak into the 0.1 native kernel.

## 14. Exact-rendering target

The primitive rendering must reconstruct all load-bearing semantics above while deleting the human-facing words:

~~~text
glycan
residue
enzyme
terminal
cleavage
treatment
trajectory
optimal
~~~

The native support must bottom out in:

- primitive logic;
- finite data constructors;
- primitive-rendered natural arithmetic;
- raw carrier identities;
- complete extensional P and M tuples.

No biochemical or optimization behavior may remain hidden inside a label.
