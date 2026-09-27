# P vs NP primitive-closure ledger 0.1

**Status:** active closure ledger; predecessor high-level renderings are derived views only under the Core 0.20 candidate  
**Primitive branch:** `research/p-vs-np-primitive-logic-20260926`

## Rule

No item receives `CLOSED_PRIMITIVE` merely because a source defines it.

Every definition is recursively expanded until only primitive logic plus raw data/carrier atoms remain.

## Current closure ledger

| Semantic node | Current lower expansion | Status |
|---|---|---|
| `P = NP` | class extensional equality / both inclusions | `DERIVED_VIEW` |
| `P subset NP` | forall predicate/language, inP implies inNP | `DERIVED_VIEW` |
| `NP subset P` | forall predicate/language, inNP implies inP | `DERIVED_VIEW` |
| `inP(P)` | `inTimePoly(P)` | `DERIVED_VIEW` |
| `inTimePoly(P)` | exists bound `f`; decision record; polynomial-bound relation; monotonicity | `DERIVED_VIEW` |
| `decInTime(P,f)` | exists Boolean decider; computation-with-time support; forall input correctness IFF | `DERIVED_VIEW` |
| `inNP(P)` | exists certificate relation `R`; polynomial-time decidability of `R`; bounded-certificate correctness | `DERIVED_VIEW` |
| `polyCertRel(P,R)` | exists witness-size bound; soundness; completeness; polynomial growth; monotonicity | `DERIVED_VIEW` |
| `reducesPolyMO(P,Q)` | exists function `f`; polytime computation of `f`; forall x `P(x) IFF Q(f(x))` | `DERIVED_VIEW` |
| `NPhard(Q)` | forall encoded predicate `P`, `inNP(P) -> reducesPolyMO(P,Q)` | `DERIVED_VIEW` |
| `NPcomplete(Q)` | `NPhard(Q) AND inNP(Q)` | `DERIVED_VIEW` |
| `SAT(N)` | exists assignment `a`; every clause has a true literal | `DERIVED_VIEW` |
| CNF satisfaction | forall clause in CNF, exists literal in clause satisfying sign/value equality | `DERIVED_VIEW` |
| literal truth | variable-membership Boolean equals literal sign | `DERIVED_VIEW` |
| assignment | finite carrier/list of variable identities designated true | `DERIVED_VIEW` |
| `inOPoly(f)` | exists exponent `k`; Big-O of `f` against `n^k` | `DERIVED_VIEW` |
| Big-O | exists `c,n0`; forall `n>=n0`, `f(n) <= c*g(n)` | `DERIVED_VIEW` |
| monotonic | forall `x,x'`, `x<=x' -> f(x)<=f(x')` | `DERIVED_VIEW` |
| `polyTimeComputable(f)` | time bound + source computation semantics + polynomial/monotone time + result-size bound | `DERIVED_VIEW` |
| result-size polynomial | exists bound function; forall input encoded output-size inequality + polynomial/monotone bound | `DERIVED_VIEW` |
| source `computableTime` | must expand to extracted term + evaluation/reduction/time relation | `QU_UNEXPANDED` |
| L term | `var(n)`, `app(s,t)`, `lam(s)` ordered constructor data | `CLOSED_PRIMITIVE` after constructor incidence |
| substitution | three constructor clauses + equality test + successor index | `DERIVED_VIEW` |
| L big-step eval | abstraction clause + application clause | `DERIVED_VIEW` |
| L one-step reduction | beta/value step + right-context step + left-context step | `DERIVED_VIEW` |
| reflexive/transitive reduction | finite indexed sequence of one-step reductions | `DERIVED_VIEW` |
| term size | constructor-recursive natural relation | `DERIVED_VIEW` |
| natural number | raw carrier with zero/successor structure | `RAW_DATA_ATOM` + lower axioms required |
| `<=` on naturals | lower arithmetic/order theory required | `QU_UNEXPANDED` |
| addition | lower arithmetic theory required | `QU_UNEXPANDED` |
| multiplication | lower arithmetic theory required | `QU_UNEXPANDED` |
| exponentiation | lower arithmetic theory required | `QU_UNEXPANDED` |
| finite list membership | constructor-recursive list relation | `DERIVED_VIEW` |
| list length | constructor-recursive natural relation | `DERIVED_VIEW` |
| encoding `enc` | source datatype-to-L-term construction; per carrier | `QU_UNEXPANDED` until exact carrier encodings are expanded |
| Boolean | two raw values with exact case split | `CLOSED_PRIMITIVE` |
| `P`, `NP`, `SAT`, `NP-hard`, `NP-complete` labels | no authoritative support role | `REJECTED_AS_LEAF` |
| Cook-Levin theorem endpoint | cached derived support only | `DERIVED_VIEW` |
| barriers / circuit controls | Discovery Protocol views only | `DERIVED_VIEW` |

## Immediate closure frontier

Primitive completeness is currently blocked by exactly these families:

```text
A. source computation-time semantics
B. natural-number arithmetic/order kernel
C. carrier encoding / encoded-size semantics
D. list/sequence recursion expansion
E. source-model to official-model equivalence
```

None may be called primitive merely because it is standard.

## Required completion criterion

The P-vs-NP primitive rendering is complete only when:

```text
all rows are
    CLOSED_PRIMITIVE
    RAW_DATA_ATOM
or
    DERIVED_VIEW whose full support reaches only those statuses

and there are zero:
    QU_UNEXPANDED
    REJECTED_AS_LEAF
on any load-bearing path.
```

High-level unified renderings remain useful for DP but cannot satisfy this criterion.
