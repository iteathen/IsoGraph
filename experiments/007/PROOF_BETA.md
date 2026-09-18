# Proof Beta

Use only the numbered steps below as source structure.

**B01.** From the same finite relation (Esubseteq L	imes R), build a directed capacity network with a source (s), sink (t), edges (s	o x) of capacity (1) for each (xin L), edges (x	o y) of capacity (K=|L|+1) for each ((x,y)in E), and edges (y	o t) of capacity (1) for each (yin R).

**B02.** Any integral flow of value (|L|) selects exactly one related right-hand element for every left-hand element and no right-hand element twice, hence yields a full one-to-one pairing.

**B03.** Suppose no full pairing exists. By integral max-flow and min-cut, there is an (s)-(t) cut ((S,T)) with capacity strictly less than (|L|).

**B04.** Put (X=Lcap S) and (Y=Rcap S). No relation edge can go from (X) to (Rsetminus Y): such a crossing edge alone has capacity (K>|L|), contradicting the chosen cut capacity. Hence
[
N(X)subseteq Y.
]

**B05.** No large-capacity relation edge crosses the cut, so its capacity is exactly
[
|Lsetminus X|+|Y|,
]
coming from source edges entering (T) and sink edges leaving (S).

**B06.** Since the cut capacity is less than (|L|),
[
|Lsetminus X|+|Y|<|L|,
]
and therefore
[
|Y|<|X|.
]

**B07.** Combining B04 and B06 gives
[
|N(X)|le |Y|<|X|,
]
contradicting the assumed subset condition.

**B08.** Therefore every minimum cut has capacity at least (|L|), so an integral flow of value (|L|) exists; by B02 this gives a pairing covering all of (L).
