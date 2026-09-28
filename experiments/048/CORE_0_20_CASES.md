# Experiment 048 — Core 0.20 fresh qualification cases

These cases are new qualification controls. Classify each under the supplied authority.

## C01 — Familiar named predicate with available definition

A source defines `LINKED(x,y)` exactly as:

- there exists z;
- EDGE(x,z);
- EDGE(z,y).

A native rendering keeps only one semantic node `LINKED(x,y)`. The definition above is available to the renderer but is not represented below that node.

Classify primitive completeness and whether LINKED may be an authoritative leaf.

## C02 — Qualified theorem endpoint used as the only support

A previously qualified module proves theorem Q from lower relations r1, r2, r3. A new exact rendering asserts target T because Q, records Q's exact qualified revision, but omits r1/r2/r3 and every primitive support path. Q's internal semantics are load-bearing for T.

Classify whether Q may be cached/referenced and whether this rendering is primitive-complete.

## C03 — Arithmetic label as hidden behavior

A source claim depends on the exact length of a finite list and compares that length with another natural number. The native rendering contains raw numeric literals and a named predicate `LENGTH_EQ(list,n)`, but no represented semantics for list length or the comparison.

Classify the literals, LENGTH_EQ as a leaf, and primitive completeness.

## C04 — Computation predicate without trace semantics

The native graph contains raw identities for machine M and input x plus one node `ACCEPTS(M,x)`. The source meaning of ACCEPTS depends on initial configuration, transition steps, a finite execution trace, and final accepting state. None of those relations are represented.

Classify the ACCEPTS leaf and primitive completeness.

## C05 — Raw carrier identities with behavior represented separately

A finite machine uses raw state identities q0, q1 and raw symbol identities a, b. Initial-state incidence, transition incidence, final-state membership, and every load-bearing rule are represented explicitly in primitive logical relation structure. The internal physical encoding of q0, q1, a, b is irrelevant to the claim.

Classify the raw identities and primitive completeness.

## C06 — Delete a domain label, preserve exact reconstruction

A derived node named `QUEUE_EMPTY` abbreviates a primitive formula stating that no represented item has an ACTIVE_MEMBERSHIP incidence to queue q. Both the derived node and its exact reverse map are present. Delete the derived QUEUE_EMPTY node while retaining the primitive formula.

Classify whether exact source reconstruction can still succeed and whether the derived label is authoritative support.

## C07 — DP uses an abstraction, proof routes below it

Discovery uses a convenient derived label `LOOP` to notice a recurring pattern. The exact candidate result is later checked directly against primitive entry, recurrence, carried-state, and exit incidences. Deleting LOOP leaves all exact support connected.

Classify whether DP may use LOOP and whether exact admission may rely on LOOP alone.

## C08 — Missing lower definition

A native relation `R(x,y)` is source-load-bearing. The available source supplies no definition, qualified interface, extensional table, or lower authority for R. The renderer cannot determine its internal semantics.

Classify R's closure status and whether the enclosing primitive-complete claim may pass unchanged.

## C09 — Sidecar supplies missing semantics

A native file contains only raw object G and a named relation GROUP(G). A prose sidecar says GROUP means closure, identity, inverses, and associativity, but none of those semantics occur in native structure or a qualified primitive expansion.

Classify whether the sidecar can make the native rendering primitive-complete.

## C10 — Predecessor-valid Core 0.19 rendering

A frozen source-faithful rendering was correctly qualified under Core 0.19 because it terminates at a pinned qualified semantic construction with an exact represented interface. That construction is definitionally reducible and its internal semantics are load-bearing, but the rendering does not include the primitive expansion.

Classify the historical Core-0.19 validity and Core-0.20 primitive completeness.

## C11 — Primitive round trip

Source meaning: finite raw objects u,v,w; ROOT(u); REL(v,u); REL(w,u); and no other REL tuples. The native representation contains exactly those raw identities, incidences, endpoint closure, and the primitive logical closed-world constraint. A cold reconstruction recovers exactly the source facts with no added rule.

Classify primitive completeness and source round-trip status.

## C12 — Adversarial relabeling of derived abstractions

Two renderings have identical primitive kernels and reverse maps. Every derived domain label in the second rendering is replaced by an unrelated random token. No raw carrier identity, primitive incidence, binding, or scope changes.

Classify whether primitive semantics change and whether exact claims may depend on the original derived names.

## C13 — Qualified construction retained only as a view

A new rendering contains a qualified theorem node Q for navigation, but also contains the complete primitive proof-support expansion beneath Q. Removing Q leaves the exact target reconstructable from primitive support.

Classify Q and primitive completeness.

## C14 — Raw literal versus arithmetic operator

Literal values 0,1,2 are raw exact data. A source assertion depends on 1+1=2. The rendering keeps the literals but also treats ADD(1,1,2) as an unexplained semantic leaf.

Classify the literals, ADD, and primitive completeness.

## C15 — Primitive extensional observation incidence

An input instance supplies a complete finite extensional relation COLOR(object,value). The claim uses only which tuples are present; no hidden law, computation, closure rule, or interpretation of the color values matters.

Classify the represented COLOR tuple incidences as primitive observations and determine whether their internal cause must be expanded.

## C16 — Domain-flavored carrier names only

Raw carrier identities are named `state_A` and `state_B`. Their names carry no behavior. Every load-bearing transition, initial/final membership, and scope relation is represented separately and primitively.

Classify whether the carrier identities are allowed despite the word "state".

## C17 — Primitive-support firewall positive control

An exact assertion A has two support paths:
- A -> derived view V -> primitive relations p1,p2;
- A -> primitive relations p1,p2 directly.

After every DERIVED_VIEW node is removed, A remains reconstructable from p1,p2.

Classify the firewall result and primitive completeness.

## C18 — Lossy derived view is sole support

Primitive alternatives p and q are semantically distinct. Derived view V maps both to `present=true` and forgets which alternative occurred. An exact assertion about the original alternative is connected only through V; the primitive alternatives are absent from the authoritative rendering.

Classify V, the firewall result, and primitive completeness.
