#!/usr/bin/env python3
"""Independent arithmetic/set reconstruction of bounded math-only screen.
Not a broad Causal Step simulator. No physical units or emergence assumptions.
"""
import json
from itertools import combinations, product
from pathlib import Path

src = json.loads((Path(__file__).with_name('results') / '2026-10-14-bounded-isomorphism-pass.json').read_text())

# Independent simple bits/set implementation of positive/inhibitor guard encoding.
checks = 0
for k in (3,4,5):
    universe = set(range(k))
    for weights in range(1 << (k+1)):
        clauses = [(set(s),universe-set(s)) for m in range(k+1) if weights & (1<<m) for s in combinations(range(k),m)]
        for mask in range(1 << k):
            state={v for v in universe if mask & (1<<v)}
            for alive, fired in product((False,True),repeat=2):
                native = alive and not fired and bool(weights & (1<<len(state)))
                hit = sum(1 for req,inh in clauses if req<=state and state.isdisjoint(inh) and alive and not fired)
                assert hit == int(native)
                checks +=1
assert checks == src['localChecks'] == 10752

# Independent hypergraph projection: each Fano pair is in one triple.
F1=[(0,1,2),(0,3,4),(0,5,6),(1,3,5),(1,4,6),(2,3,6),(2,4,5)]
F2=[tuple(sorted(2 if i==1 else 1 if i==2 else i for i in e)) for e in F1]
assert sorted(F1) != sorted(F2)
for pair in combinations(range(7),2):
    assert sum((len(e)-1) for e in F1 if set(pair)<=set(e))==2
    assert sum((len(e)-1) for e in F2 if set(pair)<=set(e))==2
probe = frozenset((1,3,5))
assert probe in set(map(frozenset,F1)) and probe not in set(map(frozenset,F2))
assert src['operatorWitness']['selectedTriple'] == [1,3,5]

# T4 pair-check independent hand-source update based on the original rule-4 bit flip
# on 4-node complete overlap; two old source occurrences differ only at node 2/3.
e=(0,1,2); f=(0,1,3)
def enabled(mask, edge):
    return sum((mask>>v)&1 for v in edge) in (0,1,3)
def flip(mask,edge):
    for v in edge: mask ^= 1 << v
    return mask
for mask, expected in [(0, False),(1, True)]:
    assert enabled(mask,e) and enabled(mask,f)
    assert enabled(flip(mask,e),f) == expected
    assert enabled(flip(mask,f),e) == expected
    if expected:
        assert flip(flip(mask,e),f)==flip(flip(mask,f),e)
assert src['T4PairWitness'][0]['kind']=='coenabled-but-disabling-conflict'
assert src['T4PairWitness'][1]['kind']=='commuting-square'

print(json.dumps({'independent_engine':'Python 3', 'source_verified':'existing original source blob and archived k3/#4 coefficients, not a new physics simulator', 'individualGuardChecks':checks,'fanoOperatorPairWeights':21,'T4CounterfactualMasks':[0,1],'passed':True,'limits':'No independent full native engine execution, no full source process isomorphism, no physical observation'}))
