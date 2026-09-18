# Proof Alpha

Use only the numbered steps below as source structure.

**A01.** Let (L) and (R) be finite sets with a relation (E subseteq L	imes R). For (Xsubseteq L), let (N(X)subseteq R) be the related right-hand elements. Assume that for every (Xsubseteq L),
[
|N(X)|ge |X|.
]

**A02.** Choose a maximum-cardinality partial one-to-one pairing (Msubseteq E). Suppose for contradiction that some (x_0in L) is unpaired.

**A03.** Starting at (x_0), form alternating walks whose (L	o R) steps use edges outside (M) and whose (R	o L) steps use edges in (M). Let (Xsubseteq L) and (Ysubseteq R) be the left and right vertices reachable in this way.

**A04.** No element of (Y) is unpaired. Otherwise an alternating walk from (x_0) to an unpaired right-hand element would flip to a pairing larger than (M), contradicting maximality.

**A05.** Every (yin Y) is paired by (M) with a unique element of (Xsetminus{x_0}), and every element of (Xsetminus{x_0}) occurs this way. Hence
[
|Y|=|X|-1.
]

**A06.** Every neighbor of (X) lies in (Y). An edge from a reachable left vertex either is outside (M), making its right endpoint reachable, or is the matched edge already used by the alternating construction. Thus
[
N(X)=Y.
]

**A07.** Therefore
[
|N(X)|=|Y|=|X|-1<|X|,
]
contradicting A01.

**A08.** The assumption in A02 is false, so a pairing exists that covers every element of (L).
