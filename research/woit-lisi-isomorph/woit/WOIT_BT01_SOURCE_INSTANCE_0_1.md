# Woit BT01 Source Instance 0.1

**Status:** SOURCE-LOCAL NATIVE AXIOMATIC INSTANCE — PARTIAL / PRE-SEAL
**Native:** WOIT_BT01_SOURCE_INSTANCE_0_1.isg
**Primary source:** W01, Euclidean Twistor Unification, §2.1–2.2 and Appendix A
**Source assertions:** W-A0-026, W-A0-027, W-A0-028, W-A0-034–038

## Native role map

| ID range | Source role |
|---|---|
| 189000–189006 | source complex scalar carrier and field-operation handles |
| 189010–189014 | S_R vector carrier and operations |
| 189020–189024 | S_L vector carrier and operations |
| 189030 | complexified vector parameter carrier V_C = Hom(S_R,S_L) |
| 189031 | evaluation relation ACT_W(v,s_R,s_L) |
| 189040–189041 | explicit basis witnesses for S_R |
| 189042–189043 | explicit basis witnesses for S_L |
| 189050–189051 | reserved local projective-pair quotient/incidence objects |
| 189060 | source provenance handle |

## What is asserted natively

The file applies neutral schema 187300 to the Woit source presentation:

~~~text
V_C parameter
S_R, S_L complex vector spaces
ACT_W : V_C x S_R -> S_L
~~~

and applies 187600 to both chiral spaces, recording the source two-complex-dimensional presentations.

This directly matches W01 §2.2:
- complexified vectors are 2x2 complex matrices;
- vectors are elements of Hom(S_R,S_L);
- S_R and S_L are C2 spinor spaces.

## What is deliberately NOT asserted yet

189050/189051 are reserved but no global 187206/187207 projective instance is asserted.

Reason: W01 globally represents a spacetime point by a two-plane S_R inside twistor space T=C4 and identifies S_L with the quotient T/S_R. A direct pair representation S_R + S_L requires a splitting/local chart.

Therefore:

~~~text
local pair coordinates:
    expected / source-reconstructible

global PT = projectivization of one fixed S_R + S_L:
    NOT ASSERTED
~~~

The global CP3/HP1/CP1 geometry remains a separate source-native reconstruction obligation.

## Closure boundary

This file is an axiomatic source instance, not a complete primitive closure:
- standard C is not yet reduced to a source-specific primitive real/complex schema;
- the source evaluation map is constrained by 187300 but not derived from a primitive matrix/Hom construction;
- global twistor incidence is not yet instantiated.

It is nevertheless the first native source-side instantiation of the BT01 action skeleton.
