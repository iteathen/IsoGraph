# BT01 Spin(4) Chiral Role Mapping 0.1

**Status:** STRONG SOURCE-SUPPORTED SCOPED MAPPING CANDIDATE — PRE-SEAL  
**Purpose:** resolve the source-role/chirality compatibility risk inside BT01.

## Woit source package

W01's Euclidean four-dimensional spin structure has:

~~~text
Spin(4) = SU(2)_L x SU(2)_R
~~~

with independent chiral spinor carriers:

~~~text
S_L
S_R.
~~~

Complexified vectors are:

~~~text
V_C = Hom(S_R,S_L).
~~~

Thus a vector/map has typed evaluation:

~~~text
S_R -> S_L.
~~~

The real Euclidean vector carrier is a real four-dimensional subspace of this complex Hom space.

## Lisi source package

In L05's quaternionic Cl(0,4) representation, the chiral bivector actions split as:

~~~text
so(4) = su(2)_M + su(2)_P.
~~~

The explicit brackets show:
- su(2)_M preserves/acts on the negative chiral carrier Q_minus;
- su(2)_P preserves/acts on the positive chiral carrier Q_plus;
- the vector generator gamma transforms under both factors;
- Clifford multiplication by gamma maps between Q_minus and Q_plus.

The source relation may be written:

~~~text
Gamma(v) : Q_minus -> Q_plus
~~~

with the barred/dual relation giving the reverse orientation.

## Candidate role map

The action orientation selects:

| Neutral role | Woit | Lisi |
|---|---|---|
| first chiral factor | SU(2)_R | SU(2)_M |
| second chiral factor | SU(2)_L | SU(2)_P |
| input chiral carrier | S_R | Q_minus |
| output chiral carrier | S_L | Q_plus |
| vector/action carrier | Hom(S_R,S_L) / E4 inside its complexification | gamma / quaternionic vector |
| typed action | evaluation v(s_R) | Gamma(v) Q_minus |

Thus:

~~~text
Q_minus <-> S_R
Q_plus  <-> S_L
su(2)_M <-> su(2)_R
su(2)_P <-> su(2)_L.
~~~

The reverse Lisi/bar-Gamma action corresponds to the dual orientation.

## What this preserves

Under the candidate mapping:
- there are two independent chiral SU(2) factors;
- each factor owns one chiral spinor role;
- the vector transforms under both;
- the vector action crosses from one chiral carrier to the other;
- the real dimensions match: each complex-two spinor is real-four-dimensional, matching the quaternionic real chiral carrier.

This is substantially stronger than equal dimensions or shared Spin(4) vocabulary.

## Residuals

### Woit residuals
- twistor two-plane/projective incidence;
- HP1/CP3/CP1 fibration;
- Euclidean/Minkowski continuation;
- later reinterpretation of one chiral factor as internal symmetry.

### Lisi residuals
- division-algebra coefficient identification;
- full Clifford square relation;
- generalized reflections;
- vector/spinor triality;
- sp(3), f4, magic-square, and exceptional structure.

## Chirality naming guard

The signs "positive/negative" and labels "left/right" are convention-dependent.

The mapping is selected by the typed action and factor action, not by matching words:

~~~text
input chiral role -> output chiral role
factor acting on input -> factor acting on output.
~~~

If an alternative convention swaps all labels coherently, that is a presentation change rather than a structural failure.

## Result

~~~text
Spin(4) chiral representation skeleton:
    STRONG SOURCE-SUPPORTED MATCH CANDIDATE

typed action orientation:
    MATCHES under Q_minus -> S_R, Q_plus -> S_L

physical interpretation:
    NOT IDENTIFIED

cross-track NEI SAME:
    NOT YET RUN / NOT CLAIMED

program-level isomorphism:
    NOT CLAIMED
~~~

## Consequence for BT01

The leading remaining source-role risk has narrowed.

BT01 no longer depends on an arbitrary correspondence between chiral carriers; the Spin(4) action structure supplies a source-supported mapping candidate.

The remaining hard obligations are:
1. native source instantiation into the neutral schemas;
2. exact quaternionic complex-structure/projective convention;
3. reconstruction and residual audit;
4. post-seal NEI/DP validation.
