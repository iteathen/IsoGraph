# DP 0.7 transformation semantic authority — 0.1

**Status:** FROZEN STIPULATED EXPERIMENT AUTHORITY  
**Scope:** only the generic theory symbols and transformation laws named below, for the three-positive-control DP 0.7 qualification campaign  
**Not Core:** this file adds no Core primitive and creates no repository-global mathematical ontology  
**Oracle boundary:** this file contains no cross-system correspondence, expected witness, source-domain identity, parameter transport, or case disposition

## 1. Authority rule

For this experiment, an exact discovery transformation may use only:

1. structure explicitly present in the promoted native bundle;
2. Core / extension authority already included in the blind packet;
3. the generic semantic laws frozen in this file.

Familiar mathematical knowledge not represented by one of those sources is not evidence.

A transformation step that depends on a law outside this authority remains unsupported.

## 2. Basic real-valued operation semantics

When a promoted signature uses the following glosses, they have these stipulated meanings in this experiment:

```text
real_domain              = the real numbers R
#n in real context       = the corresponding integer-valued real literal n
real_add(x,y)            = x + y
real_multiply(x,y)       = x * y
real_negate(x)           = -x
real_divide(x,y)         = x / y, defined when y != 0
square(x)                = x * x
real_exp(x)              = exp(x)
positive(x)              = x > 0
equal(x,y)               = equality in the applicable represented domain
```

The following ordinary real laws are authorized:

```text
x + y = y + x
(x + y) + z = x + (y + z)

x * y = y * x
(x * y) * z = x * (y * z)

x * (y + z) = x*y + x*z
(x + y) * z = x*z + y*z

x + 0 = x
x * 1 = x
x + (-x) = 0
(-1) * x = -x

if c != 0:
    (c*x)/c = x
    c*(x/c) = x

positive(c) -> c != 0

exp(x + y) = exp(x) * exp(y)
exp(x) > 0
```

Algebraic rewriting may reassociate and commute real addition/multiplication only where those laws apply.

No unlisted analytic identity is imported.

## 3. Nullary real parameters are time-independent

Within these experiment bundles, a nullary symbol whose represented range/domain is `real_domain` and which is not represented as a function of the time-domain argument is a scalar parameter constant with respect to that time domain.

This rule authorizes constant-scalar algebra and derivative linearity for such parameters.

It does not establish any cross-system equality between parameter symbols.

## 4. Range, indexing, and function-signature semantics

For the promoted theory symbols:

```text
range_or_domain(f,D)
```

states that the represented values of `f` lie in domain `D`.

```text
indexed_by(f,A,B,...)
```

states the represented argument/index families of `f` in the listed order.

```text
function_signature(f,A,B)
```

states that `f` is represented as a function from domain `A` to domain `B`.

A candidate exact mapping must preserve or explicitly transform these distinctions. Similar symbol names do not override a domain/signature difference.

## 5. Finite-fold semantics

```text
finite_fold(op, F, lambda x -> f(x), e)
```

denotes the exact finite fold of `f(x)` over every represented member of finite family `F`, once per member, using binary operation `op` and identity/initial value `e`.

When `op = real_add` and `e = 0`, the fold is an ordinary finite real sum.

Authorized finite-sum laws include:

```text
sum_F (f(x) + g(x))
    = sum_F f(x) + sum_F g(x)

sum_F (c * f(x))
    = c * sum_F f(x)
    when c is independent of x

sum_F c
    = |F| * c
    when c is independent of x

a bijective reindexing of the same finite members preserves the fold
```

For a finite fold using an explicitly represented finite operation table, a value bijection that preserves every table row and maps the initial value to the other initial value preserves the resulting fold.

No associativity, commutativity, or other property of a non-real-add operation may be assumed unless it is explicit in its represented table or another included authority.

## 6. Finite undirected interaction-graph semantics

For the promoted graph-theory glosses:

```text
edge_endpoint_structure(E,left,right,V)
```

means each represented edge in `E` has two represented endpoint occurrences `left(e)` and `right(e)` in vertex/site family `V`.

```text
undirected(E)
```

means endpoint order is not a directed orientation distinction; an edge fold counts each represented edge once.

```text
regular_degree(V,E,z)
```

means every represented vertex/site in `V` has exactly `z` incident endpoint occurrences in `E`.

Therefore, for any real-valued represented site function `f`:

```text
sum_{e in E} [ f(left(e)) + f(right(e)) ]
    = z * sum_{i in V} f(i)
```

and, by counting endpoint occurrences:

```text
2 * |E| = z * |V|
```

These are generic incidence consequences of the stipulated graph meanings.

They do not identify any particular graph, state encoding, or cross-system parameter.

## 7. Exponential weights and normalization

If two weight families over the same bijectively related configuration family obey:

```text
w_A(c) = K * w_B(phi(c))
```

for one positive real `K` independent of configuration `c`, then finite-sum semantics gives:

```text
Z_A = K * Z_B
```

and ordinary real division gives:

```text
w_A(c)/Z_A = w_B(phi(c))/Z_B
```

This is a generic normalization law.

The authority does not assert that any particular two experiment bundles satisfy its premise.

## 8. Time-derivative semantics

When a promoted signature uses `time_derivative`, it denotes the ordinary derivative with respect to the represented time-domain argument.

Authorized laws are limited here to:

```text
if f(t) = g(t), then their represented derivatives are equal where the derivatives exist

D(f + g, t) = D(f,t) + D(g,t)

D(c * f, t) = c * D(f,t)
    when c is a time-independent scalar parameter

if v(t) = D(q,t), then
    D(v,t) = D(D(q,t),t)
```

Together with the real laws above, if a time-independent `c != 0` and:

```text
D(q,t) = p(t)/c
```

then algebraically:

```text
p(t) = c * D(q,t)
```

This is a generic derivative/algebra rule and supplies no expected cross-system bridge.

## 9. Two-valued represented operations

When a native bundle explicitly represents:

- a two-element value domain;
- every row of a binary operation table;
- a finite fold using that operation;
- an initial value;

the operation's meaning for this experiment is exactly the represented table.

Two such represented operations may be related by a candidate value bijection only if every table row is preserved under that bijection and the initial values correspond.

Constraint targets/right-hand sides, selected-member families, and all-constraint/all-row satisfaction remain separate represented obligations and must also be mapped; table correspondence alone does not establish whole-system equivalence.

## 10. Quantified satisfaction

A represented universal condition of the form:

```text
for every r:
    member(r,F) => satisfied(a,r)
```

means every represented member of finite family `F` must satisfy the represented predicate.

A finite fold used inside one constraint/row does not, by itself, replace this outer universal obligation.

## 11. Exact-discovery provenance requirement

For an exact witness, every nonliteral transformation step MUST cite either:

- the primitive/native statement that directly establishes it; or
- the section of this authority (or another explicitly included qualified authority) that licenses the transformation.

A step with no such provenance is unsupported and blocks `EXACT_WITNESS`.

## 12. Explicit non-oracle boundary

This authority intentionally does **not** state:

- any mapping between the two local value encodings in a case;
- any parameter transport between two bundles;
- any additive constant for a particular pair;
- any correspondence between named state variables across bundles;
- any momentum/velocity bridge;
- any expected positive witness;
- any case score or disposition.

Those remain discovery/scoring targets, not authority.
