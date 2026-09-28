# Glycan clue-fed exact derivations A29 — critical covers as standard examples 0.1

**Status:** exact internal derivation after A28 / external poset-dimension clue
**Date:** 2026-09-27
**Prior exact implicit range:** G-IA001..G-IA440
**Internal parents:** A21-A28

External poset theory uses the name **standard example S_k** for a height-two poset with lower elements a_1,...,a_k and upper elements b_1,...,b_k where:

    a_i < b_j
    iff
    i != j.

The standard example has order dimension k.

The terminology is external; the glycan consequences below are proved directly from the existing threshold critical-cover structure.

## G-IA441 — distinct equal-length words form an antichain under subsequence

Let x and y be distinct raw words with:

    LENGTH(x)=LENGTH(y).

If x is a subsequence of y, the strictly increasing embedding must use every position of y.

Therefore x=y.

Hence distinct equal-length words are incomparable under ordinary subsequence order.

## G-IA442 — critical paths are pairwise incomparable and private witnesses are pairwise incomparable

Fix a threshold-critical singleton-susceptibility family:

    F={P_1,...,P_k}

whose selected paths all have one common length n, and choose one private threshold witness:

    w_i

of common threshold length L for each P_i.

All selected paths are distinct, so G-IA441 makes:

    {P_1,...,P_k}

an antichain.

The private witnesses are also distinct.

If w_i=w_j for i!=j, then the private-witness obligation for i requires w_i to cover P_j, while the obligation for j requires the same word to fail P_j, contradiction.

Thus:

    {w_1,...,w_k}

is also an antichain by G-IA441.

## G-IA443 — private-witness incidence gives all cross relations except the diagonal

By definition of private witness:

    P_i is not a subsequence of w_i,

while for every j!=i:

    P_j is a subsequence of w_i.

Equivalently:

    P_i <=subseq w_j
    iff
    i != j.

Because n<L, no threshold witness w_j can be a subsequence of any P_i.

Thus every diagonal pair:

    (P_i,w_i)

is incomparable, and every off-diagonal lower/upper pair is ordered.

## G-IA444 — every uniform-length threshold-critical family induces the standard example S_k

Restrict the ordinary word-subsequence poset to the 2k represented words:

    {P_1,...,P_k,w_1,...,w_k}.

G-IA442 supplies no nontrivial order relation inside either level.

G-IA443 supplies exactly:

    P_i < w_j
    iff
    i != j.

Therefore this induced finite subposet is exactly the standard example:

    S_k.

This is an exact derived structural correspondence.

It does not identify path words with witness words or import any new Core primitive.

## G-IA445 — the induced subposet has order dimension at least k

Consider any family of linear extensions whose intersection reconstructs the induced partial order.

For every incomparable diagonal pair:

    P_i || w_i,

some linear extension must reverse it:

    w_i < P_i.

One linear extension cannot reverse two different diagonal pairs i and j.

If it did, then that same linear extension would contain:

    w_i < P_i < w_j

because P_i < w_j is a represented off-diagonal relation, and also:

    w_j < P_j < w_i

because P_j < w_i is represented.

These inequalities form an impossible cycle in one linear order.

Therefore distinct diagonal pairs require distinct reversing linear extensions.

Hence:

    dimension >= k.

The standard upper bound dimension<=k for S_k is classical, but it is not needed for the glycan lower-bound consequence.

## G-IA446 — Experiment 047 supplies a finite ternary subsequence-poset dimension lower bound of 173

A28 gives a uniform-length threshold-critical family with:

    k=173
    path length=10
    private witness length=20.

By G-IA444 it induces S_173 inside the ternary word-subsequence poset.

By G-IA445, that finite induced subposet has order dimension at least:

    173.

Therefore the ternary subsequence poset contains an explicitly represented finite subposet of dimension at least 173.

## G-IA447 — a standard example alone is not a witness-width certificate

The private-witness relations establish:

    every one-path deletion
    has a threshold-L solution.

But the S_k incidence pattern alone does not rule out some other length-L word z that covers every P_i.

Threshold-critical witness width additionally requires:

    no length-L word covers all selected paths,

equivalently:

    union_i D_L(P_i)=U_L.

Therefore:

    standard example
    +
    threshold-universe coverage

is the exact current shape of a critical-cover witness.

The standard-example view must not replace the total-cover obligation.

## G-IA448 — critical-cover search simultaneously constructs a dimension witness and an optimization witness

For a verified uniform-length minimal threshold cover of cardinality k:

- total failure-set coverage certifies threshold infeasibility;
- private words certify inclusion-minimality and witness width k;
- the same private words induce S_k;
- S_k certifies finite subsequence-poset dimension at least k.

Thus one exact critical-cover certificate has two derived readings:

    optimization:
        witness width = k

    order theory:
        induced standard example S_k
        and dimension >= k.

Neither reading strengthens the other beyond the shared represented incidence facts.

## Disposition

New exact implicit assertions:

    G-IA441..G-IA448.

Strongest current finite instance from A28:

    witness width:                    173
    induced standard example:         S_173
    finite subsequence-poset dimension lower bound: 173.

External novelty is not claimed.

Next discovery target:

- search the subword-order literature for explicit unbounded standard-example constructions over a fixed three-symbol alphabet;
- if such a construction exists, test whether its upper words can also satisfy the threshold-universe coverage obligation;
- otherwise use the critical-cover incidence system to search for a project-specific recursive construction.