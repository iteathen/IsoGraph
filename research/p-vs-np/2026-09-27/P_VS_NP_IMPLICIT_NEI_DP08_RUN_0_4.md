# P versus NP — corrected implicit/NEI DP synthesis 0.4

**Status:** corrective synthesis; no P-vs-NP resolution
**Primitive authority:** P_VS_NP_PRIMITIVE_BUNDLE_0_4.isg
**Explicit base:** ASSERTION_BASE_A0_0_2.md
**NEI semantic scope:** P_VS_NP_NEI_SCOPE_CONTRACT_0_1.md
**Native NEI templates:** P_VS_NP_NEI_OVERLAY_0_5.isg
**Implicit index:** IMPLICIT_ASSERTION_INDEX_0_8.json
**Admitted assertions:** 341

## 1. What remains valid from synthesis 0.3

The continuation-language family remains the common semantic center.

The following remain distinct useful topologies:

- exact/scoped identity quotienting;
- one-way dominance pruning;
- sufficient statistics/separators;
- hitting sets/canonical witnesses;
- aggregate recurrence DAGs;
- rejection invariants;
- sound lower/upper abstraction;
- accessible exact factorization.

Representation-relative support and access remain load-bearing.

## 2. Corrected simulation interpretation

Do not use:

~~~text
all legal p transitions must be matched by q
IFF
p <=F q.
~~~

This is false in the presence of legal dead branches.

Correct exact recursion:

~~~text
CURRENT(p) -> CURRENT(q)

and

only p-children with a nonempty accepting continuation
must be matched by the same label at q
with dominated child continuation language.
~~~

Thus:

~~~text
all-legal local simulation
    ->
true dominance
~~~

remains a sound incomplete discovery mechanism.

It is not an exact characterization.

This actually strengthens the campaign's preferred search discipline:

~~~text
cheap sound incomplete structure
    may be operationally useful
without complete semantic classification.
~~~

## 3. Corrected NEI use

The semantic quotient definitions remain valid.

But native query-template records are not identity results.

Use:

~~~text
exact semantic scope
+
independent evidence/model authority
+
required QU
    ->
derived scoped result.
~~~

Never use:

~~~text
opaque scope/evidence/model IDs
or
a result role itself
    ->
identity truth.
~~~

## 4. Q-RESIDUAL

Exact scoped relation:

~~~text
p ~R q
IFF
for every admissible suffix s:
    C_p(s) IFF C_q(s).
~~~

This remains:

- right-congruent in normalized witness-prefix space;
- the symmetric kernel of exact continuation dominance;
- coarsest within the declared exact future-preserving/right-congruent quotient space.

Its generic native template is INCOMPLETE until instantiated authority is supplied.

## 5. Q-EXISTS / Q-MIN / Q-COUNT

These remain exact scoped aggregate-value identities when their values are determined under a qualified scope.

They do not become global residual identity.

Their small semantic ranges still do not imply polynomial access.

## 6. Identity-access search target

The useful identity opening remains:

~~~text
cheap local theorem/certificate
    ->
scoped semantic replacement or dominance
~~~

without requiring:

~~~text
complete global identity/equivalence oracle.
~~~

Transformation-local certificates and sound incomplete simulations are both instances of this principle.

## 7. Current falsifiers

Reject proposals that:

- infer SAME from structural similarity alone;
- infer DISTINCT from raw SI difference alone;
- use missing QU as UNKNOWN;
- label an incomplete QU state OPEN;
- use scoped SAME as global SAME;
- equate simulation failure with non-dominance;
- treat all-legal simulation as complete dominance;
- use a fixed-representation blowup as a representation-independent lower bound;
- cite a semantically small quotient without a construction/access method.

## 8. Current next experiment

Continue from the factorized-support boundary experiment.

For every proposed factorization/local transformation, record:

~~~text
exact target semantics
local construction cost
retained support size
next-operation closure
progress/rank effect
scoped NEI/equivalence certificate
QU dependencies
dead/irrelevant branches
counterexample/falsifier.
~~~

The dead-branch distinction must be preserved explicitly whenever a local transition/simulation proof is proposed.

## 9. Truth status

~~~text
P = NP:  OPEN
P != NP: OPEN
~~~
